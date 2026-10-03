---
id: chem.atomic.ions
unit: chem.u-atomic
subject: chem
title: Ions
depth: both
ced:
  - SAP-1.3
prereqs:
  - chem.atomic.subatomic-particles
items:
  - id: chem.atomic.ions.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "A sodium ion is written Na+. Sodium's atomic number is 11. How many electrons does the ion have?"
    answer: { value: 10, unit: null, sigFigs: null }
    solution:
      - text: "Neutral sodium has 11 protons and 11 electrons."
      - text: "The + means one unit of positive charge overall."
      - text: "Protons never change in chemistry, so the charge must have come from losing an electron."
      - text: "11 - 1 = 10 electrons."
      - text: "Watch the direction carefully: a POSITIVE charge means FEWER electrons. It feels backwards until you remember electrons are the negative ones - losing a negative leaves you positive."
    source: original
    verified: true
  - id: chem.atomic.ions.i2
    tier: warmup
    type: numeric
    depth: both
    prompt: "An oxide ion is written O2-. Oxygen's atomic number is 8. How many electrons does it have?"
    answer: { value: 10, unit: null, sigFigs: null }
    solution:
      - text: "Neutral oxygen has 8 protons and 8 electrons."
      - text: "The 2- means two units of negative charge, so it has gained two electrons."
      - text: "8 + 2 = 10 electrons."
      - text: "Notice something: the oxide ion and the sodium ion both have 10 electrons. They are isoelectronic - same electron count, completely different elements."
      - text: "That shared number is 10 for a reason. Both have ended up with the electron arrangement of neon, which is a very stable one. That is exactly why they form these ions and not others."
    source: original
    verified: true
  - id: chem.atomic.ions.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "Why does magnesium reliably form Mg2+ rather than Mg+ or Mg3+?"
    answer:
      correctId: c
      options:
        - id: a
          text: Because magnesium has two protons spare
          why: "Proton count never changes in chemistry. Magnesium always has twelve."
        - id: b
          text: Because 2+ is the average charge magnesium takes
          why: "It is not an average - essentially all magnesium ions in compounds are exactly 2+."
        - id: c
          text: Losing exactly two leaves it with a full outer shell, the same arrangement as neon
        - id: d
          text: Because magnesium is in the second row of the periodic table
          why: "Row tells you the shell being filled. It is the GROUP - the column - that tells you the outer electron count."
    solution:
      - text: "Magnesium has 12 electrons, arranged as 2, 8, 2 - two in its outermost shell."
      - text: "Those two outer electrons are loosely held and far from the nucleus."
      - text: "Drop both and you are left with 2, 8 - exactly neon's arrangement, with a full outer shell."
      - text: "A full outer shell is a low-energy, stable configuration, so this is the arrangement magnesium reaches for."
      - text: "Mg+ would leave one lonely outer electron, still unstable. Mg3+ would mean tearing into the full inner shell, which costs far more energy than any reaction can supply."
      - text: "This is why group number predicts charge so reliably. Group 2 metals all have two outer electrons and all form 2+ ions."
    source: original
    verified: true
  - id: chem.atomic.ions.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "Metals form positive ions and non-metals form negative ones. What is behind that split?"
    answer:
      correctId: b
      options:
        - id: a
          text: Metals are heavier, so they lose particles more easily
          why: "Mass is not the mechanism. Lithium is very light and loses an electron eagerly."
        - id: b
          text: Metals have few outer electrons so losing them is cheapest; non-metals are nearly full so gaining is cheapest
        - id: c
          text: Metals conduct electricity, which means they give electrons away
          why: "Conduction is a consequence of loosely held electrons, not the cause of ion formation. Same root cause, different effect."
        - id: d
          text: It is an arbitrary convention
          why: "It follows directly from how many outer electrons each has and which route to a full shell is shorter."
    solution:
      - text: "Everything wants a full outer shell. The question is which route is shorter."
      - text: "A metal like sodium has ONE outer electron. Losing one is easy; gaining seven would be absurd."
      - text: "A non-metal like chlorine has SEVEN outer electrons. Gaining one is easy; losing seven is absurd."
      - text: "So metals shed and become positive; non-metals grab and become negative."
      - text: "This is also the whole basis of ionic bonding - the metal's surplus is exactly what the non-metal is short of, so they hand it over and then stick together by electrical attraction."
    source: original
    verified: true
  - id: chem.atomic.ions.i5
    tier: challenge
    type: mcq
    depth: both
    prompt: "A cation is always smaller than its parent atom, and an anion always larger. Why?"
    answer:
      correctId: d
      options:
        - id: a
          text: Losing electrons removes mass, which shrinks the atom
          why: "Electron mass is negligible, and size is set by electron arrangement rather than by mass."
        - id: b
          text: Positive charges attract each other and compress the ion
          why: "Like charges repel. The protons do not pull each other inward."
        - id: c
          text: Cations lose a whole shell, anions gain one
          why: "Sometimes true for cations and almost never for anions - gaining one electron does not start a new shell. There is a more general reason."
        - id: d
          text: The proton count is unchanged, so the remaining electrons feel more pull each when there are fewer of them, and less when there are more
    solution:
      - text: "Protons stay fixed. Only the electron count changes. So think about pull per electron."
      - text: "Lose electrons: the same number of protons now pulls on fewer electrons, so each one is held more tightly. The cloud contracts. Often the whole outer shell empties too, which shrinks it dramatically."
      - text: "Gain electrons: the same protons now share their pull among more electrons, so each is held more loosely. The extra electrons also repel each other. The cloud swells."
      - text: "Numbers make it vivid. Na is about 186 pm across; Na+ is about 102 pm - not far off half. Cl is about 99 pm; Cl- is about 181 pm."
      - text: "Look at that pair again: neutral sodium is bigger than neutral chlorine, but the sodium ION is much smaller than the chloride ION. Forming ions reverses which is bigger."
    source: original
    verified: true
  - id: chem.atomic.ions.i6
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: what changes and what does not when an atom becomes an ion?"
    answer:
      model: "Only the number of electrons changes. The number of protons stays exactly the same, which means it is still the same element, and the number of neutrons stays the same too, so it is still the same isotope and its mass is essentially unchanged. Losing electrons gives a positive ion, called a cation, and gaining electrons gives a negative ion, called an anion. Because the proton count is unchanged while the electron count is not, the size changes: cations are smaller than the parent atom and anions are larger."
      rubric:
        - "Only electron count changes"
        - "Protons unchanged, so the element is unchanged"
        - "Neutrons and therefore mass essentially unchanged"
        - "Losing electrons gives a positive cation, gaining gives a negative anion"
        - "Notes cations shrink and anions grow"
    solution:
      - text: "Changes: the electron count, and therefore the charge, and therefore the size."
      - text: "Does not change: protons - so it is the same element. Na+ is still sodium."
      - text: "Does not change: neutrons - so it is the same isotope, and the mass is essentially identical, since electrons weigh almost nothing."
      - text: "Lose electrons, go positive. That is a cation. Metals do this."
      - text: "Gain electrons, go negative. That is an anion. Non-metals do this."
      - text: "A memory hook that actually works: a cat-ion is pawsitive. Silly, and you will not forget which way round it goes."
    source: original
    verified: true
