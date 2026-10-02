---
id: bio.energy.atp
unit: bio.u-energetics
subject: bio
title: ATP and Energy Coupling
depth: both
ced:
  - ENE-1.C
prereqs:
  - bio.cell.organelles
items:
  - id: bio.energy.atp.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "ATP is often called the cell's energy currency rather than its energy storage. Why currency and not storage?"
    answer:
      correctId: b
      options:
        - id: a
          text: Because it holds more energy than fat or glucose
          why: "It holds far less. A gram of fat stores vastly more energy than a gram of ATP."
        - id: b
          text: Because it is spent almost immediately after being made - cells keep only seconds' worth
        - id: c
          text: Because only animal cells use it
          why: "Every known living thing runs on ATP, including plants and bacteria."
        - id: d
          text: Because it cannot be remade once used
          why: "It is recycled constantly. The same ADP is rephosphorylated over and over, thousands of times a day."
    solution:
      - text: "You carry about 250 grams of ATP at any moment, and burn through roughly your own body weight in it per day."
      - text: "That is only possible because it is recycled, not stockpiled - a molecule of ADP is rebuilt into ATP within seconds."
      - text: "Long-term energy goes into fat and glycogen. Those are the savings account."
      - text: "ATP is the cash in your pocket: small amount, constantly circulating, immediately spendable."
      - text: "Which is why a cell cut off from oxygen fails in minutes, not days. It has no ATP reserve to live on."
    source: original
    verified: true
  - id: bio.energy.atp.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "Where in ATP is the usable energy actually held?"
    answer:
      correctId: c
      options:
        - id: a
          text: In the adenine ring
          why: "Adenine is structural - it is the handle enzymes grab. No energy is released from it."
        - id: b
          text: In the ribose sugar
          why: "The sugar is the backbone connecting the parts. It is not where energy is stored or released."
        - id: c
          text: In the strain between the three negatively charged phosphates crowded together
        - id: d
          text: In the bond between adenine and ribose
          why: "Breaking that bond does not release useful energy, and the cell never breaks it to get energy."
    solution:
      - text: "ATP is adenine, plus a ribose sugar, plus a chain of three phosphate groups."
      - text: "Every phosphate carries negative charge. Three of them chained together are forced close, and like charges repel."
      - text: "So the tail is under strain, like a compressed spring held in place."
      - text: "Snap off the end phosphate and that repulsion is relieved. The products - ADP and a free phosphate - are more stable than what you started with, and the difference comes out as usable energy."
      - text: "Common misconception worth killing: the energy is not stored inside the bond waiting to be released by breaking it. Breaking bonds always costs energy. The payoff comes from the products being so much more stable than the reactants."
    source: original
    verified: true
  - id: bio.energy.atp.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "A cell needs to run a reaction that absorbs energy - it will not happen on its own. How does ATP make it go?"
    answer:
      correctId: a
      options:
        - id: a
          text: The two reactions are linked, so the energy released by ATP pays for the one that needs it
        - id: b
          text: ATP heats the cell until the reaction happens
          why: "Heating would denature proteins long before it forced the reaction. Cells do not drive chemistry with heat."
        - id: c
          text: ATP physically pushes the reactants together
          why: "No pushing is involved. The link is chemical - usually a phosphate handed over - not mechanical."
        - id: d
          text: ATP changes the reaction so it no longer needs energy
          why: "The reaction's energy requirement is fixed. You cannot change it, only pay it."
    solution:
      - text: "Two kinds of reaction: ones that release energy, and ones that absorb it. The absorbing kind will not run by itself."
      - text: "The trick is to not run them separately. Hook them together so they become one combined reaction."
      - text: "ATP's breakdown releases more energy than the other reaction needs, so the combined pair releases energy overall - and anything that releases energy overall will run."
      - text: "This linking is called energy coupling, and it is the single most important idea in cell energetics."
      - text: "Usually the link is physical: the enzyme takes the phosphate off ATP and sticks it onto the other molecule. That phosphate makes the target less stable and more reactive. Adding a phosphate like this is called phosphorylation."
      - text: "Think of it as a strong friend lifting one end of a heavy box. The box does not get lighter. Someone else is just paying for part of the lift."
    source: original
    verified: true
  - id: bio.energy.atp.i4
    tier: challenge
    type: mcq
    depth: both
    prompt: "A drug blocks ATP synthase in a person's mitochondria. Glycolysis still runs. What happens, and why is it fatal so fast?"
    answer:
      correctId: b
      options:
        - id: a
          text: Nothing much - glycolysis makes plenty of ATP
          why: "Glycolysis yields a net 2 ATP per glucose against roughly 30 from the full process. That is a collapse of over ninety percent."
        - id: b
          text: ATP output collapses to a small fraction, and tissues with high demand fail within minutes
        - id: c
          text: The cell switches to making ATP in the nucleus
          why: "There is no ATP-generating machinery in the nucleus. No such backup exists."
        - id: d
          text: The cell survives on stored ATP until the drug clears
          why: "There is only a few seconds' worth of ATP stored. There is nothing to live on."
    solution:
      - text: "ATP synthase is the enzyme that makes most of the cell's ATP, using the hydrogen-ion gradient across the inner mitochondrial membrane."
      - text: "Block it and you lose everything downstream of the gradient - roughly 26 to 28 of the 30-ish ATP per glucose."
      - text: "Glycolysis carries on in the cytoplasm, but its net yield is only 2 ATP per glucose."
      - text: "So supply drops by more than ninety percent while demand is unchanged."
      - text: "And because cells store only seconds of ATP, there is no buffer. The brain and heart, which are the hungriest tissues, fail almost immediately."
      - text: "This is not hypothetical. Cyanide works by this logic - it blocks the electron transport chain, the gradient collapses, and ATP synthase stops for want of a gradient."
    source: original
    verified: true
  - id: bio.energy.atp.i5
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: write out the ATP cycle and say where the energy comes from and goes to at each half."
    answer:
      model: "ATP is hydrolysed to ADP plus inorganic phosphate, releasing energy that the cell spends on work such as active transport, muscle contraction or building molecules. To go back the other way, ADP and phosphate are rejoined into ATP, which absorbs energy - and that energy comes from breaking down food in cellular respiration, or from light in photosynthesis. The cycle runs continuously in both directions, which is why ATP is recycled rather than stockpiled."
      rubric:
        - "States ATP to ADP plus phosphate releases energy"
        - "Names at least one kind of cellular work the released energy pays for"
        - "States rebuilding ATP from ADP absorbs energy"
        - "Identifies respiration or photosynthesis as the source of that energy"
        - "Describes it as a continuous cycle rather than storage"
    solution:
      - text: "Spending half: ATP + water gives ADP + phosphate, and releases energy."
      - text: "That energy gets spent on real work - pumping ions against their gradient, contracting muscle, building large molecules out of small ones."
      - text: "Recharging half: ADP + phosphate rejoin into ATP, and this absorbs energy."
      - text: "The energy for recharging comes from breaking down food in cellular respiration, or from sunlight in photosynthesis."
      - text: "Both halves run constantly, which is the point. The same molecules cycle round thousands of times a day rather than being stockpiled."
      - text: "The useful mental image is a rechargeable battery, not a fuel tank. A tank empties; a battery goes round."
    source: original
    verified: true
