import type { Accuracy, CoverageStat, TopicStat } from '@/stats/accuracy';
import type { StudyTotals } from '@/stats/streak';
import { Sparkle } from '@/ui/art';

interface Props {
  streak: number;
  longest: number;
  clearedToday: boolean;
  totals: StudyTotals;
  accuracy: Accuracy;
  recent: Accuracy;
  coverage: CoverageStat;
  weakest: readonly (TopicStat & { title: string })[];
}

const pct = (rate: number | null): string =>
  rate === null ? '—' : `${Math.round(rate * 100)}%`;

export default function StatsPanel({
  streak,
  longest,
  clearedToday,
  totals,
  accuracy,
  recent,
  coverage,
  weakest,
}: Props) {
  if (totals.itemsAnswered === 0) {
    return (
      <section className="card stats is-empty">
        <h2>
          <Sparkle /> Your progress
        </h2>
        <p className="score-sub">
          Nothing here yet. Answer some questions and this fills in — streak,
          accuracy, and which topics are giving you trouble.
        </p>
      </section>
    );
  }

  return (
    <section className="card stats">
      <h2>
        <Sparkle /> Your progress
      </h2>

      <dl className="facts stat-facts">
        <div>
          <dt>Streak</dt>
          <dd>{streak}</dd>
        </div>
        <div>
          <dt>Best</dt>
          <dd>{longest}</dd>
        </div>
        <div>
          <dt>Answered</dt>
          <dd>{totals.itemsAnswered}</dd>
        </div>
        <div>
          <dt>Accuracy</dt>
          <dd>{pct(accuracy.rate)}</dd>
        </div>
      </dl>

      <p className="streak-note">
        {clearedToday
          ? 'Today is in the bag — you cleared everything due.'
          : 'A day counts only once you clear everything due. Opening the app doesn’t count.'}
      </p>

      <div className="coverage">
        <div className="coverage-bar" aria-hidden="true">
          <span
            className="coverage-learned"
            style={{ width: `${(coverage.learned / coverage.total) * 100}%` }}
          />
          <span
            className="coverage-started"
            style={{
              width: `${((coverage.started - coverage.learned) / coverage.total) * 100}%`,
            }}
          />
        </div>
        <p className="score-sub">
          <strong>{coverage.learned}</strong> of {coverage.total} questions
          answered right at least once
          {coverage.started > coverage.learned && (
            <> · {coverage.started - coverage.learned} seen but not yet nailed</>
          )}
        </p>
      </div>

      {recent.attempted > 0 && recent.rate !== null && (
        <p className="score-sub">
          Last 7 days: <strong>{pct(recent.rate)}</strong> over{' '}
          {recent.attempted} {recent.attempted === 1 ? 'answer' : 'answers'}
        </p>
      )}

      {weakest.length > 0 && (
        <div className="weakest">
          <h3>Giving you the most trouble</h3>
          <ul className="tag-list">
            {weakest.slice(0, 3).map((row) => (
              <li key={row.topicId} className="tag">
                {row.title}
                <span className="tag-n">{pct(row.rate)}</span>
              </li>
            ))}
          </ul>
          <p className="score-sub">
            Based on at least 4 answers each — fewer than that is noise, not a
            pattern.
          </p>
        </div>
      )}
    </section>
  );
}
