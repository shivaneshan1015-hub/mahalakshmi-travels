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
    { num: '04', title: 'Your Journey', desc: 'Vehicle service and tailored halts' },
  ];

  return (
    <section className="py-16 md:py-24 border-b border-[var(--border-default)] bg-[#FFFFFF]">
      <div className="container-editorial">
        <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] border-2 border-[#334155] rounded-[12px] p-8 md:p-14 relative overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="max-w-2xl mb-12">
            <span className="type-eyebrow text-[#F59E0B] block mb-2 font-bold tracking-widest">
              06 — FLEXIBLE ITINERARIES
            </span>
            <h2 className="type-display-l text-[#FFFFFF] mb-4">
              Your Journey. <br />
              Your Way.
            </h2>
            <p className="type-body text-[#CBD5E1] font-medium leading-relaxed">
              Already know where you want to go? Tell us what you have in mind and our Madurai travel desk will coordinate the route, halts, and vehicle.
            </p>
          </div>

          {/* 4-Step Route Progression Visual */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="p-6 bg-[#1E293B] rounded-[8px] border border-[#334155] relative flex flex-col justify-between shadow-md"
              >
                <div>
                  <span className="type-data-number text-2xl text-[#F59E0B] font-extrabold block mb-2">
                    {step.num}
                  </span>
                  <h4 className="type-h4 text-[#FFFFFF] mb-1 font-bold">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <span className="w-6 h-6 rounded-full bg-[#0F172A] border border-[#334155] flex items-center justify-center text-[10px] text-[#F59E0B] font-bold">
                      →
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Conversion Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#334155]">
            <div className="flex items-center gap-2 text-xs text-[#CBD5E1] font-mono font-semibold">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Direct coordination with Madurai travel coordinators</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/plan-your-journey">
                <Button variant="primary" size="md" withArrow>
                  Build Your Journey
                </Button>
              </Link>
              <a href={getQuickWhatsAppLink('Custom Journey Inquiry')} target="_blank" rel="noopener noreferrer">
                <Button variant="emerald" size="md">
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
