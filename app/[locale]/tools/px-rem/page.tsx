import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function PxRemToolComingSoon({ params }: Props) {
  const { locale } = await params;
  const t =
    locale === 'pt-br'
      ? {
          tools: 'Ferramentas',
          title: 'Conversor PX para REM',
          subtitle: 'Esta ferramenta esta sendo reconstruida. Uma nova versao em breve.',
          soonTitle: 'Em breve',
          soonBody: 'Estamos ajustando esta ferramenta para lancar com uma melhor experiencia.',
          cta: 'Ver artigos',
        }
      : {
          tools: 'Tools',
          title: 'PX to REM Converter',
          subtitle: 'This tool is being rebuilt. A new version is coming soon.',
          soonTitle: 'Coming soon',
          soonBody: 'We are polishing this tool so it can launch with a better experience.',
          cta: 'Browse articles instead',
        };

  return (
    <div className="min-h-screen bg-secondary">
      <section className="bg-primary border-b border-light py-16">
        <div className="container-grid">
          <div className="max-w-3xl">
            <div className="text-sm text-secondary">
              <Link href="/tools" className="hover:text-primary">
                {t.tools}
              </Link>{' '}
              / {t.title}
            </div>
            <h1 className="mb-4">{t.title}</h1>
            <p className="text-xl text-secondary">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="container-grid py-12">
        <div className="max-w-2xl mx-auto card card-static text-center space-y-4">
          <h2 className="text-2xl font-bold">{t.soonTitle}</h2>
          <p className="text-secondary">{t.soonBody}</p>
          <Link href="/articles" className="btn-secondary">
            {t.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
