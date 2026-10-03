import { Rating, type Grade } from 'ts-fsrs';
import type { SelfRating } from '@/grading/freeResponse';

/**
 * What happened when an item was answered, in the only terms the scheduler
 * needs. Kept as plain data so `scheduler` never imports `session` or
 * `grading` — the dependency runs the other way.
 */
export type Outcome =
  | {
      kind: 'auto';
      correct: boolean;
      /**
       * Right answer, wrong presentation — correct value but wrong significant
       * figures or units. Worth distinguishing: the chemistry was understood,
       * so burying it for a week would be wrong, but so would treating it as a
       * clean success.
       */
      nearMiss: boolean;
    }
  | { kind: 'self'; rating: SelfRating };

const SELF_TO_GRADE: Record<SelfRating, Grade> = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
};

/** Translate an answer outcome into an FSRS grade. */
export function toGrade(outcome: Outcome): Grade {
  if (outcome.kind === 'self') return SELF_TO_GRADE[outcome.rating];
  if (outcome.correct) return Rating.Good;
  return outcome.nearMiss ? Rating.Hard : Rating.Again;
}

/**
 * Whether an outcome counts as "got it" for prerequisite gating.
 *
 * A near miss does not count. The point of gating is that you understood the
 * topic well enough to build on it, and losing every sig fig is not that.
 */
export function countsAsCorrect(outcome: Outcome): boolean {
  if (outcome.kind === 'self') return outcome.rating !== 'again';
  return outcome.correct;
}

export { Rating };
export type { Grade };
