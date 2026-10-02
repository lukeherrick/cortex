---
id: bio.energy.respiration
unit: bio.u-energetics
subject: bio
title: Cellular Respiration
depth: both
ced:
  - ENE-1.E
  - ENE-1.F
prereqs:
  - bio.energy.atp
  - bio.energy.enzymes
  - bio.cell.membrane-structure
items:
  - id: bio.energy.respiration.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "Glycolysis makes 4 ATP but spends 2 getting started. What is the net ATP yield from glycolysis per glucose?"
    answer: { value: 2, unit: null, sigFigs: null }
    solution:
      - text: "Glycolysis has an investment phase: 2 ATP are spent up front to prime the glucose."
      - text: "Then the payoff phase produces 4 ATP."
      - text: "Net = 4 - 2 = 2 ATP."
      - text: "Exam questions deliberately offer 4 as a distractor, so read whether they want gross or net."
      - text: "Glycolysis also produces 2 NADH, and those matter far more than the 2 ATP - they carry electrons to the stage that makes most of the energy."
    source: original
    verified: true
  - id: bio.energy.respiration.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "Oxygen is the final electron acceptor in respiration. If oxygen runs out, why does the whole chain back up almost immediately?"
    answer:
      correctId: b
      options:
        - id: a
          text: Because oxygen is needed to split glucose at the start
          why: "Glycolysis uses no oxygen at all - it runs fine without it. The blockage is at the far end of the process."
        - id: b
          text: Because with nowhere to dump electrons, the carriers stay loaded and cannot pick up new ones
        - id: c
          text: Because oxygen is what ATP synthase spins on
          why: "ATP synthase is turned by hydrogen ions flowing through it, not by oxygen."
        - id: d
          text: Because the mitochondrial membrane needs oxygen to stay intact
          why: "The membrane is lipid and does not depend on oxygen for its structure."
    solution:
      - text: "The electron transport chain is a bucket brigade - each carrier passes electrons to the next."
      - text: "Oxygen stands at the end and takes the final electrons, combining with hydrogen ions to make water. It is the drain."
      - text: "Block the drain and the last carrier stays loaded. It cannot accept from the one before it, which cannot accept from the one before that."
      - text: "The jam propagates backwards within seconds, and NADH has nowhere to unload."
      - text: "With no NAD+ regenerated, the Krebs cycle stops too, because it needs empty carriers to load."
      - text: "This is why oxygen matters so much despite only appearing at the very last step. It is not a reactant at the start; it is the exit, and a blocked exit stops everything upstream."
    source: original
    verified: true
  - id: bio.energy.respiration.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "What does fermentation actually accomplish? It makes no extra ATP of its own."
    answer:
      correctId: c
      options:
        - id: a
          text: It makes ATP directly without oxygen
          why: "Fermentation produces no ATP itself. The ATP all comes from glycolysis - fermentation just keeps glycolysis able to run."
        - id: b
          text: It breaks pyruvate down for more energy
          why: "Extracting energy from pyruvate requires oxygen and the mitochondria. Fermentation disposes of pyruvate, it does not mine it."
        - id: c
          text: It regenerates NAD+ so glycolysis can keep going
        - id: d
          text: It removes toxic oxygen from the cell
          why: "Oxygen is absent in the first place - that is the reason fermentation is happening."
    solution:
      - text: "Glycolysis needs empty NAD+ to accept electrons. Each round converts 2 NAD+ into 2 NADH."
      - text: "Normally mitochondria unload that NADH back into NAD+ and the cycle continues. Without oxygen, they cannot."
      - text: "So NAD+ runs out, and glycolysis - the one ATP source still working - grinds to a halt."
      - text: "Fermentation's whole job is to dump the electrons from NADH onto pyruvate instead, freeing NAD+ again."
      - text: "It gains no ATP. It just keeps glycolysis's 2 ATP per glucose flowing, which beats zero."
      - text: "In your muscles the electrons go onto pyruvate making lactate. In yeast they make ethanol and CO2, which is bread rising and beer brewing."
    source: original
    verified: true
  - id: bio.energy.respiration.i4
    tier: challenge
    type: mcq
    depth: both
    prompt: "The inner mitochondrial membrane is almost completely impermeable to hydrogen ions. Why is that leak-proofing essential rather than incidental?"
    answer:
      correctId: a
      options:
        - id: a
          text: Because the stored energy is the H+ imbalance itself - a leaky membrane would drain it as useless heat
        - id: b
          text: Because hydrogen ions would poison the matrix
          why: "The matrix handles protons fine. The issue is losing the gradient, not toxicity."
        - id: c
          text: Because H+ must stay inside to react with oxygen
          why: "Protons do combine with oxygen to make water, but that happens at the chain itself. The impermeability is about preserving the gradient."
        - id: d
          text: Because the membrane would lose its shape
          why: "Ion permeability has nothing to do with structural integrity here."
    solution:
      - text: "The electron transport chain's real output is not ATP. It is a pump - it shoves hydrogen ions from the matrix out into the intermembrane space."
      - text: "That builds a crowd of H+ on one side. A concentration difference is stored energy, exactly like water held behind a dam."
      - text: "The only way back is through ATP synthase, which is turned like a turbine by the ions rushing through, and uses that spin to build ATP."
      - text: "Making ATP from a hydrogen-ion gradient this way is called chemiosmosis."
      - text: "Now suppose the membrane leaked. The ions would slip back anywhere, the gradient would collapse, and the energy would come out as heat instead of ATP."
      - text: "This is not theoretical - it is a real mechanism. Hibernating animals and human babies have brown fat with a deliberate proton leak, precisely to make heat instead of ATP. The toxin dinitrophenol does the same thing and kills by overheating."
    source: original
    verified: true
  - id: bio.energy.respiration.i5
    tier: standard
    type: numeric
    depth: both
    prompt: "Six carbons go in as one glucose. Counting pyruvate oxidation and the Krebs cycle together, how many CO2 molecules come out per glucose?"
    answer: { value: 6, unit: null, sigFigs: null }
    solution:
      - text: "Conservation of atoms does this for you - no memorising needed."
      - text: "Glucose is C6H12O6, so six carbons go in."
      - text: "Every one of those carbons leaves as CO2, since CO2 is the only carbon-containing product."
      - text: "So six CO2 come out. Done."
      - text: "If you want the breakdown: 2 from pyruvate oxidation (one per pyruvate) and 4 from the Krebs cycle (two per turn, two turns)."
      - text: "Glycolysis releases none - it splits glucose into two 3-carbon pyruvates and keeps all six carbons."
    source: original
    verified: true
  - id: bio.energy.respiration.i6
    tier: ap
    type: frq
    depth: both
    prompt: "Trace a single glucose molecule through aerobic respiration. For each stage name where in the cell it happens, what goes in, what comes out, and roughly how much ATP results. Then explain why the final stage produces so much more than the others."
    answer:
      model: "Glycolysis happens in the cytosol: glucose becomes two pyruvate, with a net gain of 2 ATP and 2 NADH, and no oxygen required. Pyruvate oxidation happens in the mitochondrial matrix: each pyruvate loses a carbon as CO2 and becomes acetyl-CoA, giving 2 NADH total. The Krebs cycle also runs in the matrix, twice per glucose: each turn releases 2 CO2 and yields 3 NADH, 1 FADH2 and 1 ATP, so 6 NADH, 2 FADH2 and 2 ATP per glucose. Oxidative phosphorylation happens at the inner mitochondrial membrane: NADH and FADH2 unload electrons into the electron transport chain, which pumps H+ into the intermembrane space, and the H+ flowing back through ATP synthase makes roughly 26 to 28 ATP. Oxygen accepts the spent electrons and becomes water. The last stage dominates because the earlier stages mostly produce loaded electron carriers rather than ATP, and each NADH is worth around 2.5 ATP once cashed in at the chain - so the earlier stages are really collecting the currency that the last stage spends."
      rubric:
        - "1 point: glycolysis in cytosol, glucose to 2 pyruvate, net 2 ATP and 2 NADH"
        - "1 point: pyruvate oxidation in the matrix, CO2 released, acetyl-CoA and NADH formed"
        - "1 point: Krebs cycle in the matrix, runs twice, correct products per glucose"
        - "1 point: oxidative phosphorylation at the inner membrane, roughly 26 to 28 ATP, oxygen as final acceptor forming water"
        - "1 point: explains the last stage dominates because earlier stages bank electron carriers that are cashed in there"
    solution:
      - text: "Stage 1 - Glycolysis, in the cytosol. Glucose splits into two pyruvate. Net 2 ATP, plus 2 NADH. No oxygen needed, which is why it still runs when you are out of breath."
      - text: "Stage 2 - Pyruvate oxidation, in the mitochondrial matrix. Each pyruvate drops a carbon as CO2 and becomes acetyl-CoA. 2 NADH per glucose."
      - text: "Stage 3 - Krebs cycle, also in the matrix, and it runs twice because you have two acetyl-CoA. Each turn: 2 CO2 out, 3 NADH, 1 FADH2, 1 ATP. Per glucose that is 6 NADH, 2 FADH2, 2 ATP."
      - text: "Stop and notice something. After three stages you have only 4 ATP. Nearly all the energy is sitting in loaded electron carriers instead."
      - text: "Stage 4 - Oxidative phosphorylation, at the inner mitochondrial membrane. NADH and FADH2 hand their electrons to the transport chain."
      - text: "As electrons pass down the chain, the energy released is used to pump H+ out into the intermembrane space, building a gradient."
      - text: "H+ floods back through ATP synthase, spinning it like a turbine, and that makes roughly 26 to 28 ATP. This gradient-driven synthesis is chemiosmosis."
      - text: "Oxygen sits at the end of the chain accepting the spent electrons and combining with H+ to form water. Without it the chain jams and everything upstream stops."
      - text: "Total: roughly 30 to 32 ATP per glucose. Textbooks differ slightly because the exact yield per NADH is not a clean whole number."
      - text: "Why the last stage dominates: the first three stages were not really making ATP, they were collecting NADH and FADH2. Each NADH is worth about 2.5 ATP when cashed in. The earlier stages bank the currency; the last stage spends it."
    source: original
    verified: true
