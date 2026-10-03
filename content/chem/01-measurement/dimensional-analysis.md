---
id: chem.measure.dimensional-analysis
unit: chem.u-measurement
subject: chem
title: Units and Dimensional Analysis
depth: both
ced:
  - SPQ-1.2
prereqs:
  - chem.measure.sig-figs
items:
  - id: chem.measure.dimensional-analysis.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "You want to turn 500 cm into metres. Do you multiply by 100 or divide by 100? And what is the way to know without thinking about it?"
    answer:
      correctId: b
      options:
        - id: a
          text: Multiply, because metres are bigger
          why: "Metres being bigger is exactly why you need FEWER of them. Multiplying would give 50000 m, which is 50 km."
        - id: b
          text: Divide - and you can check by writing the units and seeing them cancel
        - id: c
          text: Divide, and you just have to memorise which way round it goes
          why: "Right answer, wrong method. Memorising dozens of conversions is how mistakes happen. Watching the units cancel means you never have to remember."
        - id: d
          text: Either - the units sort themselves out
          why: "They absolutely do not. 50000 m and 5 m are both wrong by a factor of 100."
    solution:
      - text: "Do not memorise directions. Write the conversion as a fraction and let the units tell you."
      - text: "You have cm and you want m. So you need a fraction with cm on the bottom, to cancel what you have."
      - text: "500 cm x (1 m / 100 cm) = 5 m"
      - text: "See how the cm on top cancels the cm on the bottom, leaving m? That is the whole technique."
      - text: "Had you flipped the fraction, you would be left with cm^2/m - not a real unit, and an instant signal you went the wrong way."
      - text: "This is called dimensional analysis, and it is the single most useful habit in chemistry. It turns 'which way round?' into something you can see."
    source: original
    verified: true
  - id: chem.measure.dimensional-analysis.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "Convert 2.50 km to centimetres. Give your answer in scientific notation."
    answer: { value: 250000, unit: cm, sigFigs: 3 }
    solution:
      - text: "Two steps, chained. km to m, then m to cm."
      - text: "2.50 km x (1000 m / 1 km) x (100 cm / 1 m)"
      - text: "Watch the cancelling: km cancels, then m cancels, leaving cm. The setup is right before you touch the arithmetic."
      - text: "2.50 x 1000 x 100 = 250000"
      - text: "Now significant figures. 2.50 has three, and the conversions are exact definitions, so the answer keeps three."
      - text: "Written plainly, 250000 only shows two significant figures - those trailing zeros are ambiguous. So write 2.50 x 10^5 cm."
      - text: "You can type that as 2.50e5 or 2.50 x 10^5. Both are read correctly."
    source: original
    verified: true
  - id: chem.measure.dimensional-analysis.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "How many seconds are there in 1.00 day? Give your answer in scientific notation."
    answer: { value: 86400, unit: s, sigFigs: 3 }
    solution:
      - text: "Chain the conversions you know: days to hours, hours to minutes, minutes to seconds."
      - text: "1.00 day x (24 h / 1 day) x (60 min / 1 h) x (60 s / 1 min)"
      - text: "day cancels, h cancels, min cancels. Left with s."
      - text: "24 x 60 x 60 = 86400"
      - text: "1.00 has three significant figures and the rest are exact, so: 8.64 x 10^4 s."
      - text: "Long chains are where this technique really pays. You never have to decide whether to multiply or divide at any step - just put the unit you want to kill on the bottom."
    source: original
    verified: true
  - id: chem.measure.dimensional-analysis.i4
    tier: challenge
    type: numeric
    depth: both
    prompt: "A car is doing 60.0 miles per hour. What is that in metres per second? Use 1 mile = 1609 m."
    answer: { value: 26.82, unit: m/s, acceptedUnits: ["m s^-1"], sigFigs: 3 }
    solution:
      - text: "This one has units on top AND on the bottom, so you fix them one at a time."
      - text: "Start: 60.0 mi / 1 h"
      - text: "Fix the top: x (1609 m / 1 mi) kills the miles and gives metres."
      - text: "Fix the bottom: x (1 h / 3600 s) kills the hours and gives seconds."
      - text: "60.0 x 1609 / 3600 = 96540 / 3600 = 26.8"
      - text: "60.0 has three significant figures, so the answer is 26.8 m/s."
      - text: "Worth filing away: roughly 60 mph is roughly 27 m/s. A sanity check for later - if you ever get 0.027 or 2700, you have slipped a factor of a thousand."
    source: original
    verified: true
  - id: chem.measure.dimensional-analysis.i5
    tier: standard
    type: mcq
    depth: both
    prompt: "A student converts 5.0 g to kilograms and gets 5000 kg. Without redoing the sum, how do you know it is wrong?"
    answer:
      correctId: a
      options:
        - id: a
          text: A kilogram is bigger than a gram, so the number must get smaller - and 5000 kg is five tonnes
        - id: b
          text: They should have used 100 instead of 1000
          why: "The factor is right - there are 1000 g in a kg. They used it the wrong way round, which is a different error."
        - id: c
          text: Grams cannot be converted to kilograms
          why: "They can; it is the same quantity measured on a different scale."
        - id: d
          text: It is not wrong
          why: "5.0 g is about a teaspoon of sugar. 5000 kg is about a lorry."
    solution:
      - text: "Build the reflex: bigger unit means fewer of them."
      - text: "A kilogram is a thousand times bigger than a gram, so the number of kilograms must be a thousand times smaller."
      - text: "5.0 g = 0.0050 kg. The number went down, as it had to."
      - text: "5000 kg is five tonnes. From five grams. A quick reality check catches this before any arithmetic does."
      - text: "Always ask: should this number get bigger or smaller? Then check that it did. It costs two seconds and catches the worst mistakes."
    source: original
    verified: true
  - id: chem.measure.dimensional-analysis.i6
    tier: challenge
    type: numeric
    depth: both
    prompt: "A lab needs 0.325 L of solution. The graduated cylinder is marked in millilitres. How many millilitres?"
    answer: { value: 325, unit: mL, sigFigs: 3 }
    solution:
      - text: "0.325 L x (1000 mL / 1 L) = 325 mL"
      - text: "L cancels, leaving mL. Litres are bigger, so the number got bigger - as expected."
      - text: "Three significant figures in, three out: 325 mL."
      - text: "A warning for next time: if this had come out as 250, you could not write it plainly and still claim three figures - 250 reads as two. You would need 2.50 x 10^2, or 250. with the decimal point."
      - text: "Handy to have memorised: 1 mL is exactly 1 cm^3. Volume in millilitres and volume in cubic centimetres are the same number, which is why density gets quoted either way."
    source: original
    verified: true
