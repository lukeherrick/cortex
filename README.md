# Cortex

A study + habit tracking web app with a built-in, fully-mapped curriculum for
**Biology (Level 1 / CP)**, **AP Biology**, **Honors Chemistry**, and **AP Chemistry** —
every unit, every topic, with step-by-step worked solutions to practice problems
that ramp from easy to AP-exam hard.

Wrapped in a cartoony-but-clean science-lab world. When you start a session you
don't open a list — you *walk into the lab*.

> Status: **design phase.** Nothing is implemented yet. See [Roadmap](#roadmap).

---

## Why this exists

Most study apps are either a flashcard box or a to-do list. Neither teaches.
Cortex is built around the two learning techniques that actually survive
scrutiny in the research literature, and everything else in the app exists to
serve them.

### The two techniques this app is built on

Dunlosky et al. (2013) reviewed 10 common study techniques against 242 studies
(169,179 participants) and rated exactly **two** as *high utility* — effective
across ages, materials, and subject areas. Those two are the architecture of
this app, not a feature of it.

**1. Practice Testing (retrieval practice)**

Pulling an answer *out* of memory, rather than reading it back in. Free recall
and short-answer beat multiple-choice recognition. Every Cortex topic is
delivered as a question you must attempt before the explanation unlocks.

- Dunlosky, Rawson, Marsh, Nathan & Willingham (2013), *Improving Students'
  Learning With Effective Learning Techniques*, Psychological Science in the
  Public Interest 14(1) —
  [full text (PDF)](https://www.whz.de/fileadmin/lehre/hochschuldidaktik/docs/dunloskiimprovingstudentlearning.pdf)
- Plain-English summary: [Strengthening the Student Toolbox](https://www.aft.org/ae/fall2013/dunlosky), *American Educator*
- [Kent State summary of the findings](https://www.kent.edu/psychology/all-study-strategies-not-created-equal-according-kent-state-researchers)

**2. Distributed Practice (spacing)**

Spreading practice on any one item across time instead of massing it into one
session. Cortex schedules *when* a topic comes back, and the habit tracker
exists to make the return visit actually happen.

- Same Dunlosky review (above), second high-utility rating
- Latimier, Peyre & Ramus (2021), *A Meta-Analytic Review of the Benefit of
  Spacing out Retrieval Practice Episodes on Retention*, Educational Psychology
  Review — [ERIC record](https://eric.ed.gov/?id=EJ1310148) ·
  [PDF](http://www.lscp.net/persons/ramus/docs/EPR20.pdf) — spaced vs. massed
  retrieval practice, g = 0.74
- Gilmore et al. (2025), *A Meta-analytic Review of the Effectiveness of
  Spacing and Retrieval Practice for Mathematics Learning*, Educational
  Psychology Review — [Springer](https://link.springer.com/article/10.1007/s10648-025-10035-1)
- Single-paper meta-analyses across nine introductory STEM courses (2024) —
  [IJ STEM Education](https://link.springer.com/article/10.1186/s40594-024-00468-5)

**Deliberately excluded**, because the same review rated them low utility:
highlighting, rereading, and summarization as primary study modes. If a feature
request amounts to "let the user highlight the notes," the answer is no.

---

## Scope

| Track | Coverage |
|---|---|
| Biology — Level 1 / College Prep | Full year, unit by unit |
| AP Biology | All College Board units, AP-style MCQ + FRQ |
| Chemistry — Honors | Full year, unit by unit |
| AP Chemistry | All College Board units, AP-style MCQ + FRQ |

Each topic carries a problem ladder — **warm-up → standard → challenge →
AP-exam grade** — every problem with a step-by-step worked explanation, not
just an answer key.

Content is written in **alternating units** — Bio Unit 1, Chem Unit 1, Bio
Unit 2, and so on — so both subjects stay usable while neither is finished.

**The biology track carries more weight.** AP Biology isn't available in the
owner's school schedule, so there the app isn't a supplement to a class —
it *is* the class. Biology topics are written to teach from scratch;
chemistry topics may assume a teacher covered it.

---

## Running it on a phone

No Mac, no Xcode, no Apple Developer account, no App Store. Cortex is a PWA:
deploy to any static HTTPS host, open the URL in Safari on iOS, then
Share → **Add to Home Screen**. It gets an icon, runs fullscreen, works
offline.

Progress is stored on the device. One-tap JSON export is the backup until
cross-device sync exists.

---

## Running it

```
dev.cmd
```

That's all. Double-click it in Explorer, or run it from any terminal. It finds
the `cortex` conda environment itself and opens your browser.

`test.cmd` runs the content build and the full test suite the same way.

`phone.cmd` serves the app to other devices on the same WiFi, so you can use it
on a phone while the laptop is on. Note the limitation: over plain http a
browser will run the app but **will not install it or cache it offline** —
that needs https, which means deploying.

Both are `.cmd` files on purpose. Windows ships with PowerShell's execution
policy set to `Restricted`, which silently refuses to run profile scripts — so
the `conda init` hook never loads, `conda activate` appears to succeed while
doing nothing, and `npm` is not found. `.cmd` files are exempt from that
policy, so the launchers work regardless of how the shell is configured.

### If you want `conda activate` to work normally

Optional. One command, no admin rights needed:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

`RemoteSigned` is Microsoft's recommended setting for development machines: it
runs local scripts and still blocks unsigned scripts downloaded from the
internet. After that, in a new terminal:

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

Currently: Node 22, Python 3.12.

---

## Roadmap

- [x] Environment + repo
- [ ] Design doc / spec (`docs/superpowers/specs/`)
- [ ] Implementation plan
- [ ] Curriculum data model + first unit of content
- [ ] Retrieval-practice session loop
- [ ] Spaced scheduler
- [ ] Habit tracker + streaks
- [ ] Lab environment UI

---

## License

Private project. All rights reserved.
