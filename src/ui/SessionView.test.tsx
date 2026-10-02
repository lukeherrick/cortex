import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { findTopic, itemsAtDepth, loadBundle } from '@/content';
import { attemptsForItem, clearAllData } from '@/data/attempts';
import SessionView from '@/ui/SessionView';

const bundle = loadBundle();
const chem = findTopic(bundle, 'chem.stoich.mole-ratio')!;
const chemItems = itemsAtDepth(chem, 'honors');

const water = findTopic(bundle, 'bio.col.water-properties')!;
const waterItems = itemsAtDepth(water, 'level1');

beforeEach(async () => {
  await clearAllData();
});

// Vitest runs without `globals`, so Testing Library's automatic cleanup never
// registers. Without this, each render stacks on the last one's DOM.
afterEach(cleanup);

describe('SessionView — numeric items', () => {
  const renderChem = () =>
    render(<SessionView topic={chem} items={chemItems} onExit={() => {}} />);

  it('shows the first prompt', () => {
    renderChem();
    expect(screen.getByText(/how many moles of H2/i)).toBeDefined();
  });

  it('reveals the worked solution after answering', async () => {
    const user = userEvent.setup();
    renderChem();

    await user.type(screen.getByLabelText(/your answer/i), '3.00 mol');
    await user.click(screen.getByRole('button', { name: /check/i }));

    expect(screen.getByText('Correct.')).toBeDefined();
    expect(screen.getByText(/conversion factor/i)).toBeDefined();
    expect(screen.getByRole('list', { name: /worked solution/i })).toBeDefined();
  });

  it('names a sig-fig error specifically', async () => {
    const user = userEvent.setup();
    renderChem();

    await user.type(screen.getByLabelText(/your answer/i), '3 mol');
    await user.click(screen.getByRole('button', { name: /check/i }));

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
    await user.click(screen.getByRole('button', { name: /check/i }));

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
  it('shows every option regardless of shuffling', () => {
    const mcq = chemItems.filter((i) => i.type === 'mcq');
    render(<SessionView topic={chem} items={mcq} onExit={() => {}} />);

    expect(screen.getByRole('button', { name: /mole ratios between/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /limiting reagent/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /nothing chemically/i })).toBeDefined();
  });

  it('grades the right option however it was shuffled', async () => {
    const user = userEvent.setup();
    const mcq = chemItems.filter((i) => i.type === 'mcq');
    render(<SessionView topic={chem} items={mcq} onExit={() => {}} />);

    await user.click(screen.getByRole('button', { name: /nothing chemically/i }));
    expect(screen.getByText('Correct.')).toBeDefined();
  });
});

describe('SessionView — written items', () => {
  const renderWater = () =>
    render(<SessionView topic={water} items={waterItems} onExit={() => {}} />);

  it('renders a recall item as a textarea', () => {
    renderWater();
    expect(screen.getByText(/why is a water molecule polar/i)).toBeDefined();
    expect(screen.getByLabelText(/your answer/i).tagName).toBe('TEXTAREA');
  });

  it('shows the model answer and rubric before asking for a rating', async () => {
    const user = userEvent.setup();
    renderWater();

    await user.type(screen.getByLabelText(/your answer/i), 'oxygen pulls harder');
    await user.click(screen.getByRole('button', { name: /show model answer/i }));

    expect(screen.getByText(/more electronegative than hydrogen/i)).toBeDefined();
    expect(screen.getByRole('list', { name: /rubric/i })).toBeDefined();
    expect(screen.getByText('oxygen pulls harder')).toBeDefined();
  });

  it('does not show the worked solution until after rating', async () => {
    const user = userEvent.setup();
    renderWater();

    await user.type(screen.getByLabelText(/your answer/i), 'attempt');
    await user.click(screen.getByRole('button', { name: /show model answer/i }));

    expect(screen.queryByRole('list', { name: /worked solution/i })).toBeNull();

    await user.click(screen.getByRole('button', { name: /^Good/ }));

    expect(screen.getByRole('list', { name: /worked solution/i })).toBeDefined();
  });

  it('offers all four self-ratings', async () => {
    const user = userEvent.setup();
    renderWater();

    await user.type(screen.getByLabelText(/your answer/i), 'attempt');
    await user.click(screen.getByRole('button', { name: /show model answer/i }));

    for (const label of [/^Again/, /^Hard/, /^Good/, /^Easy/]) {
      expect(screen.getByRole('button', { name: label })).toBeDefined();
    }
  });

  it('records the chosen rating, not an assumed one', async () => {
    const user = userEvent.setup();
    renderWater();

    await user.type(screen.getByLabelText(/your answer/i), 'attempt');
    await user.click(screen.getByRole('button', { name: /show model answer/i }));
    await user.click(screen.getByRole('button', { name: /^Again/ }));

    const saved = await attemptsForItem('bio.col.water-properties.i1');
    expect(saved).toHaveLength(1);
    expect(saved[0].correct).toBe(false);
    expect(saved[0].response).toBe('attempt');
  });

  it('records a positive rating as recalled', async () => {
    const user = userEvent.setup();
    renderWater();

    await user.type(screen.getByLabelText(/your answer/i), 'attempt');
    await user.click(screen.getByRole('button', { name: /show model answer/i }));
    await user.click(screen.getByRole('button', { name: /^Hard/ }));

    const saved = await attemptsForItem('bio.col.water-properties.i1');
    expect(saved[0].correct).toBe(true);
  });
});
