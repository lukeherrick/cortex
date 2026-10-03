import { db } from '@/data/db';
import type { DayRecord } from '@/stats/streak';

export async function dayMap(): Promise<Map<string, DayRecord>> {
  const days = await db.days.toArray();
  return new Map(days.map((d) => [d.date, d]));
}

/**
 * Record that an item was answered today, and whether anything is still due.
 *
 * `cleared` is captured at the moment of answering because due-ness is a
 * property of the present. Once cards have moved on there is no honest way to
 * reconstruct what was owed on a past day, so it has to be written down as it
 * happens.
 */
export async function recordAnswer(
  date: string,
  stillDue: number,
  now: number,
): Promise<DayRecord> {
  const existing = await db.days.get(date);
  const record: DayRecord = {
    date,
    answered: (existing?.answered ?? 0) + 1,
    cleared: stillDue === 0,
    updatedAt: now,
  };
  await db.days.put(record);
  return record;
}

export async function clearDays(): Promise<void> {
  await db.days.clear();
}
