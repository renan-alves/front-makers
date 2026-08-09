'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { en } from '@/locales';
import Skeleton from '@/components/ui/Skeleton';
import ChevronDown from '@/components/icons/ChevronDown';

/**
 * Header Component
 * Main site navigation with links to the main sections.
 */
interface HeaderProps {
  locale?: string;
}

export default function Header({ locale: _locale }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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
    router.replace('/auth');
  };

  const t = en;

  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-light backdrop-blur-sm bg-opacity-95">
      <nav className="container-grid">
        <div className="h-20 flex items-center justify-between">
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
            <Link href="/" onClick={handleCloseMenu} className="flex items-center">
              <Image
                src="/frontmakers-logo@2x.webp"
                alt="FrontMakers Logo"
                width={210}
                height={73}
                sizes="(max-width: 768px) 42vw, 210px"
                priority
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 text-base">
            <Link
              href="/articles"
              className="text-secondary hover:text-primary transition-colors"
            >
              {t.nav.articles}
            </Link>
            <Link
              href="/submit"
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
                      href="/account/personal"
                      className="rounded-lg px-3 py-2 text-secondary hover:text-primary hover:bg-secondary transition-colors"
                    >
                      {t.nav.personalData}
                    </Link>
                    <Link
                      href="/account/articles"
                      className="rounded-lg px-3 py-2 text-secondary hover:text-primary hover:bg-secondary transition-colors"
                    >
                      {t.nav.yourArticles}
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
                href="/auth"
                onClick={handleAuthClick}
                className="text-secondary hover:text-primary font-semibold transition-colors"
              >
                {t.nav.signIn}
              </Link>
            ) : (
              <Skeleton className="h-5 w-24 rounded-full" />
            )}
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
                <Link href="/" onClick={handleCloseMenu} className="flex items-center">
                  <Image
                    src="/frontmakers-logo@2x.webp"
                    alt="FrontMakers Logo"
                    width={170}
                    height={59}
                    sizes="170px"
                    priority
                    className="h-10 w-auto object-contain"
                  />
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
                  href="/articles"
                  onClick={handleCloseMenu}
                  className="text-secondary hover:text-primary transition-colors"
                >
                  {t.nav.articles}
                </Link>
                <Link
                  href="/submit"
                  onClick={handleCloseMenu}
                  className="text-secondary hover:text-primary font-medium transition-colors"
                >
                  {t.nav.submit}
                </Link>
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <Link
                      href="/account"
                      onClick={handleCloseMenu}
                      className="text-secondary hover:text-primary font-semibold transition-colors"
                    >
                      {t.nav.account}
                    </Link>
                    <div className="flex flex-col gap-2 pl-2">
                      <Link
                        href="/account/personal"
                        onClick={handleCloseMenu}
                        className="text-secondary hover:text-primary transition-colors"
                      >
                        {t.nav.personalData}
                      </Link>
                      <Link
                        href="/account/articles"
                        onClick={handleCloseMenu}
                        className="text-secondary hover:text-primary transition-colors"
                      >
                        {t.nav.yourArticles}
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
                    href="/auth"
                    onClick={handleAuthClick}
                    className="text-secondary hover:text-primary font-semibold transition-colors"
                  >
                    {t.nav.signIn}
                  </Link>
                ) : (
                  <Skeleton className="h-5 w-24 rounded-full" />
                )}
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </nav>
    </header>
  );
}
