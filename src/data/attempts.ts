import { db, type AttemptRecord } from '@/data/db';

export type { AttemptRecord };

/** Persist one answered item. */
export async function recordAttempt(
  input: Omit<AttemptRecord, 'id' | 'updatedAt'>,
): Promise<AttemptRecord> {
  const record: AttemptRecord = {
    ...input,
    id: crypto.randomUUID(),
    updatedAt: Date.now(),
  };
  await db.attempts.add(record);
  return record;
}

/** Every attempt at one item, oldest first. */
export async function attemptsForItem(
  itemId: string,
): Promise<AttemptRecord[]> {
  const found = await db.attempts.where('itemId').equals(itemId).toArray();
  return found.sort((a, b) => a.updatedAt - b.updatedAt);
}

export async function allAttempts(): Promise<AttemptRecord[]> {
  return db.attempts.toArray();
}

/** Wipe all local progress. Used by tests and by a future reset action. */
export async function clearAllData(): Promise<void> {
  await Promise.all([db.attempts.clear(), db.settings.clear()]);
}
