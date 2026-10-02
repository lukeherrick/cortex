import { describe, expect, it } from 'vitest';
import { countSigFigs } from '@/grading/sigfigs';

describe('countSigFigs', () => {
  it.each([
    ['1234', 4],
    ['5', 1],
    ['1200', 2],
    ['1200.', 4],
    ['1200.0', 5],
    ['0.00123', 3],
    ['0.001230', 4],
    ['1.2300', 5],
    ['100.0', 4],
    ['0.5', 1],
    ['-0.00450', 3],
    ['+12.0', 3],
    ['1.20e3', 3],
    ['1.20E-5', 3],
    ['9e9', 1],
    ['0', 1],
    ['0.0', 1],
    ['0.00', 2],
    ['  42.0  ', 3],
  ])('counts %s as %i sig figs', (input, expected) => {
    expect(countSigFigs(input as string)).toBe(expected);
  });

  it.each(['', 'abc', '1.2.3', '1e', 'NaN', 'Infinity'])(
    'rejects %s',
    (input) => {
      expect(() => countSigFigs(input)).toThrow(RangeError);
    },
  );
});
