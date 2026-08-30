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
    <header className="sticky top-0 z-[var(--z-header)] bg-[var(--color-paper-200)]/95 backdrop-blur-md border-b border-[var(--border-default)]">
      <div className="container-editorial">
        <div className="flex items-center justify-between h-22 sm:h-24 md:h-28">
          {/* Brand Logo */}
          <LogoHorizontal variant="light" size="md" showTagline />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="type-nav text-[var(--color-ink-800)] hover:text-[var(--color-terracotta-500)] transition-colors relative py-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a href={phoneUrl} className="p-2 text-[var(--color-ink-800)] hover:text-[var(--color-terracotta-500)]" title="Call Us">
              <Phone className="w-4 h-4" />
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="primary"
                size="sm"
                icon={<MessageSquare className="w-3.5 h-3.5" />}
                iconPosition="left"
              >
                Enquire
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[var(--color-ink-950)] focus-visible:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--color-paper-100)] border-b border-[var(--border-default)] px-6 py-6 shadow-editorial-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="type-h4 text-[var(--color-ink-950)] hover:text-[var(--color-terracotta-500)] transition-colors py-1"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-[var(--border-default)] flex flex-col gap-3">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="primary" size="md" fullWidth icon={<MessageSquare className="w-4 h-4" />} iconPosition="left">
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
