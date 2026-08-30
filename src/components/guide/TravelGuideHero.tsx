/**
 * MAHALAKSHMI TOUR & TRAVEL — TRAVEL GUIDE HERO
 * Conceptual Headline: "TRAVEL, BEFORE YOU GO."
 * Publication-style hero showcasing the featured cornerstone guide.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Sparkles, BookOpen } from 'lucide-react';
import { TravelArticle } from '@/types/article';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface TravelGuideHeroProps {
  featuredArticle: TravelArticle;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function TravelGuideHero({
  featuredArticle,
  activeCategory,
  onSelectCategory,
}: TravelGuideHeroProps) {
  const categories = [
    { id: 'all', label: 'All Guides' },
    { id: 'route-insight', label: 'Route Insights' },
    { id: 'itinerary', label: '1N/2D Itineraries' },
    { id: 'family-tips', label: 'Family Planning' },
    { id: 'group-planning', label: 'College & Group Trips' },
    { id: 'travel-guide', label: 'Destinations' },
  ];

  return (
    <section className="border-b border-[var(--border-default)] pb-12 mb-12">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="terracotta">Travel Knowledge & Route Insights</Badge>
          <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider">
            MADURAI DESK • SOUTH INDIA
          </span>
        </div>

        <h1 className="type-display-l text-[var(--text-primary)] mb-4">
          Travel, Before You Go.
        </h1>

        <p className="type-body-large text-[var(--text-secondary)] leading-relaxed">
          Ideas, highway routes, and practical guides for planning unhurried journeys across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.
        </p>
      </div>

      {/* Featured Cornerstone Article Spotlight Card */}
      <div className="bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] p-6 md:p-10 mb-10 shadow-editorial-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 relative aspect-[16/10] rounded-[3px] overflow-hidden bg-[var(--color-ink-900)]">
          <Image
            src={featuredArticle.coverImage.url}
            alt={featuredArticle.coverImage.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase font-bold bg-[var(--color-ink-950)] text-[var(--color-paper-100)] rounded">
              FEATURED GUIDE
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[var(--color-terracotta-600)]">
              <span className="uppercase tracking-wider font-semibold">
                {featuredArticle.category.replace('-', ' ')}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[var(--text-muted)]">
                <Clock className="w-3.5 h-3.5" />
                {featuredArticle.readingTimeMinutes} min read
              </span>
            </div>

            <h2 className="type-h3 text-[var(--color-ink-950)] mb-3">
              {featuredArticle.title}
            </h2>

            <p className="type-body-small text-[var(--text-secondary)] mb-6 leading-relaxed">
              {featuredArticle.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border-subtle)]">
            <Link href={`/travel-guide/${featuredArticle.slug}`}>
              <Button variant="primary" size="md" withArrow>
                Read Featured Guide
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-2" role="tablist" aria-label="Article categories">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 text-xs rounded-[3px] border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)] ${
                isSelected
                  ? 'bg-[var(--color-ink-950)] text-white border-[var(--color-ink-950)] font-bold shadow-editorial-xs'
                  : 'bg-[var(--color-paper-100)] text-[var(--color-ink-900)] border-[var(--border-default)] hover:border-[var(--color-terracotta-400)]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
