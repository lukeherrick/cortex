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

---

## Development environment

Node and Python come from a conda environment so the toolchain is pinned and
reproducible on a fresh machine.

```bash
# one time
conda create -n cortex -c conda-forge python=3.12 nodejs=22 git

# every session
conda activate cortex
```

Windows note: if `conda` is not on PATH, initialize your shell once with
`C:\Users\<you>\miniconda3\Scripts\conda.exe init powershell`, then reopen the
terminal.

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
