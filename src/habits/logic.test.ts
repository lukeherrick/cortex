import { describe, expect, it } from 'vitest';
import {
  coreProgress,
  entryKey,
  habitStreak,
  isComplete,
  isPerfectDay,
  isScheduled,
  nextValue,
  perfectDayStreak,
  progressOf,
  type EntryMap,
} from '@/habits/logic';
import { seedHabits } from '@/habits/seed';
import type { Habit, HabitEntry } from '@/habits/types';

const NOW = Date.UTC(2026, 0, 15);

// 2026-01-15 is a Thursday (weekday 4).
const TODAY = '2026-01-15';
const YESTERDAY = '2026-01-14';
const TWO_AGO = '2026-01-13';

function habit(over: Partial<Habit> = {}): Habit {
  return {
    id: 'h',
    name: 'Habit',
    kind: 'check',
    target: null,
    unit: null,
    step: null,
    slot: 'anytime',
    tier: 'core',
    days: null,
    archived: false,
    order: 1,
    updatedAt: NOW,
    ...over,
  };
}

function entries(pairs: [Habit, string, number][]): EntryMap {
  const map = new Map<string, HabitEntry>();
  for (const [h, date, value] of pairs) {
    map.set(entryKey(h.id, date), {
      id: entryKey(h.id, date),
      habitId: h.id,
      date,
      value,
      updatedAt: NOW,
    });
  }
  return map;
}

describe('isComplete', () => {
  it('completes a check at one tap', () => {
    const h = habit();
    expect(isComplete(h, 0)).toBe(false);
    expect(isComplete(h, 1)).toBe(true);
  });

  it('completes a counter only at its target', () => {
    const h = habit({ kind: 'count', target: 3, step: 0.25 });
    expect(isComplete(h, 2.75)).toBe(false);
    expect(isComplete(h, 3)).toBe(true);
    expect(isComplete(h, 3.5)).toBe(true);
  });

  it('completes a value habit at or above its target', () => {
    const h = habit({ kind: 'value', target: 10000 });
    expect(isComplete(h, 9999)).toBe(false);
    expect(isComplete(h, 10000)).toBe(true);
  });
});

describe('progressOf', () => {
  it('is all-or-nothing for a check', () => {
    expect(progressOf(habit(), 0)).toBe(0);
    expect(progressOf(habit(), 1)).toBe(1);
  });

  it('is partial for a counter', () => {
    const h = habit({ kind: 'count', target: 4 });
    expect(progressOf(h, 1)).toBe(0.25);
  });

  it('never exceeds one', () => {
    const h = habit({ kind: 'value', target: 8 });
    expect(progressOf(h, 20)).toBe(1);
  });
});

describe('isScheduled', () => {
  it('schedules a daily habit every day', () => {
    expect(isScheduled(habit(), TODAY)).toBe(true);
  });

  it('respects a weekday subset', () => {
    // Thursday is 4.
    expect(isScheduled(habit({ days: [4] }), TODAY)).toBe(true);
    expect(isScheduled(habit({ days: [1, 3, 5] }), TODAY)).toBe(false);
  });

  it('never schedules an archived habit', () => {
    expect(isScheduled(habit({ archived: true }), TODAY)).toBe(false);
  });
});

describe('habitStreak', () => {
  const h = habit();

  it('is zero with no history', () => {
    expect(habitStreak(h, new Map(), TODAY)).toBe(0);
  });

  it('counts a run ending today', () => {
    const e = entries([
      [h, TODAY, 1],
      [h, YESTERDAY, 1],
      [h, TWO_AGO, 1],
    ]);
    expect(habitStreak(h, e, TODAY)).toBe(3);
  });

  it('gives today grace so the streak does not reset each morning', () => {
    const e = entries([
      [h, YESTERDAY, 1],
      [h, TWO_AGO, 1],
    ]);
    expect(habitStreak(h, e, TODAY)).toBe(2);
  });

  it('breaks on a missed day that is not today', () => {
    const e = entries([
      [h, TODAY, 1],
      [h, TWO_AGO, 1],
    ]);
    expect(habitStreak(h, e, TODAY)).toBe(1);
  });

  it('skips days the habit is not scheduled on rather than breaking', () => {
    // Scheduled Thursdays only: today and a week ago.
    const weekly = habit({ days: [4] });
    const lastThursday = '2026-01-08';
    const e = entries([
      [weekly, TODAY, 1],
      [weekly, lastThursday, 1],
    ]);
    expect(habitStreak(weekly, e, TODAY)).toBe(2);
  });

  it('does not count a partially filled counter', () => {
    const water = habit({ kind: 'count', target: 3, step: 0.25 });
    const e = entries([
      [water, TODAY, 3],
      [water, YESTERDAY, 1.5],
    ]);
    expect(habitStreak(water, e, TODAY)).toBe(1);
  });
});

