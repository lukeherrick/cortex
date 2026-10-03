import type { Habit } from '@/habits/types';

/**
 * The owner's chosen habit set, 2026-10-01.
 *
 * Seven core habits were his own list. The three extras were added on the
 * principle that the best thing to add is something that makes an existing
 * habit easier: morning sunlight and screens-off both feed the 8-hour sleep
 * target, and phone-in-another-room attaches to starting a study session.
 *
 * All of it is editable in-app; this is only the starting point.
 */
export function seedHabits(now: number): Habit[] {
  const base = { days: null, archived: false, updatedAt: now } as const;

  return [
    {
      ...base,
      id: 'habit.face-am',
      name: 'Wash face',
      kind: 'check',
      target: null,
      unit: null,
      step: null,
      slot: 'morning',
      tier: 'core',
      order: 1,
    },
    {
      ...base,
      id: 'habit.stretch-am',
      name: 'Stretch',
      kind: 'check',
      target: null,
      unit: null,
      step: null,
      slot: 'morning',
      tier: 'core',
      order: 2,
    },
    {
      ...base,
      id: 'habit.sunlight',
      name: 'Morning sunlight, 10 min',
      kind: 'check',
      target: null,
      unit: null,
      step: null,
      slot: 'morning',
      tier: 'extra',
      order: 3,
    },
    {
      ...base,
      id: 'habit.water',
      name: 'Water',
      kind: 'count',
      target: 3,
      unit: 'L',
      step: 0.25,
      slot: 'anytime',
      tier: 'core',
      order: 4,
    },
    {
      ...base,
      id: 'habit.steps',
      name: 'Steps',
      kind: 'value',
      target: 10000,
      unit: 'steps',
      step: null,
      slot: 'anytime',
      tier: 'core',
      order: 5,
    },
    {
      ...base,
      id: 'habit.sleep',
      name: 'Sleep',
      kind: 'value',
      target: 8,
      unit: 'h',
      step: null,
      slot: 'anytime',
      tier: 'core',
      order: 6,
    },
    {
      ...base,
      id: 'habit.phone-away',
      name: 'Phone in another room',
      kind: 'check',
      target: null,
      unit: null,
      step: null,
      slot: 'on-study-start',
      tier: 'extra',
      order: 7,
    },
    {
      ...base,
      id: 'habit.stretch-pm',
      name: 'Stretch',
      kind: 'check',
      target: null,
      unit: null,
      step: null,
      slot: 'night',
      tier: 'core',
      order: 8,
    },
    {
      ...base,
      id: 'habit.face-pm',
      name: 'Wash face',
      kind: 'check',
      target: null,
      unit: null,
      step: null,
      slot: 'night',
      tier: 'core',
      order: 9,
    },
    {
      ...base,
      id: 'habit.screens-off',
      name: 'Screens off 30 min before bed',
      kind: 'check',
      target: null,
      unit: null,
      step: null,
      slot: 'night',
      tier: 'extra',
      order: 10,
    },
  ];
}