---

**ATP** - adenosine triphosphate - is how cells pay for everything. Pumping
ions uphill, contracting a muscle, assembling a protein: all of it is paid for
in ATP.

Its structure is three parts: an **adenine** ring, a **ribose** sugar, and a
tail of **three phosphate groups**. The phosphates are where everything
happens.

Each phosphate carries negative charge, and three chained together are forced
uncomfortably close. Like charges repel, so the tail sits under permanent
strain. Snap the end phosphate off and that strain is relieved - the products
(**ADP** and a loose phosphate) are considerably more stable than what you
started with, and the difference comes out as usable energy.

> **Careful here, because it is examined:** the energy is *not* sitting inside
> the bond waiting to be let out by breaking it. Breaking a bond always costs
> energy. The payoff comes from the **products being much more stable than the
> reactants.**

### Energy coupling

Reactions come in two flavours: ones that **release** energy and ones that
**absorb** it. The absorbing kind will never run on its own.

So the cell does not run them on their own. It **couples** them - links the
reaction that needs energy to the breakdown of ATP, which releases more than
enough. The combined reaction releases energy overall, and anything that
releases energy overall will proceed.

Usually the link is physical. An enzyme takes the phosphate off ATP and sticks
it onto the target molecule. That extra phosphate makes the target less stable
and more willing to react. Adding a phosphate this way is called
**phosphorylation**, and it is everywhere in biology.

Picture someone strong lifting the other end of a heavy box. The box is no
lighter. Somebody else is simply paying for half the lift.

### Currency, not storage

> ATP + water -> ADP + phosphate + **energy out**
> ADP + phosphate + **energy in** -> ATP

Both directions run constantly. You carry only about 250 g of ATP at any
instant, yet cycle through roughly your own body weight of it per day.

That is why ATP is **currency, not storage**. Fat and glycogen are the savings
account; ATP is the cash in your pocket - a small amount, moving fast,
immediately spendable. And it is why a cell starved of oxygen fails in
**minutes**: there is no reserve to coast on.
