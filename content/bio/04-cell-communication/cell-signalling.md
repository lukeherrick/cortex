---
id: bio.comm.signalling
unit: bio.u-cell-communication
subject: bio
title: Cell Signalling
depth: both
ced:
  - IST-3.A
prereqs:
  - bio.cell.membrane-structure
items:
  - id: bio.comm.signalling.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "Every signalling pathway, in every organism, has the same three stages. What are they?"
    answer:
      correctId: b
      options:
        - id: a
          text: Production, transport, destruction
          why: "That describes the signal's own lifecycle. The three stages describe what happens in the RECEIVING cell."
        - id: b
          text: Reception, transduction, response
        - id: c
          text: Binding, copying, dividing
          why: "Dividing is one possible response among many. Most signals do not cause division at all."
        - id: d
          text: Diffusion, absorption, excretion
          why: "Those are transport processes. A signal is not absorbed and used up - it is detected."
    solution:
      - text: "Reception: the signal molecule binds to a receptor protein. Nothing enters the cell at this stage - the receptor simply detects it."
      - text: "Transduction: binding changes the receptor's shape, which starts a chain of changes inside the cell, usually a relay of proteins switching each other on."
      - text: "Response: the end of the relay does something - switches a gene on, activates an enzyme, opens a channel, moves the cell."
      - text: "This pattern is universal. Bacteria use it, your neurons use it, plants use it."
      - text: "It is worth holding because almost every exam question on this unit is really asking you which of the three stages something belongs to."
    source: original
    verified: true
  - id: bio.comm.signalling.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "Insulin is a protein and cannot cross the membrane. Testosterone is a steroid and passes straight through. Where does each one's receptor sit?"
    answer:
      correctId: c
      options:
        - id: a
          text: Both have receptors inside the cell
          why: "Insulin cannot get in. A receptor inside the cell would be useless to a signal that never reaches it."
        - id: b
          text: Both have receptors on the surface
          why: "Testosterone sails through the membrane easily, so it does not need a surface receptor and does not use one."
        - id: c
          text: Insulin's is on the cell surface; testosterone's is inside the cell
        - id: d
          text: It depends on the cell, not on the signal
          why: "It is decided by the signal's chemistry. A protein cannot cross a greasy membrane no matter which cell it meets."
    solution:
      - text: "The membrane's middle is greasy and uncharged. Whether a signal can cross decides where its receptor has to be."
      - text: "Insulin is a protein - large, charged and water-loving. It cannot pass. So its receptor sits in the membrane with a part sticking out to catch it."
      - text: "The message then has to be relayed inward by the receptor changing shape. The signal itself never enters."
      - text: "Testosterone is a steroid - greasy and uncharged. It dissolves straight through the membrane."
      - text: "So its receptor waits inside, and the hormone-receptor pair then goes to the DNA and switches genes on directly."
      - text: "This is why steroid effects are slow but long-lasting - they work by changing which genes are being read - while protein hormones act within seconds."
    source: original
    verified: true
  - id: bio.comm.signalling.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "In a signalling cascade, each activated enzyme switches on 100 of the next kind. After three such steps, how many final enzymes are active from a single signal molecule?"
    answer: { value: 1000000, unit: null, sigFigs: null }
    solution:
      - text: "One signal activates one receptor."
      - text: "Step 1: that activates 100 enzymes."
      - text: "Step 2: each of those 100 activates 100 more, giving 10000."
      - text: "Step 3: each of those 10000 activates 100 more, giving 1000000."
      - text: "100 x 100 x 100 = 10^6. One million from one molecule."
      - text: "This is signal amplification, and it is why hormones work at vanishingly small concentrations. A few molecules in your bloodstream can rewire a whole cell's behaviour."
      - text: "It also explains why cascades have several steps rather than one. Each step is another multiplication."
    source: original
    verified: true
  - id: bio.comm.signalling.i4
    tier: challenge
    type: mcq
    depth: both
    prompt: "Adrenaline reaches liver cells and heart cells at the same time. The liver releases glucose; the heart beats faster. Same signal, different responses. How?"
    answer:
      correctId: d
      options:
        - id: a
          text: The adrenaline molecules are slightly different
          why: "It is one molecule, identical everywhere in the bloodstream."
        - id: b
          text: The heart receives more of it
          why: "Concentration changes how strongly a cell responds, not what the response IS."
        - id: c
          text: The liver takes the signal in while the heart does not
          why: "Neither takes it in. Adrenaline binds surface receptors on both."
        - id: d
          text: The cells have different proteins downstream, so the same binding event triggers different machinery
    solution:
      - text: "The signal is identical. What differs is what each cell has available to respond with."
      - text: "A liver cell is stocked with enzymes for breaking down glycogen, so its cascade ends by releasing glucose."
      - text: "A heart muscle cell has different proteins, so its cascade ends by changing the rate of contraction."
      - text: "Same key, different locks and different machinery behind each lock."
      - text: "This is a huge idea for the whole unit: a signal does not carry an instruction. It carries an alert, and the cell decides what that means."
      - text: "It is also why one hormone can coordinate an entire body response. Adrenaline says 'emergency' and every tissue does its own version of reacting."
    source: original
    verified: true
  - id: bio.comm.signalling.i5
    tier: standard
    type: mcq
    depth: both
    prompt: "What is a second messenger, and why bother with one?"
    answer:
      correctId: a
      options:
        - id: a
          text: A small molecule like cyclic AMP, made inside the cell when a receptor is activated, which spreads the message fast and in all directions
        - id: b
          text: A backup signal sent if the first one fails
          why: "It is not a backup. It is the next link in the chain, made every time."
        - id: c
          text: The second hormone released by a gland
          why: "Second messengers are made inside the receiving cell, not released by a gland. The hormone is the first messenger."
        - id: d
          text: A receptor that activates after the first one
          why: "A second messenger is a small molecule, not a protein receptor."
    solution:
      - text: "The hormone outside is the first messenger. It cannot get in, so its message must be re-expressed inside."
      - text: "The activated receptor triggers production of a small molecule inside - often cyclic AMP, made from ATP."
      - text: "That small molecule is the second messenger, and it diffuses rapidly through the whole cytoplasm."
      - text: "Two advantages. It is fast, because small molecules diffuse quickly. And it reaches everywhere at once, so one receptor at the surface can affect the whole cell."
      - text: "It also amplifies - one receptor can cause thousands of cAMP molecules to be made."
      - text: "Calcium ions are the other common second messenger, which is why cells work so hard to keep internal calcium extremely low - so that releasing a little is a loud signal."
    source: original
    verified: true
  - id: bio.comm.signalling.i6
    tier: challenge
    type: mcq
    depth: both
    prompt: "Why does a signalling pathway need a way to switch OFF, and what happens if it cannot?"
    answer:
      correctId: b
      options:
        - id: a
          text: It does not - signals simply run out
          why: "The signal outside runs out, but the activated proteins inside stay activated unless something resets them."
        - id: b
          text: Without shut-off the cell would stay switched on permanently, unable to detect anything new - and permanent growth signalling is one route to cancer
        - id: c
          text: To save energy only
          why: "Energy is a minor consideration. The real problem is that a stuck-on pathway is both deaf to new information and dangerous."
        - id: d
          text: To stop the receptor wearing out
          why: "Receptors are replaced routinely. The issue is the state of the pathway, not wear."
    solution:
      - text: "A signal's value is in the CHANGE it reports. A permanently-on pathway reports nothing, because it can no longer go up."
      - text: "So every step has a reversal: enzymes that chop up cAMP, phosphatases that strip off the phosphates that switched proteins on, receptors pulled inside and recycled."
      - text: "If the off switch fails, the cell behaves as though the signal is present forever."
      - text: "When the stuck signal is a growth instruction, the cell divides continuously without being told to. That is a major route to cancer."
      - text: "The ras protein is the classic case - a relay switch that is mutated to be permanently on in roughly 30% of human cancers."
      - text: "So shutting off is not housekeeping. It is as important as switching on."
    source: original
    verified: true
  - id: bio.comm.signalling.i7
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: the three stages of signalling, and what decides whether a receptor sits on the surface or inside the cell."
    answer:
      model: "Reception is the signal binding to a receptor protein. Transduction is the relay of changes inside the cell, usually proteins switching each other on in a cascade, often using a second messenger such as cyclic AMP. Response is the final effect, such as a gene being switched on or an enzyme activated. Where the receptor sits is decided by the signal's chemistry: a large or charged signal like a protein hormone cannot cross the greasy membrane, so its receptor must be on the surface and the message is relayed inward, while a small greasy signal like a steroid passes straight through and binds a receptor inside the cell, usually going on to affect the DNA directly."
      rubric:
        - "Reception: signal binds a receptor"
        - "Transduction: a relay or cascade inside the cell"
        - "Response: the final cellular effect"
        - "Surface receptors for signals that cannot cross the membrane"
        - "Intracellular receptors for small greasy signals such as steroids"
    solution:
      - text: "Reception - the signal binds its receptor. Highly specific, because the shapes must match."
      - text: "Transduction - a relay inside the cell. Usually proteins switching each other on, often via a second messenger like cAMP, and amplifying at every step."
      - text: "Response - the end result. A gene switched on, an enzyme activated, a channel opened, the cell moving."
      - text: "Receptor location is decided by the SIGNAL's chemistry, not the cell's preference."
      - text: "Large or charged signals - protein hormones, neurotransmitters - cannot cross the greasy membrane, so the receptor sits in the membrane and relays inward."
      - text: "Small greasy signals - steroids like testosterone and oestrogen - pass straight through and meet a receptor inside, then usually act on the DNA directly."
      - text: "Which is why steroid effects are slow and lasting, while surface-receptor effects can happen in milliseconds."
    source: original
    verified: true
