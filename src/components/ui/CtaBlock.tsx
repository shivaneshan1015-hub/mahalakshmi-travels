/**
 * MAHALAKSHMI TOUR & TRAVEL — EDITORIAL CTA BLOCK
 * High-conversion lead generation module with WhatsApp and direct dial actions.
 */

import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { Button } from './Button';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';
import { getPrimaryPhoneTelUrl, getDisplayPhone } from '@/lib/conversion/phone';

export interface CtaBlockProps {
  title?: string;
  subtitle?: string;
  theme?: 'paper' | 'ink';
  context?: string;
}

export function CtaBlock({
  title = 'Plan Your Journey from Madurai',
  subtitle = 'Whether you require our 21-seater van for family celebrations or custom hill station itineraries, our local team ensures every detail is arranged with care.',
  theme = 'paper',
  context,
}: CtaBlockProps) {
  const isDark = theme === 'ink';
  const whatsappUrl = getQuickWhatsAppLink(context);
  const phoneUrl = getPrimaryPhoneTelUrl();
  const displayPhone = getDisplayPhone();

  return (
    <div
      className={`rounded-[4px] p-8 md:p-12 border text-center relative overflow-hidden ${
        isDark
          ? 'bg-[var(--color-ink-950)] border-[var(--color-ink-800)] text-[var(--color-paper-100)]'
          : 'bg-[var(--color-paper-100)] border-[var(--border-default)] text-[var(--text-primary)]'
      }`}
    >
      {/* Editorial Watermark */}
      <span
        className={`type-eyebrow mb-2 block ${
          isDark ? 'text-[var(--color-terracotta-300)]' : 'text-[var(--color-terracotta-500)]'
        }`}
      >
        THE JOURNEY STARTS HERE
      </span>

      <h2 className="type-display-m max-w-2xl mx-auto mb-4">
        {title}
      </h2>

      <p
        className={`type-body-small max-w-xl mx-auto mb-8 ${
          isDark ? 'text-[var(--color-ink-300)]' : 'text-[var(--text-secondary)]'
        }`}
      >
        {subtitle}
      </p>

      {/* Conversion Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button
            variant="primary"
            size="lg"
            icon={<MessageSquare className="w-4 h-4" />}
            iconPosition="left"
            withArrow
          >
            Chat on WhatsApp
          </Button>
        </a>

        <a href={phoneUrl}>
          <Button
            variant={isDark ? 'paper-outline' : 'secondary'}
            size="lg"
            icon={<Phone className="w-4 h-4" />}
            iconPosition="left"
          >
            Call {displayPhone}
          </Button>
        </a>
      </div>

      <p className="text-[11px] mt-6 italic font-serif text-[var(--text-muted)]">
        “Your Journey. Our Care.” • Headquarters: Madurai, Tamil Nadu
      </p>
    </div>
  );
}
