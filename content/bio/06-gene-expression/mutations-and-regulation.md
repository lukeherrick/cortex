---
id: bio.gene.mutations
unit: bio.u-gene-expression
subject: bio
title: Mutations and Gene Regulation
depth: both
ced:
  - IST-2.A
  - IST-2.B
prereqs:
  - bio.gene.expression
items:
  - id: bio.gene.mutations.i1
    tier: standard
    type: mcq
    depth: both
    prompt: "A single base is deleted near the start of a gene. Why is that usually far worse than a single base being substituted?"
    answer:
      correctId: c
      options:
        - id: a
          text: Because the protein ends up one amino acid shorter
          why: "If only. A deletion does not just remove one amino acid - it changes how everything after it is read."
        - id: b
          text: Because deletions damage the DNA backbone permanently
          why: "The backbone is repaired. The problem is the reading frame, not the physical structure."
        - id: c
          text: Because the reading frame shifts, so every codon after the deletion is read wrongly
        - id: d
          text: Because deletions always remove a stop codon
          why: "They may or may not. The general and far more serious effect is the frameshift."
    solution:
      - text: "The message is read in fixed groups of three, from a fixed starting point."
      - text: "Remove one base and everything downstream shifts along by one, so the groupings are all different."
      - text: "Take THE CAT ATE THE RAT, delete the C, and you get THE ATA TET HER AT. Every word after the deletion is nonsense."
      - text: "So one deleted base can ruin the entire rest of the protein, not just one amino acid."
      - text: "It also usually creates a premature stop codon by chance, truncating the protein early."
      - text: "A substitution, by contrast, changes at most one amino acid - and often none at all, if the code's redundancy absorbs it."
      - text: "Exception worth knowing: deleting THREE bases removes one whole codon and keeps the frame intact. Much less damaging, which is why insertions and deletions in multiples of three are tolerated far better."
    source: original
    verified: true
  - id: bio.gene.mutations.i2
    tier: warmup
    type: mcq
    depth: both
    prompt: "A base substitution changes a codon from UCU to UCC. Both code for serine. What kind of mutation is this?"
    answer:
      correctId: a
      options:
        - id: a
          text: Silent - the protein is completely unchanged
        - id: b
          text: Missense - a different amino acid is used
          why: "Both codons specify serine, so the amino acid is identical. Nothing changed in the protein."
        - id: c
          text: Nonsense - a stop codon was created
          why: "UCC is not a stop codon. The stops are UAA, UAG and UGA."
        - id: d
          text: Frameshift
          why: "A substitution swaps one base for another. The length is unchanged, so the frame is unaffected."
    solution:
      - text: "UCU and UCC both code for serine, so the finished protein is identical."
      - text: "That is a silent mutation - the DNA changed and nothing downstream did."
      - text: "This happens often because the code is redundant, and especially at the THIRD base of a codon, where alternatives frequently mean the same thing."
      - text: "The three substitution outcomes worth naming: silent (same amino acid), missense (different amino acid), nonsense (an early stop codon)."
      - text: "Nonsense is usually the most damaging of the three, because the protein is cut short and generally useless."
    source: original
    verified: true
  - id: bio.gene.mutations.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "Sickle-cell anaemia comes from a single base substitution in the haemoglobin gene. How does one amino acid cause so much trouble?"
    answer:
      correctId: b
      options:
        - id: a
          text: It removes a large part of the protein
          why: "The protein is complete and full length. Exactly one amino acid differs."
        - id: b
          text: A water-loving amino acid is replaced by a greasy one, so haemoglobin molecules stick to each other and the cell distorts
        - id: c
          text: It stops haemoglobin being made at all
          why: "Plenty is made. It is made wrong, which is a different and in some ways more interesting problem."
        - id: d
          text: It changes the iron atom
          why: "The iron is unaffected. The change is in the protein chain around it."
    solution:
      - text: "One codon changes, so glutamic acid is replaced by valine at a single position."
      - text: "Glutamic acid is charged and sits happily on the protein's water-facing surface. Valine is greasy."
      - text: "Now there is a greasy patch on the outside of a molecule surrounded by water."
      - text: "Water pushes greasy things together, so haemoglobin molecules stick to each other and form long rigid fibres."
      - text: "Those fibres bend the red blood cell into a stiff sickle shape that jams in capillaries."
      - text: "This is the standard example of sequence determining shape and shape determining function - and of how little has to change for that chain to break."
      - text: "There is a twist: carrying one copy gives resistance to malaria, which is why the allele stayed common in regions where malaria is."
    source: original
    verified: true
  - id: bio.gene.mutations.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "A skin cell and a neuron have exactly the same DNA. Why are they so completely different?"
    answer:
      correctId: d
      options:
        - id: a
          text: They have different genes
          why: "They have the same genes - the same genome, copied by mitosis from the same fertilised egg."
        - id: b
          text: The neuron lost genes it does not need
          why: "Genes are not discarded. A neuron still carries the genes for skin proteins; it simply never reads them."
        - id: c
          text: Mutations made them different
          why: "Some mutations accumulate, but they are not what makes a neuron a neuron. The difference is systematic, not random."
        - id: d
          text: They express different subsets of the same genes - different genes are switched on in each
    solution:
      - text: "Every cell in your body descends from one fertilised egg by mitosis, so they all carry the same DNA."
      - text: "What differs is which genes are being READ."
      - text: "A neuron transcribes the genes for neurotransmitter receptors and ion channels. A skin cell transcribes keratin genes."
      - text: "Both still carry the other's genes - they are simply silent."
      - text: "This is differential gene expression, and it is how one genome builds hundreds of cell types."
      - text: "It is also why stem cell and cloning research is possible at all: the information for every cell type is still present in every cell, just switched off."
    source: original
    verified: true
  - id: bio.gene.mutations.i5
    tier: challenge
    type: mcq
    depth: both
    prompt: "E. coli only makes lactose-digesting enzymes when lactose is present. Why would always making them be a bad strategy?"
    answer:
      correctId: a
      options:
        - id: a
          text: Making proteins costs energy and materials, so producing enzymes for an absent food is pure waste
        - id: b
          text: The enzymes would damage the cell
          why: "They are harmless when idle. The cost is wasted resources, not toxicity."
        - id: c
          text: There is not enough room in the cell
          why: "Space is not the limiting factor. Energy and materials are."
        - id: d
          text: The enzymes would digest the bacterium itself
          why: "They act on lactose specifically, and bacteria are not made of lactose."
    solution:
      - text: "Every protein costs ATP and amino acids to build. A bacterium competing for resources cannot afford waste."
      - text: "Enzymes for a sugar that is not there do nothing but consume those resources."
      - text: "So the lac operon keeps them switched off by default. A repressor protein sits on the DNA and blocks transcription."
      - text: "When lactose appears it binds the repressor and changes its shape so it falls off the DNA. Transcription starts and the enzymes are made."
      - text: "When lactose runs out, the repressor returns and the genes switch off again."
      - text: "Notice the elegance: the sugar itself is the signal that it has arrived. No sensing system is needed beyond the repressor's shape."
      - text: "This is the standard example of prokaryotic gene regulation, and it was the first gene control system ever worked out."
    source: original
    verified: true
  - id: bio.gene.mutations.i6
    tier: challenge
    type: numeric
    depth: both
    prompt: "A protein is 450 amino acids long. A nonsense mutation creates a stop codon at codon 60. How many amino acids does the truncated protein have?"
    answer: { value: 59, unit: null, sigFigs: null }
    solution:
      - text: "A stop codon at position 60 means translation stops when it reaches codon 60."
      - text: "A stop codon codes for no amino acid, so codon 60 contributes nothing."
      - text: "That leaves codons 1 to 59, so 59 amino acids."
      - text: "The protein is about 13% of its proper length, and almost certainly useless."
      - text: "This is why nonsense mutations are generally the most damaging substitution. The protein is not slightly wrong - it is barely built."
      - text: "The same off-by-one appears here as everywhere else with stop codons: the stop position itself is not counted."
    source: original
    verified: true
  - id: bio.gene.mutations.i7
    tier: ap
    type: frq
    depth: both
    prompt: "A mutation in a single base of a gene produces no change in the protein at all. A different single-base mutation in the same gene destroys the protein's function completely. Explain how both are possible, and describe one way a mutation outside the coding sequence could still change the amount of protein made."
    answer:
      model: "A mutation producing no change is a silent mutation: because the genetic code is redundant, several codons specify the same amino acid, so a substitution - especially in the third base of a codon - often gives a codon meaning the same amino acid. A mutation destroying function could be a nonsense mutation creating a premature stop codon, which truncates the protein, or a missense mutation at a critical site such as the active site of an enzyme, where changing one amino acid alters the folding or the chemistry enough to stop it working. A mutation outside the coding sequence can still matter because gene expression depends on regulatory sequences: a mutation in the promoter could stop RNA polymerase binding properly, reducing or abolishing transcription, while a mutation in a repressor binding site could prevent the gene being switched off, so far more protein is produced than normal."
      rubric:
        - "1 point: explains silent mutations using the redundancy of the code"
        - "1 point: notes third-base substitutions are often silent"
        - "1 point: gives a mechanism for loss of function, such as nonsense or active-site missense"
        - "1 point: identifies a regulatory sequence such as a promoter or repressor binding site"
        - "1 point: explains the effect on the amount of protein transcribed"
    solution:
      - text: "Start with the no-change case. The code has 64 codons for 20 amino acids, so there is redundancy."
      - text: "Several codons mean the same amino acid, and the alternatives usually differ in the third base."
      - text: "So a third-base substitution often produces a codon meaning exactly the same thing. The protein is identical. Silent mutation."
      - text: "Now the destructive case, and there are two good answers."
      - text: "Nonsense: the substitution creates a stop codon early. Translation halts and the protein is truncated and useless."
      - text: "Or missense at a critical position: one amino acid changes somewhere that matters, such as an enzyme's active site, and the folding or chemistry is wrecked. Sickle-cell is this kind."
      - text: "Position is everything for missense - the same substitution on a harmless surface loop might do nothing at all."
      - text: "Now outside the coding sequence. Genes have regulatory DNA that controls whether and how much they are read."
      - text: "A promoter mutation could stop RNA polymerase binding well, so less mRNA is made and therefore less protein - even though the protein itself would be perfect."
      - text: "Or a mutation in a repressor binding site could stop the gene being switched OFF, so it is transcribed constantly and far too much protein is made."
      - text: "The transferable point: a gene's output depends on its coding sequence AND on its control sequences. Breaking either changes the outcome, in completely different ways."
    source: original
    verified: true
