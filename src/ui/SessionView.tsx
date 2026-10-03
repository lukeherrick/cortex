import { useMemo, useState } from 'react';
import type { Biome, Item } from '@/content/types';
import { recordAttempt } from '@/data/attempts';
import { getCard, saveCard } from '@/data/cards';
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
import { FlaskProgress } from '@/ui/art';
import { BiomeMascot } from '@/ui/biomes';
import ItemView from '@/ui/ItemView';
import ModelAnswer from '@/ui/ModelAnswer';
import SolutionView from '@/ui/SolutionView';

export type SessionMode = 'review' | 'learn' | 'cram';

interface Props {
  /** What this sitting is: a topic name, "Today's review", a unit for cram. */
  title: string;
  mode: SessionMode;
  /** Items paired with the topic they came from — review mixes topics. */
  entries: readonly QueueEntry[];
  biome: Biome;
  /**
   * Called after an answer has been written to the schedule. Cram does not
   * fire it: a cram run must not advance the study streak any more than it
   * advances the schedule.
   */
  onAnswered?: () => Promise<void>;
  onExit: () => void;
}

/**
 * Two big choices, two small ones.
 *
 * FSRS wants four grades, but four equal-weight buttons turn every written
 * question into a decision, which reads as extra work and is the fastest way
 * to make someone stop using a study app. So: the two answers you actually
 * have are prominent, and the shades are optional.
 */
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

function verdictClass(result: ItemResult): string {
  if (result.correct) return 'verdict right pop';
  // Right chemistry, wrong presentation — should not look like failure.
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
  onAnswered,
  onExit,
}: Props) {
  const items = useMemo(() => entries.map((e) => e.item), [entries]);
  const [state, setState] = useState(() => startSession(items));

  const current = entries[state.index];

  const commit = (response: string, rating?: SelfRating) => {
    const next = submitAnswer(state, response, rating);
    if (next === state) return;
    setState(next);

    const result = next.lastResult;
    if (!result || !current) return;

    void recordAttempt({
      itemId: result.itemId,
      topicId: current.topic.id,
      answeredAt: Date.now(),
      correct: result.correct,
      response: result.response,
    });

    // Cram deliberately does not touch scheduling state. A panicked run
    // through a unit the night before a test must not convince the scheduler
    // that the material has been learned.
    if (mode === 'cram') return;

    void (async () => {
      const meta = {
        itemId: result.itemId,
        topicId: current.topic.id,
        subject: current.topic.subject,
      };
      const existing = await getCard(result.itemId);
      await saveCard(reviewCard(existing, meta, toOutcome(result), Date.now()));
      // Only after the card is saved, so the day log sees the real due count.
      await onAnswered?.();
    })();
  };

  if (state.phase === 'finished') {
    const right = state.results.filter((r) => r.correct).length;
    const total = state.results.length;
    return (
      <section className={`card done pop biome-${biome}`}>
        <BiomeMascot biome={biome} size={76} />
        <h2>Nice — that&rsquo;s the set</h2>
        <p className="score">
          {right}/{total}
        </p>
        <p className="score-sub">
          {total === 0
            ? 'Nothing to do here.'
            : right === total
              ? 'Clean sweep.'
              : 'The ones you missed will come back sooner.'}
        </p>
        {mode === 'cram' && total > 0 && (
          <p className="nudge">
            Cram runs don&rsquo;t change your schedule — this was for Friday,
            not for the AP exam.
          </p>
        )}
        <button type="button" className="primary" onClick={onExit}>
          Done
        </button>
      </section>
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

  return (
    <section className={`card biome-${biome}`}>
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
  );
}
