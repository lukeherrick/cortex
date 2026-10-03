import { beforeEach, describe, expect, it } from 'vitest';
import {
  applyBackup,
  backupFilename,
  BackupError,
  BACKUP_VERSION,
  buildBackup,
  countsOf,
  eraseAllProgress,
  parseBackup,
  serialiseBackup,
} from '@/data/backup';
import { recordAttempt } from '@/data/attempts';
import { allCards, saveCard } from '@/data/cards';
import { dayMap, recordAnswer } from '@/data/days';
import { entryMap, loadHabits, setEntry } from '@/data/habits';
import { freshCard } from '@/scheduler/schedule';

const NOW = Date.UTC(2026, 0, 15, 12);
const TODAY = '2026-01-15';

async function seedSomeProgress(): Promise<void> {
  await recordAttempt({
    itemId: 'chem.stoich.mole-ratio.i1',
    topicId: 'chem.stoich.mole-ratio',
    answeredAt: NOW,
    correct: true,
    response: '3.00 mol',
  });
  await saveCard({
    ...freshCard(
      {
        itemId: 'chem.stoich.mole-ratio.i1',
        topicId: 'chem.stoich.mole-ratio',
        subject: 'chem',
      },
      NOW,
    ),
    everCorrect: true,
  });
  await recordAnswer(TODAY, 0, NOW);
  await loadHabits(NOW);
  await setEntry('habit.water', TODAY, 3, NOW);
}

beforeEach(async () => {
  await eraseAllProgress();
});

describe('buildBackup', () => {
  it('captures every table', async () => {
    await seedSomeProgress();
    const backup = await buildBackup(NOW);
    const counts = countsOf(backup);

    expect(counts.attempts).toBe(1);
    expect(counts.cards).toBe(1);
    expect(counts.days).toBe(1);
    expect(counts.habits).toBe(10);
    expect(counts.habitEntries).toBe(1);
    // The seeded flag lives in settings and must travel, or an import would
    // get its habits re-seeded on top.
    expect(counts.settings).toBeGreaterThan(0);
  });

  it('stamps the format and version', async () => {
    const backup = await buildBackup(NOW);
    expect(backup.format).toBe('cortex-backup');
    expect(backup.version).toBe(BACKUP_VERSION);
    expect(backup.exportedAt).toBe('2026-01-15T12:00:00.000Z');
  });

  it('works on an empty database', async () => {
    const backup = await buildBackup(NOW);
    expect(countsOf(backup)).toEqual({
      attempts: 0,
      cards: 0,
      days: 0,
      habits: 0,
      habitEntries: 0,
      settings: 0,
    });
  });

  it('does not carry the question content', async () => {
    // Content ships with the build. A stale backup must not be able to
    // overwrite corrected questions.
    const text = serialiseBackup(await buildBackup(NOW));
    expect(text).not.toMatch(/molar mass|concept|solution/i);
  });
});

describe('round trip', () => {
  it('restores everything after a wipe', async () => {
    await seedSomeProgress();
    const text = serialiseBackup(await buildBackup(NOW));

    await eraseAllProgress();
    expect(await allCards()).toHaveLength(0);

    const restored = await applyBackup(parseBackup(text), 'replace');

    expect(restored.cards).toBe(1);
    expect(await allCards()).toHaveLength(1);
    expect((await dayMap()).get(TODAY)!.cleared).toBe(true);
    expect((await entryMap()).size).toBe(1);
  });

  it('preserves the scheduling state exactly', async () => {
    await seedSomeProgress();
    const before = (await allCards())[0];

    const text = serialiseBackup(await buildBackup(NOW));
    await eraseAllProgress();
    await applyBackup(parseBackup(text), 'replace');

    const after = (await allCards())[0];
    expect(after).toEqual(before);
  });

  it('survives being written and read as a file would be', async () => {
    await seedSomeProgress();
    const text = serialiseBackup(await buildBackup(NOW));
    expect(text.endsWith('\n')).toBe(true);
    expect(() => parseBackup(text)).not.toThrow();
  });
});

