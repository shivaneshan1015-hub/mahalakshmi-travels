/**
 * MAHALAKSHMI TOUR & TRAVEL — ACCESSIBLE BREADCRUMB COMPONENT
 */

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbItem } from '@/types/seo';
import { JsonLd } from './JsonLd';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbNav({ items, className = '' }: BreadcrumbNavProps) {
  const schemaData = generateBreadcrumbSchema(items);

  return (
    <>
      <JsonLd data={schemaData} />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-2 text-sm text-[var(--text-muted)] ${className}`}
      >
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.itemUrl} className="flex items-center">
                {index > 0 && (
                  <ChevronRight
                    className="w-3.5 h-3.5 mx-1.5 text-[var(--text-subtle)] shrink-0"
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    className="font-medium text-[var(--text-primary)] truncate max-w-[200px] md:max-w-none"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.itemUrl}
                    className="hover:text-[var(--color-terracotta-500)] transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
