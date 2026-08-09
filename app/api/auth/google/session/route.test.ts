import { describe, it, expect, vi, beforeEach } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  user: { findUnique: vi.fn() },
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock, default: prismaMock }));

import { GET } from './route';

function makeRequest(userId?: string) {
  const url = userId
    ? `http://localhost/api/auth/google/session?userId=${userId}`
    : 'http://localhost/api/auth/google/session';
  return new Request(url);
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/auth/google/session', () => {
  it('returns 400 when userId is missing', async () => {
    const response = await GET(makeRequest());
    expect(response.status).toBe(400);
  });

  it('returns 404 when the user does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(null);

    const response = await GET(makeRequest('missing-user'));

    expect(response.status).toBe(404);
  });

  it('returns the user on success', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce({ id: 'u1', name: 'Jane' });

    const response = await GET(makeRequest('u1'));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.user).toEqual({ id: 'u1', name: 'Jane' });
  });

  it('returns 500 when prisma throws', async () => {
    prismaMock.user.findUnique.mockRejectedValueOnce(new Error('db down'));

    const response = await GET(makeRequest('u1'));

    expect(response.status).toBe(500);
  });
});
