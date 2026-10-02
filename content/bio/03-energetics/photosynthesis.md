---
id: bio.energy.photosynthesis
unit: bio.u-energetics
subject: bio
title: Photosynthesis
depth: both
ced:
  - ENE-1.G
  - ENE-1.H
prereqs:
  - bio.energy.atp
  - bio.energy.enzymes
  - bio.cell.membrane-structure
items:
  - id: bio.energy.photosynthesis.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "Where does the oxygen you breathe actually come from? Plants take in CO2 and release O2, so the obvious guess is the CO2 - but that is wrong. Where is it from?"
    answer:
      correctId: c
      options:
        - id: a
          text: The carbon dioxide, split apart to free its oxygen
          why: "CO2's oxygen ends up in sugar and in water, not released as O2. This was the assumption that isotope experiments disproved."
        - id: b
          text: The air, simply passing through the leaf unchanged
          why: "The O2 is newly made by the plant. Tracing heavy oxygen isotopes shows it is manufactured, not just vented."
        - id: c
          text: Water, split apart to supply electrons
        - id: d
          text: The sugar, as a by-product of building it
          why: "Sugar is the product being built, not a source. Its oxygen stays in the sugar."
    solution:
      - text: "It is a genuinely surprising answer, and it was settled by labelling the oxygen in water with a heavy isotope and seeing where it turned up. It came out as O2."
      - text: "Here is why. The light reactions need a steady supply of electrons to replace the ones chlorophyll loses to light."
      - text: "Water is the donor. Splitting it releases electrons, hydrogen ions - and oxygen atoms, which pair up as O2."
      - text: "So O2 is a waste product. The plant wanted the electrons; the oxygen was what was left over."
      - text: "Every oxygen molecule you have ever breathed is leftover rubbish from a plant stripping electrons off water."
    source: original
    verified: true
  - id: bio.energy.photosynthesis.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "Why are the Calvin cycle reactions called light-independent when a plant in the dark stops making sugar within minutes?"
    answer:
      correctId: b
      options:
        - id: a
          text: Because the name is simply inaccurate
          why: "The name is precise about something specific: the reactions use no light themselves. The dependence is indirect."
        - id: b
          text: Because the reactions themselves use no light - they run on the ATP and NADPH that light made
        - id: c
          text: Because they happen only at night
          why: "They run in daylight, and most actively then, because that is when ATP and NADPH are plentiful."
        - id: d
          text: Because they can use moonlight instead
          why: "No light of any kind is used by these reactions. Light is not involved at this stage."
    solution:
      - text: "Split the process in two. The light reactions capture light and turn it into two chemicals: ATP and NADPH."
      - text: "The Calvin cycle then spends that ATP and NADPH to build sugar from CO2. It has no light-absorbing step anywhere in it."
      - text: "So it is light-independent in a literal, mechanical sense - put it in a test tube with ATP and NADPH in the dark and it will run."
      - text: "But in a real leaf the ATP and NADPH only come from light, and neither is stockpiled. Cut the light and the supply dries up in minutes."
      - text: "So: independent of light directly, utterly dependent on it in practice. Dark reactions is the older name and is worse, because it suggests they prefer darkness."
    source: original
    verified: true
  - id: bio.energy.photosynthesis.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "The Calvin cycle fixes one CO2 per turn. How many turns are needed to build one glucose molecule?"
    answer: { value: 6, unit: null, sigFigs: null }
    solution:
      - text: "Count carbons. Glucose is C6H12O6, so it needs six carbon atoms."
      - text: "Each turn of the cycle fixes exactly one CO2, which is one carbon."
      - text: "So six turns per glucose."
      - text: "Each turn costs 3 ATP and 2 NADPH, so one glucose costs 18 ATP and 12 NADPH."
      - text: "Worth noting that the cycle's direct product is G3P, a 3-carbon sugar, not glucose. Two G3P get combined to make one glucose, which is why the carbon arithmetic is the reliable way to answer this rather than memorising."
    source: original
    verified: true
  - id: bio.energy.photosynthesis.i4
    tier: challenge
    type: mcq
    depth: both
    prompt: "On a blazing hot dry day a plant shuts its stomata to stop losing water. Photosynthesis drops sharply. What is the direct cause?"
    answer:
      correctId: a
      options:
        - id: a
          text: CO2 cannot get in, so the Calvin cycle runs out of raw material
        - id: b
          text: Light cannot get in through closed stomata
          why: "Stomata are gas pores, not windows. Light passes through leaf tissue regardless of whether they are open."
        - id: c
          text: The plant overheats and its enzymes denature
          why: "That can happen in extreme heat, but the immediate and specific consequence of closing stomata is a gas supply problem."
        - id: d
          text: Water cannot reach the chloroplasts
          why: "Closing stomata conserves water inside the plant. There is more available internally, not less."
    solution:
      - text: "Stomata are adjustable pores on a leaf's underside. They are the only route for gas exchange."
      - text: "Closing them does its job - water vapour stops escaping, and the plant avoids drying out."
      - text: "But the same pores were letting CO2 in, and CO2 is the Calvin cycle's only source of carbon."
      - text: "Starve the cycle of CO2 and sugar production stalls, even in brilliant sunlight with the light reactions running flat out."
      - text: "This is a genuine trade-off with no good answer: lose water or stop eating. It is why hot dry climates drove the evolution of workarounds like C4 and CAM photosynthesis."
      - text: "It gets worse. With CO2 scarce, rubisco starts grabbing O2 by mistake instead - a wasteful process called photorespiration that burns energy for nothing."
    source: original
    verified: true
  - id: bio.energy.photosynthesis.i5
    tier: standard
    type: mcq
    depth: both
    prompt: "Respiration and photosynthesis both build a hydrogen-ion gradient across a membrane and use ATP synthase. What is the most important difference in where the energy originally came from?"
    answer:
      correctId: c
      options:
        - id: a
          text: There is no real difference - both use glucose
          why: "Photosynthesis makes glucose rather than consuming it. Its energy arrives as light."
        - id: b
          text: Respiration uses light and photosynthesis uses food
          why: "That is the right idea with the two swapped. Respiration uses food; photosynthesis uses light."
        - id: c
          text: Respiration's electrons come from food molecules; photosynthesis's are re-energised by light
        - id: d
          text: Only photosynthesis uses an electron transport chain
          why: "Both use one. The machinery is strikingly similar, which is the whole point of the comparison."
    solution:
      - text: "The machinery really is near-identical: an electron transport chain in a membrane, pumping H+, with ATP synthase harvesting the flow back. Both processes use chemiosmosis."
      - text: "The difference is upstream - where the high-energy electrons come from in the first place."
      - text: "In respiration, electrons are stripped from food. Glucose is taken apart and its electrons, carried by NADH, feed the chain. Energy flows downhill all the way."
      - text: "In photosynthesis, electrons come from water, which holds them tightly and at low energy. Light is what kicks them up to high energy so they can be useful."
      - text: "So photosynthesis runs energy uphill using sunlight, and respiration runs it downhill out of food."
      - text: "That is the relationship between the two: photosynthesis uses light to load energy into glucose, respiration unloads it. Nearly every ecosystem on Earth is that pair running in a loop."
    source: original
    verified: true
  - id: bio.energy.photosynthesis.i6
    tier: ap
    type: frq
    depth: both
    prompt: "Compare the light reactions and the Calvin cycle: where each occurs, what goes in, what comes out, and how the two are connected. Then explain what would happen to each if a drug blocked the splitting of water."
    answer:
      model: "The light reactions occur in the thylakoid membranes. Light and water go in; O2, ATP and NADPH come out, with the ATP made by chemiosmosis as H+ flows back through ATP synthase into the stroma. The Calvin cycle occurs in the stroma. CO2, ATP and NADPH go in; G3P comes out, which is combined into glucose, and ADP and NADP+ are returned to the light reactions. The connection runs both ways: the light reactions supply ATP and NADPH, and the Calvin cycle returns the empty carriers so they can be reloaded. If water splitting were blocked, chlorophyll in photosystem II would lose electrons to light and have no way to replace them, so electron flow through the chain would stop. No H+ gradient would form, so ATP production would stop, no NADPH would be made, and no O2 would be released. The Calvin cycle would then halt within minutes once existing ATP and NADPH were used up - not because it needs water or light itself, but because its supply of both inputs depends entirely on the light reactions."
      rubric:
        - "1 point: light reactions in thylakoid membrane, inputs light and water, outputs O2, ATP, NADPH"
        - "1 point: Calvin cycle in stroma, inputs CO2, ATP, NADPH, output G3P or sugar"
        - "1 point: describes the two-way link including return of ADP and NADP+"
        - "1 point: blocking water splitting stops electron replacement, so no gradient, no ATP, no NADPH, no O2"
        - "1 point: Calvin cycle stops only indirectly, once ATP and NADPH run out"
    solution:
      - text: "Light reactions - in the thylakoid membranes, the stacked internal membranes of a chloroplast."
      - text: "In: light, water. Out: O2 as waste, plus ATP and NADPH."
      - text: "Mechanism: light boosts electrons out of chlorophyll, water is split to replace them, the electrons travel a transport chain that pumps H+ into the thylakoid space, and H+ flowing back through ATP synthase makes ATP. Same chemiosmosis as mitochondria."
      - text: "Calvin cycle - in the stroma, the fluid around the thylakoids."
      - text: "In: CO2, ATP, NADPH. Out: G3P, a 3-carbon sugar, which gets combined into glucose. Also out: empty ADP and NADP+, sent back."
      - text: "The enzyme that attaches CO2 to a 5-carbon acceptor called RuBP is rubisco - probably the most abundant protein on Earth."
      - text: "The link is a two-way loop. Light reactions send chemical energy one way; the Calvin cycle sends empty carriers back to be reloaded. Neither runs long without the other."
      - text: "Now block water splitting. Photosystem II loses electrons to light and cannot replace them, so electron flow stops dead."
      - text: "No electron flow means no H+ pumping, so no gradient, so no ATP. No NADPH either, since that is made at the end of the chain. And no O2, since that was the leftover from splitting water."
      - text: "The Calvin cycle keeps going briefly on whatever ATP and NADPH remain, then stops. Note carefully why: not because it needs water, and not because it needs light, but because its two inputs have dried up. That indirect dependence is exactly what the question is testing."
    source: original
    verified: true
