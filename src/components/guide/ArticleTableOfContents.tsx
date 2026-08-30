/**
 * MAHALAKSHMI TOUR & TRAVEL — ARTICLE TABLE OF CONTENTS
 * Accessible table of contents component with collapsible mobile state.
 */

'use client';

import React, { useState } from 'react';
import { List, ChevronDown } from 'lucide-react';
import { ArticleTocItem } from '@/types/article';
import { cn } from '@/lib/utils/cn';

interface ArticleTableOfContentsProps {
  items?: ArticleTocItem[];
}

export function ArticleTableOfContents({ items }: ArticleTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!items || items.length === 0) return null;

  return (
    <nav
      className="p-5 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] mb-10 shadow-editorial-xs"
      aria-label="Table of contents"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-[var(--color-terracotta-500)]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-ink-950)] font-bold">
            IN THIS GUIDE ({items.length} SECTIONS)
          </span>
        </div>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-[var(--color-terracotta-500)] transition-transform duration-200',
            isOpen ? 'rotate-180' : ''
          )}
        />
      </button>

      {isOpen && (
        <ol className="mt-4 pt-3 border-t border-[var(--border-subtle)] space-y-2 text-xs">
          {items.map((item, idx) => (
            <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
              <a
                href={`#${item.id}`}
                className="text-[var(--text-secondary)] hover:text-[var(--color-terracotta-600)] transition-colors flex items-baseline gap-2 group"
              >
                <span className="font-mono text-[10px] text-[var(--color-terracotta-500)] font-semibold shrink-0">
                  0{idx + 1}
                </span>
                <span className="group-hover:underline">{item.title}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
