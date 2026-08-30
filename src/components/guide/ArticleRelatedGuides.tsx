/**
 * MAHALAKSHMI TOUR & TRAVEL — ARTICLE RELATED GUIDES
 * Semantic related travel articles at the end of a guide.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { TravelArticle } from '@/types/article';

interface ArticleRelatedGuidesProps {
  relatedArticles: TravelArticle[];
}

export function ArticleRelatedGuides({ relatedArticles }: ArticleRelatedGuidesProps) {
  if (!relatedArticles || relatedArticles.length === 0) return null;

  return (
    <section className="my-12 pt-10 border-t border-[var(--border-default)]">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-4 h-4 text-[var(--color-terracotta-500)]" />
        <span className="type-eyebrow text-[var(--color-terracotta-500)]">
          CONTINUE READING
        </span>
      </div>

      <h2 className="type-h2 text-[var(--color-ink-950)] mb-8">
        Related Travel Guides & Routes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedArticles.map((article) => (
          <article
            key={article.id}
            className="p-5 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] hover:border-[var(--color-terracotta-400)] transition-editorial flex flex-col justify-between group relative shadow-editorial-xs"
          >
            <div>
              <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-[var(--text-muted)]">
                <span className="uppercase font-semibold text-[var(--color-terracotta-600)]">
                  {article.category.replace('-', ' ')}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[var(--color-terracotta-500)]" />
                  {article.readingTimeMinutes} min
                </span>
              </div>

              <h3 className="type-h4 text-[var(--color-ink-950)] group-hover:text-[var(--color-terracotta-500)] transition-colors mb-2">
                {article.title}
              </h3>

              <p className="type-body-small text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[var(--color-ink-950)] group-hover:text-[var(--color-terracotta-500)] transition-colors">
                Read Article
              </span>
              <ArrowRight className="w-4 h-4 text-[var(--color-terracotta-500)] transition-transform group-hover:translate-x-1" />
            </div>

            <Link href={`/travel-guide/${article.slug}`} className="absolute inset-0 z-10">
              <span className="sr-only">Read {article.title}</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
