/**
 * MAHALAKSHMI TOUR & TRAVEL — ARTICLE KEY FACTS PANEL
 * Compact facts summary for practical travel planning.
 */

import React from 'react';
import { MapPin, Navigation, Clock, Calendar, Car, Compass } from 'lucide-react';
import { ArticleKeyFacts as KeyFactsType } from '@/types/article';

interface ArticleKeyFactsProps {
  keyFacts?: KeyFactsType;
}

export function ArticleKeyFacts({ keyFacts }: ArticleKeyFactsProps) {
  if (!keyFacts) return null;

  return (
    <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] mb-10 shadow-editorial-xs">
      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-terracotta-500)] font-bold block mb-4">
        PRACTICAL ROUTE & TRAVEL FACTS
      </span>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-[var(--text-muted)] flex items-center gap-1 mb-1 font-mono uppercase text-[10px]">
            <MapPin className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" /> Starting Point:
          </span>
          <strong className="text-[var(--color-ink-950)]">{keyFacts.origin}</strong>
        </div>

        <div>
          <span className="text-[var(--text-muted)] flex items-center gap-1 mb-1 font-mono uppercase text-[10px]">
            <Navigation className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" /> Destination:
          </span>
          <strong className="text-[var(--color-ink-950)]">{keyFacts.destination}</strong>
        </div>

        {keyFacts.distanceKm && (
          <div>
            <span className="text-[var(--text-muted)] flex items-center gap-1 mb-1 font-mono uppercase text-[10px]">
              <Compass className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" /> Distance:
            </span>
            <strong className="text-[var(--color-ink-950)]">{keyFacts.distanceKm} KM</strong>
          </div>
        )}

        <div>
          <span className="text-[var(--text-muted)] flex items-center gap-1 mb-1 font-mono uppercase text-[10px]">
            <Clock className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" /> Ideal Duration:
          </span>
          <strong className="text-[var(--color-ink-950)]">{keyFacts.idealDuration}</strong>
        </div>

        {keyFacts.bestSeason && (
          <div>
            <span className="text-[var(--text-muted)] flex items-center gap-1 mb-1 font-mono uppercase text-[10px]">
              <Calendar className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" /> Best Season:
            </span>
            <strong className="text-[var(--color-ink-950)]">{keyFacts.bestSeason}</strong>
          </div>
        )}

        {keyFacts.recommendedVehicle && (
          <div className="sm:col-span-2">
            <span className="text-[var(--text-muted)] flex items-center gap-1 mb-1 font-mono uppercase text-[10px]">
              <Car className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" /> Recommended Fleet:
            </span>
            <strong className="text-[var(--color-terracotta-600)]">{keyFacts.recommendedVehicle}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
