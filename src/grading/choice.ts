export interface ChoiceOption {
  id: string;
  text: string;
  why?: string;
}

export interface ChoiceAnswerSpec {
  correctId: string;
  options: readonly ChoiceOption[];
}

export interface ChoiceVerdict {
  correct: boolean;
  chosen: ChoiceOption | null;
  explanation: string | null;
}

/** Grade a multiple-choice selection, surfacing the distractor's explanation. */
export function gradeChoice(
  chosenId: string,
  spec: ChoiceAnswerSpec,
): ChoiceVerdict {
  const chosen = spec.options.find((o) => o.id === chosenId) ?? null;
  const correct = chosen !== null && chosen.id === spec.correctId;
  return {
    correct,
    chosen,
    explanation: correct ? null : (chosen?.why ?? null),
  };
}
