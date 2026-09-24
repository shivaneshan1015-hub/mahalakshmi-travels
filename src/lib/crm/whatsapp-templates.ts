/**
 * MAHALAKSHMI TOUR & TRAVEL — WHATSAPP MESSAGE TEMPLATES & GENERATOR
 * Generates personalized message strings and WhatsApp Web / App URLs.
 */

import { CrmEnquiry } from '@/types/crm';
import { siteConfig } from '@/config/site';

export interface WhatsAppTemplateOptions {
  type: 'welcome' | 'quote' | 'brochure' | 'followup' | 'confirmation';
  customQuoteAmount?: number;
  customNotes?: string;
}

export function generateWhatsAppMessage(enquiry: CrmEnquiry, options: WhatsAppTemplateOptions): string {
  const customerName = enquiry.name || 'Traveler';
  const destinations = enquiry.destinations.length > 0 ? enquiry.destinations.join(' - ') : 'South India Tour';
  const travelDate = enquiry.travelDate || 'Upcoming dates';
  const pax = enquiry.travellerCount || 1;
  const refCode = enquiry.referenceCode;

  switch (options.type) {
    case 'welcome':
      return `Vanakkam ${customerName}! 🙏\n\nThank you for reaching out to *${siteConfig.name}, Madurai*.\n\nWe have received your enquiry for:\n📍 *Route:* ${enquiry.origin} → ${destinations}\n📅 *Travel Date:* ${travelDate}\n👥 *Travellers:* ${pax} Persons\n🔖 *Ref Code:* ${refCode}\n\nOur Madurai travel desk is preparing your customized itinerary. You can also view our fleet and travel packages here:\n🌐 ${siteConfig.url}/tours\n\nHow can we help you further?`;

    case 'brochure':
      return `Vanakkam ${customerName}! 🙏\n\nHere are the details and company profile for *${siteConfig.name}*:\n\n✨ *Specialties:*\n• Curated Kerala & Tamil Nadu Holiday Tours\n• 21-Seater Luxury Coaches & Executive Vans\n• Hill Station Specialists (Munnar, Kodaikanal, Ooty, Coorg)\n• Madurai Desk Support & Local Drivers\n\n📄 *Download Tariff & Tour Brochure:* ${siteConfig.url}/docs/mahalakshmi-travels-brochure.pdf\n\nWould you like us to customize a day-wise itinerary for ${destinations}?`;

    case 'quote':
      const amount = options.customQuoteAmount || enquiry.quotedAmount || enquiry.estimatedValue || 0;
      return `Vanakkam ${customerName}!\n\nHere is the special tour quote for your upcoming journey with *${siteConfig.name}*:\n\n📍 *Tour:* ${enquiry.origin} → ${destinations}\n📅 *Dates:* ${travelDate} (${enquiry.duration || 'Custom'})\n👥 *Group:* ${pax} Pax (${enquiry.groupType || 'Family'})\n🚐 *Vehicle:* ${enquiry.assignedVehicle || enquiry.vehicleRequirement || 'Executive Tourist Coach'}\n💰 *Total Package Quote:* ₹${amount.toLocaleString('en-IN')}\n\n*Inclusions:* AC Vehicle, Dedicated Driver, Fuel, Tolls, State Border Permits & Parking.\n\nPlease let us know if you'd like to confirm this booking or adjust the itinerary!`;

    case 'followup':
      return `Hello ${customerName}! 👋\n\nFollowing up regarding your planned journey to *${destinations}* starting on *${travelDate}* (Ref: ${refCode}).\n\nOur tourist vehicles for this weekend are filling up quickly. Would you like us to hold the vehicle for your dates? Feel free to call us directly at ${siteConfig.contact.phonePrimary}.\n\nWarm regards,\n*Mahalakshmi Tour & Travel Desk*`;

    case 'confirmation':
      return `🎉 *BOOKING CONFIRMED — ${siteConfig.name}*\n\nDear ${customerName},\nYour tour booking has been confirmed!\n\n🔖 *Ref ID:* ${refCode}\n📍 *Route:* ${enquiry.origin} → ${destinations}\n📅 *Travel Date:* ${travelDate}\n🚐 *Vehicle:* ${enquiry.assignedVehicle || 'Executive AC Coach'}\n💵 *Advance Paid:* ₹${(enquiry.advanceReceived || 0).toLocaleString('en-IN')}\n💰 *Balance on Boarding:* ₹${(enquiry.balanceAmount || 0).toLocaleString('en-IN')}\n\nDriver details and contact info will be dispatched 12 hours prior to departure.\n\nHave a safe and joyous journey! 🌺`;

    default:
      return `Hello ${customerName}, greeting from ${siteConfig.name}!`;
  }
}

/**
 * Creates a direct WhatsApp Web / App clickable link with encoded message
 */
export function getDirectWhatsAppUrl(phone: string, message: string): string {
  // Format phone number to international standard (remove spaces, symbols)
  let cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.length === 10) {
    cleanPhone = `91${cleanPhone}`; // Add India country code if 10 digits
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
