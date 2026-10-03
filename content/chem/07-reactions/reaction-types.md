---
id: chem.reactions.types
unit: chem.u-reactions
subject: chem
title: Types of Reaction
depth: both
ced:
  - SPQ-3.2
prereqs:
  - chem.reactions.balancing
items:
  - id: chem.reactions.types.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "2 Mg + O2 -> 2 MgO. What type of reaction is this?"
    answer:
      correctId: a
      options:
        - id: a
          text: Synthesis - two things combine into one
        - id: b
          text: Decomposition - because the O2 bond breaks
          why: "Bonds break in every reaction. Decomposition means one reactant becomes several products, and here it is the other way round."
        - id: c
          text: Single replacement
          why: "Single replacement needs an element swapping places with one inside a compound. There is no compound on the left here."
        - id: d
          text: Combustion, because magnesium burns brightly
          why: "A fair thought - it does burn in oxygen. But combustion usually means a hydrocarbon burning to CO2 and water. This is cleanest classified as synthesis."
    solution:
      - text: "Count the reactants and products. Two things in, one thing out."
      - text: "That is synthesis - also called a combination reaction. Pattern: A + B -> AB."
      - text: "Magnesium burning in oxygen to form magnesium oxide, which is the brilliant white light in old flash photography."
      - text: "Easiest type to spot because the shape of the equation gives it away before you look at any chemistry."
    source: original
    verified: true
  - id: chem.reactions.types.i2
    tier: warmup
    type: mcq
    depth: both
    prompt: "2 H2O2 -> 2 H2O + O2. What type is this?"
    answer:
      correctId: c
      options:
        - id: a
          text: Synthesis
          why: "Synthesis combines things into one. Here one substance splits into two, which is the reverse."
        - id: b
          text: Double replacement
          why: "Double replacement needs two compounds swapping partners. There is only one reactant."
        - id: c
          text: Decomposition - one compound breaks into simpler substances
        - id: d
          text: Combustion
          why: "Nothing is burning in oxygen here - oxygen is being PRODUCED."
    solution:
      - text: "One reactant, two products. That is decomposition: AB -> A + B."
      - text: "This is hydrogen peroxide slowly breaking down, which is why the bottle is dark brown - light speeds it up."
      - text: "Put it on a cut and the fizzing is this reaction running fast, because an enzyme in your blood called catalase catalyses it."
      - text: "Synthesis and decomposition are exact opposites, so the two are easy to tell apart by counting reactants."
    source: original
    verified: true
  - id: chem.reactions.types.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "Zn + CuSO4 -> ZnSO4 + Cu. What type is this, and what is physically happening?"
    answer:
      correctId: b
      options:
        - id: a
          text: Double replacement - the metals swap
          why: "Double replacement needs TWO compounds. Here one reactant is a bare element, zinc metal."
        - id: b
          text: Single replacement - a lone element pushes another out of its compound
        - id: c
          text: Decomposition
          why: "Nothing broke into simpler pieces. Two substances went in and two came out."
        - id: d
          text: Synthesis
          why: "Synthesis would combine everything into one product. There are two products here."
    solution:
      - text: "The shape is: element + compound -> different element + different compound. That is single replacement."
      - text: "Pattern: A + BC -> AC + B."
      - text: "Physically, zinc is more reactive than copper, so it takes copper's place in the sulfate and copper is forced out as the free metal."
      - text: "You can actually watch this. Drop a zinc strip into blue copper sulfate solution and the blue fades while a brown-red copper coating appears on the zinc."
      - text: "The direction matters. It only runs if the lone element is MORE reactive than the one it is displacing. Copper metal in zinc sulfate does nothing at all."
    source: original
    verified: true
  - id: chem.reactions.types.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "AgNO3 + NaCl -> AgCl + NaNO3. What type is this, and what do you see happen?"
    answer:
      correctId: d
      options:
        - id: a
          text: Single replacement, with sodium displacing silver
          why: "Single replacement needs a lone element. Both reactants here are compounds."
        - id: b
          text: Synthesis, since four substances become two
          why: "Count again - two reactants become two products. Nothing combined."
        - id: c
          text: Decomposition
          why: "Nothing split into simpler pieces. Partners were exchanged."
        - id: d
          text: Double replacement - the two compounds swap partners, and a white solid precipitates
    solution:
      - text: "Two compounds in, two compounds out, with the partners exchanged. That is double replacement."
      - text: "Pattern: AB + CD -> AD + CB. Silver pairs with chloride; sodium pairs with nitrate."
      - text: "What you see: both reactants are clear solutions, and a cloudy white solid appears almost instantly. That solid is silver chloride."
      - text: "The reaction runs precisely BECAUSE silver chloride is insoluble. Pulling it out of solution as a solid is what drives the exchange."
      - text: "If both products were soluble, nothing would happen - you would just have four ions mixed in water. Double replacement needs a reason: a precipitate forming, a gas escaping, or water being made."
      - text: "This specific reaction is a standard test for chloride ions, because the white precipitate is so immediate and obvious."
    source: original
    verified: true
  - id: chem.reactions.types.i5
    tier: standard
    type: numeric
    depth: both
    prompt: "Combustion of butane: 2 C4H10 + 13 O2 -> 8 CO2 + 10 H2O. How many oxygen ATOMS are on the left-hand side?"
    answer: { value: 26, unit: null, sigFigs: null }
    solution:
      - text: "Careful - the question asks for atoms, not molecules."
      - text: "There are 13 O2 molecules, and each contains 2 oxygen atoms."
      - text: "13 x 2 = 26 oxygen atoms."
      - text: "Check against the right-hand side: 8 CO2 gives 16, and 10 H2O gives 10. Total 26. Balanced."
      - text: "That is a lot of oxygen for one fuel molecule, and it is a general feature of hydrocarbon combustion - which is why fires need so much air and why they smother so easily."
      - text: "Butane is lighter fuel. Burn it completely and you get only CO2 and water."
    source: original
    verified: true
  - id: chem.reactions.types.i6
    tier: challenge
    type: mcq
    depth: both
    prompt: "HCl + NaOH -> NaCl + H2O is a double replacement, but it also has its own name. What is it, and why does it matter?"
    answer:
      correctId: c
      options:
        - id: a
          text: Precipitation, because salt forms
          why: "Sodium chloride is soluble and stays dissolved. Nothing precipitates here."
        - id: b
          text: Combustion, because it releases heat
          why: "It does release heat, but combustion specifically means burning in oxygen. There is no oxygen gas involved."
        - id: c
          text: Neutralisation - an acid and a base producing water and a salt
        - id: d
          text: Decomposition, because the acid breaks apart
          why: "Both reactants are present and both products form by exchange. Nothing decomposed."
    solution:
      - text: "Structurally it is double replacement - the partners swap. But acid plus base is important enough to have its own name."
      - text: "Neutralisation: acid + base -> salt + water."
      - text: "What is really happening is H+ from the acid meeting OH- from the base and combining into water."
      - text: "Water forming is what drives it - that is the reason the exchange happens, exactly as a precipitate drives other double replacements."
      - text: "Here 'salt' means any ionic compound from such a reaction, not just table salt - though in this particular case it genuinely is NaCl."
      - text: "This is one reaction type you will meet again properly in the acids and bases unit, and it is worth recognising its shape now."
    source: original
    verified: true
  - id: chem.reactions.types.i7
    tier: challenge
    type: mcq
    depth: both
    prompt: "Two clear solutions are mixed and absolutely nothing happens - no solid, no gas, no temperature change. What does that tell you?"
    answer:
      correctId: b
      options:
        - id: a
          text: The chemicals were too dilute
          why: "Dilution slows a reaction but does not prevent one. A precipitate would still form, just more slowly or faintly."
        - id: b
          text: All the possible products are soluble, so there is no reason for any exchange - the ions just mix
        - id: c
          text: One solution must have gone off
          why: "A perfectly ordinary and expected outcome. Many pairs of solutions simply do not react."
        - id: d
          text: The reaction happened but is invisible
          why: "Without a precipitate, gas, or water forming, there is genuinely nothing driving an exchange. No reaction occurred."
    solution:
      - text: "In solution, an ionic compound is already split into separate ions drifting about."
      - text: "Mix two such solutions and you have four kinds of ion in one beaker."
      - text: "For a reaction to happen, some pair has to have a REASON to leave the solution."
      - text: "Three reasons exist: they form an insoluble solid (a precipitate), they form a gas that bubbles off, or they form water."
      - text: "If none applies - every possible combination stays dissolved - nothing happens. The ions carry on drifting, now in a slightly more crowded beaker."
      - text: "This is why solubility rules are worth learning. They are how you predict in advance whether mixing two solutions will do anything at all."
    source: original
    verified: true
  - id: chem.reactions.types.i8
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: the five reaction types with their patterns."
    answer:
      model: "Synthesis combines two or more substances into one, pattern A plus B gives AB. Decomposition is the reverse: one compound breaks into simpler substances, AB gives A plus B. Single replacement has a lone element displacing another from its compound, A plus BC gives AC plus B, and it only runs if the lone element is more reactive. Double replacement has two compounds exchanging partners, AB plus CD gives AD plus CB, and it needs a driving force such as a precipitate forming, a gas escaping, or water being produced. Combustion is a fuel burning in oxygen, and for a hydrocarbon the products are carbon dioxide and water. Neutralisation is a special double replacement where an acid and a base give a salt and water."
      rubric:
        - "Synthesis: A + B gives AB"
        - "Decomposition: AB gives A + B"
        - "Single replacement: element displaces another, and requires greater reactivity"
        - "Double replacement: partners swap, and needs a driving force"
        - "Combustion: fuel plus oxygen, giving CO2 and water for a hydrocarbon"
    solution:
      - text: "Synthesis: A + B -> AB. Two or more things become one. 2 Mg + O2 -> 2 MgO."
      - text: "Decomposition: AB -> A + B. One thing becomes several. The exact reverse of synthesis."
      - text: "Single replacement: A + BC -> AC + B. A lone element pushes another out of its compound - and only if it is the more reactive of the two."
      - text: "Double replacement: AB + CD -> AD + CB. Two compounds swap partners. It needs a driving force: a precipitate, a gas, or water."
      - text: "Combustion: fuel + O2 -> products, and for a hydrocarbon that is always CO2 + H2O."
      - text: "Neutralisation: acid + base -> salt + water. Technically a double replacement, driven by the water forming."
      - text: "Fastest way to classify: count reactants and products first. One product means synthesis. One reactant means decomposition. Two and two means a replacement, and then you only need to check whether a lone element is involved."
    source: original
    verified: true
