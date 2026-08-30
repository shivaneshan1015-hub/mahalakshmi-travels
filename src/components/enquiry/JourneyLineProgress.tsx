/**
 * MAHALAKSHMI TOUR & TRAVEL — JOURNEY LINE PROGRESS INDICATOR
 * Signature brand micro-interaction completing the South India route line step-by-step.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface JourneyLineProgressProps {
  currentStep: number; // 1 to 6
  totalSteps?: number;
  onStepClick?: (step: number) => void;
}

export function JourneyLineProgress({
  currentStep,
  totalSteps = 6,
  onStepClick,
}: JourneyLineProgressProps) {
  const steps = [
    { num: 1, label: 'INTENT', title: 'Intent' },
    { num: 2, label: 'ROUTE', title: 'Route' },
    { num: 3, label: 'PEOPLE', title: 'People' },
    { num: 4, label: 'DATES', title: 'Dates' },
    { num: 5, label: 'VEHICLE', title: 'Vehicle' },
    { num: 6, label: 'REVIEW', title: 'Contact' },
  ];

  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full mb-8 select-none" aria-label="Journey planning progress">
      {/* Visual Route Track */}
      <div className="relative flex items-center justify-between">
        {/* Background Track Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full bg-[var(--border-default)] z-0" />

        {/* Active Route Progress Line */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[var(--color-terracotta-500)] transition-all duration-300 ease-out z-0"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Step Milestone Nodes */}
        {steps.map((step) => {
          const isCompleted = step.num < currentStep;
          const isCurrent = step.num === currentStep;
          const isAccessible = step.num <= currentStep;

          return (
            <button
              key={step.num}
              type="button"
              disabled={!isAccessible}
              onClick={() => isAccessible && onStepClick?.(step.num)}
              className={cn(
                'relative z-10 flex flex-col items-center group focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)] rounded-full',
                !isAccessible && 'cursor-default'
              )}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {/* Node Circle */}
              <div
                className={cn(
                  'w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-200 border',
                  isCompleted
                    ? 'bg-[var(--color-terracotta-500)] border-[var(--color-terracotta-500)] text-white'
                    : isCurrent
                    ? 'bg-[var(--color-ink-950)] border-[var(--color-ink-950)] text-[var(--color-paper-100)] ring-4 ring-[var(--color-paper-200)]'
                    : 'bg-[#FFFFFF] border-[var(--border-default)] text-[var(--text-muted)]'
                )}
              >
                {isCompleted ? '✓' : step.num}
              </div>

              {/* Step Label */}
              <span
                className={cn(
                  'absolute -bottom-5 text-[9px] sm:text-[10px] font-mono tracking-wider uppercase transition-colors whitespace-nowrap',
                  isCurrent
                    ? 'text-[var(--color-ink-950)] font-bold'
                    : isCompleted
                    ? 'text-[var(--color-terracotta-600)] font-medium'
                    : 'text-[var(--text-muted)]'
                )}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Step Subtitle Context */}
      <div className="mt-8 flex justify-between items-center text-xs font-mono text-[var(--text-muted)] pt-1 border-t border-[var(--border-subtle)]">
        <span>ORIGIN: MADURAI</span>
        <span className="text-[var(--color-terracotta-500)] font-semibold">
          STEP 0{currentStep} OF 0{totalSteps}
        </span>
        <span>STATUS: IN PROGRESS</span>
      </div>
    </div>
  );
}
