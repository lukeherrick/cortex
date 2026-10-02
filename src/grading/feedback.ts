import { parseNumericInput } from '@/grading/parseNumeric';
import { countSigFigs } from '@/grading/sigfigs';
import type { NumericAnswerSpec, NumericVerdict } from '@/grading/numeric';

/**
 * One sentence naming exactly which check failed.
 *
 * A bare "incorrect" throws away the most useful diagnostic the grader has:
 * that the chemistry was right and only the significant figures were wrong.
 */
export function describeNumericVerdict(
  verdict: NumericVerdict,
  spec: NumericAnswerSpec,
  raw: string,
): string {
  if (verdict.unparseable) {
    return "Couldn't read that as a number. Enter a value and a unit, like 0.450 mol.";
  }
  if (verdict.overall) return 'Correct.';
  if (verdict.value === 'incorrect') return 'Not correct.';

  if (verdict.unit === 'missing') {
    return `Value correct — no unit given. Expected ${spec.unit}.`;
  }
  if (verdict.unit === 'incorrect') {
    return `Value correct — wrong unit. Expected ${spec.unit}.`;
  }

  const parsed = parseNumericInput(raw);
  const given = parsed ? countSigFigs(parsed.valueText) : 0;
  return `Value and units correct — significant figures wrong (you gave ${given}, expected ${spec.sigFigs}).`;
}
