# Cortex — Design Spec

**Date:** 2026-10-01
**Status:** Awaiting owner review
**Owner:** lukeherrick

---

## Plain-English summary

Cortex is a website — openable on a laptop or a phone, works offline — that
teaches and drills high-school chemistry and biology.

The owner is currently in **Honors Chemistry** and is preparing for **AP
Chemistry** and **AP Biology**. Both subjects are first-class tracks from v1.

Biology is the owner's primary interest, and critically, **the owner's school
schedule does not permit taking AP Biology.** For chemistry the app supplements
a real teacher; for AP Biology the app *is* the course. That asymmetry raises
the bar for the biology track: it must teach, not merely drill.

Open it, and it shows what's due today. Press start and the screen becomes a
cartoon lab bench. It asks one question at a time. Numeric answers are checked
for value, units, *and* significant figures. A full step-by-step solution
appears after every question, right or wrong. Behind the scenes it tracks what
you're forgetting and brings those items back just before you'd lose them.

The owner does not write code. All implementation is done by Claude; the owner
reviews behavior, not source.

---

## 1. Why this exists — the evidence base

Two techniques, and only two, were rated **high utility** by Dunlosky et al.
(2013) across 242 studies and 169,179 participants. They are the architecture
of this app, not features within it.

**Practice testing (retrieval practice)** — retrieving an answer *from* memory
rather than reading it back in. Recall beats recognition; multiple-choice is
the weak form. Every Cortex item is a question you must attempt before the
explanation unlocks.

**Distributed practice (spacing)** — spreading practice on any one item across
time rather than massing it. Cortex owns the *when*; the habit tracker exists
to make the return visit happen.

Sources:

- Dunlosky, Rawson, Marsh, Nathan & Willingham (2013), *Improving Students'
  Learning With Effective Learning Techniques*, Psychological Science in the
  Public Interest 14(1) —
  <https://www.whz.de/fileadmin/lehre/hochschuldidaktik/docs/dunloskiimprovingstudentlearning.pdf>
- Summary: *Strengthening the Student Toolbox*, American Educator —
  <https://www.aft.org/ae/fall2013/dunlosky>
- Latimier, Peyre & Ramus (2021), *A Meta-Analytic Review of the Benefit of
  Spacing out Retrieval Practice Episodes on Retention*, Educational
  Psychology Review — spaced vs. massed retrieval practice, g = 0.74 —
  <https://eric.ed.gov/?id=EJ1310148>
- Gilmore et al. (2025), *A Meta-analytic Review of the Effectiveness of
  Spacing and Retrieval Practice for Mathematics Learning* —
  <https://link.springer.com/article/10.1007/s10648-025-10035-1>
- Nine introductory STEM courses (2024) —
  <https://link.springer.com/article/10.1186/s40594-024-00468-5>

**Explicitly excluded**, as low-utility in the same review: highlighting,
rereading, and summarization as primary study modes. Feature requests that
amount to "let me highlight the notes" are declined by design.

---

## 2. Decisions locked during brainstorming

| Decision | Choice | Rationale |
|---|---|---|
| Platform | Local-first web app, installable PWA | Spacing requires daily access; daily means phone. A native desktop app is single-device and defeats the scheduler. |
| Stack | React + Vite + TypeScript | Fast to a working loop; the lab scene and session state need real state management. |
| Persistence | IndexedDB via Dexie, behind repositories | No server, no account, no running cost, works offline. |
| Scheduler | FSRS via `ts-fsrs` | Better-calibrated than SM-2, open-source, actively maintained. |
| Courses in v1 | Two tracks: Biology (Level 1 → AP Bio) and Chemistry (Honors → AP Chem) | Bio is the owner's main interest and is unavailable at school; chem is the current graded class. Both matter. |
| Content order | **Alternating units** — Bio U1, Chem U1, Bio U2, Chem U2, … | Keeps both tracks usable early; neither subject stalls. Slower to full coverage in either one. |
| Depth tagging | Bio: `level1` / `ap` / `both`. Chem: `honors` / `ap` / `both`. | Within a subject, the two levels share most topics; the AP layer is authored alongside and filtered until needed. |
| Content source | Authored bank + optional AI top-up | Trustworthy core, infinite tail. Pure AI generation risks teaching false worked solutions in a grade-bearing class. |
| Grading | Auto numeric (value/unit/sig-fig) + MCQ; self-graded FRQ | Chemistry is quantitative; sig-fig and unit errors are where points are actually lost. |
| Environment | Scene-based study mode | Literal "dive in" without the cost and distraction of an explorable world. |
| Habits | Auto-tracked study behavior + manual grid | The auto half enforces spacing and cannot be gamed. |
| Sync | Out of scope for v1 | Data layer designed so a sync adapter drops in later without touching the app. |

