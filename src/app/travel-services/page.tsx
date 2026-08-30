/**
 * MAHALAKSHMI TOUR & TRAVEL — TRAVEL & VEHICLE SERVICES HUB (/travel-services)
 * Phase 06 Implementation: People-First Service Discovery ("Travel, Your Way").
 */

import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { TravelServicesHeader } from '@/components/services/TravelServicesHeader';
import { WhosComingAssistant } from '@/components/services/WhosComingAssistant';
import { ServiceUseCaseGrid } from '@/components/services/ServiceUseCaseGrid';
import { VehicleShowcaseSection } from '@/components/services/VehicleShowcaseSection';
import { HowItWorksSteps } from '@/components/services/HowItWorksSteps';
import { ServiceAreaSection } from '@/components/services/ServiceAreaSection';

export const metadata: Metadata = constructMetadata({
  title: 'Travel Services & Vehicle Rental in Madurai | Mahalakshmi Tours and Travels',
  description: 'Group travel, college trips, family vacations, and wedding vehicle hire in Madurai. Flagship 21-seater AC van and private sedans across South India.',
  canonicalPath: '/travel-services',
});

export default function TravelServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', itemUrl: 'https://mahalakshmitravels.com', position: 1 },
    { name: 'Travel Services', itemUrl: 'https://mahalakshmitravels.com/travel-services', position: 2 },
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
          ]}
          className="mb-8"
        />

        {/* 01 — Header */}
        <TravelServicesHeader />

        {/* 02 — "Who's Coming?" Discovery Assistant */}
        <WhosComingAssistant />

        {/* 03 — People-First Use-Case Cards */}
        <ServiceUseCaseGrid />

        {/* 04 — Dedicated Vehicle Showcase */}
        <VehicleShowcaseSection />

        {/* 05 — 4-Step How It Works */}
        <HowItWorksSteps />

        {/* 06 — Service Area "From Madurai, Outward" */}
        <ServiceAreaSection />
      </div>
    </>
  );
}
