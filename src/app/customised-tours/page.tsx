/**
 * MAHALAKSHMI TOUR & TRAVEL — CUSTOMISED TOURS COMPATIBILITY ROUTE
 * Redirects to the single canonical journey planning experience: /plan-your-journey
 */

import { permanentRedirect } from 'next/navigation';

export default function CustomisedToursRedirectPage() {
  permanentRedirect('/plan-your-journey');
}


