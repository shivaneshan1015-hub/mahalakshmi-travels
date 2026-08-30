/**
 * MAHALAKSHMI TOUR & TRAVEL — ROUTE INDICATOR COMPONENT
 * Expresses journey route paths between Madurai and destination nodes.
 */

import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface RouteIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  origin?: string;
  destination: string;
  distanceKm?: number;
  stops?: string[];
  theme?: 'light' | 'dark';
  isIncomplete?: boolean; // Brand continuing route motif
}

export function RouteIndicator({
  origin = 'Madurai',
  destination,
  distanceKm,
  stops = [],
  theme = 'light',
  isIncomplete = true,
  className,
  ...props
}: RouteIndicatorProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={cn('flex flex-col gap-2 py-2', className)}
      {...props}
    >
      {/* Route Graphic Line & Nodes */}
      <div className="flex items-center gap-3 w-full">
        {/* Origin Node */}
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={cn(
              'w-2.5 h-2.5 rounded-full ring-4',
              isDark
                ? 'bg-[var(--color-paper-100)] ring-[var(--color-ink-800)]'
                : 'bg-[var(--color-ink-950)] ring-[var(--color-paper-300)]'
            )}
          />
          <span
            className={cn(
              'text-xs uppercase tracking-[0.14em] font-semibold',
              isDark ? 'text-[var(--color-paper-100)]' : 'text-[var(--color-ink-950)]'
            )}
          >
            {origin}
          </span>
        </div>

        {/* Connecting Route Line */}
        <div className="relative flex-1 flex items-center h-4">
          <div
            className={cn(
              'w-full h-px',
              isDark ? 'bg-[var(--color-ink-700)]' : 'bg-[var(--border-default)]'
            )}
          />

          {/* Stops / Midpoints */}
          {stops.map((stop, idx) => (
            <div
              key={idx}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${((idx + 1) / (stops.length + 1)) * 100}%` }}
              title={stop}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta-500)]" />
            </div>
          ))}

          {/* Distance Badge on Line */}
          {distanceKm && (
            <span
              className={cn(
                'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-mono font-medium rounded tracking-wider',
                isDark
                  ? 'bg-[var(--color-ink-900)] text-[var(--color-terracotta-300)] border border-[var(--color-ink-800)]'
                  : 'bg-[var(--color-paper-100)] text-[var(--color-terracotta-700)] border border-[var(--border-subtle)]'
              )}
            >
              {distanceKm} KM
            </span>
          )}
        </div>

        {/* Destination Node */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-terracotta-500)] ring-4 ring-[var(--color-terracotta-100)]" />
          <span className="text-xs uppercase tracking-[0.14em] font-semibold text-[var(--color-terracotta-500)]">
            {destination}
          </span>
        </div>

        {/* Incomplete continuing journey motif */}
        {isIncomplete && (
          <div className="flex items-center pl-1 shrink-0">
            <span
              className="w-5 h-px border-b border-dashed border-[var(--color-terracotta-400)]"
              title="Journey continues beyond"
            />
          </div>
        )}
      </div>

      {/* Optional Stops Subtext */}
      {stops.length > 0 && (
        <div className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] pl-4">
          <span className="italic">via:</span>
          <span>{stops.join(' → ')}</span>
        </div>
      )}
    </div>
  );
}
