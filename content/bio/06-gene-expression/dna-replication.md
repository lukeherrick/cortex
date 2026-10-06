---
id: bio.gene.replication
unit: bio.u-gene-expression
subject: bio
title: DNA Structure and Replication
depth: both
ced:
  - IST-1.A
prereqs:
  - bio.col.macromolecules
items:
  - id: bio.gene.replication.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "A DNA sample is 30% adenine. What percentage is guanine?"
    answer: { value: 20, unit: null, sigFigs: null }
    solution:
      - text: "A always pairs with T, and G always pairs with C. So their amounts are locked together."
      - text: "If A is 30%, then T must also be 30%."
      - text: "A and T together are 60%, which leaves 40% for G and C combined."
      - text: "G and C are equal, so each is 20%."
      - text: "These are Chargaff's rules, and they were a huge clue before the structure was known - the pairing had to be the explanation."
      - text: "Standard exam move: given one base percentage, you can always derive the other three."
    source: original
    verified: true
  - id: bio.gene.replication.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "The two strands of DNA run in opposite directions - one 5' to 3', the other 3' to 5'. Why does that matter so much?"
    answer:
      correctId: c
      options:
        - id: a
          text: It makes the helix twist
          why: "The twist comes from the geometry of the backbone and base stacking, not from the directions."
        - id: b
          text: It lets the strands separate more easily
          why: "Separation is about hydrogen bonds between bases, not about direction."
        - id: c
          text: DNA polymerase can only build in one direction, so the two strands have to be copied differently
        - id: d
          text: It doubles the information stored
          why: "The two strands are complementary, so the second carries the same information, not extra."
    solution:
      - text: "Antiparallel means the strands point opposite ways, like two lanes of traffic."
      - text: "DNA polymerase, the enzyme that builds new DNA, can only add bases to the 3' end. It builds in one direction only, 5' to 3'."
      - text: "On one template that direction happens to point toward the unzipping fork, so copying is smooth and continuous. That is the leading strand."
      - text: "On the other template the only allowed direction points AWAY from the fork."
      - text: "So that strand has to be built in short backward pieces, each started fresh as more template is exposed. Those are Okazaki fragments, and they are later joined by ligase. That is the lagging strand."
      - text: "All of that awkwardness exists purely because the enzyme has one direction and the strands have two."
    source: original
    verified: true
  - id: bio.gene.replication.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "Replication is called semi-conservative. What does that mean?"
    answer:
      correctId: b
      options:
        - id: a
          text: Only half the DNA is copied each time
          why: "All of it is copied. The word describes how the old and new strands are distributed, not how much is copied."
        - id: b
          text: Each new double helix has one original strand and one newly built strand
        - id: c
          text: The DNA is conserved and never changes
          why: "Semi-conservative describes the physical strands, not the sequence."
        - id: d
          text: Half the bases come from the old strand
          why: "Every base in a new strand is newly added. The old STRAND is kept whole, as one of the two."
    solution:
      - text: "The helix unzips into two single strands."
      - text: "Each old strand is used as a template, and a new partner is built alongside it."
      - text: "So each finished double helix is half old, half new - hence semi-conservative."
      - text: "This was tested by the Meselson-Stahl experiment, growing bacteria on heavy nitrogen and then light nitrogen, and watching the density of the DNA after each round."
      - text: "It is also why replication is so accurate: the old strand is a complete template, so the new one can be checked against it base by base."
      - text: "Combined with proofreading by the polymerase, the final error rate is roughly one mistake in a billion bases."
    source: original
    verified: true
  - id: bio.gene.replication.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "What does helicase do, and why does it need energy?"
    answer:
      correctId: a
      options:
        - id: a
          text: It unwinds the helix and breaks the hydrogen bonds between base pairs, which costs energy because those bonds are holding the strands together
        - id: b
          text: It joins nucleotides together
          why: "That is DNA polymerase. Helicase opens the structure; it does not build."
        - id: c
          text: It proofreads the new strand
          why: "Proofreading is done by DNA polymerase itself as it works."
        - id: d
          text: It seals the gaps between fragments
          why: "That is ligase, which joins the Okazaki fragments on the lagging strand."
    solution:
      - text: "The two strands are held together by hydrogen bonds between paired bases - two for A-T, three for G-C."
      - text: "Individually weak, but there are millions of them, so the helix is very stable overall."
      - text: "Helicase travels along and breaks them, separating the strands into a replication fork."
      - text: "Breaking bonds always costs energy, which is why helicase uses ATP."
      - text: "Single-strand binding proteins then hold the opened strands apart so they do not snap back together."
      - text: "Useful consequence: DNA with more G-C pairs needs more energy to separate, because each G-C has three hydrogen bonds instead of two."
    source: original
    verified: true
  - id: bio.gene.replication.i5
    tier: challenge
    type: numeric
    depth: both
    prompt: "A DNA molecule has 1200 base pairs and is 22% thymine. How many cytosine bases are in the whole double-stranded molecule?"
    answer: { value: 672, unit: null, sigFigs: null }
    solution:
      - text: "1200 base pairs means 2400 bases in total, since each pair is two bases."
      - text: "T is 22%, so A is also 22%. Together that is 44%."
      - text: "That leaves 100 - 44 = 56% for G and C combined."
      - text: "G and C are equal, so C is 28%."
      - text: "28% of 2400 bases = 0.28 x 2400 = 672 cytosines."
      - text: "The trap here is base PAIRS versus BASES. Working from 1200 instead of 2400 gives 336, exactly half the right answer."
      - text: "Always read whether a question is counting pairs or individual bases."
    source: original
    verified: true
  - id: bio.gene.replication.i6
    tier: challenge
    type: mcq
    depth: both
    prompt: "Why can't DNA polymerase start a new strand from nothing, and what gets round it?"
    answer:
      correctId: d
      options:
        - id: a
          text: It can - it starts wherever it binds
          why: "It cannot. It can only EXTEND an existing chain, which is why primers exist at all."
        - id: b
          text: It needs the strand to be fully unwound first
          why: "Replication happens at a moving fork with the helix still unwinding ahead of it."
        - id: c
          text: It needs a stop signal before it can start
          why: "There is no such requirement. The problem is at the beginning, not the end."
        - id: d
          text: It can only add to an existing 3' end, so primase first lays down a short RNA primer to give it something to build on
    solution:
      - text: "DNA polymerase adds nucleotides to the 3' end of an existing chain. It has no way to place the very first one."
      - text: "So another enzyme, primase, goes first and lays down a short RNA primer - and primase CAN start from nothing."
      - text: "DNA polymerase then extends from the primer's 3' end."
      - text: "Afterwards the RNA primers are removed and replaced with DNA, and ligase seals the joins."
      - text: "On the leading strand only one primer is needed. On the lagging strand each Okazaki fragment needs its own, so there are many."
      - text: "This limitation also creates the end-replication problem: the very end of a linear chromosome cannot be fully copied, which is why chromosomes have expendable repeated caps called telomeres that shorten with each division."
    source: original
    verified: true
  - id: bio.gene.replication.i7
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: the structure of DNA, and the main enzymes of replication with their jobs."
    answer:
      model: "DNA is a double helix of two antiparallel strands, each a backbone of alternating sugar and phosphate with bases pointing inward. Adenine pairs with thymine by two hydrogen bonds and guanine pairs with cytosine by three, so the amounts of A and T are equal and the amounts of G and C are equal. In replication, helicase unwinds the helix and breaks the hydrogen bonds, single-strand binding proteins keep the strands apart, primase lays down a short RNA primer because DNA polymerase can only extend an existing 3' end, DNA polymerase then builds the new strand 5' to 3' and proofreads as it goes, and ligase joins the Okazaki fragments on the lagging strand. The result is semi-conservative: each new helix has one original and one new strand."
      rubric:
        - "Double helix, antiparallel, sugar-phosphate backbone with bases inward"
        - "A-T with two hydrogen bonds, G-C with three"
        - "Helicase unwinds and breaks hydrogen bonds"
        - "Primase lays a primer because polymerase cannot start from nothing"
        - "Ligase joins fragments, and replication is semi-conservative"
    solution:
      - text: "Structure: a double helix, two antiparallel strands, each with a sugar-phosphate backbone on the outside and bases pointing inward."
      - text: "Pairing: A with T by two hydrogen bonds, G with C by three. Hence Chargaff's rules - A equals T and G equals C."
      - text: "Helicase - unwinds the helix and breaks the hydrogen bonds. Costs ATP."
      - text: "Single-strand binding proteins - hold the separated strands apart."
      - text: "Primase - lays down a short RNA primer, because DNA polymerase cannot start a chain from nothing."
      - text: "DNA polymerase - builds the new strand, only 5' to 3', and proofreads as it goes."
      - text: "Ligase - seals the joins between Okazaki fragments on the lagging strand."
      - text: "Overall result: semi-conservative replication, with an error rate of about one in a billion bases."
    source: original
    verified: true
