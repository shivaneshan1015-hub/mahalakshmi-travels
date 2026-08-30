/**
 * MAHALAKSHMI TOUR & TRAVEL — ROBOTS.TXT GENERATOR
 */

import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/crm/', '/design-system'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
