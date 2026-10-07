import { useEffect, useMemo, useState } from 'react';
import type { Biome, Item } from '@/content/types';
import { recordAttempt } from '@/data/attempts';
import { getCard, saveCard, type CardRecord } from '@/data/cards';
import type { SelfRating } from '@/grading/freeResponse';
import type { Outcome } from '@/scheduler/rating';
import { reviewCard } from '@/scheduler/schedule';
import type { QueueEntry } from '@/scheduler/queue';
import {
  advance,
  isWritten,
  revealModelAnswer,
  startSession,
  submitAnswer,
  type ItemResult,
} from '@/session/machine';
import { strengthOf } from '@/stats/mastery';
import { FlaskProgress } from '@/ui/art';
import { BiomeMascot } from '@/ui/biomes';
import ItemView from '@/ui/ItemView';
import LabScene from '@/ui/LabScene';
import ModelAnswer from '@/ui/ModelAnswer';
import SessionDone, { type DoneSummary } from '@/ui/SessionDone';
import SolutionView from '@/ui/SolutionView';

export type SessionMode = 'review' | 'learn' | 'cram';

interface Props {
  title: string;
  mode: SessionMode;
  entries: readonly QueueEntry[];
  biome: Biome;
  /** Scheduling state as it was before this sitting, for the "gained" figure. */
  cardsAtStart?: ReadonlyMap<string, CardRecord>;
  streak?: number;
  onAnswered?: () => Promise<void>;
  onExit: () => void;
}

const PRIMARY: readonly { rating: SelfRating; label: string; cls: string }[] = [
  { rating: 'again', label: 'Missed it', cls: 'missed' },
  { rating: 'good', label: 'Got it', cls: 'got' },
];

const SECONDARY: readonly { rating: SelfRating; label: string }[] = [
  { rating: 'hard', label: 'Got it, but it was a fight' },
  { rating: 'easy', label: 'Too easy' },
];

const TIER_LABEL: Record<Item['tier'], string> = {
  warmup: 'Warm-up',
  standard: 'Standard',
  challenge: 'Challenge',
  ap: 'AP level',
};

/** Stable identity, so the summary effect does not re-run every render. */
const EMPTY_CARDS: ReadonlyMap<string, CardRecord> = new Map();

function verdictClass(result: ItemResult): string {
  if (result.correct) return 'verdict right pop';
  if (result.nearMiss) return 'verdict close pop';
  return 'verdict wrong pop';
}

function toOutcome(result: ItemResult): Outcome {
  return result.rating === null
    ? { kind: 'auto', correct: result.correct, nearMiss: result.nearMiss }
    : { kind: 'self', rating: result.rating };
}

