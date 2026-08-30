/**
 * MAHALAKSHMI TOUR & TRAVEL — SERVICE FAQ ACCORDION
 * Accessible FAQ component for travel service and use-case pages.
 */

'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { TravelServiceFaq } from '@/types/service';
import { cn } from '@/lib/utils/cn';

interface ServiceFaqAccordionProps {
  faqs?: TravelServiceFaq[];
}

export function ServiceFaqAccordion({ faqs }: ServiceFaqAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="border-b border-[var(--border-default)] pb-12 mb-12">
      <div className="max-w-2xl mb-8">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-[var(--color-terracotta-500)]" />
          <span className="type-eyebrow text-[var(--color-terracotta-500)]">
            FREQUENT QUESTIONS
          </span>
        </div>
        <h2 className="type-h2 text-[var(--text-primary)]">
          Questions About This Service
        </h2>
      </div>

      <div className="space-y-3 max-w-3xl">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:bg-[var(--color-paper-200)]"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-[var(--color-ink-950)]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-[var(--color-terracotta-500)] transition-transform duration-200 shrink-0',
                    isOpen ? 'rotate-180' : ''
                  )}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
