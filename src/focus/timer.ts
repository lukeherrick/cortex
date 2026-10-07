/**
 * Pomodoro timing, as pure data.
 *
 * The timer is driven by **wall-clock deadlines**, never by counting ticks.
 * A phone locks, a tab is backgrounded, and browsers throttle timers to once a
 * minute or stop them entirely — a tick-counting timer silently runs slow and
 * tells you you have studied for 25 minutes when you have studied for 31.
 * Storing the moment it should end means the remaining time is always correct
 * the instant the screen comes back.
 */

export type Phase = 'focus' | 'shortBreak' | 'longBreak';

export interface Durations {
  focus: number;
  shortBreak: number;
  longBreak: number;
  /** Completed focus blocks before a long break is offered. */
  longBreakEvery: number;
}

export const DEFAULT_DURATIONS: Durations = {
  focus: 25 * 60_000,
  shortBreak: 5 * 60_000,
  longBreak: 15 * 60_000,
  longBreakEvery: 4,
};

export interface TimerState {
  phase: Phase;
  /** Epoch ms when the current phase ends. Null while paused or idle. */
  endsAt: number | null;
  /** Milliseconds left, held while paused. */
  remaining: number;
  running: boolean;
  /** Focus blocks finished in this sitting. */
  completed: number;
}

export function initialState(d: Durations = DEFAULT_DURATIONS): TimerState {
  return {
    phase: 'focus',
    endsAt: null,
    remaining: d.focus,
    running: false,
    completed: 0,
  };
}

export function durationOf(phase: Phase, d: Durations): number {
  if (phase === 'focus') return d.focus;
  if (phase === 'shortBreak') return d.shortBreak;
  return d.longBreak;
}

export function start(state: TimerState, now: number): TimerState {
  if (state.running) return state;
  return { ...state, running: true, endsAt: now + state.remaining };
}

export function pause(state: TimerState, now: number): TimerState {
  if (!state.running) return state;
  return {
    ...state,
    running: false,
    remaining: remainingAt(state, now),
    endsAt: null,
  };
}

/** Milliseconds left, never negative. */
export function remainingAt(state: TimerState, now: number): number {
  if (!state.running || state.endsAt === null) return state.remaining;
  return Math.max(0, state.endsAt - now);
}

export function isComplete(state: TimerState, now: number): boolean {
  return state.running && remainingAt(state, now) === 0;
}

/** Reset the current phase back to its full length. */
export function reset(state: TimerState, d: Durations): TimerState {
  return {
    ...state,
    running: false,
    endsAt: null,
    remaining: durationOf(state.phase, d),
  };
}

/**
 * Move to the phase that should follow this one.
 *
 * A finished focus block counts toward the long break; finishing a break never
 * does. Breaks do not start themselves — the next phase is always loaded
 * paused, so nobody is hurried back to work or hurried out of a rest.
 */
export function nextPhase(
  state: TimerState,
  d: Durations = DEFAULT_DURATIONS,
): TimerState {
  if (state.phase !== 'focus') {
    return {
      phase: 'focus',
      endsAt: null,
      remaining: d.focus,
      running: false,
      completed: state.completed,
    };
  }

  const completed = state.completed + 1;
  const phase: Phase =
    completed % d.longBreakEvery === 0 ? 'longBreak' : 'shortBreak';

  return {
    phase,
    endsAt: null,
    remaining: durationOf(phase, d),
    running: false,
    completed,
  };
}

/** mm:ss, for the big readout. */
export function formatRemaining(ms: number): string {
  const total = Math.ceil(ms / 1000);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

/** 0 to 1 through the current phase, for the ring. */
export function progressOf(
  state: TimerState,
  now: number,
  d: Durations = DEFAULT_DURATIONS,
): number {
  const full = durationOf(state.phase, d);
  if (full <= 0) return 0;
  return Math.min(1, Math.max(0, 1 - remainingAt(state, now) / full));
}

export const PHASE_LABEL: Record<Phase, string> = {
  focus: 'Focus',
  shortBreak: 'Short break',
  longBreak: 'Long break',
};
