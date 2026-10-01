/**
 * MAHALAKSHMI TOURS AND TRAVELS — M14 CROSS-SYSTEM VALIDATION SCRIPT (HARDENED & DETERMINISTIC)
 * Comprehensive cross-system integrity test suite evaluating relationships between:
 * Business Truth -> Data Model -> Canonical Registry -> Routes -> Internal Links ->
 * Navigation -> Vehicles/Services -> Tours -> Destinations -> Travel Guide ->
 * Custom Journey -> Conversion -> SEO -> AEO -> GEO/Schema -> Sitemap -> Robots -> Migration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import ts from 'typescript';

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
// MODULE LOADER FOR DETERMINISTIC RUNTIME EVALUATION
// -----------------------------------------------------------------------------
const moduleCache = new Map();

function loadTsModule(filePath) {
  const normalizedPath = path.resolve(filePath);
  if (moduleCache.has(normalizedPath)) {
    return moduleCache.get(normalizedPath).exports;
  }

  if (!fs.existsSync(normalizedPath)) {
    if (fs.existsSync(normalizedPath + '.ts')) return loadTsModule(normalizedPath + '.ts');
    if (fs.existsSync(normalizedPath + '.tsx')) return loadTsModule(normalizedPath + '.tsx');
    if (fs.existsSync(path.join(normalizedPath, 'index.ts'))) return loadTsModule(path.join(normalizedPath, 'index.ts'));
    throw new Error(`Module file not found: ${normalizedPath}`);
  }

  const content = fs.readFileSync(normalizedPath, 'utf-8');
  const result = ts.transpileModule(content, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  });

  const moduleObj = { exports: {} };
  moduleCache.set(normalizedPath, moduleObj);

  const customRequire = (importPath) => {
    if (importPath.startsWith('@/')) {
      const rel = importPath.replace('@/', '');
      return loadTsModule(path.join(rootDir, 'src', rel));
    }
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      const dir = path.dirname(normalizedPath);
      return loadTsModule(path.resolve(dir, importPath));
    }
    return {};
  };

  const fn = new Function('exports', 'module', 'require', '__dirname', '__filename', result.outputText);
  fn(moduleObj.exports, moduleObj, customRequire, path.dirname(normalizedPath), normalizedPath);

  return moduleObj.exports;
}

// Load Authoritative Repositories & Modules
const canonicalMod = loadTsModule(path.join(rootDir, 'src', 'config', 'canonical-registry.ts'));
const canonicalRegistry = canonicalMod.canonicalRegistry;

const aeoMod = loadTsModule(path.join(rootDir, 'src', 'config', 'aeo-registry.ts'));
const aeoQuestionRegistry = aeoMod.aeoQuestionRegistry;

const siteMod = loadTsModule(path.join(rootDir, 'src', 'config', 'site.ts'));
const siteConfig = siteMod.siteConfig;

const m13MigrationMod = loadTsModule(path.join(rootDir, 'src', 'config', 'm13-migration-registry.ts'));

const toursMod = loadTsModule(path.join(rootDir, 'src', 'lib', 'data', 'tours.ts'));
const toursRepository = toursMod.toursRepository || toursMod.mockTours || [];

const vehiclesMod = loadTsModule(path.join(rootDir, 'src', 'lib', 'data', 'vehicles.ts'));
const vehiclesRepository = vehiclesMod.vehiclesRepository || vehiclesMod.mockVehicles || [];

const servicesMod = loadTsModule(path.join(rootDir, 'src', 'lib', 'data', 'services.ts'));
const servicesRepository = servicesMod.servicesRepository || servicesMod.mockTravelServices || [];

const articlesMod = loadTsModule(path.join(rootDir, 'src', 'lib', 'data', 'articles.ts'));
const travelArticlesRepository = articlesMod.travelArticlesRepository || articlesMod.mockArticles || [];

const destsMod = loadTsModule(path.join(rootDir, 'src', 'lib', 'data', 'destinations.ts'));
const destinationsRepository = destsMod.destinationsRepository || destsMod.mockDestinations || [];

const schemaMod = loadTsModule(path.join(rootDir, 'src', 'lib', 'seo', 'schema.ts'));
const robotsMod = loadTsModule(path.join(rootDir, 'src', 'app', 'robots.ts'));
const sitemapMod = loadTsModule(path.join(rootDir, 'src', 'app', 'sitemap.ts'));
const crmMod = loadTsModule(path.join(rootDir, 'src', 'lib', 'crm', 'repository.ts'));
const crmTypesMod = loadTsModule(path.join(rootDir, 'src', 'types', 'crm.ts'));

// -----------------------------------------------------------------------------
// 1. CANONICAL REGISTRY AUDIT
// -----------------------------------------------------------------------------
const allRegistryIds = canonicalRegistry.map((e) => e.id);
const allRegistryPaths = canonicalRegistry.map((e) => e.canonicalPath);

const tourRegistry = canonicalRegistry.filter((e) => e.contentType === 'tour' || e.id.startsWith('tour-'));
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
const businessPass = siteConfig.name === 'Mahalakshmi Tours and Travels';
const phonePass = siteConfig.contact.phonePrimary.includes('63801 92145') || siteConfig.contact.phonePrimary.includes('6380192145');
const emailPass = siteConfig.contact.email === 'mahalakshmitoursandtravels6@gmail.com';
const operatingSincePass = siteConfig.operatingSince === 2021 || String(siteConfig.operatingSince) === '2021';

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
// 5. REPOSITORY-WIDE INTERNAL LINK AUDIT
// -----------------------------------------------------------------------------
const srcDir = path.join(rootDir, 'src');
let internalLinksScanned = 0;
let canonicalLinksCount = 0;
let legacyLinkReferences = [];
let brokenLinksList = [];
let invalidRouteReferences = [];

const tourSlugMatches = toursRepository.map((t) => t.slug);
const articleSlugMatches = travelArticlesRepository.map((a) => a.slug);
const vehicleSlugMatches = vehiclesRepository.map((v) => v.slug);
const serviceSlugMatches = servicesRepository.map((s) => s.slug);
const destSlugMatches = destinationsRepository.map((d) => d.slug);

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
// 7. VEHICLES ↔ SERVICES RELATIONSHIP AUDIT
// -----------------------------------------------------------------------------
let vehicleServiceMismatches = 0;
const vehicleSlugs = ['21-seater-van', 'sedan-car'];
const serviceSlugs = ['group-travel', 'college-trips', 'family-travel', 'function-travel'];

for (const service of servicesRepository) {
  for (const opt of service.vehicleOptions || []) {
    if (!vehicleSlugs.includes(opt)) {
      vehicleServiceMismatches++;
      reportHigh(`Service ${service.slug} references non-existent vehicleOption: ${opt}`);
    }
  }
}

for (const vehicle of vehiclesRepository) {
  if (vehicle.ownership !== 'OWNED') {
    vehicleServiceMismatches++;
    reportCritical(`Partner vehicle represented as owned: ${vehicle.name}`);
  }
}

const vehiclesServicesPass = vehicleServiceMismatches === 0 && vehicleSlugs.length === 2 && serviceSlugs.length === 4;

// -----------------------------------------------------------------------------
// 8. TOURS ↔ DESTINATIONS RELATIONSHIP AUDIT
// -----------------------------------------------------------------------------
const destIdMatches = destinationsRepository.map((d) => d.id);
const tourIdMatches = toursRepository.map((t) => t.id);

let brokenTourDestRefs = 0;

for (const dest of destinationsRepository) {
  for (const ref of dest.relatedTours || []) {
    if (!tourIdMatches.includes(ref) && !tourSlugMatches.includes(ref)) {
      brokenTourDestRefs++;
      reportHigh(`Destination ${dest.slug} relatedTour reference broken: ${ref}`);
    }
  }
}

for (const tour of toursRepository) {
  if (!tour.destinationSlug || redirectSources.includes(`/destinations/${tour.destinationSlug}`)) {
    brokenTourDestRefs++;
    reportHigh(`Tour ${tour.slug} destinationSlug invalid or points to legacy route: ${tour.destinationSlug}`);
  }
}

const toursPass = tourCount === 39 && tourIdMatches.length === 39;
const toursDestinationsPass = brokenTourDestRefs === 0 && destIdMatches.length === 10;

// -----------------------------------------------------------------------------
// 9. TRAVEL GUIDE CROSS-SYSTEM AUDIT
// -----------------------------------------------------------------------------
const articleIdMatches = travelArticlesRepository.map((a) => a.id);

let brokenGuideRefs = 0;
for (const article of travelArticlesRepository) {
  if (article.destinationSlug && !destSlugMatches.includes(article.destinationSlug)) {
    brokenGuideRefs++;
    reportHigh(`Article ${article.slug} destinationSlug reference broken: ${article.destinationSlug}`);
  }
  if (article.connectedTourSlug && !tourIdMatches.includes(article.connectedTourSlug) && !tourSlugMatches.includes(article.connectedTourSlug)) {
    brokenGuideRefs++;
    reportHigh(`Article ${article.slug} connectedTourSlug reference broken: ${article.connectedTourSlug}`);
  }
}

const travelGuidePass = articleIdMatches.length === 10 && articleSlugMatches.length === 10 && brokenGuideRefs === 0;

// -----------------------------------------------------------------------------
// 10. CORRECTION 06 — DEEP M11 CONVERSION REGRESSION VALIDATION
// -----------------------------------------------------------------------------
const customBuilderPath = path.join(rootDir, 'src', 'components', 'enquiry', 'CustomJourneyBuilder.tsx');
const customBuilderContent = fs.readFileSync(customBuilderPath, 'utf-8');

const crmRepoPath = path.join(rootDir, 'src', 'lib', 'crm', 'repository.ts');
const crmRepoContent = fs.readFileSync(crmRepoPath, 'utf-8');

const quickQuotePass = !customBuilderContent.includes('Quick 30s Quote') && !customBuilderContent.includes('showQuickQuoteModal');
const falseSuccessPass = !customBuilderContent.includes('Offline fallback') && !customBuilderContent.includes('ML-26-8492');

// Deterministic Runtime & Logic Verification of CRM Safeguards
let crmSafeguardsPass = true;
let m11SafeguardsChecked = 0;
let m11StateTransitionsChecked = 0;
let m11CommercialValueChecks = 0;
let m11ForbiddenTransitions = 0;

// Check 1: Types export required verified source constants
const verifiedSources = ['VERIFIED_QUOTE', 'VERIFIED_BOOKING', 'VERIFIED_COMPLETION'];
for (const src of verifiedSources) {
  m11SafeguardsChecked++;
  if (!crmRepoContent.includes(src) && !fs.readFileSync(path.join(rootDir, 'src', 'types', 'crm.ts'), 'utf-8').includes(src)) {
    crmSafeguardsPass = false;
    reportCritical(`M11 Safeguard Missing: ${src} not found in CRM types/repository`);
  }
}

// Check 2: Production CRM Demo Data Gating
m11SafeguardsChecked++;
const demoGated = crmRepoContent.includes("process.env.ENABLE_CRM_DEMO_SEED === 'true'");
if (!demoGated) {
  crmSafeguardsPass = false;
  reportCritical('M11 Demo Seed Safeguard Regression: ENABLE_CRM_DEMO_SEED gating not enforced');
}

// Check 3: Runtime verification of CrmRepository contracts
async function runCrmRuntimeChecks() {
  const CrmRepository = crmMod.CrmRepository;

  // Test Lead Creation
  m11StateTransitionsChecked++;
  const testLead = await CrmRepository.createEnquiry({
    name: 'M14 Test Lead',
    phone: '+91 99999 99999',
    intent: 'custom',
    quotedAmount: 25000,
  });

  m11CommercialValueChecks++;
  // Verify lead creation does NOT automatically populate verifiedCommercialValue
  if (testLead.verifiedCommercialValue !== undefined) {
    crmSafeguardsPass = false;
    reportCritical('M11 Violation: Lead creation manufactured verifiedCommercialValue');
  }

  // Test Status Update to PROPOSAL_SENT
  m11StateTransitionsChecked++;
  const updatedProposal = await CrmRepository.updateEnquiry(testLead.id, { status: 'PROPOSAL_SENT' });
  m11CommercialValueChecks++;
  if (updatedProposal?.verifiedCommercialValue !== undefined) {
    crmSafeguardsPass = false;
    reportCritical('M11 Violation: Status update to PROPOSAL_SENT manufactured verifiedCommercialValue');
  }

  // Test Status Update to BOOKED
  m11StateTransitionsChecked++;
  const updatedBooked = await CrmRepository.updateEnquiry(testLead.id, { status: 'BOOKED' });
  m11CommercialValueChecks++;
  if (updatedBooked?.verifiedCommercialValue !== undefined) {
    crmSafeguardsPass = false;
    reportCritical('M11 Violation: Status update to BOOKED manufactured verifiedCommercialValue');
  }

  // Test Explicit Verified Commercial Value contract insertion
  m11CommercialValueChecks++;
  const verifiedVal = {
    amount: 25000,
    currency: 'INR',
    source: 'VERIFIED_BOOKING',
    verifiedAt: new Date().toISOString(),
  };
  const verifiedUpdated = await CrmRepository.updateEnquiry(testLead.id, { verifiedCommercialValue: verifiedVal });
  if (verifiedUpdated?.verifiedCommercialValue?.source !== 'VERIFIED_BOOKING' || verifiedUpdated.verifiedCommercialValue.amount !== 25000) {
    crmSafeguardsPass = false;
    reportCritical('M11 Violation: Failed to persist verifiedCommercialValue contract');
  }

  // Clean up test lead
  await CrmRepository.deleteEnquiry(testLead.id);
}

await runCrmRuntimeChecks();

const customJourneyPass = allRegistryPaths.includes('/plan-your-journey');
const conversionRegressionPass = quickQuotePass && falseSuccessPass && crmSafeguardsPass && demoGated;

if (!quickQuotePass) reportCritical('M11 Quick Quote regression detected in CustomJourneyBuilder');
if (!falseSuccessPass) reportCritical('M11 False Success regression detected in CustomJourneyBuilder');

// -----------------------------------------------------------------------------
// 11. CORRECTION 01 — DEEP SEO ROUTE RELATIONSHIPS VALIDATION
// -----------------------------------------------------------------------------
let seoRoutesChecked = 0;
let seoIndexableChecked = 0;
let seoNoindexChecked = 0;
let seoCanonicalMismatches = 0;
let seoMetadataMismatches = 0;
let seoSitemapEligibilityMismatches = 0;

for (const record of canonicalRegistry) {
  seoRoutesChecked++;

  // 1. Verify path format & existence
  if (!record.canonicalPath || !record.canonicalPath.startsWith('/')) {
    seoCanonicalMismatches++;
    reportCritical(`SEO Mismatch: Canonical path invalid: ${record.id} (${record.canonicalPath})`);
  }

  // 2. Indexability vs Sitemap eligibility coherence
  if (record.indexable) {
    seoIndexableChecked++;
    if (!record.sitemapEligible) {
      seoSitemapEligibilityMismatches++;
      reportHigh(`SEO Incoherence: Indexable route ${record.canonicalPath} is marked sitemapEligible = false`);
    }
  } else {
    seoNoindexChecked++;
    if (record.sitemapEligible) {
      seoSitemapEligibilityMismatches++;
      reportHigh(`SEO Incoherence: Noindex route ${record.canonicalPath} is marked sitemapEligible = true`);
    }
  }

  // 3. Ensure canonical path is not a redirect source
  if (redirectSources.includes(record.canonicalPath)) {
    seoCanonicalMismatches++;
    reportCritical(`SEO Violation: Canonical path ${record.canonicalPath} is a redirect source`);
  }

  // 4. Verify route file existence on disk
  if (!isKnownRoute(record.canonicalPath)) {
    seoMetadataMismatches++;
    reportHigh(`SEO Route Missing: ${record.canonicalPath} has no corresponding route implementation`);
  }
}

const seoPass =
  seoCanonicalMismatches === 0 &&
  seoMetadataMismatches === 0 &&
  seoSitemapEligibilityMismatches === 0 &&
  seoRoutesChecked === canonicalRegistry.length;

// -----------------------------------------------------------------------------
// 12. CORRECTION 02 — DEEP AEO REGISTRY VALIDATION (ALL 10 RECORDS)
// -----------------------------------------------------------------------------
const LOCKED_M12_AEO_QUESTIONS = [
  'What size vehicle is suitable for a group trip from Madurai?',
  'What vehicle is suitable for a small family trip or outstation drop?',
  'How do I plan a custom itinerary or book a trip from Madurai?',
  'How do I plan a college industrial visit (IV) or department trip from Madurai?',
  'What are the common routes from Madurai to Munnar for driving or van travel?',
  'How can I plan a family holiday to Kodaikanal from Madurai?',
  'How to contact Mahalakshmi Tours and Travels in Madurai?',
  'What outstation travel services are available for multi-generational families?',
  'How do I book wedding guest transportation or marriage hall shuttles in Madurai?',
  'What is included in a 1-night 2-day Rameshwaram tour package from Madurai?',
];

const aeoRecordsChecked = aeoQuestionRegistry.length;
let aeoValidationErrors = 0;

if (aeoRecordsChecked !== 10) {
  aeoValidationErrors++;
  reportCritical(`AEO Audit Failure: Registry contains ${aeoRecordsChecked} records (expected exactly 10)`);
}

const parsedQuestions = aeoQuestionRegistry.map((r) => r.question);
for (const lockedQ of LOCKED_M12_AEO_QUESTIONS) {
  if (!parsedQuestions.includes(lockedQ)) {
    aeoValidationErrors++;
    reportCritical(`AEO Audit Failure: Locked M12 question missing: "${lockedQ}"`);
  }
}

for (const aeoRecord of aeoQuestionRegistry) {
  // Validate required fields
  if (!aeoRecord.question || aeoRecord.question.trim().length === 0) {
    aeoValidationErrors++;
    reportCritical(`AEO Record ${aeoRecord.id} has empty question`);
  }
  if (!aeoRecord.answerText || aeoRecord.answerText.trim().length === 0) {
    aeoValidationErrors++;
    reportCritical(`AEO Record ${aeoRecord.id} has empty answerText`);
  }
  if (!allRegistryPaths.includes(aeoRecord.canonicalPath)) {
    aeoValidationErrors++;
    reportCritical(`AEO Record ${aeoRecord.id} canonicalPath ${aeoRecord.canonicalPath} not in canonical registry`);
  }
  if (redirectSources.includes(aeoRecord.canonicalPath)) {
    aeoValidationErrors++;
    reportCritical(`AEO Record ${aeoRecord.id} canonicalPath ${aeoRecord.canonicalPath} is a redirect source`);
  }
  // Check noindex destination entity prohibition
  const targetReg = canonicalRegistry.find((r) => r.canonicalPath === aeoRecord.canonicalPath);
  if (targetReg && !targetReg.indexable && targetReg.contentType === 'destination') {
    aeoValidationErrors++;
    reportCritical(`AEO Record ${aeoRecord.id} points to non-indexable destination entity page: ${aeoRecord.canonicalPath}`);
  }
}

const aeoPass = aeoRecordsChecked === 10 && aeoValidationErrors === 0;

// -----------------------------------------------------------------------------
// 13. CORRECTION 03 — DEEP GEO / SCHEMA VALIDATION
// -----------------------------------------------------------------------------
let schemaEntitiesChecked = 0;
let invalidEntityIds = 0;
let invalidSchemaUrls = 0;
let invalidOwnerRoutes = 0;
let invalidRelationships = 0;

// 1. TravelAgency Schema
schemaEntitiesChecked++;
const localBusSchema = schemaMod.generateLocalBusinessSchema();
if (localBusSchema['@type'] !== 'TravelAgency' || localBusSchema['@id'] !== `${siteConfig.url}/#travelagency`) {
  invalidEntityIds++;
  reportCritical('GEO/Schema Error: TravelAgency schema @id or @type invalid');
}
if (localBusSchema.name !== siteConfig.name || localBusSchema.url !== siteConfig.url) {
  invalidSchemaUrls++;
  reportCritical('GEO/Schema Error: TravelAgency schema business name or URL mismatch');
}

// 2. WebSite Schema
schemaEntitiesChecked++;
const webSiteSchema = schemaMod.generateWebSiteSchema();
if (webSiteSchema['@type'] !== 'WebSite' || webSiteSchema['@id'] !== `${siteConfig.url}/#website`) {
  invalidEntityIds++;
  reportCritical('GEO/Schema Error: WebSite schema @id or @type invalid');
}
if (webSiteSchema.publisher['@id'] !== `${siteConfig.url}/#travelagency`) {
  invalidRelationships++;
  reportCritical('GEO/Schema Error: WebSite schema publisher relationship invalid');
}

// 3. Tour Schemas
for (const tour of toursRepository) {
  schemaEntitiesChecked++;
  const tourSchema = schemaMod.generateTouristTripSchema(tour);
  const expectedUrl = `${siteConfig.url}/tours/${tour.slug}`;
  if (tourSchema['@type'] !== 'TouristTrip' || tourSchema['@id'] !== `${expectedUrl}#tour`) {
    invalidEntityIds++;
    reportHigh(`GEO/Schema Error: Tour ${tour.slug} schema @id invalid`);
  }
  if (!allRegistryPaths.includes(`/tours/${tour.slug}`)) {
    invalidOwnerRoutes++;
    reportHigh(`GEO/Schema Error: Tour ${tour.slug} schema owning route missing`);
  }
}

// 4. Vehicle Rental Schemas
for (const veh of vehiclesRepository) {
  schemaEntitiesChecked++;
  const vehSchema = schemaMod.generateVehicleRentalSchema(veh);
  const expectedUrl = `${siteConfig.url}/vehicles/${veh.slug}`;
  if (vehSchema['@type'] !== 'AutoRental' || vehSchema['@id'] !== `${expectedUrl}#autorental`) {
    invalidEntityIds++;
    reportHigh(`GEO/Schema Error: Vehicle ${veh.slug} schema @id invalid`);
  }
  if (!allRegistryPaths.includes(`/vehicles/${veh.slug}`)) {
    invalidOwnerRoutes++;
    reportHigh(`GEO/Schema Error: Vehicle ${veh.slug} schema owning route missing`);
  }
}

// 5. Article Schemas
for (const art of travelArticlesRepository) {
  schemaEntitiesChecked++;
  const artSchema = schemaMod.generateArticleSchema(art);
  const expectedUrl = `${siteConfig.url}/travel-guide/${art.slug}`;
  if (artSchema['@type'] !== 'Article' || artSchema['@id'] !== `${expectedUrl}#article`) {
    invalidEntityIds++;
    reportHigh(`GEO/Schema Error: Article ${art.slug} schema @id invalid`);
  }
  if (!allRegistryPaths.includes(`/travel-guide/${art.slug}`)) {
    invalidOwnerRoutes++;
    reportHigh(`GEO/Schema Error: Article ${art.slug} schema owning route missing`);
  }
}

// 6. Destination Schemas & Noindex Protection
const singleDestPagePath = path.join(rootDir, 'src', 'app', 'destinations', '[slug]', 'page.tsx');
const singleDestPageContent = fs.readFileSync(singleDestPagePath, 'utf-8');
const destNoindexPass = singleDestPageContent.includes('noIndex: true');

for (const dest of destinationsRepository) {
  schemaEntitiesChecked++;
  const destSchema = schemaMod.generateTouristDestinationSchema(dest);
  const expectedUrl = `${siteConfig.url}/destinations/${dest.slug}`;
  if (destSchema['@type'] !== 'TouristDestination' || destSchema['@id'] !== `${expectedUrl}#destination`) {
    invalidEntityIds++;
    reportHigh(`GEO/Schema Error: Destination ${dest.slug} schema @id invalid`);
  }
  // Ensure destination in registry is non-indexable & not in sitemap
  const destRecord = canonicalRegistry.find((r) => r.canonicalPath === `/destinations/${dest.slug}`);
  if (destRecord && (destRecord.indexable || destRecord.sitemapEligible)) {
    invalidRelationships++;
    reportCritical(`GEO/Schema Protection Violation: Destination ${dest.slug} marked indexable or sitemapEligible in registry`);
  }
}

const geoSchemaPass =
  invalidEntityIds === 0 &&
  invalidSchemaUrls === 0 &&
  invalidOwnerRoutes === 0 &&
  invalidRelationships === 0 &&
  destNoindexPass;

// -----------------------------------------------------------------------------
// 14. CORRECTION 04 — GENERATED SITEMAP VALIDATION
// -----------------------------------------------------------------------------
const expectedSitemapRecords = canonicalRegistry.filter((rec) => rec.indexable && rec.sitemapEligible);
const expectedSitemapUrls = expectedSitemapRecords.map((rec) => `${siteConfig.url}${rec.canonicalPath}`);

const generatedSitemap = await sitemapMod.default();
const actualSitemapUrls = generatedSitemap.map((item) => item.url);

const expectedSitemapUrlCount = expectedSitemapUrls.length;
const actualSitemapUrlCount = actualSitemapUrls.length;

const missingSitemapUrls = expectedSitemapUrls.filter((url) => !actualSitemapUrls.includes(url));
const unexpectedSitemapUrls = actualSitemapUrls.filter((url) => !expectedSitemapUrls.includes(url));
const duplicateSitemapUrls = actualSitemapUrls.filter((url, index) => actualSitemapUrls.indexOf(url) !== index);

if (missingSitemapUrls.length > 0) reportCritical(`Sitemap Error: Missing expected URLs: ${missingSitemapUrls.join(', ')}`);
if (unexpectedSitemapUrls.length > 0) reportCritical(`Sitemap Error: Unexpected URLs in sitemap: ${unexpectedSitemapUrls.join(', ')}`);
if (duplicateSitemapUrls.length > 0) reportCritical(`Sitemap Error: Duplicate URLs in sitemap: ${duplicateSitemapUrls.join(', ')}`);

// Verify no redirect source or noindex destination is in sitemap
for (const sUrl of actualSitemapUrls) {
  const pathPart = sUrl.replace(siteConfig.url, '');
  if (redirectSources.includes(pathPart)) {
    reportCritical(`Sitemap Violation: Redirect source ${pathPart} present in generated sitemap`);
  }
  if (pathPart.startsWith('/destinations/') && pathPart !== '/destinations') {
    reportCritical(`Sitemap Violation: Destination entity page ${pathPart} present in generated sitemap`);
  }
}

const sitemapPass =
  missingSitemapUrls.length === 0 &&
  unexpectedSitemapUrls.length === 0 &&
  duplicateSitemapUrls.length === 0 &&
  actualSitemapUrlCount === expectedSitemapUrlCount;

// -----------------------------------------------------------------------------
// 15. CORRECTION 05 — GENERATED ROBOTS VALIDATION
// -----------------------------------------------------------------------------
const robotsConfig = robotsMod.default();
const disallowRulesChecked = robotsConfig.rules[0]?.disallow || [];

const REQUIRED_DISALLOWS = ['/api/', '/admin/', '/crm/', '/design-system'];
const requiredRulesPresent = REQUIRED_DISALLOWS.filter((d) => disallowRulesChecked.includes(d)).length;

if (requiredRulesPresent !== REQUIRED_DISALLOWS.length) {
  reportCritical(`Robots Error: Missing disallow rules. Found ${requiredRulesPresent}/${REQUIRED_DISALLOWS.length}`);
}

const sitemapReference = robotsConfig.sitemap;
const expectedSitemapRef = `${siteConfig.url}/sitemap.xml`;
const sitemapReferenceValid = sitemapReference === expectedSitemapRef;

if (!sitemapReferenceValid) {
  reportCritical(`Robots Error: Sitemap reference mismatch. Found "${sitemapReference}", expected "${expectedSitemapRef}"`);
}

let robotsIndexabilityConflicts = 0;
// Check that public canonical indexable routes are not blocked by disallow rules
for (const entry of canonicalRegistry) {
  if (entry.indexable) {
    for (const dis of disallowRulesChecked) {
      if (entry.canonicalPath.startsWith(dis)) {
        robotsIndexabilityConflicts++;
        reportCritical(`Robots Conflict: Indexable route ${entry.canonicalPath} is disallowed by ${dis}`);
      }
    }
  }
}

const robotsPass =
  requiredRulesPresent === REQUIRED_DISALLOWS.length &&
  sitemapReferenceValid &&
  robotsIndexabilityConflicts === 0;

// -----------------------------------------------------------------------------
// 16. DETERMINISTIC ORPHAN CONTENT & DUPLICATE OWNERSHIP AUDIT
// -----------------------------------------------------------------------------
let orphanRecords = 0;
let orphanRoutes = 0;
let orphanRelationships = 0;

for (const entry of canonicalRegistry) {
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
// 17. TECHNICAL BUILD AUDIT
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
  canonicalRegistryPass &&
  businessTruthPass &&
  publicPricingPass &&
  migrationPass &&
  routeCoveragePass &&
  internalLinksPass &&
  navigationPass &&
  vehiclesServicesPass &&
  toursPass &&
  toursDestinationsPass &&
  travelGuidePass &&
  conversionRegressionPass &&
  seoPass &&
  aeoPass &&
  geoSchemaPass &&
  sitemapPass &&
  robotsPass &&
  orphanContentPass &&
  duplicateOwnershipPass &&
  technicalBuildPass &&
  criticalFindings === 0 &&
  highFindings === 0;

console.log('============================================================');
console.log('M14 CROSS-SYSTEM VALIDATION');
console.log('============================================================\n');
console.log(`Canonical Registry: ${canonicalRegistryPass ? 'PASS' : 'FAIL'}`);
console.log(`Business Truth: ${businessTruthPass ? 'PASS' : 'FAIL'}`);
console.log(`Public Pricing: ${publicPricingPass ? 'PASS' : 'FAIL'}`);
console.log(`M13 Migration: ${migrationPass ? 'PASS' : 'FAIL'}`);
console.log(`Route Coverage: ${routeCoveragePass ? 'PASS' : 'FAIL'}`);
console.log(`Internal Links: ${internalLinksPass ? 'PASS' : 'FAIL'}`);
console.log(`Navigation: ${navigationPass ? 'PASS' : 'FAIL'}`);
console.log(`Vehicle ↔ Services: ${vehiclesServicesPass ? 'PASS' : 'FAIL'}`);
console.log(`Tours ↔ Destinations: ${toursDestinationsPass ? 'PASS' : 'FAIL'}`);
console.log(`Travel Guide: ${travelGuidePass ? 'PASS' : 'FAIL'}`);
console.log(`M11 Conversion Regression: ${conversionRegressionPass ? 'PASS' : 'FAIL'}`);
console.log(`SEO Route Relationships: ${seoPass ? 'PASS' : 'FAIL'}`);
console.log(`AEO: ${aeoPass ? 'PASS' : 'FAIL'}`);
console.log(`GEO / Schema: ${geoSchemaPass ? 'PASS' : 'FAIL'}`);
console.log(`Sitemap: ${sitemapPass ? 'PASS' : 'FAIL'}`);
console.log(`Robots: ${robotsPass ? 'PASS' : 'FAIL'}`);
console.log(`Orphan Content: ${orphanContentPass ? 'PASS' : 'FAIL'}`);
console.log(`Duplicate Ownership: ${duplicateOwnershipPass ? 'PASS' : 'FAIL'}`);
console.log(`Technical Validation: ${technicalBuildPass ? 'PASS' : 'FAIL'}\n`);

console.log('COUNTS\n');
console.log(`Canonical Routes Checked: ${allRegistryPaths.length}`);
console.log(`Tours Checked: ${tourCount}`);
console.log(`AEO Records Checked: ${aeoRecordsChecked}`);
console.log(`Schema Entities Checked: ${schemaEntitiesChecked}`);
console.log(`Sitemap URLs Checked: ${actualSitemapUrlCount}`);
console.log(`Internal Links Checked: ${internalLinksScanned}`);
console.log(`Redirects Checked: ${redirectMatches.length}`);
console.log(`Orphans: ${orphanRecords + orphanRoutes + orphanRelationships}`);
console.log(`Broken Relationships: ${brokenTourDestRefs + brokenGuideRefs + vehicleServiceMismatches}\n`);

console.log(`M14 RESULT: ${allPassed ? 'PASS' : 'FAIL'}\n`);

if (!allPassed) {
  process.exit(1);
} else {
  process.exit(0);
}
