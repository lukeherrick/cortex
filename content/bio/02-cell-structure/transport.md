---
id: bio.cell.transport
unit: bio.u-cell-structure
subject: bio
title: Transport Across Membranes
depth: both
ced:
  - ENE-2.B
  - ENE-2.C
prereqs:
  - bio.cell.membrane-structure
items:
  - id: bio.cell.transport.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "A molecule moves into a cell through a protein channel, down its concentration gradient, and the cell spends no ATP. What is that called?"
    answer:
      correctId: b
      options:
        - id: a
          text: Active transport
          why: "Active means the cell pays. No ATP was spent here, so it cannot be active."
        - id: b
          text: Facilitated diffusion
        - id: c
          text: Simple diffusion
          why: "Close, but simple diffusion means straight through the lipid with no protein involved. A channel was used here."
        - id: d
          text: Exocytosis
          why: "Exocytosis is a vesicle fusing with the membrane to dump cargo out. No vesicle here, and the movement was inward."
    solution:
      - text: "Two questions sort every transport type. First: does the cell pay energy? Second: does a protein help?"
      - text: "No ATP spent, so it is passive - and passive always means moving down the gradient, from crowded to less crowded."
      - text: "A protein channel was involved, so it is not simple diffusion."
      - text: "Passive plus protein is facilitated diffusion. Facilitated just means helped."
      - text: "Where the energy comes from: the gradient itself. Random motion plus an existing imbalance is enough, which is why the cell pays nothing."
    source: original
    verified: true
  - id: bio.cell.transport.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "A root cell holds potassium at a far higher concentration inside than the soil water outside, and keeps pumping more in. What must be true?"
    answer:
      correctId: c
      options:
        - id: a
          text: Potassium is diffusing in down its gradient
          why: "It is going the wrong way for diffusion. Inside is already more concentrated, so diffusion would carry potassium out."
        - id: b
          text: The membrane is impermeable to potassium
          why: "If nothing could cross, the cell could not have accumulated it in the first place."
        - id: c
          text: The cell is spending energy to move potassium against its gradient
        - id: d
          text: Water is carrying the potassium in by osmosis
          why: "Osmosis moves water, not solutes. Water crossing a membrane does not drag ions along with it."
    solution:
      - text: "Diffusion only ever runs one way: from more crowded to less crowded. It evens things out."
      - text: "Here the cell is making things less even - it is already potassium-rich and still taking more."
      - text: "You cannot get that from diffusion any more than water flows uphill by itself."
      - text: "So the cell must be paying. This is active transport, and the usual payment is ATP."
      - text: "General rule that is almost always the intended answer: anything maintained against its gradient is costing the cell energy, continuously."
    source: original
    verified: true
  - id: bio.cell.transport.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "You drop a red blood cell into pure distilled water. What happens, and why?"
    answer:
      correctId: a
      options:
        - id: a
          text: It swells and bursts, because water floods in toward the higher solute concentration inside
        - id: b
          text: It shrinks, because pure water pulls water out of it
          why: "Water moves toward the saltier side. Pure water is the least salty thing available, so water moves into the cell, not out."
        - id: c
          text: Nothing, because the membrane blocks water
          why: "Water crosses membranes readily, and cells have aquaporin channels that make it faster still."
        - id: d
          text: It bursts because the salt inside leaks out
          why: "Bursting is caused by water coming in, not solutes going out. The solutes largely stay put."
    solution:
      - text: "Osmosis is water moving across a membrane toward wherever solutes are more concentrated."
      - text: "Inside the cell: salts, proteins, sugars. Outside: pure water, nothing dissolved."
      - text: "So the inside is the more concentrated side, and water floods in."
      - text: "A red blood cell has no cell wall to resist the swelling, so it stretches until it pops. The word for that is lysis."
      - text: "A plant cell in the same water would swell too, but its cell wall pushes back and it just becomes firm - turgid. That wall is why plants can sit in fresh water and animals cannot."
      - text: "A solution more dilute than the cell is called hypotonic. This is exactly why IV drips are saline, not water."
    source: original
    verified: true
  - id: bio.cell.transport.i4
    tier: challenge
    type: mcq
    depth: both
    prompt: "A cell is placed in a solution and neither swells nor shrinks. What does that tell you about the solution?"
    answer:
      correctId: c
      options:
        - id: a
          text: It contains no solutes
          why: "Pure water would make the cell swell. Doing nothing means it matches the cell, which requires solutes."
        - id: b
          text: The membrane has stopped working
          why: "A dead membrane usually leaks and the cell swells. No change means a working membrane in balanced conditions."
        - id: c
          text: Its solute concentration matches the cell's, so water crosses equally in both directions
        - id: d
          text: Water has stopped moving entirely
          why: "Water never stops moving. The two directions have become equal, which is a balance, not a halt."
    solution:
      - text: "No net change does not mean nothing is happening. Water is crossing constantly."
      - text: "It means the flow in and the flow out are equal, so they cancel."
      - text: "That happens when the solute concentration is the same on both sides. The word is isotonic."
      - text: "This distinction between net movement and no movement is tested often, and the exam wants the word net."
      - text: "Practical consequence: IV fluids are made isotonic to blood. Too dilute and red blood cells burst; too concentrated and they shrivel."
    source: original
    verified: true
  - id: bio.cell.transport.i5
    tier: ap
    type: numeric
    depth: both
    prompt: "A plant cell has a solute potential of -0.80 MPa and a pressure potential of 0.30 MPa. It sits in a solution with a water potential of -0.60 MPa. Calculate the cell's water potential in MPa."
    answer: { value: -0.5, unit: MPa, sigFigs: 2 }
    solution:
      - text: "Water potential is the two parts added: psi = psi_s + psi_p."
      - text: "psi = (-0.80) + (0.30) = -0.50 MPa"
      - text: "Keep two significant figures and keep the sign: -0.50 MPa."
      - text: "Now compare. The cell is at -0.50 and the solution outside is at -0.60."
      - text: "Water always moves from higher water potential to lower. -0.50 is higher than -0.60, so water leaves the cell."
      - text: "Watch the negatives carefully - this is where marks get lost. A more negative number is lower, so the solution is pulling water out."
    source: original
    verified: true
  - id: bio.cell.transport.i6
    tier: ap
    type: frq
    depth: both
    prompt: "The sodium-potassium pump moves 3 Na+ out and 2 K+ in per ATP, against both gradients. Explain what the cell gets for that constant expense, and why it is worth it."
    answer:
      model: "The pump builds and maintains a steep sodium gradient, with sodium concentrated outside, and it also moves unequal charge - three positive out for two in - so the inside is left negative relative to the outside. That stored gradient and charge difference is a form of potential energy the cell can spend elsewhere. Nerve and muscle cells use it to fire: opening sodium channels lets sodium rush in down the gradient the pump created, which is the action potential. Gut and kidney cells use it for secondary active transport, letting sodium flow back in through a carrier that drags glucose along with it against glucose's own gradient. It is worth the cost because the pump is effectively a rechargeable battery - the cell pays once to charge it and can then draw on it for transport, signalling and volume control."
      rubric:
        - "1 point: identifies that the pump maintains a steep Na+ gradient"
        - "1 point: notes the unequal charge movement creates a membrane potential"
        - "1 point: describes the gradient as stored potential energy"
        - "1 point: gives a specific use - nerve impulse or secondary active transport"
        - "1 point: explains the trade as paying once to power many later processes"
    solution:
      - text: "Follow what the pump actually achieves. Sodium ends up concentrated outside, potassium inside - both against their gradients."
      - text: "Also notice the 3-for-2 asymmetry. More positive charge leaves than enters, so the inside becomes slightly negative. That voltage across the membrane is the membrane potential."
      - text: "A gradient is stored energy, exactly like water held behind a dam. The pump is doing the pumping-uphill; the cell can cash it in later."
      - text: "Use one - nerve signalling. Open sodium channels and sodium stampedes inward down the gradient. That rush is the action potential, and it costs nothing at the moment of firing because the pump already paid."
      - text: "Use two - secondary active transport. In your gut, a carrier lets sodium flow in down its gradient and uses that ride to haul glucose in against glucose's own gradient. The glucose moves uphill powered by sodium's downhill."
      - text: "Use three - volume control. Keeping sodium out keeps water from flooding in by osmosis and bursting the cell."
      - text: "So why is it worth roughly a quarter of your resting energy budget? Because one pump charges a battery that powers thought, movement, digestion and staying intact. Paying once and spending many times is a good trade."
    source: original
    verified: true
