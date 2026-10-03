---
id: chem.nomenclature.ionic
unit: chem.u-nomenclature
subject: chem
title: Naming Ionic Compounds
depth: both
ced:
  - SPQ-2.3
prereqs:
  - chem.atomic.ions
items:
  - id: chem.nomenclature.ionic.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "What is NaCl called, and what is the rule behind the name?"
    answer:
      correctId: b
      options:
        - id: a
          text: Chlorine sodide - the non-metal goes first
          why: "The metal always goes first in an ionic name, and it keeps its own name unchanged."
        - id: b
          text: Sodium chloride - metal first keeping its name, then the non-metal ending in -ide
        - id: c
          text: Sodium chlorine - both keep their names
          why: "The non-metal must change its ending to -ide. Chlorine becomes chloride."
        - id: d
          text: Monosodium monochloride - prefixes show one of each
          why: "Prefixes are for molecular compounds. Ionic names never use them, because the charges already fix the ratio."
    solution:
      - text: "Positive ion first, and it keeps its element name exactly: sodium."
      - text: "Negative ion second, with its ending swapped to -ide: chlorine becomes chloride."
      - text: "So: sodium chloride."
      - text: "No prefixes, ever, in ionic names. You do not need them - the charges already determine the only possible ratio."
      - text: "More -ide endings worth knowing: oxide, sulfide, nitride, phosphide, bromide, iodide, fluoride."
    source: original
    verified: true
  - id: chem.nomenclature.ionic.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "Aluminium forms Al3+ and oxygen forms O2-. In the formula for aluminium oxide, how many oxygen atoms are there per formula unit?"
    answer: { value: 3, unit: null, sigFigs: null }
    solution:
      - text: "A compound must come out electrically neutral overall, so the positives and negatives have to balance exactly."
      - text: "Al3+ carries +3 and O2- carries -2. You need a combination summing to zero."
      - text: "The lowest common multiple of 3 and 2 is 6. So you need +6 and -6."
      - text: "+6 takes two Al3+. -6 takes three O2-."
      - text: "Formula: Al2O3. Three oxygens."
      - text: "The quick version is to swap the charge numbers into the subscripts - Al3+ and O2- gives Al2O3. Just remember to simplify afterwards if both numbers share a factor."
    source: original
    verified: true
  - id: chem.nomenclature.ionic.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "FeCl3 is iron(III) chloride, but NaCl is just sodium chloride. Why does iron get a Roman numeral and sodium does not?"
    answer:
      correctId: c
      options:
        - id: a
          text: Iron is a transition metal and they all get numerals as a formality
          why: "Zinc and silver are transition metals and do not normally take numerals, because they each form only one common charge."
        - id: b
          text: Because iron has three chlorines attached
          why: "The numeral gives the charge on the metal, not the number of anions. They happen to match here, which is a coincidence of this compound."
        - id: c
          text: Iron can form more than one charge, so the numeral says which one this is
        - id: d
          text: Sodium is in group 1, and group 1 never needs naming precisely
          why: "Right conclusion for the wrong reason. It is not about the group number but about having only one possible charge."
    solution:
      - text: "Sodium only ever forms Na+. Saying sodium chloride is already unambiguous."
      - text: "Iron forms both Fe2+ and Fe3+, which make genuinely different compounds with different colours and reactions."
      - text: "So the name has to say which: iron(II) chloride is FeCl2, iron(III) chloride is FeCl3."
      - text: "The Roman numeral is the CHARGE ON THE METAL, not a count of anything."
      - text: "To find it, work backwards from the anions. Three chlorides give -3, so the single iron must be +3. Hence iron(III)."
      - text: "Metals needing numerals: iron, copper, lead, tin, chromium, manganese, cobalt. Ones that do not: group 1, group 2, aluminium, zinc, silver."
    source: original
    verified: true
  - id: chem.nomenclature.ionic.i4
    tier: standard
    type: numeric
    depth: both
    prompt: "Calcium nitrate is Ca(NO3)2. How many oxygen atoms are in one formula unit?"
    answer: { value: 6, unit: null, sigFigs: null }
    solution:
      - text: "The brackets group the whole nitrate ion, NO3-, and the 2 outside multiplies everything inside it."
      - text: "So there are two nitrate ions, each with three oxygens."
      - text: "2 x 3 = 6 oxygen atoms."
      - text: "Why brackets at all: nitrate is a single unit that travels together and carries one charge of -1. Writing CaN2O6 would hide that completely."
      - text: "This is the same trap as in molar mass. A subscript outside a bracket multiplies every atom inside, with no exceptions."
    source: original
    verified: true
  - id: chem.nomenclature.ionic.i5
    tier: standard
    type: mcq
    depth: both
    prompt: "Sulfate is SO4 2- and sulfite is SO3 2-. What does the -ate versus -ite ending tell you?"
    answer:
      correctId: a
      options:
        - id: a
          text: -ate has one more oxygen than -ite, with the same charge
        - id: b
          text: -ate is more negatively charged than -ite
          why: "Both are 2-. The charge is identical; only the oxygen count differs."
        - id: c
          text: -ate is a metal ion and -ite is a non-metal ion
          why: "Both are polyatomic anions built from non-metals. Neither is a metal ion."
        - id: d
          text: They are two names for the same ion
          why: "They are genuinely different ions with different formulas and different chemistry."
    solution:
      - text: "Within a matching pair, -ate is the one with MORE oxygen and -ite has one fewer."
      - text: "Sulfate SO4 2- and sulfite SO3 2-. Same charge, one oxygen apart."
      - text: "Nitrate NO3- and nitrite NO2-. Same pattern."
      - text: "A memory hook that works: -ATE has more, and 'ate' is the bigger-sounding word. Or picture eating more."
      - text: "Careful - the ending tells you the oxygen count only RELATIVE to its partner. It does not tell you an absolute number: nitrate has 3 oxygens while sulfate has 4, and both are -ate."
    source: original
    verified: true
  - id: chem.nomenclature.ionic.i6
    tier: challenge
    type: mcq
    depth: both
    prompt: "What is the correct formula for magnesium phosphide, given Mg2+ and P3-?"
    answer:
      correctId: c
      options:
        - id: a
          text: MgP
          why: "That gives +2 and -3, a net charge of -1. A compound must be neutral."
        - id: b
          text: Mg2P3
          why: "Close, but the subscripts are swapped. The charge of one ion becomes the subscript of the OTHER."
        - id: c
          text: Mg3P2
        - id: d
          text: Mg3P3
          why: "That gives +6 and -9, a net of -3. Not neutral."
    solution:
      - text: "Work out what makes it neutral. Lowest common multiple of 2 and 3 is 6, so aim for +6 and -6."
      - text: "+6 needs three Mg2+ ions. -6 needs two P3- ions."
      - text: "Formula: Mg3P2."
      - text: "The shortcut is to criss-cross: the charge on magnesium (2) becomes phosphorus's subscript, and the charge on phosphorus (3) becomes magnesium's subscript. Mg3P2."
      - text: "It is easy to swap them the wrong way, which is why the neutrality check is worth doing: 3 x (+2) = +6 and 2 x (-3) = -6. Sums to zero. Correct."
      - text: "And always simplify. Criss-crossing Mg2+ with O2- would give Mg2O2, which must be reduced to MgO."
    source: original
    verified: true
  - id: chem.nomenclature.ionic.i7
    tier: challenge
    type: mcq
    depth: both
    prompt: "What is CuSO4 called?"
    answer:
      correctId: b
      options:
        - id: a
          text: Copper sulfate
          why: "Incomplete - copper forms both Cu+ and Cu2+, so the name must specify which. You will see this name informally, but it is not correct."
        - id: b
          text: Copper(II) sulfate
        - id: c
          text: Copper(I) sulfate
          why: "That would be Cu2SO4, needing two Cu+ ions to balance the sulfate's -2."
        - id: d
          text: Copper sulfide
          why: "Sulfide is S2- alone. Sulfate is the polyatomic SO4 2-. The -ate ending is doing real work."
    solution:
      - text: "Sulfate carries -2, and there is just one of it, so the negative total is -2."
      - text: "There is one copper, so it must supply +2. That means Cu2+, written copper(II)."
      - text: "Name: copper(II) sulfate. This is the bright blue solid you have almost certainly seen in a lab."
      - text: "Two separate things to get right here. The numeral, because copper has more than one possible charge. And sulfate rather than sulfide, because SO4 2- is a polyatomic ion and S2- is not."
      - text: "Sulfide versus sulfate is a classic trap. Sulfide is one sulfur atom with -2; sulfate is sulfur with four oxygens, also -2."
    source: original
    verified: true
  - id: chem.nomenclature.ionic.i8
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: how do you name an ionic compound, and how do you write its formula from the name?"
    answer:
      model: "To name one, write the metal first keeping its element name, adding a Roman numeral for its charge if that metal can form more than one. Then write the non-metal, changing its ending to -ide, or use the polyatomic ion's own name if it is one. Never use prefixes. To write the formula from a name, find the charge of each ion, then choose the smallest whole numbers that make the total charge zero - which is equivalent to swapping each ion's charge into the other's subscript, then simplifying if the subscripts share a factor. Polyatomic ions take brackets when more than one is needed."
      rubric:
        - "Metal first, keeping its name"
        - "Roman numeral only when the metal has more than one possible charge"
        - "Non-metal ending changes to -ide, or the polyatomic name is used"
        - "No prefixes in ionic names"
        - "Formula found by balancing charges to zero, then simplifying"
    solution:
      - text: "Naming, step one: metal first, name unchanged. Sodium stays sodium."
      - text: "Step two: if that metal can form more than one charge, add a Roman numeral for which one. Iron(III), copper(II)."
      - text: "Step three: non-metal second with an -ide ending - chloride, oxide, nitride. Or, if it is a polyatomic ion, use its own name - sulfate, nitrate, carbonate."
      - text: "Never use prefixes. Ionic ratios are forced by the charges, so there is nothing to disambiguate."
      - text: "Formula from a name: look up both charges, then find the smallest whole numbers making the total zero."
      - text: "The criss-cross shortcut does this for you - each charge becomes the other's subscript - but always simplify afterwards and always check neutrality."
      - text: "Brackets go round a polyatomic ion whenever you need more than one of it: Ca(NO3)2, not CaN2O6."
    source: original
    verified: true
