---
id: chem.reactions.balancing
unit: chem.u-reactions
subject: chem
title: Balancing Equations
depth: both
ced:
  - SPQ-3.1
prereqs:
  - chem.nomenclature.ionic
items:
  - id: chem.reactions.balancing.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "Balance CH4 + O2 -> CO2 + H2O. What coefficient goes in front of O2?"
    answer: { value: 2, unit: null, sigFigs: null }
    solution:
      - text: "Carbon is already fine: one on each side."
      - text: "Hydrogen: four on the left in CH4, two on the right in H2O. Put a 2 in front of H2O to make four."
      - text: "Now count oxygen on the right: 2 in CO2 plus 2 in 2 H2O = 4 total."
      - text: "The left has O2, so you need 2 of them to supply 4 oxygen atoms."
      - text: "Balanced: CH4 + 2 O2 -> CO2 + 2 H2O"
      - text: "Standard tactic: leave oxygen until last. It usually appears in more compounds than anything else, so fixing it first means re-fixing it repeatedly."
    source: original
    verified: true
  - id: chem.reactions.balancing.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "A student balances H2 + O2 -> H2O by changing it to H2 + O2 -> H2O2. What is wrong with that?"
    answer:
      correctId: c
      options:
        - id: a
          text: Nothing - the atoms balance now
          why: "The atoms do balance, which is exactly what makes this such a dangerous mistake. The problem is that it is no longer the same reaction."
        - id: b
          text: H2O2 does not exist
          why: "It does - hydrogen peroxide. That is precisely the problem: they have written a real but completely different substance."
        - id: c
          text: Changing a subscript changes the substance. H2O2 is hydrogen peroxide, not water.
        - id: d
          text: Coefficients and subscripts are interchangeable
          why: "They are emphatically not. A coefficient says how many molecules; a subscript says what the molecule IS."
    solution:
      - text: "A subscript is part of the substance's identity. A coefficient just counts how many of them you have."
      - text: "H2O is water. H2O2 is hydrogen peroxide - used to bleach hair and disinfect wounds, and definitely not drinkable."
      - text: "So changing the subscript did not balance the equation. It replaced the reaction with a different one."
      - text: "You may ONLY change coefficients - the big numbers in front."
      - text: "Correct answer: 2 H2 + O2 -> 2 H2O"
      - text: "This is the one rule that matters most in balancing, because the wrong version still 'works' numerically. The atoms add up, and the chemistry is nonsense."
    source: original
    verified: true
  - id: chem.reactions.balancing.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "Balance C3H8 + O2 -> CO2 + H2O. What coefficient goes in front of O2?"
    answer: { value: 5, unit: null, sigFigs: null }
    solution:
      - text: "Carbon first: 3 on the left, so 3 CO2 on the right."
      - text: "Hydrogen next: 8 on the left, and water carries 2 each, so 4 H2O."
      - text: "Now oxygen on the right: 3 x 2 = 6 in the CO2, plus 4 x 1 = 4 in the water. Total 10."
      - text: "The left has O2, so you need 5 of them to supply 10 oxygen atoms."
      - text: "Balanced: C3H8 + 5 O2 -> 3 CO2 + 4 H2O"
      - text: "This is propane burning - barbecue gas. The order carbon, then hydrogen, then oxygen works for every hydrocarbon combustion, so it is worth making automatic."
    source: original
    verified: true
  - id: chem.reactions.balancing.i4
    tier: standard
    type: numeric
    depth: both
    prompt: "Balance Fe + O2 -> Fe2O3. What coefficient goes in front of Fe?"
    answer: { value: 4, unit: null, sigFigs: null }
    solution:
      - text: "Start with iron: Fe2O3 has 2, so you need at least 2 Fe on the left."
      - text: "Try 2 Fe + O2 -> Fe2O3. Oxygen: 2 on the left, 3 on the right. Not balanced, and 3 is odd while O2 only comes in pairs."
      - text: "Fix the parity by doubling the product: 2 Fe2O3 needs 6 oxygen atoms, which is 3 O2."
      - text: "2 Fe2O3 also needs 4 Fe on the left."
      - text: "Balanced: 4 Fe + 3 O2 -> 2 Fe2O3"
      - text: "The general move: when an odd number of oxygens collides with O2 coming only in pairs, double everything. It happens constantly."
      - text: "This reaction is rusting, written out. Slow in air, spectacular in pure oxygen."
    source: original
    verified: true
  - id: chem.reactions.balancing.i5
    tier: challenge
    type: numeric
    depth: both
    prompt: "Balance Al + HCl -> AlCl3 + H2. What coefficient goes in front of HCl?"
    answer: { value: 6, unit: null, sigFigs: null }
    solution:
      - text: "Look for the awkward element first. Hydrogen appears as HCl on the left and H2 on the right, so it must come out even."
      - text: "Chlorine: AlCl3 needs 3 chlorines, but 3 HCl would give 3 hydrogens - an odd number, which H2 cannot supply."
      - text: "So double it. Take 2 AlCl3, needing 6 chlorines, so 6 HCl."
      - text: "6 HCl gives 6 hydrogens, which is 3 H2. Even, so that works."
      - text: "2 AlCl3 needs 2 Al on the left."
      - text: "Balanced: 2 Al + 6 HCl -> 2 AlCl3 + 3 H2"
      - text: "Check every element. Al: 2 and 2. H: 6 and 6. Cl: 6 and 6. Good."
      - text: "Always verify by counting each element at the end. It takes fifteen seconds and catches nearly every balancing error."
    source: original
    verified: true
  - id: chem.reactions.balancing.i6
    tier: standard
    type: mcq
    depth: both
    prompt: "Why must every equation balance in the first place?"
    answer:
      correctId: a
      options:
        - id: a
          text: Atoms are not created or destroyed in a chemical reaction - they are only rearranged
        - id: b
          text: Because chemists agreed on it as a convention
          why: "It is not a convention. It reflects a physical law, which is why it cannot be waived."
        - id: c
          text: To make the arithmetic easier later
          why: "It does make stoichiometry possible, but that is a consequence rather than the reason."
        - id: d
          text: Because mass can change but atom count cannot
          why: "Both are conserved. The mass is conserved precisely BECAUSE the atoms are."
    solution:
      - text: "A chemical reaction breaks and remakes bonds. It never touches the nuclei."
      - text: "So every atom you started with is still there at the end, just attached to something different."
      - text: "That is the law of conservation of mass, and a balanced equation is simply that law written down."
      - text: "It is also why only coefficients may change. Changing a subscript would mean inventing or destroying atoms within a molecule - rewriting what the substance is."
      - text: "And it is what makes all of stoichiometry possible. Without a balanced equation there is no ratio to work with, and no way to predict how much product you get."
    source: original
    verified: true
  - id: chem.reactions.balancing.i7
    tier: challenge
    type: numeric
    depth: both
    prompt: "Balance Ca(OH)2 + H3PO4 -> Ca3(PO4)2 + H2O. What coefficient goes in front of H2O?"
    answer: { value: 6, unit: null, sigFigs: null }
    solution:
      - text: "Treat each polyatomic ion as one unit where it survives intact. That saves enormous effort."
      - text: "Phosphate: Ca3(PO4)2 needs 2, so you need 2 H3PO4."
      - text: "Calcium: Ca3(PO4)2 needs 3, so you need 3 Ca(OH)2."
      - text: "Now count hydrogen on the left: 3 Ca(OH)2 gives 6 H, and 2 H3PO4 gives 6 H. Total 12."
      - text: "12 hydrogens on the right, at 2 per water, means 6 H2O."
      - text: "Balanced: 3 Ca(OH)2 + 2 H3PO4 -> Ca3(PO4)2 + 6 H2O"
      - text: "Check oxygen as a final test: left is 6 from the hydroxides plus 8 from the phosphoric acid = 14. Right is 8 in the phosphate plus 6 in the water = 14. Balanced."
      - text: "Treating phosphate as a single block turned a frightening equation into two easy steps. Do this whenever a polyatomic ion appears unchanged on both sides."
    source: original
    verified: true
  - id: chem.reactions.balancing.i8
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: the method for balancing an equation, and the one thing you are never allowed to change."
    answer:
      model: "You may only change coefficients, the numbers in front of each formula. Subscripts are part of the substance's identity and changing one replaces the reaction with a different one. The method is to work through the elements in a sensible order, usually balancing any element that appears in only one compound on each side first, treating polyatomic ions that survive intact as single units, and leaving oxygen and hydrogen until last because they tend to appear in several compounds. If an odd count collides with a diatomic molecule like O2, double everything to fix the parity. Finish by counting every element on both sides to check."
      rubric:
        - "Only coefficients may change, never subscripts"
        - "Explains that a subscript change alters the substance"
        - "Balance elements appearing in fewest compounds first, leaving O and H late"
        - "Treat intact polyatomic ions as single units"
        - "Double everything to resolve odd-versus-diatomic parity, and check at the end"
    solution:
      - text: "The absolute rule: change only the COEFFICIENTS - the big numbers in front. Never a subscript."
      - text: "Changing H2O to H2O2 does not balance anything; it swaps water for hydrogen peroxide."
      - text: "Method: start with an element that appears in only one compound on each side. It has the fewest knock-on effects."
      - text: "Treat a polyatomic ion that appears unchanged on both sides as a single block. Phosphate stays phosphate."
      - text: "Save oxygen and hydrogen for last - they usually appear in the most places, so fixing them early means fixing them repeatedly."
      - text: "If you end up needing an odd number of oxygens from O2, double everything. Diatomic molecules only come in pairs."
      - text: "Finally, count every element on both sides. Fifteen seconds, and it catches nearly every mistake."
    source: original
    verified: true
