import { beforeEach, describe, expect, it } from 'vitest';
import {
  allAttempts,
  attemptsForItem,
  clearAllData,
  recordAttempt,
} from '@/data/attempts';

const base = {
  itemId: 'chem.stoich.mole-ratio.i1',
  topicId: 'chem.stoich.mole-ratio',
  answeredAt: 1_700_000_000_000,
  correct: true,
  response: '3.00 mol',
};

describe('attempts', () => {
  beforeEach(async () => {
    await clearAllData();
  });

  it('stores an attempt and gives it an id', async () => {
    const saved = await recordAttempt(base);
    expect(saved.id).toMatch(/.+/);
    expect(saved.updatedAt).toBeGreaterThan(0);
  });

  it('reads attempts back for one item', async () => {
    await recordAttempt(base);
    await recordAttempt({ ...base, correct: false, response: '3 mol' });
    await recordAttempt({ ...base, itemId: 'other' });

    const found = await attemptsForItem(base.itemId);
    expect(found).toHaveLength(2);
    expect(found.map((a) => a.correct)).toEqual([true, false]);
  });

  it('keeps the raw response text', async () => {
    await recordAttempt({ ...base, response: 'water is polar' });
    const [saved] = await attemptsForItem(base.itemId);
    expect(saved.response).toBe('water is polar');
  });

  it('starts empty', async () => {
    expect(await allAttempts()).toEqual([]);
  });
});
