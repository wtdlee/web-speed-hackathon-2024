import useSWR from 'swr';

import { releaseApiClient } from '../apiClient/releaseApiClient';

export function useRelease(options: Parameters<typeof releaseApiClient.fetch>[0]) {
  if (!options || !options.params || !options.params.dayOfWeek) {
    throw new Error('dayOfWeek is required for useRelease hook');
  }

  return useSWR(
    () => releaseApiClient.fetch$$key(options),
    () => releaseApiClient.fetch(options),
    { suspense: true },
  );
}
