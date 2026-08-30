/**
 * MAHALAKSHMI TOUR & TRAVEL — RELATED ARTICLES COMPONENT
 * Connects the tour with relevant editorial travel guide articles.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { TravelArticle } from '@/types/article';
import { Badge } from '@/components/ui/Badge';

interface RelatedArticlesProps {
  articles: TravelArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="border-b border-[var(--border-default)] pb-12 mb-12">
      <div className="max-w-2xl mb-8">
        <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
          EDITORIAL TRAVEL NOTES
        </span>
        <h2 className="type-h2 text-[var(--text-primary)]">
          Related Travel Guides
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art) => (
          <Link
            key={art.id}
            href={`/travel-guide/${art.slug}`}
            className="p-5 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] hover:border-[var(--color-terracotta-400)] transition-editorial flex items-start gap-4 group"
          >
            <div className="relative w-20 h-20 shrink-0 rounded-[3px] overflow-hidden bg-[var(--color-ink-900)]">
              <Image
                src={art.coverImage.url}
                alt={art.coverImage.alt}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-muted)] mb-1">
                <Badge variant="terracotta" size="sm">
                  {art.category.replace('-', ' ').toUpperCase()}
                </Badge>
                <span>{art.readingTimeMinutes} min read</span>
              </div>
              <h3 className="type-h4 text-[var(--color-ink-950)] group-hover:text-[var(--color-terracotta-500)] transition-colors truncate">
                {art.title}
              </h3>
              <p className="type-body-small text-[var(--text-secondary)] line-clamp-2 mt-1">
                {art.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
