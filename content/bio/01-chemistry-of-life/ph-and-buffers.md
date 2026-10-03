---
id: bio.col.ph
unit: bio.u-chemistry-of-life
subject: bio
title: pH and Buffers
depth: both
ced:
  - SYI-1.C
prereqs:
  - bio.col.water-properties
items:
  - id: bio.col.ph.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "A solution has a hydrogen ion concentration of 1 x 10^-4 M. What is its pH?"
    answer: { value: 4, unit: null, sigFigs: null }
    solution:
      - text: "pH is just the exponent with the minus sign taken off."
      - text: "The concentration is 10^-4, so the pH is 4."
      - text: "Formally pH = -log of the hydrogen ion concentration, and the log of 10^-4 is -4, so the minus signs cancel."
      - text: "No calculator needed when the concentration is a clean power of ten. Read the exponent, drop the minus."
      - text: "Under 7 is acidic, 7 is neutral, over 7 is basic. So pH 4 is acidic."
    source: original
    verified: true
  - id: bio.col.ph.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "A solution has pH 9. What is its hydrogen ion concentration, in moles per litre?"
    answer: { value: 1e-9, unit: M, acceptedUnits: ["mol/L", "mol/dm^3"], sigFigs: null }
    solution:
      - text: "Run it backwards: concentration = 10 to the power of minus the pH."
      - text: "pH 9 gives 10^-9 M."
      - text: "You can type that as 1e-9 or 1 x 10^-9."
      - text: "Sanity check: pH 9 is basic, so there should be very few hydrogen ions. 10^-9 is a billionth of a mole per litre. Very few indeed."
      - text: "Compare with pH 1 at 10^-1 M - a tenth of a mole per litre. That is a hundred million times more concentrated."
    source: original
    verified: true
  - id: bio.col.ph.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "How many times more hydrogen ions are in a pH 3 solution than a pH 6 solution?"
    answer: { value: 1000, unit: null, sigFigs: null }
    solution:
      - text: "The pH scale is logarithmic, so each step of 1 is a factor of 10."
      - text: "From pH 6 to pH 3 is three steps."
      - text: "10 x 10 x 10 = 1000 times more concentrated."
      - text: "Check it directly: 10^-3 divided by 10^-6 = 10^3 = 1000."
      - text: "This is the point people miss about pH. It is not a linear scale - pH 3 is not 'twice as acidic' as pH 6, it is a thousand times. Which is exactly why a small drift in blood pH is a medical emergency."
    source: original
    verified: true
  - id: bio.col.ph.i4
    tier: standard
    type: numeric
    depth: both
    prompt: "A solution has pH 5.5. What is its pOH?"
    answer: { value: 8.5, unit: null, sigFigs: null }
    solution:
      - text: "In any water solution, pH + pOH = 14."
      - text: "14 - 5.5 = 8.5"
      - text: "Why 14: water constantly splits a little into H+ and OH-, and the product of their concentrations is always 10^-14 at room temperature."
      - text: "So the two are locked together. Push the hydrogen ions up and the hydroxide ions must come down."
      - text: "Which is why you never need both numbers. One tells you the other."
    source: original
    verified: true
  - id: bio.col.ph.i5
    tier: standard
    type: mcq
    depth: both
    prompt: "Blood is held between pH 7.35 and 7.45. Outside that narrow band you are in serious trouble. Why is it so tight?"
    answer:
      correctId: c
      options:
        - id: a
          text: Because blood cells burst outside that range
          why: "Bursting is about water and solute concentration, not pH. The real damage is to proteins."
        - id: b
          text: Because oxygen will not dissolve at other pH values
          why: "Oxygen's solubility barely depends on pH. The problem is what pH does to proteins."
        - id: c
          text: Because pH changes which groups on a protein are charged, which wrecks the folding that proteins depend on
        - id: d
          text: It is not actually that tight - the range is just a guideline
          why: "A drift of about 0.4 either way is life-threatening. The band really is that narrow."
    solution:
      - text: "A protein's shape is held by attractions between charged and polar groups along its chain."
      - text: "Whether those groups ARE charged depends on the surrounding pH - add hydrogen ions and they get taken up; remove them and they come off."
      - text: "Change the charges and the attractions holding the fold together stop working. The protein changes shape and stops functioning."
      - text: "Every enzyme in you is a protein. A pH shift does not damage one thing, it degrades thousands of reactions at once."
      - text: "Remember the logarithmic scale here: pH 7.4 down to 7.0 sounds tiny, but it is well over twice the hydrogen ion concentration."
    source: original
    verified: true
  - id: bio.col.ph.i6
    tier: challenge
    type: mcq
    depth: both
    prompt: "What does a buffer actually do, and how?"
    answer:
      correctId: b
      options:
        - id: a
          text: It prevents any acid or base from entering the solution
          why: "Nothing blocks acid from arriving. A buffer absorbs it after it gets there."
        - id: b
          text: It holds a reserve of both a weak acid and its partner base, so added H+ or OH- is mopped up instead of changing the pH
        - id: c
          text: It keeps the pH at exactly 7
          why: "Buffers hold a pH steady wherever they are set - stomach and blood buffers sit at very different values."
        - id: d
          text: It neutralises acid by being a strong base
          why: "A strong base would overshoot and swing the pH the other way. Buffering needs a weak acid-base pair that can absorb in both directions."
    solution:
      - text: "A buffer is a pair that coexists: a weak acid and the base it turns into."
      - text: "In your blood that pair is carbonic acid and bicarbonate."
      - text: "Add acid, and the bicarbonate grabs the extra H+, turning into carbonic acid. The H+ is taken out of circulation and the pH barely budges."
      - text: "Add base, and the carbonic acid releases an H+ to cancel the OH-. Same result from the other direction."
      - text: "So it works both ways, which is the key - you need a reserve of each half, which is why a strong base alone cannot buffer."
      - text: "It is not unlimited. Use up one half and the buffer is exhausted, after which the pH moves fast. That is the cliff edge in acidosis."
    source: original
    verified: true
  - id: bio.col.ph.i7
    tier: ap
    type: frq
    depth: both
    prompt: "Holding your breath makes blood pH fall. Hyperventilating makes it rise. Explain the mechanism in terms of the carbonic acid-bicarbonate buffer, and say why the lungs are such an effective pH control."
    answer:
      model: "Carbon dioxide dissolves in blood and reacts with water to form carbonic acid, which dissociates into hydrogen ions and bicarbonate. The whole chain is reversible, so the amount of CO2 present sets the position of the equilibrium. Holding your breath lets CO2 build up, pushing the reaction toward more carbonic acid and therefore more hydrogen ions, so the pH falls - respiratory acidosis. Hyperventilating blows CO2 off faster than it is produced, pulling the reaction backwards: hydrogen ions are consumed to replace the lost carbonic acid, so the pH rises - respiratory alkalosis. The lungs are effective because CO2 is volatile, so the body can expel the acid-forming substance entirely rather than having to neutralise or excrete it. Breathing rate is also adjustable within seconds, whereas kidney correction takes hours to days."
      rubric:
        - "1 point: CO2 plus water gives carbonic acid, which dissociates to H+ and bicarbonate"
        - "1 point: identifies the chain as a reversible equilibrium shifted by CO2 level"
        - "1 point: holding breath raises CO2, raises H+, lowers pH"
        - "1 point: hyperventilating lowers CO2, consumes H+, raises pH"
        - "1 point: explains the lungs are fast and can remove CO2 entirely because it is a gas"
    solution:
      - text: "Start with the chain. CO2 + H2O gives H2CO3 (carbonic acid), which splits into H+ and HCO3- (bicarbonate)."
      - text: "Every arrow in that chain runs both ways. So the level of CO2 controls where the whole thing sits."
      - text: "Hold your breath: CO2 accumulates. More CO2 pushes the chain forward, making more carbonic acid and so more H+. More H+ means lower pH - respiratory acidosis."
      - text: "Hyperventilate: you blow off CO2 faster than your body makes it. Removing CO2 pulls the chain backwards."
      - text: "Running backwards consumes H+ to rebuild the carbonic acid being lost. Fewer H+ means higher pH - respiratory alkalosis."
      - text: "This is why hyperventilating makes you dizzy and tingly: it is not a lack of oxygen, it is a pH shift from losing too much CO2."
      - text: "Why the lungs are so good at this: CO2 is a GAS, so the acid-forming substance can be physically expelled rather than neutralised or filtered out."
      - text: "And speed. You can change your breathing rate in a second or two. Your kidneys also regulate blood pH, far more precisely, but they take hours to days."
      - text: "So the two systems divide the work: lungs for fast coarse control, kidneys for slow fine control."
    source: original
    verified: true
  - id: bio.col.ph.i8
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: what pH measures, why the scale is logarithmic, and why cells care."
    answer:
      model: "pH measures the concentration of hydrogen ions in a solution, as the negative logarithm of that concentration. Low pH means a lot of hydrogen ions and is acidic; high pH means few and is basic; 7 is neutral. The scale is logarithmic because hydrogen ion concentrations in water span many orders of magnitude, so each whole pH unit is a tenfold change in concentration. Cells care because pH determines which groups on a protein carry a charge, and those charges hold the protein's fold together. Change the pH and proteins change shape and stop working, which is why enzymes have narrow optimal ranges and why blood is buffered to roughly 7.4."
      rubric:
        - "pH measures hydrogen ion concentration, as a negative log"
        - "Below 7 acidic, 7 neutral, above 7 basic"
        - "Each unit is a factor of ten"
        - "Explains pH changes which groups are charged, altering protein shape"
        - "Mentions enzymes or blood buffering as the consequence"
    solution:
      - text: "pH is a measure of how many hydrogen ions are floating in a solution, written as the negative log of their concentration."
      - text: "Below 7 is acidic - plenty of hydrogen ions. Above 7 is basic - very few. 7 is neutral."
      - text: "It is logarithmic because concentrations range over about fourteen powers of ten. A linear scale would be unusable."
      - text: "So each whole unit is a factor of 10. pH 4 has a thousand times more hydrogen ions than pH 7, not a bit more."
      - text: "Cells care because hydrogen ions attach to and detach from groups on proteins, changing their charge."
      - text: "Those charges are part of what holds a protein's fold together. Change them and the shape changes and the protein stops working."
      - text: "Hence narrow enzyme optima, hence blood buffered hard at 7.35 to 7.45, hence why a stomach at pH 2 needs entirely different enzymes from the rest of you."
    source: original
    verified: true
