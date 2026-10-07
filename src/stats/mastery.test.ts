import { describe, expect, it } from 'vitest';
import type { CardRecord } from '@/data/cards';
import type { Item } from '@/content/types';
import {
  combineMastery,
  MASTERED_DAYS,
  masteryOf,
  SOLID_DAYS,
  strengthOf,
} from '@/stats/mastery';

const NOW = Date.UTC(2026, 0, 15);

function card(over: Partial<CardRecord> = {}): CardRecord {
  return {
    id: 'i',
    topicId: 't',
    subject: 'chem',
    due: NOW,
    stability: 1,
    difficulty: 5,
    elapsedDays: 0,
    scheduledDays: 1,
    learningSteps: 0,
    reps: 1,
    lapses: 0,
    state: 1,
    lastReview: NOW,
    everCorrect: true,
    updatedAt: NOW,
    ...over,
  };
}

function items(n: number): Item[] {
  return Array.from(
    { length: n },
    (_, i) =>
      ({
        id: `i${i}`,
        tier: 'standard',
        type: 'numeric',
        depth: 'both',
        prompt: 'p',
        answer: { value: 1, unit: null, sigFigs: null },
        solution: [{ text: 'a step long enough to pass' }],
        source: 'original',
        verified: true,
      }) as Item,
  );
}

function cardsFor(entries: [string, Partial<CardRecord>][]) {
  return new Map(
    entries.map(([id, over]) => [id, card({ id, ...over })]),
  );
}

describe('strengthOf', () => {
  it('calls an unstudied item new', () => {
    expect(strengthOf(undefined)).toBe('new');
  });

  it('calls a never-correct item struggling, however stable', () => {
    // A card can be in review having only ever been failed.
    expect(strengthOf(card({ everCorrect: false, stability: 100 }))).toBe(
      'struggling',
    );
  });

  it('calls a low-stability item learning', () => {
    expect(strengthOf(card({ stability: 2 }))).toBe('learning');
  });

  it('calls a week-stable item solid', () => {
    expect(strengthOf(card({ stability: SOLID_DAYS }))).toBe('solid');
  });

  it('calls a three-week-stable item mastered', () => {
    expect(strengthOf(card({ stability: MASTERED_DAYS }))).toBe('mastered');
  });

  it('uses stability rather than how many times it was answered', () => {
    // Answering something right five times in one sitting is not knowing it.
    const crammed = card({ reps: 50, stability: 1 });
    expect(strengthOf(crammed)).toBe('learning');
  });
});

describe('masteryOf', () => {
  const four = items(4);

  it('is untouched with no cards', () => {
    const m = masteryOf(four, new Map());
    expect(m.stage).toBe('untouched');
    expect(m.seen).toBe(0);
    expect(m.score).toBe(0);
  });

  it('is seedling after a first look', () => {
    const m = masteryOf(four, cardsFor([['i0', { stability: 1 }]]));
    expect(m.stage).toBe('seedling');
    expect(m.seen).toBe(1);
  });

  it('is flowering only when every item is mastered', () => {
    const all = cardsFor(
      four.map((i) => [i.id, { stability: 40 }] as [string, Partial<CardRecord>]),
    );
    const m = masteryOf(four, all);
    expect(m.stage).toBe('flowering');
    expect(m.mastered).toBe(4);
  });

  it('is not flowering while one item lags behind', () => {
    const almost = cardsFor([
      ['i0', { stability: 40 }],
      ['i1', { stability: 40 }],
      ['i2', { stability: 40 }],
      ['i3', { stability: 1 }],
    ]);
    expect(masteryOf(four, almost).stage).not.toBe('flowering');
  });

  it('climbs through the stages as stability grows', () => {
    const stages = [1, 5, 10, 30].map((stability) => {
      const all = cardsFor(
        four.map(
          (i) => [i.id, { stability }] as [string, Partial<CardRecord>],
        ),
      );
      return masteryOf(four, all).stage;
    });
    expect(stages).toEqual(['sprout', 'sprout', 'budding', 'flowering']);
  });

  it('scores a struggling item above an untouched one but barely', () => {
    const struggling = masteryOf(
      four,
      cardsFor([['i0', { everCorrect: false }]]),
    );
    expect(struggling.score).toBeGreaterThan(0);
    expect(struggling.score).toBeLessThan(0.1);
    expect(struggling.mastered).toBe(0);
  });

  it('handles a topic with no items', () => {
    expect(masteryOf([], new Map())).toMatchObject({
      stage: 'untouched',
      total: 0,
    });
  });
});

describe('combineMastery', () => {
  it('is untouched when nothing has been started', () => {
    const parts = [masteryOf(items(3), new Map()), masteryOf(items(2), new Map())];
    expect(combineMastery(parts).stage).toBe('untouched');
  });

  it('adds up totals across topics', () => {
    const combined = combineMastery([
      masteryOf(items(3), new Map()),
      masteryOf(items(5), new Map()),
    ]);
    expect(combined.total).toBe(8);
  });

  it('weights by item count rather than treating topics equally', () => {
    const big = items(10);
    const small = items(2);
    const bigDone = cardsFor(
      big.map((i) => [i.id, { stability: 40 }] as [string, Partial<CardRecord>]),
    );

    const combined = combineMastery([
      masteryOf(big, bigDone),
      masteryOf(small, new Map()),
    ]);

    // 10 of 12 items fully mastered, so the score should be near 10/12.
    expect(combined.score).toBeCloseTo(10 / 12, 5);
    expect(combined.mastered).toBe(10);
  });

  it('copes with an empty list', () => {
    expect(combineMastery([])).toMatchObject({ stage: 'untouched', total: 0 });
  });
});
