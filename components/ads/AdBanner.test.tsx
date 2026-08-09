// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdBanner from './AdBanner';

describe('AdBanner', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the ad placeholder with the given slot name', () => {
    render(<AdBanner slot="hero" />);

    expect(screen.getByText('Slot: hero')).toBeInTheDocument();
    expect(screen.getByText('Ad Space Reserved')).toBeInTheDocument();
  });

  it('renders an <ins class="adsbygoogle"> element configured for the slot', () => {
    const { container } = render(<AdBanner slot="footer" />);
    const ins = container.querySelector('ins.adsbygoogle');

    expect(ins).toBeInTheDocument();
    expect(ins).toHaveAttribute('data-ad-slot', '4062250079');
    expect(ins).toHaveAttribute('data-ad-format', 'horizontal');
  });

  it('adds the data-ad-layout attribute only for slots that configure one', () => {
    const { container } = render(<AdBanner slot="article-list" />);
    expect(container.querySelector('ins.adsbygoogle')).toHaveAttribute('data-ad-layout', 'in-article');
  });

  it('falls back to the hero config for an unknown slot', () => {
    // @ts-expect-error intentionally invalid slot to exercise the fallback branch
    const { container } = render(<AdBanner slot="unknown-slot" />);
    expect(container.querySelector('ins.adsbygoogle')).toHaveAttribute('data-ad-format', 'auto');
  });

  it('pushes to window.adsbygoogle when it already exists', () => {
    const pushMock = vi.fn();
    vi.stubGlobal('adsbygoogle', { push: pushMock });

    render(<AdBanner slot="hero" />);

    expect(pushMock).toHaveBeenCalledWith({});
  });

  it('does not throw when window.adsbygoogle is unavailable', () => {
    expect(() => render(<AdBanner slot="hero" />)).not.toThrow();
  });

  it('swallows errors thrown while pushing to window.adsbygoogle', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('adsbygoogle', {
      push: () => {
        throw new Error('adsbygoogle push failed');
      },
    });

    expect(() => render(<AdBanner slot="hero" />)).not.toThrow();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao carregar AdSense:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});
