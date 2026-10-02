import type { Subject, Topic, Unit } from '@/content/types';
import { FlaskArt } from '@/ui/art';
import { BIOME_LABEL, BiomeMascot } from '@/ui/biomes';

interface Props {
  subjects: readonly {
    subject: Subject;
    units: readonly { unit: Unit; topics: readonly Topic[] }[];
  }[];
  onPick: (topic: Topic) => void;
}

const BLURB: Record<Subject, string> = {
  bio: 'AP Biology — taught from scratch',
  chem: 'Honors Chemistry — AP layer waiting underneath',
};

const SUBJECT_NAME: Record<Subject, string> = {
  bio: 'Biology',
  chem: 'Chemistry',
};

function UnitCard({
  unit,
  topics,
  onPick,
}: {
  unit: Unit;
  topics: readonly Topic[];
  onPick: (topic: Topic) => void;
}) {
  return (
    <section className={`unit biome-${unit.biome}`}>
      <div className="unit-head">
        <BiomeMascot biome={unit.biome} />
        <div>
          <p className="unit-biome">{BIOME_LABEL[unit.biome]}</p>
          <h3>{unit.title}</h3>
        </div>
      </div>

      {topics.length === 0 ? (
        <p className="empty">Nothing here yet — content is on the way.</p>
      ) : (
        <ul className="topics">
          {topics.map((topic) => (
            <li key={topic.id}>
              <button type="button" onClick={() => onPick(topic)}>
                <span className="topic-title">{topic.title}</span>
                <span className="chip">
                  {topic.items.length}{' '}
                  {topic.items.length === 1 ? 'question' : 'questions'}
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
  return (
    <>
      <header className="hero">
        <div className="hero-art">
          <FlaskArt />
        </div>
        <div>
          <h1 className="wordmark">Cortex</h1>
          <p className="tagline">
            Answer first, read second. That's the whole trick.
          </p>
        </div>
      </header>

      {subjects.map(({ subject, units }) => (
        <section key={subject} className="subject">
          <div className="subject-head">
            <h2>{SUBJECT_NAME[subject]}</h2>
            <p className="sub">{BLURB[subject]}</p>
          </div>
          {units.length === 0 ? (
            <p className="empty">No units yet.</p>
          ) : (
            units.map(({ unit, topics }) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                topics={topics}
                onPick={onPick}
              />
            ))
          )}
        </section>
      ))}
    </>
  );
}
