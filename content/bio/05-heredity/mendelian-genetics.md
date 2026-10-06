---
id: bio.hered.mendel
unit: bio.u-heredity
subject: bio
title: Mendelian Genetics
depth: both
ced:
  - IST-1.F
prereqs:
  - bio.hered.meiosis
items:
  - id: bio.hered.mendel.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "Two heterozygous parents (Aa x Aa) have a child. What percentage chance is there that the child shows the dominant trait?"
    answer: { value: 75, unit: null, sigFigs: null }
    solution:
      - text: "Each parent passes on either A or a, with equal chance."
      - text: "The four equally likely combinations are AA, Aa, aA and aa."
      - text: "Three of those four contain at least one A, and one A is enough to show the dominant trait."
      - text: "3 out of 4 = 75%."
      - text: "That is the classic 3:1 ratio, and it is worth being able to produce without drawing anything."
      - text: "Careful with the wording: 75% show the dominant TRAIT, but only 25% are AA. Phenotype and genotype ratios are different - 3:1 and 1:2:1."
    source: original
    verified: true
  - id: bio.hered.mendel.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "What is the difference between genotype and phenotype, and why can't you always read one from the other?"
    answer:
      correctId: b
      options:
        - id: a
          text: Genotype is what you look like; phenotype is your genes
          why: "Exactly reversed. Genotype is the genes; phenotype is the observable result."
        - id: b
          text: Genotype is the alleles you carry; phenotype is the observable trait - and a dominant phenotype could come from two different genotypes
        - id: c
          text: They are two words for the same thing
          why: "They differ in an important way: AA and Aa produce the same phenotype from different genotypes."
        - id: d
          text: Phenotype is inherited; genotype is not
          why: "The genotype is what is inherited. The phenotype is produced from it, together with the environment."
    solution:
      - text: "Genotype is which alleles you carry - AA, Aa or aa."
      - text: "Phenotype is what you can observe - tall or short, brown eyes or blue."
      - text: "You can always go from genotype to phenotype. AA is dominant, Aa is dominant, aa is recessive."
      - text: "But you cannot always go backwards. Seeing the dominant trait tells you the genotype is AA OR Aa, and you cannot tell which by looking."
      - text: "That ambiguity is exactly why a test cross exists: breed the unknown with a recessive (aa) individual and see what comes out."
      - text: "A recessive phenotype is unambiguous, though. aa is the only genotype that gives it, which is why recessive traits are easier to track in a pedigree."
    source: original
    verified: true
  - id: bio.hered.mendel.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "Two parents who both carry a recessive disease allele but do not have the disease (Aa x Aa) have a child. What is the percentage chance the child HAS the disease?"
    answer: { value: 25, unit: null, sigFigs: null }
    solution:
      - text: "A recessive disease needs two copies of the recessive allele to show, so the child must be aa."
      - text: "The child inherits a from the mother with probability 1/2, and a from the father with probability 1/2."
      - text: "These are independent events, so multiply them: 1/2 x 1/2 = 1/4."
      - text: "Expressed as a percentage, 1/4 is a 25% chance."
      - text: "This is the standard carrier situation for diseases like cystic fibrosis. Both parents are healthy and there is still a one in four risk per child."
      - text: "And the dice have no memory. If one child already has it, the next child's risk is still 25% - a point families frequently and understandably get wrong."
    source: original
    verified: true
  - id: bio.hered.mendel.i4
    tier: challenge
    type: numeric
    depth: both
    prompt: "Two parents are both AaBb, and the two genes are on different chromosomes. What is the chance of an aabb child, as a fraction out of 16? Give the numerator."
    answer: { value: 1, unit: null, sigFigs: null }
    solution:
      - text: "Do not draw a 16-box Punnett square. Handle one gene at a time and multiply."
      - text: "Chance of aa from Aa x Aa = 1/4."
      - text: "Chance of bb from Bb x Bb = 1/4."
      - text: "Because the genes are on different chromosomes, they assort independently, so the events are independent and you multiply."
      - text: "1/4 x 1/4 = 1/16. So the numerator is 1."
      - text: "This multiplication rule is far faster and far less error-prone than a 16-box grid, and it scales - three genes would be 1/4 x 1/4 x 1/4 = 1/64."
      - text: "For the record, the full dihybrid phenotype ratio is 9:3:3:1, and each of those numbers comes out of the same multiplication."
    source: original
    verified: true
  - id: bio.hered.mendel.i5
    tier: standard
    type: mcq
    depth: both
    prompt: "You have a tall pea plant and want to know if it is TT or Tt. What cross tells you, and how do you read the result?"
    answer:
      correctId: c
      options:
        - id: a
          text: Cross it with a TT plant - if any offspring are short, it was Tt
          why: "A TT parent contributes T to every offspring, so every single one will be tall regardless. The cross tells you nothing."
        - id: b
          text: Cross it with another tall plant of unknown genotype
          why: "Two unknowns make the result ambiguous. A test cross needs one side to be certain."
        - id: c
          text: Cross it with a short (tt) plant - any short offspring proves it was Tt
        - id: d
          text: You cannot tell without a DNA test
          why: "Mendel worked all of this out with no knowledge of DNA at all, purely by counting offspring."
    solution:
      - text: "A short plant must be tt, so it can only ever contribute t. That makes it a clean probe."
      - text: "If the tall plant is TT, every offspring gets a T and every one is tall."
      - text: "If the tall plant is Tt, half the offspring get t, pair it with the t from the short parent, and are short."
      - text: "So a single short offspring proves the parent was Tt. This is called a test cross."
      - text: "Note the asymmetry in the evidence. One short offspring proves Tt with certainty, but all-tall offspring only suggest TT - a Tt parent could produce several tall offspring by chance."
      - text: "With 10 all-tall offspring the chance of a Tt parent is (1/2)^10, about 1 in 1000. Strong evidence, not proof. More offspring means more confidence."
    source: original
    verified: true
  - id: bio.hered.mendel.i6
    tier: challenge
    type: mcq
    depth: both
    prompt: "Mendel's law of segregation says the two alleles for a gene separate into different gametes. Which event in meiosis is that, physically?"
    answer:
      correctId: a
      options:
        - id: a
          text: Homologous chromosomes separating at anaphase I
        - id: b
          text: Sister chromatids separating at anaphase II
          why: "Sister chromatids are identical copies of the same allele, so separating them does not separate the two different alleles."
        - id: c
          text: Crossing over in prophase I
          why: "Crossing over swaps segments between homologues, which affects linkage. Segregation is the separation itself."
        - id: d
          text: The nuclear membrane breaking down
          why: "That is a structural step with no bearing on which allele goes where."
    solution:
      - text: "You carry two alleles of each gene - one on each homologous chromosome."
      - text: "At anaphase I those homologues are pulled to opposite poles."
      - text: "So the two alleles end up in different cells. That IS segregation."
      - text: "Mendel deduced this law from counting pea plants in the 1860s, decades before anyone saw chromosomes do it."
      - text: "Likewise his law of independent assortment is the physical fact that different pairs line up independently at metaphase I."
      - text: "That is worth appreciating: Mendel described the behaviour of something nobody had yet observed, purely from ratios in offspring. The chromosomes were found later and matched his rules exactly."
    source: original
    verified: true
  - id: bio.hered.mendel.i7
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: Mendel's two laws, and the two probability rules you use to solve crosses."
    answer:
      model: "The law of segregation says the two alleles of a gene separate into different gametes, which physically corresponds to homologous chromosomes separating at anaphase I. The law of independent assortment says alleles of different genes are inherited independently of each other, which corresponds to homologous pairs lining up independently at metaphase I - though it only holds for genes on different chromosomes or far apart on the same one. The two probability rules are the multiplication rule, where the chance of two independent events both happening is the product of their chances, and the addition rule, where the chance of either of two mutually exclusive outcomes is the sum of their chances."
      rubric:
        - "Segregation: the two alleles separate into different gametes"
        - "Links segregation to anaphase I"
        - "Independent assortment: different genes inherited independently"
        - "Notes independent assortment fails for linked genes"
        - "States the multiplication and addition rules"
    solution:
      - text: "Law of segregation - the two alleles of a gene end up in different gametes. Physically, homologous chromosomes separating at anaphase I."
      - text: "Law of independent assortment - which allele of gene A you pass on tells you nothing about gene B. Physically, pairs lining up independently at metaphase I."
      - text: "Important caveat: independent assortment only holds for genes on different chromosomes, or far enough apart on the same chromosome that crossing over separates them reliably. Genes close together are linked and travel as a unit."
      - text: "Multiplication rule - for independent events BOTH happening, multiply. Chance of aa AND bb is 1/4 x 1/4 = 1/16."
      - text: "Addition rule - for mutually exclusive outcomes where you want EITHER, add. Chance of Aa is 1/4 + 1/4 = 1/2, since Aa can arise two ways."
      - text: "Using these two rules beats drawing big Punnett squares every time. A 16-box grid is slow and easy to miscount; multiplying takes seconds."
    source: original
    verified: true
