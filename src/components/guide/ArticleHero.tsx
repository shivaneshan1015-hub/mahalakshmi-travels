/**
 * MAHALAKSHMI TOUR & TRAVEL — ARTICLE HERO
 * Publication-grade article header with high-resolution photography.
 */

import React from 'react';
import Image from 'next/image';
import { Clock, Calendar, User } from 'lucide-react';
import { TravelArticle } from '@/types/article';
import { Badge } from '@/components/ui/Badge';

interface ArticleHeroProps {
  article: TravelArticle;
}

export function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <header className="mb-10">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge variant="terracotta">
          {article.category.replace('-', ' ').toUpperCase()}
        </Badge>
        {article.destination && (
          <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider">
            {article.destination.toUpperCase()}
          </span>
        )}
      </div>

      <h1 className="type-display-l text-[var(--color-ink-950)] mb-4 max-w-4xl leading-tight">
        {article.title}
      </h1>

      <p className="type-body-large text-[var(--text-secondary)] mb-6 max-w-3xl leading-relaxed">
        {article.excerpt}
      </p>

      {/* Meta Information Bar */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)] pb-6 border-b border-[var(--border-default)] mb-8">
        <div className="flex items-center gap-1.5 text-[var(--color-ink-900)] font-semibold">
          <User className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" />
          <span>{article.author.name}</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" />
          <span>Published {article.publishedDate}</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" />
          <span>{article.readingTimeMinutes} min read</span>
        </div>
      </div>

      {/* Full-Width Featured Cover Image */}
      <div className="relative aspect-[16/9] w-full rounded-[4px] overflow-hidden bg-[var(--color-ink-900)] border border-[var(--border-default)] shadow-editorial-md">
        <Image
          src={article.coverImage.url}
          alt={article.coverImage.alt}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />
      </div>
    </header>
  );
}
