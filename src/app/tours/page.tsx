/**
 * MAHALAKSHMI TOUR & TRAVEL — TOUR CATALOGUE & DISCOVERY PAGE (/tours)
 * Phase 05 Implementation: Curated Journey Library with editorial filters and custom journey prompts.
 * Automatically synchronizes with URL search parameters (e.g. ?state=Kerala).
 */

'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllTours } from '@/lib/data/tours';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { TourListingHeader } from '@/components/tours/TourListingHeader';
import { TourFilterBar, TourFiltersState } from '@/components/tours/TourFilterBar';
import { TourListingGrid } from '@/components/tours/TourListingGrid';

function ToursContent() {
  const searchParams = useSearchParams();
  const stateParam = searchParams.get('state');
  const categoryParam = searchParams.get('category');

  const allTours = getAllTours();

  const [filters, setFilters] = useState<TourFiltersState>({
    category: categoryParam || 'all',
    state: stateParam || 'all',
    duration: 'all',
    idealFor: 'all',
    searchQuery: '',
  });

  // Sync url params
  useEffect(() => {
    if (stateParam || categoryParam) {
      setFilters((prev) => ({
        ...prev,
        state: stateParam || prev.state,
        category: categoryParam || prev.category,
      }));
    }
  }, [stateParam, categoryParam]);

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      state: 'all',
      duration: 'all',
      idealFor: 'all',
      searchQuery: '',
    });
  };

  // Filter computation
  const filteredTours = useMemo(() => {
    return allTours.filter((tour) => {
      // 1. Category Filter
      if (filters.category !== 'all' && tour.category !== filters.category) {
        return false;
      }

      // 2. State Filter (case-insensitive & slug compatible)
      if (filters.state !== 'all') {
        const filterStateClean = filters.state.toLowerCase().replace('-', ' ').trim();
        const tourStateClean = tour.state.toLowerCase().trim();
        if (!tourStateClean.includes(filterStateClean) && !filterStateClean.includes(tourStateClean)) {
          return false;
        }
      }

      // 3. Duration Filter
      if (filters.duration === '1 Day' && tour.duration.days !== 1) {
        return false;
      }
      if (filters.duration === '1N/2D' && (tour.duration.days !== 2 || tour.duration.nights !== 1)) {
        return false;
      }
      if (filters.duration === '3N/4D' && tour.duration.days < 3) {
        return false;
      }

      // 4. Ideal For Filter
      if (filters.idealFor !== 'all' && !tour.idealFor.includes(filters.idealFor as any)) {
        return false;
      }

      // 5. Search Query Filter
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = tour.title.toLowerCase().includes(query);
        const matchesDestination = tour.destination.toLowerCase().includes(query);
        const matchesState = tour.state.toLowerCase().includes(query);
        const matchesDesc = tour.shortDescription.toLowerCase().includes(query);
        const matchesHighlights = tour.highlights.some((h) => h.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDestination && !matchesState && !matchesDesc && !matchesHighlights) {
          return false;
        }
      }

      return true;
    });
  }, [allTours, filters]);

  return (
    <div className="container-editorial py-10 md:py-16">
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav
        items={[
          { name: 'Home', itemUrl: '/', position: 1 },
          { name: 'Explore Journeys', itemUrl: '/tours', position: 2 },
        ]}
        className="mb-8"
      />

      {/* Header */}
      <TourListingHeader />

      {/* Filter Control Bar */}
      <TourFilterBar
        filters={filters}
        onChangeFilters={setFilters}
        onResetFilters={handleResetFilters}
        resultCount={filteredTours.length}
      />

      {/* Tour Grid with Visual Rhythm */}
      <TourListingGrid
        tours={filteredTours}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
}

export default function ToursPage() {
  return (
    <Suspense fallback={<div className="container-editorial py-20 text-center text-sm font-mono text-[var(--text-muted)]">Loading Journeys...</div>}>
      <ToursContent />
    </Suspense>
  );
}
