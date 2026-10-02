import { parseNumericInput } from '@/grading/parseNumeric';
import { countSigFigs } from '@/grading/sigfigs';
import { unitsMatch } from '@/grading/units';

export interface NumericAnswerSpec {
  value: number;
  unit: string | null;
  acceptedUnits?: readonly string[];
  sigFigs: number | null;
  tolerance?: number;
}

export interface NumericVerdict {
  value: 'correct' | 'incorrect';
  unit: 'correct' | 'incorrect' | 'missing' | 'notRequired';
  sigFigs: 'correct' | 'tooFew' | 'tooMany' | 'notChecked';
  overall: boolean;
  unparseable: boolean;
}

export const DEFAULT_TOLERANCE = 0.002;

function valueWithinTolerance(
  given: number,
  expected: number,
  tolerance: number,
): boolean {
  if (expected === 0) return Math.abs(given) <= tolerance;
  return Math.abs(given - expected) / Math.abs(expected) <= tolerance;
}

/** Grade a typed numeric answer on value, unit and significant figures. */
export function gradeNumeric(
  raw: string,
  spec: NumericAnswerSpec,
): NumericVerdict {
  const parsed = parseNumericInput(raw);
  if (!parsed) {
    return {
      value: 'incorrect',
      unit: spec.unit === null ? 'notRequired' : 'missing',
      sigFigs: spec.sigFigs === null ? 'notChecked' : 'tooFew',
      overall: false,
      unparseable: true,
    };
  }

  const tolerance = spec.tolerance ?? DEFAULT_TOLERANCE;
  const value: NumericVerdict['value'] = valueWithinTolerance(
    parsed.value,
    spec.value,
    tolerance,
  )
    ? 'correct'
    : 'incorrect';

  let unit: NumericVerdict['unit'];
  if (spec.unit === null) {
    unit = 'notRequired';
  } else if (parsed.unit === '') {
    unit = 'missing';
  } else {
    unit = unitsMatch(parsed.unit, spec.unit, spec.acceptedUnits)
      ? 'correct'
      : 'incorrect';
  }

  let sigFigs: NumericVerdict['sigFigs'];
  if (spec.sigFigs === null) {
    sigFigs = 'notChecked';
  } else {
    const given = countSigFigs(parsed.valueText);
    sigFigs =
      given === spec.sigFigs
        ? 'correct'
        : given < spec.sigFigs
          ? 'tooFew'
          : 'tooMany';
  }

  const overall =
    value === 'correct' &&
    (unit === 'correct' || unit === 'notRequired') &&
    (sigFigs === 'correct' || sigFigs === 'notChecked');

  return { value, unit, sigFigs, overall, unparseable: false };
}
