import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales, getLocaleFromPathname } from './lib/i18n';

/**
 * Middleware for locale routing
 * 
 * Handles:
 * - Redirecting root "/" to "/en"
 * - Validating locale in URL
 * - Preserving all other routes
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  const locale = getLocaleFromPathname(pathname);

  // Skip middleware for:
  // - API routes
  // - Static files (_next/static)
  // - Public files (images, etc.)
  // - Favicon, robots.txt, sitemap.xml
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

  // If root path, redirect to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // If no locale in pathname, redirect to default locale
  if (!locale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  // If locale is not valid, redirect to default locale
  if (!locales.includes(locale)) {
    const pathWithoutLocale = pathname.substring(3); // Remove /xx from path
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathWithoutLocale}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  // Matcher to apply middleware only to routes that need it
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