---

Respiration is how a cell turns food into ATP. The summary equation is short:

> C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O + energy

but it happens in **four stages**, and the marks live in knowing which is which.

| Stage | Where | Out | ATP |
|---|---|---|---|
| **Glycolysis** | Cytosol | 2 pyruvate, 2 NADH | net **2** |
| **Pyruvate oxidation** | Matrix | 2 acetyl-CoA, 2 CO2, 2 NADH | 0 |
| **Krebs cycle** (x2) | Matrix | 4 CO2, 6 NADH, 2 FADH2 | **2** |
| **Oxidative phosphorylation** | Inner membrane | 6 H2O | **~26-28** |

Total: roughly **30-32 ATP** per glucose. Sources differ slightly because the
yield per NADH is not a clean whole number.

### The thing to actually understand

Look at that table again. After **three** stages you have only 4 ATP. So what
were those stages doing?

**Collecting loaded electron carriers.** NADH and FADH2 are not energy
themselves - they are carriers holding high-energy electrons, worth about 2.5
and 1.5 ATP respectively once cashed in. The early stages bank the currency.
The last stage spends it.

### Chemiosmosis - how the big stage works

1. NADH and FADH2 drop electrons into the **electron transport chain** in the
   inner mitochondrial membrane.
2. As electrons pass down the chain, the energy released **pumps H+** out of
   the matrix into the intermembrane space.
3. That crowd of H+ on one side is **stored energy** - like water behind a dam.
4. The only way back is through **ATP synthase**, which the flow spins like a
   turbine, building ATP as it turns.
5. **Oxygen** accepts the spent electrons at the end and becomes water.

This is why the inner membrane must be **leak-proof to H+**. The energy *is*
the imbalance. A leaky membrane would release it as heat instead of ATP - which
is precisely what brown fat does on purpose to keep babies and hibernating
animals warm, and what the poison dinitrophenol does lethally.

And it is why **no oxygen means everything stops within seconds**, even though
oxygen only appears at the final step. It is not the fuel - it is the **exit**.
Block the exit and the whole chain backs up, NADH cannot unload, and the Krebs
cycle stalls for lack of empty carriers.

### Fermentation

When oxygen is gone, **glycolysis is the only ATP source left** - but it needs
empty NAD+ to run, and nothing is emptying the NADH.

**Fermentation's entire job is to regenerate NAD+.** It dumps the electrons
onto pyruvate and gains **no ATP of its own**. It simply keeps glycolysis's 2
ATP per glucose flowing, which beats zero.

In your muscles that makes **lactate**. In yeast it makes **ethanol and CO2** -
bread rising, beer brewing.
