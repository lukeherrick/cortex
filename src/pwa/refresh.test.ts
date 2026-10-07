import { describe, expect, it, vi } from 'vitest';
import { installRefreshOnUpdate } from '@/pwa/refresh';

function fakeContainer(controller: unknown) {
  const listeners: Record<string, (() => void)[]> = {};
  return {
    controller,
    addEventListener: (type: string, fn: () => void) => {
      (listeners[type] ??= []).push(fn);
    },
    fire: (type: string) => listeners[type]?.forEach((fn) => fn()),
  };
}

describe('installRefreshOnUpdate', () => {
  it('reloads when a new worker takes over a page that already had one', () => {
    const reload = vi.fn();
    const c = fakeContainer({});
    installRefreshOnUpdate({ container: c as never, reload });

    c.fire('controllerchange');

    expect(reload).toHaveBeenCalledTimes(1);
  });

  it('does not reload on a first install, when nothing is stale', () => {
    const reload = vi.fn();
    const c = fakeContainer(null);
    installRefreshOnUpdate({ container: c as never, reload });

    c.fire('controllerchange');

    expect(reload).not.toHaveBeenCalled();
  });

  it('reloads only once however many times control changes', () => {
    const reload = vi.fn();
    const c = fakeContainer({});
    installRefreshOnUpdate({ container: c as never, reload });

    c.fire('controllerchange');
    c.fire('controllerchange');
    c.fire('controllerchange');

    expect(reload).toHaveBeenCalledTimes(1);
  });

  it('does nothing where service workers are unsupported', () => {
    const reload = vi.fn();
    expect(() =>
      installRefreshOnUpdate({ container: null, reload }),
    ).not.toThrow();
    expect(reload).not.toHaveBeenCalled();
  });
});
