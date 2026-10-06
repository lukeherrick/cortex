---
id: bio.comm.cell-cycle
unit: bio.u-cell-communication
subject: bio
title: The Cell Cycle, Mitosis and Cancer
depth: both
ced:
  - IST-1.D
prereqs:
  - bio.cell.organelles
items:
  - id: bio.comm.cell-cycle.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "Most of a cell's life is spent in interphase, not dividing. What is actually happening during it?"
    answer:
      correctId: c
      options:
        - id: a
          text: Nothing - the cell is resting between divisions
          why: "Interphase is the busiest part of a cell's life. The old name 'resting phase' was simply wrong."
        - id: b
          text: The chromosomes are lining up ready to separate
          why: "Lining up happens in metaphase, during mitosis. Interphase is before that."
        - id: c
          text: The cell grows, carries out its normal job, and copies its DNA
        - id: d
          text: The nuclear membrane is breaking down
          why: "That happens at the start of mitosis, after interphase ends."
    solution:
      - text: "Interphase has three parts: G1, S and G2."
      - text: "G1 - the cell grows and does whatever its job is. A liver cell spends almost all its time here."
      - text: "S - synthesis. The DNA is copied, so every chromosome ends up as two identical sister chromatids."
      - text: "G2 - more growth, and the cell makes the proteins it will need to divide."
      - text: "Then mitosis, which is brief. Typically interphase is over 90% of the cycle."
      - text: "Calling interphase a resting phase, as older textbooks did, is badly wrong. It is when the cell actually lives."
    source: original
    verified: true
  - id: bio.comm.cell-cycle.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "A human cell has 46 chromosomes in G1. How many chromosomes does it have at the end of S phase?"
    answer: { value: 46, unit: null, sigFigs: null }
    solution:
      - text: "The answer is deliberately counter-intuitive, so take it slowly."
      - text: "In S phase the DNA is copied, so there is twice as much DNA."
      - text: "But the two copies stay joined at the centromere, and while they are joined they count as ONE chromosome with two sister chromatids."
      - text: "So the cell has 46 chromosomes and 92 chromatids."
      - text: "A chromosome is counted by its centromeres. One centromere means one chromosome, regardless of how many chromatids hang off it."
      - text: "The count only becomes 92 chromosomes at anaphase, when the centromeres split and each chromatid becomes a chromosome in its own right."
      - text: "Exams test this constantly. Always ask whether you are being asked for chromosomes, chromatids, or DNA amount - they change at different moments."
    source: original
    verified: true
  - id: bio.comm.cell-cycle.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "What is the point of mitosis, and how does it differ from meiosis in purpose?"
    answer:
      correctId: b
      options:
        - id: a
          text: To create genetic variation
          why: "That is meiosis. Mitosis is designed to produce an exact copy, with no variation at all."
        - id: b
          text: To produce two genetically identical cells, for growth, repair and replacing worn-out cells
        - id: c
          text: To halve the chromosome number
          why: "Halving is meiosis, for making gametes. Mitosis keeps the number the same."
        - id: d
          text: To produce sperm and eggs
          why: "Gametes come from meiosis. Mitosis makes body cells."
    solution:
      - text: "Mitosis produces two daughter cells that are genetically identical to the parent and to each other."
      - text: "Same chromosome number, same genes. Identical copies."
      - text: "That is exactly what you want for growth, for healing a cut, and for replacing the skin and gut cells you lose constantly."
      - text: "Meiosis has the opposite goal: halve the chromosome number and deliberately shuffle the genes, to make gametes that are all different."
      - text: "A useful one-liner: mitosis is for making MORE of you, meiosis is for making SOMEONE ELSE."
      - text: "Some organisms reproduce entirely by mitosis - that is asexual reproduction, and it is why offspring are clones."
    source: original
    verified: true
  - id: bio.comm.cell-cycle.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "The cell cycle has checkpoints. What are they actually checking, and what happens if a check fails?"
    answer:
      correctId: d
      options:
        - id: a
          text: Whether the cell is big enough, and it waits if not
          why: "Size is checked at G1, but it is only one of several things, and failing a check can do more than just wait."
        - id: b
          text: Whether enough nutrients are present, and it dies if not
          why: "Nutrient availability matters at G1, but the checks cover far more and the outcome is not always death."
        - id: c
          text: Nothing specific - they are just timers
          why: "They are not timers. They are genuine inspections that can halt the cycle indefinitely."
        - id: d
          text: Things like DNA damage, whether DNA copying finished correctly, and whether chromosomes are properly attached - and a failed check pauses the cycle for repair, or triggers the cell to kill itself
    solution:
      - text: "A checkpoint is a go/no-go decision before committing to the next stage."
      - text: "G1 checkpoint: is the cell big enough, are there nutrients and growth signals, and is the DNA undamaged?"
      - text: "G2 checkpoint: was the DNA copied completely and correctly?"
      - text: "M checkpoint, during mitosis: is every chromosome properly attached to the spindle? Separating an unattached chromosome would give one daughter too many and the other too few."
      - text: "If a check fails, the cycle pauses while repair is attempted."
      - text: "If the damage cannot be repaired, the cell triggers its own destruction - apoptosis. Deliberate cell suicide."
      - text: "That sounds drastic and it is the point: a damaged cell that keeps dividing passes its damage on. Better to lose one cell."
    source: original
    verified: true
  - id: bio.comm.cell-cycle.i5
    tier: challenge
    type: mcq
    depth: both
    prompt: "Cancer is often described as a disease of the cell cycle. What has actually gone wrong?"
    answer:
      correctId: a
      options:
        - id: a
          text: The checkpoints fail, so cells divide without the usual permissions and without stopping for damage
        - id: b
          text: Cells divide faster than normal cells
          why: "Many cancer cells actually divide more SLOWLY than normal gut or bone-marrow cells. The problem is that they never stop."
        - id: c
          text: The cells have too many chromosomes
          why: "Abnormal chromosome numbers are common in cancer, but they are usually a consequence of failed checkpoints rather than the cause."
        - id: d
          text: The cells stop making proteins
          why: "Cancer cells are highly active. They make plenty of protein - just the wrong amount of the wrong things."
    solution:
      - text: "A normal cell divides only when told to, stops when crowded, and halts for repair when damaged."
      - text: "Cancer is what happens when those controls fail together."
      - text: "Two broad kinds of failure. A growth signal gets stuck ON - that is an oncogene, like the permanently-active ras protein."
      - text: "Or a brake gets broken - that is a tumour suppressor failing, like p53, which normally halts the cycle for DNA repair and triggers apoptosis if repair fails."
      - text: "p53 is damaged in roughly half of all human cancers, which is why it is nicknamed the guardian of the genome."
      - text: "Note what the real problem is: not speed, but a lack of STOPPING. Many cancer cells divide more slowly than your bone marrow does."
      - text: "It also explains why cancer usually needs several mutations. One failed checkpoint is usually survivable; it takes a run of them to escape every control at once."
    source: original
    verified: true
  - id: bio.comm.cell-cycle.i6
    tier: challenge
    type: numeric
    depth: both
    prompt: "A cell cycle takes 24 hours. Mitosis lasts 1 hour and G2 lasts 4 hours. If S phase is 8 hours, how many hours is G1?"
    answer: { value: 11, unit: null, sigFigs: null }
    solution:
      - text: "The four stages must add up to the whole cycle."
      - text: "G1 + S + G2 + M = 24"
      - text: "G1 + 8 + 4 + 1 = 24"
      - text: "G1 + 13 = 24, so G1 = 11 hours."
      - text: "Notice the shape of that: interphase is 11 + 8 + 4 = 23 hours of the 24, and mitosis is a single hour."
      - text: "This is the standard way the proportions are tested, often from a count of cells seen in each stage under a microscope - the fraction of cells in a stage tells you the fraction of time spent in it."
      - text: "G1 is also the most variable stage. Some cells leave it entirely and enter G0, a non-dividing state. Most of your neurons are in G0 permanently."
    source: original
    verified: true
  - id: bio.comm.cell-cycle.i7
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: the stages of the cell cycle in order, and what happens in each."
    answer:
      model: "The cycle is interphase followed by mitosis and cytokinesis. Interphase has three stages: G1, where the cell grows and performs its normal function; S phase, where the DNA is replicated so each chromosome becomes two identical sister chromatids; and G2, where the cell grows further and makes the proteins needed for division. Mitosis then separates the sister chromatids into two nuclei, and cytokinesis divides the cytoplasm into two cells. Interphase takes up over ninety per cent of the cycle. Checkpoints at the end of G1, the end of G2 and during mitosis check for damage, complete replication and correct chromosome attachment, and can pause the cycle or trigger apoptosis."
      rubric:
        - "G1: growth and normal function"
        - "S: DNA replication producing sister chromatids"
        - "G2: growth and preparation for division"
        - "Mitosis then cytokinesis produce two identical cells"
        - "Mentions checkpoints and what they guard against"
    solution:
      - text: "G1 - growth, and doing the cell's actual job. The longest and most variable stage."
      - text: "S - synthesis. DNA is copied. Each chromosome becomes two identical sister chromatids joined at the centromere."
      - text: "G2 - more growth, plus building the machinery needed to divide."
      - text: "Mitosis - the chromatids are separated into two identical nuclei."
      - text: "Cytokinesis - the cytoplasm splits, giving two complete cells."
      - text: "Interphase (G1 + S + G2) is over 90% of the time. Mitosis is brief."
      - text: "Checkpoints sit at the end of G1, the end of G2, and partway through mitosis. They check for DNA damage, complete replication, and proper chromosome attachment, and they can halt the cycle or order the cell to destroy itself."
      - text: "Cells can also leave the cycle entirely into G0, a non-dividing state. Most neurons stay there for life."
    source: original
    verified: true
