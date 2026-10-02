# Core Study Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A working React app that loads authored Biology and Chemistry topics from Markdown, asks one question at a time, grades numeric answers for value / unit / significant figures independently, and shows a step-by-step worked solution.

**Architecture:** Content is authored as Markdown with YAML frontmatter under `content/`, validated and compiled to a single JSON bundle at build time by a Node script. The React app imports that bundle. Grading is a set of pure, dependency-free functions under `src/grading/`. User progress is written through repository functions over Dexie/IndexedDB so a sync adapter can be added later without touching the app.

**Tech Stack:** Vite · React 18 · TypeScript · Vitest · Zod · gray-matter · Dexie · fake-indexeddb (tests) · tsx (running TS scripts)

**Spec:** `docs/superpowers/specs/2026-10-01-cortex-design.md`

**Covers:** Spec milestones 1 and 2. Out of scope for this plan: FSRS scheduling and study modes (milestone 3), lab scene (4), habits (5), content scale-up (6), PWA/deploy (7).

## Global Constraints

- Node 22, npm 10. Development happens inside the conda env `cortex` (`conda activate cortex`).
- Repo root is `C:\Users\lukeh\dev\cortex`. Never create project files under OneDrive — shell writes there silently fail.
- TypeScript `strict: true`. No `any` in committed code.
- Grading and content modules must be pure and importable in a plain Node test environment — no React, no DOM, no Dexie imports.
- `grading` must not import from `scheduler`, `session`, `lab`, or `data`. `content` must not import from any of them either.
- Item `id` values are a stable public contract. Progress is keyed to them. The content build fails on duplicates.
- No College Board exam questions are reproduced. Every item declares `source` as `openstax`, `original`, or `ai-generated`. OpenStax adaptations carry attribution.
- Biology item bodies must teach from scratch; chemistry bodies may assume a teacher covered it. (Spec §3, Subject differences.)
- Default numeric relative tolerance is `0.002` unless an item overrides it.
- Commit after every task. Conventional-commit prefixes (`feat:`, `test:`, `chore:`).

---

### Task 1: Project scaffold and test harness

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`
- Test: `src/smoke.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `npm test` (Vitest), `npm run dev` (Vite), `npm run build`. Path alias `@/` → `src/`.

- [ ] **Step 1: Write the failing test**

`src/smoke.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { appName } from '@/App';

describe('scaffold', () => {
  it('exposes the app name', () => {
    expect(appName).toBe('Cortex');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — no `package.json` / cannot resolve `@/App`.

- [ ] **Step 3: Write minimal implementation**

`package.json`:

```json
{
  "name": "cortex",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "npm run content && vite",
    "build": "npm run content && tsc -b && vite build",
    "content": "tsx scripts/build-content.ts",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "dexie": "^4.0.8",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "fake-indexeddb": "^6.0.0",
    "gray-matter": "^4.0.3",
    "tsx": "^4.19.1",
    "typescript": "^5.6.2",
    "vite": "^5.4.8",
    "vitest": "^2.1.1"
  }
}
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src", "scripts"]
}
```

`vite.config.ts`:

```ts
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'scripts/**/*.test.ts'],
  },
});
```

`index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cortex</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`src/App.tsx`:

```tsx
export const appName = 'Cortex';

export default function App() {
  return <h1>{appName}</h1>;
}
```

`src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Then run: `npm install`

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS, 1 test.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tsconfig.json vite.config.ts index.html src/
git commit -m "chore: scaffold Vite + React + TypeScript + Vitest"
```

---

### Task 2: Significant-figure counter

The highest-risk function in the project. A wrong answer here actively teaches the owner a false method, so it is built first and tested hardest.

**Files:**
- Create: `src/grading/sigfigs.ts`
- Test: `src/grading/sigfigs.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `countSigFigs(input: string): number` — throws `RangeError` on input that is not a finite decimal or scientific-notation number.

Rules implemented:
1. Non-zero digits are always significant.
2. Leading zeros are never significant.
3. Zeros between significant digits are significant.
4. Trailing zeros are significant only when a decimal point is present.
5. In scientific notation, only mantissa digits count.
6. For a zero value, significance is `max(1, number of decimal places)`.

- [ ] **Step 1: Write the failing test**

`src/grading/sigfigs.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { countSigFigs } from '@/grading/sigfigs';

