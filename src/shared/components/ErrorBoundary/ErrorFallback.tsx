import { Alert, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const { t } = useTranslation();
  
  return (
    <Alert 
      severity="error"
      action={
        <Button color="inherit" onClick={resetErrorBoundary}>
          {t('common.error.refresh')}
        </Button>
      }
    >
      {error.message || t('common.error.unexpected')}
    </Alert>
  );
} 