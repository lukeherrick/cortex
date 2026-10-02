import { describe, expect, it } from 'vitest';
import { advance, startSession, submitAnswer } from '@/session/machine';
import { findTopic, itemsAtDepth, loadBundle } from '@/content';

const bundle = loadBundle();
const chem = findTopic(bundle, 'chem.stoich.mole-ratio')!;
const items = itemsAtDepth(chem, 'honors');

describe('session machine', () => {
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

  it('finishes after the last item', () => {
    let state = startSession(items);
    for (let i = 0; i < items.length; i += 1) {
      state = advance(submitAnswer(state, 'x'));
    }
    expect(state.phase).toBe('finished');
    expect(state.results).toHaveLength(items.length);
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
});
