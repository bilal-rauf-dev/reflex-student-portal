const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MS_PER_DAY = 86_400_000;

const parse = (value) => {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value !== 'string') return null;
  const d = new Date(`${value.slice(0, 10)}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : d;
};

/** The one date format used across the whole product: DD MMM YYYY. */
export function formatDate(value) {
  const d = parse(value);
  if (d === null) return null;
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${day} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/**
 * Whole days from `now` until `target`. Negative means the date has passed.
 *
 * `now` is a parameter and never read from the clock inside this function, so the
 * result is testable and cannot drift at a semester boundary.
 */
export function daysUntil(target, now) {
  const a = parse(target);
  const b = parse(now);
  if (a === null || b === null) return null;
  return Math.round((a.getTime() - b.getTime()) / MS_PER_DAY);
}

/** How stale a cached read is, in whole days. Used for the sync-age label. */
export function syncAgeInDays(syncedAt, now) {
  const age = daysUntil(syncedAt, now);
  if (age === null) return null;
  const value = -age;
  return value === 0 ? 0 : value; // avoid -0 leaking into the sync-age label
}
