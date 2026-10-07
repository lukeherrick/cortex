import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import SessionDone, { describeReturn, type DoneSummary } from '@/ui/SessionDone';

afterEach(cleanup);

const DAY = 86_400_000;
// A Thursday at midday, so weekday naming is unambiguous.
const NOW = new Date(2026, 0, 15, 12).getTime();

const summary = (over: Partial<DoneSummary> = {}): DoneSummary => ({
  right: 7,
  total: 9,
  newlyMastered: 0,
  nextDue: null,
  nextDueCount: 0,
  streak: 0,
  ...over,
});

describe('describeReturn', () => {
  it('names tomorrow as tomorrow', () => {
    expect(describeReturn(NOW + DAY, NOW)).toBe('tomorrow');
  });

  it('uses a weekday name within the coming week', () => {
    // Three days after a Thursday is a Sunday.
    expect(describeReturn(NOW + 3 * DAY, NOW)).toBe('Sunday');
  });

  it('switches to a count once a weekday name stops helping', () => {
    expect(describeReturn(NOW + 10 * DAY, NOW)).toBe('next week');
    expect(describeReturn(NOW + 21 * DAY, NOW)).toMatch(/weeks/);
    expect(describeReturn(NOW + 90 * DAY, NOW)).toMatch(/months/);
  });

  it('handles something already due', () => {
    expect(describeReturn(NOW - DAY, NOW)).toBe('later today');
  });
});

describe('SessionDone', () => {
  it('shows the score', () => {
    render(
      <SessionDone
        summary={summary()}
        mode="review"
        biome="meadow"
        onExit={() => {}}
      />,
    );
    expect(screen.getByText('7')).toBeDefined();
    expect(screen.getByText('/9')).toBeDefined();
  });

  it('celebrates a clean sweep differently', () => {
    render(
      <SessionDone
        summary={summary({ right: 9, total: 9 })}
        mode="review"
        biome="meadow"
        onExit={() => {}}
      />,
    );
    expect(screen.getByRole('heading', { name: /clean sweep/i })).toBeDefined();
  });

  it('reports what moved into long-term memory', () => {
    render(
      <SessionDone
        summary={summary({ newlyMastered: 3 })}
        mode="review"
        biome="meadow"
        onExit={() => {}}
      />,
    );
    expect(screen.getByText(/moved into long-term memory/i)).toBeDefined();
    expect(screen.getByText('3 questions')).toBeDefined();
  });

  it('omits the gain line when nothing was gained', () => {
    render(
      <SessionDone
        summary={summary({ newlyMastered: 0 })}
        mode="review"
        biome="meadow"
        onExit={() => {}}
      />,
    );
    expect(screen.queryByText(/moved into long-term memory/i)).toBeNull();
  });

  it('gives a concrete reason to come back', () => {
    render(
      <SessionDone
        summary={summary({ nextDue: Date.now() + DAY, nextDueCount: 4 })}
        mode="review"
        biome="meadow"
        onExit={() => {}}
      />,
    );
    expect(screen.getByText(/4 questions come back/i)).toBeDefined();
    expect(screen.getByText('tomorrow')).toBeDefined();
  });

  it('uses the singular for one returning question', () => {
    render(
      <SessionDone
        summary={summary({ nextDue: Date.now() + DAY, nextDueCount: 1 })}
        mode="review"
        biome="meadow"
        onExit={() => {}}
      />,
    );
    expect(screen.getByText(/1 question comes back/i)).toBeDefined();
  });

  it('never promises a return after a cram run', () => {
    // Cram does not touch the schedule, so there is nothing to come back.
    render(
      <SessionDone
        summary={summary({ nextDue: Date.now() + DAY, nextDueCount: 4 })}
        mode="cram"
        biome="meadow"
        onExit={() => {}}
      />,
    );
    expect(screen.queryByText(/come back/i)).toBeNull();
    expect(screen.getByText(/don’t change your schedule/i)).toBeDefined();
  });

  it('shows a streak once there is one', () => {
    render(
      <SessionDone
        summary={summary({ streak: 5 })}
        mode="review"
        biome="meadow"
        onExit={() => {}}
      />,
    );
    expect(screen.getByText(/5-day streak/i)).toBeDefined();
  });
});
