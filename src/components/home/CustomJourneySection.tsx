/**
 * MAHALAKSHMI TOUR & TRAVEL — CUSTOM JOURNEY SECTION
 * Narrative 06: CUSTOMISE • "YOUR JOURNEY. YOUR WAY."
 */

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, MapPin, Calendar, Users, Route } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';

export function CustomJourneySection() {
  const steps = [
    { num: '01', title: 'Origin: Madurai', desc: 'Starting point from our central depot' },
    { num: '02', title: 'Your Destination', desc: 'Tamil Nadu, Kerala, Karnataka or AP' },
    { num: '03', title: 'Your Dates & Group', desc: '21-seater van or private sedan' },
    { num: '04', title: 'Your Journey', desc: 'Dedicated driver and tailored halts' },
  ];

  return (
    <section className="py-16 md:py-24 border-b border-[var(--border-default)]">
      <div className="container-editorial">
        <div className="bg-[var(--color-paper-100)] border border-[var(--border-default)] rounded-[4px] p-8 md:p-14 relative overflow-hidden">
          {/* Header */}
          <div className="max-w-2xl mb-12">
            <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
              06 — FLEXIBLE ITINERARIES
            </span>
            <h2 className="type-display-l text-[var(--text-primary)] mb-4">
              Your Journey. <br />
              Your Way.
            </h2>
            <p className="type-body text-[var(--text-secondary)]">
              Already know where you want to go? Tell us what you have in mind and our Madurai travel desk will coordinate the route, halts, and vehicle.
            </p>
          </div>

          {/* 4-Step Route Progression Visual */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="p-5 bg-[#FFFFFF] rounded-[3px] border border-[var(--border-subtle)] relative flex flex-col justify-between"
              >
                <div>
                  <span className="type-data-number text-2xl text-[var(--color-terracotta-500)] block mb-2">
                    {step.num}
                  </span>
                  <h4 className="type-h4 text-[var(--color-ink-950)] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {step.desc}
                  </p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <span className="w-6 h-6 rounded-full bg-[var(--color-paper-200)] border border-[var(--border-default)] flex items-center justify-center text-[10px] text-[var(--color-terracotta-500)]">
                      →
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Conversion Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border-default)]">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
              <Sparkles className="w-4 h-4 text-[var(--color-terracotta-500)]" />
              <span>Direct coordination with Madurai travel coordinators</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/plan-your-journey">
                <Button variant="primary" size="md" withArrow>
                  Build Your Journey
                </Button>
              </Link>
              <a href={getQuickWhatsAppLink('Custom Journey Inquiry')} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="md">
                  Discuss on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
