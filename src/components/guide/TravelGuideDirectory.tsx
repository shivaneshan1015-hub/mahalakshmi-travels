/**
 * MAHALAKSHMI TOUR & TRAVEL — TRAVEL GUIDE DIRECTORY CLIENT CONTAINER
 * Handles category filtering and displays editorial publication cards.
 */

'use client';

import React, { useState } from 'react';
import { TravelArticle } from '@/types/article';
import { TravelGuideHero } from './TravelGuideHero';
import { TravelGuideCard } from './TravelGuideCard';
import { ArticleCustomJourneyCTA } from './ArticleCustomJourneyCTA';

interface TravelGuideDirectoryProps {
  articles: TravelArticle[];
  featuredArticle: TravelArticle;
}

export function TravelGuideDirectory({
  articles,
  featuredArticle,
}: TravelGuideDirectoryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredArticles =
    activeCategory === 'all'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div>
      {/* Publication Hero & Category Filter */}
      <TravelGuideHero
        featuredArticle={featuredArticle}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* Articles Grid */}
      <section className="mb-14">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
              CURATED ARTICLES & INSIGHTS
            </span>
            <h2 className="type-h2 text-[var(--color-ink-950)]">
              {activeCategory === 'all' ? 'All Published Guides' : `${activeCategory.replace('-', ' ').toUpperCase()} Guides`}
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Showing {filteredArticles.length} of {articles.length} guides
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <TravelGuideCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Contextual Custom Route Planner Invitation */}
      <ArticleCustomJourneyCTA />
    </div>
  );
}
