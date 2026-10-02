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

describe('parseNumericInput — notation students actually type', () => {
  it('strips thousands separators', () => {
    expect(parseNumericInput('1,200 mol')).toEqual({
      valueText: '1200',
      value: 1200,
      unit: 'mol',
    });
  });

  it('strips several thousands separators', () => {
    expect(parseNumericInput('1,234,567 g')?.value).toBe(1234567);
  });

  it('leaves a decimal comma alone rather than guessing', () => {
    // "0,5" is not US thousands notation; it must not silently become 05.
    expect(parseNumericInput('0,5 mol')?.value).toBe(0);
  });

  it.each([
    ['6.02 x 10^23 particles', 6.02e23],
    ['6.02 × 10^23 particles', 6.02e23],
    ['2.5*10^-3 M', 2.5e-3],
    ['4 x 10^8 m', 4e8],
  ])('reads %s as %d', (raw, expected) => {
    expect(parseNumericInput(raw)?.value).toBe(expected);
  });

  it('keeps sig figs correct through a thousands separator', () => {
    expect(parseNumericInput('1,200 mol')?.valueText).toBe('1200');
  });

  it('keeps sig figs correct through written scientific notation', () => {
    expect(parseNumericInput('6.02 x 10^23')?.valueText).toBe('6.02e23');
  });

  it('keeps the unit after rewriting the number', () => {
    expect(parseNumericInput('6.02 x 10^23 particles')?.unit).toBe('particles');
  });
});
