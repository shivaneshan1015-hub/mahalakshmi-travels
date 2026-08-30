/**
 * MAHALAKSHMI TOUR & TRAVEL — DYNAMIC SERVICE DETAIL PAGE (/travel-services/[slug])
 * Phase 06 Implementation: SSG dynamic route for Group, College, Family, and Function travel.
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTravelServices, getTravelServiceBySlug } from '@/lib/data/services';
import { resolveServiceRelations } from '@/lib/data/relationships';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { ServiceDetailHero } from '@/components/services/ServiceDetailHero';
import { ServiceFaqAccordion } from '@/components/services/ServiceFaqAccordion';
import { ServiceEnquiryBlock } from '@/components/services/ServiceEnquiryBlock';
import { ServiceRelatedTours } from '@/components/services/ServiceRelatedTours';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = getAllTravelServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getTravelServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | Mahalakshmi Tour & Travel',
    };
  }

  return constructMetadata({
    title: `${service.title} in Madurai`,
    description: service.shortDescription,
    canonicalPath: `/travel-services/${service.slug}`,
    ogImage: service.heroImage.url,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getTravelServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const { tours: relatedTours } = resolveServiceRelations(service.slug);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', itemUrl: 'https://mahalakshmitravels.com', position: 1 },
    { name: 'Travel Services', itemUrl: 'https://mahalakshmitravels.com/travel-services', position: 2 },
    { name: service.title, itemUrl: `https://mahalakshmitravels.com/travel-services/${service.slug}`, position: 3 },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="container-editorial py-10 md:py-16">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav
          items={[
            { name: 'Home', itemUrl: '/', position: 1 },
            { name: 'Travel Services', itemUrl: '/travel-services', position: 2 },
            { name: service.title, itemUrl: `/travel-services/${service.slug}`, position: 3 },
          ]}
          className="mb-8"
        />

        {/* 01 — Hero */}
        <ServiceDetailHero service={service} />

        {/* 02 — Related Tour Circuits */}
        <ServiceRelatedTours relatedTours={relatedTours} />

        {/* 03 — Service FAQs */}
        <ServiceFaqAccordion faqs={service.faqs} />

        {/* 04 — Conversion Enquiry Block */}
        <ServiceEnquiryBlock serviceTitle={service.title} />
      </div>
    </>
  );
}
