/**
 * Internationalization Configuration
 *
 * Frontmakers now uses a single English experience.
 */

export const locales = ['en'] as const;
export const defaultLocale = 'en' as const;

// Explicit Locale type for strong type checking
export type Locale = 'en';

/**
 * Locale configurations
 */
export const localeConfig = {
  en: {
    code: 'en' as const,
    name: 'English',
    flag: 'UK',
    dir: 'ltr' as const,
  },
} as const satisfies Record<Locale, { code: string; name: string; flag: string; dir: 'ltr' | 'rtl' }>;

export type LocaleConfig = typeof localeConfig;

/**
 * Check if locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get locale from pathname
 */
export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  
  if (potentialLocale && isValidLocale(potentialLocale)) {
    return potentialLocale;
  }
  
  return null;
}

/**
 * Get URL with locale prefix
 */
export function getLocalizedUrl(path: string, locale: Locale = defaultLocale): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const normalizedPath = cleanPath ? `/${cleanPath}` : '/';

  if (locale === defaultLocale) {
    return normalizedPath;
  }

  return normalizedPath;
}

/**
 * Remove locale prefix from path
 */
export function removeLocaleFromPath(path: string): string {
  return path;
}
