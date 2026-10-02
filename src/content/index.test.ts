import { describe, expect, it } from 'vitest';
import {
  findTopic,
  itemsAtDepth,
  loadBundle,
  topicsForSubject,
} from '@/content';

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

describe('itemsAtDepth', () => {
  const limiting = findTopic(bundle, 'chem.stoich.limiting-reagent')!;

  it('hides ap-only items from an honors learner', () => {
    expect(itemsAtDepth(limiting, 'honors').map((i) => i.id)).not.toContain(
      'chem.stoich.limiting-reagent.i2',
    );
  });

  it('shows ap-only items to an ap learner', () => {
    expect(itemsAtDepth(limiting, 'ap').map((i) => i.id)).toContain(
      'chem.stoich.limiting-reagent.i2',
    );
  });

  it('always includes shared items', () => {
    for (const depth of ['honors', 'ap'] as const) {
      expect(itemsAtDepth(limiting, depth).map((i) => i.id)).toContain(
        'chem.stoich.limiting-reagent.i1',
      );
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