---

A cell's life is a cycle: grow, copy its DNA, grow more, divide. And **over 90%
of it is not division at all.**

| Stage | What happens |
|---|---|
| **G1** | Growth, and doing the cell's actual job. Longest and most variable. |
| **S** | **S**ynthesis — DNA is copied |
| **G2** | More growth; building the machinery for division |
| **M** | **Mitosis** — chromatids separated into two nuclei |
| | **Cytokinesis** — the cytoplasm splits |

G1 + S + G2 together are **interphase**. Older textbooks called it the "resting
phase", which is badly wrong — **it is when the cell actually lives.**

Cells can also leave the cycle entirely into **G0**, a non-dividing state. Most
of your neurons are in G0 permanently.

### The counting trap

> A human cell has **46** chromosomes in G1. After S phase it has… **46**.

Copying the DNA doubles the *amount* of DNA, but the two copies stay joined at
the **centromere** — and while joined they are **one chromosome with two sister
chromatids**.

> **A chromosome is counted by its centromeres.**

So after S phase: **46 chromosomes, 92 chromatids.** The count becomes 92
chromosomes only at **anaphase**, when the centromeres split.

Exams test this relentlessly. Always check whether you are being asked for
**chromosomes**, **chromatids**, or **amount of DNA** — they change at
different moments.

