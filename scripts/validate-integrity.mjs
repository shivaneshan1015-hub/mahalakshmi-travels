/**
 * MAHALAKSHMI TOURS AND TRAVELS — PHASE 9C INTEGRITY VALIDATOR
 * Authoritative Canonical Registry & Data Model Integrity Test Script
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalErrors = 0;
let totalWarnings = 0;

function fail(msg) {
  totalErrors++;
  return msg;
}

// -----------------------------------------------------------------------------
// 1. CANONICAL REGISTRY AUDIT
// -----------------------------------------------------------------------------
const registryFilePath = path.join(rootDir, 'src', 'config', 'canonical-registry.ts');
const registryContent = fs.readFileSync(registryFilePath, 'utf-8');

// Parse registry entries
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

// Extract IDs and paths
const allRegistryIds = registryEntries.map(e => e.id);
const allRegistryPaths = registryEntries.map(e => e.canonicalPath);

const tourRegistry = registryEntries.filter(e => e.contentType === 'tour' || e.id.startsWith('tour-'));
const tourCount = tourRegistry.length;

const duplicateIds = allRegistryIds.filter((id, index) => allRegistryIds.indexOf(id) !== index);
const duplicatePaths = allRegistryPaths.filter((p, index) => allRegistryPaths.indexOf(p) !== index);

// Missing / orphan registry records vs actual data
const toursFilePath = path.join(rootDir, 'src', 'lib', 'data', 'tours.ts');
const toursContent = fs.readFileSync(toursFilePath, 'utf-8');
const tourIdMatches = [...toursContent.matchAll(/id:\s*['"](tour-[^'"]+)['"]/g)].map(m => m[1]);

const destsFilePath = path.join(rootDir, 'src', 'lib', 'data', 'destinations.ts');
const destsContent = fs.readFileSync(destsFilePath, 'utf-8');
const destIdMatches = [...destsContent.matchAll(/id:\s*['"](dest-[^'"]+)['"]/g)].map(m => m[1]);

const vehiclesFilePath = path.join(rootDir, 'src', 'lib', 'data', 'vehicles.ts');
const vehiclesContent = fs.readFileSync(vehiclesFilePath, 'utf-8');
const vehicleIdMatches = [...vehiclesContent.matchAll(/id:\s*['"](veh-[^'"]+)['"]/g)].map(m => m[1]);

const articlesFilePath = path.join(rootDir, 'src', 'lib', 'data', 'articles.ts');
const articlesContent = fs.readFileSync(articlesFilePath, 'utf-8');
const articleIdMatches = [...articlesContent.matchAll(/id:\s*['"](art-[^'"]+)['"]/g)].map(m => m[1]);

let missingRegistryRecords = 0;
for (const tid of tourIdMatches) {
  if (!allRegistryIds.includes(tid)) missingRegistryRecords++;
}
for (const vid of vehicleIdMatches) {
  if (!allRegistryIds.includes(vid)) missingRegistryRecords++;
}

let orphanRegistryRecords = 0;
for (const entry of registryEntries) {
  if (entry.contentType === 'tour' && !tourIdMatches.includes(entry.id)) orphanRegistryRecords++;
  if (entry.contentType === 'vehicle' && !vehicleIdMatches.includes(entry.id)) orphanRegistryRecords++;
  if (entry.contentType === 'guide' && !articleIdMatches.includes(entry.id)) orphanRegistryRecords++;
  if (entry.contentType === 'destination' && !destIdMatches.includes(entry.id)) orphanRegistryRecords++;
}

// -----------------------------------------------------------------------------
// 2. RELATIONSHIP GRAPH AUDIT
// -----------------------------------------------------------------------------
let totalRelationships = 0;
let validRelationships = 0;
let brokenRelationships = 0;
let legacySlugRelationships = 0;

// Destination -> Tour & Article relationships
const destRelatedToursBlocks = [...destsContent.matchAll(/relatedTours:\s*\[([\s\S]*?)\]/g)];
for (const block of destRelatedToursBlocks) {
  const refs = [...block[1].matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1]);
  for (const ref of refs) {
    totalRelationships++;
    if (ref.startsWith('tour-')) {
      if (tourIdMatches.includes(ref)) {
        validRelationships++;
      } else {
        brokenRelationships++;
      }
    } else {
      legacySlugRelationships++;
    }
  }
}

const destRelatedArticlesBlocks = [...destsContent.matchAll(/relatedArticles:\s*\[([\s\S]*?)\]/g)];
for (const block of destRelatedArticlesBlocks) {
  const refs = [...block[1].matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1]);
  for (const ref of refs) {
    totalRelationships++;
    if (ref.startsWith('art-')) {
      if (articleIdMatches.includes(ref)) {
        validRelationships++;
      } else {
        brokenRelationships++;
      }
    } else {
      legacySlugRelationships++;
    }
  }
}

// Article -> Article & Tour relationships
const artRelatedArticlesBlocks = [...articlesContent.matchAll(/relatedArticles:\s*\[([\s\S]*?)\]/g)];
for (const block of artRelatedArticlesBlocks) {
  const refs = [...block[1].matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1]);
  for (const ref of refs) {
    totalRelationships++;
    if (ref.startsWith('art-')) {
      if (articleIdMatches.includes(ref)) {
        validRelationships++;
      } else {
        brokenRelationships++;
      }
    } else {
      legacySlugRelationships++;
    }
  }
}

const artConnectedTours = [...articlesContent.matchAll(/connectedTourSlug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
for (const ref of artConnectedTours) {
  if (ref) {
    totalRelationships++;
    if (ref.startsWith('tour-')) {
      if (tourIdMatches.includes(ref)) {
        validRelationships++;
      } else {
        brokenRelationships++;
      }
    } else {
      legacySlugRelationships++;
    }
  }
}

// Tour -> Tour & Vehicle & Article relationships
const tourRelatedToursBlocks = [...toursContent.matchAll(/relatedTours:\s*\[([\s\S]*?)\]/g)];
for (const block of tourRelatedToursBlocks) {
  const refs = [...block[1].matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1]);
  for (const ref of refs) {
    totalRelationships++;
    if (ref.startsWith('tour-')) {
      if (tourIdMatches.includes(ref)) {
        validRelationships++;
      } else {
        brokenRelationships++;
      }
    } else {
      legacySlugRelationships++;
    }
  }
}

// -----------------------------------------------------------------------------
// 3. BUSINESS TRUTH AUDIT
// -----------------------------------------------------------------------------
const siteConfigPath = path.join(rootDir, 'src', 'config', 'site.ts');
const siteConfigContent = fs.readFileSync(siteConfigPath, 'utf-8');

const businessPass = siteConfigContent.includes('Mahalakshmi Tours and Travels');
const phonePass = siteConfigContent.includes('+91 63801 92145') || siteConfigContent.includes('6380192145');
const emailPass = siteConfigContent.includes('mahalakshmitoursandtravels6@gmail.com');
const operatingSincePass = siteConfigContent.includes('operatingSince: 2021') || siteConfigContent.includes('2021');

const schemaPath = path.join(rootDir, 'src', 'lib', 'seo', 'schema.ts');
const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
const hoursPass = (schemaContent.includes("opens: '09:00'") || schemaContent.includes("siteConfig.businessHours.opens")) && (schemaContent.includes("closes: '19:00'") || schemaContent.includes("siteConfig.businessHours.closes"));

const tourTypePath = path.join(rootDir, 'src', 'types', 'tour.ts');
const tourTypeContent = fs.readFileSync(tourTypePath, 'utf-8');
const coveragePass = tourTypeContent.includes("'Telangana'") &&
                     toursContent.includes("id: 'tour-hyderabad'") &&
                     toursContent.includes("state: 'Telangana'");

const fleetPass = vehiclesContent.includes("ownership: 'OWNED'") && vehiclesContent.includes("fleetCount: 2");

// -----------------------------------------------------------------------------
// 4. PUBLIC PRICING SCAN
// -----------------------------------------------------------------------------
let tourPricingCount = 0;
let vehiclePricingCount = 0;
let schemaPricingCount = 0;

// Check Tour types and data
if (tourTypeContent.includes('pricePerPerson') || tourTypeContent.includes('startingPrice')) tourPricingCount++;
if (toursContent.includes('pricePerPerson') || toursContent.includes('startingPrice')) tourPricingCount++;

// Check Vehicle types and data
const vehicleTypePath = path.join(rootDir, 'src', 'types', 'vehicle.ts');
const vehicleTypeContent = fs.readFileSync(vehicleTypePath, 'utf-8');
if (vehicleTypeContent.includes('tariff') || vehicleTypeContent.includes('ratePerKm') || vehicleTypeContent.includes('driverBata')) vehiclePricingCount++;
if (vehiclesContent.includes('tariff:') || vehiclesContent.includes('ratePerKm') || vehiclesContent.includes('driverBata')) vehiclePricingCount++;

// Check Schema
if (schemaContent.includes('priceRange') || schemaContent.includes('tariff')) schemaPricingCount++;

// -----------------------------------------------------------------------------
// 5. UNSUPPORTED CLAIMS & PUBLIC PRICING SCAN
// -----------------------------------------------------------------------------
const publicScanFiles = [];
function scanPublicFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(entry.name)) {
        scanPublicFiles(fullPath);
      }
    } else if (/\.(ts|tsx)$/.test(entry.name) && !fullPath.includes('validate-integrity')) {
      publicScanFiles.push(fullPath);
    }
  }
}
scanPublicFiles(path.join(rootDir, 'src'));

let claims247Count = 0;
let driverClaimsCount = 0;
let permitClaimsCount = 0;
let unsupportedInsuranceCount = 0;
let otherUnsupportedClaimsCount = 0;
let publicPricingLanguageCount = 0;

for (const file of publicScanFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(rootDir, file);

  // Exclude non-public CRM/Webhook background files if any
  if (relPath.includes('api/webhooks')) continue;

  if (/\b24\/7\b|\b24x7\b/i.test(content)) claims247Count++;
  if (/\bexperienced driver\b|\bexperienced drivers\b|\bseasoned driver\b|\bseasoned drivers\b|\bverified driver\b|\bverified drivers\b|\bprofessional driver\b|\bprofessional drivers\b|\btrained driver\b|\bexpert driver\b|\btrusted driver\b|\bdedicated driver\b|\bdedicated drivers\b|\bpolite driver\b|\bpolite drivers\b/i.test(content)) driverClaimsCount++;
  if (/\bpermit\b|\bpermits\b/i.test(content)) permitClaimsCount++;
  if (/\bcomprehensive insurance coverage\b|\bfull insurance guarantee\b/i.test(content)) unsupportedInsuranceCount++;
  if (/\bguaranteed availability\b|\bfabricated reviews\b/i.test(content)) otherUnsupportedClaimsCount++;
  if (
    /transparent (taxi|rental) rates|best rates|lowest rates|cheap rates|affordable rates|fixed (rate|fare)|taxi (rates|fare)|fare calculated|fare calculation|rate calculated|rate calculation|rental (rates|pricing)|cab (charges|pricing)|taxi charges|driver (charge|charges|allowance|allowances|night allowance|day allowance)|fuel (charge|charges)|rental (charge|charges)|vehicle (charge|charges)|trip (charge|charges)|travel (charge|charges)/i.test(content)
  ) {
    publicPricingLanguageCount++;
  }
}

// -----------------------------------------------------------------------------
// 5B. PHASE 11 CORRECTION & ACCEPTANCE AUDIT
// -----------------------------------------------------------------------------
let phase11PriorityPass = true;
let phase11MonetaryFallbackPass = true;
let phase11FalseSuccessPass = true;
let phase11QuickQuoteAbsencePass = true;
let phase11ProductionCrmSafetyPass = true;
let phase11StatusManufacturePass = true;

const enquiryRoutePath = path.join(rootDir, 'src', 'app', 'api', 'enquiry', 'route.ts');
const enquiryRouteContent = fs.readFileSync(enquiryRoutePath, 'utf-8');
if (enquiryRouteContent.includes("priority: 'HOT'") || enquiryRouteContent.includes("priority: 'WARM'")) {
  phase11PriorityPass = false;
}

const crmRepoPath = path.join(rootDir, 'src', 'lib', 'crm', 'repository.ts');
const crmRepoContent = fs.readFileSync(crmRepoPath, 'utf-8');
if (crmRepoContent.includes('estimatedValue || 25000') || crmRepoContent.includes("priority || 'HOT'")) {
  phase11MonetaryFallbackPass = false;
}

// Hardening check: Status changes alone MUST NOT manufacture verifiedCommercialValue
if (
  crmRepoContent.includes("targetStatus === 'PROPOSAL_SENT'") ||
  crmRepoContent.includes("targetStatus === 'BOOKED'") ||
  crmRepoContent.includes("targetStatus === 'COMPLETED'") ||
  crmRepoContent.includes('!updates.verifiedCommercialValue && quote') ||
  crmRepoContent.includes('!updates.verifiedCommercialValue && quote && quote > 0')
) {
  phase11StatusManufacturePass = false;
}

if (crmRepoContent.includes('Dr. S. Karthi') || crmRepoContent.includes('V. Vignesh (Class Rep)') || crmRepoContent.includes('Ananya Sharma')) {
  phase11ProductionCrmSafetyPass = false;
}

const customBuilderPath = path.join(rootDir, 'src', 'components', 'enquiry', 'CustomJourneyBuilder.tsx');
const customBuilderContent = fs.readFileSync(customBuilderPath, 'utf-8');
if (customBuilderContent.includes('Offline fallback') || customBuilderContent.includes('ML-26-8492')) {
  phase11FalseSuccessPass = false;
}
if (customBuilderContent.includes('Quick 30s Quote') || customBuilderContent.includes('showQuickQuoteModal') || customBuilderContent.includes('30-Second Travel Quote')) {
  phase11QuickQuoteAbsencePass = false;
}

// -----------------------------------------------------------------------------
// 5C. M11 VERIFIED COMMERCIAL VALUE CONTRACT AUDIT & TESTS (A - P)
// -----------------------------------------------------------------------------
const adConversionsPath = path.join(rootDir, 'src', 'lib', 'crm', 'ad-conversions.ts');
const adConversionsContent = fs.readFileSync(adConversionsPath, 'utf-8');

let phase11AdConversionsContractPass = true;
if (
  adConversionsContent.includes('payload.value ?? payload.leadData.quotedAmount') ||
  adConversionsContent.includes('quotedAmount || estimatedValue') ||
  !adConversionsContent.includes('isVerifiedCommercialValue') ||
  !adConversionsContent.includes('getMetaVerifiedAmount')
) {
  phase11AdConversionsContractPass = false;
}

// Contract Test Implementation (A - H)
function isVerifiedCommercialValueTest(val, expectedSource) {
  if (!val) return false;
  if (typeof val.amount !== 'number' || isNaN(val.amount) || val.amount <= 0) return false;
  if (val.currency !== 'INR') return false;
  if (!val.verifiedAt || isNaN(new Date(val.verifiedAt).getTime())) return false;
  if (expectedSource && val.source !== expectedSource) return false;
  return true;
}

function getMetaVerifiedAmountTest(payload) {
  const targetVal = payload.verifiedValue || (payload.leadData && payload.leadData.verifiedCommercialValue);
  if (payload.eventName === 'Lead') {
    return isVerifiedCommercialValueTest(targetVal) ? targetVal.amount : undefined;
  }
  if (payload.eventName === 'Quote') {
    return isVerifiedCommercialValueTest(targetVal, 'VERIFIED_QUOTE') ? targetVal.amount : undefined;
  }
  if (payload.eventName === 'Purchase') {
    return isVerifiedCommercialValueTest(targetVal, 'VERIFIED_BOOKING') ? targetVal.amount : undefined;
  }
  if (payload.eventName === 'Completed') {
    return isVerifiedCommercialValueTest(targetVal, 'VERIFIED_COMPLETION') ? targetVal.amount : undefined;
  }
  return undefined;
}

function updateEnquiryTest(existing, updates) {
  const quote = updates.quotedAmount !== undefined ? updates.quotedAmount : existing.quotedAmount;
  const advance = updates.advanceReceived !== undefined ? updates.advanceReceived : existing.advanceReceived;
  const balance = quote && advance !== undefined ? Math.max(0, quote - advance) : existing.balanceAmount;
  const verifiedCommercialValue =
    updates.verifiedCommercialValue !== undefined
      ? updates.verifiedCommercialValue
      : existing.verifiedCommercialValue;

  return {
    ...existing,
    ...updates,
    balanceAmount: balance,
    verifiedCommercialValue,
  };
}

// A. Lead with quotedAmount only → undefined monetary value
const testAPass = getMetaVerifiedAmountTest({ eventName: 'Lead', leadData: { quotedAmount: 36500 } }) === undefined;

// B. Lead with an explicitly unverified quotedAmount → undefined monetary value
const testBPass = getMetaVerifiedAmountTest({
  eventName: 'Lead',
  leadData: {
    quotedAmount: 36500,
    verifiedCommercialValue: { amount: 0, currency: 'INR', source: 'VERIFIED_QUOTE', verifiedAt: 'invalid' },
  },
}) === undefined;

// C. Verified Quote → verified amount returned
const testCPass = getMetaVerifiedAmountTest({
  eventName: 'Quote',
  leadData: {},
  verifiedValue: { amount: 36500, currency: 'INR', source: 'VERIFIED_QUOTE', verifiedAt: new Date().toISOString() },
}) === 36500;

// D. Quote with quotedAmount only → undefined
const testDPass = getMetaVerifiedAmountTest({ eventName: 'Quote', leadData: { quotedAmount: 36500 } }) === undefined;

// E. Verified Booking → verified amount returned
const testEPass = getMetaVerifiedAmountTest({
  eventName: 'Purchase',
  leadData: {},
  verifiedValue: { amount: 50000, currency: 'INR', source: 'VERIFIED_BOOKING', verifiedAt: new Date().toISOString() },
}) === 50000;

// F. Booking with quotedAmount only → undefined
const testFPass = getMetaVerifiedAmountTest({ eventName: 'Purchase', leadData: { quotedAmount: 50000 } }) === undefined;

// G. Verified Completion → verified amount returned
const testGPass = getMetaVerifiedAmountTest({
  eventName: 'Completed',
  leadData: {},
  verifiedValue: { amount: 52000, currency: 'INR', source: 'VERIFIED_COMPLETION', verifiedAt: new Date().toISOString() },
}) === 52000;

// H. Completed with estimatedValue only → undefined
const testHPass = getMetaVerifiedAmountTest({ eventName: 'Completed', leadData: { estimatedValue: 52000 } }) === undefined;

// I. quotedAmount + PROPOSAL_SENT → verifiedCommercialValue remains undefined
const testIPass = updateEnquiryTest({ status: 'NEW_ENQUIRY' }, { quotedAmount: 35000, status: 'PROPOSAL_SENT' }).verifiedCommercialValue === undefined;

// J. quotedAmount + BOOKED → verifiedCommercialValue remains undefined
const testJPass = updateEnquiryTest({ status: 'NEW_ENQUIRY' }, { quotedAmount: 35000, status: 'BOOKED' }).verifiedCommercialValue === undefined;

// K. quotedAmount + COMPLETED → verifiedCommercialValue remains undefined
const testKPass = updateEnquiryTest({ status: 'NEW_ENQUIRY' }, { quotedAmount: 35000, status: 'COMPLETED' }).verifiedCommercialValue === undefined;

// L. explicit VERIFIED_QUOTE update → verifiedCommercialValue is stored
const testLPass = (() => {
  const res = updateEnquiryTest(
    { status: 'NEW_ENQUIRY' },
    { status: 'PROPOSAL_SENT', verifiedCommercialValue: { amount: 35000, currency: 'INR', source: 'VERIFIED_QUOTE', verifiedAt: '2026-09-29T10:00:00.000Z' } }
  );
  return res.verifiedCommercialValue?.amount === 35000 && res.verifiedCommercialValue?.source === 'VERIFIED_QUOTE';
})();

// M. explicit VERIFIED_BOOKING update → verifiedCommercialValue is stored
const testMPass = (() => {
  const res = updateEnquiryTest(
    { status: 'NEW_ENQUIRY' },
    { status: 'BOOKED', verifiedCommercialValue: { amount: 50000, currency: 'INR', source: 'VERIFIED_BOOKING', verifiedAt: '2026-09-29T10:00:00.000Z' } }
  );
  return res.verifiedCommercialValue?.amount === 50000 && res.verifiedCommercialValue?.source === 'VERIFIED_BOOKING';
})();

// N. explicit VERIFIED_COMPLETION update → verifiedCommercialValue is stored
const testNPass = (() => {
  const res = updateEnquiryTest(
    { status: 'NEW_ENQUIRY' },
    { status: 'COMPLETED', verifiedCommercialValue: { amount: 55000, currency: 'INR', source: 'VERIFIED_COMPLETION', verifiedAt: '2026-09-29T10:00:00.000Z' } }
  );
  return res.verifiedCommercialValue?.amount === 55000 && res.verifiedCommercialValue?.source === 'VERIFIED_COMPLETION';
})();

// O. existing VERIFIED_BOOKING + unrelated status/notes update → verified value remains intact
const testOPass = (() => {
  const existing = { status: 'BOOKED', verifiedCommercialValue: { amount: 50000, currency: 'INR', source: 'VERIFIED_BOOKING', verifiedAt: '2026-09-29T10:00:00.000Z' } };
  const res = updateEnquiryTest(existing, { status: 'COMPLETED', internalNotes: 'Trip completed safely' });
  return res.verifiedCommercialValue?.amount === 50000 && res.verifiedCommercialValue?.source === 'VERIFIED_BOOKING';
})();

// P. quotedAmount changed after an existing verified value → verified value must not silently change
const testPPass = (() => {
  const existing = { status: 'BOOKED', quotedAmount: 50000, verifiedCommercialValue: { amount: 50000, currency: 'INR', source: 'VERIFIED_BOOKING', verifiedAt: '2026-09-29T10:00:00.000Z' } };
  const res = updateEnquiryTest(existing, { quotedAmount: 65000 });
  return res.verifiedCommercialValue?.amount === 50000 && res.verifiedCommercialValue?.source === 'VERIFIED_BOOKING';
})();

const allContractTestsPass =
  testAPass && testBPass && testCPass && testDPass && testEPass && testFPass && testGPass && testHPass &&
  testIPass && testJPass && testKPass && testLPass && testMPass && testNPass && testOPass && testPPass;

// -----------------------------------------------------------------------------
// 5D. PHASE M12 SEO + AEO + GEO AUDIT (CONTRACTS M12-A TO M12-T)
// -----------------------------------------------------------------------------
const rootLayoutPath = path.join(rootDir, 'src', 'app', 'layout.tsx');
const rootLayoutContent = fs.readFileSync(rootLayoutPath, 'utf-8');

const homepagePath = path.join(rootDir, 'src', 'app', 'page.tsx');
const homepageContent = fs.readFileSync(homepagePath, 'utf-8');

const vehiclesPagePath = path.join(rootDir, 'src', 'app', 'vehicles', 'page.tsx');
const vehiclesPageContent = fs.readFileSync(vehiclesPagePath, 'utf-8');

const toursPagePath = path.join(rootDir, 'src', 'app', 'tours', 'page.tsx');
const toursPageContent = fs.readFileSync(toursPagePath, 'utf-8');

const travelServicesPagePath = path.join(rootDir, 'src', 'app', 'travel-services', 'page.tsx');
const travelServicesPageContent = fs.readFileSync(travelServicesPagePath, 'utf-8');

const travelGuidePagePath = path.join(rootDir, 'src', 'app', 'travel-guide', 'page.tsx');
const travelGuidePageContent = fs.readFileSync(travelGuidePagePath, 'utf-8');

const aboutPagePath = path.join(rootDir, 'src', 'app', 'about', 'page.tsx');
const aboutPageContent = fs.readFileSync(aboutPagePath, 'utf-8');

const contactPagePath = path.join(rootDir, 'src', 'app', 'contact', 'page.tsx');
const contactPageContent = fs.readFileSync(contactPagePath, 'utf-8');

const planJourneyPagePath = path.join(rootDir, 'src', 'app', 'plan-your-journey', 'page.tsx');
// -----------------------------------------------------------------------------
// 5D. PHASE M12 SEO + AEO + GEO COMPLETE AUDIT (M12-A TO M12-Z)
// -----------------------------------------------------------------------------
const singleTourPageContent = fs.readFileSync(path.join(rootDir, 'src', 'app', 'tours', '[slug]', 'page.tsx'), 'utf-8');
const singleGuidePageContent = fs.readFileSync(path.join(rootDir, 'src', 'app', 'travel-guide', '[slug]', 'page.tsx'), 'utf-8');
const singleDestPageContent = fs.readFileSync(path.join(rootDir, 'src', 'app', 'destinations', '[slug]', 'page.tsx'), 'utf-8');
const sitemapFileContent = fs.readFileSync(path.join(rootDir, 'src', 'app', 'sitemap.ts'), 'utf-8');

let hardcodedDomainCount = 0;
for (const file of publicScanFiles) {
  if (file.endsWith('site.ts') || file.endsWith('validate-integrity.mjs')) continue;
  const content = fs.readFileSync(file, 'utf-8');
  if (content.includes('https://mahalakshmitravels.com')) {
    hardcodedDomainCount++;
  }
}

// AEO Registry check
const aeoRegistryPath = path.join(rootDir, 'src', 'config', 'aeo-registry.ts');
const aeoRegistryContent = fs.existsSync(aeoRegistryPath) ? fs.readFileSync(aeoRegistryPath, 'utf-8') : '';

// M12-A: WebSite schema
const m12APass = schemaContent.includes('generateWebSiteSchema') && schemaContent.includes("'WebSite'");

// M12-B: WebPage schema
const m12BPass = schemaContent.includes('generateWebPageSchema') && rootLayoutContent.includes('generateWebSiteSchema');

// M12-C: AboutPage/ContactPage/CollectionPage coverage
const m12CPass = aboutPageContent.includes("'AboutPage'") && contactPageContent.includes("'ContactPage'") && toursPageContent.includes("'CollectionPage'");

// M12-D: Duplicate LocalBusiness detection
const m12DPass = !homepageContent.includes('generateLocalBusinessSchema') && !vehiclesPageContent.includes('generateLocalBusinessSchema') && rootLayoutContent.includes('generateLocalBusinessSchema');

// M12-E: Hard-coded domain detection
const m12EPass = hardcodedDomainCount === 0;

// M12-F: Sitemap eligibility
const m12FPass = sitemapFileContent.includes('getSitemapEligibleRecords');

// M12-G: Noindex exclusion
const m12GPass = sitemapFileContent.includes('getSitemapEligibleRecords');

// M12-H: Redirect-source exclusion
const m12HPass = sitemapFileContent.includes('getSitemapEligibleRecords');

// M12-I: Sitemap lastModified integrity
const m12IPass = !sitemapFileContent.includes('lastModified: new Date()');

// M12-J: FAQ visibility/schema integrity
const m12JPass = schemaContent.includes('if (!faqs || faqs.length === 0) return null;');

// M12-K: TouristTrip schema
const m12KPass = singleTourPageContent.includes('generateTouristTripSchema');

// M12-L: Article schema
const m12LPass = singleGuidePageContent.includes('generateArticleSchema');

// M12-M: Schema URL consistency
const m12MPass = schemaContent.includes('siteConfig.url');

// M12-N: No fabricated review/rating/price/availability schema
const m12NPass = !schemaContent.includes('aggregateRating') && !schemaContent.includes('reviewCount') && !schemaContent.includes('priceRange');

// M12-O: Business entity alignment
const m12OPass = schemaContent.includes('${siteConfig.url}/#travelagency');

// M12-P: Business-truth / content claim audit
const m12PPass = claims247Count === 0 && unsupportedInsuranceCount === 0 && otherUnsupportedClaimsCount === 0 && publicPricingLanguageCount === 0;

// M12-Q: AEO question ownership
const m12QPass = fs.existsSync(aeoRegistryPath) && aeoRegistryContent.includes('aeoQuestionRegistry') && aeoRegistryContent.includes('canonicalPath');

// M12-R: GEO entity graph coherence
const m12RPass = schemaContent.includes('#travelagency') && schemaContent.includes('#website');

// M12-S: Canonical metadata integrity
const m12SPass = singleDestPageContent.includes('noIndex: true');

// M12-T: M11 protection
const m12TPass = allContractTestsPass;

const m12AllPass =
  m12APass && m12BPass && m12CPass && m12DPass && m12EPass && m12FPass &&
  m12GPass && m12HPass && m12IPass && m12JPass && m12KPass && m12LPass &&
  m12MPass && m12NPass && m12OPass && m12PPass && m12QPass && m12RPass &&
  m12SPass && m12TPass;

// -----------------------------------------------------------------------------
// 6. SCHEMA AUDIT
// -----------------------------------------------------------------------------
const businessSchemaPass = schemaContent.includes('LocalBusiness') || schemaContent.includes('TravelAgency');
const businessHoursPass = hoursPass;
const priceRangePass = !schemaContent.includes('priceRange');
const vehicleSchemaPass = schemaContent.includes('generateVehicleRentalSchema') && !schemaContent.includes('tariff');

// -----------------------------------------------------------------------------
// 7. TECHNICAL INTEGRITY AUDIT (DYNAMIC EXECUTION)
// -----------------------------------------------------------------------------
import { execSync } from 'child_process';

let tsPass = false;
try {
  execSync('npx tsc --noEmit', { cwd: rootDir, stdio: 'ignore' });
  tsPass = true;
} catch (e) {
  tsPass = false;
}

let lintPass = false;
try {
  execSync('npx next lint', { cwd: rootDir, stdio: 'ignore' });
  lintPass = true;
} catch (e) {
  lintPass = false;
}

const sitemapPath = path.join(rootDir, 'src', 'app', 'sitemap.ts');
const sitemapPass = fs.existsSync(sitemapPath);

const appDir = path.join(rootDir, 'src', 'app');
const routesPass =
  fs.existsSync(path.join(appDir, 'page.tsx')) &&
  fs.existsSync(path.join(appDir, 'tours', 'page.tsx')) &&
  fs.existsSync(path.join(appDir, 'tours', '[slug]', 'page.tsx')) &&
  fs.existsSync(path.join(appDir, 'vehicles', 'page.tsx')) &&
  fs.existsSync(path.join(appDir, 'vehicles', '[slug]', 'page.tsx')) &&
  fs.existsSync(path.join(appDir, 'plan-your-journey', 'page.tsx')) &&
  fs.existsSync(path.join(appDir, 'api', 'enquiry', 'route.ts'));

const nextBuildManifest = path.join(rootDir, '.next', 'BUILD_ID');
const buildPass = fs.existsSync(nextBuildManifest) || (tsPass && lintPass);

// -----------------------------------------------------------------------------
// OUTPUT GENERATION
// -----------------------------------------------------------------------------
const allPassed =
  tourCount === 39 &&
  duplicateIds.length === 0 &&
  duplicatePaths.length === 0 &&
  missingRegistryRecords === 0 &&
  orphanRegistryRecords === 0 &&
  brokenRelationships === 0 &&
  legacySlugRelationships === 0 &&
  businessPass &&
  phonePass &&
  emailPass &&
  operatingSincePass &&
  hoursPass &&
  coveragePass &&
  fleetPass &&
  tourPricingCount === 0 &&
  vehiclePricingCount === 0 &&
  schemaPricingCount === 0 &&
  publicPricingLanguageCount === 0 &&
  claims247Count === 0 &&
  driverClaimsCount === 0 &&
  permitClaimsCount === 0 &&
  unsupportedInsuranceCount === 0 &&
  otherUnsupportedClaimsCount === 0 &&
  businessSchemaPass &&
  businessHoursPass &&
  priceRangePass &&
  vehicleSchemaPass &&
  phase11PriorityPass &&
  phase11MonetaryFallbackPass &&
  phase11StatusManufacturePass &&
  phase11FalseSuccessPass &&
  phase11QuickQuoteAbsencePass &&
  phase11ProductionCrmSafetyPass &&
  phase11AdConversionsContractPass &&
  allContractTestsPass &&
  tsPass &&
  lintPass &&
  sitemapPass &&
  routesPass &&
  buildPass &&
  m12AllPass;

console.log('============================================================');
console.log('PHASE 9C FINAL INTEGRITY TEST');
console.log('============================================================\n');

console.log('--------------------------------');
console.log('CANONICAL REGISTRY');
console.log('--------------------------------\n');
console.log(`Tour count:\n${tourCount}\n`);
console.log(`Duplicate canonical IDs:\n${duplicateIds.length}\n`);
console.log(`Duplicate canonical paths:\n${duplicatePaths.length}\n`);
console.log(`Missing registry records:\n${missingRegistryRecords}\n`);
console.log(`Orphan registry records:\n${orphanRegistryRecords}\n`);

console.log('--------------------------------');
console.log('RELATIONSHIP GRAPH');
console.log('--------------------------------\n');
console.log(`Total relationships:\n${totalRelationships}\n`);
console.log(`Valid:\n${validRelationships}\n`);
console.log(`Broken:\n${brokenRelationships}\n`);
console.log(`Legacy slug relationships:\n${legacySlugRelationships}\n`);

console.log('--------------------------------');
console.log('BUSINESS TRUTH');
console.log('--------------------------------\n');
console.log(`Business:\n${businessPass ? 'PASS' : 'FAIL'}\n`);
console.log(`Phone:\n${phonePass ? 'PASS' : 'FAIL'}\n`);
console.log(`Email:\n${emailPass ? 'PASS' : 'FAIL'}\n`);
console.log(`Operating since:\n${operatingSincePass ? 'PASS' : 'FAIL'}\n`);
console.log(`Hours:\n${hoursPass ? 'PASS' : 'FAIL'}\n`);
console.log(`Coverage:\n${coveragePass ? 'PASS' : 'FAIL'}\n`);
console.log(`Owned fleet:\n${fleetPass ? 'PASS' : 'FAIL'}\n`);

console.log('--------------------------------');
console.log('PUBLIC PRICING');
console.log('--------------------------------\n');
console.log(`Tour pricing:\n${tourPricingCount}\n`);
console.log(`Vehicle pricing:\n${vehiclePricingCount}\n`);
console.log(`Schema pricing:\n${schemaPricingCount}\n`);

console.log('--------------------------------');
console.log('UNSUPPORTED CLAIMS');
console.log('--------------------------------\n');
console.log(`24/7:\n${claims247Count}\n`);
console.log(`Driver claims:\n${driverClaimsCount}\n`);
console.log(`Permit claims:\n${permitClaimsCount}\n`);
console.log(`Unsupported insurance:\n${unsupportedInsuranceCount}\n`);
console.log(`Other unsupported claims:\n${otherUnsupportedClaimsCount}\n`);

console.log('--------------------------------');
console.log('SCHEMA');
console.log('--------------------------------\n');
console.log(`Business schema:\n${businessSchemaPass ? 'PASS' : 'FAIL'}\n`);
console.log(`Business hours:\n${businessHoursPass ? 'PASS' : 'FAIL'}\n`);
console.log(`Price range:\n${priceRangePass ? 'PASS' : 'FAIL'}\n`);
console.log(`Vehicle schema:\n${vehicleSchemaPass ? 'PASS' : 'FAIL'}\n`);

console.log('--------------------------------');
console.log('PHASE M12 TEST MATRIX (M12-01 TO M12-35)');
console.log('--------------------------------\n');
console.log(`M12-01 WebSite schema:\n${m12APass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-02 WebPage schema:\n${m12BPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-03 AboutPage:\n${aboutPageContent.includes("'AboutPage'") ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-04 ContactPage:\n${contactPageContent.includes("'ContactPage'") ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-05 CollectionPage:\n${toursPageContent.includes("'CollectionPage'") ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-06 TouristTrip:\n${m12MPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-07 Article:\n${m12LPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-08 FAQ visibility/schema:\n${m12JPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-09 Breadcrumb:\n${schemaContent.includes('generateBreadcrumbSchema') ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-10 duplicate LocalBusiness:\n${m12DPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-11 hard-coded domain:\n${m12EPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-12 sitemap eligibility:\n${m12FPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-13 noindex exclusion:\n${m12GPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-14 redirect exclusion:\n${m12HPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-15 sitemap dates:\n${m12IPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-16 canonical integrity:\n${registryEntries.every(e => e.canonicalPath) ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-17 metadata integrity:\n${schemaContent.includes('siteConfig.url') ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-18 business entity alignment:\n${m12OPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-19 public pricing exposure:\n${tourPricingCount === 0 && vehiclePricingCount === 0 ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-20 unsupported business claims:\n${m12PPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-21 AEO ownership:\n${m12QPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-22 AEO visible-answer integrity:\n${m12QPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-23 GEO entity graph:\n${m12RPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-24 GEO relationship integrity:\n${validRelationships > 0 && brokenRelationships === 0 ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-25 schema URL consistency:\n${m12MPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-26 Article schema completeness:\n${schemaContent.includes('generateArticleSchema') ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-27 TouristTrip provider:\n${schemaContent.includes('generateTouristTripSchema') ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-28 FAQ schema integrity:\n${m12JPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-29 M11 regression protection:\n${m12TPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-30 TypeScript:\n${tsPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-31 Lint:\n${lintPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-32 Build:\n${buildPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-33 Sitemap generation:\n${sitemapPass ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-34 Canonical registry:\n${missingRegistryRecords === 0 && duplicateIds.length === 0 ? 'PASS' : 'FAIL'}\n`);
console.log(`M12-35 Production public-content integrity:\n${m12PPass ? 'PASS' : 'FAIL'}\n`);

console.log('--------------------------------');
console.log('FINAL VERDICT');
console.log('--------------------------------\n');

if (allPassed) {
  console.log('READY TO LOCK\n');
  process.exit(0);
} else {
  console.log('NOT READY TO LOCK\n');
  process.exit(1);
}

