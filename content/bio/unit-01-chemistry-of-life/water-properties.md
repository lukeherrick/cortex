---
id: bio.col.water-properties
unit: bio.unit-01
subject: bio
title: Properties of Water
depth: both
ced:
  - SYI-1.A
prereqs: []
items:
  - id: bio.col.water-properties.i1
    tier: warmup
    type: recall
    depth: both
    prompt: "Why is a water molecule polar? Answer without looking."
    answer:
      model: "Oxygen is far more electronegative than hydrogen, so it pulls the shared electrons toward itself. That gives oxygen a partial negative charge and each hydrogen a partial positive charge. The molecule is bent rather than linear, so those charges do not cancel and the molecule has an overall dipole."
      rubric:
        - "Mentions unequal sharing of electrons / electronegativity difference"
        - "Identifies partial negative on O and partial positive on H"
        - "Notes the bent shape prevents the dipoles cancelling"
    solution:
      - text: "Start with the bond: O and H share electrons, but not equally."
      - text: "Oxygen's higher electronegativity pulls electron density toward it."
      - text: "That creates partial charges: delta-minus on O, delta-plus on each H."
      - text: "Shape matters. Water is bent at about 104.5 degrees, so the two bond dipoles add rather than cancel. A linear molecule with the same bonds would be non-polar."
    source: original
    verified: true
  - id: bio.col.water-properties.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "Sweating cools you down primarily because of which property of water?"
    answer:
      correctId: b
      options:
        - id: a
          text: High surface tension
          why: "Surface tension explains insects walking on water, not cooling."
        - id: b
          text: High heat of vaporisation
        - id: c
          text: Lower density as a solid
          why: "That explains why ice floats, which is unrelated to evaporative cooling."
        - id: d
          text: Its role as a universal solvent
          why: "Dissolving power does not remove heat from your skin."
    solution:
      - text: "Evaporation means breaking the hydrogen bonds holding liquid water together."
      - text: "Breaking those bonds takes a large amount of energy - water's heat of vaporisation is unusually high."
      - text: "That energy is taken from your skin, so your skin cools."
    source: original
    verified: true
  - id: bio.col.water-properties.i3
    tier: challenge
    type: frq
    depth: both
    prompt: "Explain how hydrogen bonding accounts for both cohesion and adhesion, and describe how the two together move water up a tall tree."
    answer:
      model: "Cohesion is water hydrogen-bonding to other water molecules; adhesion is water hydrogen-bonding to the polar walls of the xylem. Transpiration from leaf stomata pulls water molecules out of the top of the column. Because the molecules are cohesively linked, that pull is transmitted down the whole column, and adhesion to the xylem walls resists the column slipping back down. The result is bulk water movement upward without the plant expending energy on pumping."
      rubric:
        - "1 point: cohesion defined as water-to-water hydrogen bonding"
        - "1 point: adhesion defined as water-to-xylem-wall hydrogen bonding"
        - "1 point: transpiration identified as the driving force"
        - "1 point: explains the continuous column transmitting tension"
    solution:
      - text: "Both properties come from the same cause: water's partial charges let it hydrogen-bond."
      - text: "Water bonding to water is cohesion. Water bonding to a different polar surface is adhesion."
      - text: "Evaporation at the leaf removes molecules from the top of the water column."
      - text: "Cohesion means removing one molecule tugs the next, so tension is transmitted all the way to the roots."
      - text: "Adhesion to the xylem walls keeps the column from collapsing back down."
      - text: "Net effect: water climbs tens of metres with no pump and no ATP spent on lifting."
    source: original
    verified: true
  - id: bio.col.water-properties.i4
    tier: ap
    type: numeric
    depth: ap
    prompt: "A plant cell has a solute potential of -0.65 MPa and a pressure potential of 0.25 MPa. Calculate its water potential in MPa."
    answer: { value: -0.4, unit: MPa, sigFigs: 2 }
    solution:
      - text: "Water potential is the sum of its two components: psi = psi_s + psi_p."
      - text: "psi = (-0.65) + (0.25)."
      - text: "psi = -0.40 MPa. Keep two sig figs and keep the sign - a negative water potential means water tends to move in."
    source: original
    verified: true
---

Almost everything biology does, it does in water. Before any of the macromolecules
matter, you need to understand why this one small molecule behaves so strangely -
because nearly every "weird" property of living systems traces back to it.

Water is **polar**. Oxygen pulls the shared electrons harder than hydrogen does, so
the oxygen end carries a partial negative charge and each hydrogen end carries a
partial positive charge. The molecule is bent, not straight, so those partial
charges do not cancel out.

Polarity lets water molecules stick to each other through **hydrogen bonds**. Each
bond is individually weak, but there are enormous numbers of them, and that
collective stickiness is where the useful properties come from:

- **Cohesion** - water sticks to water. This is what lets a column of water in a
  tree be pulled from the top without snapping.
- **Adhesion** - water sticks to other polar surfaces, such as the inside of a
  xylem vessel.
- **High specific heat** - raising water's temperature means overcoming all those
  hydrogen bonds first, so water resists temperature change. Organisms made mostly
  of water are thermally stable.
- **High heat of vaporisation** - evaporating water takes a lot of energy, which is
  why sweating cools you.
- **Ice floats** - hydrogen bonds lock into an open lattice when water freezes, so
  solid water is less dense than liquid. Lakes freeze top-down, and life survives
  underneath.
- **Solvent for polar and charged substances** - water surrounds ions and polar
  molecules and pulls them apart. Things that cannot be dissolved this way are
  called hydrophobic, and that exclusion is what drives membranes to form.

Keep the causal chain straight, because exam questions test it directly:
electronegativity difference causes polarity, polarity causes hydrogen bonding,
hydrogen bonding causes everything in the list above.
