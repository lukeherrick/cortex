---
id: chem.nomenclature.molecular
unit: chem.u-nomenclature
subject: chem
title: Naming Molecular Compounds and Acids
depth: both
ced:
  - SPQ-2.3
prereqs:
  - chem.nomenclature.ionic
items:
  - id: chem.nomenclature.molecular.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "CO is carbon monoxide and CO2 is carbon dioxide. Why do these names use prefixes when ionic names never do?"
    answer:
      correctId: c
      options:
        - id: a
          text: Because carbon is a non-metal
          why: "Both atoms being non-metals is what makes it molecular, but it does not by itself explain why prefixes are needed."
        - id: b
          text: Because carbon can form several charges
          why: "Charges are an ionic idea. In a molecular compound nothing is transferred, so there are no charges to specify."
        - id: c
          text: Because two non-metals can combine in several different ratios, so the name must state which one
        - id: d
          text: Because the prefixes show the charges
          why: "Prefixes count atoms. There are no ionic charges in a molecular compound at all."
    solution:
      - text: "In an ionic compound the charges force exactly one neutral ratio. Sodium and chlorine can only ever give NaCl."
      - text: "Two non-metals share electrons instead, and sharing is flexible. Carbon and oxygen give both CO and CO2 - and nitrogen and oxygen give NO, NO2, N2O, N2O4 and more."
      - text: "So the name has to say how many of each, or it is ambiguous."
      - text: "Hence prefixes: mono, di, tri, tetra, penta, hexa."
      - text: "And they matter enormously here. Carbon dioxide is what you exhale; carbon monoxide kills you. One prefix apart."
    source: original
    verified: true
  - id: chem.nomenclature.molecular.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "What is N2O4 called?"
    answer:
      correctId: b
      options:
        - id: a
          text: Nitrogen oxide
          why: "That gives no ratio at all, and several nitrogen oxides exist. Molecular names need prefixes."
        - id: b
          text: Dinitrogen tetroxide
        - id: c
          text: Nitrogen(IV) oxide
          why: "Roman numerals are for metals with variable charge in ionic compounds. Molecular compounds use prefixes instead."
        - id: d
          text: Dinitrogen quadroxide
          why: "The prefix for four is tetra-, not quad-. These prefixes are Greek."
    solution:
      - text: "Two nitrogens: the prefix for two is di-, giving dinitrogen."
      - text: "Four oxygens: the prefix for four is tetra-, and the ending changes to -ide, giving tetraoxide."
      - text: "In practice the a is dropped where it would collide with the o: tetroxide rather than tetraoxide. Same for monoxide rather than monooxide."
      - text: "Full name: dinitrogen tetroxide."
      - text: "Note that the first element DOES get its prefix here, because there are two nitrogens. Mono- is the only prefix dropped on the first element."
    source: original
    verified: true
  - id: chem.nomenclature.molecular.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "How many atoms in total are in one molecule of phosphorus pentachloride?"
    answer: { value: 6, unit: null, sigFigs: null }
    solution:
      - text: "Read the name backwards into a formula. Phosphorus has no prefix, so mono- is implied: one phosphorus."
      - text: "Penta- means five, so five chlorines."
      - text: "Formula: PCl5."
      - text: "Total atoms: 1 + 5 = 6."
      - text: "The missing prefix on the first element is the one piece of asymmetry in this system - mono- is dropped there but kept on the second element. Carbon monoxide, not monocarbon monoxide."
    source: original
    verified: true
  - id: chem.nomenclature.molecular.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "How do you tell, from a formula alone, whether to use prefixes or Roman numerals?"
    answer:
      correctId: a
      options:
        - id: a
          text: Look at the first element. Metal means ionic, so charges and possibly a Roman numeral. Non-metal means molecular, so prefixes.
        - id: b
          text: Count the atoms - more than three means molecular
          why: "Ca(NO3)2 has nine atoms and is ionic; CO has two and is molecular. Atom count tells you nothing."
        - id: c
          text: If it contains oxygen it is molecular
          why: "Sodium oxide and calcium carbonate both contain oxygen and are firmly ionic."
        - id: d
          text: You cannot tell from the formula and simply have to know
          why: "You can tell reliably, and it is the first thing to check before naming anything."
    solution:
      - text: "Check the first element against the periodic table."
      - text: "Metal first means the compound is ionic. Electrons were transferred, so think charges - and add a Roman numeral if that metal has more than one."
      - text: "Non-metal first means molecular. Electrons are shared, there are no charges, so use prefixes to state the ratio."
      - text: "FeCl3 starts with iron, a metal, so it is iron(III) chloride. PCl3 starts with phosphorus, a non-metal, so it is phosphorus trichloride."
      - text: "Same shape of formula, completely different naming system, decided entirely by that first element."
      - text: "One exception to watch: a compound starting with H and dissolved in water is named as an acid, which is its own system."
    source: original
    verified: true
  - id: chem.nomenclature.molecular.i5
    tier: standard
    type: mcq
    depth: both
    prompt: "HCl dissolved in water is called hydrochloric acid. What is the pattern for acids made of just hydrogen and one other element?"
    answer:
      correctId: c
      options:
        - id: a
          text: hydrogen + element + -ic acid
          why: "The word hydrogen is compressed to the prefix hydro-. Hydrogen chloric acid is not how it is said."
        - id: b
          text: hydro- + element + -ous acid
          why: "The -ous ending belongs to the oxyacid system, for acids containing oxygen."
        - id: c
          text: hydro- + element root + -ic acid
        - id: d
          text: Just the element name plus acid
          why: "Chloric acid is a real but DIFFERENT substance, HClO3. The hydro- prefix distinguishes them."
    solution:
      - text: "For a binary acid - hydrogen plus one other element - the pattern is hydro- then the element root then -ic acid."
      - text: "HCl: hydro + chlor + ic = hydrochloric acid."
      - text: "HBr: hydrobromic acid. H2S: hydrosulfuric acid."
      - text: "The hydro- prefix is doing real work. Chloric acid without it is HClO3, a genuinely different compound."
      - text: "Undissolved, HCl is a gas and is called hydrogen chloride. The acid name applies to the water solution. Same formula, two names, depending on what it is dissolved in."
    source: original
    verified: true
  - id: chem.nomenclature.molecular.i6
    tier: challenge
    type: mcq
    depth: both
    prompt: "H2SO4 is sulfuric acid and H2SO3 is sulfurous acid. Where do those endings come from?"
    answer:
      correctId: b
      options:
        - id: a
          text: From the number of hydrogens
          why: "Both have two hydrogens. The difference is in the oxygen count, carried by the polyatomic ion."
        - id: b
          text: From the polyatomic ion inside - an -ate ion gives -ic acid, an -ite ion gives -ous acid
        - id: c
          text: They are arbitrary historical names
          why: "The pattern is completely systematic and predictable from the anion."
        - id: d
          text: From whether the acid is strong or weak
          why: "Strength is a separate property. Nitrous acid is weak and nitric is strong, but the names come from nitrite and nitrate."
    solution:
      - text: "Identify the polyatomic ion hiding in the formula after removing the hydrogens."
      - text: "H2SO4 contains sulfate, SO4 2-. The -ate ion gives an -IC acid: sulfuric."
      - text: "H2SO3 contains sulfite, SO3 2-. The -ite ion gives an -OUS acid: sulfurous."
      - text: "A hook for it: -ate becomes -ic, -ite becomes -ous. 'I ate it, it was icky' is daft and it sticks."
      - text: "Same pattern throughout. Nitrate HNO3 is nitric acid; nitrite HNO2 is nitrous acid. Phosphate H3PO4 is phosphoric acid."
      - text: "So you get the acid name free once you know the polyatomic ions. One list, two naming systems."
    source: original
    verified: true
  - id: chem.nomenclature.molecular.i7
    tier: challenge
    type: mcq
    depth: both
    prompt: "Which of these is named incorrectly?"
    answer:
      correctId: d
      options:
        - id: a
          text: "SO3 - sulfur trioxide"
          why: "Correct. Non-metal first means molecular, so prefixes: one sulfur (mono dropped), three oxygens."
        - id: b
          text: "Na2S - sodium sulfide"
          why: "Correct. Metal first means ionic, no prefixes, and sodium has only one charge so no numeral is needed."
        - id: c
          text: "PbO2 - lead(IV) oxide"
          why: "Correct. Lead can be 2+ or 4+, and two oxides give -4, so this lead must be +4."
        - id: d
          text: "CaCl2 - calcium dichloride"
    solution:
      - text: "CaCl2 starts with calcium, a metal, so this is an ionic compound and prefixes are wrong."
      - text: "The correct name is calcium chloride."
      - text: "No prefix is needed because the charges force the ratio: Ca2+ requires exactly two Cl- to balance. There is no other possibility to confuse it with."
      - text: "And no Roman numeral either, since calcium only forms Ca2+."
      - text: "This is the single most common naming error - importing prefixes into ionic names. Check the first element before you choose a system."
    source: original
    verified: true
  - id: chem.nomenclature.molecular.i8
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: the three naming systems, and how you decide which one a formula needs."
    answer:
      model: "Look at the first element. If it is a metal, the compound is ionic: name the metal, add a Roman numeral if it can form more than one charge, then the non-metal with an -ide ending or the polyatomic ion's own name, and never use prefixes. If the first element is a non-metal, the compound is molecular: use Greek prefixes to give the number of each atom, dropping mono- only on the first element, and end the second element in -ide. If the compound starts with hydrogen and is dissolved in water it is named as an acid: hydro- plus the element root plus -ic for a binary acid, or for an oxyacid, an -ate ion gives -ic acid and an -ite ion gives -ous acid."
      rubric:
        - "Decision is made on whether the first element is a metal or a non-metal"
        - "Ionic: no prefixes, Roman numeral only when needed"
        - "Molecular: Greek prefixes, mono dropped on the first element only"
        - "Binary acids: hydro- plus root plus -ic"
        - "Oxyacids: -ate gives -ic, -ite gives -ous"
    solution:
      - text: "The whole decision rests on the first element."
      - text: "Metal first means IONIC. Metal name, Roman numeral only if that metal has more than one charge, then -ide or the polyatomic name. No prefixes ever."
      - text: "Non-metal first means MOLECULAR. Greek prefixes for both elements, with mono- dropped on the first one only, and -ide on the second."
      - text: "Hydrogen first, dissolved in water, means ACID."
      - text: "Binary acid, no oxygen: hydro + root + ic. HCl is hydrochloric acid."
      - text: "Oxyacid, contains oxygen: look at the polyatomic ion. -ate gives -ic (sulfate to sulfuric), -ite gives -ous (sulfite to sulfurous)."
      - text: "Get the first-element check right and you will almost never pick the wrong system. Getting it wrong is what produces answers like 'calcium dichloride'."
    source: original
    verified: true
