/**
 * MAHALAKSHMI TOUR & TRAVEL — STEP 02: ORIGIN & DESTINATIONS
 * "Where do you want to go?"
 */

'use client';

import React, { useState } from 'react';
import { MapPin, Plus, X, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Step02DestinationsProps {
  origin: string;
  destinations: string[];
  customDestination?: string;
  onUpdateOrigin: (origin: string) => void;
  onToggleDestination: (dest: string) => void;
  onUpdateCustomDestination: (dest: string) => void;
}

export function Step02Destinations({
  origin,
  destinations,
  customDestination,
  onUpdateOrigin,
  onToggleDestination,
  onUpdateCustomDestination,
}: Step02DestinationsProps) {
  const [isEditingOrigin, setIsEditingOrigin] = useState(false);
  const [tempOrigin, setTempOrigin] = useState(origin || 'Madurai');

  const popularRegions = [
    {
      state: 'Tamil Nadu',
      places: ['Kodaikanal', 'Rameswaram', 'Ooty', 'Kanyakumari', 'Palani', 'Thanjavur'],
    },
    {
      state: 'Kerala',
      places: ['Munnar', 'Thekkady', 'Kumily', 'Alleppey', 'Kochi'],
    },
    {
      state: 'Karnataka & Andhra Pradesh',
      places: ['Mysore', 'Bangalore', 'Coorg', 'Tirupati'],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
          STEP 02 OF 06
        </span>
        <h2 className="type-h2 text-[var(--color-ink-950)] mb-2">
          Where do you want to go?
        </h2>
        <p className="type-body-small text-[var(--text-secondary)]">
          Select one or more destinations from Madurai, or type a custom place.
        </p>
      </div>

      {/* Origin Selector Card */}
      <div className="p-4 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[var(--color-terracotta-500)]" />
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
            STARTING POINT:
          </span>
          {isEditingOrigin ? (
            <input
              type="text"
              value={tempOrigin}
              onChange={(e) => setTempOrigin(e.target.value)}
              className="px-2 py-1 text-xs font-bold border border-[var(--color-terracotta-500)] rounded bg-white"
              autoFocus
            />
          ) : (
            <span className="text-xs font-bold text-[var(--color-ink-950)]">
              {origin || 'Madurai'} (Default Depot)
            </span>
          )}
        </div>

        <div>
          {isEditingOrigin ? (
            <button
              type="button"
              onClick={() => {
                onUpdateOrigin(tempOrigin || 'Madurai');
                setIsEditingOrigin(false);
              }}
              className="text-xs font-mono text-[var(--color-terracotta-600)] font-bold hover:underline"
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingOrigin(true)}
              className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--color-terracotta-600)] underline"
            >
              Change
            </button>
          )}
        </div>
      </div>

      {/* Active Route Summary Line */}
      {(destinations.length > 0 || customDestination) && (
        <div className="p-3.5 bg-[#FFFFFF] rounded-[4px] border border-[var(--color-terracotta-400)] flex flex-wrap items-center gap-2 shadow-editorial-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-terracotta-500)] font-bold">
            CURRENT ROUTE:
          </span>
          <span className="text-xs font-bold text-[var(--color-ink-950)]">{origin || 'Madurai'}</span>
          <span className="text-xs text-[var(--text-muted)]">→</span>
          {destinations.map((d, idx) => (
            <React.Fragment key={d}>
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-[var(--color-paper-200)] px-2 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--color-ink-950)]">
                {d}
                <button
                  type="button"
                  onClick={() => onToggleDestination(d)}
                  className="text-[var(--text-muted)] hover:text-red-600 ml-0.5"
                  aria-label={`Remove ${d}`}
                >
                  ×
                </button>
              </span>
              {idx < destinations.length - 1 && <span className="text-xs text-[var(--text-muted)]">→</span>}
            </React.Fragment>
          ))}
          {customDestination && (
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-[var(--color-paper-200)] px-2 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--color-ink-950)]">
              {customDestination}
              <button
                type="button"
                onClick={() => onUpdateCustomDestination('')}
                className="text-[var(--text-muted)] hover:text-red-600 ml-0.5"
                aria-label="Remove custom destination"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {/* Suggested Destination Clusters */}
      <div className="space-y-4">
        {popularRegions.map((region) => (
          <div key={region.state} className="p-4 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-2.5">
              {region.state}
            </span>
            <div className="flex flex-wrap gap-2">
              {region.places.map((place) => {
                const isSelected = destinations.includes(place);
                return (
                  <button
                    key={place}
                    type="button"
                    onClick={() => onToggleDestination(place)}
                    className={cn(
                      'px-3 py-1.5 rounded-[3px] text-xs font-medium border transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]',
                      isSelected
                        ? 'bg-[var(--color-ink-950)] text-[var(--color-paper-100)] border-[var(--color-ink-950)] font-bold shadow-editorial-xs'
                        : 'bg-[var(--color-paper-100)] text-[var(--color-ink-900)] border-[var(--border-default)] hover:border-[var(--color-terracotta-400)]'
                    )}
                  >
                    {isSelected ? <Check className="w-3 h-3 text-[var(--color-terracotta-300)]" /> : <Plus className="w-3 h-3 text-[var(--text-muted)]" />}
                    {place}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Destination Option */}
      <div className="p-4 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)]">
        <label htmlFor="custom-dest-input" className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-900)] font-semibold block mb-2">
          I Have Another Destination in Mind:
        </label>
        <input
          id="custom-dest-input"
          type="text"
          value={customDestination || ''}
          onChange={(e) => onUpdateCustomDestination(e.target.value)}
          placeholder="e.g. Valparai, Courtallam, Pollachi, Tiruchendur..."
          className="w-full px-3.5 py-2.5 text-xs rounded-[3px] border border-[var(--border-default)] focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)] bg-[var(--color-paper-100)] text-[var(--color-ink-950)] placeholder-[var(--text-muted)]"
        />
      </div>
    </div>
  );
}
