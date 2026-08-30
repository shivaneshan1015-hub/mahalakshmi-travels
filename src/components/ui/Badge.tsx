/**
 * MAHALAKSHMI TOUR & TRAVEL — BADGE & TAG COMPONENT
 */

import React from 'react';
import { cn } from '@/lib/utils/cn';

export type BadgeVariant = 
  | 'terracotta' 
  | 'ink' 
  | 'paper' 
  | 'outline' 
  | 'success' 
  | 'warning';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  className,
  variant = 'outline',
  size = 'md',
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium tracking-[0.08em] uppercase rounded-full';

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-[11px] px-2.5 py-1',
  };

  const variantStyles = {
    terracotta: 'bg-[var(--color-terracotta-100)] text-[var(--color-terracotta-800)] border border-[var(--color-terracotta-200)]',
    ink: 'bg-[var(--color-ink-950)] text-[var(--color-paper-100)]',
    paper: 'bg-[var(--color-paper-100)] text-[var(--color-ink-800)] border border-[var(--border-subtle)]',
    outline: 'bg-transparent text-[var(--color-ink-700)] border border-[var(--border-default)]',
    success: 'bg-[var(--color-status-success-bg)] text-[var(--color-status-success)]',
    warning: 'bg-[var(--color-status-warning-bg)] text-[var(--color-status-warning)]',
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
