/**
 * MAHALAKSHMI TOUR & TRAVEL — TIMELINE ITEM COMPONENT
 * Expresses day-by-day itinerary progress and route milestones.
 */

import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface TimelineItemProps {
  dayNumber: number;
  title: string;
  description: string;
  distanceKm?: number;
  routeNodes?: string[];
  stayLocation?: string;
  isLast?: boolean;
}

export function TimelineItem({
  dayNumber,
  title,
  description,
  distanceKm,
  routeNodes = [],
  stayLocation,
  isLast = false,
}: TimelineItemProps) {
  const dayString = dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;

  return (
    <div className="relative flex gap-6 group">
      {/* Vertical Spine Line */}
      <div className="flex flex-col items-center">
        {/* Milestone Node */}
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-paper-100)] border-2 border-[var(--color-terracotta-500)] text-[var(--color-ink-950)] text-xs font-mono font-semibold shrink-0 z-10">
          {dayString}
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-[var(--border-default)] my-2 group-hover:bg-[var(--color-terracotta-400)] transition-colors" />
        )}
      </div>

      {/* Content Block */}
      <div className="flex-1 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="type-eyebrow text-[var(--color-terracotta-500)]">
            DAY {dayString}
          </span>
          {distanceKm && (
            <span className="px-2 py-0.5 text-[10px] font-mono bg-[var(--color-paper-100)] text-[var(--color-ink-700)] rounded border border-[var(--border-subtle)]">
              {distanceKm} KM
            </span>
          )}
          {stayLocation && (
            <span className="text-xs text-[var(--text-muted)]">
              • Overnight: <strong className="text-[var(--text-primary)]">{stayLocation}</strong>
            </span>
          )}
        </div>

        <h4 className="type-h4 text-[var(--text-primary)] mt-1 mb-2">
          {title}
        </h4>

        <p className="type-body-small text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>

        {routeNodes.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
            <span className="text-[var(--color-terracotta-500)]">Route:</span>
            <span>{routeNodes.join(' ── ')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
