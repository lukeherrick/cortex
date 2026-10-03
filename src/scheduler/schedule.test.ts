import { describe, expect, it } from 'vitest';
import {
  daysUntilDue,
  freshCard,
  isDue,
  reviewCard,
  type CardMeta,
} from '@/scheduler/schedule';
import type { Outcome } from '@/scheduler/rating';

const meta: CardMeta = {
  itemId: 'chem.stoich.mole-ratio.i1',
  topicId: 'chem.stoich.mole-ratio',
  subject: 'chem',
};

const NOW = Date.UTC(2026, 0, 15, 12, 0, 0);
const DAY = 86_400_000;

const auto = (correct: boolean, nearMiss = false): Outcome => ({
  kind: 'auto',
  correct,
  nearMiss,
});

describe('freshCard', () => {
  it('is due immediately and carries the item identity', () => {
    const card = freshCard(meta, NOW);
    expect(card.id).toBe(meta.itemId);
    expect(card.topicId).toBe(meta.topicId);
    expect(card.subject).toBe('chem');
    expect(isDue(card, NOW)).toBe(true);
  });

  it('has never been answered correctly', () => {
    expect(freshCard(meta, NOW).everCorrect).toBe(false);
  });

  it('has no review history', () => {
    const card = freshCard(meta, NOW);
    expect(card.reps).toBe(0);
    expect(card.lapses).toBe(0);
    expect(card.lastReview).toBeNull();
  });
});

describe('reviewCard', () => {
  it('creates a card on a first encounter', () => {
    const card = reviewCard(undefined, meta, auto(true), NOW);
    expect(card.id).toBe(meta.itemId);
    expect(card.reps).toBe(1);
  });

  it('pushes the due date into the future on success', () => {
    const card = reviewCard(undefined, meta, auto(true), NOW);
    expect(card.due).toBeGreaterThan(NOW);
  });

  it('schedules a correct answer further out than a wrong one', () => {
    const good = reviewCard(undefined, meta, auto(true), NOW);
    const again = reviewCard(undefined, meta, auto(false), NOW);
    expect(good.due).toBeGreaterThan(again.due);
  });

  it('schedules a near miss between wrong and right', () => {
    const good = reviewCard(undefined, meta, auto(true), NOW);
    const near = reviewCard(undefined, meta, auto(false, true), NOW);
    const again = reviewCard(undefined, meta, auto(false), NOW);
    expect(near.due).toBeGreaterThanOrEqual(again.due);
    expect(near.due).toBeLessThanOrEqual(good.due);
  });

  it('stretches the interval as an item keeps being answered correctly', () => {
    let card = reviewCard(undefined, meta, auto(true), NOW);
    let previous = card.due - NOW;

    for (let i = 1; i <= 4; i += 1) {
      const at = card.due;
      card = reviewCard(card, meta, auto(true), at);
      const gap = card.due - at;
      expect(gap).toBeGreaterThanOrEqual(previous);
      previous = gap;
    }
    // After several clean reviews it should be weeks out, not hours.
    expect(previous).toBeGreaterThan(5 * DAY);
  });

  it('records a lapse and shortens the interval when a known item is failed', () => {
    let card = reviewCard(undefined, meta, auto(true), NOW);
    card = reviewCard(card, meta, auto(true), card.due);
    const longGap = card.due - NOW;

    const failed = reviewCard(card, meta, auto(false), card.due);
    expect(failed.lapses).toBeGreaterThan(card.lapses);
    expect(failed.due - card.due).toBeLessThan(longGap);
  });

  it('sets everCorrect on a correct answer and never unsets it', () => {
    const first = reviewCard(undefined, meta, auto(true), NOW);
    expect(first.everCorrect).toBe(true);

    const thenFailed = reviewCard(first, meta, auto(false), first.due);
    expect(thenFailed.everCorrect).toBe(true);
  });

  it('leaves everCorrect false while an item has only been failed', () => {
    const first = reviewCard(undefined, meta, auto(false), NOW);
    const second = reviewCard(first, meta, auto(false), first.due);
    expect(second.everCorrect).toBe(false);
  });

  it('accepts a self-rating', () => {
    const easy = reviewCard(
      undefined,
      meta,
      { kind: 'self', rating: 'easy' },
      NOW,
    );
    const good = reviewCard(
      undefined,
      meta,
      { kind: 'self', rating: 'good' },
      NOW,
    );
    expect(easy.due).toBeGreaterThan(good.due);
    expect(easy.everCorrect).toBe(true);
  });

  it('stamps updatedAt for the sync seam', () => {
    expect(reviewCard(undefined, meta, auto(true), NOW).updatedAt).toBe(NOW);
  });
});

describe('isDue and daysUntilDue', () => {
  it('treats a card due exactly now as due', () => {
    const card = { ...freshCard(meta, NOW), due: NOW };
    expect(isDue(card, NOW)).toBe(true);
  });

  it('treats a future card as not due', () => {
    const card = { ...freshCard(meta, NOW), due: NOW + DAY };
    expect(isDue(card, NOW)).toBe(false);
    expect(daysUntilDue(card, NOW)).toBe(1);
  });

  it('reports overdue cards as negative days', () => {
    const card = { ...freshCard(meta, NOW), due: NOW - 3 * DAY };
    expect(isDue(card, NOW)).toBe(true);
    expect(daysUntilDue(card, NOW)).toBe(-3);
  });
});
