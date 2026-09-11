import { useMemo } from 'react';
import { useData } from './DataProvider.js';
import { buildRequestsInbox } from '../lib/selectors.js';

export function useRequests() {
  const { requests } = useData();
  return useMemo(() => buildRequestsInbox(requests), [requests]);
}
