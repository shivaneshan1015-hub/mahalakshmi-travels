/**
 * MAHALAKSHMI TOUR & TRAVEL — STRUCTURED DATA (JSON-LD) GENERATOR
 * Standard Schema.org schemas for WebSite, LocalBusiness, WebPage, TouristTrip, TouristDestination, Article, AutoRental, FAQ.
 */

import { siteConfig } from '@/config/site';
import { Tour } from '@/types/tour';
import { Destination } from '@/types/destination';
import { TravelArticle } from '@/types/article';
import { BreadcrumbItem } from '@/types/seo';

/**
 * WebSite Schema
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: 'en-IN',
    publisher: {
      '@type': 'TravelAgency',
      '@id': `${siteConfig.url}/#travelagency`,
    },
  };
}

export type WebPageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';

export interface WebPageSchemaOptions {
  name: string;
  description: string;
  url: string;
  pageType?: WebPageType;
  mainEntityId?: string;
  aboutId?: string;
  breadcrumbId?: string;
}

/**
 * WebPage Schema Architecture Layer
 */
export function generateWebPageSchema({
  name,
  description,
  url,
  pageType = 'WebPage',
  mainEntityId,
  aboutId,
  breadcrumbId,
}: WebPageSchemaOptions) {
  const fullUrl = url.startsWith('http') ? url : `${siteConfig.url}${url.startsWith('/') ? url : `/${url}`}`;
  return {
    '@context': 'https://schema.org',
    '@type': pageType,
    '@id': `${fullUrl}#webpage`,
    url: fullUrl,
    name,
    description,
    inLanguage: 'en-IN',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
    },
    publisher: {
      '@type': 'TravelAgency',
      '@id': `${siteConfig.url}/#travelagency`,
    },
    ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {}),
    ...(aboutId ? { about: { '@id': aboutId } } : {}),
    ...(breadcrumbId ? { breadcrumb: { '@id': breadcrumbId } } : {}),
  };
}

/**
 * LocalBusiness / TravelAgency Schema
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${siteConfig.url}/#travelagency`,
    name: siteConfig.name,
    legalName: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phonePrimary,
    email: siteConfig.contact.email,
    hasMap: siteConfig.contact.googleMapsUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.fullAddress,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.contact.geo.latitude,
      longitude: siteConfig.contact.geo.longitude,
    },
    areaServed: siteConfig.serviceStates.map((state) => ({
      '@type': 'AdministrativeArea',
      name: state,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: siteConfig.businessHours.opens,
        closes: siteConfig.businessHours.closes,
      },
    ],
  };
}

/**
 * TouristTrip Schema for Tours
 */
export function generateTouristTripSchema(tour: Tour) {
  const tourUrl = `${siteConfig.url}/tours/${tour.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': `${tourUrl}#tour`,
    name: tour.title,
    description: tour.shortDescription,
    touristType: tour.idealFor,
    url: tourUrl,
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: tour.itinerary.length,
      itemListElement: tour.itinerary.map((day, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: day.title,
        description: day.description,
      })),
    },
    provider: {
      '@type': 'TravelAgency',
      '@id': `${siteConfig.url}/#travelagency`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

/**
 * TouristDestination Schema
 */
export function generateTouristDestinationSchema(dest: Destination) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    '@id': `${siteConfig.url}/destinations/${dest.slug}#destination`,
    name: dest.name,
    description: dest.shortDescription,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: dest.geo.latitude,
      longitude: dest.geo.longitude,
    },
    touristType: ['Family', 'Group', 'Nature', 'Heritage'],
  };
}

/**
 * Article Schema for Travel Guides
 */
export function generateArticleSchema(article: TravelArticle) {
  const articleUrl = `${siteConfig.url}/travel-guide/${article.slug}`;
  const imageUrl = article.coverImage.url.startsWith('http')
    ? article.coverImage.url
    : `${siteConfig.url}${article.coverImage.url.startsWith('/') ? article.coverImage.url : `/${article.coverImage.url}`}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline: article.title,
    description: article.excerpt,
    image: imageUrl,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate || article.publishedDate,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#travelagency`,
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/brand/logo-horizontal.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${articleUrl}#webpage`,
    },
  };
}

/**
 * BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[], canonicalPath?: string) {
  const listId = canonicalPath
    ? `${siteConfig.url}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}#breadcrumb`
    : undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    ...(listId ? { '@id': listId } : {}),
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.itemUrl.startsWith('http')
        ? item.itemUrl
        : `${siteConfig.url}${item.itemUrl.startsWith('/') ? item.itemUrl : `/${item.itemUrl}`}`,
    })),
  };
}

/**
 * AutoRental / RentalCarService Schema for Individual Vehicle
 */
export function generateVehicleRentalSchema(vehicle: {
  name: string;
  slug: string;
  description: string;
  seatingCapacity: number;
  category: string;
  images: Array<{ url: string }>;
}) {
  const vehicleUrl = `${siteConfig.url}/vehicles/${vehicle.slug}`;
  const imageUrl = vehicle.images[0]?.url
    ? vehicle.images[0].url.startsWith('http')
      ? vehicle.images[0].url
      : `${siteConfig.url}${vehicle.images[0].url.startsWith('/') ? vehicle.images[0].url : `/${vehicle.images[0].url}`}`
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    '@id': `${vehicleUrl}#autorental`,
    name: `${vehicle.name} in Madurai`,
    description: vehicle.description,
    ...(imageUrl ? { image: imageUrl } : {}),
    url: vehicleUrl,
    telephone: siteConfig.contact.phonePrimary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.fullAddress,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.contact.geo.latitude,
      longitude: siteConfig.contact.geo.longitude,
    },
    areaServed: siteConfig.serviceStates.map((s) => ({
      '@type': 'AdministrativeArea',
      name: s,
    })),
    provider: {
      '@type': 'TravelAgency',
      '@id': `${siteConfig.url}/#travelagency`,
      name: siteConfig.name,
      telephone: siteConfig.contact.phonePrimary,
      url: siteConfig.url,
    },
  };
}

/**
 * FAQPage Schema
 */
export function generateFaqSchema(faqs?: Array<{ question: string; answer: string }>, canonicalPath?: string) {
  if (!faqs || faqs.length === 0) return null;
  const pageUrl = canonicalPath
    ? `${siteConfig.url}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`
    : siteConfig.url;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
