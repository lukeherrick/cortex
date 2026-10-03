---
id: chem.measure.density
unit: chem.u-measurement
subject: chem
title: Density
depth: both
ced:
  - SPQ-1.3
prereqs:
  - chem.measure.dimensional-analysis
items:
  - id: chem.measure.density.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "A metal block has a mass of 54.0 g and a volume of 20.0 cm^3. What is its density?"
    answer:
      value: 2.7
      unit: g/cm^3
      acceptedUnits: ["g/mL", "g cm^-3", "g/cm3"]
      sigFigs: 3
    solution:
      - text: "Density is mass divided by volume. Nothing more to it."
      - text: "54.0 g / 20.0 cm^3 = 2.70 g/cm^3"
      - text: "Three significant figures in both measurements, so three out: 2.70."
      - text: "Keep that trailing zero. 2.7 claims two figures; 2.70 claims three, which is what you actually measured."
      - text: "For reference, 2.70 g/cm^3 is aluminium almost exactly. Density is a fingerprint - it is how you identify an unknown metal from a balance and a measuring cylinder."
    source: original
    verified: true
  - id: chem.measure.density.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "Ethanol has a density of 0.789 g/mL. What volume does 100.0 g of it occupy?"
    answer: { value: 126.7, unit: mL, acceptedUnits: ["cm^3", "cm3"], sigFigs: 4 }
    solution:
      - text: "Rearrange: volume = mass / density."
      - text: "100.0 g / 0.789 g/mL = 126.7 mL"
      - text: "Watch the units cancel and you never need to remember the rearrangement: g / (g/mL) = g x (mL/g) = mL. The grams cancel and millilitres survive."
      - text: "Significant figures: 100.0 has four, 0.789 has three. Fewest wins, so strictly this is 127 mL to three figures - but 126.7 is accepted here since the measurements are given to differing precision."
      - text: "Sanity check: ethanol is lighter than water, so 100 g of it should take up MORE than 100 mL. It does - about 127. If you had got 79 mL, you divided the wrong way round."
    source: original
    verified: true
  - id: chem.measure.density.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "A solid lump is dropped into water and sinks. What does that tell you?"
    answer:
      correctId: c
      options:
        - id: a
          text: It is heavier than the water
          why: "Heavier is not the test - a whole bathtub of water outweighs a marble, and the marble still sinks. What matters is mass per unit volume."
        - id: b
          text: It is bigger than the water it displaced
          why: "A submerged object displaces exactly its own volume. Size is not the deciding factor."
        - id: c
          text: Its density is greater than water's - more mass packed into the same volume
        - id: d
          text: It is made of metal
          why: "Plenty of non-metals sink and some metals float. Lithium floats on water; a glass marble does not."
    solution:
      - text: "Floating and sinking is a contest between densities, never between masses."
      - text: "Water is 1.00 g/mL. Anything denser than that sinks; anything less dense floats."
      - text: "Size does not enter it. A steel pin sinks and a steel ship floats, because the ship is mostly air - its average density is less than water's."
      - text: "This is also why ice floats, which is biologically enormous: ice is about 0.92 g/mL, so lakes freeze from the top down and life survives underneath."
    source: original
    verified: true
  - id: chem.measure.density.i4
    tier: challenge
    type: numeric
    depth: both
    prompt: "A 25.0 mL sample of an unknown liquid has a mass of 31.6 g. Mercury is 13.6 g/mL, water is 1.00 g/mL, ethanol is 0.789 g/mL and glycerol is 1.26 g/mL. Calculate the density and you will know which it is."
    answer:
      value: 1.264
      unit: g/mL
      acceptedUnits: ["g/cm^3", "g cm^-3", "g/cm3"]
      sigFigs: 3
      tolerance: 0.005
    solution:
      - text: "Density = mass / volume = 31.6 g / 25.0 mL"
      - text: "= 1.264, which to three significant figures is 1.26 g/mL."
      - text: "Compare with the list: glycerol is 1.26 g/mL. That is the match."
      - text: "Mercury would have given about 340 g for this volume, water about 25 g, ethanol about 20 g. Only glycerol fits."
      - text: "This is a real lab technique. Density is an intensive property - it does not depend on how much you have - so measuring it on any sample identifies the substance."
    source: original
    verified: true
  - id: chem.measure.density.i5
    tier: challenge
    type: numeric
    depth: both
    prompt: "A rectangular aluminium bar measures 2.00 cm by 3.00 cm by 10.0 cm. Aluminium's density is 2.70 g/cm^3. What is its mass?"
    answer: { value: 162, unit: g, sigFigs: 3 }
    solution:
      - text: "Two steps: get the volume, then use the density."
      - text: "Volume = 2.00 x 3.00 x 10.0 = 60.0 cm^3"
      - text: "Mass = density x volume = 2.70 g/cm^3 x 60.0 cm^3 = 162 g"
      - text: "Units cancel as they should: (g/cm^3) x cm^3 leaves g."
      - text: "Three significant figures throughout, so 162 g."
      - text: "Rearranging density three ways is unnecessary if you watch the units. Put what you have next to the conversion that kills its unit, and the right operation falls out."
    source: original
    verified: true
  - id: chem.measure.density.i6
    tier: standard
    type: mcq
    depth: both
    prompt: "You cut a block of copper exactly in half. What happens to its mass, volume and density?"
    answer:
      correctId: b
      options:
        - id: a
          text: All three halve
          why: "Mass and volume halve, but density is a ratio of the two - halving both leaves the ratio alone."
        - id: b
          text: Mass and volume halve; density is unchanged
        - id: c
          text: Mass halves, volume and density stay the same
          why: "Half a block takes up half the space. The volume cannot stay the same."
        - id: d
          text: Density doubles because the metal is more concentrated
          why: "Cutting does not compress anything. The copper is packed exactly as tightly as before."
    solution:
      - text: "Mass halves - obviously, there is half as much copper."
      - text: "Volume halves - it takes up half the space."
      - text: "Density is mass over volume, so halving both leaves it identical. Copper is 8.96 g/cm^3 whether you have a shaving or a statue."
      - text: "Properties that depend on how much you have are called extensive - mass, volume, length."
      - text: "Properties that do not are called intensive - density, temperature, colour, melting point."
      - text: "This distinction is why density can identify a substance and mass cannot. Only intensive properties are fingerprints."
    source: original
    verified: true
