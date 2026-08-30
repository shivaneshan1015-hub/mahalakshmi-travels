/**
 * MAHALAKSHMI TOUR & TRAVEL — TOUR ITINERARY TIMELINE
 * Core editorial day-by-day journey timeline with route progress markers.
 */

import React from 'react';
import { MapPin, Compass, CheckCircle2, Clock } from 'lucide-react';
import { TourItineraryDay } from '@/types/tour';

interface TourItineraryTimelineProps {
  itinerary: TourItineraryDay[];
}

export function TourItineraryTimeline({ itinerary }: TourItineraryTimelineProps) {
  if (!itinerary || itinerary.length === 0) return null;

  return (
    <section className="border-b border-[var(--border-default)] pb-12 mb-12">
      <div className="max-w-2xl mb-10">
        <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
          DAY-BY-DAY ROUTE
        </span>
        <h2 className="type-h2 text-[var(--text-primary)] mb-2">
          The Unfolding Itinerary
        </h2>
        <p className="type-body-small text-[var(--text-secondary)]">
          Paced for comfortable family travel, scenic halts, and local meals without rushed schedules.
        </p>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-10 before:content-[''] before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[var(--color-terracotta-300)]">
        {itinerary.map((day) => (
          <div key={day.day} className="relative group">
            {/* Timeline Day Milestone Pin */}
            <div className="absolute -left-6 sm:-left-8 top-1 w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-[var(--color-terracotta-500)] text-white flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold ring-4 ring-[var(--color-paper-100)]">
              {day.day}
            </div>

            {/* Day Content Card */}
            <div className="p-6 sm:p-7 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)]">
              {/* Day Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-[var(--border-subtle)]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-terracotta-500)] font-bold block">
                    DAY {day.day.toString().padStart(2, '0')}
                  </span>
                  <h3 className="type-h3 text-[var(--color-ink-950)] mt-0.5">
                    {day.title}
                  </h3>
                </div>

                {(day.startLocation || day.endLocation) && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] bg-white px-2.5 py-1 rounded border border-[var(--border-subtle)]">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" />
                    <span>{day.startLocation || 'Madurai'} → {day.endLocation || 'Destination'}</span>
                  </div>
                )}
              </div>

              {/* Day Description */}
              <p className="type-body text-[var(--text-secondary)] mb-6 leading-relaxed">
                {day.description}
              </p>

              {/* Day Activities */}
              {day.activities && day.activities.length > 0 && (
                <div className="mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-ink-900)] font-semibold block mb-2">
                    Key Halts & Activities:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {day.activities.map((act: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-ink-800)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-terracotta-500)] shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Day Notes */}
              {day.notes && day.notes.length > 0 && (
                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center gap-2 text-[11px] text-[var(--text-muted)] italic font-serif">
                  <Clock className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                  <span>{day.notes.join(' ')}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
