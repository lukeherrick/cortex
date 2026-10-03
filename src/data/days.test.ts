import { beforeEach, describe, expect, it } from 'vitest';
import { clearDays, dayMap, recordAnswer } from '@/data/days';

const TODAY = '2026-01-15';
const NOW = Date.UTC(2026, 0, 15, 12);

beforeEach(async () => {
  await clearDays();
});

describe('day log', () => {
  it('starts empty', async () => {
    expect(await dayMap()).toEqual(new Map());
  });

  it('counts answers within a day', async () => {
    await recordAnswer(TODAY, 5, NOW);
    await recordAnswer(TODAY, 3, NOW);
    const record = (await dayMap()).get(TODAY)!;
    expect(record.answered).toBe(2);
  });

  it('is not cleared while work remains due', async () => {
    await recordAnswer(TODAY, 4, NOW);
    expect((await dayMap()).get(TODAY)!.cleared).toBe(false);
  });

  it('becomes cleared when the last due item is answered', async () => {
    await recordAnswer(TODAY, 2, NOW);
    await recordAnswer(TODAY, 0, NOW);
    expect((await dayMap()).get(TODAY)!.cleared).toBe(true);
  });

  it('un-clears if more work becomes due later the same day', async () => {
    // Finishing the queue then starting a new topic genuinely re-owes work.
    await recordAnswer(TODAY, 0, NOW);
    expect((await dayMap()).get(TODAY)!.cleared).toBe(true);
    await recordAnswer(TODAY, 6, NOW);
    expect((await dayMap()).get(TODAY)!.cleared).toBe(false);
  });

  it('keeps days separate', async () => {
    await recordAnswer('2026-01-14', 0, NOW);
    await recordAnswer(TODAY, 1, NOW);
    const map = await dayMap();
    expect(map.size).toBe(2);
    expect(map.get('2026-01-14')!.cleared).toBe(true);
    expect(map.get(TODAY)!.cleared).toBe(false);
  });
});
