---
id: bio.evo.hardy-weinberg
unit: bio.u-natural-selection
subject: bio
title: Hardy-Weinberg Equilibrium
depth: both
ced:
  - EVO-1.B
prereqs:
  - bio.evo.natural-selection
  - bio.hered.mendel
items:
  - id: bio.evo.hardy-weinberg.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "In a population at Hardy-Weinberg equilibrium, the frequency of the dominant allele p is 0.7. What is q?"
    answer: { value: 0.3, unit: null, sigFigs: null }
    solution:
      - text: "There are only two alleles, so every allele in the population is either one or the other."
      - text: "Their frequencies must therefore add to 1: p + q = 1."
      - text: "q = 1 - 0.7 = 0.3."
      - text: "This is the easiest step in the whole topic and the easiest to rush past. Always find both allele frequencies before touching the genotype equation."
    source: original
    verified: true
  - id: bio.evo.hardy-weinberg.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "A recessive disorder affects 4% of a population. Assuming Hardy-Weinberg equilibrium, what is the frequency of the recessive allele q?"
    answer: { value: 0.2, unit: null, sigFigs: null }
    solution:
      - text: "Only homozygous recessive individuals show a recessive disorder, so the affected 4% are the q-squared group."
      - text: "So q^2 = 0.04, since 4% expressed as a decimal is 0.04."
      - text: "Take the square root: q = sqrt(0.04) = 0.2"
      - text: "This is always the entry point. The affected fraction is the ONE genotype frequency you can read directly off the population, because every other phenotype is ambiguous."
      - text: "You cannot start from the 96% unaffected, because that is p^2 and 2pq mixed together and you cannot separate them by looking."
      - text: "So the standard first move in any Hardy-Weinberg problem is: find q^2, take the square root, then get p from 1 - q."
    source: original
    verified: true
  - id: bio.evo.hardy-weinberg.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "Continuing from that population: q is 0.2 and p is 0.8. What percentage of the population are carriers (heterozygous)?"
    answer: { value: 32, unit: null, sigFigs: null }
    solution:
      - text: "Heterozygotes are the 2pq term."
      - text: "2pq = 2 x 0.8 x 0.2 = 0.32"
      - text: "As a percentage, 32%."
      - text: "Worth pausing on that number. Only 4% are affected, but 32% silently carry the allele - eight times as many."
      - text: "That is a general feature of rare recessive conditions: carriers always vastly outnumber affected individuals, which is why such alleles persist even when the disorder is severe."
      - text: "Check the total: p^2 is 0.64, 2pq is 0.32, q^2 is 0.04. They sum to 1.00, as they must."
    source: original
    verified: true
  - id: bio.evo.hardy-weinberg.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "Hardy-Weinberg describes a population that is NOT evolving. What is the point of an equation for something that never happens?"
    answer:
      correctId: c
      options:
        - id: a
          text: It does happen often, so it is a good description of reality
          why: "The conditions are essentially never all met in a real population. That is accepted, not a flaw."
        - id: b
          text: It predicts how a population will evolve
          why: "It predicts what happens when nothing evolves. Departures from it are what reveal evolution."
        - id: c
          text: It is a null hypothesis - a baseline of what to expect if nothing is happening, so a real deviation tells you something IS
        - id: d
          text: It is only used for plants
          why: "It applies to any sexually reproducing population."
    solution:
      - text: "Hardy-Weinberg says: if nothing disturbs a population, allele frequencies stay exactly the same forever."
      - text: "That is a prediction about a population in which evolution is not occurring."
      - text: "Its value is as a baseline. Calculate what the genotype frequencies SHOULD be if nothing is happening, then compare with what you observe."
      - text: "A match means nothing detectable is going on. A mismatch means one of the assumptions is being broken - and that is a finding."
      - text: "This is exactly the same logic as the chi-square null hypothesis: you predict the boring outcome so that an interesting one stands out."
      - text: "It also establishes something historically important: genetic variation does not simply disappear over generations, which was a serious objection to Darwin before this was worked out."
    source: original
    verified: true
  - id: bio.evo.hardy-weinberg.i5
    tier: challenge
    type: mcq
    depth: both
    prompt: "Which of these would NOT, on its own, push a population out of Hardy-Weinberg equilibrium?"
    answer:
      correctId: d
      options:
        - id: a
          text: Individuals choosing mates based on a visible trait
          why: "Non-random mating is one of the violations - it changes genotype frequencies even while allele frequencies stay put."
        - id: b
          text: A small population where chance deaths matter
          why: "That is genetic drift, which requires a large population to be negligible."
        - id: c
          text: Migration in and out of the population
          why: "Gene flow brings in or removes alleles, changing the frequencies."
        - id: d
          text: A high but completely random rate of offspring death, unrelated to genotype
    solution:
      - text: "The five conditions are: no mutation, no gene flow, a very large population, random mating, and no selection."
      - text: "Death that is random with respect to genotype is not selection. Every genotype is equally affected, so the proportions are unchanged."
      - text: "That is the crucial distinction. Selection is not about death rate but about whether death is RELATED to the trait."
      - text: "A population can have enormous mortality and still be in equilibrium, so long as the dying is indiscriminate."
      - text: "The other three options each break a condition: mate choice breaks random mating, small size allows drift, and migration is gene flow."
      - text: "Worth noting that in a very small population, random deaths would start to matter - but that is drift, driven by size, not by the mortality rate itself."
    source: original
    verified: true
  - id: bio.evo.hardy-weinberg.i6
    tier: ap
    type: frq
    depth: both
    prompt: "In a population of 1000 beetles, 160 are light-coloured, which is the recessive phenotype. Calculate the allele frequencies and all three genotype frequencies, then explain what you would conclude if a sample taken ten years later showed 250 light-coloured beetles."
    answer:
      model: "The light beetles are homozygous recessive, so q squared is 160 divided by 1000, which is 0.16. Taking the square root gives q equal to 0.4, and p is 1 minus 0.4, which is 0.6. The genotype frequencies are p squared equal to 0.36 for homozygous dominant, 2pq equal to 2 times 0.6 times 0.4, which is 0.48, for heterozygotes, and q squared equal to 0.16 for homozygous recessive, and these sum to 1.00 as required. Ten years later 250 light beetles out of 1000 gives q squared equal to 0.25, so q is 0.5 and p is 0.5. The frequency of the recessive allele has risen from 0.4 to 0.5, so the population is not in equilibrium and at least one Hardy-Weinberg condition is being violated. The most likely explanation is natural selection favouring the light phenotype, perhaps because the environment has become lighter so light beetles are better camouflaged, though gene flow or drift in a small population could also produce a change of this kind."
      rubric:
        - "1 point: q squared is 0.16 and q is 0.4"
        - "1 point: p is 0.6"
        - "1 point: genotype frequencies 0.36, 0.48 and 0.16 summing to 1"
        - "1 point: recalculates q as 0.5 for the later sample"
        - "1 point: concludes the population is evolving and proposes a plausible mechanism"
    solution:
      - text: "Light is the recessive phenotype, so those 160 beetles must be homozygous recessive."
      - text: "q^2 = 160 / 1000 = 0.16"
      - text: "q = sqrt(0.16) = 0.4"
      - text: "p = 1 - q = 0.6"
      - text: "Now the genotypes. p^2 = 0.6 x 0.6 = 0.36, so 36% homozygous dominant."
      - text: "2pq = 2 x 0.6 x 0.4 = 0.48, so 48% heterozygous."
      - text: "q^2 = 0.16, so 16% homozygous recessive. Check: 0.36 + 0.48 + 0.16 = 1.00."
      - text: "Ten years later: q^2 = 250/1000 = 0.25, so q = 0.5 and p = 0.5."
      - text: "q rose from 0.4 to 0.5. Allele frequencies changed, so by definition the population evolved and at least one condition is broken."
      - text: "Most plausible explanation: selection favouring light beetles, perhaps because the habitat became lighter and they are better camouflaged."
      - text: "Be careful how you word the conclusion. The data show the population is NOT in equilibrium; selection is the most likely cause, but gene flow or drift could also do it. The calculation detects a change, it does not identify the mechanism."
    source: original
    verified: true
  - id: bio.evo.hardy-weinberg.i7
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: both Hardy-Weinberg equations, what each term means, and the five conditions."
    answer:
      model: "The first equation is p plus q equals 1, where p is the frequency of the dominant allele and q the frequency of the recessive allele. The second is p squared plus 2pq plus q squared equals 1, where p squared is the frequency of homozygous dominant individuals, 2pq is the frequency of heterozygotes, and q squared is the frequency of homozygous recessives. The five conditions for equilibrium are no mutation, no gene flow in or out, a very large population so that drift is negligible, random mating, and no natural selection. In practice the usual starting point is the frequency of the recessive phenotype, which equals q squared, because that is the only genotype frequency that can be read directly from observation."
      rubric:
        - "p + q = 1 with p and q defined as allele frequencies"
        - "p squared + 2pq + q squared = 1 with each term correctly identified"
        - "Lists the five conditions"
        - "Notes that the recessive phenotype frequency equals q squared"
        - "Explains that q squared is the usual entry point"
    solution:
      - text: "Allele equation: p + q = 1. p is the dominant allele's frequency, q the recessive's."
      - text: "Genotype equation: p^2 + 2pq + q^2 = 1."
      - text: "p^2 is homozygous dominant. 2pq is heterozygous - the 2 is there because Aa can arise two ways round. q^2 is homozygous recessive."
      - text: "Five conditions: no mutation, no gene flow, very large population, random mating, no selection."
      - text: "The standard entry point is q^2, because the recessive phenotype is the only one you can count directly - everything else is ambiguous."
      - text: "So the routine is: count the recessive phenotype to get q^2, square root for q, subtract from 1 for p, then build the genotype frequencies."
      - text: "And always check your three genotype frequencies sum to 1. It catches arithmetic errors for free."
    source: original
    verified: true
