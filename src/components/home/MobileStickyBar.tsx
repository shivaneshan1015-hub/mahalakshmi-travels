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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] bg-[#0F172A]/95 backdrop-blur-lg border-t border-[#334155] px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] shadow-2xl">
      <div className="flex items-center justify-evenly gap-3 max-w-md mx-auto">
        {/* WhatsApp Action */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[48px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-[6px] bg-gradient-to-r from-[#10B981] to-[#059669] text-[#FFFFFF] shadow-md active:scale-95 transition-transform"
          aria-label="WhatsApp Travel Desk"
          title="WhatsApp Travel Desk"
        >
          <MessageSquare className="w-5 h-5 shrink-0" />
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* Call Action */}
        <a
          href={phoneUrl}
          className="flex-1 min-h-[48px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-[6px] bg-[#1E293B] border border-[#334155] text-[#FFFFFF] hover:bg-[#334155] active:scale-95 transition-all shadow-sm"
          aria-label="Call Madurai Desk"
          title="Call Madurai Desk"
        >
          <Phone className="w-5 h-5 shrink-0 text-[#F59E0B]" />
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Call Desk</span>
        </a>

        {/* Plan Custom Journey */}
        <Link
          href="/plan-your-journey"
          className="flex-1 min-h-[48px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-[6px] bg-gradient-to-r from-[#EA580C] to-[#C85227] text-[#FFFFFF] shadow-md active:scale-95 transition-transform"
          aria-label="Plan Custom Trip"
          title="Plan Custom Trip"
        >
          <Compass className="w-5 h-5 shrink-0" />
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Plan Trip</span>
        </Link>
      </div>
    </div>
  );
}
