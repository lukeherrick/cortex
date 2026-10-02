import { describe, expect, it } from 'vitest';
import {
  advance,
  isWritten,
  revealModelAnswer,
  startSession,
  submitAnswer,
} from '@/session/machine';
import { findTopic, itemsAtDepth, loadBundle } from '@/content';

const bundle = loadBundle();
const chem = findTopic(bundle, 'chem.stoich.mole-ratio')!;
const items = itemsAtDepth(chem, 'honors');

const water = findTopic(bundle, 'bio.col.water-properties')!;
const written = itemsAtDepth(water, 'level1').filter(isWritten);

describe('session machine — auto-graded items', () => {
  it('starts on the first item, answering', () => {
    const state = startSession(items);
    expect(state.index).toBe(0);
    expect(state.phase).toBe('answering');
    expect(state.lastResult).toBeNull();
  });

  it('finishes immediately with no items', () => {
    expect(startSession([]).phase).toBe('finished');
  });

  it('moves to reviewing after an answer and records the result', () => {
    const state = submitAnswer(startSession(items), '3.00 mol');
    expect(state.phase).toBe('reviewing');
    expect(state.lastResult?.correct).toBe(true);
    expect(state.lastResult?.rating).toBeNull();
    expect(state.results).toHaveLength(1);
  });

  it('gives sig-fig specific feedback', () => {
    const state = submitAnswer(startSession(items), '3 mol');
    expect(state.lastResult?.correct).toBe(false);
    expect(state.lastResult?.feedback).toMatch(/significant figures/i);
  });

  it('advances to the next item and clears the last result', () => {
    const answered = submitAnswer(startSession(items), '3.00 mol');
    const next = advance(answered);
    expect(next.index).toBe(1);
    expect(next.phase).toBe('answering');
    expect(next.lastResult).toBeNull();
    expect(next.results).toHaveLength(1);
  });

  it('ignores a submit while reviewing', () => {
    const reviewing = submitAnswer(startSession(items), '3.00 mol');
    expect(submitAnswer(reviewing, '999')).toBe(reviewing);
  });

  it('grades a multiple-choice item by option id', () => {
    const mcq = items.filter((i) => i.type === 'mcq');
    const state = submitAnswer(startSession(mcq), 'c');
    expect(state.lastResult?.correct).toBe(true);
  });

  it('surfaces the distractor explanation for a wrong choice', () => {
    const mcq = items.filter((i) => i.type === 'mcq');
    const state = submitAnswer(startSession(mcq), 'a');
    expect(state.lastResult?.correct).toBe(false);
    expect(state.lastResult?.feedback).toMatch(/same ratio/i);
  });

  it('ignores reveal for an auto-graded item', () => {
    const state = startSession(items);
    expect(revealModelAnswer(state, 'whatever')).toBe(state);
  });
});

describe('session machine — written items', () => {
  it('has written items to test against', () => {
    expect(written.length).toBeGreaterThan(0);
  });

  it('refuses to grade a written item without a reveal first', () => {
    const state = startSession(written);
    expect(submitAnswer(state, 'water is polar')).toBe(state);
  });

  it('reveal moves to selfGrading and holds the draft', () => {
    const state = revealModelAnswer(startSession(written), 'water is polar');
    expect(state.phase).toBe('selfGrading');
    expect(state.draft).toBe('water is polar');
    expect(state.results).toHaveLength(0);
  });

  it('refuses to commit from selfGrading without a rating', () => {
    const revealed = revealModelAnswer(startSession(written), 'attempt');
    expect(submitAnswer(revealed, 'attempt')).toBe(revealed);
  });

  it('records the learner rating rather than inventing one', () => {
    const revealed = revealModelAnswer(startSession(written), 'attempt');
    const rated = submitAnswer(revealed, revealed.draft, 'hard');
    expect(rated.phase).toBe('reviewing');
    expect(rated.lastResult?.rating).toBe('hard');
    expect(rated.lastResult?.correct).toBe(true);
  });

  it('treats "again" as not recalled', () => {
    const revealed = revealModelAnswer(startSession(written), 'attempt');
    const rated = submitAnswer(revealed, revealed.draft, 'again');
    expect(rated.lastResult?.rating).toBe('again');
    expect(rated.lastResult?.correct).toBe(false);
  });

  it('keeps the written attempt on the result', () => {
    const revealed = revealModelAnswer(startSession(written), 'my words');
    const rated = submitAnswer(revealed, revealed.draft, 'good');
    expect(rated.lastResult?.response).toBe('my words');
  });

  it('keeps an empty attempt rather than discarding it', () => {
    const revealed = revealModelAnswer(startSession(written), '');
    const rated = submitAnswer(revealed, revealed.draft, 'again');
    expect(rated.lastResult?.response).toBe('');
  });

  it('clears the draft on advance', () => {
    const revealed = revealModelAnswer(startSession(written), 'attempt');
    const rated = submitAnswer(revealed, revealed.draft, 'good');
    expect(advance(rated).draft).toBe('');
  });
});

describe('session machine — mixed session', () => {
  const mixed = itemsAtDepth(water, 'level1');

  it('finishes after the last item', () => {
    let state = startSession(mixed);
    for (let i = 0; i < mixed.length; i += 1) {
      const item = state.items[state.index];
      state = isWritten(item)
        ? submitAnswer(revealModelAnswer(state, 'x'), 'x', 'good')
        : submitAnswer(state, 'x');
      state = advance(state);
    }
    expect(state.phase).toBe('finished');
    expect(state.results).toHaveLength(mixed.length);
  });
});
