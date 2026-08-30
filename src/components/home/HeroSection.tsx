/**
 * MAHALAKSHMI TOUR & TRAVEL — HERO SECTION
 * Narrative 01: ORIGIN • "YOUR NEXT JOURNEY STARTS HERE."
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

import { HeroDualIntentBar } from './HeroDualIntentBar';

export function HeroSection() {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-[var(--border-default)]">
      <div className="container-editorial">
        {/* Top Origin Flag */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge variant="terracotta" size="md">
            Origin: Madurai
          </Badge>
          <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider">
            TAMIL NADU • KERALA • KARNATAKA • ANDHRA PRADESH
          </span>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Monumental Editorial Headline & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="type-display-xl text-[var(--text-primary)] mb-6 text-balance">
              Your Next <br />
              <span className="italic font-normal text-[var(--color-terracotta-500)]">Journey</span> <br />
              Starts Here.
            </h1>

            <p className="type-body-large text-[var(--text-secondary)] mb-2 max-w-xl leading-relaxed">
              Curated South India tour packages, outstation <strong>21-seater AC van rentals</strong>, and private sedan cab services—driven by verified local drivers from <strong>Madurai</strong>.
            </p>

            {/* Interactive Dual Intent Rental & Tour Booking Bar */}
            <HeroDualIntentBar />

            {/* Incomplete Route Motif Line */}
            <div className="relative pt-6 border-t border-[var(--border-subtle)] flex items-center gap-3">
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-ink-950)] ring-4 ring-[var(--color-paper-300)]" />
                <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-950)]">
                  MADURAI
                </span>
              </div>

              <div className="relative flex-1 flex items-center h-4">
                <div className="w-full h-px bg-[var(--color-ink-900)]" />
                <span className="absolute left-1/3 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta-500)]" />
                <span className="absolute left-2/3 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta-500)]" />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-terracotta-500)] ring-4 ring-[var(--color-terracotta-100)]" />
                <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[var(--color-terracotta-500)]">
                  SOUTH INDIA
                </span>
              </div>

              {/* Continuing route beyond frame */}
              <div className="hidden sm:flex items-center pl-1 shrink-0">
                <span className="w-8 h-px border-b border-dashed border-[var(--color-terracotta-500)]" />
                <ArrowRight className="w-3 h-3 text-[var(--color-terracotta-500)] -ml-1" />
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Hero Photography Block (Direct Clickable Tour Link) */}
          <div className="lg:col-span-5 relative">
            <Link
              href="/tours/munnar"
              className="block group relative aspect-[4/5] rounded-[4px] overflow-hidden bg-[var(--color-ink-900)] shadow-editorial-lg border border-[var(--border-default)] hover:border-[var(--color-terracotta-400)] transition-editorial cursor-pointer"
              title="Explore Madurai to Munnar Tour Package"
            >
              <Image
                src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop"
                alt="Scenic green tea gardens and winding mountain road in Munnar"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-950)]/80 via-transparent to-transparent" />

              {/* Floating Editorial Photo Tag */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="type-eyebrow text-[var(--color-terracotta-300)] block mb-1">
                  ROUTE 01 • THE WESTERN GHATS
                </span>
                <p className="type-h3 text-white mb-2 flex items-center justify-between">
                  <span>Madurai to Munnar</span>
                  <ArrowRight className="w-5 h-5 text-[var(--color-terracotta-400)] transition-transform duration-200 group-hover:translate-x-1" />
                </p>
                <div className="flex items-center justify-between text-xs font-mono text-white/80 pt-2 border-t border-white/20">
                  <span>157 KM via Bodi Mettu</span>
                  <span>1 Night / 2 Days</span>
                </div>
              </div>
            </Link>

            {/* Micro Badge Overlay */}
            <div className="absolute -bottom-4 -left-4 bg-[var(--color-paper-100)] border border-[var(--border-default)] px-3.5 py-2.5 rounded-[4px] shadow-editorial-md hidden sm:flex items-center gap-2.5 z-10 pointer-events-none">
              <Shield className="w-4 h-4 text-[var(--color-terracotta-500)]" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-950)] leading-tight">
                  Dedicated Fleet
                </p>
                <p className="text-[10px] text-[var(--text-muted)] font-mono">
                  21-Seater Van & Sedan Cars
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
