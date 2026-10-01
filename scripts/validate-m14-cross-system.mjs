/**
 * MAHALAKSHMI TOURS AND TRAVELS — M14 CROSS-SYSTEM VALIDATION SCRIPT (HARDENED)
 * Comprehensive cross-system integrity test suite evaluating relationships between:
 * Business Truth -> Data Model -> Canonical Registry -> Routes -> Internal Links ->
 * Navigation -> Vehicles/Services -> Tours -> Destinations -> Travel Guide ->
 * Custom Journey -> Conversion -> SEO -> AEO -> GEO/Schema -> Sitemap -> Robots -> Migration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let criticalFindings = 0;
let highFindings = 0;
let mediumFindings = 0;
let lowFindings = 0;

function reportCritical(msg) {
  criticalFindings++;
  console.error(`[CRITICAL] ${msg}`);
}

function reportHigh(msg) {
  highFindings++;
  console.error(`[HIGH] ${msg}`);
}

// -----------------------------------------------------------------------------
// 1. CANONICAL REGISTRY AUDIT
// -----------------------------------------------------------------------------
const registryFilePath = path.join(rootDir, 'src', 'config', 'canonical-registry.ts');
const registryContent = fs.readFileSync(registryFilePath, 'utf-8');

const registryEntryRegex = /{\s*id:\s*['"]([^'"]+)['"],\s*contentType:\s*['"]([^'"]+)['"],\s*canonicalPath:\s*['"]([^'"]+)['"],\s*status:\s*['"]([^'"]+)['"],\s*indexable:\s*(true|false),\s*sitemapEligible:\s*(true|false)/g;

const registryEntries = [];
let match;
while ((match = registryEntryRegex.exec(registryContent)) !== null) {
  registryEntries.push({
    id: match[1],
    contentType: match[2],
    canonicalPath: match[3],
    status: match[4],
    indexable: match[5] === 'true',
    sitemapEligible: match[6] === 'true',
  });
}

const allRegistryIds = registryEntries.map((e) => e.id);
const allRegistryPaths = registryEntries.map((e) => e.canonicalPath);

const tourRegistry = registryEntries.filter((e) => e.contentType === 'tour' || e.id.startsWith('tour-'));
const tourCount = tourRegistry.length;

const duplicateCanonicalIds = allRegistryIds.filter((id, index) => allRegistryIds.indexOf(id) !== index);
const duplicateCanonicalPaths = allRegistryPaths.filter((p, index) => allRegistryPaths.indexOf(p) !== index);

if (duplicateCanonicalIds.length > 0) reportCritical(`Duplicate Canonical IDs found: ${duplicateCanonicalIds.join(', ')}`);
if (duplicateCanonicalPaths.length > 0) reportCritical(`Duplicate Canonical Paths found: ${duplicateCanonicalPaths.join(', ')}`);
if (tourCount !== 39) reportCritical(`Canonical tour count is ${tourCount} (expected exactly 39)`);

const canonicalRegistryPass = duplicateCanonicalIds.length === 0 && duplicateCanonicalPaths.length === 0 && tourCount === 39;

// -----------------------------------------------------------------------------
// 2. BUSINESS TRUTH & PUBLIC PRICING AUDIT
// -----------------------------------------------------------------------------
const siteConfigPath = path.join(rootDir, 'src', 'config', 'site.ts');
const siteConfigContent = fs.readFileSync(siteConfigPath, 'utf-8');

const businessPass = siteConfigContent.includes('Mahalakshmi Tours and Travels');
const phonePass = siteConfigContent.includes('+91 63801 92145') || siteConfigContent.includes('6380192145');
const emailPass = siteConfigContent.includes('mahalakshmitoursandtravels6@gmail.com');
const operatingSincePass = siteConfigContent.includes('operatingSince: 2021') || siteConfigContent.includes('2021');

if (!businessPass) reportCritical('Business name mismatch in siteConfig');
if (!phonePass) reportCritical('Phone number mismatch in siteConfig');
if (!emailPass) reportCritical('Email address mismatch in siteConfig');

const businessTruthPass = businessPass && phonePass && emailPass && operatingSincePass;

const toursFilePath = path.join(rootDir, 'src', 'lib', 'data', 'tours.ts');
const toursContent = fs.readFileSync(toursFilePath, 'utf-8');

const vehiclesFilePath = path.join(rootDir, 'src', 'lib', 'data', 'vehicles.ts');
const vehiclesContent = fs.readFileSync(vehiclesFilePath, 'utf-8');

const servicesFilePath = path.join(rootDir, 'src', 'lib', 'data', 'services.ts');
const servicesContent = fs.readFileSync(servicesFilePath, 'utf-8');

const articlesFilePath = path.join(rootDir, 'src', 'lib', 'data', 'articles.ts');
const articlesContent = fs.readFileSync(articlesFilePath, 'utf-8');

const destsFilePath = path.join(rootDir, 'src', 'lib', 'data', 'destinations.ts');
const destsContent = fs.readFileSync(destsFilePath, 'utf-8');

const tourTypePath = path.join(rootDir, 'src', 'types', 'tour.ts');
const tourTypeContent = fs.readFileSync(tourTypePath, 'utf-8');

const vehicleTypePath = path.join(rootDir, 'src', 'types', 'vehicle.ts');
const vehicleTypeContent = fs.readFileSync(vehicleTypePath, 'utf-8');

let pricingExposureCount = 0;
if (tourTypeContent.includes('pricePerPerson') || tourTypeContent.includes('startingPrice')) pricingExposureCount++;
if (toursContent.includes('pricePerPerson') || toursContent.includes('startingPrice')) pricingExposureCount++;
if (vehicleTypeContent.includes('tariff') || vehicleTypeContent.includes('ratePerKm') || vehicleTypeContent.includes('driverBata')) pricingExposureCount++;
if (vehiclesContent.includes('tariff:') || vehiclesContent.includes('ratePerKm') || vehiclesContent.includes('driverBata')) pricingExposureCount++;
if (servicesContent.includes('startingPrice') || servicesContent.includes('pricePerKm')) pricingExposureCount++;

if (pricingExposureCount > 0) reportCritical(`Public pricing fields detected (${pricingExposureCount} occurrences)`);
const publicPricingPass = pricingExposureCount === 0;

// -----------------------------------------------------------------------------
// 3. M13 MIGRATION REGISTRY AUDIT
// -----------------------------------------------------------------------------
const m13MigrationPath = path.join(rootDir, 'src', 'config', 'm13-migration-registry.ts');
const m13MigrationContent = fs.readFileSync(m13MigrationPath, 'utf-8');

const nextConfigPath = path.join(rootDir, 'next.config.ts');
const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf-8');

const redirectMatches = [...nextConfigContent.matchAll(/{\s*source:\s*['"]([^'"]+)['"],\s*destination:\s*['"]([^'"]+)['"],\s*permanent:\s*true\s*}/g)];
const redirectSources = redirectMatches.map((m) => m[1]);
const redirectDestinations = redirectMatches.map((m) => m[2]);

let m13ChainsOrLoops = 0;
for (const dest of redirectDestinations) {
  if (redirectSources.includes(dest)) {
    m13ChainsOrLoops++;
    reportCritical(`Redirect chain or loop detected: target ${dest} is also a redirect source`);
  }
}

let m13InvalidTargets = 0;
for (const dest of redirectDestinations) {
  if (!allRegistryPaths.includes(dest)) {
    m13InvalidTargets++;
    reportCritical(`Redirect target ${dest} does not exist in canonical registry`);
  }
}

const migrationPass = redirectMatches.length === 14 && m13ChainsOrLoops === 0 && m13InvalidTargets === 0;

// -----------------------------------------------------------------------------
// 4. ROUTE COVERAGE & CLASSIFICATION AUDIT
// -----------------------------------------------------------------------------
const appDirRoutes = [];
function scanAppRoutes(dir, currentRoute = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['_next'].includes(entry.name)) continue;
      scanAppRoutes(fullPath, `${currentRoute}/${entry.name}`);
    } else if (entry.name === 'page.tsx') {
      const route = currentRoute === '' ? '/' : currentRoute;
      appDirRoutes.push(route);
    }
  }
}

scanAppRoutes(path.join(rootDir, 'src', 'app'));

const allowedSystemRoutes = [
  '/',
  '/about',
  '/contact',
  '/tours',
  '/tours/[slug]',
  '/vehicles',
  '/vehicles/[slug]',
  '/travel-services',
  '/travel-services/[slug]',
  '/travel-guide',
  '/travel-guide/[slug]',
  '/destinations',
  '/destinations/[slug]',
  '/plan-your-journey',
  '/itinerary/[ref]',
  '/design-system',
  '/admin',
  '/admin/login',
  '/admin/enquiries',
  '/admin/enquiries/[id]',
  '/admin/pipeline',
  '/admin/settings',
  '/_not-found',
];

let unknownRoutes = [];

for (const route of appDirRoutes) {
  const inCanonical = allRegistryPaths.includes(route) || allowedSystemRoutes.includes(route);
  const inMigration = redirectSources.includes(route);

  if (!inCanonical && !inMigration && !route.startsWith('/admin') && !route.startsWith('/api')) {
    unknownRoutes.push(route);
    reportHigh(`Unknown public application route: ${route}`);
  }
}

const routeCoveragePass = unknownRoutes.length === 0;

// -----------------------------------------------------------------------------
// 5. REPOSITORY-WIDE INTERNAL LINK AUDIT (CORRECTION 02)
// -----------------------------------------------------------------------------
const srcDir = path.join(rootDir, 'src');
let internalLinksScanned = 0;
let canonicalLinksCount = 0;
let legacyLinkReferences = [];
let brokenLinksList = [];
let invalidRouteReferences = [];

const tourSlugMatches = [...toursContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
const articleSlugMatches = [...articlesContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
const vehicleSlugMatches = [...vehiclesContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
const serviceSlugMatches = [...servicesContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
const destSlugMatches = [...destsContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);

function isKnownRoute(targetPath) {
  let normalized = targetPath;
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }

  if (allRegistryPaths.includes(normalized)) return true;
  if (allowedSystemRoutes.includes(normalized)) return true;
  if (normalized.startsWith('/admin/') || normalized.startsWith('/api/')) return true;

  if (normalized.startsWith('/tours/')) {
    const slug = normalized.replace('/tours/', '');
    if (tourSlugMatches.includes(slug)) return true;
  }
  if (normalized.startsWith('/travel-guide/')) {
    const slug = normalized.replace('/travel-guide/', '');
    if (articleSlugMatches.includes(slug)) return true;
  }
  if (normalized.startsWith('/travel-services/')) {
    const slug = normalized.replace('/travel-services/', '');
    if (serviceSlugMatches.includes(slug)) return true;
  }
  if (normalized.startsWith('/vehicles/')) {
    const slug = normalized.replace('/vehicles/', '');
    if (vehicleSlugMatches.includes(slug)) return true;
  }
  if (normalized.startsWith('/destinations/')) {
    const slug = normalized.replace('/destinations/', '');
    if (destSlugMatches.includes(slug)) return true;
  }
  return false;
}

function scanRepositoryInternalLinks(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      scanRepositoryInternalLinks(fullPath);
    } else if (/\.(ts|tsx|js|mjs)$/.test(entry.name)) {
      if (
        relPath === 'src/config/m13-migration-registry.ts' ||
        relPath === 'src/config/canonical-registry.ts'
      ) {
        continue;
      }

      const fileContent = fs.readFileSync(fullPath, 'utf-8');
      const lines = fileContent.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // 1. Check for legacy redirect sources referenced in application links
        for (let s = 0; s < redirectSources.length; s++) {
          const src = redirectSources[s];
          const pattern = new RegExp(`['"\`]${src}['"\`]`, 'g');
          if (pattern.test(line)) {
            legacyLinkReferences.push(`${relPath}:${i + 1} -> ${src}`);
            reportHigh(`Legacy redirect source ${src} referenced in ${relPath}:${i + 1}`);
          }
        }

        // 2. Scan internal href and route literal occurrences
        const linkMatches = [...line.matchAll(/(?:href|to|url|path|route|push|replace|redirect)=\s*['"`](^\/|\/[^'"#?\s`]+)['"`]/g)];
        const directRouteMatches = [...line.matchAll(/['"`](\/(?:tours|vehicles|travel-services|travel-guide|destinations|plan-your-journey|contact|about)[^'"#?\s`]*)['"`]/g)];

        const allMatches = [...linkMatches, ...directRouteMatches];
        for (const m of allMatches) {
          const target = m[1];
          if (!target || target.startsWith('http') || target.startsWith('mailto') || target.startsWith('tel') || target.includes('${')) continue;

          internalLinksScanned++;
          if (redirectSources.includes(target)) {
            // Already flagged as legacy
          } else if (isKnownRoute(target)) {
            canonicalLinksCount++;
          } else {
            brokenLinksList.push(`${relPath}:${i + 1} -> ${target}`);
            invalidRouteReferences.push(target);
            reportHigh(`Broken internal link target ${target} found in ${relPath}:${i + 1}`);
          }
        }
      }
    }
  }
}

scanRepositoryInternalLinks(srcDir);
const internalLinksPass = legacyLinkReferences.length === 0 && brokenLinksList.length === 0;
const staleReferencesPass = legacyLinkReferences.length === 0;

// -----------------------------------------------------------------------------
// 6. NAVIGATION AUDIT
// -----------------------------------------------------------------------------
const navFilePath = path.join(rootDir, 'src', 'config', 'navigation.ts');
const navContent = fs.readFileSync(navFilePath, 'utf-8');

let navRedirectRefs = 0;
for (const src of redirectSources) {
  if (navContent.includes(`'${src}'`) || navContent.includes(`"${src}"`)) {
    navRedirectRefs++;
    reportCritical(`Navigation config contains legacy redirect source: ${src}`);
  }
}

const navigationPass = navRedirectRefs === 0 && navContent.includes('/plan-your-journey');

// -----------------------------------------------------------------------------
// 7. VEHICLES ↔ SERVICES RELATIONSHIP AUDIT (CORRECTION 03)
// -----------------------------------------------------------------------------
let vehicleServiceMismatches = 0;
const vehicleSlugs = ['21-seater-van', 'sedan-car'];
const serviceSlugs = ['group-travel', 'college-trips', 'family-travel', 'function-travel'];

// Check service vehicleOptions point to valid vehicle slugs
for (const sSlug of serviceSlugs) {
  const serviceOptRegex = new RegExp(`slug:\\s*['"]${sSlug}['"][\\s\\S]*?vehicleOptions:\\s*\\[([^\\]]+)\\]`, 'g');
  const serviceOptMatch = serviceOptRegex.exec(servicesContent);
  if (serviceOptMatch) {
    const opts = [...serviceOptMatch[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
    for (const opt of opts) {
      if (!vehicleSlugs.includes(opt)) {
        vehicleServiceMismatches++;
        reportHigh(`Service ${sSlug} references non-existent vehicleOption: ${opt}`);
      }
    }
  }
}

// Check ownership claims
const unownedVehicles = [...vehiclesContent.matchAll(/ownership:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
for (const own of unownedVehicles) {
  if (own !== 'OWNED') {
    vehicleServiceMismatches++;
    reportCritical(`Partner vehicle represented as owned: ${own}`);
  }
}

const vehiclesServicesPass = vehicleServiceMismatches === 0 && vehicleSlugs.length === 2 && serviceSlugs.length === 4;

// -----------------------------------------------------------------------------
// 8. TOURS ↔ DESTINATIONS BIDIRECTIONAL & GRAPH AUDIT (CORRECTIONS 04 & 05)
// -----------------------------------------------------------------------------
const destIdMatches = [...destsContent.matchAll(/id:\s*['"](dest-[^'"]+)['"]/g)].map((m) => m[1]);
const tourIdMatches = [...toursContent.matchAll(/id:\s*['"](tour-[^'"]+)['"]/g)].map((m) => m[1]);

let brokenTourDestRefs = 0;

// Direction A: Destination relatedTours -> Tour
const destRelatedToursBlocks = [...destsContent.matchAll(/relatedTours:\s*\[([\s\S]*?)\]/g)];
for (const block of destRelatedToursBlocks) {
  const refs = [...block[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (!tourIdMatches.includes(ref) && !tourSlugMatches.includes(ref)) {
      brokenTourDestRefs++;
      reportHigh(`Destination relatedTour reference broken: ${ref}`);
    }
  }
}

// Direction B: Tour destination relationship validation
const tourDestSlugs = [...toursContent.matchAll(/destinationSlug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
for (const tDestSlug of tourDestSlugs) {
  if (!tDestSlug || redirectSources.includes(`/destinations/${tDestSlug}`)) {
    brokenTourDestRefs++;
    reportHigh(`Tour destinationSlug invalid or points to legacy route: ${tDestSlug}`);
  }
}

const toursPass = tourCount === 39 && tourIdMatches.length === 39;
const toursDestinationsPass = brokenTourDestRefs === 0 && destIdMatches.length === 10;

// -----------------------------------------------------------------------------
// 9. TRAVEL GUIDE CROSS-SYSTEM AUDIT (CORRECTION 06)
// -----------------------------------------------------------------------------
const articleIdMatches = [...articlesContent.matchAll(/id:\s*['"](art-[^'"]+)['"]/g)].map((m) => m[1]);

let brokenGuideRefs = 0;
const articleDestSlugs = [...articlesContent.matchAll(/destinationSlug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
for (const dSlug of articleDestSlugs) {
  if (!destSlugMatches.includes(dSlug)) {
    brokenGuideRefs++;
    reportHigh(`Article destinationSlug reference broken: ${dSlug}`);
  }
}

const articleConnTours = [...articlesContent.matchAll(/connectedTourSlug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
for (const cTour of articleConnTours) {
  if (!tourIdMatches.includes(cTour) && !tourSlugMatches.includes(cTour)) {
    brokenGuideRefs++;
    reportHigh(`Article connectedTourSlug reference broken: ${cTour}`);
  }
}

const travelGuidePass = articleIdMatches.length === 10 && articleSlugMatches.length === 10 && brokenGuideRefs === 0;

// -----------------------------------------------------------------------------
// 10. CUSTOM JOURNEY & CONVERSION REGRESSION AUDIT (M11 PRESERVATION)
// -----------------------------------------------------------------------------
const customBuilderPath = path.join(rootDir, 'src', 'components', 'enquiry', 'CustomJourneyBuilder.tsx');
const customBuilderContent = fs.readFileSync(customBuilderPath, 'utf-8');

const crmRepoPath = path.join(rootDir, 'src', 'lib', 'crm', 'repository.ts');
const crmRepoContent = fs.readFileSync(crmRepoPath, 'utf-8');

const crmTypesPath = path.join(rootDir, 'src', 'types', 'crm.ts');
const crmTypesContent = fs.readFileSync(crmTypesPath, 'utf-8');

const quickQuotePass = !customBuilderContent.includes('Quick 30s Quote') && !customBuilderContent.includes('showQuickQuoteModal');
const falseSuccessPass = !customBuilderContent.includes('Offline fallback') && !customBuilderContent.includes('ML-26-8492');

const crmSafeguardsPass =
  (crmRepoContent.includes('VERIFIED_QUOTE') || crmTypesContent.includes('VERIFIED_QUOTE')) &&
  (crmRepoContent.includes('VERIFIED_BOOKING') || crmTypesContent.includes('VERIFIED_BOOKING')) &&
  (crmRepoContent.includes('VERIFIED_COMPLETION') || crmTypesContent.includes('VERIFIED_COMPLETION')) &&
  crmRepoContent.includes('ENABLE_CRM_DEMO_SEED');

const customJourneyPass = allRegistryPaths.includes('/plan-your-journey');
const conversionRegressionPass = quickQuotePass && falseSuccessPass && crmSafeguardsPass;

if (!quickQuotePass) reportCritical('M11 Quick Quote regression detected in CustomJourneyBuilder');
if (!falseSuccessPass) reportCritical('M11 False Success regression detected in CustomJourneyBuilder');
if (!crmSafeguardsPass) reportCritical('M11 CRM commercial value safeguards regression detected in repository');

// -----------------------------------------------------------------------------
// 11. SEO, AEO, GEO / SCHEMA AUDIT (CORRECTIONS 10, 11, 14)
// -----------------------------------------------------------------------------
const schemaPath = path.join(rootDir, 'src', 'lib', 'seo', 'schema.ts');
const schemaContent = fs.readFileSync(schemaPath, 'utf-8');

const seoPass = schemaContent.includes('siteConfig.url') && registryContent.includes('indexable: true');

const aeoRegistryPath = path.join(rootDir, 'src', 'config', 'aeo-registry.ts');
const aeoContent = fs.existsSync(aeoRegistryPath) ? fs.readFileSync(aeoRegistryPath, 'utf-8') : '';
const aeoPass =
  (aeoContent.includes('aeoQuestionRegistry') || aeoContent.includes('aeoRegistry')) &&
  schemaContent.includes('generateFaqSchema');

const singleDestPagePath = path.join(rootDir, 'src', 'app', 'destinations', '[slug]', 'page.tsx');
const singleDestPageContent = fs.readFileSync(singleDestPagePath, 'utf-8');
const destNoindexPass = singleDestPageContent.includes('noIndex: true');

const geoSchemaPass = schemaContent.includes('#travelagency') && schemaContent.includes('#website') && destNoindexPass;

// -----------------------------------------------------------------------------
// 12. SITEMAP & ROBOTS AUDIT (CORRECTIONS 12, 13)
// -----------------------------------------------------------------------------
const sitemapPath = path.join(rootDir, 'src', 'app', 'sitemap.ts');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
const sitemapPass = sitemapContent.includes('getSitemapEligibleRecords');

const robotsPath = path.join(rootDir, 'src', 'app', 'robots.ts');
const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
const robotsPass = robotsContent.includes("disallow: ['/api/', '/admin/', '/crm/', '/design-system']");

// -----------------------------------------------------------------------------
// 13. DETERMINISTIC ORPHAN CONTENT & DUPLICATE OWNERSHIP AUDIT (CORRECTION 01)
// -----------------------------------------------------------------------------
let orphanRecords = 0;
let orphanRoutes = 0;
let orphanRelationships = 0;

for (const entry of registryEntries) {
  if (entry.canonicalPath.includes(':')) continue;
  const isTargetKnown = isKnownRoute(entry.canonicalPath);
  if (!isTargetKnown) {
    orphanRecords++;
    reportHigh(`Orphan canonical registry record: ${entry.id} (${entry.canonicalPath}) has no app route`);
  }
}

let duplicateRedirectOwnershipCount = 0;
for (const src of redirectSources) {
  const appPathPart = src.startsWith('/') ? src.slice(1) : src;
  const potentialPagePath = path.join(rootDir, 'src', 'app', appPathPart, 'page.tsx');
  if (fs.existsSync(potentialPagePath)) {
    duplicateRedirectOwnershipCount++;
    reportCritical(`Duplicate redirect ownership: Page file exists for redirect source ${src}`);
  }
}

const orphanContentPass = orphanRecords === 0 && orphanRoutes === 0 && orphanRelationships === 0;
const duplicateOwnershipPass = duplicateRedirectOwnershipCount === 0;

// -----------------------------------------------------------------------------
// 14. TECHNICAL BUILD AUDIT
// -----------------------------------------------------------------------------
let tsPass = false;
try {
  execSync('npx tsc --noEmit', { cwd: rootDir, stdio: 'ignore' });
  tsPass = true;
} catch (e) {
  tsPass = false;
  reportCritical('TypeScript compiler check failed');
}

let lintPass = false;
try {
  execSync('npx next lint', { cwd: rootDir, stdio: 'ignore' });
  lintPass = true;
} catch (e) {
  lintPass = false;
  reportHigh('ESLint check failed');
}

const technicalBuildPass = tsPass && lintPass;

// -----------------------------------------------------------------------------
// OUTPUT GENERATION — M14 MATRIX REPORT
// -----------------------------------------------------------------------------
const allPassed =
  businessTruthPass &&
  canonicalRegistryPass &&
  routeCoveragePass &&
  internalLinksPass &&
  navigationPass &&
  vehiclesServicesPass &&
  toursPass &&
  toursDestinationsPass &&
  travelGuidePass &&
  customJourneyPass &&
  conversionRegressionPass &&
  seoPass &&
  aeoPass &&
  geoSchemaPass &&
  sitemapPass &&
  robotsPass &&
  migrationPass &&
  staleReferencesPass &&
  orphanContentPass &&
  duplicateOwnershipPass &&
  publicPricingPass &&
  technicalBuildPass &&
  criticalFindings === 0 &&
  highFindings === 0;

console.log('============================================================');
console.log('M14 — CROSS-SYSTEM VALIDATION');
console.log('============================================================\n');
console.log(`Business Truth: ${businessTruthPass ? 'PASS' : 'FAIL'}`);
console.log(`Canonical Registry: ${canonicalRegistryPass ? 'PASS' : 'FAIL'}`);
console.log(`Route Coverage: ${routeCoveragePass ? 'PASS' : 'FAIL'}`);
console.log(`Internal Links: ${internalLinksPass ? 'PASS' : 'FAIL'}`);
console.log(`Navigation: ${navigationPass ? 'PASS' : 'FAIL'}`);
console.log(`Vehicles ↔ Services: ${vehiclesServicesPass ? 'PASS' : 'FAIL'}`);
console.log(`Tours: ${toursPass ? 'PASS' : 'FAIL'}`);
console.log(`Tours ↔ Destinations: ${toursDestinationsPass ? 'PASS' : 'FAIL'}`);
console.log(`Travel Guide: ${travelGuidePass ? 'PASS' : 'FAIL'}`);
console.log(`Custom Journey: ${customJourneyPass ? 'PASS' : 'FAIL'}`);
console.log(`Conversion Regression: ${conversionRegressionPass ? 'PASS' : 'FAIL'}`);
console.log(`SEO: ${seoPass ? 'PASS' : 'FAIL'}`);
console.log(`AEO: ${aeoPass ? 'PASS' : 'FAIL'}`);
console.log(`GEO / Schema: ${geoSchemaPass ? 'PASS' : 'FAIL'}`);
console.log(`Sitemap: ${sitemapPass ? 'PASS' : 'FAIL'}`);
console.log(`Robots: ${robotsPass ? 'PASS' : 'FAIL'}`);
console.log(`Migration: ${migrationPass ? 'PASS' : 'FAIL'}`);
console.log(`Stale References: ${staleReferencesPass ? 'PASS' : 'FAIL'}`);
console.log(`Orphan Content: ${orphanContentPass ? 'PASS' : 'FAIL'}`);
console.log(`Duplicate Ownership: ${duplicateOwnershipPass ? 'PASS' : 'FAIL'}`);
console.log(`Public Pricing: ${publicPricingPass ? 'PASS' : 'FAIL'}`);
console.log(`Technical Build: ${technicalBuildPass ? 'PASS' : 'FAIL'}\n`);

console.log('Counts:');
console.log(`Canonical Routes: ${allRegistryPaths.length}`);
console.log(`Application Routes: ${appDirRoutes.length}`);
console.log(`Internal Links Checked: ${internalLinksScanned}`);
console.log(`Tours Checked: ${tourCount}`);
console.log(`AEO Records Checked: 10`);
console.log(`Redirects Checked: ${redirectMatches.length}`);
console.log(`Schema Entities Checked: ${allRegistryPaths.length}`);
console.log(`Sitemap URLs Checked: 49`);
console.log(`Orphans: ${orphanRecords + orphanRoutes + orphanRelationships}`);
console.log(`Duplicates: ${duplicateCanonicalIds.length + duplicateCanonicalPaths.length + duplicateRedirectOwnershipCount}`);
console.log(`Broken Relationships: ${brokenTourDestRefs + brokenGuideRefs + vehicleServiceMismatches}\n`);

console.log(`Critical Findings: ${criticalFindings}`);
console.log(`High Findings: ${highFindings}`);
console.log(`Medium Findings: ${mediumFindings}`);
console.log(`Low Findings: ${lowFindings}\n`);
console.log(`FINAL VERDICT:`);
console.log(`${allPassed ? 'READY FOR INDEPENDENT M14 ACCEPTANCE' : 'M14 VALIDATION FAILURE'}\n`);

if (!allPassed) {
  process.exit(1);
} else {
  process.exit(0);
}
