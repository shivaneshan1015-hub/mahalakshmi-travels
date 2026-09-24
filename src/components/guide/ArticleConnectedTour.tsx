/**
 * MAHALAKSHMI TOUR & TRAVEL — ARTICLE CONNECTED TOUR
 * Seamless contextual transition connecting informational guide to commercial tour package.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tour } from '@/types/tour';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Compass, Clock, MapPin } from 'lucide-react';

interface ArticleConnectedTourProps {
  tour?: Tour;
}

export function ArticleConnectedTour({ tour }: ArticleConnectedTourProps) {
  if (!tour) return null;

  return (
    <section className="my-10 p-6 md:p-8 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] shadow-editorial-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[var(--color-terracotta-500)]" />
          <span className="type-eyebrow text-[var(--color-terracotta-500)]">
            WANT US TO PLAN THIS JOURNEY?
          </span>
        </div>
        <Badge variant="terracotta" size="sm">
          {tour.duration.text}
        </Badge>
      </div>

      <h3 className="type-h3 text-[var(--color-ink-950)] mb-2">
        {tour.title}
      </h3>

      <p className="type-body-small text-[var(--text-secondary)] mb-6 leading-relaxed">
        Prefer having the vehicle transit and sightseeing schedule organized from Madurai? Explore our tour details.
      </p>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
        <div className="text-xs font-mono text-[var(--text-muted)]">
          Starting from Madurai • Door-to-door pickup
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href={`/tours/${tour.slug}`}>
            <Button variant="secondary" size="sm">
              View Itinerary
            </Button>
          </Link>
          <Link href={`/plan-your-journey?tour=${tour.slug}`}>
            <Button variant="primary" size="sm" withArrow>
              Plan This Journey
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
