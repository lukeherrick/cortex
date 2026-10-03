import type { Biome, Item, Tier, Topic, Unit } from '@/content/types';
import { BIOME_LABEL, BiomeMascot } from '@/ui/biomes';
import Markdown from '@/ui/markdown';
import { Sparkle } from '@/ui/art';

interface Props {
  topic: Topic;
  unit: Unit | undefined;
  items: readonly Item[];
  prereqs: readonly { id: string; title: string }[];
  onStart: () => void;
  onBack: () => void;
}

const TIER_LABEL: Record<Tier, string> = {
  warmup: 'Warm-up',
  standard: 'Standard',
  challenge: 'Challenge',
  ap: 'AP level',
};

const TIER_ORDER: readonly Tier[] = ['warmup', 'standard', 'challenge', 'ap'];

const TYPE_LABEL: Record<Item['type'], string> = {
  numeric: 'Work out a number',
  mcq: 'Multiple choice',
  frq: 'Written, AP style',
  recall: 'Say it from memory',
};

const TYPE_ORDER: readonly Item['type'][] = ['numeric', 'mcq', 'frq', 'recall'];

export default function TopicView({
  topic,
  unit,
  items,
  prereqs,
  onStart,
  onBack,
}: Props) {
  const biome: Biome = unit?.biome ?? 'meadow';

  const byTier = TIER_ORDER.map((tier) => ({
    tier,
    count: items.filter((i) => i.tier === tier).length,
  })).filter((row) => row.count > 0);

  const byType = TYPE_ORDER.map((type) => ({
    type,
    count: items.filter((i) => i.type === type).length,
  })).filter((row) => row.count > 0);

  const steps = items.reduce((n, i) => n + i.solution.length, 0);

  return (
    <section className={`topic-page biome-${biome}`}>
      <button type="button" className="quiet back" onClick={onBack}>
        &larr; All topics
      </button>

      <header className="topic-hero card">
        <div className="topic-hero-top">
          <BiomeMascot biome={biome} size={66} />
          <div>
            <p className="eyebrow">
              {BIOME_LABEL[biome]}
              {unit ? ` · ${unit.title}` : ''}
            </p>
            <h2>{topic.title}</h2>
          </div>
        </div>

        <dl className="facts">
          <div>
            <dt>Questions</dt>
            <dd>{items.length}</dd>
          </div>
          <div>
            <dt>Worked steps</dt>
            <dd>{steps}</dd>
          </div>
          <div>
            <dt>Hardest</dt>
            <dd>{TIER_LABEL[byTier[byTier.length - 1]?.tier ?? 'warmup']}</dd>
          </div>
        </dl>

        <button type="button" className="primary big" onClick={onStart}>
          <Sparkle /> Start practising
        </button>
        <p className="nudge">
          Have a real go before you look. The digging is what builds the memory —
          reading the answer does almost nothing.
        </p>
      </header>

      <section className="card info-card">
        <h3>What&rsquo;s in here</h3>

        <div className="breakdown">
          <div>
            <h4>By difficulty</h4>
            <ul className="tag-list">
              {byTier.map(({ tier, count }) => (
                <li key={tier} className={`tag tier-${tier}`}>
                  {TIER_LABEL[tier]} <span className="tag-n">{count}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>By question type</h4>
            <ul className="tag-list">
              {byType.map(({ type, count }) => (
                <li key={type} className="tag">
                  {TYPE_LABEL[type]} <span className="tag-n">{count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {prereqs.length > 0 && (
          <p className="prereqs">
            <strong>Do these first:</strong>{' '}
            {prereqs.map((p) => p.title).join(' · ')}
          </p>
        )}

        {topic.ced.length > 0 && (
          <p className="ced">
            College Board topic {topic.ced.length === 1 ? 'code' : 'codes'}:{' '}
            {topic.ced.join(', ')}
          </p>
        )}
      </section>

      <section className="card notes-card">
        <h3>
          <Sparkle /> Notes
        </h3>
        <Markdown source={topic.concept} />
      </section>

      <div className="bottom-cta">
        <button type="button" className="primary big" onClick={onStart}>
          <Sparkle /> Start practising
        </button>
      </div>
    </section>
  );
}
