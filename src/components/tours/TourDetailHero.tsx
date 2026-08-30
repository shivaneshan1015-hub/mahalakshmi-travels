'use client';

/**
 * MAHALAKSHMI TOUR & TRAVEL — TOUR DETAIL HERO
 * Monumental editorial header with origin route line, photography, and primary conversion triggers.
 */

import React from 'react';
import Image from 'next/image';
import { MessageSquare, Phone, MapPin, Clock, ArrowRight, ShieldCheck, Share2, Printer } from 'lucide-react';
import { Tour } from '@/types/tour';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DataAnchor } from '@/components/ui/DataAnchor';
import { getTourWhatsAppLink } from '@/lib/conversion/whatsapp';
import { getPrimaryPhoneTelUrl } from '@/lib/conversion/phone';

interface TourDetailHeroProps {
  tour: Tour;
}

export function TourDetailHero({ tour }: TourDetailHeroProps) {
  const whatsappUrl = getTourWhatsAppLink({
    title: tour.title,
    slug: tour.slug,
    destination: tour.destination,
    durationText: tour.duration.text,
  });
  const phoneUrl = getPrimaryPhoneTelUrl();

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      const shareData = {
        title: `${tour.title} - Mahalakshmi Tour & Travel`,
        text: `Check out this South India journey: ${tour.title} (${tour.duration.text}) from Madurai.`,
        url: window.location.href,
      };
      if (navigator.share) {
        navigator.share(shareData).catch(() => {});
      } else {
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(
            `${shareData.title}\n${shareData.text}\n${shareData.url}`
          )}`,
          '_blank'
        );
      }
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <section className="border-b border-[var(--border-default)] pb-12 mb-12">
      {/* Top Metadata Line */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Badge variant="terracotta">{tour.state}</Badge>
          <Badge variant="paper">{tour.duration.text}</Badge>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <span className="w-2 h-2 rounded-full bg-[var(--color-terracotta-500)]" />
          <span>ORIGIN: MADURAI, TAMIL NADU</span>
        </div>
      </div>

      {/* Hero Headline & Route Tag */}
      <div className="max-w-3xl mb-8">
        <h1 className="type-display-l text-[var(--text-primary)] mb-4">
          {tour.title}
        </h1>
        <p className="type-body-large text-[var(--text-secondary)] leading-relaxed">
          {tour.description}
        </p>
      </div>

      {/* Hero Grid: Photography + Numerical Anchors & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Hero Image (7 Cols) */}
        <div className="lg:col-span-7 relative aspect-[16/10] rounded-[4px] overflow-hidden bg-[var(--color-ink-900)] border border-[var(--border-default)] shadow-editorial-md">
          <Image
            src={tour.heroImage.url}
            alt={tour.heroImage.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-950)]/70 via-transparent to-transparent" />

          {/* Route Overlay Watermark */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
            <span className="bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm">
              MADURAI ───●───→ {tour.destination.toUpperCase()}
            </span>
            <span className="bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm">
              {tour.distanceKm} KM
            </span>
          </div>
        </div>

        {/* Right Col: Journey Facts & Actions (5 Cols) */}
        <div className="lg:col-span-5 bg-[var(--color-paper-100)] p-6 md:p-8 rounded-[4px] border border-[var(--border-default)] flex flex-col justify-between h-full">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-terracotta-500)] font-semibold block mb-4">
              JOURNEY SPECIFICATIONS
            </span>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 pb-6 mb-6 border-b border-[var(--border-subtle)] items-stretch">
              {/* Spec 1: Duration */}
              <div className="flex flex-col justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink-950)] leading-none">
                    {tour.duration.days.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs font-mono font-bold text-[var(--color-terracotta-500)] uppercase">
                    DAYS
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[var(--color-ink-600)] tracking-wider uppercase mt-2">
                  {tour.duration.nights === 1 ? '1 NIGHT STAY' : tour.duration.nights > 1 ? `${tour.duration.nights} NIGHTS STAY` : 'DAY TRIP'}
                </span>
              </div>

              {/* Spec 2: Distance */}
              <div className="flex flex-col justify-between border-x border-[var(--border-subtle)] px-2 sm:px-3 text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink-950)] leading-none">
                    {tour.distanceKm}
                  </span>
                  <span className="text-xs font-mono font-bold text-[var(--color-terracotta-500)] uppercase">
                    KM
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[var(--color-ink-600)] tracking-wider uppercase mt-2">
                  FROM MADURAI
                </span>
              </div>

              {/* Spec 3: Price */}
              <div className="flex flex-col justify-between text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[var(--color-terracotta-600)] leading-none">
                    {tour.pricePerPerson ? `₹${tour.pricePerPerson.toLocaleString('en-IN')}` : 'CUSTOM'}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[var(--color-ink-950)] uppercase">
                    {tour.pricePerPerson ? '/ PAX' : 'QUOTE'}
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[var(--color-terracotta-600)] tracking-wider uppercase mt-2 truncate">
                  STAY & FOOD INCL.
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-8 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Starting Hub:</span>
                <strong className="text-[var(--color-ink-950)]">Madurai Central Depot</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Package Inclusions:</span>
                <span className="font-semibold text-[var(--color-terracotta-600)]">
                  Hotel Stay + Food + Dedicated Vehicle
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Ideal For:</span>
                <span className="capitalize font-semibold text-[var(--color-ink-950)]">
                  {tour.idealFor.join(' • ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Fleet Options:</span>
                <span className="font-semibold text-[var(--color-ink-950)]">21-Seater Van / Sedan</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={<MessageSquare className="w-4 h-4" />}
                iconPosition="left"
              >
                Plan This Journey
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
                Talk to Madurai Coordinator
              </Button>
            </a>

            {/* Quick Share & Print Itinerary Row */}
            <div className="pt-2 flex items-center justify-between text-xs text-[var(--color-ink-700)] border-t border-dashed border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 hover:text-[var(--color-terracotta-600)] transition-colors p-1 cursor-pointer font-medium"
                title="Share Itinerary with Family / Group"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Itinerary</span>
              </button>
              <span className="text-[var(--border-default)]">•</span>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 hover:text-[var(--color-terracotta-600)] transition-colors p-1 cursor-pointer font-medium"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
