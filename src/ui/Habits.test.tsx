import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { entryKey, type EntryMap } from '@/habits/logic';
import { seedHabits } from '@/habits/seed';
import type { Habit, HabitEntry } from '@/habits/types';
import Habits from '@/ui/Habits';

afterEach(cleanup);

const NOW = Date.UTC(2026, 0, 15);
const TODAY = '2026-01-15';

const habits = seedHabits(NOW);

function entries(pairs: [habitId: string, date: string, value: number][]): EntryMap {
  const map = new Map<string, HabitEntry>();
  for (const [habitId, date, value] of pairs) {
    map.set(entryKey(habitId, date), {
      id: entryKey(habitId, date),
      habitId,
      date,
      value,
      updatedAt: NOW,
    });
  }
  return map;
}

interface Logged {
  habitId: string;
  date: string;
  value: number;
}

function renderHabits(
  over: {
    habits?: readonly Habit[];
    entries?: EntryMap;
    hour?: number;
  } = {},
) {
  const log: Logged[] = [];
  const result = render(
    <Habits
      habits={over.habits ?? habits}
      entries={over.entries ?? new Map()}
      today={TODAY}
      hour={over.hour ?? 9}
      onSet={(habitId, date, value) => log.push({ habitId, date, value })}
    />,
  );
  return { ...result, log };
}

describe('Habits — layout', () => {
  it('groups habits into time-of-day slots', () => {
    renderHabits();
    expect(screen.getByText('Morning')).toBeDefined();
    expect(screen.getByText('Night')).toBeDefined();
    expect(screen.getByText('Any time')).toBeDefined();
  });

  it('marks the slot matching the current hour as now', () => {
    const { container } = renderHabits({ hour: 21 });
    const current = container.querySelector('.habit-slot.is-now h3');
    expect(current?.textContent).toMatch(/night/i);
  });

  it('flags extras so they read as optional', () => {
    const { container } = renderHabits();
    expect(container.querySelectorAll('.extra-flag').length).toBe(3);
  });

  it('shows both wash-face habits, one per slot', () => {
    renderHabits();
    expect(screen.getAllByText('Wash face')).toHaveLength(2);
  });
});

describe('Habits — logging', () => {
  it('ticks a check habit on tap', async () => {
    const user = userEvent.setup();
    const { log } = renderHabits();

    await user.click(
      screen.getByRole('button', { name: /morning sunlight/i }),
    );
    expect(log).toEqual([
      { habitId: 'habit.sunlight', date: TODAY, value: 1 },
    ]);
  });

  it('unticks a check habit that is already done', async () => {
    const user = userEvent.setup();
    const { log } = renderHabits({
      entries: entries([['habit.sunlight', TODAY, 1]]),
    });

    await user.click(screen.getByRole('button', { name: /morning sunlight/i }));
    expect(log[0].value).toBe(0);
  });

  it('steps a counter by its step rather than completing it outright', async () => {
    const user = userEvent.setup();
    const { log } = renderHabits();

    await user.click(screen.getByRole('button', { name: /water/i }));
    expect(log[0]).toEqual({
      habitId: 'habit.water',
      date: TODAY,
      value: 0.25,
    });
  });

  it('shows a counter as progress toward its target', () => {
    renderHabits({ entries: entries([['habit.water', TODAY, 1.5]]) });
    expect(screen.getByText('1.50 / 3 L')).toBeDefined();
  });

  it('asks for a number for a value habit instead of tapping it up', async () => {
    const user = userEvent.setup();
    const { log } = renderHabits();

    await user.click(screen.getByRole('button', { name: /steps/i }));
    expect(log).toHaveLength(0);

    const field = screen.getByLabelText(/steps/i);
    await user.type(field, '10400');
    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(log).toEqual([
      { habitId: 'habit.steps', date: TODAY, value: 10400 },
    ]);
  });

  it('accepts a step count typed with commas', async () => {
    const user = userEvent.setup();
    const { log } = renderHabits();

    await user.click(screen.getByRole('button', { name: /steps/i }));
    await user.type(screen.getByLabelText(/steps/i), '10,400');
    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(log[0].value).toBe(10400);
  });

  it('marks a completed habit visually', () => {
    const { container } = renderHabits({
      entries: entries([['habit.sunlight', TODAY, 1]]),
    });
    expect(container.querySelectorAll('.habit.is-done').length).toBe(1);
  });
});

describe('Habits — the headline', () => {
  it('counts only core habits toward the day score', () => {
    // Seven core habits, so an extra being done must not move the score.
    renderHabits({ entries: entries([['habit.sunlight', TODAY, 1]]) });
    expect(screen.getByText('0')).toBeDefined();
    expect(screen.getByText('/7')).toBeDefined();
  });

  it('says how many core habits are left', () => {
    renderHabits({ entries: entries([['habit.face-am', TODAY, 1]]) });
    expect(screen.getByText(/6 core habits left/i)).toBeDefined();
  });

  it('celebrates a perfect day once every core habit is done', () => {
    const core = habits.filter((h) => h.tier === 'core');
    const done = entries(
      core.map((h) => [h.id, TODAY, h.target ?? 1] as [string, string, number]),
    );
    renderHabits({ entries: done });
    expect(
      screen.getByText(/perfect day\. every core habit done/i),
    ).toBeDefined();
    // And the perfect-day streak starts counting the same day.
    expect(screen.getByText(/1 perfect day in a row/i)).toBeDefined();
  });

  it('explains that extras cannot break the streak', () => {
    renderHabits();
    expect(screen.getByText(/can’t break your streak/i)).toBeDefined();
  });
});

describe('Habits — streaks', () => {
  it('shows a streak badge once a habit has a run going', () => {
    const run = entries([
      ['habit.face-am', '2026-01-14', 1],
      ['habit.face-am', '2026-01-13', 1],
      ['habit.face-am', '2026-01-12', 1],
    ]);
    renderHabits({ entries: run });
    expect(screen.getByTitle('3-day streak')).toBeDefined();
  });

  it('hides the badge for a one-day run, which is not yet a streak', () => {
    renderHabits({ entries: entries([['habit.face-am', TODAY, 1]]) });
    expect(screen.queryByTitle(/1-day streak/)).toBeNull();
  });

  it('draws a week of history per habit', () => {
    const { container } = renderHabits();
    const weeks = container.querySelectorAll('.habit-week');
    expect(weeks.length).toBeGreaterThan(0);
    expect(weeks[0].querySelectorAll('.dot')).toHaveLength(7);
  });
});
