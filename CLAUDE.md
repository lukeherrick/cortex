# Cortex — working notes for Claude

A study app for **AP Biology** and **Honors / AP Chemistry**, built around the
only two study techniques that survive scrutiny in the research literature.

Read `docs/superpowers/specs/2026-10-01-cortex-design.md` for the full design.
Plans live in `docs/superpowers/plans/`.

---

## Who this is for

One owner: a high-school student currently in **Honors Chemistry**, preparing
for **AP Chemistry** and **AP Biology**.

**He does not write code.** Never ask him to read source, debug, or run
anything beyond `dev.cmd`. Reviews are about behaviour, not implementation.
Explain in plain English; if a word needs explaining, explain it.

**Biology matters more than chemistry to him, and carries more weight in the
app.** AP Biology is not available in his school schedule, so for that subject
the app is not a supplement to a class — it *is* the class. Biology content
must teach from scratch. Chemistry content may assume a teacher covered it.

**As of Q2 his chemistry teacher is on leave and the long-term sub is not
setting work.** The chem content is therefore his actual practice for the
quarter, not a revision aid. Coverage gaps are real costs.

---

## The two techniques — non-negotiable

Dunlosky et al. (2013) rated exactly two of ten techniques *high utility*
across 242 studies. They are the architecture, not features.

1. **Practice testing (retrieval practice).** Every item is a question he must
   attempt before any explanation unlocks. Recall beats recognition.
2. **Distributed practice (spacing).** The app owns *when* an item returns.

**Rejected by design** — the same review rated these low utility: highlighting,
rereading, summarisation as a primary study mode. A feature request that
amounts to "let me highlight the notes" gets declined, with the reason given.

Full citations are in the README and the spec.

---

## Content rules

### Voice — simple words, hard word in brackets

He asked for this explicitly. Write the plain phrase first, then the technical
term in parentheses so the term is still learned:

> how hard an atom pulls on shared electrons (electronegativity)
> things that get squeezed out of water (hydrophobic)

Short sentences. Everyday words. Never sacrifice accuracy for simplicity — if
a simplification would be wrong, keep the precise version and explain it.

### Questions must have character

He flagged AI-flavoured, monotone questions as a problem. Use concrete
scenarios — a pond freezing, sweat on a run, a redwood drinking, oil refusing
to mix. Not "Calculate the number of moles of X." A question should sound like
a person wrote it.

Distractors carry a `why` explaining the specific misconception. "Incorrect" is
never enough.

### Significant figures are enforced on every numeric answer

His decision. Value, unit and sig figs are graded separately and reported
separately, so "right chemistry, wrong sig figs" is its own outcome. Do not
loosen this without him asking.

### Chemistry coverage must be quiz-complete

Not illustrative. Every niche a real Honors Chem class would quiz on. The
sequence follows a standard US Honors Chemistry course (Santa Clara Unified
is the reference district).

### Biology is AP-only

Level 1 Biology was dropped deliberately. `depth: level1` is rejected by the
content validator for biology topics. Allowed biology depths: `ap`, `both`.

### Licensing

College Board exam questions are **copyrighted and never reproduced**. CED
topic outlines are public and followed. All problems are original and
AP-*style*. OpenStax (CC-BY) may be adapted **with attribution** — the
validator fails an `openstax` item that has no `attribution` field.

Every item declares `source`: `original` / `openstax` / `ai-generated`.
AI-generated items ship `verified: false` and render with a visible warning.

### Item ids are a stable contract

Review history is keyed to `id`. Renaming an id orphans his progress for that
item. The content build fails on duplicates.

---

## Design rules

**He told us plainly he would not open a bland app.** Visual appeal is a
functional requirement, not polish — an app he avoids has zero effectiveness
regardless of how good the grading is. Treat "it looks boring" as a bug.

**One biome per unit.** Each unit has a `biome` (meadow, reef, rainforest,
desert, tundra, volcano) with its own palette and cartoon animal mascot.
Distinct places are easier to hold apart than identical pages. Biome colours
are defined in `src/ui/styles.css` as `--biome` / `--biome-soft` pairs, light
and dark; mascots are inline SVG in `src/ui/biomes.tsx`.

**Self-grading must not feel like work.** He flagged four equal rating buttons
as a chore. Written items lead with two large choices (**Missed it** / **Got
it**) and keep the finer grades (hard / easy) as small secondary options. Prefer
auto-graded item types where the content allows it; he likes that MCQ grades
itself.

**The scene never delays answering.** Every animation is short and skippable,
and `prefers-reduced-motion` is honoured.

---

## Technical

- **Stack:** React 18 · Vite · TypeScript strict · Vitest · Zod · Dexie
- **Local-first.** No server, no accounts. Progress in IndexedDB, reached only
  through repositories in `src/data/` — that is the seam a sync adapter would
  use later. Every record carries `updatedAt`.
- **Content** is authored Markdown under `content/`, compiled by
  `scripts/build-content.ts` into `src/generated/content.json` (gitignored).
  Validation failures break the build, never a study session.
- **Module boundaries are strict.** `grading` knows nothing of FSRS; `scheduler`
  knows nothing of beakers; `lab`/`ui` read session state and never write
  progress. `src/content/*` uses relative imports so Node-side scripts work
  without Vite's `@/` alias.
- **Never use `crypto.randomUUID()` directly** — it is undefined outside a
  secure context, which breaks when the app is opened from a phone over plain
  http. Use `newId()` from `src/data/id.ts`.
- **No PWA/deploy yet.** When it lands: static HTTPS host, installed on iOS via
  Safari → Add to Home Screen. No Mac, Xcode, or Apple Developer account, ever.

### Commands

```
dev.cmd      start the dev server      (what the owner runs)
test.cmd     content build + tests     (what the owner runs)
npm test     tests (builds content first)
npm run build
npx tsc --noEmit
```

`.cmd` launchers exist because Windows defaults PowerShell's execution policy
to `Restricted`, which silently blocks profile scripts — so the conda hook
never loads and `npm` is not found. Do not replace them with `.ps1`.

Node and Python come from the conda env `cortex`. In a non-interactive shell
the profile does not load, so prepend the env to `PATH` rather than relying on
`conda activate`:

```
$env:Path = "C:\Users\lukeh\miniconda3\envs\cortex;" + $env:Path
```

### Testing weight

Not uniform. Two modules can actively teach falsehoods and get the heaviest
coverage: **`src/grading`** (sig figs, units, tolerances) and the scheduler
when it exists. A grading bug is worse than no app. Content validation rules
each have a failing-fixture test. The lab's visuals are checked by looking at
them.

Vitest runs **without `globals`**, so Testing Library's auto-cleanup does not
register — component test files must call `afterEach(cleanup)` themselves.

---

## Process

Superpowers skills are in use: brainstorm → spec → plan → TDD → verify.
Specs and plans are committed; they are the handoff, not this conversation.

Work on a branch, never commit straight to `main`. Merge only on a green
suite plus a clean `tsc`. Commit messages say *why*, and PowerShell here-strings
mangle long messages — use `git commit -F <file>`.

Report honestly: if a test caught a real bug, say so. If something is unverified
because it needs human eyes, say that instead of implying it was checked.

---

## Still unbuilt

Milestone 3 onward: FSRS scheduler and the Review / Learn / Cram modes, the
full lab scene, stats and the habit tracker, content scale-up, PWA and deploy.
The habit tracker's design (three input kinds, time slots, core/extra tiers,
the seeded habit set) is specified in §6 of the spec.