---

Water does something slightly odd: a tiny fraction of it is always splitting
apart into **H⁺** and **OH⁻**. **pH** measures how many of those H⁺ ions are
around.

> pH = −log[H⁺]

For clean powers of ten you need no calculator at all - **read the exponent and
drop the minus sign**:

> [H⁺] = 10⁻⁴ M → **pH 4**

| pH | Means |
|---|---|
| **< 7** | Acidic — lots of H⁺ |
| **7** | Neutral |
| **> 7** | Basic — very few H⁺ |

And the partner scale: **pH + pOH = 14**, always, in water at room
temperature. One number always gives you the other.

### Logarithmic is the whole point

**Each whole pH unit is a factor of ten.**

pH 3 is not "twice as acidic" as pH 6 — it is a **thousand times** more
concentrated in H⁺. People consistently underestimate this, and it is why
small-sounding pH shifts are medical emergencies.

### Why cells care so much

A protein's fold is held together by attractions between **charged and polar
groups** along its chain. Whether those groups are actually charged depends on
the surrounding pH — add H⁺ and they pick it up; remove H⁺ and they lose it.

Change the charges, and the attractions holding the fold stop working. The
protein **changes shape and stops functioning**.

Every enzyme in you is a protein. So a pH shift does not break one thing — it
degrades **thousands of reactions at once**. That is why blood is held between
**7.35 and 7.45**, and why a drift of 0.4 is life-threatening.

