/**
 * MAHALAKSHMI TOUR & TRAVEL — DATA ANCHOR COMPONENT
 * Turns travel facts (distance, duration, seats, states) into architectural typography anchors.
 * Auto-scales typography for numbers vs longer words to prevent container overflow.
 */

import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface DataAnchorProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  unit: string;
  sublabel?: string;
  alignment?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark' | 'terracotta';
}

export function DataAnchor({
  value,
  unit,
  sublabel,
  alignment = 'left',
  theme = 'light',
  className,
  ...props
}: DataAnchorProps) {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const themeStyles = {
    light: {
      number: 'text-[var(--color-ink-950)]',
      unit: 'text-[var(--color-terracotta-500)]',
      sublabel: 'text-[var(--color-ink-600)]',
    },
    dark: {
      number: 'text-[var(--color-paper-100)]',
      unit: 'text-[var(--color-terracotta-300)]',
      sublabel: 'text-[var(--color-ink-300)]',
    },
    terracotta: {
      number: 'text-[var(--color-terracotta-500)]',
      unit: 'text-[var(--color-ink-950)]',
      sublabel: 'text-[var(--color-ink-700)]',
    },
  };

  // Determine appropriate font size based on value format
  const valStr = String(value);
  const isCurrency = valStr.startsWith('₹') || valStr.startsWith('Rs');
  const isWord = !isCurrency && valStr.length > 3 && isNaN(Number(valStr.replace('%', '')));
  
  const sizeClasses = isCurrency
    ? 'text-2xl sm:text-3xl lg:text-[2.25rem] font-display font-bold tracking-tight leading-none'
    : isWord
      ? valStr.length > 6
        ? 'text-xl sm:text-2xl lg:text-[1.75rem] font-display font-bold tracking-tight leading-none'
        : 'text-2xl sm:text-3xl lg:text-[2rem] font-display font-bold tracking-tight leading-none'
      : 'text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold tracking-tight leading-none font-variant-numeric-tabular';

  return (
    <div
      className={cn('flex flex-col max-w-full justify-between', alignStyles[alignment], className)}
      {...props}
    >
      <div className="flex items-baseline gap-1.5 leading-none max-w-full whitespace-nowrap">
        <span
          className={cn(sizeClasses, themeStyles[theme].number, 'shrink-0')}
        >
          {value}
        </span>
        <span
          className={cn('type-data-unit shrink-0 font-bold', themeStyles[theme].unit)}
        >
          {unit}
        </span>
      </div>
      {sublabel && (
        <span
          className={cn('type-metadata mt-2 text-[10px] sm:text-[11px] tracking-wider uppercase font-bold', themeStyles[theme].sublabel)}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
}
