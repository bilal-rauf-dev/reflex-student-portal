/**
 * String lookup and interpolation. Pure: the caller supplies the dictionary,
 * so this has no knowledge of how locales are loaded or which one is active.
 */

const PLACEHOLDER = /\{(\w+)\}/g;

/** Placeholder names used by a string, in order of first appearance. */
export function placeholdersIn(template) {
  if (typeof template !== 'string') return [];
  return [...new Set([...template.matchAll(PLACEHOLDER)].map((m) => m[1]))];
}

/**
 * Replace {name} placeholders with values.
 *
 * Values are interpolated, never concatenated: word order differs between English and
 * Urdu, and a sentence assembled from fragments cannot be translated correctly.
 * A missing value leaves the placeholder visible rather than printing "undefined",
 * so the gap is obvious in review instead of silent in a demo.
 */
export function interpolate(template, values = {}) {
  if (typeof template !== 'string') return null;
  return template.replace(PLACEHOLDER, (match, name) =>
    Object.prototype.hasOwnProperty.call(values, name) ? String(values[name]) : match,
  );
}

/**
 * Look a key up in a dictionary and interpolate it.
 * Returns the key itself when it is missing, which makes an absent string visible
 * on screen rather than rendering as an empty element.
 */
export function translate(dictionary, key, values) {
  if (!dictionary || typeof dictionary !== 'object') return key;
  const template = dictionary[key];
  if (typeof template !== 'string') return key;
  return interpolate(template, values);
}

/** Picks the right plural key for a count. English and Urdu both use one/other here. */
export function pluralKey(base, count) {
  if (!Number.isFinite(count)) return `${base}.many`;
  if (count === 0) return `${base}.none`;
  if (count === 1) return `${base}.one`;
  return `${base}.many`;
}
