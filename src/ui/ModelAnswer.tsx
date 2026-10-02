import type { Item } from '@/content/types';

/**
 * The model answer and scoring rubric for a written item. Shown while the
 * learner rates their own recall, and kept visible afterwards.
 */
export default function ModelAnswer({ item }: { item: Item }) {
  if (item.type !== 'frq' && item.type !== 'recall') return null;

  return (
    <section className="model-answer">
      <h3>Model answer</h3>
      <p>{item.answer.model}</p>
      <h4 id="rubric">Rubric</h4>
      <ul aria-labelledby="rubric">
        {item.answer.rubric.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </section>
  );
}
