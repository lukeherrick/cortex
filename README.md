# Cortex

**[lukeherrick.github.io/cortex](https://lukeherrick.github.io/cortex/)**

A study and habit tracker with a built-in biology and chemistry curriculum —
**48 topics, 313 practice problems**, every one with a step-by-step worked
solution rather than an answer key. Add it to an iPhone home screen and it runs
as an offline app.

It is built around the two study techniques that hold up in the research
literature, and it refuses to implement the ones that don't.

---

## Why this exists

Most study apps are a flashcard box or a to-do list. Neither teaches. Dunlosky
et al. (2013) reviewed 10 common study techniques against 242 studies (169,179
participants) and rated exactly **two** as *high utility* — effective across
ages, materials and subject areas. Those two are the architecture here, not a
feature.

### 1. Practice testing (retrieval practice)

Pulling an answer *out* of memory rather than reading it back in. Free recall
and short answer beat multiple-choice recognition. Every topic is delivered as
a question you must attempt before the explanation unlocks — there is no way to
read the solution first.

- Dunlosky, Rawson, Marsh, Nathan & Willingham (2013), *Improving Students'
  Learning With Effective Learning Techniques*, Psychological Science in the
  Public Interest 14(1) —
  [full text (PDF)](https://www.whz.de/fileadmin/lehre/hochschuldidaktik/docs/dunloskiimprovingstudentlearning.pdf)
- Plain-English summary: [Strengthening the Student Toolbox](https://www.aft.org/ae/fall2013/dunlosky), *American Educator*
- [Kent State summary of the findings](https://www.kent.edu/psychology/all-study-strategies-not-created-equal-according-kent-state-researchers)

### 2. Distributed practice (spacing)

Spreading practice on any one item across time instead of massing it into one
session. Cortex schedules *when* each item comes back using
[FSRS](https://github.com/open-spaced-repetition/ts-fsrs), and the habit tracker
exists to make the return visit actually happen.

- Same Dunlosky review, second high-utility rating
- Latimier, Peyre & Ramus (2021), *A Meta-Analytic Review of the Benefit of
  Spacing out Retrieval Practice Episodes on Retention*, Educational Psychology
  Review — [ERIC](https://eric.ed.gov/?id=EJ1310148) ·
  [PDF](http://www.lscp.net/persons/ramus/docs/EPR20.pdf) — spaced vs. massed
  retrieval practice, g = 0.74
- Gilmore et al. (2025), *A Meta-analytic Review of the Effectiveness of
  Spacing and Retrieval Practice for Mathematics Learning*, Educational
  Psychology Review — [Springer](https://link.springer.com/article/10.1007/s10648-025-10035-1)
- Meta-analyses across nine introductory STEM courses (2024) —
  [IJ STEM Education](https://link.springer.com/article/10.1186/s40594-024-00468-5)

**Deliberately excluded**, because the same review rated them low utility:
highlighting, rereading and summarization as primary study modes. If a feature
request amounts to "let the user highlight the notes," the answer is no. The
in-app technique guide lists highlighting under *Not worth your time* and says
why.

---

## Content

| Track | Units | Topics | Problems | State |
|---|---|---|---|---|
| AP Biology | 8 of 8 | 26 | 173 | Complete |
| Chemistry | 8 of 14 written | 22 | 140 | In progress |

Chemistry units 1–8 (Measurement, Atomic Structure, Periodic Trends, Bonding,
Nomenclature, The Mole, Reactions, Stoichiometry) are written. Units 9–14
(Gases, Solutions, Thermochemistry, Acids & Bases, Equilibrium, Redox) exist as
unit definitions with no topics yet. Periodic Trends and Bonding are thin — one
topic each — and are the next thing to fill in.

Problems are tiered **warm-up → standard → challenge → AP-exam grade**
(55 / 169 / 72 / 17) across four formats:

| Format | Count | Grading |
|---|---|---|
| Multiple choice | 170 | Self-grading, and every wrong option explains why it's wrong |
| Numeric | 94 | Value, unit and significant figures judged separately |
| Recall | 33 | Self-rated against a model answer |
| Free response | 16 | Self-rated against a rubric |

All 313 items are original, and all 313 are checked by a test that re-grades
every item against its own authored answer on every build.

### The biology track carries more weight

AP Biology isn't available in the owner's school schedule, so there the app
isn't a supplement to a class — **it is the class.** Biology topics are written
to teach from scratch and assume nothing. Chemistry runs alongside an actual
Honors Chemistry course and may assume a teacher covered the idea first.

Chemistry is a single sequence rather than separate Honors and AP tracks,
because the local district runs the same unit order for both.

### How it's written

Every hard word is introduced as a short phrase with the technical term in
brackets after it — "the pushing-apart force (repulsion)" — so the plain
meaning lands first and the exam vocabulary is still there for recall. Prompts
are written with some character in them rather than as flat generated
questions.

Topics are Markdown with YAML frontmatter in [`content/`](content/). The build
validates them with Zod and refuses to compile on a duplicate id, a dangling or
circular prerequisite, a multiple-choice answer that matches no option, a
distractor with no explanation, or a worked solution too short to be real.

---

## Significant figures are enforced

Chemistry courses mark them, so the app marks them. A numeric answer gets three
independent verdicts — **value**, **unit** and **significant figures** — and you
are told which of the three you missed rather than just "wrong." The value
tolerance is 0.2%. `1,200`, `6.02 x 10^23` and `6.02e23` all parse; units are
compared case-sensitively, because `mL` and `ML` differ by a factor of a
million.

---

## What else is in it

- **A study-technique guide** — 10 techniques in three tiers (*Proven*,
  *Worth doing*, *Not worth your time*), each with what it is, why it works,
  which subjects it suits, and what it is bad for. Pick one and it drives the
  focus timer: its own block length, and its own reminders on screen at the
  moment they apply.
- **A focus timer** that runs on wall-clock deadlines rather than counting
  ticks, so backgrounding the app cannot drift it. It holds a **wake lock** so
  the screen stays on while it runs, and breaks never auto-start.
- **A meadow scene** behind the timer that reacts to the phase you're in.
- **Eight biomes** — reef, rainforest, volcano, savanna, meadow, cave, desert,
  tundra — one per unit, each with its own cartoon mascot.
- **Mastery from FSRS stability, not answer counts.** A topic is *solid* at 7
  days of predicted retention and *mastered* at 21, so getting three in a row
  right by luck doesn't fake progress. Topics grow seedling → sprout → budding
  → flowering.
- **Habit tracking** — water (3 L), steps (10k), sleep (8 h), stretch and wash
  face morning and night, 10 minutes of morning sunlight, phone in another
  room, screens off 30 minutes before bed. Streaks are counted and shown
  prominently.
- **A cram mode** that never writes scheduling state, so revising before a test
  can't corrupt your long-term spacing.
- **A daily cap** that limits one sitting rather than the debt, so a week away
  doesn't produce a 300-item wall.

---

## Running it on a phone

No Mac, no Xcode, no Apple Developer account, no App Store.

1. Open **Safari** on the iPhone — this only works in Safari.
2. Go to **[lukeherrick.github.io/cortex](https://lukeherrick.github.io/cortex/)**
3. **Share** → **Add to Home Screen** → **Add**.

It gets an icon, runs fullscreen and portrait-locked, and works offline.

Because it caches itself for offline use, an already-installed copy can serve
the old version after a deploy. Load the site in Safari and pull to refresh;
the home-screen app picks the new version up after that.

**Progress is stored on the device**, not on a server. It does not sync between
phone and laptop, and deleting the app clears it. The backup panel exports
everything as a JSON file — use it if losing a long streak would sting.

---

## Running it locally

```
dev.cmd
```

That's all. Double-click it in Explorer or run it from any terminal. It finds
the `cortex` conda environment itself and opens a browser.

- `test.cmd` — content build plus the full test suite (1,727 tests, 33 files)
- `phone.cmd` — serves to other devices on the same WiFi. Over plain http a
  browser will run the app but **will not install it or cache it offline**;
  that needs https, which means deploying.

These are `.cmd` files on purpose. Windows ships PowerShell's execution policy
as `Restricted`, which silently refuses to run profile scripts — so the
`conda init` hook never loads, `conda activate` appears to succeed while doing
nothing, and `npm` is then not found. `.cmd` files are exempt from that policy,
so the launchers work regardless of how the shell is configured.

### If you want `conda activate` to work normally

Optional, one command, no admin rights:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

`RemoteSigned` is Microsoft's recommended setting for development machines: it
runs local scripts and still blocks unsigned ones downloaded from the internet.
Then, in a new terminal:

```
conda activate cortex
npm run dev
```

### Toolchain

Node and Python come from a conda environment so versions are pinned and
reproducible on a fresh machine.

```
conda create -n cortex -c conda-forge python=3.12 nodejs=22 git
```

React 18 · Vite 5 · TypeScript (strict) · Vitest · Zod · Dexie (IndexedDB) ·
ts-fsrs · vite-plugin-pwa. Currently Node 22, Python 3.12.

Deploys to GitHub Pages from `main` via Actions.

---

## Roadmap

- [x] Environment, repo, design spec
- [x] Curriculum data model and content pipeline
- [x] Retrieval-practice session loop
- [x] Significant-figure grading
- [x] FSRS spaced scheduler, prerequisite gating, daily cap
- [x] Habit tracker and streaks
- [x] Biome and lab scenes, mascots, mastery growth stages
- [x] Study-technique guide driving the focus timer
- [x] PWA, offline, wake lock, JSON backup
- [x] AP Biology — all 8 units
- [ ] Chemistry units 9–14; fill out Periodic Trends and Bonding
- [ ] Habit editing in the UI
- [ ] Cross-device sync

---

## License

The source is public so the app can be served from GitHub Pages, but no licence
is granted — all rights reserved.

All 313 practice problems are original. No College Board material is
reproduced. The content pipeline supports OpenStax (CC BY) excerpts and will
refuse to build one without attribution, but nothing currently shipped uses it.

*AP* is a trademark of the College Board, which is not affiliated with this
project and has not endorsed it.
