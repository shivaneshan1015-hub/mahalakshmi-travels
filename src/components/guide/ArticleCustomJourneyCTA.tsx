/**
 * MAHALAKSHMI TOUR & TRAVEL — ARTICLE CUSTOM JOURNEY CTA
 * Contextual footer CTA inviting guide readers to plan custom routes.
 */

import React from 'react';
import Link from 'next/link';
import { Sparkles, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';
import { getPrimaryPhoneTelUrl, getDisplayPhone } from '@/lib/conversion/phone';

interface ArticleCustomJourneyCTAProps {
  destination?: string;
}

export function ArticleCustomJourneyCTA({ destination }: ArticleCustomJourneyCTAProps) {
  const planUrl = destination
    ? `/plan-your-journey?destination=${destination.toLowerCase().replace(/\s+/g, '-')}`
    : '/plan-your-journey';

  const whatsappUrl = getQuickWhatsAppLink(
    destination ? `Custom Journey to ${destination}` : 'Custom South India Tour'
  );
  const phoneUrl = getPrimaryPhoneTelUrl();
  const displayPhone = getDisplayPhone();

  return (
    <section className="my-14 bg-[var(--color-ink-950)] text-[var(--color-paper-100)] rounded-[4px] p-8 md:p-12 border border-[var(--color-ink-800)] text-center shadow-editorial-md">
      <span className="type-eyebrow text-[var(--color-terracotta-300)] block mb-2">
        HAVE A DIFFERENT ROUTE IN MIND?
      </span>

      <h2 className="type-display-m text-[#FFFFFF] mb-4">
        Plan a Custom Journey from Madurai
      </h2>

      <p className="type-body text-[var(--color-ink-300)] mb-8 max-w-lg mx-auto leading-relaxed">
        Tell us where you want to go, who is travelling with you, and your preferred pacing. Our Madurai team will shape the itinerary and vehicle arrangements.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href={planUrl}>
          <Button variant="primary" size="lg" withArrow>
            Plan a Custom Journey
          </Button>
        </Link>

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button
            variant="paper-outline"
            size="lg"
            icon={<MessageSquare className="w-4 h-4" />}
            iconPosition="left"
          >
            Chat on WhatsApp
          </Button>
        </a>
      </div>
    </section>
  );
}
