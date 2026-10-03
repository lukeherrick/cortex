---
id: bio.col.macromolecules
unit: bio.u-chemistry-of-life
subject: bio
title: The Four Macromolecules
depth: both
ced:
  - SYI-1.B
prereqs:
  - bio.col.water-properties
items:
  - id: bio.col.macromolecules.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "Proteins, nucleic acids, carbohydrates and most lipids are all built the same way. What is the shared trick?"
    answer:
      correctId: c
      options:
        - id: a
          text: They are all built from carbon rings
          why: "Rings show up in places, but they are not the common building method. The shared trick is about how units are joined."
        - id: b
          text: They are all assembled by adding water
          why: "Backwards. Building REMOVES water; breaking down adds it."
        - id: c
          text: Small repeating units are joined into long chains, releasing a water molecule at each join
        - id: d
          text: They all contain nitrogen
          why: "Proteins and nucleic acids do. Carbohydrates and lipids generally do not."
    solution:
      - text: "Biology builds big things out of small repeated units. The units are called monomers and the result is a polymer."
      - text: "Joining two monomers works by taking an H from one and an OH from the other. Those leave together as water."
      - text: "That reaction is dehydration synthesis - literally 'building by removing water'. Also called a condensation reaction."
      - text: "Running it backwards needs a water molecule put back in to split the bond. That is hydrolysis - 'water splitting'."
      - text: "So digestion is hydrolysis, and growth is dehydration synthesis. Two reactions account for nearly all the construction and demolition in your body."
    source: original
    verified: true
  - id: bio.col.macromolecules.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "A protein chain is 150 amino acids long. How many water molecules were released while building it?"
    answer: { value: 149, unit: null, sigFigs: null }
    solution:
      - text: "Each join releases exactly one water molecule."
      - text: "So the question is really: how many joins are there in a chain of 150?"
      - text: "Think of 150 train carriages. Couplings between them: 149."
      - text: "So 149 water molecules were released, and there are 149 peptide bonds."
      - text: "The off-by-one is deliberate on exams. For n monomers you always get n - 1 bonds, never n."
    source: original
    verified: true
  - id: bio.col.macromolecules.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "Why are lipids the odd one out among the four macromolecules?"
    answer:
      correctId: b
      options:
        - id: a
          text: They contain no carbon
          why: "They are full of carbon - long carbon chains are exactly what fatty acid tails are."
        - id: b
          text: They are not true polymers - they are not built from one repeating monomer in a chain
        - id: c
          text: They are not found in cells
          why: "Every cell membrane is built from lipids. They are everywhere."
        - id: d
          text: They dissolve in water, unlike the others
          why: "The opposite - lipids are the ones that refuse to dissolve in water."
    solution:
      - text: "The other three are genuine polymers: a chain of identical-type units. Amino acids, nucleotides, monosaccharides."
      - text: "A fat is a glycerol with three fatty acids hanging off it. That is an assembly, not a repeating chain."
      - text: "So lipids get grouped with the macromolecules by size and importance rather than by structure."
      - text: "What they do share is being largely uncharged and greasy, which makes them hydrophobic - water squeezes them out."
      - text: "That single property is why they work as membranes, as long-term energy storage, and as steroid hormones."
    source: original
    verified: true
  - id: bio.col.macromolecules.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "A fat and a carbohydrate both store energy. Why does fat store more than twice as much per gram?"
    answer:
      correctId: a
      options:
        - id: a
          text: Fat's long carbon-hydrogen chains are far less oxidised, so there is more energy left to release by oxidising them
        - id: b
          text: Fat molecules are bigger
          why: "This is per gram, so size cancels out. What matters is the energy per unit mass."
        - id: c
          text: Fat is harder to digest, so it takes longer
          why: "Digestion speed is not the same as energy content. Slow does not mean more."
        - id: d
          text: Carbohydrates are not really used for energy
          why: "Glucose is the cell's main everyday fuel. It just holds less energy per gram."
    solution:
      - text: "Releasing energy from food means oxidising it - handing its electrons over to oxygen."
      - text: "So the question is how many high-energy electrons a gram of it holds."
      - text: "A fatty acid is a long chain of carbon-hydrogen bonds with almost no oxygen in it. Lots of electrons still to give."
      - text: "A carbohydrate already carries an oxygen on nearly every carbon - look at glucose, C6H12O6. It is already part-oxidised, so less is left."
      - text: "Numbers: fat gives about 9 kcal per gram, carbohydrate and protein about 4."
      - text: "Which is why long-term storage is fat and not starch. Storing the same energy as carbohydrate would mean carrying twice the weight, plus the water that carbohydrate holds onto."
    source: original
    verified: true
  - id: bio.col.macromolecules.i5
    tier: challenge
    type: mcq
    depth: both
    prompt: "A protein is boiled. It stops working and does not recover on cooling. What exactly was destroyed?"
    answer:
      correctId: c
      options:
        - id: a
          text: Its amino acids were broken apart
          why: "The amino acids survive boiling. Breaking them needs much harsher conditions than a saucepan."
        - id: b
          text: Its peptide bonds were broken, so the chain fell apart
          why: "Peptide bonds are strong covalent bonds and survive boiling. The chain stays intact."
        - id: c
          text: Its folded shape, which was held by many weak interactions rather than strong bonds
        - id: d
          text: Nothing was destroyed - it just cooled down wrong
          why: "The loss is real and permanent. A boiled egg does not un-boil."
    solution:
      - text: "A protein's function comes from its three-dimensional shape, and shape comes from how the chain folds."
      - text: "The folding is held by lots of WEAK interactions - hydrogen bonds, charge attractions, and greasy regions clustering away from water."
      - text: "Heat shakes those apart easily. The strong covalent peptide bonds holding the chain together are untouched."
      - text: "So you are left with the same chain of amino acids in the same order, with the shape gone. That is denaturation."
      - text: "The order survives but the fold does not come back, because the chain gets tangled with its neighbours on the way. A fried egg white is exactly this."
      - text: "The lesson that runs through all of biology: in a protein, sequence determines shape, and shape determines function. Lose the shape and you have lost the protein, with every atom still present."
    source: original
    verified: true
  - id: bio.col.macromolecules.i6
    tier: standard
    type: mcq
    depth: both
    prompt: "What makes one protein different from another?"
    answer:
      correctId: d
      options:
        - id: a
          text: A completely different set of chemical building blocks
          why: "Every protein in every living thing is built from the same 20 amino acids."
        - id: b
          text: The number of amino acids only
          why: "Length matters, but two proteins of identical length can be utterly different. Order matters more."
        - id: c
          text: Whether it contains nitrogen
          why: "Every amino acid contains nitrogen - it is in the amino group. All proteins have it."
        - id: d
          text: The order of its amino acids, which is what determines how it folds
    solution:
      - text: "There are only 20 amino acids, and every protein in every organism uses the same 20."
      - text: "What differs is the ORDER they are strung together in."
      - text: "Order matters because the amino acids differ chemically - some are charged, some greasy, some bulky."
      - text: "As the chain is made, those preferences pull it into a specific fold: greasy ones hide inside away from water, charged ones face out."
      - text: "So the sequence decides the fold, and the fold decides what the protein can do."
      - text: "This is also why a single DNA mutation can be catastrophic. Change one amino acid and the fold can change - sickle-cell anaemia is one substitution in haemoglobin."
    source: original
    verified: true
  - id: bio.col.macromolecules.i7
    tier: challenge
    type: numeric
    depth: both
    prompt: "A strand of DNA has 1200 nucleotides. In the complete double helix, how many hydrogen bonds hold the base pairs together, if A-T pairs use 2 and G-C pairs use 3, and the strand is 40% G-C pairs?"
    answer: { value: 2880, unit: null, sigFigs: null }
    solution:
      - text: "1200 nucleotides on one strand means 1200 base pairs in the finished double helix."
      - text: "40% are G-C: 0.40 x 1200 = 480 pairs, at 3 hydrogen bonds each."
      - text: "The other 60% are A-T: 0.60 x 1200 = 720 pairs, at 2 hydrogen bonds each."
      - text: "480 x 3 = 1440"
      - text: "720 x 2 = 1440"
      - text: "Total = 1440 + 1440 = 2880 hydrogen bonds."
      - text: "Why this matters: G-C pairs grip harder. DNA rich in G-C takes more heat to pull apart, which is genuinely used in the lab to predict melting temperatures."
    source: original
    verified: true
  - id: bio.col.macromolecules.i8
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: the four macromolecules, what each is built from, and what each is for."
    answer:
      model: "Carbohydrates are built from monosaccharides such as glucose and are used for quick energy and for structure, as in cellulose. Lipids are built from glycerol and fatty acids, are not true polymers, and are used for membranes, long-term energy storage and some hormones. Proteins are built from amino acids and do almost everything else - enzymes, transport, structure, signalling and defence. Nucleic acids are built from nucleotides and store and carry genetic information, as DNA and RNA. All except lipids are polymers assembled by dehydration synthesis, which releases a water molecule at each join, and broken down by hydrolysis, which consumes one."
      rubric:
        - "Carbohydrates: monosaccharides, energy and structure"
        - "Lipids: glycerol and fatty acids, membranes and storage, not true polymers"
        - "Proteins: amino acids, enzymes and most cellular work"
        - "Nucleic acids: nucleotides, genetic information"
        - "Mentions dehydration synthesis and hydrolysis as the shared build and break reactions"
    solution:
      - text: "Carbohydrates - monomer is a monosaccharide like glucose. Used for quick energy (starch, glycogen) and structure (cellulose, chitin)."
      - text: "Lipids - glycerol plus fatty acids, and not a true polymer. Used for membranes, long-term energy storage, and steroid hormones."
      - text: "Proteins - monomer is an amino acid, 20 of them. Used for almost everything: enzymes, transport, structure, signalling, defence."
      - text: "Nucleic acids - monomer is a nucleotide. Used to store and carry genetic information, as DNA and RNA."
      - text: "Built by dehydration synthesis - one water out per join. Broken by hydrolysis - one water in per split."
      - text: "If you remember one thing: biology makes big molecules by linking small repeated units and spitting out water. Nearly everything else is a detail on top."
    source: original
    verified: true
