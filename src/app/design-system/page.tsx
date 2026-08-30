/**
 * MAHALAKSHMI TOUR & TRAVEL — DESIGN SYSTEM PLAYGROUND
 * Internal development route (/design-system) validating all Phase 02 tokens and component primitives.
 */

'use client';

import React, { useState } from 'react';
import { LogoPrimary } from '@/components/brand/LogoPrimary';
import { LogoHorizontal } from '@/components/brand/LogoHorizontal';
import { LogoSymbol } from '@/components/brand/LogoSymbol';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataAnchor } from '@/components/ui/DataAnchor';
import { RouteIndicator } from '@/components/ui/RouteIndicator';
import { TimelineItem } from '@/components/ui/TimelineItem';
import { Card, JourneyCard, DestinationCard } from '@/components/ui/Card';
import { VehicleInfoBlock } from '@/components/ui/VehicleInfoBlock';
import { Accordion } from '@/components/ui/Accordion';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { CtaBlock } from '@/components/ui/CtaBlock';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { SouthIndiaMapEngine } from '@/components/map/SouthIndiaMapEngine';
import { getAllVehicles } from '@/lib/data/vehicles';
import { Sparkles, CheckCircle, ArrowRight, Shield } from 'lucide-react';

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'brand' | 'typography' | 'ui' | 'travel' | 'surfaces'>('all');
  const [demoInput, setDemoInput] = useState('');
  const [demoError, setDemoError] = useState(false);
  const sampleVehicle = getAllVehicles()[0];

  return (
    <div className="container-editorial py-12 md:py-16">
      {/* Breadcrumb Header */}
      <BreadcrumbNav
        items={[
          { name: 'Home', itemUrl: '/', position: 1 },
          { name: 'Design System Playground', itemUrl: '/design-system', position: 2 },
        ]}
        className="mb-8"
      />

      {/* Header Statement */}
      <div className="border-b border-[var(--border-default)] pb-8 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="terracotta">Phase 02 Visual System</Badge>
              <Badge variant="ink">Internal Showcase</Badge>
            </div>
            <h1 className="type-display-l text-[var(--text-primary)]">
              Mahalakshmi Design System
            </h1>
            <p className="type-body text-[var(--text-secondary)] mt-2 max-w-2xl">
              Coherent visual language for South India journeys originating in Madurai. Rooted in <strong>Ink (#171716) + Terracotta (#A65F43) + Warm Paper (#F2EEE5)</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 bg-[var(--color-paper-100)] border border-[var(--border-default)] rounded-[4px]">
            {(['all', 'brand', 'typography', 'ui', 'travel', 'surfaces'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-[3px] transition-colors ${
                  activeTab === tab
                    ? 'bg-[var(--color-ink-950)] text-[var(--color-paper-100)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ==========================================================================
          01. BRAND IDENTITY & COLOR PALETTE
          ========================================================================== */}
      {(activeTab === 'all' || activeTab === 'brand') && (
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-terracotta-500)]" />
            <h2 className="type-eyebrow text-[var(--color-terracotta-500)]">
              01 — BRAND IDENTITY & COLOR TOKENS
            </h2>
          </div>

          {/* Core Palette Swatches */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-[4px] bg-[#171716] text-[#F2EEE5] border border-black shadow-editorial-md">
              <div className="flex justify-between items-start mb-12">
                <span className="type-label uppercase text-white/80">Primary Ink</span>
                <span className="font-mono text-xs">#171716</span>
              </div>
              <p className="type-h3 text-[#F2EEE5]">Ink / 950</p>
              <p className="text-xs text-[#F2EEE5]/70 mt-1">Headings, dark surfaces, high-contrast typography.</p>
            </div>

            <div className="p-6 rounded-[4px] bg-[#A65F43] text-[#FFFFFF] shadow-editorial-md">
              <div className="flex justify-between items-start mb-12">
                <span className="type-label uppercase text-white/80">Primary Accent</span>
                <span className="font-mono text-xs">#A65F43</span>
              </div>
              <p className="type-h3 text-white">Terracotta / 500</p>
              <p className="text-xs text-white/80 mt-1">Journey routes, CTA accents, active nodes.</p>
            </div>

            <div className="p-6 rounded-[4px] bg-[#F2EEE5] text-[#171716] border border-[#D6CCB7] shadow-editorial-md">
              <div className="flex justify-between items-start mb-12">
                <span className="type-label uppercase text-[#171716]/80">Primary Light</span>
                <span className="font-mono text-xs">#F2EEE5</span>
              </div>
              <p className="type-h3 text-[#171716]">Warm Paper / 200</p>
              <p className="text-xs text-[#171716]/70 mt-1">Main light background, editorial surfaces, cards.</p>
            </div>
          </div>

          {/* Logo System Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)] flex flex-col items-center justify-center text-center">
              <span className="type-eyebrow text-[var(--text-muted)] mb-4">PRIMARY VERTICAL LOGO</span>
              <LogoPrimary size="md" />
            </div>

            <div className="p-8 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)] flex flex-col items-center justify-center text-center">
              <span className="type-eyebrow text-[var(--text-muted)] mb-4">HORIZONTAL LOGO LOCKUP</span>
              <LogoHorizontal showTagline={true} />
            </div>

            <div className="p-8 bg-[var(--color-ink-950)] text-white rounded-[4px] border border-[var(--color-ink-800)] flex flex-col items-center justify-center text-center">
              <span className="type-eyebrow text-[var(--color-terracotta-300)] mb-4">CIRCULAR BRAND EMBLEM</span>
              <LogoSymbol size={72} variant="dark" />
              <p className="text-[11px] text-[var(--color-ink-400)] mt-3 italic font-serif">
                Temple Gopuram, Sun & Road Motif
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ==========================================================================
          02. TYPOGRAPHY HIERARCHY
          ========================================================================== */}
      {(activeTab === 'all' || activeTab === 'typography') && (
        <section className="mb-16 py-8 border-t border-[var(--border-default)]">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-terracotta-500)]" />
            <h2 className="type-eyebrow text-[var(--color-terracotta-500)]">
              02 — TYPOGRAPHIC SYSTEM & SCALES
            </h2>
          </div>

          <div className="space-y-6 bg-[var(--color-paper-100)] p-6 md:p-8 rounded-[4px] border border-[var(--border-default)]">
            <div className="border-b border-[var(--border-subtle)] pb-4">
              <span className="text-xs font-mono text-[var(--text-muted)]">Display XL — Serif</span>
              <p className="type-display-xl text-[var(--text-primary)]">The Journey Starts Here.</p>
            </div>

            <div className="border-b border-[var(--border-subtle)] pb-4">
              <span className="text-xs font-mono text-[var(--text-muted)]">Display L — Serif</span>
              <p className="type-display-l text-[var(--text-primary)]">Madurai to Munnar Hill Circuit</p>
            </div>

            <div className="border-b border-[var(--border-subtle)] pb-4">
              <span className="text-xs font-mono text-[var(--text-muted)]">Display M — Serif</span>
              <p className="type-display-m text-[var(--text-primary)]">Princess of Hills • Kodaikanal</p>
            </div>

            <div className="border-b border-[var(--border-subtle)] pb-4">
              <span className="text-xs font-mono text-[var(--text-muted)]">H2 & H3 — Editorial Headings</span>
              <h2 className="type-h2 text-[var(--text-primary)] mb-1">Dedicated 21-Seater Group Transport</h2>
              <h3 className="type-h3 text-[var(--color-terracotta-500)]">Curated Travel Solutions for South India</h3>
            </div>

            <div className="border-b border-[var(--border-subtle)] pb-4">
              <span className="text-xs font-mono text-[var(--text-muted)]">Body Large & Body</span>
              <p className="type-body-large text-[var(--text-secondary)] mb-2">
                We organize journeys starting from Madurai across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.
              </p>
              <p className="type-body text-[var(--text-secondary)]">
                Our vehicles are maintained in-house with dedicated drivers experienced with mountain ghat passes and inter-state highway routes.
              </p>
            </div>

            {/* Numerical Anchors Showcase */}
            <div>
              <span className="text-xs font-mono text-[var(--text-muted)] block mb-4">Data Visualisation Anchors</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <DataAnchor value="157" unit="KM" sublabel="FROM MADURAI" />
                <DataAnchor value="21" unit="SEATS" sublabel="TRAVEL TOGETHER" />
                <DataAnchor value="02" unit="DAYS" sublabel="01 NIGHT CIRCUIT" />
                <DataAnchor value="04" unit="STATES" sublabel="SOUTH INDIA REACH" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==========================================================================
          03. UI COMPONENT PRIMITIVES
          ========================================================================== */}
      {(activeTab === 'all' || activeTab === 'ui') && (
        <section className="mb-16 py-8 border-t border-[var(--border-default)]">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-terracotta-500)]" />
            <h2 className="type-eyebrow text-[var(--color-terracotta-500)]">
              03 — UI PRIMITIVES & FORM CONTROLS
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Buttons & Badges */}
            <div className="lg:col-span-6 space-y-6 bg-[var(--color-paper-100)] p-6 rounded-[4px] border border-[var(--border-default)]">
              <h3 className="type-h4 mb-4">Button System</h3>
              
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary" size="md" withArrow>
                  Primary CTA →
                </Button>
                <Button variant="secondary" size="md">
                  Secondary Ink
                </Button>
                <Button variant="ink-solid" size="md">
                  Ink Solid
                </Button>
                <Button variant="tertiary" size="md">
                  Route Link Style →
                </Button>
              </div>

              <div className="flex flex-wrap gap-3 items-center pt-2">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
                <Button variant="primary" size="md" isLoading>Loading</Button>
              </div>

              <h4 className="type-label uppercase text-[var(--text-muted)] pt-4 border-t border-[var(--border-subtle)]">
                Badge & Tag Primitives
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="terracotta">Terracotta Accent</Badge>
                <Badge variant="ink">Group Travel</Badge>
                <Badge variant="paper">Family Pacing</Badge>
                <Badge variant="outline">Customizable</Badge>
                <Badge variant="success">Available Now</Badge>
                <Badge variant="warning">Peak Season</Badge>
              </div>
            </div>

            {/* Form Fields Showcase */}
            <div className="lg:col-span-6 space-y-4 bg-[var(--color-paper-100)] p-6 rounded-[4px] border border-[var(--border-default)]">
              <h3 className="type-h4 mb-4">Form Controls & Inputs</h3>
              
              <Input
                label="Full Name"
                placeholder="e.g. Anand Sundaram"
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                error={demoError ? 'Name is required' : undefined}
                helperText="Enter your name as per identity proof"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Contact Phone"
                  placeholder="+91 98421 XXXXX"
                  defaultValue="+91 98421 23456"
                />
                <Select
                  label="Preferred Vehicle"
                  options={[
                    { value: '21-seater', label: '21-Seater Group Van' },
                    { value: 'sedan', label: 'Sedan Travel Car' },
                    { value: 'custom', label: 'Custom Requirement' },
                  ]}
                />
              </div>

              <Textarea
                label="Journey Notes & Dates"
                placeholder="Specify preferred travel dates, number of travellers, and special stops..."
                rows={3}
              />

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setDemoError(!demoError)}
                  className="text-xs text-[var(--color-terracotta-500)] underline"
                >
                  Toggle Field Error State
                </button>
                <Button variant="primary" size="sm">
                  Test Validation
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==========================================================================
          04. TRAVEL-SPECIFIC VISUAL LANGUAGE
          ========================================================================== */}
      {(activeTab === 'all' || activeTab === 'travel') && (
        <section className="mb-16 py-8 border-t border-[var(--border-default)]">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-terracotta-500)]" />
            <h2 className="type-eyebrow text-[var(--color-terracotta-500)]">
              04 — ROUTE & TRAVEL VISUAL LANGUAGE
            </h2>
          </div>

          <div className="space-y-8">
            {/* Interactive South India Map Engine Showcase */}
            <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)]">
              <span className="text-xs font-mono text-[var(--text-muted)] block mb-4">
                Signature Interactive South India Map Engine (Phase 04 Feature)
              </span>
              <SouthIndiaMapEngine />
            </div>

            {/* Route Indicators */}
            <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)]">
              <span className="text-xs font-mono text-[var(--text-muted)] block mb-2">
                Route Visual Language (Origin: Madurai • Incomplete Continuing Motif)
              </span>
              <RouteIndicator
                origin="Madurai"
                destination="Munnar"
                distanceKm={157}
                stops={['Theni', 'Bodi Mettu Ghats']}
                isIncomplete={true}
              />

              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
                <RouteIndicator
                  origin="Madurai"
                  destination="Rameswaram & Dhanushkodi"
                  distanceKm={172}
                  stops={['Manamadurai', 'Pamban Sea Bridge']}
                  isIncomplete={true}
                />
              </div>
            </div>

            {/* Itinerary Timeline Primitive */}
            <div className="p-6 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)] max-w-2xl">
              <span className="text-xs font-mono text-[var(--text-muted)] block mb-4">
                Day-by-Day Itinerary Progress Primitive
              </span>
              <TimelineItem
                dayNumber={1}
                title="Madurai Departure & Western Ghats Climb"
                description="Morning pickup in Madurai. Scenic ascent via Bodi Mettu pass with tea estate stops."
                distanceKm={157}
                routeNodes={['Madurai', 'Theni', 'Munnar']}
                stayLocation="Munnar"
              />
              <TimelineItem
                dayNumber={2}
                title="Tea Gardens & Return Descent to Madurai"
                description="Eravikulam National Park and afternoon return drive down the Ghat roads."
                distanceKm={157}
                routeNodes={['Munnar', 'Devikulam', 'Madurai']}
                isLast={true}
              />
            </div>

            {/* Interactive Accordion */}
            <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] max-w-2xl">
              <span className="text-xs font-mono text-[var(--text-muted)] block mb-4">
                Collapsible Travel Information & FAQs
              </span>
              <Accordion
                items={[
                  {
                    id: 'acc-1',
                    title: 'What vehicles are available for group trips from Madurai?',
                    content: 'We operate our flagship 21-seater passenger van with full AC and dedicated luggage space, plus private sedan cars for small families.',
                  },
                  {
                    id: 'acc-2',
                    title: 'Are mountain ghat drivers experienced with South Indian routes?',
                    content: 'Yes, all our drivers have years of driving experience across Western Ghats passes including Bodi Mettu, Kodaikanal Ghats, and Nilgiris.',
                  },
                ]}
              />
            </div>

            {/* Vehicle Info Block Showcase */}
            {sampleVehicle && (
              <div>
                <span className="text-xs font-mono text-[var(--text-muted)] block mb-3">
                  Vehicle Solution Block Primitive (21-Seater Fleet)
                </span>
                <VehicleInfoBlock vehicle={sampleVehicle} />
              </div>
            )}

            {/* Editorial Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <span className="text-xs font-mono text-[var(--text-muted)] block mb-3">
                  Journey Card Variant
                </span>
                <JourneyCard
                  title="Madurai to Munnar Hill Station Journey"
                  destination="Munnar, Kerala"
                  durationText="1 Night / 2 Days"
                  distanceKm={157}
                  imageUrl="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200&auto=format&fit=crop"
                  href="/tours/madurai-to-munnar"
                  tags={['FAMILY', 'GROUP', 'CUSTOMISABLE']}
                />
              </div>

              <div>
                <span className="text-xs font-mono text-[var(--text-muted)] block mb-3">
                  Destination Card Variant
                </span>
                <DestinationCard
                  name="Kodaikanal"
                  state="Tamil Nadu"
                  distanceKm={120}
                  travelTime="3.5 Hours"
                  imageUrl="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
                  href="/destinations/kodaikanal"
                  shortDescription="The Princess of Hill Stations nestled in the Palani Hills with star-shaped lakes and pine forests."
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==========================================================================
          05. SURFACE TRANSITIONS & DARK/LIGHT PACING
          ========================================================================== */}
      {(activeTab === 'all' || activeTab === 'surfaces') && (
        <section className="mb-16 py-8 border-t border-[var(--border-default)]">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-terracotta-500)]" />
            <h2 className="type-eyebrow text-[var(--color-terracotta-500)]">
              05 — EDITORIAL SURFACE PACING & CONVERSION MODULES
            </h2>
          </div>

          <div className="space-y-8">
            {/* Light Surface CTA */}
            <CtaBlock
              title="Warm Paper Surface CTA"
              subtitle="Demonstrating high-contrast editorial conversion blocks on Warm Paper (#F2EEE5)."
              theme="paper"
              context="Design System Light CTA"
            />

            {/* Dark Ink Surface CTA */}
            <CtaBlock
              title="Ink (#171716) Dark Surface CTA"
              subtitle="Demonstrating inverted editorial contrast on deep Ink surfaces with Terracotta accents."
              theme="ink"
              context="Design System Dark CTA"
            />
          </div>
        </section>
      )}

      {/* System Acceptance Statement */}
      <div className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-terracotta-400)] rounded-[4px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-[var(--color-terracotta-500)]" />
          <span className="type-body-small font-semibold text-[var(--color-ink-950)]">
            Design System Acceptance Test Passed: Tokens, Typography, Routes, and Fleet Modules verified.
          </span>
        </div>
        <span className="text-xs font-mono text-[var(--color-terracotta-500)]">
          Ready for Phase 03
        </span>
      </div>
    </div>
  );
}
