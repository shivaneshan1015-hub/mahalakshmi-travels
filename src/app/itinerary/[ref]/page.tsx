/**
 * MAHALAKSHMI TOUR & TRAVEL — PERSONALIZED CUSTOMER ITINERARY DOSSIER
 * Public customer-facing page accessible via direct WhatsApp link (e.g. /itinerary/MT-260818-7821)
 */

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Compass,
  Calendar,
  Users,
  Car,
  CheckCircle2,
  Phone,
  MessageSquare,
  Printer,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { CrmRepository } from '@/lib/crm/repository';
import { siteConfig } from '@/config/site';
import { LogoHorizontal } from '@/components/brand/LogoHorizontal';

export async function generateMetadata(props: { params: Promise<{ ref: string }> }) {
  const { ref } = await props.params;
  const enquiry = await CrmRepository.getEnquiryById(ref);

  return {
    title: enquiry
      ? `Journey Itinerary for ${enquiry.name} (${enquiry.referenceCode}) | ${siteConfig.name}`
      : `Journey Itinerary | ${siteConfig.name}`,
    description: `Personalized South India tour itinerary and vehicle details originating from Madurai.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function CustomerItineraryPage(props: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await props.params;
  const enquiry = await CrmRepository.getEnquiryById(ref);

  if (!enquiry) {
    notFound();
  }

  const destinationsList = enquiry.destinations.length > 0 ? enquiry.destinations.join(' - ') : 'South India Discovery';
  const travelDate = enquiry.travelDate ? new Date(enquiry.travelDate).toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }) : 'Flexible Dates';

  const quote = enquiry.quotedAmount || enquiry.estimatedValue || 35000;
  const advance = enquiry.advanceReceived || 0;
  const balance = Math.max(0, quote - advance);

  const confirmWhatsAppUrl = `https://wa.me/${siteConfig.contact.phoneRaw}?text=${encodeURIComponent(
    `Vanakkam Mahalakshmi Travels! 🙏\n\nI have reviewed my tour itinerary (Ref: ${enquiry.referenceCode}) for ${destinationsList}.\n\nI would like to confirm my booking with your Madurai Desk.`
  )}`;

  // Generate intelligent day-by-day sightseeing highlights based on destinations
  const generateDayPlans = () => {
    const dest = enquiry.destinations.join(' ').toLowerCase();

    if (dest.includes('munnar')) {
      return [
        {
          day: 'Day 01',
          title: 'Madurai to Munnar Hill Ascent (Scenic Western Ghats)',
          description:
            'Morning pickup from Madurai hotel/residence. Scenic drive via Theni and Bodimettu Ghat road. Stop at Cheeyappara & Valara Waterfalls. Evening check-in at Munnar resort & stroll through spice plantations.',
        },
        {
          day: 'Day 02',
          title: 'Munnar Sightseeing & High-Range Tea Gardens',
          description:
            'Visit Eravikulam National Park (Nilgiri Tahr habitat), Tea Museum, Mattupetty Dam, Echo Point, and Kundala Lake with boating options. Evening shopping for pure Kerala tea and homemade chocolates.',
        },
        {
          day: 'Day 03',
          title: 'Thekkady Wildlife Sanctuary or Top Station View',
          description:
            'Drive to Periyar Lake Wildlife Sanctuary in Thekkady for boat safari (spot wild elephants & birds). Visit elephant junction and spice garden plantation. Return drive towards Madurai.',
        },
      ];
    }

    if (dest.includes('kodaikanal')) {
      return [
        {
          day: 'Day 01',
          title: 'Madurai to Kodaikanal (Princess of Hill Stations)',
          description:
            'Morning departure from Madurai via Batlagundu ghat road. Stop at Silver Cascade Falls. Check-in at Kodaikanal. Afternoon visit to Coaker’s Walk, Bryant Park, and Kodai Lake pedal boating.',
        },
        {
          day: 'Day 02',
          title: 'Pine Forest, Pillar Rocks & Return to Madurai',
          description:
            'Morning excursion to Pillar Rocks, Green Valley View (Suicide Point), Pine Forest, and Guna Caves. Afternoon departure back to Madurai.',
        },
      ];
    }

    if (dest.includes('rameswaram')) {
      return [
        {
          day: 'Day 01',
          title: 'Madurai to Rameswaram (Pamban Bridge & Temple Darshan)',
          description:
            'Morning departure across the iconic Pamban Sea Bridge. Check-in at Rameswaram. Sacred 22 Theertham holy bath and Ramanathaswamy Temple darshan. Evening visit to APJ Abdul Kalam Memorial.',
        },
        {
          day: 'Day 02',
          title: 'Dhanushkodi Land’s End & Return Journey',
          description:
            'Early morning trip to Dhanushkodi Ghost Town, Ram Setu Point, and pristine beach confluence. Afternoon journey back to Madurai.',
        },
      ];
    }

    // Default South India itinerary
    return [
      {
        day: 'Day 01',
        title: `Madurai Departure & Journey to ${enquiry.destinations[0] || 'Destination'}`,
        description:
          'Dedicated pickup by your verified Mahalakshmi driver. Comfortable highway and ghat road travel with scenic rest stops. Hotel check-in and evening local sightseeing.',
      },
      {
        day: 'Day 02',
        title: 'Full Day Sightseeing & Cultural Highlights',
        description:
          'Guided excursion to top attractions, viewpoints, local markets, and culinary highlights with full tourist vehicle disposal.',
      },
      {
        day: 'Day 03',
        title: 'Return Journey & Safe Drop at Madurai',
        description:
          'Morning relaxed exploration and souvenir shopping. Pleasant return drive to Madurai with drop-off at your chosen location.',
      },
    ];
  };

  const dayPlans = generateDayPlans();

  return (
    <div className="min-h-screen bg-[#F2EEE5] text-[#171716] py-8 px-4 sm:px-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Action Bar (Print / Call) */}
        <div className="flex items-center justify-between no-print">
          <Link href="/" className="inline-block">
            <LogoHorizontal variant="light" />
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${siteConfig.contact.phonePrimary}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white border border-[rgba(23,23,22,0.15)] text-xs font-semibold text-[#171716] hover:bg-[#FAF8F5] shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#A65F43]" />
              <span>Call Desk</span>
            </a>
          </div>
        </div>

        {/* Master Itinerary Dossier Card */}
        <div className="bg-white border border-[rgba(23,23,22,0.14)] rounded-lg p-6 sm:p-10 shadow-editorial-md space-y-8">
          {/* Header Banner */}
          <div className="border-b-2 border-[#A65F43] pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FAF2EE] text-[#A65F43] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Confirmed Journey Itinerary</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#171716] tracking-tight">
                {enquiry.origin} → {destinationsList}
              </h1>
              <p className="text-xs text-[#63615C] mt-1">
                Prepared exclusively for <strong className="text-[#171716]">{enquiry.name}</strong> • Ref: <span className="font-mono text-[#A65F43] font-bold">{enquiry.referenceCode}</span>
              </p>
            </div>

            <div className="sm:text-right text-xs font-mono text-[#63615C] shrink-0">
              <div>Departure Date</div>
              <div className="text-sm font-bold text-[#171716] font-sans mt-0.5">
                {travelDate}
              </div>
              <div className="text-[11px] text-[#A65F43]">
                {enquiry.duration || `${dayPlans.length} Days / ${dayPlans.length - 1} Nights`}
              </div>
            </div>
          </div>

          {/* Key Journey Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-[#FAF8F5] border border-[rgba(23,23,22,0.08)] rounded">
              <span className="text-[10px] font-mono uppercase text-[#7E7B75] block">
                Passengers
              </span>
              <span className="font-bold text-sm text-[#171716]">
                {enquiry.travellerCount} Pax ({enquiry.groupType})
              </span>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[rgba(23,23,22,0.08)] rounded">
              <span className="text-[10px] font-mono uppercase text-[#7E7B75] block">
                Vehicle Category
              </span>
              <span className="font-bold text-sm text-[#A65F43]">
                {enquiry.assignedVehicle || enquiry.vehicleRequirement || 'Executive Tourist Coach'}
              </span>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[rgba(23,23,22,0.08)] rounded">
              <span className="text-[10px] font-mono uppercase text-[#7E7B75] block">
                Origin City
              </span>
              <span className="font-bold text-sm text-[#171716]">
                {enquiry.origin} Depot
              </span>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[rgba(23,23,22,0.08)] rounded">
              <span className="text-[10px] font-mono uppercase text-[#7E7B75] block">
                Package Quote
              </span>
              <span className="font-bold text-sm text-emerald-700 font-mono">
                ₹{quote.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Day-Wise Itinerary Plan */}
          <div className="space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#171716] flex items-center gap-2 border-l-4 border-[#A65F43] pl-3">
              <span>Day-Wise Travel Itinerary</span>
            </h2>

            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[rgba(23,23,22,0.12)]">
              {dayPlans.map((item, idx) => (
                <div key={idx} className="relative pl-9 space-y-1">
                  <div className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-[#A65F43] border-2 border-white shadow-sm" />
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FAF2EE] text-[#A65F43] uppercase">
                      {item.day}
                    </span>
                    <h3 className="font-semibold text-sm text-[#171716]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#55534E] leading-relaxed pt-0.5">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Package Inclusions & Breakdown */}
          <div className="p-5 bg-[#FAF8F5] border border-[rgba(23,23,22,0.1)] rounded-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(23,23,22,0.1)] pb-3">
              <div>
                <h3 className="font-serif text-base font-bold text-[#171716]">
                  Transparent Package Inclusions
                </h3>
                <p className="text-xs text-[#7E7B75]">Zero hidden charges on road.</p>
              </div>
              <div className="text-right font-mono text-xs">
                <div className="text-[#63615C]">Total Quoted Package</div>
                <div className="text-lg font-bold text-emerald-800">
                  ₹{quote.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#33322F]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>AC Dedicated Tourist Vehicle with Fuel</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Driver & Daily Allowances</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>All Highway Toll Taxes & Route Charges</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Madurai Travel Desk Journey Support</span>
              </div>
            </div>

            {advance > 0 && (
              <div className="pt-3 border-t border-[rgba(23,23,22,0.1)] flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-700 font-semibold">Advance Received: ₹{advance.toLocaleString('en-IN')}</span>
                <span className="text-[#171716] font-bold">Balance Payable on Boarding: ₹{balance.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>

          {/* Assigned Driver / Fleet Section */}
          {enquiry.assignedVehicle && (
            <div className="p-4 bg-white border border-[#DDD9D3] rounded-md text-xs space-y-1">
              <div className="font-mono text-[10px] uppercase text-[#7E7B75]">
                Assigned Transportation
              </div>
              <div className="font-bold text-[#171716] text-sm">
                🚐 {enquiry.assignedVehicle}
              </div>
              {enquiry.assignedDriver && (
                <div className="text-[#A65F43] font-mono">
                  Driver: {enquiry.assignedDriver}
                </div>
              )}
            </div>
          )}

          {/* Action CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 no-print">
            <a
              href={confirmWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3 px-4 rounded bg-[#43664C] hover:bg-[#34523C] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-editorial-sm transition-transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm Booking via WhatsApp</span>
            </a>

            <a
              href={`tel:${siteConfig.contact.phonePrimary}`}
              className="w-full sm:w-auto py-3 px-5 rounded bg-[#171716] hover:bg-[#33322F] text-[#F2EEE5] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#A65F43]" />
              <span>Call Madurai Desk</span>
            </a>
          </div>

          {/* Footer Note */}
          <div className="border-t border-[rgba(23,23,22,0.1)] pt-4 text-center text-[11px] text-[#7E7B75] space-y-1">
            <p className="flex items-center justify-center gap-1.5 font-serif italic">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A65F43]" />
              <span>“Your Journey. Our Care.” — Mahalakshmi Tour & Travel, Madurai</span>
            </p>
            <p>{siteConfig.contact.address.street}, {siteConfig.contact.address.city}, Tamil Nadu</p>
          </div>
        </div>
      </div>
    </div>
  );
}
