---
id: bio.eco.populations
unit: bio.u-ecology
subject: bio
title: Population Growth
depth: both
ced:
  - ENE-4.B
prereqs:
  - bio.eco.energy-flow
items:
  - id: bio.eco.populations.i1
    tier: standard
    type: numeric
    depth: both
    prompt: "A population grows logistically with r = 0.5, carrying capacity K = 100, and current size N = 50. Calculate the growth rate dN/dt."
    answer: { value: 12.5, unit: null, sigFigs: null }
    solution:
      - text: "The logistic equation is dN/dt = rN((K - N)/K)."
      - text: "Substitute: r = 0.5, N = 50, K = 100."
      - text: "(K - N)/K = (100 - 50)/100 = 0.5"
      - text: "dN/dt = 0.5 x 50 x 0.5 = 12.5"
      - text: "Notice the (K-N)/K term. It is the fraction of the carrying capacity still unused - the 'room left to grow'."
      - text: "At N = 50 with K = 100, half the space is free, so growth runs at half its unrestricted rate."
      - text: "This is also the fastest the population will ever grow. Growth peaks at exactly K/2 and slows on either side."
    source: original
    verified: true
  - id: bio.eco.populations.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "Why does logistic growth peak at half the carrying capacity rather than at the start or the end?"
    answer:
      correctId: c
      options:
        - id: a
          text: Because resources are most abundant then
          why: "Resources are most abundant when the population is smallest. The peak is a trade-off, not a resource maximum."
        - id: b
          text: Because that is where the population is healthiest
          why: "Health is not what the equation tracks. It tracks the product of two competing quantities."
        - id: c
          text: Growth needs both individuals to reproduce AND room to grow into - at K/2 the product of those two is largest
        - id: d
          text: It does not - growth is fastest at the very beginning
          why: "The per-individual rate is highest at the start, but with few individuals the total increase is small."
    solution:
      - text: "Two things are being multiplied, and they pull in opposite directions."
      - text: "N is how many reproducers there are. It grows as the population grows."
      - text: "(K-N)/K is how much room is left. It shrinks as the population grows."
      - text: "At the very start, plenty of room but almost nobody to reproduce, so the total increase is tiny."
      - text: "Near K, plenty of reproducers but almost no room, so again the increase is tiny."
      - text: "The product is largest in the middle, at K/2. That is where the curve is steepest."
      - text: "Practical use: fisheries are managed to hold stocks near K/2 precisely because that is where the population replaces itself fastest and the sustainable catch is largest."
    source: original
    verified: true
  - id: bio.eco.populations.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "What is the difference between a density-dependent and a density-independent limiting factor?"
    answer:
      correctId: a
      options:
        - id: a
          text: Density-dependent factors bite harder as the population gets crowded; density-independent ones hit regardless of how many there are
        - id: b
          text: Density-dependent factors are biological and density-independent ones are always weaker
          why: "The first half is a decent rule of thumb, but strength is not the distinction - a hurricane is density-independent and devastating."
        - id: c
          text: Density-dependent factors only affect large populations
          why: "They affect populations of any size; their INTENSITY just rises with crowding."
        - id: d
          text: They are two names for the same thing
          why: "They behave very differently, and only one of them can regulate a population toward a carrying capacity."
    solution:
      - text: "Density-dependent: the effect gets stronger as the population gets denser. Competition for food, disease spreading between close neighbours, predators concentrating where prey is abundant, waste accumulating."
      - text: "Density-independent: the effect is the same whatever the density. A hurricane, a hard frost, a volcanic eruption, a habitat being bulldozed."
      - text: "Useful shorthand: density-dependent factors are usually biological, density-independent ones usually physical. It is not a perfect rule but it is a good first guess."
      - text: "The important consequence is that only density-dependent factors can REGULATE a population."
      - text: "They act like a thermostat - the more crowded it gets, the harder they push back, which is exactly what produces a carrying capacity."
      - text: "A density-independent factor just knocks the population down wherever it happened to be. It cannot hold it at a level, because it does not respond to density at all."
    source: original
    verified: true
  - id: bio.eco.populations.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "What is the difference between an r-selected and a K-selected species, and what environment favours each?"
    answer:
      correctId: b
      options:
        - id: a
          text: r-selected species are larger and live longer
          why: "That describes K-selected species. r-selected ones are typically small and short-lived."
        - id: b
          text: r-selected species produce many offspring with little care and thrive where conditions are unstable; K-selected produce few with heavy investment and thrive in stable, crowded conditions
        - id: c
          text: r-selected species live in water and K-selected on land
          why: "Both strategies occur in every habitat. Whales and fish share an ocean and sit at opposite ends."
        - id: d
          text: K-selected species reproduce faster
          why: "K-selected species reproduce slowly. Their investment goes into each individual offspring instead."
    solution:
      - text: "r-selected: many offspring, little or no parental care, mature fast, die young. Insects, weeds, most fish, bacteria."
      - text: "This pays off where the environment is unpredictable and often disturbed. Most offspring will die regardless, so flood the zone and rely on numbers."
      - text: "K-selected: few offspring, heavy parental investment, slow to mature, long-lived. Elephants, whales, humans, oak trees."
      - text: "This pays off where the environment is stable and already near carrying capacity. Competition is the problem, so quality beats quantity."
      - text: "The names come from the logistic equation: r-selected species are selected for a high growth rate, K-selected for competing well near the carrying capacity."
      - text: "It is a spectrum rather than two boxes, and it has real consequences - K-selected species recover very slowly from population crashes, which is why they dominate extinction risk lists."
    source: original
    verified: true
  - id: bio.eco.populations.i5
    tier: challenge
    type: numeric
    depth: both
    prompt: "A population of 2000 has 300 births and 100 deaths in a year, with no migration. What is the per capita growth rate r?"
    answer: { value: 0.1, unit: null, sigFigs: null }
    solution:
      - text: "Net change = births - deaths = 300 - 100 = 200 individuals."
      - text: "Per capita means per individual, so divide by the population size."
      - text: "r = 200 / 2000 = 0.1"
      - text: "That is a growth rate of 0.1 per individual per year, or 10% per year."
      - text: "The per capita figure is what lets you compare populations of different sizes - 200 extra individuals means something very different in a population of 2000 than in one of 2 million."
      - text: "If migration mattered you would include it: net change = (births + immigration) - (deaths + emigration)."
    source: original
    verified: true
  - id: bio.eco.populations.i6
    tier: challenge
    type: mcq
    depth: both
    prompt: "A population overshoots its carrying capacity and then crashes well BELOW it. Why does it overshoot rather than levelling off neatly?"
    answer:
      correctId: d
      options:
        - id: a
          text: The carrying capacity increased and then fell
          why: "It can happen, but overshoot occurs even with a perfectly constant carrying capacity."
        - id: b
          text: Carrying capacity is only an average
          why: "True but not the mechanism. The overshoot comes from timing."
        - id: c
          text: Predators arrived late
          why: "A specific case of the general answer, which is that the limiting response is delayed."
        - id: d
          text: There is a delay before the limiting factors take effect, so the population keeps growing past K before the consequences arrive
    solution:
      - text: "Resources are not consumed instantly - a population eats into its food supply over time, and damage accumulates before it is felt."
      - text: "There is also a reproductive lag. Individuals already born or growing will mature and reproduce regardless of current conditions."
      - text: "So the population keeps rising for a while after it has passed the sustainable level."
      - text: "By the time the shortage bites, the population is well above K and the resources are badly depleted - more depleted than they would have been at K."
      - text: "So the crash goes below K, because the environment itself has been damaged."
      - text: "This is the same delay-and-overshoot pattern as any feedback loop with a lag, and it is why reindeer introduced to islands famously boom and then collapse."
      - text: "It matters for conservation and fisheries: a population harvested right up to its limit can crash far below it, and may take a long time to return."
    source: original
    verified: true
  - id: bio.eco.populations.i7
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: exponential versus logistic growth, and what carrying capacity means."
    answer:
      model: "Exponential growth occurs when resources are unlimited, so the per capita growth rate stays constant and the population produces a J-shaped curve that accelerates indefinitely. It only happens in practice when a population is small relative to its resources, such as a species entering new habitat. Logistic growth occurs when resources are limited: growth slows as the population rises and levels off at the carrying capacity, giving an S-shaped curve. Carrying capacity is the population size an environment can sustain indefinitely given its resources. Growth under the logistic model is fastest at half the carrying capacity, because growth depends both on the number of individuals reproducing and on the room remaining, and the product of those two is greatest in the middle."
      rubric:
        - "Exponential: unlimited resources, constant per capita rate, J-shaped curve"
        - "Logistic: limited resources, S-shaped curve levelling at K"
        - "Defines carrying capacity as the sustainable population size"
        - "States growth is fastest at K/2"
        - "Explains the K/2 peak as a product of reproducers and remaining room"
    solution:
      - text: "Exponential growth - unlimited resources. The per capita rate stays constant, so the absolute increase gets bigger and bigger. A J-shaped curve."
      - text: "It is real but temporary: bacteria in fresh medium, a species arriving in new habitat, humans after the agricultural revolution."
      - text: "Logistic growth - limited resources. Growth slows as crowding increases and levels off at the carrying capacity. An S-shaped curve."
      - text: "Carrying capacity, K, is the population an environment can sustain indefinitely."
      - text: "The logistic equation is dN/dt = rN((K-N)/K), where (K-N)/K is the fraction of capacity still unused."
      - text: "Growth is fastest at K/2, because it depends on BOTH the number of reproducers and the room left, and their product peaks in the middle."
      - text: "Real populations rarely sit neatly at K. Delays cause overshoot and crash, and K itself changes as the environment does."
    source: original
    verified: true
