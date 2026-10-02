import { describe, expect, it } from 'vitest';
import { gradeNumeric, type NumericAnswerSpec } from '@/grading/numeric';

const molSpec: NumericAnswerSpec = { value: 0.45, unit: 'mol', sigFigs: 3 };

describe('gradeNumeric', () => {
  it('accepts a fully correct answer', () => {
    expect(gradeNumeric('0.450 mol', molSpec)).toEqual({
      value: 'correct',
      unit: 'correct',
      sigFigs: 'correct',
      overall: true,
      unparseable: false,
    });
  });

  it('separates a sig-fig error from a value error', () => {
    const verdict = gradeNumeric('0.45 mol', molSpec);
    expect(verdict.value).toBe('correct');
    expect(verdict.unit).toBe('correct');
    expect(verdict.sigFigs).toBe('tooFew');
    expect(verdict.overall).toBe(false);
  });

  it('reports too many sig figs', () => {
    expect(gradeNumeric('0.45000 mol', molSpec).sigFigs).toBe('tooMany');
  });

  it('reports a missing unit', () => {
    expect(gradeNumeric('0.450', molSpec).unit).toBe('missing');
  });

  it('reports a wrong unit', () => {
    expect(gradeNumeric('0.450 g', molSpec).unit).toBe('incorrect');
  });

  it('reports a wrong value', () => {
    expect(gradeNumeric('0.900 mol', molSpec).value).toBe('incorrect');
  });

  it('honours the default relative tolerance', () => {
    // 0.4505 is 0.11% off — comfortably inside the 0.2% default.
    expect(gradeNumeric('0.4505 mol', molSpec).value).toBe('correct');
    // 0.4600 is 2.2% off — comfortably outside it.
    expect(gradeNumeric('0.4600 mol', molSpec).value).toBe('incorrect');
  });

  it('treats a value exactly on the tolerance boundary as correct', () => {
    // Floating point makes the exact boundary unreliable to assert from a
    // decimal string, so drive it through the spec instead.
    const spec: NumericAnswerSpec = { value: 100, unit: null, sigFigs: null, tolerance: 0.01 };
    expect(gradeNumeric('99', spec).value).toBe('correct');
    expect(gradeNumeric('98.9', spec).value).toBe('incorrect');
  });

  it('honours an authored tolerance', () => {
    const loose: NumericAnswerSpec = { ...molSpec, tolerance: 0.05 };
    expect(gradeNumeric('0.460 mol', loose).value).toBe('correct');
  });

  it('accepts an authored alternative unit spelling', () => {
    const spec: NumericAnswerSpec = {
      value: 18,
      unit: 'g/mol',
      acceptedUnits: ['g mol^-1'],
      sigFigs: 3,
    };
    expect(gradeNumeric('18.0 g mol^-1', spec).unit).toBe('correct');
  });

  it('skips the unit check for a dimensionless answer', () => {
    const spec: NumericAnswerSpec = { value: 7, unit: null, sigFigs: 1 };
    expect(gradeNumeric('7', spec)).toMatchObject({
      unit: 'notRequired',
      overall: true,
    });
  });

  it('skips the sig-fig check when not authored', () => {
    const spec: NumericAnswerSpec = { value: 7, unit: null, sigFigs: null };
    expect(gradeNumeric('7.0000', spec)).toMatchObject({
      sigFigs: 'notChecked',
      overall: true,
    });
  });

  it('handles an exact zero expected value', () => {
    const spec: NumericAnswerSpec = { value: 0, unit: null, sigFigs: null };
    expect(gradeNumeric('0', spec).value).toBe('correct');
    expect(gradeNumeric('0.1', spec).value).toBe('incorrect');
  });

  it('flags unparseable input without crashing', () => {
    const verdict = gradeNumeric('no idea', molSpec);
    expect(verdict.unparseable).toBe(true);
    expect(verdict.overall).toBe(false);
  });
});
