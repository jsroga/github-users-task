import { render, screen } from '@testing-library/react';
import { UserCard } from '..';
import type { GithubUser } from '@features/users/types';

describe('UserCard', () => {
  const mockUser: GithubUser = {
    id: 1,
    login: 'testuser',
    avatar_url: 'test.jpg',
    html_url: 'test.com'
  };

  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'test.com');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Avatar of testuser');
  });
}); 