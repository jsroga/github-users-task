import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import './i18n/test-config';

// Global test setup
configure({ testIdAttribute: 'data-testid' });

// Global QueryClient for tests
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
  },
}); 