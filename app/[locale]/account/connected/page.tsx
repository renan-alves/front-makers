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
      window.localStorage.setItem('frontmakersRedirect', '/account');
      router.replace('/auth');
      return;
    }

    router.replace('/account');
  }, [locale, router]);

  if (isLoading) {
    return null;
  }

  return null;
}
