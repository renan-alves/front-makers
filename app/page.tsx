import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';

/**
 * Root Page
 * Redirects to default locale
 */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
