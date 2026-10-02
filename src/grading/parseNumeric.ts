export interface ParsedNumeric {
  valueText: string;
  value: number;
  unit: string;
}

const LEADING_NUMBER =
  /^\s*([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)\s*(.*?)\s*$/;

/** Split a typed answer into its written number and its unit. */
export function parseNumericInput(raw: string): ParsedNumeric | null {
  const match = LEADING_NUMBER.exec(raw);
  if (!match) return null;

  const valueText = match[1];
  const value = Number(valueText);
  if (!Number.isFinite(value)) return null;

  return { valueText, value, unit: match[2] };
}
