/**
 * MAHALAKSHMI TOUR & TRAVEL — DYNAMIC TOUR DETAIL PAGE (/tours/[slug])
 * Phase 05 Implementation: Static Site Generation (SSG) with TouristTrip JSON-LD Schema.
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTours, getTourBySlug } from '@/lib/data/tours';
import { resolveTourRelations } from '@/lib/data/relationships';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateTouristTripSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { TourDetailHero } from '@/components/tours/TourDetailHero';
import { TourHighlights } from '@/components/tours/TourHighlights';
import { TourItineraryTimeline } from '@/components/tours/TourItineraryTimeline';
import { TourInclusionsBlock } from '@/components/tours/TourInclusionsBlock';
import { TourVehicleOption } from '@/components/tours/TourVehicleOption';
import { TourCustomisePrompt } from '@/components/tours/TourCustomisePrompt';
import { TourEnquiryBlock } from '@/components/tours/TourEnquiryBlock';
import { RelatedTours } from '@/components/tours/RelatedTours';
import { RelatedArticles } from '@/components/tours/RelatedArticles';

interface TourPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tours = getAllTours();
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return {
      title: 'Journey Not Found | Mahalakshmi Tour & Travel',
    };
  }

  return constructMetadata({
    title: `${tour.title} (${tour.duration.text})`,
    description: tour.shortDescription,
    canonicalPath: `/tours/${tour.slug}`,
    ogImage: tour.heroImage.url,
  });
}

export default async function TourDetailPage({ params }: TourPageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const { destination, relatedTours, relatedArticles } = resolveTourRelations(tour.slug);

  const touristTripSchema = generateTouristTripSchema(tour);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', itemUrl: 'https://mahalakshmitravels.com', position: 1 },
    { name: 'Tours', itemUrl: 'https://mahalakshmitravels.com/tours', position: 2 },
    { name: tour.title, itemUrl: `https://mahalakshmitravels.com/tours/${tour.slug}`, position: 3 },
  ]);

  return (
    <>
      <JsonLd data={touristTripSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="container-editorial py-10 md:py-16">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav
          items={[
            { name: 'Home', itemUrl: '/', position: 1 },
            { name: 'Explore Journeys', itemUrl: '/tours', position: 2 },
            { name: tour.title, itemUrl: `/tours/${tour.slug}`, position: 3 },
          ]}
          className="mb-8"
        />

        {/* 01 — Hero & Facts */}
        <TourDetailHero tour={tour} />

        {/* 02 — Highlights */}
        <TourHighlights highlights={tour.highlights} />

        {/* 03 — Unfolding Itinerary */}
        <TourItineraryTimeline itinerary={tour.itinerary} />

        {/* 04 — Inclusions & Guidelines */}
        <TourInclusionsBlock inclusions={tour.inclusions} exclusions={tour.exclusions} />

        {/* 05 — In-House Vehicle Options */}
        <TourVehicleOption />

        {/* 06 — Customise Prompt */}
        <TourCustomisePrompt tourTitle={tour.title} tourSlug={tour.slug} />

        {/* 07 — Contextual Enquiry Block */}
        <TourEnquiryBlock tour={tour} />

        {/* 08 — Related Journeys */}
        <RelatedTours currentTourId={tour.id} relatedTours={relatedTours} />

        {/* 09 — Related Travel Articles */}
        <RelatedArticles articles={relatedArticles} />
      </div>
    </>
  );
}
