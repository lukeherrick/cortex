import { describe, expect, it } from 'vitest';
import {
  findTopic,
  itemsAtDepth,
  loadBundle,
  topicsForSubject,
} from '@/content';
import type { Depth, Item, Topic } from '@/content/types';

const bundle = loadBundle();

describe('loadBundle', () => {
  it('loads the generated bundle', () => {
    expect(bundle.topics.length).toBeGreaterThan(0);
    expect(bundle.units.length).toBeGreaterThan(0);
  });
});

describe('topicsForSubject', () => {
  it('separates the two subjects', () => {
    expect(
      topicsForSubject(bundle, 'bio').every((t) => t.subject === 'bio'),
    ).toBe(true);
    expect(
      topicsForSubject(bundle, 'chem').every((t) => t.subject === 'chem'),
    ).toBe(true);
  });

  it('has content in both subjects', () => {
    expect(topicsForSubject(bundle, 'bio').length).toBeGreaterThan(0);
    expect(topicsForSubject(bundle, 'chem').length).toBeGreaterThan(0);
  });
});

/*
 * Built from fixtures rather than shipped topics. These assert what the depth
 * filter does, which must not change when a chemistry problem is re-authored
 * at a different depth - an earlier version pinned this to a real item id and
 * broke the moment that item legitimately moved.
 */
describe('itemsAtDepth', () => {
  const item = (id: string, depth: Depth): Item =>
    ({ id, depth, tier: 'standard', type: 'recall' }) as unknown as Item;

  const topic = {
    items: [
      item('shared', 'both'),
      item('honors-only', 'honors'),
      item('ap-only', 'ap'),
    ],
  } as unknown as Topic;

  it('hides ap-only items from an honors learner', () => {
    expect(itemsAtDepth(topic, 'honors').map((i) => i.id)).not.toContain(
      'ap-only',
    );
  });

  it('shows ap-only items to an ap learner', () => {
    expect(itemsAtDepth(topic, 'ap').map((i) => i.id)).toContain('ap-only');
  });

  it('hides honors-only items from an ap learner', () => {
    expect(itemsAtDepth(topic, 'ap').map((i) => i.id)).not.toContain(
      'honors-only',
    );
  });

  it('always includes shared items', () => {
    for (const depth of ['honors', 'ap'] as const) {
      expect(itemsAtDepth(topic, depth).map((i) => i.id)).toContain('shared');
    }
  });

  it('shows every biology item at ap depth, since bio is ap-only', () => {
    const water = findTopic(bundle, 'bio.col.water-properties')!;
    expect(itemsAtDepth(water, 'ap')).toHaveLength(water.items.length);
  });
});

describe('findTopic', () => {
  it('returns undefined for an unknown id', () => {
    expect(findTopic(bundle, 'nope')).toBeUndefined();
  });
});
