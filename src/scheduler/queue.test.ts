import { describe, expect, it } from 'vitest';
import type { CardRecord } from '@/data/db';
import type { Item, Tier, Topic } from '@/content/types';
import {
  blockedTopics,
  cramQueue,
  dueCount,
  learnableTopics,
  prereqsMet,
  reviewQueue,
  unseenItems,
  type QueueInput,
  type TopicItems,
} from '@/scheduler/queue';
import { freshCard } from '@/scheduler/schedule';

const NOW = Date.UTC(2026, 0, 15, 12, 0, 0);
const DAY = 86_400_000;

function item(id: string, tier: Tier = 'standard'): Item {
  return {
    id,
    tier,
    type: 'numeric',
    depth: 'both',
    prompt: 'p',
    answer: { value: 1, unit: 'mol', sigFigs: 1 },
    solution: [{ text: 'a step long enough' }],
    source: 'original',
    verified: true,
  } as Item;
}

function topic(id: string, itemIds: string[], prereqs: string[] = []): Topic {
  return {
    id,
    unit: 'chem.u-stoichiometry',
    subject: 'chem',
    title: id,
    depth: 'both',
    ced: [],
    prereqs,
    concept: 'c',
    items: itemIds.map((i) => item(i)),
  };
}

function entry(t: Topic): TopicItems {
  return { topic: t, items: t.items };
}

function card(
  itemId: string,
  topicId: string,
  over: Partial<CardRecord> = {},
): CardRecord {
  return {
    ...freshCard({ itemId, topicId, subject: 'chem' }, NOW),
    ...over,
  };
}

const input = (
  topics: TopicItems[],
  cards: CardRecord[],
  dailyCap?: number,
): QueueInput => ({
  topics,
  cards: new Map(cards.map((c) => [c.id, c])),
  now: NOW,
  dailyCap,
});

describe('reviewQueue', () => {
  const a = topic('a', ['a1', 'a2', 'a3']);
  const b = topic('b', ['b1', 'b2']);

  it('is empty when nothing has been studied', () => {
    expect(reviewQueue(input([entry(a)], []))).toEqual([]);
  });

  it('includes only cards that are due', () => {
    const cards = [
      card('a1', 'a', { due: NOW - DAY }),
      card('a2', 'a', { due: NOW + DAY }),
    ];
    const queue = reviewQueue(input([entry(a)], cards));
    expect(queue.map((q) => q.item.id)).toEqual(['a1']);
  });

  it('interleaves across topics instead of blocking by topic', () => {
    const cards = [
      card('a1', 'a', { due: NOW - DAY }),
      card('a2', 'a', { due: NOW - DAY }),
      card('b1', 'b', { due: NOW - DAY }),
      card('b2', 'b', { due: NOW - DAY }),
    ];
    const queue = reviewQueue(input([entry(a), entry(b)], cards));
    expect(queue.map((q) => q.topic.id)).toEqual(['a', 'b', 'a', 'b']);
  });

  it('puts the most overdue first within a topic', () => {
    const cards = [
      card('a1', 'a', { due: NOW - DAY }),
      card('a2', 'a', { due: NOW - 5 * DAY }),
      card('a3', 'a', { due: NOW - 3 * DAY }),
    ];
    const queue = reviewQueue(input([entry(a)], cards));
    expect(queue.map((q) => q.item.id)).toEqual(['a2', 'a3', 'a1']);
  });

  it('caps the queue so a long absence is not unusable', () => {
    const cards = ['a1', 'a2', 'a3'].map((id) =>
      card(id, 'a', { due: NOW - DAY }),
    );
    expect(reviewQueue(input([entry(a)], cards, 2))).toHaveLength(2);
  });

  it('does not drop the overflow — it stays due', () => {
    const cards = ['a1', 'a2', 'a3'].map((id) =>
      card(id, 'a', { due: NOW - DAY }),
    );
    const scenario = input([entry(a)], cards, 2);
    expect(reviewQueue(scenario)).toHaveLength(2);
    // The cap limits one sitting; it never changes what is owed.
    expect(dueCount(scenario)).toBe(3);
  });

  it('ignores items that are not at the studied depth', () => {
    const cards = [card('a1', 'a', { due: NOW - DAY })];
    const narrowed: TopicItems = { topic: a, items: [] };
    expect(reviewQueue(input([narrowed], cards))).toEqual([]);
  });
});

