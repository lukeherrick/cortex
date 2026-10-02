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
    expect(topicsForSubject(bundle, 'bio').every((t) => t.subject === 'bio')).toBe(
      true,
    );
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
  const water = findTopic(bundle, 'bio.col.water-properties')!;

  it('hides ap-only items from a level1 learner', () => {
    expect(itemsAtDepth(water, 'level1').map((i) => i.id)).not.toContain(
      'bio.col.water-properties.i4',
    );
  });

  it('shows ap-only items to an ap learner', () => {
    expect(itemsAtDepth(water, 'ap').map((i) => i.id)).toContain(
      'bio.col.water-properties.i4',
    );
  });

  it('always includes shared items', () => {
    expect(itemsAtDepth(water, 'level1').map((i) => i.id)).toContain(
      'bio.col.water-properties.i1',
    );
    expect(itemsAtDepth(water, 'ap').map((i) => i.id)).toContain(
      'bio.col.water-properties.i1',
    );
  });
});

describe('findTopic', () => {
  it('returns undefined for an unknown id', () => {
    expect(findTopic(bundle, 'nope')).toBeUndefined();
  });
});
