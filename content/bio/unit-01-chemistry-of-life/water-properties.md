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
    type: mcq
    depth: both
    prompt: "Oxygen and hydrogen share electrons in a water molecule - but they don't share them fairly. Who hogs them?"
    answer:
      correctId: b
      options:
        - id: a
          text: Hydrogen, because there are two of them
          why: "Numbers don't win this one. Pulling power does, and each hydrogen has very little."
        - id: b
          text: Oxygen, because it pulls harder
        - id: c
          text: Neither - they split them evenly
          why: "If they split evenly, water would be non-polar, and basically none of biology would work."
    solution:
      - text: "Oxygen pulls much harder on shared electrons than hydrogen does. The word for that pulling power is electronegativity."
      - text: "So the electrons spend more time near the oxygen."
      - text: "Oxygen ends up slightly negative, each hydrogen slightly positive. A molecule with a lopsided charge like this is called polar."
    source: original
    verified: true
  - id: bio.col.water-properties.i2
    tier: warmup
    type: mcq
    depth: both
    prompt: "Water is bent, like a wide V, instead of straight. If you could magically straighten it out, what would happen?"
    answer:
      correctId: c
      options:
        - id: a
          text: Nothing - the charges are already there
          why: "The charges are there, but direction matters. Two equal pulls in opposite directions cancel out."
        - id: b
          text: It would pull even harder
          why: "Straightening doesn't change how hard oxygen pulls - only which way the pulls point."
        - id: c
          text: It would stop being polar
        - id: d
          text: The hydrogens would fall off
          why: "The bonds hold fine. Shape is about angle, not strength."
    solution:
      - text: "Each O-H bond has its own little pull in one direction."
      - text: "Because water is bent, those two pulls point roughly the same way, so they add up and one side of the molecule ends up negative."
      - text: "Straighten it and the two pulls point exactly opposite each other, so they cancel. Carbon dioxide works exactly like this - polar bonds, non-polar molecule."
      - text: "Lesson: lopsided bonds aren't enough. You need a lopsided shape too."
    source: original
    verified: true
  - id: bio.col.water-properties.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "You finish a run drenched in sweat and a breeze hits you. You go cold fast. Which property of water is doing that to you?"
    answer:
      correctId: b
      options:
        - id: a
          text: Water sticks to itself (surface tension)
          why: "That's why bugs can stand on a pond. It doesn't pull heat out of you."
        - id: b
          text: It takes a lot of energy to turn water into vapour (high heat of vaporisation)
        - id: c
          text: Ice is less dense than liquid water
          why: "True, and it's why lakes freeze from the top down - but nothing to do with sweating."
        - id: d
          text: Water dissolves almost everything
          why: "Dissolving things doesn't move heat off your skin."
    solution:
      - text: "To escape as vapour, a water molecule has to break free of all the neighbours gripping it."
      - text: "Breaking those grips costs a lot of energy. Water needs unusually much - that's its heat of vaporisation."
      - text: "That energy gets taken from the nearest warm thing available, which is you."
      - text: "You are literally paying for evaporation with your own body heat. That's the whole mechanism of sweating."
    source: original
    verified: true
  - id: bio.col.water-properties.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "A pond freezes in winter. The fish at the bottom survive. Why doesn't the pond freeze solid from the bottom up?"
    answer:
      correctId: a
      options:
        - id: a
          text: Ice is less dense than liquid water, so it floats and forms a lid
        - id: b
          text: Fish body heat keeps the bottom warm
          why: "Fish are about the temperature of the water around them. They're not heating the pond."
        - id: c
          text: Salt in the water stops it freezing
          why: "A freshwater pond has very little dissolved salt, and this happens in pure water too."
        - id: d
          text: Water at the bottom is under pressure, so it can't freeze
          why: "Pond-depth pressure is nowhere near enough to matter here."
    solution:
      - text: "Almost every substance gets denser when it turns solid. Water is a famous exception."
      - text: "When water freezes, the molecules lock into a rigid open cage with gaps in it. All that empty space makes ice lighter than the liquid."
      - text: "So ice floats, forming a layer on top that insulates the water underneath."
      - text: "If ice sank, ponds would freeze solid from the bottom and nothing in them would survive a winter. A lot of freshwater life depends on this one oddity."
    source: original
    verified: true
  - id: bio.col.water-properties.i5
    tier: standard
    type: mcq
    depth: both
    prompt: "Oil and water refuse to mix. What's actually going on?"
    answer:
      correctId: c
      options:
        - id: a
          text: Oil is lighter, so it just floats away
          why: "Oil is less dense, but that's why it sits on top - not why it won't dissolve."
        - id: b
          text: Oil molecules push water away
          why: "There's no pushing. Oil is simply not something water can grab onto."
        - id: c
          text: Oil has no charged ends, so water has nothing to grip, and water would rather stick to water
        - id: d
          text: Oil molecules are too big
          why: "Plenty of big molecules dissolve fine - sugar is big and dissolves easily. Charge matters, size doesn't."
    solution:
      - text: "Water dissolves things by surrounding them and holding on with its charged ends."
      - text: "Oil molecules have no charged ends, so there's nothing for water to hold."
      - text: "Water molecules get a much better deal sticking to each other, so they close ranks and squeeze the oil out. Substances that get squeezed out like this are called hydrophobic, which literally means water-fearing."
      - text: "This squeezing-out is not a minor detail. It is the reason cell membranes form at all."
    source: original
    verified: true
  - id: bio.col.water-properties.i6
    tier: warmup
    type: recall
    depth: both
    prompt: "No peeking. Why is a water molecule polar? Say it in your own words."
    answer:
      model: "Oxygen pulls on the shared electrons much harder than hydrogen does, so the electrons sit closer to the oxygen. That leaves oxygen slightly negative and each hydrogen slightly positive. Water is also bent, not straight, so those two pulls point the same general way instead of cancelling - which is what gives the whole molecule a negative side and a positive side."
      rubric:
        - "Says oxygen pulls the shared electrons harder than hydrogen (electronegativity)"
        - "Says oxygen ends up slightly negative and the hydrogens slightly positive"
        - "Says the bent shape stops the two pulls cancelling out"
    solution:
      - text: "Step one: the bond. Oxygen and hydrogen share electrons unevenly, because oxygen pulls harder (electronegativity)."
      - text: "Step two: the charges. Electrons sit closer to oxygen, so oxygen goes slightly negative and each hydrogen slightly positive. These are partial charges - not full ions, just a lean."
      - text: "Step three: the shape. Water is bent at about 104.5 degrees, so the two pulls roughly add together instead of cancelling."
      - text: "All three steps are needed. Miss the shape and you've only explained half of it."
    source: original
    verified: true
  - id: bio.col.water-properties.i7
    tier: challenge
    type: frq
    depth: both
    prompt: "A redwood lifts water over 100 metres with no pump and no muscle. Explain how water sticking to water and water sticking to the tube walls team up to pull it off."
    answer:
      model: "Water sticking to water is cohesion; water sticking to the tube walls is adhesion. Both come from water's charged ends letting it form weak links called hydrogen bonds. Water evaporates out of pores in the leaves (transpiration), which removes molecules from the top of the water column. Because every molecule is linked to the next, pulling one up tugs the whole chain behind it, all the way to the roots. Meanwhile adhesion to the walls of the xylem tubes stops the column sliding back down. So the tree spends no energy lifting - evaporation at the top does the pulling."
      rubric:
        - "1 point: cohesion described as water sticking to water"
        - "1 point: adhesion described as water sticking to the tube walls"
        - "1 point: evaporation from the leaves (transpiration) named as the driving force"
        - "1 point: explains that the unbroken chain passes the pull down the column"
    solution:
      - text: "Both kinds of sticking come from the same place: water's charged ends let it form weak links to other things. Each link is called a hydrogen bond."
      - text: "Water sticking to water is cohesion. Water sticking to something else polar, like the inside of a tube, is adhesion."
      - text: "Water evaporates out of tiny pores in the leaves. That's transpiration, and it yanks molecules off the top of the column."
      - text: "Because the molecules are all linked, removing one tugs the next, which tugs the next - the pull travels down the whole column to the roots."
      - text: "Adhesion to the tube walls keeps the column from slipping back down while all this is happening."
      - text: "Net result: a 100-metre lift, powered entirely by water leaving the leaves. The tree burns no energy on the lifting itself."
    source: original
    verified: true
  - id: bio.col.water-properties.i8
    tier: ap
    type: numeric
    depth: both
    prompt: "A plant cell has a solute potential of -0.65 MPa and a pressure potential of 0.25 MPa. What is its water potential, in MPa?"
    answer: { value: -0.4, unit: MPa, sigFigs: 2 }
    solution:
      - text: "Water potential is just the two parts added together. In symbols, the Greek letter psi: psi = psi_s + psi_p."
      - text: "psi = (-0.65) + (0.25)"
      - text: "psi = -0.40 MPa"
      - text: "Keep the minus sign - it is the whole point. Water moves from higher water potential to lower, so a more negative cell pulls water in."
      - text: "Two significant figures in, two out: write 0.40, not 0.4."
    source: original
    verified: true
