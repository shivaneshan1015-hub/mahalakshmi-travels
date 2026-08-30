# MAHALAKSHMI TOUR & TRAVEL — CLIENT HANDOVER & OPERATIONS MANUAL

**Business Name**: Mahalakshmi Tour & Travel  
**Location**: Perumal Kovil Street, Simmakkal, Madurai, Tamil Nadu 625001  
**Contact Numbers**: +91 98421 23456 / +91 98421 65432  
**Platform URL**: `https://mahalakshmitravels.com`  
**Depot & Operations**: Madurai (Serving Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh)

---

## 1. System Overview & Technology Stack

The Mahalakshmi Tour & Travel digital platform is built with a modern, high-performance architecture:
- **Framework**: Next.js 15+ App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4 + Bespoke Brand Tokens (*Ink, Terracotta, Warm Paper*)
- **Rendering**: Static Site Generation (SSG) for all public pages with fast sub-second load times
- **SEO & Schema**: Automated `sitemap.xml`, `robots.txt`, and Schema.org structured data (`LocalBusiness`, `TouristTrip`, `Service`, `Article`, `BreadcrumbList`)

---

## 2. Managing Enquiries & WhatsApp Workflow

### How Customers Connect with You
The platform converts visitors through three direct channels:

1. **One-Tap WhatsApp Integration**:
   - Customers clicking *"Plan This Journey"*, *"Ask About Vehicle"*, or *"Customise Route"* automatically open WhatsApp with a structured pre-filled message (e.g., *“Hello Mahalakshmi Travels, I would like to plan the 1N/2D Munnar Tour for 6 passengers...”*).
   - Messages arrive directly at your verified WhatsApp number: `+91 98421 23456`.

2. **Custom Journey Builder (`/plan-your-journey`)**:
   - Visitors building custom multi-stop routes receive a unique tracking reference code formatted as `ML-26-XXXX`.
   - The enquiry details are submitted to your server API (`/api/enquiry`) and summarized for immediate WhatsApp confirmation.

3. **Direct Phone Calling**:
   - Header, Mobile Sticky Bar, and Footer feature direct `tel:` links to `+91 98421 23456` for immediate calls from mobile devices.

---

## 3. How to Update Website Content

All website content is managed through structured, easy-to-edit TypeScript data repositories located in `src/lib/data/`. You do **not** need to edit complex UI code or styling to add or modify content.

### A. Adding or Editing a Tour Package
- **File**: `src/lib/data/tours.ts`
- **Steps**:
  1. Add a new object to `toursRepository`.
  2. Provide `title`, `slug`, `duration`, `destination`, `routePoints`, `itineraryDays`, `highlights`, `inclusions`, `exclusions`, `travelOptions`, and `seo`.
  3. The website will automatically generate the new page at `/tours/[slug]` and add it to the sitemap.

### B. Publishing a Travel Guide Article
- **File**: `src/lib/data/articles.ts`
- **Steps**:
  1. Add a new object to `travelArticlesRepository`.
  2. Provide `title`, `slug`, `excerpt`, `content` (formatted with Markdown H2 `## Section Title {#anchor-id}`), `category`, `keyFacts`, and `tableOfContents`.
  3. Link the article to related tours using `connectedTourSlug` (e.g., `'madurai-to-munnar'`) and travel services using `connectedServiceSlug` (e.g., `'group-travel'`).
  4. The article immediately publishes at `/travel-guide/[slug]` with the desktop route margin and table of contents.

### C. Updating Fleet Information
- **File**: `src/lib/data/vehicles.ts` and `src/config/business.ts`
- **Fleet Specs**:
  - `1x 21-Seater Flagship Van` (`20+1` capacity, high-roof, dual AC, pushback seats, luggage space).
  - `2x Sedan-Type Cars` (`4+1` capacity, dual AC, couple & small family hill tours).

### D. Updating Business Contact Details
- **File**: `src/config/site.ts`
- Update phone numbers, WhatsApp ID, email address, physical address, and operating hours in one central place. Changes will reflect site-wide across all headers, footers, schema markup, and conversion buttons.

---

## 4. Search Engine Optimization (SEO) & Google Setup

### Google Search Console & Sitemap
- Your dynamic sitemap is automatically generated at:  
  `https://mahalakshmitravels.com/sitemap.xml`
- Search engine robots instructions are active at:  
  `https://mahalakshmitravels.com/robots.txt`
- To verify your domain in Google Search Console:
  1. Add domain property `mahalakshmitravels.com`.
  2. Verify via DNS TXT record or HTML meta tag in `src/app/layout.tsx`.
  3. Submit `https://mahalakshmitravels.com/sitemap.xml` under Sitemaps.

---

## 5. Deployment, Backups & Rollback Procedures

### Building & Deploying
```bash
# 1. Verify code integrity
npm run typecheck

# 2. Build production bundle
npm run build

# 3. Deploy to production host (Vercel / AWS / Node.js Server)
npm start
```

### Rollback Strategy
If an issue occurs during a content update:
1. Revert to the last stable git commit in your repository.
2. Run `npm run build` and redeploy.
3. Because all data is statically pre-rendered, rollbacks are instant with zero database downtime.

---

## 6. Periodic Maintenance Checklist (Monthly)
- [ ] Check phone and WhatsApp links to ensure contact numbers are active.
- [ ] Review Google Search Console for any 404 crawl errors.
- [ ] Add 1–2 fresh route articles to `/travel-guide` to expand organic South India travel search rankings.
- [ ] Review seasonal tour highlights (e.g., monsoon vs. winter travel advice).
