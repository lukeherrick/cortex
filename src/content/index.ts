import generated from '../generated/content.json';
import { topicSchema, unitSchema } from './schema';
import type { ContentBundle, Depth, Item, Subject, Topic } from './types';

let cached: ContentBundle | null = null;

/** Load and validate the compiled content bundle. Parsed once, then cached. */
export function loadBundle(): ContentBundle {
  if (cached) return cached;
  cached = {
    units: generated.units.map((u) => unitSchema.parse(u)),
    topics: generated.topics.map((t) => topicSchema.parse(t)),
  };
  return cached;
}

export function topicsForSubject(
  bundle: ContentBundle,
  subject: Subject,
): Topic[] {
  return bundle.topics.filter((t) => t.subject === subject);
}

export function findTopic(
  bundle: ContentBundle,
  id: string,
): Topic | undefined {
  return bundle.topics.find((t) => t.id === id);
}

/** Items visible at a given study depth. `both` is always visible. */
export function itemsAtDepth(topic: Topic, depth: Depth): Item[] {
  if (depth === 'ap') {
    return topic.items.filter((i) => i.depth === 'ap' || i.depth === 'both');
  }
  return topic.items.filter((i) => i.depth === depth || i.depth === 'both');
}

export type { ContentBundle, Depth, Item, Subject, Topic };
