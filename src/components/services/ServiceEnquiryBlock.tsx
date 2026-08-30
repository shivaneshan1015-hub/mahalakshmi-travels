/**
 * MAHALAKSHMI TOUR & TRAVEL — SERVICE ENQUIRY BLOCK
 * Context-preserving conversion block for travel services.
 */

import React from 'react';
import { MessageSquare, Phone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';
import { getPrimaryPhoneTelUrl, getDisplayPhone } from '@/lib/conversion/phone';

interface ServiceEnquiryBlockProps {
  serviceTitle: string;
}

export function ServiceEnquiryBlock({ serviceTitle }: ServiceEnquiryBlockProps) {
  const whatsappUrl = getQuickWhatsAppLink(`Service Booking Enquiry: ${serviceTitle}`);
  const phoneUrl = getPrimaryPhoneTelUrl();
  const displayPhone = getDisplayPhone();

  return (
    <section className="border-b border-[var(--border-default)] pb-12 mb-12">
      <div className="bg-[var(--color-ink-950)] text-[var(--color-paper-100)] rounded-[4px] p-8 md:p-12 border border-[var(--color-ink-800)] text-center max-w-3xl mx-auto">
        <span className="type-eyebrow text-[var(--color-terracotta-300)] block mb-2">
          DIRECT MADURAI DESK
        </span>

        <h2 className="type-display-m text-[#FFFFFF] mb-4">
          Plan Your {serviceTitle}
        </h2>

        <p className="type-body text-[var(--color-ink-300)] mb-8 max-w-lg mx-auto leading-relaxed">
          Tell us your dates, group count, and preferred destination. Our coordinators will assist with vehicle allocation and schedule planning.
        </p>

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
