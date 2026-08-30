/**
 * MAHALAKSHMI TOUR & TRAVEL — HOMEPAGE & CORE DIGITAL EXPERIENCE
 * Phase 03 Implementation: Origin → Possibility → Discovery → Journeys → Fleet → Customise → Trust → Final CTA
 */

import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateLocalBusinessSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { HeroSection } from '@/components/home/HeroSection';
import { JourneyDiscoverySection } from '@/components/home/JourneyDiscoverySection';
import { SouthIndiaMapSection } from '@/components/home/SouthIndiaMapSection';
import { FeaturedJourneysSection } from '@/components/home/FeaturedJourneysSection';
import { TravelTogetherSection } from '@/components/home/TravelTogetherSection';
import { CustomJourneySection } from '@/components/home/CustomJourneySection';
import { WhyMahalakshmiSection } from '@/components/home/WhyMahalakshmiSection';
import { TravelGuideSection } from '@/components/home/TravelGuideSection';
import { FinalJourneyCtaSection } from '@/components/home/FinalJourneyCtaSection';
import { MobileStickyBar } from '@/components/home/MobileStickyBar';

export const metadata: Metadata = constructMetadata({
  title: `${siteConfig.name} — South India Tours & 21-Seater Van Hire from Madurai`,
  description: 'Tours, group transportation (21-seater AC van & sedans), and custom journeys across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh starting from Madurai.',
  canonicalPath: '/',
});

export default function HomePage() {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <div className="flex flex-col min-h-screen pb-16 md:pb-0">
        {/* 01 — Hero / Origin */}
        <HeroSection />

        {/* 02 — Journey Discovery (4 Directions from Madurai) */}
        <JourneyDiscoverySection />

        {/* 03 — Interactive South India Map */}
        <SouthIndiaMapSection />

        {/* 04 — Featured Journeys */}
        <FeaturedJourneysSection />

        {/* 05 — Travel Together / Vehicles (21-Seater & Sedans) */}
        <TravelTogetherSection />

        {/* 06 — Custom Journey Builder Intro */}
        <CustomJourneySection />

        {/* 07 — Why Mahalakshmi Factual Trust */}
        <WhyMahalakshmiSection />

        {/* 08 — Travel Guide Preview */}
        <TravelGuideSection />

        {/* 09 — Final Journey CTA */}
        <FinalJourneyCtaSection />
      </div>
    </>
  );
}