---

Life builds almost everything out of four families of large molecule. The
remarkable part is how few tricks it uses to do it.

### One trick builds nearly all of them

Biology takes small repeating units - **monomers** - and links them into long
chains - **polymers**.

Joining two monomers takes an **H** from one and an **OH** from the other.
Those leave together as **water**:

> **Dehydration synthesis** - building by *removing* water. Also called
> condensation.

Running it backwards needs water put *back* in to break the bond:

> **Hydrolysis** - breaking by *adding* water. Literally "water splitting".

So **digestion is hydrolysis** and **growth is dehydration synthesis**. Two
reactions account for most of the construction and demolition in your body.

**Watch the off-by-one:** n monomers give **n − 1** bonds, and release **n − 1**
water molecules. A 150-amino-acid protein has 149 peptide bonds. Exams ask this
on purpose.

### The four families

| | Monomer | Used for |
|---|---|---|
| **Carbohydrates** | Monosaccharides (glucose) | Quick energy; structure (cellulose) |
| **Lipids** | *Not a true polymer* — glycerol + fatty acids | Membranes; long-term storage; hormones |
| **Proteins** | Amino acids (20 of them) | Nearly everything else |
| **Nucleic acids** | Nucleotides | Storing and carrying genetic information |

**Lipids are the odd one out** — a fat is a glycerol with three fatty acids
attached, which is an assembly rather than a repeating chain. They are grouped
here by size and importance, not by structure. What they share is being
**uncharged and greasy**, so water squeezes them out — the hydrophobic effect
again, and the reason membranes exist at all.

