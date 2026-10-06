---
id: bio.comm.feedback
unit: bio.u-cell-communication
subject: bio
title: Feedback and Homeostasis
depth: both
ced:
  - ENE-3.A
prereqs:
  - bio.comm.signalling
items:
  - id: bio.comm.feedback.i1
    tier: warmup
    type: mcq
    depth: both
    prompt: "Your blood sugar rises after a meal, insulin is released, and blood sugar comes back down - which stops insulin release. What kind of loop is that?"
    answer:
      correctId: b
      options:
        - id: a
          text: Positive feedback, because the response is helpful
          why: "Positive and negative here describe DIRECTION, not whether something is good. Both kinds are useful."
        - id: b
          text: Negative feedback - the response opposes and cancels the original change
        - id: c
          text: No feedback, since the body simply reacts
          why: "The output feeds back and shuts off its own cause. That loop is the definition of feedback."
        - id: d
          text: Positive feedback, because insulin increases
          why: "Insulin rising is the response, not the direction of the loop. The loop is named for what it does to the ORIGINAL change."
    solution:
      - text: "Follow the loop round. Blood sugar goes UP. Insulin is released. Blood sugar comes DOWN."
      - text: "The response moved the thing back toward where it started. That is negative feedback - negative meaning opposing, not bad."
      - text: "And once blood sugar is back to normal, insulin release stops. The loop switches itself off."
      - text: "Nearly everything your body regulates works this way: temperature, blood pH, water balance, calcium, oxygen."
      - text: "The word for keeping conditions steady like this is homeostasis, and negative feedback is the mechanism behind essentially all of it."
    source: original
    verified: true
  - id: bio.comm.feedback.i2
    tier: standard
    type: mcq
    depth: both
    prompt: "In childbirth, the baby's head pushes on the cervix, which triggers oxytocin, which strengthens contractions, which pushes harder. What kind of loop, and why is this one safe?"
    answer:
      correctId: c
      options:
        - id: a
          text: Negative feedback, because it ends eventually
          why: "Ending is not the test. Negative feedback OPPOSES the change; this one amplifies it the whole way."
        - id: b
          text: Positive feedback, which is always dangerous
          why: "It is positive, but not always dangerous. Positive feedback is exactly right when you need to finish something quickly."
        - id: c
          text: "Positive feedback - and it is safe because an external event ends it, namely the baby being born"
        - id: d
          text: Neither, because two different signals are involved
          why: "The number of molecules involved does not change the loop's direction. The output increases its own cause."
    solution:
      - text: "Follow the loop. Pressure UP causes oxytocin, which causes contractions, which causes pressure UP again."
      - text: "The response increases the original change instead of opposing it. That is positive feedback - a runaway loop."
      - text: "Positive feedback cannot regulate anything, because it has no stable point. It only accelerates."
      - text: "Which is exactly what you want when the job is to finish something fast and completely rather than hold it steady."
      - text: "It is safe here because something outside the loop ends it: once the baby is born there is no pressure, so the loop simply has nothing left to amplify."
      - text: "Other examples: blood clotting (clotting factors activate more clotting factors), and the firing of a nerve impulse (sodium entering opens more sodium channels)."
    source: original
    verified: true
  - id: bio.comm.feedback.i3
    tier: standard
    type: numeric
    depth: both
    prompt: "A thermostat is set to 20 degrees Celsius with a tolerance of 2 degrees either side. If the room is at 25 degrees, how many degrees must it fall to re-enter the acceptable range?"
    answer: { value: 3, unit: null, sigFigs: null }
    solution:
      - text: "The acceptable range is 20 plus or minus 2, so 18 to 22 degrees."
      - text: "The room is at 25, which is above the top of the range."
      - text: "25 - 22 = 3 degrees."
      - text: "Notice the system does not aim for exactly 20. It aims for a RANGE, and only acts when the value leaves it."
      - text: "Your body works the same way. Core temperature is not held at exactly 37 - it drifts within a band, and correction only kicks in at the edges."
      - text: "This is why homeostasis is described as a dynamic equilibrium rather than a fixed value. Things are always moving; what is held steady is the range."
    source: original
    verified: true
  - id: bio.comm.feedback.i4
    tier: challenge
    type: mcq
    depth: both
    prompt: "Why does negative feedback always need a DELAY to be useful, and what does too much delay cause?"
    answer:
      correctId: a
      options:
        - id: a
          text: Detection and response take time, and too much delay makes the system overshoot and oscillate instead of settling
        - id: b
          text: Delay makes the response stronger
          why: "Delay does not change strength. It changes when the correction arrives, which affects stability."
        - id: c
          text: There is no delay in biological feedback
          why: "There is always a delay - hormones take time to travel, enzymes take time to work."
        - id: d
          text: Delay stops the loop becoming positive
          why: "A loop's direction is fixed by its wiring. Timing affects stability, not direction."
    solution:
      - text: "Nothing is instant. The sensor takes time to detect, the signal takes time to travel, the response takes time to act."
      - text: "By the time the correction arrives, the value has usually gone further than when it was detected."
      - text: "So the correction is slightly too late, which means it tends to overshoot past the target."
      - text: "Then it has to correct in the other direction, also late, also overshooting. The value oscillates round the set point."
      - text: "Small oscillations are normal and harmless - your blood sugar does this all day."
      - text: "Big delays make big oscillations. This is why a shower with a long pipe is so hard to set: you adjust, nothing happens, you adjust more, then it scalds you."
      - text: "Biological systems reduce this with fast local responses layered under slow hormonal ones - the same split as lungs and kidneys for blood pH."
    source: original
    verified: true
  - id: bio.comm.feedback.i5
    tier: standard
    type: mcq
    depth: both
    prompt: "A loop needs three parts to work. Which set is right?"
    answer:
      correctId: d
      options:
        - id: a
          text: Signal, receptor, response
          why: "Those are the three stages of SIGNALLING. A feedback loop is described by its functional parts."
        - id: b
          text: Input, output, storage
          why: "Storage is not part of a feedback loop. The missing idea is comparison against a set point."
        - id: c
          text: Sensor, amplifier, battery
          why: "An electronics analogy, but biological loops do not have a battery, and amplification is not the defining part."
        - id: d
          text: A sensor to detect the value, a control centre to compare it to a set point, and an effector to change it
    solution:
      - text: "Sensor - something that measures the value. Temperature receptors in your skin, glucose-sensing cells in your pancreas."
      - text: "Control centre - something that compares the measurement against a set point and decides whether to act. Often the hypothalamus."
      - text: "Effector - something that changes the value. Sweat glands, muscles shivering, a gland releasing a hormone."
      - text: "Then the effect feeds back to the sensor, which is what closes the loop."
      - text: "Exam questions very often hand you a scenario and ask you to label these three. Practise spotting them: what measures, what decides, what acts."
      - text: "Example - too hot: skin receptors sense it (sensor), the hypothalamus compares to 37 degrees (control centre), sweat glands and skin blood vessels respond (effectors)."
    source: original
    verified: true
  - id: bio.comm.feedback.i6
    tier: ap
    type: frq
    depth: both
    prompt: "A person's thyroid gland stops responding to TSH, the hormone from the pituitary that tells it to release thyroid hormone. Predict what happens to their blood TSH level, explain why, and state what kind of feedback loop is involved."
    answer:
      model: "Thyroid hormone normally feeds back negatively on the pituitary, suppressing TSH release. If the thyroid cannot respond to TSH, thyroid hormone levels fall. With little thyroid hormone present, the negative feedback that would normally suppress the pituitary is removed, so the pituitary keeps releasing TSH and blood TSH rises - often far above normal. The loop is negative feedback: thyroid hormone opposes its own production signal. The key reasoning is that losing the brake on a negative feedback loop causes the controlling signal to rise, not fall, which is why a high TSH with low thyroid hormone is the standard blood result for an underactive thyroid."
      rubric:
        - "1 point: states thyroid hormone level falls"
        - "1 point: identifies that thyroid hormone normally inhibits the pituitary"
        - "1 point: predicts blood TSH rises"
        - "1 point: explains the rise as loss of negative feedback inhibition"
        - "1 point: names the loop as negative feedback"
    solution:
      - text: "Map the normal loop first. The pituitary releases TSH, TSH tells the thyroid to release thyroid hormone, and thyroid hormone travels back and tells the pituitary to ease off."
      - text: "That last step is the negative feedback - the product shuts down its own production signal."
      - text: "Now break the thyroid. It cannot respond to TSH, so thyroid hormone output falls."
      - text: "Low thyroid hormone means the brake on the pituitary is released."
      - text: "So the pituitary keeps shouting. TSH rises, and keeps rising, because the response it is asking for never arrives."
      - text: "Blood result: TSH high, thyroid hormone low. That combination is exactly how an underactive thyroid is diagnosed in practice."
      - text: "The transferable insight: in a negative feedback loop, breaking the RESPONDER makes the CONTROL signal go up. Students very often predict it going down, reasoning that everything in a broken system falls."
    source: original
    verified: true
  - id: bio.comm.feedback.i7
    tier: standard
    type: recall
    depth: both
    prompt: "From memory: the difference between negative and positive feedback, with an example of each and what each is good for."
    answer:
      model: "Negative feedback means the response opposes the original change, bringing the value back toward a set point - as when rising blood sugar triggers insulin, which lowers blood sugar. It is what maintains homeostasis, and almost everything the body regulates uses it. Positive feedback means the response amplifies the original change, driving the value further away - as when pressure on the cervix triggers oxytocin, which strengthens contractions and increases pressure further. It cannot regulate anything because it has no stable point, so it is used where a process needs to be driven rapidly to completion, such as childbirth, blood clotting and nerve impulses, and it is ended by something outside the loop."
      rubric:
        - "Negative feedback opposes the change and returns toward a set point"
        - "Gives a valid negative example such as blood sugar or temperature"
        - "Positive feedback amplifies the change"
        - "Gives a valid positive example such as childbirth, clotting or nerve impulses"
        - "Notes negative maintains homeostasis while positive drives a process to completion"
    solution:
      - text: "Negative feedback: the response OPPOSES the change. Value goes up, response brings it down."
      - text: "Example: blood sugar rises, insulin is released, blood sugar falls, insulin release stops."
      - text: "This is what maintains homeostasis - temperature, pH, water balance, calcium, almost everything."
      - text: "Positive feedback: the response AMPLIFIES the change. Value goes up, response pushes it up further."
      - text: "Example: childbirth, where pressure causes oxytocin which causes contractions which cause more pressure."
      - text: "Positive feedback has no stable point, so it cannot regulate. It is for driving a process rapidly to completion, and something OUTSIDE the loop has to end it."
      - text: "Watch the naming: negative and positive describe DIRECTION, not whether something is good or bad. Both are essential."
    source: original
    verified: true
