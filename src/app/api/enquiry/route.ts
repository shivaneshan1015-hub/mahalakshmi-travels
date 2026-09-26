/**
 * MAHALAKSHMI TOUR & TRAVEL — ENQUIRY SUBMISSION API ENDPOINT
 * POST /api/enquiry
 * Secure server-side validation, spam suppression, and structured payload processing.
 */

import { NextRequest, NextResponse } from 'next/server';
import { StructuredEnquiry } from '@/types/enquiry';
import { validateEnquiryPayload, sanitizeString } from '@/lib/conversion/validation';
import { generateEnquiryReference } from '@/lib/conversion/reference';
import { CrmRepository } from '@/lib/crm/repository';
import { dispatchAutomatedWhatsAppWelcome } from '@/lib/whatsapp/dispatcher';
import { sendMetaConversionEvent } from '@/lib/crm/ad-conversions';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    // Honeypot spam trap
    if (rawBody.honeypot && String(rawBody.honeypot).trim().length > 0) {
      return NextResponse.json(
        { success: false, error: 'Spam submission rejected' },
        { status: 400 }
      );
    }

    // Sanitize text inputs
    const sanitizedEnquiry: StructuredEnquiry = {
      intent: rawBody.intent || 'custom',
      origin: sanitizeString(rawBody.origin || 'Madurai'),
      destinations: Array.isArray(rawBody.destinations)
        ? rawBody.destinations.map((d: string) => sanitizeString(String(d)))
        : [],
      customDestination: rawBody.customDestination ? sanitizeString(rawBody.customDestination) : undefined,
      travelDate: rawBody.travelDate ? sanitizeString(rawBody.travelDate) : undefined,
      returnDate: rawBody.returnDate ? sanitizeString(rawBody.returnDate) : undefined,
      duration: rawBody.duration ? sanitizeString(rawBody.duration) : undefined,
      dateFlexibility: rawBody.dateFlexibility || 'flexible',
      travellerCount: Number(rawBody.travellerCount) || 1,
      groupType: rawBody.groupType || 'family',
      vehicleRequirement: rawBody.vehicleRequirement || 'help-me-choose',
      notes: rawBody.notes ? sanitizeString(rawBody.notes) : undefined,
      name: sanitizeString(rawBody.name || ''),
      phone: sanitizeString(rawBody.phone || ''),
      email: rawBody.email ? sanitizeString(rawBody.email) : undefined,
      contactPreference: rawBody.contactPreference || 'whatsapp',
      sourceContext: rawBody.sourceContext || {},
      createdAt: new Date().toISOString(),
    };

    // Server-side validation
    const validation = validateEnquiryPayload(sanitizedEnquiry);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 422 }
      );
    }

    // Generate unique reference code
    const referenceCode = generateEnquiryReference();
    sanitizedEnquiry.referenceCode = referenceCode;

    // Detect ad source
    let source: any = 'website';
    if (rawBody.gclid || rawBody.utm_source === 'google') {
      source = 'google_ads';
    } else if (rawBody.fbclid || rawBody.utm_source === 'meta' || rawBody.utm_source === 'instagram' || rawBody.utm_source === 'facebook') {
      source = 'meta_ads';
    }

    // Store in CRM Repository
    const createdLead = await CrmRepository.createEnquiry({
      ...sanitizedEnquiry,
      referenceCode,
      status: 'NEW_ENQUIRY',
      priority: 'WARM',
      attribution: {
        source,
        utm_source: rawBody.utm_source || 'website_direct',
        utm_medium: rawBody.utm_medium,
        utm_campaign: rawBody.utm_campaign,
        utm_term: rawBody.utm_term,
        utm_content: rawBody.utm_content,
        gclid: rawBody.gclid,
        fbclid: rawBody.fbclid,
        landingPage: sanitizedEnquiry.sourceContext?.sourcePage || rawBody.landingPage || '/',
      },
    });

    // Fire automated WhatsApp welcome message & brochure dispatch asynchronously
    dispatchAutomatedWhatsAppWelcome(createdLead).catch((err) =>
      console.warn('WhatsApp auto-dispatch notice:', err)
    );

    // Fire Meta Conversions API (CAPI) event asynchronously
    sendMetaConversionEvent({
      eventName: 'Lead',
      leadData: createdLead,
    }).catch((err) => console.warn('Meta CAPI notice:', err));

    // Return confirmed structured receipt
    return NextResponse.json(
      {
        success: true,
        reference: referenceCode,
        message: 'Your journey enquiry has been received by our Madurai desk.',
        enquiry: {
          referenceCode,
          name: sanitizedEnquiry.name,
          phone: sanitizedEnquiry.phone,
          destinations: sanitizedEnquiry.destinations,
          origin: sanitizedEnquiry.origin,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing enquiry submission:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing enquiry' },
      { status: 500 }
    );
  }
}
