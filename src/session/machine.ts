import { gradeChoice } from '@/grading/choice';
import { describeNumericVerdict } from '@/grading/feedback';
import { recordFreeResponse, type SelfRating } from '@/grading/freeResponse';
import { gradeNumeric } from '@/grading/numeric';
import type { Item } from '@/content/types';

export type Phase = 'answering' | 'reviewing' | 'finished';

export interface ItemResult {
  itemId: string;
  correct: boolean;
  response: string;
  feedback: string;
}

export interface SessionState {
  items: readonly Item[];
  index: number;
  phase: Phase;
  lastResult: ItemResult | null;
  results: readonly ItemResult[];
}

export function startSession(items: readonly Item[]): SessionState {
  return {
    items,
    index: 0,
    phase: items.length === 0 ? 'finished' : 'answering',
    lastResult: null,
    results: [],
  };
}

function grade(
  item: Item,
  response: string,
  rating: SelfRating | undefined,
): { correct: boolean; feedback: string } {
  switch (item.type) {
    case 'numeric': {
      const verdict = gradeNumeric(response, item.answer);
      return {
        correct: verdict.overall,
        feedback: describeNumericVerdict(verdict, item.answer, response),
      };
    }
    case 'mcq': {
      const verdict = gradeChoice(response, item.answer);
      return {
        correct: verdict.correct,
        feedback: verdict.correct
          ? 'Correct.'
          : (verdict.explanation ?? 'Not correct.'),
      };
    }
    case 'frq':
    case 'recall': {
      const result = recordFreeResponse(response, rating ?? 'again');
      return {
        correct: result.correct,
        feedback: result.correct
          ? 'Marked as recalled.'
          : 'Marked for another look.',
      };
    }
  }
}

/** Answer the current item. No-op unless the session is in `answering`. */
export function submitAnswer(
  state: SessionState,
  response: string,
  rating?: SelfRating,
): SessionState {
  if (state.phase !== 'answering') return state;

  const item = state.items[state.index];
  const { correct, feedback } = grade(item, response, rating);
  const result: ItemResult = { itemId: item.id, correct, response, feedback };

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
    lastResult: null,
  };
}
