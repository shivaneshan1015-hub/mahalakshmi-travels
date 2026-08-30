/**
 * MAHALAKSHMI TOUR & TRAVEL — TOUR ENQUIRY BLOCK
 * Context-preserving conversion block with pre-filled WhatsApp and direct phone triggers.
 */

import React from 'react';
import { MessageSquare, Phone, MapPin, Calendar, Clock } from 'lucide-react';
import { Tour } from '@/types/tour';
import { Button } from '@/components/ui/Button';
import { getTourWhatsAppLink } from '@/lib/conversion/whatsapp';
import { getPrimaryPhoneTelUrl, getDisplayPhone } from '@/lib/conversion/phone';

interface TourEnquiryBlockProps {
  tour: Tour;
}

export function TourEnquiryBlock({ tour }: TourEnquiryBlockProps) {
  const whatsappUrl = getTourWhatsAppLink({
    title: tour.title,
    slug: tour.slug,
    destination: tour.destination,
    durationText: tour.duration.text,
  });
  const phoneUrl = getPrimaryPhoneTelUrl();
  const displayPhone = getDisplayPhone();

  return (
    <section className="border-b border-[var(--border-default)] pb-12 mb-12">
      <div className="bg-[var(--color-ink-950)] text-[var(--color-paper-100)] rounded-[4px] p-8 md:p-12 border border-[var(--color-ink-800)] text-center max-w-3xl mx-auto">
        <span className="type-eyebrow text-[var(--color-terracotta-300)] block mb-2">
          READY TO START?
        </span>

        <h2 className="type-display-m text-[#FFFFFF] mb-4">
          Plan Your Journey to {tour.destination}
        </h2>

        <p className="type-body text-[var(--color-ink-300)] mb-8 max-w-lg mx-auto leading-relaxed">
          Connect directly with our Madurai travel coordinators on WhatsApp or phone to check dates, select vehicle options, and reserve your trip.
        </p>

        {/* Selected Journey Context Card */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 py-2.5 px-5 bg-white/10 rounded-[3px] border border-white/15 text-xs font-mono text-white mb-8">
          <span>{tour.title}</span>
          <span>•</span>
          <span className="text-[var(--color-terracotta-300)]">{tour.duration.text}</span>
          <span>•</span>
          <span>From Madurai</span>
        </div>

        {/* Dual High-Conversion Triggers */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="primary"
              size="lg"
              icon={<MessageSquare className="w-4 h-4" />}
              iconPosition="left"
            >
              Enquire on WhatsApp
            </Button>
          </a>
          <a href={phoneUrl}>
            <Button
              variant="paper-outline"
              size="lg"
              icon={<Phone className="w-4 h-4" />}
              iconPosition="left"
            >
              Call {displayPhone}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