### Mitosis vs meiosis — different jobs

**Mitosis** makes two cells **genetically identical** to the parent. Same
chromosome number, same genes. For **growth, repair, and replacement**.

**Meiosis** halves the chromosome number and deliberately shuffles the genes,
to make **gametes** that are all different.

> Mitosis is for making **more of you**. Meiosis is for making **someone else**.

### Checkpoints

Go/no-go inspections before committing to the next stage:

- **G1** — Is the cell big enough? Nutrients? Growth signals? **DNA undamaged?**
- **G2** — Was the DNA copied **completely and correctly**?
- **M** — Is **every chromosome attached** to the spindle? Separating an
  unattached one would give one daughter too many and the other too few.

Fail a check and the cycle **pauses for repair**. If repair is impossible, the
cell **destroys itself** — **apoptosis**, deliberate cell suicide.

That sounds drastic, and that is the point: a damaged cell that keeps dividing
**passes the damage on**. Better to lose one cell.

### Cancer: a failure of stopping, not of speed

A normal cell divides only when told, stops when crowded, and halts for repair
when damaged. **Cancer is those controls failing together.**

Two broad routes:

- **An oncogene** — a growth signal stuck permanently **on**, like the mutant
  **ras** protein
- **A tumour suppressor failing** — a broken brake, like **p53**, which
  normally halts the cycle for repair and orders apoptosis if repair fails

> **p53 is damaged in roughly half of all human cancers** — hence its nickname,
> *the guardian of the genome*.

Note what the real problem is. **Not speed — failure to stop.** Many cancer
cells divide *more slowly* than your bone marrow does.

It is also why cancer usually needs **several** mutations. One failed
checkpoint is normally survivable; escaping every control at once takes a run
of them.
