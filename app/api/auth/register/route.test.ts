import { describe, it, expect, vi, beforeEach } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  user: { findUnique: vi.fn(), create: vi.fn() },
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock, default: prismaMock }));

import { POST } from './route';

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/auth/register', () => {
  it('rejects a request missing required fields', async () => {
    const response = await POST(makeRequest({ email: 'a@b.com' }));
    expect(response.status).toBe(400);
  });

  it('rejects a request with a null JSON body', async () => {
    const response = await POST(
      new Request('http://localhost/api/auth/register', { method: 'POST', body: 'null' })
    );
    expect(response.status).toBe(400);
  });

  it('rejects an invalid email format', async () => {
    const response = await POST(
      makeRequest({
        displayName: 'Jane',
        email: 'not-an-email',
        state: 'SP',
        country: 'BR',
        password: 'Abcdef1!',
      })
    );
    expect(response.status).toBe(400);
  });

  it('rejects a weak password', async () => {
    const response = await POST(
      makeRequest({
        displayName: 'Jane',
        email: 'jane@example.com',
        state: 'SP',
        country: 'BR',
        password: 'weak',
      })
    );
    expect(response.status).toBe(400);
  });

  it('returns 409 when the email is already registered', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce({ id: 'existing-user' });

    const response = await POST(
      makeRequest({
        displayName: 'Jane',
        email: 'jane@example.com',
        state: 'SP',
        country: 'BR',
        password: 'Abcdef1!',
      })
    );

    expect(response.status).toBe(409);
  });

  it('creates the user and returns 201 on success', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(null);
    prismaMock.user.create.mockResolvedValueOnce({
      id: 'new-user',
      name: 'Jane',
      email: 'jane@example.com',
    });

    const response = await POST(
      makeRequest({
        displayName: 'Jane',
        email: 'jane@example.com',
        state: 'SP',
        country: 'BR',
        password: 'Abcdef1!',
      })
    );
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.user.email).toBe('jane@example.com');
  });

  it('returns 500 when prisma throws unexpectedly', async () => {
    prismaMock.user.findUnique.mockRejectedValueOnce(new Error('db down'));

    const response = await POST(
      makeRequest({
        displayName: 'Jane',
        email: 'jane@example.com',
        state: 'SP',
        country: 'BR',
        password: 'Abcdef1!',
      })
    );

    expect(response.status).toBe(500);
  });
});
