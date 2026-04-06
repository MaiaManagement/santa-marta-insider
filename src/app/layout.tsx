import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WebSiteSchema } from '@/components/SchemaOrg';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://santamartainsider.com'),
  title: {
    default: 'Santa Marta Insider — Tu guía del Caribe colombiano',
    template: '%s | Santa Marta Insider',
  },
  description: 'Tu guía definitiva del Caribe colombiano. Guías de viaje, bienes raíces, gastronomía, legal y más sobre Santa Marta, Colombia.',
  keywords: ['Santa Marta', 'Colombia', 'Caribe', 'guía', 'bienes raíces', 'turismo', 'vida en Colombia'],
  authors: [{ name: 'Santa Marta Insider' }],
  creator: 'The Maia Group',
  publisher: 'Santa Marta Insider',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://santamartainsider.com',
    siteName: 'Santa Marta Insider',
    title: 'Santa Marta Insider — Tu guía del Caribe colombiano',
    description: 'Tu guía definitiva del Caribe colombiano. Guías de viaje, bienes raíces, gastronomía, legal y más.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Santa Marta Insider',
    description: 'Tu guía definitiva del Caribe colombiano.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <WebSiteSchema />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream min-h-screen flex flex-col">
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2469196723812841"
          crossOrigin="anonymous"
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
