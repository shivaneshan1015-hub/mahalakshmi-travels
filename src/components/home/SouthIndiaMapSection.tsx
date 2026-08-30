/**
 * MAHALAKSHMI TOUR & TRAVEL — SIGNATURE SOUTH INDIA MAP SECTION
 * Narrative 03: SIGNATURE INTERACTIVE DISCOVERY • THE INCOMPLETE JOURNEY
 */

import React from 'react';
import { SouthIndiaMapEngine } from '@/components/map/SouthIndiaMapEngine';
import { AccessibleDestinationList } from '@/components/map/AccessibleDestinationList';

export function SouthIndiaMapSection() {
  return (
    <section className="py-16 md:py-24 border-b border-[var(--border-default)] bg-[var(--bg-primary)]">
      <div className="container-editorial">
        {/* Section Headline */}
        <div className="max-w-2xl mb-12">
          <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
            03 — SIGNATURE INTERACTIVE DISCOVERY
          </span>
          <h2 className="type-display-l text-[var(--text-primary)] mb-4">
            Discover South India from Madurai
          </h2>
          <p className="type-body text-[var(--text-secondary)]">
            Explore road distances, mountain passes, and travel routes originating from our Madurai depot across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.
          </p>
        </div>

        {/* Interactive Map Engine */}
        <SouthIndiaMapEngine />

        {/* Accessible Non-Map Fallback Alternative */}
        <div className="mt-14">
          <AccessibleDestinationList />
        </div>
      </div>
    </section>
  );
}
