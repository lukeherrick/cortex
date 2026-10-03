import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { findTopic, itemsAtDepth, loadBundle } from '@/content';
import type { Item, Topic } from '@/content/types';
import { attemptsForItem, clearAllData } from '@/data/attempts';
import { clearCards, getCard } from '@/data/cards';
import { isWritten } from '@/session/machine';
import type { QueueEntry } from '@/scheduler/queue';
import SessionView from '@/ui/SessionView';

const bundle = loadBundle();

const chem = findTopic(bundle, 'chem.stoich.mole-ratio')!;
const chemItems = itemsAtDepth(chem, 'honors');

const water = findTopic(bundle, 'bio.col.water-properties')!;
const waterItems = itemsAtDepth(water, 'ap');
const writtenItems = waterItems.filter(isWritten);

const entriesFor = (topic: Topic, items: readonly Item[]): QueueEntry[] =>
  items.map((item) => ({ topic, item }));

beforeEach(async () => {
  await clearAllData();
  await clearCards();
});

// Vitest runs without `globals`, so Testing Library's automatic cleanup never
// registers. Without this, each render stacks on the last one's DOM.
afterEach(cleanup);

describe('SessionView — numeric items', () => {
  const renderChem = (mode: 'review' | 'learn' | 'cram' = 'learn') =>
    render(
      <SessionView
        title={chem.title}
        mode={mode}
        entries={entriesFor(chem, chemItems)}
        biome="meadow"
        onExit={() => {}}
      />,
    );

  it('shows the first prompt', () => {
    renderChem();
    expect(screen.getByText(/how many moles of H2/i)).toBeDefined();
  });

  it('reveals the worked solution after answering', async () => {
    const user = userEvent.setup();
    renderChem();

    await user.type(screen.getByLabelText(/your answer/i), '3.00 mol');
    await user.click(screen.getByRole('button', { name: /^check$/i }));

    expect(screen.getByText('Correct.')).toBeDefined();
    expect(screen.getByRole('list', { name: /worked solution/i })).toBeDefined();
  });

  it('names a sig-fig error specifically', async () => {
    const user = userEvent.setup();
    renderChem();

    await user.type(screen.getByLabelText(/your answer/i), '3 mol');
    await user.click(screen.getByRole('button', { name: /^check$/i }));

    expect(screen.getByText(/significant figures wrong/i)).toBeDefined();
  });

  it('marks a sig-fig slip as a near miss rather than plain wrong', async () => {
    const user = userEvent.setup();
    const { container } = renderChem();

    await user.type(screen.getByLabelText(/your answer/i), '3 mol');
    await user.click(screen.getByRole('button', { name: /^check$/i }));

    expect(container.querySelector('.verdict.close')).not.toBeNull();
    expect(container.querySelector('.verdict.wrong')).toBeNull();
  });

  it('submits on Enter without reaching for the mouse', async () => {
    const user = userEvent.setup();
    renderChem();

    await user.type(screen.getByLabelText(/your answer/i), '3.00 mol{Enter}');

    expect(screen.getByText('Correct.')).toBeDefined();
  });

  it('persists the attempt', async () => {
    const user = userEvent.setup();
    renderChem();

    await user.type(screen.getByLabelText(/your answer/i), '3.00 mol');
    await user.click(screen.getByRole('button', { name: /^check$/i }));

    await waitFor(async () => {
      expect(await attemptsForItem('chem.stoich.mole-ratio.i1')).toHaveLength(1);
    });
  });
});

