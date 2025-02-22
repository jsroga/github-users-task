import { renderHook, waitFor } from '@testing-library/react';
import { useGithubUsers } from '@features/users/hooks';
import { searchUsers } from '@features/users/api/githubApi';
import { Wrapper } from '@shared/utils/test-utils';

jest.mock('@features/users/api/githubApi');

describe('Github API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches users correctly', async () => {
    const mockData = {
      total_count: 1,
      incomplete_results: false,
      items: [
        {
          id: 1,
          login: 'testuser',
          avatar_url: 'test.jpg',
          html_url: 'test.com'
        }
      ]
    };

    (searchUsers as jest.Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useGithubUsers('testuser'), {
      wrapper: Wrapper
    });

    await waitFor(() => {
      expect(result.current.users).toHaveLength(1);
      expect(result.current.users[0].login).toBe('testuser');
    });
  });
}); 