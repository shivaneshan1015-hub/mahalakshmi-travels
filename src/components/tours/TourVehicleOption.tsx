/**
 * MAHALAKSHMI TOUR & TRAVEL — TOUR VEHICLE OPTION
 * Connects the tour with Mahalakshmi's in-house 21-seater van and sedan fleet.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Wind, ShieldCheck, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function TourVehicleOption() {
  return (
    <section className="border-b border-[var(--border-default)] pb-12 mb-12">
      <div className="max-w-2xl mb-8">
        <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
          FLEET SPECIFICATIONS
        </span>
        <h2 className="type-h2 text-[var(--text-primary)] mb-2">
          Vehicles for This Journey
        </h2>
        <p className="type-body-small text-[var(--text-secondary)]">
          Choose between our flagship 21-seater passenger van or private sedan cars depending on your group size.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Option 1: 21-Seater Group Van */}
        <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <Badge variant="terracotta">Flagship Group Van</Badge>
              <span className="text-xs font-mono font-semibold text-[var(--color-terracotta-600)]">
                21 Seats (20+1)
              </span>
            </div>

            <h3 className="type-h3 text-[var(--color-ink-950)] mb-2">
              21-Seater AC Group Van
            </h3>

            <p className="type-body-small text-[var(--text-secondary)] mb-4">
              Spacious high-roof van with full-cabin dual AC, generous rear luggage space, and individual pushback seating for large families, college batches, and group tours.
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[var(--text-muted)]">Vehicle with Driver</span>
            <Link href="/vehicles/21-seater-van">
              <Button variant="secondary" size="sm" withArrow>
                View Van Specs
              </Button>
            </Link>
          </div>
        </div>

        {/* Option 2: Sedan Cars */}
        <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <Badge variant="paper">Family Travel</Badge>
              <span className="text-xs font-mono font-semibold text-[var(--color-ink-900)]">
                4 Passengers + Driver
              </span>
            </div>

            <h3 className="type-h3 text-[var(--color-ink-950)] mb-2">
              Private Sedan Cars
            </h3>

            <p className="type-body-small text-[var(--text-secondary)] mb-4">
              Clean, quiet comfort for couples, small families, and private outstation drops. Deep boot space for luggage and smooth highway ride quality.
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[var(--text-muted)]">Vehicle with Driver</span>
            <Link href="/vehicles/sedan-car">
              <Button variant="secondary" size="sm" withArrow>
                View Sedan Specs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
