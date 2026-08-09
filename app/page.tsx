import HomePage from './[locale]/page';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

/**
 * Root Page
 * Keeps the site on the English-only root URL.
 */
export default function RootPage({
  searchParams,
}: {
  searchParams?: Promise<{ filter?: string }>;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HomePage
          params={Promise.resolve({ locale: 'en' })}
          searchParams={searchParams ?? Promise.resolve({})}
        />
      </main>
      <Footer />
    </>
  );
}
