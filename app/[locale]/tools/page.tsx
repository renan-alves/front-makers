import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'pt-br' ? 'Ferramentas · Em breve' : 'Tools · Coming soon',
    description:
      locale === 'pt-br'
        ? 'Nossas ferramentas estao em breve. Estamos trabalhando em utilitarios para devs frontend.'
        : 'Our tools are coming soon. We are working on helpful utilities for frontend developers.',
  };
}

export default async function ToolsPage({ params }: Props) {
  const { locale } = await params;
  const t =
    locale === 'pt-br'
      ? {
          title: 'Ferramentas',
          subtitle:
            'Estamos reconstruindo a experiencia de ferramentas. Novas versoes em breve.',
          soonTitle: 'Em breve',
          soonBody:
            'Estamos trabalhando em um novo conjunto de utilitarios para times frontend. Volte em breve.',
          cta: 'Ver artigos',
        }
      : {
          title: 'Tools',
          subtitle:
            'We are rebuilding the tools experience. New releases are coming soon.',
          soonTitle: 'Coming soon',
          soonBody:
            'We are working on a new set of utilities for frontend teams. Check back soon.',
          cta: 'Browse articles instead',
        };

  return (
    <div className="min-h-screen bg-secondary">
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

      <section className="container-grid py-12">
        <div className="max-w-3xl mx-auto card card-static text-center space-y-4">
          <h2 className="text-2xl font-bold">{t.soonTitle}</h2>
          <p className="text-secondary">{t.soonBody}</p>
          <Link href={`/${locale}/articles`} className="btn-secondary">
            {t.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
