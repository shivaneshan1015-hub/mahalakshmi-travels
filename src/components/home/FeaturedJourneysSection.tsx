/**
 * MAHALAKSHMI TOUR & TRAVEL — FEATURED JOURNEYS SECTION
 * Narrative 04: JOURNEY • "START SOMEWHERE. Short journeys. Long memories."
 */

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedTours } from '@/lib/data/tours';
import { JourneyCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function FeaturedJourneysSection() {
  const featuredTours = getFeaturedTours();

  return (
    <section className="py-16 md:py-24 border-b border-[var(--border-default)] bg-[#FFFFFF]">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="type-eyebrow text-[#D97706] block mb-2 font-bold tracking-widest">
              04 — CURATED TOUR PACKAGES
            </span>
            <h2 className="type-display-l text-[var(--text-primary)]">
              Start Somewhere.
            </h2>
            <p className="text-xs uppercase tracking-widest font-extrabold text-[var(--color-terracotta-500)] mt-1">
              Short journeys. Long memories.
            </p>
          </div>

          <Link href="/tours" className="hidden sm:inline-flex">
            <Button variant="secondary" size="md" withArrow>
              Explore All Tours
            </Button>
          </Link>
        </div>

        {/* Dynamic Journey Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {featuredTours.map((tour) => (
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

        {/* Bottom Explore All Tours CTA Block (Visible on all devices) */}
        <div className="pt-6 text-center border-t border-[var(--border-default)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono font-semibold text-[var(--color-ink-700)]">
            Viewing 3 featured routes • 39 Total South India tour packages available from Madurai
          </p>
          <Link href="/tours" className="w-full sm:w-auto">
            <Button variant="primary" size="md" withArrow fullWidth>
              Explore All 39 Tour Packages
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
