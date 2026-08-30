/**
 * MAHALAKSHMI TOURS AND TRAVELS — TRAVEL GUIDE CARD
 * Editorial publication card for travel guide directory (compact format).
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { TravelArticle } from '@/types/article';
import { Badge } from '@/components/ui/Badge';

interface TravelGuideCardProps {
  article: TravelArticle;
}

export function TravelGuideCard({ article }: TravelGuideCardProps) {
  return (
    <article className="bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] hover:border-[var(--color-terracotta-400)] transition-editorial overflow-hidden flex flex-col justify-between group shadow-editorial-xs">
      <div>
        {/* Cover Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-ink-900)]">
          <Image
            src={article.coverImage.url}
            alt={article.coverImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2.5 left-2.5">
            <Badge variant="terracotta" size="sm">
              {article.category.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-1.5 text-[11px] font-mono text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[var(--color-terracotta-500)]" />
              {article.readingTimeMinutes} min read
            </span>
            {article.destination && (
              <>
                <span>•</span>
                <span>{article.destination}</span>
              </>
            )}
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-[var(--color-ink-950)] group-hover:text-[var(--color-terracotta-500)] transition-colors mb-1.5 line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-2">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Link */}
      <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-950)] group-hover:text-[var(--color-terracotta-500)] transition-colors">
          Read Guide
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-[var(--color-terracotta-500)] transition-transform group-hover:translate-x-1" />
      </div>

      <Link href={`/travel-guide/${article.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read {article.title}</span>
      </Link>
    </article>
  );
}