---

Mendel worked all of this out by counting pea plants in the 1860s — **decades
before anyone knew chromosomes or DNA existed.** The chromosomes were found
later and turned out to behave exactly as his rules required.

### The vocabulary

- **Gene** — a stretch of DNA coding for a trait
- **Allele** — a version of that gene (T or t)
- **Genotype** — the alleles you carry (TT, Tt, tt)
- **Phenotype** — what you can actually observe (tall, short)
- **Homozygous** — two of the same (TT or tt). **Heterozygous** — two different
  (Tt)

**You can always go genotype → phenotype. You cannot always go back.** Seeing a
tall plant means TT *or* Tt, and you cannot tell by looking.

A **recessive** phenotype *is* unambiguous — only `tt` gives it — which is why
recessive traits are easier to track through a pedigree.

### The ratios worth knowing cold

> **Aa × Aa** → phenotype **3:1** · genotype **1:2:1**

So **75%** show the dominant trait, but only **25%** are AA. Phenotype and
genotype ratios are different numbers — a classic place to lose a mark.

> **Aa × aa** → **1:1** · **AA × aa** → all Aa, **100%** dominant

### Multiply; don't draw grids

For two genes, a 16-box Punnett square is slow and easy to miscount. Do one
gene at a time and **multiply**:

> Chance of **aabb** from AaBb × AaBb
> = (chance of aa) × (chance of bb) = ¼ × ¼ = **1/16**

