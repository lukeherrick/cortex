import type { ContentBundle, Depth, Subject, Topic } from '@/content/types';

const ALLOWED_DEPTHS: Record<Subject, readonly Depth[]> = {
  bio: ['level1', 'ap', 'both'],
  chem: ['honors', 'ap', 'both'],
};

function findCycle(topics: readonly Topic[]): string | null {
  const byId = new Map(topics.map((t) => [t.id, t]));
  const state = new Map<string, 'visiting' | 'done'>();

  const walk = (id: string, trail: string[]): string | null => {
    if (state.get(id) === 'done') return null;
    if (state.get(id) === 'visiting') return [...trail, id].join(' -> ');
    state.set(id, 'visiting');
    for (const prereq of byId.get(id)?.prereqs ?? []) {
      if (!byId.has(prereq)) continue;
      const cycle = walk(prereq, [...trail, id]);
      if (cycle) return cycle;
    }
    state.set(id, 'done');
    return null;
  };

  for (const topic of topics) {
    const cycle = walk(topic.id, []);
    if (cycle) return cycle;
  }
  return null;
}

/** Cross-file checks the per-file schema cannot make. Empty array means valid. */
export function validateBundle(bundle: ContentBundle): string[] {
  const errors: string[] = [];
  const unitIds = new Set(bundle.units.map((u) => u.id));
  const topicIds = new Set<string>();
  const itemIds = new Set<string>();

  for (const topic of bundle.topics) {
    if (topicIds.has(topic.id)) errors.push(`Duplicate topic id: ${topic.id}`);
    topicIds.add(topic.id);

    if (!unitIds.has(topic.unit)) {
      errors.push(`Topic ${topic.id} references unknown unit: ${topic.unit}`);
    }

    if (!ALLOWED_DEPTHS[topic.subject].includes(topic.depth)) {
      errors.push(
        `Topic ${topic.id}: depth "${topic.depth}" is not valid for ${topic.subject}`,
      );
    }

    for (const item of topic.items) {
      if (itemIds.has(item.id)) errors.push(`Duplicate item id: ${item.id}`);
      itemIds.add(item.id);

      if (!ALLOWED_DEPTHS[topic.subject].includes(item.depth)) {
        errors.push(
          `Item ${item.id}: depth "${item.depth}" is not valid for ${topic.subject}`,
        );
      }
      if (item.source === 'openstax' && !item.attribution) {
        errors.push(
          `Item ${item.id}: source is openstax but attribution is missing`,
        );
      }
    }
  }

  for (const topic of bundle.topics) {
    for (const prereq of topic.prereqs) {
      if (!topicIds.has(prereq)) {
        errors.push(`Topic ${topic.id} lists unknown prereq: ${prereq}`);
      }
    }
  }

  const cycle = findCycle(bundle.topics);
  if (cycle) errors.push(`Prereq cycle: ${cycle}`);

  return errors;
}
