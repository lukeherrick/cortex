---
id: chem.atomic.subatomic-particles
unit: chem.u-atomic
subject: chem
title: Protons, Neutrons and Electrons
depth: both
ced:
  - SAP-1.1
prereqs: []
items:
  - id: chem.atomic.subatomic-particles.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "A neutral atom has 17 protons. How many electrons does it have?"
    answer: { value: 17, unit: null, sigFigs: null }
    solution:
      - text: "Neutral means no overall charge."
      - text: "A proton is +1 and an electron is -1, so they have to be equal in number to cancel out."
      - text: "17 protons means 17 electrons."
      - text: "And 17 protons means chlorine - the proton count IS the element's identity."
      - text: "Neutrons do not come into it. They are uncharged, so they never affect this balance."
    source: original
    verified: true
  - id: chem.atomic.subatomic-particles.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "What actually decides which element an atom is?"
    answer:
      correctId: c
      options:
        - id: a
          text: The total number of particles in it
          why: "Carbon-12 and carbon-14 have different totals and are both carbon. The total is not the identity."
        - id: b
          text: The number of electrons
          why: "Electrons come and go - that is all ion formation is. A sodium ion has lost one and is still sodium."
        - id: c
          text: The number of protons
        - id: d
          text: The number of neutrons
          why: "Neutron count varies within an element. Those variants are isotopes, all still the same element."
    solution:
      - text: "The proton count is the element. It has its own name: the atomic number."
      - text: "6 protons is carbon. Always. 7 protons is nitrogen. Always."
      - text: "Change the neutrons and you get a different isotope - carbon-12 versus carbon-14 - but still carbon."
      - text: "Change the electrons and you get an ion - Na versus Na+ - but still sodium."
      - text: "Change the protons and it is literally a different element. That is why it takes a nuclear reaction, not a chemical one: chemistry only ever rearranges electrons."
    source: original
    verified: true
  - id: chem.atomic.subatomic-particles.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "An atom has a mass number of 56 and an atomic number of 26. How many neutrons does it have?"
    answer: { value: 30, unit: null, sigFigs: null }
    solution:
      - text: "The mass number counts protons plus neutrons together - those are the heavy particles, the ones in the nucleus."
      - text: "The atomic number is the protons on their own: 26."
      - text: "So neutrons = mass number - atomic number = 56 - 26 = 30."
      - text: "26 protons is iron, so this is iron-56, the most common isotope and the most stable nucleus in the universe."
      - text: "Electrons are not in the mass number at all. One is about 1/1836 the mass of a proton, so they contribute almost nothing to an atom's mass."
    source: original
    verified: true
  - id: chem.atomic.subatomic-particles.i4
    tier: challenge
    type: mcq
    depth: both
    prompt: "Rutherford fired alpha particles at gold foil. Almost all went straight through, but a very few bounced almost straight back. What did that force him to conclude?"
    answer:
      correctId: b
      options:
        - id: a
          text: Atoms are solid spheres
          why: "Then nothing would get through. The fact that almost everything passed straight through rules solidity out."
        - id: b
          text: An atom is mostly empty space with a tiny, dense, positively charged centre
        - id: c
          text: Electrons are heavier than expected
          why: "Electrons are far too light to deflect an alpha particle - it would be like a bowling ball bouncing off a ping-pong ball."
        - id: d
          text: Gold is unusually dense
          why: "The same result turns up with other metals. It is a fact about atoms, not about gold."
    solution:
      - text: "Take the two observations separately."
      - text: "Almost everything passed straight through - so an atom must be mostly empty space."
      - text: "But a tiny fraction came almost straight back - so somewhere in there is something small, massive and charged enough to repel a fast alpha particle head-on."
      - text: "Rutherford reportedly said it was like firing a shell at tissue paper and having it bounce back."
      - text: "Conclusion: a tiny dense positive nucleus, with the electrons out in the vast empty volume around it."
      - text: "The scale is hard to credit. If a nucleus were a marble, the atom would be a sports stadium. Solid matter is overwhelmingly empty space."
    source: original
    verified: true
  - id: chem.atomic.subatomic-particles.i5
    tier: standard
    type: mcq
    depth: both
    prompt: "If an atom is almost entirely empty space, why can't you push your hand through a table?"
    answer:
      correctId: d
      options:
        - id: a
          text: The nuclei are packed too tightly to pass
          why: "Nuclei occupy a vanishingly small fraction of the volume. There is enormous room between them."
        - id: b
          text: Atoms are actually solid after all
          why: "The gold foil experiment settled this. The emptiness is real."
        - id: c
          text: Gravity holds the table's atoms together
          why: "Gravity between atoms is almost unimaginably weak. Electrical forces dominate completely at this scale."
        - id: d
          text: The electron clouds of your hand and the table repel each other electrically
    solution:
      - text: "Solidity is not about matter filling space. It is about electrical repulsion."
      - text: "The outside of every atom is a cloud of negatively charged electrons."
      - text: "Negative repels negative, and the force gets enormous as they get close."
      - text: "So your hand never actually touches the table. The electron clouds push each other apart long before anything makes contact."
      - text: "You have never touched anything in your life, strictly speaking. Everything you feel as solid is electrons refusing to share space."
    source: original
    verified: true
  - id: chem.atomic.subatomic-particles.i6
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: the three subatomic particles, with charge, rough mass and where they live."
    answer:
      model: "A proton has a charge of +1, a mass of about 1 atomic mass unit, and sits in the nucleus. A neutron has no charge, a mass of about 1 atomic mass unit, and also sits in the nucleus. An electron has a charge of -1, a mass of roughly 1/1836 of a proton, and occupies the space around the nucleus. Protons and neutrons together make up essentially all of an atom's mass and almost none of its volume; electrons make up almost none of the mass and essentially all of the volume."
      rubric:
        - "Proton: +1, mass about 1 amu, in the nucleus"
        - "Neutron: 0 charge, mass about 1 amu, in the nucleus"
        - "Electron: -1, far lighter, outside the nucleus"
        - "Notes nucleus holds the mass, electrons hold the volume"
    solution:
      - text: "Proton: charge +1, mass about 1 amu, in the nucleus. Its count is the element's identity."
      - text: "Neutron: charge 0, mass about 1 amu, in the nucleus. Its count sets which isotope you have."
      - text: "Electron: charge -1, mass about 1/1836 of a proton, out in the space around the nucleus. Its count sets the charge, and its arrangement decides all the chemistry."
      - text: "The split worth remembering: the nucleus has almost all the mass and almost none of the volume. The electrons have almost none of the mass and almost all the volume."
      - text: "Which is why chemistry is entirely about electrons. Reactions never touch the nucleus - they just rearrange the outer electrons."
    source: original
    verified: true
