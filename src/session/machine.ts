import { gradeChoice } from '@/grading/choice';
import { describeNumericVerdict } from '@/grading/feedback';
import { recordFreeResponse, type SelfRating } from '@/grading/freeResponse';
import { gradeNumeric } from '@/grading/numeric';
import type { Item } from '@/content/types';

/**
 * `selfGrading` exists only for written items. The app cannot mark free
 * recall, so the flow is: attempt it, see the model answer and rubric, then
 * rate your own recall. Collapsing that into one step would mean inventing a
 * rating the learner never gave, which would feed the scheduler false data.
 */
export type Phase = 'answering' | 'selfGrading' | 'reviewing' | 'finished';

export interface ItemResult {
  itemId: string;
  correct: boolean;
  response: string;
  feedback: string;
  rating: SelfRating | null;
}

export interface SessionState {
  items: readonly Item[];
  index: number;
  phase: Phase;
  /** The written attempt, held between reveal and self-rating. */
  draft: string;
  lastResult: ItemResult | null;
  results: readonly ItemResult[];
}

export function isWritten(item: Item): boolean {
  return item.type === 'frq' || item.type === 'recall';
}

export function startSession(items: readonly Item[]): SessionState {
  return {
    items,
    index: 0,
    phase: items.length === 0 ? 'finished' : 'answering',
    draft: '',
    lastResult: null,
    results: [],
  };
}

/**
 * Reveal the model answer for a written item so the learner can rate their
 * own recall against it. No-op for auto-graded item types.
 */
export function revealModelAnswer(
  state: SessionState,
  attempt: string,
): SessionState {
  if (state.phase !== 'answering') return state;
  if (!isWritten(state.items[state.index])) return state;
  return { ...state, phase: 'selfGrading', draft: attempt };
}

function autoGrade(
  item: Item,
  response: string,
): { correct: boolean; feedback: string } {
  if (item.type === 'numeric') {
    const verdict = gradeNumeric(response, item.answer);
    return {
      correct: verdict.overall,
      feedback: describeNumericVerdict(verdict, item.answer, response),
    };
  }
  if (item.type === 'mcq') {
    const verdict = gradeChoice(response, item.answer);
    return {
      correct: verdict.correct,
      feedback: verdict.correct
        ? 'Correct.'
        : (verdict.explanation ?? 'Not correct.'),
    };
  }
  throw new Error(`autoGrade called for written item ${item.id}`);
}

const RATING_FEEDBACK: Record<SelfRating, string> = {
  again: "Marked as not recalled — you'll see this again soon.",
  hard: 'Marked as hard-won.',
  good: 'Marked as recalled.',
  easy: 'Marked as easy.',
};

/**
 * Commit an answer.
 *
 * From `answering`, grades an auto-gradable item. From `selfGrading`, applies
 * the learner's own rating to the held draft. A written item submitted
 * straight from `answering` is rejected — reveal the model answer first.
 */
export function submitAnswer(
  state: SessionState,
  response: string,
  rating?: SelfRating,
): SessionState {
  const item = state.items[state.index];

  let result: ItemResult;
  if (state.phase === 'answering') {
    if (isWritten(item)) return state;
    const { correct, feedback } = autoGrade(item, response);
    result = { itemId: item.id, correct, response, feedback, rating: null };
  } else if (state.phase === 'selfGrading') {
    if (!rating) return state;
    const graded = recordFreeResponse(state.draft, rating);
    result = {
      itemId: item.id,
      correct: graded.correct,
      response: graded.attempt,
      feedback: RATING_FEEDBACK[rating],
      rating,
    };
  } else {
    return state;
  }

  return {
    ...state,
    phase: 'reviewing',
    lastResult: result,
    results: [...state.results, result],
  };
}

/** Move past the worked solution to the next item, or finish. */
export function advance(state: SessionState): SessionState {
  if (state.phase !== 'reviewing') return state;
  const index = state.index + 1;
  return {
    ...state,
    index,
    phase: index >= state.items.length ? 'finished' : 'answering',
    draft: '',
    lastResult: null,
  };
}
