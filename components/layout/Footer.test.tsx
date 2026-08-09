// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the brand, navigation links and current year in the copyright', () => {
    render(<Footer />);

    expect(screen.getByRole('heading', { name: 'Frontmakers' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Articles' })).toHaveAttribute('href', '/articles');
    expect(screen.getByRole('link', { name: 'Submit Article' })).toHaveAttribute('href', '/submit');
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');

    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`©\\s*${year}\\s*Frontmakers`))).toBeInTheDocument();
  });

  it('renders the footer ad slot', () => {
    render(<Footer />);
    expect(screen.getByText('Slot: footer')).toBeInTheDocument();
  });
});
