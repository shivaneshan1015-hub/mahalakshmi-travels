/**
 * MAHALAKSHMI TOUR & TRAVEL — CONTACT ROUTE SHELL
 */

import { Metadata } from 'next';
import { Phone, MessageSquare, MapPin, Mail, Clock } from 'lucide-react';
import { constructMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/config/site';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { Button } from '@/components/ui/Button';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';
import { getPrimaryPhoneTelUrl } from '@/lib/conversion/phone';

export const metadata: Metadata = constructMetadata({
  title: 'Contact Mahalakshmi Tour & Travel | Madurai Office & Depot',
  description: 'Reach our Madurai travel desk for 21-seater van hire, family sedan bookings, and South India tour packages.',
  canonicalPath: '/contact',
});

export default function ContactPage() {
  const whatsappUrl = getQuickWhatsAppLink('Contact Page Direct Enquiry');
  const phoneUrl = getPrimaryPhoneTelUrl();

  return (
    <div className="container-editorial py-12 md:py-16">
      <BreadcrumbNav
        items={[
          { name: 'Home', itemUrl: '/', position: 1 },
          { name: 'Contact', itemUrl: '/contact', position: 2 },
        ]}
        className="mb-8"
      />

      <div className="max-w-2xl mb-12">
        <span className="type-eyebrow text-[var(--color-terracotta-500)]">
          LOCAL MADURAI TRAVEL DESK
        </span>
        <h1 className="type-display-l text-[var(--text-primary)] mt-1 mb-4">
          Contact & Enquiries
        </h1>
        <p className="type-body text-[var(--text-secondary)]">
          Our team in Madurai is ready to assist with group van reservations, customized family itineraries, and outstation travel plans.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Cards */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)]">
            <h3 className="type-h4 flex items-center gap-2 mb-3">
              <Phone className="w-4 h-4 text-[var(--color-terracotta-500)]" />
              Direct Phone Lines
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Call our travel coordinators directly for immediate booking confirmations.
            </p>
            <div className="space-y-1 font-mono text-sm font-semibold text-[var(--color-ink-950)]">
              <p>{siteConfig.contact.phonePrimary}</p>
              <p>{siteConfig.contact.phoneSecondary}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] flex gap-3">
              <a href={phoneUrl}>
                <Button variant="secondary" size="sm">
                  Call Primary
                </Button>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="sm" icon={<MessageSquare className="w-3.5 h-3.5" />} iconPosition="left">
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>

          <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)]">
            <h3 className="type-h4 flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-[var(--color-terracotta-500)]" />
              Office & Vehicle Depot
            </h3>
            <p className="text-sm text-[var(--color-ink-950)] font-medium">
              {siteConfig.name}
            </p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {siteConfig.contact.address.street}, {siteConfig.contact.address.city}, {siteConfig.contact.address.state} — {siteConfig.contact.address.pincode}
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mt-4">
              <Clock className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" />
              <span>Desk Hours: Monday – Sunday • 6:00 AM – 10:00 PM</span>
            </div>
          </div>
        </div>

        {/* Quick Email & Message block */}
        <div className="lg:col-span-6 p-8 bg-[var(--color-ink-950)] text-[var(--color-paper-100)] rounded-[4px] border border-[var(--color-ink-800)] flex flex-col justify-between">
          <div>
            <span className="type-eyebrow text-[var(--color-terracotta-300)] mb-2 block">
              FASTEST RESPONSE CHANNEL
            </span>
            <h3 className="type-h2 mb-4">
              Chat Directly on WhatsApp
            </h3>
            <p className="type-body-small text-[var(--color-ink-300)] mb-6 leading-relaxed">
              We respond promptly on WhatsApp with detailed vehicle availability, transparent kilometer tariffs, and recommended route timings for South India journeys.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--color-ink-400)] mb-8">
              <Mail className="w-3.5 h-3.5 text-[var(--color-terracotta-400)]" />
              <span>Email: {siteConfig.contact.email}</span>
            </div>
          </div>

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              icon={<MessageSquare className="w-4 h-4" />}
              iconPosition="left"
              withArrow
            >
              Start WhatsApp Conversation
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
