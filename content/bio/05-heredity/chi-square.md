---
id: bio.hered.chi-square
unit: bio.u-heredity
subject: bio
title: The Chi-Square Test
depth: both
ced:
  - SP-5
prereqs:
  - bio.hered.mendel
items:
  - id: bio.hered.chi-square.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "You expect a 3:1 ratio and get 72 tall : 28 short instead of exactly 75 : 25. Why can't you just say 'close enough'?"
    answer:
      correctId: c
      options:
        - id: a
          text: You can - 72 is obviously close to 75
          why: "It looks close, but 'obviously' is doing a lot of work. The whole point of a statistical test is to replace that judgement with a number."
        - id: b
          text: Any deviation at all means the hypothesis is wrong
          why: "Random sampling always produces some deviation. Demanding exactness would reject every true hypothesis."
        - id: c
          text: Because 'close' is a judgement, and you need a rule that says how much deviation random chance alone can explain
        - id: d
          text: Because you should have used more plants
          why: "More plants help, but you still need a test. Larger samples do not remove the need to judge the deviation."
    solution:
      - text: "Random sampling never gives exact ratios. Flip a fair coin 100 times and 50-50 is actually one of the less likely single outcomes."
      - text: "So some deviation is expected even when the hypothesis is perfectly correct."
      - text: "The question is whether THIS much deviation is within what chance can produce, or too large to explain that way."
      - text: "Chi-square turns that into a number instead of an opinion. It measures total deviation, then compares it against how much chance alone typically produces."
      - text: "That is why exams insist on it: 'close enough' is not evidence, and two people can disagree about it. A test statistic cannot be argued with."
    source: original
    verified: true
  - id: bio.hered.chi-square.i2
    tier: standard
    type: numeric
    depth: both
    prompt: "You expect a 1:1 ratio from 100 offspring and observe 60 : 40. Calculate the chi-square value."
    answer: { value: 4, unit: null, sigFigs: null }
    solution:
      - text: "Expected is 50 of each, since 1:1 out of 100."
      - text: "The formula is the sum of (observed - expected) squared, divided by expected, for every category."
      - text: "First category: (60 - 50)^2 / 50 = 100 / 50 = 2"
      - text: "Second category: (40 - 50)^2 / 50 = 100 / 50 = 2"
      - text: "Add them: 2 + 2 = 4."
      - text: "Note the squaring. It makes every deviation positive, so a +10 and a -10 add up rather than cancelling to zero."
      - text: "And dividing by expected is what makes it fair - being 10 off when you expected 50 is serious, but being 10 off when you expected 5000 is nothing."
    source: original
    verified: true
  - id: bio.hered.chi-square.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "A cross produces four phenotype categories. What is the number of degrees of freedom?"
    answer: { value: 3, unit: null, sigFigs: null }
    solution:
      - text: "Degrees of freedom is the number of categories minus one."
      - text: "With four categories that is 4 - 1 = 3 degrees of freedom."
      - text: "The reason for the minus one: once you know the total and three of the four counts, the fourth is forced. It has no freedom to vary."
      - text: "So only three of the numbers are genuinely free, and the test accounts for that."
      - text: "This matters because the critical value depends on it. At p = 0.05, the critical value is 3.84 for 1 degree of freedom but 7.82 for 3."
      - text: "Using the wrong row of the table is the most common way to get the right chi-square and still reach the wrong conclusion."
    source: original
    verified: true
  - id: bio.hered.chi-square.i4
    tier: standard
    type: mcq
    depth: both
    prompt: "Your chi-square is 4.0 with 1 degree of freedom. The critical value at p = 0.05 is 3.84. What do you conclude?"
    answer:
      correctId: b
      options:
        - id: a
          text: The hypothesis is correct, since the values are close
          why: "The calculated value EXCEEDS the critical value, which points the other way - and chi-square never proves a hypothesis correct."
        - id: b
          text: Reject the null hypothesis - the deviation is too large to be explained by chance alone
        - id: c
          text: The experiment failed and should be repeated
          why: "A significant result is a finding, not a failure. It suggests something real is going on."
        - id: d
          text: Nothing can be concluded without more data
          why: "The test is designed to give a decision from the data you have. More data would be good practice, not a prerequisite."
    solution:
      - text: "The rule is simple: if the calculated chi-square is GREATER than the critical value, reject the null hypothesis."
      - text: "4.0 is greater than 3.84, so reject."
      - text: "What that means in plain terms: if the expected ratio were truly correct, a deviation this large would occur less than 5% of the time by chance. So something other than chance is probably involved."
      - text: "Note it was a near thing - 4.0 against 3.84. Had it been 3.5 you would have failed to reject."
      - text: "Careful with the wording. You REJECT the null hypothesis; you never 'prove the alternative'. And failing to reject is not proof that the hypothesis is true - only that you have no evidence against it."
      - text: "The null hypothesis in a genetics cross is always that the observed deviation is due to chance alone, and that the expected ratio holds."
    source: original
    verified: true
  - id: bio.hered.chi-square.i5
    tier: challenge
    type: numeric
    depth: both
    prompt: "A dihybrid cross expects a 9:3:3:1 ratio from 160 offspring. How many individuals are expected in the smallest category?"
    answer: { value: 10, unit: null, sigFigs: null }
    solution:
      - text: "A 9:3:3:1 ratio has 9 + 3 + 3 + 1 = 16 parts in total."
      - text: "So one part is 160 / 16 = 10 individuals."
      - text: "The smallest category is 1 part, so 10 are expected."
      - text: "For completeness the others are 90, 30 and 30, and those four sum to 160 - always check that."
      - text: "Expected values come from the RATIO applied to your actual total, never from a different experiment's numbers."
      - text: "One caution: chi-square becomes unreliable when an expected count drops below about 5, so very small samples need a larger experiment rather than a clever calculation."
    source: original
    verified: true
  - id: bio.hered.chi-square.i6
    tier: ap
    type: frq
    depth: both
    prompt: "A geneticist crosses two heterozygous plants expecting a 3:1 ratio. From 400 offspring she observes 280 dominant and 120 recessive. Calculate chi-square, state the degrees of freedom, and interpret the result against a critical value of 3.84."
    answer:
      model: "Expected values come from the 3:1 ratio applied to 400, giving 300 dominant and 100 recessive. For the dominant category, (280 - 300) squared is 400, divided by 300 gives 1.33. For the recessive category, (120 - 100) squared is 400, divided by 100 gives 4.00. The chi-square total is 1.33 plus 4.00, which is 5.33. There are two categories, so degrees of freedom is one. Since 5.33 exceeds the critical value of 3.84, the null hypothesis is rejected: the deviation is too large to attribute to chance alone, so the data do not fit a simple 3:1 ratio and some other factor is probably operating. Note that the recessive category contributed far more to the total, because the same absolute deviation of 20 is proportionally much larger against an expected 100 than against an expected 300."
      rubric:
        - "1 point: expected values of 300 and 100"
        - "1 point: correct contributions of 1.33 and 4.00"
        - "1 point: chi-square total of approximately 5.33"
        - "1 point: degrees of freedom is 1"
        - "1 point: rejects the null hypothesis because 5.33 exceeds 3.84, with a correct interpretation"
    solution:
      - text: "Expected first. A 3:1 ratio is 4 parts, so one part is 400 / 4 = 100."
      - text: "Expected dominant = 3 parts = 300. Expected recessive = 1 part = 100. They sum to 400 - good."
      - text: "Dominant: (280 - 300)^2 / 300 = 400 / 300 = 1.33"
      - text: "Recessive: (120 - 100)^2 / 100 = 400 / 100 = 4.00"
      - text: "Chi-square = 1.33 + 4.00 = 5.33"
      - text: "Degrees of freedom = categories - 1 = 2 - 1 = 1."
      - text: "5.33 is greater than 3.84, so reject the null hypothesis. The deviation is larger than chance comfortably explains, and the data do not fit a simple 3:1 ratio."
      - text: "Worth noticing which category did the damage. Both deviated by exactly 20, yet the recessive category contributed three times as much."
      - text: "That is the dividing-by-expected step doing its job: being 20 off from 100 is a 20% error, while being 20 off from 300 is under 7%. Small categories carry more weight, which is exactly why the test is built that way."
    source: original
    verified: true
  - id: bio.hered.chi-square.i7
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: the chi-square procedure, start to finish."
    answer:
      model: "State a null hypothesis, which in a genetics cross is that the observed results fit the expected ratio and any deviation is due to chance. Calculate the expected count for each category by applying the ratio to the actual total. For each category, subtract expected from observed, square the result, and divide by the expected value. Sum those values across all categories to get chi-square. Work out degrees of freedom as the number of categories minus one. Look up the critical value at p equals 0.05 for those degrees of freedom. If the calculated chi-square exceeds the critical value, reject the null hypothesis, meaning the deviation is too large to be chance; if it does not, fail to reject, meaning the data are consistent with the expected ratio."
      rubric:
        - "States a null hypothesis of chance deviation from the expected ratio"
        - "Expected counts come from applying the ratio to the actual total"
        - "Formula: sum of observed minus expected, squared, over expected"
        - "Degrees of freedom is categories minus one"
        - "Compares to the critical value and rejects only if chi-square is larger"
    solution:
      - text: "Step 1 - state the null hypothesis: the data fit the expected ratio, and any difference is chance."
      - text: "Step 2 - calculate expected counts by applying the ratio to YOUR total. A 3:1 from 400 gives 300 and 100."
      - text: "Step 3 - for each category, compute (observed - expected)^2 / expected."
      - text: "Step 4 - add those up. That sum is chi-square."
      - text: "Step 5 - degrees of freedom = number of categories - 1."
      - text: "Step 6 - find the critical value at p = 0.05 for that many degrees of freedom. For 1 df it is 3.84; for 3 df it is 7.82."
      - text: "Step 7 - compare. Chi-square bigger than critical means REJECT the null. Smaller means FAIL TO REJECT."
      - text: "Say it carefully: you reject or fail to reject. You never prove a hypothesis true, and failing to reject only means you have no evidence against it."
    source: original
    verified: true
