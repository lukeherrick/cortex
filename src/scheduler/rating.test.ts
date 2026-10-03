import { describe, expect, it } from 'vitest';
import { Rating } from 'ts-fsrs';
import { countsAsCorrect, toGrade, type Outcome } from '@/scheduler/rating';

const auto = (correct: boolean, nearMiss = false): Outcome => ({
  kind: 'auto',
  correct,
  nearMiss,
});

describe('toGrade — auto-graded answers', () => {
  it('maps a clean correct answer to Good', () => {
    expect(toGrade(auto(true))).toBe(Rating.Good);
  });

  it('maps a plain wrong answer to Again', () => {
    expect(toGrade(auto(false))).toBe(Rating.Again);
  });

  it('maps a near miss to Hard, not Again', () => {
    // Right chemistry, wrong sig figs. Burying it for a week would be wrong,
    // and so would treating it as a clean success.
    expect(toGrade(auto(false, true))).toBe(Rating.Hard);
  });

  it('never returns Easy for an auto-graded answer', () => {
    // Easy is a claim only the learner can make about their own recall.
    for (const outcome of [auto(true), auto(false), auto(false, true)]) {
      expect(toGrade(outcome)).not.toBe(Rating.Easy);
    }
  });
});

describe('toGrade — self-rated answers', () => {
  it.each([
    ['again', Rating.Again],
    ['hard', Rating.Hard],
    ['good', Rating.Good],
    ['easy', Rating.Easy],
  ] as const)('passes %s straight through', (rating, expected) => {
    expect(toGrade({ kind: 'self', rating })).toBe(expected);
  });
});

describe('countsAsCorrect', () => {
  it('counts a clean correct answer', () => {
    expect(countsAsCorrect(auto(true))).toBe(true);
  });

  it('does not count a near miss', () => {
    // Gating means "understood well enough to build on". Losing every sig fig
    // is not that.
    expect(countsAsCorrect(auto(false, true))).toBe(false);
  });

  it('does not count a wrong answer', () => {
    expect(countsAsCorrect(auto(false))).toBe(false);
  });

  it.each([
    ['again', false],
    ['hard', true],
    ['good', true],
    ['easy', true],
  ] as const)('treats self-rating %s as correct=%s', (rating, expected) => {
    expect(countsAsCorrect({ kind: 'self', rating })).toBe(expected);
  });
});