---

### Two growth patterns

**Exponential** — unlimited resources. The per-capita rate stays constant, so
the absolute increase gets bigger and bigger. A **J-shaped** curve.

Real but temporary: bacteria in fresh medium, a species arriving in new
habitat, humans after the agricultural revolution.

**Logistic** — limited resources. Growth slows as crowding rises and levels off
at the **carrying capacity (K)**. An **S-shaped** curve.

> **dN/dt = rN((K − N)/K)**

That `(K−N)/K` term is **the fraction of capacity still unused** — the room left
to grow into. At N = K it becomes zero and growth stops.

### Why growth peaks at K/2

Two things are multiplied, and they **pull in opposite directions**:

- **N** — how many individuals are reproducing. **Rises** with population.
- **(K−N)/K** — how much room is left. **Falls** with population.

At the start: lots of room, almost nobody to reproduce → small increase.
Near K: lots of reproducers, almost no room → small increase.

**The product peaks in the middle, at K/2.** That is where the curve is
steepest.

> This is why fisheries are managed to hold stocks near **K/2** — it is where
> the population replaces itself fastest, so the sustainable catch is largest.

### Limiting factors

| | Density-**dependent** | Density-**independent** |
|---|---|---|
| Effect | **Stronger as crowding rises** | Same whatever the density |
| Usually | Biological | Physical |
| Examples | Competition, disease, predation, waste | Hurricane, frost, fire, habitat destruction |

