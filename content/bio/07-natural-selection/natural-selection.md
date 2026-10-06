---
id: bio.evo.natural-selection
unit: bio.u-natural-selection
subject: bio
title: Natural Selection
depth: both
ced:
  - EVO-1.A
prereqs:
  - bio.hered.meiosis
items:
  - id: bio.evo.natural-selection.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "A population of bacteria is treated with antibiotic and a resistant strain emerges. What actually happened?"
    answer:
      correctId: c
      options:
        - id: a
          text: The bacteria sensed the antibiotic and developed resistance
          why: "Nothing senses and adapts. Bacteria cannot choose to become resistant any more than you can choose to be taller."
        - id: b
          text: The antibiotic caused mutations that made them resistant
          why: "The antibiotic selects; it does not create the variation. Resistant individuals were already present before it arrived."
        - id: c
          text: A few already carried resistance by chance, and the antibiotic killed everything else, so only they reproduced
        - id: d
          text: The bacteria passed resistance to each other by learning
          why: "Bacteria can share genes directly, which complicates the picture, but the core mechanism here is selection of pre-existing variation."
    solution:
      - text: "The variation came FIRST. Random mutation had already produced a few resistant individuals before any antibiotic appeared."
      - text: "Those few were not better in any general sense - in an antibiotic-free world resistance often costs them something."
      - text: "Then the environment changed. The antibiotic killed the susceptible majority."
      - text: "The resistant few survived and reproduced, so the next generation is largely resistant."
      - text: "Nothing adapted during its lifetime. The population changed because of who survived."
      - text: "This is the single most important correction in the whole unit: selection does not create variation, it filters variation that already exists."
      - text: "It is also why finishing a course of antibiotics matters - stopping early leaves the hardest-to-kill individuals alive to repopulate."
    source: original
    verified: true
  - id: bio.evo.natural-selection.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "Natural selection needs four conditions to operate. Which set is right?"
    answer:
      correctId: b
      options:
        - id: a
          text: Mutation, migration, drift and selection
          why: "Those are four mechanisms that change allele frequencies. They are not the conditions natural selection itself requires."
        - id: b
          text: Variation exists, it is heritable, more offspring are produced than can survive, and survival is not random with respect to that variation
        - id: c
          text: Large population, isolation, time and competition
          why: "These can influence evolution but none is a requirement for natural selection to operate."
        - id: d
          text: Predators, food shortage, disease and climate
          why: "Those are examples of selection pressures, not the conditions. Selection can act without any of them specifically."
    solution:
      - text: "One - variation. Individuals must differ, or there is nothing to select between."
      - text: "Two - heritability. The variation must be passed on, or the advantage dies with the individual."
      - text: "Three - overproduction. More offspring are produced than can possibly survive, so there is competition."
      - text: "Four - differential survival. Survival and reproduction must depend on the variation, not be random."
      - text: "If all four hold, the useful variants become commoner over generations. That is not a theory about them - it follows necessarily."
      - text: "Test yourself by removing one. Variation but not heritable? Nothing accumulates. Heritable but survival is random? Frequencies drift aimlessly."
    source: original
    verified: true
  - id: bio.evo.natural-selection.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "Why is 'survival of the fittest' a misleading phrase?"
    answer:
      correctId: d
      options:
        - id: a
          text: Because the fittest do not always survive
          why: "True as far as it goes - chance matters - but the deeper problem is what fitness means."
        - id: b
          text: Because fitness cannot be measured
          why: "It can be measured, as reproductive output. The problem is that the everyday meaning of the word misleads."
        - id: c
          text: Because evolution is about survival rather than fitness
          why: "It is about neither on its own. Surviving without reproducing contributes nothing."
        - id: d
          text: Because fitness means reproductive success, not strength or health - and surviving without reproducing counts for nothing
    solution:
      - text: "In everyday English, fit means strong or healthy. In biology it means something quite different."
      - text: "Biological fitness is how many surviving offspring you leave behind. That is the entire measure."
      - text: "An organism that lives a long healthy life and never reproduces has a fitness of zero."
      - text: "A weak, short-lived organism that reproduces heavily has high fitness."
      - text: "So the phrase is really survival-and-reproduction of the better-suited-to-this-particular-environment, which is why nobody uses it."
      - text: "Also note fitness is environment-dependent. White fur is high fitness in the Arctic and very low fitness in a forest. There is no such thing as being fit in general."
    source: original
    verified: true
  - id: bio.evo.natural-selection.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "In a population of medium-sized birds, both the smallest and largest beaks are selected against. What is that called, and what happens to variation?"
    answer:
      correctId: a
      options:
        - id: a
          text: Stabilising selection - the average is favoured and variation decreases
        - id: b
          text: Directional selection - the population shifts one way
          why: "Directional selection favours one extreme, shifting the mean. Here both extremes are being removed equally."
        - id: c
          text: Disruptive selection - both extremes are favoured
          why: "That is the opposite of what is described. Here the extremes are selected AGAINST."
        - id: d
          text: No selection is happening
          why: "Individuals are dying differentially according to a heritable trait. That is selection by definition."
    solution:
      - text: "Both extremes do badly and the middle does well. That is stabilising selection."
      - text: "The average stays where it is, but the spread narrows - variation decreases."
      - text: "Human birth weight is the classic example. Very small babies struggle; very large ones cause delivery problems. The middle survives best."
      - text: "Compare the other two patterns. Directional selection favours ONE extreme, so the whole distribution shifts - as in antibiotic resistance or peppered moths."
      - text: "Disruptive selection favours BOTH extremes against the middle, splitting the distribution in two - and over time this can start the process of forming two species."
      - text: "Quick test: what happens to the MEAN and what happens to the SPREAD? Stabilising keeps the mean and narrows the spread; directional moves the mean; disruptive splits it."
    source: original
    verified: true
  - id: bio.evo.natural-selection.i5
    tier: challenge
    type: mcq
    depth: both
    prompt: "A peacock's enormous tail makes it slower and more visible to predators. How can natural selection produce something so obviously harmful?"
    answer:
      correctId: b
      options:
        - id: a
          text: It cannot - the tail must be useful for something else
          why: "It genuinely is a survival handicap. The explanation is not a hidden survival benefit."
        - id: b
          text: Fitness is about reproduction, not survival - the tail attracts mates, and that gain outweighs the survival cost
        - id: c
          text: Evolution makes mistakes
          why: "Selection has no foresight, but a trait this elaborate and consistent is not an accident. It is being actively favoured."
        - id: d
          text: The tail used to be smaller and grew by chance
          why: "Drift does not produce something this costly and this consistent across a species. Something is favouring it."
    solution:
      - text: "Remember fitness is measured in offspring, not in lifespan."
      - text: "A male with a spectacular tail is more likely to be chosen as a mate."
      - text: "If he leaves more offspring than a drab, safer male, his genes spread - even though he is likelier to be eaten."
      - text: "Selection by mate choice like this is called sexual selection."
      - text: "There is an argument that the cost is the point: only a genuinely healthy male can afford to carry such a handicap, so the tail is a signal that is hard to fake."
      - text: "This is also a useful corrective to the idea that evolution optimises. It does not produce the best possible organism, only whatever leaves the most offspring - which can be clumsy, costly and strange."
    source: original
    verified: true
  - id: bio.evo.natural-selection.i6
    tier: challenge
    type: mcq
    depth: both
    prompt: "Genetic drift changes allele frequencies by chance. Why does it matter far more in a small population?"
    answer:
      correctId: c
      options:
        - id: a
          text: Small populations have more mutations
          why: "Mutation rate per individual is unrelated to population size, and a small population has fewer individuals and so fewer mutations overall."
        - id: b
          text: Small populations are always under stronger selection
          why: "Selection pressure depends on the environment, not on headcount."
        - id: c
          text: Random sampling error is proportionally much larger when the sample is small - a few chance deaths can shift frequencies dramatically
        - id: d
          text: Drift only happens in small populations
          why: "Drift happens in every population. It is simply negligible when numbers are large."
    solution:
      - text: "Drift is sampling error. Which individuals happen to reproduce is partly luck."
      - text: "Think of coin flips. Ten flips can easily come out 7-3, which is a big deviation. Ten thousand flips essentially never come out 70-30."
      - text: "Same with alleles. In a population of 20, a few chance deaths can wipe out an allele entirely."
      - text: "In a population of a million, the same number of chance deaths changes the frequency by a negligible amount."
      - text: "So drift can even eliminate a BENEFICIAL allele in a small population, purely by bad luck - selection is not strong enough to protect it."
      - text: "Two scenarios worth naming. A bottleneck is a population crash leaving a small unrepresentative survivor group. The founder effect is a few individuals starting a new isolated population, carrying only a slice of the original variation."
      - text: "This is a central concern in conservation: a species reduced to a few dozen individuals loses genetic diversity fast, and cannot easily get it back."
    source: original
    verified: true
  - id: bio.evo.natural-selection.i7
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: the four conditions for natural selection, and the three patterns selection can take."
    answer:
      model: "The four conditions are that variation exists within the population, that the variation is heritable, that more offspring are produced than can survive so there is competition, and that survival and reproduction are not random with respect to that variation. The three patterns are directional selection, where one extreme is favoured so the mean shifts, as in antibiotic resistance; stabilising selection, where the average is favoured so variation decreases, as in human birth weight; and disruptive selection, where both extremes are favoured over the middle, which splits the distribution and can begin the formation of two species. Crucially, selection does not create variation - mutation and sexual reproduction do that, and selection only filters what is already present."
      rubric:
        - "Variation exists and is heritable"
        - "Overproduction of offspring leading to competition"
        - "Survival is non-random with respect to the variation"
        - "Names directional, stabilising and disruptive selection with their effects"
        - "States that selection filters existing variation rather than creating it"
    solution:
      - text: "Condition one - variation. Individuals differ."
      - text: "Condition two - heritability. The differences are passed on."
      - text: "Condition three - overproduction. More offspring than can survive, so there is competition."
      - text: "Condition four - non-random survival. Who survives depends on the variation."
      - text: "Directional - one extreme favoured, the mean shifts. Antibiotic resistance, peppered moths."
      - text: "Stabilising - the average favoured, variation narrows. Human birth weight."
      - text: "Disruptive - both extremes favoured, the middle squeezed out, the distribution splits. Can begin speciation."
      - text: "And the point to hold above all: selection FILTERS variation; it does not create it. Mutation and the shuffling in meiosis create it."
    source: original
    verified: true
