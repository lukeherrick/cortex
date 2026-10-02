import type { Subject, Topic } from '@/content/types';

interface Props {
  subject: Subject;
  topics: readonly Topic[];
  onPick: (topic: Topic) => void;
}

export default function TopicList({ subject, topics, onPick }: Props) {
  return (
    <section>
      <h2>{subject === 'bio' ? 'Biology' : 'Chemistry'}</h2>
      <ul className="topics">
        {topics.map((topic) => (
          <li key={topic.id}>
            <button type="button" onClick={() => onPick(topic)}>
              {topic.title}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
