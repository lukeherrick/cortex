---
id: chem.periodic.trends
unit: chem.u-periodic
subject: chem
title: Periodic Trends
depth: both
ced:
  - SAP-2.2
prereqs:
  - chem.atomic.electron-configuration
items:
  - id: chem.periodic.trends.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "Magnesium has 12 protons and 10 core electrons. Using the simple approximation that core electrons cancel out protons, what effective nuclear charge does a valence electron feel?"
    answer: { value: 2, unit: null, sigFigs: null }
    solution:
      - text: "A valence electron sits outside the core, so the core electrons get in the way of the nucleus's pull. That blocking is called shielding."
      - text: "The rough approximation: each core electron cancels one proton."
      - text: "12 protons - 10 core electrons = 2."
      - text: "So a valence electron in magnesium feels a pull of about +2 rather than the full +12."
      - text: "This one number explains nearly every trend in this topic. Effective nuclear charge is what the outer electrons actually experience, and it is far smaller than the proton count suggests."
    source: original
    verified: true
  - id: chem.periodic.trends.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "Atoms get SMALLER as you go left to right across a period, even though electrons are being added. Why?"
    answer:
      correctId: c
      options:
        - id: a
          text: Electrons are being removed, so there is less to hold
          why: "Electrons are being added, not removed. Atomic number increases across a period."
        - id: b
          text: The new electrons go into inner shells
          why: "Across a period the new electrons go into the SAME outer shell. No new inner shells appear."
        - id: c
          text: Protons are added too, and the new electrons go in the same shell without shielding each other much, so the pull on everything strengthens
        - id: d
          text: The atoms get denser rather than smaller
          why: "Radius genuinely decreases - it is measured. Density is a separate property."
    solution:
      - text: "Going across a period, you add a proton and an electron at each step."
      - text: "The new electrons all go into the SAME outer shell, so no new shielding layer appears."
      - text: "Electrons in the same shell shield each other poorly - they are side by side rather than between the nucleus and each other."
      - text: "So effective nuclear charge climbs steadily while shielding barely changes. The pull on every outer electron gets stronger."
      - text: "Stronger pull means the cloud is drawn in tighter. The atom shrinks."
      - text: "Numbers: sodium is about 186 pm, chlorine about 99 pm. Nearly halved across one row."
    source: original
    verified: true
  - id: chem.periodic.trends.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "Atoms get BIGGER going down a group. Why does that beat the extra protons?"
    answer:
      correctId: a
      options:
        - id: a
          text: Each row down adds a whole new shell further out, and the filled inner shells shield the outer electrons effectively
        - id: b
          text: Protons are removed going down a group
          why: "Protons increase going down. The point is that their extra pull is outweighed."
        - id: c
          text: The nucleus gets weaker with more neutrons
          why: "Neutrons are uncharged and do not affect the pull on electrons at all."
        - id: d
          text: Electrons repel each other more at the bottom of the table
          why: "Repulsion plays a part, but the dominant effect is the new shell being physically much further out."
    solution:
      - text: "Going down a group, each element's outer electrons are in a shell with a higher number - further from the nucleus."
      - text: "And now there are extra complete inner shells sitting in between, shielding very effectively."
      - text: "So although protons increased, the outer electron is both further away and better shielded. Effective nuclear charge barely rises."
      - text: "Distance wins. The atom gets substantially bigger."
      - text: "Lithium is about 152 pm; caesium about 265 pm. The trend is dramatic because adding a shell is a big structural jump, unlike adding one electron to an existing shell."
    source: original
    verified: true
  - id: chem.periodic.trends.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "Put these in order of increasing atomic radius: Na, Mg, K."
    answer:
      correctId: b
      options:
        - id: a
          text: "K < Na < Mg"
          why: "Potassium is in the next period down with an extra shell, so it must be the LARGEST, not the smallest."
        - id: b
          text: "Mg < Na < K"
        - id: c
          text: "Na < Mg < K"
          why: "Magnesium is to the right of sodium in the same period, so it is smaller than sodium, not larger."
        - id: d
          text: "Mg < K < Na"
          why: "Potassium has a whole extra shell. Nothing in period 3 is bigger than potassium."
    solution:
      - text: "Handle the group trend and the period trend separately."
      - text: "Na and Mg are in the same period, with Mg to the right. Right means smaller, so Mg < Na."
      - text: "K is one period BELOW Na, so it has an extra shell. Down means bigger, so Na < K."
      - text: "Chain them: Mg < Na < K."
      - text: "When a question mixes both directions, the group trend usually wins - adding a whole shell is a bigger change than adding one electron to an existing one."
    source: original
    verified: true
  - id: chem.periodic.trends.i5
    tier: standard
    type: mcq
    depth: both
    prompt: "Ionisation energy is the energy needed to pull an electron off. Which way does it trend, and why?"
    answer:
      correctId: d
      options:
        - id: a
          text: Increases down a group, because there are more electrons to choose from
          why: "It DECREASES down a group. The outermost electron is further out and better shielded, so it leaves more easily."
        - id: b
          text: Decreases across a period, because atoms get smaller
          why: "Smaller atoms hold their electrons more tightly, so ionisation energy INCREASES across a period."
        - id: c
          text: It is the same for all elements in a period
          why: "It rises substantially across a period - roughly fivefold from sodium to argon."
        - id: d
          text: Increases across a period and decreases down a group - the opposite of atomic radius
    solution:
      - text: "Think about what makes an electron hard to remove: being close to the nucleus and strongly pulled."
      - text: "Across a period, atoms shrink and effective nuclear charge rises, so the outer electron is held tighter. Harder to remove - ionisation energy increases."
      - text: "Down a group, the outer electron is further out and better shielded. Easier to remove - ionisation energy decreases."
      - text: "So ionisation energy runs opposite to atomic radius. Small atom, high ionisation energy."
      - text: "This is the same reasoning producing both trends, which is why learning effective nuclear charge once gets you all of them."
      - text: "It also explains reactivity. Caesium's outer electron is barely held, which is why caesium metal reacts explosively. Helium's is held ferociously, which is why helium does nothing."
    source: original
    verified: true
  - id: chem.periodic.trends.i6
    tier: challenge
    type: mcq
    depth: both
    prompt: "Sodium's first ionisation energy is 496 kJ/mol. Its second is 4562 kJ/mol - nine times larger. Why the enormous jump?"
    answer:
      correctId: b
      options:
        - id: a
          text: The second electron is further from the nucleus
          why: "It is CLOSER - it comes from the inner shell, which is why it is so hard to remove."
        - id: b
          text: The first electron empties the outer shell, so the second has to come out of a full, tightly held inner shell
        - id: c
          text: The ion is now positive, and that is the whole reason
          why: "The positive charge does make it harder, and there IS a steady rise for that reason - but a ninefold jump needs the shell explanation."
        - id: d
          text: Sodium cannot lose a second electron at all
          why: "It can, with enough energy. It just never happens in ordinary chemistry because the cost is prohibitive."
    solution:
      - text: "Sodium is 1s2 2s2 2p6 3s1 - a single lonely electron in the third shell."
      - text: "Taking that one costs 496 kJ/mol. It is far out, well shielded and barely held."
      - text: "Now the outer shell is empty. Na+ is 1s2 2s2 2p6 - exactly neon's arrangement, full and stable."
      - text: "The next electron has to come out of that full 2p subshell: closer to the nucleus, much less shielded, and breaking up a stable full shell."
      - text: "Hence 4562 kJ/mol. The jump is not gradual - it is a cliff."
      - text: "This is powerful evidence that shells are real. Ionisation energies rise steadily within a shell and then leap when you break into the next one, which is exactly how shell structure was worked out experimentally."
    source: original
    verified: true
  - id: chem.periodic.trends.i7
    tier: standard
    type: mcq
    depth: both
    prompt: "Which of these is the most electronegative, and what does that mean?"
    answer:
      correctId: c
      options:
        - id: a
          text: Sodium - it gives electrons away most readily
          why: "Giving electrons away readily is the OPPOSITE of electronegative. Sodium is among the least electronegative."
        - id: b
          text: Carbon - it forms the most bonds
          why: "Number of bonds is unrelated. Carbon is middling in electronegativity, which is part of why it bonds so flexibly."
        - id: c
          text: Fluorine - it pulls hardest on shared electrons in a bond
        - id: d
          text: Helium - it holds its own electrons most tightly
          why: "Helium holds its own electrons tightly, but electronegativity is about pulling on SHARED electrons in a bond - and helium does not form bonds. Noble gases are usually left off the scale."
    solution:
      - text: "Electronegativity is how hard an atom pulls on electrons it is SHARING with another atom."
      - text: "It follows the same logic as the other trends: increases across a period, decreases down a group."
      - text: "So the top right of the table wins. Fluorine is the most electronegative element at 3.98."
      - text: "Noble gases are generally left off the scale because they do not form bonds, so there is nothing to pull on."
      - text: "Worth having roughly in mind: F 3.98, O 3.44, N 3.04, C 2.55, H 2.20, Na 0.93."
      - text: "This is the number that decides bond type. A big gap between two atoms means the electrons get taken outright - ionic. A small gap means genuine sharing - covalent."
    source: original
    verified: true
  - id: chem.periodic.trends.i8
    tier: challenge
    type: mcq
    depth: both
    prompt: "Noble gases sit at the far right with the highest ionisation energies in their periods. What single fact explains both that and their refusal to react?"
    answer:
      correctId: a
      options:
        - id: a
          text: Their outer shell is completely full, which is a low-energy arrangement with nothing to gain by changing
        - id: b
          text: They have no electrons available
          why: "Argon has 18 electrons. They have plenty - they simply have no reason to trade any."
        - id: c
          text: They are gases, and gases do not react
          why: "Oxygen, chlorine and fluorine are gases and extremely reactive. State has nothing to do with it."
        - id: d
          text: Their nuclei are unusually large
          why: "Helium has the smallest nucleus of any element except hydrogen and is the least reactive of all."
    solution:
      - text: "A noble gas has a completely full outer shell - 2 for helium, 8 for the rest."
      - text: "That arrangement is low in energy, which means stable, which means there is no incentive to change it."
      - text: "Losing an electron would break up the full shell, so ionisation energy is at its maximum."
      - text: "Gaining one would start a whole new shell far out where the pull is weak, so there is no appetite for that either."
      - text: "No reason to gain, no reason to lose, nothing to share: no reactions."
      - text: "And notice this is the same fact that explains every ion charge in the previous topic. Everything else on the table is trying to reach the arrangement noble gases already have."
    source: original
    verified: true
  - id: chem.periodic.trends.i9
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: atomic radius, ionisation energy and electronegativity - which way does each trend, and what one idea explains all three?"
    answer:
      model: "Atomic radius decreases across a period and increases down a group. Ionisation energy and electronegativity both do the opposite: they increase across a period and decrease down a group. All three follow from effective nuclear charge - how much nuclear pull an outer electron actually feels. Across a period, protons are added while the new electrons go into the same shell and shield each other poorly, so effective nuclear charge rises, the atom contracts, and its electrons are held more tightly. Down a group, each new outer shell is further out and shielded by complete inner shells, so effective nuclear charge barely rises, the atom grows, and its outer electrons are held more loosely."
      rubric:
        - "Radius: decreases across, increases down"
        - "Ionisation energy: increases across, decreases down"
        - "Electronegativity: increases across, decreases down"
        - "Identifies effective nuclear charge as the single explanation"
        - "Explains poor same-shell shielding across a period and strong shielding down a group"
    solution:
      - text: "Radius: decreases left-to-right, increases top-to-bottom."
      - text: "Ionisation energy: increases left-to-right, decreases top-to-bottom."
      - text: "Electronegativity: same as ionisation energy - increases left-to-right, decreases top-to-bottom."
      - text: "So radius runs one way and the other two run the other. Memorising three trends is unnecessary once you see that."
      - text: "The one idea is effective nuclear charge: the pull an outer electron actually feels after the core electrons have blocked some of it."
      - text: "Across a period: protons up, new electrons in the same shell shielding poorly, so the pull rises. Tighter, smaller, harder to remove, pulls harder on shared electrons."
      - text: "Down a group: new shell further out, shielded by full inner shells, so the pull hardly rises. Looser, bigger, easier to remove, pulls less on shared electrons."
    source: original
    verified: true
