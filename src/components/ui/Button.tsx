/**
 * MAHALAKSHMI TOUR & TRAVEL — BUTTON COMPONENT
 * Principles: Confident, understated, directional language, non-bubbly editorial radius.
 */

import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 
  | 'primary'       // Terracotta fill
  | 'secondary'     // Ink outline
  | 'tertiary'      // Minimal route-arrow link button
  | 'ink-solid'     // Solid ink button
  | 'paper-solid'   // Solid paper button (for dark surfaces)
  | 'paper-outline'; // Paper outline (for dark surfaces)

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  withArrow?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      withArrow = false,
      icon,
      iconPosition = 'right',
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold tracking-[0.06em] uppercase transition-editorial btn-tactile focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terracotta-500)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer';

    const sizeStyles = {
      sm: 'text-xs px-3.5 py-2 rounded-[3px] gap-1.5',
      md: 'text-xs px-5 py-3 rounded-[4px] gap-2',
      lg: 'text-sm px-7 py-3.5 rounded-[4px] gap-2.5',
    };

    const variantStyles = {
      primary: 'bg-[var(--color-terracotta-500)] text-[#FFFFFF] hover:bg-[var(--color-terracotta-600)] active:bg-[var(--color-terracotta-700)] shadow-editorial-sm',
      secondary: 'bg-transparent text-[var(--color-ink-950)] border border-[var(--color-ink-950)] hover:bg-[var(--color-ink-950)] hover:text-[var(--color-paper-100)]',
      'ink-solid': 'bg-[var(--color-ink-950)] text-[var(--color-paper-100)] hover:bg-[var(--color-ink-900)]',
      'paper-solid': 'bg-[var(--color-paper-100)] text-[var(--color-ink-950)] hover:bg-[#FFFFFF]',
      'paper-outline': 'bg-transparent text-[var(--color-paper-100)] border border-[var(--color-paper-100)] hover:bg-[var(--color-paper-100)] hover:text-[var(--color-ink-950)]',
      tertiary: 'bg-transparent text-[var(--color-terracotta-500)] p-0 hover:text-[var(--color-terracotta-700)] normal-case tracking-normal font-medium',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        {!isLoading && icon && iconPosition === 'left' && icon}
        <span>{children}</span>
        {!isLoading && icon && iconPosition === 'right' && icon}
        {!isLoading && withArrow && (
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