---

Chemistry is full of conversions and almost none of them are worth memorising.
What *is* worth building is one habit that makes the direction obvious every
time.

### Write the units down and let them cancel

Treat units like numbers in a fraction. To convert, multiply by a fraction that
puts the unit you want to **get rid of** on the **bottom**:

> 500 cm x (1 m / **100 cm**) = 5 m

The `cm` on top cancels the `cm` underneath and leaves `m`. You never had to
decide whether to multiply or divide - the units decided for you.

Flip it by mistake and you get `cm²/m`, which is not a real unit. **That is the
whole value of this method: a wrong setup produces a visibly nonsense unit
before you do any arithmetic.** The proper name is **dimensional analysis**.

### It chains

Long conversions are no harder, just longer. Each fraction kills one unit:

> 2.50 km x (1000 m / 1 km) x (100 cm / 1 m) = 2.50 x 10^5 cm

`km` dies, then `m` dies, and `cm` survives. No step requires a decision.

### Units on the bottom too

For something like miles per hour into metres per second, fix the top and the
bottom separately:

> (60.0 mi / 1 h) x (1609 m / 1 mi) x (1 h / 3600 s) = 26.8 m/s

### The two-second sanity check

Before you trust an answer, ask: **should this number have got bigger or
smaller?**

A kilogram is bigger than a gram, so a mass in kilograms is a *smaller number*.
If 5.0 g came out as 5000 kg, you have turned a teaspoon of sugar into a lorry,
and you knew that before checking any arithmetic.

### Prefixes worth knowing cold

| Prefix | Means | Example |
|---|---|---|
| kilo- (k) | x 1000 | 1 kg = 1000 g |
| centi- (c) | x 1/100 | 100 cm = 1 m |
| milli- (m) | x 1/1000 | 1000 mL = 1 L |
| micro- (µ) | x 1/1 000 000 | 10^6 µg = 1 g |
| nano- (n) | x 1/1 000 000 000 | 10^9 nm = 1 m |

And one freebie that comes up constantly: **1 mL is exactly 1 cm³.** Which is
why density gets quoted as g/mL and g/cm³ interchangeably - they are the same
number.

All of these are **definitions, not measurements**, so they are exact and never
limit your significant figures.
