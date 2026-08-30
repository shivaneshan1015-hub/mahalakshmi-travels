'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink, MapPin, Phone } from 'lucide-react';
import { LogoHorizontal } from '../brand/LogoHorizontal';
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
              <LogoHorizontal variant="dark" size="lg" />
            </div>

            <p className="type-body-small text-[var(--color-ink-400)] mt-2 max-w-sm">
              Curated short-format journeys and dedicated group transportation originating from Madurai across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.
            </p>

            <div className="mt-6 pt-4 border-t border-[var(--color-ink-800)] text-xs text-[var(--color-ink-400)] space-y-2">
              <p className="font-semibold text-[var(--color-paper-100)] uppercase tracking-wider">
                Madurai Office & Depot
              </p>
              <p className="leading-relaxed text-[var(--color-ink-300)]">
                {siteConfig.contact.address.fullAddress}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="inline-flex items-center gap-1.5 text-[var(--color-terracotta-300)] hover:text-white font-mono font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{siteConfig.contact.phonePrimary}</span>
                </a>

                <a
                  href={siteConfig.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[var(--color-terracotta-400)] hover:underline font-medium"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
