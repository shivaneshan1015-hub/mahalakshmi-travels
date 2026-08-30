/**
 * MAHALAKSHMI TOUR & TRAVEL — SKELETON PRIMITIVE
 */

import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-[3px] bg-[var(--color-paper-300)] opacity-60',
        className
      )}
      {...props}
    />
  );
}
