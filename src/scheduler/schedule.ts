import { createEmptyCard, fsrs, type Card } from 'ts-fsrs';
import type { CardRecord } from '@/data/db';
import type { Subject } from '@/content/types';
import { countsAsCorrect, toGrade, type Outcome } from '@/scheduler/rating';

const engine = fsrs();

export interface CardMeta {
  itemId: string;
  topicId: string;
  subject: Subject;
}

function toLibraryCard(record: CardRecord): Card {
  return {
    due: new Date(record.due),
    stability: record.stability,
    difficulty: record.difficulty,
    elapsed_days: record.elapsedDays,
    scheduled_days: record.scheduledDays,
    learning_steps: record.learningSteps,
    reps: record.reps,
    lapses: record.lapses,
    state: record.state,
    last_review:
      record.lastReview === null ? undefined : new Date(record.lastReview),
  };
}

function toRecord(
  card: Card,
  meta: CardMeta,
  everCorrect: boolean,
  now: number,
): CardRecord {
  return {
    id: meta.itemId,
    topicId: meta.topicId,
    subject: meta.subject,
    due: card.due.getTime(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsedDays: card.elapsed_days,
    scheduledDays: card.scheduled_days,
    learningSteps: card.learning_steps,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state,
    lastReview: card.last_review ? card.last_review.getTime() : null,
    everCorrect,
    updatedAt: now,
  };
}

/** A brand-new, never-studied card for an item. */
export function freshCard(meta: CardMeta, now: number): CardRecord {
  return toRecord(createEmptyCard(new Date(now)), meta, false, now);
}

/**
 * Apply an answer to a card and return its new state.
 *
 * Pure: takes the existing record (or undefined for a first encounter) and
 * hands back the next one. Persisting is the caller's job.
 */
export function reviewCard(
  existing: CardRecord | undefined,
  meta: CardMeta,
  outcome: Outcome,
  now: number,
): CardRecord {
  const current = existing ?? freshCard(meta, now);
  const { card } = engine.next(
    toLibraryCard(current),
    new Date(now),
    toGrade(outcome),
  );
  const everCorrect = current.everCorrect || countsAsCorrect(outcome);
  return toRecord(card, meta, everCorrect, now);
}

export function isDue(card: CardRecord, now: number): boolean {
  return card.due <= now;
}

/** Whole days until this card comes back. Negative means overdue. */
export function daysUntilDue(card: CardRecord, now: number): number {
  return Math.round((card.due - now) / 86_400_000);
}
