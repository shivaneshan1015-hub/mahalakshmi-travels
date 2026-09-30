# Phase 9 — Data / Content Model Architecture & Lock Specification

**Status**: **LOCKED**

Phase 9 establishes a CMS-ready structured content layer managed through the application codebase; an external runtime CMS is not part of the current implementation.

---

## 1. Architectural Principles

1. **Code-Managed Structured Content**: All content domains (Tours, Destinations, Services, Vehicles, Travel Guides/Articles) are structured as strongly typed TypeScript entities under `src/lib/data/` and `src/types/`.
2. **Canonical Content Registry**: `src/config/canonical-registry.ts` serves as the authoritative source of truth for all canonical IDs, content types, canonical paths, sitemap eligibility, and indexability.
3. **CMS-Ready Architecture**: The data layer is decoupled and accessible via typed helpers in `src/lib/data/`, allowing future integration with an external headless CMS without breaking route structures or relationship graphs.
4. **No External Runtime CMS**: An external runtime CMS (such as Sanity, Strapi, Contentful, or WordPress) is intentionally **not** part of the current implementation.

---

## 2. Content Domains & Validation Coverage

Every content domain is strictly typed, relationship-mapped, and validated:

| Content Domain | Storage File | Types File | Canonical ID Format | Validation Coverage |
| :--- | :--- | :--- | :--- | :--- |
| **Tours** | `src/lib/data/tours.ts` | `src/types/tour.ts` | `tour-<slug>` | Unique ID, required fields, valid slug, URL generation, destination links, vehicle links, sitemap eligibility, SEO/AEO connections. |
| **Destinations** | `src/lib/data/destinations.ts` | `src/types/destination.ts` | `dest-<slug>` | Unique ID, required fields, valid slug, URL, related tours, related guides, sitemap eligibility, SEO/AEO connections. |
| **Services** | `src/lib/data/services.ts` | `src/types/service.ts` | `srv-<slug>` | Unique ID, required fields, valid slug, URL, related tours, sitemap eligibility, SEO connections. |
| **Vehicles** | `src/lib/data/vehicles.ts` | `src/types/vehicle.ts` | `veh-<slug>` | Unique ID, required fields, valid slug, vehicle specs, no unsupported claims, no orphan records. |
| **Travel Guides / Articles** | `src/lib/data/articles.ts` | `src/types/article.ts` | `art-<slug>` | Unique ID, required fields, valid slug, URL, destination links, SEO metadata, AEO relationships, sitemap eligibility. |

---

## 3. Canonical Business Truth

The canonical business configuration in `src/config/site.ts` is locked as the authoritative truth:

* **Business Name**: Mahalakshmi Tours and Travels
* **Operating Since**: 2021
* **Phone**: +91 63801 92145
* **Email**: mahalakshmitoursandtravels6@gmail.com
* **Office Hours**: 9 AM – 7 PM
* **Coverage**: Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana
* **Owned Fleet**: 21-seater tourist van, sedan cars

---

## 4. Cross-System Integration Flow

```
Structured Content Data ➔ Canonical Registry ➔ URL Generation ➔ SEO & AEO Metadata ➔ Sitemap Engine
```

All 35 integrity checks (M12-01 to M12-35) in `scripts/validate-integrity.mjs` pass cleanly across:
* **Group A**: Phase 9 Data / Content Model Integrity
* **Group B**: SEO Integrity
* **Group C**: AEO Integrity
* **Group D**: GEO Integrity
* **Group E**: Business Truth Integrity
* **Group F**: Cross-System Integrity

---

## 5. Lock Condition

Phase 9 is formally **LOCKED**. No changes to content models, relationship mappings, business facts, or registry IDs are allowed without re-running the full validation pipeline (`npm run integrity`, `npm run typecheck`, `npm run lint`, `npm run build`).
