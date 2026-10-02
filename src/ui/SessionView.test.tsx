import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { findTopic, itemsAtDepth, loadBundle } from '@/content';
import { clearAllData } from '@/data/attempts';
import SessionView from '@/ui/SessionView';

const bundle = loadBundle();
const topic = findTopic(bundle, 'chem.stoich.mole-ratio')!;
const items = itemsAtDepth(topic, 'honors');

const water = findTopic(bundle, 'bio.col.water-properties')!;

describe('SessionView', () => {
  beforeEach(async () => {
    await clearAllData();
  });

  // Vitest runs without `globals`, so Testing Library's automatic cleanup
  // never registers. Without this, each render stacks on the last one's DOM.
  afterEach(cleanup);

  it('shows the first prompt', () => {
    render(<SessionView topic={topic} items={items} onExit={() => {}} />);
    expect(screen.getByText(/how many moles of H2/i)).toBeDefined();
  });

  it('reveals the worked solution after answering', async () => {
    const user = userEvent.setup();
    render(<SessionView topic={topic} items={items} onExit={() => {}} />);

    await user.type(screen.getByLabelText(/your answer/i), '3.00 mol');
    await user.click(screen.getByRole('button', { name: /check/i }));

    expect(screen.getByText('Correct.')).toBeDefined();
    expect(screen.getByText(/conversion factor/i)).toBeDefined();
  });

  it('names a sig-fig error specifically', async () => {
    const user = userEvent.setup();
    render(<SessionView topic={topic} items={items} onExit={() => {}} />);

    await user.type(screen.getByLabelText(/your answer/i), '3 mol');
    await user.click(screen.getByRole('button', { name: /check/i }));

    expect(screen.getByText(/significant figures wrong/i)).toBeDefined();
  });

  it('shows the worked solution even when the answer was right', async () => {
    const user = userEvent.setup();
    render(<SessionView topic={topic} items={items} onExit={() => {}} />);

    await user.type(screen.getByLabelText(/your answer/i), '3.00 mol');
    await user.click(screen.getByRole('button', { name: /check/i }));

    expect(screen.getByRole('list', { name: /worked solution/i })).toBeDefined();
  });

  it('persists the attempt', async () => {
    const user = userEvent.setup();
    const { attemptsForItem } = await import('@/data/attempts');
    render(<SessionView topic={topic} items={items} onExit={() => {}} />);

    await user.type(screen.getByLabelText(/your answer/i), '3.00 mol');
    await user.click(screen.getByRole('button', { name: /check/i }));

    const saved = await attemptsForItem('chem.stoich.mole-ratio.i1');
    expect(saved).toHaveLength(1);
    expect(saved[0].correct).toBe(true);
  });

  it('renders a recall item as a textarea', () => {
    render(
      <SessionView
        topic={water}
        items={itemsAtDepth(water, 'level1')}
        onExit={() => {}}
      />,
    );
    expect(screen.getByText(/why is a water molecule polar/i)).toBeDefined();
    expect(screen.getByLabelText(/your answer/i).tagName).toBe('TEXTAREA');
  });
});
