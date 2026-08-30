/**
 * MAHALAKSHMI TOUR & TRAVEL — TRAVEL SERVICES HEADER
 * Conceptual Title: "TRAVEL, YOUR WAY."
 */

import React from 'react';
import { Badge } from '@/components/ui/Badge';

export function TravelServicesHeader() {
  return (
    <div className="border-b border-[var(--border-default)] pb-10 mb-12">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge variant="terracotta">Travel & Vehicle Services</Badge>
        <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider">
          MADURAI DEPOT • IN-HOUSE FLEET
        </span>
      </div>

      <div className="max-w-3xl">
        <h1 className="type-display-l text-[var(--text-primary)] mb-4">
          Travel, Your Way.
        </h1>
        <p className="type-body-large text-[var(--text-secondary)] leading-relaxed">
          From a family getaway to a college trip or wedding guest transfer, Mahalakshmi helps you arrange the journey around the people travelling with you.
        </p>
      </div>
    </div>
  );
}
