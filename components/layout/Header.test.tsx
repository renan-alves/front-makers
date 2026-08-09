// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const routerMock = { replace: vi.fn(), push: vi.fn() };
let pathnameMock = '/';

vi.mock('next/navigation', () => ({
  usePathname: () => pathnameMock,
  useRouter: () => routerMock,
}));

import Header from './Header';

beforeEach(() => {
  vi.clearAllMocks();
  pathnameMock = '/';
  window.localStorage.clear();
});

afterEach(() => {
  window.localStorage.clear();
});

describe('Header', () => {
  it('shows a "Sign in" link when there is no stored session', async () => {
    render(<Header />);

    expect(await screen.findByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/auth');
  });

  it('shows the account menu when a session is stored in localStorage', async () => {
    window.localStorage.setItem('frontmakersUser', JSON.stringify({ email: 'jane@example.com' }));

    render(<Header />);

    expect(await screen.findByRole('button', { name: /Account/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Sign in' })).not.toBeInTheDocument();
  });

  it('remembers the current page as the post-login redirect target', async () => {
    pathnameMock = '/articles';
    render(<Header />);

    const signIn = await screen.findByRole('link', { name: 'Sign in' });
    await userEvent.click(signIn);

    expect(window.localStorage.getItem('frontmakersRedirect')).toBe('/articles');
  });

  it('does not store a redirect target when already on the auth page', async () => {
    pathnameMock = '/auth';
    render(<Header />);

    const signIn = await screen.findByRole('link', { name: 'Sign in' });
    await userEvent.click(signIn);

    expect(window.localStorage.getItem('frontmakersRedirect')).toBeNull();
  });

  it('signs out, clears the stored session and redirects to /auth', async () => {
    window.localStorage.setItem('frontmakersUser', JSON.stringify({ email: 'jane@example.com' }));
    render(<Header />);

    const logoutButton = await screen.findByRole('button', { name: 'Logout' });
    await userEvent.click(logoutButton);

    expect(window.localStorage.getItem('frontmakersUser')).toBeNull();
    expect(routerMock.replace).toHaveBeenCalledWith('/auth');
  });

  it('toggles the mobile navigation menu', async () => {
    render(<Header />);

    const toggle = screen.getByRole('button', { name: 'Toggle navigation menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});
