/**
 * MAHALAKSHMI TOUR & TRAVEL — CUSTOMISED TOURS COMPATIBILITY ROUTE
 * Redirects to the single canonical journey planning experience: /plan-your-journey
 */

import { redirect } from 'next/navigation';

export default function CustomisedToursRedirectPage() {
  redirect('/plan-your-journey');
}
