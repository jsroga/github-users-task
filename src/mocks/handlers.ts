import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/search/users', () => {
    return HttpResponse.json({
      total_count: 1,
      incomplete_results: false,
      items: [
        {
          id: 1,
          login: 'testuser',
          avatar_url: 'test.jpg',
          html_url: 'test.com'
        }
      ]
    });
  })
]; 