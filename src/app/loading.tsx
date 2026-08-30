/**
 * MAHALAKSHMI TOUR & TRAVEL — GLOBAL LOADING STATE
 */

import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="container-editorial py-20 space-y-8">
      <div className="max-w-md space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <Skeleton className="h-72 w-full rounded-[4px]" />
        <Skeleton className="h-72 w-full rounded-[4px]" />
        <Skeleton className="h-72 w-full rounded-[4px]" />
      </div>
    </div>
  );
}
