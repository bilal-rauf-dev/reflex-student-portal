/**
 * Values the institution fixes. Never inline these as numbers.
 */

/** Minimum attendance percentage required in a course. */
export const ATTENDANCE_THRESHOLD = 80;

/** Named attendance risk states. Never a colour, never a CSS class. */
export const RISK = {
  SAFE: 'safe',
  AT_RISK: 'at-risk',
  BELOW: 'below-threshold',
  UNKNOWN: 'unknown',
};

/** Headroom at or below this many lectures counts as at risk. */
export const AT_RISK_HEADROOM = 2;

/** Why a projection could not be produced. The UI renders a message per status. */
export const PROJECTION = {
  OK: 'ok',
  NOTHING_REMAINING: 'nothing-remaining',
  UNREACHABLE: 'unreachable',
  INSUFFICIENT_DATA: 'insufficient-data',
};

/** Grade points by letter, as used on the transcript. */
export const GRADE_POINTS = {
  'A+': 4.0, A: 4.0, 'A-': 3.67,
  'B+': 3.33, B: 3.0, 'B-': 2.67,
  'C+': 2.33, C: 2.0, 'C-': 1.67,
  'D+': 1.33, D: 1.0,
  F: 0.0,
};

/** Status codes that carry no grade points and no credit. */
export const NON_GRADE_CODES = ['I', 'W', 'N', '-'];
