// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArticleCard from './ArticleCard';

const baseProps = {
  slug: 'my-article',
  title: 'My Article',
  description: 'A short description',
  category: 'CSS',
  date: '2026-01-15T00:00:00.000Z',
  readTime: '5',
  author: { name: 'Jane Doe', avatar: '🧑\u200d💻' },
};

describe('ArticleCard', () => {
  it('renders the title, category, author and links to the article', () => {
    render(<ArticleCard {...baseProps} />);

    expect(screen.getByRole('heading', { name: 'My Article' })).toBeInTheDocument();
    expect(screen.getByText('CSS')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links.every((link) => link.getAttribute('href') === '/articles/my-article')).toBe(true);
  });

  it('renders English labels by default', () => {
    render(<ArticleCard {...baseProps} />);

    expect(screen.getByText(/read$/)).toBeInTheDocument();
    expect(screen.getByText('Read full article')).toBeInTheDocument();
  });

  it('renders Portuguese labels when locale is pt-br', () => {
    render(<ArticleCard {...baseProps} locale="pt-br" />);

    expect(screen.getByText(/leitura$/)).toBeInTheDocument();
    expect(screen.getByText('Ler artigo completo')).toBeInTheDocument();
  });

  it('formats the date according to locale', () => {
    render(<ArticleCard {...baseProps} locale="pt-br" />);
    const time = screen.getByText((_, el) => el?.tagName === 'TIME');
    expect(time).toHaveAttribute('dateTime', baseProps.date);
  });
});
