/**
 * MAHALAKSHMI TOUR & TRAVEL — TRAVEL ARTICLE / GUIDE MODEL
 * Phase 08: Publication-grade editorial travel guides & knowledge ecosystem
 */

import { TourImage, TourSeo } from './tour';

export type ArticleCategory = 
  | 'travel-guide' 
  | 'route-insight' 
  | 'family-tips' 
  | 'group-planning' 
  | 'itinerary' 
  | 'local-culture';

export type ArticleType = 
  | 'destination-guide'
  | 'route-guide'
  | 'itinerary-guide'
  | 'planning-guide'
  | 'college-guide'
  | 'experience-guide';

export interface ArticleTocItem {
  id: string;
  title: string;
  level: number;
}

export interface ArticleKeyFacts {
  origin: string; // e.g. "Madurai, Tamil Nadu"
  destination: string; // e.g. "Munnar, Kerala"
  distanceKm?: number; // e.g. 157
  idealDuration: string; // e.g. "1 Night / 2 Days"
  region: string; // e.g. "Western Ghats, Idukki District"
  bestSeason?: string; // e.g. "September to March"
  recommendedVehicle?: string; // e.g. "21-Seater AC Van or Private Sedan"
}

export interface TravelArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Structured Markdown / rich text
  coverImage: TourImage;
  category: ArticleCategory;
  articleType?: ArticleType;
  destination?: string;
  destinationSlug?: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  publishedDate: string; // ISO format: YYYY-MM-DD
  updatedDate?: string;
  readingTimeMinutes: number;
  featured?: boolean;
  keyFacts?: ArticleKeyFacts;
  tableOfContents?: ArticleTocItem[];
  connectedTourSlug?: string; // Tour slug
  connectedServiceSlug?: string; // Travel service slug
  relatedTours: string[]; // Tour slugs
  relatedDestinations: string[]; // Destination slugs
  relatedArticles: string[]; // Article slugs
  seo: TourSeo;
}
