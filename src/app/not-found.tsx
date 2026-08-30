/**
 * MAHALAKSHMI TOUR & TRAVEL — 404 NOT FOUND ROUTE
 * Brand-aligned editorial 404 experience: "THIS JOURNEY TOOK A DIFFERENT TURN."
 */

import Link from 'next/link';
import { Compass, ArrowRight, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container-editorial py-24 md:py-36 text-center">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        <span className="type-eyebrow text-[var(--color-terracotta-500)] mb-3">
          404 • UNCHARTED TERRITORY
        </span>

        <h1 className="type-display-l text-[var(--text-primary)] mb-4">
          This Journey Took a Different Turn.
        </h1>

        <p className="type-body text-[var(--text-secondary)] mb-8 leading-relaxed">
          The route or page you are looking for does not exist or has been moved. Let us guide you back to our primary South India journeys and destinations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/">
            <Button variant="primary" size="md" withArrow>
              Return Home
            </Button>
          </Link>
          <Link href="/tours">
            <Button
              variant="secondary"
              size="md"
              icon={<Compass className="w-4 h-4" />}
              iconPosition="left"
            >
              Explore Tours
            </Button>
          </Link>
          <Link href="/plan-your-journey">
            <Button
              variant="paper-outline"
              size="md"
              icon={<Navigation className="w-4 h-4" />}
              iconPosition="left"
            >
              Plan a Custom Journey
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
