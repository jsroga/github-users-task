import { Suspense, useCallback } from 'react';
import { Container, Typography } from '@mui/material';
import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { LoadingFallback } from '@shared/components/LoadingFallback';
import { UserList } from '@features/users/components/UserList';
import { UserSearchForm } from '@features/users/components/UserSearchForm';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { RootState } from '@store/index';

function AppContent(): JSX.Element {
  const { t } = useTranslation();
  const selectSearchTerm = useCallback(
    (state: RootState) => state.search.searchTerm,
    []
  );
  const searchTerm = useSelector(selectSearchTerm);

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('pages.home.title')}
      </Typography>
      <UserSearchForm />
      <UserList username={searchTerm} />
    </Container>
  );
}

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <AppContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App; 