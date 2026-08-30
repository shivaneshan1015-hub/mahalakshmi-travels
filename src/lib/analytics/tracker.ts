/**
 * MAHALAKSHMI TOUR & TRAVEL — ANALYTICS TRACKING LAYER
 * Decoupled event dispatcher abstraction
 */

import { AnalyticsEventPayload } from '@/types/analytics';

export function trackEvent(payload: AnalyticsEventPayload): void {
  const timestamp = Date.now();
  const enhancedPayload = {
    ...payload,
    params: {
      ...payload.params,
      timestamp,
      path: typeof window !== 'undefined' ? window.location.pathname : undefined,
    },
  };

  // Safe development logging
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.info(`[Analytics Event: ${payload.event}]`, enhancedPayload);
  }

  // Future Google Analytics (gtag) integration boundary
  if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as unknown as { gtag: Function }).gtag === 'function') {
    (window as unknown as { gtag: Function }).gtag('event', payload.event, payload.params);
  }
}
