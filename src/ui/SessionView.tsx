import { useState } from 'react';
import type { Item, Topic } from '@/content/types';
import { recordAttempt } from '@/data/attempts';
import type { SelfRating } from '@/grading/freeResponse';
import { advance, startSession, submitAnswer } from '@/session/machine';
import ItemView from '@/ui/ItemView';
import SolutionView from '@/ui/SolutionView';

interface Props {
  topic: Topic;
  items: readonly Item[];
  onExit: () => void;
}

export default function SessionView({ topic, items, onExit }: Props) {
  const [state, setState] = useState(() => startSession(items));

  const handleSubmit = (response: string, rating?: SelfRating) => {
    const next = submitAnswer(state, response, rating);
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
      <h2>{topic.title}</h2>
      <p className="progress">
        Question {state.index + 1} of {state.items.length}
      </p>

      {state.phase === 'answering' ? (
        <ItemView key={item.id} item={item} onSubmit={handleSubmit} />
      ) : (
        <div>
          <p className="verdict">{state.lastResult?.feedback}</p>
          <SolutionView item={item} />
          <button type="button" onClick={() => setState(advance(state))}>
            Next
          </button>
        </div>
      )}
    </section>
  );
}
