import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WebSiteSchema } from '@/components/SchemaOrg';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ruta-colombia.com'),
  title: {
    default: 'Ruta Colombia — Your Guide to Colombia',
    template: '%s | Ruta Colombia',
  },
  description: 'Your definitive guide to Colombia. Travel guides, real estate, food & drink, legal, and more — starting with Medellín and Santa Marta.',
  keywords: ['Colombia', 'Medellín', 'Santa Marta', 'travel guide', 'real estate', 'tourism', 'expat Colombia'],
  authors: [{ name: 'Ruta Colombia' }],
  creator: 'The Maia Group',
  publisher: 'Ruta Colombia',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ruta-colombia.com',
    siteName: 'Ruta Colombia',
    title: 'Ruta Colombia — Your Guide to Colombia',
    description: 'Your definitive guide to Colombia. Travel guides, real estate, food & drink, legal, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruta Colombia',
    description: 'Your definitive guide to Colombia.',
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
    <html lang="en">
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
