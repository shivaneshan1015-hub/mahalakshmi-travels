/**
 * MAHALAKSHMI TOURS AND TRAVELS — TRAVEL GUIDE PREVIEW SECTION
 * Narrative 08: INSPIRATION • "08 — EDITORIAL TRAVEL STORIES"
 * Sleek, compact card presentation.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { getAllArticles } from '@/lib/data/articles';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function TravelGuideSection() {
  const articles = getAllArticles();

  return (
    <section className="py-16 md:py-24 border-b border-[var(--border-default)]">
      <div className="container-editorial">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
              08 — EDITORIAL TRAVEL STORIES
            </span>
            <h2 className="type-display-l text-[var(--text-primary)]">
              Go Beyond the Itinerary.
            </h2>
            <p className="text-xs uppercase tracking-widest font-semibold text-[var(--color-terracotta-500)] mt-1">
              Practical route advice & local South India knowledge
            </p>
          </div>

          <Link href="/travel-guide" className="hidden sm:inline-flex">
            <Button variant="secondary" size="sm" withArrow>
              Explore All Guides
            </Button>
          </Link>
        </div>

        {/* Compact 3-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {articles.slice(0, 3).map((article) => (
            <div
              key={article.id}
              className="relative bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] hover:border-[var(--color-terracotta-400)] hover:shadow-editorial-md transition-editorial overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/10">
                  <Image
                    src={article.coverImage.url}
                    alt={article.coverImage.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  />
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <Badge variant="terracotta" size="sm">
                      {article.category.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] font-mono mb-2">
                    <Clock className="w-3 h-3 text-[var(--color-terracotta-500)]" />
                    <span>{article.readingTimeMinutes} min read</span>
                    {article.destination && (
                      <>
                        <span>•</span>
                        <span>{article.destination}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-terracotta-500)] transition-colors mb-2 line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-950)] group-hover:text-[var(--color-terracotta-500)]">
                  Read Guide
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--color-terracotta-500)] transition-transform group-hover:translate-x-1" />
              </div>

              <Link href={`/travel-guide/${article.slug}`} className="absolute inset-0 z-20" aria-label={`Read ${article.title}`}>
                <span className="sr-only">Read {article.title}</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center sm:hidden pt-2">
          <Link href="/travel-guide">
            <Button variant="secondary" size="md" fullWidth withArrow>
              Explore All Guides
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
