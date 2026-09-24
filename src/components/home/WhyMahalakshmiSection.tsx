/**
 * MAHALAKSHMI TOURS AND TRAVELS — WHY MAHALAKSHMI SECTION
 * Narrative 07: TRUST • "LOCAL EXPERTISE & CARE"
 */

import React from 'react';
import { DataAnchor } from '@/components/ui/DataAnchor';

export function WhyMahalakshmiSection() {
  const trustPoints = [
    {
      value: '01',
      unit: 'HQ',
      sublabel: 'MADURAI CENTRAL DEPOT',
      description: 'Centrally based in Madurai, coordinating departures, pickups, and driver allocations directly without middlemen.',
    },
    {
      value: '05',
      unit: 'STATES',
      sublabel: 'SOUTH INDIA REACH',
      description: 'Complete tour and vehicle coverage across Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, and Telangana.',
    },
    {
      value: '21',
      unit: 'SEATS',
      sublabel: 'IN-HOUSE GROUP VAN',
      description: 'Flagship 20+1 AC passenger van maintained for college industrial visits, wedding guest transfers, and family tours.',
    },
    {
      value: '100%',
      unit: 'CUSTOM',
      sublabel: 'TAILORED ITINERARIES',
      description: 'Flexible timings, unhurried rest stops, and custom route adjustments for multi-generational families.',
    },
  ];

  return (
    <section className="py-16 md:py-24 border-b border-[var(--border-default)] bg-[#F1F5F9]">
      <div className="container-editorial">
        <div className="max-w-2xl mb-14">
          <span className="type-eyebrow text-[#EA580C] block mb-2 font-bold tracking-widest">
            07 — LOCAL EXPERTISE & CARE
          </span>
          <h2 className="type-display-l text-[var(--text-primary)] mb-4">
            Made for Real Journeys.
          </h2>
          <p className="type-body text-[var(--color-ink-700)] font-medium">
            We operate our own vehicles with local route familiarity across South Indian roads, mountain ghats, and family pacing.
          </p>
        </div>

        {/* Factual Trust Anchors Grid — Perfectly Aligned */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {trustPoints.map((point) => (
            <div
              key={point.sublabel}
              className="p-6 bg-[#FFFFFF] rounded-[8px] border-2 border-[var(--border-default)] flex flex-col justify-between shadow-md hover:border-[var(--color-terracotta-500)] transition-all group"
            >
              <div className="mb-4">
                <DataAnchor
                  value={point.value}
                  unit={point.unit}
                  sublabel={point.sublabel}
                />
              </div>
              <p className="type-body-small text-[var(--color-ink-700)] pt-4 border-t border-[var(--border-default)] leading-relaxed font-medium">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
