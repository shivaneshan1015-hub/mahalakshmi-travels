/**
 * MAHALAKSHMI TOUR & TRAVEL — FINAL JOURNEY CTA SECTION
 * Narrative 09: EMOTION & CONVERSION • "WHERE WILL THE ROAD TAKE YOU NEXT?"
 */

import React from 'react';
import Link from 'next/link';
import { MessageSquare, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';
import { getPrimaryPhoneTelUrl, getDisplayPhone } from '@/lib/conversion/phone';

export function FinalJourneyCtaSection() {
  const whatsappUrl = getQuickWhatsAppLink('Homepage Final CTA');
  const phoneUrl = getPrimaryPhoneTelUrl();
  const displayPhone = getDisplayPhone();

  return (
    <section className="py-20 md:py-32 bg-[var(--color-ink-950)] text-[var(--color-paper-100)] relative overflow-hidden">
      <div className="container-editorial relative z-10 text-center">
        <span className="type-eyebrow text-[var(--color-terracotta-300)] block mb-3">
          MADURAI • SOUTH INDIA
        </span>

        <h2 className="type-display-xl text-[#FFFFFF] mb-6 max-w-3xl mx-auto text-balance">
          Where Will the Road Take You Next?
        </h2>

        <p className="type-body-large text-[var(--color-ink-300)] max-w-xl mx-auto mb-10 leading-relaxed">
          From the hill ranges of Munnar and Kodaikanal to group pilgrimages across Tamil Nadu and Andhra Pradesh—your journey begins in Madurai.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link href="/tours">
            <Button variant="primary" size="lg" withArrow>
              Explore Journeys
            </Button>
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="paper-outline"
              size="lg"
              icon={<MessageSquare className="w-4 h-4" />}
              iconPosition="left"
            >
              Talk to Mahalakshmi
            </Button>
          </a>
        </div>

        {/* Route Line Continuing Beyond Viewport Frame */}
        <div className="relative flex items-center justify-center max-w-xl mx-auto">
          <div className="w-full h-px bg-[var(--color-ink-800)]" />
          <div className="absolute left-0 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-paper-100)]" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-ink-400)]">
              MADURAI
            </span>
          </div>

          <div className="absolute -right-12 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-terracotta-400)]" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-terracotta-300)]">
              BEYOND
            </span>
            <span className="w-12 h-px border-b border-dashed border-[var(--color-terracotta-400)]" />
          </div>
        </div>

        <p className="text-xs text-[var(--color-ink-400)] italic font-serif mt-12">
          “Your Journey. Our Care.” • Headquarters: Madurai, Tamil Nadu
        </p>
      </div>
    </section>
  );
}