---

Cells are constantly talking. Every signalling system ever found — bacterial,
plant, human — uses **the same three stages**.

> **Reception → Transduction → Response**

1. **Reception** — the signal molecule binds a **receptor protein**. Nothing
   enters the cell; the receptor just detects it. Highly specific, because the
   shapes have to match.
2. **Transduction** — binding changes the receptor's shape, starting a relay of
   changes inside: proteins switching each other on, usually by adding
   phosphates.
3. **Response** — the end of the relay does something. A gene switched on, an
   enzyme activated, a channel opened.

Most exam questions on this unit are really asking **which of the three stages**
something belongs to.

### Where the receptor sits is decided by the signal's chemistry

You already know the membrane's middle is greasy and uncharged. That single
fact splits all signalling in two:

| Signal | Can it cross? | Receptor | Speed |
|---|---|---|---|
| **Protein hormones** (insulin), neurotransmitters | **No** — large and charged | **On the surface** | Seconds |
| **Steroids** (testosterone, oestrogen) | **Yes** — small and greasy | **Inside the cell** | Hours, but lasting |

A surface receptor must **relay** the message inward — the signal itself never
gets in. A steroid walks in, meets its receptor, and the pair usually goes
straight to the **DNA** to switch genes on. That is why steroid effects are
slow to start and long to fade.

