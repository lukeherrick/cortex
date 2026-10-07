import { db } from '@/data/db';

/**
 * Small key-value preferences.
 *
 * Deliberately in IndexedDB alongside everything else rather than in
 * localStorage, so a preference travels with a backup and survives a restore.
 * Losing which study technique you chose is minor, but having two places where
 * state can live is not.
 */
export async function getSetting<T>(id: string, fallback: T): Promise<T> {
  const row = await db.settings.get(id);
  return row === undefined ? fallback : (row.value as T);
}

export async function setSetting(id: string, value: unknown): Promise<void> {
  await db.settings.put({ id, value, updatedAt: Date.now() });
}

export const TECHNIQUE_KEY = 'focus.technique';
