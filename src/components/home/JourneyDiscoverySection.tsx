/**
 * MAHALAKSHMI TOUR & TRAVEL — JOURNEY DISCOVERY SECTION
 * Narrative 02: POSSIBILITY • "WHERE WILL YOU GO?"
 */

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function JourneyDiscoverySection() {
  const directions = [
    {
      state: 'Tamil Nadu',
      tagline: 'Temple Towns • Palani Hill Roads • Coastal Shores',
      description: 'From the ancient sanctums of Madurai to the cool heights of Kodaikanal and the Pamban sea crossing to Rameswaram.',
      destinations: ['Kodaikanal', 'Rameswaram', 'Ooty', 'Kanyakumari'],
      routeHighlight: '120–240 KM Circuits',
      href: '/tours?state=Tamil+Nadu',
    },
    {
      state: 'Kerala',
      tagline: 'Mist • High Ranges • Tea Terraces',
      description: 'Ascend the Bodi Mettu pass from Madurai into the sprawling emerald plantations of Munnar and the Periyar wildlife forests.',
      destinations: ['Munnar', 'Thekkady', 'Wayanad'],
      routeHighlight: '157 KM Mountain Pass',
      href: '/tours?state=Kerala',
    },
    {
      state: 'Karnataka',
      tagline: 'Coffee Country • Royal Heritage • Western Ghats',
      description: 'Expansive group and family circuits through the historic palaces of Mysore and the forested hills of Coorg and Chikmagalur.',
      destinations: ['Bengaluru', 'Mysore', 'Coorg'],
      routeHighlight: 'Extended Group Routes',
      href: '/tours?state=Karnataka',
    },
    {
      state: 'Andhra Pradesh',
      tagline: 'Sacred Hills • Heritage Corridors • Coastal Routes',
      description: 'Dedicated group transport and private pilgrimage journeys to the sacred Seven Hills of Tirupati and historic cultural landmarks.',
      destinations: ['Tirupati', 'Tirumala'],
      routeHighlight: 'Special Group Charters',
      href: '/tours?state=Andhra+Pradesh',
    },
  ];

  return (
    <section className="py-16 md:py-24 border-b border-[var(--border-default)]">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
              02 — FOUR DIRECTIONS FROM MADURAI
            </span>
            <h2 className="type-display-l text-[var(--text-primary)]">
              Where Will <br className="hidden sm:inline" />
              You Go?
            </h2>
          </div>
          <p className="type-body text-[var(--text-secondary)] max-w-md">
            From the heart of Madurai, the road opens across South India. Explore hill stations, spiritual corridors, and tranquil mountain passes.
          </p>
        </div>

        {/* Direction Blocks Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {directions.map((dir, idx) => (
            <div
              key={dir.state}
              className="p-6 md:p-7 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] hover:border-[var(--color-terracotta-400)] transition-editorial flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-4">
                  <span>0{idx + 1}</span>
                  <span className="text-[var(--color-terracotta-500)] font-semibold">{dir.routeHighlight}</span>
                </div>

                <h3 className="type-h3 text-[var(--color-ink-950)] group-hover:text-[var(--color-terracotta-500)] transition-colors mb-2">
                  {dir.state}
                </h3>

                <p className="text-xs uppercase tracking-wider font-semibold text-[var(--color-terracotta-500)] mb-3">
                  {dir.tagline}
                </p>

                <p className="type-body-small text-[var(--text-secondary)] mb-6">
                  {dir.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-subtle)] mb-5">
                  {dir.destinations.map((d) => (
                    <span
                      key={d}
                      className="text-[10px] uppercase font-mono tracking-wider text-[var(--text-muted)] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[var(--border-subtle)]"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <Link
                  href={dir.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-950)] group-hover:text-[var(--color-terracotta-500)] transition-colors"
                >
                  <span>Explore {dir.state}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
