---
id: chem.stoich.mole-ratio
unit: chem.u-stoichiometry
subject: chem
title: Mole Ratios
depth: both
ced:
  - SPQ-4.1
prereqs:
  - chem.mole.mole-conversions
  - chem.reactions.balancing
items:
  - id: chem.stoich.mole-ratio.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "For N2 + 3 H2 -> 2 NH3, how many moles of H2 react with 1.00 mol of N2?"
    answer: { value: 3, unit: mol, sigFigs: 3 }
    solution:
      - text: "Read the coefficients: 1 N2 to 3 H2."
      - text: "The ratio is a conversion factor: 3 mol H2 per 1 mol N2."
      - text: "1.00 mol N2 x (3 mol H2 / 1 mol N2) = 3.00 mol H2."
    source: original
    verified: true
  - id: chem.stoich.mole-ratio.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "For 2 Al + 3 Cl2 -> 2 AlCl3, how many moles of AlCl3 form from 0.750 mol Cl2 with excess Al?"
    answer: { value: 0.5, unit: mol, sigFigs: 3 }
    solution:
      - text: "Coefficients give 3 mol Cl2 to 2 mol AlCl3."
      - text: "0.750 mol Cl2 x (2 mol AlCl3 / 3 mol Cl2) = 0.500 mol AlCl3."
      - text: "Three sig figs in, three sig figs out: 0.500 mol."
    source: original
    verified: true
  - id: chem.stoich.mole-ratio.i3
    tier: challenge
    type: mcq
    depth: both
    prompt: "Doubling every coefficient in a balanced equation changes which of the following?"
    answer:
      correctId: c
      options:
        - id: a
          text: The mole ratios between species
          why: "Doubling every coefficient leaves each ratio unchanged - 2:6 is the same ratio as 1:3."
        - id: b
          text: The identity of the limiting reagent
          why: "The limiting reagent depends on the ratio, which does not change."
        - id: c
          text: Nothing chemically meaningful
    solution:
      - text: "A balanced equation states ratios, not absolute amounts."
      - text: "Scaling every coefficient by the same factor preserves every ratio."
      - text: "So no chemical prediction changes."
    source: original
    verified: true
---

A balanced equation is a recipe written in moles. The coefficients are not masses
and not molecules you can weigh out - they are the proportions in which substances
react. Every stoichiometry problem is the same three moves: get to moles, apply the
ratio from the balanced equation, get out of moles.