---

There are three trends in this topic and **one idea underneath all of them**.
Learn the idea and you can derive the trends instead of memorising them.

### Effective nuclear charge

An outer electron does not feel the full pull of all the protons. The **core
electrons get in the way** — that blocking is called **shielding**. What is
left over is the **effective nuclear charge**.

A rough-and-ready version: each core electron cancels one proton.

> Magnesium: 12 protons − 10 core electrons ≈ **+2**

So magnesium's valence electrons feel about +2, not +12. Everything below
follows from how this number changes.

### Across a period →

You add a proton **and** an electron at each step — but the new electrons go
into the **same shell**, where they shield each other poorly (side by side, not
in between).

So **effective nuclear charge climbs** while shielding barely changes:

- Atoms get **smaller** (Na 186 pm → Cl 99 pm, nearly halved)
- Electrons are held **tighter** → ionisation energy **rises**
- Atoms pull harder on shared electrons → electronegativity **rises**

### Down a group ↓

Each row adds a **whole new shell**, further out, with complete inner shells
shielding very effectively. Protons increase, but their extra pull is
outweighed.

- Atoms get **bigger** (Li 152 pm → Cs 265 pm)
- Outer electrons are held **loosely** → ionisation energy **falls**
- Less pull on shared electrons → electronegativity **falls**

### The summary

| | Across a period → | Down a group ↓ |
|---|---|---|
| **Atomic radius** | Decreases | Increases |
| **Ionisation energy** | Increases | Decreases |
| **Electronegativity** | Increases | Decreases |

Radius goes one way; the other two go the other. **Fluorine, top right, is the
most electronegative element on the table (3.98).**

When a question mixes both directions, **the group trend usually wins** —
adding a whole shell is a bigger structural change than adding one electron to
an existing one.

### The ionisation-energy cliff

Sodium's **first** ionisation energy is 496 kJ/mol. Its **second** is 4562 —
nine times more.

Why: the first electron empties the outer shell, leaving Na⁺ with neon's full
arrangement. The second has to come out of a **full inner shell** — closer,
less shielded, and stable.

This matters historically. Ionisation energies rise gently *within* a shell and
then **leap** when you break into the next. That stair-step pattern is how
shell structure was discovered experimentally — it is direct evidence that
shells are real.

### Noble gases tie it together

A full outer shell is a low-energy arrangement with **nothing to gain by
changing**. So: highest ionisation energies, no appetite to gain electrons, no
reactions.

And notice it is the *same* fact that explained every ion charge in the previous
topic. **Everything else on the table is trying to reach the arrangement the
noble gases already have.**
