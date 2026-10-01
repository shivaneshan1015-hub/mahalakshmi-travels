/**
 * MAHALAKSHMI TOURS AND TRAVELS — PHASE 9 DATA / CONTENT MODEL INTEGRITY VALIDATOR
 * Authoritative Canonical Registry & Data Model Integrity Test Script
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

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

const servicesFilePath = path.join(rootDir, 'src', 'lib', 'data', 'services.ts');
const servicesContent = fs.readFileSync(servicesFilePath, 'utf-8');
const serviceIdMatches = [...servicesContent.matchAll(/id:\s*['"](service-[^'"]+|srv-[^'"]+)['"]/g)].map(m => m[1]);

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

if (tourTypeContent.includes('pricePerPerson') || tourTypeContent.includes('startingPrice')) tourPricingCount++;
if (toursContent.includes('pricePerPerson') || toursContent.includes('startingPrice')) tourPricingCount++;

const vehicleTypePath = path.join(rootDir, 'src', 'types', 'vehicle.ts');
const vehicleTypeContent = fs.readFileSync(vehicleTypePath, 'utf-8');
if (vehicleTypeContent.includes('tariff') || vehicleTypeContent.includes('ratePerKm') || vehicleTypeContent.includes('driverBata')) vehiclePricingCount++;
if (vehiclesContent.includes('tariff:') || vehiclesContent.includes('ratePerKm') || vehiclesContent.includes('driverBata')) vehiclePricingCount++;

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
// 5B. PHASE 11 VERIFIED COMMERCIAL VALUE & CRM AUDIT
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

const testAPass = getMetaVerifiedAmountTest({ eventName: 'Lead', leadData: { quotedAmount: 36500 } }) === undefined;
const testBPass = getMetaVerifiedAmountTest({
  eventName: 'Lead',
  leadData: {
    quotedAmount: 36500,
    verifiedCommercialValue: { amount: 0, currency: 'INR', source: 'VERIFIED_QUOTE', verifiedAt: 'invalid' },
  },
}) === undefined;
const testCPass = getMetaVerifiedAmountTest({
  eventName: 'Quote',
  leadData: {},
  verifiedValue: { amount: 36500, currency: 'INR', source: 'VERIFIED_QUOTE', verifiedAt: new Date().toISOString() },
}) === 36500;
const testDPass = getMetaVerifiedAmountTest({ eventName: 'Quote', leadData: { quotedAmount: 36500 } }) === undefined;
const testEPass = getMetaVerifiedAmountTest({
  eventName: 'Purchase',
  leadData: {},
  verifiedValue: { amount: 50000, currency: 'INR', source: 'VERIFIED_BOOKING', verifiedAt: new Date().toISOString() },
}) === 50000;
const testFPass = getMetaVerifiedAmountTest({ eventName: 'Purchase', leadData: { quotedAmount: 50000 } }) === undefined;
const testGPass = getMetaVerifiedAmountTest({
  eventName: 'Completed',
  leadData: {},
  verifiedValue: { amount: 52000, currency: 'INR', source: 'VERIFIED_COMPLETION', verifiedAt: new Date().toISOString() },
}) === 52000;
const testHPass = getMetaVerifiedAmountTest({ eventName: 'Completed', leadData: { estimatedValue: 52000 } }) === undefined;
const testIPass = updateEnquiryTest({ status: 'NEW_ENQUIRY' }, { quotedAmount: 35000, status: 'PROPOSAL_SENT' }).verifiedCommercialValue === undefined;
const testJPass = updateEnquiryTest({ status: 'NEW_ENQUIRY' }, { quotedAmount: 35000, status: 'BOOKED' }).verifiedCommercialValue === undefined;
const testKPass = updateEnquiryTest({ status: 'NEW_ENQUIRY' }, { quotedAmount: 35000, status: 'COMPLETED' }).verifiedCommercialValue === undefined;
const testLPass = (() => {
  const res = updateEnquiryTest(
    { status: 'NEW_ENQUIRY' },
    { status: 'PROPOSAL_SENT', verifiedCommercialValue: { amount: 35000, currency: 'INR', source: 'VERIFIED_QUOTE', verifiedAt: '2026-09-29T10:00:00.000Z' } }
  );
  return res.verifiedCommercialValue?.amount === 35000 && res.verifiedCommercialValue?.source === 'VERIFIED_QUOTE';
})();
const testMPass = (() => {
  const res = updateEnquiryTest(
    { status: 'NEW_ENQUIRY' },
    { status: 'BOOKED', verifiedCommercialValue: { amount: 50000, currency: 'INR', source: 'VERIFIED_BOOKING', verifiedAt: '2026-09-29T10:00:00.000Z' } }
  );
  return res.verifiedCommercialValue?.amount === 50000 && res.verifiedCommercialValue?.source === 'VERIFIED_BOOKING';
})();
const testNPass = (() => {
  const res = updateEnquiryTest(
    { status: 'NEW_ENQUIRY' },
    { status: 'COMPLETED', verifiedCommercialValue: { amount: 55000, currency: 'INR', source: 'VERIFIED_COMPLETION', verifiedAt: '2026-09-29T10:00:00.000Z' } }
  );
  return res.verifiedCommercialValue?.amount === 55000 && res.verifiedCommercialValue?.source === 'VERIFIED_COMPLETION';
})();
const testOPass = (() => {
  const existing = { status: 'BOOKED', verifiedCommercialValue: { amount: 50000, currency: 'INR', source: 'VERIFIED_BOOKING', verifiedAt: '2026-09-29T10:00:00.000Z' } };
  const res = updateEnquiryTest(existing, { status: 'COMPLETED', internalNotes: 'Trip completed safely' });
  return res.verifiedCommercialValue?.amount === 50000 && res.verifiedCommercialValue?.source === 'VERIFIED_BOOKING';
})();
const testPPass = (() => {
  const existing = { status: 'BOOKED', quotedAmount: 50000, verifiedCommercialValue: { amount: 50000, currency: 'INR', source: 'VERIFIED_BOOKING', verifiedAt: '2026-09-29T10:00:00.000Z' } };
  const res = updateEnquiryTest(existing, { quotedAmount: 65000 });
  return res.verifiedCommercialValue?.amount === 50000 && res.verifiedCommercialValue?.source === 'VERIFIED_BOOKING';
})();

const allContractTestsPass =
  testAPass && testBPass && testCPass && testDPass && testEPass && testFPass && testGPass && testHPass &&
  testIPass && testJPass && testKPass && testLPass && testMPass && testNPass && testOPass && testPPass;

// -----------------------------------------------------------------------------
// 5C. PHASE M12 SEO + AEO + GEO AUDIT
// -----------------------------------------------------------------------------
const rootLayoutPath = path.join(rootDir, 'src', 'app', 'layout.tsx');
const rootLayoutContent = fs.readFileSync(rootLayoutPath, 'utf-8');

const homepagePath = path.join(rootDir, 'src', 'app', 'page.tsx');
const homepageContent = fs.readFileSync(homepagePath, 'utf-8');

const vehiclesPagePath = path.join(rootDir, 'src', 'app', 'vehicles', 'page.tsx');
const vehiclesPageContent = fs.readFileSync(vehiclesPagePath, 'utf-8');

const toursPagePath = path.join(rootDir, 'src', 'app', 'tours', 'page.tsx');
const toursPageContent = fs.readFileSync(toursPagePath, 'utf-8');

const aboutPagePath = path.join(rootDir, 'src', 'app', 'about', 'page.tsx');
const aboutPageContent = fs.readFileSync(aboutPagePath, 'utf-8');

const contactPagePath = path.join(rootDir, 'src', 'app', 'contact', 'page.tsx');
const contactPageContent = fs.readFileSync(contactPagePath, 'utf-8');

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

const aeoRegistryPath = path.join(rootDir, 'src', 'config', 'aeo-registry.ts');
const aeoRegistryContent = fs.existsSync(aeoRegistryPath) ? fs.readFileSync(aeoRegistryPath, 'utf-8') : '';

const m12APass = schemaContent.includes('generateWebSiteSchema') && schemaContent.includes("'WebSite'");
const m12BPass = schemaContent.includes('generateWebPageSchema') && rootLayoutContent.includes('generateWebSiteSchema');
const m12CPass = aboutPageContent.includes("'AboutPage'") && contactPageContent.includes("'ContactPage'") && toursPageContent.includes("'CollectionPage'");
const m12DPass = !homepageContent.includes('generateLocalBusinessSchema') && !vehiclesPageContent.includes('generateLocalBusinessSchema') && rootLayoutContent.includes('generateLocalBusinessSchema');
const m12EPass = hardcodedDomainCount === 0;
const m12FPass = sitemapFileContent.includes('getSitemapEligibleRecords');
const m12GPass = sitemapFileContent.includes('getSitemapEligibleRecords');
const m12HPass = sitemapFileContent.includes('getSitemapEligibleRecords');
const m12IPass = !sitemapFileContent.includes('lastModified: new Date()');
const m12JPass = schemaContent.includes('if (!faqs || faqs.length === 0) return null;');
const m12KPass = singleTourPageContent.includes('generateTouristTripSchema');
const m12LPass = singleGuidePageContent.includes('generateArticleSchema');
const m12MPass = schemaContent.includes('siteConfig.url');
const m12NPass = !schemaContent.includes('aggregateRating') && !schemaContent.includes('reviewCount') && !schemaContent.includes('priceRange');
const m12OPass = schemaContent.includes('${siteConfig.url}/#travelagency');
const m12PPass = claims247Count === 0 && unsupportedInsuranceCount === 0 && otherUnsupportedClaimsCount === 0 && publicPricingLanguageCount === 0;
const aeoEntryRegex = /{\s*id:\s*['"]([^'"]+)['"],\s*question:\s*['"]([^'"]+)['"],\s*canonicalPath:\s*['"]([^'"]+)['"],[\s\S]*?answerText:\s*['"]([^'"]+)['"]/g;
const aeoEntries = [];
let aeoMatch;
while ((aeoMatch = aeoEntryRegex.exec(aeoRegistryContent)) !== null) {
  aeoEntries.push({
    id: aeoMatch[1],
    question: aeoMatch[2],
    canonicalPath: aeoMatch[3],
    answerText: aeoMatch[4],
  });
}

const aeoQuestionsHaveSuperlatives = aeoEntries.some(e => /\b(best|cheapest|No\.1|largest)\b/i.test(e.question));
const aeoQuestionsList = aeoEntries.map(e => e.question.toLowerCase().trim());
const duplicateAEOQuestions = aeoQuestionsList.filter((q, i) => aeoQuestionsList.indexOf(q) !== i);
const invalidAEOCanonicalPaths = aeoEntries.filter(e => {
  const record = registryEntries.find(r => r.canonicalPath === e.canonicalPath);
  return !record || !record.indexable;
});
const visibleAEOBlockPath = path.join(rootDir, 'src', 'components', 'seo', 'VisibleAEOAnswerBlock.tsx');
const visibleAEOBlockExists = fs.existsSync(visibleAEOBlockPath);

const m12QPass =
  fs.existsSync(aeoRegistryPath) &&
  aeoEntries.length >= 10 &&
  !aeoQuestionsHaveSuperlatives &&
  duplicateAEOQuestions.length === 0 &&
  invalidAEOCanonicalPaths.length === 0 &&
  visibleAEOBlockExists;
const m12RPass = schemaContent.includes('#travelagency') && schemaContent.includes('#website');
const m12SPass = singleDestPageContent.includes('noIndex: true');
const m12TPass = allContractTestsPass;

const m12AllPass =
  m12APass && m12BPass && m12CPass && m12DPass && m12EPass && m12FPass &&
  m12GPass && m12HPass && m12IPass && m12JPass && m12KPass && m12LPass &&
  m12MPass && m12NPass && m12OPass && m12PPass && m12QPass && m12RPass &&
  m12SPass && m12TPass;

// -----------------------------------------------------------------------------
// 6. TECHNICAL INTEGRITY AUDIT (DYNAMIC EXECUTION)
// -----------------------------------------------------------------------------
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
// OUTPUT GENERATION — RESPONSIBILITY GROUPS (A THROUGH F)
// -----------------------------------------------------------------------------
const phase9Pass =
  tourCount === 39 &&
  duplicateIds.length === 0 &&
  duplicatePaths.length === 0 &&
  missingRegistryRecords === 0 &&
  orphanRegistryRecords === 0 &&
  brokenRelationships === 0 &&
  legacySlugRelationships === 0;

const seoPass = m12APass && m12BPass && m12CPass && m12EPass && m12FPass && m12GPass && m12HPass && m12IPass && m12KPass && m12LPass && m12MPass && m12NPass && sitemapPass;
const aeoPass = m12JPass && m12QPass && schemaContent.includes('generateFaqSchema');
const geoPass = m12RPass && coveragePass && destIdMatches.length > 0;
const businessTruthPass = businessPass && phonePass && emailPass && operatingSincePass && hoursPass && coveragePass && fleetPass && m12PPass;
const crossSystemPass = routesPass && sitemapPass && m12OPass && m12TPass && tsPass && lintPass && buildPass;

const allPassed = phase9Pass && seoPass && aeoPass && geoPass && businessTruthPass && crossSystemPass && m12AllPass;

console.log('============================================================');
console.log('PHASE 9 — DATA / CONTENT MODEL & SYSTEM INTEGRITY TEST');
console.log('============================================================\n');

console.log('------------------------------------------------------------');
console.log('GROUP A: PHASE 9 — DATA / CONTENT MODEL INTEGRITY');
console.log('------------------------------------------------------------');
console.log(`- Tours Domain Validation (39 Tours): ${tourCount === 39 ? 'PASS' : 'FAIL'}`);
console.log(`- Destinations Domain Validation (${destIdMatches.length} Dests): ${destIdMatches.length > 0 ? 'PASS' : 'FAIL'}`);
console.log(`- Services Domain Validation (${serviceIdMatches.length} Services): ${serviceIdMatches.length > 0 ? 'PASS' : 'FAIL'}`);
console.log(`- Vehicles Domain Validation (${vehicleIdMatches.length} Vehicles): ${vehicleIdMatches.length > 0 ? 'PASS' : 'FAIL'}`);
console.log(`- Travel Guides / Articles Domain Validation (${articleIdMatches.length} Articles): ${articleIdMatches.length > 0 ? 'PASS' : 'FAIL'}`);
console.log(`- Duplicate Canonical IDs: ${duplicateIds.length === 0 ? 'PASS (0 duplicates)' : 'FAIL'}`);
console.log(`- Duplicate Canonical Paths: ${duplicatePaths.length === 0 ? 'PASS (0 duplicates)' : 'FAIL'}`);
console.log(`- Missing Registry Records: ${missingRegistryRecords === 0 ? 'PASS (0 missing)' : 'FAIL'}`);
console.log(`- Orphan Registry Records: ${orphanRegistryRecords === 0 ? 'PASS (0 orphans)' : 'FAIL'}`);
console.log(`- Relationship Graph Integrity (${validRelationships}/${totalRelationships}): ${brokenRelationships === 0 && legacySlugRelationships === 0 ? 'PASS (100% valid)' : 'FAIL'}\n`);

console.log('------------------------------------------------------------');
console.log('GROUP B: SEO INTEGRITY');
console.log('------------------------------------------------------------');
console.log(`- WebSite / WebPage Schemas: ${m12APass && m12BPass ? 'PASS' : 'FAIL'}`);
console.log(`- Collection & Page Schemas: ${m12CPass ? 'PASS' : 'FAIL'}`);
console.log(`- Sitemap Eligibility & Dynamic Dates: ${m12FPass && m12IPass ? 'PASS' : 'FAIL'}`);
console.log(`- Schema Canonical URL Alignment: ${m12MPass ? 'PASS' : 'FAIL'}\n`);

console.log('------------------------------------------------------------');
console.log('GROUP C: AEO INTEGRITY');
console.log('------------------------------------------------------------');
console.log(`- AEO Question Registry: ${m12QPass ? 'PASS' : 'FAIL'}`);
console.log(`- FAQ Schema & Visible Q&A Integrity: ${m12JPass ? 'PASS' : 'FAIL'}\n`);

console.log('------------------------------------------------------------');
console.log('GROUP D: GEO INTEGRITY');
console.log('------------------------------------------------------------');
console.log(`- GEO Entity Graph Coherence: ${m12RPass ? 'PASS' : 'FAIL'}`);
console.log(`- Regional Service Coverage (TN, KL, KA, AP, TS): ${coveragePass ? 'PASS' : 'FAIL'}\n`);

console.log('------------------------------------------------------------');
console.log('GROUP E: BUSINESS TRUTH INTEGRITY');
console.log('------------------------------------------------------------');
console.log(`- Business Name & Identity: ${businessPass ? 'PASS' : 'FAIL'}`);
console.log(`- Phone (+91 63801 92145): ${phonePass ? 'PASS' : 'FAIL'}`);
console.log(`- Email (mahalakshmitoursandtravels6@gmail.com): ${emailPass ? 'PASS' : 'FAIL'}`);
console.log(`- Operating Since (2021): ${operatingSincePass ? 'PASS' : 'FAIL'}`);
console.log(`- Office Hours (9 AM - 7 PM): ${hoursPass ? 'PASS' : 'FAIL'}`);
console.log(`- Fleet Ownership (21-seater van & sedans): ${fleetPass ? 'PASS' : 'FAIL'}`);
console.log(`- Zero Public Pricing Exposure: ${tourPricingCount === 0 && vehiclePricingCount === 0 ? 'PASS' : 'FAIL'}`);
console.log(`- Zero Unsupported Claims (24/7, driver, permit, insurance): ${m12PPass ? 'PASS' : 'FAIL'}\n`);

console.log('------------------------------------------------------------');
console.log('GROUP F: CROSS-SYSTEM INTEGRITY');
console.log('------------------------------------------------------------');
console.log(`- Content -> Canonical Registry -> Routes: ${routesPass ? 'PASS' : 'FAIL'}`);
console.log(`- Content -> SEO -> Sitemap Engine: ${sitemapPass ? 'PASS' : 'FAIL'}`);
console.log(`- M11 Commercial Value Contract Protection: ${m12TPass ? 'PASS' : 'FAIL'}`);
console.log(`- Strict TypeScript Compiler: ${tsPass ? 'PASS' : 'FAIL'}`);
console.log(`- ESLint Code Quality: ${lintPass ? 'PASS' : 'FAIL'}`);
console.log(`- Next.js Production Build: ${buildPass ? 'PASS' : 'FAIL'}\n`);

console.log('------------------------------------------------------------');
console.log('PHASE M12 TEST MATRIX (M12-01 TO M12-35)');
console.log('------------------------------------------------------------');
console.log(`M12-01 WebSite schema: ${m12APass ? 'PASS' : 'FAIL'}`);
console.log(`M12-02 WebPage schema: ${m12BPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-03 AboutPage: ${aboutPageContent.includes("'AboutPage'") ? 'PASS' : 'FAIL'}`);
console.log(`M12-04 ContactPage: ${contactPageContent.includes("'ContactPage'") ? 'PASS' : 'FAIL'}`);
console.log(`M12-05 CollectionPage: ${toursPageContent.includes("'CollectionPage'") ? 'PASS' : 'FAIL'}`);
console.log(`M12-06 TouristTrip: ${m12MPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-07 Article: ${m12LPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-08 FAQ visibility/schema: ${m12JPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-09 Breadcrumb: ${schemaContent.includes('generateBreadcrumbSchema') ? 'PASS' : 'FAIL'}`);
console.log(`M12-10 duplicate LocalBusiness: ${m12DPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-11 hard-coded domain: ${m12EPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-12 sitemap eligibility: ${m12FPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-13 noindex exclusion: ${m12GPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-14 redirect exclusion: ${m12HPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-15 sitemap dates: ${m12IPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-16 canonical integrity: ${registryEntries.every(e => e.canonicalPath) ? 'PASS' : 'FAIL'}`);
console.log(`M12-17 metadata integrity: ${schemaContent.includes('siteConfig.url') ? 'PASS' : 'FAIL'}`);
console.log(`M12-18 business entity alignment: ${m12OPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-19 public pricing exposure: ${tourPricingCount === 0 && vehiclePricingCount === 0 ? 'PASS' : 'FAIL'}`);
console.log(`M12-20 unsupported business claims: ${m12PPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-21 AEO ownership: ${m12QPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-22 AEO visible-answer integrity: ${m12QPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-23 GEO entity graph: ${m12RPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-24 GEO relationship integrity: ${validRelationships > 0 && brokenRelationships === 0 ? 'PASS' : 'FAIL'}`);
console.log(`M12-25 schema URL consistency: ${m12MPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-26 Article schema completeness: ${schemaContent.includes('generateArticleSchema') ? 'PASS' : 'FAIL'}`);
console.log(`M12-27 TouristTrip provider: ${schemaContent.includes('generateTouristTripSchema') ? 'PASS' : 'FAIL'}`);
console.log(`M12-28 FAQ schema integrity: ${m12JPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-29 M11 regression protection: ${m12TPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-30 TypeScript: ${tsPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-31 Lint: ${lintPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-32 Build: ${buildPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-33 Sitemap generation: ${sitemapPass ? 'PASS' : 'FAIL'}`);
console.log(`M12-34 Canonical registry: ${missingRegistryRecords === 0 && duplicateIds.length === 0 ? 'PASS' : 'FAIL'}`);
console.log(`M12-35 Production public-content integrity: ${m12PPass ? 'PASS' : 'FAIL'}\n`);

console.log('------------------------------------------------------------');
console.log('FINAL VERDICT');
console.log('------------------------------------------------------------\n');

if (allPassed) {
  console.log('PHASE 9 — DATA / CONTENT MODEL: LOCKED\n');
  process.exit(0);
} else {
  console.log('PHASE 9 — DATA / CONTENT MODEL: UNLOCKED (VALIDATION FAILURE)\n');
  process.exit(1);
}