---

### The structure

A **double helix** of two strands, each with a **sugar-phosphate backbone** on
the outside and **bases** pointing inward.

The strands are **antiparallel** — one runs 5'→3', the other 3'→5'. That detail
looks like trivia and turns out to drive the whole mechanism.

**Base pairing is fixed:**

| Pair | Hydrogen bonds |
|---|---|
| **A–T** | 2 |
| **G–C** | **3** |

Because pairing is fixed, **A = T and G = C** in any sample — **Chargaff's
rules**. Give me one base percentage and I can derive the other three.

> 30% A → 30% T → 60% together → 40% left for G+C → **20% G and 20% C**

G–C having three bonds matters: **DNA rich in G–C takes more energy to pull
apart.**

### Replication is semi-conservative

The helix unzips, each old strand is used as a **template**, and a new partner
is built alongside. So every finished helix is **half old, half new**.

That is what makes it so accurate — the old strand is a complete reference, so
the new one can be checked against it base by base. With proofreading, the
error rate is about **one in a billion**.

### The enzymes

| Enzyme | Job |
|---|---|
| **Helicase** | Unwinds the helix and breaks the hydrogen bonds. Costs ATP. |
| **Single-strand binding proteins** | Hold the opened strands apart |
| **Primase** | Lays down a short **RNA primer** |
| **DNA polymerase** | Builds the new strand, 5'→3' only; proofreads as it goes |
| **Ligase** | Seals the joins between fragments |

### Why there are two kinds of new strand

**DNA polymerase can only build 5'→3'.** One direction. But the templates run
*opposite* ways.

- On one template, that direction points **toward** the unzipping fork →
  smooth, continuous copying. The **leading strand**.
- On the other, the only allowed direction points **away** from the fork → it
  must be built in short backward pieces, each started fresh as more template
  appears. Those are **Okazaki fragments**, joined later by ligase. The
  **lagging strand**.

**All of that awkwardness exists purely because the enzyme has one direction
and the strands have two.**

### Why primers exist

DNA polymerase can only **extend** an existing chain — it can add to a 3' end
but cannot place the first nucleotide.

So **primase** goes first and lays a short **RNA** primer, which it *can* start
from nothing. Polymerase extends from there. The primers are later removed,
replaced with DNA, and sealed by ligase.

The leading strand needs **one** primer. The lagging strand needs one **per
fragment**.

> This same limitation causes the **end-replication problem**: the very tip of
> a linear chromosome cannot be fully copied. Hence **telomeres** — expendable
> repeated caps that shorten a little with every division.

### The counting trap

**Base pairs ≠ bases.** 1200 base pairs is **2400 bases**. Working from the
wrong one gives you exactly half the right answer, which looks plausible enough
to hand in.