### Why fat stores more energy than sugar

Releasing energy means **oxidising** food — handing its electrons to oxygen. So
what counts is how many high-energy electrons a gram holds.

A fatty acid is a long chain of **C–H bonds with almost no oxygen**: plenty
left to give. A carbohydrate like glucose (**C₆H₁₂O₆**) already carries an
oxygen on nearly every carbon — it is **part-oxidised before you start**.

> Fat: **~9 kcal/g** · Carbohydrate and protein: **~4 kcal/g**

Which is why long-term storage is fat. Storing it as carbohydrate would mean
carrying twice the weight — plus the water carbohydrate holds onto.

### Proteins: order → shape → function

Only **20** amino acids exist, and every protein in every organism uses the
same 20. What differs is **the order**.

Order matters because the amino acids differ chemically — some charged, some
greasy, some bulky. As the chain is built those preferences pull it into a
specific **fold**: greasy ones hide inside away from water, charged ones face
out.

> **Sequence determines shape. Shape determines function.**

Which is why **boiling a protein destroys it**. The fold is held by many
**weak** interactions — hydrogen bonds, charge attractions, hydrophobic
clustering — and heat shakes those apart. The strong covalent peptide bonds
survive untouched, so you still have the same chain in the same order, with the
shape gone. That is **denaturation**, and it does not reverse: a fried egg
white does not un-fry.

It is also why one mutation can be catastrophic. Sickle-cell anaemia is a
**single** amino acid substitution in haemoglobin.
