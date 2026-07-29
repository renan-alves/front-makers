'use client';

import { use, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import SocialAuthButton from '@/components/ui/SocialAuthButton';

interface Props {
  params: Promise<{ locale: string }>;
}

type AuthMode = 'login' | 'signup';

type SignupState = {
  displayName: string;
  profession: string;
  email: string;
  regionState: string;
  country: string;
  newsletterOptIn: boolean;
  password: string;
  confirmPassword: string;
};

type LoginState = {
  email: string;
  password: string;
};

const initialSignupState: SignupState = {
  displayName: '',
  profession: '',
  email: '',
  regionState: '',
  country: '',
  newsletterOptIn: false,
  password: '',
  confirmPassword: '',
};

const initialLoginState: LoginState = {
  email: '',
  password: '',
};

export default function AuthPage({ params }: Props) {
  const { locale } = use(params);
  const router = useRouter();
  const t =
    locale === 'pt-br'
      ? {
          title: 'Entrar ou criar sua conta',
          subtitle:
            'Junte-se a Frontmakers para publicar artigos, iniciar discussoes e compartilhar conhecimento.',
          tabs: { login: 'Entrar', signup: 'Criar conta' },
          social: 'Ou use email',
          labels: {
            displayName: 'Nome',
            profession: 'Profissao',
            email: 'Email',
            state: 'Estado',
            country: 'Pais',
            password: 'Senha',
            confirmPassword: 'Confirmar senha',
          },
          placeholders: {
            name: 'Seu nome',
            email: 'voce@email.com',
            state: 'Estado',
            country: 'Pais',
            profession: 'Desenvolvedor Frontend',
          },
          passwordRules: {
            length: 'Pelo menos 8 caracteres',
            lower: 'Uma letra minuscula',
            upper: 'Uma letra maiuscula',
            number: 'Um numero',
            symbol: 'Um simbolo',
          },
          newsletter: 'Quero receber atualizacoes da newsletter Frontmakers.',
          createAccount: 'Criar conta',
          creatingAccount: 'Criando conta...',
          signIn: 'Entrar',
          signingIn: 'Entrando...',
          terms:
            'Ao criar uma conta, voce concorda com nossa Politica de Privacidade e Termos de Uso (em breve).',
          noAccount: 'Ainda nao tem conta?',
          createNow: 'Crie agora',
          successCreate: 'Conta criada com sucesso. Voce ja pode entrar.',
          errors: {
            weakPassword: 'Crie uma senha mais forte antes de continuar.',
            mismatch: 'As senhas nao coincidem.',
            missingLogin: 'Informe seu email e senha.',
          },
          sidebarTitle: 'Por que entrar na Frontmakers?',
          sidebarItems: [
            'Publique artigos e construa seu perfil de autor.',
            'Inicie discussoes e compartilhe aprendizados praticos.',
            'Acesse ferramentas gratuitas para fluxos frontend.',
            'Tenha acesso antecipado a novidades da comunidade.',
          ],
          backHome: 'Voltar para a Home',
          backHomePrefix: 'Ja explorando? Volte para ',
        }
      : {
          title: 'Sign in or create your account',
          subtitle:
            'Join Frontmakers to publish articles, start discussions, and share your knowledge.',
          tabs: { login: 'Login', signup: 'Sign up' },
          social: 'Or use email',
          labels: {
            displayName: 'Display name',
            profession: 'Profession',
            email: 'Email',
            state: 'State',
            country: 'Country',
            password: 'Password',
            confirmPassword: 'Confirm password',
          },
          placeholders: {
            name: 'Your name',
            email: 'you@email.com',
            state: 'State',
            country: 'Country',
            profession: 'Frontend Developer',
          },
          passwordRules: {
            length: 'At least 8 characters',
            lower: 'One lowercase letter',
            upper: 'One uppercase letter',
            number: 'One number',
            symbol: 'One symbol',
          },
          newsletter: 'I want to receive Frontmakers newsletter updates.',
          createAccount: 'Create account',
          creatingAccount: 'Creating account...',
          signIn: 'Sign in',
          signingIn: 'Signing in...',
          terms:
            'By creating an account, you agree to our Privacy Policy and Terms of Use (coming soon).',
          noAccount: 'No account yet?',
          createNow: 'Create one now',
          successCreate: 'Account created successfully. You can sign in now.',
          errors: {
            weakPassword: 'Please create a stronger password before continuing.',
            mismatch: 'Passwords do not match.',
            missingLogin: 'Please enter your email and password.',
          },
          sidebarTitle: 'Why join Frontmakers?',
          sidebarItems: [
            'Publish articles and build your author profile.',
            'Start discussions and share practical learnings.',
            'Access free tools designed for frontend workflows.',
            'Get early access to upcoming community features.',
          ],
          backHome: 'Home',
          backHomePrefix: 'Already exploring? Go back to ',
        };
  const [mode, setMode] = useState<AuthMode>('login');
  const [signupState, setSignupState] = useState<SignupState>(initialSignupState);
  const [loginState, setLoginState] = useState<LoginState>(initialLoginState);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordChecks = useMemo(
    () => [
      {
        id: 'length',
        label: t.passwordRules.length,
        isValid: signupState.password.length >= 8,
      },
      {
        id: 'lower',
        label: t.passwordRules.lower,
        isValid: /[a-z]/.test(signupState.password),
      },
      {
        id: 'upper',
        label: t.passwordRules.upper,
        isValid: /[A-Z]/.test(signupState.password),
      },
      {
        id: 'number',
        label: t.passwordRules.number,
        isValid: /\d/.test(signupState.password),
      },
      {
        id: 'symbol',
        label: t.passwordRules.symbol,
        isValid: /[^A-Za-z0-9]/.test(signupState.password),
      },
    ],
    [
      signupState.password,
      t.passwordRules.length,
      t.passwordRules.lower,
      t.passwordRules.upper,
      t.passwordRules.number,
      t.passwordRules.symbol,
    ]
  );

  const isPasswordStrong = passwordChecks.every((check) => check.isValid);

  const handleSignupChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const fieldValue =
      type === 'checkbox' && event.target instanceof HTMLInputElement
        ? event.target.checked
        : value;
    setSignupState((previous) => ({
      ...previous,
      [name]: fieldValue,
    }));
  };


  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginState((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSignupSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!isPasswordStrong) {
      setFormError(t.errors.weakPassword);
      return;
    }

    if (signupState.password !== signupState.confirmPassword) {
      setFormError(t.errors.mismatch);
      return;
    }

    setIsSubmitting(true);
    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        displayName: signupState.displayName,
        profession: signupState.profession,
        email: signupState.email,
        state: signupState.regionState,
        country: signupState.country,
        newsletterOptIn: signupState.newsletterOptIn,
        password: signupState.password,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to create account.');
        }
        setFormSuccess(t.successCreate);
        setMode('login');
        setSignupState(initialSignupState);
      })
      .catch((error) => {
        setFormError(error instanceof Error ? error.message : 'Failed to create account.');
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!loginState.email || !loginState.password) {
      setFormError(t.errors.missingLogin);
      return;
    }

    setIsSubmitting(true);
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: loginState.email,
        password: loginState.password,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to sign in.');
        }
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('frontmakersUser', JSON.stringify(data.user));
          window.dispatchEvent(new Event('frontmakers-auth'));
        }
        const redirectTarget =
          typeof window !== 'undefined'
            ? window.localStorage.getItem('frontmakersRedirect')
            : null;
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('frontmakersRedirect');
        }
        const safeTarget =
          redirectTarget && redirectTarget.startsWith('/') && !redirectTarget.includes('/auth')
            ? redirectTarget
            : `/${locale}`;
        router.replace(safeTarget);
      })
      .catch((error) => {
        setFormError(error instanceof Error ? error.message : 'Failed to sign in.');
      })
      .finally(() => setIsSubmitting(false));
  };

  const isSignupMode = mode === 'signup';

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
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
            <div className="card card-static space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setFormError('');
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    mode === 'login'
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                      : 'bg-primary text-secondary border-light hover:text-primary'
                  }`}
                >
                  {t.tabs.login}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setFormError('');
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    mode === 'signup'
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                      : 'bg-primary text-secondary border-light hover:text-primary'
                  }`}
                >
                  {t.tabs.signup}
                </button>
              </div>

              <div className="grid gap-3">
                <SocialAuthButton provider="google" />
                <SocialAuthButton provider="linkedin" />
                <SocialAuthButton provider="github" />
              </div>

              <div className="flex items-center gap-3">
                <span className="h-px bg-[var(--color-border)] flex-1" />
                <span className="text-xs uppercase tracking-wide text-secondary">{t.social}</span>
                <span className="h-px bg-[var(--color-border)] flex-1" />
              </div>

              {formSuccess && (
                <div className="p-4 bg-[var(--color-success-soft)] border border-[var(--color-success)] rounded-lg">
                  <p className="text-sm text-[var(--color-success)] font-medium">{formSuccess}</p>
                </div>
              )}

              {formError && (
                <div className="p-4 bg-[var(--color-error-soft)] border border-[var(--color-error)] rounded-lg">
                  <p className="text-sm text-[var(--color-error)] font-medium">{formError}</p>
                </div>
              )}

              {isSignupMode ? (
                <form onSubmit={handleSignupSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="displayName" className="label">
                      {t.labels.displayName}
                    </label>
                    <input
                      id="displayName"
                      name="displayName"
                      className="input"
                      value={signupState.displayName}
                      onChange={handleSignupChange}
                      required
                      placeholder={t.placeholders.name}
                    />
                  </div>

                  <div>
                    <label htmlFor="profession" className="label">
                      {t.labels.profession}
                    </label>
                    <input
                      id="profession"
                      name="profession"
                      className="input"
                      value={signupState.profession}
                      onChange={handleSignupChange}
                      placeholder={t.placeholders.profession}
                    />
                  </div>

                  <div>
                    <label htmlFor="signupEmail" className="label">
                      {t.labels.email}
                    </label>
                    <input
                      id="signupEmail"
                      name="email"
                      type="email"
                      className="input"
                      value={signupState.email}
                      onChange={handleSignupChange}
                      required
                      placeholder={t.placeholders.email}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="regionState" className="label">
                        {t.labels.state}
                      </label>
                      <input
                        id="regionState"
                        name="regionState"
                        className="input"
                        value={signupState.regionState}
                        onChange={handleSignupChange}
                        required
                        placeholder={t.placeholders.state}
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="label">
                        {t.labels.country}
                      </label>
                      <input
                        id="country"
                        name="country"
                        className="input"
                        value={signupState.country}
                        onChange={handleSignupChange}
                        required
                        placeholder={t.placeholders.country}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="label">
                      {t.labels.password}
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="input"
                      value={signupState.password}
                      onChange={handleSignupChange}
                      required
                      autoComplete="new-password"
                    />
                    <ul className="mt-3 space-y-2 text-sm">
                      {passwordChecks.map((check) => (
                        <li
                          key={check.id}
                          className={check.isValid ? 'text-success' : 'text-secondary'}
                        >
                          {check.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="label">
                      {t.labels.confirmPassword}
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="input"
                      value={signupState.confirmPassword}
                      onChange={handleSignupChange}
                      required
                      autoComplete="new-password"
                    />
                  </div>

                  <label className="flex items-start gap-3 text-sm text-secondary">
                    <input
                      type="checkbox"
                      name="newsletterOptIn"
                      className="mt-1"
                      checked={signupState.newsletterOptIn}
                      onChange={handleSignupChange}
                    />
                    {t.newsletter}
                  </label>

                  <Button type="submit" className="w-full">
                    {isSubmitting ? t.creatingAccount : t.createAccount}
                  </Button>

                  <p className="text-xs text-secondary">{t.terms}</p>
                </form>
              ) : (
                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="loginEmail" className="label">
                      {t.labels.email}
                    </label>
                    <input
                      id="loginEmail"
                      name="email"
                      type="email"
                      className="input"
                      value={loginState.email}
                      onChange={handleLoginChange}
                      required
                      placeholder={t.placeholders.email}
                    />
                  </div>

                  <div>
                    <label htmlFor="loginPassword" className="label">
                      {t.labels.password}
                    </label>
                    <input
                      id="loginPassword"
                      name="password"
                      type="password"
                      className="input"
                      value={loginState.password}
                      onChange={handleLoginChange}
                      required
                      autoComplete="current-password"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    {isSubmitting ? t.signingIn : t.signIn}
                  </Button>

                  <p className="text-sm text-secondary">
                    {t.noAccount}{' '}
                    <button
                      type="button"
                      className="text-[var(--color-primary)] font-semibold hover:underline"
                      onClick={() => setMode('signup')}
                    >
                      {t.createNow}
                    </button>
                    .
                  </p>
                </form>
              )}
            </div>

            <aside className="card card-static space-y-4">
              <h2 className="text-2xl font-bold">{t.sidebarTitle}</h2>
              <ul className="space-y-3 text-secondary">
                {t.sidebarItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="pt-4 border-t border-light">
                <p className="text-sm text-secondary">
                  {t.backHomePrefix}
                  <Link href={`/${locale}`} className="text-[var(--color-primary)] font-semibold">
                    {t.backHome}
                  </Link>
                  .
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
