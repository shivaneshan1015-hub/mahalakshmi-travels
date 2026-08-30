/**
 * MAHALAKSHMI TOUR & TRAVEL — TOUR INCLUSIONS BLOCK
 * Factual inclusions, operational amenities, and transparent guidelines.
 */

import React from 'react';
import { ShieldCheck, Check, Info, X } from 'lucide-react';

interface TourInclusionsBlockProps {
  inclusions?: string[];
  exclusions?: string[];
}

export function TourInclusionsBlock({
  inclusions = [],
  exclusions = [],
}: TourInclusionsBlockProps) {
  return (
    <section className="border-b border-[var(--border-default)] pb-12 mb-12">
      <div className="max-w-2xl mb-8">
        <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
          TRANSPARENT OPERATIONS
        </span>
        <h2 className="type-h2 text-[var(--text-primary)] mb-2">
          Inclusions & Travel Guidelines
        </h2>
        <p className="type-body-small text-[var(--text-secondary)]">
          Everything essential to your transport from Madurai is organized in advance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inclusions Box */}
        <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-[var(--color-terracotta-500)]" />
              <h3 className="type-h4 text-[var(--color-ink-950)]">
                Included in Package (Stay + Food + Travel)
              </h3>
            </div>

            <ul className="space-y-3 text-xs text-[var(--color-ink-800)]">
              {inclusions.map((inc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[var(--color-terracotta-500)] shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)] mt-4">
            Customizable pickup and drop points within Madurai depot area.
          </div>
        </div>

        {/* Exclusions / Guidelines Box */}
        <div className="p-6 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-4 h-4 text-[var(--text-muted)]" />
              <h3 className="type-h4 text-[var(--color-ink-950)]">
                Important Travel Notes & Exclusions
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
              {exclusions.map((exc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[var(--text-muted)]">•</span>
                  <span>{exc}</span>
                </li>
              ))}
              <li>• Hotel stay and meals are included in all packages as per itinerary.</li>
              <li>• Mountain ghat itineraries are scheduled for daylight safety and pleasant scenic pacing.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)] mt-4">
            Madurai Base Depot: Direct operational support throughout your journey.
          </div>
        </div>
      </div>
    </section>
  );
}
