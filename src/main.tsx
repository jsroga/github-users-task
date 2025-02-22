// Third-party imports
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

// Application imports
import { store } from '@store/index';
import { createQueryClient } from '@config/query';
import App from './App';
import { LoadingFallback } from '@shared/components/LoadingFallback';
import i18n from './i18n';

function Root(): JSX.Element {
  const queryClient = React.useMemo(() => createQueryClient(), []);
  
  return (
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<LoadingFallback />}>
              <App />
            </Suspense>
          </QueryClientProvider>
        </Provider>
      </I18nextProvider>
    </React.StrictMode>
  );
}

// Wait for i18n initialization before rendering
i18n.init().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
}); 