/**
 * MAHALAKSHMI TOUR & TRAVEL — SEO & STRUCTURED DATA TYPES
 * Standard Schema.org JSON-LD definitions
 */

export interface SeoMetadataProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  noIndex?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  itemUrl: string;
  position: number;
}

export interface LocalBusinessSchemaProps {
  name: string;
  legalName?: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string; // Madurai
    addressRegion: string;   // Tamil Nadu
    postalCode: string;
    addressCountry: string;  // IN
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  areaServed: string[];
  priceRange?: string;
}

export interface TouristTripSchemaProps {
  name: string;
  description: string;
  url: string;
  image: string;
  itinerary: Array<{
    name: string;
    description: string;
  }>;
  touristType?: string[];
  offers?: {
    priceCurrency: string;
    availability: string;
  };
}

export interface FAQItemSchema {
  question: string;
  answer: string;
}