---

### The one correction that matters most

> **Selection does not create variation. It filters variation that is already
> there.**

Bacteria do not *sense* an antibiotic and become resistant. A few already
carried resistance by random mutation **before the antibiotic arrived**. The
antibiotic killed everything else.

Nothing adapted during its lifetime. **The population changed because of who
survived.**

This also explains why finishing a course of antibiotics matters: stopping
early leaves the hardest-to-kill individuals alive to repopulate.

### The four conditions

1. **Variation** — individuals differ, or there is nothing to select between
2. **Heritability** — the variation is passed on, or the advantage dies with
   the individual
3. **Overproduction** — more offspring than can survive, so there is competition
4. **Non-random survival** — who survives depends on that variation

If all four hold, useful variants become commoner over generations. **That is
not a theory about them — it follows necessarily.**

Test it by removing one. Variation but not heritable? Nothing accumulates.
Heritable but survival is random? Frequencies just drift.

### "Fitness" does not mean what it sounds like

> **Biological fitness = how many surviving offspring you leave.** That's all.

An organism that lives a long healthy life and never reproduces has fitness
**zero**. A weak, short-lived one that reproduces heavily has high fitness.

And fitness is **environment-specific**. White fur is high fitness in the
Arctic and very low in a forest. **There is no such thing as being fit in
general.**

