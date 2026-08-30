/**
 * MAHALAKSHMI TOUR & TRAVEL — "WHO'S COMING?" INTERACTIVE ASSISTANT
 * Signature service discovery tool matching traveler group need → recommended vehicle → direct enquiry.
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Sparkles, MessageSquare, Phone, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';
import { cn } from '@/lib/utils/cn';

interface GroupProfile {
  id: string;
  label: string;
  sublabel: string;
  paxRange: string;
  recommendedVehicleName: string;
  recommendedVehicleSlug: string;
  capacityText: string;
  description: string;
  bestSuitedFor: string[];
  suggestedCircuits: string[];
}

export function WhosComingAssistant() {
  const groupProfiles: GroupProfile[] = [
    {
      id: 'couple-small-family',
      label: 'Small Family / Couple',
      sublabel: '1 to 4 Travellers',
      paxRange: '1–4 Passengers',
      recommendedVehicleName: 'Private Sedan Car',
      recommendedVehicleSlug: 'sedan-car',
      capacityText: '4 Passengers + Driver • Deep Boot Space',
      description: 'Quiet, air-conditioned comfort for personal family getaways, temple darshans, and outstation hill retreats from Madurai.',
      bestSuitedFor: ['Family Vacations', 'Weekend Escapes', 'Outstation Airport Drops'],
      suggestedCircuits: ['Madurai → Kodaikanal (120 KM)', 'Madurai → Munnar (157 KM)', 'Madurai → Rameswaram (172 KM)'],
    },
    {
      id: 'extended-family',
      label: 'Extended Joint Family',
      sublabel: '5 to 14 Travellers',
      paxRange: '5–14 Passengers',
      recommendedVehicleName: '21-Seater AC Group Van',
      recommendedVehicleSlug: '21-seater-van',
      capacityText: '20+1 Pushback Seats • Full-Cabin Dual AC',
      description: 'Allows your entire family to travel together in a single spacious vehicle with ample legroom for senior citizens and luggage bay for all bags.',
      bestSuitedFor: ['Multi-Generational Trips', 'Temple Circuits', 'Hill Station Holidays'],
      suggestedCircuits: ['Madurai → Kodaikanal (120 KM)', 'Madurai → Thekkady & Munnar (290 KM Circuit)', 'Madurai → Tirupati Pilgrimage'],
    },
    {
      id: 'college-students',
      label: 'College / Student Batch',
      sublabel: '15 to 20 Travellers',
      paxRange: '15–20 Passengers',
      recommendedVehicleName: '21-Seater AC Flagship Van',
      recommendedVehicleSlug: '21-seater-van',
      capacityText: '20+1 Seats • High-Roof Group Van',
      description: 'Specially suited for college industrial visits (IV), department tours, and student expeditions with experienced highway drivers.',
      bestSuitedFor: ['Industrial Visits (IV)', 'Department Outings', 'Student Weekend Trips'],
      suggestedCircuits: ['Madurai → Bangalore / Mysore (435 KM)', 'Madurai → Kodaikanal (120 KM)', 'Madurai → Ooty Nilgiris (280 KM)'],
    },
    {
      id: 'wedding-function',
      label: 'Wedding & Function Guests',
      sublabel: '10 to 30+ Travellers',
      paxRange: '10–30+ Guests',
      recommendedVehicleName: '21-Seater Van + Sedan Support',
      recommendedVehicleSlug: '21-seater-van',
      capacityText: 'Group Van + VIP Private Sedans',
      description: 'Punctual guest shuttles between Madurai Airport, Junction railway station, marriage mandapams, and outstation wedding venues.',
      bestSuitedFor: ['Wedding Guest Shuttles', 'Temple Ceremonies', 'Airport & Station Pickups'],
      suggestedCircuits: ['Madurai Transit Shuttles', 'Madurai → Theni / Dindigul Venues', 'Palani Temple Family Functions'],
    },
  ];

  const [selectedId, setSelectedId] = useState<string>('extended-family');
  const activeProfile = groupProfiles.find((p) => p.id === selectedId) || groupProfiles[1];

  const whatsappUrl = getQuickWhatsAppLink(
    `Travel Service Inquiry for ${activeProfile.label} (${activeProfile.paxRange})`
  );

  return (
    <section className="bg-[var(--color-paper-100)] border border-[var(--border-default)] rounded-[4px] p-6 md:p-10 mb-14 shadow-editorial-sm">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-[var(--color-terracotta-500)]" />
        <span className="type-eyebrow text-[var(--color-terracotta-500)]">
          SERVICE DISCOVERY ASSISTANT
        </span>
      </div>

      <h2 className="type-display-m text-[var(--text-primary)] mb-3">
        Who&apos;s Coming?
      </h2>
      <p className="type-body text-[var(--text-secondary)] max-w-2xl mb-8">
        Tell us who is travelling with you. We will recommend the right vehicle, seating format, and travel arrangement starting from Madurai.
      </p>

      {/* Group Selector Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8" role="tablist" aria-label="Select your travel group type">
        {groupProfiles.map((p) => {
          const isSelected = p.id === selectedId;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedId(p.id)}
              className={cn(
                'p-4 rounded-[3px] border text-left transition-all flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]',
                isSelected
                  ? 'bg-[var(--color-ink-950)] text-[var(--color-paper-100)] border-[var(--color-ink-950)] shadow-editorial-sm'
                  : 'bg-[#FFFFFF] text-[var(--color-ink-950)] border-[var(--border-default)] hover:border-[var(--color-terracotta-400)]'
              )}
            >
              <span className="text-xs font-bold block mb-1">
                {p.label}
              </span>
              <span
                className={cn(
                  'text-[10px] font-mono tracking-wider block',
                  isSelected ? 'text-[var(--color-terracotta-300)]' : 'text-[var(--text-muted)]'
                )}
              >
                {p.sublabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Recommendation Panel */}
      <div className="p-6 md:p-8 bg-[#FFFFFF] rounded-[3px] border border-[var(--border-default)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="terracotta">Recommended Vehicle Solution</Badge>
            <span className="text-xs font-mono text-[var(--color-terracotta-500)] font-semibold">
              {activeProfile.capacityText}
            </span>
          </div>

          <h3 className="type-h3 text-[var(--color-ink-950)] mt-1 mb-3">
            {activeProfile.recommendedVehicleName}
          </h3>

          <p className="type-body-small text-[var(--text-secondary)] mb-6 leading-relaxed">
            {activeProfile.description}
          </p>

          <div className="space-y-2 mb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-ink-900)] font-semibold block">
              Suggested Travel Circuits from Madurai:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeProfile.suggestedCircuits.map((cir) => (
                <span
                  key={cir}
                  className="text-xs font-mono text-[var(--color-ink-700)] bg-[var(--color-paper-100)] px-2.5 py-1 rounded border border-[var(--border-subtle)]"
                >
                  {cir}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[var(--color-paper-100)] p-6 rounded-[3px] border border-[var(--border-subtle)] flex flex-col justify-between h-full">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-3 font-semibold">
              MADURAI DEPOT DISPATCH
            </span>
            <ul className="space-y-2 text-xs text-[var(--color-ink-800)] mb-6">
              {activeProfile.bestSuitedFor.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta-500)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5 pt-4 border-t border-[var(--border-subtle)]">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
              <Button
                variant="primary"
                size="md"
                fullWidth
                icon={<MessageSquare className="w-4 h-4" />}
                iconPosition="left"
              >
                Enquire for {activeProfile.label}
              </Button>
            </a>
            <Link href={`/vehicles/${activeProfile.recommendedVehicleSlug}`} className="block">
              <Button variant="secondary" size="sm" fullWidth withArrow>
                View Vehicle Specifications
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
