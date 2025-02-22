export interface ErrorMessageProps {
  error: Error;
  onRetry?: () => void;
}

export interface LoadingStateProps {
  count?: number;
} 