/**
 * MAHALAKSHMI TOURS AND TRAVELS — DYNAMIC VEHICLE RENTAL DETAIL PAGE
 * Search-optimized vehicle rental landing page with specifications, tariffs, routes, and FAQs.
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllVehicles, getVehicleBySlug } from '@/lib/data/vehicles';
import { resolveVehicleRelations } from '@/lib/data/relationships';
import { constructMetadata } from '@/lib/seo/metadata';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { JourneyCard } from '@/components/ui/Card';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  generateBreadcrumbSchema,
  generateFaqSchema,
  generateVehicleRentalSchema,
} from '@/lib/seo/schema';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataAnchor } from '@/components/ui/DataAnchor';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';
import { getPrimaryPhoneTelUrl } from '@/lib/conversion/phone';
import { siteConfig } from '@/config/site';
import {
  ShieldCheck,
  Wind,
  Users,
  Luggage,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  HelpCircle,
  Car,
} from 'lucide-react';

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const vehicles = getAllVehicles();
  return vehicles.map((v) => ({
    slug: v.slug,
  }));
}

export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return constructMetadata({
      title: 'Vehicle Not Found',
      description: 'The requested vehicle specification could not be found.',
    });
  }

  return constructMetadata({
    title: vehicle.seo.title,
    description: vehicle.seo.description,
    canonicalPath: `/vehicles/${vehicle.slug}`,
  });
}

export default async function VehicleDetailPage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const { vehicle, popularTours } = resolveVehicleRelations(slug);

  if (!vehicle) {
    notFound();
  }

  const phoneUrl = getPrimaryPhoneTelUrl();
  const whatsappUrl = getQuickWhatsAppLink(`Booking Enquiry: ${vehicle.name}`);

  const breadcrumbs = [
    { name: 'Home', itemUrl: '/', position: 1 },
    { name: 'Vehicle Rentals', itemUrl: '/vehicles', position: 2 },
    { name: vehicle.name, itemUrl: `/vehicles/${vehicle.slug}`, position: 3 },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    Users: <Users className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
    Wind: <Wind className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
    Luggage: <Luggage className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
  };

  return (
    <div className="py-12 md:py-16">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={generateVehicleRentalSchema(vehicle)} />
      {vehicle.faqs && vehicle.faqs.length > 0 && (
        <JsonLd data={generateFaqSchema(vehicle.faqs)} />
      )}

      <div className="container-editorial">
        <BreadcrumbNav items={breadcrumbs} className="mb-8" />

        {/* Hero Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          {/* Left Column: Image & Badges */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="relative aspect-[16/11] rounded-[4px] overflow-hidden bg-[var(--color-ink-900)] shadow-editorial-md border border-[var(--border-default)] mb-4">
              {vehicle.images[0] && (
                <Image
                  src={vehicle.images[0].url}
                  alt={vehicle.seo.title || vehicle.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
              <div className="absolute top-3 left-3">
                <Badge variant="terracotta">
                  {vehicle.availabilityBadge || 'Available with Driver'}
                </Badge>
              </div>
            </div>

            {/* Quick Specs Highlight Box */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)]">
              <div className="text-center">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--text-muted)] block">Capacity</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{vehicle.seatingCapacity} Seats</span>
              </div>
              <div className="text-center border-x border-[var(--border-subtle)]">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--text-muted)] block">Climate</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">Full AC</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--text-muted)] block">Coverage</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">South India</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative and Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <DataAnchor
                  value={vehicle.seatingCapacity < 10 ? `0${vehicle.seatingCapacity}` : vehicle.seatingCapacity}
                  unit="SEATS"
                  sublabel={vehicle.category === '21-seater-van' ? 'GROUP TRAVEL SOLUTION' : 'PRIVATE SEDAN SERVICE'}
                />
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Depot: Madurai
                </span>
              </div>

              <h1 className="type-display-l text-[var(--text-primary)] mt-2 mb-4 text-balance">
                {vehicle.rentalHeading || vehicle.name}
              </h1>

              <p className="type-body text-[var(--text-secondary)] mb-6 leading-relaxed">
                {vehicle.description}
              </p>

              {/* Key Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {vehicle.features.map((feat) => (
                  <div
                    key={feat.title}
                    className="p-4 rounded-[4px] bg-[#FFFFFF] border border-[var(--border-default)]"
                  >
                    <div className="mb-2">
                      {iconMap[feat.iconName] || <Users className="w-5 h-5 text-[var(--color-terracotta-500)]" />}
                    </div>
                    <h4 className="text-xs font-semibold text-[var(--text-primary)] mb-1">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Booking CTAs */}
              <div className="flex flex-wrap items-center gap-4 p-5 bg-[var(--color-paper-200)] rounded-[4px] border border-[var(--border-subtle)]">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px]">
                  <Button variant="emerald" size="md" fullWidth icon={<MessageSquare className="w-4 h-4" />} iconPosition="left">
                    WhatsApp Quote
                  </Button>
                </a>
                <a href={phoneUrl} className="flex-1 min-w-[200px]">
                  <Button variant="secondary" size="md" fullWidth icon={<Phone className="w-4 h-4" />} iconPosition="left">
                    Call Travel Desk
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Matrix */}
        <div className="p-8 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] mb-16">
          <div className="max-w-2xl mb-6">
            <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
              DETAILED SPECIFICATIONS
            </span>
            <h2 className="type-h2">
              Vehicle Capabilities & Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicle.specifications.map((spec) => (
              <div key={spec.label} className="p-4 bg-[#FFFFFF] rounded-[3px] border border-[var(--border-subtle)]">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--text-muted)] block mb-0.5">
                  {spec.label}
                </span>
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Outstation Routes */}
        {vehicle.popularRoutes && vehicle.popularRoutes.length > 0 && (
          <div className="mb-16">
            <div className="max-w-2xl mb-8">
              <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
                RECOMMENDED OUTSTATION CIRCUITS
              </span>
              <h2 className="type-h2">
                Popular Rental Routes from Madurai
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicle.popularRoutes.map((r) => (
                <div key={r.route} className="p-6 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)] flex flex-col justify-between hover:border-[var(--color-terracotta-400)] transition-editorial">
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono text-[var(--text-muted)] mb-3">
                      <span className="text-[var(--color-terracotta-500)] font-semibold">{r.distance}</span>
                      <span>From Madurai</span>
                    </div>
                    <h3 className="type-h4 text-[var(--color-ink-950)] mb-2">
                      {r.route}
                    </h3>
                    <p className="type-body-small text-[var(--text-secondary)] mb-4">
                      {r.fitNote}
                    </p>
                  </div>
                  <a
                    href={getQuickWhatsAppLink(`Quote for ${r.route} via ${vehicle.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold uppercase tracking-wider text-[var(--color-terracotta-500)] hover:underline inline-flex items-center gap-1.5 pt-4 border-t border-[var(--border-subtle)]"
                  >
                    <span>Request Route Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular Tour Packages Section */}
        {popularTours.length > 0 && (
          <div className="py-12 border-t border-[var(--border-default)] mb-16">
            <span className="type-eyebrow text-[var(--color-terracotta-500)]">
              CURATED PACKAGES FOR THIS VEHICLE
            </span>
            <h2 className="type-h2 mt-1 mb-8">
              Complete Tour Packages Including This Vehicle
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTours.map((t) => (
                <JourneyCard
                  key={t.id}
                  title={t.title}
                  destination={t.destination}
                  durationText={t.duration.text}
                  distanceKm={t.distanceKm}
                  imageUrl={t.heroImage.url}
                  href={`/tours/${t.slug}`}
                  size="sm"
                />
              ))}
            </div>
          </div>
        )}

        {/* Vehicle Specific FAQs */}
        {vehicle.faqs && vehicle.faqs.length > 0 && (
          <div className="mb-16">
            <div className="max-w-2xl mb-8">
              <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
                RENTAL FAQS
              </span>
              <h2 className="type-h2">
                Frequently Asked Questions about {vehicle.name}
              </h2>
            </div>

            <div className="space-y-4">
              {vehicle.faqs.map((faq) => (
                <div key={faq.question} className="p-6 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)]">
                  <h3 className="type-h4 text-[var(--color-ink-950)] mb-2 flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[var(--color-terracotta-500)] shrink-0 mt-1" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="type-body-small text-[var(--text-secondary)] pl-6 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final Booking Block */}
        <div className="p-8 md:p-12 bg-[var(--color-ink-950)] text-white rounded-[4px] border border-[var(--color-ink-800)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="type-eyebrow text-[var(--color-terracotta-300)] block mb-2">
              RESERVE WITH CONFIDENCE
            </span>
            <h2 className="type-display-m text-white mb-2">
              Book {vehicle.name}
            </h2>
            <p className="text-sm text-[var(--color-ink-300)] leading-relaxed">
              Connect directly with our Madurai travel desk for customized outstation itineraries, multi-day discounts, and prompt driver allocation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" fullWidth icon={<MessageSquare className="w-4 h-4" />} iconPosition="left">
                WhatsApp Booking
              </Button>
            </a>
            <a href={phoneUrl} className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" fullWidth icon={<Phone className="w-4 h-4" />} iconPosition="left">
                Call {siteConfig.contact.phonePrimary}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
