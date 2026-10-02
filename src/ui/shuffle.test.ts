import { describe, expect, it } from 'vitest';
import { shuffle } from '@/ui/shuffle';

describe('shuffle', () => {
  it('keeps every element', () => {
    const input = ['a', 'b', 'c', 'd'];
    expect([...shuffle(input)].sort()).toEqual(['a', 'b', 'c', 'd']);
  });

  it('does not mutate the input', () => {
    const input = ['a', 'b', 'c'];
    shuffle(input, () => 0);
    expect(input).toEqual(['a', 'b', 'c']);
  });

  it('is deterministic given a fixed random source', () => {
    // random() === 0 picks j = 0 at every step:
    //   i=2: swap [2] and [0] -> c b a
    //   i=1: swap [1] and [0] -> b c a
    expect(shuffle(['a', 'b', 'c'], () => 0)).toEqual(['b', 'c', 'a']);
  });

  it('leaves order untouched when random picks the last index', () => {
    const almostOne = () => 0.999999;
    expect(shuffle(['a', 'b', 'c'], almostOne)).toEqual(['a', 'b', 'c']);
  });

  it('handles empty and single-element arrays', () => {
    expect(shuffle([])).toEqual([]);
    expect(shuffle(['only'])).toEqual(['only']);
  });

  it('actually reorders across many runs', () => {
    const seen = new Set(
      Array.from({ length: 200 }, () => shuffle(['a', 'b', 'c']).join('')),
    );
    expect(seen.size).toBeGreaterThan(1);
  });
});