describe('unseenItems', () => {
  const a = topic('a', ['a1', 'a2']);

  it('lists everything when nothing has been studied', () => {
    expect(unseenItems(entry(a), new Map()).map((i) => i.id)).toEqual([
      'a1',
      'a2',
    ]);
  });

  it('excludes items that already have a card', () => {
    const cards = new Map([['a1', card('a1', 'a')]]);
    expect(unseenItems(entry(a), cards).map((i) => i.id)).toEqual(['a2']);
  });

  it('orders easiest first', () => {
    const mixed: TopicItems = {
      topic: a,
      items: [item('x', 'ap'), item('y', 'warmup'), item('z', 'challenge')],
    };
    expect(unseenItems(mixed, new Map()).map((i) => i.id)).toEqual([
      'y',
      'z',
      'x',
    ]);
  });
});

describe('prerequisite gating', () => {
  const basics = topic('basics', ['bas1']);
  const advanced = topic('advanced', ['adv1'], ['basics']);

  it('allows a topic with no prerequisites', () => {
    expect(prereqsMet(basics, new Map())).toBe(true);
  });

  it('blocks a topic whose prerequisite is untouched', () => {
    expect(prereqsMet(advanced, new Map())).toBe(false);
  });

  it('still blocks when the prerequisite was only ever failed', () => {
    const cards = new Map([
      ['bas1', card('bas1', 'basics', { everCorrect: false })],
    ]);
    expect(prereqsMet(advanced, cards)).toBe(false);
  });

  it('unblocks once the prerequisite has been answered correctly', () => {
    const cards = new Map([
      ['bas1', card('bas1', 'basics', { everCorrect: true })],
    ]);
    expect(prereqsMet(advanced, cards)).toBe(true);
  });

  it('requires every prerequisite, not just one', () => {
    const needsBoth = topic('both', ['x'], ['basics', 'other']);
    const cards = new Map([
      ['bas1', card('bas1', 'basics', { everCorrect: true })],
    ]);
    expect(prereqsMet(needsBoth, cards)).toBe(false);
  });

  it('names what is still missing', () => {
    const scenario = input([entry(basics), entry(advanced)], []);
    const blocked = blockedTopics(scenario);
    expect(blocked).toHaveLength(1);
    expect(blocked[0].topic.id).toBe('advanced');
    expect(blocked[0].missing).toEqual(['basics']);
  });
});

describe('learnableTopics', () => {
  const basics = topic('basics', ['bas1']);
  const advanced = topic('advanced', ['adv1'], ['basics']);

  it('offers only unblocked topics', () => {
    const scenario = input([entry(basics), entry(advanced)], []);
    expect(learnableTopics(scenario).map((t) => t.topic.id)).toEqual(['basics']);
  });

  it('offers a topic once its prerequisite is satisfied', () => {
    const cards = [card('bas1', 'basics', { everCorrect: true })];
    const scenario = input([entry(basics), entry(advanced)], cards);
    expect(learnableTopics(scenario).map((t) => t.topic.id)).toEqual([
      'advanced',
    ]);
  });

  it('drops a topic with nothing left unstudied', () => {
    const cards = [card('bas1', 'basics', { everCorrect: true })];
    const scenario = input([entry(basics)], cards);
    expect(learnableTopics(scenario)).toEqual([]);
  });
});

describe('cramQueue', () => {
  it('returns everything regardless of due dates', () => {
    const a = topic('a', ['a1', 'a2']);
    expect(cramQueue([entry(a)]).map((q) => q.item.id)).toEqual(['a1', 'a2']);
  });

  it('orders easiest first', () => {
    const mixed: TopicItems = {
      topic: topic('a', []),
      items: [item('hard', 'ap'), item('easy', 'warmup')],
    };
    expect(cramQueue([mixed]).map((q) => q.item.id)).toEqual(['easy', 'hard']);
  });

  it('spans several topics', () => {
    const a = topic('a', ['a1']);
    const b = topic('b', ['b1']);
    expect(cramQueue([entry(a), entry(b)])).toHaveLength(2);
  });
});
