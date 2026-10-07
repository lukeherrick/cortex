---
id: chem.mole.empirical-formula
unit: chem.u-mole
subject: chem
title: Empirical and Molecular Formulas
depth: both
ced:
  - SPQ-2.2
prereqs:
  - chem.mole.percent-composition
items:
  - id: chem.mole.empirical-formula.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "Glucose is C6H12O6. What is its empirical formula?"
    answer:
      correctId: b
      options:
        - id: a
          text: C6H12O6 - it is already as simple as it gets
          why: "All three subscripts share a factor of 6, so it can be reduced."
        - id: b
          text: CH2O
        - id: c
          text: C3H6O3
          why: "That is a real reduction, but not the full one - 3, 6 and 3 still share a factor of 3."
    solution:
      - text: "An empirical formula is the simplest whole-number ratio of the atoms."
      - text: "6 : 12 : 6 all divide by 6, giving 1 : 2 : 1."
      - text: "So the empirical formula is CH2O."
      - text: "Reduce all the way, like simplifying a fraction. C3H6O3 is the same mistake as leaving 4/8 instead of writing 1/2."
      - text: "Worth knowing: formaldehyde is also CH2O. Empirical formulas do not uniquely identify a compound - which is exactly why molecular formulas exist."
    source: original
    verified: true
  - id: chem.mole.empirical-formula.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "An unknown white powder is 40.0% carbon, 6.7% hydrogen and 53.3% oxygen by mass. What is its empirical formula?"
    answer:
      correctId: a
      options:
        - id: a
          text: CH2O
        - id: b
          text: C2H4O2
          why: "That is a valid ratio of the same elements, but not the simplest one - everything halves."
        - id: c
          text: CHO
          why: "Check the hydrogen. 6.7% of a 100 g sample is 6.7 g, which is 6.65 mol of H - about double the carbon, not equal to it."
        - id: d
          text: C2H6O
          why: "That ratio does not come out of these percentages. Convert each percent to moles and compare."
    solution:
      - text: "Trick that makes this painless: pretend you have exactly 100 g. Then each percent is just grams."
      - text: "So: 40.0 g C, 6.7 g H, 53.3 g O."
      - text: "Convert each to moles by dividing by its atomic mass."
      - text: "C: 40.0 / 12.011 = 3.330 mol"
      - text: "H: 6.7 / 1.008 = 6.65 mol"
      - text: "O: 53.3 / 15.999 = 3.331 mol"
      - text: "Now divide everything by the smallest of those (3.330) to get the ratio."
      - text: "C: 3.330/3.330 = 1.00, H: 6.65/3.330 = 2.00, O: 3.331/3.330 = 1.00"
      - text: "Ratio 1 : 2 : 1, so the empirical formula is CH2O."
    source: original
    verified: true
  - id: chem.mole.empirical-formula.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "Same powder as before - empirical formula CH2O - but a separate experiment shows its actual molar mass is 180 g/mol. What is the molecular formula, and what is the powder?"
    answer:
      correctId: c
      options:
        - id: a
          text: CH2O, molar mass 30 g/mol
          why: "That is the empirical unit, but the measured mass is 180, six times larger. The real molecule is bigger."
        - id: b
          text: C3H6O3
          why: "Right idea, wrong multiplier. 180 / 30.026 is 6, not 3."
        - id: c
          text: C6H12O6 - glucose
        - id: d
          text: C12H24O12
          why: "That is a multiplier of 12. Check: 12 x 30.026 = 360 g/mol, double the measured value."
    solution:
      - text: "Work out the mass of one empirical unit: CH2O = 12.011 + 2(1.008) + 15.999 = 30.026 g/mol."
      - text: "Divide the real molar mass by that: 180 / 30.026 = 5.995, which rounds to 6."
      - text: "That multiplier should always come out very close to a whole number. If it lands on something like 2.4, you have an arithmetic error upstream."
      - text: "Multiply every subscript by 6: C6H12O6."
      - text: "That is glucose - blood sugar, and the output of photosynthesis."
      - text: "Note what each experiment gave you. Percent composition fixes the ratio; molar mass fixes the size. You need both to pin down a molecule."
    source: original
    verified: true
  - id: chem.mole.empirical-formula.i4
    tier: challenge
    type: mcq
    depth: both
    prompt: "A kitchen powder is 27.4% Na, 1.2% H, 14.3% C and 57.1% O. Identify it."
    answer:
      correctId: b
      options:
        - id: a
          text: Na2CO3 - washing soda
          why: "That would need twice as much sodium relative to carbon. Run the numbers: Na and C come out about equal here."
        - id: b
          text: NaHCO3 - baking soda
        - id: c
          text: NaOH - lye
          why: "There is carbon in the sample, and NaOH contains none."
    solution:
      - text: "Take 100 g, so the percentages become grams, then convert each to moles."
      - text: "Na: 27.4 / 22.990 = 1.192 mol"
      - text: "H: 1.2 / 1.008 = 1.19 mol"
      - text: "C: 14.3 / 12.011 = 1.191 mol"
      - text: "O: 57.1 / 15.999 = 3.569 mol"
      - text: "Divide through by the smallest, about 1.19."
      - text: "Na 1.00, H 1.00, C 1.00, O 3.00"
      - text: "Ratio 1 : 1 : 1 : 3, which is NaHCO3 - baking soda."
      - text: "The low hydrogen percentage is the giveaway here. 1.2% looks almost negligible by mass, but hydrogen is so light that it still amounts to a full mole. Never discard a small percentage without converting it first."
    source: original
    verified: true
  - id: chem.mole.empirical-formula.i5
    tier: ap
    type: frq
    depth: both
    prompt: "A compound contains only carbon, hydrogen and oxygen. Burning 1.000 g of it produces 1.466 g of CO2 and 0.600 g of H2O. Its molar mass is 60.05 g/mol. Determine the empirical and molecular formulas, showing your reasoning."
    answer:
      model: "All the carbon leaves as CO2 and all the hydrogen as H2O. Moles CO2 = 1.466 / 44.009 = 0.03331, so moles C = 0.03331 and mass C = 0.4001 g. Moles H2O = 0.600 / 18.015 = 0.03331, and each water carries 2 H, so moles H = 0.06661 and mass H = 0.0671 g. Oxygen cannot be read from the products because burning adds oxygen from the air, so find it by subtraction: 1.000 - 0.4001 - 0.0671 = 0.5328 g, which is 0.5328 / 15.999 = 0.03330 mol. Dividing all three by the smallest (0.03330) gives C 1.00, H 2.00, O 1.00, so the empirical formula is CH2O with an empirical mass of 30.026. Then 60.05 / 30.026 = 2.00, so every subscript doubles: the molecular formula is C2H4O2, which is acetic acid."
      rubric:
        - "1 point: recognises all C comes from CO2 and all H from H2O"
        - "1 point: correct moles of C and H, remembering 2 H per water"
        - "1 point: finds oxygen by subtracting C and H mass from the original sample"
        - "1 point: correct empirical formula CH2O"
        - "1 point: uses molar mass to get the multiplier and reports C2H4O2"
    solution:
      - text: "This is combustion analysis. The idea: burn the sample, catch the products, and work backwards."
      - text: "Every carbon atom in the sample leaves as CO2. Every hydrogen leaves as part of H2O. So the products tell you how much C and H you started with."
      - text: "Moles CO2 = 1.466 / 44.009 = 0.03331 mol, and each CO2 holds one C, so moles C = 0.03331."
      - text: "Moles H2O = 0.600 / 18.015 = 0.03331 mol, and each H2O holds two H, so moles H = 0.06661. Forgetting that factor of 2 is the single most common error in this whole question type."
      - text: "Oxygen cannot be read off the products, because the oxygen that burned came from the air as well as from the sample. So get it by subtraction instead."
      - text: "Mass C = 0.03331 x 12.011 = 0.4001 g. Mass H = 0.06661 x 1.008 = 0.0671 g."
      - text: "Mass O = 1.000 - 0.4001 - 0.0671 = 0.5328 g, so moles O = 0.5328 / 15.999 = 0.03330 mol."
      - text: "Divide all three by the smallest (0.03330): C 1.00, H 2.00, O 1.00. So the empirical unit is CH2O."
      - text: "Empirical mass of CH2O is 30.026. The measured molar mass is 60.05, and 60.05 / 30.026 = 2.00."
      - text: "Molecular formula: C2H4O2. That is acetic acid - vinegar."
    source: original
    verified: true
---

Percent composition runs one direction: you know the compound, you work out the
percentages. **Empirical formulas run it backwards.** You measure the
percentages in the lab and deduce a formula for a substance nobody has
identified yet. This is how unknown compounds actually get named.

The method is four steps, and it is the same every single time:

1. **Pretend you have 100 g.** Then every percent is just a number of grams.
2. **Convert each mass to moles** by dividing by that element's atomic mass.
3. **Divide everything by the smallest of those mole numbers.** Now you have a
   ratio starting from 1.
4. **Clear any fractions.** If you get something like 1 : 1.5, multiply
   everything by 2.

That gives the **empirical formula** - the simplest whole-number ratio.

But the simplest ratio is not always the real molecule. CH2O is the empirical
formula of formaldehyde, acetic acid *and* glucose. To tell them apart you need
one more measurement: the actual **molar mass**.

> multiplier = measured molar mass / empirical formula mass

Multiply every subscript by that number and you have the **molecular
formula** - the real one. The multiplier should come out very close to a whole
number. If it lands on 2.4, don't round it to 2 and move on. Go back; something
upstream is wrong.

Two different experiments, two different jobs: percent composition fixes the
**ratio**, molar mass fixes the **size**. You need both.
