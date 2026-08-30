/**
 * MAHALAKSHMI TOUR & TRAVEL — ENQUIRY VALIDATION UTILITIES
 * Client and Server validation with sanitization and anti-spam protection
 */

import { StructuredEnquiry, EnquiryValidationResult } from '@/types/enquiry';

/**
 * Sanitizes input string to prevent unsafe script injection
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim();
}

/**
 * Validates lead generation payload
 */
export function validateEnquiryPayload(payload: Partial<StructuredEnquiry>): EnquiryValidationResult {
  const errors: Partial<Record<keyof StructuredEnquiry, string>> = {};

  // Honeypot anti-spam check
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    errors.honeypot = 'Automated submission detected.';
  }

  // Name validation
  if (!payload.name || payload.name.trim().length < 2) {
    errors.name = 'Please provide your name (at least 2 characters).';
  }

  // Phone validation (Accepts Indian 10-digit mobile or international with country code)
  const cleanPhone = (payload.phone || '').replace(/[\s\-\+]/g, '');
  if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 15) {
    errors.phone = 'Please enter a valid phone or WhatsApp number.';
  }

  // Email validation (optional)
  if (payload.email && payload.email.trim().length > 0) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
  }

  // Destination validation
  const hasDest = (payload.destinations && payload.destinations.length > 0) || 
                  (payload.customDestination && payload.customDestination.trim().length > 0);
  if (!hasDest && payload.intent !== 'general' && payload.intent !== 'vehicle') {
    errors.destinations = 'Please select or type at least one destination.';
  }

  // Traveller count validation
  if (payload.travellerCount !== undefined && payload.travellerCount < 1) {
    errors.travellerCount = 'Traveller count must be at least 1.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
