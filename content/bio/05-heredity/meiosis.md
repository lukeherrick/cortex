---
id: bio.hered.meiosis
unit: bio.u-heredity
subject: bio
title: Meiosis and Genetic Variation
depth: both
ced:
  - IST-1.E
prereqs:
  - bio.comm.cell-cycle
items:
  - id: bio.hered.meiosis.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "A human body cell has 46 chromosomes. How many does a sperm cell have?"
    answer: { value: 23, unit: null, sigFigs: null }
    solution:
      - text: "Meiosis halves the chromosome number, which is its whole purpose."
      - text: "46 / 2 = 23."
      - text: "A body cell is diploid - two of each chromosome, one from each parent. A gamete is haploid - one of each."
      - text: "The halving has to happen, or the number would double every generation. Sperm 46 plus egg 46 would give a 92-chromosome child."
      - text: "Instead 23 plus 23 restores 46, and the cycle is stable across generations."
    source: original
    verified: true
  - id: bio.hered.meiosis.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "How many genetically different gametes can one human produce from independent assortment alone, ignoring crossing over? There are 23 pairs of chromosomes."
    answer: { value: 8388608, unit: null, sigFigs: null }
    solution:
      - text: "At metaphase I, each pair of chromosomes lines up independently of every other pair."
      - text: "For each pair there are 2 ways round it can face, and which way is random."
      - text: "With 23 pairs making independent choices, the number of combinations is 2 to the power 23."
      - text: "2^23 = 8388608, so over eight million."
      - text: "And that is before crossing over, which shuffles within each chromosome and makes the real figure effectively unlimited."
      - text: "This is why siblings differ. Two parents can produce more genetically distinct children than there are people in London, without repeating."
    source: original
    verified: true
  - id: bio.hered.meiosis.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "Meiosis has two divisions. What is separated in each?"
    answer:
      correctId: b
      options:
        - id: a
          text: Meiosis I separates sister chromatids; meiosis II separates homologous pairs
          why: "That is the right idea with the two swapped. Separating homologous pairs first is what halves the number."
        - id: b
          text: Meiosis I separates homologous pairs; meiosis II separates sister chromatids
        - id: c
          text: Both divisions separate sister chromatids
          why: "Then the chromosome number would never halve, and meiosis would just be two mitoses."
        - id: d
          text: Both divisions separate homologous pairs
          why: "After meiosis I there are no homologous pairs left to separate - each cell has only one of each."
    solution:
      - text: "Meiosis I is the reduction division. Homologous pairs - the maternal and paternal copy of each chromosome - are pulled apart."
      - text: "That is what halves the number. Each daughter cell now has 23 chromosomes, though each is still two chromatids."
      - text: "Meiosis II then works like mitosis: the sister chromatids of each chromosome are separated."
      - text: "Result: four haploid cells, each with 23 single-chromatid chromosomes."
      - text: "The order matters enormously. Separating homologues FIRST is what makes meiosis a halving rather than just a copying."
      - text: "A memory hook: meiosis I separates the PAIRS, meiosis II separates the COPIES."
    source: original
    verified: true
  - id: bio.hered.meiosis.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "Crossing over happens in prophase I. What does it accomplish that independent assortment cannot?"
    answer:
      correctId: c
      options:
        - id: a
          text: It halves the chromosome number
          why: "Halving comes from separating homologous pairs at anaphase I, not from crossing over."
        - id: b
          text: It repairs damaged DNA
          why: "The machinery is related to DNA repair, but the outcome being tested here is variation."
        - id: c
          text: It shuffles genes WITHIN a chromosome, so a single chromosome ends up carrying a mix of maternal and paternal alleles
        - id: d
          text: It doubles the number of chromosomes
          why: "Nothing is gained or lost. Equivalent segments are swapped between homologous chromosomes."
    solution:
      - text: "Independent assortment shuffles WHOLE chromosomes - you get your mother's chromosome 7 or your father's, intact."
      - text: "Crossing over goes finer. Homologous chromosomes pair up and physically swap matching segments."
      - text: "So the chromosome you pass on is a patchwork - part maternal, part paternal - rather than a whole copy of either."
      - text: "This matters because genes on the same chromosome would otherwise always travel together, permanently linked."
      - text: "Crossing over breaks that linkage, and the further apart two genes are, the more often it separates them."
      - text: "That relationship is the basis of genetic mapping: measure how often two genes are inherited apart, and you have measured the distance between them."
    source: original
    verified: true
  - id: bio.hered.meiosis.i5
    tier: challenge
    type: mcq
    depth: both
    prompt: "Nondisjunction means chromosomes failing to separate properly. If it happens in meiosis I, what do the four resulting gametes look like?"
    answer:
      correctId: a
      options:
        - id: a
          text: Two gametes with an extra chromosome and two missing one - all four are abnormal
        - id: b
          text: One gamete with an extra, one missing one, and two normal
          why: "That is the pattern for nondisjunction in meiosis II, where only one of the two cells is affected."
        - id: c
          text: All four are normal, since meiosis II corrects it
          why: "Meiosis II only separates chromatids. It has no way to detect or fix a wrong chromosome count."
        - id: d
          text: All four have an extra chromosome
          why: "Nothing is created. One cell gains what the other loses, so errors come in balanced pairs."
    solution:
      - text: "In meiosis I the homologous pair fails to separate, so both go into the same cell."
      - text: "That gives one cell with an extra chromosome and one cell missing it - before meiosis II has even started."
      - text: "Meiosis II then divides each of those, faithfully copying the error."
      - text: "So the cell with an extra gives two gametes with an extra, and the cell missing one gives two missing one. All four abnormal."
      - text: "Compare meiosis II nondisjunction: the error happens after the cells have split, so only one of the two is affected, giving two normal gametes and two abnormal."
      - text: "Down syndrome is trisomy 21 - three copies of chromosome 21 - and arises from nondisjunction, usually in the egg."
    source: original
    verified: true
  - id: bio.hered.meiosis.i6
    tier: challenge
    type: numeric
    depth: both
    prompt: "An organism has 8 chromosomes in its body cells. How many chromatids are present in one cell at metaphase I of meiosis?"
    answer: { value: 16, unit: null, sigFigs: null }
    solution:
      - text: "Work forwards from the start. The cell has 8 chromosomes."
      - text: "Before meiosis begins, S phase copies the DNA. Each chromosome becomes two sister chromatids."
      - text: "The chromosome count stays 8, because the chromatids are joined at a shared centromere."
      - text: "But the chromatid count is 8 x 2 = 16."
      - text: "At metaphase I nothing has separated yet - the homologous pairs are lined up at the equator, each chromosome still a pair of chromatids."
      - text: "So: 8 chromosomes, 16 chromatids."
      - text: "Trace it further for practice. After meiosis I: 4 chromosomes and 8 chromatids per cell. After meiosis II: 4 chromosomes and 4 chromatids per cell."
    source: original
    verified: true
  - id: bio.hered.meiosis.i7
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: the three sources of genetic variation in meiosis, plus the fourth that happens afterwards."
    answer:
      model: "Crossing over in prophase I swaps matching segments between homologous chromosomes, so each chromosome passed on is a mix of maternal and paternal DNA. Independent assortment at metaphase I means each homologous pair lines up independently of the others, giving 2 to the power 23 combinations in humans. The separation of homologous pairs at anaphase I means each gamete receives a random one of each pair. The fourth source is random fertilisation: which particular sperm meets which particular egg is chance, multiplying the possibilities enormously again. Together these mean no two offspring of the same parents are genetically identical, except for identical twins."
      rubric:
        - "Crossing over in prophase I, swapping segments between homologues"
        - "Independent assortment at metaphase I, with 2^23 combinations in humans"
        - "Random separation of homologous pairs"
        - "Random fertilisation as the fourth source"
        - "Concludes that offspring are all genetically different"
    solution:
      - text: "One - crossing over, in prophase I. Homologous chromosomes swap matching segments, so each chromosome you pass on is a patchwork rather than a clean copy."
      - text: "Two - independent assortment, at metaphase I. Each pair lines up independently of every other pair. With 23 pairs that is 2^23, over eight million combinations."
      - text: "Three - the random separation itself at anaphase I decides which of each pair ends up in which gamete."
      - text: "Four - random fertilisation, which happens after meiosis entirely. Any of millions of sperm could meet any egg."
      - text: "Multiply them together and the number of genetically possible children from one couple is astronomically large."
      - text: "This is the whole point of sexual reproduction. Asexual reproduction by mitosis is far more efficient, but produces clones - and a population of clones is wiped out by a single disease that none of them can resist."
    source: original
    verified: true
