/**
 * MAHALAKSHMI TOUR & TRAVEL — GROUP TRAVEL USE-CASE ROUTE
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
  title: 'Group Travel & 21-Seater Van Hire in Madurai | Mahalakshmi Tour & Travel',
  description: 'Specialized group transport for associations, pilgrim circuits, and family tours from Madurai across South India. Flagship 21-seater AC van.',
  canonicalPath: '/group-travel',
});

export default function GroupTravelPage() {
  const service = getTravelServiceBySlug('group-travel');

  if (!service) {
    notFound();
  }

  const { tours: relatedTours } = resolveServiceRelations('group-travel');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', itemUrl: 'https://mahalakshmitravels.com', position: 1 },
    { name: 'Travel Services', itemUrl: 'https://mahalakshmitravels.com/travel-services', position: 2 },
    { name: 'Group Travel', itemUrl: 'https://mahalakshmitravels.com/group-travel', position: 3 },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="container-editorial py-10 md:py-16">
        <BreadcrumbNav
          items={[
            { name: 'Home', itemUrl: '/', position: 1 },
            { name: 'Travel Services', itemUrl: '/travel-services', position: 2 },
            { name: 'Group Travel', itemUrl: '/group-travel', position: 3 },
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
