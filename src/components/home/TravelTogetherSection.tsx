/**
 * MAHALAKSHMI TOUR & TRAVEL — TRAVEL TOGETHER / VEHICLE SECTION
 * Narrative 05: TRAVEL TOGETHER • "Not every journey starts with a package."
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Wind, ShieldCheck, ArrowRight } from 'lucide-react';
import { getAllVehicles } from '@/lib/data/vehicles';
import { DataAnchor } from '@/components/ui/DataAnchor';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';

export function TravelTogetherSection() {
  const vehicles = getAllVehicles();
  const van21 = vehicles.find((v) => v.category === '21-seater-van') || vehicles[0];
  const sedan = vehicles.find((v) => v.category === 'sedan-car') || vehicles[1];

  const useCases = [
    { label: 'Family Travel', href: '/family-travel' },
    { label: 'College Trips', href: '/college-trips' },
    { label: 'Group Travel', href: '/group-travel' },
    { label: 'Function & Weddings', href: '/function-travel' },
  ];

  return (
    <section className="py-16 md:py-24 border-b border-[var(--border-default)] bg-[var(--color-paper-100)]">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
              05 — OUTSTATION & CITY VEHICLE RENTALS
            </span>
            <h2 className="type-display-l text-[var(--text-primary)] mb-3">
              Vehicle Rental with Driver.
            </h2>
            <p className="type-body text-[var(--text-secondary)]">
              Looking for a dependable vehicle for your own custom itinerary? Rent our verified commercial AC vans and private sedans from Madurai with South Indian highway route support.
            </p>
          </div>
          <Link href="/vehicles" className="shrink-0">
            <Button variant="secondary" size="md" withArrow>
              Explore All Rental Fleet
            </Button>
          </Link>
        </div>

        {/* 21-Seater Flagship Hero Showcase */}
        <div className="bg-[#FFFFFF] border border-[var(--border-default)] rounded-[4px] p-6 md:p-10 mb-10 shadow-editorial-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Photo */}
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-[3px] overflow-hidden bg-[var(--color-ink-900)]">
              <Image
                src={van21.images[0]?.url || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop'}
                alt="21 Seater Van Rental in Madurai"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="terracotta">21-Seater AC Van Rental</Badge>
              </div>
            </div>

            {/* Right Details */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <DataAnchor
                    value="21"
                    unit="SEATS"
                    sublabel="GROUP OUTSTATION RENTAL"
                  />
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    Depot: Madurai
                  </span>
                </div>

                <h3 className="type-h3 text-[var(--color-ink-950)] mt-2 mb-3">
                  21-Seater AC Van Rental (Tempo / Mini Coach)
                </h3>

                <p className="type-body-small text-[var(--text-secondary)] mb-6">
                  Spacious 20+1 pushback seating van with dual AC, music system, and top luggage carrier. Built for college industrial visits, joint family temple tours, and wedding guest transfers from Madurai.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="p-2.5 bg-[var(--color-paper-100)] rounded-[3px] border border-[var(--border-subtle)]">
                    <span className="text-xs font-semibold block text-[var(--color-ink-950)]">Full Cabin Dual AC</span>
                    <span className="text-[11px] text-[var(--text-muted)]">Even cooling across all 20 passenger seats</span>
                  </div>
                  <div className="p-2.5 bg-[var(--color-paper-100)] rounded-[3px] border border-[var(--border-subtle)]">
                    <span className="text-xs font-semibold block text-[var(--color-ink-950)]">Western Ghats Coverage</span>
                    <span className="text-[11px] text-[var(--text-muted)] font-mono">TN, Kerala, Karnataka, AP, Telangana</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <a href={getQuickWhatsAppLink('21-Seater Van Rental Quote')} target="_blank" rel="noopener noreferrer">
                  <Button variant="emerald" size="md" withArrow>
                    Van Rental Quote
                  </Button>
                </a>
                <Link href="/vehicles/21-seater-van">
                  <Button variant="secondary" size="md">
                    View Vehicle Specs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sedan Travel Feature & Use Cases Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Sedan Highlight Box (7 Cols) */}
          <div className="md:col-span-7 bg-[#FFFFFF] border border-[var(--border-default)] rounded-[4px] p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="paper">Private Outstation Cab</Badge>
                <span className="font-mono text-xs text-[var(--color-emerald-600)] font-bold">Express Dispatch</span>
              </div>
              <h3 className="type-h3 text-[var(--color-ink-950)] mt-2 mb-2">
                Sedan Car Rental (AC Prime / Dzire / Etios)
              </h3>
              <p className="type-body-small text-[var(--text-secondary)] mb-6">
                Spotless, comfortable AC sedan cars for small family holidays, temple darshans, Madurai Airport (IXM) drops, and weekend hill station trips.
              </p>
            </div>
            <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-[var(--text-muted)]">4 Passengers + Driver • 400L Boot</span>
              <div className="flex items-center gap-2">
                <a href={getQuickWhatsAppLink('Sedan Rental Quote')} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="sm" withArrow>
                    Book Sedan
                  </Button>
                </a>
                <Link href="/vehicles/sedan-car">
                  <Button variant="secondary" size="sm">
                    View Specs
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Use-Case Links (5 Cols) */}
          <div className="md:col-span-5 bg-[var(--color-ink-950)] text-white rounded-[4px] p-6 md:p-8 border border-[var(--color-ink-800)] flex flex-col justify-between">
            <div>
              <span className="type-eyebrow text-[var(--color-terracotta-300)] block mb-2">
                EXPLORE BY USE CASE
              </span>
              <h4 className="type-h3 text-white mb-4">
                Tailored for Your Group
              </h4>
              <ul className="space-y-2">
                {useCases.map((uc) => (
                  <li key={uc.label}>
                    <Link
                      href={uc.href}
                      className="flex items-center justify-between p-2 rounded hover:bg-white/10 text-xs uppercase tracking-wider font-semibold text-[var(--color-paper-100)] transition-colors"
                    >
                      <span>{uc.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--color-terracotta-400)]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[11px] italic font-serif text-[var(--color-ink-400)] mt-4">
              “Your Journey. Our Care.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
