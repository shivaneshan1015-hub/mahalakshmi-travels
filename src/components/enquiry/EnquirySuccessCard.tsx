/**
 * MAHALAKSHMI TOUR & TRAVEL — ENQUIRY SUCCESS CARD
 * "Your journey has started."
 */

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageSquare, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { StructuredEnquiry } from '@/types/enquiry';
import { Button } from '@/components/ui/Button';
import { buildWhatsAppUrl } from '@/lib/conversion/whatsapp';
import { getPrimaryPhoneTelUrl, getDisplayPhone } from '@/lib/conversion/phone';

interface EnquirySuccessCardProps {
  enquiry: StructuredEnquiry;
  referenceCode: string;
  onReset: () => void;
}

export function EnquirySuccessCard({
  enquiry,
  referenceCode,
  onReset,
}: EnquirySuccessCardProps) {
  const whatsappUrl = buildWhatsAppUrl({
    ...enquiry,
    notes: `Enquiry Ref: ${referenceCode}. ${enquiry.notes || ''}`.trim(),
  });
  const phoneUrl = getPrimaryPhoneTelUrl();
  const displayPhone = getDisplayPhone();

  return (
    <div className="p-8 md:p-12 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] text-center max-w-2xl mx-auto shadow-editorial-md animate-fade-in">
      <div className="w-14 h-14 rounded-full bg-[#FFFFFF] border border-[var(--color-terracotta-400)] text-[var(--color-terracotta-500)] flex items-center justify-center mx-auto mb-6 shadow-editorial-xs">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
        ENQUIRY CONFIRMED
      </span>

      <h2 className="type-display-m text-[var(--color-ink-950)] mb-4">
        Your journey has started.
      </h2>

      <p className="type-body text-[var(--text-secondary)] mb-6 leading-relaxed">
        Thank you, <strong>{enquiry.name}</strong>. The Mahalakshmi team in Madurai has received your travel requirement and will coordinate vehicle availability and custom route timings.
      </p>

      {/* Reference Code Badge */}
      <div className="p-4 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)] inline-block mb-8">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">
          ENQUIRY REFERENCE CODE
        </span>
        <span className="type-data-number text-xl text-[var(--color-terracotta-600)] font-bold">
          {referenceCode}
        </span>
      </div>

      {/* Direct WhatsApp Conversion Action */}
      <div className="space-y-3 max-w-md mx-auto mb-8">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            icon={<MessageSquare className="w-4 h-4" />}
            iconPosition="left"
          >
            Open on WhatsApp ({referenceCode})
          </Button>
        </a>

        <a href={phoneUrl} className="block">
          <Button
            variant="secondary"
            size="md"
            fullWidth
            icon={<Phone className="w-4 h-4" />}
            iconPosition="left"
          >
            Call Madurai Desk ({displayPhone})
          </Button>
        </a>
      </div>

      <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <Link href="/tours" className="text-[var(--color-terracotta-600)] hover:underline font-bold">
          ← Explore Curated Journeys
        </Link>
        <span className="text-[var(--text-muted)]">•</span>
        <button
          type="button"
          onClick={onReset}
          className="text-[var(--text-secondary)] hover:text-[var(--color-ink-950)] underline"
        >
          Plan Another Journey
        </button>
      </div>
    </div>
  );
}