---

Most reactions you will meet fall into five patterns. Being able to classify
one lets you **predict the products** before you know anything else about it.

| Type | Pattern | Example |
|---|---|---|
| **Synthesis** | A + B → AB | 2 Mg + O₂ → 2 MgO |
| **Decomposition** | AB → A + B | 2 H₂O₂ → 2 H₂O + O₂ |
| **Single replacement** | A + BC → AC + B | Zn + CuSO₄ → ZnSO₄ + Cu |
| **Double replacement** | AB + CD → AD + CB | AgNO₃ + NaCl → AgCl + NaNO₃ |
| **Combustion** | fuel + O₂ → CO₂ + H₂O | C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O |

### Classifying quickly

**Count reactants and products first**, before looking at any chemistry:

- **One product** → synthesis
- **One reactant** → decomposition
- **Two and two** → a replacement — then just check whether a **lone element**
  is involved (single) or not (double)

### Single replacement needs the right direction

> Zn + CuSO₄ → ZnSO₄ + Cu ✅
> Cu + ZnSO₄ → nothing ❌

It only runs if the lone element is **more reactive** than the one it is
displacing. Zinc beats copper, so zinc can take its place — not the reverse.

This one is genuinely watchable: drop zinc into blue copper sulfate and the
blue fades while red-brown copper plates onto the zinc.

