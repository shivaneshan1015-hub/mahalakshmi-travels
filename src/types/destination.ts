/**
 * MAHALAKSHMI TOUR & TRAVEL — DESTINATION CONTENT MODEL
 * South India Destinations with Madurai as Primary Origin
 */

import { SouthIndiaState, TourImage, TourSeo } from './tour';

export interface DestinationGeo {
  latitude: number;
  longitude: number;
}

export interface PopularPlace {
  name: string;
  description: string;
  distanceFromTownKm?: number;
  image?: TourImage;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  state: SouthIndiaState;
  distanceFromMaduraiKm: number;
  travelTimeFromMadurai: string; // e.g. "4.5 Hours"
  shortDescription: string;
  description: string;
  heroImage: TourImage;
  gallery: TourImage[];
  bestTimeToVisit: string; // e.g. "September to March"
  climateSummary?: string;
  popularPlaces: PopularPlace[];
  geo: DestinationGeo;
  relatedTours: string[]; // Tour slugs
  relatedArticles: string[]; // Article slugs
  seo: TourSeo;
}
