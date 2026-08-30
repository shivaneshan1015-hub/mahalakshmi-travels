/**
 * MAHALAKSHMI TOUR & TRAVEL — METADATA ENGINE
 */

import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { SeoMetadataProps } from '@/types/seo';

export function constructMetadata({
  title,
  description,
  canonicalPath = '',
  ogImage = siteConfig.ogImage,
  ogType = 'website',
  publishedTime,
  noIndex = false,
}: SeoMetadataProps): Metadata {
  const fullTitle = title.includes(siteConfig.shortName) || title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  const canonicalUrl = `${siteConfig.url}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  return {
    title: fullTitle,
    description: description || siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: description || siteConfig.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_IN',
      type: ogType,
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || siteConfig.description,
      images: [ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/brand/favicon.ico',
      shortcut: '/brand/favicon-16x16.png',
      apple: '/brand/apple-touch-icon.png',
    },
  };
}
