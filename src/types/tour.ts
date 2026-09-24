/**
 * MAHALAKSHMI TOUR & TRAVEL — TOUR CONTENT MODEL
 * South India Journeys starting from Madurai
 */

export type SouthIndiaState = 
  | 'Tamil Nadu' 
  | 'Kerala' 
  | 'Karnataka' 
  | 'Andhra Pradesh'
  | 'Telangana';

export type TravelAudience = 
  | 'family' 
  | 'college' 
  | 'group' 
  | 'couple' 
  | 'function' 
  | 'corporate';

export type VehicleOptionId = 
  | '21-seater-van' 
  | 'sedan-car' 
  | 'custom';

export type TourCategory =
  | 'pilgrimage-temple'
  | 'hill-stations-nature'
  | 'coastal-backwaters'
  | 'heritage-cities'
  | 'adventure-theme-parks';

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
  startLocation?: string;
  endLocation?: string;
  distanceKm?: number;
  routeNodes?: string[];
  meals?: string;
  stayLocation?: string;
  activities?: string[];
  notes?: string[];
}

export interface TourFaq {
  question: string;
  answer: string;
}

export interface TourImage {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface TourSeo {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
}

export interface Tour {
  id: string;
  title: string;
  slug: string;
  category: TourCategory;
  shortDescription: string;
  description: string;
  destination: string;
  destinationSlug: string;
  state: SouthIndiaState;
  startingLocation: string; // e.g. "Madurai"
  duration: {
    nights: number;
    days: number;
    text: string; // e.g. "1 Night / 2 Days"
  };
  distanceKm: number; // e.g. 157
  heroImage: TourImage;
  gallery: TourImage[];
  highlights: string[];
  itinerary: TourItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  idealFor: TravelAudience[];
  travelOptions: VehicleOptionId[];
  customisable: boolean;
  featured?: boolean;
  faqs?: TourFaq[];
  relatedTours: string[]; // Slugs of related tours
  relatedArticles: string[]; // Slugs of related travel guides
  seo: TourSeo;
}
