'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  getLocalizedUrl,
  removeLocaleFromPath,
  localeConfig,
  locales,
} from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { en, ptBR } from '@/locales';
import Skeleton from '@/components/ui/Skeleton';
import FlagBrazil from '@/components/icons/flags/FlagBrazil';
import FlagUK from '@/components/icons/flags/FlagUK';
import ChevronDown from '@/components/icons/ChevronDown';

/**
 * Header Component
 * Main site navigation with logo and links to main sections
 * Logo: "FRONT" in red, "MAKERS" in black/white
 */
interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const languageMenuRef = useRef<HTMLDivElement | null>(null);

  const handleToggleMenu = () => {
    setIsMenuOpen((previousValue) => !previousValue);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const updateAuthState = () => {
      const stored =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('frontmakersUser')
          : null;
      setIsLoggedIn(Boolean(stored));
      setIsAuthReady(true);
    };

    updateAuthState();
    window.addEventListener('storage', updateAuthState);
    window.addEventListener('frontmakers-auth', updateAuthState);

    return () => {
      window.removeEventListener('storage', updateAuthState);
      window.removeEventListener('frontmakers-auth', updateAuthState);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!languageMenuRef.current) {
        return;
      }

      if (!languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLanguageOpen(false);
      }
    };

    if (isLanguageOpen) {
      window.addEventListener('mousedown', handleOutsideClick);
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isLanguageOpen]);

  const handleAuthClick = () => {
    if (typeof window === 'undefined') {
      return;
    }

    if (pathname && !pathname.includes('/auth')) {
      window.localStorage.setItem('frontmakersRedirect', pathname);
    }

    handleCloseMenu();
  };

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('frontmakersUser');
      window.dispatchEvent(new Event('frontmakers-auth'));
    }
    handleCloseMenu();
    router.replace(`/${locale}/auth`);
  };

  const t = locale === 'pt-br' ? ptBR : en;

  const localeOptions = useMemo(
    () => locales.map((key) => localeConfig[key]),
    []
  );

  const handleLocaleChange = (nextLocale: Locale) => {
    if (!pathname || nextLocale === locale) {
      return;
    }

    const basePath = removeLocaleFromPath(pathname);
    const nextPath = getLocalizedUrl(basePath, nextLocale);
    router.push(nextPath);
    handleCloseMenu();
    setIsLanguageOpen(false);
  };

  const renderLocaleFlag = (currentLocale: Locale) => {
    if (currentLocale === 'pt-br') {
      return <FlagBrazil size={18} />;
    }

    return <FlagUK size={18} />;
  };

  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-light backdrop-blur-sm bg-opacity-95">
      <nav className="container-grid">
        <div className="h-16 flex items-center justify-between">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={handleToggleMenu}
            className="md:hidden p-2 rounded-lg border border-light bg-primary text-primary hover:bg-secondary transition-colors mr-3"
          >
            <span className="sr-only">Open main menu</span>
            <span className="block w-5 h-0.5 bg-[var(--color-text)] mb-1" />
            <span className="block w-5 h-0.5 bg-[var(--color-text)] mb-1" />
            <span className="block w-5 h-0.5 bg-[var(--color-text)]" />
          </button>

          <div className="flex items-center flex-1">
            {/* Logo - FRONT (red) + MAKERS (black/white) */}
            <Link
              href={`/${locale}`}
              onClick={handleCloseMenu}
              className="text-xl sm:text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              <span className="text-[var(--color-primary)]">FRONT</span>
              <span className="text-[var(--color-text)]">MAKERS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-base">
            <Link
              href={`/${locale}/articles`}
              className="text-secondary hover:text-primary transition-colors"
            >
              {t.nav.articles}
            </Link>
            <Link
              href={`/${locale}/submit`}
              className="text-secondary hover:text-primary font-medium transition-colors"
            >
              {t.nav.submit}
            </Link>
            {isLoggedIn ? (
              <div className="relative group">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-secondary hover:text-primary font-semibold transition-colors"
                  aria-haspopup="menu"
                >
                  {t.nav.account}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
                <div className="absolute right-0 top-full w-56 rounded-2xl border border-light bg-primary shadow-lg opacity-0 pointer-events-none transition group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
                  <div className="flex flex-col p-2 text-sm">
                    <Link
                      href={`/${locale}/account/personal`}
                      className="rounded-lg px-3 py-2 text-secondary hover:text-primary hover:bg-secondary transition-colors"
                    >
                      {t.nav.personalData}
                    </Link>
                    <Link
                      href={`/${locale}/account/articles`}
                      className="rounded-lg px-3 py-2 text-secondary hover:text-primary hover:bg-secondary transition-colors"
                    >
                      {t.nav.yourArticles}
                    </Link>
                    <Link
                      href={`/${locale}/account/connected`}
                      className="rounded-lg px-3 py-2 text-secondary hover:text-primary hover:bg-secondary transition-colors"
                    >
                      {t.nav.connectedAccounts}
                    </Link>
                    <div className="my-2 h-px bg-light" />
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="rounded-lg px-3 py-2 text-left text-secondary hover:text-primary hover:bg-secondary transition-colors"
                    >
                      {t.nav.logout}
                    </button>
                  </div>
                </div>
              </div>
            ) : isAuthReady ? (
              <Link
                href={`/${locale}/auth`}
                onClick={handleAuthClick}
                className="text-secondary hover:text-primary font-semibold transition-colors"
              >
                {t.nav.signIn}
              </Link>
            ) : (
              <Skeleton className="h-5 w-24 rounded-full" />
            )}
            <div ref={languageMenuRef} className="relative">
              <button
                type="button"
                aria-label="Select language"
                aria-haspopup="menu"
                aria-expanded={isLanguageOpen}
                onClick={() => setIsLanguageOpen((previous) => !previous)}
                className="inline-flex items-center gap-2 rounded-full border border-light px-3 py-1 text-sm font-semibold text-primary transition-colors hover:text-primary"
              >
                {renderLocaleFlag(locale)}
                <span>{locale.toUpperCase()}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isLanguageOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`absolute right-0 top-full mt-2 w-32 rounded-2xl border border-light bg-primary shadow-lg transition ${
                  isLanguageOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="flex flex-col p-1 text-sm">
                  {localeOptions.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => handleLocaleChange(option.code as Locale)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-secondary hover:text-primary hover:bg-secondary transition-colors"
                    >
                      {renderLocaleFlag(option.code as Locale)}
                      <span>{option.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dialog
          open={isMenuOpen}
          onClose={handleCloseMenu}
          className="md:hidden relative z-[60]"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/40 duration-300 ease-out data-[closed]:opacity-0"
          />

          <div className="fixed inset-0">
            <DialogPanel
              id="mobile-menu"
              transition
              className="h-full w-[82%] max-w-sm bg-primary border-r border-light shadow-lg duration-300 ease-out data-[closed]:-translate-x-full"
            >
              <div className="h-16 px-4 flex items-center justify-between border-b border-light">
                <Link
                  href={`/${locale}`}
                  onClick={handleCloseMenu}
                  className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
                >
                  <span className="text-[var(--color-primary)]">FRONT</span>
                  <span className="text-[var(--color-text)]">MAKERS</span>
                </Link>

                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={handleCloseMenu}
                  className="p-2 rounded-lg border border-light hover:bg-secondary transition-colors"
                >
                  <span className="block w-4 h-0.5 bg-[var(--color-text)] rotate-45 translate-y-[1px]" />
                  <span className="block w-4 h-0.5 bg-[var(--color-text)] -rotate-45 -translate-y-[1px]" />
                </button>
              </div>

              <div className="p-4 flex flex-col gap-4 text-base">
                <Link
                  href={`/${locale}/articles`}
                  onClick={handleCloseMenu}
                  className="text-secondary hover:text-primary transition-colors"
                >
                  {t.nav.articles}
                </Link>
                <Link
                  href={`/${locale}/submit`}
                  onClick={handleCloseMenu}
                  className="text-secondary hover:text-primary font-medium transition-colors"
                >
                  {t.nav.submit}
                </Link>
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <Link
                      href={`/${locale}/account`}
                      onClick={handleCloseMenu}
                      className="text-secondary hover:text-primary font-semibold transition-colors"
                    >
                      {t.nav.account}
                    </Link>
                    <div className="flex flex-col gap-2 pl-2">
                      <Link
                        href={`/${locale}/account/personal`}
                        onClick={handleCloseMenu}
                        className="text-secondary hover:text-primary transition-colors"
                      >
                        {t.nav.personalData}
                      </Link>
                      <Link
                        href={`/${locale}/account/articles`}
                        onClick={handleCloseMenu}
                        className="text-secondary hover:text-primary transition-colors"
                      >
                        {t.nav.yourArticles}
                      </Link>
                      <Link
                        href={`/${locale}/account/connected`}
                        onClick={handleCloseMenu}
                        className="text-secondary hover:text-primary transition-colors"
                      >
                        {t.nav.connectedAccounts}
                      </Link>
                      <div className="my-2 h-px bg-light" />
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="text-left text-secondary hover:text-primary transition-colors"
                      >
                        {t.nav.logout}
                      </button>
                    </div>
                  </div>
                ) : isAuthReady ? (
                  <Link
                    href={`/${locale}/auth`}
                    onClick={handleAuthClick}
                    className="text-secondary hover:text-primary font-semibold transition-colors"
                  >
                    {t.nav.signIn}
                  </Link>
                ) : (
                  <Skeleton className="h-5 w-24 rounded-full" />
                )}
                <div className="mt-2">
                  <label className="text-xs uppercase tracking-wide text-secondary">
                    {t.nav.language}
                  </label>
                  <div className="mt-2 flex flex-col gap-2">
                    {localeOptions.map((option) => (
                      <button
                        key={option.code}
                        type="button"
                        onClick={() => handleLocaleChange(option.code as Locale)}
                        className="flex items-center gap-2 rounded-lg border border-light px-3 py-2 text-left text-sm font-semibold text-primary transition-colors hover:text-primary"
                      >
                        {renderLocaleFlag(option.code as Locale)}
                        <span>{option.code.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </nav>
    </header>
  );
}