describe('perfect days', () => {
  const core1 = habit({ id: 'c1', tier: 'core' });
  const core2 = habit({ id: 'c2', tier: 'core' });
  const extra = habit({ id: 'x1', tier: 'extra' });
  const habits = [core1, core2, extra];

  it('needs every scheduled core habit', () => {
    const partial = entries([[core1, TODAY, 1]]);
    expect(isPerfectDay(habits, partial, TODAY)).toBe(false);

    const all = entries([
      [core1, TODAY, 1],
      [core2, TODAY, 1],
    ]);
    expect(isPerfectDay(habits, all, TODAY)).toBe(true);
  });

  it('ignores extras entirely — that is what makes them extras', () => {
    const coreOnly = entries([
      [core1, TODAY, 1],
      [core2, TODAY, 1],
    ]);
    expect(isPerfectDay(habits, coreOnly, TODAY)).toBe(true);
  });

  it('is not perfect when no core habits were scheduled', () => {
    // Vacuous credit would make the streak meaningless.
    const nothingScheduled = [habit({ id: 'c1', tier: 'core', days: [0] })];
    expect(isPerfectDay(nothingScheduled, new Map(), TODAY)).toBe(false);
  });

  it('counts consecutive perfect days with grace for today', () => {
    const e = entries([
      [core1, YESTERDAY, 1],
      [core2, YESTERDAY, 1],
      [core1, TWO_AGO, 1],
      [core2, TWO_AGO, 1],
    ]);
    expect(perfectDayStreak(habits, e, TODAY)).toBe(2);
  });

  it('breaks the perfect-day streak on an imperfect past day', () => {
    const e = entries([
      [core1, YESTERDAY, 1],
      [core1, TWO_AGO, 1],
      [core2, TWO_AGO, 1],
    ]);
    expect(perfectDayStreak(habits, e, TODAY)).toBe(0);
  });
});

describe('coreProgress', () => {
  it('counts done over scheduled core habits only', () => {
    const core1 = habit({ id: 'c1', tier: 'core' });
    const core2 = habit({ id: 'c2', tier: 'core' });
    const extra = habit({ id: 'x1', tier: 'extra' });
    const e = entries([
      [core1, TODAY, 1],
      [extra, TODAY, 1],
    ]);
    expect(coreProgress([core1, core2, extra], e, TODAY)).toEqual({
      done: 1,
      total: 2,
    });
  });
});

describe('nextValue', () => {
  it('toggles a check', () => {
    expect(nextValue(habit(), 0)).toBe(1);
    expect(nextValue(habit(), 1)).toBe(0);
  });

  it('steps a counter', () => {
    const water = habit({ kind: 'count', target: 3, step: 0.25 });
    expect(nextValue(water, 0)).toBe(0.25);
    expect(nextValue(water, 2.75)).toBe(3);
  });

  it('wraps back to zero past the target so a mis-tap is undoable', () => {
    const water = habit({ kind: 'count', target: 3, step: 0.25 });
    expect(nextValue(water, 3)).toBe(0);
  });

  it('avoids floating-point drift when stepping', () => {
    const water = habit({ kind: 'count', target: 3, step: 0.1 });
    let v = 0;
    for (let i = 0; i < 3; i += 1) v = nextValue(water, v);
    expect(v).toBe(0.3);
  });
});

describe('the seeded habit set', () => {
  const habits = seedHabits(NOW);

  it('is the owner-chosen ten', () => {
    expect(habits).toHaveLength(10);
  });

  it('keeps his original seven as core and the three suggestions as extra', () => {
    expect(habits.filter((h) => h.tier === 'core')).toHaveLength(7);
    expect(habits.filter((h) => h.tier === 'extra')).toHaveLength(3);
  });

  it('has unique ids even where names repeat across slots', () => {
    const ids = habits.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(habits.filter((h) => h.name === 'Wash face')).toHaveLength(2);
  });

  it('gives every count or value habit a target and a unit', () => {
    for (const h of habits.filter((x) => x.kind !== 'check')) {
      expect(h.target, h.id).not.toBeNull();
      expect(h.unit, h.id).not.toBeNull();
    }
  });

  it('gives every counter a step to tap by', () => {
    for (const h of habits.filter((x) => x.kind === 'count')) {
      expect(h.step, h.id).not.toBeNull();
    }
  });

  it('covers all four slots', () => {
    expect(new Set(habits.map((h) => h.slot))).toEqual(
      new Set(['morning', 'night', 'anytime', 'on-study-start']),
    );
  });
});
