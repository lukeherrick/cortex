import { useEffect, useRef, useState } from 'react';
import {
  DEFAULT_DURATIONS,
  formatRemaining,
  initialState,
  isComplete,
  nextPhase,
  pause,
  PHASE_LABEL,
  progressOf,
  remainingAt,
  reset,
  start,
  type TimerState,
} from '@/focus/timer';
import type { Technique } from '@/focus/techniques';
import MeadowScene from '@/ui/MeadowScene';
import { Sparkle } from '@/ui/art';

const FALLBACK_BLURB: Record<TimerState['phase'], string> = {
  focus: 'One thing only. Phone somewhere else.',
  shortBreak: 'Stand up. Look out of a window. Do not open anything.',
  longBreak: 'Properly off. Walk about, eat something, let it settle.',
};

/**
 * Keep the screen awake while the timer runs.
 *
 * A timer that goes dark thirty seconds in is useless as a desk clock, which
 * is the whole point of this screen. The lock is dropped as soon as the timer
 * is paused or the screen is left, and it is re-acquired when the tab comes
 * back, because the browser silently releases it whenever the page is hidden.
 */
function useWakeLock(active: boolean): boolean {
  const [held, setHeld] = useState(false);
  const lockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    let cancelled = false;

    const release = () => {
      lockRef.current?.release().catch(() => {});
      lockRef.current = null;
      setHeld(false);
    };

    const acquire = async () => {
      if (!active || document.visibilityState !== 'visible') return;
      if (!('wakeLock' in navigator)) return;
      try {
        const lock = await navigator.wakeLock.request('screen');
        if (cancelled) {
          void lock.release();
          return;
        }
        lockRef.current = lock;
        setHeld(true);
        lock.addEventListener('release', () => setHeld(false));
      } catch {
        // Denied, unsupported, or the battery saver said no. Not an error
        // worth surfacing - the timer still works, the screen just sleeps.
        setHeld(false);
      }
    };

    if (active) void acquire();
    else release();

    const onVisible = () => {
      if (document.visibilityState === 'visible' && active) void acquire();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisible);
      release();
    };
  }, [active]);

  return held;
}

interface Props {
  technique: Technique;
  onOpenBuddy: () => void;
}

export default function FocusTimer({ technique, onOpenBuddy }: Props) {
  const durations = technique.timer ?? DEFAULT_DURATIONS;
  const [state, setState] = useState<TimerState>(() => initialState(durations));
  const [now, setNow] = useState(() => Date.now());

  // Switching buddy mid-session would silently change the block length under
  // the owner, so the clock is reloaded only while it is idle.
  useEffect(() => {
    setState((s) => (s.running ? s : initialState(durations)));
  }, [durations]);

  const awake = useWakeLock(state.running);

  const reminders =
    state.phase === 'focus'
      ? technique.focusReminders
      : technique.breakReminders;

  // Re-render once a second. The timer itself is driven by deadlines, so this
  // only refreshes the display - drift here cannot affect the actual timing.
  useEffect(() => {
    if (!state.running) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [state.running]);

  const left = remainingAt(state, now);
  const done = isComplete(state, now);
  const progress = progressOf(state, now, durations);

  const ring = 2 * Math.PI * 86;

  return (
    <section className={`focus phase-${state.phase}`}>
      <MeadowScene phase={state.phase} running={state.running && !done} />

      <div className="focus-card card">
        <button type="button" className="buddy-pill" onClick={onOpenBuddy}>
          <span className="buddy-pill-name">{technique.name}</span>
          <span className="buddy-pill-swap">change</span>
        </button>

        <p className="eyebrow">{PHASE_LABEL[state.phase]}</p>

        <div className="focus-dial">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r="86" className="dial-track" />
            <circle
              cx="100"
              cy="100"
              r="86"
              className="dial-fill"
              strokeDasharray={ring}
              strokeDashoffset={ring * (1 - progress)}
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div className="focus-readout">
            <span className="focus-time">{formatRemaining(left)}</span>
            <span className="focus-sub">
              {done
                ? 'done'
                : state.running
                  ? PHASE_LABEL[state.phase].toLowerCase()
                  : 'paused'}
            </span>
          </div>
        </div>

        {/*
          The chosen technique's own advice, shown at the moment it applies.
          This is the whole reason picking a buddy changes anything.
        */}
        {reminders.length > 0 ? (
          <ul className="focus-reminders">
            {reminders.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : (
          <p className="focus-blurb">{FALLBACK_BLURB[state.phase]}</p>
        )}

        <div className="focus-controls">
          {done ? (
            <button
              type="button"
              className="primary big"
              onClick={() => setState(nextPhase(state, durations))}
            >
              <Sparkle />{' '}
              {state.phase === 'focus' ? 'Take the break' : 'Back to it'}
            </button>
          ) : (
            <button
              type="button"
              className="primary big"
              onClick={() =>
                setState(
                  state.running ? pause(state, Date.now()) : start(state, Date.now()),
                )
              }
            >
              {state.running
                ? 'Pause'
                : left === durations.focus
                  ? 'Start'
                  : 'Resume'}
            </button>
          )}

          <div className="focus-secondary">
            <button
              type="button"
              className="quiet"
              onClick={() => setState(reset(state, durations))}
            >
              Reset
            </button>
            <button
              type="button"
              className="quiet"
              onClick={() => setState(nextPhase(state, durations))}
            >
              Skip
            </button>
          </div>
        </div>

        <div className="focus-footer">
          <p className="focus-count">
            {state.completed} focus {state.completed === 1 ? 'block' : 'blocks'}{' '}
            today
          </p>
          <p className="focus-wake">
            {awake
              ? 'Screen staying on while the timer runs'
              : state.running
                ? 'Your screen may sleep — this browser would not keep it awake'
                : 'Screen stays on once you start'}
          </p>
        </div>
      </div>
    </section>
  );
}
