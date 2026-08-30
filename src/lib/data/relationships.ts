/**
 * MAHALAKSHMI TOUR & TRAVEL — RELATIONAL DATA ACCESS LAYER
 * Interconnects Tours, Destinations, Vehicles, Services, and Articles.
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
 * Given a tour slug, resolve full related tour objects and destination object
 */
export function resolveTourRelations(slug: string): {
  tour?: Tour;
  destination?: Destination;
  relatedTours: Tour[];
  relatedArticles: TravelArticle[];
  availableVehicles: Vehicle[];
} {
  const tour = getTourBySlug(slug);
  if (!tour) {
    return { relatedTours: [], relatedArticles: [], availableVehicles: [] };
  }

  const destination = getDestinationBySlug(tour.destinationSlug);
  const relatedTours = tour.relatedTours
    .map((s) => getTourBySlug(s))
    .filter((t): t is Tour => Boolean(t));
  const relatedArticles = tour.relatedArticles
    .map((s) => getArticleBySlug(s))
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
 * Given a destination slug, resolve associated tours and articles
 */
export function resolveDestinationRelations(slug: string): {
  destination?: Destination;
  tours: Tour[];
  articles: TravelArticle[];
} {
  const destination = getDestinationBySlug(slug);
  if (!destination) {
    return { tours: [], articles: [] };
  }

  const tours = getAllTours().filter((t) => t.destinationSlug === slug);
  const articles = getAllArticles().filter((a) => a.destinationSlug === slug);

  return {
    destination,
    tours,
    articles,
  };
}

/**
 * Given a vehicle slug, resolve compatible services and popular tours
 */
export function resolveVehicleRelations(slug: string): {
  vehicle?: Vehicle;
  services: TravelService[];
  popularTours: Tour[];
} {
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) {
    return { services: [], popularTours: [] };
  }

  const services = getAllTravelServices().filter((s) =>
    s.vehicleOptions.includes(vehicle.category)
  );
  const popularTours = getAllTours().filter((t) =>
    t.travelOptions.includes(vehicle.category)
  );

  return {
    vehicle,
    services,
    popularTours,
  };
}

/**
 * Given a travel service slug, resolve compatible vehicles and tours
 */
export function resolveServiceRelations(slug: string): {
  service?: TravelService;
  vehicles: Vehicle[];
  tours: Tour[];
} {
  const service = getTravelServiceBySlug(slug);
  if (!service) {
    return { vehicles: [], tours: [] };
  }

  const vehicles = service.relatedVehicles
    .map((s) => getVehicleBySlug(s))
    .filter((v): v is Vehicle => Boolean(v));
  const tours = service.relatedTours
    .map((s) => getTourBySlug(s))
    .filter((t): t is Tour => Boolean(t));

  return {
    service,
    vehicles,
    tours,
  };
}

/**
 * Given an article slug, resolve connected tour, service, destination and related articles
 */
export function resolveArticleRelations(slug: string): {
  article?: TravelArticle;
  connectedTour?: Tour;
  connectedService?: TravelService;
  destination?: Destination;
  relatedArticles: TravelArticle[];
} {
  const article = getArticleBySlug(slug);
  if (!article) {
    return { relatedArticles: [] };
  }

  const connectedTour = article.connectedTourSlug
    ? getTourBySlug(article.connectedTourSlug)
    : article.relatedTours.length > 0
    ? getTourBySlug(article.relatedTours[0])
    : undefined;

  const connectedService = article.connectedServiceSlug
    ? getTravelServiceBySlug(article.connectedServiceSlug)
    : undefined;

  const destination = article.destinationSlug
    ? getDestinationBySlug(article.destinationSlug)
    : undefined;

  const relatedArticles = article.relatedArticles
    .map((s) => getArticleBySlug(s))
    .filter((a): a is TravelArticle => Boolean(a));

  return {
    article,
    connectedTour,
    connectedService,
    destination,
    relatedArticles,
  };
}
