---
id: bio.hered.non-mendelian
unit: bio.u-heredity
subject: bio
title: Beyond Simple Dominance
depth: both
ced:
  - IST-1.G
prereqs:
  - bio.hered.mendel
items:
  - id: bio.hered.non-mendelian.i1
    tier: standard
    type: mcq
    depth: both
    prompt: "A red snapdragon crossed with a white one gives all PINK offspring. What is going on?"
    answer:
      correctId: b
      options:
        - id: a
          text: Codominance - both colours show at once
          why: "Codominance would give flowers with red AND white patches, both visible separately. Pink is a blend, which is different."
        - id: b
          text: Incomplete dominance - the heterozygote is a blend, because one working allele does not make enough pigment
        - id: c
          text: A mutation occurred
          why: "It happens reliably in every cross, which rules out a chance mutation."
        - id: d
          text: Pink is a third allele
          why: "The pink plants are heterozygous for the same two alleles. Crossing two pinks gives red, pink and white in a 1:2:1 ratio."
    solution:
      - text: "A red plant has two pigment-making alleles and makes plenty of red pigment."
      - text: "A white plant has two non-working alleles and makes none."
      - text: "The heterozygote has one working allele, so it makes only about half as much pigment. Half the red looks pink."
      - text: "That is incomplete dominance - neither allele masks the other, and the heterozygote is intermediate."
      - text: "The giveaway is that the phenotype ratio now matches the genotype ratio: crossing two pinks gives 1 red : 2 pink : 1 white, not 3:1."
      - text: "Which makes sense - with three distinguishable phenotypes there is nothing left hidden."
    source: original
    verified: true
  - id: bio.hered.non-mendelian.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "A person with blood type AB has one A allele and one B allele, and produces BOTH A and B antigens. How is that different from incomplete dominance?"
    answer:
      correctId: c
      options:
        - id: a
          text: It is the same thing with a different name
          why: "They differ in a visible way. A blend versus both traits appearing fully and separately."
        - id: b
          text: AB is a blend of A and B
          why: "There is no intermediate antigen. Both the A and the B antigen are fully present."
        - id: c
          text: Codominance - both alleles are fully expressed at once, rather than blending into something intermediate
        - id: d
          text: The A allele is dominant and B is recessive
          why: "If that were so, an AB person would be blood type A. Both are expressed."
    solution:
      - text: "In incomplete dominance you get something in between - pink from red and white."
      - text: "In codominance you get BOTH, fully and separately. Not a blend."
      - text: "An AB person makes A antigens AND B antigens, both at full strength."
      - text: "Test to tell them apart: can you see both original traits distinctly? That is codominance. Is it a new intermediate? That is incomplete dominance."
      - text: "Roan cattle are the classic case - white hairs and red hairs side by side, which looks pink from a distance but is clearly both up close."
      - text: "Blood type also shows multiple alleles: three alleles exist in the population (A, B and O), even though any one person carries only two."
    source: original
    verified: true
  - id: bio.hered.non-mendelian.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "A colour-blind father (X'Y) and a carrier mother (XX') have children. What percentage of their SONS will be colour-blind?"
    answer: { value: 50, unit: null, sigFigs: null }
    solution:
      - text: "Colour blindness is X-linked recessive, so the allele sits on the X chromosome."
      - text: "Sons get their Y from the father and their X from the mother - always."
      - text: "So the father's colour blindness is irrelevant to his sons. He gives them Y."
      - text: "The mother is XX', so she passes X or X' with equal chance."
      - text: "A son with X' has no second X to mask it, so he is colour-blind. That is 50% of sons."
      - text: "This is the signature of X-linked inheritance: fathers never pass it to sons, and sons get it entirely from their mothers."
      - text: "It also explains why it is far commoner in males - a male needs one copy, a female needs two."
    source: original
    verified: true
  - id: bio.hered.non-mendelian.i4
    tier: challenge
    type: mcq
    depth: both
    prompt: "A pedigree shows a trait appearing in every generation, affecting men and women about equally, and passing from father to son. What can you rule out?"
    answer:
      correctId: d
      options:
        - id: a
          text: Autosomal dominant
          why: "This fits autosomal dominant well - every generation, both sexes, father to son all possible."
        - id: b
          text: That it is genetic at all
          why: "Appearing reliably in every generation is a strong sign it IS genetic."
        - id: c
          text: Autosomal recessive
          why: "Worth ruling out on the every-generation pattern, but it is not what the father-to-son detail uniquely excludes."
        - id: d
          text: X-linked - because a father gives his sons a Y, never his X
    solution:
      - text: "Father-to-son transmission is the single most useful observation in a pedigree."
      - text: "A father gives his son a Y and his daughter an X. Always."
      - text: "So a gene on the X chromosome can NEVER pass from father to son."
      - text: "One clear case of father-to-son transmission rules out X-linkage completely."
      - text: "The other clues fit autosomal dominant: every generation (no skipping), and both sexes equally affected."
      - text: "Pedigree shortcuts worth having: skipping generations suggests recessive. Mostly males affected suggests X-linked recessive. Father to son rules out X-linked entirely."
    source: original
    verified: true
  - id: bio.hered.non-mendelian.i5
    tier: challenge
    type: mcq
    depth: both
    prompt: "Human height varies continuously rather than falling into tall and short categories. Why doesn't it follow Mendel's ratios?"
    answer:
      correctId: a
      options:
        - id: a
          text: Many genes each contribute a small amount, and the environment adds to it - so the result is a smooth range
        - id: b
          text: Height is not inherited
          why: "Height is strongly heritable. Tall parents reliably have taller-than-average children."
        - id: c
          text: There are three alleles for height
          why: "Three alleles would still give a handful of categories, not a smooth continuum. Hundreds of genes are involved."
        - id: d
          text: Mendel's laws are wrong
          why: "They are correct for single genes with two alleles. Height simply is not that kind of trait."
    solution:
      - text: "Mendel picked traits with two clear categories on purpose - tall or short pea plants, round or wrinkled seeds. That is what makes clean ratios appear."
      - text: "Height in humans is influenced by hundreds of genes, each nudging it slightly."
      - text: "With many small additive contributions, the possible totals form a smooth bell curve rather than a few buckets."
      - text: "That is polygenic inheritance."
      - text: "On top of that, nutrition and health affect the outcome, so even identical genotypes do not give identical heights."
      - text: "Skin colour, weight and blood pressure work the same way, which is why these traits never produce tidy 3:1 ratios."
      - text: "Mendel's laws still apply to every one of those genes individually. It is the summing of many that hides the ratios."
    source: original
    verified: true
  - id: bio.hered.non-mendelian.i6
    tier: ap
    type: frq
    depth: both
    prompt: "Haemophilia is X-linked recessive. A woman whose father had haemophilia marries an unaffected man. Determine her genotype, work out the probability that their first son has haemophilia, and explain why their daughters cannot be affected."
    answer:
      model: "The woman's father had haemophilia, so his single X carried the allele. A father always passes his X to his daughters, so she must have received that allele and is a carrier, genotype XHXh. Her husband is unaffected, so his genotype is XHY. Sons receive a Y from the father and either X from the mother, so there is a one in two chance a son inherits Xh and, having no second X to mask it, is affected - a probability of one half. Daughters receive XH from their father and either XH or Xh from their mother, so a daughter is either XHXH or XHXh. In both cases she carries at least one working allele, so no daughter can be affected, although half of them will be carriers."
      rubric:
        - "1 point: deduces the woman is a carrier because her father passed her his X"
        - "1 point: states her genotype as heterozygous XHXh"
        - "1 point: probability of an affected son is one half"
        - "1 point: explains sons have no second X to mask the allele"
        - "1 point: daughters always receive a working allele from their unaffected father"
    solution:
      - text: "Start with the father. He had haemophilia, and a male has only one X, so his X carried the allele."
      - text: "A father gives his X to every daughter. So she definitely received it."
      - text: "She is not affected, so her other X must carry the working allele. She is a carrier: XHXh."
      - text: "Her husband is unaffected, so he is XHY."
      - text: "Sons: Y from dad, and from mum either XH or Xh, at 50% each."
      - text: "A son with Xh has nothing to mask it - no second X at all - so he is affected. Probability one half."
      - text: "Daughters: XH from dad, guaranteed, plus XH or Xh from mum."
      - text: "Either way a daughter has at least one working allele, so none can be affected. Half will be carriers."
      - text: "The general pattern worth carrying: for an X-linked recessive, an unaffected father protects all his daughters, and a carrier mother puts all her sons at 50% risk."
    source: original
    verified: true
  - id: bio.hered.non-mendelian.i7
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: four ways inheritance departs from simple dominance, with an example of each."
    answer:
      model: "Incomplete dominance is where the heterozygote is intermediate, as in pink snapdragons from red and white parents, and the phenotype ratio then matches the genotype ratio at one to two to one. Codominance is where both alleles are fully expressed at once rather than blended, as in AB blood type or roan cattle. Multiple alleles means more than two versions exist in the population even though each individual carries two, as with the A, B and O blood alleles. Sex linkage means the gene sits on a sex chromosome, usually the X, so males need only one copy to be affected and fathers never pass the trait to sons, as in colour blindness and haemophilia. Polygenic inheritance means many genes each contribute a small amount, giving a continuous range rather than categories, as in height and skin colour."
      rubric:
        - "Incomplete dominance with an intermediate heterozygote"
        - "Codominance with both alleles fully expressed"
        - "Multiple alleles or sex linkage with a valid example"
        - "Sex linkage: males need one copy, no father-to-son transmission"
        - "Polygenic inheritance giving continuous variation"
    solution:
      - text: "Incomplete dominance - the heterozygote is a blend. Red and white snapdragons give pink. Phenotype ratio becomes 1:2:1, matching the genotype ratio."
      - text: "Codominance - both alleles show fully and separately, not blended. AB blood type, roan cattle with red and white hairs side by side."
      - text: "Multiple alleles - more than two versions exist in the population, though any individual has two. The A, B and O blood alleles."
      - text: "Sex linkage - the gene is on a sex chromosome, usually X. Males need only one copy, so X-linked recessives are far commoner in males. Colour blindness, haemophilia."
      - text: "Polygenic - many genes each adding a little, giving a smooth continuous range instead of categories. Height, skin colour, weight."
      - text: "Epistasis is worth knowing too: one gene masking another entirely, as when a gene for no pigment at all hides whatever the colour gene says."
      - text: "None of these break Mendel's laws. Each gene still segregates and assorts exactly as he described - the relationship between genotype and visible phenotype is just more complicated."
    source: original
    verified: true
