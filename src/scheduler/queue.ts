import type { CardRecord } from '@/data/db';
import type { Item, Tier, Topic } from '@/content/types';
import { isDue } from '@/scheduler/schedule';

export const DEFAULT_DAILY_CAP = 40;

const TIER_ORDER: readonly Tier[] = ['warmup', 'standard', 'challenge', 'ap'];

export interface TopicItems {
  topic: Topic;
  /** The topic's items filtered to the depth being studied. */
  items: readonly Item[];
}

export interface QueueInput {
  topics: readonly TopicItems[];
  cards: ReadonlyMap<string, CardRecord>;
  now: number;
  dailyCap?: number;
}

export interface QueueEntry {
  topic: Topic;
  item: Item;
}

/**
 * Round-robin across topics rather than finishing one topic at a time.
 *
 * Interleaving is a real effect in its own right — mixing topics forces you to
 * work out *which* method applies, not just apply the one you were told to.
 * Blocking by topic quietly removes that.
 */
function interleave(groups: readonly QueueEntry[][]): QueueEntry[] {
  const out: QueueEntry[] = [];
  const longest = Math.max(0, ...groups.map((g) => g.length));
  for (let i = 0; i < longest; i += 1) {
    for (const group of groups) {
      if (i < group.length) out.push(group[i]);
    }
  }
  return out;
}

function byTier(a: Item, b: Item): number {
  return TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier);
}

/**
 * Items that are due now, interleaved across topics and capped.
 *
 * Most overdue first within each topic, so a long absence surfaces the things
 * you are closest to losing. Overflow is not dropped — it simply stays due and
 * appears tomorrow.
 */
export function reviewQueue(input: QueueInput): QueueEntry[] {
  const cap = input.dailyCap ?? DEFAULT_DAILY_CAP;

  const groups = input.topics
    .map(({ topic, items }) =>
      items
        .map((item) => ({ item, card: input.cards.get(item.id) }))
        .filter(
          (x): x is { item: Item; card: CardRecord } =>
            x.card !== undefined && isDue(x.card, input.now),
        )
        .sort((a, b) => a.card.due - b.card.due)
        .map(({ item }) => ({ topic, item })),
    )
    .filter((group) => group.length > 0);

  return interleave(groups).slice(0, cap);
}

/** How many items are due right now, ignoring the daily cap. */
export function dueCount(input: QueueInput): number {
  return input.topics.reduce(
    (n, { items }) =>
      n +
      items.filter((item) => {
        const card = input.cards.get(item.id);
        return card !== undefined && isDue(card, input.now);
      }).length,
    0,
  );
}

/** Items in this topic that have never been studied. */
export function unseenItems(
  { items }: TopicItems,
  cards: ReadonlyMap<string, CardRecord>,
): Item[] {
  return items.filter((item) => !cards.has(item.id)).sort(byTier);
}

/**
 * Whether a topic's prerequisites have been met.
 *
 * A prerequisite counts as met once at least one of its items has been
 * answered correctly. Requiring every item would make the gate punishing;
 * requiring none would make it decorative.
 */
export function prereqsMet(
  topic: Topic,
  cards: ReadonlyMap<string, CardRecord>,
): boolean {
  if (topic.prereqs.length === 0) return true;
  const correctTopics = new Set(
    [...cards.values()].filter((c) => c.everCorrect).map((c) => c.topicId),
  );
  return topic.prereqs.every((id) => correctTopics.has(id));
}

/** Topics that can be started now: prerequisites met and something unstudied. */
export function learnableTopics(input: QueueInput): TopicItems[] {
  return input.topics.filter(
    (entry) =>
      prereqsMet(entry.topic, input.cards) &&
      unseenItems(entry, input.cards).length > 0,
  );
}

/** Topics blocked by a prerequisite, with the names of what is missing. */
export function blockedTopics(
  input: QueueInput,
): { topic: Topic; missing: string[] }[] {
  const titles = new Map(input.topics.map((t) => [t.topic.id, t.topic.title]));
  const correctTopics = new Set(
    [...input.cards.values()].filter((c) => c.everCorrect).map((c) => c.topicId),
  );

  return input.topics
    .filter((entry) => !prereqsMet(entry.topic, input.cards))
    .map((entry) => ({
      topic: entry.topic,
      missing: entry.topic.prereqs
        .filter((id) => !correctTopics.has(id))
        .map((id) => titles.get(id) ?? id),
    }));
}

/**
 * Everything in a set of topics, easiest first, ignoring due dates entirely.
 *
 * Cram mode. Deliberately does not consult or write scheduling state — a
 * panicked run through a whole unit the night before a test should not
 * convince the scheduler you have learned it.
 */
export function cramQueue(topics: readonly TopicItems[]): QueueEntry[] {
  return topics.flatMap(({ topic, items }) =>
    [...items].sort(byTier).map((item) => ({ topic, item })),
  );
}
