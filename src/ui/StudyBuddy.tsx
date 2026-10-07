import { Sparkle } from '@/ui/art';

interface Technique {
  id: string;
  name: string;
  tag: string;
  what: string;
  why: string;
  bestFor: string;
  /** Honest limits. A guide that only praises things is not a guide. */
  watchOut: string;
  tier: 'proven' | 'useful' | 'avoid';
}

/**
 * The study-techniques guide.
 *
 * Ranked by evidence, not by popularity, and each entry says what it is bad
 * for as well as what it is good for. The two techniques the whole app is
 * built on come first and are labelled as the proven ones; the popular
 * low-value habits are included precisely so they can be argued against,
 * because "don't highlight" is useless advice without the reason.
 */
const TECHNIQUES: readonly Technique[] = [
  {
    id: 'retrieval',
    name: 'Answering from memory',
    tag: 'Retrieval practice',
    what: 'Shut the book and try to produce the answer before you check it.',
    why: 'Dragging something out of your head is what strengthens the path back to it. Reading it again does almost nothing, because recognising something feels like knowing it and is not the same thing.',
    bestFor:
      'Everything. Strongest for definitions, mechanisms, chains of cause and effect — the whole of biology, and the concepts behind chemistry calculations.',
    watchOut:
      'It feels worse than rereading, because it is effortful and you get things wrong. That discomfort is the technique working, which is exactly why people abandon it.',
    tier: 'proven',
  },
  {
    id: 'spacing',
    name: 'Spreading it out',
    tag: 'Distributed practice',
    what: 'Study a topic a few times across days and weeks instead of once for a long time.',
    why: 'Memory fades, and catching something just as it starts to fade is what makes it stick for longer next time. Four half-hours across two weeks beats one two-hour session, from the same total time.',
    bestFor:
      'Anything you need in more than a week — which is everything facing a final or an AP exam.',
    watchOut:
      'It feels less productive in the moment, because you keep having to warm up again. That warming up is the point.',
    tier: 'proven',
  },
  {
    id: 'interleaving',
    name: 'Mixing topics up',
    tag: 'Interleaving',
    what: 'Switch between related topics in one session rather than doing thirty of the same kind of problem.',
    why: 'Thirty identical problems teaches you to apply one method. Mixed problems force you to work out WHICH method applies, which is the actual skill tested on an exam.',
    bestFor:
      'Chemistry calculations above all — stoichiometry, gas laws and solutions look alike until you have to tell them apart under time pressure.',
    watchOut:
      'Your accuracy during practice drops, which feels like getting worse. Performance while learning and how much you retain are different things.',
    tier: 'proven',
  },
  {
    id: 'pomodoro',
    name: 'Pomodoro',
    tag: '25 on, 5 off',
    what: '25 minutes of single-tasking, then a 5 minute break. A longer break every fourth block.',
    why: 'Starting is the hard part, and 25 minutes is small enough to agree to. The break is not a reward — attention genuinely degrades, and stepping away lets what you just did settle.',
    bestFor:
      'Getting started when you are avoiding it, and for long grinding sessions like working through a problem set.',
    watchOut:
      'A break only works if it is a real one. Picking up your phone replaces the rest with a different kind of mental work, and you come back more tired than you left.',
    tier: 'useful',
  },
  {
    id: 'phone',
    name: 'Phone in another room',
    tag: 'Not just face down',
    what: 'Physically out of reach. A different room, or a drawer.',
    why: 'Resisting a notification costs attention even when you successfully resist it. Studies find that merely having a phone visible measurably reduces available working memory — you do not have to touch it for it to cost you.',
    bestFor: 'Every kind of study. The cheapest improvement available.',
    watchOut:
      'Face down on the desk is not the same thing. If it is within arm’s reach, part of you is still tracking it.',
    tier: 'useful',
  },
  {
    id: 'explain',
    name: 'Explain it out loud',
    tag: 'Self-explanation',
    what: 'Say the mechanism aloud, as though teaching someone, without looking.',
    why: 'Speaking exposes the gaps instantly. You will stop mid-sentence at exactly the step you do not actually understand — the one reading would have let you skate over.',
    bestFor:
      'Biology processes with several steps: respiration, protein synthesis, feedback loops. Also chemistry when you can say WHY a method works, not just the steps.',
    watchOut:
      'Only works from memory. Reading it aloud off the page is just rereading with extra noise.',
    tier: 'useful',
  },
  {
    id: 'sleep',
    name: 'Sleeping on it',
    tag: 'Consolidation',
    what: 'Sleep after studying, and before a test. Eight hours, properly.',
    why: 'Memories are consolidated during sleep — it is part of the learning, not a pause from it. An all-nighter trades a large amount of retention for a small amount of extra exposure.',
    bestFor: 'Everything, and most of all the night before an exam.',
    watchOut:
      'This is the one people sacrifice first and it is almost always the wrong trade. Stopping an hour early and sleeping usually beats the extra hour.',
    tier: 'useful',
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
      'This is the most popular study method there is and close to the least effective. If it feels easy and comfortable, that is the warning sign.',
    tier: 'avoid',
  },
];

const TIER_LABEL = {
  proven: 'Strongest evidence',
  useful: 'Genuinely helps',
  avoid: 'Feels useful, mostly is not',
} as const;

function TechniqueCard({ t }: { t: Technique }) {
  return (
    <article className={`technique tier-${t.tier}`}>
      <header>
        <h3>{t.name}</h3>
        <span className="chip">{t.tag}</span>
      </header>
      <p className="technique-what">{t.what}</p>
      <dl>
        <div>
          <dt>Why it works</dt>
          <dd>{t.why}</dd>
        </div>
        <div>
          <dt>Best for</dt>
          <dd>{t.bestFor}</dd>
        </div>
        <div className="watch">
          <dt>Watch out</dt>
          <dd>{t.watchOut}</dd>
        </div>
      </dl>
    </article>
  );
}

export default function StudyBuddy() {
  const tiers = ['proven', 'useful', 'avoid'] as const;

  return (
    <section className="buddy">
      <header className="card buddy-intro">
        <h2>
          <Sparkle /> Study buddy
        </h2>
        <p className="score-sub">
          Everything below is ordered by how well it actually holds up, not by
          how popular it is. Each one says what it is bad for too.
        </p>
        <p className="nudge">
          The short version: <strong>answer from memory</strong>, and{' '}
          <strong>spread it out</strong>. Cortex is built to make you do both
          whether you feel like it or not.
        </p>
      </header>

      {tiers.map((tier) => (
        <section key={tier} className="buddy-tier">
          <h3 className={`tier-heading tier-${tier}`}>{TIER_LABEL[tier]}</h3>
          {TECHNIQUES.filter((t) => t.tier === tier).map((t) => (
            <TechniqueCard key={t.id} t={t} />
          ))}
        </section>
      ))}

      <footer className="home-footer">
        <p>
          The two at the top are from Dunlosky et al. (2013), which rated ten
          common techniques across 242 studies and found exactly two to be high
          utility. Highlighting and rereading were not among them.
        </p>
      </footer>
    </section>
  );
}
