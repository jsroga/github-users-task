import { createApi } from '@lib/api';
import { buildUrl } from '@lib/utils/url';
import { API_PATHS, API_BASE_URL, USERS_PER_PAGE } from './constants';

const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    searchUsers: async (...args: unknown[]): Promise<unknown> => {
      const [username = '', page = 1] = args as [string, number?];
      
      if (!username.trim()) {
        return { total_count: 0, incomplete_results: false, items: [] };
      }
      
      const response = await fetch(
        buildUrl(API_BASE_URL, API_PATHS.SEARCH_USERS, {
          q: username,
          page,
          per_page: USERS_PER_PAGE
        })
      );

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      return response.json();
    }
  }
} as const;

export const githubApi = createApi(apiConfig);

// Export the searchUsers function directly
export const { searchUsers } = githubApi.endpoints; 