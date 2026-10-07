import type { CardRecord } from '@/data/cards';
import type { Item } from '@/content/types';

/**
 * How well one item is known, derived from real scheduling state.
 *
 * Deliberately built on FSRS **stability** — roughly the number of days until
 * recall drops to about 90% — rather than on a count of correct answers.
 * Answering something right five times in one sitting is not knowing it;
 * stability is the model's own estimate of how long it will survive, which is
 * the thing actually worth displaying.
 */
export type ItemStrength =
  | 'new'
  | 'struggling'
  | 'learning'
  | 'solid'
  | 'mastered';

/** Days of stability required to count as solid, and as mastered. */
export const SOLID_DAYS = 7;
export const MASTERED_DAYS = 21;

export function strengthOf(card: CardRecord | undefined): ItemStrength {
  if (!card) return 'new';
  if (!card.everCorrect) return 'struggling';
  if (card.stability >= MASTERED_DAYS) return 'mastered';
  if (card.stability >= SOLID_DAYS) return 'solid';
  return 'learning';
}

/**
 * A topic's visible stage.
 *
 * Growth imagery because it is honest about this being slow and cumulative,
 * and because a home screen full of things that visibly grow is worth opening.
 */
export type MasteryStage =
  | 'untouched'
  | 'seedling'
  | 'sprout'
  | 'budding'
  | 'flowering';

export interface TopicMastery {
  stage: MasteryStage;
  total: number;
  seen: number;
  mastered: number;
  /** 0 to 1, weighted by how strong each item is. Drives the progress bar. */
  score: number;
}

const WEIGHT: Record<ItemStrength, number> = {
  new: 0,
  struggling: 0.1,
  learning: 0.4,
  solid: 0.75,
  mastered: 1,
};

export function masteryOf(
  items: readonly Item[],
  cards: ReadonlyMap<string, CardRecord>,
): TopicMastery {
  const total = items.length;
  if (total === 0) {
    return { stage: 'untouched', total: 0, seen: 0, mastered: 0, score: 0 };
  }

  const strengths = items.map((item) => strengthOf(cards.get(item.id)));
  const seen = strengths.filter((s) => s !== 'new').length;
  const mastered = strengths.filter((s) => s === 'mastered').length;
  const score =
    strengths.reduce((sum, s) => sum + WEIGHT[s], 0) / total;

  let stage: MasteryStage;
  if (seen === 0) stage = 'untouched';
  else if (mastered === total) stage = 'flowering';
  else if (score >= 0.6) stage = 'budding';
  else if (score >= 0.25) stage = 'sprout';
  else stage = 'seedling';

  return { stage, total, seen, mastered, score };
}

export const STAGE_LABEL: Record<MasteryStage, string> = {
  untouched: 'Not started',
  seedling: 'Just started',
  sprout: 'Getting there',
  budding: 'Nearly there',
  flowering: 'Mastered',
};

/** Roll several topics up into one figure, for a unit or a whole subject. */
export function combineMastery(parts: readonly TopicMastery[]): TopicMastery {
  const total = parts.reduce((n, p) => n + p.total, 0);
  if (total === 0) {
    return { stage: 'untouched', total: 0, seen: 0, mastered: 0, score: 0 };
  }

  const seen = parts.reduce((n, p) => n + p.seen, 0);
  const mastered = parts.reduce((n, p) => n + p.mastered, 0);
  // Weighted by item count, so a 10-item topic counts more than a 3-item one.
  const score = parts.reduce((s, p) => s + p.score * p.total, 0) / total;

  let stage: MasteryStage;
  if (seen === 0) stage = 'untouched';
  else if (mastered === total) stage = 'flowering';
  else if (score >= 0.6) stage = 'budding';
  else if (score >= 0.25) stage = 'sprout';
  else stage = 'seedling';

  return { stage, total, seen, mastered, score };
}
