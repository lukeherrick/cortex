import { describe, expect, it } from 'vitest';
import { collectBundle } from './collect';

const unitMd = `---
id: chem.unit-03
subject: chem
title: Stoichiometry
order: 3
---
`;

const topicMd = `---
id: chem.stoich.mole-ratio
unit: chem.unit-03
subject: chem
title: Mole Ratios
depth: both
items:
  - id: chem.stoich.mole-ratio.i1
    tier: warmup
    type: numeric
    depth: both
    prompt: How many moles of H2 react with 1.00 mol N2?
    answer: { value: 3, unit: mol, sigFigs: 3 }
    solution:
      - text: "N2 + 3 H2 -> 2 NH3, so the ratio is 1 : 3."
    source: original
    verified: true
---

A balanced equation is a recipe in moles.
`;

describe('collectBundle', () => {
  it('builds a bundle from unit and topic files', () => {
    const bundle = collectBundle(
      new Map([
        ['content/chem/unit-03/_unit.md', unitMd],
        ['content/chem/unit-03/mole-ratio.md', topicMd],
      ]),
    );
    expect(bundle.units).toHaveLength(1);
    expect(bundle.topics).toHaveLength(1);
  });

  it('throws listing every validation error', () => {
    const orphan = topicMd.replace('unit: chem.unit-03', 'unit: chem.unit-99');
    expect(() =>
      collectBundle(new Map([['content/chem/unit-03/mole-ratio.md', orphan]])),
    ).toThrow(/unknown unit: chem\.unit-99/i);
  });

  it('sorts units by order', () => {
    const unit1 = unitMd
      .replace('chem.unit-03', 'chem.unit-01')
      .replace('order: 3', 'order: 1');
    const bundle = collectBundle(
      new Map([
        ['content/chem/unit-03/_unit.md', unitMd],
        ['content/chem/unit-01/_unit.md', unit1],
        ['content/chem/unit-03/mole-ratio.md', topicMd],
      ]),
    );
    expect(bundle.units.map((u) => u.id)).toEqual([
      'chem.unit-01',
      'chem.unit-03',
    ]);
  });
});