This scales — three genes is ¼ × ¼ × ¼ = 1/64. The full dihybrid phenotype
ratio **9:3:3:1** falls out of the same arithmetic.

**Two probability rules cover everything:**

- **Multiplication** — for independent events **both** happening: multiply
- **Addition** — for mutually exclusive outcomes where you want **either**: add
  (Aa can arise two ways, so ¼ + ¼ = ½)

### The test cross

You have a tall plant. Is it TT or Tt? **Cross it with a short (tt) plant.**

A `tt` parent can only contribute `t`, which makes it a clean probe:

- Parent **TT** → every offspring gets a T → **all tall**
- Parent **Tt** → half get t, pair with t → **some short**

> **One short offspring proves Tt.** But all-tall offspring only *suggest* TT.

That asymmetry is worth noticing. A Tt parent could produce 10 tall offspring by
luck — the odds are (½)¹⁰ ≈ 1 in 1000. Strong evidence, not proof. **More
offspring, more confidence.**

### The two laws, and what they are physically

| Law | Says | Physically |
|---|---|---|
| **Segregation** | The two alleles of a gene go to different gametes | Homologous chromosomes separating at **anaphase I** |
| **Independent assortment** | Different genes are inherited independently | Pairs lining up independently at **metaphase I** |

**Independent assortment has a limit.** It only holds for genes on *different*
chromosomes, or far enough apart on the same one that crossing over separates
them reliably. Genes close together are **linked** and tend to travel as a unit
— which is where Mendel's rules stop applying cleanly.

### One thing families get wrong

Two carriers (Aa × Aa) have a **25%** chance per child of an affected (aa)
child.

**If one child is already affected, the next child's risk is still 25%.** The
dice have no memory.
