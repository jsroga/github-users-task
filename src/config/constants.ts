// Time constants (in milliseconds)
export const TIME = {
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
} as const;

// Cache configuration
export const CACHE = {
  STALE_TIME: 5 * TIME.MINUTE,
  CACHE_TIME: 10 * TIME.MINUTE,
} as const;

// Query configuration
export const QUERY = {
  RETRY_COUNT: {
    DEVELOPMENT: 1,
    PRODUCTION: 2,
  },
  MUTATION_RETRY_COUNT: 1,
} as const; 