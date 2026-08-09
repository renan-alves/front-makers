import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GET } from './route';

function makeRequest() {
  return new Request('http://localhost/api/auth/google');
}

const originalEnv = { ...process.env };

beforeEach(() => {
  process.env.GOOGLE_CLIENT_ID = 'client-id';
  process.env.GOOGLE_CLIENT_SECRET = 'client-secret';
});

afterEach(() => {
  process.env = { ...originalEnv };
});

describe('GET /api/auth/google', () => {
  it('redirects to /auth?error=google_missing_config when env vars are missing', async () => {
    delete process.env.GOOGLE_CLIENT_ID;
    delete process.env.GOOGLE_CLIENT_SECRET;

    const response = await GET(makeRequest());

    expect(response.status).toBe(307);
    const location = new URL(response.headers.get('location') || '');
    expect(location.pathname).toBe('/auth');
    expect(location.searchParams.get('error')).toBe('google_missing_config');
  });

  it('redirects to the Google consent screen with the expected params', async () => {
    const response = await GET(makeRequest());

    const location = new URL(response.headers.get('location') || '');
    expect(location.origin + location.pathname).toBe('https://accounts.google.com/o/oauth2/v2/auth');
    expect(location.searchParams.get('client_id')).toBe('client-id');
    expect(location.searchParams.get('scope')).toBe('openid email profile');
    expect(location.searchParams.get('state')).toBeTruthy();
  });

  it('sets an httpOnly, short-lived state cookie', async () => {
    const response = await GET(makeRequest());

    const cookie = response.cookies.get('google_oauth_state');
    expect(cookie?.value).toBeTruthy();
    expect(cookie?.httpOnly).toBe(true);
    expect(cookie?.maxAge).toBe(300);
  });
});
