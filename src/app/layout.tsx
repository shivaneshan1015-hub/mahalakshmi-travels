/**
 * MAHALAKSHMI TOUR & TRAVEL — ROOT LAYOUT
 * Sets up editorial typography, brand tokens, header, footer, accessibility skip-link, and LocalBusiness JSON-LD.
 */

import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { siteConfig } from '@/config/site';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyBar } from '@/components/home/MobileStickyBar';
import { JsonLd } from '@/components/seo/JsonLd';
import { AttributionTracker } from '@/components/seo/AttributionTracker';
import { generateLocalBusinessSchema } from '@/lib/seo/schema';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#171716',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: '/brand/logo-emblem.png',
    apple: '/brand/logo-emblem.png',
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/brand/logo-horizontal.png',
        width: 1200,
        height: 630,
        alt: 'Mahalakshmi Tour & Travel',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <head>
        <JsonLd data={localBusinessSchema} />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased selection:bg-[var(--color-terracotta-100)] selection:text-[var(--color-ink-950)]">
        {/* Accessible Skip to Main Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-ink-950)] focus:text-[var(--color-paper-100)] focus:rounded-[3px] focus:shadow-editorial-md focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)] text-xs font-mono uppercase tracking-wider"
        >
          Skip to main content
        </a>

        <Header />
        <main id="main-content" className="flex-1 pb-24 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileStickyBar />
        <AttributionTracker />
      </body>
    </html>
  );
}
