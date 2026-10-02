---
id: bio.cell.organelles
unit: bio.u-cell-structure
subject: bio
title: Organelles and Compartments
depth: both
ced:
  - IST-1.A
  - ENE-1.A
prereqs: []
items:
  - id: bio.cell.organelles.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "A cell is churning out huge amounts of a protein to be shipped outside itself - say a pancreas cell making insulin. Which organelle would you expect to find loads of?"
    answer:
      correctId: b
      options:
        - id: a
          text: Smooth endoplasmic reticulum
          why: "Smooth ER handles fats and detoxification. It has no ribosomes, so it does not build proteins."
        - id: b
          text: Rough endoplasmic reticulum
        - id: c
          text: Lysosomes
          why: "Lysosomes are the demolition crew - they break things down, not build them."
        - id: d
          text: Central vacuole
          why: "That is a plant storage structure. Animal cells have no big central vacuole."
    solution:
      - text: "Rough ER is studded with ribosomes - that is literally why it looks rough under a microscope."
      - text: "Proteins headed out of the cell get built straight into the ER, folded there, then passed to the Golgi for finishing and shipping."
      - text: "So a cell whose job is exporting protein is packed with rough ER."
      - text: "Rule of thumb that works all over this unit: a cell's job shows up in which organelles it has too many of."
    source: original
    verified: true
  - id: bio.cell.organelles.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "Heart muscle never gets to rest. Which organelle is it absolutely stuffed with, and why?"
    answer:
      correctId: a
      options:
        - id: a
          text: Mitochondria, because constant contraction burns enormous amounts of ATP
        - id: b
          text: Ribosomes, because muscle needs lots of protein
          why: "Muscle does need protein, but it is built once and then used for years. The relentless demand is energy, not construction."
        - id: c
          text: Lysosomes, because worn-out parts need recycling
          why: "Recycling happens, but it is not the dominant, non-stop cost of being a heart."
        - id: d
          text: Nuclei, because it needs more DNA instructions
          why: "Heart muscle cells do have extra nuclei, but more copies of the instructions does not supply energy."
    solution:
      - text: "Mitochondria are where most ATP gets made. ATP is the cell's spendable energy."
      - text: "A heart contracts roughly once a second for your whole life and never takes a break."
      - text: "That is a colossal, continuous energy bill, so heart muscle cells are around a third mitochondria by volume."
      - text: "Same logic, other direction: a fat storage cell barely does anything, so it has very few mitochondria."
    source: original
    verified: true
  - id: bio.cell.organelles.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "Why bother having membranes inside a cell at all? Why not one big well-mixed bag of chemistry?"
    answer:
      correctId: c
      options:
        - id: a
          text: To make the cell more rigid
          why: "Structural support comes from the cytoskeleton, and in plants the cell wall. Internal membranes are far too flimsy for that."
        - id: b
          text: To slow reactions down to a manageable speed
          why: "Compartments usually speed reactions up by concentrating things, not slow them down."
        - id: c
          text: To keep incompatible chemistry apart and concentrate reactions where they are needed
        - id: d
          text: To store genetic information
          why: "Only the nucleus does that, and it is one compartment out of many."
    solution:
      - text: "Lysosomes are full of digestive enzymes at acidic pH. Loose in the cytoplasm, they would eat the cell."
      - text: "So membranes act as walls: dangerous chemistry gets locked in its own room."
      - text: "They also concentrate things. Penning enzymes and their targets into a small volume makes collisions far more likely, so reactions run much faster."
      - text: "And they let different rooms run at different conditions - a lysosome sits near pH 5 while the cytoplasm sits near pH 7."
      - text: "This idea of separate rooms for separate jobs is called compartmentalisation, and it is the big reason eukaryotic cells can be so much more complex than bacteria."
    source: original
    verified: true
  - id: bio.cell.organelles.i4
    tier: challenge
    type: mcq
    depth: both
    prompt: "Mitochondria have their own DNA, their own ribosomes, and a double membrane. What does that strongly suggest about where they came from?"
    answer:
      correctId: b
      options:
        - id: a
          text: They are a specialised fold of the nuclear envelope
          why: "That would not explain their own separate DNA or their own ribosomes."
        - id: b
          text: They were once free-living bacteria that got engulfed and stayed
        - id: c
          text: They evolved from lysosomes that specialised in energy
          why: "Lysosomes have a single membrane and no DNA of their own. There is no route from one to the other."
        - id: d
          text: They are built fresh from scratch by the cell each generation
          why: "They cannot be. Mitochondria divide on their own, and you inherit yours from your mother's egg cell."
    solution:
      - text: "Line up the evidence. Mitochondria have circular DNA - bacteria have circular DNA, your nucleus does not."
      - text: "They have their own ribosomes, and those ribosomes look bacterial, not like yours."
      - text: "They divide by pinching in two, independently of the cell dividing."
      - text: "And they have two membranes - which is what you would get if one cell swallowed another, keeping the prey's membrane plus the bubble it was swallowed in."
      - text: "Taken together: an ancestral cell engulfed a bacterium and, instead of digesting it, kept it. The idea is called endosymbiotic theory."
      - text: "Chloroplasts tell the same story, which is why they are also double-membraned with their own DNA."
    source: original
    verified: true
  - id: bio.cell.organelles.i5
    tier: standard
    type: recall
    depth: both
    prompt: "No peeking. Trace a protein destined for export from the moment it is built to the moment it leaves the cell. Name the stops."
    answer:
      model: "A ribosome on the rough endoplasmic reticulum builds the protein straight into the ER, where it folds and gets its first modifications. It is packaged into a vesicle that buds off the ER and travels to the Golgi apparatus. The Golgi modifies it further - trimming it and often adding sugars - and sorts it, then sends it off in another vesicle. That vesicle travels to the plasma membrane, fuses with it, and spills the protein outside. The final step is exocytosis."
      rubric:
        - "Starts at a ribosome on the rough ER"
        - "Vesicle transport from ER to Golgi"
        - "Golgi modifies and sorts it"
        - "Vesicle fuses with the plasma membrane"
        - "Names the final release as exocytosis"
    solution:
      - text: "Build: a ribosome sitting on the rough ER threads the new protein into the ER as it is made."
      - text: "Fold: inside the ER it folds into shape and picks up early modifications."
      - text: "Ship: a piece of ER membrane buds off around it, making a vesicle - a little transport bubble."
      - text: "Finish: the vesicle fuses with the Golgi apparatus, which trims the protein and often adds sugar groups, then labels it for its destination."
      - text: "Deliver: another vesicle carries it to the plasma membrane, fuses with it, and the protein is released outside. Releasing cargo this way is called exocytosis."
      - text: "Worth noticing: the protein is inside a membrane-bound space the entire journey. It never floats loose in the cytoplasm, which is how the cell keeps the route controlled."
    source: original
    verified: true
