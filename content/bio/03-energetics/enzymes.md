---
id: bio.energy.enzymes
unit: bio.u-energetics
subject: bio
title: Enzymes
depth: both
ced:
  - ENE-1.D
prereqs:
  - bio.col.water-properties
items:
  - id: bio.energy.enzymes.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "An enzyme speeds a reaction up enormously. What does it actually change about the reaction?"
    answer:
      correctId: c
      options:
        - id: a
          text: It makes the products more stable, so more energy is released
          why: "The products are unchanged. An enzyme never alters how much energy a reaction gives out."
        - id: b
          text: It supplies energy to push the reaction forward
          why: "Enzymes supply no energy. That is ATP's job, and it is a separate mechanism."
        - id: c
          text: It lowers the energy hump the reactants must get over to react at all
        - id: d
          text: It shifts the reaction's equilibrium toward the products
          why: "Equilibrium is untouched. An enzyme speeds up the forward and reverse directions equally, so it reaches the same end point faster."
    solution:
      - text: "Before any reaction can happen, the reactants have to be shoved into an awkward, strained arrangement. That hump is the activation energy."
      - text: "At body temperature most molecules do not have enough energy to get over it, so the reaction crawls."
      - text: "An enzyme lowers the hump - it holds the reactants in a position where the strained arrangement is much easier to reach."
      - text: "What it does NOT change: how much energy the reaction releases overall, or where equilibrium ends up."
      - text: "Useful way to hold it: an enzyme changes how fast you get there, never where you end up."
    source: original
    verified: true
  - id: bio.energy.enzymes.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "Enzymes are extremely picky - usually one enzyme per reaction. Where does that pickiness come from?"
    answer:
      correctId: b
      options:
        - id: a
          text: Each enzyme carries a chemical tag matching its target
          why: "There are no tags. Recognition is purely about physical shape and charge."
        - id: b
          text: The active site's shape and charge pattern only fit one particular molecule well
        - id: c
          text: Enzymes are made fresh for each individual reaction
          why: "A single enzyme molecule catalyses thousands of reactions before wearing out. They are reused, not single-use."
        - id: d
          text: The cell keeps each enzyme in its own compartment with only one substrate
          why: "Compartments help, but specificity holds even in a test tube with everything mixed together."
    solution:
      - text: "An enzyme is a protein folded into a precise three-dimensional shape."
      - text: "Somewhere on it is a pocket called the active site, and that pocket has a specific shape plus a specific pattern of charges and greasy patches."
      - text: "Only a molecule whose own shape and charges complement that pocket can settle into it properly. That molecule is the substrate."
      - text: "It is not a rigid lock and key. The enzyme flexes slightly to grip the substrate more closely once it arrives - that refinement is called induced fit."
      - text: "This is also the reason shape is everything in biology. Wreck the fold and the pocket is gone, even though every atom is still present."
    source: original
    verified: true
  - id: bio.energy.enzymes.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "An enzyme's activity climbs as you warm it, peaks, then falls off a cliff. Why the cliff rather than a gentle decline?"
    answer:
      correctId: a
      options:
        - id: a
          text: Past a point the protein's fold comes apart, destroying the active site - and it does not come back
        - id: b
          text: The substrate gets used up faster at high temperature
          why: "Running out of substrate would be a supply problem, and it would affect low temperatures too. This is about the enzyme itself."
        - id: c
          text: Heat makes the enzyme move too fast to bind anything
          why: "Faster movement means more collisions, which helps. The collapse is structural, not about speed."
        - id: d
          text: The enzyme starts catalysing the reverse reaction instead
          why: "Enzymes always catalyse both directions. Nothing flips at high temperature."
    solution:
      - text: "Warming helps at first for a simple reason: molecules move faster, so enzyme and substrate collide more often."
      - text: "But the fold of a protein is held by many weak interactions - hydrogen bonds, greasy patches clustering away from water, charge attractions."
      - text: "Heat shakes those apart. Past a threshold the whole structure unravels, and the active site's precise shape is gone."
      - text: "That is denaturation, and for most enzymes it is irreversible. A cooked egg does not uncook."
      - text: "Hence the cliff. Up to the peak you are helping collisions; past it you are destroying the catalyst itself."
      - text: "Extreme pH does the same thing by a different route - it changes which groups are charged, so the attractions holding the fold together stop working."
    source: original
    verified: true
  - id: bio.energy.enzymes.i4
    tier: challenge
    type: mcq
    depth: both
    prompt: "Two inhibitors slow the same enzyme. Piling on more substrate overcomes the first one but does nothing against the second. What does that tell you about each?"
    answer:
      correctId: c
      options:
        - id: a
          text: The first is stronger, the second weaker
          why: "Strength is not the difference. They are binding in different places, which is why extra substrate helps against only one."
        - id: b
          text: The first binds permanently, the second reversibly
          why: "Permanence is a separate property. Reversible competitive inhibitors are still outcompeted by extra substrate."
        - id: c
          text: The first competes for the active site; the second binds elsewhere and deforms it
        - id: d
          text: The second has denatured the enzyme completely
          why: "A denatured enzyme is dead regardless of inhibitor concentration. Inhibition is a reversible effect on a working enzyme."
    solution:
      - text: "Think about what extra substrate can and cannot fix."
      - text: "If an inhibitor is sitting in the active site, it is in a race with the substrate for the same pocket. Flood the cell with substrate and substrate wins more often. That is competitive inhibition - and it can be outcompeted."
      - text: "If an inhibitor binds somewhere else on the protein, it changes the enzyme's shape from a distance, bending the active site out of a working form."
      - text: "Extra substrate is useless there - it is not a competition. The pocket is simply the wrong shape now. That is non-competitive inhibition."
      - text: "The experiment in this question is exactly how you tell them apart in a lab: vary the substrate and see whether the inhibition can be swamped."
      - text: "Cells use the second kind deliberately. When a pathway's end product builds up, it binds the first enzyme in the pathway and switches it off - feedback inhibition, which stops the cell wasting resources."
    source: original
    verified: true
  - id: bio.energy.enzymes.i5
    tier: ap
    type: frq
    depth: both
    prompt: "A student claims that because an enzyme speeds up a reaction, it must be supplying energy to that reaction. Explain why this is wrong, and describe what an enzyme does and does not change about a reaction's energetics."
    answer:
      model: "An enzyme supplies no energy at all. It lowers the activation energy - the hump the reactants must get over before they can react - by holding them in an orientation where the strained transition state is much easier to reach. It does not change the overall energy difference between reactants and products, so the amount of energy the reaction releases or absorbs is identical with or without the enzyme. It also does not change the equilibrium position, because it speeds the forward and reverse reactions equally; it only reaches that same equilibrium faster. Energy for reactions that genuinely require it comes from coupling to ATP hydrolysis, which is a separate mechanism entirely. An enzyme is a catalyst, not a power source, and it is unchanged and reusable at the end."
      rubric:
        - "1 point: states enzymes lower activation energy"
        - "1 point: states enzymes supply no energy"
        - "1 point: states the overall energy change of the reaction is unaffected"
        - "1 point: states equilibrium position is unchanged, only the rate"
        - "1 point: identifies ATP coupling as the actual source of energy for energy-requiring reactions"
    solution:
      - text: "Separate two ideas the student has merged: how fast a reaction goes, and whether it releases or absorbs energy."
      - text: "An enzyme only touches the first. It lowers the activation energy by gripping the reactants in a position where the strained halfway arrangement is easier to reach."
      - text: "It never touches the second. The energy gap between reactants and products is a property of those molecules, and the enzyme changes neither."
      - text: "So an energy-releasing reaction releases exactly the same amount with the enzyme as without. It just does it far sooner."
      - text: "Equilibrium is also untouched, and the reason is neat: the enzyme speeds up forward and reverse equally, so the balance point is identical. You just arrive quicker."
      - text: "Where does energy come from for reactions that truly need it? Coupling to ATP, which is a different mechanism entirely. Enzymes and ATP solve different problems and often work together."
      - text: "Final nail: an enzyme comes out of the reaction completely unchanged and goes again. Nothing that donates energy could do that."
    source: original
    verified: true
