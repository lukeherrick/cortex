---
id: bio.gene.expression
unit: bio.u-gene-expression
subject: bio
title: Transcription and Translation
depth: both
ced:
  - IST-1.B
  - IST-1.C
prereqs:
  - bio.gene.replication
items:
  - id: bio.gene.expression.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "A section of mRNA is 300 nucleotides long and is entirely coding sequence. How many amino acids does it specify?"
    answer: { value: 100, unit: null, sigFigs: null }
    solution:
      - text: "The genetic code is read in groups of three nucleotides. Each group is a codon."
      - text: "One codon specifies one amino acid."
      - text: "300 / 3 = 100 amino acids."
      - text: "Why three: with four bases, groups of two would give only 16 combinations, not enough for 20 amino acids. Groups of three give 64, which is plenty."
      - text: "That spare capacity is why the code is redundant - several codons mean the same amino acid."
    source: original
    verified: true
  - id: bio.gene.expression.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "What is transcribed, and what is translated? People mix these up constantly."
    answer:
      correctId: b
      options:
        - id: a
          text: Transcription makes protein from RNA; translation makes RNA from DNA
          why: "Exactly reversed. Transcription comes first and produces RNA."
        - id: b
          text: Transcription makes RNA from DNA; translation makes protein from RNA
        - id: c
          text: Both make protein, by different routes
          why: "Only translation makes protein. Transcription produces an RNA message."
        - id: d
          text: Transcription copies DNA to DNA; translation copies RNA to RNA
          why: "DNA to DNA is replication. Neither of these steps is a same-to-same copy."
    solution:
      - text: "The names are the clue, and they are worth leaning on."
      - text: "TRANSCRIPTION is like transcribing speech - you change the medium but stay in the same language. DNA to RNA, still nucleotides."
      - text: "TRANSLATION is like translating between languages - nucleotides to amino acids, a genuinely different alphabet."
      - text: "So the flow is DNA to RNA to protein. That is the central dogma."
      - text: "Location matters too, in eukaryotes. Transcription happens in the nucleus, where the DNA is. Translation happens at a ribosome in the cytoplasm."
      - text: "Which is exactly why mRNA exists - the DNA cannot leave the nucleus, so a copy has to be sent out."
    source: original
    verified: true
  - id: bio.gene.expression.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "The DNA template strand reads 3'-TAC-5'. What is the mRNA codon, and what does it signal?"
    answer:
      correctId: a
      options:
        - id: a
          text: "AUG - the start codon, which also codes for methionine"
        - id: b
          text: "ATG - the start codon"
          why: "RNA has no thymine. Wherever DNA would pair with A, RNA uses uracil instead."
        - id: c
          text: "UAC - a stop codon"
          why: "That is just the template copied rather than complemented, and UAC is not a stop codon anyway."
        - id: d
          text: "TAC - the same sequence"
          why: "mRNA is complementary to the template, not identical, and it uses U rather than T."
    solution:
      - text: "mRNA is built complementary to the template strand, with one substitution."
      - text: "Pair each base: T pairs with A, A pairs with U (not T, because this is RNA), C pairs with G."
      - text: "3'-TAC-5' therefore gives 5'-AUG-3'."
      - text: "AUG is the start codon. Translation begins there, and it also codes for methionine - so every new protein starts with methionine, often trimmed off later."
      - text: "The single most common mistake here is writing T instead of U. RNA has uracil; DNA has thymine."
      - text: "Second most common: forgetting that mRNA is COMPLEMENTARY to the template, so it matches the other DNA strand - the coding strand - except with U for T."
    source: original
    verified: true
  - id: bio.gene.expression.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "What do tRNA molecules do, and what makes them the link between the two languages?"
    answer:
      correctId: c
      options:
        - id: a
          text: They carry the message out of the nucleus
          why: "That is mRNA's job. tRNA works at the ribosome."
        - id: b
          text: They build the ribosome
          why: "Ribosomes are built from rRNA and proteins. tRNA delivers amino acids."
        - id: c
          text: Each carries a specific amino acid and has an anticodon that base-pairs with the matching mRNA codon
        - id: d
          text: They proofread the mRNA
          why: "There is no tRNA proofreading step. Accuracy comes from the specificity of codon-anticodon pairing."
    solution:
      - text: "tRNA is the adaptor, and it is physically two things at once."
      - text: "At one end it holds a specific amino acid. At the other it has a three-base anticodon."
      - text: "The anticodon base-pairs with the matching codon on the mRNA."
      - text: "So the nucleotide language and the amino acid language are joined in a single molecule. That is the whole trick of translation."
      - text: "Example: the codon AUG is read by a tRNA with anticodon UAC, and that tRNA is carrying methionine."
      - text: "Accuracy depends on each tRNA being loaded with the RIGHT amino acid, which is done by a set of enzymes with that single job."
    source: original
    verified: true
  - id: bio.gene.expression.i5
    tier: challenge
    type: mcq
    depth: both
    prompt: "Eukaryotic mRNA is processed before it leaves the nucleus. What is spliced out, and why is that interesting?"
    answer:
      correctId: d
      options:
        - id: a
          text: The start and stop codons
          why: "Those are essential and must stay. Removing them would make the message unreadable."
        - id: b
          text: Damaged nucleotides only
          why: "Splicing removes specific sequences regardless of damage. It is editing, not repair."
        - id: c
          text: The entire non-coding DNA of the genome
          why: "Splicing acts on one transcript, not the genome, and only on sequences within that gene."
        - id: d
          text: Introns are removed and the remaining exons joined - and because exons can be joined in different combinations, one gene can produce several different proteins
    solution:
      - text: "A eukaryotic gene is interrupted. Coding stretches - exons - are separated by non-coding stretches - introns."
      - text: "The whole thing is transcribed, then the introns are cut out and the exons joined. That is splicing."
      - text: "A cap and a poly-A tail are also added, which protect the message and help the ribosome find it."
      - text: "Now the interesting part: the exons do not have to be joined the same way every time."
      - text: "Alternative splicing means one gene can yield several different proteins depending on which exons are kept."
      - text: "This is a large part of why humans manage enormous complexity with only around 20000 genes - far fewer than people expected before the genome was sequenced."
      - text: "Prokaryotes have no introns and no nucleus, so they translate while still transcribing. Eukaryotes cannot, which is exactly why the processing step exists."
    source: original
    verified: true
  - id: bio.gene.expression.i6
    tier: challenge
    type: numeric
    depth: both
    prompt: "A gene has 1800 nucleotides of coding sequence in the DNA. Allowing for the stop codon, how many amino acids are in the finished protein?"
    answer: { value: 599, unit: null, sigFigs: null }
    solution:
      - text: "1800 nucleotides divided by 3 gives 600 codons."
      - text: "But one of those is the stop codon, and a stop codon does not code for an amino acid - it just ends translation."
      - text: "So 600 - 1 = 599 amino acids."
      - text: "This off-by-one is deliberately tested. The question is whether you remember that stop codons code for nothing."
      - text: "Three codons act as stop: UAA, UAG and UGA. None of them has a tRNA."
      - text: "Translation ends when a release factor binds the stop codon instead of a tRNA, and the finished chain is let go."
    source: original
    verified: true
  - id: bio.gene.expression.i7
    tier: standard
    type: mcq
    depth: both
    prompt: "The genetic code is described as redundant but not ambiguous. What does that mean?"
    answer:
      correctId: b
      options:
        - id: a
          text: Some codons have no meaning at all
          why: "Every one of the 64 codons means something - either an amino acid or stop."
        - id: b
          text: Several codons can specify the same amino acid, but each codon specifies only one amino acid
        - id: c
          text: Each codon can mean different things in different organisms
          why: "The code is nearly universal - the same codons mean the same amino acids from bacteria to humans."
        - id: d
          text: The code can be read in either direction
          why: "It is read in one direction only, 5' to 3'."
    solution:
      - text: "There are 64 codons and only 20 amino acids, so there is spare capacity."
      - text: "Redundant means several codons map to the same amino acid. Leucine has six."
      - text: "Not ambiguous means the reverse is never true - a given codon always means exactly one thing."
      - text: "So you can go from codon to amino acid with certainty, but not backwards from amino acid to codon."
      - text: "Redundancy is protective. Many mutations in the third base of a codon change nothing at all, because the alternatives often code for the same amino acid. Those are silent mutations."
      - text: "And the code being nearly universal across all life is strong evidence of common ancestry - it is also why a human gene can be inserted into bacteria to make insulin."
    source: original
    verified: true
  - id: bio.gene.expression.i8
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: trace the path from a gene to a finished protein."
    answer:
      model: "In transcription, RNA polymerase binds the promoter and builds a complementary RNA copy of the template strand, using uracil in place of thymine. In eukaryotes this pre-mRNA is then processed: introns are spliced out and exons joined, a cap is added at one end and a poly-A tail at the other. The mature mRNA leaves the nucleus and binds a ribosome. In translation, the ribosome reads the mRNA in codons of three bases starting at AUG, and for each codon a tRNA carrying the matching anticodon delivers its specific amino acid, which is joined to the growing chain by a peptide bond. This continues until a stop codon is reached, where a release factor ends the process and the chain is released to fold into its functional shape."
      rubric:
        - "Transcription: RNA polymerase makes a complementary RNA copy, U replacing T"
        - "Processing: introns spliced out, cap and poly-A tail added"
        - "mRNA travels to a ribosome in the cytoplasm"
        - "Translation: codons read in threes from AUG, tRNA anticodons deliver amino acids"
        - "A stop codon ends it and the chain folds"
    solution:
      - text: "Transcription. RNA polymerase binds the promoter and unwinds the DNA."
      - text: "It builds an RNA strand complementary to the template, using uracil wherever thymine would go."
      - text: "Processing, in eukaryotes only. Introns are spliced out and exons joined; a cap goes on one end and a poly-A tail on the other."
      - text: "The mature mRNA leaves the nucleus through a pore and finds a ribosome."
      - text: "Translation. The ribosome reads the mRNA three bases at a time, starting at AUG."
      - text: "For each codon, a tRNA with the matching anticodon arrives carrying its specific amino acid, which is joined to the chain by a peptide bond."
      - text: "At a stop codon no tRNA fits. A release factor binds instead and the finished chain is released."
      - text: "The chain then folds into its three-dimensional shape, and the shape is what determines what the protein can do."
    source: original
    verified: true
