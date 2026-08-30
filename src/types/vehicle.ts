import { TravelAudience, TourImage, TourSeo } from './tour';

export type VehicleCategory = '21-seater-van' | 'sedan-car';

export interface VehicleFeature {
  iconName: string;
  title: string;
  description: string;
}

export interface VehicleSpecification {
  label: string;
  value: string;
}

export interface VehicleTariff {
  ratePerKm?: string;
  driverBataPerDay?: string;
  minKmPerDay?: string;
  tollParkingTerms?: string;
  startingPrice?: string;
}

export interface VehicleFaq {
  question: string;
  answer: string;
}

export interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: VehicleCategory;
  seatingCapacity: number; // e.g. 21 or 4
  luggageCapacityText: string;
  tagline: string;
  description: string;
  rentalHeading?: string;
  fleetCount?: number;
  availabilityBadge?: string;
  tariff?: VehicleTariff;
  features: VehicleFeature[];
  specifications: VehicleSpecification[];
  idealFor: TravelAudience[];
  serviceAreas: string[];
  popularRoutes?: Array<{
    route: string;
    distance: string;
    drivingTime: string;
    fitNote: string;
  }>;
  faqs?: VehicleFaq[];
  images: TourImage[];
  seo: TourSeo;
}
