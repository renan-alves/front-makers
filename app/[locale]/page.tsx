import Link from 'next/link';
import type { Metadata } from 'next';
import AdBanner from '@/components/ads/AdBanner';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === 'en'
        ? 'Frontmakers - Tools and Articles for Frontend Developers'
        : 'Frontmakers - Tools and Articles for Frontend Developers',
    description:
      locale === 'en'
        ? 'Complete platform with practical tools, technical articles and essential resources for modern frontend developers.'
        : 'Complete platform with practical tools, technical articles and essential resources for modern frontend developers.',
  };
}

/**
 * Home Page Component
 * Main landing page of Frontmakers
 */
export default async function Home({ params }: Props) {
  const { locale } = await params;

  const translations = {
    en: {
      title: 'Tools and Resources for Frontend Developers',
      subtitle:
        'Accelerate your workflow with practical tools, technical articles and essential resources for modern frontend development.',
      explorTools: 'Explore Tools',
      readArticles: 'Read Articles',
      featuredTools: 'Featured Tools',
      freeTools: 'Free and ready-to-use tools. No registration required.',
      viewAllTools: 'View all tools',
      learnModern: 'Learn Modern Frontend',
      practicalArticles:
        'Practical articles about CSS, JavaScript, TypeScript, React and Next.js written by developers for developers.',
      exploreArticles: 'Explore Articles',
      fast: 'Fast and Practical',
      fastDesc:
        'Tools that work directly in the browser. No installation, no complications.',
      quality: 'Focused on Quality',
      qualityDesc:
        'In-depth technical content and tools well-designed for professional use.',
      free: '100% Free',
      freeDesc:
        'Full access to all tools and articles. No paywall, no mandatory registration.',
      useTool: 'Use tool',
    },
    pt: {
      title: 'Tools and Resources for Frontend Developers',
      subtitle:
        'Accelerate your workflow with practical tools, technical articles and essential resources for modern frontend development.',
      explorTools: 'Explore Tools',
      readArticles: 'Read Articles',
      featuredTools: 'Featured Tools',
      freeTools: 'Free and ready-to-use tools. No registration required.',
      viewAllTools: 'View all tools',
      learnModern: 'Learn Modern Frontend',
      practicalArticles:
        'Practical articles about CSS, JavaScript, TypeScript, React and Next.js written by developers for developers.',
      exploreArticles: 'Explore Articles',
      fast: 'Fast and Practical',
      fastDesc:
        'Tools that work directly in the browser. No installation, no complications.',
      quality: 'Focused on Quality',
      qualityDesc:
        'In-depth technical content and tools well-designed for professional use.',
      free: '100% Free',
      freeDesc:
        'Full access to all tools and articles. No paywall, no mandatory registration.',
      useTool: 'Use tool',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  // Featured tools
  const featuredTools = [
    {
      title: 'Box Shadow Generator',
      description:
        'Create perfect CSS shadows with real-time preview and copy-ready code.',
      href: `/${locale}/tools/box-shadow`,
      icon: '🎨',
    },
    {
      title: 'Gradient Generator',
      description:
        'Generate beautiful CSS gradients by choosing colors and directions with instant visualization.',
      href: `/${locale}/tools/gradient`,
      icon: '🌈',
    },
    {
      title: 'PX → REM Converter',
      description:
        'Convert pixels to REM easily and create responsive and accessible designs.',
      href: `/${locale}/tools/px-rem`,
      icon: '📏',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-transparent to-transparent"></div>

        <div className="container-grid relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-balance">
              {t.title.split(' for ')[0]} for
              <span className="text-[var(--color-primary)]">
                {' '}
                {t.title.split(' for ')[1]}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href={`/${locale}/tools`} className="btn-primary">
                {t.explorTools}
              </Link>
              <Link href={`/${locale}/articles`} className="btn-secondary">
                {t.readArticles}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner after Hero */}
      <section className="container-grid py-8">
        <AdBanner slot="hero" />
      </section>

      {/* Tools Section */}
      <section className="container-grid py-20">
        <div className="text-center mb-16">
          <h2 className="mb-4">{t.featuredTools}</h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            {t.freeTools}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="card group"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 transition-transform group-hover:scale-110">
                {tool.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                {tool.title}
              </h3>
              <p className="text-secondary">{tool.description}</p>

              {/* Arrow indicator */}
              <div className="mt-4 text-[var(--color-primary)] font-semibold flex items-center gap-2">
                {t.useTool}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={`/${locale}/tools`}
            className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold transition-colors"
          >
            {t.viewAllTools}
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-20">
        <div className="container-grid">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2>{t.learnModern}</h2>
            <p className="text-lg text-secondary">
              {t.practicalArticles}
            </p>
            <Link href={`/${locale}/articles`} className="btn-primary inline-block">
              {t.exploreArticles}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-grid py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-3">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold">{t.fast}</h3>
            <p className="text-secondary">
              {t.fastDesc}
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold">{t.quality}</h3>
            <p className="text-secondary">
              {t.qualityDesc}
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="text-4xl mb-4">🆓</div>
            <h3 className="text-xl font-bold">{t.free}</h3>
            <p className="text-secondary">
              {t.freeDesc}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
