/**
 * MAHALAKSHMI TOUR & TRAVEL — AD CONVERSION TRACKING ENGINE
 * Meta Conversions API (CAPI) & Google Ads Offline Conversion Integration
 * Strictly enforces Verified Commercial Value Contract (M11 Specification)
 */

import { CrmEnquiry, VerifiedCommercialValue, VerifiedCommercialSource } from '@/types/crm';
import { siteConfig } from '@/config/site';

/**
 * Validates if a commercial value object satisfies the verified commercial value contract.
 */
export function isVerifiedCommercialValue(
  val?: VerifiedCommercialValue | null,
  expectedSource?: VerifiedCommercialSource
): boolean {
  if (!val) return false;
  if (typeof val.amount !== 'number' || isNaN(val.amount) || val.amount <= 0) return false;
  if (val.currency !== 'INR') return false;
  if (!val.verifiedAt || isNaN(new Date(val.verifiedAt).getTime())) return false;
  if (expectedSource && val.source !== expectedSource) return false;
  return true;
}

export interface MetaConversionPayload {
  eventName: 'Lead' | 'Quote' | 'Purchase' | 'Contact' | 'Completed';
  eventSourceUrl?: string;
  leadData: CrmEnquiry;
  verifiedValue?: VerifiedCommercialValue;
}

/**
 * Derives verified monetary conversion amount strictly adhering to event rules.
 * NEVER uses indirect fallbacks, estimatedValue, or unverified quotedAmount.
 */
export function getMetaVerifiedAmount(payload: MetaConversionPayload): number | undefined {
  const targetVal = payload.verifiedValue || payload.leadData.verifiedCommercialValue;

  if (payload.eventName === 'Lead') {
    // Fresh website Lead events have NO monetary value by default.
    // Accepts value ONLY if explicitly passed as a verified commercial value object.
    return isVerifiedCommercialValue(targetVal) ? targetVal?.amount : undefined;
  }

  if (payload.eventName === 'Quote') {
    return isVerifiedCommercialValue(targetVal, 'VERIFIED_QUOTE') ? targetVal?.amount : undefined;
  }

  if (payload.eventName === 'Purchase') {
    return isVerifiedCommercialValue(targetVal, 'VERIFIED_BOOKING') ? targetVal?.amount : undefined;
  }

  if (payload.eventName === 'Completed') {
    return isVerifiedCommercialValue(targetVal, 'VERIFIED_COMPLETION') ? targetVal?.amount : undefined;
  }

  return undefined;
}

/**
 * Send server-side event to Meta Conversions API (CAPI)
 */
export async function sendMetaConversionEvent(payload: MetaConversionPayload) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  const verifiedAmount = getMetaVerifiedAmount(payload);

  if (!pixelId || !accessToken) {
    // In development or when tokens are unconfigured, log simulation
    return {
      success: true,
      simulated: true,
      event: payload.eventName,
      verifiedAmount,
    };
  }

  try {
    const cleanPhone = payload.leadData.phone?.replace(/[^0-9]/g, '');

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [
            {
              event_name: payload.eventName,
              event_time: Math.floor(Date.now() / 1000),
              event_source_url: payload.eventSourceUrl || payload.leadData.attribution?.landingPage || siteConfig.url,
              action_source: 'website',
              user_data: {
                ph: cleanPhone ? [cleanPhone] : undefined,
                em: payload.leadData.email ? [payload.leadData.email.toLowerCase().trim()] : undefined,
                fbc: payload.leadData.attribution?.fbclid,
              },
              custom_data: {
                ...(verifiedAmount !== undefined ? { currency: 'INR', value: verifiedAmount } : {}),
                content_name: payload.leadData.destinations?.join(' - ') || 'Custom Tour',
                content_category: payload.leadData.intent || 'custom',
              },
            },
          ],
        }),
      }
    );

    const result = await response.json();
    return { success: response.ok, result, verifiedAmount };
  } catch (err) {
    console.error('Error sending Meta CAPI event:', err);
    return { success: false, error: err };
  }
}

/**
 * Formats a Google Ads Offline Conversion payload for Google Ads Upload API
 */
export function buildGoogleOfflineConversion(
  lead: CrmEnquiry,
  expectedSource: VerifiedCommercialSource = 'VERIFIED_BOOKING'
) {
  const isVerified = isVerifiedCommercialValue(lead.verifiedCommercialValue, expectedSource);
  const verifiedAmount = isVerified ? lead.verifiedCommercialValue?.amount : undefined;

  return {
    gclid: lead.attribution?.gclid,
    conversionAction: 'customers/1234567890/conversionActions/confirmed_tour_booking',
    conversionDateTime: new Date().toISOString().replace('T', ' ').substring(0, 19) + '+05:30',
    ...(verifiedAmount !== undefined ? { conversionValue: verifiedAmount, currencyCode: 'INR' } : {}),
    orderId: lead.referenceCode,
  };
}
