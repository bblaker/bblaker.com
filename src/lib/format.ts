/** ISO dates everywhere. Unambiguous, sortable, and it suits the instrument look. */
export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function longDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function monthYear(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', timeZone: 'UTC' });
}

/** 220 wpm. Rounded up, floored at 1 — "0 min read" reads like a bug. */
export function readingTime(body: string | undefined): number {
  if (!body) return 1;
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
