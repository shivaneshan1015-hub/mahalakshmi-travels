/**
 * MAHALAKSHMI TOUR & TRAVEL — RELATIONAL DATA ACCESS LAYER & ADAPTERS
 * Interconnects Tours, Destinations, Vehicles, Services, and Articles using Stable Internal IDs.
 */

import { getAllTours, getTourBySlug } from './tours';
import { getAllDestinations, getDestinationBySlug } from './destinations';
import { getAllVehicles, getVehicleBySlug } from './vehicles';
import { getAllTravelServices, getTravelServiceBySlug } from './services';
import { getAllArticles, getArticleBySlug } from './articles';
import { Tour } from '@/types/tour';
import { Destination } from '@/types/destination';
import { Vehicle } from '@/types/vehicle';
import { TravelArticle } from '@/types/article';
import { TravelService } from '@/types/service';

/**
 * Stable ID & Slug Lookups
 */

export function getTourByIdOrSlug(idOrSlug: string): Tour | undefined {
  const tours = getAllTours();
  return (
    tours.find((t) => t.id === idOrSlug) ||
    tours.find((t) => t.slug === idOrSlug) ||
    getTourBySlug(idOrSlug)
  );
}

export function getVehicleByIdOrSlug(idOrSlug: string): Vehicle | undefined {
  const vehicles = getAllVehicles();
  return (
    vehicles.find((v) => v.id === idOrSlug) ||
    vehicles.find((v) => v.slug === idOrSlug) ||
    getVehicleBySlug(idOrSlug)
  );
}

export function getServiceByIdOrSlug(idOrSlug: string): TravelService | undefined {
  const services = getAllTravelServices();
  return (
    services.find((s) => s.id === idOrSlug) ||
    services.find((s) => s.slug === idOrSlug) ||
    getTravelServiceBySlug(idOrSlug)
  );
}

export function getDestinationByIdOrSlug(idOrSlug: string): Destination | undefined {
  const destinations = getAllDestinations();
  return (
    destinations.find((d) => d.id === idOrSlug) ||
    destinations.find((d) => d.slug === idOrSlug) ||
    getDestinationBySlug(idOrSlug)
  );
}

export function getArticleByIdOrSlug(idOrSlug: string): TravelArticle | undefined {
  const articles = getAllArticles();
  return (
    articles.find((a) => a.id === idOrSlug) ||
    articles.find((a) => a.slug === idOrSlug) ||
    getArticleBySlug(idOrSlug)
  );
}

/**
 * Given a tour ID or slug, resolve full related tour objects and destination object
 */
export function resolveTourRelations(idOrSlug: string): {
  tour?: Tour;
  destination?: Destination;
  relatedTours: Tour[];
  relatedArticles: TravelArticle[];
  availableVehicles: Vehicle[];
} {
  const tour = getTourByIdOrSlug(idOrSlug);
  if (!tour) {
    return { relatedTours: [], relatedArticles: [], availableVehicles: [] };
  }

  const destination = getDestinationByIdOrSlug(tour.destinationSlug);
  const relatedTours = (tour.relatedTours || [])
    .map((ref) => getTourByIdOrSlug(ref))
    .filter((t): t is Tour => Boolean(t));
  const relatedArticles = (tour.relatedArticles || [])
    .map((ref) => getArticleByIdOrSlug(ref))
    .filter((a): a is TravelArticle => Boolean(a));
  const availableVehicles = getAllVehicles();

  return {
    tour,
    destination,
    relatedTours,
    relatedArticles,
    availableVehicles,
  };
}

/**
 * Given a destination ID or slug, resolve associated tours and articles
 */
export function resolveDestinationRelations(idOrSlug: string): {
  destination?: Destination;
  tours: Tour[];
  articles: TravelArticle[];
} {
  const destination = getDestinationByIdOrSlug(idOrSlug);
  if (!destination) {
    return { tours: [], articles: [] };
  }

  const tours = getAllTours().filter(
    (t) => t.destinationSlug === destination.slug || t.destinationSlug === destination.id
  );
  const articles = getAllArticles().filter(
    (a) => a.destinationSlug === destination.slug || a.destinationSlug === destination.id
  );

  return {
    destination,
    tours,
    articles,
  };
}

/**
 * Given a vehicle ID or slug, resolve compatible services and popular tours
 */
export function resolveVehicleRelations(idOrSlug: string): {
  vehicle?: Vehicle;
  services: TravelService[];
  popularTours: Tour[];
} {
  const vehicle = getVehicleByIdOrSlug(idOrSlug);
  if (!vehicle) {
    return { services: [], popularTours: [] };
  }

  const services = getAllTravelServices().filter((s) =>
    s.vehicleOptions?.includes(vehicle.category)
  );
  const popularTours = getAllTours().filter((t) =>
    t.travelOptions?.includes(vehicle.category)
  );

  return {
    vehicle,
    services,
    popularTours,
  };
}

/**
 * Given a travel service ID or slug, resolve compatible vehicles and tours
 */
export function resolveServiceRelations(idOrSlug: string): {
  service?: TravelService;
  vehicles: Vehicle[];
  tours: Tour[];
} {
  const service = getServiceByIdOrSlug(idOrSlug);
  if (!service) {
    return { vehicles: [], tours: [] };
  }

  const vehicles = (service.relatedVehicles || [])
    .map((ref) => getVehicleByIdOrSlug(ref))
    .filter((v): v is Vehicle => Boolean(v));
  const tours = (service.relatedTours || [])
    .map((ref) => getTourByIdOrSlug(ref))
    .filter((t): t is Tour => Boolean(t));

  return {
    service,
    vehicles,
    tours,
  };
}

/**
 * Given an article ID or slug, resolve connected tour, service, destination and related articles
 */
export function resolveArticleRelations(idOrSlug: string): {
  article?: TravelArticle;
  connectedTour?: Tour;
  connectedService?: TravelService;
  destination?: Destination;
  relatedArticles: TravelArticle[];
} {
  const article = getArticleByIdOrSlug(idOrSlug);
  if (!article) {
    return { relatedArticles: [] };
  }

  const connectedTour = article.connectedTourSlug
    ? getTourByIdOrSlug(article.connectedTourSlug)
    : article.relatedTours && article.relatedTours.length > 0
    ? getTourByIdOrSlug(article.relatedTours[0])
    : undefined;

  const connectedService = article.connectedServiceSlug
    ? getServiceByIdOrSlug(article.connectedServiceSlug)
    : undefined;

  const destination = article.destinationSlug
    ? getDestinationByIdOrSlug(article.destinationSlug)
    : undefined;

  const relatedArticles = (article.relatedArticles || [])
    .map((ref) => getArticleByIdOrSlug(ref))
    .filter((a): a is TravelArticle => Boolean(a));

  return {
    article,
    connectedTour,
    connectedService,
    destination,
    relatedArticles,
  };
}
