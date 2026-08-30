/**
 * MAHALAKSHMI TOUR & TRAVEL — VEHICLE INFO BLOCK
 * Expresses vehicle fleet capabilities as a complete travel solution.
 */

import React from 'react';
import Image from 'next/image';
import { Users, Wind, ShieldCheck, Luggage, ArrowRight } from 'lucide-react';
import { Vehicle } from '@/types/vehicle';
import { DataAnchor } from './DataAnchor';
import { Badge } from './Badge';
import { Button } from './Button';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';

export interface VehicleInfoBlockProps {
  vehicle: Vehicle;
  theme?: 'paper' | 'ink';
  className?: string;
}

export function VehicleInfoBlock({
  vehicle,
  theme = 'paper',
  className = '',
}: VehicleInfoBlockProps) {
  const isDark = theme === 'ink';

  const iconMap: Record<string, React.ReactNode> = {
    Users: <Users className="w-4 h-4 text-[var(--color-terracotta-500)]" />,
    Wind: <Wind className="w-4 h-4 text-[var(--color-terracotta-500)]" />,
    ShieldCheck: <ShieldCheck className="w-4 h-4 text-[var(--color-terracotta-500)]" />,
    Luggage: <Luggage className="w-4 h-4 text-[var(--color-terracotta-500)]" />,
  };

  const whatsappHref = getQuickWhatsAppLink(`Vehicle Enquiry: ${vehicle.name}`);

  return (
    <div
      className={`rounded-[4px] p-6 md:p-8 border ${
        isDark
          ? 'bg-[var(--color-ink-900)] border-[var(--color-ink-800)] text-[var(--color-paper-100)]'
          : 'bg-[var(--color-paper-100)] border-[var(--border-default)] text-[var(--text-primary)]'
      } ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Col: Vehicle Photo & Badge */}
        <div className="lg:col-span-5 relative aspect-[16/11] rounded-[4px] overflow-hidden bg-black/10">
          {vehicle.images[0] && (
            <Image
              src={vehicle.images[0].url}
              alt={vehicle.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="terracotta" size="sm">
              {vehicle.availabilityBadge || 'Verified Commercial Fleet'}
            </Badge>
          </div>
        </div>

        {/* Right Col: Numerical Anchor + Features */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <DataAnchor
                value={vehicle.seatingCapacity < 10 ? `0${vehicle.seatingCapacity}` : vehicle.seatingCapacity}
                unit="SEATS"
                sublabel={vehicle.category === '21-seater-van' ? 'GROUP RENTAL FLEET' : 'PRIVATE SEDAN TAXI'}
                theme={isDark ? 'dark' : 'light'}
              />
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Depot: Madurai
              </span>
            </div>

            <h3 className="type-h3 mt-2 mb-2">
              {vehicle.rentalHeading || vehicle.name}
            </h3>

            <p className="type-body-small text-[var(--text-secondary)] mb-4">
              {vehicle.description}
            </p>

            {vehicle.tariff && (
              <div className="mb-5 p-3 rounded-[3px] bg-[var(--color-paper-200)] border border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-[var(--text-muted)] block text-[10px] uppercase font-mono tracking-wider">Estimated Outstation Rate</span>
                  <span className="font-semibold text-[var(--color-terracotta-500)] text-sm">{vehicle.tariff.ratePerKm}</span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] block text-[10px] uppercase font-mono tracking-wider">Driver Bata</span>
                  <span className="font-semibold text-[var(--text-primary)]">{vehicle.tariff.driverBataPerDay}</span>
                </div>
                <div>
                  <span className="text-[var(--text-muted)] block text-[10px] uppercase font-mono tracking-wider">Min. Outstation</span>
                  <span className="font-semibold text-[var(--text-primary)]">{vehicle.tariff.minKmPerDay}</span>
                </div>
              </div>
            )}

            {/* Feature Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {vehicle.features.map((feat) => (
                <div
                  key={feat.title}
                  className={`flex items-start gap-2.5 p-2.5 rounded-[3px] border ${
                    isDark
                      ? 'bg-[var(--color-ink-950)] border-[var(--color-ink-800)]'
                      : 'bg-[#FFFFFF] border-[var(--border-subtle)]'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {iconMap[feat.iconName] || <Users className="w-4 h-4 text-[var(--color-terracotta-500)]" />}
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-[var(--text-primary)]">
                      {feat.title}
                    </h5>
                    <p className="text-[11px] text-[var(--text-muted)] leading-tight mt-0.5">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--border-subtle)]">
            <div className="flex flex-wrap items-center gap-3">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="sm" withArrow>
                  Instant Rental Quote
                </Button>
              </a>
              <a href={`/vehicles/${vehicle.slug}`}>
                <Button variant="secondary" size="sm">
                  View Full Rates & Specs
                </Button>
              </a>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              All South India Permits
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
