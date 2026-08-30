/**
 * MAHALAKSHMI TOUR & TRAVEL — ERROR STATE PRIMITIVE
 */

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Journey Information Unavailable',
  message = 'We encountered an issue loading this travel information. Please try refreshing or contact our travel desk.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-[4px] p-8 border border-[var(--border-default)] bg-[var(--color-paper-100)] text-center max-w-md mx-auto my-12">
      <div className="inline-flex p-3 rounded-full bg-[var(--color-terracotta-100)] text-[var(--color-terracotta-700)] mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="type-h3 text-[var(--text-primary)] mb-2">
        {title}
      </h3>
      <p className="type-body-small text-[var(--text-secondary)] mb-6">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          icon={<RefreshCw className="w-3.5 h-3.5" />}
          iconPosition="left"
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
