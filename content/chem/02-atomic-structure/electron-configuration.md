---
id: chem.atomic.electron-configuration
unit: chem.u-atomic
subject: chem
title: Electron Configuration
depth: both
ced:
  - SAP-2.1
prereqs:
  - chem.atomic.subatomic-particles
items:
  - id: chem.atomic.electron-configuration.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "What is the maximum number of electrons that can sit in a p subshell?"
    answer: { value: 6, unit: null, sigFigs: null }
    solution:
      - text: "A subshell is made of orbitals, and each orbital holds at most two electrons."
      - text: "A p subshell has three orbitals - px, py and pz, pointing along three perpendicular directions."
      - text: "3 orbitals x 2 electrons = 6."
      - text: "Worth memorising the whole set: s holds 2, p holds 6, d holds 10, f holds 14. The pattern is 2, 6, 10, 14 - rising by four each time."
    source: original
    verified: true
  - id: chem.atomic.electron-configuration.i2
    tier: warmup
    type: numeric
    depth: both
    prompt: "How many electrons fit in a completely full n = 3 shell?"
    answer: { value: 18, unit: null, sigFigs: null }
    solution:
      - text: "The n = 3 shell contains 3s, 3p and 3d subshells."
      - text: "3s holds 2, 3p holds 6, 3d holds 10."
      - text: "2 + 6 + 10 = 18."
      - text: "There is a shortcut: a shell n holds 2n^2 electrons. For n = 3 that is 2 x 9 = 18. Check it on n = 1 (2) and n = 2 (8) and you will see it works."
      - text: "Careful not to confuse this with the 'octet rule'. Eight is how many fit in the outer s and p subshells, which is what bonding cares about - not the shell's full capacity."
    source: original
    verified: true
  - id: chem.atomic.electron-configuration.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "What is the full electron configuration of oxygen (atomic number 8)?"
    answer:
      correctId: b
      options:
        - id: a
          text: 1s2 2s2 2p2 3s2
          why: "That fills 2p only halfway and then jumps to the next shell. Electrons fill the lowest available level first - 2p takes six before 3s takes any."
        - id: b
          text: 1s2 2s2 2p4
        - id: c
          text: 1s2 2s2 2p6
          why: "Count them: that is ten electrons. Oxygen has eight. This is neon's configuration."
        - id: d
          text: 1s2 2p6
          why: "It skips 2s entirely. 2s is lower in energy than 2p and fills first."
    solution:
      - text: "Oxygen has 8 electrons. Fill from the bottom up and keep count."
      - text: "1s takes 2. Running total: 2."
      - text: "2s takes 2. Running total: 4."
      - text: "2p can take 6, but only 4 are left. Running total: 8. Done."
      - text: "So: 1s2 2s2 2p4."
      - text: "Always finish by adding the superscripts. They must equal the atomic number - that is a free check that catches most mistakes."
    source: original
    verified: true
  - id: chem.atomic.electron-configuration.i4
    tier: standard
    type: numeric
    depth: both
    prompt: "Nitrogen's configuration is 1s2 2s2 2p3. How many unpaired electrons does it have?"
    answer: { value: 3, unit: null, sigFigs: null }
    solution:
      - text: "The 2p subshell has three orbitals and nitrogen has three electrons to put in them."
      - text: "Electrons spread out before they pair up, because two electrons in one orbital repel each other."
      - text: "So one electron goes in each of the three p orbitals, all alone."
      - text: "Three unpaired electrons."
      - text: "That spreading-out rule is Hund's rule. It is why nitrogen forms three bonds and why some substances are magnetic - unpaired electrons are what a magnetic field has to grab."
    source: original
    verified: true
  - id: chem.atomic.electron-configuration.i5
    tier: standard
    type: mcq
    depth: both
    prompt: "4s fills before 3d, even though 3 is less than 4. Why?"
    answer:
      correctId: c
      options:
        - id: a
          text: Because s subshells always fill before d subshells
          why: "Not as a rule across shells - 3s fills before 2p would be false. It is about actual energy, not subshell letter."
        - id: b
          text: Because 3d does not exist until the fourth shell starts
          why: "3d exists; it is simply higher in energy than 4s, so it waits its turn."
        - id: c
          text: Because electrons fill by energy, not by shell number, and 4s happens to sit lower in energy than 3d
        - id: d
          text: Because of Hund's rule
          why: "Hund's rule governs how electrons arrange within one subshell, not which subshell fills first."
    solution:
      - text: "The filling order follows ENERGY, and energy is not simply the shell number."
      - text: "As shells get further out they start to overlap in energy, and 4s dips just below 3d."
      - text: "So the order runs: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p..."
      - text: "This is the Aufbau principle - fill the lowest available energy level first."
      - text: "Practical consequence: this is exactly why the transition metals appear where they do. Calcium fills 4s, then scandium starts on 3d, and the whole d-block is the 3d subshell filling up one row late."
    source: original
    verified: true
  - id: chem.atomic.electron-configuration.i6
    tier: standard
    type: mcq
    depth: both
    prompt: "What is the noble-gas shorthand configuration for calcium (atomic number 20)?"
    answer:
      correctId: a
      options:
        - id: a
          text: "[Ar] 4s2"
        - id: b
          text: "[Ne] 4s2"
          why: "Neon accounts for only 10 electrons, leaving 10 to write out - not 2. You must use the nearest noble gas before the element."
        - id: c
          text: "[Ar] 3d2"
          why: "4s is lower in energy than 3d, so it fills first. Calcium's last two electrons go into 4s."
        - id: d
          text: "[Kr] 4s2"
          why: "Krypton has 36 electrons - more than calcium's 20. The shorthand must be a noble gas that comes BEFORE the element."
    solution:
      - text: "Find the noble gas immediately before calcium on the table: argon, with 18 electrons."
      - text: "Write it in brackets to stand for all 18: [Ar]."
      - text: "Calcium has 20, so there are 2 left to place."
      - text: "Next up after argon is 4s, which takes both: [Ar] 4s2."
      - text: "Check: 18 + 2 = 20. Correct."
      - text: "The shorthand is not laziness - it puts the chemically important electrons on display. The core electrons buried under [Ar] take no part in reactions."
    source: original
    verified: true
  - id: chem.atomic.electron-configuration.i7
    tier: standard
    type: numeric
    depth: both
    prompt: "Sulfur's configuration is [Ne] 3s2 3p4. How many valence electrons does it have?"
    answer: { value: 6, unit: null, sigFigs: null }
    solution:
      - text: "Valence electrons are the ones in the outermost shell - the ones that do the chemistry."
      - text: "Sulfur's outer shell is n = 3, holding 3s2 and 3p4."
      - text: "2 + 4 = 6 valence electrons."
      - text: "Everything under [Ne] is core and takes no part in bonding."
      - text: "Shortcut for the main groups: the group number gives it to you. Sulfur is in group 16, and 16 - 10 = 6. Needing two more to reach eight is exactly why sulfur forms S2- and why it mirrors oxygen's behaviour."
    source: original
    verified: true
  - id: chem.atomic.electron-configuration.i8
    tier: challenge
    type: mcq
    depth: both
    prompt: "Chromium 'should' be [Ar] 3d4 4s2 but is actually [Ar] 3d5 4s1. What is going on?"
    answer:
      correctId: b
      options:
        - id: a
          text: The periodic table has chromium in the wrong place
          why: "Chromium is exactly where it belongs. The filling rules are the approximation, not the table."
        - id: b
          text: A half-full d subshell is unusually stable, so it is worth moving one electron to reach it
        - id: c
          text: 4s can only ever hold one electron in transition metals
          why: "Most transition metals have 4s2. Chromium and copper are the exceptions, not the rule."
        - id: d
          text: It is a measurement error
          why: "It is confirmed experimentally and explained theoretically. The anomaly is real."
    solution:
      - text: "The Aufbau order is a very good approximation, not a law. Real atoms settle into whatever arrangement is actually lowest in energy."
      - text: "Half-full and completely full d subshells are extra stable - the electrons spread evenly with parallel spins, which minimises repulsion."
      - text: "Chromium can reach a half-full d5 by promoting one 4s electron. The gain outweighs the cost, so it does."
      - text: "Copper does the same thing for a FULL d10: [Ar] 3d10 4s1 rather than 3d9 4s2."
      - text: "These two are the exceptions worth knowing by name. Expect to be asked for chromium or copper specifically."
    source: original
    verified: true
  - id: chem.atomic.electron-configuration.i9
    tier: challenge
    type: mcq
    depth: both
    prompt: "Why can no two electrons in an atom be completely identical?"
    answer:
      correctId: c
      options:
        - id: a
          text: They would collide
          why: "Electrons are not little balls that collide. The restriction is a quantum rule, not a traffic problem."
        - id: b
          text: They repel, so they cannot share an orbital at all
          why: "They do repel, yet two DO share each orbital quite happily - provided their spins are opposite."
        - id: c
          text: The Pauli exclusion principle - two electrons in one orbital must at least differ in spin, which caps an orbital at two
        - id: d
          text: They can be identical; the rules are only a bookkeeping convenience
          why: "If they could, every electron would collapse into 1s and there would be no chemistry at all, nor any periodic table."
    solution:
      - text: "Every electron is described by a set of quantum numbers - which shell, which subshell, which orbital, and which spin."
      - text: "The Pauli exclusion principle says no two electrons in the same atom may have an identical set."
      - text: "Two electrons sharing an orbital already match on everything except spin. So they must have opposite spins - and since there are only two spins, an orbital is capped at two electrons."
      - text: "That cap is where the whole structure comes from. s holds 2, p holds 6, d holds 10 - all of it is one orbital at a time, two electrons each."
      - text: "Worth appreciating how much rests on this. Without Pauli, every electron would sink into 1s, every element would behave alike, and there would be no chemistry and no periodic table."
    source: original
    verified: true
  - id: chem.atomic.electron-configuration.i10
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: the three rules that decide where electrons go, and what each one does."
    answer:
      model: "The Aufbau principle says electrons fill the lowest available energy level first, which is why the order is 1s, 2s, 2p, 3s, 3p, 4s, 3d and so on - 4s before 3d because energy, not shell number, decides. The Pauli exclusion principle says no two electrons in an atom can have the same set of quantum numbers, so an orbital holds at most two electrons and they must have opposite spins. Hund's rule says that within a subshell, electrons spread out singly across the available orbitals before any orbital gets a second electron, because two electrons sharing an orbital repel each other."
      rubric:
        - "Aufbau: fill lowest energy first, including 4s before 3d"
        - "Pauli: no two identical electrons, so two per orbital with opposite spins"
        - "Hund: spread out singly before pairing up"
        - "Gives a reason for Hund's rule (repulsion between paired electrons)"
    solution:
      - text: "Aufbau - fill from the bottom up. Lowest energy level available goes first. This is what gives the filling order, including the 4s-before-3d surprise."
      - text: "Pauli - no two electrons in an atom can be completely identical. Since two electrons in one orbital match on everything but spin, and there are only two spins, an orbital holds two at most."
      - text: "Hund - within a subshell, spread out before pairing up. One electron in each orbital first, then start doubling."
      - text: "Hund's reason is simply repulsion: two electrons crammed in the same orbital push on each other, so they avoid it while empty orbitals remain."
      - text: "Together these three give you the configuration of any element, and the periodic table's whole shape falls out of them."
    source: original
    verified: true
