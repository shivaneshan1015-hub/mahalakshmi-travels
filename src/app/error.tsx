/**
 * MAHALAKSHMI TOUR & TRAVEL — GLOBAL ERROR BOUNDARY
 */

'use client';

import React, { useEffect } from 'react';
import { ErrorState } from '@/components/ui/ErrorState';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('App Runtime Error:', error);
  }, [error]);

  return (
    <div className="container-editorial py-24">
      <ErrorState
        title="We Encountered a Journey Interruption"
        message="A temporary error occurred while rendering this section. Please try again or reach out to our Madurai support desk."
        onRetry={() => reset()}
      />
    </div>
  );
}
