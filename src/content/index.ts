import generated from '../generated/content.json';
import { topicSchema, unitSchema } from './schema';
import type {
  Biome,
  ContentBundle,
  Depth,
  Item,
  Subject,
  Topic,
  Unit,
} from './types';

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

/** Units of one subject, already ordered by the content build. */
export function unitsForSubject(
  bundle: ContentBundle,
  subject: Subject,
): Unit[] {
  return bundle.units.filter((u) => u.subject === subject);
}

export function topicsForUnit(bundle: ContentBundle, unitId: string): Topic[] {
  return bundle.topics.filter((t) => t.unit === unitId);
}

/** The unit a topic belongs to, or undefined if content is mid-edit. */
export function unitForTopic(
  bundle: ContentBundle,
  topic: Topic,
): Unit | undefined {
  return bundle.units.find((u) => u.id === topic.unit);
}

/** Items visible at a given study depth. `both` is always visible. */
export function itemsAtDepth(topic: Topic, depth: Depth): Item[] {
  if (depth === 'ap') {
    return topic.items.filter((i) => i.depth === 'ap' || i.depth === 'both');
  }
  return topic.items.filter((i) => i.depth === depth || i.depth === 'both');
}

export type { Biome, ContentBundle, Depth, Item, Subject, Topic, Unit };
