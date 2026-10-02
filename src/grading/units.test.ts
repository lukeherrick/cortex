import { describe, expect, it } from 'vitest';
import { normaliseUnit, unitsMatch } from '@/grading/units';

describe('normaliseUnit', () => {
  it.each([
    ['  mol ', 'mol'],
    ['g / mol', 'g/mol'],
    ['g·mol', 'g*mol'],
    ['g⋅mol', 'g*mol'],
    ['m s', 'm*s'],
    ['cm²', 'cm^2'],
    ['m³', 'm^3'],
    ['kJ  /  mol', 'kJ/mol'],
  ])('normalises %s to %s', (input, expected) => {
    expect(normaliseUnit(input)).toBe(expected);
  });

  it('preserves case', () => {
    expect(normaliseUnit('M')).toBe('M');
    expect(normaliseUnit('m')).toBe('m');
  });
});

describe('unitsMatch', () => {
  it('matches equivalent spellings', () => {
    expect(unitsMatch('g / mol', 'g/mol')).toBe(true);
  });

  it('rejects a different unit', () => {
    expect(unitsMatch('g', 'mol')).toBe(false);
  });

  it('distinguishes molar from molal', () => {
    expect(unitsMatch('m', 'M')).toBe(false);
  });

  it('accepts an authored alternative spelling', () => {
    expect(unitsMatch('g mol^-1', 'g/mol', ['g mol^-1'])).toBe(true);
  });
});
