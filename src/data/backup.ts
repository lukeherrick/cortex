import { z } from 'zod';
import { db } from '@/data/db';

/**
 * Whole-progress export and restore.
 *
 * This is the only backup there is. Progress lives in IndexedDB on one device,
 * and iOS can clear site data on a reset or a manual "Clear Website Data", so
 * everything — review schedule, answer history, the day log, habit history —
 * can vanish without warning. Until cross-device sync exists, a file the owner
 * keeps somewhere else is the safety net.
 *
 * Content is deliberately NOT included. It ships with the build and is
 * regenerated from `content/`; including it would bloat the file and let a
 * stale backup overwrite corrected questions.
 */

export const BACKUP_FORMAT = 'cortex-backup';
export const BACKUP_VERSION = 1;

/**
 * Records are validated loosely and passed through.
 *
 * Strict per-field schemas would reject a backup written by a later version of
 * the app that added a field — the opposite of what a backup is for. The
 * envelope is checked strictly; the rows only have to be objects with an
 * identity.
 */
const idRow = z.object({ id: z.string().min(1) }).passthrough();
const dateRow = z.object({ date: z.string().min(1) }).passthrough();

export const backupSchema = z.object({
  format: z.literal(BACKUP_FORMAT),
  version: z.number().int().positive(),
  exportedAt: z.string().min(1),
  data: z.object({
    attempts: z.array(idRow).default([]),
    cards: z.array(idRow).default([]),
    days: z.array(dateRow).default([]),
    habits: z.array(idRow).default([]),
    habitEntries: z.array(idRow).default([]),
    settings: z.array(idRow).default([]),
  }),
});

/**
 * Rows are carried as opaque objects.
 *
 * Declared by hand rather than inferred from the schema: zod's `passthrough`
 * output is an index-signature type that the concrete record interfaces do not
 * structurally satisfy, and the whole point here is that a backup round-trips
 * rows it does not need to understand.
 */
export type BackupRow = Record<string, unknown>;

export interface Backup {
  format: typeof BACKUP_FORMAT;
  version: number;
  exportedAt: string;
  data: {
    attempts: BackupRow[];
    cards: BackupRow[];
    days: BackupRow[];
    habits: BackupRow[];
    habitEntries: BackupRow[];
    settings: BackupRow[];
  };
}

export interface BackupCounts {
  attempts: number;
  cards: number;
  days: number;
  habits: number;
  habitEntries: number;
  settings: number;
}

export function countsOf(backup: Backup): BackupCounts {
  const { data } = backup;
  return {
    attempts: data.attempts.length,
    cards: data.cards.length,
    days: data.days.length,
    habits: data.habits.length,
    habitEntries: data.habitEntries.length,
    settings: data.settings.length,
  };
}

/** Read everything out of the database into a plain object. */
export async function buildBackup(now: number): Promise<Backup> {
  const [attempts, cards, days, habits, habitEntries, settings] =
    await Promise.all([
      db.attempts.toArray(),
      db.cards.toArray(),
      db.days.toArray(),
      db.habits.toArray(),
      db.habitEntries.toArray(),
      db.settings.toArray(),
    ]);

  const rows = (value: unknown): BackupRow[] => value as BackupRow[];

  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    exportedAt: new Date(now).toISOString(),
    data: {
      attempts: rows(attempts),
      cards: rows(cards),
      days: rows(days),
      habits: rows(habits),
      habitEntries: rows(habitEntries),
      settings: rows(settings),
    },
  };
}

export function serialiseBackup(backup: Backup): string {
  return `${JSON.stringify(backup, null, 2)}\n`;
}

export function backupFilename(now: number): string {
  const d = new Date(now);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `cortex-backup-${d.getFullYear()}-${month}-${day}.json`;
}

export class BackupError extends Error {}

