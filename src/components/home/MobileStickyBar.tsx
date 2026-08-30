/**
 * MAHALAKSHMI TOUR & TRAVEL — MOBILE STICKY ACTION BAR
 * High-intent mobile conversion bar providing immediate WhatsApp & Phone dialer actions.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Phone, Compass } from 'lucide-react';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';
import { getPrimaryPhoneTelUrl } from '@/lib/conversion/phone';

export function MobileStickyBar() {
  const pathname = usePathname();
  const whatsappUrl = getQuickWhatsAppLink('Mobile Sticky Action');
  const phoneUrl = getPrimaryPhoneTelUrl();

  // Do not render mobile bar on admin CRM pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] bg-[var(--color-paper-100)]/95 backdrop-blur-md border-t border-[var(--border-default)] px-4 py-2.5 shadow-editorial-lift">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* WhatsApp Action */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-[3px] bg-[var(--color-terracotta-500)] text-[#FFFFFF] text-xs font-semibold uppercase tracking-wider shadow-editorial-sm active:scale-95 transition-transform"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        {/* Call Action */}
        <a
          href={phoneUrl}
          className="flex items-center justify-center p-2 rounded-[3px] bg-[#FFFFFF] border border-[var(--border-default)] text-[var(--color-ink-950)] active:bg-[var(--color-paper-200)] transition-colors"
          title="Call Madurai Desk"
        >
          <Phone className="w-4 h-4" />
        </a>

        {/* Plan Custom Journey */}
        <Link
          href="/customised-tours"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-[3px] bg-[var(--color-ink-950)] text-[var(--color-paper-100)] text-xs font-semibold uppercase tracking-wider active:scale-95 transition-transform"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Plan Trip</span>
        </Link>
      </div>
    </div>
  );
}
