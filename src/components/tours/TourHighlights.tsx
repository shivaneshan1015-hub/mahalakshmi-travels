/**
 * MAHALAKSHMI TOUR & TRAVEL — TOUR HIGHLIGHTS
 * Visual highlight cards ("The Journey in Brief").
 */

import React from 'react';

interface TourHighlightsProps {
  highlights: string[];
}

export function TourHighlights({ highlights }: TourHighlightsProps) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section className="border-b border-[var(--border-default)] pb-12 mb-12">
      <div className="max-w-2xl mb-8">
        <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
          JOURNEY OVERVIEW
        </span>
        <h2 className="type-h2 text-[var(--text-primary)]">
          The Journey in Brief
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights.map((highlight, idx) => (
          <div
            key={idx}
            className="p-5 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] flex flex-col justify-between"
          >
            <span className="type-data-number text-2xl text-[var(--color-terracotta-500)] mb-3 block">
              {(idx + 1).toString().padStart(2, '0')}
            </span>
            <p className="type-body-small text-[var(--color-ink-900)] leading-relaxed font-medium">
              {highlight}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