/** Parse and validate a backup file's text, with a readable failure. */
export function parseBackup(text: string): Backup {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new BackupError(
      "That file isn't valid JSON. Make sure it's the .json file Cortex exported, not a screenshot or a zip.",
    );
  }

  const parsed = backupSchema.safeParse(raw);
  if (!parsed.success) {
    const looksLikeOtherApp =
      typeof raw === 'object' && raw !== null && !('format' in raw);
    throw new BackupError(
      looksLikeOtherApp
        ? "That doesn't look like a Cortex backup — it has no format marker."
        : 'That file is a Cortex backup but something in it is malformed, so nothing was changed.',
    );
  }

  if (parsed.data.version > BACKUP_VERSION) {
    throw new BackupError(
      `That backup was written by a newer version of Cortex (format ${parsed.data.version}, this build reads ${BACKUP_VERSION}). Update first — importing it could lose data.`,
    );
  }

  // Safe: the schema has already guaranteed the envelope and that every table
  // is an array of objects carrying an identity.
  return parsed.data as unknown as Backup;
}

export type ImportMode =
  /** Wipe local progress and restore the file exactly. For a real restore. */
  | 'replace'
  /** Keep whichever copy of each record was updated more recently. */
  | 'merge';

function updatedAtOf(row: BackupRow): number {
  const value = row.updatedAt;
  return typeof value === 'number' ? value : 0;
}

/**
 * Merge by last-write-wins on `updatedAt`.
 *
 * Every record carries `updatedAt` precisely so this is possible — it is the
 * same seam a future sync adapter would use.
 */
function mergeRows(
  existing: BackupRow[],
  incoming: BackupRow[],
  key: string,
): BackupRow[] {
  const byKey = new Map<string, BackupRow>();
  for (const row of existing) byKey.set(String(row[key]), row);
  for (const row of incoming) {
    const id = String(row[key]);
    const current = byKey.get(id);
    if (!current || updatedAtOf(row) >= updatedAtOf(current)) {
      byKey.set(id, row);
    }
  }
  return [...byKey.values()];
}

/** A table seen only as something that can be emptied and refilled. */
interface RestorableTable<T> {
  clear: () => Promise<void>;
  toArray: () => Promise<T[]>;
  bulkPut: (rows: T[]) => Promise<unknown>;
}

async function restoreTable<T>(
  table: RestorableTable<T>,
  incoming: BackupRow[],
  key: string,
  mode: ImportMode,
): Promise<void> {
  const rows =
    mode === 'replace'
      ? incoming
      : mergeRows((await table.toArray()) as BackupRow[], incoming, key);

  await table.clear();
  if (rows.length > 0) await table.bulkPut(rows as unknown as T[]);
}

/** Restore a parsed backup into the database. */
export async function applyBackup(
  backup: Backup,
  mode: ImportMode,
): Promise<BackupCounts> {
  const { data } = backup;

  await restoreTable(db.attempts, data.attempts, 'id', mode);
  await restoreTable(db.cards, data.cards, 'id', mode);
  await restoreTable(db.days, data.days, 'date', mode);
  await restoreTable(db.habits, data.habits, 'id', mode);
  await restoreTable(db.habitEntries, data.habitEntries, 'id', mode);
  await restoreTable(db.settings, data.settings, 'id', mode);

  return countsOf(backup);
}

const LAST_EXPORT_KEY = 'backup.lastExportedAt';

/** Remember that a backup was taken, so the app can nag if it has been a while. */
export async function recordExport(now: number): Promise<void> {
  await db.settings.put({
    id: LAST_EXPORT_KEY,
    value: now,
    updatedAt: now,
  });
}

export async function lastExportAt(): Promise<number | null> {
  const row = await db.settings.get(LAST_EXPORT_KEY);
  return typeof row?.value === 'number' ? row.value : null;
}

/** Wipe all local progress. Content is untouched; it comes from the build. */
export async function eraseAllProgress(): Promise<void> {
  await Promise.all([
    db.attempts.clear(),
    db.cards.clear(),
    db.days.clear(),
    db.habits.clear(),
    db.habitEntries.clear(),
    db.settings.clear(),
  ]);
}
