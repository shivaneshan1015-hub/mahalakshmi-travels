/**
 * MAHALAKSHMI TOUR & TRAVEL — ACCESSIBLE DESTINATION LIST COMPONENT
 * Mandatory non-map discovery interface for screen readers, keyboard users, and SEO indexation.
 */

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { southIndiaMapData } from '@/lib/data/map';
import { SouthIndiaState } from '@/types/tour';

export function AccessibleDestinationList() {
  const { nodes } = southIndiaMapData;

  const states: SouthIndiaState[] = [
    'Tamil Nadu',
    'Kerala',
    'Karnataka',
    'Andhra Pradesh',
  ];

  return (
    <nav
      aria-label="Direct South India Destination Directory"
      className="p-6 md:p-8 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)]"
    >
      <div className="flex items-center gap-2 mb-6">
        <Compass className="w-4 h-4 text-[var(--color-terracotta-500)]" />
        <h3 className="type-h4 text-[var(--text-primary)]">
          Complete Destination Directory from Madurai
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {states.map((stateName) => {
          const stateNodes = nodes.filter(
            (n) => n.state === stateName && !n.isOrigin
          );

          return (
            <div key={stateName} className="flex flex-col">
              <h4 className="type-eyebrow text-[var(--color-terracotta-500)] pb-2 border-b border-[var(--border-default)] mb-3">
                {stateName}
              </h4>
              <ul className="space-y-2.5">
                {stateNodes.map((node) => (
                  <li key={node.id}>
                    <Link
                      href={`/destinations/${node.slug}`}
                      className="group flex items-start justify-between text-xs hover:text-[var(--color-terracotta-500)] transition-colors p-1.5 rounded hover:bg-white"
                    >
                      <div>
                        <span className="font-semibold text-[var(--color-ink-950)] group-hover:text-[var(--color-terracotta-500)] flex items-center gap-1.5">
                          <span>{node.categoryIcon || '📍'}</span>
                          <span>{node.name}</span>
                        </span>
                        <span className="text-[10px] font-mono text-[var(--text-muted)] block mt-0.5">
                          {node.distanceFromMaduraiKm} KM • {node.highwayBadge || `~${node.travelTimeFromMadurai}`}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--color-terracotta-500)] opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
