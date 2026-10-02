export type SelfRating = 'again' | 'hard' | 'good' | 'easy';

export interface FreeResponseResult {
  attempt: string;
  rating: SelfRating;
  correct: boolean;
}

/**
 * Record a self-graded free-response attempt.
 *
 * The typed text is always retained, even when empty, so it can be re-read
 * later and so AI rubric grading can be added without losing history.
 */
export function recordFreeResponse(
  attempt: string,
  rating: SelfRating,
): FreeResponseResult {
  return { attempt, rating, correct: rating !== 'again' };
}
