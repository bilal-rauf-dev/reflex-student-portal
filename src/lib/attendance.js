import { ATTENDANCE_THRESHOLD, RISK, AT_RISK_HEADROOM } from './constants.js';

const isCount = (n) => Number.isInteger(n) && n >= 0;

/**
 * How many further lectures the student may miss before falling below the threshold.
 *
 * A negative result means the threshold can no longer be reached, and by how many lectures.
 * Returns null when the inputs cannot describe a real semester.
 */
export function calculateHeadroom(attended, held, totalScheduled, threshold = ATTENDANCE_THRESHOLD) {
  if (![attended, held, totalScheduled].every(isCount)) return null;
  if (totalScheduled === 0) return null;
  if (held > totalScheduled) return null;
  if (attended > held) return null;

  const remaining = totalScheduled - held;
  const requiredPresent = Math.ceil((threshold / 100) * totalScheduled);
  return attended + remaining - requiredPresent;
}

/** Attendance percentage over the lectures held so far. Null when none have been held. */
export function attendancePercentage(attended, held) {
  if (![attended, held].every(isCount)) return null;
  if (held === 0) return null;
  if (attended > held) return null;
  return (attended / held) * 100;
}

/** Final percentage if the student attends every remaining lecture. The best case. */
export function projectIfAllRemainingAttended(attended, held, totalScheduled) {
  if (![attended, held, totalScheduled].every(isCount)) return null;
  if (totalScheduled === 0 || held > totalScheduled || attended > held) return null;
  const remaining = totalScheduled - held;
  return ((attended + remaining) / totalScheduled) * 100;
}

/** Final percentage if the current attendance rate continues to the end of the semester. */
export function projectAtCurrentRate(attended, held, totalScheduled) {
  if (![attended, held, totalScheduled].every(isCount)) return null;
  if (held === 0 || totalScheduled === 0 || held > totalScheduled || attended > held) return null;
  return (attended / held) * 100;
}

/**
 * A named risk state. Never returns a colour or a class name: the component decides
 * how to present it, which is what keeps Design Principle 3 enforceable.
 */
export function classifyRisk(headroom) {
  if (headroom === null || headroom === undefined) return RISK.UNKNOWN;
  if (headroom < 0) return RISK.BELOW;
  if (headroom <= AT_RISK_HEADROOM) return RISK.AT_RISK;
  return RISK.SAFE;
}

/** Attended and held counts from a lecture list. Present is recorded as 'P'. */
export function summariseLectures(lectures) {
  if (!Array.isArray(lectures)) return null;
  const held = lectures.length;
  const attended = lectures.filter((l) => l.present === true || l.present === 'P').length;
  return { attended, held };
}
