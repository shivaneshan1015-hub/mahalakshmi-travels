/**
 * MAHALAKSHMI TOUR & TRAVEL — DYNAMIC ARTICLE DETAIL PAGE (/travel-guide/[slug])
 * Phase 08: Publication reading layout with route margin, key facts, and conversion bridges.
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllArticles, getArticleBySlug } from '@/lib/data/articles';
import { resolveArticleRelations } from '@/lib/data/relationships';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { ArticleHero } from '@/components/guide/ArticleHero';
import { ArticleKeyFacts } from '@/components/guide/ArticleKeyFacts';
import { ArticleTableOfContents } from '@/components/guide/ArticleTableOfContents';
import { ArticleRouteMargin } from '@/components/guide/ArticleRouteMargin';
import { ArticleConnectedTour } from '@/components/guide/ArticleConnectedTour';
import { ArticleConnectedService } from '@/components/guide/ArticleConnectedService';
import { ArticleRelatedGuides } from '@/components/guide/ArticleRelatedGuides';
import { ArticleCustomJourneyCTA } from '@/components/guide/ArticleCustomJourneyCTA';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return constructMetadata({
      title: 'Article Not Found | Mahalakshmi Tour & Travel',
      description: 'The requested travel guide could not be found.',
    });
  }

  return constructMetadata({
    title: article.seo.title,
    description: article.seo.description,
    canonicalPath: `/travel-guide/${article.slug}`,
    ogType: 'article',
    ogImage: article.coverImage.url,
    publishedTime: article.publishedDate,
  });
}

function renderInlineText(text: string): React.ReactNode {
  // Parse **bold** and *italic*
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[var(--color-ink-950)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export default async function TravelArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const {
    article,
    connectedTour,
    connectedService,
    destination,
    relatedArticles,
  } = resolveArticleRelations(slug);

  if (!article) {
    notFound();
  }

  const articleSchema = generateArticleSchema(article);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', itemUrl: 'https://mahalakshmitravels.com', position: 1 },
    { name: 'Travel Guide', itemUrl: 'https://mahalakshmitravels.com/travel-guide', position: 2 },
    { name: article.title, itemUrl: `https://mahalakshmitravels.com/travel-guide/${article.slug}`, position: 3 },
  ]);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="container-editorial py-10 md:py-16">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav
          items={[
            { name: 'Home', itemUrl: '/', position: 1 },
            { name: 'Travel Guide', itemUrl: '/travel-guide', position: 2 },
            { name: article.title, itemUrl: `/travel-guide/${article.slug}`, position: 3 },
          ]}
          className="mb-8"
        />

        {/* 01 — Article Hero Header */}
        <ArticleHero article={article} />

        {/* 02 — Main Reading Layout (Article + Sidebar Margin) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start my-10">
          {/* Main Article Body Column */}
          <article className="lg:col-span-8">
            {/* Key Facts Summary Panel */}
            <ArticleKeyFacts keyFacts={article.keyFacts} />

            {/* Accessible Table of Contents */}
            <ArticleTableOfContents items={article.tableOfContents} />

            {/* Long-Form Editorial Prose with Proper Typographic Hierarchy */}
            <div className="type-body text-[var(--color-ink-900)] space-y-6 leading-relaxed">
              {article.content.split('\n\n').map((block, index) => {
                const trimmed = block.trim();
                if (!trimmed) return null;

                // Heading 2
                if (trimmed.startsWith('## ')) {
                  const headingMatch = trimmed.match(/^## (.+?)(?: \{#(.+?)\})?$/);
                  const title = headingMatch ? headingMatch[1] : trimmed.replace('## ', '');
                  const id = headingMatch && headingMatch[2] ? headingMatch[2] : undefined;
                  return (
                    <h2
                      key={index}
                      id={id}
                      className="type-h2 text-[var(--color-ink-950)] mt-10 mb-4 pt-6 border-t border-[var(--border-subtle)] scroll-mt-24"
                    >
                      {renderInlineText(title)}
                    </h2>
                  );
                }

                // Heading 3
                if (trimmed.startsWith('### ')) {
                  const title = trimmed.replace('### ', '');
                  return (
                    <h3 key={index} className="type-h3 text-[var(--color-ink-950)] mt-6 mb-3">
                      {renderInlineText(title)}
                    </h3>
                  );
                }

                // Check for bullets and numbered lists within block
                const lines = trimmed.split('\n');
                const hasBullets = lines.some((l) => l.trim().startsWith('- ') || l.trim().startsWith('* '));
                const hasNumbered = lines.some((l) => /^\d+\.\s/.test(l.trim()));

                if (hasBullets) {
                  const introLines: string[] = [];
                  const bulletLines: string[] = [];
                  let inList = false;

                  lines.forEach((line) => {
                    const lineTrim = line.trim();
                    if (lineTrim.startsWith('- ') || lineTrim.startsWith('* ')) {
                      inList = true;
                      bulletLines.push(lineTrim.replace(/^[-*]\s+/, ''));
                    } else if (!inList && lineTrim) {
                      introLines.push(lineTrim);
                    } else if (inList && lineTrim) {
                      bulletLines.push(lineTrim);
                    }
                  });

                  return (
                    <div key={index} className="space-y-3">
                      {introLines.length > 0 && (
                        <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                          {renderInlineText(introLines.join(' '))}
                        </p>
                      )}
                      <ul className="space-y-2.5 my-3 pl-2 sm:pl-4 text-sm text-[var(--text-secondary)]">
                        {bulletLines.map((it, i) => (
                          <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta-500)] shrink-0 mt-2" />
                            <span>{renderInlineText(it)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                if (hasNumbered) {
                  const introLines: string[] = [];
                  const numberItems: string[] = [];
                  let inList = false;

                  lines.forEach((line) => {
                    const lineTrim = line.trim();
                    if (/^\d+\.\s/.test(lineTrim)) {
                      inList = true;
                      numberItems.push(lineTrim.replace(/^\d+\.\s+/, ''));
                    } else if (!inList && lineTrim) {
                      introLines.push(lineTrim);
                    } else if (inList && lineTrim) {
                      numberItems.push(lineTrim);
                    }
                  });

                  return (
                    <div key={index} className="space-y-3">
                      {introLines.length > 0 && (
                        <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                          {renderInlineText(introLines.join(' '))}
                        </p>
                      )}
                      <ol className="space-y-3 my-3 pl-1 text-sm text-[var(--text-secondary)]">
                        {numberItems.map((it, i) => (
                          <li key={i} className="flex items-start gap-3 leading-relaxed">
                            <span className="w-5 h-5 rounded-full bg-[var(--color-terracotta-100)] text-[var(--color-terracotta-700)] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span>{renderInlineText(it)}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  );
                }

                // Regular Paragraph
                return (
                  <p key={index} className="text-base text-[var(--text-secondary)] leading-relaxed">
                    {renderInlineText(trimmed)}
                  </p>
                );
              })}
            </div>

            {/* 03 — Contextual Connected Tour */}
            <ArticleConnectedTour tour={connectedTour} />

            {/* 04 — Contextual Connected Service */}
            <ArticleConnectedService service={connectedService} />
          </article>

          {/* Right Sidebar Margin with Desktop Route Trace */}
          <div className="hidden lg:block lg:col-span-4 pl-4">
            <ArticleRouteMargin
              origin={article.keyFacts?.origin || 'Madurai'}
              destination={article.keyFacts?.destination || article.destination}
              distanceKm={article.keyFacts?.distanceKm}
            />
          </div>
        </div>

        {/* 05 — Related Articles */}
        <ArticleRelatedGuides relatedArticles={relatedArticles} />

        {/* 06 — Custom Journey Planning Invitation */}
        <ArticleCustomJourneyCTA destination={article.destination} />
      </div>
    </>
  );
}
