import { CircularProgress, Box } from '@mui/material';

export function LoadingFallback() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
      <CircularProgress />
    </Box>
  );
} 