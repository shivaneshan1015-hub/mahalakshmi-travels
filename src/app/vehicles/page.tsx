/**
 * MAHALAKSHMI TOURS AND TRAVELS — VEHICLE RENTAL IN MADURAI
 * Search-optimized vehicle rental hub for 21-seater vans and sedan cars.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { getAllVehicles } from '@/lib/data/vehicles';
import { VehicleInfoBlock } from '@/components/ui/VehicleInfoBlock';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema, generateFaqSchema, generateLocalBusinessSchema } from '@/lib/seo/schema';
import { Button } from '@/components/ui/Button';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';
import { getPrimaryPhoneTelUrl } from '@/lib/conversion/phone';
import { siteConfig } from '@/config/site';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Coins,
  Phone,
  MessageSquare,
  Sparkles,
  Users,
  GraduationCap,
  HeartHandshake,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

import { PassengerFleetSelector } from '@/components/vehicles/PassengerFleetSelector';

export const metadata: Metadata = constructMetadata({
  title: 'Vehicle Rental in Madurai | 21 Seater Van & Sedan Car Hire with Driver',
  description: 'Book 21-seater AC van rentals and private sedan cars in Madurai for outstation family trips, college IV, wedding transportation, and temple pilgrimages. Transparent per-KM rates, commercial permits, verified drivers.',
  canonicalPath: '/vehicles',
});

export default function VehiclesPage() {
  const vehicles = getAllVehicles();
  const phoneUrl = getPrimaryPhoneTelUrl();
  const whatsappUrl = getQuickWhatsAppLink('Vehicle Rental Enquiry from Madurai');

  const rentalFaqs = [
    {
      question: 'How do I rent a 21-seater van or sedan car from Mahalakshmi Tours and Travels in Madurai?',
      answer: 'Booking is quick and straightforward. You can connect with our Madurai travel desk directly via WhatsApp (+91 98421 23456) or phone call. Share your travel dates, pickup location in Madurai, passenger count, and desired route. We will provide an instant, all-inclusive or per-KM tariff quote and reserve your vehicle immediately.',
    },
    {
      question: 'What are the charges for outstation vehicle hire from Madurai?',
      answer: 'Our outstation rentals follow transparent pricing: Private AC Sedans start from ₹12–₹14/KM (minimum 250 KM/day) + driver bata ₹400–₹500/day. The 21-Seater AC Group Van starts from ₹22–₹25/KM (minimum 250–300 KM/day) + driver bata ₹600/day. Tolls, state boundary permits, and parking charges are billed at actuals.',
    },
    {
      question: 'Do your rental vehicles have permits for Kerala, Karnataka, and Andhra Pradesh?',
      answer: 'Yes. All our vehicles hold valid All-India Commercial Tourist Permits, updated fitness certificates, and comprehensive commercial passenger insurance. Our drivers have extensive driving experience across Western Ghats mountain roads and interstate national highways.',
    },
    {
      question: 'Can we book vehicles for college industrial visits (IV) and department tours?',
      answer: 'Yes. Our 21-seater luxury AC passenger van is custom-fitted for college student groups with high-back pushback seats, individual AC vents, high-power music system, and heavy-duty luggage carriers with waterproof protection.',
    },
    {
      question: 'Are the drivers experienced with hill stations like Kodaikanal, Munnar, and Ooty?',
      answer: 'Absolutely. All our full-time drivers are seasoned locals with over 10+ years of driving on mountain ghat sections including Batlagundu–Kodaikanal, Bodi Mettu–Munnar, Mettupalayam–Ooty, and Valparai passes.',
    },
  ];

  const rentalFeatures = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
      title: 'Verified Commercial Drivers',
      description: 'Courteous, non-smoking local drivers with deep route mastery across Tamil Nadu, Kerala, and Karnataka.',
    },
    {
      icon: <Coins className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
      title: 'Transparent Per-KM Tariffs',
      description: 'Clear rate cards with zero hidden surprises. You pay only for actual kilometers, driver bata, and statutory tolls.',
    },
    {
      icon: <MapPin className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
      title: 'Doorstep Pickup in Madurai',
      description: 'Direct pickup from your residence, hotel, Madurai Junction railway station, or Madurai Airport (IXM).',
    },
    {
      icon: <Clock className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
      title: '24/7 On-Demand Dispatch',
      description: 'Instant booking confirmations with backup driver coordination for uninterrupted outstation journeys.',
    },
  ];

  const rentalUseCases = [
    {
      icon: <Users className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
      title: 'Family Holiday & Hill Trips',
      description: 'Unhurried private travel to Kodaikanal, Munnar, Thekkady, and Ooty with child and senior-friendly rest halts.',
      href: '/travel-services/family-travel',
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
      title: 'College Industrial Visits (IV)',
      description: 'Spacious 21-seater AC van hire for university student batches, department tours, and educational trips.',
      href: '/travel-services/college-trips',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
      title: 'Wedding & Function Transport',
      description: 'Punctual guest shuttles between Madurai Airport, railway stations, mandapams, and outstation venues.',
      href: '/travel-services/function-travel',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[var(--color-terracotta-500)]" />,
      title: 'Temple Pilgrimage Circuits',
      description: 'Comfortable darshan trips to Rameshwaram, Tiruchendur, Palani, Madurai Meenakshi Amman, and Tirupati.',
      href: '/travel-services/group-travel',
    },
  ];

  const breadcrumbs = [
    { name: 'Home', itemUrl: '/', position: 1 },
    { name: 'Vehicle Rentals', itemUrl: '/vehicles', position: 2 },
  ];

  return (
    <div className="py-12 md:py-16">
      <JsonLd data={generateLocalBusinessSchema()} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={generateFaqSchema(rentalFaqs)} />

      <div className="container-editorial">
        <BreadcrumbNav items={breadcrumbs} className="mb-8" />

        {/* Page Hero Header */}
        <div className="max-w-3xl mb-12">
          <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-2">
            DRIVER-DRIVEN FLEET • OUTSTATION & LOCAL HIRE
          </span>
          <h1 className="type-display-xl text-[var(--text-primary)] mb-4 text-balance">
            Vehicle Rental Services in Madurai
          </h1>
          <p className="type-body-large text-[var(--text-secondary)] leading-relaxed">
            Rent our verified commercial <strong>21-Seater AC passenger vans</strong> and <strong>private sedan cars</strong> with seasoned South Indian highway drivers. Transparent per-kilometer billing, spotless hygiene, and round-the-clock dispatch from our central Madurai depot.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md" icon={<MessageSquare className="w-4 h-4" />} iconPosition="left">
                Get Instant Rental Quote
              </Button>
            </a>
            <a href={phoneUrl}>
              <Button variant="secondary" size="md" icon={<Phone className="w-4 h-4" />} iconPosition="left">
                Call: {siteConfig.contact.phonePrimary}
              </Button>
            </a>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] mb-14">
          {rentalFeatures.map((feat) => (
            <div key={feat.title} className="flex items-start gap-3">
              <div className="p-2 rounded bg-[#FFFFFF] border border-[var(--border-subtle)] shrink-0 mt-0.5">
                {feat.icon}
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                  {feat.title}
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Passenger-to-Vehicle Selector */}
        <PassengerFleetSelector />

        {/* Vehicle Showcase List */}
        <div className="mb-16">
          <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-[var(--border-default)]">
            <div>
              <span className="type-eyebrow text-[var(--color-terracotta-500)] block">
                AVAILABLE RENTAL VEHICLES
              </span>
              <h2 className="type-h2 mt-1">
                Choose the Right Vehicle for Your Group
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)] hidden sm:inline">
              Base Depot: Madurai, Tamil Nadu
            </span>
          </div>

          <div className="space-y-12">
            {vehicles.map((vehicle) => (
              <VehicleInfoBlock key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>

        {/* Transparent Tariff & Pricing Guidelines */}
        <div className="p-8 md:p-10 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] mb-16 shadow-editorial-xs">
          <div className="max-w-2xl mb-8">
            <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
              FAIR & TRANSPARENT PRICING
            </span>
            <h2 className="type-h2 text-[var(--text-primary)] mb-2">
              Vehicle Rental Tariff & Rate Guidelines
            </h2>
            <p className="type-body text-[var(--text-secondary)]">
              We operate on an honest, transparent billing structure with zero surprise charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* 21 Seater Tariff Box */}
            <div className="p-6 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-subtle)] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-terracotta-500)]">
                    Group Van
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-terracotta-100)] text-[var(--color-terracotta-600)] font-mono font-semibold">
                    20+1 Pushback Seats
                  </span>
                </div>
                <h3 className="type-h3 text-[var(--color-ink-950)] mb-3">
                  21-Seater AC Van Rental
                </h3>
                <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-terracotta-500)] shrink-0" />
                    <span><strong>Outstation Rate:</strong> ₹22 – ₹25 / KM (AC)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-terracotta-500)] shrink-0" />
                    <span><strong>Driver Bata:</strong> ₹600 / Calendar Day</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-terracotta-500)] shrink-0" />
                    <span><strong>Minimum Outstation:</strong> 250–300 KM / Day</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-terracotta-500)] shrink-0" />
                    <span><strong>Inclusions:</strong> Vehicle AC, Fuel, Driver Services, Music System</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <Link href="/vehicles/21-seater-van" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-terracotta-500)] hover:underline">
                  View Van Details →
                </Link>
                <a href={getQuickWhatsAppLink('21-Seater Van Tariff Enquiry')} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="sm">Get Van Quote</Button>
                </a>
              </div>
            </div>

            {/* Sedan Tariff Box */}
            <div className="p-6 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-subtle)] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-terracotta-500)]">
                    Private Sedan
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-paper-200)] text-[var(--color-ink-800)] font-mono font-semibold">
                    4 Seats + Driver
                  </span>
                </div>
                <h3 className="type-h3 text-[var(--color-ink-950)] mb-3">
                  Sedan Car Rental (AC Prime)
                </h3>
                <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-terracotta-500)] shrink-0" />
                    <span><strong>Outstation Rate:</strong> ₹12 – ₹14 / KM (AC)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-terracotta-500)] shrink-0" />
                    <span><strong>Driver Bata:</strong> ₹400 – ₹500 / Calendar Day</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-terracotta-500)] shrink-0" />
                    <span><strong>Minimum Outstation:</strong> 250 KM / Day</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-terracotta-500)] shrink-0" />
                    <span><strong>Inclusions:</strong> AC Sedan (Dzire/Etios), Fuel, Clean Driver</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <Link href="/vehicles/sedan-car" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-terracotta-500)] hover:underline">
                  View Sedan Details →
                </Link>
                <a href={getQuickWhatsAppLink('Sedan Car Tariff Enquiry')} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="sm">Get Sedan Quote</Button>
                </a>
              </div>
            </div>
          </div>

          <p className="text-[11px] font-mono text-[var(--text-muted)]">
            * Note: Toll plaza charges, state border entry permits (Kerala, Karnataka, AP), and parking tickets are billed at actuals against valid receipts.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="mb-16">
          <div className="max-w-2xl mb-8">
            <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
              RENTAL USE CASES
            </span>
            <h2 className="type-h2">
              Popular Rental Services from Madurai
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rentalUseCases.map((uc) => (
              <div key={uc.title} className="p-6 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)] flex flex-col justify-between hover:border-[var(--color-terracotta-400)] transition-editorial group">
                <div>
                  <div className="mb-4">{uc.icon}</div>
                  <h3 className="type-h4 mb-2 text-[var(--color-ink-950)] group-hover:text-[var(--color-terracotta-500)] transition-colors">
                    {uc.title}
                  </h3>
                  <p className="type-body-small text-[var(--text-secondary)] mb-4">
                    {uc.description}
                  </p>
                </div>
                <Link href={uc.href} className="text-xs font-semibold uppercase tracking-wider text-[var(--color-terracotta-500)] hover:underline inline-flex items-center gap-1">
                  <span>Learn more</span>
                  <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Step Booking Process */}
        <div className="p-8 md:p-10 bg-[var(--color-ink-950)] text-white rounded-[4px] mb-16 border border-[var(--color-ink-800)]">
          <div className="max-w-2xl mb-10">
            <span className="type-eyebrow text-[var(--color-terracotta-300)] block mb-1">
              SIMPLE 3-STEP PROCESS
            </span>
            <h2 className="type-display-m text-white mb-2">
              How to Book Your Rental Vehicle
            </h2>
            <p className="text-sm text-[var(--color-ink-300)]">
              Reserve your vehicle in less than 2 minutes directly with our Madurai travel desk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-[3px] bg-white/5 border border-white/10">
              <span className="font-mono text-xs text-[var(--color-terracotta-400)] font-semibold block mb-2">
                STEP 01
              </span>
              <h4 className="text-sm font-semibold text-white mb-1">
                Choose Vehicle & Share Dates
              </h4>
              <p className="text-xs text-[var(--color-ink-300)] leading-relaxed">
                Select between our 21-seater AC van or sedan cars and inform us of your pickup date and destinations.
              </p>
            </div>

            <div className="p-5 rounded-[3px] bg-white/5 border border-white/10">
              <span className="font-mono text-xs text-[var(--color-terracotta-400)] font-semibold block mb-2">
                STEP 02
              </span>
              <h4 className="text-sm font-semibold text-white mb-1">
                Instant WhatsApp Quotation
              </h4>
              <p className="text-xs text-[var(--color-ink-300)] leading-relaxed">
                Receive transparent tariff estimates, driver details, and itinerary assistance within minutes on WhatsApp.
              </p>
            </div>

            <div className="p-5 rounded-[3px] bg-white/5 border border-white/10">
              <span className="font-mono text-xs text-[var(--color-terracotta-400)] font-semibold block mb-2">
                STEP 03
              </span>
              <h4 className="text-sm font-semibold text-white mb-1">
                Confirmed Doorstep Dispatch
              </h4>
              <p className="text-xs text-[var(--color-ink-300)] leading-relaxed">
                Your clean, sanitized vehicle and experienced driver arrive promptly at your Madurai doorstep.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs font-mono text-[var(--color-ink-400)]">
              Direct Helpline: +91 98421 23456 • Available 24 Hours
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md" icon={<MessageSquare className="w-4 h-4" />} iconPosition="left">
                Start WhatsApp Booking
              </Button>
            </a>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mb-16">
          <div className="max-w-2xl mb-8">
            <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="type-h2">
              Vehicle Rental in Madurai — FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {rentalFaqs.map((faq, idx) => (
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
      </div>
    </div>
  );
}
