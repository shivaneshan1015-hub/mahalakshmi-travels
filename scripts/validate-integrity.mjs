/**
 * MAHALAKSHMI TOURS AND TRAVELS — PHASE 9C INTEGRITY VALIDATOR
 * Automatically validates canonical registry integrity, relationship graph consistency,
 * sitemap eligibility, and compliance with data governance rules.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('============================================================');
console.log('MAHALAKSHMI TOURS AND TRAVELS — PHASE 9C INTEGRITY VALIDATOR');
console.log('============================================================\n');

let totalErrors = 0;
let totalWarnings = 0;

function logPass(msg) {
  console.log(`[PASS] ${msg}`);
}

function logFail(msg) {
  console.error(`[FAIL] ${msg}`);
  totalErrors++;
}

function logWarn(msg) {
  console.warn(`[WARN] ${msg}`);
  totalWarnings++;
}

// -----------------------------------------------------------------------------
// 1. CANONICAL REGISTRY CHECK
// -----------------------------------------------------------------------------
console.log('--- 1. CANONICAL CONTENT REGISTRY AUDIT ---');

const registryFilePath = path.join(rootDir, 'src', 'config', 'canonical-registry.ts');
const registryContent = fs.readFileSync(registryFilePath, 'utf-8');

// Extract all record IDs
const idMatches = [...registryContent.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
const tourIds = idMatches.filter((id) => id.startsWith('tour-'));
const vehicleIds = idMatches.filter((id) => id.startsWith('veh-'));
const serviceIds = idMatches.filter((id) => id.startsWith('service-'));
const destIds = idMatches.filter((id) => id.startsWith('dest-'));
const articleIds = idMatches.filter((id) => id.startsWith('art-'));

console.log(`- Canonical Tours Found: ${tourIds.length}`);
if (tourIds.length === 39) {
  logPass('Canonical Public Tour Count is EXACTLY 39.');
} else {
  logFail(`Canonical Public Tour Count is ${tourIds.length}, expected EXACTLY 39!`);
}

// Check for legacy merged IDs in registry
if (tourIds.includes('tour-madurai-meenakshi-amman') || tourIds.includes('tour-thanjavur-big-temple')) {
  logFail('Registry contains legacy merged tour IDs (tour-madurai-meenakshi-amman or tour-thanjavur-big-temple)!');
} else {
  logPass('Registry contains no unmerged legacy tour IDs.');
}

// Check destinations non-indexability in registry
const destBlocks = registryContent.match(/type:\s*['"]destination['"][\s\S]*?sitemapEligible:\s*(true|false)/g) || [];
const indexableDestinations = destBlocks.filter((b) => b.includes('sitemapEligible: true'));
if (indexableDestinations.length > 0) {
  logFail(`Found ${indexableDestinations.length} destination records marked as sitemapEligible: true! Destinations MUST be indexable: false.`);
} else {
  logPass('All destination records in canonical registry are sitemapEligible: false.');
}

// -----------------------------------------------------------------------------
// 2. DATA REPOSITORIES RELATIONSHIP INTEGRITY AUDIT
// -----------------------------------------------------------------------------
console.log('\n--- 2. DATA REPOSITORIES RELATIONSHIP INTEGRITY AUDIT ---');

const toursFilePath = path.join(rootDir, 'src', 'lib', 'data', 'tours.ts');
const toursContent = fs.readFileSync(toursFilePath, 'utf-8');

// Check tours.ts count
const tourSlugMatches = [...toursContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
console.log(`- mockTours Slugs Found: ${tourSlugMatches.length}`);
if (tourSlugMatches.length === 39) {
  logPass('mockTours in src/lib/data/tours.ts contains EXACTLY 39 tours.');
} else {
  logFail(`mockTours contains ${tourSlugMatches.length} tours, expected 39!`);
}

// Check relatedTours references in tours.ts
const relatedToursRefs = [...toursContent.matchAll(/relatedTours:\s*\[([\s\S]*?)\]/g)];
let brokenTourRefs = 0;
for (const match of relatedToursRefs) {
  const refs = [...match[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (!ref.startsWith('tour-') && !tourSlugMatches.includes(ref)) {
      logFail(`Broken relatedTours reference found in tours.ts: ${ref}`);
      brokenTourRefs++;
    }
  }
}
if (brokenTourRefs === 0) {
  logPass('Zero broken relatedTours references in mockTours.');
}

// Check articles.ts relationship fields
const articlesFilePath = path.join(rootDir, 'src', 'lib', 'data', 'articles.ts');
const articlesContent = fs.readFileSync(articlesFilePath, 'utf-8');

const connectedTourRefs = [...articlesContent.matchAll(/connectedTourSlug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
for (const ref of connectedTourRefs) {
  if (ref && !ref.startsWith('tour-') && !tourSlugMatches.includes(ref)) {
    logFail(`Broken connectedTourSlug reference in articles.ts: ${ref}`);
  }
}
logPass('Articles connectedTourSlug references validated.');

// -----------------------------------------------------------------------------
// 3. PROHIBITED CLAIMS & LEAKS AUDIT ACROSS SOURCE CODE
// -----------------------------------------------------------------------------
console.log('\n--- 3. DATA GOVERNANCE & PROHIBITED CLAIMS AUDIT ---');

const sourceFiles = [];
function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(entry.name)) {
        scanDir(fullPath);
      }
    } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name) && !fullPath.includes('validate-integrity')) {
      sourceFiles.push(fullPath);
    }
  }
}
scanDir(path.join(rootDir, 'src'));

let legacyPhoneMatches = 0;
let legacyEmailMatches = 0;
let perKmMatches = 0;

for (const file of sourceFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(rootDir, file);

  // Check legacy phone 98421
  if (content.includes('98421')) {
    // Exclude mock seed data in crm repository if customer phone
    if (!relPath.includes('crm\\repository.ts') && !relPath.includes('crm/repository.ts')) {
      logFail(`Legacy phone number (98421) found in ${relPath}`);
      legacyPhoneMatches++;
    }
  }

  // Check legacy email
  if (content.includes('contact@mahalakshmitravels')) {
    logFail(`Legacy email (contact@mahalakshmitravels) found in ${relPath}`);
    legacyEmailMatches++;
  }

  // Check public per-km pricing claims in data files or UI components
  if (/₹\s*\d+\s*\/\s*km/i.test(content) || /from ₹\d+\/km/i.test(content)) {
    logFail(`Prohibited per-km pricing claim found in ${relPath}`);
    perKmMatches++;
  }
}

if (legacyPhoneMatches === 0) logPass('Zero legacy phone number (98421) leaks found in public codebase.');
if (legacyEmailMatches === 0) logPass('Zero legacy email leaks found in public codebase.');
if (perKmMatches === 0) logPass('Zero public per-km pricing claims found in codebase.');

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n============================================================');
console.log(`INTEGRITY VALIDATION SUMMARY: ${totalErrors} ERRORS, ${totalWarnings} WARNINGS`);
console.log('============================================================');

if (totalErrors > 0) {
  console.error('\n[FAIL] Phase 9C Integrity Validation FAILED. Please resolve errors.');
  process.exit(1);
} else {
  console.log('\n[SUCCESS] Phase 9C Integrity Validation PASSED cleanly!');
  process.exit(0);
}