---

An **ion** is an atom that has lost or gained electrons, so it carries an
electrical charge.

The crucial thing: **only electrons move.** Protons and neutrons are untouched,
so it is the same element and the same isotope with essentially the same mass.

| | Lost electrons | Gained electrons |
|---|---|---|
| Charge | **Positive** | **Negative** |
| Name | **Cation** | **Anion** |
| Formed by | **Metals** | **Non-metals** |
| Size vs atom | **Smaller** | **Larger** |

> A **cat**-ion is **paws**-itive. Daft, and you will never mix it up again.

### The direction feels backwards, so get it straight now

**Positive charge means FEWER electrons.** Na⁺ has *lost* one.

It only feels wrong until you remember electrons are the negative ones -
removing a negative leaves you positive.

> Na⁺ : 11 protons, **10** electrons
> O²⁻ : 8 protons, **10** electrons

Both have 10. They are **isoelectronic** - same electron count, different
elements. And that 10 is no coincidence: both have reached **neon's**
arrangement, which is exactly *why* they form those particular ions.

### Why each element forms the charge it does

Everything is heading for a **full outer shell**. The only question is which
route is shorter.

- **Sodium** has **one** outer electron. Losing one is easy. Gaining seven is
  absurd. → Na⁺
- **Magnesium** has **two**. Losing two leaves neon's arrangement. → Mg²⁺
- **Chlorine** has **seven**. Gaining one completes the shell. Losing seven is
  absurd. → Cl⁻
- **Oxygen** has **six**. Gaining two completes it. → O²⁻

This is why **the group number predicts the charge** so reliably - the column
tells you the outer electron count. And it is the whole basis of **ionic
bonding**: the metal's surplus is precisely what the non-metal is short of.

### Why the size changes

Protons stay fixed; electrons do not. So think about **pull per electron**:

- **Lose** electrons → the same protons pull on fewer electrons → each held
  more tightly → the cloud **contracts**
- **Gain** electrons → the same pull shared among more electrons, which also
  repel each other → the cloud **swells**

The numbers are bigger than people expect:

| | Atom | Ion |
|---|---|---|
| Sodium | 186 pm | Na⁺ **102 pm** |
| Chlorine | 99 pm | Cl⁻ **181 pm** |

Look at that twice. Neutral sodium is **bigger** than neutral chlorine - but
the sodium **ion** is far **smaller** than the chloride **ion**. Forming ions
flips which one is larger.
