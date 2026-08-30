/**
 * MAHALAKSHMI TOUR & TRAVEL — TOUR LISTING HEADER
 * Compact, editorial hero introduction for /tours.
 */

import React from 'react';
import { Badge } from '@/components/ui/Badge';

export function TourListingHeader() {
  return (
    <div className="border-b border-[var(--border-default)] pb-10 mb-10">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge variant="terracotta">Journey Library</Badge>
        <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider">
          ALL CIRCUITS ORIGINATE IN MADURAI
        </span>
      </div>

      <div className="max-w-3xl">
        <h1 className="type-display-l text-[var(--text-primary)] mb-4">
          Explore Journeys.
        </h1>
        <p className="type-body-large text-[var(--text-secondary)] leading-relaxed">
          Curated short-format hill escapes, coastal corridors, and group pilgrimages across South India—planned with local pacing, dedicated drivers, and vehicle options for every group size.
        </p>
      </div>
    </div>
  );
}