describe('countSigFigs', () => {
  it.each([
    ['1234', 4],
    ['5', 1],
    ['1200', 2],
    ['1200.', 4],
    ['1200.0', 5],
    ['0.00123', 3],
    ['0.001230', 4],
    ['1.2300', 5],
    ['100.0', 4],
    ['0.5', 1],
    ['-0.00450', 3],
    ['+12.0', 3],
    ['1.20e3', 3],
    ['1.20E-5', 3],
    ['9e9', 1],
    ['0', 1],
    ['0.0', 1],
    ['0.00', 2],
    ['  42.0  ', 3],
  ])('counts %s as %i sig figs', (input, expected) => {
    expect(countSigFigs(input)).toBe(expected);
  });

  it.each(['', 'abc', '1.2.3', '1e', 'NaN', 'Infinity'])(
    'rejects %s',
    (input) => {
      expect(() => countSigFigs(input)).toThrow(RangeError);
    },
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- sigfigs`
Expected: FAIL — cannot resolve `@/grading/sigfigs`.

- [ ] **Step 3: Write minimal implementation**

`src/grading/sigfigs.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- sigfigs`
Expected: PASS, all cases.

- [ ] **Step 5: Commit**

```bash
git add src/grading/sigfigs.ts src/grading/sigfigs.test.ts
git commit -m "feat: significant-figure counter with table-driven tests"
```

---

### Task 3: Unit normalisation and comparison

**Files:**
- Create: `src/grading/units.ts`
- Test: `src/grading/units.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `normaliseUnit(unit: string): string`
  - `unitsMatch(given: string, expected: string, accepted?: readonly string[]): boolean`

Case is preserved deliberately — `M` (molar) and `m` (molal) are different units, as are `K` and `k`. No dimensional algebra in v1: an item that should accept `g mol^-1` as well as `g/mol` lists it in `acceptedUnits`.

- [ ] **Step 1: Write the failing test**

`src/grading/units.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { normaliseUnit, unitsMatch } from '@/grading/units';

describe('normaliseUnit', () => {
  it.each([
    ['  mol ', 'mol'],
    ['g / mol', 'g/mol'],
    ['g·mol', 'g*mol'],
    ['g⋅mol', 'g*mol'],
    ['m s', 'm*s'],
    ['cm²', 'cm^2'],
    ['m³', 'm^3'],
    ['kJ  /  mol', 'kJ/mol'],
  ])('normalises %s to %s', (input, expected) => {
    expect(normaliseUnit(input)).toBe(expected);
  });

  it('preserves case', () => {
    expect(normaliseUnit('M')).toBe('M');
    expect(normaliseUnit('m')).toBe('m');
  });
});

describe('unitsMatch', () => {
  it('matches equivalent spellings', () => {
    expect(unitsMatch('g / mol', 'g/mol')).toBe(true);
  });

  it('rejects a different unit', () => {
    expect(unitsMatch('g', 'mol')).toBe(false);
  });

  it('distinguishes molar from molal', () => {
    expect(unitsMatch('m', 'M')).toBe(false);
  });

  it('accepts an authored alternative spelling', () => {
    expect(unitsMatch('g mol^-1', 'g/mol', ['g mol^-1'])).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- units`
Expected: FAIL — cannot resolve `@/grading/units`.

- [ ] **Step 3: Write minimal implementation**

`src/grading/units.ts`:

```ts
const SUPERSCRIPTS: Record<string, string> = {
  '\u00b9': '^1',
  '\u00b2': '^2',
  '\u00b3': '^3',
  '\u2074': '^4',
};

/** Canonical spelling of a unit. Case is significant and preserved. */
export function normaliseUnit(unit: string): string {
  let text = unit.trim();
  for (const [glyph, ascii] of Object.entries(SUPERSCRIPTS)) {
    text = text.split(glyph).join(ascii);
  }
  text = text.replace(/[\u00b7\u22c5*]/g, '*');
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- units`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/grading/units.ts src/grading/units.test.ts
git commit -m "feat: unit normalisation and comparison"
```

---

### Task 4: Numeric input parser

**Files:**
- Create: `src/grading/parseNumeric.ts`
- Test: `src/grading/parseNumeric.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `parseNumericInput(raw: string): ParsedNumeric | null` where

```ts
export interface ParsedNumeric {
  valueText: string; // the number exactly as written, for sig-fig counting
  value: number;     // the parsed numeric value
  unit: string;      // '' when none was written
}
```

- [ ] **Step 1: Write the failing test**

`src/grading/parseNumeric.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- parseNumeric`
Expected: FAIL — cannot resolve `@/grading/parseNumeric`.

- [ ] **Step 3: Write minimal implementation**

`src/grading/parseNumeric.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- parseNumeric`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/grading/parseNumeric.ts src/grading/parseNumeric.test.ts
git commit -m "feat: numeric answer input parser"
```

---

### Task 5: Numeric grader

**Files:**
- Create: `src/grading/numeric.ts`
- Test: `src/grading/numeric.test.ts`

**Interfaces:**
- Consumes: `countSigFigs`, `unitsMatch`, `parseNumericInput`.
- Produces:

```ts
export interface NumericAnswerSpec {
  value: number;
  unit: string | null;              // null = dimensionless, no unit required
  acceptedUnits?: readonly string[];
  sigFigs: number | null;           // null = not checked
  tolerance?: number;               // relative, default 0.002
}

export interface NumericVerdict {
  value: 'correct' | 'incorrect';
  unit: 'correct' | 'incorrect' | 'missing' | 'notRequired';
  sigFigs: 'correct' | 'tooFew' | 'tooMany' | 'notChecked';
  overall: boolean;
  unparseable: boolean;
}

export function gradeNumeric(raw: string, spec: NumericAnswerSpec): NumericVerdict;
```

The three checks are reported separately so the UI can say *"value and units correct, significant figures wrong"* rather than a bare "incorrect". This distinction is the single most valuable diagnostic in the app (spec §4).

- [ ] **Step 1: Write the failing test**

`src/grading/numeric.test.ts`:

```ts
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
    expect(gradeNumeric('0.4509 mol', molSpec).value).toBe('correct');
    expect(gradeNumeric('0.4600 mol', molSpec).value).toBe('incorrect');
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- numeric`
Expected: FAIL — cannot resolve `@/grading/numeric`.

- [ ] **Step 3: Write minimal implementation**

`src/grading/numeric.ts`:

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- numeric`
Expected: PASS, all cases.

- [ ] **Step 5: Commit**

```bash
git add src/grading/numeric.ts src/grading/numeric.test.ts
git commit -m "feat: numeric grader reporting value, unit and sig-fig verdicts separately"
```

---

### Task 6: Verdict feedback messages

**Files:**
- Create: `src/grading/feedback.ts`
- Test: `src/grading/feedback.test.ts`

**Interfaces:**
- Consumes: `NumericVerdict`.
- Produces: `describeNumericVerdict(verdict: NumericVerdict, spec: NumericAnswerSpec): string` — one plain-English sentence naming exactly which of the three checks failed.

- [ ] **Step 1: Write the failing test**

`src/grading/feedback.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { describeNumericVerdict } from '@/grading/feedback';
import { gradeNumeric, type NumericAnswerSpec } from '@/grading/numeric';

const spec: NumericAnswerSpec = { value: 0.45, unit: 'mol', sigFigs: 3 };

describe('describeNumericVerdict', () => {
  it('congratulates a fully correct answer', () => {
    const v = gradeNumeric('0.450 mol', spec);
    expect(describeNumericVerdict(v, spec)).toBe('Correct.');
  });

  it('names a sig-fig shortfall and keeps the credit', () => {
    const v = gradeNumeric('0.45 mol', spec);
    expect(describeNumericVerdict(v, spec)).toBe(
      'Value and units correct — significant figures wrong (you gave 2, expected 3).',
    );
  });

  it('names an excess of sig figs', () => {
    const v = gradeNumeric('0.45000 mol', spec);
    expect(describeNumericVerdict(v, spec)).toBe(
      'Value and units correct — significant figures wrong (you gave 5, expected 3).',
    );
  });

  it('names a missing unit', () => {
    const v = gradeNumeric('0.450', spec);
    expect(describeNumericVerdict(v, spec)).toBe(
      'Value correct — no unit given. Expected mol.',
    );
  });

  it('names a wrong unit', () => {
    const v = gradeNumeric('0.450 g', spec);
    expect(describeNumericVerdict(v, spec)).toBe(
      'Value correct — wrong unit. Expected mol.',
    );
  });

  it('reports a wrong value plainly', () => {
    const v = gradeNumeric('0.900 mol', spec);
    expect(describeNumericVerdict(v, spec)).toBe('Not correct.');
  });

  it('asks for a number when the input could not be read', () => {
    const v = gradeNumeric('no idea', spec);
    expect(describeNumericVerdict(v, spec)).toBe(
      "Couldn't read that as a number. Enter a value and a unit, like 0.450 mol.",
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- feedback`
Expected: FAIL — cannot resolve `@/grading/feedback`.

- [ ] **Step 3: Write minimal implementation**

`src/grading/feedback.ts`:

```ts
import { countSigFigs } from '@/grading/sigfigs';
import { parseNumericInput } from '@/grading/parseNumeric';
import type { NumericAnswerSpec, NumericVerdict } from '@/grading/numeric';

/** One sentence naming exactly which check failed. */
export function describeNumericVerdict(
  verdict: NumericVerdict,
  spec: NumericAnswerSpec,
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

  return `Value and units correct — significant figures wrong (you gave ${'{given}'}, expected ${spec.sigFigs}).`;
}
```

Note: the `{given}` placeholder above will fail the test — the implementation must
count the figures actually written. Replace the final return with:

```ts
  return `Value and units correct — significant figures wrong (you gave ${givenSigFigs}, expected ${spec.sigFigs}).`;
```

and derive `givenSigFigs` by threading the raw input through. Change the signature to
`describeNumericVerdict(verdict, spec, raw: string)` and compute:

```ts
  const parsed = parseNumericInput(raw);
  const givenSigFigs = parsed ? countSigFigs(parsed.valueText) : 0;
```

Update the test calls to pass the raw string as the third argument before running.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- feedback`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/grading/feedback.ts src/grading/feedback.test.ts
git commit -m "feat: plain-English feedback naming the failed check"
```

---

### Task 7: Multiple-choice and free-response grading

**Files:**
- Create: `src/grading/choice.ts`, `src/grading/freeResponse.ts`
- Test: `src/grading/choice.test.ts`, `src/grading/freeResponse.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:

```ts
// choice.ts
export interface ChoiceOption { id: string; text: string; why?: string }
export interface ChoiceAnswerSpec { correctId: string; options: readonly ChoiceOption[] }
export interface ChoiceVerdict { correct: boolean; chosen: ChoiceOption | null; explanation: string | null }
export function gradeChoice(chosenId: string, spec: ChoiceAnswerSpec): ChoiceVerdict;

// freeResponse.ts
export type SelfRating = 'again' | 'hard' | 'good' | 'easy';
export interface FreeResponseResult { attempt: string; rating: SelfRating; correct: boolean }
export function recordFreeResponse(attempt: string, rating: SelfRating): FreeResponseResult;
```

`correct` for a free response is `rating !== 'again'`. The typed attempt is always
retained so it can be re-read later and so AI rubric grading can be added without
losing history (spec §4).

- [ ] **Step 1: Write the failing test**

`src/grading/choice.test.ts`:

```ts
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
      options: [{ id: 'a', text: 'yes' }, { id: 'b', text: 'no' }],
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
```

`src/grading/freeResponse.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { recordFreeResponse } from '@/grading/freeResponse';

describe('recordFreeResponse', () => {
  it('keeps the attempt text', () => {
    const result = recordFreeResponse('water is polar', 'good');
    expect(result.attempt).toBe('water is polar');
  });

  it.each([
    ['again', false],
    ['hard', true],
    ['good', true],
    ['easy', true],
  ] as const)('maps %s to correct=%s', (rating, correct) => {
    expect(recordFreeResponse('x', rating).correct).toBe(correct);
  });

  it('keeps an empty attempt rather than discarding it', () => {
    expect(recordFreeResponse('', 'again').attempt).toBe('');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- choice freeResponse`
Expected: FAIL — modules not found.

- [ ] **Step 3: Write minimal implementation**

`src/grading/choice.ts`:

```ts
export interface ChoiceOption {
  id: string;
  text: string;
  why?: string;
}

export interface ChoiceAnswerSpec {
  correctId: string;
  options: readonly ChoiceOption[];
}

export interface ChoiceVerdict {
  correct: boolean;
  chosen: ChoiceOption | null;
  explanation: string | null;
}

/** Grade a multiple-choice selection, surfacing the distractor's explanation. */
export function gradeChoice(
  chosenId: string,
  spec: ChoiceAnswerSpec,
): ChoiceVerdict {
  const chosen = spec.options.find((o) => o.id === chosenId) ?? null;
  const correct = chosen !== null && chosen.id === spec.correctId;
  return {
    correct,
    chosen,
    explanation: correct ? null : (chosen?.why ?? null),
  };
}
```

`src/grading/freeResponse.ts`:

```ts
export type SelfRating = 'again' | 'hard' | 'good' | 'easy';

export interface FreeResponseResult {
  attempt: string;
  rating: SelfRating;
  correct: boolean;
}

/** Record a self-graded free-response attempt. The text is always retained. */
export function recordFreeResponse(
  attempt: string,
  rating: SelfRating,
): FreeResponseResult {
  return { attempt, rating, correct: rating !== 'again' };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- choice freeResponse`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/grading/choice.ts src/grading/choice.test.ts src/grading/freeResponse.ts src/grading/freeResponse.test.ts
git commit -m "feat: multiple-choice and free-response grading"
```

---

### Task 8: Content types and Zod schema

**Files:**
- Create: `src/content/types.ts`, `src/content/schema.ts`
- Test: `src/content/schema.test.ts`

**Interfaces:**
- Consumes: `NumericAnswerSpec`, `ChoiceAnswerSpec`.
- Produces: `topicSchema`, `unitSchema`, and the inferred types `Topic`, `Unit`, `Item`, `SolutionStep`, `Subject`, `Depth`, `Tier`.

```ts
export type Subject = 'bio' | 'chem';
export type Depth = 'level1' | 'honors' | 'ap' | 'both';
export type Tier = 'warmup' | 'standard' | 'challenge' | 'ap';
export type ItemType = 'numeric' | 'mcq' | 'frq' | 'recall';
export type Source = 'openstax' | 'original' | 'ai-generated';
```

Per spec §3, bio uses `level1`/`ap`/`both` and chem uses `honors`/`ap`/`both`; the
schema accepts the union and Task 10 enforces the per-subject restriction.

- [ ] **Step 1: Write the failing test**

`src/content/schema.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { itemSchema, topicSchema } from '@/content/schema';

const numericItem = {
  id: 'chem.stoich.limiting-reagent.i1',
  tier: 'standard',
  type: 'numeric',
  depth: 'both',
  prompt: 'How many moles of NH3 form from 0.300 mol N2 and excess H2?',
  answer: { value: 0.6, unit: 'mol', sigFigs: 3 },
  solution: [{ text: 'Balanced: N2 + 3 H2 -> 2 NH3.' }],
  source: 'original',
  verified: true,
};

const topic = {
  id: 'chem.stoich.limiting-reagent',
  unit: 'chem.unit-03',
  subject: 'chem',
  title: 'Limiting Reagent',
  depth: 'both',
  ced: ['SPQ-4.1'],
  prereqs: ['chem.stoich.mole-ratio'],
  concept: 'The limiting reagent is consumed first and caps the product.',
  items: [numericItem],
};

describe('itemSchema', () => {
  it('accepts a well-formed numeric item', () => {
    expect(itemSchema.safeParse(numericItem).success).toBe(true);
  });

  it('rejects a numeric item whose answer has no sigFigs key', () => {
    const { sigFigs: _drop, ...answer } = numericItem.answer;
    const bad = { ...numericItem, answer };
    expect(itemSchema.safeParse(bad).success).toBe(false);
  });

  it('rejects an item with an empty solution', () => {
    expect(itemSchema.safeParse({ ...numericItem, solution: [] }).success).toBe(
      false,
    );
  });

  it('rejects an unknown tier', () => {
    expect(itemSchema.safeParse({ ...numericItem, tier: 'boss' }).success).toBe(
      false,
    );
  });

  it('defaults verified to false when omitted', () => {
    const { verified: _drop, ...rest } = numericItem;
    const parsed = itemSchema.parse(rest);
    expect(parsed.verified).toBe(false);
  });
});

describe('topicSchema', () => {
  it('accepts a well-formed topic', () => {
    expect(topicSchema.safeParse(topic).success).toBe(true);
  });

  it('rejects a topic with no items', () => {
    expect(topicSchema.safeParse({ ...topic, items: [] }).success).toBe(false);
  });

  it('rejects a topic with an empty concept body', () => {
    expect(topicSchema.safeParse({ ...topic, concept: '' }).success).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- schema`
Expected: FAIL — cannot resolve `@/content/schema`.

- [ ] **Step 3: Write minimal implementation**

`src/content/schema.ts`:

```ts
import { z } from 'zod';

export const subjectSchema = z.enum(['bio', 'chem']);
export const depthSchema = z.enum(['level1', 'honors', 'ap', 'both']);
export const tierSchema = z.enum(['warmup', 'standard', 'challenge', 'ap']);
export const sourceSchema = z.enum(['openstax', 'original', 'ai-generated']);

export const solutionStepSchema = z.object({
  text: z.string().min(1),
});

const numericAnswerSchema = z.object({
  value: z.number().finite(),
  unit: z.string().min(1).nullable(),
  acceptedUnits: z.array(z.string().min(1)).optional(),
  sigFigs: z.number().int().positive().nullable(),
  tolerance: z.number().positive().optional(),
});

const choiceOptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  why: z.string().min(1).optional(),
});

const choiceAnswerSchema = z.object({
  correctId: z.string().min(1),
  options: z.array(choiceOptionSchema).min(2),
});

const writtenAnswerSchema = z.object({
  model: z.string().min(1),
  rubric: z.array(z.string().min(1)).min(1),
});

const base = {
  id: z.string().min(1),
  tier: tierSchema,
  depth: depthSchema,
  prompt: z.string().min(1),
  solution: z.array(solutionStepSchema).min(1),
  source: sourceSchema,
  attribution: z.string().min(1).optional(),
  verified: z.boolean().default(false),
};

export const itemSchema = z.discriminatedUnion('type', [
  z.object({ ...base, type: z.literal('numeric'), answer: numericAnswerSchema }),
  z.object({ ...base, type: z.literal('mcq'), answer: choiceAnswerSchema }),
  z.object({ ...base, type: z.literal('frq'), answer: writtenAnswerSchema }),
  z.object({ ...base, type: z.literal('recall'), answer: writtenAnswerSchema }),
]);

export const topicSchema = z.object({
  id: z.string().min(1),
  unit: z.string().min(1),
  subject: subjectSchema,
  title: z.string().min(1),
  depth: depthSchema,
  ced: z.array(z.string().min(1)).default([]),
  prereqs: z.array(z.string().min(1)).default([]),
  concept: z.string().min(1),
  items: z.array(itemSchema).min(1),
});

export const unitSchema = z.object({
  id: z.string().min(1),
  subject: subjectSchema,
  title: z.string().min(1),
  order: z.number().int().nonnegative(),
});
```

`src/content/types.ts`:

```ts
import type { z } from 'zod';
import type {
  depthSchema,
  itemSchema,
  solutionStepSchema,
  sourceSchema,
  subjectSchema,
  tierSchema,
  topicSchema,
  unitSchema,
} from '@/content/schema';

export type Subject = z.infer<typeof subjectSchema>;
export type Depth = z.infer<typeof depthSchema>;
export type Tier = z.infer<typeof tierSchema>;
export type Source = z.infer<typeof sourceSchema>;
export type SolutionStep = z.infer<typeof solutionStepSchema>;
export type Item = z.infer<typeof itemSchema>;
export type Topic = z.infer<typeof topicSchema>;
export type Unit = z.infer<typeof unitSchema>;

export interface ContentBundle {
  units: Unit[];
  topics: Topic[];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- schema`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/schema.ts src/content/types.ts src/content/schema.test.ts
git commit -m "feat: content schema and types"
```

---

### Task 9: Markdown topic parser

**Files:**
- Create: `src/content/parse.ts`
- Test: `src/content/parse.test.ts`

**Interfaces:**
- Consumes: `topicSchema`, `unitSchema`.
- Produces:
  - `parseTopicFile(markdown: string, path: string): Topic` — throws `Error` with the file path and the Zod issue list on invalid input.
  - `parseUnitFile(markdown: string, path: string): Unit`

Authoring format: frontmatter carries metadata and the full `items` array; the
Markdown body is the `concept`. Keeping items in frontmatter means one schema and
no bespoke body grammar to maintain.

- [ ] **Step 1: Write the failing test**

`src/content/parse.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { parseTopicFile, parseUnitFile } from '@/content/parse';

const topicFile = `---
id: chem.stoich.mole-ratio
unit: chem.unit-03
subject: chem
title: Mole Ratios
depth: both
ced:
  - SPQ-4.1
prereqs: []
items:
  - id: chem.stoich.mole-ratio.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: How many moles of H2 react with 1.00 mol N2?
    answer:
      value: 3
      unit: mol
      sigFigs: 3
    solution:
      - text: "Balanced equation: N2 + 3 H2 -> 2 NH3."
      - text: "The ratio N2 : H2 is 1 : 3, so 1.00 mol N2 needs 3.00 mol H2."
    source: original
    verified: true
---

A balanced equation is a recipe in moles.
`;

const unitFile = `---
id: chem.unit-03
subject: chem
title: Stoichiometry
order: 3
---
`;

describe('parseTopicFile', () => {
  it('reads frontmatter into a Topic', () => {
    const topic = parseTopicFile(topicFile, 'content/chem/x.md');
    expect(topic.id).toBe('chem.stoich.mole-ratio');
    expect(topic.items).toHaveLength(1);
    expect(topic.items[0].solution).toHaveLength(2);
  });

  it('uses the Markdown body as the concept', () => {
    const topic = parseTopicFile(topicFile, 'content/chem/x.md');
    expect(topic.concept).toBe('A balanced equation is a recipe in moles.');
  });

  it('names the file in the error when validation fails', () => {
    const broken = topicFile.replace('tier: warmup', 'tier: boss');
    expect(() => parseTopicFile(broken, 'content/chem/x.md')).toThrow(
      /content\/chem\/x\.md/,
    );
  });

  it('rejects a topic whose body is empty', () => {
    const bodyless = topicFile.slice(0, topicFile.lastIndexOf('---') + 3);
    expect(() => parseTopicFile(bodyless, 'content/chem/x.md')).toThrow();
  });
});

describe('parseUnitFile', () => {
  it('reads unit metadata', () => {
    expect(parseUnitFile(unitFile, 'content/chem/_unit.md')).toEqual({
      id: 'chem.unit-03',
      subject: 'chem',
      title: 'Stoichiometry',
      order: 3,
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- parse`
Expected: FAIL — cannot resolve `@/content/parse`.

- [ ] **Step 3: Write minimal implementation**

`src/content/parse.ts`:

```ts
import matter from 'gray-matter';
import { z } from 'zod';
import { topicSchema, unitSchema } from '@/content/schema';
import type { Topic, Unit } from '@/content/types';

function fail(path: string, error: z.ZodError): never {
  const issues = error.issues
    .map((i) => `  ${i.path.join('.') || '(root)'}: ${i.message}`)
    .join('\n');
  throw new Error(`Invalid content in ${path}:\n${issues}`);
}

/** Parse one topic file: frontmatter is metadata plus items, body is the concept. */
export function parseTopicFile(markdown: string, path: string): Topic {
  const { data, content } = matter(markdown);
  const result = topicSchema.safeParse({ ...data, concept: content.trim() });
  if (!result.success) fail(path, result.error);
  return result.data;
}

/** Parse a `_unit.md` file. */
export function parseUnitFile(markdown: string, path: string): Unit {
  const { data } = matter(markdown);
  const result = unitSchema.safeParse(data);
  if (!result.success) fail(path, result.error);
  return result.data;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- parse`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/parse.ts src/content/parse.test.ts
git commit -m "feat: Markdown topic and unit parser"
```

---

### Task 10: Cross-file content validation

**Files:**
- Create: `src/content/validate.ts`
- Test: `src/content/validate.test.ts`

**Interfaces:**
- Consumes: `Topic`, `Unit`, `ContentBundle`.
- Produces: `validateBundle(bundle: ContentBundle): string[]` — a list of human-readable problems; empty means valid.

Rules (spec §3, Content pipeline):
1. Duplicate topic id.
2. Duplicate item id (across the whole corpus — ids are the progress key).
3. Topic references a unit that does not exist.
4. Topic lists a prereq topic id that does not exist.
5. Prereq cycle.
6. Depth value illegal for the subject (`honors` on bio, `level1` on chem).
7. Item `source: openstax` with no `attribution`.

- [ ] **Step 1: Write the failing test**

`src/content/validate.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { validateBundle } from '@/content/validate';
import type { ContentBundle, Item, Topic, Unit } from '@/content/types';

const unit: Unit = {
  id: 'chem.unit-03',
  subject: 'chem',
  title: 'Stoichiometry',
  order: 3,
};

function item(id: string, over: Partial<Item> = {}): Item {
  return {
    id,
    tier: 'warmup',
    type: 'numeric',
    depth: 'both',
    prompt: 'p',
    answer: { value: 1, unit: 'mol', sigFigs: 1 },
    solution: [{ text: 's' }],
    source: 'original',
    verified: true,
    ...over,
  } as Item;
}

function topic(id: string, over: Partial<Topic> = {}): Topic {
  return {
    id,
    unit: 'chem.unit-03',
    subject: 'chem',
    title: 't',
    depth: 'both',
    ced: [],
    prereqs: [],
    concept: 'c',
    items: [item(`${id}.i1`)],
    ...over,
  };
}

const bundle = (topics: Topic[], units: Unit[] = [unit]): ContentBundle => ({
  units,
  topics,
});

describe('validateBundle', () => {
  it('passes a clean bundle', () => {
    expect(validateBundle(bundle([topic('a'), topic('b')]))).toEqual([]);
  });

  it('flags a duplicate topic id', () => {
    const errors = validateBundle(bundle([topic('a'), topic('a')]));
    expect(errors.join('\n')).toMatch(/duplicate topic id: a/i);
  });

  it('flags a duplicate item id across topics', () => {
    const a = topic('a', { items: [item('shared')] });
    const b = topic('b', { items: [item('shared')] });
    expect(validateBundle(bundle([a, b])).join('\n')).toMatch(
      /duplicate item id: shared/i,
    );
  });

  it('flags a missing unit', () => {
    const t = topic('a', { unit: 'chem.unit-99' });
    expect(validateBundle(bundle([t])).join('\n')).toMatch(
      /unknown unit: chem\.unit-99/i,
    );
  });

  it('flags a dangling prereq', () => {
    const t = topic('a', { prereqs: ['nope'] });
    expect(validateBundle(bundle([t])).join('\n')).toMatch(
      /unknown prereq: nope/i,
    );
  });

  it('flags a prereq cycle', () => {
    const a = topic('a', { prereqs: ['b'] });
    const b = topic('b', { prereqs: ['a'] });
    expect(validateBundle(bundle([a, b])).join('\n')).toMatch(/cycle/i);
  });

  it('flags honors depth on a biology topic', () => {
    const bioUnit: Unit = {
      id: 'bio.unit-01',
      subject: 'bio',
      title: 'Chemistry of Life',
      order: 1,
    };
    const t = topic('a', {
      subject: 'bio',
      unit: 'bio.unit-01',
      depth: 'honors',
    });
    expect(validateBundle(bundle([t], [bioUnit])).join('\n')).toMatch(
      /depth "honors" is not valid for bio/i,
    );
  });

  it('flags an OpenStax item with no attribution', () => {
    const t = topic('a', { items: [item('a.i1', { source: 'openstax' })] });
    expect(validateBundle(bundle([t])).join('\n')).toMatch(/attribution/i);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- validate`
Expected: FAIL — cannot resolve `@/content/validate`.

- [ ] **Step 3: Write minimal implementation**

`src/content/validate.ts`:

```ts
import type { ContentBundle, Depth, Subject, Topic } from '@/content/types';

const ALLOWED_DEPTHS: Record<Subject, readonly Depth[]> = {
  bio: ['level1', 'ap', 'both'],
  chem: ['honors', 'ap', 'both'],
};

function findCycle(topics: readonly Topic[]): string | null {
  const byId = new Map(topics.map((t) => [t.id, t]));
  const state = new Map<string, 'visiting' | 'done'>();

  const walk = (id: string, trail: string[]): string | null => {
    if (state.get(id) === 'done') return null;
    if (state.get(id) === 'visiting') return [...trail, id].join(' -> ');
    state.set(id, 'visiting');
    for (const prereq of byId.get(id)?.prereqs ?? []) {
      if (!byId.has(prereq)) continue;
      const cycle = walk(prereq, [...trail, id]);
      if (cycle) return cycle;
    }
    state.set(id, 'done');
    return null;
  };

  for (const topic of topics) {
    const cycle = walk(topic.id, []);
    if (cycle) return cycle;
  }
  return null;
}

/** Cross-file checks the per-file schema cannot make. Empty array means valid. */
export function validateBundle(bundle: ContentBundle): string[] {
  const errors: string[] = [];
  const unitIds = new Set(bundle.units.map((u) => u.id));
  const topicIds = new Set<string>();
  const itemIds = new Set<string>();

  for (const topic of bundle.topics) {
    if (topicIds.has(topic.id)) errors.push(`Duplicate topic id: ${topic.id}`);
    topicIds.add(topic.id);

    if (!unitIds.has(topic.unit)) {
      errors.push(`Topic ${topic.id} references unknown unit: ${topic.unit}`);
    }

    if (!ALLOWED_DEPTHS[topic.subject].includes(topic.depth)) {
      errors.push(
        `Topic ${topic.id}: depth "${topic.depth}" is not valid for ${topic.subject}`,
      );
    }

    for (const item of topic.items) {
      if (itemIds.has(item.id)) errors.push(`Duplicate item id: ${item.id}`);
      itemIds.add(item.id);

      if (!ALLOWED_DEPTHS[topic.subject].includes(item.depth)) {
        errors.push(
          `Item ${item.id}: depth "${item.depth}" is not valid for ${topic.subject}`,
        );
      }
      if (item.source === 'openstax' && !item.attribution) {
        errors.push(`Item ${item.id}: source is openstax but attribution is missing`);
      }
    }
  }

  for (const topic of bundle.topics) {
    for (const prereq of topic.prereqs) {
      if (!topicIds.has(prereq)) {
        errors.push(`Topic ${topic.id} lists unknown prereq: ${prereq}`);
      }
    }
  }

  const cycle = findCycle(bundle.topics);
  if (cycle) errors.push(`Prereq cycle: ${cycle}`);

  return errors;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- validate`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/validate.ts src/content/validate.test.ts
git commit -m "feat: cross-file content validation"
```

---

### Task 11: Content build script

**Files:**
- Create: `scripts/build-content.ts`, `scripts/collect.ts`
- Test: `scripts/collect.test.ts`
- Modify: `.gitignore` (add `src/generated/`)

**Interfaces:**
- Consumes: `parseTopicFile`, `parseUnitFile`, `validateBundle`.
- Produces:
  - `collectBundle(files: ReadonlyMap<string, string>): ContentBundle` — pure; keys are paths, values are file contents. Throws on validation failure with every error listed.
  - `npm run content` writes `src/generated/content.json`.

`collectBundle` is kept pure and separate from disk I/O so it can be tested without
a filesystem fixture.

- [ ] **Step 1: Write the failing test**

`scripts/collect.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { collectBundle } from './collect';

const unitMd = `---
id: chem.unit-03
subject: chem
title: Stoichiometry
order: 3
---
`;

const topicMd = `---
id: chem.stoich.mole-ratio
unit: chem.unit-03
subject: chem
title: Mole Ratios
depth: both
items:
  - id: chem.stoich.mole-ratio.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: How many moles of H2 react with 1.00 mol N2?
    answer: { value: 3, unit: mol, sigFigs: 3 }
    solution:
      - text: "N2 + 3 H2 -> 2 NH3, so the ratio is 1 : 3."
    source: original
    verified: true
---

A balanced equation is a recipe in moles.
`;

describe('collectBundle', () => {
  it('builds a bundle from unit and topic files', () => {
    const bundle = collectBundle(
      new Map([
        ['content/chem/unit-03/_unit.md', unitMd],
        ['content/chem/unit-03/mole-ratio.md', topicMd],
      ]),
    );
    expect(bundle.units).toHaveLength(1);
    expect(bundle.topics).toHaveLength(1);
  });

  it('throws listing every validation error', () => {
    const orphan = topicMd.replace('unit: chem.unit-03', 'unit: chem.unit-99');
    expect(() =>
      collectBundle(new Map([['content/chem/unit-03/mole-ratio.md', orphan]])),
    ).toThrow(/unknown unit: chem\.unit-99/i);
  });

  it('sorts units by order', () => {
    const unit1 = unitMd
      .replace('chem.unit-03', 'chem.unit-01')
      .replace('order: 3', 'order: 1');
    const bundle = collectBundle(
      new Map([
        ['content/chem/unit-03/_unit.md', unitMd],
        ['content/chem/unit-01/_unit.md', unit1],
        ['content/chem/unit-03/mole-ratio.md', topicMd],
      ]),
    );
    expect(bundle.units.map((u) => u.id)).toEqual([
      'chem.unit-01',
      'chem.unit-03',
    ]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- collect`
Expected: FAIL — cannot resolve `./collect`.

- [ ] **Step 3: Write minimal implementation**

`scripts/collect.ts`:

```ts
import { parseTopicFile, parseUnitFile } from '../src/content/parse';
import { validateBundle } from '../src/content/validate';
import type { ContentBundle, Topic, Unit } from '../src/content/types';

/** Build and validate a bundle from path -> file-contents. Pure; no disk access. */
export function collectBundle(
  files: ReadonlyMap<string, string>,
): ContentBundle {
  const units: Unit[] = [];
  const topics: Topic[] = [];

  for (const [path, contents] of files) {
    if (!path.endsWith('.md')) continue;
    if (path.endsWith('_unit.md')) {
      units.push(parseUnitFile(contents, path));
    } else {
      topics.push(parseTopicFile(contents, path));
    }
  }

  units.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
  topics.sort((a, b) => a.id.localeCompare(b.id));

  const bundle: ContentBundle = { units, topics };
  const errors = validateBundle(bundle);
  if (errors.length > 0) {
    throw new Error(`Content validation failed:\n${errors.map((e) => `  ${e}`).join('\n')}`);
  }
  return bundle;
}
```

`scripts/build-content.ts`:

```ts
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { collectBundle } from './collect';

const CONTENT_DIR = resolve('content');
const OUT_FILE = resolve('src/generated/content.json');

async function markdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = await Promise.all(
    entries.map(async (entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return markdownFiles(full);
      return entry.name.endsWith('.md') ? [full] : [];
    }),
  );
  return found.flat();
}

async function main(): Promise<void> {
  const paths = await markdownFiles(CONTENT_DIR);
  const files = new Map<string, string>();
  for (const path of paths) {
    files.set(relative(process.cwd(), path).replace(/\\/g, '/'), await readFile(path, 'utf8'));
  }

  const bundle = collectBundle(files);
  await mkdir(resolve('src/generated'), { recursive: true });
  await writeFile(OUT_FILE, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8');

  console.log(
    `Content OK: ${bundle.units.length} units, ${bundle.topics.length} topics, ` +
      `${bundle.topics.reduce((n, t) => n + t.items.length, 0)} items`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
```

Append to `.gitignore`:

```
src/generated/
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- collect`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/ .gitignore
git commit -m "feat: content build script compiling Markdown to a validated JSON bundle"
```

---

### Task 12: Seed chemistry content

**Files:**
- Create: `content/chem/unit-03-stoichiometry/_unit.md`
- Create: `content/chem/unit-03-stoichiometry/mole-ratio.md`
- Create: `content/chem/unit-03-stoichiometry/limiting-reagent.md`

**Interfaces:**
- Consumes: the content schema from Task 8.
- Produces: topic ids `chem.stoich.mole-ratio` and `chem.stoich.limiting-reagent`, used by Tasks 14–16.

Chemistry bodies may assume class instruction (spec §3). Every item is `original`.

- [ ] **Step 1: Write the failing test**

There is no unit test here — the content build *is* the test. Run it first and
confirm it reports zero chemistry topics.

Run: `npm run content`
Expected: either a failure (no `content/` directory) or `0 units, 0 topics`.

- [ ] **Step 2: Write the content**

`content/chem/unit-03-stoichiometry/_unit.md`:

```markdown
---
id: chem.unit-03
subject: chem
title: Stoichiometry
order: 3
---
```

`content/chem/unit-03-stoichiometry/mole-ratio.md`:

```markdown
---
id: chem.stoich.mole-ratio
unit: chem.unit-03
subject: chem
title: Mole Ratios
depth: both
ced:
  - SPQ-4.1
prereqs: []
items:
  - id: chem.stoich.mole-ratio.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "For N2 + 3 H2 -> 2 NH3, how many moles of H2 react with 1.00 mol of N2?"
    answer: { value: 3, unit: mol, sigFigs: 3 }
    solution:
      - text: "Read the coefficients: 1 N2 to 3 H2."
      - text: "The ratio is a conversion factor: 3 mol H2 per 1 mol N2."
      - text: "1.00 mol N2 x (3 mol H2 / 1 mol N2) = 3.00 mol H2."
    source: original
    verified: true
  - id: chem.stoich.mole-ratio.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "For 2 Al + 3 Cl2 -> 2 AlCl3, how many moles of AlCl3 form from 0.750 mol Cl2 with excess Al?"
    answer: { value: 0.5, unit: mol, sigFigs: 3 }
    solution:
      - text: "Coefficients give 3 mol Cl2 to 2 mol AlCl3."
      - text: "0.750 mol Cl2 x (2 mol AlCl3 / 3 mol Cl2) = 0.500 mol AlCl3."
      - text: "Three sig figs in, three sig figs out: 0.500 mol."
    source: original
    verified: true
  - id: chem.stoich.mole-ratio.i3
    tier: challenge
    type: mcq
    depth: both
    prompt: "Doubling the coefficients of a balanced equation changes which of the following?"
    answer:
      correctId: c
      options:
        - id: a
          text: The mole ratios between species
          why: "Doubling every coefficient leaves each ratio unchanged - 2:6 is the same ratio as 1:3."
        - id: b
          text: The identity of the limiting reagent
          why: "The limiting reagent depends on the ratio, which does not change."
        - id: c
          text: Nothing chemically meaningful
    solution:
      - text: "A balanced equation states ratios, not absolute amounts."
      - text: "Scaling every coefficient by the same factor preserves every ratio."
      - text: "So no chemical prediction changes."
    source: original
    verified: true
---

A balanced equation is a recipe written in moles. The coefficients are not masses
and not molecules you can weigh out - they are the proportions in which substances
react. Every stoichiometry problem is the same three moves: get to moles, apply the
ratio from the balanced equation, get out of moles.
```

`content/chem/unit-03-stoichiometry/limiting-reagent.md`:

```markdown
---
id: chem.stoich.limiting-reagent
unit: chem.unit-03
subject: chem
title: Limiting Reagent
depth: both
ced:
  - SPQ-4.2
prereqs:
  - chem.stoich.mole-ratio
items:
  - id: chem.stoich.limiting-reagent.i1
    tier: standard
    type: numeric
    depth: both
    prompt: "N2 + 3 H2 -> 2 NH3. You have 0.300 mol N2 and 0.600 mol H2. How many moles of NH3 form?"
    answer: { value: 0.4, unit: mol, sigFigs: 3 }
    solution:
      - text: "Test each reactant. From N2: 0.300 x (2/1) = 0.600 mol NH3."
      - text: "From H2: 0.600 x (2/3) = 0.400 mol NH3."
      - text: "The smaller result wins - H2 runs out first and is limiting."
      - text: "0.400 mol NH3 forms."
    source: original
    verified: true
  - id: chem.stoich.limiting-reagent.i2
    tier: ap
    type: frq
    depth: ap
    prompt: "A student mixes 0.300 mol N2 and 0.600 mol H2 and measures 0.360 mol NH3. Identify the limiting reagent, calculate the percent yield, and give one physical reason the yield is below 100%."
    answer:
      model: "H2 is limiting. Theoretical yield is 0.400 mol NH3, so percent yield = 0.360 / 0.400 x 100 = 90.0%. The reaction is reversible and does not go to completion."
      rubric:
        - "1 point: identifies H2 as limiting with supporting calculation"
        - "1 point: theoretical yield 0.400 mol NH3"
        - "1 point: percent yield 90.0% with correct setup"
        - "1 point: a valid physical reason (equilibrium, side reaction, loss on transfer)"
    solution:
      - text: "Limiting reagent: H2 gives 0.400 mol NH3, N2 gives 0.600 mol, so H2 limits."
      - text: "Theoretical yield is therefore 0.400 mol."
      - text: "Percent yield = actual / theoretical x 100 = 0.360 / 0.400 x 100 = 90.0%."
      - text: "Ammonia synthesis is an equilibrium, so it cannot reach 100% conversion in one pass."
    source: original
    verified: true
---

The limiting reagent is whichever reactant runs out first, and it alone sets how
much product you can make. The reliable method is not to guess from the amounts -
it is to run the calculation once per reactant and keep the smallest answer. Excess
reagent is simply whatever is left over when the limiting one is gone.
```

- [ ] **Step 3: Run the content build**

Run: `npm run content`
Expected: `Content OK: 1 units, 2 topics, 5 items`

- [ ] **Step 4: Verify validation actually bites**

Temporarily change `prereqs: - chem.stoich.mole-ratio` to `- chem.stoich.nope`,
run `npm run content`, confirm it fails naming the unknown prereq, then revert.

- [ ] **Step 5: Commit**

```bash
git add content/chem/
git commit -m "feat: seed chemistry content - mole ratios and limiting reagent"
```

---

### Task 13: Seed biology content

**Files:**
- Create: `content/bio/unit-01-chemistry-of-life/_unit.md`
- Create: `content/bio/unit-01-chemistry-of-life/water-properties.md`

**Interfaces:**
- Consumes: the content schema from Task 8.
- Produces: topic id `bio.col.water-properties`, used by Tasks 14–16 as the
  recall-heavy counterpart to the numeric-heavy chemistry topics.

Biology bodies must teach from scratch — no teacher exists for AP Bio
(spec §3, Subject differences). The concept body here is correspondingly longer
than the chemistry ones, and this is deliberate, not inconsistency.

- [ ] **Step 1: Write the content**

`content/bio/unit-01-chemistry-of-life/_unit.md`:

```markdown
---
id: bio.unit-01
subject: bio
title: Chemistry of Life
order: 1
---
```

`content/bio/unit-01-chemistry-of-life/water-properties.md`:

```markdown
---
id: bio.col.water-properties
unit: bio.unit-01
subject: bio
title: Properties of Water
depth: both
ced:
  - SYI-1.A
prereqs: []
items:
  - id: bio.col.water-properties.i1
    tier: warmup
    type: recall
    depth: both
    prompt: "Why is a water molecule polar? Answer without looking."
    answer:
      model: "Oxygen is far more electronegative than hydrogen, so it pulls the shared electrons toward itself. That gives oxygen a partial negative charge and each hydrogen a partial positive charge. The molecule is bent rather than linear, so those charges do not cancel and the molecule has an overall dipole."
      rubric:
        - "Mentions unequal sharing of electrons / electronegativity difference"
        - "Identifies partial negative on O and partial positive on H"
        - "Notes the bent shape prevents the dipoles cancelling"
    solution:
      - text: "Start with the bond: O and H share electrons, but not equally."
      - text: "Oxygen's higher electronegativity pulls electron density toward it."
      - text: "That creates partial charges: delta-minus on O, delta-plus on each H."
      - text: "Shape matters. Water is bent at about 104.5 degrees, so the two bond dipoles add rather than cancel. A linear molecule with the same bonds would be non-polar."
    source: original
    verified: true
  - id: bio.col.water-properties.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "Sweating cools you down primarily because of which property of water?"
    answer:
      correctId: b
      options:
        - id: a
          text: High surface tension
          why: "Surface tension explains insects walking on water, not cooling."
        - id: b
          text: High heat of vaporisation
        - id: c
          text: Lower density as a solid
          why: "That explains why ice floats, which is unrelated to evaporative cooling."
        - id: d
          text: Its role as a universal solvent
          why: "Dissolving power does not remove heat from your skin."
    solution:
      - text: "Evaporation means breaking the hydrogen bonds holding liquid water together."
      - text: "Breaking those bonds takes a large amount of energy - water's heat of vaporisation is unusually high."
      - text: "That energy is taken from your skin, so your skin cools."
    source: original
    verified: true
  - id: bio.col.water-properties.i3
    tier: challenge
    type: frq
    depth: both
    prompt: "Explain how hydrogen bonding accounts for both cohesion and adhesion, and describe how the two together move water up a tall tree."
    answer:
      model: "Cohesion is water hydrogen-bonding to other water molecules; adhesion is water hydrogen-bonding to the polar walls of the xylem. Transpiration from leaf stomata pulls water molecules out of the top of the column. Because the molecules are cohesively linked, that pull is transmitted down the whole column, and adhesion to the xylem walls resists the column slipping back down. The result is bulk water movement upward without the plant expending energy on pumping."
      rubric:
        - "1 point: cohesion defined as water-to-water hydrogen bonding"
        - "1 point: adhesion defined as water-to-xylem-wall hydrogen bonding"
        - "1 point: transpiration identified as the driving force"
        - "1 point: explains the continuous column transmitting tension"
    solution:
      - text: "Both properties come from the same cause: water's partial charges let it hydrogen-bond."
      - text: "Water bonding to water is cohesion. Water bonding to a different polar surface is adhesion."
      - text: "Evaporation at the leaf removes molecules from the top of the water column."
      - text: "Cohesion means removing one molecule tugs the next, so tension is transmitted all the way to the roots."
      - text: "Adhesion to the xylem walls keeps the column from collapsing back down."
      - text: "Net effect: water climbs tens of metres with no pump and no ATP spent on lifting."
    source: original
    verified: true
  - id: bio.col.water-properties.i4
    tier: ap
    type: numeric
    depth: ap
    prompt: "A plant cell has a solute potential of -0.65 MPa and a pressure potential of 0.25 MPa. Calculate its water potential in MPa."
    answer: { value: -0.4, unit: MPa, sigFigs: 2 }
    solution:
      - text: "Water potential is the sum of its two components: psi = psi_s + psi_p."
      - text: "psi = (-0.65) + (0.25)."
      - text: "psi = -0.40 MPa. Keep two sig figs and keep the sign - a negative water potential means water tends to move in."
    source: original
    verified: true
---

Almost everything biology does, it does in water. Before any of the macromolecules
matter, you need to understand why this one small molecule behaves so strangely -
because nearly every "weird" property of living systems traces back to it.

Water is **polar**. Oxygen pulls the shared electrons harder than hydrogen does, so
the oxygen end carries a partial negative charge and each hydrogen end carries a
partial positive charge. The molecule is bent, not straight, so those partial
charges do not cancel out.

Polarity lets water molecules stick to each other through **hydrogen bonds**. Each
bond is individually weak, but there are enormous numbers of them, and that
collective stickiness is where the useful properties come from:

- **Cohesion** - water sticks to water. This is what lets a column of water in a
  tree be pulled from the top without snapping.
- **Adhesion** - water sticks to other polar surfaces, such as the inside of a
  xylem vessel.
- **High specific heat** - raising water's temperature means overcoming all those
  hydrogen bonds first, so water resists temperature change. Organisms made mostly
  of water are thermally stable.
- **High heat of vaporisation** - evaporating water takes a lot of energy, which is
  why sweating cools you.
- **Ice floats** - hydrogen bonds lock into an open lattice when water freezes, so
  solid water is less dense than liquid. Lakes freeze top-down, and life survives
  underneath.
- **Solvent for polar and charged substances** - water surrounds ions and polar
  molecules and pulls them apart. Things that cannot be dissolved this way are
  called hydrophobic, and that exclusion is what drives membranes to form.

Keep the causal chain straight, because exam questions test it directly:
electronegativity difference causes polarity, polarity causes hydrogen bonding,
hydrogen bonding causes everything in the list above.
```

- [ ] **Step 2: Run the content build**

Run: `npm run content`
Expected: `Content OK: 2 units, 3 topics, 9 items`

- [ ] **Step 3: Verify the per-subject depth rule bites**

Temporarily change the topic's `depth: both` to `depth: honors`, run
`npm run content`, confirm it fails with `depth "honors" is not valid for bio`,
then revert.

- [ ] **Step 4: Commit**

```bash
git add content/bio/
git commit -m "feat: seed biology content - properties of water"
```

---

### Task 14: Content access layer

**Files:**
- Create: `src/content/index.ts`
- Test: `src/content/index.test.ts`

**Interfaces:**
- Consumes: `src/generated/content.json`, `ContentBundle`, `Topic`, `Depth`, `Subject`.
- Produces:
  - `loadBundle(): ContentBundle`
  - `topicsForSubject(bundle, subject): Topic[]`
  - `itemsAtDepth(topic, depth): Item[]` — `depth: 'both'` items always included; an `ap` request also returns `both`; a `level1`/`honors` request excludes `ap`.
  - `findTopic(bundle, id): Topic | undefined`

- [ ] **Step 1: Write the failing test**

`src/content/index.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import {
  findTopic,
  itemsAtDepth,
  loadBundle,
  topicsForSubject,
} from '@/content';

const bundle = loadBundle();

describe('loadBundle', () => {
  it('loads the generated bundle', () => {
    expect(bundle.topics.length).toBeGreaterThan(0);
    expect(bundle.units.length).toBeGreaterThan(0);
  });
});

describe('topicsForSubject', () => {
  it('separates the two subjects', () => {
    expect(topicsForSubject(bundle, 'bio').every((t) => t.subject === 'bio')).toBe(true);
    expect(topicsForSubject(bundle, 'chem').every((t) => t.subject === 'chem')).toBe(true);
  });
});

describe('itemsAtDepth', () => {
  const water = findTopic(bundle, 'bio.col.water-properties')!;

  it('hides ap-only items from a level1 learner', () => {
    const ids = itemsAtDepth(water, 'level1').map((i) => i.id);
    expect(ids).not.toContain('bio.col.water-properties.i4');
  });

  it('shows ap-only items to an ap learner', () => {
    const ids = itemsAtDepth(water, 'ap').map((i) => i.id);
    expect(ids).toContain('bio.col.water-properties.i4');
  });

  it('always includes shared items', () => {
    expect(itemsAtDepth(water, 'level1').map((i) => i.id)).toContain(
      'bio.col.water-properties.i1',
    );
    expect(itemsAtDepth(water, 'ap').map((i) => i.id)).toContain(
      'bio.col.water-properties.i1',
    );
  });
});

describe('findTopic', () => {
  it('returns undefined for an unknown id', () => {
    expect(findTopic(bundle, 'nope')).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run content && npm test -- content/index`
Expected: FAIL — cannot resolve `@/content`.

- [ ] **Step 3: Write minimal implementation**

`src/content/index.ts`:

```ts
import generated from '@/generated/content.json';
import { topicSchema, unitSchema } from '@/content/schema';
import type {
  ContentBundle,
  Depth,
  Item,
  Subject,
  Topic,
} from '@/content/types';

let cached: ContentBundle | null = null;

/** Load and validate the compiled content bundle. Parsed once, then cached. */
export function loadBundle(): ContentBundle {
  if (cached) return cached;
  cached = {
    units: generated.units.map((u) => unitSchema.parse(u)),
    topics: generated.topics.map((t) => topicSchema.parse(t)),
  };
  return cached;
}

export function topicsForSubject(
  bundle: ContentBundle,
  subject: Subject,
): Topic[] {
  return bundle.topics.filter((t) => t.subject === subject);
}

export function findTopic(
  bundle: ContentBundle,
  id: string,
): Topic | undefined {
  return bundle.topics.find((t) => t.id === id);
}

/** Items visible at a given study depth. `both` is always visible. */
export function itemsAtDepth(topic: Topic, depth: Depth): Item[] {
  if (depth === 'ap') {
    return topic.items.filter((i) => i.depth === 'ap' || i.depth === 'both');
  }
  return topic.items.filter((i) => i.depth === depth || i.depth === 'both');
}

export type { ContentBundle, Depth, Item, Subject, Topic };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run content && npm test -- content/index`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/index.ts src/content/index.test.ts
git commit -m "feat: content access layer with depth filtering"
```

---

### Task 15: Attempt persistence

**Files:**
- Create: `src/data/db.ts`, `src/data/attempts.ts`
- Test: `src/data/attempts.test.ts`
- Modify: `vite.config.ts` (add the fake-indexeddb setup file)
- Create: `src/test/setup-indexeddb.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces:

```ts
export interface AttemptRecord {
  id: string;          // crypto.randomUUID()
  itemId: string;
  topicId: string;
  answeredAt: number;  // epoch ms
  correct: boolean;
  response: string;    // raw typed answer, chosen option id, or FRQ text
  updatedAt: number;
}

export function recordAttempt(input: Omit<AttemptRecord, 'id' | 'updatedAt'>): Promise<AttemptRecord>;
export function attemptsForItem(itemId: string): Promise<AttemptRecord[]>;
export function allAttempts(): Promise<AttemptRecord[]>;
export function clearAllData(): Promise<void>;
```

All database access goes through this module — nothing else imports Dexie
(spec §3, Data layer). Every record carries `updatedAt` so a sync adapter can be
added later.

- [ ] **Step 1: Write the failing test**

`src/test/setup-indexeddb.ts`:

```ts
import 'fake-indexeddb/auto';
```

Add to `vite.config.ts` inside `test`:

```ts
    setupFiles: ['src/test/setup-indexeddb.ts'],
```

`src/data/attempts.test.ts`:

```ts
import { beforeEach, describe, expect, it } from 'vitest';
import {
  allAttempts,
  attemptsForItem,
  clearAllData,
  recordAttempt,
} from '@/data/attempts';

const base = {
  itemId: 'chem.stoich.mole-ratio.i1',
  topicId: 'chem.stoich.mole-ratio',
  answeredAt: 1_700_000_000_000,
  correct: true,
  response: '3.00 mol',
};

describe('attempts', () => {
  beforeEach(async () => {
    await clearAllData();
  });

  it('stores an attempt and gives it an id', async () => {
    const saved = await recordAttempt(base);
    expect(saved.id).toMatch(/.+/);
    expect(saved.updatedAt).toBeGreaterThan(0);
  });

  it('reads attempts back for one item', async () => {
    await recordAttempt(base);
    await recordAttempt({ ...base, correct: false, response: '3 mol' });
    await recordAttempt({ ...base, itemId: 'other' });

    const found = await attemptsForItem(base.itemId);
    expect(found).toHaveLength(2);
    expect(found.map((a) => a.correct)).toEqual([true, false]);
  });

  it('keeps the raw response text', async () => {
    await recordAttempt({ ...base, response: 'water is polar' });
    const [saved] = await attemptsForItem(base.itemId);
    expect(saved.response).toBe('water is polar');
  });

  it('starts empty', async () => {
    expect(await allAttempts()).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- attempts`
Expected: FAIL — cannot resolve `@/data/attempts`.

- [ ] **Step 3: Write minimal implementation**

`src/data/db.ts`:

```ts
import Dexie, { type EntityTable } from 'dexie';

export interface AttemptRecord {
  id: string;
  itemId: string;
  topicId: string;
  answeredAt: number;
  correct: boolean;
  response: string;
  updatedAt: number;
}

export interface SettingRecord {
  id: string;
  value: unknown;
  updatedAt: number;
}

export const db = new Dexie('cortex') as Dexie & {
  attempts: EntityTable<AttemptRecord, 'id'>;
  settings: EntityTable<SettingRecord, 'id'>;
};

db.version(1).stores({
  attempts: 'id, itemId, topicId, answeredAt',
  settings: 'id',
});
```

`src/data/attempts.ts`:

```ts
import { db, type AttemptRecord } from '@/data/db';

export type { AttemptRecord };

/** Persist one answered item. */
export async function recordAttempt(
  input: Omit<AttemptRecord, 'id' | 'updatedAt'>,
): Promise<AttemptRecord> {
  const record: AttemptRecord = {
    ...input,
    id: crypto.randomUUID(),
    updatedAt: Date.now(),
  };
  await db.attempts.add(record);
  return record;
}

/** Every attempt at one item, oldest first. */
export async function attemptsForItem(
  itemId: string,
): Promise<AttemptRecord[]> {
  const found = await db.attempts.where('itemId').equals(itemId).toArray();
  return found.sort((a, b) => a.updatedAt - b.updatedAt);
}

export async function allAttempts(): Promise<AttemptRecord[]> {
  return db.attempts.toArray();
}

/** Wipe all local progress. Used by tests and by a future reset action. */
export async function clearAllData(): Promise<void> {
  await Promise.all([db.attempts.clear(), db.settings.clear()]);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- attempts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/ src/test/ vite.config.ts src/data/attempts.test.ts
git commit -m "feat: attempt persistence behind a repository over Dexie"
```

---

### Task 16: Practice session state machine

**Files:**
- Create: `src/session/machine.ts`
- Test: `src/session/machine.test.ts`

**Interfaces:**
- Consumes: `Item`, `gradeNumeric`, `gradeChoice`, `recordFreeResponse`, `describeNumericVerdict`.
- Produces:

```ts
export type Phase = 'answering' | 'reviewing' | 'finished';

export interface SessionState {
  items: readonly Item[];
  index: number;
  phase: Phase;
  lastResult: ItemResult | null;
  results: readonly ItemResult[];
}

export interface ItemResult {
  itemId: string;
  correct: boolean;
  response: string;
  feedback: string;
}

export function startSession(items: readonly Item[]): SessionState;
export function submitAnswer(state: SessionState, response: string, rating?: SelfRating): SessionState;
export function advance(state: SessionState): SessionState;
```

Pure reducers — no persistence, no React. The UI layer calls `recordAttempt`
when `submitAnswer` returns a new `lastResult`. A session with zero items starts
`finished`.

- [ ] **Step 1: Write the failing test**

`src/session/machine.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { advance, startSession, submitAnswer } from '@/session/machine';
import { findTopic, itemsAtDepth, loadBundle } from '@/content';

const bundle = loadBundle();
const chem = findTopic(bundle, 'chem.stoich.mole-ratio')!;
const items = itemsAtDepth(chem, 'honors');

describe('session machine', () => {
  it('starts on the first item, answering', () => {
    const state = startSession(items);
    expect(state.index).toBe(0);
    expect(state.phase).toBe('answering');
    expect(state.lastResult).toBeNull();
  });

  it('finishes immediately with no items', () => {
    expect(startSession([]).phase).toBe('finished');
  });

  it('moves to reviewing after an answer and records the result', () => {
    const state = submitAnswer(startSession(items), '3.00 mol');
    expect(state.phase).toBe('reviewing');
    expect(state.lastResult?.correct).toBe(true);
    expect(state.results).toHaveLength(1);
  });

  it('gives sig-fig specific feedback', () => {
    const state = submitAnswer(startSession(items), '3 mol');
    expect(state.lastResult?.correct).toBe(false);
    expect(state.lastResult?.feedback).toMatch(/significant figures/i);
  });

  it('advances to the next item and clears the last result', () => {
    const answered = submitAnswer(startSession(items), '3.00 mol');
    const next = advance(answered);
    expect(next.index).toBe(1);
    expect(next.phase).toBe('answering');
    expect(next.lastResult).toBeNull();
    expect(next.results).toHaveLength(1);
  });

  it('finishes after the last item', () => {
    let state = startSession(items);
    for (let i = 0; i < items.length; i += 1) {
      state = advance(submitAnswer(state, 'x'));
    }
    expect(state.phase).toBe('finished');
    expect(state.results).toHaveLength(items.length);
  });

  it('ignores a submit while reviewing', () => {
    const reviewing = submitAnswer(startSession(items), '3.00 mol');
    expect(submitAnswer(reviewing, '999')).toBe(reviewing);
  });

  it('grades a multiple-choice item by option id', () => {
    const mcq = items.filter((i) => i.type === 'mcq');
    const state = submitAnswer(startSession(mcq), 'c');
    expect(state.lastResult?.correct).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- session`
Expected: FAIL — cannot resolve `@/session/machine`.

- [ ] **Step 3: Write minimal implementation**

`src/session/machine.ts`:

```ts
import { gradeChoice } from '@/grading/choice';
import { describeNumericVerdict } from '@/grading/feedback';
import { recordFreeResponse, type SelfRating } from '@/grading/freeResponse';
import { gradeNumeric } from '@/grading/numeric';
import type { Item } from '@/content/types';

export type Phase = 'answering' | 'reviewing' | 'finished';

export interface ItemResult {
  itemId: string;
  correct: boolean;
  response: string;
  feedback: string;
}

export interface SessionState {
  items: readonly Item[];
  index: number;
  phase: Phase;
  lastResult: ItemResult | null;
  results: readonly ItemResult[];
}

export function startSession(items: readonly Item[]): SessionState {
  return {
    items,
    index: 0,
    phase: items.length === 0 ? 'finished' : 'answering',
    lastResult: null,
    results: [],
  };
}

function grade(
  item: Item,
  response: string,
  rating: SelfRating | undefined,
): { correct: boolean; feedback: string } {
  switch (item.type) {
    case 'numeric': {
      const verdict = gradeNumeric(response, item.answer);
      return {
        correct: verdict.overall,
        feedback: describeNumericVerdict(verdict, item.answer, response),
      };
    }
    case 'mcq': {
      const verdict = gradeChoice(response, item.answer);
      return {
        correct: verdict.correct,
        feedback: verdict.correct ? 'Correct.' : (verdict.explanation ?? 'Not correct.'),
      };
    }
    case 'frq':
    case 'recall': {
      const result = recordFreeResponse(response, rating ?? 'again');
      return {
        correct: result.correct,
        feedback: result.correct ? 'Marked as recalled.' : 'Marked for another look.',
      };
    }
  }
}

/** Answer the current item. No-op unless the session is in `answering`. */
export function submitAnswer(
  state: SessionState,
  response: string,
  rating?: SelfRating,
): SessionState {
  if (state.phase !== 'answering') return state;

  const item = state.items[state.index];
  const { correct, feedback } = grade(item, response, rating);
  const result: ItemResult = { itemId: item.id, correct, response, feedback };

  return {
    ...state,
    phase: 'reviewing',
    lastResult: result,
    results: [...state.results, result],
  };
}

/** Move past the worked solution to the next item, or finish. */
export function advance(state: SessionState): SessionState {
  if (state.phase !== 'reviewing') return state;
  const index = state.index + 1;
  return {
    ...state,
    index,
    phase: index >= state.items.length ? 'finished' : 'answering',
    lastResult: null,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- session`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/session/machine.ts src/session/machine.test.ts
git commit -m "feat: pure practice session state machine"
```

---

### Task 17: Practice UI and wiring

**Files:**
- Create: `src/ui/TopicList.tsx`, `src/ui/ItemView.tsx`, `src/ui/SolutionView.tsx`, `src/ui/SessionView.tsx`, `src/ui/styles.css`
- Modify: `src/App.tsx`, `src/main.tsx`
- Modify: `vite.config.ts` (add `environment: 'jsdom'` override for `.test.tsx`)
- Test: `src/ui/SessionView.test.tsx`

**Interfaces:**
- Consumes: `loadBundle`, `topicsForSubject`, `itemsAtDepth`, `findTopic`, the session machine, `recordAttempt`.
- Produces: a browsable topic list per subject, a practice session per topic, and a worked-solution view.

Deliberately plain presentation. The lab scene is milestone 4 and a separate plan;
this task must not anticipate it.

- [ ] **Step 1: Write the failing test**

Install the DOM testing dependencies first:

```bash
npm install -D jsdom @testing-library/react @testing-library/user-event
```

Add to `vite.config.ts` inside `test`:

```ts
    environmentMatchGlobs: [['src/**/*.test.tsx', 'jsdom']],
```

`src/ui/SessionView.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { findTopic, itemsAtDepth, loadBundle } from '@/content';
import { clearAllData } from '@/data/attempts';
import SessionView from '@/ui/SessionView';

const topic = findTopic(loadBundle(), 'chem.stoich.mole-ratio')!;
const items = itemsAtDepth(topic, 'honors');

describe('SessionView', () => {
  beforeEach(async () => {
    await clearAllData();
  });

  it('shows the first prompt', () => {
    render(<SessionView topic={topic} items={items} onExit={() => {}} />);
    expect(screen.getByText(/how many moles of H2/i)).toBeDefined();
  });

  it('reveals the worked solution after answering', async () => {
    const user = userEvent.setup();
    render(<SessionView topic={topic} items={items} onExit={() => {}} />);

    await user.type(screen.getByLabelText(/your answer/i), '3.00 mol');
    await user.click(screen.getByRole('button', { name: /check/i }));

    expect(screen.getByText(/^Correct\.$/)).toBeDefined();
    expect(screen.getByText(/conversion factor/i)).toBeDefined();
  });

  it('names a sig-fig error specifically', async () => {
    const user = userEvent.setup();
    render(<SessionView topic={topic} items={items} onExit={() => {}} />);

    await user.type(screen.getByLabelText(/your answer/i), '3 mol');
    await user.click(screen.getByRole('button', { name: /check/i }));

    expect(screen.getByText(/significant figures wrong/i)).toBeDefined();
  });

  it('shows the worked solution even when the answer was right', async () => {
    const user = userEvent.setup();
    render(<SessionView topic={topic} items={items} onExit={() => {}} />);

    await user.type(screen.getByLabelText(/your answer/i), '3.00 mol');
    await user.click(screen.getByRole('button', { name: /check/i }));

    expect(screen.getByRole('list', { name: /worked solution/i })).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- SessionView`
Expected: FAIL — cannot resolve `@/ui/SessionView`.

- [ ] **Step 3: Write minimal implementation**

`src/ui/SolutionView.tsx`:

```tsx
import type { Item } from '@/content/types';

export default function SolutionView({ item }: { item: Item }) {
  return (
    <section>
      <h3 id="worked-solution">Worked solution</h3>
      <ol aria-labelledby="worked-solution">
        {item.solution.map((step, i) => (
          <li key={i}>{step.text}</li>
        ))}
      </ol>
    </section>
  );
}
```

`src/ui/ItemView.tsx`:

```tsx
import { useState } from 'react';
import type { Item } from '@/content/types';
import type { SelfRating } from '@/grading/freeResponse';

interface Props {
  item: Item;
  onSubmit: (response: string, rating?: SelfRating) => void;
}

export default function ItemView({ item, onSubmit }: Props) {
  const [text, setText] = useState('');

  if (item.type === 'mcq') {
    return (
      <fieldset>
        <legend>{item.prompt}</legend>
        {item.answer.options.map((option) => (
          <button key={option.id} type="button" onClick={() => onSubmit(option.id)}>
            {option.text}
          </button>
        ))}
      </fieldset>
    );
  }

  if (item.type === 'frq' || item.type === 'recall') {
    return (
      <div>
        <p>{item.prompt}</p>
        <label htmlFor="attempt">Your answer</label>
        <textarea
          id="attempt"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="button" onClick={() => onSubmit(text, 'good')}>
          Check
        </button>
      </div>
    );
  }

  return (
    <div>
      <p>{item.prompt}</p>
      <label htmlFor="attempt">Your answer</label>
      <input
        id="attempt"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. 0.450 mol"
      />
      <button type="button" onClick={() => onSubmit(text)}>
        Check
      </button>
    </div>
  );
}
```

`src/ui/SessionView.tsx`:

```tsx
import { useState } from 'react';
import type { Item, Topic } from '@/content/types';
import { recordAttempt } from '@/data/attempts';
import type { SelfRating } from '@/grading/freeResponse';
import { advance, startSession, submitAnswer } from '@/session/machine';
import ItemView from '@/ui/ItemView';
import SolutionView from '@/ui/SolutionView';

interface Props {
  topic: Topic;
  items: readonly Item[];
  onExit: () => void;
}

export default function SessionView({ topic, items, onExit }: Props) {
  const [state, setState] = useState(() => startSession(items));

  const handleSubmit = (response: string, rating?: SelfRating) => {
    const next = submitAnswer(state, response, rating);
    setState(next);
    if (next.lastResult) {
      void recordAttempt({
        itemId: next.lastResult.itemId,
        topicId: topic.id,
        answeredAt: Date.now(),
        correct: next.lastResult.correct,
        response: next.lastResult.response,
      });
    }
  };

  if (state.phase === 'finished') {
    const right = state.results.filter((r) => r.correct).length;
    return (
      <section>
        <h2>Session complete</h2>
        <p>
          {right} of {state.results.length} correct.
        </p>
        <button type="button" onClick={onExit}>
          Back to topics
        </button>
      </section>
    );
  }

  const item = state.items[state.index];

  return (
    <section>
      <h2>{topic.title}</h2>
      <p>
        Question {state.index + 1} of {state.items.length}
      </p>

      {state.phase === 'answering' ? (
        <ItemView key={item.id} item={item} onSubmit={handleSubmit} />
      ) : (
        <div>
          <p>{state.lastResult?.feedback}</p>
          <SolutionView item={item} />
          <button type="button" onClick={() => setState(advance(state))}>
            Next
          </button>
        </div>
      )}
    </section>
  );
}
```

`src/ui/TopicList.tsx`:

```tsx
import type { Subject, Topic } from '@/content/types';

interface Props {
  subject: Subject;
  topics: readonly Topic[];
  onPick: (topic: Topic) => void;
}

export default function TopicList({ subject, topics, onPick }: Props) {
  return (
    <section>
      <h2>{subject === 'bio' ? 'Biology' : 'Chemistry'}</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            <button type="button" onClick={() => onPick(topic)}>
              {topic.title}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

`src/App.tsx`:

```tsx
import { useState } from 'react';
import { itemsAtDepth, loadBundle, topicsForSubject } from '@/content';
import type { Depth, Subject, Topic } from '@/content/types';
import SessionView from '@/ui/SessionView';
import TopicList from '@/ui/TopicList';
import '@/ui/styles.css';

export const appName = 'Cortex';

const DEPTH: Record<Subject, Depth> = { bio: 'level1', chem: 'honors' };

export default function App() {
  const bundle = loadBundle();
  const [active, setActive] = useState<Topic | null>(null);

  if (active) {
    return (
      <main>
        <SessionView
          topic={active}
          items={itemsAtDepth(active, DEPTH[active.subject])}
          onExit={() => setActive(null)}
        />
      </main>
    );
  }

  return (
    <main>
      <h1>{appName}</h1>
      <TopicList
        subject="bio"
        topics={topicsForSubject(bundle, 'bio')}
        onPick={setActive}
      />
      <TopicList
        subject="chem"
        topics={topicsForSubject(bundle, 'chem')}
        onPick={setActive}
      />
    </main>
  );
}
```

`src/ui/styles.css`:

```css
:root {
  color-scheme: light dark;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.5;
}

main {
  margin: 0 auto;
  max-width: 42rem;
  padding: 1.5rem 1rem 4rem;
}

button {
  cursor: pointer;
  font: inherit;
  padding: 0.5rem 0.9rem;
}

input,
textarea {
  display: block;
  font: inherit;
  margin: 0.35rem 0 0.75rem;
  max-width: 100%;
  padding: 0.5rem;
  width: 20rem;
}

textarea {
  min-height: 7rem;
}

ol li,
ul li {
  margin-bottom: 0.4rem;
}
```

Delete the now-redundant `src/smoke.test.ts`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run content && npm test`
Expected: PASS, whole suite green.

- [ ] **Step 5: Look at it in a browser**

Run: `npm run dev`, open the printed URL. Confirm by hand:
1. Both Biology and Chemistry topic lists render.
2. Opening *Mole Ratios* and answering `3.00 mol` reports `Correct.` and shows the worked solution.
3. Answering `3 mol` names the significant-figure error specifically.
4. Opening *Properties of Water* presents a recall item with a textarea, and the AP-only water-potential item is **absent** at `level1` depth.

- [ ] **Step 6: Commit**

```bash
git add src/ui/ src/App.tsx vite.config.ts package.json package-lock.json
git rm src/smoke.test.ts
git commit -m "feat: practice UI wiring topic browsing, grading and worked solutions"
```

---

## Self-Review

**Spec coverage for milestones 1–2:**

| Spec requirement | Task |
|---|---|
| §3 Repo layout (`content/`, `scripts/`, `src/{content,grading,session,data,ui}`) | 1, 8–17 |
| §3 Content model — Course/Unit/Topic/Item, all item fields | 8 |
| §3 `depth` tagging, per-subject depth values | 8, 10, 14 |
| §3 Content pipeline — build-time validation of every listed rule | 10, 11 |
| §3 `id` stability, duplicate detection | 10 |
| §3 Subject differences — bio teaches from scratch | 13 |
| §3 Data layer — repositories, `updatedAt`, nothing else touches Dexie | 15 |
| §4 Session flow, solution always revealed | 16, 17 |
| §4 Numeric grading — value / unit / sig figs reported separately | 2–6 |
| §4 MCQ with distractor explanations | 7, 17 |
| §4 FRQ/recall capture with self-rating, attempt retained | 7, 15, 16 |
| §7 Grading and content tested hardest | 2–11 |
| Licensing — `source`, OpenStax attribution enforced | 8, 10 |

Deferred to later plans by design: FSRS scheduling and the three study modes
(§4 Scheduling/Modes, milestone 3), lab scene (§5), stats and habits (§6),
content scale-up (§8 milestone 6), PWA and deploy (§11).

**Placeholder scan:** none. Task 6 contains a deliberate two-stage correction
rather than a placeholder — the first implementation is stated to fail the test,
and the exact fix follows.

**Type consistency checked:** `NumericAnswerSpec` (Task 5) matches
`numericAnswerSchema` (Task 8). `ChoiceAnswerSpec`/`ChoiceOption` (Task 7) match
`choiceAnswerSchema`. `SelfRating` is declared once in Task 7 and imported in
Tasks 16–17. `describeNumericVerdict` takes three arguments everywhere after the
Task 6 correction. `AttemptRecord` is declared in `db.ts` and re-exported from
`attempts.ts`, so there is one definition.

**Known gap, accepted:** `recordAttempt` is fire-and-forget in `SessionView`
(`void recordAttempt(...)`). A write failure is silent. Adding error surfacing
belongs with the stats work in a later plan, where there is UI to show it in.
