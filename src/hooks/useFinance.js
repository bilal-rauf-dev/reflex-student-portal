import { useMemo } from 'react';
import { useData } from './DataProvider.js';
import { buildFinanceTimeline } from '../lib/selectors.js';

export function useFinance() {
  const { challans, now } = useData();
  return useMemo(() => buildFinanceTimeline(challans, now), [challans, now]);
}
