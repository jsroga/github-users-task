import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      return Promise.reject(new Error('API rate limit exceeded. Please try again later.'));
    }
    return Promise.reject(error);
  }
); 