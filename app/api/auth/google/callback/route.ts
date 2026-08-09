import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const googleTokenUrl = 'https://oauth2.googleapis.com/token';

// Escapes a value for safe inline embedding inside a <script> tag.
function toInlineJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

// Renders a minimal page that hydrates the client session synchronously and
// redirects, avoiding the extra fetch round-trip that caused the login gap.
function buildAuthHandoffHtml(user: unknown): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><title>Signing you in...</title></head>
<body>
<script>
(function () {
  try {
    localStorage.setItem('frontmakersUser', JSON.stringify(${toInlineJson(user)}));
    window.dispatchEvent(new Event('frontmakers-auth'));
  } catch (e) {}

  var redirectTarget = localStorage.getItem('frontmakersRedirect');
  localStorage.removeItem('frontmakersRedirect');
  var safeTarget = (redirectTarget && redirectTarget.indexOf('/') === 0 && redirectTarget.indexOf('/auth') === -1)
    ? redirectTarget
    : '/';
  window.location.replace(safeTarget);
})();
</script>
</body>
</html>`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const storedState = request.cookies.get('google_oauth_state')?.value;

    if (!code || !state || !storedState || state !== storedState) {
      const redirectUrl = new URL('/auth', request.url);
      redirectUrl.searchParams.set('error', 'google');
      redirectUrl.searchParams.set('detail', 'The Google authorization request was invalid or expired.');
      return NextResponse.redirect(redirectUrl);
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${new URL(request.url).origin}/api/auth/google/callback`;

    if (!clientId || !clientSecret) {
      const redirectUrl = new URL('/auth', request.url);
      redirectUrl.searchParams.set('error', 'google_missing_config');
      return NextResponse.redirect(redirectUrl);
    }

    const tokenResponse = await fetch(googleTokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      const redirectUrl = new URL('/auth', request.url);
      redirectUrl.searchParams.set('error', 'google');
      redirectUrl.searchParams.set('detail', tokenData.error_description || tokenData.error || 'Google returned an invalid token response.');
      return NextResponse.redirect(redirectUrl);
    }

    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const profile = await profileResponse.json();
    const email = profile.email as string | undefined;
    const name = (profile.name as string | undefined) || profile.given_name || 'Google User';
    const avatar = (profile.picture as string | undefined) || null;

    if (!email) {
      const redirectUrl = new URL('/auth', request.url);
      redirectUrl.searchParams.set('error', 'google');
      redirectUrl.searchParams.set('detail', 'Google did not return an email address for this account.');
      return NextResponse.redirect(redirectUrl);
    }

    let user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, avatar: true, profession: true, state: true, country: true, newsletterOptIn: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          avatar,
          state: 'Unknown',
          country: 'Unknown',
          newsletterOptIn: false,
          passwordHash: 'oauth-provider:google',
        },
        select: { id: true, name: true, email: true, avatar: true, profession: true, state: true, country: true, newsletterOptIn: true },
      });
    }

    const response = new NextResponse(buildAuthHandoffHtml(user), {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });

    response.cookies.set({
      name: 'google_oauth_state',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    // Clear any oversized handoff cookie from a previous attempt so it stops
    // bloating request headers on subsequent requests to this domain.
    response.cookies.set({
      name: 'google_auth_user',
      value: '',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('Google auth callback failed:', error);
    const redirectUrl = new URL('/auth', request.url);
    redirectUrl.searchParams.set('error', 'google');
    redirectUrl.searchParams.set('detail', error instanceof Error ? error.message : 'Unexpected Google authentication error.');
    return NextResponse.redirect(redirectUrl);
  }
}
