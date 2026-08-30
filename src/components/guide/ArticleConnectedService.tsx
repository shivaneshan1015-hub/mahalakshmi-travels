/**
 * MAHALAKSHMI TOUR & TRAVEL — ARTICLE CONNECTED SERVICE
 * Contextual vehicle & travel service card connecting guide readers to fleet options.
 */

import React from 'react';
import Link from 'next/link';
import { TravelService } from '@/types/service';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Users, Car, ArrowRight } from 'lucide-react';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';

interface ArticleConnectedServiceProps {
  service?: TravelService;
}

export function ArticleConnectedService({ service }: ArticleConnectedServiceProps) {
  if (!service) return null;

  const whatsappUrl = getQuickWhatsAppLink(`Inquiry from Guide: ${service.title}`);

  return (
    <section className="my-10 p-6 md:p-8 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)] shadow-editorial-xs">
      <div className="flex items-center gap-2 mb-2">
        <Car className="w-4 h-4 text-[var(--color-terracotta-500)]" />
        <span className="type-eyebrow text-[var(--color-terracotta-500)]">
          NEED DEDICATED VEHICLES & DRIVER?
        </span>
      </div>

      <h3 className="type-h3 text-[var(--color-ink-950)] mb-2">
        {service.title}
      </h3>

      <p className="type-body-small text-[var(--text-secondary)] mb-6 leading-relaxed">
        {service.shortDescription}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
        <Link href={`/travel-services/${service.slug}`} className="text-xs font-mono text-[var(--color-terracotta-600)] font-bold hover:underline">
          Explore Service Details →
        </Link>

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" size="sm" withArrow>
            Ask About Availability
          </Button>
        </a>
      </div>
    </section>
  );
}
