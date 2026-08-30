/**
 * MAHALAKSHMI TOUR & TRAVEL — SERVICE DETAIL HERO
 * Editorial hero for individual service and use-case pages.
 */

import React from 'react';
import Image from 'next/image';
import { MessageSquare, Phone, Users, Shield } from 'lucide-react';
import { TravelService } from '@/types/service';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';
import { getPrimaryPhoneTelUrl } from '@/lib/conversion/phone';

interface ServiceDetailHeroProps {
  service: TravelService;
}

export function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  const whatsappUrl = getQuickWhatsAppLink(`Travel Service Inquiry: ${service.title}`);
  const phoneUrl = getPrimaryPhoneTelUrl();

  return (
    <section className="border-b border-[var(--border-default)] pb-12 mb-12">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge variant="terracotta">
          {service.serviceType.replace('-', ' ').toUpperCase()}
        </Badge>
        <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider">
          MADURAI DEPOT • IN-HOUSE FLEET
        </span>
      </div>

      <div className="max-w-3xl mb-8">
        <h1 className="type-display-l text-[var(--text-primary)] mb-4">
          {service.title}
        </h1>
        <p className="type-body-large text-[var(--text-secondary)] leading-relaxed">
          {service.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 relative aspect-[16/10] rounded-[4px] overflow-hidden bg-[var(--color-ink-900)] border border-[var(--border-default)] shadow-editorial-md">
          <Image
            src={service.heroImage.url}
            alt={service.heroImage.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-5 bg-[var(--color-paper-100)] p-6 md:p-8 rounded-[4px] border border-[var(--border-default)] flex flex-col justify-between h-full">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-terracotta-500)] font-semibold block mb-4">
              SERVICE SPECIFICATIONS
            </span>

            <div className="space-y-3 mb-6 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Origin:</span>
                <strong className="text-[var(--color-ink-950)]">Madurai, Tamil Nadu</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Coverage:</span>
                <span className="font-semibold text-[var(--color-ink-950)]">Tamil Nadu, Kerala, Karnataka, AP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Fleet Match:</span>
                <span className="font-semibold text-[var(--color-terracotta-600)]">
                  {service.vehicleOptions.map((v) => v.replace('-', ' ')).join(' • ')}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-ink-900)] font-semibold block">
                Key Benefits:
              </span>
              <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                {service.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[var(--color-terracotta-500)] font-bold">✓</span>
                    <span>{b.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={<MessageSquare className="w-4 h-4" />}
                iconPosition="left"
              >
                Plan {service.title}
              </Button>
            </a>
            <a href={phoneUrl} className="block">
              <Button
                variant="secondary"
                size="md"
                fullWidth
                icon={<Phone className="w-4 h-4" />}
                iconPosition="left"
              >
                Call Madurai Desk
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