---

> **DNA → RNA → protein**

This is the **central dogma**, and the two arrows have names that are worth
leaning on:

- **Transcription** — like transcribing speech. You change the **medium** but
  stay in the **same language**: DNA → RNA, still nucleotides.
- **Translation** — like translating between languages. Nucleotides → amino
  acids, a genuinely different alphabet.

In eukaryotes, transcription happens in the **nucleus** (where the DNA is) and
translation at a **ribosome** in the cytoplasm. **That split is the reason mRNA
exists** — DNA cannot leave the nucleus, so a copy has to be sent out.

### Transcription

RNA polymerase binds the **promoter**, unwinds the DNA, and builds an RNA strand
**complementary to the template**, with one substitution:

> **RNA uses uracil (U) wherever DNA would use thymine (T).**

> Template `3'-TAC-5'` → mRNA `5'-AUG-3'`

Writing T instead of U is the single most common error in this whole unit.

### Processing (eukaryotes only)

A eukaryotic gene is **interrupted**: coding stretches (**exons**) separated by
non-coding ones (**introns**). The whole thing is transcribed, then:

- **Introns spliced out**, exons joined
- A **cap** added at one end, a **poly-A tail** at the other

And here is the interesting bit: **the exons do not have to be joined the same
way every time.** **Alternative splicing** lets one gene produce several
different proteins — a large part of how humans manage such complexity with
only about **20,000 genes**.

