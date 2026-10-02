import { useState } from 'react';
import type { Item } from '@/content/types';
import type { SelfRating } from '@/grading/freeResponse';

interface Props {
  item: Item;
  onSubmit: (response: string, rating?: SelfRating) => void;
}

export default function ItemView({ item, onSubmit }: Props) {
  const [text, setText] = useState('');

  if (item.type === 'mcq') {
    return (
      <fieldset>
        <legend>{item.prompt}</legend>
        <div className="choices">
          {item.answer.options.map((option) => (
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
          placeholder="Write what you remember, then check it against the model answer."
        />
        <button type="button" onClick={() => onSubmit(text, 'good')}>
          Check
        </button>
      </div>
    );
  }

  return (
    <div>
      <p>{item.prompt}</p>
      <label htmlFor="attempt">Your answer</label>
      <input
        id="attempt"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. 0.450 mol"
      />
      <button type="button" onClick={() => onSubmit(text)}>
        Check
      </button>
    </div>
  );
}