---

A chemical reaction **rearranges atoms**. It never creates or destroys them —
nuclei are untouched. So every atom you start with is still there at the end,
attached to something different.

A balanced equation is simply **conservation of mass written down**.

### The one rule that matters

> **You may only change coefficients — the big numbers in front. Never a
> subscript.**

This is worth dwelling on, because the wrong version *looks like it works*:

> H₂ + O₂ → **H₂O₂** ❌

The atoms balance perfectly. And it's nonsense — **H₂O₂ is hydrogen peroxide**,
which bleaches hair and disinfects wounds. The student didn't balance the
equation; they replaced water with a different substance.

A **subscript** is part of *what the substance is*. A **coefficient** just
counts *how many*. Correct answer: **2 H₂ + O₂ → 2 H₂O**

### A method that works

1. **Start with an element in only one compound on each side.** Fewest
   knock-on effects.
2. **Treat intact polyatomic ions as single blocks.** If phosphate appears as
   PO₄ on both sides, balance "phosphate" as one unit — don't break it into P
   and O.
3. **Leave oxygen and hydrogen for last.** They turn up in the most compounds,
   so fixing them early means fixing them again and again.
4. **Odd number colliding with a diatomic? Double everything.** O₂ only comes
   in pairs, so if you need 3 oxygens, double the lot and need 6.
5. **Count every element on both sides at the end.** Fifteen seconds, catches
   almost every error.

### Worked: hydrocarbon combustion

The order **carbon → hydrogen → oxygen** works every time:

> C₃H₈ + O₂ → CO₂ + H₂O

- Carbon: 3 on the left → **3 CO₂**
- Hydrogen: 8 on the left, 2 per water → **4 H₂O**
- Oxygen on the right: (3×2) + (4×1) = **10** → **5 O₂**

> **C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O**

That's propane — barbecue gas. Make this sequence automatic; combustion
questions are everywhere.

### Worked: the parity problem

> Fe + O₂ → Fe₂O₃

Fe₂O₃ needs **3** oxygens, and O₂ supplies them **two at a time**. Three is
odd, so it cannot work. **Double the product:**

> **4 Fe + 3 O₂ → 2 Fe₂O₃**

Two Fe₂O₃ need 6 oxygens = 3 O₂, and 4 Fe on the left. That's rusting — slow in
air, spectacular in pure oxygen.

### Why this unit comes before stoichiometry

Everything in stoichiometry runs on the **mole ratio**, and the mole ratio
*is* the coefficients of a balanced equation. **No balanced equation, no ratio,
no stoichiometry.** This is the step that makes the rest of the course possible.
