/**
 * MAHALAKSHMI TOUR & TRAVEL — SITE HEADER COMPONENT
 * Editorial navigation with mobile drawer and quick WhatsApp CTA.
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { LogoHorizontal } from '../brand/LogoHorizontal';
import { mainNavItems } from '@/config/navigation';
import { Button } from '../ui/Button';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';
import { getPrimaryPhoneTelUrl } from '@/lib/conversion/phone';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappUrl = getQuickWhatsAppLink();
  const phoneUrl = getPrimaryPhoneTelUrl();

  // Do not render public header on admin CRM pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-[var(--z-header)] bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[var(--border-default)] shadow-sm">
      <div className="container-editorial">
        <div className="flex items-center justify-between h-20 sm:h-22 md:h-24 gap-4">
          {/* Brand Logo */}
          <div className="shrink-0">
            <LogoHorizontal variant="light" size="md" showTagline />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0" aria-label="Main Navigation">
            {mainNavItems.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors relative py-1 text-[11px] xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
                    active
                      ? 'text-[var(--color-terracotta-500)] font-extrabold'
                      : 'text-[var(--color-ink-800)] hover:text-[var(--color-terracotta-500)]'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-terracotta-500)] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="emerald"
                size="sm"
                icon={<MessageSquare className="w-3.5 h-3.5" />}
                iconPosition="left"
              >
                WhatsApp Enquiry
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[var(--color-ink-950)] focus-visible:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center rounded-[6px] hover:bg-[#F1F5F9] shrink-0"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[var(--border-default)] px-6 py-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
            {mainNavItems.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`transition-all py-3 px-4 rounded-[6px] flex items-center justify-between min-h-[48px] text-sm ${
                    active
                      ? 'text-[var(--color-terracotta-600)] bg-[#FFF7ED] border-l-4 border-[var(--color-terracotta-500)] font-bold'
                      : 'text-[var(--color-ink-950)] hover:bg-[#F8FAFC] font-semibold'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-terracotta-500)]" />}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-[var(--border-default)] flex flex-col gap-3">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="emerald" size="md" fullWidth icon={<MessageSquare className="w-4 h-4" />} iconPosition="left">
                  WhatsApp Enquiry
                </Button>
              </a>
              <a href={phoneUrl} className="w-full">
                <Button variant="secondary" size="md" fullWidth icon={<Phone className="w-4 h-4" />} iconPosition="left">
                  Call Travel Desk
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
