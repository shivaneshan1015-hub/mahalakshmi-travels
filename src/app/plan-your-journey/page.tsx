/**
 * MAHALAKSHMI TOUR & TRAVEL — PLAN YOUR JOURNEY ROUTE (/plan-your-journey)
 * Phase 07: Context-aware progressive travel planner & conversion experience.
 */

import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Phone, MessageSquare, Compass, ShieldCheck } from 'lucide-react';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CustomJourneyBuilder } from '@/components/enquiry/CustomJourneyBuilder';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';
import { getPrimaryPhoneTelUrl, getDisplayPhone } from '@/lib/conversion/phone';

export const metadata: Metadata = constructMetadata({
  title: 'Plan Your Journey — Custom South India Tour & Vehicle Planner | Mahalakshmi',
  description: 'Design your own custom tour itinerary across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh starting from Madurai. 21-seater van and family sedan options.',
  canonicalPath: '/plan-your-journey',
});

export default function PlanYourJourneyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', itemUrl: 'https://mahalakshmitravels.com', position: 1 },
    { name: 'Plan Your Journey', itemUrl: 'https://mahalakshmitravels.com/plan-your-journey', position: 2 },
  ]);

  const whatsappUrl = getQuickWhatsAppLink('Plan Your Journey Page Direct Chat');
  const phoneUrl = getPrimaryPhoneTelUrl();
  const displayPhone = getDisplayPhone();

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="container-editorial py-10 md:py-16">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav
          items={[
            { name: 'Home', itemUrl: '/', position: 1 },
            { name: 'Plan Your Journey', itemUrl: '/plan-your-journey', position: 2 },
          ]}
          className="mb-8"
        />

        {/* Page Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="terracotta">Custom Journey Builder</Badge>
            <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider">
              MADURAI HEADQUARTERS • DIRECT DESK
            </span>
          </div>

          <h1 className="type-display-l text-[var(--text-primary)] mb-4">
            Plan a Custom Journey
          </h1>

          <p className="type-body-large text-[var(--text-secondary)] leading-relaxed">
            Tell us what you have in mind. We&apos;ll help shape the route around your people, time, and destination across South India.
          </p>
        </div>

        {/* Master Interactive Progressive Form */}
        <Suspense
          fallback={
            <div className="p-12 text-center text-xs font-mono text-[var(--text-muted)] bg-[var(--color-paper-100)] rounded border border-[var(--border-default)]">
              Loading Journey Planner...
            </div>
          }
        >
          <CustomJourneyBuilder />
        </Suspense>

        {/* Direct Contact Alternative Option */}
        <div className="mt-16 pt-10 border-t border-[var(--border-default)] max-w-3xl mx-auto text-center">
          <span className="type-eyebrow text-[var(--text-muted)] block mb-2">
            PREFER TO TALK DIRECTLY?
          </span>
          <h3 className="type-h3 text-[var(--color-ink-950)] mb-3">
            Call or Message Our Madurai Coordinators
          </h3>
          <p className="type-body-small text-[var(--text-secondary)] max-w-md mx-auto mb-6">
            If you already know your requirements or have urgent dates, contact our travel desk immediately.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="primary"
                size="md"
                icon={<MessageSquare className="w-4 h-4" />}
                iconPosition="left"
              >
                Chat on WhatsApp
              </Button>
            </a>
            <a href={phoneUrl}>
              <Button
                variant="secondary"
                size="md"
                icon={<Phone className="w-4 h-4" />}
                iconPosition="left"
              >
                Call {displayPhone}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
