---
id: chem.atomic.isotopes
unit: chem.u-atomic
subject: chem
title: Isotopes and Average Atomic Mass
depth: both
ced:
  - SAP-1.2
prereqs:
  - chem.atomic.subatomic-particles
  - chem.measure.sig-figs
items:
  - id: chem.atomic.isotopes.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "Carbon-12 and carbon-14 are both carbon. What is different about them, and why do they behave the same chemically?"
    answer:
      correctId: b
      options:
        - id: a
          text: Different protons, so they react differently
          why: "If the protons differed they would be different elements. Both have six - that is what makes them both carbon."
        - id: b
          text: Different neutrons - and chemistry is decided by electrons, which are unchanged
        - id: c
          text: Different electrons, so carbon-14 is an ion
          why: "Both are neutral atoms with six electrons. An ion is about charge, not about mass number."
        - id: d
          text: Nothing is different - the numbers are just names
          why: "The numbers are real mass numbers. Carbon-14 has two more neutrons and really is heavier."
    solution:
      - text: "Both have six protons. That is non-negotiable - six protons is carbon."
      - text: "Carbon-12 has six neutrons (6 + 6 = 12). Carbon-14 has eight (6 + 8 = 14)."
      - text: "Atoms of the same element with different neutron counts are isotopes."
      - text: "Chemically they are near-identical, because bonding is done by electrons, and both have six electrons arranged identically."
      - text: "Physically they differ - carbon-14 is heavier and its nucleus is unstable, which is what makes radiocarbon dating possible. But put either in a reaction and it behaves like carbon."
    source: original
    verified: true
  - id: chem.atomic.isotopes.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "Chlorine is 75.00% chlorine-35 (mass 34.969 amu) and 25.00% chlorine-37 (mass 36.966 amu). Calculate its average atomic mass."
    answer: { value: 35.468, unit: amu, acceptedUnits: ["u"], sigFigs: 5 }
    solution:
      - text: "This is a weighted average - each isotope counts in proportion to how common it is."
      - text: "Turn the percentages into decimals: 0.7500 and 0.2500."
      - text: "Multiply each mass by its share and add:"
      - text: "(0.7500 x 34.969) + (0.2500 x 36.966) = 26.227 + 9.2415 = 35.468 amu"
      - text: "Sanity check that costs nothing: the answer must land between 34.969 and 36.966, and closer to the common one. 35.468 is between them and near the lighter end. Good."
      - text: "This is why the periodic table shows 35.45 for chlorine rather than a whole number. It is an average over what actually exists on Earth, not the mass of any single atom."
    source: original
    verified: true
  - id: chem.atomic.isotopes.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "Why is chlorine's atomic mass on the periodic table 35.45 and not a whole number, when no single chlorine atom has a mass of 35.45?"
    answer:
      correctId: a
      options:
        - id: a
          text: It is an average over the mix of isotopes found naturally, weighted by abundance
        - id: b
          text: Because electrons add a fractional mass
          why: "Electrons are about 1/1836 of a proton. Seventeen of them barely register at two decimal places."
        - id: c
          text: Measurement error
          why: "These values are known to far better precision than 0.01. The fraction is real, not noise."
        - id: d
          text: Because chlorine atoms can gain or lose neutrons over time
          why: "A stable atom's neutron count does not drift. The mix of isotopes in a sample is fixed."
    solution:
      - text: "There is no such thing as a 35.45 amu chlorine atom. Individual atoms are 34.969 or 36.966."
      - text: "But a sample of chlorine contains both, roughly three parts Cl-35 to one part Cl-37."
      - text: "The periodic table reports the average you would actually get working with real chlorine, which is what you need for mole calculations."
      - text: "Because the mixture is about 3:1 toward the lighter isotope, the average sits closer to 35 than to 37."
      - text: "This matters practically: when you look up a molar mass you are using a number that already accounts for the isotope mix, so you never have to think about it again."
    source: original
    verified: true
  - id: chem.atomic.isotopes.i4
    tier: challenge
    type: numeric
    depth: both
    prompt: "Boron has two isotopes: boron-10 (mass 10.013 amu) and boron-11 (mass 11.009 amu). Its average atomic mass is 10.811 amu. What percentage of natural boron is boron-11?"
    answer: { value: 80.12, unit: null, sigFigs: 4, tolerance: 0.005 }
    solution:
      - text: "This runs the weighted average backwards, so set it up with an unknown."
      - text: "Let x be the fraction that is boron-11. Then the fraction that is boron-10 is (1 - x), since they must add to 1."
      - text: "10.013(1 - x) + 11.009x = 10.811"
      - text: "Expand: 10.013 - 10.013x + 11.009x = 10.811"
      - text: "Collect the x terms: 10.013 + 0.996x = 10.811"
      - text: "0.996x = 0.798, so x = 0.8012"
      - text: "That is 80.12% boron-11, and therefore 19.88% boron-10."
      - text: "Check it against intuition: 10.811 sits much closer to 11.009 than to 10.013, so the heavy isotope must be the common one. 80% heavy agrees."
    source: original
    verified: true
  - id: chem.atomic.isotopes.i5
    tier: standard
    type: numeric
    depth: both
    prompt: "How many neutrons are in an atom of uranium-235? Uranium's atomic number is 92."
    answer: { value: 143, unit: null, sigFigs: null }
    solution:
      - text: "The number after the name is the mass number: 235."
      - text: "Neutrons = mass number - atomic number = 235 - 92 = 143."
      - text: "Uranium-238, the far more common isotope, has 146 neutrons."
      - text: "Those three neutrons are the entire difference between the isotope used in reactors and bombs and the one that is 99.3% of natural uranium."
      - text: "Separating them is extremely difficult precisely because they are chemically identical - same 92 electrons, same reactions. You have to exploit the tiny mass difference instead."
    source: original
    verified: true
  - id: chem.atomic.isotopes.i6
    tier: ap
    type: frq
    depth: both
    prompt: "A mass spectrometer analyses a sample of element X and finds two peaks: one at 62.930 amu with 69.17% abundance, and one at 64.928 amu with 30.83% abundance. Calculate the average atomic mass, identify the element, and explain why a mass spectrum shows separate peaks rather than one peak at the average."
    answer:
      model: "The average is (0.6917 x 62.930) + (0.3083 x 64.928) = 43.529 + 20.017 = 63.55 amu, which is copper. A mass spectrometer separates ions by mass, so each isotope arrives at its own position on the detector and produces its own peak - it is measuring individual atoms one at a time, not a bulk sample. The average atomic mass is a calculated quantity describing the mixture as a whole; no single atom has that mass, so nothing in the instrument could ever land there. The peak heights give the relative abundances, which is exactly the data needed to compute the average."
      rubric:
        - "1 point: correct weighted average setup using abundances as decimals"
        - "1 point: arithmetic giving approximately 63.5 to 63.6 amu"
        - "1 point: identifies the element as copper"
        - "1 point: explains the spectrometer separates individual ions by mass"
        - "1 point: states no individual atom has the average mass, so no peak appears there"
    solution:
      - text: "Convert the abundances to decimals: 0.6917 and 0.3083. Check they sum to 1 - they do."
      - text: "Weight each mass by its abundance: (0.6917 x 62.930) = 43.529"
      - text: "(0.3083 x 64.928) = 20.017"
      - text: "Add: 43.529 + 20.017 = 63.546, so 63.55 amu to four significant figures."
      - text: "Look that up on the periodic table: 63.55. The element is copper."
      - text: "Now the conceptual half. A mass spectrometer ionises atoms and bends them with a magnetic field; heavier ions bend less. So each isotope lands in a different place."
      - text: "It is weighing atoms individually, not in bulk. Every atom it detects really has a mass of either 62.930 or 64.928."
      - text: "The average atomic mass is a bookkeeping number describing the whole mixture. No atom has it, so no peak can appear there."
      - text: "The useful part: peak heights give you the abundances. That is where the percentages on the periodic table came from in the first place."
    source: original
    verified: true
