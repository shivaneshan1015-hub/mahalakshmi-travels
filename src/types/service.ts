/**
 * MAHALAKSHMI TOUR & TRAVEL — TRAVEL SERVICE MODEL
 * Core Service Pillars & Use-Case Travel Solutions
 */

import { TravelAudience, TourImage, TourSeo } from './tour';

export type ServiceType = 
  | 'group-travel' 
  | 'college-trips' 
  | 'family-travel' 
  | 'function-travel' 
  | 'customised-tours';

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface TravelServiceFaq {
  question: string;
  answer: string;
}

export interface TravelService {
  id: string;
  title: string;
  slug: string;
  serviceType: ServiceType;
  shortDescription: string;
  description: string;
  idealFor: TravelAudience[];
  vehicleOptions: string[]; // e.g. ["21-seater-van", "sedan-car"]
  benefits: ServiceBenefit[];
  typicalRoutes?: string[];
  faqs?: TravelServiceFaq[];
  heroImage: TourImage;
  relatedVehicles: string[]; // Vehicle slugs
  relatedTours: string[]; // Tour slugs
  seo: TourSeo;
}
