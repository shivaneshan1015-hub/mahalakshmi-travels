/**
 * MAHALAKSHMI TOUR & TRAVEL — STEP 03: TRAVELLERS & GROUP TYPE
 * "Who is travelling?"
 */

'use client';

import React from 'react';
import { Users, Minus, Plus, HeartHandshake, GraduationCap, Building2, Church, Sparkles } from 'lucide-react';
import { GroupType } from '@/types/enquiry';
import { cn } from '@/lib/utils/cn';

interface Step03TravellersProps {
  travellerCount: number;
  groupType: GroupType;
  onChangeCount: (count: number) => void;
  onChangeGroupType: (type: GroupType) => void;
}

export function Step03Travellers({
  travellerCount,
  groupType,
  onChangeCount,
  onChangeGroupType,
}: Step03TravellersProps) {
  const groupTypes: Array<{
    id: GroupType;
    label: string;
    description: string;
  }> = [
    {
      id: 'family',
      label: 'Family Vacation',
      description: 'Grandparents, parents, children travelling at a relaxed pace.',
    },
    {
      id: 'friends',
      label: 'Friends & Small Group',
      description: 'Weekend getaways, road trips, and hill station treks.',
    },
    {
      id: 'college',
      label: 'College / Student Batch',
      description: 'Department IV tours, educational visits, and batch outings.',
    },
    {
      id: 'organization',
      label: 'Corporate / Association',
      description: 'Office team excursions, temple societies, and community groups.',
    },
    {
      id: 'function',
      label: 'Wedding & Event Guests',
      description: 'Marriage ceremonies, temple functions, and reception transit.',
    },
    {
      id: 'couple',
      label: 'Couple / Just Us',
      description: 'Private sedan getaway for two.',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
          STEP 03 OF 06
        </span>
        <h2 className="type-h2 text-[var(--color-ink-950)] mb-2">
          Who is travelling?
        </h2>
        <p className="type-body-small text-[var(--text-secondary)]">
          Tell us how many people will be in the vehicle and your travel group type.
        </p>
      </div>

      {/* Passenger Counter Block */}
      <div className="p-6 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-900)] font-semibold block mb-0.5">
            TOTAL PASSENGERS:
          </span>
          <p className="text-xs text-[var(--text-secondary)]">
            Includes adults, children, and coordinators.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onChangeCount(Math.max(1, (travellerCount || 1) - 1))}
            className="w-10 h-10 rounded-full border border-[var(--border-default)] bg-[var(--color-paper-100)] flex items-center justify-center text-[var(--color-ink-950)] hover:bg-[var(--color-paper-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]"
            aria-label="Decrease passenger count"
          >
            <Minus className="w-4 h-4" />
          </button>

          <div className="w-16 text-center">
            <span className="type-display-m text-[var(--color-ink-950)]">
              {travellerCount || 1}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onChangeCount((travellerCount || 1) + 1)}
            className="w-10 h-10 rounded-full border border-[var(--border-default)] bg-[var(--color-paper-100)] flex items-center justify-center text-[var(--color-ink-950)] hover:bg-[var(--color-paper-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]"
            aria-label="Increase passenger count"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Group Type Selector */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-900)] font-semibold block">
          Select Your Group Type:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Group type options">
          {groupTypes.map((item) => {
            const isSelected = groupType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onChangeGroupType(item.id)}
                className={cn(
                  'p-4 rounded-[4px] border text-left transition-editorial focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]',
                  isSelected
                    ? 'bg-[var(--color-paper-200)] border-[var(--color-terracotta-500)] shadow-editorial-xs'
                    : 'bg-[#FFFFFF] border-[var(--border-default)] hover:border-[var(--color-terracotta-400)]'
                )}
              >
                <div className="text-xs font-bold text-[var(--color-ink-950)] mb-1">
                  {item.label}
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
