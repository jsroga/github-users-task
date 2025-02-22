import { QueryClient } from '@tanstack/react-query';
import { CACHE, QUERY } from './constants';

const isDevelopment = process.env.NODE_ENV === 'development';

export function createQueryConfig() {
  return {
    defaultOptions: {
      queries: {
        retry: isDevelopment ? QUERY.RETRY_COUNT.DEVELOPMENT : QUERY.RETRY_COUNT.PRODUCTION,
        staleTime: CACHE.STALE_TIME,
        cacheTime: CACHE.CACHE_TIME,
      },
      mutations: {
        retry: QUERY.MUTATION_RETRY_COUNT,
      },
    },
  } as const;
}

export function createQueryClient(): QueryClient {
  return new QueryClient(createQueryConfig());
} 