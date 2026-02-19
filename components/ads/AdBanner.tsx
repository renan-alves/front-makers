'use client';

import { useEffect } from 'react';

/**
 * AdBanner Component
 * 
 * Component to display Google AdSense ads
 * Prepared to avoid SSR and CLS (Cumulative Layout Shift) errors
 * 
 * Available slots:
 * - hero: after home page hero
 * - article-list: between articles in listing
 * - article-content: inside article content
 * - tool-end: at the end of tools
 * - footer: in the footer
 * 
 * How to use:
 * 1. Add your AdSense ID in the layout.tsx script
 * 2. Create slots in Google AdSense
 * 3. Replace the data-ad-slot below with your IDs
 */

type SlotType = 'hero' | 'article-list' | 'article-content' | 'tool-end' | 'footer';

interface AdBannerProps {
  slot: SlotType;
  className?: string;
}

interface SlotConfig {
  style: React.CSSProperties;
  format: string;
  responsive?: string;
  layout?: string;
}

const slotConfigs: Record<SlotType, SlotConfig> = {
  hero: {
    style: { minHeight: '250px' },
    format: 'auto',
    responsive: 'true',
  },
  'article-list': {
    style: { minHeight: '280px' },
    format: 'fluid',
    layout: 'in-article',
  },
  'article-content': {
    style: { minHeight: '280px' },
    format: 'fluid',
    layout: 'in-article',
  },
  'tool-end': {
    style: { minHeight: '200px' },
    format: 'auto',
    responsive: 'true',
  },
  footer: {
    style: { minHeight: '90px' },
    format: 'horizontal',
    responsive: 'true',
  },
};

export default function AdBanner({ slot, className = '' }: AdBannerProps) {
  useEffect(() => {
    try {
      // Carrega os anúncios após o componente montar
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('Erro ao carregar AdSense:', err);
    }
  }, []);

  const config = slotConfigs[slot] || slotConfigs.hero;

  return (
    <div
      className={`ad-banner w-full flex items-center justify-center bg-neutral-50 rounded-lg border border-light overflow-hidden ${className}`}
      style={config.style}
    >
      {/* Google AdSense */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={`slot-${slot}`}
        data-ad-format={config.format}
        data-full-width-responsive={config.responsive}
        {...(config.layout && { 'data-ad-layout': config.layout })}
      />

      {/* Placeholder for development (remove in production) */}
      <div className="text-center p-8 text-secondary text-sm">
        <div className="font-medium mb-2">Ad Space Reserved</div>
        <div className="text-xs opacity-60">Slot: {slot}</div>
        <div className="text-xs opacity-60 mt-1">
          Configure your Google AdSense in production
        </div>
      </div>
    </div>
  );
}
