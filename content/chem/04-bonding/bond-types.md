---
id: chem.bonding.bond-types
unit: chem.u-bonding
subject: chem
title: Ionic, Covalent and Metallic Bonding
depth: both
ced:
  - SAP-3.1
prereqs:
  - chem.periodic.trends
  - chem.atomic.ions
items:
  - id: chem.bonding.bond-types.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "Sodium and chlorine form an ionic bond; two chlorine atoms form a covalent bond. What decides which happens?"
    answer:
      correctId: c
      options:
        - id: a
          text: Whether the atoms are the same size
          why: "Size affects how the solid packs, not the bond type. Sodium and chlorine differ a lot in size; two chlorines do not - but that is not the deciding factor."
        - id: b
          text: Whether one atom is a gas
          why: "State has nothing to do with it. Chlorine is a gas in both examples."
        - id: c
          text: The difference in electronegativity - a large gap means electrons get taken outright, a small gap means genuine sharing
        - id: d
          text: The number of electrons each atom has
          why: "Potassium and chlorine have very different electron counts and bond ionically; so do caesium and fluorine. It is the electronegativity GAP that matters."
    solution:
      - text: "Electronegativity is how hard an atom pulls on shared electrons. Compare the two atoms' values and look at the gap."
      - text: "Sodium is 0.93, chlorine is 3.16. A gap of 2.23 - chlorine wins decisively and simply takes the electron."
      - text: "Taking it outright leaves Na+ and Cl-, which then stick together by electrical attraction. That is an ionic bond."
      - text: "Two chlorines are both 3.16. A gap of zero - neither can win, so they share. That is a covalent bond."
      - text: "Rough guide: a gap above about 1.7 behaves ionically, below that covalently. But it is a sliding scale, not a wall - there is no moment where sharing suddenly becomes taking."
    source: original
    verified: true
  - id: chem.bonding.bond-types.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "How many valence electrons must be accounted for in a Lewis structure of CO2? Carbon has 4 and each oxygen has 6."
    answer: { value: 16, unit: null, sigFigs: null }
    solution:
      - text: "Add up the valence electrons of every atom in the molecule. That total is fixed - drawing a structure only rearranges them."
      - text: "Carbon: 1 x 4 = 4"
      - text: "Oxygen: 2 x 6 = 12"
      - text: "Total: 4 + 12 = 16 valence electrons, which is 8 pairs."
      - text: "Those 16 must ALL appear in your drawing, as bonds or lone pairs. CO2 works out as two double bonds plus two lone pairs on each oxygen: 8 electrons in bonds plus 8 in lone pairs = 16."
      - text: "Counting the total first is the habit that makes Lewis structures reliable. Draw first and count later and you will quietly lose or invent electrons."
    source: original
    verified: true
  - id: chem.bonding.bond-types.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "Why does solid table salt not conduct electricity, while salt water does?"
    answer:
      correctId: b
      options:
        - id: a
          text: Solid salt has no charged particles
          why: "It is built entirely from Na+ and Cl- ions. The charges are there - they just cannot move."
        - id: b
          text: Conducting needs charges that can MOVE; in the solid the ions are locked in a lattice, and dissolving frees them
        - id: c
          text: Water conducts electricity and the salt is irrelevant
          why: "Pure water conducts very poorly. It is the dissolved ions doing the conducting."
        - id: d
          text: Dissolving converts the ions into electrons
          why: "The ions stay ions. They simply become mobile."
    solution:
      - text: "Electrical conduction means charge physically moving from one place to another."
      - text: "Solid salt is full of charges - a rigid lattice of alternating Na+ and Cl-."
      - text: "But each ion is locked in place by its neighbours pulling from every direction. Charge present, charge immobile, no conduction."
      - text: "Dissolve it and water surrounds each ion and pulls it away from the lattice. Now the ions can drift."
      - text: "Mobile charges means conduction. Melting the salt works too, for the same reason."
      - text: "This is a standard way to identify an ionic compound in the lab: does not conduct as a solid, conducts well when molten or dissolved."
    source: original
    verified: true
  - id: chem.bonding.bond-types.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "Ionic compounds have high melting points but shatter when hit. How can something be strongly bonded and brittle at once?"
    answer:
      correctId: a
      options:
        - id: a
          text: The bonds are strong, but a sharp knock slides the layers so like charges meet and repel, splitting the crystal
        - id: b
          text: The bonds are actually weak, and the high melting point comes from something else
          why: "The bonds are genuinely strong - that is precisely why the melting point is high."
        - id: c
          text: Ionic compounds are not really brittle
          why: "Drop a salt crystal and it shatters. Brittleness is real and characteristic."
        - id: d
          text: Hitting it adds enough energy to break bonds
          why: "A tap does not supply anywhere near melting-point energy. The mechanism is geometric, not energetic."
    solution:
      - text: "In an ionic lattice every ion is surrounded by opposite charges in all directions, held by many strong attractions at once."
      - text: "Melting means overcoming all of them simultaneously, which takes a lot of heat. Hence 801 degrees Celsius for NaCl."
      - text: "Now hit it. A sharp impact shifts one plane of ions by one position."
      - text: "Suddenly Na+ is sitting next to Na+ and Cl- next to Cl-. Like charges, massive repulsion, and the crystal splits along that plane."
      - text: "So the same feature causes both properties: the strict alternating arrangement gives strength when intact and catastrophic failure when displaced."
      - text: "Contrast with a metal, where the electrons are shared loosely and delocalised. Shift a plane of a metal and nothing is misaligned - which is exactly why metals bend instead of shattering."
    source: original
    verified: true
  - id: chem.bonding.bond-types.i5
    tier: challenge
    type: mcq
    depth: both
    prompt: "Metals conduct electricity, conduct heat, bend rather than shatter, and are shiny. What single feature of metallic bonding explains all four?"
    answer:
      correctId: d
      options:
        - id: a
          text: Metals have very strong covalent bonds
          why: "Metallic bonding is not covalent. Strong directional bonds would make metals brittle, which they are not."
        - id: b
          text: Metal atoms are unusually heavy
          why: "Lithium and aluminium are light and behave as metals. Mass is not the mechanism."
        - id: c
          text: Metals are ionic compounds of themselves
          why: "There is no negative ion. Metallic bonding is positive cores in a shared electron sea - a different thing entirely."
        - id: d
          text: The outer electrons are delocalised - shared across the whole structure rather than tied to any atom
    solution:
      - text: "Picture a metal as positive ion cores sitting in a sea of electrons that belong to the whole structure rather than to any one atom. Those electrons are delocalised."
      - text: "Conducts electricity: the electrons are already free to move. Apply a voltage and they drift."
      - text: "Conducts heat: those same mobile electrons carry kinetic energy quickly from hot regions to cold."
      - text: "Bends instead of shattering: the bonding is not directional. Slide one plane of ion cores past another and the electron sea just flows around them - nothing is misaligned, so nothing splits."
      - text: "Shiny: free electrons across the surface absorb and immediately re-emit light across all visible wavelengths."
      - text: "Four properties, one cause. This is the kind of question worth recognising - it is testing whether you can run one idea in four directions."
    source: original
    verified: true
  - id: chem.bonding.bond-types.i6
    tier: standard
    type: mcq
    depth: both
    prompt: "HCl is a covalent molecule, but the electrons are not shared equally. What is it called, and what is the consequence?"
    answer:
      correctId: b
      options:
        - id: a
          text: Ionic, because the sharing is unequal
          why: "Unequal is not the same as taken. The electrons are still shared; the gap of 0.96 is well below ionic territory."
        - id: b
          text: Polar covalent - shared but lopsided, giving the molecule a partially negative and a partially positive end
        - id: c
          text: Metallic, because chlorine pulls harder
          why: "Metallic bonding needs delocalised electrons across many atoms. HCl is a two-atom molecule."
        - id: d
          text: Non-polar covalent, since both atoms are non-metals
          why: "Both being non-metals makes it covalent, but non-polar requires the electronegativities to be roughly EQUAL. H is 2.20 and Cl is 3.16."
    solution:
      - text: "Hydrogen is 2.20 and chlorine is 3.16, so the gap is 0.96 - too small for outright transfer, too big for fair sharing."
      - text: "The electrons spend more time near the chlorine. So chlorine goes slightly negative and hydrogen slightly positive."
      - text: "Those are partial charges, written delta-minus and delta-plus. Not full ions - just a lean."
      - text: "A molecule with a positive end and a negative end like this is polar."
      - text: "This should feel familiar - it is exactly the water story. Unequal pull gives partial charges, and partial charges are why water dissolves things and why hydrogen bonds exist."
      - text: "So bond type is a spectrum: non-polar covalent (gap near 0), polar covalent (small gap), ionic (large gap). Not three boxes but one sliding scale."
    source: original
    verified: true
  - id: chem.bonding.bond-types.i7
    tier: challenge
    type: mcq
    depth: both
    prompt: "CO2 has two polar C=O bonds, yet the molecule as a whole is non-polar. Water has two polar O-H bonds and IS polar. What is the difference?"
    answer:
      correctId: c
      options:
        - id: a
          text: CO2's bonds are not really polar
          why: "Carbon is 2.55 and oxygen 3.44 - a gap of 0.89. Those bonds are definitely polar."
        - id: b
          text: Water has more atoms
          why: "Both are three atoms. The count is identical."
        - id: c
          text: CO2 is linear so its two bond pulls point exactly opposite and cancel; water is bent so they do not
        - id: d
          text: CO2 is a gas and gases cannot be polar
          why: "HCl is a polar gas. State is irrelevant."
    solution:
      - text: "Each polar bond has a pull with a direction. To get the molecule's overall polarity you have to add those pulls as directions, not just count them."
      - text: "CO2 is linear - O=C=O in a straight line. One oxygen pulls left, the other pulls right, equally."
      - text: "Equal and opposite means they cancel exactly. The molecule has no overall positive or negative end. Non-polar."
      - text: "Water is bent at about 104.5 degrees. Both O-H pulls point generally the same way, upward toward the oxygen."
      - text: "So they add rather than cancel, leaving a clear negative end at the oxygen. Polar."
      - text: "The rule worth carrying: polar bonds are necessary but not sufficient. You need a shape that stops them cancelling. Shape decides molecular polarity."
    source: original
    verified: true
  - id: chem.bonding.bond-types.i8
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: the three bond types, what happens to the electrons in each, and one property each produces."
    answer:
      model: "In an ionic bond, one atom takes electrons from the other outright, because the electronegativity gap is large. That leaves positive and negative ions that attract in a rigid lattice, giving high melting points and conduction only when molten or dissolved. In a covalent bond, two non-metals share electrons because neither can win, and if the sharing is unequal the bond is polar covalent. Covalent substances are often gases, liquids or low-melting solids because the molecules themselves attract each other only weakly. In metallic bonding, the outer electrons are delocalised across the whole structure, which makes metals conduct electricity and heat, bend rather than shatter, and appear shiny."
      rubric:
        - "Ionic: electrons transferred, lattice of ions, high melting point or conduction when molten"
        - "Covalent: electrons shared between non-metals"
        - "Mentions polar covalent for unequal sharing"
        - "Metallic: delocalised electrons across the structure"
        - "Gives a property arising from metallic delocalisation"
    solution:
      - text: "Ionic - electrons taken outright. Large electronegativity gap, typically metal plus non-metal. Gives a rigid lattice of ions: high melting point, brittle, conducts only when molten or dissolved."
      - text: "Covalent - electrons shared. Small gap, typically two non-metals. Equal sharing is non-polar; unequal sharing is polar covalent."
      - text: "Covalent substances melt low because the bonds WITHIN a molecule are strong but the attractions BETWEEN molecules are weak, and melting only has to overcome the latter."
      - text: "Metallic - electrons delocalised across the whole structure, around positive ion cores. Metal plus metal."
      - text: "That delocalisation gives everything metals are known for: electrical conduction, heat conduction, malleability, shine."
      - text: "Underneath all three is the same question - who gets the electrons? Taken, shared, or pooled."
    source: original
    verified: true