---

> 6 CO2 + 6 H2O + light -> C6H12O6 + 6 O2

Photosynthesis runs in **two halves**, in two different parts of the
chloroplast, and almost every exam question turns on keeping them straight.

### Light reactions - in the thylakoid membranes

**In:** light, water. **Out:** O2, ATP, NADPH.

1. Light knocks electrons out of chlorophyll to a high energy level.
2. **Water is split** to replace those lost electrons. This releases H+ and
   oxygen atoms, which pair up as **O2**.
3. The energised electrons travel down an electron transport chain, and the
   energy released **pumps H+** into the thylakoid space.
4. H+ floods back out through **ATP synthase**, making **ATP**.
5. At the end of the chain, electrons are loaded onto NADP+ to make **NADPH**.

> **The oxygen you breathe comes from water, not CO2.** The plant was after
> water's *electrons*; the oxygen was leftover waste. This was settled by
> labelling water with a heavy oxygen isotope and watching where it came out.

### Calvin cycle - in the stroma

**In:** CO2, ATP, NADPH. **Out:** G3P (built up into glucose), plus empty ADP
and NADP+ returned.

The enzyme **rubisco** attaches CO2 to a 5-carbon molecule called RuBP - it is
probably the most abundant protein on Earth. **One CO2 per turn**, so **six
turns per glucose**, costing **18 ATP and 12 NADPH**.