---

**Density is mass divided by volume** - how much stuff is packed into a given
space.

> density = mass / volume

Usually **g/cm³** for solids and **g/mL** for liquids, and those are the same
unit, because 1 mL is exactly 1 cm³.

### You never need to memorise the rearrangements

People draw triangles for this. You do not need one - just watch the units, the
same habit as any other conversion:

> 100.0 g ÷ (0.789 g/mL) = 100.0 g x (1 mL / 0.789 g) = **126.7 mL**

The grams cancel and millilitres survive. If you had multiplied instead, you
would be holding g²/mL, which is not a thing - and you would know immediately.

### Floating is a contest of densities, not masses

Water is **1.00 g/mL**. Denser than that sinks, less dense floats. **Mass has
nothing to do with it** - a steel pin sinks and a steel ship floats, because
the ship is mostly air and its *average* density is below water's.

Worth knowing:

| Substance | Density (g/mL) |
|---|---|
| Ethanol | 0.789 |
| Ice | 0.92 |
| Water | 1.00 |
| Glycerol | 1.26 |
| Aluminium | 2.70 |
| Iron | 7.87 |
| Copper | 8.96 |
| Lead | 11.3 |
| Mercury | 13.6 |

Ice at 0.92 is the odd one out and the most consequential: almost everything
else is **denser** as a solid. Water being lighter as a solid is why lakes
freeze top-down and anything living in them survives the winter.

### Intensive vs extensive - the actual exam point

Cut a block of copper in half. Mass halves. Volume halves. **Density does not
change at all**, because it is a ratio of the two.

- **Extensive** properties depend on how much you have: mass, volume, length.
- **Intensive** properties do not: density, temperature, melting point, colour.

This is exactly why **density identifies a substance and mass cannot**. Copper
is 8.96 g/cm³ whether you have a shaving or a statue, so a balance and a
measuring cylinder are enough to tell you what an unknown metal is. Only
intensive properties work as fingerprints.
