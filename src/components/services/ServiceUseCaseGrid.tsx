/**
 * MAHALAKSHMI TOUR & TRAVEL — SERVICE USE-CASE GRID
 * Editorial use-case cards (Group, College, Family, Function).
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, GraduationCap, HeartHandshake, Church } from 'lucide-react';
import { getAllTravelServices } from '@/lib/data/services';
import { Badge } from '@/components/ui/Badge';

export function ServiceUseCaseGrid() {
  const services = getAllTravelServices();

  return (
    <section className="mb-16">
      <div className="max-w-2xl mb-8">
        <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
          EXPLORE BY TRAVEL PURPOSE
        </span>
        <h2 className="type-h2 text-[var(--text-primary)] mb-2">
          Tailored for Every Group
        </h2>
        <p className="type-body-small text-[var(--text-secondary)]">
          Choose a travel category below to explore specific vehicle solutions, route formats, and operational support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-6 md:p-8 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] hover:border-[var(--color-terracotta-400)] transition-editorial flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <Badge variant="terracotta">
                  {service.serviceType.replace('-', ' ').toUpperCase()}
                </Badge>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Madurai Outstation & Local
                </span>
              </div>

              <h3 className="type-h3 text-[var(--color-ink-950)] group-hover:text-[var(--color-terracotta-500)] transition-colors mb-3">
                {service.title}
              </h3>

              <p className="type-body-small text-[var(--text-secondary)] mb-6 leading-relaxed">
                {service.shortDescription}
              </p>

              <div className="space-y-2 mb-6 pt-4 border-t border-[var(--border-subtle)]">
                {service.benefits.slice(0, 2).map((b, idx) => (
                  <div key={idx} className="text-xs text-[var(--color-ink-800)] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta-500)] shrink-0 mt-1.5" />
                    <span><strong>{b.title}:</strong> {b.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-950)] group-hover:text-[var(--color-terracotta-500)] transition-colors">
                Explore {service.title}
              </span>
              <ArrowRight className="w-4 h-4 text-[var(--color-terracotta-500)] transition-transform group-hover:translate-x-1" />
            </div>

            <Link href={`/travel-services/${service.slug}`} className="absolute inset-0 z-10">
              <span className="sr-only">View {service.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
