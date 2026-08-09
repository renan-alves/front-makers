import { describe, it, expect, vi, beforeEach } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  user: { findUnique: vi.fn(), update: vi.fn() },
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock, default: prismaMock }));
vi.mock('@/lib/auth', () => ({
  hashPassword: vi.fn((pwd: string) => `hashed:${pwd}`),
  isStrongPassword: vi.fn(),
  verifyPassword: vi.fn(),
}));

import { PATCH } from './route';
import { hashPassword, isStrongPassword, verifyPassword } from '@/lib/auth';

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/account/password', {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('PATCH /api/account/password', () => {
  it('rejects a request missing required fields', async () => {
    const response = await PATCH(makeRequest({ userId: 'u1' }));
    expect(response.status).toBe(400);
  });

  it('rejects a weak new password', async () => {
    vi.mocked(isStrongPassword).mockReturnValueOnce(false);

    const response = await PATCH(
      makeRequest({ userId: 'u1', currentPassword: 'old', newPassword: 'weak' })
    );

    expect(response.status).toBe(400);
  });

  it('returns 401 when the user does not exist', async () => {
    vi.mocked(isStrongPassword).mockReturnValueOnce(true);
    prismaMock.user.findUnique.mockResolvedValueOnce(null);

    const response = await PATCH(
      makeRequest({ userId: 'missing', currentPassword: 'old', newPassword: 'Abcdef1!' })
    );

    expect(response.status).toBe(401);
  });

  it('returns 401 when the current password is incorrect', async () => {
    vi.mocked(isStrongPassword).mockReturnValueOnce(true);
    prismaMock.user.findUnique.mockResolvedValueOnce({ passwordHash: 'stored-hash' });
    vi.mocked(verifyPassword).mockReturnValueOnce(false);

    const response = await PATCH(
      makeRequest({ userId: 'u1', currentPassword: 'wrong', newPassword: 'Abcdef1!' })
    );

    expect(response.status).toBe(401);
  });

  it('updates the password hash on success', async () => {
    vi.mocked(isStrongPassword).mockReturnValueOnce(true);
    prismaMock.user.findUnique.mockResolvedValueOnce({ passwordHash: 'stored-hash' });
    vi.mocked(verifyPassword).mockReturnValueOnce(true);
    prismaMock.user.update.mockResolvedValueOnce({});

    const response = await PATCH(
      makeRequest({ userId: 'u1', currentPassword: 'correct', newPassword: 'Abcdef1!' })
    );

    expect(response.status).toBe(200);
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { id: 'u1' },
      data: { passwordHash: 'hashed:Abcdef1!' },
    });
  });

  it('returns 500 when prisma throws unexpectedly', async () => {
    vi.mocked(isStrongPassword).mockReturnValueOnce(true);
    prismaMock.user.findUnique.mockResolvedValueOnce({ passwordHash: 'stored-hash' });
    vi.mocked(verifyPassword).mockReturnValueOnce(true);
    prismaMock.user.update.mockRejectedValueOnce(new Error('db down'));

    const response = await PATCH(
      makeRequest({ userId: 'u1', currentPassword: 'correct', newPassword: 'Abcdef1!' })
    );

    expect(response.status).toBe(500);
  });
});
