/**
 * Local calendar dates as `YYYY-MM-DD`.
 *
 * Deliberately local, not UTC: a habit logged at 11pm belongs to that evening,
 * and a UTC key would quietly move it to tomorrow for anyone west of Greenwich.
 */

export function toDateKey(at: number | Date): string {
  const d = at instanceof Date ? at : new Date(at);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

export function fromDateKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** The date key `offset` days away from `key` (negative goes back). */
export function shiftDateKey(key: string, offset: number): string {
  const d = fromDateKey(key);
  d.setDate(d.getDate() + offset);
  return toDateKey(d);
}

/** 0 = Sunday, matching `Date.getDay`. */
export function weekdayOf(key: string): number {
  return fromDateKey(key).getDay();
}

/** The `count` most recent date keys ending at `key`, oldest first. */
export function recentDateKeys(key: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) =>
    shiftDateKey(key, -(count - 1 - i)),
  );
}

/** Which slot's list to surface, from the hour of day. */
export function slotForHour(hour: number): 'morning' | 'night' | 'anytime' {
  if (hour < 11) return 'morning';
  if (hour >= 19) return 'night';
  return 'anytime';
}
