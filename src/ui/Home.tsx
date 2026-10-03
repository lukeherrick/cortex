import type { CardRecord } from '@/data/cards';
import type { Subject, Topic, Unit } from '@/content/types';
import { isDue } from '@/scheduler/schedule';
import { FlaskArt, Sparkle } from '@/ui/art';
import { BIOME_LABEL, BiomeMascot } from '@/ui/biomes';

interface UnitGroup {
  unit: Unit;
  topics: readonly Topic[];
}

interface Props {
  subjects: readonly { subject: Subject; units: readonly UnitGroup[] }[];
  cards: ReadonlyMap<string, CardRecord>;
  onPick: (topic: Topic) => void;
  onCram: (unit: Unit, topics: readonly Topic[]) => void;
}

const BLURB: Record<Subject, string> = {
  bio: 'AP Biology — taught from scratch, because there is no class for it',
  chem: 'Honors Chemistry — with the AP layer waiting underneath',
};

const SUBJECT_NAME: Record<Subject, string> = {
  bio: 'Biology',
  chem: 'Chemistry',
};

function countItems(topics: readonly Topic[]): number {
  return topics.reduce((n, t) => n + t.items.length, 0);
}

interface UnitCardProps extends UnitGroup {
  cards: ReadonlyMap<string, CardRecord>;
  now: number;
  onPick: (topic: Topic) => void;
  onCram: (unit: Unit, topics: readonly Topic[]) => void;
}

function UnitCard({
  unit,
  topics,
  cards,
  now,
  onPick,
  onCram,
}: UnitCardProps) {
  const questions = countItems(topics);
  const empty = topics.length === 0;

  const dueIn = (topic: Topic): number =>
    topic.items.filter((item) => {
      const card = cards.get(item.id);
      return card !== undefined && isDue(card, now);
    }).length;

  const startedIn = (topic: Topic): number =>
    topic.items.filter((item) => cards.has(item.id)).length;

  return (
    <section className={`unit biome-${unit.biome} ${empty ? 'is-empty' : ''}`}>
      <div className="unit-head">
        <span className="unit-num">{unit.order}</span>
        <BiomeMascot biome={unit.biome} size={50} />
        <div className="unit-head-text">
          <p className="unit-biome">{BIOME_LABEL[unit.biome]}</p>
          <h3>{unit.title}</h3>
          <p className="unit-count">
            {empty
              ? 'Coming soon'
              : `${topics.length} ${topics.length === 1 ? 'topic' : 'topics'} · ${questions} questions`}
          </p>
        </div>
      </div>

      {empty ? (
        <p className="empty">
          Nothing planted here yet — this one is on the way.
        </p>
      ) : (
        <>
          <ul className="topics">
            {topics.map((topic) => {
              const owed = dueIn(topic);
              const started = startedIn(topic);
              return (
                <li key={topic.id}>
                  <button type="button" onClick={() => onPick(topic)}>
                    <span className="topic-title">{topic.title}</span>
                    {owed > 0 && <span className="chip due-chip">{owed} due</span>}
                    {owed === 0 && started === topic.items.length && (
                      <span className="chip done-chip">all seen</span>
                    )}
                    <span className="chip">
                      {topic.items.length} <span className="chip-word">q</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="unit-actions">
            <button
              type="button"
              className="quiet"
              onClick={() => onCram(unit, topics)}
            >
              Cram the whole unit ({questions}) — doesn&rsquo;t affect your
              schedule
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default function Home({ subjects, cards, onPick, onCram }: Props) {
  const now = Date.now();
  const allTopics = subjects.flatMap((s) => s.units.flatMap((u) => u.topics));
  const totalQuestions = countItems(allTopics);
  const studied = allTopics.reduce(
    (n, t) => n + t.items.filter((i) => cards.has(i.id)).length,
    0,
  );

  return (
    <>
      <header className="hero card">
        <div className="hero-art">
          <FlaskArt size={76} />
        </div>
        <div className="hero-text">
          <h1 className="wordmark">Cortex</h1>
          <p className="tagline">
            Answer first, read second. That&rsquo;s the whole trick.
          </p>
          <ul className="hero-stats">
            <li>
              <strong>{allTopics.length}</strong> topics
            </li>
            <li>
              <strong>{totalQuestions}</strong> questions
            </li>
            <li>
              <strong>{studied}</strong> started
            </li>
          </ul>
        </div>
      </header>

      {subjects.map(({ subject, units }) => {
        const withContent = units.filter((u) => u.topics.length > 0).length;
        return (
          <section key={subject} className="subject">
            <div className="subject-head">
              <h2>
                <Sparkle /> {SUBJECT_NAME[subject]}
              </h2>
              <p className="sub">{BLURB[subject]}</p>
              <p className="subject-progress">
                {withContent} of {units.length} units have content
              </p>
            </div>
            {units.map(({ unit, topics }) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                topics={topics}
                cards={cards}
                now={now}
                onPick={onPick}
                onCram={onCram}
              />
            ))}
          </section>
        );
      })}

      <footer className="home-footer">
        <p>
          Built on the only two study techniques that hold up in the research:
          <strong> answering from memory</strong> and{' '}
          <strong>spacing it out</strong>.
        </p>
      </footer>
    </>
  );
}

/**
 * Shown only in a browser tab, never once the app is installed.
 *
 * Spacing only works if the app is opened daily, and daily means the phone —
 * so the install prompt is worth real estate rather than being buried.
 */
export function InstallHint() {
  const installed =
    typeof window !== 'undefined' &&
    window.matchMedia('(display-mode: standalone)').matches;

  if (installed) return null;

  return (
    <section className="card install-hint">
      <h3>Put this on your phone</h3>
      <p className="score-sub">
        Open this page in <strong>Safari</strong> on your iPhone, tap the{' '}
        <strong>Share</strong> button, then <strong>Add to Home Screen</strong>.
        It gets an icon, opens fullscreen, and works with no signal.
      </p>
      <p className="nudge">
        No App Store, no account, nothing to install on the laptop. Reviews are
        daily — having it on your phone is most of whether this works.
      </p>
    </section>
  );
}
