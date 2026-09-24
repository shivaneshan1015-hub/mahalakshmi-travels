/**
 * MAHALAKSHMI TOUR & TRAVEL — CARD PRIMITIVE & VARIANTS
 * Variants: Editorial, Journey, Destination, Vehicle, Information
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Clock, Compass } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Badge } from './Badge';

/* Base Card Container */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'paper' | 'white' | 'ink' | 'outline';
  hoverEffect?: boolean;
}

export function Card({
  children,
  className,
  variant = 'paper',
  hoverEffect = true,
  ...props
}: CardProps) {
  const variantStyles = {
    paper: 'bg-[var(--color-paper-100)] border border-[var(--border-default)] text-[var(--text-primary)]',
    white: 'bg-[#FFFFFF] border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-editorial-sm',
    ink: 'bg-[var(--color-ink-950)] border border-[var(--color-ink-800)] text-[var(--color-paper-100)]',
    outline: 'bg-transparent border border-[var(--border-default)] text-[var(--text-primary)]',
  };

  return (
    <div
      className={cn(
        'rounded-[4px] overflow-hidden transition-editorial relative',
        variantStyles[variant],
        hoverEffect && 'card-interactive hover:border-[var(--color-terracotta-400)] hover:shadow-editorial-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ==========================================================================
   JOURNEY CARD (Tours)
   ========================================================================== */
export interface JourneyCardProps {
  title: string;
  destination: string;
  durationText: string;
  distanceKm: number;
  imageUrl: string;
  href: string;
  startingLocation?: string;
  customisable?: boolean;
  tags?: string[];
  size?: 'sm' | 'md';
  className?: string;
}

export function JourneyCard({
  title,
  destination,
  durationText,
  distanceKm,
  imageUrl,
  href,
  startingLocation = 'Madurai',
  customisable = true,
  tags = [],
  size = 'md',
  className,
}: JourneyCardProps) {
  const isCompact = size === 'sm';

  return (
    <Card className={cn('group flex flex-col h-full', className)}>
      {/* Image Block */}
      <div className={cn('relative w-full overflow-hidden bg-[var(--color-ink-900)]', isCompact ? 'aspect-[16/11]' : 'aspect-[16/10]')}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-950)]/70 via-transparent to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          <Badge variant="terracotta" size="sm">
            {durationText}
          </Badge>
          {customisable && !isCompact && (
            <Badge variant="ink" size="sm">
              Customisable
            </Badge>
          )}
        </div>

        {/* Bottom Distance Flag */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-end text-white gap-2">
          <span className="text-[11px] font-mono tracking-wider bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm truncate">
            {distanceKm} KM
          </span>
        </div>
      </div>

      {/* Content Block */}
      <div className={cn('flex-1 flex flex-col justify-between', isCompact ? 'p-3.5 sm:p-4' : 'p-5')}>
        <div>
          <div className="flex items-center gap-1 text-[11px] text-[var(--color-terracotta-500)] font-semibold tracking-wider uppercase mb-1">
            <Compass className="w-3 h-3 shrink-0" />
            <span className="truncate">{destination}</span>
          </div>

          <h3 className={cn('text-[var(--text-primary)] group-hover:text-[var(--color-terracotta-500)] transition-colors line-clamp-2 leading-snug', isCompact ? 'text-sm font-semibold' : 'type-h4')}>
            {title}
          </h3>

          {!isCompact && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase font-mono tracking-wider text-[var(--text-muted)] bg-[var(--color-paper-200)] px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer CTA Line */}
        <div className={cn('border-t border-[var(--border-subtle)] flex items-center justify-between', isCompact ? 'pt-2.5 mt-2.5' : 'pt-4 mt-4')}>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">Stay & Food Incl.</span>
          <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[var(--color-terracotta-500)] transition-colors">
            <span>Explore</span>
            <ArrowRight className="w-3 h-3 text-[var(--color-terracotta-500)] transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      <Link href={href} className="absolute inset-0 z-20">
        <span className="sr-only">View {title}</span>
      </Link>
    </Card>
  );
}

/* ==========================================================================
   DESTINATION CARD
   ========================================================================== */
export interface DestinationCardProps {
  name: string;
  state: string;
  distanceKm: number;
  travelTime: string;
  imageUrl: string;
  href: string;
  shortDescription: string;
  className?: string;
}

export function DestinationCard({
  name,
  state,
  distanceKm,
  travelTime,
  imageUrl,
  href,
  shortDescription,
  className,
}: DestinationCardProps) {
  return (
    <Card className={cn('group flex flex-col h-full', className)}>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-ink-900)]">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-950)]/80 via-[var(--color-ink-950)]/20 to-transparent" />
        
        <div className="absolute bottom-3 left-4 right-4">
          <span className="type-eyebrow text-[var(--color-terracotta-300)]">
            {state}
          </span>
          <h3 className="type-display-m text-[#FFFFFF] mt-0.5">
            {name}
          </h3>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <p className="type-body-small text-[var(--text-secondary)] line-clamp-2 mb-4">
          {shortDescription}
        </p>

        <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
          <span>{distanceKm} KM from Madurai</span>
          <span>~{travelTime}</span>
        </div>
      </div>

      <Link href={href} className="absolute inset-0 z-20">
        <span className="sr-only">Explore {name}</span>
      </Link>
    </Card>
  );
}
