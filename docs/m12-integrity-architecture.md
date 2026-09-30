# M12 — Integrity & Content Architecture (Mahalakshmi Travels)

This document describes the M12 content data model, canonical registry, schema validation engine, and CI pipeline for **Mahalakshmi Tours & Travels**.

---

## 1. Structure & Location

- **Canonical Registry**: `src/config/canonical-registry.ts`
- **Data Layers**: `src/lib/data/` (`tours.ts`, `destinations.ts`, `vehicles.ts`, `articles.ts`, `services.ts`, `relationships.ts`, `map.ts`)
- **Types**: `src/types/` (`tour.ts`, `destination.ts`, `vehicle.ts`, `article.ts`, `service.ts`, `seo.ts`, `enquiry.ts`, `crm.ts`)
- **Integrity Validation**: `scripts/validate-integrity.mjs`
- **CI Workflow**: `.github/workflows/integrity-validation.yml`

---

## 2. Validation Test Matrix (M12-01 to M12-35)

The validator script `scripts/validate-integrity.mjs` validates 35 distinct checks across 6 categories:

### A. Canonical Registry & Relationship Graph
- Zero duplicate canonical IDs or paths.
- Zero missing or orphan registry records.
- 100% valid relationship references (150/150 valid graph edges).
- Zero broken or legacy slug references.

### B. Business Truth & Pricing
- Mandatory business identity, phone, email, operating since (2014), hours, coverage, and owned fleet metrics.
- Enforces ZERO public pricing exposure on tours/vehicles/schemas to prevent unverified quote commitments.

### C. Unsupported Claims
- Enforces ZERO unsupported claims (e.g. 24/7 unverified claims, unverified driver claims, unverified permit claims).

### D. Schema Integrity
- Validates `WebSite`, `WebPage`, `AboutPage`, `ContactPage`, `CollectionPage`, `TouristTrip`, `Article`, `FAQPage`, and `BreadcrumbList` schemas.
- Single `LocalBusiness` entity alignment and hardcoded domain check.

### E. Technical Quality & Automation
- TypeScript strict typecheck (`tsc --noEmit`).
- ESLint checks.
- Next.js production build (`next build`).
- Dynamic sitemap generation (`sitemap.xml`).

---

## 3. Execution Commands

```bash
# Run M12 Integrity Test Suite (M12-01 to M12-35)
npm run integrity

# Run TypeScript Strict Typecheck
npm run typecheck

# Run Linter
npm run lint

# Run Production Build
npm run build
```

---

## 4. CI Workflow

GitHub Actions workflow `.github/workflows/integrity-validation.yml` runs automatically on push/PR:
1. `npm ci`
2. `npm run integrity`
3. `npm run typecheck`
4. `npm run lint`
5. `npm run build`
