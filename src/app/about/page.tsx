/**
 * MAHALAKSHMI TOUR & TRAVEL — ABOUT US ROUTE SHELL
 */

import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { LogoHorizontal } from '@/components/brand/LogoHorizontal';
import { siteConfig } from '@/config/site';
import { CtaBlock } from '@/components/ui/CtaBlock';

export const metadata: Metadata = constructMetadata({
  title: 'About Mahalakshmi Tour & Travel | Madurai, Tamil Nadu',
  description: 'Learn about Mahalakshmi Tour & Travel, our journey concept, in-house fleet, and dedicated travel care across South India.',
  canonicalPath: '/about',
});

export default function AboutPage() {
  return (
    <div className="container-editorial py-12 md:py-16">
      <BreadcrumbNav
        items={[
          { name: 'Home', itemUrl: '/', position: 1 },
          { name: 'About', itemUrl: '/about', position: 2 },
        ]}
        className="mb-8"
      />

      <div className="max-w-3xl mx-auto mb-16">
        <div className="flex justify-center mb-8">
          <LogoHorizontal size="lg" />
        </div>

        <span className="type-eyebrow text-[var(--color-terracotta-500)] text-center block mb-2">
          FOUNDED & OPERATED FROM MADURAI
        </span>
        <h1 className="type-display-l text-[var(--text-primary)] text-center mb-6">
          Your Journey. Our Care.
        </h1>

        <div className="space-y-6 type-body-large text-[var(--text-secondary)] leading-relaxed">
          <p>
            Based in the historic temple city of <strong>Madurai, Tamil Nadu</strong>, <strong>Mahalakshmi Tours and Travels</strong> was established with a singular principle: travel is not merely about reaching a destination—it is about the human experience of the journey itself.
          </p>
          <p>
            We operate our own dedicated fleet of vehicles—including our signature <strong>21-seater passenger van</strong> for group travel and <strong>sedan cars</strong> for families. By owning and maintaining our fleet directly, we ensure safety standards, spotless cleanliness, and experienced local drivers who understand South Indian routes intimately.
          </p>
          <p id="madurai-origin">
            From our central depot in Madurai, our journeys expand into the mist-covered hills of Munnar and Kodaikanal, the coastal shores of Rameswaram and Kanyakumari, and the cultural circuits of Kerala, Karnataka, and Andhra Pradesh.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)]">
          <h4 className="type-h4 mb-2">Origin: Madurai</h4>
          <p className="type-body-small text-[var(--text-secondary)]">
            Deep roots in Madurai with an intimate understanding of South Indian highway corridors and ghat roads.
          </p>
        </div>
        <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)]">
          <h4 className="type-h4 mb-2">Dedicated Fleet</h4>
          <p className="type-body-small text-[var(--text-secondary)]">
            In-house 21-seater group van and sedan cars maintained to rigorous safety and comfort benchmarks.
          </p>
        </div>
        <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)]">
          <h4 className="type-h4 mb-2">Adaptable Itineraries</h4>
          <p className="type-body-small text-[var(--text-secondary)]">
            Every journey can be customised around your group’s pacing, meal preferences, and temple timings.
          </p>
        </div>
      </div>

      <CtaBlock
        title="Start Your Journey with Us"
        subtitle="Connect directly with our Madurai founders on WhatsApp to discuss your next trip."
        context="About Page Enquiry"
      />
    </div>
  );
}
