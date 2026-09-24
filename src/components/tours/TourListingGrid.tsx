/**
 * MAHALAKSHMI TOUR & TRAVEL — TOUR LISTING GRID
 * Dynamic journey layout with visual rhythm, empty states, and custom journey interruptions.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';
import { Tour } from '@/types/tour';
import { JourneyCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface TourListingGridProps {
  tours: Tour[];
  onResetFilters: () => void;
}

export function TourListingGrid({ tours, onResetFilters }: TourListingGridProps) {
  // Empty State Handling
  if (tours.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] max-w-2xl mx-auto my-8">
        <div className="w-12 h-12 rounded-full bg-[var(--color-terracotta-100)] text-[var(--color-terracotta-700)] flex items-center justify-center mx-auto mb-4">
          <Compass className="w-6 h-6" />
        </div>
        <h3 className="type-h3 text-[var(--color-ink-950)] mb-2">
          That route isn&apos;t on our board yet.
        </h3>
        <p className="type-body-small text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
          We operate across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh. Tell us your destination, dates, and group size, and we will shape the route.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-[3px] border border-[var(--border-default)] bg-white hover:bg-[var(--color-paper-200)] transition-colors"
          >
            Reset Filters
          </button>
          <Link href="/plan-your-journey">
            <Button variant="primary" size="md" withArrow>
              Build a Custom Journey
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Primary Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour) => (
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

      {/* Strategic Editorial Interruption */}
      <div className="p-8 md:p-10 bg-[var(--color-ink-950)] text-[var(--color-paper-100)] rounded-[4px] border border-[var(--color-ink-800)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[var(--color-terracotta-400)]" />
            <span className="type-eyebrow text-[var(--color-terracotta-300)]">
              CUSTOM TRAVEL FROM MADURAI
            </span>
          </div>
          <h3 className="type-h3 text-white mb-2">
            Didn&apos;t find your exact route?
          </h3>
          <p className="type-body-small text-[var(--color-ink-300)]">
            We don&apos;t believe every journey needs to fit inside a rigid package. Tell us where you want to stop, and our Madurai travel coordinators will chart the itinerary and allocate the right vehicle.
          </p>
        </div>

        <Link href="/plan-your-journey" className="shrink-0">
          <Button variant="primary" size="md" withArrow>
            Build a Custom Journey
          </Button>
        </Link>
      </div>
    </div>
  );
}
