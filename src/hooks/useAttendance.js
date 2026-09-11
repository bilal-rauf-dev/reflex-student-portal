import { useMemo } from 'react';
import { useData } from './DataProvider.js';
import { usePreferences } from './usePreferences.js';
import { buildAttendanceList, buildCourseAttendance } from '../lib/selectors.js';

/** Every registered course, courses needing attention first. */
export function useAttendanceList() {
  const { courses, lectures, enrolments } = useData();
  const { preferences } = usePreferences();
  return useMemo(
    () => buildAttendanceList(courses, lectures, enrolments, preferences.attendanceThreshold),
    [courses, lectures, enrolments, preferences.attendanceThreshold],
  );
}

/** One course, with the headroom sentence the screen leads with. */
export function useAttendanceHeadroom(courseCode) {
  const { courses, lectures, enrolments } = useData();
  const { preferences } = usePreferences();
  return useMemo(() => buildCourseAttendance(
    courses.find((c) => c.code === courseCode),
    lectures,
    enrolments.find((e) => e.courseId === courseCode),
    preferences.attendanceThreshold,
  ), [courses, lectures, enrolments, courseCode, preferences.attendanceThreshold]);
}
