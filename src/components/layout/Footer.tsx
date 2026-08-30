'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { LogoSymbol } from '../brand/LogoSymbol';
import { footerNavSections } from '@/config/navigation';
import { siteConfig } from '@/config/site';

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Do not render public footer on admin CRM pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[var(--color-ink-950)] text-[var(--color-paper-100)] border-t border-[var(--color-ink-800)] pt-16 pb-12">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col pr-4">
            <div className="mb-4">
              <LogoSymbol size={72} variant="dark" type="mark" />
            </div>
            <h3 className="font-serif text-xl font-bold tracking-tight text-[var(--color-paper-100)] mb-1">
              Mahalakshmi Tours and Travels
            </h3>
            <span className="text-[11px] uppercase tracking-widest text-[var(--color-terracotta-400)] font-semibold mb-3">
              Your Journey. Our Care.
            </span>
            <p className="type-body-small text-[var(--color-ink-400)] mt-1 max-w-sm">
              Curated short-format journeys and dedicated group transportation originating from Madurai across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.
            </p>

            <div className="mt-6 pt-4 border-t border-[var(--color-ink-800)] text-xs text-[var(--color-ink-400)]">
              <p className="font-semibold text-[var(--color-paper-100)] uppercase tracking-wider mb-1">
                Madurai Office & Depot
              </p>
              <p>{siteConfig.contact.address.street}, {siteConfig.contact.address.city}</p>
              <p>{siteConfig.contact.address.state}, India • PIN {siteConfig.contact.address.pincode}</p>
              <p className="mt-2 text-[var(--color-terracotta-300)] font-mono">
                Phone: {siteConfig.contact.phonePrimary}
              </p>
            </div>
          </div>

          {/* Navigation Links Columns */}
          {footerNavSections.map((section) => (
            <div key={section.title} className="flex flex-col">
              <h4 className="type-eyebrow text-[var(--color-terracotta-300)] mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--color-ink-300)] hover:text-[var(--color-paper-100)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-ink-800)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-ink-500)]">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <span className="italic font-serif text-[var(--color-ink-400)]">
              “Your Journey. Our Care.”
            </span>
            <a
              href="https://redwolf-website.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-ink-400)] hover:text-[var(--color-terracotta-300)] transition-colors inline-flex items-center gap-1 group font-medium"
              title="Designed & Developed by Red Wolf"
            >
              <span>Designed by</span>
              <span className="font-bold text-[var(--color-terracotta-400)] group-hover:underline">RedWolf</span>
              <ExternalLink className="h-3 w-3 text-[var(--color-terracotta-400)] opacity-70 group-hover:opacity-100" />
            </a>
            <Link href="/design-system" className="hover:text-[var(--color-terracotta-300)]">
              Design System
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
