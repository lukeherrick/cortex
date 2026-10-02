---
id: bio.cell.membrane-structure
unit: bio.u-cell-structure
subject: bio
title: Membrane Structure
depth: both
ced:
  - ENE-2.A
prereqs:
  - bio.col.water-properties
items:
  - id: bio.cell.membrane-structure.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "Drop phospholipids into water and they spontaneously arrange themselves into a double layer, tails facing tails. Nobody organises them. Why does it happen on its own?"
    answer:
      correctId: c
      options:
        - id: a
          text: The tails are attracted to each other by strong bonds
          why: "The tails attract each other only weakly. The real driver is water pushing them together, not the tails pulling."
        - id: b
          text: The heads repel each other and push the tails inward
          why: "The heads actually get along fine with water. Nothing is pushing from that side."
        - id: c
          text: Water grips the charged heads and squeezes the greasy tails out of its way
        - id: d
          text: Cells spend ATP arranging them
          why: "No energy is needed. Mix the lipids with water and it happens by itself, in a test tube, with no cell present."
    solution:
      - text: "A phospholipid is two-faced. Its head is charged and happy in water. Its two tails are greasy and have no charge at all."
      - text: "Water can hydrogen-bond to the heads, so those get surrounded and held."
      - text: "Water cannot bond to the tails. And water would much rather stick to water, so it closes ranks and squeezes the tails out."
      - text: "The only arrangement that satisfies everything is a double layer: heads out facing the water on both sides, tails hidden in the middle facing each other."
      - text: "Nothing built this. Water's own stickiness did it, which is why the same thing happens in a test tube with no cell anywhere."
      - text: "That squeezing-out of uncharged things is the hydrophobic effect - the same idea as oil refusing to mix with water."
    source: original
    verified: true
  - id: bio.cell.membrane-structure.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "The membrane is called a fluid mosaic. What does the fluid half of that name mean?"
    answer:
      correctId: b
      options:
        - id: a
          text: The membrane is full of liquid water
          why: "There is water on both sides of it, but the membrane itself is lipid. Its interior is the opposite of watery."
        - id: b
          text: The lipids and many proteins drift sideways within the layer, so the membrane is not a fixed structure
        - id: c
          text: The membrane leaks and lets anything through
          why: "Quite the opposite - it is highly selective. Fluid describes how it moves, not how leaky it is."
        - id: d
          text: It can change thickness freely
          why: "Thickness stays remarkably constant, set by the length of the lipid tails."
    solution:
      - text: "The lipids are not bonded to each other in a rigid grid. They are just packed side by side."
      - text: "So they slide around within their layer, and so do many of the embedded proteins. The whole sheet behaves more like a liquid film than a wall."
      - text: "Mosaic is the other half: it is a patchwork of different pieces - phospholipids, proteins, cholesterol, sugar chains."
      - text: "Why fluidity matters: it lets membranes bend, bud off vesicles, fuse together, and heal small punctures. A rigid membrane could do none of that."
    source: original
    verified: true
  - id: bio.cell.membrane-structure.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "An arctic fish keeps its membranes working at near-freezing temperatures. What would you expect its membrane lipids to look like compared with yours?"
    answer:
      correctId: a
      options:
        - id: a
          text: More unsaturated tails, with kinks that stop the membrane packing solid
        - id: b
          text: More saturated tails, to hold the membrane together in the cold
          why: "Straight saturated tails pack tightly, which is exactly what you must avoid in the cold - the membrane would set solid."
        - id: c
          text: Shorter heads, to reduce water contact
          why: "The heads need water contact. Shrinking them would destabilise the whole bilayer."
        - id: d
          text: No cholesterol at all
          why: "Cholesterol actually helps in the cold by preventing tight packing. Removing it would make things worse."
    solution:
      - text: "A double bond in a fatty tail puts a permanent kink in it. Tails with double bonds are called unsaturated."
      - text: "Kinked tails cannot stack neatly, so they keep the membrane loose and fluid."
      - text: "Straight tails - saturated ones - pack tightly and set solid as it gets colder. A frozen membrane cannot transport anything or bud vesicles."
      - text: "So a cold-water organism loads up on unsaturated tails to stay fluid at low temperature."
      - text: "You can see this in your kitchen: butter is saturated and solid at room temperature, olive oil is unsaturated and liquid. Same chemistry, same reason."
    source: original
    verified: true
  - id: bio.cell.membrane-structure.i4
    tier: challenge
    type: mcq
    depth: both
    prompt: "Cholesterol is described as a fluidity buffer. At high temperature it makes membranes less fluid; at low temperature, more fluid. How does one molecule do both?"
    answer:
      correctId: c
      options:
        - id: a
          text: It changes shape with temperature
          why: "Cholesterol's rigid ring structure does not change with temperature. Its effect comes from where it sits, not from changing."
        - id: b
          text: It is only present at one temperature or the other
          why: "It is permanently embedded. The cell is not swapping it in and out as conditions change."
        - id: c
          text: It wedges between the tails - restricting their movement when hot, and blocking tight packing when cold
        - id: d
          text: It replaces phospholipids entirely at extremes
          why: "It sits among the phospholipids rather than replacing them. The bilayer is still built from phospholipids."
    solution:
      - text: "Cholesterol is a stiff, flat, mostly greasy molecule that slots in among the lipid tails."
      - text: "When it is hot, tails are flailing about and the membrane is getting too loose. Cholesterol's rigid body gets in the way and damps that movement down - less fluid."
      - text: "When it is cold, tails are trying to line up and pack into a solid. Cholesterol physically occupies the space they need - more fluid."
      - text: "So it is not doing two things. It is doing one thing - obstructing - and obstruction happens to help in both directions."
      - text: "Buffer is exactly the right word: like a pH buffer, it resists change in either direction rather than pushing one way."
    source: original
    verified: true
  - id: bio.cell.membrane-structure.i5
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: why is the membrane's middle a barrier to ions and to sugars, but not to oxygen or small fats?"
    answer:
      model: "The middle of the membrane is made of greasy, uncharged fatty tails - there is no charge and no water in there. Small uncharged molecules like oxygen, carbon dioxide and fats dissolve into that greasy layer easily and pass straight through. Ions and sugars are charged or heavily lopsided, so water grips them tightly and the greasy interior gives them nothing to hold onto. Pushing them through would mean stripping away the water that is clinging to them, which costs far too much energy, so they need a protein channel or carrier to cross."
      rubric:
        - "Describes the membrane interior as greasy, uncharged, water-free"
        - "Says small uncharged molecules dissolve through it"
        - "Explains ions and sugars are charged or polar and cannot enter the greasy layer"
        - "Mentions that crossing would require shedding bound water, which is energetically costly"
        - "Concludes such molecules need channels or carrier proteins"
    solution:
      - text: "Picture what the middle of the membrane actually is: a layer of fatty tails with no charge anywhere in it, and no water."
      - text: "A molecule can cross on its own only if it is comfortable in that environment."
      - text: "Oxygen, CO2 and small fats are uncharged and greasy themselves, so they dissolve right in and come out the other side. No help needed."
      - text: "An ion is a different story. It is charged, so water clings to it in a tight shell."
      - text: "To enter the greasy middle it would have to abandon that shell, and the energy cost of doing so is enormous. So it simply does not go."
      - text: "Sugars are not charged but they are strongly lopsided and covered in OH groups that water loves - same problem, same outcome."
      - text: "Which is why the membrane is riddled with protein channels and carriers. They provide a water-lined path so these molecules never have to touch the grease."
    source: original
    verified: true
