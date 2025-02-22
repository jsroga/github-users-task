import { Alert, AlertTitle, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { ErrorMessageProps } from '@shared/types';

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  const { t } = useTranslation();
  
  return (
    <Alert 
      severity="error"
      action={
        onRetry && (
          <Button color="inherit" onClick={onRetry}>
            {t('common.error.retry')}
          </Button>
        )
      }
    >
      <AlertTitle>{t('common.error.title')}</AlertTitle>
      {error.message}
    </Alert>
  );
} 