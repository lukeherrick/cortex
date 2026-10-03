import { shiftDateKey } from '@/habits/dates';

/**
 * One day of study activity.
 *
 * `cleared` is set when a day's work ended with nothing still due. It is
 * recorded at the time rather than recomputed later, because due-ness is a
 * property of the present — once cards have moved on there is no honest way to
 * reconstruct what was owed last Tuesday.
 */
export interface DayRecord {
  /** Local calendar date, YYYY-MM-DD. */
  date: string;
  /** Items answered that day. */
  answered: number;
  /** Nothing was left due when the day's last answer was given. */
  cleared: boolean;
  updatedAt: number;
}

export type DayMap = ReadonlyMap<string, DayRecord>;

/**
 * Consecutive days where the day's due work was cleared.
 *
 * Today is a grace day: not having finished yet does not break the streak, it
 * just does not extend it. Any earlier gap does break it.
 *
 * A day only counts if something was actually answered **and** nothing was
 * left due. Opening the app does not count, and neither does answering three
 * things and abandoning twenty — a streak that is trivially easy to keep
 * carries no information and no motivation.
 */
export function studyStreak(
  days: DayMap,
  today: string,
  maxLookback = 400,
): number {
  let streak = 0;
  let date = today;

  for (let i = 0; i < maxLookback; i += 1) {
    const record = days.get(date);
    const counted = record !== undefined && record.answered > 0 && record.cleared;

    if (counted) {
      streak += 1;
    } else if (date !== today) {
      break;
    }
    date = shiftDateKey(date, -1);
  }

  return streak;
}

/** The longest run of cleared days anywhere in the history. */
export function longestStreak(days: DayMap): number {
  const cleared = [...days.values()]
    .filter((d) => d.answered > 0 && d.cleared)
    .map((d) => d.date)
    .sort();

  let best = 0;
  let run = 0;
  let previous: string | null = null;

  for (const date of cleared) {
    run = previous !== null && shiftDateKey(previous, 1) === date ? run + 1 : 1;
    best = Math.max(best, run);
    previous = date;
  }

  return best;
}

export interface StudyTotals {
  daysStudied: number;
  itemsAnswered: number;
}

export function studyTotals(days: DayMap): StudyTotals {
  const records = [...days.values()];
  return {
    daysStudied: records.filter((d) => d.answered > 0).length,
    itemsAnswered: records.reduce((n, d) => n + d.answered, 0),
  };
}

/** Whether today's work is finished, for the dashboard tick. */
export function clearedToday(days: DayMap, today: string): boolean {
  const record = days.get(today);
  return record !== undefined && record.answered > 0 && record.cleared;
}
