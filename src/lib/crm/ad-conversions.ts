/**
 * MAHALAKSHMI TOUR & TRAVEL — AD CONVERSION TRACKING ENGINE
 * Meta Conversions API (CAPI) & Google Ads Offline Conversion Integration
 */

import { CrmEnquiry } from '@/types/crm';

export interface MetaConversionPayload {
  eventName: 'Lead' | 'Purchase' | 'Contact';
  eventSourceUrl?: string;
  leadData: CrmEnquiry;
  value?: number;
}

/**
 * Send server-side event to Meta Conversions API (CAPI)
 */
export async function sendMetaConversionEvent(payload: MetaConversionPayload) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    // In development or when tokens are unconfigured, log simulation
    return {
      success: true,
      simulated: true,
      event: payload.eventName,
      message: 'Meta CAPI tokens unconfigured. Conversion simulated.',
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
              event_source_url: payload.eventSourceUrl || payload.leadData.attribution?.landingPage || 'https://mahalakshmitravels.com',
              action_source: 'website',
              user_data: {
                ph: cleanPhone ? [cleanPhone] : undefined,
                em: payload.leadData.email ? [payload.leadData.email.toLowerCase().trim()] : undefined,
                fbc: payload.leadData.attribution?.fbclid,
              },
              custom_data: {
                currency: 'INR',
                value: payload.value || payload.leadData.quotedAmount || payload.leadData.estimatedValue || 25000,
                content_name: payload.leadData.destinations.join(' - '),
                content_category: payload.leadData.intent,
              },
            },
          ],
        }),
      }
    );

    const result = await response.json();
    return { success: response.ok, result };
  } catch (err) {
    console.error('Error sending Meta CAPI event:', err);
    return { success: false, error: err };
  }
}

/**
 * Formats a Google Ads Offline Conversion payload for Google Ads Upload API
 */
export function buildGoogleOfflineConversion(lead: CrmEnquiry) {
  return {
    gclid: lead.attribution?.gclid,
    conversionAction: 'customers/1234567890/conversionActions/confirmed_tour_booking',
    conversionDateTime: new Date().toISOString().replace('T', ' ').substring(0, 19) + '+05:30',
    conversionValue: lead.quotedAmount || lead.estimatedValue || 35000,
    currencyCode: 'INR',
    orderId: lead.referenceCode,
  };
}