export default function SessionView({
  title,
  mode,
  entries,
  biome,
  cardsAtStart = EMPTY_CARDS,
  streak = 0,
  onAnswered,
  onExit,
}: Props) {
  const items = useMemo(() => entries.map((e) => e.item), [entries]);
  const [state, setState] = useState(() => startSession(items));
  const [reacting, setReacting] = useState(false);
  const [summary, setSummary] = useState<DoneSummary | null>(null);

  const current = entries[state.index];
  const finished = state.phase === 'finished';

  // Built once the session ends: what was gained, and when it returns.
  useEffect(() => {
    if (!finished) return;
    let live = true;

    void (async () => {
      const ids = entries.map((e) => e.item.id);
      const after = await Promise.all(ids.map((id) => getCard(id)));

      let newlyMastered = 0;
      let nextDue: number | null = null;
      let nextDueCount = 0;

      for (const [i, card] of after.entries()) {
        if (!card) continue;
        const before = cardsAtStart.get(ids[i]);
        if (strengthOf(card) === 'mastered' && strengthOf(before) !== 'mastered') {
          newlyMastered += 1;
        }
        if (nextDue === null || card.due < nextDue) nextDue = card.due;
      }

      if (nextDue !== null) {
        // Count everything landing on the same calendar day as the earliest.
        const day = 86_400_000;
        const bucket = Math.floor(nextDue / day);
        nextDueCount = after.filter(
          (c) => c && Math.floor(c.due / day) === bucket,
        ).length;
      }

      const right = state.results.filter((r) => r.correct).length;
      if (live) {
        setSummary({
          right,
          total: state.results.length,
          newlyMastered,
          nextDue,
          nextDueCount,
          streak,
        });
      }
    })();

    return () => {
      live = false;
    };
  }, [finished, entries, cardsAtStart, state.results, streak]);

  const commit = (response: string, rating?: SelfRating) => {
    const next = submitAnswer(state, response, rating);
    if (next === state) return;
    setState(next);

    const result = next.lastResult;
    if (!result || !current) return;

    if (result.correct) {
      setReacting(true);
      window.setTimeout(() => setReacting(false), 900);
    }

    void recordAttempt({
      itemId: result.itemId,
      topicId: current.topic.id,
      answeredAt: Date.now(),
      correct: result.correct,
      response: result.response,
    });

    // Cram deliberately does not touch scheduling state.
    if (mode === 'cram') return;

    void (async () => {
      const meta = {
        itemId: result.itemId,
        topicId: current.topic.id,
        subject: current.topic.subject,
      };
      const existing = await getCard(result.itemId);
      await saveCard(reviewCard(existing, meta, toOutcome(result), Date.now()));
      await onAnswered?.();
    })();
  };

  // Checked before the finished branch: a session that never had anything in
  // it must not congratulate you for completing it.
  if (entries.length === 0) {
    return (
      <section className="card done">
        <BiomeMascot biome={biome} size={76} />
        <h2>Nothing due</h2>
        <p className="score-sub">
          You are completely caught up. Come back tomorrow.
        </p>
        <button type="button" className="primary" onClick={onExit}>
          Done
        </button>
      </section>
    );
  }

  if (finished) {
    return (
      <SessionDone
        summary={
          summary ?? {
            right: state.results.filter((r) => r.correct).length,
            total: state.results.length,
            newlyMastered: 0,
            nextDue: null,
            nextDueCount: 0,
            streak,
          }
        }
        mode={mode}
        biome={biome}
        onExit={onExit}
      />
    );
  }

  if (!current) {
    return (
      <section className="card done">
        <h2>Nothing due</h2>
        <p className="score-sub">Come back tomorrow.</p>
        <button type="button" className="primary" onClick={onExit}>
          Done
        </button>
      </section>
    );
  }

  const item = current.item;
  const showTopicName = current.topic.title !== title;
  const progress =
    state.items.length === 0 ? 0 : state.results.length / state.items.length;

  return (
    <>
      <LabScene progress={progress} reacting={reacting} biome={biome} />

      <section className={`card session biome-${biome}`}>
        <div className="session-header">
          <div className="session-title">
            <BiomeMascot biome={biome} size={38} />
            <div>
              <h2>{title}</h2>
              {showTopicName && <p className="eyebrow">{current.topic.title}</p>}
            </div>
          </div>
          <button type="button" className="quiet" onClick={onExit}>
            End session
          </button>
        </div>

        <div className="session-meta">
          <FlaskProgress done={state.results.length} total={state.items.length} />
          <p className="progress">
            Question {state.index + 1} of {state.items.length}
            {state.results.length > 0 && (
              <>
                {' · '}
                {state.results.filter((r) => r.correct).length} right so far
              </>
            )}
          </p>
          <span className={`chip tier-chip tier-${item.tier}`}>
            {TIER_LABEL[item.tier]}
          </span>
        </div>

        {!item.verified && (
          <p className="unverified" role="status">
            Unverified item — generated, not yet checked. Treat the worked
            solution with suspicion.
          </p>
        )}

        {state.phase === 'answering' && (
          <ItemView
            key={item.id}
            item={item}
            onSubmit={(response) => commit(response)}
            onReveal={(attempt) => setState(revealModelAnswer(state, attempt))}
          />
        )}

        {state.phase === 'selfGrading' && (
          <div className="pop">
            {state.draft.trim() !== '' && (
              <section className="your-attempt">
                <h3>What you wrote</h3>
                <p>{state.draft}</p>
              </section>
            )}
            <ModelAnswer item={item} />
            <fieldset className="ratings">
              <legend>Did you get it?</legend>
              <div className="rating-primary">
                {PRIMARY.map(({ rating, label, cls }) => (
                  <button
                    key={rating}
                    type="button"
                    className={cls}
                    onClick={() => commit(state.draft, rating)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="rating-secondary">
                {SECONDARY.map(({ rating, label }) => (
                  <button
                    key={rating}
                    type="button"
                    className="quiet"
                    onClick={() => commit(state.draft, rating)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="rating-hint">
                Two taps is the normal path. The small ones just fine-tune how
                soon this comes back.
              </p>
            </fieldset>
          </div>
        )}

        {state.phase === 'reviewing' && state.lastResult && (
          <div>
            <p className={verdictClass(state.lastResult)}>
              {state.lastResult.feedback}
            </p>
            {isWritten(item) && <ModelAnswer item={item} />}
            <SolutionView item={item} />
            <button
              type="button"
              className="primary"
              onClick={() => setState(advance(state))}
            >
              Next question
            </button>
          </div>
        )}
      </section>
    </>
  );
}
