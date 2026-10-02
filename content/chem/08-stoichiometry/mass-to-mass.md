---
id: chem.stoich.mass-to-mass
unit: chem.u-stoichiometry
subject: chem
title: Mass-to-Mass Problems
depth: both
ced:
  - SPQ-4.1
prereqs:
  - chem.stoich.mole-ratio
  - chem.mole.mole-conversions
items:
  - id: chem.stoich.mass-to-mass.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "You know the mass of a reactant and you want the mass of a product. What is wrong with multiplying straight across by the ratio of the coefficients?"
    answer:
      correctId: b
      options:
        - id: a
          text: Nothing - coefficients work on mass just fine
          why: "They do not. A balanced equation counts particles, and particles of different substances have different masses."
        - id: b
          text: Coefficients are counts of particles, not masses, so you have to be in moles before using them
        - id: c
          text: You need to convert to litres first
          why: "Volume only enters for gases and solutions. The missing step here is moles."
    solution:
      - text: "A balanced equation is a headcount: 2 H2 + O2 -> 2 H2O means two hydrogen molecules for every oxygen molecule."
      - text: "It does not say two grams for every one gram. Hydrogen molecules are much lighter than oxygen molecules."
      - text: "So coefficients can only be applied to moles. Grams have to be converted first."
      - text: "That gives every mass-to-mass problem the same three-step shape: grams -> moles -> moles -> grams."
    source: original
    verified: true
  - id: chem.stoich.mass-to-mass.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "A rocket burns hydrogen: 2 H2 + O2 -> 2 H2O. If 4.00 g of H2 burns completely, what mass of water forms? H2 is 2.016 g/mol and H2O is 18.015 g/mol."
    answer: { value: 35.75, unit: g, sigFigs: 3, tolerance: 0.005 }
    solution:
      - text: "Step 1 - grams to moles. 4.00 g / 2.016 g/mol = 1.984 mol H2"
      - text: "Step 2 - apply the ratio. The equation says 2 H2 gives 2 H2O, a 1 : 1 ratio, so 1.984 mol H2O."
      - text: "Step 3 - moles back to grams. 1.984 mol x 18.015 g/mol = 35.75, so 35.7 g"
      - text: "Notice the mass went up a lot, from 4 g to nearly 36 g, even though the mole count never changed. The extra mass is the oxygen that joined in."
      - text: "Three sig figs in (4.00), three out: 35.7 g."
    source: original
    verified: true
  - id: chem.stoich.mass-to-mass.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "Heating limestone drives off carbon dioxide: CaCO3 -> CaO + CO2. How many grams of CO2 come off 50.0 g of limestone? CaCO3 is 100.086 g/mol and CO2 is 44.009 g/mol."
    answer: { value: 21.99, unit: g, sigFigs: 3, tolerance: 0.005 }
    solution:
      - text: "Step 1 - grams to moles. 50.0 g / 100.086 g/mol = 0.500 mol CaCO3"
      - text: "Step 2 - ratio. One CaCO3 gives one CO2, so 0.500 mol CO2."
      - text: "Step 3 - moles to grams. 0.500 mol x 44.009 g/mol = 22.0 g CO2"
      - text: "Sanity check on the leftovers: the solid that stays behind should be 50.0 - 22.0 = 28.0 g of CaO. One mole of CaO is 56.08 g, and half a mole is 28.0 g. It matches, so nothing went missing."
      - text: "That check is conservation of mass doing free error-detection for you."
    source: original
    verified: true
  - id: chem.stoich.mass-to-mass.i4
    tier: challenge
    type: numeric
    depth: both
    prompt: "Thermite: Fe2O3 + 2 Al -> 2 Fe + Al2O3. What mass of iron can be produced from 80.0 g of Fe2O3? Fe2O3 is 159.69 g/mol and Fe is 55.845 g/mol."
    answer: { value: 55.95, unit: g, sigFigs: 3, tolerance: 0.005 }
    solution:
      - text: "Step 1 - grams to moles. 80.0 g / 159.69 g/mol = 0.5010 mol Fe2O3"
      - text: "Step 2 - ratio. This one is not 1 : 1. The equation gives 2 Fe for every 1 Fe2O3."
      - text: "0.5010 mol Fe2O3 x (2 mol Fe / 1 mol Fe2O3) = 1.002 mol Fe"
      - text: "Step 3 - moles to grams. 1.002 mol x 55.845 g/mol = 56.0 g Fe"
      - text: "The coefficient 2 is the whole difference between this and the last question. Skip it and you get 28.0 g - exactly half, and a very common wrong answer."
      - text: "Always read the ratio off the balanced equation rather than assuming it is one-to-one."
    source: original
    verified: true
  - id: chem.stoich.mass-to-mass.i5
    tier: challenge
    type: numeric
    depth: both
    prompt: "Working backwards: for 2 H2 + O2 -> 2 H2O, what mass of oxygen gas do you need to make exactly 100.0 g of water? O2 is 31.998 g/mol and H2O is 18.015 g/mol."
    answer: { value: 88.81, unit: g, sigFigs: 4, tolerance: 0.005 }
    solution:
      - text: "The three steps work in either direction. Start from the product this time."
      - text: "Step 1 - grams to moles. 100.0 g / 18.015 g/mol = 5.551 mol H2O"
      - text: "Step 2 - ratio. The equation says 1 O2 makes 2 H2O, so you need half as many moles of O2."
      - text: "5.551 mol H2O x (1 mol O2 / 2 mol H2O) = 2.776 mol O2"
      - text: "Step 3 - moles to grams. 2.776 mol x 31.998 g/mol = 88.81 g O2"
      - text: "Check by conservation of mass: the hydrogen needed would be 100.0 - 88.81 = 11.19 g. And indeed water is 11.19% hydrogen by mass. Everything lines up."
    source: original
    verified: true
  - id: chem.stoich.mass-to-mass.i6
    tier: warmup
    type: recall
    depth: both
    prompt: "From memory: what are the three steps of a mass-to-mass problem, and which one needs the balanced equation?"
    answer:
      model: "Convert the known mass to moles by dividing by its molar mass. Then use the mole ratio from the balanced equation to switch from moles of the known substance to moles of the one you want. Then convert those moles to grams by multiplying by the new substance's molar mass. Only the middle step needs the balanced equation - the two outer steps just need molar masses."
      rubric:
        - "Step 1: grams to moles, divide by molar mass"
        - "Step 2: mole ratio from the balanced equation"
        - "Step 3: moles to grams, multiply by molar mass"
        - "Identifies the middle step as the one requiring the balanced equation"
    solution:
      - text: "Step 1: grams of what you have, divided by its molar mass, gives moles."
      - text: "Step 2: multiply by the mole ratio from the balanced equation. This is the only step that needs the equation at all."
      - text: "Step 3: multiply by the molar mass of what you want, giving grams."
      - text: "Mnemonic worth keeping: out of grams, across the equation, back into grams."
      - text: "Every single mass-based stoichiometry problem in the course is this, sometimes with an extra step bolted on either end."
    source: original
    verified: true
---

This is the workhorse of the whole unit, and it is honestly just three steps
glued together.

The thing to understand first: **a balanced equation counts particles, not
grams.** `2 H2 + O2 -> 2 H2O` means two hydrogen molecules per oxygen
molecule. It emphatically does not mean two grams per gram, because hydrogen
molecules are far lighter than oxygen molecules.

So coefficients are only allowed to touch **moles**. Which forces this shape:

> **grams of A -> moles of A -> moles of B -> grams of B**

1. **Out of grams.** Divide by the molar mass of what you were given.
2. **Across the equation.** Multiply by the mole ratio from the coefficients.
3. **Back into grams.** Multiply by the molar mass of what you want.

Only the middle step needs the balanced equation. The outer two just need
molar masses.

**Two mistakes cost most of the marks on this topic:**

- Using the coefficients on grams directly, skipping step 1 entirely.
- Assuming the ratio is 1 : 1 without reading it. In thermite, one Fe2O3 gives
  **two** Fe. Forgetting that halves your answer.

And there's a free check available on almost every one of these: **mass is
conserved.** Add up what goes in and what comes out. If the books don't
balance, you have a mistake, and you found it without the answer key.
