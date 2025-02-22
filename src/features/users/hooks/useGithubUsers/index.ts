import { useInfiniteQuery } from '@tanstack/react-query';
import { searchUsers } from '@features/users/api/githubApi';
import type { SearchResponse } from '@features/users/types';

interface InfiniteSearchResponse {
  pages: SearchResponse[];
  pageParams: number[];
}

export interface UseGithubUsersReturn {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  users: SearchResponse['items'];
  isEmpty: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export function useGithubUsers(searchTerm: string): UseGithubUsersReturn {
  const query = useInfiniteQuery<SearchResponse, Error, InfiniteSearchResponse, string[], number>({
    queryKey: ['github_users', searchTerm],
    queryFn: ({ pageParam = 1 }) => searchUsers(searchTerm, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.items.length === 0 ? undefined : nextPage;
    },
    initialPageParam: 1,
    enabled: Boolean(searchTerm),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    users: query.data?.pages.flatMap(page => page.items) ?? [],
    isEmpty: query.data?.pages[0]?.items.length === 0,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage
  };
} 