### Double replacement needs a *reason*

Here is the bit that gets skipped. In solution, an ionic compound is **already
split into free ions**. Mix two solutions and you have four kinds of ion
drifting in one beaker — nothing has happened yet.

For a reaction to occur, some pair must have a reason to **leave** the
solution. There are exactly three:

1. They form an **insoluble solid** — a precipitate
2. They form a **gas** that bubbles off
3. They form **water**

**If none applies, nothing happens.** The ions just carry on drifting in a more
crowded beaker. Two clear solutions mixing to produce *no* change is a
completely normal outcome — not a failed experiment.

> AgNO₃ + NaCl works because **AgCl is insoluble.** That instant white cloud is
> the standard test for chloride ions.

This is exactly why **solubility rules** are worth learning: they let you
predict whether mixing two solutions will do anything at all.

### Neutralisation is a special double replacement

> acid + base → **salt + water**
> HCl + NaOH → NaCl + H₂O

Structurally it is partner-swapping, but it earns its own name. What is really
happening is **H⁺ meeting OH⁻ and becoming water** — and that water forming is
the driving force, exactly as a precipitate is in other cases.

"Salt" here means *any* ionic compound from such a reaction, not just table
salt — though in this example it genuinely is.

### Why this comes before stoichiometry

Stoichiometry runs entirely on the **mole ratio**, and the mole ratio **is the
coefficients of a balanced equation**. To balance an equation you first have to
know what the products *are* — and that is what classifying the reaction gives
you.
