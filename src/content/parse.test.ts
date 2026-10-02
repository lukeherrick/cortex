import { describe, expect, it } from 'vitest';
import { parseTopicFile, parseUnitFile } from '@/content/parse';

const topicFile = `---
id: chem.stoich.mole-ratio
unit: chem.unit-03
subject: chem
title: Mole Ratios
depth: both
ced:
  - SPQ-4.1
prereqs: []
items:
  - id: chem.stoich.mole-ratio.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: How many moles of H2 react with 1.00 mol N2?
    answer:
      value: 3
      unit: mol
      sigFigs: 3
    solution:
      - text: "Balanced equation: N2 + 3 H2 -> 2 NH3."
      - text: "The ratio N2 : H2 is 1 : 3, so 1.00 mol N2 needs 3.00 mol H2."
    source: original
    verified: true
---

A balanced equation is a recipe in moles.
`;

const unitFile = `---
id: chem.unit-03
subject: chem
title: Stoichiometry
order: 3
---
`;

describe('parseTopicFile', () => {
  it('reads frontmatter into a Topic', () => {
    const topic = parseTopicFile(topicFile, 'content/chem/x.md');
    expect(topic.id).toBe('chem.stoich.mole-ratio');
    expect(topic.items).toHaveLength(1);
    expect(topic.items[0].solution).toHaveLength(2);
  });

  it('uses the Markdown body as the concept', () => {
    const topic = parseTopicFile(topicFile, 'content/chem/x.md');
    expect(topic.concept).toBe('A balanced equation is a recipe in moles.');
  });

  it('names the file in the error when validation fails', () => {
    const broken = topicFile.replace('tier: warmup', 'tier: boss');
    expect(() => parseTopicFile(broken, 'content/chem/x.md')).toThrow(
      /content\/chem\/x\.md/,
    );
  });

  it('rejects a topic whose body is empty', () => {
    const bodyless = topicFile.slice(0, topicFile.lastIndexOf('---') + 3);
    expect(() => parseTopicFile(bodyless, 'content/chem/x.md')).toThrow();
  });
});

describe('parseUnitFile', () => {
  it('reads unit metadata', () => {
    expect(parseUnitFile(unitFile, 'content/chem/_unit.md')).toEqual({
      id: 'chem.unit-03',
      subject: 'chem',
      title: 'Stoichiometry',
      order: 3,
    });
  });
});
