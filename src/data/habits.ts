import { db } from '@/data/db';
import { entryKey } from '@/habits/logic';
import { seedHabits } from '@/habits/seed';
import type { Habit, HabitEntry } from '@/habits/types';

/**
 * Load the habit list, seeding the owner's chosen set on first run.
 *
 * Seeding happens once. If he deletes every habit, that is a choice and we do
 * not helpfully put them all back.
 */
export async function loadHabits(now: number): Promise<Habit[]> {
  const seededFlag = await db.settings.get('habits.seeded');
  if (!seededFlag) {
    await db.habits.bulkPut(seedHabits(now));
    await db.settings.put({
      id: 'habits.seeded',
      value: true,
      updatedAt: now,
    });
  }
  const habits = await db.habits.toArray();
  return habits.sort((a, b) => a.order - b.order);
}

export async function saveHabit(habit: Habit): Promise<void> {
  await db.habits.put(habit);
}

export async function deleteHabit(habitId: string): Promise<void> {
  await db.habits.delete(habitId);
  const entries = await db.habitEntries.where('habitId').equals(habitId).toArray();
  await db.habitEntries.bulkDelete(entries.map((e) => e.id));
}

/** Every entry, keyed `habitId:date`. */
export async function entryMap(): Promise<Map<string, HabitEntry>> {
  const entries = await db.habitEntries.toArray();
  return new Map(entries.map((e) => [e.id, e]));
}

/** Set a habit's value for one day. Zero removes the entry entirely. */
export async function setEntry(
  habitId: string,
  date: string,
  value: number,
  now: number,
): Promise<void> {
  const id = entryKey(habitId, date);
  if (value <= 0) {
    await db.habitEntries.delete(id);
    return;
  }
  await db.habitEntries.put({ id, habitId, date, value, updatedAt: now });
}

export async function clearHabitData(): Promise<void> {
  await Promise.all([
    db.habits.clear(),
    db.habitEntries.clear(),
    db.settings.delete('habits.seeded'),
  ]);
}
