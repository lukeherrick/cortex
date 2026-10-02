import { useMemo, useState } from 'react';
import type { Item } from '@/content/types';
import { shuffle } from '@/ui/shuffle';

interface Props {
  item: Item;
  /** Auto-graded items: commit the typed or chosen answer. */
  onSubmit: (response: string) => void;
  /** Written items: reveal the model answer so the learner can self-rate. */
  onReveal: (attempt: string) => void;
}

export default function ItemView({ item, onSubmit, onReveal }: Props) {
  const [text, setText] = useState('');

  const options = useMemo(
    () => (item.type === 'mcq' ? shuffle(item.answer.options) : []),
    [item],
  );

  if (item.type === 'mcq') {
    return (
      <fieldset>
        <legend>{item.prompt}</legend>
        <div className="choices">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSubmit(option.id)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </fieldset>
    );
  }

  if (item.type === 'frq' || item.type === 'recall') {
    return (
      <div>
        <p>{item.prompt}</p>
        <label htmlFor="attempt">Your answer</label>
        <textarea
          id="attempt"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write what you remember. Attempting it first is the point — the recall is what builds the memory, not the reading."
        />
        <button type="button" onClick={() => onReveal(text)}>
          Show model answer
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(text);
      }}
    >
      <p>{item.prompt}</p>
      <label htmlFor="attempt">Your answer</label>
      <input
        id="attempt"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. 0.450 mol"
        autoComplete="off"
      />
      <button type="submit">Check</button>
    </form>
  );
}