This is why a **peacock's tail** makes sense. It genuinely makes him slower and
more visible — but he gets chosen as a mate more often, and if that gains more
offspring than the predation costs, the genes spread. That is **sexual
selection**, and the handicap may be the point: only a genuinely healthy male
can afford it, so it is a signal that is hard to fake.

> Useful corrective: **evolution does not optimise.** It produces whatever
> leaves the most offspring — which can be clumsy, costly and strange.

### Three patterns

| Pattern | Favoured | Effect | Example |
|---|---|---|---|
| **Directional** | One extreme | **Mean shifts** | Antibiotic resistance, peppered moths |
| **Stabilising** | The average | **Variation narrows** | Human birth weight |
| **Disruptive** | Both extremes | **Distribution splits** | Can begin speciation |

> Quick test: what happens to the **mean**, and what happens to the **spread**?

### Genetic drift — chance, not fitness

Allele frequencies also change by **luck**. Drift is **sampling error**, and
sampling error is proportionally much larger in small samples.

Ten coin flips can easily come out 7–3. Ten thousand essentially never come out
70–30.

So in a population of 20, a few chance deaths can wipe out an allele entirely —
**even a beneficial one**. In a population of a million, the same deaths change
almost nothing.

Two cases worth naming:

- **Bottleneck** — a population crash leaves a small, unrepresentative group of
  survivors
- **Founder effect** — a few individuals start a new isolated population,
  carrying only a slice of the original variation

This is a central worry in **conservation**: a species reduced to a few dozen
individuals loses genetic diversity fast, and cannot easily get it back.
