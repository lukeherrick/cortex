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

### Unit ids are slugs, not numbers

`chem.u-stoichiometry`, not `chem.unit-08`. Sequence lives in the `order`
field, so inserting or resequencing a unit never churns ids. Directory names
carry the number purely for human sorting (`content/chem/08-stoichiometry/`)
and the build ignores them.

All 22 units of both courses exist as `_unit.md` stubs with biomes assigned.
Empty units render as "content on the way", which makes the roadmap visible in
the app. Add topics into them; do not create new unit files for existing units.

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

**A faded cartoon backdrop sits behind everything** (`src/ui/Backdrop.tsx`):
hills, sun, clouds, drifting molecules, drawn as inline SVG and tinted from
theme tokens. Kept deliberately low-contrast — the owner asked for atmosphere,
and a backdrop that competes with question text is a defect. It is fixed,
`aria-hidden` and pointer-inert. This is **not** the lab scene from spec §5;
that is still unbuilt.

**Wrong is not one thing.** A verdict renders green (correct), amber (right
value, wrong sig figs or units), or red (actually wrong). Getting the chemistry
right and the rounding wrong must not look like failure.

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

**`src/content/integrity.test.ts` runs over the real shipped content**, not
fixtures. It asserts every numeric item accepts its own authored answer written
to its authored sig figs, every MCQ grades its own `correctId` as correct and
explains every distractor, every written item has a model answer and rubric,
every item has real worked steps, and every topic body is long enough to teach.

**But no test can tell you whether the chemistry is true.** Three content bugs
have shipped and been caught only by rechecking arithmetic by hand — a
corrupted prompt, invented masses that did not resolve to a whole-number
formula, and two mis-rounded answers. **Recompute every numeric answer and
every worked step by hand before committing content.** Treat this as a required
step, not diligence.

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

## Where the content stands

Last updated 2026-10-02. **22 units mapped, 17 topics, 88 items.**

### Chemistry — 2 of 14 units complete

| Unit | State |
|---|---|
| 6 · The Mole | **complete** — molar mass, mole conversions, percent composition, empirical/molecular formulas |
| 8 · Stoichiometry | **complete** — mole ratios, mass-to-mass, limiting reagent, percent yield |
| all others | mapped, empty |

### Biology — 3 of 8 units complete

| Unit | State |
|---|---|
| 1 · Chemistry of Life | water properties only — **needs more topics** (macromolecules, pH) |
| 2 · Cell Structure | **complete** — organelles, surface area to volume, membrane structure, transport |
| 3 · Cellular Energetics | **complete** — ATP, enzymes, respiration, photosynthesis |
| all others | mapped, empty |

### Next up, in order

1. **Chemistry units 1 and 2** — Matter & Measurement, Atomic Structure. These
   sit *before* everything chemistry currently has, and Measurement is where
   significant figures are actually taught, which the app enforces everywhere.
2. Finish Biology unit 1 (macromolecules, pH) — it is the thinnest complete-
   looking unit.
3. Chemistry units 5 and 7 (Nomenclature, Reactions) — both are prerequisites
   for Stoichiometry that do not exist yet.
4. Then the scheduler (see below), because by then there is enough content for
   spacing to matter.

---

## What is working in content authoring

Keep doing these — they are why the content is good, not incidental.

**Write against the misconception, not around the fact.** Every topic targets
the specific thing learners get wrong, and says so outright: ATP's energy is
not stored in a bond; an enzyme changes how fast you get there, never where you
end up; oxygen is respiration's exit, not its fuel; the oxygen you breathe came
from water, not CO2. State the wrong version and kill it.

**Distractors are the teaching.** Each wrong MCQ option names the specific
misconception that would lead someone there. The validator enforces that a
`why` exists; make it a real explanation, not a restatement.

**Anchor in something physical.** Sweating on a run, a pond freezing top-down,
butter versus olive oil, fertiliser nitrogen percentages, brown fat, cyanide,
thermite, the Haber process. A worked solution that ends with a real-world
consequence lands far better than one that ends with a number.

**Wire the prereq graph deliberately.** It is doing real pedagogical work now:
Enzymes requires Properties of Water (the hydrophobic effect folds the active
site); Respiration and Photosynthesis require Membrane Structure (chemiosmosis
only works because the membrane is H+-tight). Those links are what a textbook's
chapter order cannot give. Look for them rather than defaulting to `prereqs: []`.

**End the concept body with the causal chain**, when there is one. Biology
exams test the chain, not the list.

---

## The scheduler

Built. `ts-fsrs` 5.x drives it. Three layers, all pure except the repository:

- `src/scheduler/rating.ts` — maps an answer outcome to an FSRS grade. Correct
  → Good. **Near miss (right value, wrong sig figs or units) → Hard, not
  Again** — the chemistry was understood, so burying it for a week is wrong,
  but so is treating it as clean. Wrong → Again. Self-ratings pass straight
  through. `Easy` is never produced by auto-grading: it is a claim only the
  learner can make.
- `src/scheduler/schedule.ts` — converts between `CardRecord` (epoch ms, for
  IndexedDB and export) and the library's `Date`-based `Card`, and applies a
  review. Pure: hands back the next record, persisting is the caller's job.
- `src/scheduler/queue.ts` — review queue (due only, **round-robin across
  topics** so interleaving survives, most overdue first within a topic, capped
  at 40), prerequisite gating, learnable topics, and the cram queue.

**`everCorrect` exists on the card because FSRS state cannot answer "has this
ever been got right".** A card can be in review having only ever been failed.
Prerequisite gating needs the real answer, so it is tracked explicitly. A near
miss does **not** set it.

**Cram must never write scheduling state.** A panicked run through a unit the
night before a test must not convince the scheduler the material is learned.
`SessionView` returns early before the card write when `mode === 'cram'`;
there is a test asserting the attempt is still logged while the card stays
absent. Do not "fix" that asymmetry.

**The daily cap limits one sitting, never what is owed.** Overflow is not
dropped — `dueCount` ignores the cap deliberately, and there is a test for it.

`SessionView` takes `QueueEntry[]` (item **plus its topic**) rather than a
single topic, because review interleaves across topics. Its `title` is the
sitting's name; the per-item topic shows underneath when they differ.

---

## Still unbuilt

In spec order:

- **The lab scene** — the drawn bench you drop into. Spec §5. Note that the
  faded cartoon backdrop (`src/ui/Backdrop.tsx`) already exists and is separate
  from this.
- **Stats + habit tracker.** Three input kinds, time slots, core/extra tiers,
  and the owner's seeded habit set are fully specified in spec §6.
- **PWA + deploy.** Spec §11.
- **Export/import of all progress to JSON** — a v1 requirement, not optional:
  it is the only backup until sync exists, and iOS can clear site data.

Progress is already being written to IndexedDB on every answer, but **nothing
in the UI displays it yet**. That lands with the stats work.
