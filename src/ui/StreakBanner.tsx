import { recentDateKeys, shiftDateKey } from '@/habits/dates';
import type { DayMap } from '@/stats/streak';

interface Props {
  streak: number;
  longest: number;
  clearedToday: boolean;
  days: DayMap;
  today: string;
}

const DAY_INITIAL = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/**
 * The streak, given real estate at the top of the screen.
 *
 * Deliberately prominent. Protecting something you already have is a far
 * stronger pull than earning something you do not, so a visible streak brings
 * people back more reliably than any amount of points — and unlike points it
 * is measuring something real, because a day only counts when the due work was
 * actually cleared.
 */
export default function StreakBanner({
  streak,
  longest,
  clearedToday,
  days,
  today,
}: Props) {
  const week = recentDateKeys(today, 7);
  const atBest = streak > 0 && streak >= longest;

  return (
    <section className={`streak-banner ${clearedToday ? 'is-clear' : ''}`}>
      <div className="streak-number">
        <span className="streak-count">{streak}</span>
        <span className="streak-unit">
          day{streak === 1 ? '' : 's'}
          <br />
          in a row
        </span>
      </div>

      <div className="streak-right">
        <ol className="streak-week">
          {week.map((date) => {
            const record = days.get(date);
            const done = record !== undefined && record.answered > 0 && record.cleared;
            const isToday = date === today;
            const initial = DAY_INITIAL[new Date(date).getDay()];
            return (
              <li
                key={date}
                className={`streak-day ${done ? 'hit' : ''} ${isToday ? 'today' : ''}`}
                title={date}
              >
                <span aria-hidden="true">{initial}</span>
              </li>
            );
          })}
        </ol>

        <p className="streak-note">
          {clearedToday
            ? atBest
              ? 'Today is done — and this is your best run yet.'
              : 'Today is done. Nothing left due.'
            : streak > 0
              ? `Clear today's review to make it ${streak + 1}.`
              : 'A day counts once you clear everything due.'}
        </p>
      </div>
    </section>
  );
}

/** Yesterday's key, exported for tests of the week strip boundary. */
export const yesterdayOf = (today: string): string => shiftDateKey(today, -1);
