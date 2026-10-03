import { describe, expect, it } from 'vitest';
import {
  clearedToday,
  longestStreak,
  studyStreak,
  studyTotals,
  type DayMap,
  type DayRecord,
} from '@/stats/streak';

const TODAY = '2026-01-15';
const YESTERDAY = '2026-01-14';
const TWO_AGO = '2026-01-13';
const THREE_AGO = '2026-01-12';

function days(
  rows: [date: string, answered: number, cleared: boolean][],
): DayMap {
  const map = new Map<string, DayRecord>();
  for (const [date, answered, cleared] of rows) {
    map.set(date, { date, answered, cleared, updatedAt: 0 });
  }
  return map;
}

describe('studyStreak', () => {
  it('is zero with no history', () => {
    expect(studyStreak(new Map(), TODAY)).toBe(0);
  });

  it('counts consecutive cleared days ending today', () => {
    const d = days([
      [TODAY, 12, true],
      [YESTERDAY, 8, true],
      [TWO_AGO, 20, true],
    ]);
    expect(studyStreak(d, TODAY)).toBe(3);
  });

  it('gives today grace so the streak does not read zero each morning', () => {
    const d = days([
      [YESTERDAY, 8, true],
      [TWO_AGO, 20, true],
    ]);
    expect(studyStreak(d, TODAY)).toBe(2);
  });

  it('does not count today as finished just because it is in progress', () => {
    const d = days([
      [TODAY, 3, false],
      [YESTERDAY, 8, true],
    ]);
    expect(studyStreak(d, TODAY)).toBe(1);
  });

  it('breaks on a skipped earlier day', () => {
    const d = days([
      [TODAY, 5, true],
      [TWO_AGO, 5, true],
    ]);
    expect(studyStreak(d, TODAY)).toBe(1);
  });

  it('does not count a day that was opened but not cleared', () => {
    // Opening the app is not studying.
    const d = days([
      [YESTERDAY, 0, false],
      [TWO_AGO, 10, true],
    ]);
    expect(studyStreak(d, TODAY)).toBe(0);
  });

  it('does not count a day where work was abandoned half-done', () => {
    const d = days([
      [YESTERDAY, 4, false],
      [TWO_AGO, 10, true],
    ]);
    expect(studyStreak(d, TODAY)).toBe(0);
  });

  it('requires both answering something and clearing it', () => {
    // cleared with nothing answered should never count.
    expect(studyStreak(days([[YESTERDAY, 0, true]]), TODAY)).toBe(0);
  });
});

describe('longestStreak', () => {
  it('is zero with no history', () => {
    expect(longestStreak(new Map())).toBe(0);
  });

  it('finds the best run even when it is not the current one', () => {
    const d = days([
      [THREE_AGO, 5, true],
      [TWO_AGO, 5, true],
      [YESTERDAY, 0, false],
      [TODAY, 5, true],
    ]);
    expect(longestStreak(d)).toBe(2);
  });

  it('counts a single cleared day as one', () => {
    expect(longestStreak(days([[TODAY, 5, true]]))).toBe(1);
  });

  it('ignores uncleared days when joining a run', () => {
    const d = days([
      [THREE_AGO, 5, true],
      [TWO_AGO, 3, false],
      [YESTERDAY, 5, true],
      [TODAY, 5, true],
    ]);
    expect(longestStreak(d)).toBe(2);
  });
});

describe('studyTotals', () => {
  it('adds up days studied and items answered', () => {
    const d = days([
      [TODAY, 12, true],
      [YESTERDAY, 8, false],
      [TWO_AGO, 0, false],
    ]);
    expect(studyTotals(d)).toEqual({ daysStudied: 2, itemsAnswered: 20 });
  });

  it('is empty for no history', () => {
    expect(studyTotals(new Map())).toEqual({
      daysStudied: 0,
      itemsAnswered: 0,
    });
  });
});

describe('clearedToday', () => {
  it('is true only when today was answered and cleared', () => {
    expect(clearedToday(days([[TODAY, 5, true]]), TODAY)).toBe(true);
    expect(clearedToday(days([[TODAY, 5, false]]), TODAY)).toBe(false);
    expect(clearedToday(days([[TODAY, 0, true]]), TODAY)).toBe(false);
    expect(clearedToday(new Map(), TODAY)).toBe(false);
  });
});
