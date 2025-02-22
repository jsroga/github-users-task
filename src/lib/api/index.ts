import type { SearchResponse } from '@lib/types';

interface ApiConfig {
  baseURL: string;
  endpoints: Record<string, (...args: unknown[]) => Promise<unknown>>;
}

interface ApiEndpoints {
  searchUsers: (username: string, page?: number) => Promise<SearchResponse>;
}

export interface ApiInstance {
  baseURL: string;
  endpoints: ApiEndpoints;
}

export function createApi(config: ApiConfig): ApiInstance {
  const { baseURL, endpoints } = config;

  // Wrap each endpoint to include baseURL
  const wrappedEndpoints = Object.entries(endpoints).reduce(
    (acc, [key, endpoint]) => ({
      ...acc,
      [key]: async (...args: unknown[]) => endpoint(...args),
    }),
    {}
  );

  return {
    baseURL,
    endpoints: wrappedEndpoints as ApiEndpoints,
  };
} 