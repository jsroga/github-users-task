export interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}