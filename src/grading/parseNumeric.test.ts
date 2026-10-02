import { describe, expect, it } from 'vitest';
import { parseNumericInput } from '@/grading/parseNumeric';

describe('parseNumericInput', () => {
  it('splits a value from its unit', () => {
    expect(parseNumericInput('0.450 mol')).toEqual({
      valueText: '0.450',
      value: 0.45,
      unit: 'mol',
    });
  });

  it('handles a missing unit', () => {
    expect(parseNumericInput('12.0')).toEqual({
      valueText: '12.0',
      value: 12,
      unit: '',
    });
  });

  it('handles scientific notation', () => {
    expect(parseNumericInput('6.02e23 particles')).toEqual({
      valueText: '6.02e23',
      value: 6.02e23,
      unit: 'particles',
    });
  });

  it('handles a compound unit with no space', () => {
    expect(parseNumericInput('18.0g/mol')).toEqual({
      valueText: '18.0',
      value: 18,
      unit: 'g/mol',
    });
  });

  it('handles a negative value', () => {
    expect(parseNumericInput('-285.8 kJ/mol')?.value).toBe(-285.8);
  });

  it.each(['', '   ', 'mol', 'about ten'])('rejects %s', (raw) => {
    expect(parseNumericInput(raw)).toBeNull();
  });
});
