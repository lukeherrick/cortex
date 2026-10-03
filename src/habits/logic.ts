import { shiftDateKey, weekdayOf } from '@/habits/dates';
import type { Habit, HabitEntry } from '@/habits/types';

/** Entries keyed by `habitId:date`. */
export type EntryMap = ReadonlyMap<string, HabitEntry>;

export const entryKey = (habitId: string, date: string): string =>
  `${habitId}:${date}`;

export function valueOf(
  habit: Habit,
  entries: EntryMap,
  date: string,
): number {
  return entries.get(entryKey(habit.id, date))?.value ?? 0;
}

/** Whether this habit applies on this date at all. */
export function isScheduled(habit: Habit, date: string): boolean {
  if (habit.archived) return false;
  if (habit.days === null) return true;
  return habit.days.includes(weekdayOf(date));
}

export function isComplete(habit: Habit, value: number): boolean {
  if (habit.kind === 'check') return value >= 1;
  return habit.target !== null && value >= habit.target;
}

/** 0 to 1, for a progress ring. A `check` habit is only ever 0 or 1. */
export function progressOf(habit: Habit, value: number): number {
  if (habit.kind === 'check') return value >= 1 ? 1 : 0;
  if (habit.target === null || habit.target <= 0) return 0;
  return Math.min(1, value / habit.target);
}

function doneOn(habit: Habit, entries: EntryMap, date: string): boolean {
  return isComplete(habit, valueOf(habit, entries, date));
}

/**
 * Consecutive scheduled days this habit was completed, counting back from
 * `today`.
 *
 * Today is a grace day: an incomplete today does not break the streak, it just
 * does not extend it. Otherwise every streak would read zero each morning,
 * which is both useless and discouraging. Days the habit is not scheduled on
 * are skipped rather than counted as misses.
 */
export function habitStreak(
  habit: Habit,
  entries: EntryMap,
  today: string,
  maxLookback = 400,
): number {
  let streak = 0;
  let date = today;

  for (let i = 0; i < maxLookback; i += 1) {
    if (isScheduled(habit, date)) {
      if (doneOn(habit, entries, date)) {
        streak += 1;
      } else if (date !== today) {
        break;
      }
    }
    date = shiftDateKey(date, -1);
  }

  return streak;
}

export function coreHabits(habits: readonly Habit[]): Habit[] {
  return habits.filter((h) => h.tier === 'core' && !h.archived);
}

/** The core habits scheduled on this date. */
export function coreScheduledOn(
  habits: readonly Habit[],
  date: string,
): Habit[] {
  return coreHabits(habits).filter((h) => isScheduled(h, date));
}

/**
 * A perfect day: every scheduled **core** habit done. Extras are ignored on
 * purpose — that is what makes them extras.
 *
 * A day with no scheduled core habits is not perfect, because nothing was
 * achieved. Vacuous credit would make the streak meaningless.
 */
export function isPerfectDay(
  habits: readonly Habit[],
  entries: EntryMap,
  date: string,
): boolean {
  const core = coreScheduledOn(habits, date);
  if (core.length === 0) return false;
  return core.every((h) => doneOn(h, entries, date));
}

/** Consecutive perfect days, with the same grace for today. */
export function perfectDayStreak(
  habits: readonly Habit[],
  entries: EntryMap,
  today: string,
  maxLookback = 400,
): number {
  let streak = 0;
  let date = today;

  for (let i = 0; i < maxLookback; i += 1) {
    if (isPerfectDay(habits, entries, date)) {
      streak += 1;
    } else if (date !== today) {
      break;
    }
    date = shiftDateKey(date, -1);
  }

  return streak;
}

export interface DayProgress {
  done: number;
  total: number;
}

/** How many scheduled core habits are done today, for the headline number. */
export function coreProgress(
  habits: readonly Habit[],
  entries: EntryMap,
  date: string,
): DayProgress {
  const core = coreScheduledOn(habits, date);
  return {
    done: core.filter((h) => doneOn(h, entries, date)).length,
    total: core.length,
  };
}

/** The next value after a tap: a step for counters, a toggle for checks. */
export function nextValue(habit: Habit, current: number): number {
  if (habit.kind === 'check') return current >= 1 ? 0 : 1;
  const step = habit.step ?? 1;
  const target = habit.target ?? Infinity;
  const raised = Math.round((current + step) * 1000) / 1000;
  // Tapping past the target wraps back to zero so a mis-tap is undoable.
  return raised > target ? 0 : raised;
}
