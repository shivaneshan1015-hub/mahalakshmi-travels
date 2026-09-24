'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Car, MapPin, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';

export function HeroDualIntentBar() {
  const [activeTab, setActiveTab] = useState<'rental' | 'tours'>('rental');
  const [vehicleType, setVehicleType] = useState('21-seater');
  const [passengerCount, setPassengerCount] = useState('11-20');

  const whatsappRentalMessage = `Hi Mahalakshmi Travels, I want to rent a vehicle from Madurai. Type: ${
    vehicleType === '21-seater' ? '21-Seater AC Group Van' : '4-Seater Private AC Sedan'
  }, Group Size: ${passengerCount} Passengers. Please send journey quote.`;

  const rentalWhatsappUrl = getQuickWhatsAppLink(whatsappRentalMessage);

  return (
    <div className="w-full bg-[#FFFFFF] rounded-[8px] border-2 border-[var(--border-default)] shadow-xl overflow-hidden my-6">
      {/* Segment Selector Header */}
      <div className="flex border-b border-[var(--border-default)] bg-[#F1F5F9]">
        <button
          type="button"
          onClick={() => setActiveTab('rental')}
          className={`flex-1 py-3.5 px-4 text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
            activeTab === 'rental'
              ? 'bg-[#FFFFFF] text-[var(--color-terracotta-500)] border-b-2 border-[var(--color-terracotta-500)] shadow-xs'
              : 'text-[var(--text-muted)] hover:text-[var(--color-ink-950)]'
          }`}
        >
          <Car className="w-4 h-4 text-[var(--color-terracotta-500)]" />
          <span>Rent a Vehicle with Driver</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tours')}
          className={`flex-1 py-3.5 px-4 text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
            activeTab === 'tours'
              ? 'bg-[#FFFFFF] text-[var(--color-terracotta-500)] border-b-2 border-[var(--color-terracotta-500)] shadow-xs'
              : 'text-[var(--text-muted)] hover:text-[var(--color-ink-950)]'
          }`}
        >
          <MapPin className="w-4 h-4 text-[var(--color-terracotta-500)]" />
          <span>Browse Tour Packages</span>
        </button>
      </div>

      {/* Tab 1: Vehicle Rental Quick Finder */}
      {activeTab === 'rental' && (
        <div className="p-5 sm:p-6 bg-[#FFFFFF] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Vehicle Selection Dropdown */}
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-ink-700)] mb-1.5">
                Select Vehicle Type
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full text-xs font-semibold text-[var(--color-ink-950)] bg-[#F8FAFC] border border-[#CBD5E1] rounded-[6px] p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)] min-h-[44px]"
              >
                <option value="21-seater">21-Seater AC Luxury Van (Group / IV / Outstation)</option>
                <option value="sedan">4-Seater Private AC Sedan (Dzire / Etios / Taxi)</option>
              </select>
            </div>

            {/* Passenger Count Selection */}
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-ink-700)] mb-1.5">
                Passenger Count
              </label>
              <select
                value={passengerCount}
                onChange={(e) => setPassengerCount(e.target.value)}
                className="w-full text-xs font-semibold text-[var(--color-ink-950)] bg-[#F8FAFC] border border-[#CBD5E1] rounded-[6px] p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)] min-h-[44px]"
              >
                <option value="1-4">1 - 4 Passengers (Sedan Recommended)</option>
                <option value="5-10">5 - 10 Passengers (Van Recommended)</option>
                <option value="11-20">11 - 20 Passengers (21-Seater Van Recommended)</option>
              </select>
            </div>
          </div>

          {/* Vehicle Highlights */}
          <div className="p-3.5 bg-[#FFF7ED] rounded-[6px] border border-[#FDBA74] flex flex-wrap items-center justify-between text-xs text-[var(--color-ink-950)] gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--color-terracotta-600)] shrink-0" />
              <span className="font-semibold text-[var(--color-ink-900)]">
                {vehicleType === '21-seater'
                  ? '21-Seater AC Van: Executive Group Van with High-Back Seats'
                  : 'Private AC Sedan: Air-Conditioned Outstation Sedan'}
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase font-extrabold text-[var(--color-terracotta-600)] bg-[#FFEDD5] px-2 py-0.5 rounded">
              Madurai Origin • Custom Quote
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={rentalWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center font-bold tracking-wider uppercase text-xs px-5 py-3 rounded-[6px] gap-2 bg-gradient-to-r from-[#10B981] to-[#059669] text-[#FFFFFF] hover:shadow-md hover:brightness-105 active:scale-[0.98] transition-all text-center min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Rental Quote</span>
            </a>
            <Link
              href="/vehicles"
              className="inline-flex items-center justify-center font-bold tracking-wider uppercase text-xs px-5 py-3 rounded-[6px] gap-2 bg-[var(--color-ink-950)] text-[#FFFFFF] hover:bg-[#1E293B] transition-all min-h-[44px]"
            >
              <span>View Fleet Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Tab 2: Tour Packages Quick Finder */}
      {activeTab === 'tours' && (
        <div className="p-5 sm:p-6 bg-[#FFFFFF] space-y-4">
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Choose from over 41+ curated South India tour circuits departing daily from Madurai.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Link
              href="/tours/munnar"
              className="p-2.5 bg-[var(--color-paper-100)] hover:bg-[var(--color-terracotta-100)] border border-[var(--border-default)] rounded text-xs font-semibold text-center text-[var(--color-ink-950)] transition-colors"
            >
              Madurai → Munnar
            </Link>
            <Link
              href="/tours/kodaikanal"
              className="p-2.5 bg-[var(--color-paper-100)] hover:bg-[var(--color-terracotta-100)] border border-[var(--border-default)] rounded text-xs font-semibold text-center text-[var(--color-ink-950)] transition-colors"
            >
              Madurai → Kodaikanal
            </Link>
            <Link
              href="/tours/rameshwaram"
              className="p-2.5 bg-[var(--color-paper-100)] hover:bg-[var(--color-terracotta-100)] border border-[var(--border-default)] rounded text-xs font-semibold text-center text-[var(--color-ink-950)] transition-colors"
            >
              Rameshwaram Circuit
            </Link>
            <Link
              href="/tours"
              className="p-2.5 bg-[var(--color-terracotta-500)] text-[#FFFFFF] rounded text-xs font-semibold text-center hover:bg-[var(--color-terracotta-600)] transition-colors flex items-center justify-center gap-1"
            >
              <span>All 41 Tours</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
