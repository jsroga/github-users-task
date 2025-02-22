export interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
  }[];
} 