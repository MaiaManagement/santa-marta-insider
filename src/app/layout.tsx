import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WebSiteSchema } from '@/components/SchemaOrg';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ruta-colombia.com'),
  other: {
    'google-adsense-account': 'ca-pub-2469196723812841',
  },
  title: {
    default: 'Ruta Colombia — Your Definitive Guide to Living in Colombia',
    template: '%s | Ruta Colombia',
  },
  description:
    'Your definitive guide to living, working, investing, and exploring Colombia. Expert local coverage of Medellín, Santa Marta, and beyond — for expats, digital nomads, investors, and tourists.',
  keywords: [
    'Colombia',
    'Medellín',
    'Santa Marta',
    'expat Colombia',
    'digital nomad Colombia',
    'invest in Colombia',
    'living in Colombia',
    'real estate Colombia',
    'Colombia travel guide',
  ],
  authors: [{ name: 'Ruta Colombia' }],
  creator: 'The Maia Group',
  publisher: 'Ruta Colombia',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ruta-colombia.com',
    siteName: 'Ruta Colombia',
    title: 'Ruta Colombia — Your Definitive Guide to Living in Colombia',
    description:
      'Expert guides on real estate, legal, food, jobs, and lifestyle across Colombia — written by local professionals.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruta Colombia',
    description: 'Your definitive guide to living in Colombia.',
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

        {/* WhatsApp float button */}
        <a
          href="https://wa.me/573226026526"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed bottom-6 right-5 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:bg-[#1ebe5e] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-7 h-7 fill-white"
            aria-hidden="true"
          >
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.476 2.027 7.782L0 32l8.432-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0Zm8.27 22.516c-.344.968-2.01 1.85-2.763 1.97-.707.112-1.598.16-2.578-.162-.595-.194-1.358-.453-2.335-.887-4.11-1.776-6.79-5.918-6.995-6.19-.205-.274-1.67-2.22-1.67-4.23s1.057-3.003 1.432-3.414c.375-.41.819-.513 1.092-.513.273 0 .547.003.786.014.252.012.59-.096.924.704.344.82 1.17 2.83 1.273 3.035.103.205.17.445.034.717-.137.273-.205.444-.41.683-.205.24-.43.535-.615.718-.205.205-.418.427-.18.837.24.41 1.066 1.758 2.289 2.847 1.572 1.4 2.896 1.832 3.306 2.037.41.205.65.17.89-.103.24-.274 1.024-1.195 1.298-1.605.273-.41.547-.342.922-.205.376.137 2.39 1.127 2.8 1.332.41.205.683.308.786.478.102.17.102.99-.24 1.957Z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
