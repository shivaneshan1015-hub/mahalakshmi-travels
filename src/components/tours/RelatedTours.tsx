/**
 * MAHALAKSHMI TOURS AND TRAVELS — RELATED TOURS COMPONENT
 * Shows contextually related journeys based on state and destination (compact layout).
 */

import React from 'react';
import Link from 'next/link';
import { Tour } from '@/types/tour';
import { JourneyCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface RelatedToursProps {
  currentTourId: string;
  relatedTours: Tour[];
}

export function RelatedTours({ currentTourId, relatedTours }: RelatedToursProps) {
  const filteredTours = relatedTours.filter((t) => t.id !== currentTourId).slice(0, 3);

  if (filteredTours.length === 0) return null;

  return (
    <section className="border-b border-[var(--border-default)] pb-12 mb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
            SIMILAR ROUTES FROM MADURAI
          </span>
          <h2 className="type-h2 text-[var(--text-primary)]">
            Related Journeys
          </h2>
        </div>

        <Link href="/tours">
          <Button variant="secondary" size="sm" withArrow>
            View All Journeys
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredTours.map((tour) => (
          <JourneyCard
            key={tour.id}
            title={tour.title}
            destination={`${tour.destination}, ${tour.state}`}
            durationText={tour.duration.text}
            distanceKm={tour.distanceKm}
            imageUrl={tour.heroImage.url}
            href={`/tours/${tour.slug}`}
            customisable={tour.customisable}
            size="sm"
          />
        ))}
      </div>
    </section>
  );
}
