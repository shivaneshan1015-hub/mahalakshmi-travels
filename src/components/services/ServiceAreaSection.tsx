/**
 * MAHALAKSHMI TOUR & TRAVEL — SERVICE AREA SECTION
 * Conceptual Section: "FROM MADURAI, OUTWARD."
 */

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function ServiceAreaSection() {
  const regions = [
    {
      state: 'Tamil Nadu',
      tagline: 'Temple Towns & Hill Roads',
      hubs: ['Kodaikanal', 'Rameswaram', 'Ooty', 'Kanyakumari', 'Palani'],
    },
    {
      state: 'Kerala',
      tagline: 'Western Ghats & Spice Forests',
      hubs: ['Munnar', 'Thekkady', 'Kumily', 'Cochin Pass'],
    },
    {
      state: 'Karnataka',
      tagline: 'Heritage & Corporate Circuits',
      hubs: ['Bengaluru', 'Mysore Palace', 'Coorg Hills'],
    },
    {
      state: 'Andhra Pradesh',
      tagline: 'Pilgrimage Corridors',
      hubs: ['Tirupati', 'Tirumala Hills', 'Chittoor'],
    },
  ];

  return (
    <section className="mb-16">
      <div className="bg-[var(--color-paper-100)] border border-[var(--border-default)] rounded-[4px] p-8 md:p-12">
        <div className="max-w-2xl mb-8">
          <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
            REGIONAL COVERAGE
          </span>
          <h2 className="type-display-m text-[var(--text-primary)] mb-2">
            From Madurai, Outward.
          </h2>
          <p className="type-body text-[var(--text-secondary)]">
            Our depot is in Madurai, but our travel network spans across South India with licensed commercial permits and experienced drivers.
          </p>
        </div>

        {/* 4 States Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-[var(--border-subtle)]">
          {regions.map((reg) => (
            <div key={reg.state} className="p-4 bg-[#FFFFFF] rounded-[3px] border border-[var(--border-subtle)]">
              <h3 className="type-h4 text-[var(--color-ink-950)] mb-1">
                {reg.state}
              </h3>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--color-terracotta-500)] font-semibold block mb-3">
                {reg.tagline}
              </span>
              <div className="flex flex-wrap gap-1">
                {reg.hubs.map((hub) => (
                  <span
                    key={hub}
                    className="text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--color-paper-100)] px-2 py-0.5 rounded border border-[var(--border-subtle)]"
                  >
                    {hub}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
