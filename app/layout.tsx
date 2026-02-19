import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Configuração da fonte Inter
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Root metadata - basic setup only
// Locale-specific metadata is handled in [locale]/layout.tsx
export const metadata: Metadata = {
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Google AdSense - Add your ID when ready */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        ></script> */}
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
