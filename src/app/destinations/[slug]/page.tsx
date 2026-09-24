/**
 * MAHALAKSHMI TOUR & TRAVEL — DYNAMIC DESTINATION DETAIL ROUTE SHELL
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getAllDestinations, getDestinationBySlug } from '@/lib/data/destinations';
import { resolveDestinationRelations } from '@/lib/data/relationships';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateTouristDestinationSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { DataAnchor } from '@/components/ui/DataAnchor';
import { Badge } from '@/components/ui/Badge';
import { JourneyCard } from '@/components/ui/Card';
import { CtaBlock } from '@/components/ui/CtaBlock';

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const destinations = getAllDestinations();
  return destinations.map((dest) => ({
    slug: dest.slug,
  }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return constructMetadata({
      title: 'Destination Not Found',
      description: 'The requested destination could not be found.',
    });
  }

  return constructMetadata({
    title: destination.seo.title,
    description: destination.seo.description,
    canonicalPath: `/destinations/${destination.slug}`,
    ogImage: destination.heroImage.url,
    noIndex: true,
  });
}

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const { destination, tours } = resolveDestinationRelations(slug);

  if (!destination) {
    notFound();
  }

  const destSchema = generateTouristDestinationSchema(destination);

  return (
    <>
      <JsonLd data={destSchema} />
      <div className="container-editorial py-12 md:py-16">
        <BreadcrumbNav
          items={[
            { name: 'Home', itemUrl: '/', position: 1 },
            { name: 'Destinations', itemUrl: '/destinations', position: 2 },
            { name: destination.name, itemUrl: `/destinations/${destination.slug}`, position: 3 },
          ]}
          className="mb-8"
        />

        {/* Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
          <div className="lg:col-span-7">
            <div className="flex gap-2 mb-3">
              <Badge variant="terracotta">{destination.state}</Badge>
              <Badge variant="paper">{destination.bestTimeToVisit}</Badge>
            </div>

            <h1 className="type-display-l text-[var(--text-primary)] mb-4">
              {destination.name}
            </h1>

            <p className="type-body-large text-[var(--text-secondary)] mb-6">
              {destination.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[var(--border-default)]">
              <DataAnchor
                value={destination.distanceFromMaduraiKm}
                unit="KM"
                sublabel="Distance from Madurai"
              />
              <DataAnchor
                value={destination.travelTimeFromMadurai.split(' ')[0]}
                unit="HOURS"
                sublabel="Average Driving Time"
              />
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] rounded-[4px] overflow-hidden bg-black/10">
            <Image
              src={destination.heroImage.url}
              alt={destination.heroImage.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>

        {/* Popular Places */}
        {destination.popularPlaces.length > 0 && (
          <div className="py-12 border-t border-[var(--border-default)]">
            <span className="type-eyebrow text-[var(--color-terracotta-500)]">
              KEY ATTRACTIONS & SIGHTS
            </span>
            <h2 className="type-h2 mt-1 mb-8">
              Places to Explore in {destination.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {destination.popularPlaces.map((place) => (
                <div
                  key={place.name}
                  className="p-5 bg-[var(--color-paper-100)] border border-[var(--border-default)] rounded-[4px]"
                >
                  <h4 className="type-h4 text-[var(--text-primary)] mb-2">
                    {place.name}
                  </h4>
                  <p className="type-body-small text-[var(--text-secondary)]">
                    {place.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Associated Tours */}
        {tours.length > 0 && (
          <div className="py-12 border-t border-[var(--border-default)]">
            <span className="type-eyebrow text-[var(--color-terracotta-500)]">
              AVAILABLE JOURNEYS
            </span>
            <h3 className="type-h2 mt-1 mb-8">
              Tours to {destination.name} from Madurai
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((t) => (
                <JourneyCard
                  key={t.id}
                  title={t.title}
                  destination={t.destination}
                  durationText={t.duration.text}
                  distanceKm={t.distanceKm}
                  imageUrl={t.heroImage.url}
                  href={`/tours/${t.slug}`}
                  size="sm"
                />
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="pt-12">
          <CtaBlock
            title={`Travel to ${destination.name} with Mahalakshmi`}
            subtitle={`Plan a private family sedan trip or book our 21-seater van for your group journey to ${destination.name} from Madurai.`}
            context={`Destination: ${destination.name}`}
          />
        </div>
      </div>
    </>
  );
}
