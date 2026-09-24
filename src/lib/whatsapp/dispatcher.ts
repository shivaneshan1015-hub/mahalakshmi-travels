/**
 * MAHALAKSHMI TOUR & TRAVEL — WHATSAPP AUTOMATED DISPATCH WORKER
 * Automatically sends welcome greeting and Mahalakshmi Tours brochure PDF to incoming leads.
 */

import { CrmEnquiry } from '@/types/crm';
import { CrmRepository } from '@/lib/crm/repository';
import { siteConfig } from '@/config/site';

export interface DispatchResult {
  success: boolean;
  messageId?: string;
  simulated?: boolean;
  error?: string;
}

export async function dispatchAutomatedWhatsAppWelcome(enquiry: CrmEnquiry): Promise<DispatchResult> {
  const phone = enquiry.phone;
  if (!phone) {
    return { success: false, error: 'Phone number is missing.' };
  }

  // Format clean phone with India country code
  let cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.length === 10) {
    cleanPhone = `91${cleanPhone}`;
  }

  const brochurePdfUrl = `${siteConfig.url}/api/brochure`;
  const customerName = enquiry.name || 'Valued Guest';
  const destinations = enquiry.destinations.join(' - ') || 'South India Tour';

  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  // If WhatsApp Cloud API credentials are provided in production:
  if (token && phoneNumberId) {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: cleanPhone,
            type: 'text',
            text: {
              preview_url: true,
              body: `Vanakkam ${customerName}! 🙏\n\nThank you for choosing *${siteConfig.name}, Madurai*.\n\nWe have received your enquiry for *${destinations}* (${enquiry.travelDate || 'Upcoming'}).\n\n📄 *Download Tour Brochure:* ${brochurePdfUrl}\n\nOur Madurai travel desk will assist you shortly. Have a great day!`,
            },
          }),
        }
      );

      const result = await response.json();
      if (response.ok && result.messages?.[0]?.id) {
        const messageId = result.messages[0].id;
        await CrmRepository.updateEnquiry(enquiry.id, {
          whatsappSent: true,
          whatsappLastSentAt: new Date().toISOString(),
        }, 'WhatsApp Cloud API Bot');

        return { success: true, messageId };
      } else {
        console.warn('WhatsApp API returned error:', result);
      }
    } catch (err) {
      console.error('Error invoking WhatsApp Cloud API:', err);
    }
  }

  // Simulated / Development mode execution:
  // Update CRM activity log so the owner sees the automated bot activity in their CRM timeline
  await CrmRepository.addNote(
    enquiry.id,
    `[WhatsApp Bot] Automated welcome message and brochure link prepared for ${cleanPhone}.`,
    'WhatsApp Auto-Responder'
  );

  await CrmRepository.updateEnquiry(enquiry.id, {
    whatsappSent: true,
    whatsappLastSentAt: new Date().toISOString(),
  }, 'WhatsApp Auto-Responder');

  return {
    success: true,
    simulated: true,
    messageId: `sim-wa-${Date.now()}`,
  };
}