---

### Mutation types, and why position matters more than size

**Substitution** — one base swapped. Three possible outcomes:

| Type | What happens | Severity |
|---|---|---|
| **Silent** | Same amino acid (redundancy absorbs it) | None |
| **Missense** | Different amino acid | Depends entirely on **where** |
| **Nonsense** | Creates an early **stop** codon | Usually severe |

Silent mutations are common at the **third base** of a codon, where
alternatives often mean the same thing.

**Missense severity is all about position.** The same swap might do nothing on
a surface loop and destroy an enzyme at its active site.

### Frameshifts — why one deleted base is worse than one swapped base

The message is read in **fixed groups of three from a fixed start**. Delete one
base and **everything downstream shifts**:

> THE CAT ATE THE RAT
> delete the C →
> THE ATA TET HER AT

**Every word after the deletion is nonsense.** One base can ruin the entire
rest of the protein, and usually creates a premature stop by chance too.

> **Exception:** inserting or deleting **three** bases removes a whole codon
> and **keeps the frame**. Far less damaging — which is why indels in multiples
> of three are tolerated much better.

### Sickle-cell: one amino acid

A single substitution swaps **glutamic acid** (charged, happy on a water-facing
surface) for **valine** (greasy).

Now there is a greasy patch on the outside of a molecule surrounded by water.
Water pushes greasy things together — **the hydrophobic effect again** — so
haemoglobin molecules stick into long rigid fibres that bend the cell into a
stiff sickle.