---

Everything crossing a membrane sorts into a small number of categories, and two
questions tell them apart:

1. **Does the cell pay energy?** No means **passive**. Yes means **active**.
2. **Does a protein help?** No means **simple**. Yes means **facilitated** or
   pumped.

| | No protein | Protein helps |
|---|---|---|
| **Passive** (free, down the gradient) | Simple diffusion - O2, CO2, small fats | Facilitated diffusion - ions, glucose |
| **Active** (costs ATP, up the gradient) | — | Pumps - e.g. sodium-potassium pump |

**Passive always runs down the gradient**, from crowded to less crowded. The
energy is already there in the imbalance, so the cell pays nothing. **Active
transport runs uphill**, which is the only reason it costs anything.

The rule that answers most questions here: **anything held against its
gradient is costing the cell energy, continuously.** A root cell packed with
potassium while the soil has almost none is a cell paying a bill every second.

### Osmosis

Osmosis is just diffusion of **water**, and the one thing to get right is the
direction:

> **Water moves toward the side where solutes are more concentrated.**

Water goes where the stuff is. Three words describe the outside solution
relative to the cell:

- **Hypotonic** - fewer solutes outside. Water rushes in. Animal cells burst
  (**lysis**); plant cells just firm up, because the cell wall pushes back
  (**turgid**).
- **Hypertonic** - more solutes outside. Water leaves. The cell shrivels.
- **Isotonic** - equal. Water still crosses constantly, but equally both ways,
  so there is **no net** movement. Exams want that word *net*.

This is why IV drips are saline rather than water, and why a plant can sit in a
puddle quite happily while your cells cannot.

### Water potential (AP)

> psi = psi_s + psi_p

Solute potential plus pressure potential. Solute potential is always zero or
negative - adding solutes makes it more negative. **Water moves from higher
water potential to lower.**

The trap is the minus signs. -0.50 is **higher** than -0.60. Get that backwards
and you predict the water flowing the wrong way, which is a very common lost
mark.
