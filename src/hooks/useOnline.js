import { useEffect, useState } from 'react';

/**
 * Whether the browser believes it is online.
 *
 * Offline is a first-class state here, not a failure mode: a cached view stays
 * readable, carries its sync age, and hides time-sensitive countdowns, because a
 * countdown computed from a stale record can be acted on and be wrong.
 */
export function useOnline() {
  const [online, setOnline] = useState(() => {
    try { return window.navigator.onLine; } catch { return true; }
  });

  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => {
      window.removeEventListener('online', up);
      window.removeEventListener('offline', down);
    };
  }, []);

  return online;
}