---

**Isotopes** are atoms of the same element with **different numbers of
neutrons**.

Same protons - so same element. Different neutrons - so different mass.

> Carbon-12: 6 protons, **6** neutrons
> Carbon-14: 6 protons, **8** neutrons

The number after the name is the **mass number**, so:

> **neutrons = mass number - atomic number**

### They behave the same chemically. That matters.

Chemistry is done by **electrons**, and isotopes have identical electron
arrangements. So carbon-14 reacts exactly like carbon-12 — which is why a plant
absorbs it without discrimination, and why radiocarbon dating works at all.

It is also why separating uranium-235 from uranium-238 is so notoriously hard:
no chemical process can tell them apart. You have to exploit the small mass
difference physically.

What *does* differ is mass and nuclear stability.

### Why the periodic table has decimals

**No chlorine atom has a mass of 35.45 amu.** Individual chlorine atoms are
34.969 or 36.966.

But real chlorine is a *mixture* - about three parts Cl-35 to one part Cl-37.
The table reports the **weighted average** of what you would actually be
holding, which is the number mole calculations need.

> average mass = (fraction₁ × mass₁) + (fraction₂ × mass₂) + ...

Use **decimals**, not percentages: 75.00% becomes 0.7500.

**Free sanity check:** the answer must land **between** the isotope masses, and
**closer to the more abundant one**. If it lands outside that range, you've
made an arithmetic error — no averaging can escape its own inputs.

### Running it backwards

Given the average and asked for the abundances, set up one unknown:

> Let x = fraction of the heavy isotope, so (1 - x) = fraction of the light one
> mass_light(1 - x) + mass_heavy(x) = average

Then solve for x. The same sanity check still applies in reverse: if the
average sits near the heavy isotope, the heavy one must be common.

### Where the numbers come from

A **mass spectrometer** ionises atoms and bends them through a magnetic field.
Heavier ions bend less, so each isotope lands in a different spot and gives its
own **peak**. Peak positions give the masses; peak **heights** give the
abundances.

And notice: there is **never a peak at the average**, because the instrument
weighs atoms one at a time and no individual atom has the average mass.
