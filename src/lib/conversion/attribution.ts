/**
 * MAHALAKSHMI TOUR & TRAVEL — AD ATTRIBUTION & MARKETING CONTEXT ENGINE
 * Captures and persists Google Ads (gclid), Meta Ads (fbclid), and UTM parameters across browsing sessions.
 */

export interface StoredAttributionData {
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string; // Google Click ID
  fbclid?: string; // Meta / Instagram Click ID
  landingPage?: string;
  referrer?: string;
  timestamp?: number;
}

const ATTRIBUTION_STORAGE_KEY = 'mahalakshmi_ad_attribution';

/**
 * Record attribution parameters from current URL search params and referrer
 */
export function recordLandingAttribution(): StoredAttributionData | null {
  if (typeof window === 'undefined') return null;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const existing = getStoredAttribution();

    const utm_source = urlParams.get('utm_source') || undefined;
    const utm_medium = urlParams.get('utm_medium') || undefined;
    const utm_campaign = urlParams.get('utm_campaign') || undefined;
    const utm_term = urlParams.get('utm_term') || undefined;
    const utm_content = urlParams.get('utm_content') || undefined;
    const gclid = urlParams.get('gclid') || undefined;
    const fbclid = urlParams.get('fbclid') || undefined;

    // Detect high-intent ad sources
    let source: string | undefined = undefined;
    if (gclid || utm_source?.toLowerCase() === 'google') {
      source = 'google_ads';
    } else if (fbclid || utm_source?.toLowerCase() === 'meta' || utm_source?.toLowerCase() === 'instagram' || utm_source?.toLowerCase() === 'facebook') {
      source = 'meta_ads';
    } else if (utm_source) {
      source = utm_source;
    }

    // Only update if new ad params are found, or keep existing session attribution
    if (utm_source || utm_campaign || gclid || fbclid || !existing) {
      const attribution: StoredAttributionData = {
        source: source || existing?.source || (document.referrer ? 'referral' : 'website_direct'),
        utm_source: utm_source || existing?.utm_source,
        utm_medium: utm_medium || existing?.utm_medium,
        utm_campaign: utm_campaign || existing?.utm_campaign,
        utm_term: utm_term || existing?.utm_term,
        utm_content: utm_content || existing?.utm_content,
        gclid: gclid || existing?.gclid,
        fbclid: fbclid || existing?.fbclid,
        landingPage: existing?.landingPage || window.location.pathname,
        referrer: existing?.referrer || document.referrer || undefined,
        timestamp: Date.now(),
      };

      sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));
      return attribution;
    }

    return existing;
  } catch (err) {
    console.warn('Error recording ad attribution:', err);
    return null;
  }
}

/**
 * Retrieve the current stored attribution for enquiry forms
 */
export function getStoredAttribution(): StoredAttributionData | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
