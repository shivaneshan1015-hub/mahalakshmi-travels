'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Car, Bus, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';

export function PassengerFleetSelector() {
  const [selectedGroup, setSelectedGroup] = useState<'sedan' | 'suv' | 'van'>('van');

  const groupOptions = {
    sedan: {
      paxLabel: '1 - 4 Passengers',
      vehicleName: 'Private AC Sedan Car (Swift Dzire / Toyota Etios)',
      tag: 'Couples & Small Families',
      rate: 'Custom Quote',
      allowance: 'Included in Quote',
      boot: '400+ Litres Luggage Boot',
      slug: 'sedan-car',
      link: '/vehicles/sedan-car',
      whatsappMsg: 'Hi Mahalakshmi Travels, I want to book a Private AC Sedan Car (1-4 Passengers) from Madurai. Please send custom quote.',
    },
    suv: {
      paxLabel: '5 - 7 Passengers',
      vehicleName: 'AC SUV / Premium Cabs (Ertiga / Innova Class)',
      tag: 'Family Groups & Temple Circuits',
      rate: 'Custom Quote',
      allowance: 'Included in Quote',
      boot: 'Comfortable Luggage Space',
      slug: 'sedan-car',
      link: '/vehicles/sedan-car',
      whatsappMsg: 'Hi Mahalakshmi Travels, I want to book an AC SUV Cab (5-7 Passengers) from Madurai. Please send custom quote.',
    },
    van: {
      paxLabel: '8 - 21 Passengers',
      vehicleName: '21-Seater Luxury AC Group Van (Tempo / Mini Coach)',
      tag: 'College IV • Pilgrimages • Wedding Fleets',
      rate: 'Custom Quote',
      allowance: 'Included in Quote',
      boot: 'Deep Rear Boot + Rooftop Carrier',
      slug: '21-seater-van',
      link: '/vehicles/21-seater-van',
      whatsappMsg: 'Hi Mahalakshmi Travels, I want to book a 21-Seater AC Group Van (8-21 Passengers) from Madurai. Please send custom quote.',
    },
  };

  const activeData = groupOptions[selectedGroup];

  return (
    <div className="p-6 sm:p-8 bg-[#FFFFFF] rounded-[6px] border border-[var(--border-default)] shadow-editorial-md mb-14">
      <div className="max-w-2xl mb-6">
        <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
          PASSENGER FINDER ASSISTANT
        </span>
        <h3 className="type-h3 text-[var(--color-ink-950)] mb-2">
          Find the Perfect Rental Vehicle for Your Group Size
        </h3>
        <p className="text-xs text-[var(--text-secondary)]">
          Select how many travellers are in your party to view recommended vehicles and request a custom quote.
        </p>
      </div>

      {/* Group Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <button
          type="button"
          onClick={() => setSelectedGroup('sedan')}
          className={`p-4 rounded-[4px] border text-left transition-all ${
            selectedGroup === 'sedan'
              ? 'bg-[var(--color-terracotta-100)] border-[var(--color-terracotta-500)] shadow-xs'
              : 'bg-[var(--color-paper-100)] border-[var(--border-default)] hover:border-[var(--color-ink-400)]'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <Users className="w-4 h-4 text-[var(--color-terracotta-500)]" />
            <span className="text-[10px] font-mono font-bold uppercase text-[var(--color-terracotta-600)]">1 - 4 Pax</span>
          </div>
          <p className="text-xs font-bold text-[var(--color-ink-950)]">AC Sedan Car</p>
          <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Custom Quote</p>
        </button>

        <button
          type="button"
          onClick={() => setSelectedGroup('suv')}
          className={`p-4 rounded-[4px] border text-left transition-all ${
            selectedGroup === 'suv'
              ? 'bg-[var(--color-terracotta-100)] border-[var(--color-terracotta-500)] shadow-xs'
              : 'bg-[var(--color-paper-100)] border-[var(--border-default)] hover:border-[var(--color-ink-400)]'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <Car className="w-4 h-4 text-[var(--color-terracotta-500)]" />
            <span className="text-[10px] font-mono font-bold uppercase text-[var(--color-terracotta-600)]">5 - 7 Pax</span>
          </div>
          <p className="text-xs font-bold text-[var(--color-ink-950)]">AC SUV / Taxi</p>
          <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Custom Quote</p>
        </button>

        <button
          type="button"
          onClick={() => setSelectedGroup('van')}
          className={`p-4 rounded-[4px] border text-left transition-all ${
            selectedGroup === 'van'
              ? 'bg-[var(--color-terracotta-100)] border-[var(--color-terracotta-500)] shadow-xs'
              : 'bg-[var(--color-paper-100)] border-[var(--border-default)] hover:border-[var(--color-ink-400)]'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <Bus className="w-4 h-4 text-[var(--color-terracotta-500)]" />
            <span className="text-[10px] font-mono font-bold uppercase text-[var(--color-terracotta-600)]">8 - 21 Pax</span>
          </div>
          <p className="text-xs font-bold text-[var(--color-ink-950)]">21-Seater Group Van</p>
          <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Custom Quote</p>
        </button>
      </div>

      {/* Selected Vehicle Match Card */}
      <div className="p-5 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-block px-2.5 py-0.5 rounded bg-[var(--color-terracotta-500)] text-[#FFFFFF] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
            Recommended Match: {activeData.paxLabel}
          </div>
          <h4 className="text-base font-bold text-[var(--color-ink-950)]">
            {activeData.vehicleName}
          </h4>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-secondary)] mt-2">
            <span className="flex items-center gap-1 font-semibold text-[var(--color-terracotta-600)]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Quote: {activeData.rate}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" /> Driver Allowance: {activeData.allowance}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" /> {activeData.boot}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={getQuickWhatsAppLink(activeData.whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-[#FFFFFF] text-xs font-bold px-4 py-2.5 rounded shadow-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Book via WhatsApp</span>
          </a>
          <Link
            href={activeData.link}
            className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-[var(--color-ink-950)] border border-[var(--color-ink-950)] px-4 py-2 rounded hover:bg-[var(--color-ink-950)] hover:text-[#FFFFFF] transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
