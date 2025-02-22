type QueryParams = Record<string, string | number | boolean | undefined>;

export function buildUrl(baseUrl: string, path: string, params?: QueryParams): string {
  const url = new URL(path, baseUrl);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
} 