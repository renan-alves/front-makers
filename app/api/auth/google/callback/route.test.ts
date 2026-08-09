import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

const prismaMock = vi.hoisted(() => ({
  user: { findUnique: vi.fn(), create: vi.fn() },
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock, default: prismaMock }));

import { GET } from './route';

const originalEnv = { ...process.env };

function makeRequest(opts: { code?: string; state?: string; cookieState?: string }) {
  const url = new URL('http://localhost/api/auth/google/callback');
  if (opts.code) url.searchParams.set('code', opts.code);
  if (opts.state) url.searchParams.set('state', opts.state);

  const headers = new Headers();
  if (opts.cookieState) headers.set('cookie', `google_oauth_state=${opts.cookieState}`);

  return new NextRequest(url, { headers });
}

beforeEach(() => {
  vi.clearAllMocks();
  process.env.GOOGLE_CLIENT_ID = 'client-id';
  process.env.GOOGLE_CLIENT_SECRET = 'client-secret';
});

afterEach(() => {
  process.env = { ...originalEnv };
  vi.unstubAllGlobals();
});

describe('GET /api/auth/google/callback', () => {
  it('redirects with an error when state does not match the stored cookie', async () => {
    const response = await GET(makeRequest({ code: 'abc', state: 'expected', cookieState: 'different' }));

    expect(response.status).toBe(307);
    const location = new URL(response.headers.get('location') || '');
    expect(location.searchParams.get('error')).toBe('google');
  });

  it('redirects with google_missing_config when env vars are absent', async () => {
    delete process.env.GOOGLE_CLIENT_ID;
    delete process.env.GOOGLE_CLIENT_SECRET;

    const response = await GET(makeRequest({ code: 'abc', state: 'match', cookieState: 'match' }));

    const location = new URL(response.headers.get('location') || '');
    expect(location.searchParams.get('error')).toBe('google_missing_config');
  });

  it('redirects with an error when Google does not return an access token', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({ json: async () => ({ error: 'invalid_grant' }) })
    );

    const response = await GET(makeRequest({ code: 'abc', state: 'match', cookieState: 'match' }));

    const location = new URL(response.headers.get('location') || '');
    expect(location.searchParams.get('error')).toBe('google');
  });

  it('returns an inline-script HTML handoff page and clears cookies on success', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(null);
    prismaMock.user.create.mockResolvedValueOnce({
      id: 'u1',
      name: 'Jane',
      email: 'jane@example.com',
      avatar: null,
      profession: null,
      state: 'Unknown',
      country: 'Unknown',
      newsletterOptIn: false,
    });

    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({ json: async () => ({ access_token: 'token-123' }) })
        .mockResolvedValueOnce({
          json: async () => ({ email: 'jane@example.com', name: 'Jane', picture: null }),
        })
    );

    const response = await GET(makeRequest({ code: 'abc', state: 'match', cookieState: 'match' }));
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/html');
    expect(html).toContain('frontmakersUser');
    expect(html).toContain('jane@example.com');
    expect(response.cookies.get('google_oauth_state')?.maxAge).toBe(0);
    expect(response.cookies.get('google_auth_user')?.maxAge).toBe(0);
  });

  it('reuses an existing user instead of creating a new one', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce({
      id: 'existing-user',
      name: 'Jane',
      email: 'jane@example.com',
      avatar: null,
      profession: null,
      state: 'SP',
      country: 'BR',
      newsletterOptIn: true,
    });

    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({ json: async () => ({ access_token: 'token-123' }) })
        .mockResolvedValueOnce({
          json: async () => ({ email: 'jane@example.com', name: 'Jane', picture: null }),
        })
    );

    await GET(makeRequest({ code: 'abc', state: 'match', cookieState: 'match' }));

    expect(prismaMock.user.create).not.toHaveBeenCalled();
  });

  it('redirects with an error when Google does not return an email', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({ json: async () => ({ access_token: 'token-123' }) })
        .mockResolvedValueOnce({ json: async () => ({ name: 'Jane' }) })
    );

    const response = await GET(makeRequest({ code: 'abc', state: 'match', cookieState: 'match' }));

    const location = new URL(response.headers.get('location') || '');
    expect(location.searchParams.get('error')).toBe('google');
  });

  it('redirects with the error message when an unexpected exception is thrown', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({ json: async () => ({ access_token: 'token-123' }) })
        .mockResolvedValueOnce({
          json: async () => ({ email: 'jane@example.com', name: 'Jane', picture: null }),
        })
    );
    prismaMock.user.findUnique.mockRejectedValueOnce(new Error('unexpected db failure'));

    const response = await GET(makeRequest({ code: 'abc', state: 'match', cookieState: 'match' }));

    expect(response.status).toBe(307);
    const location = new URL(response.headers.get('location') || '');
    expect(location.searchParams.get('error')).toBe('google');
    expect(location.searchParams.get('detail')).toBe('unexpected db failure');
  });
});
