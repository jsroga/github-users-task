import { Skeleton, Box } from '@mui/material';
import type { LoadingStateProps } from '@shared/types';

export function LoadingState({ count = 3 }: LoadingStateProps) {
  return (
    <Box sx={{ width: '100%' }} data-testid="loading-state">
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i} sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Skeleton variant="circular" width={60} height={60} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
        </Box>
      ))}
    </Box>
  );
} 