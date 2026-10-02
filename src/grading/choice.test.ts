import { describe, expect, it } from 'vitest';
import { gradeChoice, type ChoiceAnswerSpec } from '@/grading/choice';

const spec: ChoiceAnswerSpec = {
  correctId: 'b',
  options: [
    { id: 'a', text: 'It gains electrons', why: 'That is reduction, not oxidation.' },
    { id: 'b', text: 'It loses electrons' },
    { id: 'c', text: 'It gains protons', why: 'Proton count defines the element.' },
  ],
};

describe('gradeChoice', () => {
  it('accepts the correct option', () => {
    expect(gradeChoice('b', spec)).toEqual({
      correct: true,
      chosen: spec.options[1],
      explanation: null,
    });
  });

  it('returns the distractor explanation for a wrong option', () => {
    const verdict = gradeChoice('a', spec);
    expect(verdict.correct).toBe(false);
    expect(verdict.explanation).toBe('That is reduction, not oxidation.');
  });

  it('tolerates a distractor with no authored explanation', () => {
    const bare: ChoiceAnswerSpec = {
      correctId: 'a',
      options: [
        { id: 'a', text: 'yes' },
        { id: 'b', text: 'no' },
      ],
    };
    expect(gradeChoice('b', bare).explanation).toBeNull();
  });

  it('handles an unknown option id', () => {
    expect(gradeChoice('zzz', spec)).toEqual({
      correct: false,
      chosen: null,
      explanation: null,
    });
  });
});