describe('SessionView — scheduling', () => {
  const itemId = 'chem.stoich.mole-ratio.i1';

  const renderChem = (mode: 'review' | 'learn' | 'cram') =>
    render(
      <SessionView
        title={chem.title}
        mode={mode}
        entries={entriesFor(chem, chemItems)}
        biome="meadow"
        onExit={() => {}}
      />,
    );

  const answer = async (text: string) => {
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/your answer/i), text);
    await user.click(screen.getByRole('button', { name: /^check$/i }));
  };

  it('schedules the item forward after a correct answer', async () => {
    renderChem('learn');
    await answer('3.00 mol');

    await waitFor(async () => {
      const card = await getCard(itemId);
      expect(card).toBeDefined();
      expect(card!.due).toBeGreaterThan(Date.now());
      expect(card!.everCorrect).toBe(true);
    });
  });

  it('brings a wrong answer back sooner than a right one', async () => {
    renderChem('learn');
    await answer('999 mol');

    await waitFor(async () => {
      const card = await getCard(itemId);
      expect(card).toBeDefined();
      expect(card!.everCorrect).toBe(false);
    });

    const wrong = (await getCard(itemId))!;
    await clearCards();
    cleanup();

    renderChem('learn');
    await answer('3.00 mol');

    await waitFor(async () => {
      expect(await getCard(itemId)).toBeDefined();
    });
    const right = (await getCard(itemId))!;

    expect(right.due).toBeGreaterThan(wrong.due);
  });

  it('records a review-mode answer in the schedule', async () => {
    renderChem('review');
    await answer('3.00 mol');

    await waitFor(async () => {
      expect(await getCard(itemId)).toBeDefined();
    });
  });

  it('does NOT touch the schedule in cram mode', async () => {
    renderChem('cram');
    await answer('3.00 mol');

    // The attempt is still logged — only scheduling is skipped.
    await waitFor(async () => {
      expect(await attemptsForItem(itemId)).toHaveLength(1);
    });
    expect(await getCard(itemId)).toBeUndefined();
  });

  it('warns that a cram run changed nothing, once finished', async () => {
    const user = userEvent.setup();
    render(
      <SessionView
        title="Cram: Stoichiometry"
        mode="cram"
        entries={entriesFor(chem, chemItems.slice(0, 1))}
        biome="meadow"
        onExit={() => {}}
      />,
    );

    await user.type(screen.getByLabelText(/your answer/i), '3.00 mol');
    await user.click(screen.getByRole('button', { name: /^check$/i }));
    await user.click(screen.getByRole('button', { name: /next question/i }));

    expect(screen.getByText(/don’t change your schedule/i)).toBeDefined();
  });
});

