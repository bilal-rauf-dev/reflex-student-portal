import { createContext, useContext, useMemo, createElement } from 'react';
import { buildSyncLabel } from '../lib/selectors.js';

const DataContext = createContext(null);

/**
 * Holds the seeded records and the fixed clock.
 *
 * `now` comes from meta.json, never from Date.now(). A prototype that reads the real
 * clock shows different state in every demo and lets a countdown go negative during a
 * usability session.
 */
export function DataProvider({ data, children }) {
  const value = useMemo(() => ({
    ...data,
    now: data.meta.seededNow,
    lastSyncedAt: data.meta.lastSyncedAt,
    syncLabel: buildSyncLabel(data.meta.lastSyncedAt, data.meta.seededNow),
  }), [data]);

  return createElement(DataContext.Provider, { value }, children);
}

export function useData() {
  const ctx = useContext(DataContext);
  if (ctx === null) throw new Error('useData must be used inside a DataProvider');
  return ctx;
}

/** The fixed clock. Pass this into anything that needs a date. */
export function useNow() {
  return useData().now;
}
