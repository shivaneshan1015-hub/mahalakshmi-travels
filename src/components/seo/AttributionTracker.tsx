'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { recordLandingAttribution } from '@/lib/conversion/attribution';

function TrackerContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    // Record attribution parameters (UTM, gclid, fbclid) on landing or URL changes
    recordLandingAttribution();
  }, [searchParams, pathname]);

  return null;
}

export function AttributionTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerContent />
    </Suspense>
  );
}