---

Everything in this topic follows from one thing you already know: **water
squeezes out anything it cannot grip.**

A **phospholipid** is a two-faced molecule:

- a **head** that is charged, so water grips it happily
- two **tails** that are greasy and uncharged, so water will not touch them

Drop a pile of these into water and they sort themselves out with no help at
all. The only arrangement that keeps every head in water and every tail out of
it is a **double layer** - heads facing outward on both sides, tails tucked
together in the middle, hidden from water entirely.

Nothing builds this. No ATP is spent. Water's own stickiness does it, which is
why it happens in a test tube with no cell present. The squeezing-out itself is
the **hydrophobic effect**.

That accidental structure turns out to be a superb barrier, because **the middle
is greasy and has no charge in it.** So:

- **Crosses freely:** O2, CO2, small uncharged fats. They are greasy
  themselves, so they just dissolve through.
- **Cannot cross alone:** ions, sugars, amino acids, water in any quantity.
  They are charged or lopsided, water clings to them, and shedding that water
  to get into the grease costs far too much energy.

Hence **fluid mosaic**:

- **Mosaic** - a patchwork of phospholipids, proteins, cholesterol and sugar
  chains, not one uniform material.
- **Fluid** - the pieces drift sideways. The membrane is a liquid film, not a
  wall. That is what lets it bend, bud off vesicles, fuse, and seal small
  punctures.

Two things tune the fluidity, and both get examined:

**Tail shape.** A double bond puts a kink in a tail - that is an
**unsaturated** tail, and kinks stop the lipids packing tightly, keeping things
fluid. Straight **saturated** tails pack neatly and set solid when cold. Butter
versus olive oil, same chemistry. Cold-water organisms load up on unsaturated
tails so their membranes do not freeze stiff.

**Cholesterol.** A stiff flat molecule wedged among the tails. When hot it gets
in the way of flailing tails and firms things up; when cold it blocks the tails
from packing solid and keeps things loose. One behaviour - obstruction - helping
in both directions. A genuine buffer.
