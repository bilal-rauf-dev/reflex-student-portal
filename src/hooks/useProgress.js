import { useMemo } from 'react';
import { useData } from './DataProvider.js';
import { buildProgress } from '../lib/selectors.js';

export function useProgress() {
  const { gradeRecords, student } = useData();
  return useMemo(() => buildProgress(gradeRecords, student.creditsRequired), [gradeRecords, student]);
}
