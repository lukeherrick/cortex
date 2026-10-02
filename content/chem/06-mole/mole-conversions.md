---
id: chem.mole.mole-conversions
unit: chem.u-mole
subject: chem
title: Mole Conversions
depth: both
ced:
  - SPQ-1.2
prereqs:
  - chem.mole.molar-mass
items:
  - id: chem.mole.mole-conversions.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "You pour 36.0 g of water into a beaker. How many moles is that? Molar mass of water is 18.015 g/mol."
    answer: { value: 1.998, unit: mol, sigFigs: 3, tolerance: 0.005 }
    solution:
      - text: "Going from grams to moles means dividing by molar mass."
      - text: "36.0 g / 18.015 g/mol = 2.00 mol"
      - text: "Check it makes sense: 18 g is about one mole, and you have about twice that, so about two moles. It fits."
      - text: "Three significant figures in (36.0), three out: 2.00 mol. Writing just 2 would throw away information you actually measured."
    source: original
    verified: true
  - id: chem.mole.mole-conversions.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "A fire extinguisher releases 1.50 mol of CO2. What mass of gas came out? Molar mass of CO2 is 44.009 g/mol."
    answer: { value: 66.01, unit: g, sigFigs: 3, tolerance: 0.005 }
    solution:
      - text: "Moles to grams is the other direction, so you multiply by molar mass."
      - text: "1.50 mol x 44.009 g/mol = 66.0 g"
      - text: "The units tell you you did it right: mol x (g/mol) leaves g. The mol cancels."
      - text: "If you had divided instead, you would have got 0.0341 and the units would have come out as mol^2/g, which is not a thing. Watching the units cancel is the cheapest error check there is."
    source: original
    verified: true
  - id: chem.mole.mole-conversions.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "How many molecules are in 0.250 mol of sugar? Avogadro's number is 6.022 x 10^23 per mole."
    answer: { value: 1.506e23, unit: molecules, acceptedUnits: ["particles"], sigFigs: 3, tolerance: 0.005 }
    solution:
      - text: "Moles to particles: multiply by Avogadro's number."
      - text: "0.250 mol x 6.022 x 10^23 /mol = 1.51 x 10^23 molecules"
      - text: "Less than one mole in, so fewer than 6.022 x 10^23 out. About a quarter of it, which is what we got."
      - text: "You can type this as 1.51e23 or 1.51 x 10^23 - both are read correctly."
    source: original
    verified: true
  - id: chem.mole.mole-conversions.i4
    tier: challenge
    type: numeric
    depth: both
    prompt: "A sample contains 3.01 x 10^23 molecules of CO2. What is its mass in grams? Avogadro's number is 6.022 x 10^23 /mol and CO2 is 44.009 g/mol."
    answer: { value: 22.0, unit: g, sigFigs: 3, tolerance: 0.005 }
    solution:
      - text: "This is a two-step trip, and moles sits in the middle. Particles -> moles -> grams."
      - text: "Step 1, particles to moles: 3.01 x 10^23 / 6.022 x 10^23 = 0.500 mol"
      - text: "Step 2, moles to grams: 0.500 mol x 44.009 g/mol = 22.0 g"
      - text: "There is no shortcut from particles straight to grams. Moles is always the hub - every conversion goes through it."
      - text: "Sanity check: half a mole of a 44 g/mol gas should be about 22 g. It is."
    source: original
    verified: true
  - id: chem.mole.mole-conversions.i5
    tier: standard
    type: mcq
    depth: both
    prompt: "Equal masses - 10.0 g each - of helium and lead. Which sample has more atoms?"
    answer:
      correctId: a
      options:
        - id: a
          text: Helium, by a huge margin
        - id: b
          text: Lead, because lead is heavier
          why: "Heavier atoms means fewer of them fit in the same mass. Being heavy works against you here."
        - id: c
          text: Equal - same mass means same number of atoms
          why: "Only true if the atoms weigh the same. Same mass means same weight on the balance, not the same count."
    solution:
      - text: "Helium is about 4 g/mol. Lead is about 207 g/mol."
      - text: "Helium: 10.0 / 4.003 = 2.50 mol"
      - text: "Lead: 10.0 / 207.2 = 0.0483 mol"
      - text: "Helium has roughly 50 times more atoms, from the same mass on the balance."
      - text: "This is the whole reason moles exist. Mass tells you how heavy something is; only moles tell you how many things there are."
    source: original
    verified: true
  - id: chem.mole.mole-conversions.i6
    tier: warmup
    type: mcq
    depth: both
    prompt: "You have grams and you want particles. What is the route?"
    answer:
      correctId: c
      options:
        - id: a
          text: Multiply by molar mass, then by Avogadro's number
          why: "Multiplying by molar mass takes you away from moles, not towards them. That direction is moles to grams."
        - id: b
          text: Multiply by Avogadro's number only
          why: "Avogadro's number converts moles to particles. Grams are not moles yet."
        - id: c
          text: Divide by molar mass, then multiply by Avogadro's number
        - id: d
          text: Divide by both
          why: "Dividing by Avogadro's number goes the wrong way - it turns particles into moles, and you already have moles by then."
    solution:
      - text: "Everything goes through moles. Picture it as a hub: grams - moles - particles."
      - text: "Grams to moles: divide by molar mass."
      - text: "Moles to particles: multiply by Avogadro's number."
      - text: "Going the other way, just reverse both operations. If you can remember which direction multiplies, you never need to memorise the four separate cases."
    source: original
    verified: true
---

Every mole problem in the course is the same picture. Three things, with moles
in the middle:

> **grams** <-> **moles** <-> **particles**

- **grams to moles:** divide by molar mass
- **moles to grams:** multiply by molar mass
- **moles to particles:** multiply by Avogadro's number (6.022 x 10^23)
- **particles to moles:** divide by Avogadro's number

There is no direct route from grams to particles. You always pass through
moles. If a problem looks like it needs two steps, it does - and moles is
always the stop in between.

**The cheapest way to check yourself is to watch the units cancel.** Write them
down and treat them like numbers:

> 1.50 mol x 44.009 g/mol = 66.0 g

The `mol` on top cancels the `mol` on the bottom and leaves `g`, which is what
you wanted. If you had divided instead, you would have ended up with mol²/g -
not a real unit, and an instant signal that you flipped the operation. Doing
this habitually catches almost every multiply-instead-of-divide mistake before
it reaches your answer. The proper name for this trick is **dimensional
analysis**.
