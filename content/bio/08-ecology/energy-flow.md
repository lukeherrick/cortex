---
id: bio.eco.energy-flow
unit: bio.u-ecology
subject: bio
title: Energy Flow Through Ecosystems
depth: both
ced:
  - ENE-4.A
prereqs:
  - bio.energy.photosynthesis
items:
  - id: bio.eco.energy-flow.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "Producers in an ecosystem capture 10000 kcal. Using the 10% rule, how many kcal reach the tertiary consumers (the third level up)?"
    answer: { value: 10, unit: null, sigFigs: null }
    solution:
      - text: "Roughly 10% of the energy at one level reaches the next."
      - text: "Producers: 10000 kcal."
      - text: "Primary consumers: 10% of 10000 = 1000 kcal."
      - text: "Secondary consumers: 10% of 1000 = 100 kcal."
      - text: "Tertiary consumers: 10% of 100 = 10 kcal."
      - text: "So one thousandth of what the plants captured reaches the third consumer level. The losses compound fast."
      - text: "Count the arrows carefully, not the levels - producers to tertiary is three steps, so 10000 x 0.1^3."
    source: original
    verified: true
  - id: bio.eco.energy-flow.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "Where does the other 90% of the energy go between trophic levels?"
    answer:
      correctId: c
      options:
        - id: a
          text: It is destroyed
          why: "Energy cannot be destroyed. It changes form and location, but the total is conserved."
        - id: b
          text: It stays in the uneaten parts of the organism
          why: "Some does, which is part of the answer - but the largest single loss is elsewhere."
        - id: c
          text: Mostly lost as heat from respiration, plus what is never eaten, never digested, or excreted
        - id: d
          text: It is passed to decomposers only
          why: "Decomposers get some, but the dominant loss is heat escaping during respiration at every level."
    solution:
      - text: "The biggest loss is respiration. Every organism burns most of what it eats just staying alive - moving, pumping ions, making proteins."
      - text: "That energy ends up as heat, which radiates away and cannot be recaptured by anything."
      - text: "Then there is what is never eaten at all - roots, bark, bones, and organisms that die of other causes."
      - text: "Then what is eaten but not digested, and leaves as waste."
      - text: "Decomposers get the uneaten and excreted portions, but they too respire most of it away as heat."
      - text: "This is why energy FLOWS through an ecosystem rather than cycling. Matter cycles - carbon, nitrogen, water go round. Energy enters as sunlight and leaves as heat, one way, permanently."
      - text: "Which is also why every ecosystem needs a constant input of sunlight. Cut it off and the whole thing runs down."
    source: original
    verified: true
  - id: bio.eco.energy-flow.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "Why are food chains rarely longer than four or five levels?"
    answer:
      correctId: a
      options:
        - id: a
          text: So little energy is left after a few transfers that it cannot support a viable population of predators
        - id: b
          text: Predators run out of hunting skill
          why: "Nothing about ability limits it. The limit is energetic."
        - id: c
          text: There are not enough species
          why: "Species number is not the constraint. Even species-rich ecosystems have short chains."
        - id: d
          text: Longer chains are unstable in a mathematical sense only
          why: "Stability is affected, but the primary and physical reason is that the energy simply runs out."
    solution:
      - text: "Each step loses about 90%, and the losses compound."
      - text: "From 10000 kcal at the producers: 1000, then 100, then 10, then 1."
      - text: "A fifth-level predator would be living on 1 kcal out of the original 10000."
      - text: "That cannot support enough individuals to form a breeding population."
      - text: "So the length of a food chain is set by energetics, not by biology's imagination."
      - text: "It is also why top predators are always rare and need enormous territories - there is very little energy left at their level to go round."
      - text: "And why losing them first is so common: any disturbance to the base of the chain reaches them magnified."
    source: original
    verified: true
  - id: bio.eco.energy-flow.i4
    tier: standard
    type: numeric
    depth: both
    prompt: "A field of crops captures 20000 kJ. The crops are fed to cattle, and people eat the beef. How many kJ reach the people?"
    answer: { value: 200, unit: null, sigFigs: null }
    solution:
      - text: "Count the steps. Crops are producers, cattle are primary consumers, people eating beef are secondary consumers."
      - text: "That is two transfers, so apply the 10% rule twice."
      - text: "Crops to cattle: 10% of 20000 = 2000 kJ."
      - text: "Cattle to people: 10% of 2000 = 200 kJ."
      - text: "Now compare with eating the crops directly, which is only one transfer: 10% of 20000 = 2000 kJ, ten times more."
      - text: "This is the energetic argument about diet. The same land feeds roughly ten times as many people growing crops for direct consumption as it does producing meat."
      - text: "It is not the whole picture - some land only supports grazing, and meat carries nutrients that are harder to get otherwise - but the energy arithmetic itself is not in dispute."
    source: original
    verified: true
  - id: bio.eco.energy-flow.i5
    tier: challenge
    type: mcq
    depth: both
    prompt: "A pyramid of biomass for a lake is sometimes INVERTED - less producer biomass than consumer biomass. How is that possible when energy pyramids never invert?"
    answer:
      correctId: b
      options:
        - id: a
          text: The producers are more efficient there
          why: "Efficiency does not let consumers hold more energy than their source. The explanation is about time, not efficiency."
        - id: b
          text: Biomass is a snapshot. Tiny phytoplankton reproduce so fast that a small standing mass supplies a large consumer mass over time
        - id: c
          text: The consumers photosynthesise too
          why: "Zooplankton do not photosynthesise. They genuinely depend on the phytoplankton."
        - id: d
          text: The measurement is simply wrong
          why: "Inverted biomass pyramids are real and repeatedly measured in aquatic systems."
    solution:
      - text: "Biomass measures how much is present at one instant. Energy flow measures how much passes through over time."
      - text: "Phytoplankton are tiny and short-lived, but they reproduce extremely fast - a population can replace itself in days."
      - text: "So at any one moment there is only a small mass of them, yet over a month an enormous total mass has been produced and eaten."
      - text: "Zooplankton live longer, so their biomass accumulates and sits there."
      - text: "Snapshot: more zooplankton than phytoplankton. Over time: far more phytoplankton produced than zooplankton."
      - text: "An energy pyramid can NEVER invert, because it measures flow over time and energy is always lost at each step."
      - text: "The lesson worth taking: always check whether a pyramid is measuring a standing stock or a rate. They can tell opposite-looking stories about the same lake."
    source: original
    verified: true
  - id: bio.eco.energy-flow.i6
    tier: challenge
    type: mcq
    depth: both
    prompt: "Carbon cycles through an ecosystem but energy does not. What is the actual difference?"
    answer:
      correctId: d
      options:
        - id: a
          text: There is more carbon than energy
          why: "They are different kinds of quantity and cannot be compared by amount."
        - id: b
          text: Energy is destroyed as it is used
          why: "Energy is never destroyed. It is converted to heat, which disperses and cannot be reused biologically."
        - id: c
          text: Carbon is recycled by decomposers but energy is not touched by them
          why: "Decomposers release energy too - as heat, which then leaves. The difference is in what happens to it afterwards."
        - id: d
          text: Carbon atoms are reused indefinitely, while energy degrades to heat at every step and leaves the system for good
    solution:
      - text: "A carbon atom in your body may have been in a dinosaur, in limestone and in the air. Atoms are not consumed - they are rearranged."
      - text: "So carbon moves in a closed loop: atmosphere, producers, consumers, decomposers, back to the atmosphere."
      - text: "Energy behaves differently. It enters as sunlight, is captured in chemical bonds, and at every transfer most of it becomes heat."
      - text: "That heat radiates out of the ecosystem and cannot be recaptured by any organism. Nothing eats heat."
      - text: "So energy makes a one-way trip: in as light, out as heat."
      - text: "That is why the phrasing is always matter CYCLES and energy FLOWS, and why every ecosystem needs continuous sunlight to keep running."
      - text: "A sealed jar with soil and plants can recycle its matter indefinitely, but put it in a dark cupboard and it dies - the matter is all still there and the energy is not."
    source: original
    verified: true
  - id: bio.eco.energy-flow.i7
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: the trophic levels, the ten per cent rule, and why matter cycles while energy flows."
    answer:
      model: "Producers capture light energy by photosynthesis and form the first trophic level. Primary consumers eat producers, secondary consumers eat primary consumers, and tertiary consumers eat secondary consumers. Decomposers break down dead material at every level. Roughly ten per cent of the energy at one level is passed to the next, with the remainder lost mostly as heat from respiration, and also as material never eaten, never digested or excreted. Matter cycles because atoms such as carbon are rearranged rather than consumed, so they pass endlessly between the atmosphere, organisms and the soil. Energy flows one way because at every transfer most of it degrades into heat, which radiates away and cannot be recaptured by any organism, so ecosystems require a continuous input of sunlight."
      rubric:
        - "Names producers and the consumer levels in order"
        - "Mentions decomposers acting at every level"
        - "States the ten per cent rule"
        - "Identifies respiration heat as the main loss"
        - "Explains matter cycles while energy flows one way and must be replenished"
    solution:
      - text: "Producers - plants, algae, some bacteria. They capture light and make the energy available to everything else."
      - text: "Primary consumers eat producers. Secondary consumers eat primary consumers. Tertiary consumers eat secondary consumers."
      - text: "Decomposers work at every level, breaking down dead material and waste."
      - text: "About 10% passes from each level to the next."
      - text: "The other 90% is lost mostly as heat from respiration, plus parts never eaten, never digested, or excreted."
      - text: "Matter cycles: carbon atoms are rearranged, never used up, so they go round between air, organisms and soil forever."
      - text: "Energy flows: it enters as sunlight and leaves as heat, degrading at every step, and heat cannot be eaten."
      - text: "Hence the slogan - matter cycles, energy flows - and hence the need for constant sunlight."
    source: original
    verified: true