---

**Meiosis makes gametes.** Two jobs: **halve the chromosome number**, and
**generate variation**.

The halving is non-negotiable. Without it, 46 + 46 would give a 92-chromosome
child, then 184, and so on. Instead **23 + 23 restores 46** every generation.

| | Diploid (2n) | Haploid (n) |
|---|---|---|
| Human | Body cells — **46** | Gametes — **23** |

### Two divisions, and the order is the whole trick

- **Meiosis I** separates **homologous pairs** — your mother's copy of
  chromosome 7 from your father's. **This is what halves the number.**
- **Meiosis II** separates **sister chromatids**, working just like mitosis.

> Meiosis I separates the **pairs**. Meiosis II separates the **copies**.

Result: **four haploid cells**, each genetically different.

### Four sources of variation

**1. Crossing over** (prophase I) — homologous chromosomes physically swap
matching segments. So the chromosome you pass on is a **patchwork** of maternal
and paternal DNA, not a clean copy of either.

This matters because genes on the same chromosome would otherwise be
permanently **linked** — always inherited together. Crossing over breaks that,
and **the further apart two genes sit, the more often it separates them**. That
relationship is the basis of **genetic mapping**: measure how often two genes
are inherited apart and you have measured the distance between them.

**2. Independent assortment** (metaphase I) — each homologous pair lines up
independently of every other pair. Two ways round, 23 pairs:

> 2²³ = **8,388,608** combinations

**3. Random separation** at anaphase I decides which of each pair goes where.

**4. Random fertilisation** — which sperm meets which egg, from millions.

Multiply those together and a single couple could produce more genetically
distinct children than there are people in a large city, without repeating.

> **This is the point of sexual reproduction.** Asexual reproduction by mitosis
> is far more efficient — but it produces **clones**, and a population of clones
> is wiped out by one disease none of them can resist.

### Counting through meiosis

Take an organism with **8** chromosomes:

| Stage | Chromosomes | Chromatids |
|---|---|---|
| After S phase | 8 | **16** |
| Metaphase I | 8 | 16 |
| After meiosis I | **4** | 8 |
| After meiosis II | 4 | **4** |

Remember: **a chromosome is counted by its centromeres**, so copying DNA
doubles chromatids without changing the chromosome count.

### Nondisjunction

Chromosomes failing to separate. **When it happens decides the damage:**

- **In meiosis I** — the pair fails to separate before the cells split, so the
  error is copied into both. **All four gametes abnormal** (two with an extra,
  two missing one).
- **In meiosis II** — only one of the two cells is affected. **Two normal, two
  abnormal.**

**Down syndrome** is trisomy 21 — three copies of chromosome 21 — from
nondisjunction, usually in the egg.