### Amplification is the point of a cascade

If each step activates 100 of the next:

> 1 signal → 100 → 10,000 → **1,000,000**

**One million responders from one molecule.** This is why hormones work at
concentrations too small to taste, and why cascades have several steps instead
of one — **each step is another multiplication.**

**Second messengers** do the same job with small molecules. An activated
receptor triggers production of **cyclic AMP** (from ATP) or releases
**calcium** — these diffuse fast and reach everywhere at once, so one receptor
at the surface can affect the whole cell.

> Cells keep internal calcium *extremely* low precisely so that releasing a
> little is a loud signal.

### Same signal, different answer

Adrenaline hits your liver and your heart at the same moment. The liver dumps
glucose; the heart speeds up. **Same molecule, same receptors, different
results** — because the two cells have **different proteins downstream**.

> A signal does not carry an instruction. It carries an **alert**, and each
> cell decides what that means.

Which is exactly how one hormone coordinates a whole-body response: adrenaline
says *"emergency"* and every tissue does its own version of reacting.

### Switching off matters as much as switching on

A signal's value is in the **change** it reports. A permanently-on pathway
reports nothing.

So every step has a reversal — enzymes that destroy cAMP, phosphatases that
strip the activating phosphates off, receptors pulled inside and recycled.

When the off switch fails on a **growth** signal, the cell divides without
being told to. The **ras** protein — a relay switch stuck permanently on — is
mutated in roughly **30% of human cancers**.
