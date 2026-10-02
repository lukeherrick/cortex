---
id: chem.mole.molar-mass
unit: chem.u-mole
subject: chem
title: Molar Mass
depth: both
ced:
  - SPQ-1.1
prereqs: []
items:
  - id: chem.mole.molar-mass.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "What is the molar mass of water, H2O? Use H = 1.008 and O = 15.999."
    answer: { value: 18.015, unit: g/mol, acceptedUnits: ["g mol^-1"], sigFigs: 5 }
    solution:
      - text: "Count the atoms in the formula: 2 hydrogen, 1 oxygen."
      - text: "Hydrogen: 2 x 1.008 = 2.016"
      - text: "Oxygen: 1 x 15.999 = 15.999"
      - text: "Add them: 2.016 + 15.999 = 18.015 g/mol"
      - text: "Molar mass is just the mass of the whole formula, added up atom by atom, in grams per mole."
    source: original
    verified: true
  - id: chem.mole.molar-mass.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "Dry ice is solid carbon dioxide, CO2. What is its molar mass? C = 12.011, O = 15.999."
    answer: { value: 44.009, unit: g/mol, acceptedUnits: ["g mol^-1"], sigFigs: 5 }
    solution:
      - text: "One carbon, two oxygens."
      - text: "Carbon: 1 x 12.011 = 12.011"
      - text: "Oxygen: 2 x 15.999 = 31.998"
      - text: "12.011 + 31.998 = 44.009 g/mol"
      - text: "The subscript 2 multiplies only the oxygen it is attached to. It does not touch the carbon."
    source: original
    verified: true
  - id: chem.mole.molar-mass.i3
    tier: challenge
    type: numeric
    depth: both
    prompt: "Calcium nitrate, Ca(NO3)2, is a common fertiliser. Find its molar mass. Ca = 40.078, N = 14.007, O = 15.999."
    answer: { value: 164.086, unit: g/mol, acceptedUnits: ["g mol^-1"], sigFigs: 6 }
    solution:
      - text: "The brackets are the trap. The 2 outside multiplies everything inside - both the N and all three O."
      - text: "So the real atom count is: 1 Ca, 2 N, 6 O."
      - text: "Calcium: 1 x 40.078 = 40.078"
      - text: "Nitrogen: 2 x 14.007 = 28.014"
      - text: "Oxygen: 6 x 15.999 = 95.994"
      - text: "40.078 + 28.014 + 95.994 = 164.086 g/mol"
      - text: "Shortcut for next time: work out the mass of one NO3 group (62.004), then double it."
    source: original
    verified: true
  - id: chem.mole.molar-mass.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "Two students work out the molar mass of Mg(OH)2. One gets 58.32, the other 41.31. Who made the classic mistake, and what was it?"
    answer:
      correctId: b
      options:
        - id: a
          text: "58.32 is wrong - they double-counted the magnesium"
          why: "Magnesium has no subscript, so there is only one of it. 58.32 counts it once, correctly."
        - id: b
          text: "41.31 is wrong - they only multiplied the O by 2 and forgot the H"
        - id: c
          text: "Both are wrong - the answer is 60.3"
          why: "Check the arithmetic: 24.305 + 2(15.999) + 2(1.008) = 58.32. One of them is right."
    solution:
      - text: "Mg(OH)2 means one magnesium, and two whole OH groups."
      - text: "Correct count: 1 Mg, 2 O, 2 H."
      - text: "24.305 + 2(15.999) + 2(1.008) = 24.305 + 31.998 + 2.016 = 58.32 g/mol"
      - text: "41.31 comes from counting 1 Mg, 2 O and only 1 H - the subscript was applied to the oxygen but not the hydrogen."
      - text: "The bracket rule: a subscript outside a bracket multiplies every atom inside it, no exceptions."
    source: original
    verified: true
  - id: chem.mole.molar-mass.i5
    tier: warmup
    type: recall
    depth: both
    prompt: "What does molar mass actually tell you? Say it in plain words, no formula."
    answer:
      model: "It is the mass in grams of one mole of a substance - that is, the mass of 6.022 x 10^23 of its particles. It works as a conversion rate between grams, which you can weigh, and moles, which you can count in a reaction."
      rubric:
        - "Says it is the mass of one mole of the substance"
        - "Connects it to grams per mole"
        - "Mentions it lets you convert between mass and moles"
    solution:
      - text: "A mole is just a count - a very large one. 6.022 x 10^23 of something."
      - text: "Molar mass is how much one mole of that substance weighs, in grams."
      - text: "That makes it an exchange rate. Water is 18.015 g/mol, so 18.015 grams of water buys you exactly one mole of water molecules."
      - text: "This matters because balances measure grams, but reactions care about counts. Molar mass is the bridge between the two."
    source: original
    verified: true
---

You cannot count molecules. They are far too small and there are absurdly many
of them. But reactions happen by **count**, not by weight - a balanced equation
says "two of these react with one of those."

So chemistry needs a way to turn a weight you *can* measure into a count you
*can't*. That bridge is **molar mass**.

A **mole** is simply a number, like a dozen but enormous: 6.022 x 10^23 of
whatever you are counting. That number is called **Avogadro's number**, and it
was chosen so that one mole of an element weighs its atomic mass in grams.

So **molar mass** is the mass of one mole of a substance, in grams per mole.
Finding it is pure bookkeeping:

1. Count every atom in the formula.
2. Multiply each count by that element's atomic mass.
3. Add it all up.

The only thing that trips people up is brackets. In Ca(NO3)2 the outer 2
multiplies **everything** inside the bracket - so that is 2 nitrogens and 6
oxygens, not 2 nitrogens and 3 oxygens. Miss that and every answer downstream
is wrong, which is exactly why quizzes love it.
