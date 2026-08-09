import { describe, it, expect, vi, beforeEach } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  user: { findUnique: vi.fn() },
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock, default: prismaMock }));
vi.mock('@/lib/auth', () => ({ verifyPassword: vi.fn() }));

import { POST } from './route';
import { verifyPassword } from '@/lib/auth';

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/auth/login', () => {
  it('rejects a request missing email or password', async () => {
    const response = await POST(makeRequest({ email: 'jane@example.com' }));
    expect(response.status).toBe(400);
  });

  it('rejects an invalid email format', async () => {
    const response = await POST(makeRequest({ email: 'not-an-email', password: 'x' }));
    expect(response.status).toBe(400);
  });

  it('returns 401 when the user does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(null);

    const response = await POST(makeRequest({ email: 'jane@example.com', password: 'x' }));

    expect(response.status).toBe(401);
  });

  it('returns 401 when the password is incorrect', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce({ id: 'u1', passwordHash: 'hash' });
    vi.mocked(verifyPassword).mockReturnValueOnce(false);

    const response = await POST(makeRequest({ email: 'jane@example.com', password: 'wrong' }));

    expect(response.status).toBe(401);
  });

  it('returns the sanitized user (no passwordHash) on success', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: 'u1',
      name: 'Jane',
      profession: 'Dev',
      email: 'jane@example.com',
      passwordHash: 'hash',
      avatar: null,
      state: 'SP',
      country: 'BR',
      newsletterOptIn: true,
    });
    vi.mocked(verifyPassword).mockReturnValueOnce(true);

    const response = await POST(makeRequest({ email: 'jane@example.com', password: 'correct' }));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.user.passwordHash).toBeUndefined();
    expect(data.user.email).toBe('jane@example.com');
  });

  it('returns 500 when prisma throws unexpectedly', async () => {
    prismaMock.user.findUnique.mockRejectedValueOnce(new Error('db down'));

    const response = await POST(makeRequest({ email: 'jane@example.com', password: 'x' }));

    expect(response.status).toBe(500);
  });
});
