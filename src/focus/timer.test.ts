import { describe, expect, it } from 'vitest';
import {
  DEFAULT_DURATIONS,
  formatRemaining,
  initialState,
  isComplete,
  nextPhase,
  pause,
  progressOf,
  remainingAt,
  reset,
  start,
} from '@/focus/timer';

const NOW = 1_700_000_000_000;
const MIN = 60_000;

describe('starting and pausing', () => {
  it('starts idle at a full focus block', () => {
    const s = initialState();
    expect(s.phase).toBe('focus');
    expect(s.running).toBe(false);
    expect(s.remaining).toBe(25 * MIN);
  });

  it('sets a wall-clock deadline when started', () => {
    const s = start(initialState(), NOW);
    expect(s.running).toBe(true);
    expect(s.endsAt).toBe(NOW + 25 * MIN);
  });

  it('counts down against the clock, not against ticks', () => {
    const s = start(initialState(), NOW);
    expect(remainingAt(s, NOW + 10 * MIN)).toBe(15 * MIN);
  });

  it('is still correct after the tab was asleep for ages', () => {
    // The whole reason for deadlines: a throttled tab must not run slow.
    const s = start(initialState(), NOW);
    expect(remainingAt(s, NOW + 24 * MIN)).toBe(1 * MIN);
  });

  it('never reports negative time left', () => {
    const s = start(initialState(), NOW);
    expect(remainingAt(s, NOW + 99 * MIN)).toBe(0);
  });

  it('holds the remaining time when paused', () => {
    const running = start(initialState(), NOW);
    const paused = pause(running, NOW + 10 * MIN);
    expect(paused.running).toBe(false);
    expect(paused.remaining).toBe(15 * MIN);
    expect(paused.endsAt).toBeNull();
  });

  it('resumes from where it was paused', () => {
    const paused = pause(start(initialState(), NOW), NOW + 10 * MIN);
    const resumed = start(paused, NOW + 60 * MIN);
    // An hour of being paused must not eat into the block.
    expect(remainingAt(resumed, NOW + 60 * MIN)).toBe(15 * MIN);
  });

  it('ignores a second start, so double-tapping cannot restart it', () => {
    const running = start(initialState(), NOW);
    expect(start(running, NOW + 5 * MIN)).toBe(running);
  });

  it('ignores a pause when already paused', () => {
    const s = initialState();
    expect(pause(s, NOW)).toBe(s);
  });
});

describe('completion', () => {
  it('is not complete while time remains', () => {
    const s = start(initialState(), NOW);
    expect(isComplete(s, NOW + 24 * MIN)).toBe(false);
  });

  it('is complete once the deadline passes', () => {
    const s = start(initialState(), NOW);
    expect(isComplete(s, NOW + 25 * MIN)).toBe(true);
  });

  it('is never complete while paused', () => {
    expect(isComplete(initialState(), NOW)).toBe(false);
  });
});

describe('phase cycling', () => {
  it('follows a focus block with a short break', () => {
    const done = start(initialState(), NOW);
    const next = nextPhase(done);
    expect(next.phase).toBe('shortBreak');
    expect(next.remaining).toBe(5 * MIN);
    expect(next.completed).toBe(1);
  });

  it('does not start the next phase automatically', () => {
    // Nobody should be hurried back to work, or out of a rest.
    expect(nextPhase(initialState()).running).toBe(false);
  });

  it('offers a long break after four focus blocks', () => {
    let s = initialState();
    const phases: string[] = [];
    for (let i = 0; i < 8; i += 1) {
      s = nextPhase(s);
      phases.push(s.phase);
    }
    expect(phases).toEqual([
      'shortBreak',
      'focus',
      'shortBreak',
      'focus',
      'shortBreak',
      'focus',
      'longBreak',
      'focus',
    ]);
  });

  it('counts only focus blocks toward the long break', () => {
    const afterFocus = nextPhase(initialState());
    const afterBreak = nextPhase(afterFocus);
    expect(afterBreak.completed).toBe(1);
    expect(afterBreak.phase).toBe('focus');
  });

  it('resets the current phase to its full length', () => {
    const partway = pause(start(initialState(), NOW), NOW + 20 * MIN);
    expect(reset(partway, DEFAULT_DURATIONS).remaining).toBe(25 * MIN);
  });
});

describe('display', () => {
  it.each([
    [25 * MIN, '25:00'],
    [90_000, '1:30'],
    [59_000, '0:59'],
    [1000, '0:01'],
    [0, '0:00'],
  ])('formats %i ms as %s', (ms, expected) => {
    expect(formatRemaining(ms)).toBe(expected);
  });

  it('rounds up so the clock never shows 0:00 with time still left', () => {
    expect(formatRemaining(1)).toBe('0:01');
  });

  it('reports progress through the phase', () => {
    const s = start(initialState(), NOW);
    expect(progressOf(s, NOW)).toBe(0);
    expect(progressOf(s, NOW + 12.5 * MIN)).toBeCloseTo(0.5, 5);
    expect(progressOf(s, NOW + 25 * MIN)).toBe(1);
  });

  it('never reports progress beyond one', () => {
    const s = start(initialState(), NOW);
    expect(progressOf(s, NOW + 99 * MIN)).toBe(1);
  });
});
