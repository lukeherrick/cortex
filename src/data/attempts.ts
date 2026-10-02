import { db, type AttemptRecord } from '@/data/db';

export type { AttemptRecord };

let lastStamp = 0;

/**
 * A strictly increasing write stamp.
 *
 * `Date.now()` has millisecond resolution, so several attempts saved in quick
 * succession can share a timestamp and leave their order undefined. Attempt
 * history is read back oldest-first, so the order is part of the contract.
 * Under a burst this runs at most a few milliseconds ahead of the wall clock.
 */
function nextStamp(): number {
  const now = Date.now();
  lastStamp = now > lastStamp ? now : lastStamp + 1;
  return lastStamp;
}

/** Persist one answered item. */
export async function recordAttempt(
  input: Omit<AttemptRecord, 'id' | 'updatedAt'>,
): Promise<AttemptRecord> {
  const record: AttemptRecord = {
    ...input,
    id: crypto.randomUUID(),
    updatedAt: nextStamp(),
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
