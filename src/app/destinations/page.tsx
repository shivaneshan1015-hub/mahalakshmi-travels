/**
 * MAHALAKSHMI TOUR & TRAVEL — DESTINATIONS DIRECTORY ROUTE SHELL
 */

import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import { getAllDestinations } from '@/lib/data/destinations';
import { DestinationCard } from '@/components/ui/Card';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';

export const metadata: Metadata = constructMetadata({
  title: 'South India Destinations from Madurai',
  description: 'Discover hill stations, coastal towns, and cultural hubs across Kerala, Tamil Nadu, Karnataka, and Andhra Pradesh reachable from Madurai.',
  canonicalPath: '/destinations',
  noIndex: true,
});

export default function DestinationsPage() {
  const destinations = getAllDestinations();

  return (
    <div className="container-editorial py-12 md:py-16">
      <BreadcrumbNav
        items={[
          { name: 'Home', itemUrl: '/', position: 1 },
          { name: 'Destinations', itemUrl: '/destinations', position: 2 },
        ]}
        className="mb-8"
      />

      <div className="max-w-2xl mb-12">
        <span className="type-eyebrow text-[var(--color-terracotta-500)]">
          ORIGIN: MADURAI, TAMIL NADU
        </span>
        <h1 className="type-display-l text-[var(--text-primary)] mt-1 mb-4">
          South India Destinations
        </h1>
        <p className="type-body text-[var(--text-secondary)]">
          Explore destinations across 4 South Indian states with accurate highway distances, travel times, and vehicle arrangements from Madurai.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <DestinationCard
            key={dest.id}
            name={dest.name}
            state={dest.state}
            distanceKm={dest.distanceFromMaduraiKm}
            travelTime={dest.travelTimeFromMadurai}
            imageUrl={dest.heroImage.url}
            href={`/destinations/${dest.slug}`}
            shortDescription={dest.shortDescription}
          />
        ))}
      </div>
    </div>
  );
}
