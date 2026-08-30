/**
 * MAHALAKSHMI TOUR & TRAVEL — SERVICE RELATED TOURS
 * Connects a travel service with suggested tour circuits.
 */

import React from 'react';
import Link from 'next/link';
import { Tour } from '@/types/tour';
import { JourneyCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ServiceRelatedToursProps {
  relatedTours: Tour[];
}

export function ServiceRelatedTours({ relatedTours }: ServiceRelatedToursProps) {
  if (!relatedTours || relatedTours.length === 0) return null;

  return (
    <section className="border-b border-[var(--border-default)] pb-12 mb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
            POPULAR CIRCUITS FOR THIS SERVICE
          </span>
          <h2 className="type-h2 text-[var(--text-primary)]">
            Suggested Journeys
          </h2>
        </div>

        <Link href="/tours">
          <Button variant="secondary" size="sm" withArrow>
            View All Journeys
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedTours.slice(0, 3).map((tour) => (
          <JourneyCard
            key={tour.id}
            title={tour.title}
            destination={`${tour.destination}, ${tour.state}`}
            durationText={tour.duration.text}
            distanceKm={tour.distanceKm}
            imageUrl={tour.heroImage.url}
            href={`/tours/${tour.slug}`}
            customisable={tour.customisable}
            tags={tour.idealFor.map((i) => i.toUpperCase())}
          />
        ))}
      </div>
    </section>
  );
}