> **Sequence → shape → function.** And how little has to change to break the
> chain.

There is a twist: one copy gives **resistance to malaria**, which is why the
allele stayed common where malaria is.

### Gene regulation: same DNA, different cells

A skin cell and a neuron have **identical DNA**. Both descend by mitosis from
one fertilised egg.

What differs is **which genes are read**. A neuron transcribes ion-channel
genes; a skin cell transcribes keratin genes. **Both still carry the other's
genes — simply silent.**

This is **differential gene expression**, and it is how one genome builds
hundreds of cell types. It is also why stem cell and cloning research is
possible at all: the information for every cell type is still in every cell.

### The lac operon

*E. coli* only makes lactose-digesting enzymes when lactose is present. Making
them constantly would waste **ATP and amino acids** on enzymes for an absent
food — and a bacterium competing for resources cannot afford that.

So:

- **No lactose** → a **repressor** protein sits on the DNA and blocks
  transcription
- **Lactose present** → it **binds the repressor**, changing its shape so it
  falls off → transcription starts
- **Lactose gone** → the repressor returns → genes off again

The elegant part: **the sugar itself is the signal that it has arrived.** No
separate sensing system is needed beyond the repressor's shape.

### Mutations outside the coding sequence still matter

A gene's output depends on its **coding sequence** *and* its **control
sequences**:

- A **promoter** mutation can stop RNA polymerase binding well → **less** mRNA,
  less protein, even though the protein itself would be perfect
- A **repressor binding site** mutation can stop the gene being switched **off**
  → transcribed constantly, **far too much** protein

Break either, and you change the outcome — in completely different ways.
