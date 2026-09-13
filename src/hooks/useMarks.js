import { useMemo } from 'react';
import { useData } from './DataProvider.js';
import { buildCourseMarks, buildMarksList } from '../lib/selectors.js';

export function useMarksList() {
  const { courses, assessments, enrolments } = useData();
  return useMemo(() => buildMarksList(courses, assessments, enrolments), [courses, assessments, enrolments]);
}

/**
 * One course, optionally with a projection toward a target.
 * Pass `targetPercent` as null until the student chooses one: a projection nobody
 * asked for is pushed at them, which Section 12 identifies as an anxiety risk.
 */
export function useCourseMarks(courseCode, targetPercent = null) {
  const { courses, assessments } = useData();
  return useMemo(
    () => buildCourseMarks(courses.find((c) => c.code === courseCode), assessments, targetPercent),
    [courses, assessments, courseCode, targetPercent],
  );
}
