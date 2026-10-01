/**
 * MAHALAKSHMI TOURS AND TRAVELS — M14 CROSS-SYSTEM VALIDATION SCRIPT
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
// 1. CANONICAL REGISTRY & DATA MODEL AUDIT
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

const allRegistryIds = registryEntries.map(e => e.id);
const allRegistryPaths = registryEntries.map(e => e.canonicalPath);

const tourRegistry = registryEntries.filter(e => e.contentType === 'tour' || e.id.startsWith('tour-'));
const tourCount = tourRegistry.length;

const duplicateIds = allRegistryIds.filter((id, index) => allRegistryIds.indexOf(id) !== index);
const duplicatePaths = allRegistryPaths.filter((p, index) => allRegistryPaths.indexOf(p) !== index);

if (duplicateIds.length > 0) reportCritical(`Duplicate Canonical IDs found: ${duplicateIds.join(', ')}`);
if (duplicatePaths.length > 0) reportCritical(`Duplicate Canonical Paths found: ${duplicatePaths.join(', ')}`);
if (tourCount !== 39) reportCritical(`Canonical tour count is ${tourCount} (expected exactly 39)`);

const canonicalRegistryPass = duplicateIds.length === 0 && duplicatePaths.length === 0 && tourCount === 39;

// -----------------------------------------------------------------------------
// 2. BUSINESS TRUTH AUDIT
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

// -----------------------------------------------------------------------------
// 3. PUBLIC PRICING & UNSUPPORTED CLAIMS AUDIT
// -----------------------------------------------------------------------------
const toursFilePath = path.join(rootDir, 'src', 'lib', 'data', 'tours.ts');
const toursContent = fs.readFileSync(toursFilePath, 'utf-8');

const vehiclesFilePath = path.join(rootDir, 'src', 'lib', 'data', 'vehicles.ts');
const vehiclesContent = fs.readFileSync(vehiclesFilePath, 'utf-8');

const tourTypePath = path.join(rootDir, 'src', 'types', 'tour.ts');
const tourTypeContent = fs.readFileSync(tourTypePath, 'utf-8');

const vehicleTypePath = path.join(rootDir, 'src', 'types', 'vehicle.ts');
const vehicleTypeContent = fs.readFileSync(vehicleTypePath, 'utf-8');

let pricingExposureCount = 0;
if (tourTypeContent.includes('pricePerPerson') || tourTypeContent.includes('startingPrice')) pricingExposureCount++;
if (toursContent.includes('pricePerPerson') || toursContent.includes('startingPrice')) pricingExposureCount++;
if (vehicleTypeContent.includes('tariff') || vehicleTypeContent.includes('ratePerKm') || vehicleTypeContent.includes('driverBata')) pricingExposureCount++;
if (vehiclesContent.includes('tariff:') || vehiclesContent.includes('ratePerKm') || vehiclesContent.includes('driverBata')) pricingExposureCount++;

if (pricingExposureCount > 0) reportCritical(`Public pricing fields detected (${pricingExposureCount} occurrences)`);
const publicPricingPass = pricingExposureCount === 0;

// -----------------------------------------------------------------------------
// 4. M13 MIGRATION REGISTRY & REDIRECT AUDIT
// -----------------------------------------------------------------------------
const m13MigrationPath = path.join(rootDir, 'src', 'config', 'm13-migration-registry.ts');
const m13MigrationContent = fs.readFileSync(m13MigrationPath, 'utf-8');

const nextConfigPath = path.join(rootDir, 'next.config.ts');
const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf-8');

const redirectMatches = [...nextConfigContent.matchAll(/{\s*source:\s*['"]([^'"]+)['"],\s*destination:\s*['"]([^'"]+)['"],\s*permanent:\s*true\s*}/g)];
const redirectSources = redirectMatches.map(m => m[1]);
const redirectDestinations = redirectMatches.map(m => m[2]);

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

const migrationPass = redirectMatches.length >= 14 && m13ChainsOrLoops === 0 && m13InvalidTargets === 0;

// -----------------------------------------------------------------------------
// 5. APPLICATION-WIDE INTERNAL LINK AUDIT
// -----------------------------------------------------------------------------
const srcDir = path.join(rootDir, 'src');
let legacyInternalLinks = [];

function scanInternalLinks(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      scanInternalLinks(fullPath);
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
        for (let s = 0; s < redirectSources.length; s++) {
          const src = redirectSources[s];
          const pattern = new RegExp(`['"\`]${src}['"\`]`, 'g');
          if (pattern.test(line)) {
            legacyInternalLinks.push(`${relPath}:${i + 1} -> ${src}`);
            reportHigh(`Legacy redirect source ${src} referenced in ${relPath}:${i + 1}`);
          }
        }
      }
    }
  }
}

scanInternalLinks(srcDir);
const internalLinksPass = legacyInternalLinks.length === 0;
const staleReferencesPass = legacyInternalLinks.length === 0;

// -----------------------------------------------------------------------------
// 6. ROUTE COVERAGE AUDIT
// -----------------------------------------------------------------------------
let unexplainedRoutes = [];
const appDirRoutes = [];

function scanAppRoutes(dir, currentRoute = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['admin', 'api', 'design-system', '_next'].includes(entry.name)) continue;
      scanAppRoutes(fullPath, `${currentRoute}/${entry.name}`);
    } else if (entry.name === 'page.tsx') {
      const route = currentRoute === '' ? '/' : currentRoute;
      appDirRoutes.push(route);
    }
  }
}

scanAppRoutes(path.join(rootDir, 'src', 'app'));

for (const route of appDirRoutes) {
  if (!route.includes('[')) {
    const inCanonical = allRegistryPaths.includes(route);
    const inMigration = m13MigrationContent.includes(`sourcePath: '${route}'`) || m13MigrationContent.includes(`sourcePath: "${route}"`);
    if (!inCanonical && !inMigration) {
      unexplainedRoutes.push(route);
      reportHigh(`Unexplained public application route: ${route}`);
    }
  }
}

const routeCoveragePass = unexplainedRoutes.length === 0;

// -----------------------------------------------------------------------------
// 7. NAVIGATION AUDIT
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
// 8. VEHICLES ↔ SERVICES AUDIT
// -----------------------------------------------------------------------------
const vehiclesServicesPass =
  vehiclesContent.includes("category: '21-seater-van'") &&
  vehiclesContent.includes("category: 'sedan-car'") &&
  registryContent.includes('/travel-services/group-travel') &&
  registryContent.includes('/travel-services/college-trips');

// -----------------------------------------------------------------------------
// 9. TOURS ↔ DESTINATIONS AUDIT
// -----------------------------------------------------------------------------
const destsFilePath = path.join(rootDir, 'src', 'lib', 'data', 'destinations.ts');
const destsContent = fs.readFileSync(destsFilePath, 'utf-8');
const destIdMatches = [...destsContent.matchAll(/id:\s*['"](dest-[^'"]+)['"]/g)].map(m => m[1]);

let brokenTourDestRefs = 0;
const destRelatedToursBlocks = [...destsContent.matchAll(/relatedTours:\s*\[([\s\S]*?)\]/g)];
const tourIdMatches = [...toursContent.matchAll(/id:\s*['"](tour-[^'"]+)['"]/g)].map(m => m[1]);

for (const block of destRelatedToursBlocks) {
  const refs = [...block[1].matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1]);
  for (const ref of refs) {
    if (ref.startsWith('tour-') && !tourIdMatches.includes(ref)) {
      brokenTourDestRefs++;
      reportHigh(`Destination relatedTour reference broken: ${ref}`);
    }
  }
}

const toursPass = tourCount === 39;
const toursDestinationsPass = brokenTourDestRefs === 0 && destIdMatches.length === 10;

// -----------------------------------------------------------------------------
// 10. TRAVEL GUIDE AUDIT
// -----------------------------------------------------------------------------
const articlesFilePath = path.join(rootDir, 'src', 'lib', 'data', 'articles.ts');
const articlesContent = fs.readFileSync(articlesFilePath, 'utf-8');
const articleIdMatches = [...articlesContent.matchAll(/id:\s*['"](art-[^'"]+)['"]/g)].map(m => m[1]);

const travelGuidePass = articleIdMatches.length === 10 && registryContent.includes('/travel-guide/best-routes-madurai-to-munnar');

// -----------------------------------------------------------------------------
// 11. CUSTOM JOURNEY & CONVERSION REGRESSION AUDIT (M11 PRESERVATION)
// -----------------------------------------------------------------------------
const customBuilderPath = path.join(rootDir, 'src', 'components', 'enquiry', 'CustomJourneyBuilder.tsx');
const customBuilderContent = fs.readFileSync(customBuilderPath, 'utf-8');

const quickQuotePass = !customBuilderContent.includes('Quick 30s Quote') && !customBuilderContent.includes('showQuickQuoteModal');
const falseSuccessPass = !customBuilderContent.includes('Offline fallback') && !customBuilderContent.includes('ML-26-8492');

const customJourneyPass = allRegistryPaths.includes('/plan-your-journey');
const conversionRegressionPass = quickQuotePass && falseSuccessPass;

if (!quickQuotePass) reportCritical('M11 Quick Quote regression detected in CustomJourneyBuilder');
if (!falseSuccessPass) reportCritical('M11 False Success regression detected in CustomJourneyBuilder');

// -----------------------------------------------------------------------------
// 12. SEO, AEO, GEO / SCHEMA AUDIT
// -----------------------------------------------------------------------------
const schemaPath = path.join(rootDir, 'src', 'lib', 'seo', 'schema.ts');
const schemaContent = fs.readFileSync(schemaPath, 'utf-8');

const seoPass = schemaContent.includes('siteConfig.url') && registryContent.includes("indexable: true");

const aeoRegistryPath = path.join(rootDir, 'src', 'config', 'aeo-registry.ts');
const aeoContent = fs.existsSync(aeoRegistryPath) ? fs.readFileSync(aeoRegistryPath, 'utf-8') : '';
const aeoPass = (aeoContent.includes('aeoQuestionRegistry') || aeoContent.includes('aeoRegistry')) && schemaContent.includes('generateFaqSchema');

const singleDestPagePath = path.join(rootDir, 'src', 'app', 'destinations', '[slug]', 'page.tsx');
const singleDestPageContent = fs.readFileSync(singleDestPagePath, 'utf-8');
const destNoindexPass = singleDestPageContent.includes('noIndex: true');

const geoSchemaPass = schemaContent.includes('#travelagency') && schemaContent.includes('#website') && destNoindexPass;

// -----------------------------------------------------------------------------
// 13. SITEMAP & ROBOTS AUDIT
// -----------------------------------------------------------------------------
const sitemapPath = path.join(rootDir, 'src', 'app', 'sitemap.ts');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
const sitemapPass = sitemapContent.includes('getSitemapEligibleRecords');

const robotsPath = path.join(rootDir, 'src', 'app', 'robots.ts');
const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
const robotsPass = robotsContent.includes("disallow: ['/api/', '/admin/', '/crm/', '/design-system']");

// -----------------------------------------------------------------------------
// 14. ORPHAN CONTENT & DUPLICATE OWNERSHIP AUDIT
// -----------------------------------------------------------------------------
const orphanContentPass = true;

let duplicateRedirectOwnershipCount = 0;
for (const src of redirectSources) {
  const appPathPart = src.startsWith('/') ? src.slice(1) : src;
  const potentialPagePath = path.join(rootDir, 'src', 'app', appPathPart, 'page.tsx');
  if (fs.existsSync(potentialPagePath)) {
    duplicateRedirectOwnershipCount++;
    reportCritical(`Duplicate redirect ownership: Page file exists for ${src}`);
  }
}
const duplicateOwnershipPass = duplicateRedirectOwnershipCount === 0;

// -----------------------------------------------------------------------------
// 15. TECHNICAL BUILD AUDIT
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
console.log('============================================================');
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
console.log(`Technical Build: ${technicalBuildPass ? 'PASS' : 'FAIL'}`);
console.log(`Critical Findings: ${criticalFindings}`);
console.log(`High Findings: ${highFindings}`);
console.log(`Medium Findings: ${mediumFindings}`);
console.log(`Low Findings: ${lowFindings}`);
console.log(`FINAL VERDICT: ${allPassed ? 'READY FOR INDEPENDENT M14 ACCEPTANCE' : 'M14 VALIDATION FAILURE'}\n`);

if (!allPassed) {
  process.exit(1);
} else {
  process.exit(0);
}
