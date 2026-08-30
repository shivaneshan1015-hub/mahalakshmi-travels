/**
 * MAHALAKSHMI TOUR & TRAVEL — DESTINATION INFO PANEL
 * Editorial discovery card connected to the interactive map.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Compass, Clock, MapPin, ArrowRight, Route, ShieldCheck, Mountain } from 'lucide-react';
import { MapNode } from '@/types/map';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface DestinationInfoPanelProps {
  node: MapNode;
}

export function DestinationInfoPanel({ node }: DestinationInfoPanelProps) {
  return (
    <div className="flex flex-col justify-between h-full p-6 md:p-8 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)] shadow-editorial-md animate-in fade-in duration-300">
      <div className="space-y-4">
        {/* Top Badges & Distance */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Badge variant="terracotta">{node.state}</Badge>
            {node.categoryLabel && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[var(--color-paper-200)] text-[var(--color-ink-800)] border border-[var(--border-subtle)]">
                {node.categoryIcon} {node.categoryLabel}
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-[var(--color-terracotta-500)] font-semibold tracking-wider">
            {node.isOrigin ? 'OPERATIONAL HUB' : `${node.distanceFromMaduraiKm} KM FROM MADURAI`}
          </span>
        </div>

        {/* Hero Image Thumbnail */}
        {node.heroImageUrl && (
          <div className="relative aspect-[16/9] rounded-[3px] overflow-hidden bg-[var(--color-ink-900)]">
            <Image
              src={node.heroImageUrl}
              alt={node.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-950)]/80 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-white bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                ~{node.travelTimeFromMadurai}
              </span>
              {node.highwayBadge && (
                <span className="text-[10px] font-mono font-bold text-[var(--color-paper-100)] bg-[var(--color-terracotta-700)]/90 px-2 py-0.5 rounded backdrop-blur-sm uppercase tracking-wider">
                  {node.highwayBadge}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Destination Headline & Highlight */}
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="type-display-m text-[var(--text-primary)]">
              {node.name}
            </h3>
          </div>

          <p className="text-xs uppercase tracking-wider font-semibold text-[var(--color-terracotta-500)] mt-0.5">
            {node.highlightTag}
          </p>

          {node.terrain && (
            <p className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5 mt-1">
              <Mountain className="w-3 h-3 text-[var(--color-terracotta-500)] shrink-0" />
              <span>{node.terrain}</span>
            </p>
          )}
        </div>

        {/* Highway Corridor Note */}
        {node.highwayRoute && !node.isOrigin && (
          <div className="p-2.5 rounded-[3px] bg-[var(--color-paper-100)] border border-[var(--border-subtle)]">
            <div className="flex items-start gap-2">
              <Route className="w-3.5 h-3.5 text-[var(--color-terracotta-500)] mt-0.5 shrink-0" />
              <div className="text-xs text-[var(--text-secondary)] leading-tight">
                <span className="font-semibold text-[var(--color-ink-950)] block mb-0.5">
                  Designated Driving Highway:
                </span>
                {node.highwayRoute}
              </div>
            </div>
          </div>
        )}

        {/* Short Description */}
        <p className="type-body-small text-[var(--text-secondary)] leading-relaxed">
          {node.shortDescription}
        </p>

        {/* Route Waypoint Stops Timeline */}
        {node.waypoints && node.waypoints.length > 0 && !node.isOrigin && (
          <div className="pt-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2 font-semibold">
              Route Milestones from Madurai:
            </span>
            <div className="space-y-1.5 border-l-2 border-[var(--color-terracotta-300)] pl-3 ml-1">
              {node.waypoints.map((wp, idx) => (
                <div key={idx} className="relative text-xs flex items-center justify-between">
                  <span className="font-medium text-[var(--color-ink-900)]">
                    {wp.name}
                  </span>
                  {wp.note && (
                    <span className="text-[10px] font-mono text-[var(--color-terracotta-600)] ml-2 shrink-0">
                      {wp.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer — Direct Tour Package Link */}
      <div className="pt-5 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
        {node.relatedTourSlugs && node.relatedTourSlugs.length > 0 ? (
          <Link href={`/tours/${node.relatedTourSlugs[0]}`} className="w-full">
            <Button variant="primary" size="md" fullWidth withArrow>
              Explore {node.name} Tour Package
            </Button>
          </Link>
        ) : (
          <Link href={`/tours?state=${encodeURIComponent(node.state)}`} className="w-full">
            <Button variant="primary" size="md" fullWidth withArrow>
              Explore {node.state} Journeys
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