---

Everything in chemistry comes down to three particles, and one of them does all
the interesting work.

| Particle | Charge | Mass (amu) | Where |
|---|---|---|---|
| **Proton** | +1 | ~1 | Nucleus |
| **Neutron** | 0 | ~1 | Nucleus |
| **Electron** | -1 | ~1/1836 | Around the nucleus |

### Two numbers describe any atom

- **Atomic number (Z)** = number of **protons**. This *is* the element.
- **Mass number (A)** = **protons + neutrons** - everything in the nucleus.

> **neutrons = mass number - atomic number**

Electrons never appear in the mass number, because at 1/1836 of a proton they
contribute essentially nothing to the mass.

### Change each one and you get something different

| Change | Result | Still the same element? |
|---|---|---|
| Protons | A **different element** | No |
| Neutrons | A different **isotope** | Yes |
| Electrons | An **ion** | Yes |

This is why **chemistry only ever rearranges electrons.** Changing a proton
count takes a nuclear reaction - it is a completely different kind of event
from anything in this course.

### The emptiness is real

Rutherford fired alpha particles at gold foil. Almost all of them sailed
straight through; a tiny handful bounced almost straight back. Two
observations, two conclusions:

- Mostly passing through → an atom is **mostly empty space**
- A few bouncing back → there is something **tiny, dense and positive** in there

He compared it to firing a shell at tissue paper and having it come back at you.

The scale genuinely resists belief: **if a nucleus were a marble, the atom would
be a sports stadium.** Essentially all of the mass, in essentially none of the
volume.

### So why is a table solid?

Not because matter fills space - it doesn't. Because the outside of every atom
is a cloud of **negative electrons**, and negative repels negative, harder and
harder as they approach.

Your hand never touches the table. The electron clouds refuse to share space
long before anything makes contact. **Strictly speaking you have never touched
anything** - everything you experience as solid is electrons pushing back.
