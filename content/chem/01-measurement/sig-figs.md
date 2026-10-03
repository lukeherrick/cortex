---
id: chem.measure.sig-figs
unit: chem.u-measurement
subject: chem
title: Significant Figures
depth: both
ced:
  - SPQ-1.1
prereqs: []
items:
  - id: chem.measure.sig-figs.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: "How many significant figures are in 0.004560?"
    answer: { value: 4, unit: null, sigFigs: null }
    solution:
      - text: "Leading zeros are just placeholders - they tell you where the decimal point is, not how carefully you measured. Ignore them."
      - text: "That leaves 4560."
      - text: "The last zero counts, because there is a decimal point in the number. Someone wrote that zero on purpose."
      - text: "So: 4, 5, 6, 0 - four significant figures."
    source: original
    verified: true
  - id: chem.measure.sig-figs.i2
    tier: warmup
    type: numeric
    depth: both
    prompt: "How many significant figures are in 1200?"
    answer: { value: 2, unit: null, sigFigs: null }
    solution:
      - text: "No decimal point anywhere, so the trailing zeros are ambiguous - they might be real measurements or they might just be filling space."
      - text: "The convention is to assume they are filling space. So they do not count."
      - text: "Only the 1 and the 2 count: two significant figures."
      - text: "This is genuinely unsatisfying, and chemists agree - which is why scientific notation exists. Writing 1.200 x 10^3 says four figures with no ambiguity at all."
    source: original
    verified: true
  - id: chem.measure.sig-figs.i3
    tier: standard
    type: mcq
    depth: both
    prompt: "Why does 1200. with a decimal point on the end mean something different from 1200?"
    answer:
      correctId: c
      options:
        - id: a
          text: It does not - the dot is just punctuation
          why: "In a measurement the dot is deliberate notation. It is the only way to say those zeros were measured."
        - id: b
          text: It makes the number slightly larger
          why: "The value is identical. What changes is the claim about how precisely it was measured."
        - id: c
          text: The dot says the zeros were measured, so all four figures count
        - id: d
          text: It means the number is exact
          why: "It means four measured figures, not infinite precision. An exact number is something counted, not measured."
    solution:
      - text: "Significant figures are a claim about precision, not about size."
      - text: "1200 with no dot claims you know the value to the nearest hundred."
      - text: "1200. with the dot claims you know it to the nearest one - all four digits were actually measured."
      - text: "Same value, very different claim. The dot is the only way to say it in plain decimal notation."
      - text: "Honestly, write 1.200 x 10^3 instead. It says the same thing and nobody can miss it."
    source: original
    verified: true
  - id: chem.measure.sig-figs.i4
    tier: standard
    type: numeric
    depth: both
    prompt: "Round 0.0024891 to three significant figures."
    answer: { value: 0.00249, unit: null, sigFigs: 3 }
    solution:
      - text: "Find the first significant figure. Leading zeros do not count, so it is the 2."
      - text: "Count three from there: 2, 4, 8."
      - text: "The next digit decides the rounding. It is 9, which is 5 or more, so round up."
      - text: "0.0024891 becomes 0.00249."
      - text: "The leading zeros stay - they are holding the decimal point in place."
    source: original
    verified: true
  - id: chem.measure.sig-figs.i5
    tier: standard
    type: numeric
    depth: both
    prompt: "Calculate 4.56 x 1.4 and give the answer to the correct number of significant figures."
    answer: { value: 6.4, unit: null, sigFigs: 2 }
    solution:
      - text: "First the arithmetic: 4.56 x 1.4 = 6.384."
      - text: "Now the rule. For multiplying and dividing, the answer gets as many significant figures as the LEAST precise number you started with."
      - text: "4.56 has three. 1.4 has two. Two wins."
      - text: "6.384 rounded to two significant figures is 6.4."
      - text: "Why: 1.4 might really be anything from 1.35 to 1.45. You cannot invent precision you never measured, no matter how many digits your calculator shows."
    source: original
    verified: true
  - id: chem.measure.sig-figs.i6
    tier: challenge
    type: numeric
    depth: both
    prompt: "Calculate 12.11 + 18.0 + 1.013 and give the answer to the correct precision."
    answer: { value: 31.1, unit: null, sigFigs: 3 }
    solution:
      - text: "The arithmetic: 12.11 + 18.0 + 1.013 = 31.123."
      - text: "Careful - adding uses a DIFFERENT rule from multiplying. Adding cares about decimal places, not significant figures."
      - text: "Count decimal places: 12.11 has two, 18.0 has one, 1.013 has three. The fewest is one."
      - text: "So round the answer to one decimal place: 31.1."
      - text: "Why the rules differ: 18.0 is uncertain in the tenths place. Once you add it in, the whole total is uncertain in the tenths place - the sloppiest measurement poisons that column and everything to the right of it."
      - text: "Two rules, and mixing them up is the single most common sig-fig mistake. Multiply or divide: count significant figures. Add or subtract: count decimal places."
    source: original
    verified: true
  - id: chem.measure.sig-figs.i7
    tier: challenge
    type: mcq
    depth: both
    prompt: "You count exactly 24 students in a room, then work out the mass of pizza per student. How many significant figures does the 24 contribute?"
    answer:
      correctId: d
      options:
        - id: a
          text: One
          why: "Counting people has no uncertainty at all, so it cannot be the limiting measurement."
        - id: b
          text: Two
          why: "Two would mean the count might be 23.5 to 24.5 students, which is nonsense."
        - id: c
          text: Three, because you should write 24.0
          why: "Writing 24.0 would imply you measured to a tenth of a student. The count is simply exact."
        - id: d
          text: Infinite - it is an exact number and never limits the answer
    solution:
      - text: "Significant figures exist because measurements are uncertain. A ruler can mislead you; counting cannot."
      - text: "There are exactly 24 students. Not 24.1, not 23.9. There is no uncertainty to track."
      - text: "So an exact number is treated as having infinite significant figures and never limits your answer."
      - text: "Same goes for definitions: exactly 1000 m in a km, exactly 100 cm in a m. Those are agreed, not measured."
      - text: "Practical upshot: only the genuinely measured numbers in a problem decide your final precision. Ignore the counted and defined ones when you are looking for the weakest link."
    source: original
    verified: true
  - id: chem.measure.sig-figs.i8
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: both significant-figure rules, and what makes them different."
    answer:
      model: "For multiplication and division, the answer keeps as many significant figures as the measurement with the fewest significant figures. For addition and subtraction, the answer keeps as many decimal places as the measurement with the fewest decimal places. They differ because multiplying spreads relative uncertainty through the whole answer, while adding only damages the specific decimal column where the sloppiest measurement ran out. Exact numbers - counted things and definitions - have infinite significant figures and never limit the result."
      rubric:
        - "Multiply and divide: fewest significant figures"
        - "Add and subtract: fewest decimal places"
        - "Explains the difference is relative versus absolute uncertainty"
        - "Notes exact and counted numbers do not limit the answer"
    solution:
      - text: "Rule one - multiplying and dividing: count significant figures, keep the fewest."
      - text: "Rule two - adding and subtracting: count decimal places, keep the fewest."
      - text: "Why they differ: when you multiply, a 1% error in one factor makes roughly a 1% error in the answer. Uncertainty is proportional, so it is figures that matter."
      - text: "When you add, uncertainty lives in a particular decimal column. 18.0 is unsure in the tenths, so the sum is unsure in the tenths - regardless of how many digits anything else had."
      - text: "And exact numbers - counted objects, defined conversions - never limit anything, because they carry no uncertainty to pass on."
    source: original
    verified: true
