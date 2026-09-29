/**
 * MAHALAKSHMI TOUR & TRAVEL — TRAVEL GUIDE DIRECTORY (/travel-guide)
 * Phase 08: Publication-Grade Travel Knowledge Layer & SEO Ecosystem.
 */

import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/seo/schema';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { getAllArticles, getFeaturedArticle } from '@/lib/data/articles';
import { TravelGuideDirectory } from '@/components/guide/TravelGuideDirectory';

export const metadata: Metadata = constructMetadata({
  title: 'South India Travel Guide & Route Insights from Madurai | Mahalakshmi',
  description: 'Editorial guides, mountain highway route insights, and family travel planning tips across Munnar, Kodaikanal, Rameswaram, and South India.',
  canonicalPath: '/travel-guide',
});

export default function TravelGuidePage() {
  const articles = getAllArticles();
  const featuredArticle = getFeaturedArticle();

  const breadcrumbs = [
    { name: 'Home', itemUrl: '/', position: 1 },
    { name: 'Travel Guide', itemUrl: '/travel-guide', position: 2 },
  ];

  const webPageSchema = generateWebPageSchema({
    name: 'South India Travel Guide & Route Insights from Madurai | Mahalakshmi',
    description: 'Editorial guides, mountain highway route insights, and family travel planning tips across Munnar, Kodaikanal, Rameswaram, and South India.',
    url: '/travel-guide',
    pageType: 'CollectionPage',
    breadcrumbId: `${siteConfig.url}/travel-guide#breadcrumb`,
  });

  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs, '/travel-guide')} />

      <div className="container-editorial py-10 md:py-16">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav
          items={[
            { name: 'Home', itemUrl: '/', position: 1 },
            { name: 'Travel Guide', itemUrl: '/travel-guide', position: 2 },
          ]}
          className="mb-8"
        />

        {/* Directory Container */}
        <TravelGuideDirectory
          articles={articles}
          featuredArticle={featuredArticle}
        />
      </div>
    </>
  );
}