### Buffers

A **buffer** is a **weak acid and its partner base coexisting**, so the
solution has a reserve of each. In blood that pair is **carbonic acid** and
**bicarbonate**:

- **Acid added?** Bicarbonate grabs the extra H⁺, becoming carbonic acid. The
  H⁺ is taken out of circulation.
- **Base added?** Carbonic acid gives up an H⁺ to cancel the OH⁻.

It absorbs in **both directions**, which is exactly why you need both halves
present — and why a strong base alone cannot buffer anything.

**Buffers are not unlimited.** Exhaust one half and the pH starts moving fast.
That cliff edge is what makes acidosis dangerous.

### The lungs as a pH control

> CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻

Every arrow runs both ways, so **the CO₂ level sets where the whole chain
sits**:

- **Hold your breath** → CO₂ builds up → more H⁺ → **pH falls**
- **Hyperventilate** → CO₂ blown off → H⁺ consumed → **pH rises**

That second one is why hyperventilating makes you dizzy and tingly. It isn't a
lack of oxygen — it's a pH shift from losing too much CO₂.

The lungs are unusually good at this for two reasons: CO₂ is a **gas**, so the
acid-forming substance can be physically expelled rather than neutralised; and
you can change your breathing **in seconds**. Your kidneys also regulate blood
pH, far more precisely, but take hours to days. Lungs for fast coarse control,
kidneys for slow fine control.
