export interface ParsedNumeric {
  valueText: string;
  value: number;
  unit: string;
}

const LEADING_NUMBER =
  /^\s*([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)\s*(.*?)\s*$/;

/** Thousands separators: a comma between a digit and exactly three digits. */
const THOUSANDS = /(\d),(\d{3})(?!\d)/g;

/** Handwritten scientific notation: 6.02 x 10^23, 2.5 × 10^-3, 4*10^8. */
const WRITTEN_EXPONENT = /(\d(?:\.\d*)?)\s*[x×*]\s*10\s*\^?\s*([+-]?\d+)/i;

/**
 * Rewrite the ways students actually type numbers into a form the parser
 * accepts. Rejecting "1,200 mol" or "6.02 x 10^23" as unreadable would blame
 * the learner for notation their textbook uses.
 */
export function normaliseNumericText(raw: string): string {
  let text = raw.trim();
  // Applied repeatedly so 1,234,567 collapses fully.
  let previous: string;
  do {
    previous = text;
    text = text.replace(THOUSANDS, '$1$2');
  } while (text !== previous);
  return text.replace(WRITTEN_EXPONENT, '$1e$2');
}

/** Split a typed answer into its written number and its unit. */
export function parseNumericInput(raw: string): ParsedNumeric | null {
  const match = LEADING_NUMBER.exec(normaliseNumericText(raw));
  if (!match) return null;

  const valueText = match[1];
  const value = Number(valueText);
  if (!Number.isFinite(value)) return null;

  return { valueText, value, unit: match[2] };
}
