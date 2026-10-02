import { describe, expect, it } from 'vitest';
import { validateBundle } from '@/content/validate';
import type { ContentBundle, Item, Topic, Unit } from '@/content/types';

const unit: Unit = {
  id: 'chem.unit-03',
  subject: 'chem',
  title: 'Stoichiometry',
  order: 3,
};

function item(id: string, over: Record<string, unknown> = {}): Item {
  return {
    id,
    tier: 'warmup',
    type: 'numeric',
    depth: 'both',
    prompt: 'p',
    answer: { value: 1, unit: 'mol', sigFigs: 1 },
    solution: [{ text: 's' }],
    source: 'original',
    verified: true,
    ...over,
  } as Item;
}

function topic(id: string, over: Partial<Topic> = {}): Topic {
  return {
    id,
    unit: 'chem.unit-03',
    subject: 'chem',
    title: 't',
    depth: 'both',
    ced: [],
    prereqs: [],
    concept: 'c',
    items: [item(`${id}.i1`)],
    ...over,
  };
}

const bundle = (topics: Topic[], units: Unit[] = [unit]): ContentBundle => ({
  units,
  topics,
});

describe('validateBundle', () => {
  it('passes a clean bundle', () => {
    expect(validateBundle(bundle([topic('a'), topic('b')]))).toEqual([]);
  });

  it('flags a duplicate topic id', () => {
    expect(validateBundle(bundle([topic('a'), topic('a')])).join('\n')).toMatch(
      /duplicate topic id: a/i,
    );
  });

  it('flags a duplicate item id across topics', () => {
    const a = topic('a', { items: [item('shared')] });
    const b = topic('b', { items: [item('shared')] });
    expect(validateBundle(bundle([a, b])).join('\n')).toMatch(
      /duplicate item id: shared/i,
    );
  });

  it('flags a missing unit', () => {
    const t = topic('a', { unit: 'chem.unit-99' });
    expect(validateBundle(bundle([t])).join('\n')).toMatch(
      /unknown unit: chem\.unit-99/i,
    );
  });

  it('flags a dangling prereq', () => {
    const t = topic('a', { prereqs: ['nope'] });
    expect(validateBundle(bundle([t])).join('\n')).toMatch(
      /unknown prereq: nope/i,
    );
  });

  it('flags a prereq cycle', () => {
    const a = topic('a', { prereqs: ['b'] });
    const b = topic('b', { prereqs: ['a'] });
    expect(validateBundle(bundle([a, b])).join('\n')).toMatch(/cycle/i);
  });

  it('flags honors depth on a biology topic', () => {
    const bioUnit: Unit = {
      id: 'bio.unit-01',
      subject: 'bio',
      title: 'Chemistry of Life',
      order: 1,
    };
    const t = topic('a', {
      subject: 'bio',
      unit: 'bio.unit-01',
      depth: 'honors',
    });
    expect(validateBundle(bundle([t], [bioUnit])).join('\n')).toMatch(
      /depth "honors" is not valid for bio/i,
    );
  });

  it('flags an OpenStax item with no attribution', () => {
    const t = topic('a', { items: [item('a.i1', { source: 'openstax' })] });
    expect(validateBundle(bundle([t])).join('\n')).toMatch(/attribution/i);
  });
});
