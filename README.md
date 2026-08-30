# Mahalakshmi Tour & Travel — Digital Platform

> **"We help you complete your journey."**  
> Premium digital discovery and custom journey platform for Mahalakshmi Tour & Travel, Madurai, Tamil Nadu.

---

## 🏛️ Brand & Concept
- **Palette**: `Ink` (`#171716`) + `Terracotta` (`#A65F43`) + `Warm Paper` (`#F2EEE5`)
- **Visual Motif**: **The Incomplete Journey** — A dashed journey line connecting Madurai to iconic South Indian destinations (Munnar, Kodaikanal, Rameswaram, Ooty, Thekkady, Kanyakumari).
- **Fleet**: 1x 21-Seater Flagship Van (`20+1`), 2x Private Sedans (`4+1`).
- **Headquarters**: Madurai, Tamil Nadu (Central dispatch for Tamil Nadu, Kerala, Karnataka, Andhra Pradesh).

---

## 🚀 Key Features

1. **Interactive South India Map Engine (`/`)**: Scalable SVG coordinate engine centered on Madurai with route animations and destination highlights.
2. **Tour Discovery & Dynamic Itineraries (`/tours`, `/tours/[slug]`)**: 6 pre-configured South India tours with day-by-day timelines, vehicle options, and inclusions.
3. **Travel & Vehicle Services (`/travel-services`, `/vehicles`)**: "Who's Coming?" discovery assistant matching group sizes with dedicated vehicles.
4. **Custom Journey Builder (`/plan-your-journey`, `/customised-tours`)**: 6-step progressive planner with deterministic reference codes (`ML-26-XXXX`) and WhatsApp deep links.
5. **Travel Guide Publication Layer (`/travel-guide`, `/travel-guide/[slug]`)**: 6 cornerstone route, family planning, and itinerary guides with desktop route margins and table of contents.
6. **Production Technical SEO**: Automated `sitemap.xml`, `robots.txt`, and Schema.org JSON-LD (`LocalBusiness`, `TouristTrip`, `Service`, `Article`, `BreadcrumbList`).

---

## 🛠️ Tech Stack & Scripts

- **Framework**: Next.js 15+ App Router, React 19, TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 + Custom Design Tokens (`tokens.css`, `typography.css`, `motion.css`)
- **Icons**: Lucide React

```bash
# Run local development server
npm run dev

# Run TypeScript strict typecheck
npm run typecheck

# Build optimized production bundle
npm run build

# Start production server
npm start
```

---

## 📖 Complete Technical Documentation
For in-depth architecture diagrams, data schemas, relational DAL resolvers, and content management workflows, see:
[TECHNICAL_ARCHITECTURE.md](./TECHNICAL_ARCHITECTURE.md)
