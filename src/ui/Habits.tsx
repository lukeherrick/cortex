import { useState } from 'react';
import { recentDateKeys, slotForHour } from '@/habits/dates';
import {
  coreProgress,
  habitStreak,
  isComplete,
  isScheduled,
  nextValue,
  perfectDayStreak,
  progressOf,
  valueOf,
  type EntryMap,
} from '@/habits/logic';
import { SLOT_LABEL, type Habit, type HabitSlot } from '@/habits/types';
import { Sparkle } from '@/ui/art';

interface Props {
  habits: readonly Habit[];
  entries: EntryMap;
  today: string;
  /** Local hour, used to decide which slot opens first. */
  hour: number;
  onSet: (habitId: string, date: string, value: number) => void;
}

const SLOT_ORDER: readonly HabitSlot[] = [
  'morning',
  'anytime',
  'night',
  'on-study-start',
];

function formatValue(habit: Habit, value: number): string {
  const unit = habit.unit ? ` ${habit.unit}` : '';
  const shown = Number.isInteger(value) ? String(value) : value.toFixed(2);
  if (habit.target === null) return `${shown}${unit}`;
  const target = Number.isInteger(habit.target)
    ? String(habit.target)
    : habit.target.toFixed(2);
  return `${shown} / ${target}${unit}`;
}

function Ring({ fill }: { fill: number }) {
  const r = 9;
  const circumference = 2 * Math.PI * r;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r={r}
        fill="none"
        stroke="var(--line)"
        strokeWidth="3"
      />
      <circle
        cx="12"
        cy="12"
        r={r}
        fill="none"
        stroke="var(--leaf)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - fill)}
        transform="rotate(-90 12 12)"
      />
    </svg>
  );
}

function HabitRow({
  habit,
  entries,
  today,
  onSet,
}: {
  habit: Habit;
  entries: EntryMap;
  today: string;
  onSet: Props['onSet'];
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  const value = valueOf(habit, entries, today);
  const done = isComplete(habit, value);
  const streak = habitStreak(habit, entries, today);
  const week = recentDateKeys(today, 7);

  const commitNumber = () => {
    const parsed = Number(draft.replace(/,/g, ''));
    if (Number.isFinite(parsed)) onSet(habit.id, today, Math.max(0, parsed));
    setEditing(false);
    setDraft('');
  };

  return (
    <li className={`habit ${done ? 'is-done' : ''} tier-${habit.tier}`}>
      <button
        type="button"
        className="habit-main"
        onClick={() => {
          if (habit.kind === 'value') {
            setDraft(value > 0 ? String(value) : '');
            setEditing(true);
            return;
          }
          onSet(habit.id, today, nextValue(habit, value));
        }}
        aria-pressed={habit.kind === 'check' ? done : undefined}
      >
        {habit.kind === 'check' ? (
          <span className={`tick ${done ? 'on' : ''}`} aria-hidden="true" />
        ) : (
          <Ring fill={progressOf(habit, value)} />
        )}

        <span className="habit-name">
          {habit.name}
          {habit.tier === 'extra' && <span className="extra-flag">extra</span>}
        </span>

        {habit.kind !== 'check' && (
          <span className="habit-value">{formatValue(habit, value)}</span>
        )}
        {streak > 1 && (
          <span className="habit-streak" title={`${streak}-day streak`}>
            {streak}
          </span>
        )}
      </button>

      {editing && (
        <form
          className="habit-entry"
          onSubmit={(e) => {
            e.preventDefault();
            commitNumber();
          }}
        >
          <label htmlFor={`entry-${habit.id}`}>
            {habit.name}
            {habit.unit ? ` (${habit.unit})` : ''}
          </label>
          <input
            id={`entry-${habit.id}`}
            autoFocus
            inputMode="decimal"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={habit.target !== null ? String(habit.target) : ''}
          />
          <button type="submit" className="primary">
            Save
          </button>
        </form>
      )}

      <div className="habit-week" aria-hidden="true">
        {week.map((date) => {
          const scheduled = isScheduled(habit, date);
          const complete = isComplete(habit, valueOf(habit, entries, date));
          return (
            <span
              key={date}
              className={`dot ${!scheduled ? 'off' : complete ? 'hit' : 'miss'}`}
            />
          );
        })}
      </div>
    </li>
  );
}

export default function Habits({
  habits,
  entries,
  today,
  hour,
  onSet,
}: Props) {
  const openSlot = slotForHour(hour);
  const live = habits.filter((h) => !h.archived);
  const progress = coreProgress(live, entries, today);
  const perfect = perfectDayStreak(live, entries, today);
  const perfectToday = progress.total > 0 && progress.done === progress.total;

  return (
    <section className="habits">
      <header className="card habit-header">
        <h2>
          <Sparkle /> Today
        </h2>
        <p className="habit-score">
          {progress.done}
          <span className="of">/{progress.total}</span>
        </p>
        <p className="score-sub">
          {perfectToday
            ? 'Perfect day. Every core habit done.'
            : `${progress.total - progress.done} core ${
                progress.total - progress.done === 1 ? 'habit' : 'habits'
              } left`}
        </p>
        {perfect > 0 && (
          <p className="nudge">
            {perfect} perfect {perfect === 1 ? 'day' : 'days'} in a row
          </p>
        )}
      </header>

      {SLOT_ORDER.map((slot) => {
        const inSlot = live
          .filter((h) => h.slot === slot && isScheduled(h, today))
          .sort((a, b) => a.order - b.order);
        if (inSlot.length === 0) return null;

        return (
          <section
            key={slot}
            className={`card habit-slot ${slot === openSlot ? 'is-now' : ''}`}
          >
            <h3>
              {SLOT_LABEL[slot]}
              {slot === openSlot && <span className="now-flag">now</span>}
            </h3>
            <ul className="habit-list">
              {inSlot.map((habit) => (
                <HabitRow
                  key={habit.id}
                  habit={habit}
                  entries={entries}
                  today={today}
                  onSet={onSet}
                />
              ))}
            </ul>
          </section>
        );
      })}

      <p className="home-footer">
        Only the core habits count toward a perfect day. The extras are tracked
        but can&rsquo;t break your streak — one bad day shouldn&rsquo;t make the
        whole grid look like failure.
      </p>
    </section>
  );
}
