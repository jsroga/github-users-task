import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { UserList } from '@features/users/components/UserList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default {
  title: 'Features/Users/UserList',
  component: UserList,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    msw: {
      handlers: [
        http.get('*/search/users', () => {
          return HttpResponse.json({
            total_count: 1,
            incomplete_results: false,
            items: [
              {
                login: 'testuser',
                id: 1,
                avatar_url: 'https://avatars.githubusercontent.com/u/1',
                html_url: 'https://github.com/testuser'
              }
            ]
          });
        }),
      ],
    },
  },
} as Meta<typeof UserList>;

type Story = StoryObj<typeof UserList>;

export const Default: Story = {
  args: {
    username: 'testuser',
  },
};

export const Loading: Story = {
  args: {
    username: '',
  },
};

export const Empty: Story = {
  args: {
    username: 'nonexistent',
  },
}; 