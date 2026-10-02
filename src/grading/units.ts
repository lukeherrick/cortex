const SUPERSCRIPTS: Record<string, string> = {
  '¹': '^1',
  '²': '^2',
  '³': '^3',
  '⁴': '^4',
};

/** Canonical spelling of a unit. Case is significant and preserved. */
export function normaliseUnit(unit: string): string {
  let text = unit.trim();
  for (const [glyph, ascii] of Object.entries(SUPERSCRIPTS)) {
    text = text.split(glyph).join(ascii);
  }
  text = text.replace(/[·⋅*]/g, '*');
  text = text.replace(/\s*\/\s*/g, '/');
  text = text.replace(/\s*\*\s*/g, '*');
  text = text.replace(/\s+/g, '*');
  return text;
}

/** True when `given` spells the same unit as `expected` or an accepted alias. */
export function unitsMatch(
  given: string,
  expected: string,
  accepted: readonly string[] = [],
): boolean {
  const target = normaliseUnit(given);
  return [expected, ...accepted].some((u) => normaliseUnit(u) === target);
}
