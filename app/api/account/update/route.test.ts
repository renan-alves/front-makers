import { describe, it, expect, vi, beforeEach } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  user: { update: vi.fn() },
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock, default: prismaMock }));

import { PATCH } from './route';

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/account/update', {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

const validBody = {
  userId: 'u1',
  displayName: 'Jane',
  profession: 'Dev',
  email: 'jane@example.com',
  state: 'SP',
  country: 'BR',
  newsletterOptIn: true,
  avatarDataUrl: null,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('PATCH /api/account/update', () => {
  it('rejects a request missing required fields', async () => {
    const response = await PATCH(makeRequest({ userId: 'u1' }));
    expect(response.status).toBe(400);
  });

  it('rejects an invalid email format', async () => {
    const response = await PATCH(makeRequest({ ...validBody, email: 'not-an-email' }));
    expect(response.status).toBe(400);
  });

  it('updates the account and returns the sanitized user', async () => {
    prismaMock.user.update.mockResolvedValueOnce({
      id: 'u1',
      name: 'Jane',
      profession: 'Dev',
      email: 'jane@example.com',
      avatar: null,
      state: 'SP',
      country: 'BR',
      newsletterOptIn: true,
    });

    const response = await PATCH(makeRequest(validBody));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.user.email).toBe('jane@example.com');
  });

  it('defaults profession and avatar to null when falsy', async () => {
    prismaMock.user.update.mockResolvedValueOnce({});

    const { profession, avatarDataUrl, ...rest } = validBody;
    await PATCH(makeRequest(rest));

    expect(prismaMock.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ profession: null, avatar: null }),
      })
    );
  });

  it('returns 500 when prisma throws', async () => {
    prismaMock.user.update.mockRejectedValueOnce(new Error('db down'));

    const response = await PATCH(makeRequest(validBody));

    expect(response.status).toBe(500);
  });
});
