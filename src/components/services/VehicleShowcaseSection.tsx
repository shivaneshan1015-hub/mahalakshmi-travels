/**
 * MAHALAKSHMI TOUR & TRAVEL — VEHICLE SHOWCASE SECTION
 * Editorial fleet showcase highlighting 21-seater van and sedan cars.
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

export function VehicleShowcaseSection() {
  const vehicles = getAllVehicles();
  const van = vehicles.find((v) => v.category === '21-seater-van') || vehicles[0];
  const sedan = vehicles.find((v) => v.category === 'sedan-car') || vehicles[1];

  return (
    <section className="border-t border-b border-[var(--border-default)] py-16 mb-16 bg-[var(--color-paper-100)]">
      <div className="container-editorial">
        <div className="max-w-2xl mb-10">
          <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
            IN-HOUSE MADURAI FLEET
          </span>
          <h2 className="type-display-m text-[var(--text-primary)] mb-2">
            The Vehicles
          </h2>
          <p className="type-body text-[var(--text-secondary)]">
            The right vehicle depends on the people, the route, and the journey. We operate and maintain our own fleet directly from Madurai.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 21-Seater Flagship Van (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)] p-6 md:p-8 flex flex-col justify-between shadow-editorial-sm">
            <div>
              <div className="flex justify-between items-center mb-3">
                <Badge variant="terracotta">Flagship Group Van</Badge>
                <span className="text-xs font-mono text-[var(--color-terracotta-500)] font-semibold">
                  20+1 Pushback Seats
                </span>
              </div>

              <h3 className="type-h3 text-[var(--color-ink-950)] mb-3">
                {van.name}
              </h3>

              <div className="relative aspect-[16/10] rounded-[3px] overflow-hidden mb-6 bg-[var(--color-ink-900)]">
                <Image
                  src={van.images[0]?.url || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop'}
                  alt={van.name}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="type-body-small text-[var(--text-secondary)] mb-6 leading-relaxed">
                {van.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-[var(--color-paper-100)] rounded-[3px] border border-[var(--border-subtle)]">
                  <span className="text-xs font-semibold block text-[var(--color-ink-950)]">Full Cabin Dual AC</span>
                  <span className="text-[10px] text-[var(--text-muted)]">Even cooling for all 20 passenger seats</span>
                </div>
                <div className="p-3 bg-[var(--color-paper-100)] rounded-[3px] border border-[var(--border-subtle)]">
                  <span className="text-xs font-semibold block text-[var(--color-ink-950)]">Western Ghats Permits</span>
                  <span className="text-[10px] text-[var(--text-muted)]">Permits for TN, Kerala, Karnataka, AP</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
              <a href={getQuickWhatsAppLink('21-Seater Van Availability')} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="md" withArrow>
                  Ask About Availability
                </Button>
              </a>
              <Link href="/vehicles/21-seater-van">
                <Button variant="secondary" size="md">
                  View Van Details
                </Button>
              </Link>
            </div>
          </div>

          {/* Sedan Fleet (5 Cols) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)] p-6 md:p-8 flex flex-col justify-between shadow-editorial-sm">
            <div>
              <div className="flex justify-between items-center mb-3">
                <Badge variant="paper">Private Outstation Cab</Badge>
                <span className="text-xs font-mono text-[var(--color-emerald-600)] font-bold">
                  24x7 Express Dispatch
                </span>
              </div>

              <h3 className="type-h3 text-[var(--color-ink-950)] mb-3">
                {sedan.name}
              </h3>

              <div className="relative aspect-[16/10] rounded-[3px] overflow-hidden mb-6 bg-[var(--color-ink-900)]">
                <Image
                  src={sedan.images[0]?.url || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop'}
                  alt={sedan.name}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="type-body-small text-[var(--text-secondary)] mb-6 leading-relaxed">
                {sedan.description}
              </p>

              <div className="space-y-2 mb-6">
                <div className="p-3 bg-[var(--color-paper-100)] rounded-[3px] border border-[var(--border-subtle)] flex justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Capacity:</span>
                  <strong>4 Passengers + Driver</strong>
                </div>
                <div className="p-3 bg-[var(--color-paper-100)] rounded-[3px] border border-[var(--border-subtle)] flex justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Ideal For:</span>
                  <span>Couples, Small Families, Outstation Trips, Airport Drops</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
              <a href={getQuickWhatsAppLink('Sedan Car Rental Quote')} target="_blank" rel="noopener noreferrer">
                <Button variant="emerald" size="md" withArrow>
                  Get Sedan Quote
                </Button>
              </a>
              <Link href="/vehicles/sedan-car">
                <Button variant="secondary" size="md">
                  View Rates & Specs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
