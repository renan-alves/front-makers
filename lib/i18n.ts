/**
 * Internationalization Configuration
 * 
 * Centralized i18n setup for Frontmakers.
 * Supports English and PT-BR.
 * Prepared for future multilingual expansion.
 */

export const locales = ['en', 'pt-br'] as const;
export const defaultLocale = 'en' as const;

// Explicit Locale type for strong type checking
export type Locale = 'en' | 'pt-br';

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
  'pt-br': {
    code: 'pt-br' as const,
    name: 'Portugues (BR)',
    flag: 'BR',
    dir: 'ltr' as const,
  },
  // es: {
  //   code: 'es',
  //   name: 'Español',
  //   flag: '🇪🇸',
  //   dir: 'ltr',
  // },
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
