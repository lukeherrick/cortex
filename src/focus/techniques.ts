import type { Durations } from '@/focus/timer';

export type Tier = 'proven' | 'useful' | 'avoid';

/**
 * A study technique, and the timer that goes with it.
 *
 * Deliberately one list rather than two. A guide that only describes
 * techniques leaves you to go and configure a timer yourself, which nobody
 * does. Picking one here sets the clock and puts its reminders in front of you
 * while you work — the advice arrives at the moment it applies.
 *
 * `timer` is null for the ones that are not a working pattern. You cannot
 * "run" sleeping on it, and pretending otherwise would be silly.
 */
export interface Technique {
  id: string;
  name: string;
  tag: string;
  what: string;
  why: string;
  bestFor: string;
  /** Honest limits. A guide that only praises things is not a guide. */
  watchOut: string;
  tier: Tier;
  timer: Durations | null;
  /** One or two lines shown while the focus block runs. */
  focusReminders: readonly string[];
  /** One or two lines shown during a break. */
  breakReminders: readonly string[];
}

const mins = (n: number) => n * 60_000;

export const TECHNIQUES: readonly Technique[] = [
  {
    id: 'retrieval',
    name: 'Answering from memory',
    tag: 'Retrieval practice · 20/5',
    what: 'Shut the book and try to produce the answer before you check it.',
    why: 'Dragging something out of your head is what strengthens the path back to it. Rereading does almost nothing, because recognising something feels like knowing it and is not the same thing.',
    bestFor:
      'Everything. Strongest for definitions, mechanisms and chains of cause and effect — all of biology, and the concepts behind chemistry calculations.',
    watchOut:
      'It feels worse than rereading, because it is effortful and you get things wrong. That discomfort is the technique working, which is exactly why people abandon it.',
    tier: 'proven',
    timer: {
      focus: mins(20),
      shortBreak: mins(5),
      longBreak: mins(15),
      longBreakEvery: 4,
    },
    focusReminders: [
      'Book shut. Answer out loud before you check.',
      'Getting it wrong is the point — that is the bit that sticks.',
    ],
    breakReminders: ['Do not peek at the notes. Let it fade a little.'],
  },
  {
    id: 'spacing',
    name: 'Spreading it out',
    tag: 'Distributed practice · 25/5',
    what: 'Study a topic a few times across days and weeks instead of once for a long time.',
    why: 'Memory fades, and catching something just as it starts to fade is what makes it stick longer next time. Four half-hours across two weeks beats one two-hour session, from the same total time.',
    bestFor:
      'Anything you need in more than a week — which is everything facing a final or an AP exam.',
    watchOut:
      'It feels less productive, because you keep having to warm up again. The warming up is the point.',
    tier: 'proven',
    timer: {
      focus: mins(25),
      shortBreak: mins(5),
      longBreak: mins(15),
      longBreakEvery: 4,
    },
    focusReminders: [
      'Today’s review first. The app already picked what is fading.',
      'Stopping on time beats pushing on. You will be back tomorrow.',
    ],
    breakReminders: ['Properly away from the desk. Ten minutes is not a loss.'],
  },
  {
    id: 'interleaving',
    name: 'Mixing topics up',
    tag: 'Interleaving · 30/5',
    what: 'Switch between related topics in one session rather than doing thirty of the same kind of problem.',
    why: 'Thirty identical problems teaches you to apply one method. Mixed problems force you to work out WHICH method applies, which is the actual skill an exam tests.',
    bestFor:
      'Chemistry calculations above all — stoichiometry, gas laws and solutions look alike until you must tell them apart under time pressure.',
    watchOut:
      'Your accuracy during practice drops, which feels like getting worse. Performance while learning and how much you retain are different things.',
    tier: 'proven',
    timer: {
      focus: mins(30),
      shortBreak: mins(5),
      longBreak: mins(20),
      longBreakEvery: 3,
    },
    focusReminders: [
      'Switch topic every few questions. Do not block them together.',
      'Ask "which method is this?" before you start calculating.',
    ],
    breakReminders: ['Let the mix settle. No reviewing in the break.'],
  },
  {
    id: 'pomodoro',
    name: 'Classic Pomodoro',
    tag: '25 on, 5 off',
    what: '25 minutes of single-tasking, then a 5 minute break. A longer break every fourth block.',
    why: 'Starting is the hard part, and 25 minutes is small enough to agree to. The break is not a reward — attention genuinely degrades, and stepping away lets what you just did settle.',
    bestFor:
      'Getting started when you are avoiding it, and for long grinding sessions like a problem set.',
    watchOut:
      'A break only works if it is a real one. Picking up your phone replaces rest with a different kind of mental work, and you come back more tired than you left.',
    tier: 'useful',
    timer: {
      focus: mins(25),
      shortBreak: mins(5),
      longBreak: mins(15),
      longBreakEvery: 4,
    },
    focusReminders: [
      'One thing only. No tabs, no replies, no "quick check".',
      'If something unrelated pops into your head, write it down and carry on.',
    ],
    breakReminders: [
      'NO PHONE. Scrolling is not a break — it is different work.',
      'Stand up. Water, window, stretch. Come back when it beeps.',
    ],
  },
  {
    id: 'deepwork',
    name: 'Long haul',
    tag: 'Deep work · 50/10',
    what: 'Fifty minutes in, ten out. For work that needs a running start.',
    why: 'Some tasks have a long warm-up — a hard FRQ, a lab write-up, a whole past paper. Breaking those every 25 minutes means paying the warm-up cost twice.',
    bestFor:
      'Past papers, long multi-step problems, writing anything up. Not for flashcard-style review.',
    watchOut:
      'Only works if you can actually hold attention that long. If you are drifting at minute 30, you are not doing deep work, you are sitting still — drop back to 25.',
    tier: 'useful',
    timer: {
      focus: mins(50),
      shortBreak: mins(10),
      longBreak: mins(25),
      longBreakEvery: 2,
    },
    focusReminders: [
      'Phone in another room. Not face down — another room.',
      'Finish the thought before you stop, even if the timer goes.',
    ],
    breakReminders: ['Ten full minutes. Move your body, not your thumbs.'],
  },
  {
    id: 'kickstart',
    name: 'Just start',
    tag: 'Short bursts · 10/3',
    what: 'Ten minutes. That is the whole commitment.',
    why: 'Most avoidance is about starting, not about the work. Ten minutes is too small to argue with, and you almost always carry on past it once you have begun.',
    bestFor:
      'The day you cannot make yourself open the book at all. Also good when you are tired or ill.',
    watchOut:
      'This is a way in, not a study plan. If you find yourself only ever doing ten minutes, the problem is somewhere else.',
    tier: 'useful',
    timer: {
      focus: mins(10),
      shortBreak: mins(3),
      longBreak: mins(10),
      longBreakEvery: 4,
    },
    focusReminders: [
      'Ten minutes. You are allowed to stop after this.',
      'Start anywhere. The first question does not have to be the right one.',
    ],
    breakReminders: ['That counted. Doing another is optional, not expected.'],
  },
  {
    id: 'phone',
    name: 'Phone in another room',
    tag: 'Not just face down',
    what: 'Physically out of reach. A different room, or a drawer.',
    why: 'Resisting a notification costs attention even when you successfully resist it. Research finds that merely having a phone visible measurably reduces available working memory — you do not have to touch it for it to cost you.',
    bestFor: 'Every kind of study. The cheapest improvement available.',
    watchOut:
      'Face down on the desk is not the same thing. If it is within arm’s reach, part of you is still tracking it.',
    tier: 'useful',
    timer: null,
    focusReminders: [],
    breakReminders: [],
  },
  {
    id: 'explain',
    name: 'Explain it out loud',
    tag: 'Self-explanation',
    what: 'Say the mechanism aloud, as though teaching someone, without looking.',
    why: 'Speaking exposes the gaps instantly. You will stop mid-sentence at exactly the step you do not actually understand — the one reading would have let you skate over.',
    bestFor:
      'Biology processes with several steps: respiration, protein synthesis, feedback loops. Also chemistry, when you can say WHY a method works.',
    watchOut:
      'Only works from memory. Reading it aloud off the page is just rereading with extra noise.',
    tier: 'useful',
    timer: null,
    focusReminders: [],
    breakReminders: [],
  },
  {
    id: 'sleep',
    name: 'Sleeping on it',
    tag: 'Consolidation',
    what: 'Sleep after studying, and before a test. Eight hours, properly.',
    why: 'Memories are consolidated during sleep — it is part of the learning, not a pause from it. An all-nighter trades a lot of retention for a little extra exposure.',
    bestFor: 'Everything, and most of all the night before an exam.',
    watchOut:
      'This is the one people sacrifice first and it is almost always the wrong trade. Stopping an hour early and sleeping usually beats the extra hour.',
    tier: 'useful',
    timer: null,
    focusReminders: [],
    breakReminders: [],
  },
  {
    id: 'highlighting',
    name: 'Highlighting and rereading',
    tag: 'Feels productive, mostly is not',
    what: 'Colouring in the textbook, then reading it again.',
    why: 'Both were rated LOW utility in the research this app is built on. Rereading builds familiarity, and familiarity feels exactly like knowledge until you are asked to produce something with the book shut.',
    bestFor:
      'A first pass to find what matters. That is genuinely useful — just do not mistake it for studying.',
    watchOut:
      'The most popular study method there is, and close to the least effective. If it feels easy and comfortable, that is the warning sign.',
    tier: 'avoid',
    timer: null,
    focusReminders: [],
    breakReminders: [],
  },
];

export const DEFAULT_TECHNIQUE_ID = 'pomodoro';

export function techniqueById(id: string | null): Technique {
  return (
    TECHNIQUES.find((t) => t.id === id) ??
    TECHNIQUES.find((t) => t.id === DEFAULT_TECHNIQUE_ID)!
  );
}

/** The ones that can actually drive the clock. */
export function runnableTechniques(): Technique[] {
  return TECHNIQUES.filter((t) => t.timer !== null);
}

export const TIER_LABEL: Record<Tier, string> = {
  proven: 'Strongest evidence',
  useful: 'Genuinely helps',
  avoid: 'Feels useful, mostly is not',
};