---

Hardy-Weinberg describes a population that is **not evolving** — and that is
exactly what makes it useful.

### The two equations

> **p + q = 1** — the **alleles**
> **p² + 2pq + q² = 1** — the **genotypes**

| Term | Means |
|---|---|
| **p** | Frequency of the dominant allele |
| **q** | Frequency of the recessive allele |
| **p²** | Homozygous dominant |
| **2pq** | **Heterozygous** (the 2 is because Aa can arise two ways round) |
| **q²** | Homozygous recessive |

### Always start at q²

**The recessive phenotype is the only genotype you can count directly.** Every
other phenotype is ambiguous — a dominant-looking individual is AA *or* Aa and
you cannot tell by looking.

So the routine is always:

1. Count the recessive phenotype → that fraction is **q²**
2. **Square root** → q
3. **1 − q** → p
4. Build the genotype frequencies
5. **Check they sum to 1** — free error detection

> 4% affected → q² = 0.04 → **q = 0.2** → p = 0.8
> Carriers = 2pq = 2(0.8)(0.2) = **0.32**

Look at those two numbers together: **4% affected, 32% carriers.** Carriers
outnumber affected individuals **eight to one** — and that is the general
pattern for rare recessive conditions. It is why such alleles persist even when
the disorder is severe: almost all copies are hidden in healthy heterozygotes
where selection cannot see them.

### The five conditions

1. **No mutation**
2. **No gene flow** (no migration in or out)
3. **Very large population** (so drift is negligible)
4. **Random mating**
5. **No selection**

### Why bother with an impossible scenario?

These conditions are essentially **never** all met. That is not a flaw — it is
the design.

**Hardy-Weinberg is a null hypothesis.** It tells you what the numbers would
look like if **nothing** were happening, so that a real deviation tells you
something **is**.

> Same logic as the chi-square null hypothesis: predict the boring outcome so
> the interesting one stands out.

It also settled something historically important — that genetic variation does
**not** simply dilute away over generations, which had been a serious objection
to Darwin before anyone worked the maths out.

### The distinction people miss

**High mortality is not selection.**

A population can lose enormous numbers of offspring and stay in perfect
equilibrium — **so long as the dying is indiscriminate**. Selection is not
about *how many* die but about whether dying is **related to the trait**.

### Reading a change

If q rises from 0.4 to 0.5 over ten years, the population is **not** in
equilibrium and at least one condition is broken.

Selection is usually the likeliest explanation — but **the calculation detects
a change; it does not identify the mechanism.** Gene flow or drift in a small
population could produce the same numbers. Word your conclusions accordingly.