---

Where the electrons sit decides **everything** about an element's chemistry.
Two elements with similar outer arrangements behave similarly - and that is
the entire reason the periodic table has columns.

### The containers

Electrons live in **shells** (1, 2, 3...), shells contain **subshells** (s, p,
d, f), and subshells contain **orbitals**. **Every orbital holds at most two
electrons.**

| Subshell | Orbitals | Max electrons |
|---|---|---|
| s | 1 | **2** |
| p | 3 | **6** |
| d | 5 | **10** |
| f | 7 | **14** |

2, 6, 10, 14 - rising by four. And a whole shell `n` holds **2n²**: 2, 8, 18, 32.

### The filling order, and its one surprise

> 1s · 2s · 2p · 3s · 3p · **4s · 3d** · 4p · 5s · 4d · 5p · 6s · 4f · 5d · 6p

**4s fills before 3d.** Not a typo. Electrons fill by **energy**, not by shell
number, and as shells spread outward they overlap - 4s dips just below 3d.

This is exactly why the **transition metals** sit where they do. Calcium
finishes 4s, scandium starts 3d, and the whole d-block is the 3d subshell
filling a row late.

### The three rules

**Aufbau** - fill the lowest available energy level first.

**Pauli exclusion** - no two electrons in an atom can be completely identical.
Two sharing an orbital match on everything but **spin**, and there are only two
spins, so an orbital caps at two. *Every* capacity number above comes from this
one rule.

