/**
 * MAHALAKSHMI TOUR & TRAVEL — CUSTOMISED TOURS ROUTE (/customised-tours)
 * Phase 07: Editorial Custom Travel Hub with embedded Journey Planner.
 */

import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { Badge } from '@/components/ui/Badge';
import { CustomJourneyBuilder } from '@/components/enquiry/CustomJourneyBuilder';

export const metadata: Metadata = constructMetadata({
  title: 'Customised South India Tours from Madurai | Mahalakshmi Tour & Travel',
  description: 'Design your own custom tour itinerary across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh starting from Madurai. 21-seater van and family sedan options.',
  canonicalPath: '/customised-tours',
});

export default function CustomisedToursPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', itemUrl: 'https://mahalakshmitravels.com', position: 1 },
    { name: 'Customised Tours', itemUrl: 'https://mahalakshmitravels.com/customised-tours', position: 2 },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="container-editorial py-10 md:py-16">
        <BreadcrumbNav
          items={[
            { name: 'Home', itemUrl: '/', position: 1 },
            { name: 'Customised Tours', itemUrl: '/customised-tours', position: 2 },
          ]}
          className="mb-8"
        />

        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="terracotta">Your Route. Your Plan.</Badge>
            <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider">
              MADURAI ORIGIN • SOUTH INDIA COVERAGE
            </span>
          </div>

          <h1 className="type-display-l text-[var(--text-primary)] mb-4">
            Customised Tours from Madurai
          </h1>

          <p className="type-body-large text-[var(--text-secondary)] leading-relaxed">
            Every group travels differently. Whether you need an extended weekend in the Nilgiris or a multi-temple circuit across Southern Tamil Nadu, our team tailors the route, halts, and vehicle to your schedule.
          </p>
        </div>

        {/* 3 Step Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)]">
            <span className="type-data-number text-[var(--color-terracotta-500)] text-2xl block mb-2">01</span>
            <h3 className="type-h4 mb-1">Choose Your Route</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Combine hill stations, temple corridors, and coastal towns across Tamil Nadu, Kerala, Karnataka, and AP.
            </p>
          </div>

          <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)]">
            <span className="type-data-number text-[var(--color-terracotta-500)] text-2xl block mb-2">02</span>
            <h3 className="type-h4 mb-1">Choose Your Vehicle</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              21-seater AC van for groups, associations, and college batches; private sedans for small families.
            </p>
          </div>

          <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)]">
            <span className="type-data-number text-[var(--color-terracotta-500)] text-2xl block mb-2">03</span>
            <h3 className="type-h4 mb-1">Travel with Care</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Experienced highway and ghat drivers, door-to-door Madurai departure, and unhurried pacing.
            </p>
          </div>
        </div>

        {/* Interactive Custom Planner */}
        <div className="pt-8 border-t border-[var(--border-default)]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
              INTERACTIVE PLANNER
            </span>
            <h2 className="type-h2 text-[var(--color-ink-950)]">
              Start Shaping Your Journey
            </h2>
          </div>

          <Suspense
            fallback={
              <div className="p-12 text-center text-xs font-mono text-[var(--text-muted)] bg-[var(--color-paper-100)] rounded border border-[var(--border-default)]">
                Loading Custom Journey Builder...
              </div>
            }
          >
            <CustomJourneyBuilder />
          </Suspense>
        </div>
      </div>
    </>
  );
}
