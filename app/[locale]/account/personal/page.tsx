'use client';

import { use, useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface Props {
  params: Promise<{ locale: string }>;
}

type AccountState = {
  id: string;
  displayName: string;
  profession: string;
  email: string;
  state: string;
  country: string;
  newsletterOptIn: boolean;
  avatarDataUrl: string;
};

type PasswordState = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const emptyAccount: AccountState = {
  id: '',
  displayName: '',
  profession: '',
  email: '',
  state: '',
  country: '',
  newsletterOptIn: false,
  avatarDataUrl: '',
};

const emptyPassword: PasswordState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export default function AccountPersonalPage({ params }: Props) {
  const { locale } = use(params);
  const router = useRouter();
  const [account, setAccount] = useState<AccountState>(emptyAccount);
  const [passwordState, setPasswordState] = useState<PasswordState>(emptyPassword);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [avatarInputKey, setAvatarInputKey] = useState(0);
  const t =
    locale === 'pt-br'
      ? {
          loading: 'Carregando conta...',
          breadcrumb: 'Conta',
          title: 'Dados pessoais',
          subtitle: 'Atualize seu perfil, avatar e senha em um so lugar.',
          labels: {
            displayName: 'Nome',
            profession: 'Profissao',
            email: 'Email',
            state: 'Estado',
            country: 'Pais',
            newsletter: 'Quero receber atualizacoes da newsletter Frontmakers.',
            avatar: 'Foto de avatar',
            avatarPreview: 'Preview do avatar atual',
            removeAvatar: 'Remover avatar',
          },
          buttons: {
            save: 'Salvar alteracoes',
            saving: 'Salvando...',
            signOut: 'Sair',
            updatePassword: 'Atualizar senha',
            updating: 'Atualizando...',
            deleteAccount: 'Excluir minha conta',
          },
          password: {
            title: 'Alterar senha',
            subtitle: 'Use uma senha forte para manter sua conta protegida.',
            current: 'Senha atual',
            new: 'Nova senha',
            confirm: 'Confirmar nova senha',
            rules: {
              length: 'Pelo menos 8 caracteres',
              lower: 'Uma letra minuscula',
              upper: 'Uma letra maiuscula',
              number: 'Um numero',
              symbol: 'Um simbolo',
            },
          },
          deleteTitle: 'Excluir conta',
          deleteBody:
            'Excluir sua conta tambem remove seus artigos. Esta acao nao pode ser desfeita.',
          confirmDelete:
            'Excluir sua conta tambem remove seus artigos. Esta acao nao pode ser desfeita.',
          errors: {
            session: 'Sessao ausente. Faca login novamente.',
            avatarLoad: 'Falha ao carregar a imagem do avatar. Tente outro arquivo.',
            updateFailed: 'Falha ao atualizar conta.',
            deleteFailed: 'Falha ao excluir conta.',
            passwordFailed: 'Falha ao atualizar senha.',
            weakPassword: 'Crie uma senha mais forte antes de continuar.',
            mismatch: 'As senhas nao coincidem.',
            currentInvalid: 'Senha atual incorreta.',
          },
          success: {
            accountUpdated: 'Conta atualizada com sucesso.',
            passwordUpdated: 'Senha atualizada com sucesso.',
          },
        }
      : {
          loading: 'Loading account...',
          breadcrumb: 'Account',
          title: 'Personal data',
          subtitle: 'Update your profile, avatar, and password in one place.',
          labels: {
            displayName: 'Display name',
            profession: 'Profession',
            email: 'Email',
            state: 'State',
            country: 'Country',
            newsletter: 'I want to receive Frontmakers newsletter updates.',
            avatar: 'Avatar photo',
            avatarPreview: 'Current avatar preview',
            removeAvatar: 'Remove avatar',
          },
          buttons: {
            save: 'Save changes',
            saving: 'Saving...',
            signOut: 'Sign out',
            updatePassword: 'Update password',
            updating: 'Updating...',
            deleteAccount: 'Delete my account',
          },
          password: {
            title: 'Change password',
            subtitle: 'Use a strong password to keep your account protected.',
            current: 'Current password',
            new: 'New password',
            confirm: 'Confirm new password',
            rules: {
              length: 'At least 8 characters',
              lower: 'One lowercase letter',
              upper: 'One uppercase letter',
              number: 'One number',
              symbol: 'One symbol',
            },
          },
          deleteTitle: 'Delete account',
          deleteBody:
            'Deleting your account will also remove your articles. This action cannot be undone.',
          confirmDelete:
            'Deleting your account will also remove your articles. This action cannot be undone.',
          errors: {
            session: 'Missing account session. Please sign in again.',
            avatarLoad: 'Failed to load avatar image. Try a different file.',
            updateFailed: 'Failed to update account.',
            deleteFailed: 'Failed to delete account.',
            passwordFailed: 'Failed to update password.',
            weakPassword: 'Please create a stronger password before continuing.',
            mismatch: 'Passwords do not match.',
            currentInvalid: 'Current password is incorrect.',
          },
          success: {
            accountUpdated: 'Account updated successfully.',
            passwordUpdated: 'Password updated successfully.',
          },
        };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem('frontmakersUser');
    if (!stored) {
      window.localStorage.setItem('frontmakersRedirect', '/account/personal');
      router.replace('/auth');
      return;
    }

    try {
      const parsed = JSON.parse(stored) as {
        id: string;
        name: string;
        profession?: string;
        email: string;
        avatar?: string | null;
        state?: string;
        country?: string;
        newsletterOptIn?: boolean;
      };

      setAccount({
        id: parsed.id,
        displayName: parsed.name || '',
        profession: parsed.profession || '',
        email: parsed.email || '',
        state: parsed.state || '',
        country: parsed.country || '',
        newsletterOptIn: Boolean(parsed.newsletterOptIn),
        avatarDataUrl: parsed.avatar || '',
      });
    } catch {
      window.localStorage.removeItem('frontmakersUser');
      window.localStorage.setItem('frontmakersRedirect', '/account/personal');
      router.replace('/auth');
      return;
    }

    setIsLoading(false);
  }, [locale, router]);

  const hasAvatar = useMemo(() => Boolean(account.avatarDataUrl), [account.avatarDataUrl]);

  const passwordChecks = useMemo(
    () => [
      {
        id: 'length',
        label: t.password.rules.length,
        isValid: passwordState.newPassword.length >= 8,
      },
      {
        id: 'lower',
        label: t.password.rules.lower,
        isValid: /[a-z]/.test(passwordState.newPassword),
      },
      {
        id: 'upper',
        label: t.password.rules.upper,
        isValid: /[A-Z]/.test(passwordState.newPassword),
      },
      {
        id: 'number',
        label: t.password.rules.number,
        isValid: /\d/.test(passwordState.newPassword),
      },
      {
        id: 'symbol',
        label: t.password.rules.symbol,
        isValid: /[^A-Za-z0-9]/.test(passwordState.newPassword),
      },
    ],
    [
      passwordState.newPassword,
      t.password.rules.length,
      t.password.rules.lower,
      t.password.rules.upper,
      t.password.rules.number,
      t.password.rules.symbol,
    ]
  );

  const isPasswordStrong = passwordChecks.every((check) => check.isValid);

  const handleAccountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setAccount((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordState((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setAccount((previous) => ({ ...previous, avatarDataUrl: '' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setAccount((previous) => ({ ...previous, avatarDataUrl: result }));
    };
    reader.onerror = () => {
      setErrorMessage(t.errors.avatarLoad);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAccount((previous) => ({ ...previous, avatarDataUrl: '' }));
    setAvatarInputKey((previous) => previous + 1);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!account.id) {
      setErrorMessage(t.errors.session);
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/account/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: account.id,
          displayName: account.displayName,
          profession: account.profession,
          email: account.email,
          state: account.state,
          country: account.country,
          newsletterOptIn: account.newsletterOptIn,
          avatarDataUrl: account.avatarDataUrl,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update account.');
      }

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('frontmakersUser', JSON.stringify(data.user));
        window.dispatchEvent(new Event('frontmakers-auth'));
      }

      setSuccessMessage(t.success.accountUpdated);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t.errors.updateFailed);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!account.id) {
      setPasswordError(t.errors.session);
      return;
    }

    if (!isPasswordStrong) {
      setPasswordError(t.errors.weakPassword);
      return;
    }

    if (passwordState.newPassword !== passwordState.confirmPassword) {
      setPasswordError(t.errors.mismatch);
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const response = await fetch('/api/account/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: account.id,
          currentPassword: passwordState.currentPassword,
          newPassword: passwordState.newPassword,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update password.');
      }
      setPasswordSuccess(t.success.passwordUpdated);
      setPasswordState(emptyPassword);
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : t.errors.passwordFailed);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!account.id) {
      return;
    }

    const confirmed = window.confirm(t.confirmDelete);

    if (!confirmed) {
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/account/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: account.id }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete account.');
      }

      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('frontmakersUser');
        window.dispatchEvent(new Event('frontmakers-auth'));
      }

      router.replace('/auth');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t.errors.deleteFailed);
    }
  };

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('frontmakersUser');
      window.dispatchEvent(new Event('frontmakers-auth'));
    }
    router.replace('/auth');
  };

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
              <Link href="/account" className="hover:text-primary">
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
          <div className="card card-static space-y-8">
            <form onSubmit={handleSave} className="space-y-6">
              {successMessage && (
                <div className="p-4 bg-[var(--color-success-soft)] border border-[var(--color-success)] rounded-lg">
                  <p className="text-sm text-[var(--color-success)] font-medium">{successMessage}</p>
                </div>
              )}

              {errorMessage && (
                <div className="p-4 bg-[var(--color-error-soft)] border border-[var(--color-error)] rounded-lg">
                  <p className="text-sm text-[var(--color-error)] font-medium">{errorMessage}</p>
                </div>
              )}

              <div>
                <label htmlFor="displayName" className="label">
                  {t.labels.displayName}
                </label>
                <input
                  id="displayName"
                  name="displayName"
                  className="input"
                  value={account.displayName}
                  onChange={handleAccountChange}
                  required
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
                  value={account.profession}
                  onChange={handleAccountChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="label">
                  {t.labels.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input"
                  value={account.email}
                  onChange={handleAccountChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="state" className="label">
                    {t.labels.state}
                  </label>
                  <input
                    id="state"
                    name="state"
                    className="input"
                    value={account.state}
                    onChange={handleAccountChange}
                    required
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
                    value={account.country}
                    onChange={handleAccountChange}
                    required
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 text-sm text-secondary">
                <input
                  type="checkbox"
                  name="newsletterOptIn"
                  className="mt-1"
                  checked={account.newsletterOptIn}
                  onChange={handleAccountChange}
                />
                {t.labels.newsletter}
              </label>

              <div>
                <label htmlFor="avatar" className="label">
                  {t.labels.avatar}
                </label>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  className="input"
                  key={avatarInputKey}
                  onChange={handleAvatarChange}
                />
                {hasAvatar && (
                  <div className="mt-3 flex items-center gap-3">
                    <Image
                      src={account.avatarDataUrl}
                      alt="Avatar preview"
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover border border-light"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-secondary">{t.labels.avatarPreview}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveAvatar}
                        className="px-0 justify-start text-secondary"
                      >
                        {t.labels.removeAvatar}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? t.buttons.saving : t.buttons.save}
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={handleSignOut}>
                  {t.buttons.signOut}
                </Button>
              </div>
            </form>

            <div className="border-t border-light pt-8 space-y-5">
              <div>
                <h2 className="text-xl font-bold">{t.password.title}</h2>
                <p className="text-sm text-secondary">
                  {t.password.subtitle}
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                {passwordSuccess && (
                  <div className="p-4 bg-[var(--color-success-soft)] border border-[var(--color-success)] rounded-lg">
                    <p className="text-sm text-[var(--color-success)] font-medium">{passwordSuccess}</p>
                  </div>
                )}

                {passwordError && (
                  <div className="p-4 bg-[var(--color-error-soft)] border border-[var(--color-error)] rounded-lg">
                    <p className="text-sm text-[var(--color-error)] font-medium">{passwordError}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="currentPassword" className="label">
                    {t.password.current}
                  </label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    className="input"
                    value={passwordState.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="newPassword" className="label">
                    {t.password.new}
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    className="input"
                    value={passwordState.newPassword}
                    onChange={handlePasswordChange}
                    required
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
                    {t.password.confirm}
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="input"
                    value={passwordState.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <Button type="submit" disabled={isUpdatingPassword}>
                  {isUpdatingPassword ? t.buttons.updating : t.buttons.updatePassword}
                </Button>
              </form>
            </div>

            <div className="border-t border-light pt-8 space-y-3">
              <h2 className="text-lg font-semibold">{t.deleteTitle}</h2>
              <p className="text-sm text-secondary">
                {t.deleteBody}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleDeleteAccount}
                className="text-[var(--color-error)]"
              >
                {t.buttons.deleteAccount}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
