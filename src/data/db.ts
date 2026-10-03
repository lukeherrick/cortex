import Dexie, { type EntityTable } from 'dexie';
import type { Habit, HabitEntry } from '@/habits/types';
import type { DayRecord } from '@/stats/streak';

export interface AttemptRecord {
  id: string;
  itemId: string;
  topicId: string;
  answeredAt: number;
  correct: boolean;
  response: string;
  updatedAt: number;
}

export interface SettingRecord {
  id: string;
  value: unknown;
  updatedAt: number;
}

/**
 * Spaced-repetition state for one item.
 *
 * Dates are stored as epoch milliseconds rather than `Date` objects: numbers
 * index cleanly in IndexedDB, survive JSON export without timezone surprises,
 * and keep the record shape ready for the sync adapter. The scheduler converts
 * to and from the library's `Date`-based shape at its own boundary.
 */
export interface CardRecord {
  /** The item id. One card per item. */
  id: string;
  topicId: string;
  subject: 'bio' | 'chem';
  due: number;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  learningSteps: number;
  reps: number;
  lapses: number;
  state: number;
  lastReview: number | null;
  /**
   * Whether this item has ever been answered correctly. Prerequisite gating
   * needs "has been got right at least once", which FSRS state alone cannot
   * tell you — a card can be in review and still have only ever been failed.
   */
  everCorrect: boolean;
  updatedAt: number;
}

export const db = new Dexie('cortex') as Dexie & {
  attempts: EntityTable<AttemptRecord, 'id'>;
  settings: EntityTable<SettingRecord, 'id'>;
  cards: EntityTable<CardRecord, 'id'>;
  habits: EntityTable<Habit, 'id'>;
  habitEntries: EntityTable<HabitEntry, 'id'>;
  days: EntityTable<DayRecord, 'date'>;
};

db.version(1).stores({
  attempts: 'id, itemId, topicId, answeredAt',
  settings: 'id',
});

db.version(2).stores({
  attempts: 'id, itemId, topicId, answeredAt',
  settings: 'id',
  cards: 'id, topicId, subject, due',
});

db.version(3).stores({
  attempts: 'id, itemId, topicId, answeredAt',
  settings: 'id',
  cards: 'id, topicId, subject, due',
  habits: 'id, slot, tier, order',
  habitEntries: 'id, habitId, date',
  days: 'date',
});
