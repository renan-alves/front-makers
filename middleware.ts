import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales, getLocaleFromPathname } from './lib/i18n';

/**
 * Middleware for English-only routing.
 *
 * Keeps the site on a single language experience while still supporting the
 * existing locale-based route structure internally.
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = getLocaleFromPathname(pathname);

  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|otf)$/) ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  if (pathname === '/') {
    return NextResponse.next();
  }

  if (locale && locales.includes(locale)) {
    return NextResponse.next();
  }

  const rootAliasPrefixes = [
    '/account',
    '/articles',
    '/auth',
    '/submit',
    '/tools',
    '/design-system',
    '/t',
  ];

  if (rootAliasPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return NextResponse.rewrite(new URL(`/en${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
