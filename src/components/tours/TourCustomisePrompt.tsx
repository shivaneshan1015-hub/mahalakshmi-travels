/**
 * MAHALAKSHMI TOUR & TRAVEL — TOUR CUSTOMISE PROMPT
 * Strategic prompt reminding users that all tour itineraries are customizable.
 */

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TourCustomisePromptProps {
  tourTitle: string;
  tourSlug?: string;
}

export function TourCustomisePrompt({ tourTitle, tourSlug }: TourCustomisePromptProps) {
  const planUrl = tourSlug ? `/plan-your-journey?tour=${tourSlug}` : '/plan-your-journey';

  return (
    <section className="border-b border-[var(--border-default)] pb-12 mb-12">
      <div className="p-8 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[var(--color-terracotta-500)]" />
            <span className="type-eyebrow text-[var(--color-terracotta-500)]">
              ADAPTABLE ITINERARY
            </span>
          </div>
          <h3 className="type-h3 text-[var(--color-ink-950)] mb-2">
            This itinerary is a starting point, not a fixed rule.
          </h3>
          <p className="type-body-small text-[var(--text-secondary)]">
            Want to add extra days, include nearby temples, or adjust the pickup time in Madurai? We customize every journey to your family’s pacing.
          </p>
        </div>

        <Link href={planUrl} className="shrink-0">
          <Button variant="primary" size="md" withArrow>
            Customise This Journey
          </Button>
        </Link>
      </div>
    </section>
  );
}
