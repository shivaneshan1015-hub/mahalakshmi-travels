/**
 * MAHALAKSHMI TOUR & TRAVEL — SELECT DROPDOWN PRIMITIVE
 */

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full appearance-none px-3.5 py-2.5 bg-[#FFFFFF] text-[var(--color-ink-950)] text-sm rounded-[3px] border border-[var(--border-default)] pr-9 transition-colors focus:border-[var(--color-terracotta-500)] focus:ring-1 focus:ring-[var(--color-terracotta-500)] focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed',
              error && 'border-[var(--color-status-error)] focus:border-[var(--color-status-error)] focus:ring-[var(--color-status-error)]',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-[var(--color-ink-600)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
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

Select.displayName = 'Select';
