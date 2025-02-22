import React, { Component, ReactNode } from 'react';
import { Alert, Button } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert 
          severity="error"
          action={
            <Button color="inherit" onClick={() => window.location.reload()}>
              Odśwież stronę
            </Button>
          }
        >
          {this.state.error?.message || 'Wystąpił nieoczekiwany błąd'}
        </Alert>
      );
    }

    return this.props.children;
  }
} 