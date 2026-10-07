import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { techniqueById } from '@/focus/techniques';
import FocusTimer from '@/ui/FocusTimer';

afterEach(cleanup);

function renderTimer(id: string, onOpenBuddy = () => {}) {
  return render(
    <FocusTimer technique={techniqueById(id)} onOpenBuddy={onOpenBuddy} />,
  );
}

describe('FocusTimer — the chosen buddy drives the clock', () => {
  it('starts a classic Pomodoro at 25 minutes', () => {
    renderTimer('pomodoro');
    expect(screen.getByText('25:00')).toBeDefined();
  });

  it('starts the long-haul buddy at 50 minutes instead', () => {
    renderTimer('deepwork');
    expect(screen.getByText('50:00')).toBeDefined();
  });

  it('starts the just-start buddy at 10 minutes', () => {
    renderTimer('kickstart');
    expect(screen.getByText('10:00')).toBeDefined();
  });

  it('names the chosen buddy on screen', () => {
    renderTimer('interleaving');
    expect(screen.getByText('Mixing topics up')).toBeDefined();
  });

  it('offers a way back to swap buddy', async () => {
    const user = userEvent.setup();
    let opened = false;
    renderTimer('pomodoro', () => {
      opened = true;
    });

    await user.click(screen.getByRole('button', { name: /change/i }));
    expect(opened).toBe(true);
  });
});

describe('FocusTimer — reminders come from the buddy', () => {
  it('shows the Pomodoro focus reminders', () => {
    renderTimer('pomodoro');
    expect(screen.getByText(/one thing only/i)).toBeDefined();
  });

  it('shows different reminders for a different buddy', () => {
    renderTimer('retrieval');
    expect(screen.getByText(/book shut/i)).toBeDefined();
    expect(screen.queryByText(/one thing only/i)).toBeNull();
  });

  it('shows at most two reminders, so the screen stays calm', () => {
    const { container } = renderTimer('pomodoro');
    expect(
      container.querySelectorAll('.focus-reminders li').length,
    ).toBeLessThanOrEqual(2);
  });

  it('swaps to break reminders once the phase changes', async () => {
    const user = userEvent.setup();
    renderTimer('pomodoro');

    // Skip moves straight to the break without waiting 25 minutes.
    await user.click(screen.getByRole('button', { name: /^skip$/i }));

    expect(screen.getByText(/NO PHONE/i)).toBeDefined();
    expect(screen.getByText('5:00')).toBeDefined();
  });
});

describe('FocusTimer — controls', () => {
  it('starts and pauses', async () => {
    const user = userEvent.setup();
    renderTimer('pomodoro');

    await user.click(screen.getByRole('button', { name: /^start$/i }));
    expect(screen.getByRole('button', { name: /^pause$/i })).toBeDefined();

    await user.click(screen.getByRole('button', { name: /^pause$/i }));
    expect(screen.getByRole('button', { name: /^resume$/i })).toBeDefined();
  });

  it('resets back to a full block', async () => {
    const user = userEvent.setup();
    renderTimer('pomodoro');

    await user.click(screen.getByRole('button', { name: /^skip$/i }));
    expect(screen.getByText('5:00')).toBeDefined();

    await user.click(screen.getByRole('button', { name: /^skip$/i }));
    expect(screen.getByText('25:00')).toBeDefined();
  });

  it('counts completed focus blocks', async () => {
    const user = userEvent.setup();
    renderTimer('pomodoro');

    expect(screen.getByText(/0 focus blocks today/i)).toBeDefined();
    await user.click(screen.getByRole('button', { name: /^skip$/i }));
    expect(screen.getByText(/1 focus block today/i)).toBeDefined();
  });

  it('says what it will do about the screen', () => {
    renderTimer('pomodoro');
    expect(screen.getByText(/screen stays on once you start/i)).toBeDefined();
  });
});
