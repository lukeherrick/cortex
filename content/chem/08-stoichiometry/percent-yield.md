---
id: chem.stoich.percent-yield
unit: chem.u-stoichiometry
subject: chem
title: Percent Yield
depth: both
ced:
  - SPQ-4.2
prereqs:
  - chem.stoich.mass-to-mass
items:
  - id: chem.stoich.percent-yield.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "Stoichiometry says you should get 22.0 g of product. You actually scrape 18.5 g out of the flask. What is your percent yield?"
    answer: { value: 84.09, unit: null, sigFigs: 3, tolerance: 0.005 }
    solution:
      - text: "Percent yield is what you got over what you should have got, times 100."
      - text: "(18.5 / 22.0) x 100 = 84.1%"
      - text: "The number you calculated from the equation (22.0 g) is the theoretical yield. The number from the balance (18.5 g) is the actual yield."
      - text: "Actual goes on top. Putting them the wrong way round gives 119%, which should immediately look wrong."
    source: original
    verified: true
  - id: chem.stoich.percent-yield.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "A student reports a percent yield of 112%. What is the most likely explanation?"
    answer:
      correctId: c
      options:
        - id: a
          text: The reaction was unusually efficient
          why: "You cannot make more product than the atoms you started with allow. Over 100% is not efficiency, it is an error."
        - id: b
          text: They used the wrong molar mass for the reactant
          why: "Possible in principle, but there is a far more common cause in a real lab, and it is physical rather than arithmetic."
        - id: c
          text: The product was still wet, or contaminated with something else
        - id: d
          text: Percent yield above 100% is completely normal
          why: "It is a red flag every time. Conservation of mass forbids genuinely exceeding the theoretical yield."
    solution:
      - text: "The theoretical yield is a hard ceiling. It is the most product the atoms you started with could possibly become."
      - text: "So a yield above 100% always means something is wrong - it never means the reaction over-performed."
      - text: "The usual culprit in a school lab is leftover solvent. A damp product weighs more than the product alone, and the water gets counted as product."
      - text: "Other causes: an impure product, or weighing the filter paper along with the solid."
      - text: "The fix is drying the product properly and weighing it to a constant mass. If two weighings in a row agree, it is dry."
    source: original
    verified: true
  - id: chem.stoich.percent-yield.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "CaCO3 -> CaO + CO2. You heat 25.0 g of limestone and collect 9.80 g of CO2. What is the percent yield? CaCO3 is 100.086 g/mol and CO2 is 44.009 g/mol."
    answer: { value: 89.13, unit: null, sigFigs: 3, tolerance: 0.005 }
    solution:
      - text: "You have to calculate the theoretical yield first - the question does not hand it to you."
      - text: "Moles CaCO3 = 25.0 / 100.086 = 0.2498 mol"
      - text: "Ratio is 1 : 1, so 0.2498 mol of CO2 is expected."
      - text: "Theoretical mass = 0.2498 x 44.009 = 10.99 g"
      - text: "Percent yield = (9.80 / 10.99) x 100 = 89.1%"
      - text: "Most percent-yield questions are really a mass-to-mass problem with one extra division tacked on the end. Do the stoichiometry first, then compare."
    source: original
    verified: true
  - id: chem.stoich.percent-yield.i4
    tier: challenge
    type: numeric
    depth: both
    prompt: "N2 + 3 H2 -> 2 NH3. You start with 0.300 mol N2 and 0.600 mol H2 and collect 6.40 g of ammonia. What is the percent yield? NH3 is 17.031 g/mol."
    answer: { value: 93.95, unit: null, sigFigs: 3, tolerance: 0.005 }
    solution:
      - text: "Careful - two reactants are given, so you must find the limiting one before anything else."
      - text: "From N2: 0.300 x (2/1) = 0.600 mol NH3 possible."
      - text: "From H2: 0.600 x (2/3) = 0.400 mol NH3 possible."
      - text: "H2 gives the smaller number, so H2 is limiting and the theoretical yield is 0.400 mol."
      - text: "Theoretical mass = 0.400 x 17.031 = 6.812 g"
      - text: "Percent yield = (6.40 / 6.812) x 100 = 93.9%"
      - text: "Using N2 by mistake would give a theoretical yield of 10.2 g and a percent yield of 62.6% - a wrong answer that looks perfectly plausible, which is exactly why the limiting reagent step is checked first."
    source: original
    verified: true
  - id: chem.stoich.percent-yield.i5
    tier: ap
    type: frq
    depth: both
    prompt: "Industrial ammonia synthesis runs at only a few percent yield per pass through the reactor, yet the process is one of the most important in the world and is run at enormous scale. Explain why such a low per-pass yield is acceptable in industry but would be a problem in a school lab, and name the chemical reason the yield is low in the first place."
    answer:
      model: "The reaction is reversible and reaches equilibrium, so ammonia decomposes back to nitrogen and hydrogen as fast as it forms - it cannot go to completion in one pass no matter how long you wait. Industry gets around this by cooling the mixture to condense the ammonia out, then recycling the unreacted nitrogen and hydrogen back into the reactor. Because nothing is thrown away, the overall yield across many passes is very high even though each pass is low. A school lab has no recycle loop, so unreacted material is simply lost, and the per-pass yield is the final yield."
      rubric:
        - "1 point: identifies the reaction as reversible / reaching equilibrium"
        - "1 point: explains that equilibrium prevents complete conversion in one pass"
        - "1 point: describes removing the product and recycling the unreacted reactants"
        - "1 point: contrasts this with a single-pass lab procedure where unreacted material is lost"
    solution:
      - text: "First, why the yield is low: the reaction is reversible. As ammonia builds up, it breaks back down, and the forward and reverse rates even out at equilibrium."
      - text: "That means complete conversion is not just slow - it is impossible in a single pass. Waiting longer does not help once equilibrium is reached."
      - text: "Industry's answer is not to improve the single pass but to stop wasting the leftovers."
      - text: "The gas mixture is cooled until the ammonia condenses to a liquid and drains off. Nitrogen and hydrogen stay gaseous."
      - text: "Those unreacted gases get pumped straight back into the reactor for another go."
      - text: "Removing the product also shifts the equilibrium forward, which helps on top of the recycling."
      - text: "So the overall yield over many passes approaches high values even though each individual pass is poor."
      - text: "A school lab has no recycle loop. Whatever does not react gets poured down the sink, so the per-pass yield is the only yield you get."
      - text: "Lesson worth carrying: percent yield measures a procedure, not just a reaction. The same chemistry gives very different yields depending on how the process is built around it."
    source: original
    verified: true
---

Stoichiometry tells you the most you could possibly get. Reality is usually
less generous.

- **Theoretical yield** - what the balanced equation predicts. You calculate it.
- **Actual yield** - what you actually end up weighing. You measure it.

> percent yield = (actual / theoretical) x 100

**Actual goes on top.** Flip it and you get something over 100%, which should
set off an alarm.

Because that is the other half of this topic: **a percent yield above 100% is
always an error.** You cannot create product out of nothing - the theoretical
yield is a hard ceiling set by the atoms you started with. If you report 112%,
the most likely cause is that your product was still wet and you weighed the
solvent along with it.

Real reasons a yield comes in under 100%:

- The reaction is **reversible** and settles at equilibrium instead of
  finishing.
- Some reactant went into a **side reaction** making something else.
- Product was **lost in transfer** - stuck to the filter paper, left in the
  beaker, spilled.
- The product was **impure** and had to be purified, losing some.

One structural note that saves marks: most percent-yield questions are a
mass-to-mass problem with one extra division at the end. And if the question
hands you **two** reactants, find the limiting one first - the theoretical
yield comes from the limiting reagent, never from whichever number is written
first.
