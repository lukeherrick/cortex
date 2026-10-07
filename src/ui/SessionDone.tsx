import type { Biome } from '@/content/types';
import { shiftDateKey, toDateKey } from '@/habits/dates';
import type { SessionMode } from '@/ui/SessionView';
import { Sparkle } from '@/ui/art';
import { BiomeMascot } from '@/ui/biomes';

export interface DoneSummary {
  right: number;
  total: number;
  /** Items that reached "mastered" during this sitting. */
  newlyMastered: number;
  /** Earliest due time among the items just studied, or null. */
  nextDue: number | null;
  /** How many items come back on that earliest day. */
  nextDueCount: number;
  streak: number;
}

interface Props {
  summary: DoneSummary;
  mode: SessionMode;
  biome: Biome;
  onExit: () => void;
}

/**
 * Describe a return date the way a person would say it.
 *
 * "Thursday" is a date you can feel; "in 3 days" is arithmetic. Past about a
 * week, weekday names stop being useful and a count is clearer again.
 */
export function describeReturn(due: number, now: number): string {
  const today = toDateKey(now);
  const dueKey = toDateKey(due);

  if (dueKey <= today) return 'later today';
  if (dueKey === shiftDateKey(today, 1)) return 'tomorrow';

  for (let days = 2; days <= 6; days += 1) {
    if (dueKey === shiftDateKey(today, days)) {
      return new Date(due).toLocaleDateString(undefined, { weekday: 'long' });
    }
  }

  const days = Math.round((due - now) / 86_400_000);
  if (days <= 13) return 'next week';
  if (days <= 45) return `in about ${Math.round(days / 7)} weeks`;
  return `in about ${Math.round(days / 30)} months`;
}

export default function SessionDone({ summary, mode, biome, onExit }: Props) {
  const { right, total, newlyMastered, nextDue, nextDueCount, streak } = summary;
  const clean = total > 0 && right === total;

  return (
    <section className={`card done pop biome-${biome}`}>
      <div className={`done-mascot ${clean ? 'is-clean' : ''}`}>
        <BiomeMascot biome={biome} size={84} />
      </div>

      <h2>{clean ? 'Clean sweep' : "That's the set"}</h2>

      <p className="score">
        {right}<span className="of">/{total}</span>
      </p>

      {/*
        Growth first, score second. The score is about the last ten minutes;
        what was actually gained is the thing worth coming back for.
      */}
      {newlyMastered > 0 && (
        <p className="gained">
          <Sparkle />{' '}
          <strong>
            {newlyMastered} {newlyMastered === 1 ? 'question' : 'questions'}
          </strong>{' '}
          moved into long-term memory
        </p>
      )}

      {/*
        The single most important line on this screen. A reason to return that
        is concrete and dated beats any amount of congratulation.
      */}
      {mode !== 'cram' && nextDue !== null && (
        <p className="comeback">
          {nextDueCount} {nextDueCount === 1 ? 'question comes' : 'questions come'}{' '}
          back <strong>{describeReturn(nextDue, Date.now())}</strong>
        </p>
      )}

      {mode === 'cram' && total > 0 && (
        <p className="nudge">
          Cram runs don&rsquo;t change your schedule — this was for Friday, not
          for the AP exam.
        </p>
      )}

      {streak > 0 && (
        <p className="done-streak">
          {streak}-day streak{streak >= 3 ? ' — keep it' : ''}
        </p>
      )}

      <button type="button" className="primary big" onClick={onExit}>
        Done
      </button>
    </section>
  );
}
