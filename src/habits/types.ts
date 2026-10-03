/** How a habit is logged. */
export type HabitKind =
  /** One tap. Wash face, stretch. */
  | 'check'
  /** Increment toward a target. Water, 3 L, a glass at a time. */
  | 'count'
  /** Enter one number. Sleep hours, step count. */
  | 'value';

/**
 * When the habit belongs in the day. The dashboard surfaces the slot matching
 * the current time rather than one undifferentiated list.
 */
export type HabitSlot = 'morning' | 'night' | 'anytime' | 'on-study-start';

/**
 * `core` counts toward a perfect day and the main streak. `extra` is tracked
 * and individually streaked but cannot break a perfect day.
 *
 * This tiering is the over-tracking safeguard: a ten-item all-or-nothing grid
 * turns one bad day into a broken streak, and that is when people stop opening
 * a habit tracker.
 */
export type HabitTier = 'core' | 'extra';

export interface Habit {
  id: string;
  name: string;
  kind: HabitKind;
  /** Required for `count` and `value`; null for `check`. */
  target: number | null;
  /** Display unit, e.g. "L" or "h". Null for `check`. */
  unit: string | null;
  /** Increment per tap for `count`. Null otherwise. */
  step: number | null;
  slot: HabitSlot;
  tier: HabitTier;
  /** Weekdays (0 = Sunday) this applies to. Null means every day. */
  days: readonly number[] | null;
  archived: boolean;
  order: number;
  updatedAt: number;
}

export interface HabitEntry {
  /** `${habitId}:${date}` — one entry per habit per day. */
  id: string;
  habitId: string;
  /** Local calendar date, YYYY-MM-DD. */
  date: string;
  /** `check`: 0 or 1. `count`/`value`: the amount logged. */
  value: number;
  updatedAt: number;
}

export const SLOT_LABEL: Record<HabitSlot, string> = {
  morning: 'Morning',
  night: 'Night',
  anytime: 'Any time',
  'on-study-start': 'When you start studying',
};