---

Nearly every reaction in your body would, left alone at 37 degrees, take years.
**Enzymes** are what make life run on a usable timescale.

### What an enzyme changes, and what it does not

Before any reaction happens, the reactants have to be forced into an awkward,
strained arrangement partway to becoming products. Getting there takes energy -
the **activation energy**. At body temperature, most molecules simply do not
have enough, so the reaction barely proceeds.

An enzyme **lowers that hump**. It grips the reactants in exactly the
orientation where the strained arrangement is easy to reach.

What it emphatically does **not** do:

- **It supplies no energy.** That is ATP's job, and a separate mechanism.
- **It does not change how much energy the reaction releases.** That gap is a
  property of the molecules themselves.
- **It does not shift the equilibrium.** It speeds the forward and reverse
  directions equally, so you reach the same end point - just much sooner.

> One line to remember: **an enzyme changes how fast you get there, never where
> you end up.**

### Why they are so picky

An enzyme is a protein folded into a precise shape, with a pocket called the
**active site**. That pocket has a particular shape *and* a particular pattern
of charges and greasy patches. Only a molecule that complements all of it can
settle in - that molecule is the **substrate**.

It is not quite a rigid lock and key. The enzyme flexes slightly to grip the
substrate once it arrives, which is called **induced fit**.

This is why **shape is everything**. Lose the fold and the pocket is gone, even
with every atom still present.

### What breaks them

- **Heat.** Warming helps at first - more collisions. Past a threshold the fold
  shakes apart, the active site is destroyed, and for most enzymes that is
  permanent. The word is **denaturation**. A cooked egg does not uncook. Hence
  the characteristic curve: a rise, a peak, then a cliff.
- **Wrong pH.** Changes which groups are charged, so the attractions holding
  the fold together stop working. Same outcome, different route. Each enzyme has
  its own optimum - pepsin in your stomach wants pH 2; most of your others want
  about pH 7.

### Inhibition

- **Competitive** - the inhibitor sits in the active site, racing the substrate
  for the same pocket. **Flooding with substrate overcomes it.**
- **Non-competitive** - the inhibitor binds elsewhere and bends the active site
  out of shape. **Extra substrate does nothing**, because it was never a race.

That difference is a standard experiment: vary the substrate and see whether
the inhibition can be swamped.

Cells use non-competitive inhibition on purpose. When the end product of a
pathway accumulates, it switches off the **first** enzyme in that pathway -
**feedback inhibition** - so nothing is wasted making more of something already
abundant.