---

A bacterium is basically one room. A eukaryotic cell - yours, a plant's, a
fungus's - is a building with many rooms, each walled off by its own membrane.
Those rooms are **organelles**, and the strategy of having them is called
**compartmentalisation**.

Why go to the trouble? Three reasons, and they are the answer to a lot of exam
questions:

- **Keeping incompatible chemistry apart.** Lysosomes hold enzymes that digest
  almost anything, at acidic pH. Those enzymes loose in the cytoplasm would
  destroy the cell. A membrane is the only thing standing between the two.
- **Concentrating reactions.** Shut an enzyme and its target in a small room
  and they bump into each other constantly. The same amounts spread through
  the whole cell would barely meet.
- **Running different conditions side by side.** A lysosome sits around pH 5
  while the cytoplasm next door sits near pH 7. One cell, two environments.

The organelles worth knowing cold:

| Organelle | Job |
|---|---|
| **Nucleus** | Holds the DNA; where RNA is made |
| **Ribosome** | Builds proteins |
| **Rough ER** | Ribosome-studded; builds and folds proteins for export |
| **Smooth ER** | Makes lipids; detoxifies; stores calcium |
| **Golgi apparatus** | Modifies, sorts and ships proteins |
| **Mitochondrion** | Makes most of the cell's ATP |
| **Chloroplast** | Photosynthesis (plants only) |
| **Lysosome** | Digests and recycles worn-out parts |
| **Vacuole** | Storage; in plants, also water pressure |

The single most useful habit in this unit: **a cell's job shows up in which
organelles it has too many of.** Heart muscle is crammed with mitochondria
because contracting never stops. A pancreas cell exporting insulin is crammed
with rough ER. Given an unfamiliar cell and a list of its contents, you can
usually work out what it does for a living - and that is exactly how the
question tends to be asked.
