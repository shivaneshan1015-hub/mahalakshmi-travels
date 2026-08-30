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
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-[#F8FAFC] relative overflow-hidden border-t border-[#334155]">
      <div className="container-editorial relative z-10 text-center">
        <span className="type-eyebrow text-[#F59E0B] block mb-3 font-bold tracking-widest">
          MADURAI • SOUTH INDIA
        </span>

        <h2 className="type-display-xl text-[#FFFFFF] mb-6 max-w-3xl mx-auto text-balance font-bold">
          Where Will the Road Take You Next?
        </h2>

        <p className="type-body-large text-[#CBD5E1] max-w-xl mx-auto mb-10 leading-relaxed font-medium">
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
              variant="emerald"
              size="lg"
              icon={<MessageSquare className="w-4 h-4" />}
              iconPosition="left"
            >
              Talk to Travel Desk
            </Button>
          </a>
        </div>

        {/* Route Line Continuing Beyond Viewport Frame */}
        <div className="relative flex items-center justify-center max-w-xl mx-auto">
          <div className="w-full h-px bg-[#334155]" />
          <div className="absolute left-0 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFFFFF]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#94A3B8]">
              MADURAI
            </span>
          </div>

          <div className="absolute -right-12 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#F59E0B]">
              BEYOND
            </span>
            <span className="w-12 h-px border-b border-dashed border-[#F59E0B]" />
          </div>
        </div>

        <p className="text-xs text-[#94A3B8] italic font-serif mt-12 font-medium">
          “Your Journey. Our Care.” • Headquarters: Madurai, Tamil Nadu
        </p>
      </div>
    </section>
  );
}
