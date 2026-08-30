/**
 * MAHALAKSHMI TOUR & TRAVEL — STEP 04: DATES & DURATION
 * "When are you planning to travel?"
 */

'use client';

import React from 'react';
import { Calendar, Clock, Check } from 'lucide-react';
import { DateFlexibility } from '@/types/enquiry';
import { cn } from '@/lib/utils/cn';

interface Step04DatesDurationProps {
  dateFlexibility: DateFlexibility;
  travelDate?: string;
  returnDate?: string;
  duration?: string;
  onChangeFlexibility: (flexibility: DateFlexibility) => void;
  onChangeTravelDate: (date: string) => void;
  onChangeReturnDate: (date: string) => void;
  onChangeDuration: (duration: string) => void;
}

export function Step04DatesDuration({
  dateFlexibility,
  travelDate,
  returnDate,
  duration,
  onChangeFlexibility,
  onChangeTravelDate,
  onChangeReturnDate,
  onChangeDuration,
}: Step04DatesDurationProps) {
  const durationOptions = [
    'Same Day Return (1 Day)',
    '1 Night / 2 Days',
    '2 Nights / 3 Days',
    '3 Nights / 4 Days',
    '5+ Days Extended Circuit',
    'Not sure yet',
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
          STEP 04 OF 06
        </span>
        <h2 className="type-h2 text-[var(--color-ink-950)] mb-2">
          When are you planning to travel?
        </h2>
        <p className="type-body-small text-[var(--text-secondary)]">
          Dates can be exact or flexible. Tell us what you know so far.
        </p>
      </div>

      {/* Date Flexibility Tabs */}
      <div className="flex border border-[var(--border-default)] rounded-[4px] p-1 bg-[var(--color-paper-100)] gap-1">
        <button
          type="button"
          onClick={() => onChangeFlexibility('flexible')}
          className={cn(
            'flex-1 py-2 px-3 rounded-[3px] text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]',
            dateFlexibility === 'flexible'
              ? 'bg-[#FFFFFF] text-[var(--color-ink-950)] shadow-editorial-xs'
              : 'text-[var(--text-secondary)] hover:text-[var(--color-ink-950)]'
          )}
        >
          Dates are Flexible
        </button>
        <button
          type="button"
          onClick={() => onChangeFlexibility('exact')}
          className={cn(
            'flex-1 py-2 px-3 rounded-[3px] text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]',
            dateFlexibility === 'exact'
              ? 'bg-[#FFFFFF] text-[var(--color-ink-950)] shadow-editorial-xs'
              : 'text-[var(--text-secondary)] hover:text-[var(--color-ink-950)]'
          )}
        >
          I Have Exact Dates
        </button>
        <button
          type="button"
          onClick={() => onChangeFlexibility('undecided')}
          className={cn(
            'flex-1 py-2 px-3 rounded-[3px] text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]',
            dateFlexibility === 'undecided'
              ? 'bg-[#FFFFFF] text-[var(--color-ink-950)] shadow-editorial-xs'
              : 'text-[var(--text-secondary)] hover:text-[var(--color-ink-950)]'
          )}
        >
          Still Deciding
        </button>
      </div>

      {/* Exact Date Inputs (when exact selected) */}
      {dateFlexibility === 'exact' && (
        <div className="p-4 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)] grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start-date" className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-900)] font-semibold block mb-1.5">
              Start Date:
            </label>
            <input
              id="start-date"
              type="date"
              value={travelDate || ''}
              onChange={(e) => onChangeTravelDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-[3px] border border-[var(--border-default)] bg-[var(--color-paper-100)] text-[var(--color-ink-950)] focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]"
            />
          </div>
          <div>
            <label htmlFor="return-date" className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-900)] font-semibold block mb-1.5">
              Return Date (Optional):
            </label>
            <input
              id="return-date"
              type="date"
              value={returnDate || ''}
              onChange={(e) => onChangeReturnDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-[3px] border border-[var(--border-default)] bg-[var(--color-paper-100)] text-[var(--color-ink-950)] focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]"
            />
          </div>
        </div>
      )}

      {/* Duration Options */}
      <div className="p-4 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)]">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-900)] font-semibold block mb-3">
          Approximate Trip Duration:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {durationOptions.map((opt) => {
            const isSelected = duration === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChangeDuration(opt)}
                className={cn(
                  'p-3 rounded-[3px] text-xs text-left border transition-all flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]',
                  isSelected
                    ? 'bg-[var(--color-ink-950)] text-[var(--color-paper-100)] border-[var(--color-ink-950)] font-bold shadow-editorial-xs'
                    : 'bg-[var(--color-paper-100)] text-[var(--color-ink-900)] border-[var(--border-default)] hover:border-[var(--color-terracotta-400)]'
                )}
              >
                <span>{opt}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[var(--color-terracotta-300)] shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
