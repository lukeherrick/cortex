import { useState } from 'react';
import type { Biome, Item, Topic } from '@/content/types';
import { recordAttempt } from '@/data/attempts';
import type { SelfRating } from '@/grading/freeResponse';
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

interface Props {
  topic: Topic;
  items: readonly Item[];
  /** The biome of the unit this topic belongs to; themes the session. */
  biome: Biome;
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
  // Right chemistry, wrong presentation — worth distinguishing from plain wrong.
  if (/significant figures|wrong unit|no unit given/i.test(result.feedback)) {
    return 'verdict close pop';
  }
  return 'verdict wrong pop';
}

export default function SessionView({ topic, items, biome, onExit }: Props) {
  const [state, setState] = useState(() => startSession(items));

  const commit = (response: string, rating?: SelfRating) => {
    const next = submitAnswer(state, response, rating);
    if (next === state) return;
    setState(next);
    if (next.lastResult) {
      void recordAttempt({
        itemId: next.lastResult.itemId,
        topicId: topic.id,
        answeredAt: Date.now(),
        correct: next.lastResult.correct,
        response: next.lastResult.response,
      });
    }
  };

  if (state.phase === 'finished') {
    const right = state.results.filter((r) => r.correct).length;
    const total = state.results.length;
    return (
      <section className={`card done pop biome-${biome}`}>
        <BiomeMascot biome={biome} size={76} />
        <h2>Nice — that's the set</h2>
        <p className="score">
          {right}/{total}
        </p>
        <p className="score-sub">
          {right === total
            ? 'Clean sweep.'
            : 'The ones you missed are the ones worth coming back to.'}
        </p>
        <button type="button" className="primary" onClick={onExit}>
          Back to topics
        </button>
      </section>
    );
  }

  const item = state.items[state.index];

  return (
    <section className={`card biome-${biome}`}>
      <div className="session-header">
        <div className="session-title">
          <BiomeMascot biome={biome} size={38} />
          <h2>{topic.title}</h2>
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
