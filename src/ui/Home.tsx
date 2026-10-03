import type { Subject, Topic, Unit } from '@/content/types';
import { FlaskArt, Sparkle } from '@/ui/art';
import { BIOME_LABEL, BiomeMascot } from '@/ui/biomes';

interface UnitGroup {
  unit: Unit;
  topics: readonly Topic[];
}

interface Props {
  subjects: readonly { subject: Subject; units: readonly UnitGroup[] }[];
  onPick: (topic: Topic) => void;
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
  onPick: (topic: Topic) => void;
}

function UnitCard({ unit, topics, onPick }: UnitCardProps) {
  const questions = countItems(topics);
  const empty = topics.length === 0;

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
        <ul className="topics">
          {topics.map((topic) => (
            <li key={topic.id}>
              <button type="button" onClick={() => onPick(topic)}>
                <span className="topic-title">{topic.title}</span>
                <span className="chip">
                  {topic.items.length} <span className="chip-word">q</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Home({ subjects, onPick }: Props) {
  const allTopics = subjects.flatMap((s) => s.units.flatMap((u) => u.topics));
  const totalQuestions = countItems(allTopics);

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
              <strong>
                {subjects.reduce((n, s) => n + s.units.length, 0)}
              </strong>{' '}
              units mapped
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
                onPick={onPick}
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