---

Almost everything life does, it does in water. So before any of the big
molecules matter, you need to know why this one small molecule is so strange -
because nearly every odd thing about living systems traces back to it.

**Water is lopsided (polar).** Oxygen pulls harder on the shared electrons
than hydrogen does. That pulling power is called **electronegativity**. The
result: the oxygen side sits slightly negative, each hydrogen slightly
positive. And because water is bent rather than straight, those two pulls don't
cancel - the whole molecule ends up with a negative end and a positive end.

Being lopsided lets water molecules stick to each other with weak links called
**hydrogen bonds**. One link is feeble. There are an absurd number of them.
That collective stickiness is where everything below comes from:

- **Water sticks to water (cohesion).** A column of water can be pulled from
  the top without snapping - which is how trees drink.
- **Water sticks to other things (adhesion).** Including the inside of the
  narrow tubes in a plant.
- **Water resists changing temperature (high specific heat).** You have to
  break a lot of links before it will warm up. Organisms made mostly of water
  stay thermally steady.
- **Evaporating water costs a lot of energy (high heat of vaporisation).**
  Which is exactly why sweating works.
- **Ice floats.** Freezing locks water into an open cage full of gaps, so solid
  water is lighter than liquid. Ponds freeze top-down and life carries on
  underneath.
- **Water dissolves anything with charge.** It surrounds charged and lopsided
  things and pulls them apart. Things with no charge get squeezed out instead -
  those are **hydrophobic** (water-fearing), and that squeezing-out is what
  makes cell membranes assemble.

Hold onto the chain of causes, because exams test it directly:

> unequal pull (electronegativity) → lopsided molecule (polar) → weak links
> (hydrogen bonding) → every property above
