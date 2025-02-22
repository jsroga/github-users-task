import { render, screen } from '@testing-library/react';
import { UserList } from '@features/users/components/UserList';
import { useGithubUsers, type UseGithubUsersReturn } from '@features/users/hooks';
import { Wrapper } from '@shared/utils/test-utils';

jest.mock('@features/users/hooks');

const mockUseGithubUsers = useGithubUsers as jest.MockedFunction<typeof useGithubUsers>;

describe('UserList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state', () => {
    mockUseGithubUsers.mockReturnValue({
      isLoading: true,
      isError: false,
      error: null,
      users: [],
      isEmpty: false,
      fetchNextPage: () => {},
      hasNextPage: false
    } as UseGithubUsersReturn);

    render(<UserList username="test" />, { wrapper: Wrapper });
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    mockUseGithubUsers.mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      users: [],
      isEmpty: true,
      fetchNextPage: () => {},
      hasNextPage: false
    } as UseGithubUsersReturn);

    render(<UserList username="test" />, { wrapper: Wrapper });
    expect(screen.getByText(/brak wyników/i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockUseGithubUsers.mockReturnValue({
      isLoading: false,
      isError: true,
      error: new Error('Test error'),
      users: [],
      isEmpty: false,
      fetchNextPage: () => {},
      hasNextPage: false
    } as UseGithubUsersReturn);

    render(<UserList username="test" />, { wrapper: Wrapper });
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });
}); 