---

Naming is pure convention — but it is **the language every later unit is
written in**. Stoichiometry questions give you names, not formulas.

### Naming: metal, then non-metal with -ide

1. **Metal first**, keeping its element name exactly.
2. **Roman numeral** for its charge *only if* that metal can form more than one.
3. **Non-metal second**, ending changed to **-ide**.
4. **Never use prefixes.**

> NaCl → **sodium chloride**
> MgO → **magnesium oxide**
> FeCl₃ → **iron(III) chloride**

No prefixes, because **the charges already force the ratio.** There is only one
neutral combination, so there is nothing to disambiguate.

### When does the metal need a Roman numeral?

**Only when it has more than one possible charge.** The numeral is the
**charge on the metal** — not a count of anything.

| Needs a numeral | Doesn't |
|---|---|
| Iron, copper, lead, tin, chromium, manganese, cobalt | Group 1, group 2, aluminium, zinc, silver |

To find it, work backwards from the anions. FeCl₃ has three chlorides = −3, so
one iron must be +3 → **iron(III)**.

### Formula from a name: balance the charges to zero

A compound must be **electrically neutral**. Find the smallest whole numbers
that make the charges cancel.

> Mg²⁺ and P³⁻ → LCM of 2 and 3 is 6 → three Mg²⁺ (+6) and two P³⁻ (−6) →
> **Mg₃P₂**

