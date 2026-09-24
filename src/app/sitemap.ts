/**
 * MAHALAKSHMI TOUR & TRAVEL — CANONICAL SITEMAP GENERATOR
 * Consumes the Canonical Content Registry to build a 100% compliant, indexable sitemap.
 */

import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getSitemapEligibleRecords } from '@/config/canonical-registry';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const eligibleRecords = getSitemapEligibleRecords();

  return eligibleRecords.map((record) => {
    let priority = 0.7;
    let changeFrequency: 'daily' | 'weekly' | 'monthly' = 'weekly';

    if (record.canonicalPath === '/') {
      priority = 1.0;
      changeFrequency = 'weekly';
    } else if (record.contentType === 'vehicle' || record.contentType === 'tour') {
      priority = 0.85;
      changeFrequency = 'weekly';
    } else if (record.contentType === 'service' || record.contentType === 'conversion') {
      priority = 0.8;
      changeFrequency = 'monthly';
    } else if (record.contentType === 'guide') {
      priority = 0.7;
      changeFrequency = 'monthly';
    }

    return {
      url: `${baseUrl}${record.canonicalPath}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });
}
