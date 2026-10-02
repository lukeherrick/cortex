import { describe, expect, it } from 'vitest';
import { describeNumericVerdict } from '@/grading/feedback';
import { gradeNumeric, type NumericAnswerSpec } from '@/grading/numeric';

const spec: NumericAnswerSpec = { value: 0.45, unit: 'mol', sigFigs: 3 };

function describe_(raw: string): string {
  return describeNumericVerdict(gradeNumeric(raw, spec), spec, raw);
}

describe('describeNumericVerdict', () => {
  it('congratulates a fully correct answer', () => {
    expect(describe_('0.450 mol')).toBe('Correct.');
  });

  it('names a sig-fig shortfall and keeps the credit', () => {
    expect(describe_('0.45 mol')).toBe(
      'Value and units correct — significant figures wrong (you gave 2, expected 3).',
    );
  });

  it('names an excess of sig figs', () => {
    expect(describe_('0.45000 mol')).toBe(
      'Value and units correct — significant figures wrong (you gave 5, expected 3).',
    );
  });

  it('names a missing unit', () => {
    expect(describe_('0.450')).toBe('Value correct — no unit given. Expected mol.');
  });

  it('names a wrong unit', () => {
    expect(describe_('0.450 g')).toBe('Value correct — wrong unit. Expected mol.');
  });

  it('reports a wrong value plainly', () => {
    expect(describe_('0.900 mol')).toBe('Not correct.');
  });

  it('asks for a number when the input could not be read', () => {
    expect(describe_('no idea')).toBe(
      "Couldn't read that as a number. Enter a value and a unit, like 0.450 mol.",
    );
  });
});