---

There are **three** naming systems, and the whole trick is knowing which one a
formula needs. **Look at the first element.**

| First element | System | Tool |
|---|---|---|
| **Metal** | Ionic | Charges; Roman numeral if needed; **no prefixes** |
| **Non-metal** | Molecular | **Greek prefixes** |
| **Hydrogen** (in water) | Acid | hydro- / -ic / -ous |

Get that check right and you will almost never pick the wrong system. Getting
it wrong is what produces answers like *"calcium dichloride"* — the single most
common naming error there is.

### Molecular compounds: prefixes, because the ratio is genuinely ambiguous

Two non-metals **share** electrons, and sharing is flexible. Carbon and oxygen
give **CO and CO₂**. Nitrogen and oxygen give NO, NO₂, N₂O, N₂O₄ and more.

So unlike ionic compounds — where the charges force exactly one ratio — the
name *has* to state how many.

| Number | Prefix |
|---|---|
| 1 | mono- |
| 2 | di- |
| 3 | tri- |
| 4 | tetra- |
| 5 | penta- |
| 6 | hexa- |

> CO → carbon **mon**oxide
> N₂O₄ → **di**nitrogen **tetr**oxide
> PCl₅ → phosphorus **penta**chloride

**Two rules on the prefixes:**

- **mono- is dropped on the first element only.** Carbon monoxide, not
  monocarbon monoxide.
- The trailing `a` or `o` is dropped before another `o`: mon**oxide**,
  tetr**oxide**.

And these prefixes do real work. **Carbon dioxide is what you exhale; carbon
monoxide kills you.** One prefix apart.

### Acids

**Binary acids** — hydrogen plus one other element, no oxygen:

> **hydro-** + element root + **-ic acid**
> HCl → hydro**chlor**ic acid · HBr → hydrobromic acid

The `hydro-` is not decoration. **Chloric acid** without it is HClO₃ — a
different substance entirely.

> Undissolved, HCl is a gas called **hydrogen chloride**. The acid name belongs
> to the water solution.

**Oxyacids** — containing oxygen. Look at the **polyatomic ion** inside:

| Ion ends in | Acid ends in | Example |
|---|---|---|
| **-ate** | **-ic** | sulfate → sulfur**ic** acid (H₂SO₄) |
| **-ite** | **-ous** | sulfite → sulfur**ous** acid (H₂SO₃) |

> *"I **ate** it, it was **ic**ky."* Daft, and it sticks.

Same pattern throughout: nitrate → nitric, nitrite → nitrous, phosphate →
phosphoric. **So the polyatomic ion list you already learned gives you the acid
names for free.** One list, two systems.
