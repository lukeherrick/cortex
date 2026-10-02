import { describe, expect, it } from 'vitest';
import { itemSchema, topicSchema } from '@/content/schema';

const numericItem = {
  id: 'chem.stoich.limiting-reagent.i1',
  tier: 'standard',
  type: 'numeric',
  depth: 'both',
  prompt: 'How many moles of NH3 form from 0.300 mol N2 and excess H2?',
  answer: { value: 0.6, unit: 'mol', sigFigs: 3 },
  solution: [{ text: 'Balanced: N2 + 3 H2 -> 2 NH3.' }],
  source: 'original',
  verified: true,
};

const topic = {
  id: 'chem.stoich.limiting-reagent',
  unit: 'chem.unit-03',
  subject: 'chem',
  title: 'Limiting Reagent',
  depth: 'both',
  ced: ['SPQ-4.1'],
  prereqs: ['chem.stoich.mole-ratio'],
  concept: 'The limiting reagent is consumed first and caps the product.',
  items: [numericItem],
};

describe('itemSchema', () => {
  it('accepts a well-formed numeric item', () => {
    expect(itemSchema.safeParse(numericItem).success).toBe(true);
  });

  it('rejects a numeric item whose answer has no sigFigs key', () => {
    const { sigFigs: _drop, ...answer } = numericItem.answer;
    expect(itemSchema.safeParse({ ...numericItem, answer }).success).toBe(false);
  });

  it('rejects an item with an empty solution', () => {
    expect(itemSchema.safeParse({ ...numericItem, solution: [] }).success).toBe(
      false,
    );
  });

  it('rejects an unknown tier', () => {
    expect(itemSchema.safeParse({ ...numericItem, tier: 'boss' }).success).toBe(
      false,
    );
  });

  it('defaults verified to false when omitted', () => {
    const { verified: _drop, ...rest } = numericItem;
    expect(itemSchema.parse(rest).verified).toBe(false);
  });
});

describe('topicSchema', () => {
  it('accepts a well-formed topic', () => {
    expect(topicSchema.safeParse(topic).success).toBe(true);
  });

  it('rejects a topic with no items', () => {
    expect(topicSchema.safeParse({ ...topic, items: [] }).success).toBe(false);
  });

  it('rejects a topic with an empty concept body', () => {
    expect(topicSchema.safeParse({ ...topic, concept: '' }).success).toBe(false);
  });
});
