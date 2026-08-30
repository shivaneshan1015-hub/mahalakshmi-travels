/**
 * MAHALAKSHMI TOUR & TRAVEL — ARTICLE ROUTE MARGIN
 * Signature desktop route progression trace along the article's edge.
 */

import React from 'react';
import { MapPin, ArrowDown } from 'lucide-react';

interface ArticleRouteMarginProps {
  origin?: string;
  destination?: string;
  distanceKm?: number;
}

export function ArticleRouteMargin({
  origin = 'Madurai',
  destination = 'South India',
  distanceKm,
}: ArticleRouteMarginProps) {
  return (
    <aside
      className="hidden lg:block sticky top-28 p-5 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] w-60 shadow-editorial-xs"
      aria-label="Route progression overview"
    >
      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-terracotta-500)] font-bold block mb-4">
        ROUTE CORRIDOR
      </span>

      {/* Visual Route Trace */}
      <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-[var(--color-terracotta-400)]">
        {/* Origin Node */}
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-4 h-4 rounded-full bg-[var(--color-ink-950)] border-2 border-[var(--color-paper-100)] flex items-center justify-center text-[8px] text-white shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">ORIGIN</span>
            <span className="text-xs font-bold text-[var(--color-ink-950)]">{origin}</span>
          </div>
        </div>

        {/* Mid Halt / Route Context */}
        {distanceKm && (
          <div className="flex items-start gap-3 relative z-10 pl-6">
            <span className="text-[10px] font-mono text-[var(--color-terracotta-600)] bg-white px-2 py-0.5 rounded border border-[var(--border-subtle)]">
              {distanceKm} KM Highway & Ghat
            </span>
          </div>
        )}

        {/* Destination Node */}
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-4 h-4 rounded-full bg-[var(--color-terracotta-500)] border-2 border-[var(--color-paper-100)] flex items-center justify-center text-[8px] text-white shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">DESTINATION</span>
            <span className="text-xs font-bold text-[var(--color-ink-950)]">{destination}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-muted)]">
        DEPOT: MADURAI, TN
      </div>
    </aside>
  );
}
