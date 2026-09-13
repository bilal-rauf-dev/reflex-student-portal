import { GRADE_POINTS, NON_GRADE_CODES } from './constants.js';

const countsTowardGpa = (r) =>
  r && typeof r.creditHours === 'number' && r.creditHours > 0 &&
  r.grade && !NON_GRADE_CODES.includes(r.grade) && GRADE_POINTS[r.grade] !== undefined;

/** CGPA across every graded record. Null when nothing has been graded yet. */
export function calculateCGPA(records) {
  if (!Array.isArray(records)) return null;
  const graded = records.filter(countsTowardGpa);
  if (graded.length === 0) return null;

  let points = 0;
  let credits = 0;
  for (const r of graded) {
    points += GRADE_POINTS[r.grade] * r.creditHours;
    credits += r.creditHours;
  }
  return credits === 0 ? null : points / credits;
}

/** CGPA after each semester, for the trend chart. */
export function cgpaTrend(records) {
  if (!Array.isArray(records)) return [];
  const bySemester = new Map();
  for (const r of records) {
    if (!bySemester.has(r.semesterId)) bySemester.set(r.semesterId, []);
    bySemester.get(r.semesterId).push(r);
  }
  const semesters = [...bySemester.keys()].sort();
  const running = [];
  const points = [];
  for (const id of semesters) {
    running.push(...bySemester.get(id));
    points.push({
      semesterId: id,
      sgpa: calculateCGPA(bySemester.get(id)),
      cgpa: calculateCGPA(running),
    });
  }
  return points;
}

/** Credits earned against credits required. */
export function creditsRemaining(records, creditsRequired) {
  if (!Array.isArray(records)) return null;
  if (typeof creditsRequired !== 'number' || creditsRequired <= 0) return null;
  const earned = records
    .filter((r) => countsTowardGpa(r) && r.grade !== 'F')
    .reduce((s, r) => s + r.creditHours, 0);
  return {
    earned,
    required: creditsRequired,
    remaining: Math.max(0, creditsRequired - earned),
    percentComplete: (earned / creditsRequired) * 100,
  };
}
