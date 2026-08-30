/**
 * MAHALAKSHMI TOUR & TRAVEL — TEXTAREA PRIMITIVE
 */

import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, rows = 4, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]"
          >
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          className={cn(
            'w-full px-3.5 py-2.5 bg-[#FFFFFF] text-[var(--color-ink-950)] placeholder-[var(--text-subtle)] text-sm rounded-[3px] border border-[var(--border-default)] transition-colors focus:border-[var(--color-terracotta-500)] focus:ring-1 focus:ring-[var(--color-terracotta-500)] focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed resize-y',
            error && 'border-[var(--color-status-error)] focus:border-[var(--color-status-error)] focus:ring-[var(--color-status-error)]',
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-[var(--color-status-error)] font-medium">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span className="text-xs text-[var(--text-muted)]">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