### Why "light-independent" is a confusing name

The Calvin cycle uses no light **itself** - there is no light-absorbing step in
it. But its ATP and NADPH come only from the light reactions, and neither is
stockpiled. So a plant in the dark stops making sugar within minutes.

*Independent of light directly, utterly dependent on it in practice.* The
two halves form a loop: light reactions send chemical energy one way, the
Calvin cycle sends empty carriers back to be refilled.

### Compare it with respiration

Startlingly similar machinery - an electron transport chain in a membrane,
pumping H+, with ATP synthase harvesting the flow. **Both use chemiosmosis.**

The difference is **where the high-energy electrons come from**:

- **Respiration:** stripped from food. Energy flows **downhill** the whole way.
- **Photosynthesis:** taken from water, which holds them tightly and at low
  energy, then **kicked uphill by light**.

So photosynthesis uses sunlight to load energy *into* glucose, and respiration
unloads it. Nearly every ecosystem on Earth is that pair running in a loop.

### The stomata trade-off

**Stomata** are adjustable pores on a leaf's underside - the only route for gas
exchange. On a hot dry day a plant closes them to stop losing water. But the
same pores were letting **CO2** in, so the Calvin cycle starves and sugar
production stalls *in full sunlight*.

Lose water or stop eating, with no good answer. It is why hot climates drove
the evolution of workarounds like C4 and CAM photosynthesis. And it gets worse:
with CO2 scarce, rubisco starts mistakenly grabbing **O2** instead, a wasteful
process called **photorespiration**.
