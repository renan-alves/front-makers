import { describe, it, expect, vi, beforeEach } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  $queryRaw: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock, default: prismaMock }));

import { GET } from './route';

function makeRequest(query = '') {
  return new Request(`http://localhost/api/articles${query}`);
}

const row = {
  id: 'a1',
  title: 'Title',
  slug: 'title',
  content: 'content',
  excerpt: 'excerpt',
  coverImage: null,
  locale: 'en',
  status: 'APPROVED',
  category: 'CSS',
  readTime: 5,
  tags: [],
  authorId: 'u1',
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: new Date(),
  author_name: null,
  author_email: null,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/articles', () => {
  it('returns articles with a default author when the join has no match', async () => {
    prismaMock.$queryRaw.mockResolvedValueOnce([row]);

    const response = await GET(makeRequest());
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data[0].author).toEqual({ name: 'Unknown author', email: '' });
  });

  it('applies category and limit query params', async () => {
    prismaMock.$queryRaw.mockResolvedValueOnce([{ ...row, author_name: 'Jane', author_email: 'jane@example.com' }]);

    const response = await GET(makeRequest('?category=CSS&limit=5&locale=en'));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data[0].author).toEqual({ name: 'Jane', email: 'jane@example.com' });
  });

  it('returns 500 when the query fails', async () => {
    prismaMock.$queryRaw.mockRejectedValueOnce(new Error('db down'));

    const response = await GET(makeRequest());

    expect(response.status).toBe(500);
  });
});
