import { useMemo } from 'react';
import { useData } from './DataProvider.js';
import { usePreferences } from './usePreferences.js';
import { buildDashboard } from '../lib/selectors.js';

/** Everything the Today screen shows, including the positive empty state. */
export function useDashboard() {
  const data = useData();
  const { preferences } = usePreferences();
  return useMemo(
    () => buildDashboard(data, data.now, preferences.attendanceThreshold),
    [data, preferences.attendanceThreshold],
  );
}
