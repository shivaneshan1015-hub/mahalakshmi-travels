import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toursFilePath = path.join(__dirname, '../src/lib/data/tours.ts');
let content = fs.readFileSync(toursFilePath, 'utf8');

// Remove tour-madurai-legacy-merged block (from line starting `{ id: 'tour-madurai-legacy-merged'` up to matching `},`)
const maduraiLegacyRegex = /\s*\{\s*id:\s*'tour-madurai-legacy-merged'[\s\S]*?canonicalUrl:[^\}]*\}\s*\},/g;
content = content.replace(maduraiLegacyRegex, '');

// Remove tour-thanjavur-legacy-merged block
const thanjavurLegacyRegex = /\s*\{\s*id:\s*'tour-thanjavur-legacy-merged'[\s\S]*?canonicalUrl:[^\}]*\}\s*\},/g;
content = content.replace(thanjavurLegacyRegex, '');

// Update getTourBySlug function at the bottom of tours.ts
const oldGetTourBySlug = `export function getTourBySlug(slug: string): Tour | undefined {
  return mockTours.find((t) => t.slug === slug || t.id === slug);
}`;

const newGetTourBySlug = `export function getTourBySlug(slug: string): Tour | undefined {
  if (slug === 'madurai-meenakshi-amman-temple') {
    return mockTours.find((t) => t.id === 'tour-madurai');
  }
  if (slug === 'thanjavur-big-temple') {
    return mockTours.find((t) => t.id === 'tour-thanjavur');
  }
  return mockTours.find((t) => t.slug === slug || t.id === slug);
}`;

content = content.replace(oldGetTourBySlug, newGetTourBySlug);

fs.writeFileSync(toursFilePath, content, 'utf8');
console.log('Removed legacy merged tours and updated getTourBySlug');
