/**
 * MAHALAKSHMI TOUR & TRAVEL — STEP 01: TRAVEL INTENT
 * "What are you planning?"
 */

'use client';

import React from 'react';
import { Compass, Users, HeartHandshake, GraduationCap, Church, Map, Car, HelpCircle } from 'lucide-react';
import { TravelIntent } from '@/types/enquiry';
import { cn } from '@/lib/utils/cn';

interface Step01IntentProps {
  selectedIntent: TravelIntent;
  onSelect: (intent: TravelIntent) => void;
  onNext: () => void;
}

export function Step01Intent({ selectedIntent, onSelect, onNext }: Step01IntentProps) {
  const intents: Array<{
    id: TravelIntent;
    label: string;
    description: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'tour',
      label: 'South India Tour Package',
      description: 'Explore curated circuits like Munnar, Kodaikanal, Rameswaram, or Ooty.',
      icon: <Compass className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
    },
    {
      id: 'family',
      label: 'Family Holiday Travel',
      description: 'Unhurried vacations for grandparents, parents, and kids in private sedans or van.',
      icon: <HeartHandshake className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
    },
    {
      id: 'group',
      label: '21-Seater Group Travel',
      description: 'Pilgrimage batches, associations, and large groups in our flagship AC van.',
      icon: <Users className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
    },
    {
      id: 'college',
      label: 'College / Industrial Visit (IV)',
      description: 'Student batch tours and educational excursions with seasoned highway drivers.',
      icon: <GraduationCap className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
    },
    {
      id: 'function',
      label: 'Wedding & Function Transport',
      description: 'Guest shuttles between Madurai Airport, Junction, marriage halls, and temple venues.',
      icon: <Church className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
    },
    {
      id: 'custom',
      label: 'Custom Journey / Specific Route',
      description: 'Design your own itinerary across Tamil Nadu, Kerala, Karnataka, or AP.',
      icon: <Map className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
    },
    {
      id: 'vehicle',
      label: 'Specific Vehicle Hire',
      description: 'Book our 21-seater AC van or comfortable private sedan cars directly.',
      icon: <Car className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
    },
    {
      id: 'general',
      label: 'General Travel Enquiry',
      description: 'Ask our Madurai desk about route feasibility, timing, or travel advice.',
      icon: <HelpCircle className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
          STEP 01 OF 06
        </span>
        <h2 className="type-h2 text-[var(--color-ink-950)] mb-2">
          What are you planning?
        </h2>
        <p className="type-body-small text-[var(--text-secondary)]">
          Select the travel category that best matches your upcoming requirement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Travel intent options">
        {intents.map((item) => {
          const isSelected = selectedIntent === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => {
                onSelect(item.id);
              }}
              className={cn(
                'p-4 rounded-[4px] border text-left transition-editorial flex items-start gap-3.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]',
                isSelected
                  ? 'bg-[var(--color-paper-200)] border-[var(--color-terracotta-500)] shadow-editorial-sm'
                  : 'bg-[#FFFFFF] border-[var(--border-default)] hover:border-[var(--color-terracotta-400)]'
              )}
            >
              <div className="mt-0.5 shrink-0 p-2 bg-[#FFFFFF] rounded border border-[var(--border-subtle)]">
                {item.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-[var(--color-ink-950)] mb-0.5">
                  {item.label}
                </div>
                <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