**Hund** - within a subshell, electrons **spread out singly** before any
orbital takes a second. Two electrons in one orbital repel each other, so they
avoid it while empty orbitals remain.

> Nitrogen's 2p³ is one electron in each of the three p orbitals - **three
> unpaired electrons**, not one pair and a single. This is why nitrogen forms
> three bonds.

### Shorthand

Write the previous noble gas in brackets and carry on:

> Calcium: **[Ar] 4s²** instead of 1s² 2s² 2p⁶ 3s² 3p⁶ 4s²

This isn't laziness - it puts the electrons that actually react on display, and
hides the core that never does.

### Valence electrons

The outer-shell electrons - the ones that do all the chemistry.

For main-group elements the **group number gives them away**: group 16 (sulfur)
has 6 valence electrons; group 1 has 1; group 17 has 7. Which is precisely why
group predicts the ion charge.

### Two exceptions you will be asked about

Half-full and completely full d subshells are unusually stable, so two elements
cheat by promoting a 4s electron:

- **Chromium**: [Ar] 3d⁵ 4s¹, not 3d⁴ 4s² — reaching a **half-full** d
- **Copper**: [Ar] 3d¹⁰ 4s¹, not 3d⁹ 4s² — reaching a **full** d

### One free check

**Add up all the superscripts. They must equal the atomic number.** It takes
three seconds and catches most mistakes.