describe('replace mode', () => {
  it('discards local progress not present in the backup', async () => {
    const text = serialiseBackup(await buildBackup(NOW));
    await seedSomeProgress();
    expect(await allCards()).toHaveLength(1);

    await applyBackup(parseBackup(text), 'replace');
    expect(await allCards()).toHaveLength(0);
  });
});

describe('merge mode', () => {
  it('keeps local records absent from the backup', async () => {
    const emptyBackup = parseBackup(serialiseBackup(await buildBackup(NOW)));
    await seedSomeProgress();

    await applyBackup(emptyBackup, 'merge');
    expect(await allCards()).toHaveLength(1);
  });

  it('prefers whichever copy was updated more recently', async () => {
    const meta = {
      itemId: 'x.i1',
      topicId: 'x',
      subject: 'chem' as const,
    };
    await saveCard({ ...freshCard(meta, NOW), stability: 1, updatedAt: NOW });
    const older = parseBackup(serialiseBackup(await buildBackup(NOW)));

    // Local copy moves on.
    await saveCard({
      ...freshCard(meta, NOW),
      stability: 99,
      updatedAt: NOW + 1000,
    });

    await applyBackup(older, 'merge');
    expect((await allCards())[0].stability).toBe(99);
  });

  it('takes the backup copy when it is the newer one', async () => {
    const meta = {
      itemId: 'x.i1',
      topicId: 'x',
      subject: 'chem' as const,
    };
    await saveCard({
      ...freshCard(meta, NOW),
      stability: 42,
      updatedAt: NOW + 5000,
    });
    const newer = parseBackup(serialiseBackup(await buildBackup(NOW)));

    await saveCard({ ...freshCard(meta, NOW), stability: 1, updatedAt: NOW });

    await applyBackup(newer, 'merge');
    expect((await allCards())[0].stability).toBe(42);
  });
});

describe('parseBackup — refusing bad input', () => {
  it('rejects text that is not JSON, naming the likely mistake', () => {
    expect(() => parseBackup('not json at all')).toThrow(BackupError);
    expect(() => parseBackup('not json at all')).toThrow(/valid JSON/i);
  });

  it('rejects a JSON file from something else', () => {
    expect(() => parseBackup('{"todos":[]}')).toThrow(/no format marker/i);
  });

  it('rejects a malformed Cortex backup without touching anything', () => {
    const bad = JSON.stringify({
      format: 'cortex-backup',
      version: 1,
      exportedAt: 'now',
      data: { attempts: 'not an array' },
    });
    expect(() => parseBackup(bad)).toThrow(/malformed/i);
  });

  it('refuses a backup from a newer app version rather than guessing', () => {
    const future = JSON.stringify({
      format: 'cortex-backup',
      version: BACKUP_VERSION + 1,
      exportedAt: 'now',
      data: {},
    });
    expect(() => parseBackup(future)).toThrow(/newer version/i);
  });

  it('accepts a backup with extra fields a later version might add', () => {
    const text = JSON.stringify({
      format: 'cortex-backup',
      version: 1,
      exportedAt: 'now',
      somethingNew: true,
      data: {
        cards: [{ id: 'a', futureField: 7 }],
      },
    });
    expect(() => parseBackup(text)).not.toThrow();
    expect(countsOf(parseBackup(text)).cards).toBe(1);
  });

  it('fills in tables the backup happens to omit', () => {
    const text = JSON.stringify({
      format: 'cortex-backup',
      version: 1,
      exportedAt: 'now',
      data: { cards: [{ id: 'a' }] },
    });
    expect(countsOf(parseBackup(text)).attempts).toBe(0);
  });
});

describe('backupFilename', () => {
  it('is dated so successive backups do not overwrite each other', () => {
    expect(backupFilename(new Date(2026, 0, 5).getTime())).toBe(
      'cortex-backup-2026-01-05.json',
    );
  });
});