describe('SessionView — mixed-topic review', () => {
  it('names the topic each question came from', () => {
    const mixed: QueueEntry[] = [
      { topic: chem, item: chemItems[0] },
      { topic: water, item: waterItems[0] },
    ];
    render(
      <SessionView
        title="Today's review"
        mode="review"
        entries={mixed}
        biome="meadow"
        onExit={() => {}}
      />,
    );

    expect(screen.getByRole('heading', { name: /today's review/i })).toBeDefined();
    expect(screen.getByText(chem.title)).toBeDefined();
  });

  it('handles an empty queue without crashing', () => {
    render(
      <SessionView
        title="Today's review"
        mode="review"
        entries={[]}
        biome="meadow"
        onExit={() => {}}
      />,
    );
    expect(screen.getByText(/nothing to do here|nothing due/i)).toBeDefined();
  });
});

describe('SessionView — leaving a session', () => {
  it('can be exited mid-session without finishing it', async () => {
    const user = userEvent.setup();
    let exited = false;
    render(
      <SessionView
        title={chem.title}
        mode="learn"
        entries={entriesFor(chem, chemItems)}
        biome="meadow"
        onExit={() => {
          exited = true;
        }}
      />,
    );

    await user.click(screen.getByRole('button', { name: /end session/i }));
    expect(exited).toBe(true);
  });
});

describe('SessionView — multiple choice', () => {
  const mcq = chemItems.filter((i) => i.type === 'mcq');

  const renderMcq = () =>
    render(
      <SessionView
        title={chem.title}
        mode="learn"
        entries={entriesFor(chem, mcq)}
        biome="meadow"
        onExit={() => {}}
      />,
    );

  it('has a multiple-choice item to test', () => {
    expect(mcq.length).toBeGreaterThan(0);
  });

  it('shows every option regardless of shuffling', () => {
    renderMcq();
    expect(
      screen.getByRole('button', { name: /mole ratios between/i }),
    ).toBeDefined();
    expect(
      screen.getByRole('button', { name: /limiting reagent/i }),
    ).toBeDefined();
    expect(
      screen.getByRole('button', { name: /nothing chemically/i }),
    ).toBeDefined();
  });

  it('grades itself the moment you choose, with no self-rating', async () => {
    const user = userEvent.setup();
    renderMcq();

    await user.click(
      screen.getByRole('button', { name: /nothing chemically/i }),
    );

    expect(screen.getByText('Correct.')).toBeDefined();
    expect(screen.queryByRole('button', { name: /^got it$/i })).toBeNull();
  });
});

describe('SessionView — written items', () => {
  const renderWritten = () =>
    render(
      <SessionView
        title={water.title}
        mode="learn"
        entries={entriesFor(water, writtenItems)}
        biome="reef"
        onExit={() => {}}
      />,
    );

  it('has written items to test', () => {
    expect(writtenItems.length).toBeGreaterThan(0);
  });

  it('renders a written item as a textarea', () => {
    renderWritten();
    expect(screen.getByLabelText(/your answer/i).tagName).toBe('TEXTAREA');
  });

  it('shows the model answer and rubric before asking for a rating', async () => {
    const user = userEvent.setup();
    renderWritten();

    await user.type(screen.getByLabelText(/your answer/i), 'oxygen pulls harder');
    await user.click(screen.getByRole('button', { name: /show model answer/i }));

    expect(screen.getByRole('list', { name: /rubric/i })).toBeDefined();
    expect(screen.getByText('oxygen pulls harder')).toBeDefined();
  });

  it('does not show the worked solution until after rating', async () => {
    const user = userEvent.setup();
    renderWritten();

    await user.type(screen.getByLabelText(/your answer/i), 'attempt');
    await user.click(screen.getByRole('button', { name: /show model answer/i }));

    expect(screen.queryByRole('list', { name: /worked solution/i })).toBeNull();

    await user.click(screen.getByRole('button', { name: /^got it$/i }));

    expect(screen.getByRole('list', { name: /worked solution/i })).toBeDefined();
  });

  it('leads with two choices, not four', async () => {
    const user = userEvent.setup();
    renderWritten();

    await user.type(screen.getByLabelText(/your answer/i), 'attempt');
    await user.click(screen.getByRole('button', { name: /show model answer/i }));

    expect(screen.getByRole('button', { name: /^got it$/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /^missed it$/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /was a fight/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /too easy/i })).toBeDefined();
  });

  it('passes a self-rating through to the schedule', async () => {
    const user = userEvent.setup();
    renderWritten();

    await user.type(screen.getByLabelText(/your answer/i), 'attempt');
    await user.click(screen.getByRole('button', { name: /show model answer/i }));
    await user.click(screen.getByRole('button', { name: /too easy/i }));

    await waitFor(async () => {
      const card = await getCard(writtenItems[0].id);
      expect(card).toBeDefined();
      expect(card!.everCorrect).toBe(true);
    });
  });

  it('records "missed it" as not recalled', async () => {
    const user = userEvent.setup();
    renderWritten();

    await user.type(screen.getByLabelText(/your answer/i), 'attempt');
    await user.click(screen.getByRole('button', { name: /show model answer/i }));
    await user.click(screen.getByRole('button', { name: /^missed it$/i }));

    await waitFor(async () => {
      const saved = await attemptsForItem(writtenItems[0].id);
      expect(saved).toHaveLength(1);
      expect(saved[0].correct).toBe(false);
    });
  });
});
