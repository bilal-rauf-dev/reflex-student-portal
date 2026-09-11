import { useCallback, useEffect, useState } from 'react';

const KEY = 'reflex.preferences';

export const DEFAULT_PREFERENCES = {
  locale: 'en',
  theme: 'system',
  textScale: 1,
  attendanceThreshold: 80,
  feeNoticeDays: 7,
  notifications: {
    'attendance-threshold': true,
    'marks-published': true,
    'fee-due': true,
    'registration-open': true,
    'request-decision': true,
  },
  delivery: 'immediate',
};

/**
 * Per-viewer settings, held in localStorage.
 *
 * Every read and write is wrapped: a private window, cleared site data or a browser
 * set to block storage all make this throw, and a settings screen that crashes the
 * app because storage is unavailable is worse than one that quietly uses defaults.
 */
function read() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

function write(value) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function usePreferences() {
  const [preferences, setPreferences] = useState(read);

  const update = useCallback((patch) => {
    setPreferences((current) => {
      const next = { ...current, ...patch };
      write(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    try { window.localStorage.removeItem(KEY); } catch { /* storage unavailable */ }
    setPreferences(DEFAULT_PREFERENCES);
  }, []);

  // Keep tabs in step when the same person changes a setting in another one.
  useEffect(() => {
    const onStorage = (e) => { if (e.key === KEY) setPreferences(read()); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return { preferences, update, reset };
}
