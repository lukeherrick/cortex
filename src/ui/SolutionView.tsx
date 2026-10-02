import type { Item } from '@/content/types';

export default function SolutionView({ item }: { item: Item }) {
  return (
    <section className="solution">
      <h3 id="worked-solution">Worked solution</h3>
      <ol aria-labelledby="worked-solution">
        {item.solution.map((step, i) => (
          <li key={i}>{step.text}</li>
        ))}
      </ol>
    </section>
  );
}
