---
id: chem.stoich.limiting-reagent
unit: chem.unit-03
subject: chem
title: Limiting Reagent
depth: both
ced:
  - SPQ-4.2
prereqs:
  - chem.stoich.mole-ratio
items:
  - id: chem.stoich.limiting-reagent.i1
    tier: standard
    type: numeric
    depth: both
    prompt: "N2 + 3 H2 -> 2 NH3. You have 0.300 mol N2 and 0.600 mol H2. How many moles of NH3 form?"
    answer: { value: 0.4, unit: mol, sigFigs: 3 }
    solution:
      - text: "Test each reactant. From N2: 0.300 x (2/1) = 0.600 mol NH3."
      - text: "From H2: 0.600 x (2/3) = 0.400 mol NH3."
      - text: "The smaller result wins - H2 runs out first and is limiting."
      - text: "0.400 mol NH3 forms."
    source: original
    verified: true
  - id: chem.stoich.limiting-reagent.i2
    tier: ap
    type: frq
    depth: ap
    prompt: "A student mixes 0.300 mol N2 and 0.600 mol H2 and measures 0.360 mol NH3. Identify the limiting reagent, calculate the percent yield, and give one physical reason the yield is below 100%."
    answer:
      model: "H2 is limiting. Theoretical yield is 0.400 mol NH3, so percent yield = 0.360 / 0.400 x 100 = 90.0%. The reaction is reversible and does not go to completion."
      rubric:
        - "1 point: identifies H2 as limiting with supporting calculation"
        - "1 point: theoretical yield 0.400 mol NH3"
        - "1 point: percent yield 90.0% with correct setup"
        - "1 point: a valid physical reason (equilibrium, side reaction, loss on transfer)"
    solution:
      - text: "Limiting reagent: H2 gives 0.400 mol NH3, N2 gives 0.600 mol, so H2 limits."
      - text: "Theoretical yield is therefore 0.400 mol."
      - text: "Percent yield = actual / theoretical x 100 = 0.360 / 0.400 x 100 = 90.0%."
      - text: "Ammonia synthesis is an equilibrium, so it cannot reach 100% conversion in one pass."
    source: original
    verified: true
---

The limiting reagent is whichever reactant runs out first, and it alone sets how
much product you can make. The reliable method is not to guess from the amounts -
it is to run the calculation once per reactant and keep the smallest answer. Excess
reagent is simply whatever is left over when the limiting one is gone.
