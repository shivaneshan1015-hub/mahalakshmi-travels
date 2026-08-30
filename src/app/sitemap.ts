/**
 * MAHALAKSHMI TOUR & TRAVEL — DYNAMIC SITEMAP GENERATOR
 */

import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getAllTours } from '@/lib/data/tours';
import { getAllDestinations } from '@/lib/data/destinations';
import { getAllVehicles } from '@/lib/data/vehicles';
import { getAllTravelServices } from '@/lib/data/services';
import { getAllArticles } from '@/lib/data/articles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static route definitions
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/tours`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/destinations`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/vehicles`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/travel-services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/plan-your-journey`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/customised-tours`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/travel-guide`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/group-travel`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/college-trips`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/family-travel`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/function-travel`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Dynamic Tour routes
  const tourRoutes: MetadataRoute.Sitemap = getAllTours().map((t) => ({
    url: `${baseUrl}/tours/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic Destination routes
  const destinationRoutes: MetadataRoute.Sitemap = getAllDestinations().map((d) => ({
    url: `${baseUrl}/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic Vehicle routes
  const vehicleRoutes: MetadataRoute.Sitemap = getAllVehicles().map((v) => ({
    url: `${baseUrl}/vehicles/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // Dynamic Travel Services routes
  const serviceRoutes: MetadataRoute.Sitemap = getAllTravelServices().map((s) => ({
    url: `${baseUrl}/travel-services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  // Dynamic Article routes
  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${baseUrl}/travel-guide/${a.slug}`,
    lastModified: new Date(a.updatedDate || a.publishedDate),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...tourRoutes,
    ...destinationRoutes,
    ...vehicleRoutes,
    ...serviceRoutes,
    ...articleRoutes,
  ];
}