---

Every bond is an answer to one question: **who gets the electrons?**

The answer is decided by the **electronegativity gap** between the two atoms.

| Gap | Electrons are | Bond |
|---|---|---|
| Large (> ~1.7) | **Taken** | **Ionic** |
| Small | **Shared unequally** | **Polar covalent** |
| Near zero | **Shared evenly** | **Non-polar covalent** |
| Metal + metal | **Pooled** | **Metallic** |

> It is a **sliding scale, not three boxes.** There is no moment where sharing
> suddenly becomes taking — the 1.7 figure is a rough guide, nothing more.

### Ionic — taken

Big gap, so one atom wins outright. Na (0.93) vs Cl (3.16) is a gap of 2.23;
chlorine simply takes the electron. You are left with Na⁺ and Cl⁻ attracting
each other in a rigid **lattice**.

**High melting point** (NaCl melts at 801 °C) because every ion is held by many
strong attractions at once.

**Brittle**, for the *same* reason. A sharp knock slides one plane of ions by
one position — suddenly Na⁺ sits beside Na⁺, like charges repel violently, and
the crystal splits. Strength when intact, catastrophic failure when displaced.

**Conducts only when molten or dissolved.** Solid salt is *full* of charges,
but they are locked in place, and conduction needs charges that can **move**.
This is a standard lab test for an ionic compound.

