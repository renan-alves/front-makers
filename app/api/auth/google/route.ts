import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      const redirectUrl = new URL('/auth?error=google_missing_config', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    const state = randomBytes(16).toString('hex');
    const origin = new URL(request.url).origin;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${origin}/api/auth/google/callback`;

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'openid email profile');
    authUrl.searchParams.set('access_type', 'online');
    authUrl.searchParams.set('prompt', 'select_account');
    authUrl.searchParams.set('state', state);

    const response = NextResponse.redirect(authUrl);
    response.cookies.set({
      name: 'google_oauth_state',
      value: state,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 5,
    });

    return response;
  } catch (error) {
    console.error('Google auth initiation failed:', error);
    return NextResponse.redirect(new URL('/auth?error=google', request.url));
  }
}