**Only density-dependent factors can regulate a population.** They act like a
thermostat — the more crowded it gets, the harder they push back — and that is
precisely what produces a carrying capacity.

A density-independent factor just knocks the population down wherever it
happened to be. It cannot hold it at a level, because it does not respond to
density at all.

### Overshoot and crash

Real populations rarely level off neatly. They **overshoot K and then crash
below it**, because of **delay**:

- Resources are depleted over time, and damage accumulates before it is felt
- Individuals already born will mature and reproduce regardless of conditions

So the population keeps climbing past the sustainable level. By the time
shortage bites, it is well above K **and the resources are more depleted than
they would have been at K** — so the crash goes below.

> Same delay-and-overshoot behaviour as any feedback loop with a lag. It is why
> reindeer introduced to islands famously boom and then collapse — and why a
> fishery harvested right to its limit can crash far below it.

### Two life strategies

| | **r-selected** | **K-selected** |
|---|---|---|
| Offspring | **Many** | **Few** |
| Parental care | Little or none | Heavy |
| Maturity | Fast | Slow |
| Lifespan | Short | Long |
| Thrives where | **Unstable, disturbed** | **Stable, crowded** |
| Examples | Insects, weeds, most fish | Elephants, whales, humans, oaks |

The names come straight from the logistic equation: **r**-selected for a high
growth **rate**, **K**-selected for competing well near the **carrying
capacity**.

It is a spectrum, not two boxes — and it has real consequences. **K-selected
species recover very slowly from crashes**, which is why they dominate
extinction-risk lists.

### Per capita rate

> r = (births − deaths) / population size

> 2000 individuals, 300 births, 100 deaths → 200/2000 = **0.1** (10% per year)

The *per capita* figure is what lets you compare populations of different
sizes. With migration: (births + immigration) − (deaths + emigration).
