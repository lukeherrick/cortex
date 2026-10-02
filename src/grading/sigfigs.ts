const DECIMAL = /^[+-]?(?:\d+\.?\d*|\.\d+)$/;
const SCIENTIFIC = /^([+-]?(?:\d+\.?\d*|\.\d+))[eE]([+-]?\d+)$/;

/**
 * Count the significant figures in a written number.
 * Operates on the string, not the value: "1200" and "1200." differ.
 */
export function countSigFigs(input: string): number {
  const text = input.trim();
  if (text === '') throw new RangeError(`Not a number: "${input}"`);

  const scientific = SCIENTIFIC.exec(text);
  if (scientific) return countSigFigs(scientific[1]);

  if (!DECIMAL.test(text)) throw new RangeError(`Not a number: "${input}"`);

  const unsigned = text.replace(/^[+-]/, '');
  const hasPoint = unsigned.includes('.');
  const [whole, fraction = ''] = unsigned.split('.');
  const digits = whole + fraction;

  if (/^0*$/.test(digits)) return Math.max(1, fraction.length);

  const withoutLeadingZeros = digits.replace(/^0+/, '');
  if (hasPoint) return withoutLeadingZeros.length;
  return withoutLeadingZeros.replace(/0+$/, '').length;
}
