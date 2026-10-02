/**
 * Generate a record id.
 *
 * `crypto.randomUUID()` is only defined in a *secure context*. Opening the dev
 * server from a phone over plain http (http://192.168.x.x:5173) is not one, so
 * calling it directly would throw on every saved answer — exactly the scenario
 * where the app most needs to work. Falls back through `getRandomValues` to a
 * time-plus-random id.
 */
export function newId(): string {
  const c: Crypto | undefined = globalThis.crypto;

  if (typeof c?.randomUUID === 'function') return c.randomUUID();

  if (typeof c?.getRandomValues === 'function') {
    const bytes = c.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0'));
    return [
      hex.slice(0, 4).join(''),
      hex.slice(4, 6).join(''),
      hex.slice(6, 8).join(''),
      hex.slice(8, 10).join(''),
      hex.slice(10, 16).join(''),
    ].join('-');
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}
