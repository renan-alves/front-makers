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
 * 1. Set NEXT_PUBLIC_ADSENSE_ID (env var) with your publisher ID (ca-pub-...)
 * 2. Create an ad unit per slot in the Google AdSense dashboard
 * 3. Replace the placeholder values in SLOT_IDS below with the real ad unit IDs
 */

type SlotType = 'hero' | 'article-list' | 'article-content' | 'article-bottom' | 'tool-end' | 'footer';

// TODO: replace with the real ad unit IDs from your Google AdSense dashboard
const SLOT_IDS: Record<SlotType, string> = {
  hero: 'REPLACE_WITH_HERO_SLOT_ID',
  'article-list': '5672659300',
  'article-content': '3208333408',
  'article-bottom': '9093029561',
  'tool-end': 'REPLACE_WITH_TOOL_END_SLOT_ID',
  footer: '4062250079',
};

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
  'article-bottom': {
    style: { minHeight: '280px' },
    format: 'auto',
    responsive: 'true',
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
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  return (
    <div
      className={`ad-banner w-full flex items-center justify-center bg-neutral-50 rounded-lg border border-light overflow-hidden ${className}`}
      style={config.style}
    >
      {/* Google AdSense */}
      <ins
        className="adsbygoogle"
        style={config.layout ? { display: 'block', textAlign: 'center' } : { display: 'block', width: '100%' }}
        data-ad-client={adsenseId}
        data-ad-slot={SLOT_IDS[slot] || SLOT_IDS.hero}
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
