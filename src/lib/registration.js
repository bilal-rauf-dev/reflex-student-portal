/** Prerequisite course codes the student has not yet passed. */
export function checkPrerequisites(course, completedCourseCodes) {
  if (!course || !Array.isArray(completedCourseCodes)) return null;
  const prereqs = course.prerequisites ?? [];
  const done = new Set(completedCourseCodes);
  return prereqs.filter((code) => !done.has(code));
}

const overlaps = (a, b) =>
  a.day === b.day && a.start < b.end && b.start < a.end;

/**
 * Pairs of courses in a draft schedule whose timetable slots overlap.
 * Slots are { day, start, end } with start and end as 'HH:MM' strings.
 */
export function detectClashes(draftSchedule) {
  if (!Array.isArray(draftSchedule)) return null;
  const clashes = [];
  for (let i = 0; i < draftSchedule.length; i += 1) {
    for (let j = i + 1; j < draftSchedule.length; j += 1) {
      const a = draftSchedule[i];
      const b = draftSchedule[j];
      const hit = (a.slots ?? []).some((sa) => (b.slots ?? []).some((sb) => overlaps(sa, sb)));
      if (hit) clashes.push({ a: a.code, b: b.code });
    }
  }
  return clashes;
}
