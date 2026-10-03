import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import {
  findTopic,
  itemsAtDepth,
  loadBundle,
  unitForTopic,
} from '@/content';
import type { Topic } from '@/content/types';
import TopicView from '@/ui/TopicView';

afterEach(cleanup);

const bundle = loadBundle();
const membrane = findTopic(bundle, 'bio.cell.membrane-structure')!;
const membraneItems = itemsAtDepth(membrane, 'ap');
const prereqs = membrane.prereqs
  .map((id) => findTopic(bundle, id))
  .filter((t): t is Topic => t !== undefined)
  .map((t) => ({ id: t.id, title: t.title }));

function renderTopic(overrides: Partial<Parameters<typeof TopicView>[0]> = {}) {
  const props = {
    topic: membrane,
    unit: unitForTopic(bundle, membrane),
    items: membraneItems,
    prereqs,
    onStart: () => {},
    onBack: () => {},
    ...overrides,
  };
  return render(<TopicView {...props} />);
}

describe('TopicView', () => {
  it('names the topic and its unit', () => {
    renderTopic();
    expect(
      screen.getByRole('heading', { name: /membrane structure/i }),
    ).toBeDefined();
    expect(screen.getByText(/cell structure and function/i)).toBeDefined();
  });

  it('shows how many questions are inside', () => {
    renderTopic();
    expect(screen.getByText('Questions')).toBeDefined();
    expect(screen.getByText(String(membraneItems.length))).toBeDefined();
  });

  it('renders the authored notes, which are the only teaching for AP Bio', () => {
    const { container } = renderTopic();
    // A distinctive phrase from this topic's concept body.
    expect(container.textContent).toMatch(/squeezes out anything it cannot grip/i);
    // And the notes should be real formatted prose, not a wall of text.
    expect(container.querySelectorAll('.prose p').length).toBeGreaterThan(2);
  });

  it('breaks the questions down by difficulty and by type', () => {
    renderTopic();
    expect(screen.getByText(/by difficulty/i)).toBeDefined();
    expect(screen.getByText(/by question type/i)).toBeDefined();
    expect(screen.getByText(/multiple choice/i)).toBeDefined();
  });

  it('lists what to do first when the topic has prerequisites', () => {
    renderTopic();
    expect(screen.getByText(/do these first/i)).toBeDefined();
    expect(screen.getByText(/properties of water/i)).toBeDefined();
  });

  it('omits the prerequisite line when there are none', () => {
    renderTopic({ prereqs: [] });
    expect(screen.queryByText(/do these first/i)).toBeNull();
  });

  it('shows the College Board topic codes', () => {
    renderTopic();
    expect(screen.getByText(/college board topic/i)).toBeDefined();
  });

  it('starts a session from either button', async () => {
    const user = userEvent.setup();
    let starts = 0;
    renderTopic({ onStart: () => { starts += 1; } });

    const buttons = screen.getAllByRole('button', { name: /start practising/i });
    expect(buttons.length).toBe(2);

    await user.click(buttons[0]);
    await user.click(buttons[1]);
    expect(starts).toBe(2);
  });

  it('goes back to the topic list', async () => {
    const user = userEvent.setup();
    let backs = 0;
    renderTopic({ onBack: () => { backs += 1; } });

    await user.click(screen.getByRole('button', { name: /all topics/i }));
    expect(backs).toBe(1);
  });

  it('survives a topic with no unit resolved', () => {
    expect(() => renderTopic({ unit: undefined })).not.toThrow();
  });
});
