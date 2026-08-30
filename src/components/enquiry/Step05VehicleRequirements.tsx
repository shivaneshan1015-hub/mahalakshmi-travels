/**
 * MAHALAKSHMI TOUR & TRAVEL — STEP 05: VEHICLE & SPECIAL REQUIREMENTS
 * "Do you need transport?"
 */

'use client';

import React from 'react';
import { Car, Bus, HelpCircle, Check, MessageSquare } from 'lucide-react';
import { VehicleRequirementType } from '@/types/enquiry';
import { cn } from '@/lib/utils/cn';

interface Step05VehicleRequirementsProps {
  vehicleRequirement: VehicleRequirementType;
  notes?: string;
  onChangeVehicleRequirement: (req: VehicleRequirementType) => void;
  onChangeNotes: (notes: string) => void;
}

export function Step05VehicleRequirements({
  vehicleRequirement,
  notes,
  onChangeVehicleRequirement,
  onChangeNotes,
}: Step05VehicleRequirementsProps) {
  const vehicleOptions: Array<{
    id: VehicleRequirementType;
    label: string;
    description: string;
    badge?: string;
  }> = [
    {
      id: 'help-me-choose',
      label: 'Help Me Choose',
      description: 'Our Madurai team will suggest the most comfortable vehicle based on your passenger count.',
      badge: 'RECOMMENDED',
    },
    {
      id: '21-seater-van',
      label: '21-Seater Flagship Van',
      description: '20+1 High-Back Pushback Seats, Full-Cabin Dual AC, and ample luggage bay for groups.',
      badge: 'IN-HOUSE FLEET',
    },
    {
      id: 'sedan-car',
      label: 'Private Sedan Car',
      description: 'Comfortable air-conditioned sedan for couples and small families (up to 4 passengers).',
      badge: 'IN-HOUSE FLEET',
    },
    {
      id: 'no-vehicle',
      label: 'Undecided / Route Guidance Only',
      description: 'I would like to explore itinerary planning first before deciding on transport.',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
          STEP 05 OF 06
        </span>
        <h2 className="type-h2 text-[var(--color-ink-950)] mb-2">
          Do you need transportation?
        </h2>
        <p className="type-body-small text-[var(--text-secondary)]">
          Select your vehicle preference or let our travel desk match the right transport.
        </p>
      </div>

      {/* Vehicle Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Vehicle options">
        {vehicleOptions.map((opt) => {
          const isSelected = vehicleRequirement === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChangeVehicleRequirement(opt.id)}
              className={cn(
                'p-4 rounded-[4px] border text-left transition-editorial flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]',
                isSelected
                  ? 'bg-[var(--color-paper-200)] border-[var(--color-terracotta-500)] shadow-editorial-xs'
                  : 'bg-[#FFFFFF] border-[var(--border-default)] hover:border-[var(--color-terracotta-400)]'
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-[var(--color-ink-950)]">
                    {opt.label}
                  </span>
                  {opt.badge && (
                    <span className="text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-[var(--color-paper-100)] text-[var(--color-terracotta-600)] font-semibold border border-[var(--border-subtle)]">
                      {opt.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  {opt.description}
                </p>
              </div>

              {isSelected && (
                <div className="mt-3 pt-2 border-t border-[var(--border-subtle)] flex items-center gap-1 text-[11px] font-mono text-[var(--color-terracotta-600)] font-bold">
                  <Check className="w-3.5 h-3.5" /> Selected
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Open-Ended Custom Notes */}
      <div className="p-4 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)]">
        <label htmlFor="trip-notes" className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-900)] font-semibold block mb-1.5">
          What Else Should We Know? (Optional)
        </label>
        <p className="text-[11px] text-[var(--text-secondary)] mb-2.5">
          Tell us about specific temple darshans, senior citizen pacing, student halts, pickup locations in Madurai, or special requests.
        </p>
        <textarea
          id="trip-notes"
          rows={3}
          value={notes || ''}
          onChange={(e) => onChangeNotes(e.target.value)}
          placeholder="e.g. Traveling with elderly parents, prefer unhurried hill climb with frequent tea halts..."
          className="w-full px-3.5 py-2.5 text-xs rounded-[3px] border border-[var(--border-default)] bg-[var(--color-paper-100)] text-[var(--color-ink-950)] focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)] resize-y"
        />
      </div>
    </div>
  );
}
