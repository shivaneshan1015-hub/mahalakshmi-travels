/**
 * MAHALAKSHMI TOUR & TRAVEL — FAMILY TRAVEL USE-CASE ROUTE
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTravelServiceBySlug } from '@/lib/data/services';
import { resolveServiceRelations } from '@/lib/data/relationships';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { ServiceDetailHero } from '@/components/services/ServiceDetailHero';
import { ServiceFaqAccordion } from '@/components/services/ServiceFaqAccordion';
import { ServiceEnquiryBlock } from '@/components/services/ServiceEnquiryBlock';
import { ServiceRelatedTours } from '@/components/services/ServiceRelatedTours';

export const metadata: Metadata = constructMetadata({
  title: 'Family Holiday Tours & Car Hire in Madurai | Mahalakshmi Tour & Travel',
  description: 'Careful, unhurried family holiday circuits from Madurai with comfortable sedan and 21-seater van options.',
  canonicalPath: '/family-travel',
});

export default function FamilyTravelPage() {
  const service = getTravelServiceBySlug('family-travel');

  if (!service) {
    notFound();
  }

  const { tours: relatedTours } = resolveServiceRelations('family-travel');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', itemUrl: 'https://mahalakshmitravels.com', position: 1 },
    { name: 'Travel Services', itemUrl: 'https://mahalakshmitravels.com/travel-services', position: 2 },
    { name: 'Family Travel', itemUrl: 'https://mahalakshmitravels.com/family-travel', position: 3 },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="container-editorial py-10 md:py-16">
        <BreadcrumbNav
          items={[
            { name: 'Home', itemUrl: '/', position: 1 },
            { name: 'Travel Services', itemUrl: '/travel-services', position: 2 },
            { name: 'Family Travel', itemUrl: '/family-travel', position: 3 },
          ]}
          className="mb-8"
        />

        <ServiceDetailHero service={service} />
        <ServiceRelatedTours relatedTours={relatedTours} />
        <ServiceFaqAccordion faqs={service.faqs} />
        <ServiceEnquiryBlock serviceTitle={service.title} />
      </div>
    </>
  );
}
