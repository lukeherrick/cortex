---
id: chem.mole.percent-composition
unit: chem.u-mole
subject: chem
title: Percent Composition
depth: both
ced:
  - SPQ-2.1
prereqs:
  - chem.mole.molar-mass
items:
  - id: chem.mole.percent-composition.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "What percent of water's mass is hydrogen? H2O is 18.015 g/mol and the hydrogen in it accounts for 2.016 g/mol."
    answer: { value: 11.19, unit: null, sigFigs: 4, tolerance: 0.005 }
    solution:
      - text: "Percent composition is the part over the whole, times 100."
      - text: "(2.016 / 18.015) x 100 = 11.19%"
      - text: "Water is only about 11% hydrogen by mass, even though two out of three of its atoms are hydrogen."
      - text: "That gap is the point. Hydrogen is extremely light, so it contributes far less mass than its headcount suggests. Percent by mass and percent by atoms are different questions."
    source: original
    verified: true
  - id: chem.mole.percent-composition.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "A fertiliser label brags about nitrogen content. For calcium nitrate, Ca(NO3)2, what percent of the mass is nitrogen? The compound is 164.086 g/mol and contains 2 N at 14.007 each."
    answer: { value: 17.07, unit: null, sigFigs: 4, tolerance: 0.005 }
    solution:
      - text: "First the part: 2 x 14.007 = 28.014 g/mol of nitrogen."
      - text: "Then the whole: 164.086 g/mol."
      - text: "(28.014 / 164.086) x 100 = 17.07%"
      - text: "Count both nitrogens. Using only one is the standard mistake here and gives 8.54%, exactly half the right answer - which is a useful tell that you dropped a subscript."
      - text: "This is a real number on real fertiliser bags. It is why they are sold by nitrogen percentage rather than by weight."
    source: original
    verified: true
  - id: chem.mole.percent-composition.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "Dry ice is CO2, molar mass 44.009 g/mol. What percent of it is carbon? C = 12.011."
    answer: { value: 27.29, unit: null, sigFigs: 4, tolerance: 0.005 }
    solution:
      - text: "(12.011 / 44.009) x 100 = 27.29%"
      - text: "So the oxygen makes up the other 72.71%."
      - text: "Quick check you can always do: the percentages of every element must add to 100. 27.29 + 72.71 = 100.00. If yours do not add up, something is wrong before you even look at the answer key."
    source: original
    verified: true
  - id: chem.mole.percent-composition.i4
    tier: challenge
    type: mcq
    depth: both
    prompt: "You want the most nitrogen per kilogram of fertiliser you buy. Ammonia (NH3) is 82.2% N. Ammonium nitrate (NH4NO3) is 35.0% N. Urea (CH4N2O) is 46.6% N. Which is the best buy per kilogram, and what is the catch?"
    answer:
      correctId: b
      options:
        - id: a
          text: Ammonium nitrate, because it has the most nitrogen atoms in its formula
          why: "Atom count in the formula is not what matters - it is nitrogen's share of the total mass. 35.0% is the lowest of the three."
        - id: b
          text: Ammonia, because 82.2% beats the others, but it is a gas and awkward to handle
        - id: c
          text: Urea, because it is in the middle and therefore the safest choice
          why: "Being in the middle is not an argument. The question asked for the most nitrogen per kilogram, and 46.6% is not the highest."
    solution:
      - text: "Read the percentages directly: ammonia 82.2%, urea 46.6%, ammonium nitrate 35.0%."
      - text: "Per kilogram of product, ammonia delivers more than twice the nitrogen that ammonium nitrate does."
      - text: "Why so high? NH3 is one nitrogen (14.007) plus three very light hydrogens (3.024), total 17.031. The nitrogen is almost the whole molecule."
      - text: "The catch is that NH3 is a gas at room temperature and unpleasant stuff. Urea is a solid you can pour into a spreader, which is why it is the common one despite the lower number."
      - text: "This is percent composition doing real work: it is the number that decides what farmers actually buy."
    source: original
    verified: true
  - id: chem.mole.percent-composition.i5
    tier: warmup
    type: mcq
    depth: both
    prompt: "Does percent composition depend on how much of the substance you have?"
    answer:
      correctId: c
      options:
        - id: a
          text: Yes - more substance means a higher percentage
          why: "Percentages are ratios. Doubling the sample doubles both the part and the whole, so the ratio is untouched."
        - id: b
          text: Only for gases
          why: "Nothing special happens to gases here. It is a ratio either way."
        - id: c
          text: No - it is a fixed property of the compound
    solution:
      - text: "Water is 11.19% hydrogen whether you have a drop or a swimming pool."
      - text: "Double the sample and both the hydrogen mass and the total mass double. The fraction stays the same."
      - text: "This is why percent composition is useful for identifying an unknown substance: it is a fingerprint of the compound, not of your sample size."
    source: original
    verified: true
---

**Percent composition** answers one question: of the total mass of a compound,
how much of it is each element?

The recipe never changes:

> (mass of that element in one mole / molar mass of the whole compound) x 100

Two things worth burning in:

**Count every atom of the element.** In Ca(NO3)2 there are two nitrogens, so
the nitrogen part is 2 x 14.007, not 14.007. Dropping a subscript here gives
you exactly half the right answer, which is at least an easy mistake to spot.

**Mass share and atom share are different questions.** Water is two-thirds
hydrogen *by atoms* but only 11% hydrogen *by mass*, because hydrogen is
feather-light. Quizzes exploit this gap constantly.

**Free error check:** all the percentages in a compound must add to 100. If
yours don't, you already know something is wrong - no answer key needed.

And percent composition is not just an exercise. It is how fertiliser is
priced, how supplements are labelled, and - coming up next - how chemists work
out the formula of a substance they have never seen before.
