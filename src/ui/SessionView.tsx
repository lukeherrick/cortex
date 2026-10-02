import { useState } from 'react';
import type { Item, Topic } from '@/content/types';
import { recordAttempt } from '@/data/attempts';
import type { SelfRating } from '@/grading/freeResponse';
import {
  advance,
  isWritten,
  revealModelAnswer,
  startSession,
  submitAnswer,
} from '@/session/machine';
import ItemView from '@/ui/ItemView';
import ModelAnswer from '@/ui/ModelAnswer';
import SolutionView from '@/ui/SolutionView';

interface Props {
  topic: Topic;
  items: readonly Item[];
  onExit: () => void;
}

const RATINGS: readonly { rating: SelfRating; label: string; hint: string }[] = [
  { rating: 'again', label: 'Again', hint: "Didn't recall it" },
  { rating: 'hard', label: 'Hard', hint: 'Recalled with effort' },
  { rating: 'good', label: 'Good', hint: 'Recalled it' },
  { rating: 'easy', label: 'Easy', hint: 'Instant' },
];

export default function SessionView({ topic, items, onExit }: Props) {
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
    return (
      <section>
        <h2>Session complete</h2>
        <p>
          {right} of {state.results.length} correct.
        </p>
        <button type="button" onClick={onExit}>
          Back to topics
        </button>
      </section>
    );
  }

  const item = state.items[state.index];

  return (
    <section>
      <header className="session-header">
        <h2>{topic.title}</h2>
        <button type="button" className="quiet" onClick={onExit}>
          End session
        </button>
      </header>
      <p className="progress">
        Question {state.index + 1} of {state.items.length}
        {item.tier === 'ap' ? ' · AP level' : ''}
      </p>

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
        <div>
          {state.draft.trim() !== '' && (
            <section className="your-attempt">
              <h3>What you wrote</h3>
              <p>{state.draft}</p>
            </section>
          )}
          <ModelAnswer item={item} />
          <fieldset className="ratings">
            <legend>How well did you recall it?</legend>
            <div className="choices">
              {RATINGS.map(({ rating, label, hint }) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => commit(state.draft, rating)}
                >
                  {label} — {hint}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {state.phase === 'reviewing' && (
        <div>
          <p className="verdict">{state.lastResult?.feedback}</p>
          {isWritten(item) && <ModelAnswer item={item} />}
          <SolutionView item={item} />
          <button type="button" onClick={() => setState(advance(state))}>
            Next
          </button>
        </div>
      )}
    </section>
  );
}
