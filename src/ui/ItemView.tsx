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
        <legend className="prompt">{item.prompt}</legend>
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
        <p className="prompt">{item.prompt}</p>
        <label htmlFor="attempt">Your answer</label>
        <textarea
          id="attempt"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Have a go from memory first. The digging is what builds the memory - reading the answer does almost nothing."
        />
        <button type="button" className="primary" onClick={() => onReveal(text)}>
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
      <p className="prompt">{item.prompt}</p>
      <label htmlFor="attempt">Your answer</label>
      <input
        id="attempt"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. 0.450 mol"
        autoComplete="off"
        inputMode="text"
      />
      <button type="submit" className="primary">
        Check
      </button>
    </form>
  );
}
