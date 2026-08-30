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
    <footer className="bg-[#0F172A] text-[#F8FAFC] border-t border-[#1E293B] pt-16 pb-12">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col pr-4">
            <div className="mb-4">
              <LogoHorizontal variant="dark" size="lg" />
            </div>

            <p className="type-body-small text-[#94A3B8] mt-2 max-w-sm leading-relaxed">
              Curated short-format journeys and dedicated group transportation originating from Madurai across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.
            </p>

            <div className="mt-6 pt-4 border-t border-[#1E293B] text-xs text-[#94A3B8] space-y-2">
              <p className="font-bold text-[#F8FAFC] uppercase tracking-wider">
                Madurai Office & Depot
              </p>
              <p className="leading-relaxed text-[#CBD5E1]">
                {siteConfig.contact.address.fullAddress}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="inline-flex items-center gap-1.5 text-[#F59E0B] hover:text-[#FFFFFF] font-mono font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{siteConfig.contact.phonePrimary}</span>
                </a>

                <a
                  href={siteConfig.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[var(--color-terracotta-300)] hover:underline font-semibold"
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
              <h4 className="type-eyebrow text-[#F59E0B] mb-4 font-bold tracking-widest">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#CBD5E1] hover:text-[#FFFFFF] transition-colors font-medium"
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
        <div className="pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <span className="italic font-serif text-[#CBD5E1]">
              “Your Journey. Our Care.”
            </span>
            <a
              href="https://redwolf-website.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#CBD5E1] hover:text-[var(--color-terracotta-300)] transition-colors inline-flex items-center gap-1 group font-medium"
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
