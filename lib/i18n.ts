/**
 * Internationalization Configuration
 * 
 * Centralized i18n setup for Frontmakers.
 * Currently supports English only.
 * Prepared for future multilingual expansion.
 */

export const locales = ['en'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

/**
 * Locale configurations
 */
export const localeConfig = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
  },
  // Future locales (commented out until implemented):
  // pt: {
  //   code: 'pt',
  //   name: 'Português',
  //   flag: '🇧🇷',
  //   dir: 'ltr',
  // },
  // es: {
  //   code: 'es',
  //   name: 'Español',
  //   flag: '🇪🇸',
  //   dir: 'ltr',
  // },
} as const;

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
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${locale}/${cleanPath}`;
}

/**
 * Remove locale prefix from path
 */
export function removeLocaleFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  
  if (segments.length > 0 && isValidLocale(segments[0])) {
    return '/' + segments.slice(1).join('/');
  }
  
  return path;
}
