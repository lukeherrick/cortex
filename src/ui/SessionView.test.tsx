import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { findTopic, itemsAtDepth, loadBundle } from '@/content';
import { attemptsForItem, clearAllData } from '@/data/attempts';
import { isWritten } from '@/session/machine';
import SessionView from '@/ui/SessionView';

const bundle = loadBundle();

const chem = findTopic(bundle, 'chem.stoich.mole-ratio')!;
const chemItems = itemsAtDepth(chem, 'honors');

const water = findTopic(bundle, 'bio.col.water-properties')!;
const waterItems = itemsAtDepth(water, 'ap');
const writtenItems = waterItems.filter(isWritten);

beforeEach(async () => {
  await clearAllData();
});

// Vitest runs without `globals`, so Testing Library's automatic cleanup never
// registers. Without this, each render stacks on the last one's DOM.
afterEach(cleanup);

describe('SessionView — numeric items', () => {
  const renderChem = () =>
    render(
      <SessionView
        topic={chem}
        items={chemItems}
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

    const saved = await attemptsForItem('chem.stoich.mole-ratio.i1');
    expect(saved).toHaveLength(1);
    expect(saved[0].correct).toBe(true);
  });
});

describe('SessionView — leaving a session', () => {
  it('can be exited mid-session without finishing it', async () => {
    const user = userEvent.setup();
    let exited = false;
    render(
      <SessionView
        topic={chem}
        items={chemItems}
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
      <SessionView topic={chem} items={mcq} biome="meadow" onExit={() => {}} />,
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
    expect(screen.queryByRole('button', { name: /got it/i })).toBeNull();
  });
});

describe('SessionView — written items', () => {
  const renderWritten = () =>
    render(
      <SessionView
        topic={water}
        items={writtenItems}
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
    // The finer grades stay available, just not as the main choice.
    expect(screen.getByRole('button', { name: /was a fight/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /too easy/i })).toBeDefined();
  });

  it('records "missed it" as not recalled', async () => {
    const user = userEvent.setup();
    renderWritten();

    await user.type(screen.getByLabelText(/your answer/i), 'attempt');
    await user.click(screen.getByRole('button', { name: /show model answer/i }));
    await user.click(screen.getByRole('button', { name: /^missed it$/i }));

    const saved = await attemptsForItem(writtenItems[0].id);
    expect(saved).toHaveLength(1);
    expect(saved[0].correct).toBe(false);
    expect(saved[0].response).toBe('attempt');
  });

  it('records a fought-for recall as correct', async () => {
    const user = userEvent.setup();
    renderWritten();

    await user.type(screen.getByLabelText(/your answer/i), 'attempt');
    await user.click(screen.getByRole('button', { name: /show model answer/i }));
    await user.click(screen.getByRole('button', { name: /was a fight/i }));

    const saved = await attemptsForItem(writtenItems[0].id);
    expect(saved[0].correct).toBe(true);
  });
});
