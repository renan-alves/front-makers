// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const routerMock = { push: vi.fn() };

vi.mock('next/navigation', () => ({
  useRouter: () => routerMock,
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams('filter=recent'),
}));

import HomeFeed from './HomeFeed';

const labels = {
  heroTitle: 'Welcome to Frontmakers',
  heroSubtitle: 'Articles and tools for frontend developers',
  filters: {
    recent: 'Recent',
    trending: 'Trending',
    mostRead: 'Most read',
  },
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('HomeFeed', () => {
  it('renders the hero copy and the provided list/aside content', () => {
    render(
      <HomeFeed
        selectedFilter="recent"
        labels={labels}
        list={<div>article-list-content</div>}
        aside={<div>aside-content</div>}
      />
    );

    expect(screen.getByRole('heading', { name: labels.heroTitle })).toBeInTheDocument();
    expect(screen.getByText(labels.heroSubtitle)).toBeInTheDocument();
    expect(screen.getByText('article-list-content')).toBeInTheDocument();
    expect(screen.getByText('aside-content')).toBeInTheDocument();
  });

  it('marks the selected filter button as pressed', () => {
    render(<HomeFeed selectedFilter="trending" labels={labels} list={<div />} aside={<div />} />);

    expect(screen.getByRole('button', { name: 'Trending' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Recent' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('navigates to the same path with an updated filter query param when a different filter is clicked', async () => {
    render(<HomeFeed selectedFilter="recent" labels={labels} list={<div />} aside={<div />} />);

    await userEvent.click(screen.getByRole('button', { name: 'Trending' }));

    expect(routerMock.push).toHaveBeenCalledWith('/?filter=trending');
  });

  it('does not navigate when clicking the already-selected filter', async () => {
    render(<HomeFeed selectedFilter="recent" labels={labels} list={<div />} aside={<div />} />);

    await userEvent.click(screen.getByRole('button', { name: 'Recent' }));

    expect(routerMock.push).not.toHaveBeenCalled();
  });
});
