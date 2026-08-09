'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

interface Props {
  params: Promise<{ locale: string }>;
}

export default function AccountOverviewPage({ params }: Props) {
  const { locale } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const t =
    locale === 'pt-br'
      ? {
          title: 'Sua conta',
          subtitle:
            'Gerencie seu perfil, artigos e contas conectadas em um so lugar.',
          personalTitle: 'Dados pessoais',
          personalBody:
            'Atualize seu perfil, avatar e senha, ou exclua sua conta.',
          personalCta: 'Gerenciar dados pessoais',
          articlesTitle: 'Seus artigos',
          articlesBody:
            'Revise artigos publicados e rascunhos, envie mudancas ou exclua.',
          articlesCta: 'Gerenciar artigos',
          loading: 'Carregando conta...',
        }
      : {
          title: 'Your account',
          subtitle:
            'Manage your profile and articles from one place.',
          personalTitle: 'Personal data',
          personalBody:
            'Update your profile, avatar, and password, or delete your account.',
          personalCta: 'Manage personal data',
          articlesTitle: 'Your articles',
          articlesBody:
            'Review your articles, submit changes, or delete.',
          articlesCta: 'Manage articles',
          loading: 'Loading account...',
        };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem('frontmakersUser');
    if (!stored) {
      window.localStorage.setItem('frontmakersRedirect', '/account');
      router.replace('/auth');
      return;
    }

    setIsLoading(false);
  }, [locale, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary">
        <section className="section-padding">
          <div className="container-grid">
            <div className="card card-static">{t.loading}</div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <section className="bg-primary border-b border-light section-padding">
        <div className="container-grid">
          <div className="max-w-4xl space-y-4">
            <h1>{t.title}</h1>
            <p className="text-lg text-secondary">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card card-static flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold">{t.personalTitle}</h2>
                <p className="text-sm text-secondary">{t.personalBody}</p>
              </div>
              <Button type="button" onClick={() => router.push('/account/personal')}>
                {t.personalCta}
              </Button>
            </div>

            <div className="card card-static flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold">{t.articlesTitle}</h2>
                <p className="text-sm text-secondary">{t.articlesBody}</p>
              </div>
              <Button
                type="button"
                onClick={() => router.push('/account/articles')}
              >
                {t.articlesCta}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