The **criss-cross** shortcut does this: each ion's charge becomes the *other's*
subscript. Al³⁺ and O²⁻ → **Al₂O₃**.

Two warnings:

- **Always simplify.** Mg²⁺ and O²⁻ criss-crosses to Mg₂O₂, which must reduce
  to **MgO**.
- **Always check neutrality afterwards.** It is easy to swap the subscripts the
  wrong way, and a quick 3(+2) + 2(−3) = 0 catches it.

### Polyatomic ions

Groups of atoms that travel together carrying a single charge. They keep their
own names, so **no -ide ending**.

| Ion | Formula | | Ion | Formula |
|---|---|---|---|---|
| Nitrate | NO₃⁻ | | Sulfate | SO₄²⁻ |
| Nitrite | NO₂⁻ | | Sulfite | SO₃²⁻ |
| Carbonate | CO₃²⁻ | | Phosphate | PO₄³⁻ |
| Hydroxide | OH⁻ | | Ammonium | NH₄⁺ |
| Acetate | C₂H₃O₂⁻ | | Bicarbonate | HCO₃⁻ |

**-ate vs -ite:** within a pair, **-ate has one more oxygen**, with the *same*
charge. Sulfate SO₄²⁻, sulfite SO₃²⁻.

> But note: this is only relative *within a pair*. Nitrate has 3 oxygens,
> sulfate has 4, and both are "-ate". The ending never gives an absolute count.

**Brackets** are needed whenever you have more than one polyatomic ion:
**Ca(NO₃)₂**, not CaN₂O₆ — because the second version hides the fact that
nitrate is one unit carrying one charge.

### The trap worth memorising now

**Sulfide vs sulfate.** Sulfide is **S²⁻**, a lone sulfur atom. Sulfate is
**SO₄²⁻**, sulfur with four oxygens. Same charge, utterly different compound,
and one letter apart in the name.
