import { describe, expect, it } from 'vitest';
import { recordFreeResponse } from '@/grading/freeResponse';

describe('recordFreeResponse', () => {
  it('keeps the attempt text', () => {
    const result = recordFreeResponse('water is polar', 'good');
    expect(result.attempt).toBe('water is polar');
  });

  it.each([
    ['again', false],
    ['hard', true],
    ['good', true],
    ['easy', true],
  ] as const)('maps %s to correct=%s', (rating, correct) => {
    expect(recordFreeResponse('x', rating).correct).toBe(correct);
  });

  it('keeps an empty attempt rather than discarding it', () => {
    expect(recordFreeResponse('', 'again').attempt).toBe('');
  });
});
