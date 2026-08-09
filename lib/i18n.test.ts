import { describe, it, expect } from 'vitest';
import {
  locales,
  defaultLocale,
  localeConfig,
  isValidLocale,
  getLocaleFromPathname,
  getLocalizedUrl,
  removeLocaleFromPath,
} from './i18n';

describe('locales config', () => {
  it('only exposes the English locale', () => {
    expect(locales).toEqual(['en']);
    expect(defaultLocale).toBe('en');
    expect(Object.keys(localeConfig)).toEqual(['en']);
  });
});

describe('isValidLocale', () => {
  it('accepts "en"', () => {
    expect(isValidLocale('en')).toBe(true);
  });

  it('rejects any other locale', () => {
    expect(isValidLocale('pt-br')).toBe(false);
    expect(isValidLocale('fr')).toBe(false);
    expect(isValidLocale('')).toBe(false);
  });
});

describe('getLocaleFromPathname', () => {
  it('extracts a valid locale from the first path segment', () => {
    expect(getLocaleFromPathname('/en/articles')).toBe('en');
  });

  it('returns null when the first segment is not a valid locale', () => {
    expect(getLocaleFromPathname('/articles')).toBeNull();
    expect(getLocaleFromPathname('/pt-br/articles')).toBeNull();
    expect(getLocaleFromPathname('/')).toBeNull();
  });
});

describe('getLocalizedUrl', () => {
  it('normalizes a path for the default locale', () => {
    expect(getLocalizedUrl('articles')).toBe('/articles');
    expect(getLocalizedUrl('/articles')).toBe('/articles');
  });

  it('normalizes the root path', () => {
    expect(getLocalizedUrl('')).toBe('/');
  });
});

describe('removeLocaleFromPath', () => {
  it('is currently a no-op passthrough', () => {
    expect(removeLocaleFromPath('/en/articles')).toBe('/en/articles');
  });
});