---

Mendel chose his pea traits carefully: two clear categories, one gene, clean
dominance. **Most real traits are not like that.** None of what follows breaks
his laws — each gene still segregates exactly as he said. What changes is the
relationship between **genotype and what you see**.

### Incomplete dominance — the heterozygote is a blend

> Red snapdragon × white snapdragon → **all pink**

One working pigment allele makes about half the pigment, and half of red looks
pink. Neither allele masks the other.

**The giveaway:** the phenotype ratio now **matches** the genotype ratio —
**1:2:1**, not 3:1. Which makes sense: with three distinguishable phenotypes,
nothing is hidden any more.

### Codominance — both show, fully

> Blood type **AB** makes A antigens **and** B antigens, both at full strength

Not a blend — **both**, separately. **Roan cattle** have white hairs and red
hairs side by side, which looks pink from a distance and is obviously both up
close.

> **The test:** can you see both original traits distinctly? **Codominance.**
> Is it a new intermediate? **Incomplete dominance.**

### Multiple alleles

More than two versions exist **in the population**, even though each individual
carries only two. Blood type has three — **A, B and O**.

### Sex linkage — usually the X

The gene sits on a sex chromosome. Because males are **XY**, they have only
**one** X, so **one copy is enough** to show an X-linked recessive. Females
need two.

That is why colour blindness and haemophilia are far commoner in men.

The pedigree signatures are extremely useful:

| Observation | Means |
|---|---|
| **Father → son transmission** | **Rules out X-linked entirely** |
| Mostly males affected | Suggests X-linked recessive |
| Skips generations | Suggests recessive |
| Every generation, both sexes | Suggests autosomal dominant |

**Father → son is the single most useful line in a pedigree.** A father gives
his son a **Y** and his daughter an **X** — always. So an X-linked gene can
*never* pass father to son, and one clear case rules it out.

Two consequences worth carrying:

- An **unaffected father protects all his daughters** from an X-linked
  recessive
- A **carrier mother puts every son at 50%** risk

### Polygenic — many genes, continuous range

Human height is influenced by **hundreds** of genes, each nudging it slightly,
plus nutrition and health. Many small additive contributions produce a smooth
**bell curve**, not categories.

Skin colour, weight and blood pressure work the same way — which is why none of
them ever gives a tidy 3:1 ratio.

### Epistasis — one gene masking another

A gene for *no pigment at all* overrides whatever the colour gene says. The
colour gene is still there and still segregating; you simply cannot see it.
