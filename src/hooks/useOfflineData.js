import { useMemo } from 'react';
import { useData } from './DataProvider.js';
import { useOnline } from './useOnline.js';

/**
 * What every screen needs to know about the freshness of what it is showing.
 *
 * `suppressCountdowns` is the important one. Offline, "due in 4 days" may have been
 * true yesterday and wrong today, and the student can act on it. The date is still
 * shown; the countdown is not.
 */
export function useOfflineData() {
  const { syncLabel, lastSyncedAt, now } = useData();
  const online = useOnline();

  return useMemo(() => ({
    online,
    isStale: !online,
    lastSyncedAt,
    now,
    syncLabel,
    suppressCountdowns: !online,
    bannerMessage: online ? null : { key: 'common.offline.banner', values: { age: syncLabel?.key ?? '' } },
    countdownNote: online ? null : { key: 'common.offline.countdownSuppressed', values: {} },
  }), [online, lastSyncedAt, now, syncLabel]);
}
