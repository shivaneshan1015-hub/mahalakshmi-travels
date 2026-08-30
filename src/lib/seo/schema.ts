/**
 * MAHALAKSHMI TOUR & TRAVEL — STRUCTURED DATA (JSON-LD) GENERATOR
 * Standard Schema.org schemas for LocalBusiness, TouristTrip, TouristDestination, Article, FAQ.
 */

import { siteConfig } from '@/config/site';
import { Tour } from '@/types/tour';
import { Destination } from '@/types/destination';
import { TravelArticle } from '@/types/article';
import { BreadcrumbItem } from '@/types/seo';

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
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
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
    priceRange: '$$',
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
        opens: '06:00',
        closes: '22:00',
      },
    ],
  };
}

/**
 * TouristTrip Schema for Tours
 */
export function generateTouristTripSchema(tour: Tour) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.shortDescription,
    touristType: tour.idealFor,
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
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage.url,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate || article.publishedDate,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/brand/logo-primary.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/travel-guide/${article.slug}`,
    },
  };
}

/**
 * BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.itemUrl.startsWith('http') ? item.itemUrl : `${siteConfig.url}${item.itemUrl}`,
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
  tariff?: { startingPrice?: string; ratePerKm?: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    '@id': `${siteConfig.url}/vehicles/${vehicle.slug}#autorental`,
    name: `${vehicle.name} in Madurai`,
    description: vehicle.description,
    image: vehicle.images[0]?.url,
    url: `${siteConfig.url}/vehicles/${vehicle.slug}`,
    telephone: siteConfig.contact.phonePrimary,
    priceRange: vehicle.tariff?.startingPrice || '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
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
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      telephone: siteConfig.contact.phonePrimary,
      url: siteConfig.url,
    },
  };
}

/**
 * FAQPage Schema
 */
export function generateFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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