### Content licensing constraint

College Board exam questions are copyrighted and **will not be reproduced**.
CED *topic outlines* are public and are followed exactly. All problems are
original and AP-*style*. [OpenStax Chemistry 2e](https://openstax.org/details/books/chemistry-2e)
is CC-BY and may be adapted with attribution. Every item records its `source`.

---

## 3. Architecture

### Repo layout

```
cortex/
├─ content/                      # authored source of truth, version-controlled
│  ├─ bio/
│  │  └─ unit-01-chemistry-of-life/
│  │     ├─ _unit.md
│  │     └─ water-properties.md
│  └─ chem/
│     └─ unit-03-stoichiometry/
│        ├─ _unit.md             # unit metadata, CED mapping
│        └─ limiting-reagent.md  # one topic: concept + problem ladder
├─ scripts/
│  └─ build-content.ts           # validate + compile content → JSON
├─ src/
│  ├─ content/                   # types, Zod schemas, loader
│  ├─ scheduler/                 # ts-fsrs wrapper, due-queue logic
│  ├─ grading/                   # numeric + sig-fig + unit checker, MCQ
│  ├─ session/                   # session state machine
│  ├─ lab/                       # scene rendering, progress reactions
│  ├─ habits/                    # grid, streaks, derived study stats
│  ├─ data/                      # Dexie repositories (the sync seam)
│  └─ ui/                        # shared components
└─ docs/superpowers/specs/
```

Module boundaries are strict. `grading` does not know FSRS exists.
`scheduler` does not know what a beaker is. `lab` reads session state and
renders; it never writes progress.

### Content model

Four levels: **Course → Unit → Topic → Item**. One topic per Markdown file.

```yaml
---
id: chem.stoich.limiting-reagent
unit: chem.unit-03
title: Limiting Reagent
depth: both              # honors | ap | both
ced: [SPQ-4.1]
prereqs: [chem.stoich.mole-ratio]
---
```

Each **Item** carries:

| Field | Purpose |
|---|---|
| `id` | Stable; progress is keyed to it and must survive content edits |
| `tier` | `warmup` → `standard` → `challenge` → `ap` |
| `type` | `numeric` · `mcq` · `frq` · `recall` |
| `depth` | Bio: `level1` / `ap` / `both`. Chem: `honors` / `ap` / `both`. One file serves both levels of its subject. |
| `answer` | value + unit + sig-fig expectation + tolerance, or key/rubric |
| `solution` | **ordered steps**, each carrying reasoning, not just algebra |
| `source` | `openstax` · `original` · `ai-generated` |
| `verified` | boolean — AI-generated items ship `false` and are visibly marked |

The `depth` tag is what makes now-level / AP-later free: the AP items are
authored alongside the lower-level ones and simply filtered out until needed.

### Subject differences

The engine is subject-agnostic, but the item mix is not:

| | Chemistry | Biology |
|---|---|---|
| Dominant item types | `numeric`, `mcq` | `recall`, `frq`, `mcq` |
| Numeric content | Pervasive — stoichiometry, gas laws, equilibrium, thermo | Present but narrower — chi-square, Hardy-Weinberg, water potential, dilution, rates |
| Teaching burden on the app | Low — teacher exists | **High — no teacher exists** |

Because the app is the only AP Bio instruction the owner will get, biology
topics carry a `concept` body that is genuinely explanatory, not a one-line
refresher. Chemistry topics may assume class instruction happened.

Biology numeric items use the same grader; sig-fig expectations are authored
per item and are looser than chemistry's where AP Bio scoring is looser.

`id` stability is a hard requirement. Renaming an item id orphans the owner's
review history for that item. The content build fails on a duplicate id and
warns on a disappeared one.

### Content pipeline

`npm run content` parses every Markdown file, validates against a Zod schema,
and emits `src/generated/content.json`.

Build-time failures (not runtime):

- numeric answer missing a unit or sig-fig expectation
- solution with zero steps
- dangling `prereqs` reference
- duplicate item id
- unknown `ced` code format

Content errors must never surface mid-session.

### Data layer

Dexie over IndexedDB. Tables:

| Table | Contents |
|---|---|
| `cards` | FSRS state per item — stability, difficulty, due date, lapses |
| `attempts` | Every answer ever given; drives accuracy trends |
| `sessions` | Start/end, mode, items seen, summary |
| `habits` | Definitions — name, `kind` (check/count/value), target, unit, `slot`, `tier`, repeat days, archived flag |
| `habitEntries` | Per-day log — habit id, date, value, completed flag |
| `settings` | Course filter, depth, daily cap, reduced motion, API key |

Every record carries `id` and `updatedAt`. All access goes through repository
functions in `src/data/`; nothing else touches Dexie. This is the sync seam.

**Content is immutable and ships with the build. Progress is local and
user-owned.** Content updates can never corrupt review history.

Export/import of all user data to a JSON file is in v1 — it is the only
backup until sync exists.

---

## 4. The session loop

### Flow

1. Dashboard shows due count and topic breakdown.
2. Start → transition into the lab scene.
3. Per item:
   a. Prompt renders on the whiteboard.
   b. Owner answers (typed number + unit, MCQ selection, or free text).
   c. Submit → grading.
   d. **Worked solution always reveals**, right or wrong.
   e. Rating recorded → FSRS updates the card.
4. Session summary; streak and stats update; scene resolves.

Step (d) is non-negotiable. Reading the solution after a correct answer costs
seconds and catches correct-for-the-wrong-reason.

### Grading

**Numeric** — three independent checks, reported separately:

| Check | Behavior |
|---|---|
| Value | Within authored relative tolerance |
| Unit | Parsed and compared; dimensional equivalence accepted where authored |
| Sig figs | Counted against the authored expectation |

Feedback is specific: *"Value and units correct — significant figures wrong
(you gave 2, expected 3)."* A generic "incorrect" would waste the single most
valuable diagnostic in the app.

**MCQ** — direct comparison. Distractors carry authored explanations for why
they are wrong; the chosen distractor's explanation is shown.

**FRQ / recall** — attempt is captured, then the model answer and rubric
reveal. Owner self-rates *Again / Hard / Good / Easy*. The typed attempt is
stored so it can be re-read later and so AI rubric grading can be added later
without losing history.

### Scheduling

`ts-fsrs` drives intervals. Mapping from grading outcome to FSRS rating:

- numeric/MCQ fully correct → `Good` (owner may override to `Easy`)
- numeric correct but sig-fig or unit error → `Hard`
- incorrect → `Again`
- FRQ → owner's self-rating passes through directly

Constraints:

- **Prereq gating.** A topic is not introduced until its `prereqs` have been
  seen and answered correctly at least once.
- **Daily cap** (default 40 items, configurable). A long absence must not
  produce an unusable backlog; overflow rolls forward.
- **Interleaving.** Review queues mix topics within a course rather than
  blocking by topic — interleaving is a secondary effect worth preserving.

### Modes

| Mode | Queue | Affects scheduling |
|---|---|---|
| Review | Due cards, interleaved, capped | Yes |
| Learn | New topic, ladder warmup → standard → challenge → ap | Yes, seeds new cards |
| Cram | All items in a chosen unit, ignores due dates | **No** — does not corrupt the spacing model |

Cram exists because real tests exist. It is labeled in-app as a test-day tool,
not a learning mode, and it deliberately does not write FSRS state.

---

## 5. The lab environment

**Outside a session:** clean, bright dashboard — due count, streak, per-unit
progress. Calm, not gamey.

**Inside a session:** transition into a drawn lab bench. The whiteboard holds
the current prompt. Glassware fills as items clear. A correct `challenge` or
`ap` tier item triggers a brief reaction animation.

Visual direction: flat vector, cartoony, limited palette, hand-drawn feel,
uncluttered. Legibility of the problem text outranks every decorative concern.

**Hard constraints:**

- No animation may delay the owner's ability to answer the next question.
- All transitions are skippable.
- A reduced-motion setting disables scene animation entirely, and
  `prefers-reduced-motion` is respected by default.
- The scene is presentational. It reads session state; it never writes it.

---

## 6. Stats and habits

**Auto-tracked**, derived from real activity — no self-reported checkbox:

- due reviews cleared today (yes/no)
- sessions completed, items answered
- accuracy over time, overall and per unit
- current and longest streak

**Streak rule:** a day counts only if the day's due reviews were *cleared*.
Opening the app does not count. A streak that is trivially easy to maintain
carries no information and no motivation.

### Habit tracker

Daily-repeating health and hygiene habits, user-editable, with three input
kinds:

| Kind | Logging | Example |
|---|---|---|
| `check` | One tap | Wash face, stretch |
| `count` | Increment toward a target; progress ring | Water — 3.0 L, `+250 ml` per tap |
| `value` | Enter a number once | Sleep — 8 h · Steps — 10,000 |

**Slots.** Every habit carries `morning` · `night` · `anytime` ·
`on-study-start`. The dashboard surfaces the slot matching the current time of
day rather than one undifferentiated list. `on-study-start` habits render as a
single tap on the session start screen, before the first item.

**Repeat.** Daily by default; optionally a weekday subset.

**Tiers — the over-tracking safeguard.** Each habit is `core` or `extra`.

- `core` — counts toward **perfect day** and the habit streak
- `extra` — tracked and individually streaked, but missing it does **not**
  break a perfect day

Rationale: habit trackers die when a 10-item all-or-nothing grid turns one bad
day into a broken streak and the user stops opening the app. Tiering keeps the
data without the cliff. Tiers are user-editable; a habit can be promoted or
demoted at any time without losing its history.

**Streaks.** Per-habit streak, plus a perfect-day streak over `core` habits
only. A `count`/`value` habit shows partial progress but the day completes
only on hitting target.

**Seeded set** (owner-chosen, 2026-10-01; all editable in-app):

| Slot | Tier | Habit |
|---|---|---|
| morning | core | Wash face |
| morning | core | Stretch |
| morning | extra | Morning sunlight, 10 min |
| night | core | Wash face |
| night | core | Stretch |
| night | extra | Screens off 30 min before bed |
| anytime | core | Water — 3 L (`count`) |
| anytime | core | Sleep — 8 h (`value`) |
| anytime | core | Steps — 10,000 (`value`) |
| on-study-start | extra | Phone in another room |

**Constraint: no Apple Health integration.** A PWA cannot read HealthKit.
Steps and sleep are manual `value` entries. This is accepted, not deferred —
the entry UI must therefore be fast (one field, remembered keyboard type,
dismissible in a tap). An iOS Shortcuts-based import is explicitly out of
scope unless the owner reports manual entry as a real friction point.

**Deliberately excluded from v1:** habit-to-study-performance correlation
analytics. Needs months of data before it says anything true, and a plausible-
looking but underpowered correlation would be worse than none.

---

## 7. Testing strategy

Correctness is not uniform across this codebase. Two modules can actively
teach falsehoods and are tested accordingly.

**Tested hard, TDD, before anything depends on them:**

- `grading` — sig-fig counting, unit parsing and equivalence, tolerance
  boundaries. Table-driven tests over a broad case list including trailing
  zeros, scientific notation, exact counts, and compound units.
- `scheduler` — FSRS state transitions, due-queue construction, daily cap
  overflow, prereq gating, cram-mode non-mutation.
- `content` build — every validation rule has a failing-fixture test.

**Tested normally:** session state machine, repositories, habit/streak
derivation.

**Not unit-tested:** the lab scene's visual output. Verified by looking at it.

**Owner acceptance:** the real gate is the owner using it against actual
Honors Chem homework and reporting where it is wrong.

---

## 8. Milestones

| # | Deliverable | Owner-visible outcome |
|---|---|---|
| 1 | App skeleton, content pipeline, one topic, ~10 items | Proof the chain works end to end |
| 2 | Grading engine + worked-solution display | **Usable against real homework** |
| 3 | FSRS scheduler + Review/Learn/Cram | Memory system active |
| 4 | Lab scene | Stops looking like a spreadsheet |
| 5 | Stats + habit tracker (3 input kinds, slots, core/extra tiers) | Streaks and daily routine |
| 6 | Content scale-up — **alternating** Bio U1, Chem U1, Bio U2, Chem U2, … | Both subjects grow together |
| 7 | PWA install + deploy | Study on phone, offline |

Milestone 1 seeds **one topic in each subject**, not one overall — the engine
must prove itself against a numeric-heavy chem topic and a recall-heavy bio
topic before anything scales.

Post-v1, in order: surface AP depth in both subjects (already authored
alongside), AI top-up generation, cross-device sync.

---

## 9. Out of scope for v1

- Accounts, multi-user, classroom features
- Cross-device sync (the seam exists; the adapter does not)
- AI rubric grading of free response
- Explorable 2D world / avatar movement
- Habit-to-performance correlation analytics
- Any subject beyond Biology and Chemistry
- Lab-practical / experimental-design simulation (AP Bio investigations)

---

## 10. Open risks

| Risk | Mitigation |
|---|---|
| **Content volume is the project.** Four courses is a multi-thousand-item effort; code is ~20% of the work. | Vertical slice first; engine stable before content scales. Alternating-unit cadence keeps both subjects usable while neither is complete. AP depth authored alongside base level, never as a second pass. |
| Biology must *teach*, not just drill — no teacher exists for AP Bio. | Bio topics carry explanatory `concept` bodies, reviewed for correctness before shipping. Bio accuracy bugs are treated as severity-one. |
| iOS may clear site data on reset or manual clear, destroying all progress. | One-tap JSON export/import in v1; prompt the owner to export periodically until sync exists. Home-screen install also exempts the app from Safari's 7-day storage eviction. |
| AI-generated items could teach false methods. | `verified: false` by default, visibly marked in UI, never seeded into the authored core. |
| Sig-fig and unit parsing is subtler than it looks. | Heaviest test coverage in the codebase; ship milestone 2 only when the table-driven suite is green. |
| Owner cannot review source. | Reviews are framed as behavior, not code. Every milestone ends with something runnable. |
| Scene work expands and displaces studying. | Scene is milestone 4, after the app is already useful. Hard constraint that it never delays answering. |
| Item `id` churn orphans review history. | Build fails on duplicate ids, warns on vanished ids. Ids treated as a stable public contract. |
| OneDrive corrupts the working tree. | Repo relocated to `C:\Users\lukeh\dev\cortex`, outside OneDrive sync. |

---

## 11. Deployment and iPhone install

No macOS, Xcode, or Apple Developer account is required, and none will be
introduced. The app ships as a PWA served over HTTPS from a free static host
(GitHub Pages or Vercel), and is installed on iOS via Safari →
Share → **Add to Home Screen**.

Consequences of that choice, all accepted:

- Install must be done in **Safari**; third-party iOS browsers cannot add a
  home-screen web app reliably.
- **Web Push on iOS requires home-screen installation** (iOS 16.4+). Study
  reminders are therefore gated behind install, which is acceptable — install
  is step one regardless.
- Service worker + precached content bundle give full offline study. The
  content bundle is versioned; a new deploy updates content without touching
  user progress.
- Progress is device-local. **Export/import of all user data to JSON is a v1
  requirement, not a nice-to-have** — it is the only backup until sync exists.
- A home-screen PWA is exempt from Safari's 7-day script-writable storage
  eviction, but not from a device reset or a manual "Clear Website Data".

Requires an iOS target of 16.4 or later for push; the app itself degrades
gracefully on older versions (no reminders, everything else works).

---

## 12. Environment (as built, 2026-10-01)

- Conda env `cortex`: Python 3.12.14, Node 22.23.2, npm 10.9.8
- `C:\Users\lukeh\miniconda3\condabin` added to user PATH
- Conda hook written to `OneDrive\Documents\WindowsPowerShell\profile.ps1`
  (`conda init` could not write there directly; profile authored manually)
- Repo: `C:\Users\lukeh\dev\cortex` → <https://github.com/lukeherrick/cortex> (private)
- PowerShell 7 (`pwsh`) is **not** configured for conda; only Windows
  PowerShell 5.1
