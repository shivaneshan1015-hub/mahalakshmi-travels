/**
 * MAHALAKSHMI TOUR & TRAVEL — WHATSAPP CONVERSION ENGINE
 * Generates pre-filled, context-aware WhatsApp chat links
 */

import { siteConfig } from '@/config/site';
import { StructuredEnquiry } from '@/types/enquiry';

export function buildWhatsAppUrl(payload: Partial<StructuredEnquiry>): string {
  const phone = siteConfig.contact.whatsapp;
  let message = `Hello Mahalakshmi Tours and Travels,\n\n`;

  if (payload.sourceContext?.tourTitle) {
    message += `I would like to enquire about the journey: *${payload.sourceContext.tourTitle}*.\n`;
  } else if (payload.intent === 'college') {
    message += `I would like to enquire about *College / Student Industrial Visit (IV) Travel*.\n`;
  } else if (payload.intent === 'family') {
    message += `I would like to plan a *Family Holiday Trip* from Madurai.\n`;
  } else if (payload.intent === 'group') {
    message += `I would like to enquire about *21-Seater Group Travel*.\n`;
  } else if (payload.intent === 'function') {
    message += `I would like to enquire about *Wedding & Function Guest Transport*.\n`;
  } else if (payload.intent === 'vehicle') {
    message += `I would like to enquire about vehicle hire: *${payload.vehicleRequirement || 'Fleet'}*.\n`;
  } else if (payload.intent === 'custom') {
    message += `I would like to plan a *Customised South India Journey* from Madurai.\n`;
  } else {
    message += `I would like to enquire about your travel services.\n`;
  }

  // Origin & Destinations
  const origin = payload.origin || 'Madurai';
  const destList = payload.destinations && payload.destinations.length > 0 
    ? payload.destinations.join(' → ')
    : payload.customDestination;

  if (destList) {
    message += `• Route: ${origin} → ${destList}\n`;
  } else {
    message += `• Starting From: ${origin}\n`;
  }

  // Travellers & Group
  if (payload.travellerCount) {
    message += `• Travellers: ${payload.travellerCount} ${payload.groupType ? `(${payload.groupType})` : ''}\n`;
  }

  // Dates & Duration
  if (payload.travelDate) {
    message += `• Travel Date: ${payload.travelDate}\n`;
  }
  if (payload.duration) {
    message += `• Duration: ${payload.duration}\n`;
  }

  // Vehicle
  if (payload.vehicleRequirement && payload.vehicleRequirement !== 'undecided') {
    message += `• Vehicle Preference: ${payload.vehicleRequirement.replace('-', ' ').toUpperCase()}\n`;
  }

  // Notes
  if (payload.notes) {
    message += `• Note: ${payload.notes}\n`;
  }

  if (payload.name) {
    message += `\nFrom: ${payload.name}`;
  }

  message += `\n\nPlease let me know availability and travel arrangement details.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

/**
 * Contextual tour WhatsApp link
 */
export function getTourWhatsAppLink(tour: {
  title: string;
  slug: string;
  destination: string;
  durationText: string;
}): string {
  return buildWhatsAppUrl({
    intent: 'tour',
    destinations: [tour.destination],
    duration: tour.durationText,
    sourceContext: {
      tourTitle: tour.title,
      tourSlug: tour.slug,
    },
  });
}

/**
 * Quick general inquiry WhatsApp link
 */
export function getQuickWhatsAppLink(contextSubject?: string): string {
  const phone = siteConfig.contact.whatsapp;
  let text = `Hello Mahalakshmi Tours and Travels, I would like to enquire about your travel services from Madurai.`;
  if (contextSubject) {
    text = `Hello Mahalakshmi Tours and Travels, I would like to enquire about: *${contextSubject}*.`;
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