---

This is the most-tested and least-loved topic in the course, and it is worth
getting right early, because **every single numeric answer in this app is
checked for significant figures.** Getting the chemistry right and the figures
wrong is marked differently from getting it wrong - but it is still not right.

Here is the actual point. A measurement carries a claim about how carefully it
was made. Writing **2.5 g** says "somewhere between 2.45 and 2.55". Writing
**2.500 g** says "between 2.4995 and 2.5005" - a far stronger claim, and one
you had better be able to back up. Significant figures are how you avoid
claiming precision you never had.

### Which digits count

- **Non-zero digits always count.** 4, 5, 6, 9 - always.
- **Leading zeros never count.** In 0.00456 the zeros are placeholders telling
  you where the point is. Three significant figures.
- **Zeros between significant digits count.** 1005 has four. That zero is
  trapped between real digits; it has nowhere to hide.
- **Trailing zeros count only if there is a decimal point.** 1200 has two.
  1200. has four. 1.20 has three.
- **In scientific notation, count the front part.** 6.02 x 10^23 has three.

That trailing-zero rule is genuinely annoying, and chemists think so too -
which is why **scientific notation exists**. `1.200 x 10^3` says four figures
with zero ambiguity. When in doubt, write it that way.

### The two rules, and why they are different

> **Multiply or divide** → answer keeps the **fewest significant figures**
> **Add or subtract** → answer keeps the **fewest decimal places**

Mixing these up is the most common sig-fig error there is, so here is why they
differ rather than just what they are.

**Multiplying** spreads uncertainty *proportionally*. If one factor is off by
1%, your answer is off by about 1%. Proportional error is measured in
figures - so figures are what you count.

**Adding** damages one specific *column*. 18.0 is uncertain in the tenths
place. Add it to anything and the total is uncertain in the tenths place too,
no matter how many beautiful digits the other numbers had. The sloppiest
measurement poisons its column and everything right of it.

### Exact numbers are free

Counted things (24 students, 3 beakers) and definitions (1000 m per km) have
**no uncertainty**, so they have infinite significant figures and never limit
your answer. When hunting for the weakest link in a calculation, only look at
the things that were actually *measured*.

### One practical habit

**Round at the end, not in the middle.** Carry extra digits through your
working and round once, at the final answer. Rounding at every step stacks
small errors into a big one - and it is how you end up two in the last place
off a correct answer with no idea why.
