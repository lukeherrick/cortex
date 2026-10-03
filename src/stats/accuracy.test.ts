import { describe, expect, it } from 'vitest';
import type { AttemptRecord } from '@/data/attempts';
import type { CardRecord } from '@/data/cards';
import {
  accuracyOf,
  coverage,
  recentAccuracy,
  weakestTopics,
} from '@/stats/accuracy';

const NOW = Date.UTC(2026, 0, 15, 12);
const DAY = 86_400_000;

function attempt(
  topicId: string,
  correct: boolean,
  answeredAt = NOW,
): AttemptRecord {
  return {
    id: `${topicId}-${answeredAt}-${Math.random()}`,
    itemId: `${topicId}.i1`,
    topicId,
    answeredAt,
    correct,
    response: 'x',
    updatedAt: answeredAt,
  };
}

function card(id: string, everCorrect: boolean): CardRecord {
  return {
    id,
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
    everCorrect,
    updatedAt: NOW,
  };
}

describe('accuracyOf', () => {
  it('reports null rate when nothing has been attempted', () => {
    expect(accuracyOf([])).toEqual({ attempted: 0, correct: 0, rate: null });
  });

  it('computes a rate', () => {
    const a = [attempt('t', true), attempt('t', true), attempt('t', false)];
    const result = accuracyOf(a);
    expect(result.attempted).toBe(3);
    expect(result.correct).toBe(2);
    expect(result.rate).toBeCloseTo(2 / 3, 5);
  });
});

describe('recentAccuracy', () => {
  it('ignores attempts outside the window', () => {
    const a = [
      attempt('t', true, NOW),
      attempt('t', false, NOW - 30 * DAY),
    ];
    expect(recentAccuracy(a, NOW, 7).attempted).toBe(1);
  });

  it('includes everything inside the window', () => {
    const a = [
      attempt('t', true, NOW),
      attempt('t', false, NOW - 2 * DAY),
    ];
    expect(recentAccuracy(a, NOW, 7)).toMatchObject({
      attempted: 2,
      correct: 1,
    });
  });

  it('always counts today, even late in the day', () => {
    const a = [attempt('t', true, NOW)];
    expect(recentAccuracy(a, NOW, 1).attempted).toBe(1);
  });
});

describe('weakestTopics', () => {
  it('needs a minimum sample before calling a topic weak', () => {
    // One wrong answer is noise, not insight.
    const a = [attempt('lonely', false)];
    expect(weakestTopics(a, 4)).toEqual([]);
  });

  it('ranks worst first', () => {
    const a = [
      ...Array.from({ length: 4 }, () => attempt('good', true)),
      ...Array.from({ length: 3 }, () => attempt('bad', false)),
      attempt('bad', true),
    ];
    const ranked = weakestTopics(a, 4);
    expect(ranked.map((t) => t.topicId)).toEqual(['bad', 'good']);
    expect(ranked[0].rate).toBeCloseTo(0.25, 5);
  });

  it('reports the sample size alongside the rate', () => {
    const a = Array.from({ length: 5 }, (_, i) => attempt('t', i < 3));
    const [row] = weakestTopics(a, 4);
    expect(row).toMatchObject({ attempted: 5, correct: 3 });
  });
});

describe('coverage', () => {
  it('separates started from genuinely learned', () => {
    const cards = [card('a', true), card('b', false), card('c', true)];
    expect(coverage(10, cards)).toEqual({ total: 10, started: 3, learned: 2 });
  });

  it('handles an untouched corpus', () => {
    expect(coverage(88, [])).toEqual({ total: 88, started: 0, learned: 0 });
  });
});