---

### The levels

| Level | Who | Energy source |
|---|---|---|
| **Producers** | Plants, algae, some bacteria | **Sunlight** |
| **Primary consumers** | Herbivores | Producers |
| **Secondary consumers** | Carnivores | Primary consumers |
| **Tertiary consumers** | Top carnivores | Secondary consumers |
| **Decomposers** | Bacteria, fungi | Dead material at **every** level |

### The 10% rule

Roughly **10%** of the energy at one level reaches the next. The losses
**compound**:

> 10,000 → 1,000 → 100 → **10 kcal**

One **thousandth** of what the plants captured reaches the third consumer level.

> Count the **arrows**, not the levels. Producers → tertiary is **three** steps,
> so 10,000 × 0.1³.

### Where the other 90% goes

- **Respiration** — the biggest loss by far. Every organism burns most of what
  it eats just staying alive, and that energy becomes **heat**
- **Never eaten** — roots, bark, bones, organisms that die other ways
- **Never digested** — eaten but passed out as waste

Decomposers get the uneaten and excreted portions — and then respire most of
*that* away as heat too.

### Why food chains are short

A fifth-level predator would live on about **1 kcal out of the original
10,000**. That cannot support a breeding population.

**The length of a food chain is set by energetics, not imagination.** It is
also why top predators are always rare, need enormous territories, and are
usually the first thing an ecosystem loses — any disturbance at the base
reaches them magnified.

