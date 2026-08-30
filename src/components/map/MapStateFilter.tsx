/**
 * MAHALAKSHMI TOUR & TRAVEL — MAP STATE FILTER COMPONENT
 * Directional state selector filtering nodes across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.
 */

'use client';

import React from 'react';
import { StateFilterId } from '@/types/map';
import { cn } from '@/lib/utils/cn';

interface MapStateFilterProps {
  activeState: StateFilterId;
  onSelectState: (state: StateFilterId) => void;
  className?: string;
}

export function MapStateFilter({
  activeState,
  onSelectState,
  className = '',
}: MapStateFilterProps) {
  const filters: Array<{ id: StateFilterId; label: string; count: string }> = [
    { id: 'all', label: 'All Directions', count: '9 Hubs' },
    { id: 'tamil-nadu', label: 'Tamil Nadu', count: '4 Destinations' },
    { id: 'kerala', label: 'Kerala', count: '2 Destinations' },
    { id: 'karnataka', label: 'Karnataka', count: '2 Destinations' },
    { id: 'andhra-pradesh', label: 'Andhra Pradesh', count: '1 Destination' },
  ];

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 p-1.5 bg-[var(--color-paper-100)] border border-[var(--border-default)] rounded-[4px] overflow-x-auto no-scrollbar',
        className
      )}
      role="tablist"
      aria-label="Filter South India Destinations by State"
    >
      {filters.map((filter) => {
        const isActive = activeState === filter.id;

        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectState(filter.id)}
            className={cn(
              'px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-[3px] transition-colors shrink-0 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta-500)]',
              isActive
                ? 'bg-[var(--color-ink-950)] text-[var(--color-paper-100)] shadow-editorial-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--color-ink-950)] hover:bg-[#FFFFFF]'
            )}
          >
            <span>{filter.label}</span>
            <span
              className={cn(
                'text-[9px] font-mono px-1.5 py-0.5 rounded',
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-[var(--color-paper-200)] text-[var(--text-muted)]'
              )}
            >
              {filter.count.split(' ')[0]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
