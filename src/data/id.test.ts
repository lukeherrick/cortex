import { afterEach, describe, expect, it, vi } from 'vitest';
import { newId } from '@/data/id';

const realCrypto = globalThis.crypto;

afterEach(() => {
  vi.stubGlobal('crypto', realCrypto);
});

describe('newId', () => {
  it('produces unique ids', () => {
    const ids = new Set(Array.from({ length: 500 }, () => newId()));
    expect(ids.size).toBe(500);
  });

  it('uses randomUUID when available', () => {
    expect(newId()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    );
  });

  it('falls back to getRandomValues outside a secure context', () => {
    vi.stubGlobal('crypto', {
      getRandomValues: realCrypto.getRandomValues.bind(realCrypto),
    });
    const id = newId();
    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
  });

  it('still produces unique ids with no crypto at all', () => {
    vi.stubGlobal('crypto', undefined);
    const ids = new Set(Array.from({ length: 200 }, () => newId()));
    expect(ids.size).toBe(200);
    expect(newId()).toMatch(/.+/);
  });
});