### Matter cycles. Energy flows.

This distinction is the heart of the unit.

**Carbon atoms are rearranged, never consumed.** A carbon atom in you may have
been in a dinosaur, in limestone, in the air. Carbon goes round a closed loop
indefinitely.

**Energy degrades at every step.** It enters as **sunlight**, is captured in
chemical bonds, and at each transfer most becomes **heat** — which radiates
away and **cannot be recaptured**. Nothing eats heat.

> A sealed jar of soil and plants can recycle its **matter** forever. Put it in
> a dark cupboard and it dies — all the matter is still there; the energy is
> not.

That is why every ecosystem needs **continuous sunlight**.

### The diet arithmetic

Eating crops directly makes you a **primary** consumer. Feeding them to cattle
first adds a level — and costs about **90%**.

The same land feeds roughly **ten times** as many people growing crops for
direct consumption as it does producing meat. That is not the whole picture —
some land only supports grazing, and meat carries nutrients that are harder to
get otherwise — but **the energy arithmetic is not in dispute**.

### Inverted pyramids — a trap

A **biomass** pyramid for a lake can be **upside down**: less phytoplankton
than zooplankton.

How? **Biomass is a snapshot.** Phytoplankton are tiny and short-lived but
reproduce enormously fast, so a small standing mass supplies a large consumer
mass over time. Zooplankton live longer, so their biomass accumulates.

An **energy** pyramid can **never** invert, because it measures **flow over
time** and energy is always lost at each step.

> Always check whether a pyramid shows a **standing stock** or a **rate**. They
> can tell opposite-looking stories about the same lake.
