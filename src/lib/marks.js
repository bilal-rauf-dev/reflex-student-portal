import { PROJECTION } from './constants.js';

const isPublished = (a) =>
  a && a.publishedAt !== null && a.publishedAt !== undefined && typeof a.obtainedScore === 'number';

/**
 * Weighted total across published assessments only.
 *
 * An unpublished assessment is NOT a score of zero. Conflating the two is the single
 * most likely bug in this codebase, so unpublished rows are excluded outright and the
 * weight they account for is reported separately.
 */
export function weightedTotal(assessments) {
  if (!Array.isArray(assessments)) return null;
  const published = assessments.filter(isPublished);

  let earnedWeight = 0;
  let publishedWeight = 0;
  for (const a of published) {
    if (typeof a.maxScore !== 'number' || a.maxScore <= 0) return null;
    if (typeof a.weight !== 'number' || a.weight < 0) return null;
    earnedWeight += (a.obtainedScore / a.maxScore) * a.weight;
    publishedWeight += a.weight;
  }

  const totalWeight = assessments.reduce((s, a) => s + (a.weight ?? 0), 0);

  return {
    earnedWeight,                       // points of the final grade banked so far
    publishedWeight,                    // weight that has been published
    totalWeight,                        // weight of the whole course
    percentOfPublished: publishedWeight === 0 ? null : (earnedWeight / publishedWeight) * 100,
    hasUnpublished: publishedWeight < totalWeight,
  };
}

/** Assessments not yet published, so the UI can name what is missing. */
export function unpublishedAssessments(assessments) {
  if (!Array.isArray(assessments)) return [];
  return assessments.filter((a) => !isPublished(a));
}

/**
 * The minimum average score, as a percentage, still needed across the unpublished
 * assessments to reach a target percentage for the course.
 *
 * Never returns a fallback number. The status says why a figure could not be produced,
 * so the interface can explain rather than guess.
 */
export function requiredScore(assessments, targetPercent) {
  const totals = weightedTotal(assessments);
  if (totals === null) return { status: PROJECTION.INSUFFICIENT_DATA, requiredPercent: null };
  if (typeof targetPercent !== 'number' || targetPercent < 0 || targetPercent > 100) {
    return { status: PROJECTION.INSUFFICIENT_DATA, requiredPercent: null };
  }

  const remainingWeight = totals.totalWeight - totals.publishedWeight;
  if (remainingWeight <= 0) {
    return { status: PROJECTION.NOTHING_REMAINING, requiredPercent: null };
  }

  const stillNeeded = (targetPercent / 100) * totals.totalWeight - totals.earnedWeight;
  const requiredPercent = (stillNeeded / remainingWeight) * 100;

  if (requiredPercent > 100) {
    return { status: PROJECTION.UNREACHABLE, requiredPercent: null };
  }
  return { status: PROJECTION.OK, requiredPercent: Math.max(0, requiredPercent) };
}