> Prokaryotes have no nucleus and no introns, so they translate *while still
> transcribing*. Eukaryotes can't — which is exactly why processing exists.

### The code

Read in **codons** of three bases. Four bases in groups of three gives **64**
combinations — plenty for 20 amino acids. (Groups of two would give only 16:
not enough.)

> 300 coding nucleotides ÷ 3 = **100 amino acids**

- **AUG** — start codon, and also codes for methionine, so every new protein
  starts with it
- **UAA, UAG, UGA** — stop. **These code for no amino acid at all.**

That last point is an exam favourite: 1800 nucleotides = 600 codons = **599
amino acids**, because one codon is stop.

**Redundant but not ambiguous:**

- **Redundant** — several codons can mean the same amino acid (leucine has six)
- **Not ambiguous** — but each codon means exactly **one** thing

So codon → amino acid is certain; amino acid → codon is not.

Redundancy is **protective**: many mutations in a codon's third base change
nothing, because the alternatives often code for the same amino acid. Those are
**silent mutations**.

And the code is **nearly universal** — the same codons mean the same things in
bacteria and in you. That is strong evidence of common ancestry, and it is why
a human gene can be put into bacteria to manufacture insulin.

### Translation

The ribosome reads the mRNA from AUG onward. For each codon, a **tRNA** arrives
— and tRNA is the adaptor that makes the whole thing possible, because it is
**two things at once**:

- One end holds a **specific amino acid**
- The other end has a three-base **anticodon** that pairs with the codon

> Codon **AUG** ← read by tRNA with anticodon **UAC**, carrying **methionine**

Each amino acid is joined to the chain by a **peptide bond**. At a stop codon
**no tRNA fits** — a **release factor** binds instead and the finished chain is
let go, to fold into the shape that determines what it can do.
