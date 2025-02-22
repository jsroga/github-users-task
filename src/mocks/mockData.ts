import type { SearchResponse } from '@features/users/types';

export const mockUserData: SearchResponse = {
  total_count: 2,
  incomplete_results: false,
  items: [
    {
      login: 'john',
      id: 1,
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      html_url: 'https://github.com/john'
    }
  ]
}; 