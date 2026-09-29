/**
 * MAHALAKSHMI TOUR & TRAVEL — ABOUT US ROUTE SHELL
 */

import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
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
  const breadcrumbs = [
    { name: 'Home', itemUrl: '/', position: 1 },
    { name: 'About', itemUrl: '/about', position: 2 },
  ];

  const webPageSchema = generateWebPageSchema({
    name: 'About Mahalakshmi Tour & Travel | Madurai, Tamil Nadu',
    description: 'Learn about Mahalakshmi Tour & Travel, our journey concept, in-house fleet, and dedicated travel care across South India.',
    url: '/about',
    pageType: 'AboutPage',
    aboutId: `${siteConfig.url}/#travelagency`,
    breadcrumbId: `${siteConfig.url}/about#breadcrumb`,
  });

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs, '/about')} />
      <JsonLd data={webPageSchema} />

      <div className="container-editorial py-12 md:py-16">
        <BreadcrumbNav items={breadcrumbs} className="mb-8" />

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
              Based in the historic temple city of <strong>Madurai, Tamil Nadu</strong>, <strong>Mahalakshmi Tours and Travels</strong> has been operating since 2021 with a singular principle: travel is about the human experience of the journey itself.
            </p>
            <p>
              Our owned fleet includes <strong>21-seater tourist vans</strong> for group travel and <strong>sedan cars</strong> for small families. Additional vehicle arrangements are coordinated through local vehicle/driver partners across South India based on your travel requirement.
            </p>
            <p id="madurai-origin">
              From our depot in Madurai, our journeys expand into the mist-covered hills of Munnar and Kodaikanal, the coastal shores of Rameswaram and Kanyakumari, and the cultural circuits of Kerala, Karnataka, Andhra Pradesh, and Telangana.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)]">
            <h4 className="type-h4 mb-2">Origin: Madurai</h4>
            <p className="type-body-small text-[var(--text-secondary)]">
              Madurai-based travel partner with route coverage across South Indian highways and mountain passes.
            </p>
          </div>
          <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)]">
            <h4 className="type-h4 mb-2">Vehicle Rental & Care</h4>
            <p className="type-body-small text-[var(--text-secondary)]">
              Owned 21-seater tourist vans and sedan cars alongside partner vehicle arrangements for outstation journeys.
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
          subtitle="Connect directly with our Madurai travel desk on WhatsApp to discuss your next trip."
          context="About Page Enquiry"
        />
      </div>
    </>
  );
}
