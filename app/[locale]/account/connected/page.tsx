'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SocialAuthButton from '@/components/ui/SocialAuthButton';

interface Props {
  params: Promise<{ locale: string }>;
}

export default function AccountConnectedPage({ params }: Props) {
  const { locale } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const t =
    locale === 'pt-br'
      ? {
          loading: 'Carregando contas conectadas...',
          breadcrumb: 'Conta',
          title: 'Contas conectadas',
          subtitle:
            'Conecte perfis sociais para login mais rapido e visibilidade na comunidade.',
          sectionTitle: 'Conexoes sociais',
          sectionBody:
            'Escolha um provedor para conectar. Voce pode gerenciar ou remover depois.',
          sideTitle: 'Por que conectar?',
          sideItems: [
            'Use login com um toque em diferentes dispositivos.',
            'Mostre perfis verificados no seu card de autor.',
            'Recupere acesso mais rapido se esquecer sua senha.',
          ],
          sideNote: 'Nunca publicaremos nada sem sua permissao.',
        }
      : {
          loading: 'Loading connected accounts...',
          breadcrumb: 'Account',
          title: 'Connected accounts',
          subtitle:
            'Link your social profiles for faster sign-ins and visibility across the community.',
          sectionTitle: 'Social connections',
          sectionBody:
            'Choose a provider to connect. You can manage or remove connections later.',
          sideTitle: 'Why connect?',
          sideItems: [
            'Use one-tap sign-in across devices.',
            'Show verified profiles on your author card.',
            'Recover access faster if you forget your password.',
          ],
          sideNote: 'We will never post without your permission.',
        };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem('frontmakersUser');
    if (!stored) {
      window.localStorage.setItem('frontmakersRedirect', `/${locale}/account/connected`);
      router.replace(`/${locale}/auth`);
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
          <div className="max-w-4xl space-y-3">
            <div className="text-sm text-secondary">
              <Link href={`/${locale}/account`} className="hover:text-primary">
                {t.breadcrumb}
              </Link>{' '}
              / {t.title}
            </div>
            <h1>{t.title}</h1>
            <p className="text-lg text-secondary">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
            <div className="card card-static space-y-5">
              <div>
                <h2 className="text-xl font-bold">{t.sectionTitle}</h2>
                <p className="text-sm text-secondary">{t.sectionBody}</p>
              </div>
              <div className="grid gap-3">
                <SocialAuthButton provider="google" />
                <SocialAuthButton provider="linkedin" />
                <SocialAuthButton provider="github" />
              </div>
            </div>

            <div className="card card-static space-y-4">
              <h3 className="text-lg font-semibold">{t.sideTitle}</h3>
              <ul className="space-y-3 text-sm text-secondary">
                {t.sideItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="rounded-lg border border-dashed border-light p-4 text-sm text-secondary">
                {t.sideNote}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