### Covalent — shared

Neither atom can win, so they share. Both non-metals.

If the sharing is **unequal**, the bond is **polar covalent**: HCl has a gap of
0.96, so chlorine goes slightly negative and hydrogen slightly positive. Those
**partial charges** are exactly the water story again — and why hydrogen bonds
exist at all.

Covalent substances usually melt low. The bonds *inside* each molecule are
strong, but the attractions *between* molecules are weak, and melting only has
to overcome the weak ones.

### Metallic — pooled

Positive ion cores in a **sea of delocalised electrons** that belong to the
whole structure rather than to any atom.

One feature, four famous properties:

- **Conducts electricity** — the electrons are already free to move
- **Conducts heat** — those same electrons carry energy fast
- **Bends rather than shatters** — the bonding has no direction, so sliding a
  plane of cores leaves nothing misaligned
- **Shiny** — free surface electrons absorb and re-emit visible light

That malleability contrast with ionic brittleness is worth holding onto: it is
the *same* displacement that destroys a salt crystal and does nothing at all to
a copper wire.

### Polar bonds ≠ polar molecule

**CO₂** has two genuinely polar C=O bonds and is **non-polar overall.**

It is **linear**, so the two pulls point exactly opposite and **cancel**.

**Water** has two polar O–H bonds and *is* polar, because it is **bent** at
about 104.5° — the two pulls point roughly the same way and **add**.

> Polar bonds are **necessary but not sufficient**. You need a shape that stops
> them cancelling. **Shape decides molecular polarity.**

### Drawing Lewis structures: count first

Add up every atom's valence electrons **before** you draw anything. CO₂: 4 +
(2 × 6) = **16**. All 16 must appear in the final picture as bonds or lone
pairs.

Counting first is the habit that makes these reliable. Draw first and count
afterwards and you will quietly lose or invent electrons.
