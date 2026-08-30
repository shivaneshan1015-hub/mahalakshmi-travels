/**
 * MAHALAKSHMI TOUR & TRAVEL — TOUR FILTER BAR
 * Editorial multi-dimensional filter control (State, Duration, Journey Type, Search).
 */

'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface TourFiltersState {
  category: string; // 'all' | 'pilgrimage-temple' | 'hill-stations-nature' | 'coastal-backwaters' | 'heritage-cities' | 'adventure-theme-parks'
  state: string; // 'all' | 'Tamil Nadu' | 'Kerala' | 'Karnataka' | 'Andhra Pradesh'
  duration: string; // 'all' | '1N/2D' | '2N/3D'
  idealFor: string; // 'all' | 'family' | 'group' | 'college'
  searchQuery: string;
}

interface TourFilterBarProps {
  filters: TourFiltersState;
  onChangeFilters: (newFilters: TourFiltersState) => void;
  onResetFilters: () => void;
  resultCount: number;
}

export function TourFilterBar({
  filters,
  onChangeFilters,
  onResetFilters,
  resultCount,
}: TourFilterBarProps) {
  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'pilgrimage-temple', label: '🛕 Pilgrimage & Temples' },
    { id: 'hill-stations-nature', label: '🌲 Hill Stations & Nature' },
    { id: 'coastal-backwaters', label: '⛵ Coastal & Backwaters' },
    { id: 'heritage-cities', label: '🏛️ Heritage & Cities' },
    { id: 'adventure-theme-parks', label: '🎢 Adventure & Parks' },
  ];

  const states = ['All', 'Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh'];
  const durations = [
    { id: 'all', label: 'All Durations' },
    { id: '1 Day', label: '1 Day' },
    { id: '1N/2D', label: '1N / 2D' },
    { id: '3N/4D', label: '3N / 4D+' },
  ];
  const idealOptions = [
    { id: 'all', label: 'All Travellers' },
    { id: 'family', label: 'Family' },
    { id: 'group', label: 'Group / 21 Seats' },
    { id: 'college', label: 'College / IV' },
  ];

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.state !== 'all' ||
    filters.duration !== 'all' ||
    filters.idealFor !== 'all' ||
    filters.searchQuery.trim() !== '';

  return (
    <div className="bg-[var(--color-paper-100)] border border-[var(--border-default)] rounded-[4px] p-5 md:p-6 mb-10 space-y-5">
      {/* Category Pills Header */}
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2.5 font-semibold">
          BROWSE BY CATEGORY
        </span>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onChangeFilters({ ...filters, category: cat.id })}
                className={cn(
                  'px-3.5 py-1.5 text-xs rounded-full border transition-all font-medium flex items-center gap-1.5',
                  isSelected
                    ? 'bg-[var(--color-terracotta-600)] text-white border-[var(--color-terracotta-600)] shadow-sm'
                    : 'bg-white text-[var(--color-ink-900)] border-[var(--border-default)] hover:border-[var(--color-terracotta-400)] hover:bg-[var(--color-paper-50)]'
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Row: Search Input & Result Count */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search destination, temple, theme park, hill station..."
            value={filters.searchQuery}
            onChange={(e) =>
              onChangeFilters({ ...filters, searchQuery: e.target.value })
            }
            className="w-full pl-9.5 pr-4 py-2 text-xs bg-[#FFFFFF] border border-[var(--border-default)] rounded-[3px] focus:outline-none focus:border-[var(--color-terracotta-500)] text-[var(--color-ink-950)] placeholder:text-[var(--text-muted)] font-sans"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onChangeFilters({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--color-ink-950)]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Results / Reset Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono">
          <span className="text-[var(--text-secondary)]">
            Showing <strong>{resultCount}</strong> {resultCount === 1 ? 'Tour Package' : 'Tour Packages'}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-[var(--color-terracotta-600)] hover:underline flex items-center gap-1 font-semibold"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>
          )}
        </div>
      </div>

      {/* Secondary Filter Dimensions Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-subtle)]">
        {/* Dimension 1: Where? (State) */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2 font-semibold">
            STATE / REGION
          </span>
          <div className="flex flex-wrap gap-1.5">
            {states.map((st) => {
              const value = st === 'All' ? 'all' : st;
              const isSelected = filters.state.toLowerCase() === value.toLowerCase();
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => onChangeFilters({ ...filters, state: value })}
                  className={cn(
                    'px-2.5 py-1 text-xs rounded-[3px] border transition-colors font-medium',
                    isSelected
                      ? 'bg-[var(--color-ink-950)] text-white border-[var(--color-ink-950)]'
                      : 'bg-white text-[var(--color-ink-800)] border-[var(--border-default)] hover:border-[var(--color-terracotta-400)]'
                  )}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dimension 2: How Long? (Duration) */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2 font-semibold">
            DURATION
          </span>
          <div className="flex flex-wrap gap-1.5">
            {durations.map((dur) => {
              const isSelected = filters.duration === dur.id;
              return (
                <button
                  key={dur.id}
                  type="button"
                  onClick={() => onChangeFilters({ ...filters, duration: dur.id })}
                  className={cn(
                    'px-2.5 py-1 text-xs rounded-[3px] border transition-colors font-medium',
                    isSelected
                      ? 'bg-[var(--color-ink-950)] text-white border-[var(--color-ink-950)]'
                      : 'bg-white text-[var(--color-ink-800)] border-[var(--border-default)] hover:border-[var(--color-terracotta-400)]'
                  )}
                >
                  {dur.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dimension 3: Who's Going? */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2 font-semibold">
            TRAVELLERS
          </span>
          <div className="flex flex-wrap gap-1.5">
            {idealOptions.map((opt) => {
              const isSelected = filters.idealFor === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangeFilters({ ...filters, idealFor: opt.id })}
                  className={cn(
                    'px-2.5 py-1 text-xs rounded-[3px] border transition-colors font-medium',
                    isSelected
                      ? 'bg-[var(--color-ink-950)] text-white border-[var(--color-ink-950)]'
                      : 'bg-white text-[var(--color-ink-800)] border-[var(--border-default)] hover:border-[var(--color-terracotta-400)]'
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