---

You expect 3:1 and get 72:28 instead of 75:25. Is that close enough?

**"Close enough" is an opinion, and two people can disagree about it.**
Chi-square replaces it with a number.

### Why some deviation is always expected

Random sampling never gives exact ratios. Flip a fair coin 100 times and
*exactly* 50-50 is one of the less likely individual outcomes.

So the real question is never *"is there a deviation?"* — there always is. It
is **"is this deviation bigger than chance alone usually produces?"**

### The formula

> **χ² = Σ (observed − expected)² / expected**

Two design choices worth understanding rather than memorising:

- **Squaring** makes every deviation positive, so being +10 in one category and
  −10 in another **adds up** instead of cancelling to zero
- **Dividing by expected** makes it fair. Being 20 off when you expected 100 is
  a 20% error; being 20 off when you expected 300 is under 7%. **Small
  categories carry more weight**, which is exactly right.

### The procedure

1. **Null hypothesis:** the data fit the expected ratio; any difference is
   chance.
2. **Expected counts** — apply the ratio to **your** total. 3:1 from 400 → 300
   and 100.
3. **Each category:** (O − E)² / E
4. **Sum them** → χ²
5. **Degrees of freedom** = categories − 1
6. **Critical value** at p = 0.05
7. **Compare.**

> **χ² > critical → REJECT** the null. The deviation is too large for chance.
> **χ² < critical → FAIL TO REJECT.** Consistent with the expected ratio.

### Degrees of freedom

**Categories − 1.** Four phenotypes → **3**.

The minus one is because once you know the total and all but one of the counts,
**the last one is forced** — it has no freedom to vary.

| df | Critical value (p = 0.05) |
|---|---|
| 1 | **3.84** |
| 2 | 5.99 |
| 3 | **7.82** |
| 4 | 9.49 |

**Using the wrong row is the commonest way to compute χ² correctly and still
reach the wrong conclusion.**

### Say it precisely

You **reject** or **fail to reject** the null hypothesis. You never *prove* a
hypothesis true.

And **failing to reject is not proof the hypothesis is right** — only that you
have no evidence against it.

What p = 0.05 actually means: *if the expected ratio were true, a deviation
this large would happen less than 5% of the time by chance.*

### One practical limit

Chi-square becomes unreliable when any **expected** count drops below about
**5**. The answer there is a bigger experiment, not a cleverer calculation.
