import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'en' ? 'Tools' : 'Tools',
    description:
      locale === 'en'
        ? 'Free tools for frontend developers: CSS generators, converters and much more.'
        : 'Free tools for frontend developers: CSS generators, converters and much more.',
  };
}

/**
 * Tools Page - Tools Listing
 */
export default async function ToolsPage({ params }: Props) {
  const { locale } = await params;

  const translations = {
    en: {
      title: 'Tools',
      subtitle:
        'Free and ready-to-use tools. Accelerate your frontend development with CSS generators, converters and much more. No registration required.',
      useTool: 'Use tool',
      comingSoon: 'More tools coming soon',
      description: 'We are working on new useful tools for developers.',
    },
    pt: {
      title: 'Tools',
      subtitle:
        'Free and ready-to-use tools. Accelerate your frontend development with CSS generators, converters and much more. No registration required.',
      useTool: 'Use tool',
      comingSoon: 'More tools coming soon',
      description: 'We are working on new useful tools for developers.',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  const tools = [
    {
      title: 'Box Shadow Generator',
      description:
        'Create perfect CSS shadows with intuitive controls. Adjust X, Y, blur, spread and color with real-time preview. Copy ready-to-use CSS code.',
      href: `/${locale}/tools/box-shadow`,
      icon: '🎨',
      category: 'CSS',
    },
    {
      title: 'Gradient Generator',
      description:
        'Generate beautiful CSS gradients by choosing two colors and the direction. Visualize the result instantly and copy the complete CSS code.',
      href: `/${locale}/tools/gradient`,
      icon: '🌈',
      category: 'CSS',
    },
    {
      title: 'PX → REM Converter',
      description:
        'Convert pixels to REM easily. Set a custom base and get precise REM values to create responsive and accessible designs.',
      href: `/${locale}/tools/px-rem`,
      icon: '📏',
      category: 'CSS',
    },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <section className="bg-primary border-b border-light py-16">
        <div className="container-grid">
          <div className="max-w-3xl">
            <h1 className="mb-4">{t.title}</h1>
            <p className="text-xl text-secondary">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container-grid py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="card group h-full flex flex-col"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 transition-transform group-hover:scale-110">
                {tool.icon}
              </div>

              {/* Category Badge */}
              <div className="mb-3">
                <span className="text-xs px-3 py-1 bg-[var(--color-accent-blue-soft)] text-accent-blue rounded-full font-semibold">
                  {tool.category}
                </span>
              </div>

              {/* Content */}
              <h2 className="text-xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                {tool.title}
              </h2>
              <p className="text-secondary mb-4 flex-1">{tool.description}</p>

              {/* Arrow indicator */}
              <div className="text-[var(--color-primary)] font-semibold flex items-center gap-2">
                {t.useTool}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-16 max-w-2xl mx-auto text-center p-8 bg-primary border-2 border-dashed border-light rounded-xl">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold mb-3">{t.comingSoon}</h3>
          <p className="text-secondary">
            {t.description}
            frontend. Fique ligado!
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-grid py-16">
        <div className="max-w-3xl mx-auto text-center p-8 bg-neutral-50 border-2 border-[var(--color-border)] rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Aprenda enquanto desenvolve
          </h2>
          <p className="text-secondary text-lg mb-6">
            Confira nossos artigos técnicos sobre CSS, JavaScript, React e
            desenvolvimento frontend moderno.
          </p>
          <Link href="/articles" className="btn-primary">
            Ver Artigos
          </Link>
        </div>
      </section>
    </div>
  );
}
