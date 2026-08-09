import { describe, it, expect, vi, beforeEach } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  $queryRaw: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock, default: prismaMock }));

import { GET } from './route';

function makeRequest(userId?: string) {
  const url = userId
    ? `http://localhost/api/account/articles?userId=${userId}`
    : 'http://localhost/api/account/articles';
  return new Request(url);
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/account/articles', () => {
  it('returns 400 when userId is missing', async () => {
    const response = await GET(makeRequest());
    expect(response.status).toBe(400);
  });

  it('returns the user articles on success', async () => {
    prismaMock.$queryRaw.mockResolvedValueOnce([
      {
        id: 'a1',
        title: 'Title',
        slug: 'title',
        status: 'PENDENT',
        category: 'CSS',
        updatedAt: new Date('2026-01-01'),
        publishedAt: null,
      },
    ]);

    const response = await GET(makeRequest('u1'));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(1);
    expect(data[0].status).toBe('PENDENT');
  });

  it('returns 500 when prisma throws', async () => {
    prismaMock.$queryRaw.mockRejectedValueOnce(new Error('db down'));

    const response = await GET(makeRequest('u1'));

    expect(response.status).toBe(500);
  });
});