---

**Homeostasis** is keeping internal conditions steady while the outside world
does whatever it likes. Nearly all of it runs on **feedback loops**.

### Every loop has three parts

- **Sensor** — measures the value (skin temperature receptors, glucose-sensing
  cells)
- **Control centre** — compares it to a **set point** and decides whether to act
  (often the hypothalamus)
- **Effector** — changes the value (sweat glands, shivering muscles, a gland)

Then the effect reaches the sensor again — and that is what **closes** the loop.

Exam questions hand you a scenario and ask you to label these. Practise asking:
*what measures, what decides, what acts?*

### Negative feedback — opposes the change

> Blood sugar **up** → insulin released → blood sugar **down** → insulin stops

The response pushes the value **back** toward the set point, and then switches
itself off.

**This is what maintains homeostasis** — temperature, blood pH, water balance,
calcium, oxygen. Almost everything.

> **"Negative" means opposing, not bad.** Both kinds are essential.

### Positive feedback — amplifies the change

> Pressure on cervix → oxytocin → stronger contractions → **more** pressure

The response makes the original change **bigger**. A runaway loop.

Positive feedback **cannot regulate anything** — it has no stable point, it
only accelerates. So it is used where the job is to drive something **rapidly
to completion** rather than hold it steady:

- **Childbirth** — ends when the baby is born
- **Blood clotting** — clotting factors activate more clotting factors
- **Nerve impulses** — sodium entering opens more sodium channels

Each is ended by something **outside** the loop. That is what makes them safe.

### A set point is a range, not a number

A thermostat set to 20 °C with ±2 tolerance accepts anything from 18 to 22, and
only acts at the edges. Your core temperature is not pinned at exactly 37 °C —
it drifts within a band.

This is why homeostasis is called a **dynamic equilibrium**. Things are always
moving; what is held steady is the **range**.

### Why loops oscillate

Nothing is instant. Detecting takes time, signals take time to travel,
responses take time to act. **By the time the correction arrives, the value has
drifted further** — so the correction overshoots, then has to correct back, also
late.

Small oscillations are normal and harmless. **Big delays make big
oscillations** — which is exactly why a shower with a long pipe is so hard to
set.

Bodies manage this by layering **fast local** responses under **slow hormonal**
ones — the same division of labour as lungs and kidneys for blood pH.

### The trap worth knowing now

**Break the responder in a negative feedback loop, and the control signal goes
UP, not down.**

If a thyroid stops responding to TSH, thyroid hormone falls — which *removes
the brake* on the pituitary, so TSH climbs. High TSH with low thyroid hormone
is exactly how an underactive thyroid is diagnosed.

Most people predict the control signal falling, reasoning that everything in a
broken system drops. It doesn't.
