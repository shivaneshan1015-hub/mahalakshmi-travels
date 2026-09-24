import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toursFilePath = path.join(__dirname, '../src/lib/data/tours.ts');

const slugToIdMap = {
  'madurai-meenakshi-amman-temple': 'tour-madurai',
  'madurai': 'tour-madurai',
  'rameshwaram': 'tour-rameshwaram',
  'tiruchendur-and-rameshwaram': 'tour-tiruchendur-and-rameshwaram',
  'tiruchendur-rameshwaram': 'tour-tiruchendur-and-rameshwaram',
  'padmanabhaswamy-temple': 'tour-padmanabhaswamy-temple',
  'thanjavur-big-temple': 'tour-thanjavur',
  'thanjavur': 'tour-thanjavur',
  'palani-murugan-temple': 'tour-palani-murugan-temple',
  'tirupathi-balaji': 'tour-tirupathi-balaji-temple',
  'tirupathi-balaji-temple': 'tour-tirupathi-balaji-temple',
  'velankanni-shrine': 'tour-velankanni-shrine',
  'kodaikanal': 'tour-kodaikanal',
  'munnar': 'tour-munnar',
  'ooty': 'tour-ooty',
  'courtallam': 'tour-courtallam',
  'yercaud': 'tour-yercaud',
  'thekkady': 'tour-thekkady',
  'vagamon': 'tour-vagamon',
  'athirapally': 'tour-athirapally',
  'wayanad': 'tour-wayanad',
  'coorg': 'tour-coorg',
  'chikmagalur': 'tour-chikmagalur',
  'kanyakumari': 'tour-kanyakumari',
  'alappuzha': 'tour-alappuzha',
  'kochi': 'tour-kochi',
  'varkala': 'tour-varkala',
  'thiruvananthapuram': 'tour-thiruvananthapuram',
  'pondicherry': 'tour-pondicherry',
  'gokarna': 'tour-gokarna',
  'varkala-jatayu': 'tour-varkala-jatayu-earths-center',
  'varkala-jatayu-earths-center': 'tour-varkala-jatayu-earths-center',
  'varkala-munroe': 'tour-varkala-and-munroe',
  'varkala-and-munroe': 'tour-varkala-and-munroe',
  'mysore': 'tour-mysore',
  'bangalore': 'tour-bangalore',
  'hyderabad': 'tour-hyderabad',
  'ramoji-film-city': 'tour-ramoji-film-city',
  'wonderla': 'tour-wonderla',
  'black-thunder': 'tour-black-thunder',
  'vagamon-adventure': 'tour-vagamon-adventure',
  'kanthalur-adventure': 'tour-kanthalloor-adventure',
  'kanthalloor-adventure': 'tour-kanthalloor-adventure',
  'munnar-trekking': 'tour-munnar-trekking',
  'mysore-adventure': 'tour-mysore-adventure',
  'kanakapura-adventure': 'tour-kanakapura-adventure',
};

// Also map existing IDs to stable IDs
const idToIdMap = {
  'tour-madurai-meenakshi-amman': 'tour-madurai',
  'tour-madurai': 'tour-madurai',
  'tour-rameshwaram': 'tour-rameshwaram',
  'tour-tiruchendur-rameshwaram': 'tour-tiruchendur-and-rameshwaram',
  'tour-tiruchendur-and-rameshwaram': 'tour-tiruchendur-and-rameshwaram',
  'tour-padmanabhaswamy-temple': 'tour-padmanabhaswamy-temple',
  'tour-thanjavur-big-temple': 'tour-thanjavur',
  'tour-thanjavur': 'tour-thanjavur',
  'tour-palani-murugan-temple': 'tour-palani-murugan-temple',
  'tour-tirupathi-balaji': 'tour-tirupathi-balaji-temple',
  'tour-tirupathi-balaji-temple': 'tour-tirupathi-balaji-temple',
  'tour-velankanni-shrine': 'tour-velankanni-shrine',
  'tour-kodaikanal': 'tour-kodaikanal',
  'tour-munnar': 'tour-munnar',
  'tour-ooty': 'tour-ooty',
  'tour-courtallam': 'tour-courtallam',
  'tour-yercaud': 'tour-yercaud',
  'tour-thekkady': 'tour-thekkady',
  'tour-vagamon': 'tour-vagamon',
  'tour-athirapally': 'tour-athirapally',
  'tour-wayanad': 'tour-wayanad',
  'tour-coorg': 'tour-coorg',
  'tour-chikmagalur': 'tour-chikmagalur',
  'tour-kanyakumari': 'tour-kanyakumari',
  'tour-alappuzha': 'tour-alappuzha',
  'tour-kochi': 'tour-kochi',
  'tour-varkala': 'tour-varkala',
  'tour-thiruvananthapuram': 'tour-thiruvananthapuram',
  'tour-pondicherry': 'tour-pondicherry',
  'tour-gokarna': 'tour-gokarna',
  'tour-varkala-jatayu': 'tour-varkala-jatayu-earths-center',
  'tour-varkala-jatayu-earths-center': 'tour-varkala-jatayu-earths-center',
  'tour-varkala-munroe': 'tour-varkala-and-munroe',
  'tour-varkala-and-munroe': 'tour-varkala-and-munroe',
  'tour-mysore': 'tour-mysore',
  'tour-bangalore': 'tour-bangalore',
  'tour-hyderabad': 'tour-hyderabad',
  'tour-ramoji-film-city': 'tour-ramoji-film-city',
  'tour-wonderla': 'tour-wonderla',
  'tour-black-thunder': 'tour-black-thunder',
  'tour-vagamon-adventure': 'tour-vagamon-adventure',
  'tour-kanthalur-adventure': 'tour-kanthalloor-adventure',
  'tour-kanthalloor-adventure': 'tour-kanthalloor-adventure',
  'tour-munnar-trekking': 'tour-munnar-trekking',
  'tour-mysore-adventure': 'tour-mysore-adventure',
  'tour-kanakapura-adventure': 'tour-kanakapura-adventure',
};

let content = fs.readFileSync(toursFilePath, 'utf8');

// Replace IDs and slugs
content = content.replace(/id: 'tour-tiruchendur-rameshwaram'/g, "id: 'tour-tiruchendur-and-rameshwaram'");
content = content.replace(/slug: 'tiruchendur-rameshwaram'/g, "slug: 'tiruchendur-and-rameshwaram'");

content = content.replace(/id: 'tour-thanjavur-big-temple'/g, "id: 'tour-thanjavur-legacy-merged'");
content = content.replace(/id: 'tour-madurai-meenakshi-amman'/g, "id: 'tour-madurai-legacy-merged'");

content = content.replace(/id: 'tour-tirupathi-balaji'/g, "id: 'tour-tirupathi-balaji-temple'");
content = content.replace(/slug: 'tirupathi-balaji'/g, "slug: 'tirupathi-balaji-temple'");

content = content.replace(/id: 'tour-varkala-jatayu'/g, "id: 'tour-varkala-jatayu-earths-center'");
content = content.replace(/slug: 'varkala-jatayu'/g, "slug: 'varkala-jatayu-earths-center'");

content = content.replace(/id: 'tour-varkala-munroe'/g, "id: 'tour-varkala-and-munroe'");
content = content.replace(/slug: 'varkala-munroe'/g, "slug: 'varkala-and-munroe'");

content = content.replace(/id: 'tour-kanthalur-adventure'/g, "id: 'tour-kanthalloor-adventure'");
content = content.replace(/slug: 'kanthalur-adventure'/g, "slug: 'kanthalloor-adventure'");
content = content.replace(/canonicalUrl: 'https:\/\/mahalakshmitravels\.com\/tours\/kanthalur-adventure'/g, "canonicalUrl: 'https://mahalakshmitravels.com/tours/kanthalloor-adventure'");

// Replace relatedTours array elements
content = content.replace(/relatedTours:\s*\[([^\]]+)\]/g, (match, p1) => {
  const items = p1.split(',').map((s) => s.trim().replace(/['"]/g, ''));
  const mapped = items
    .map((item) => slugToIdMap[item] || idToIdMap[item] || (item.startsWith('tour-') ? item : `tour-${item}`))
    .filter(Boolean);
  // remove duplicates
  const uniqueMapped = [...new Set(mapped)];
  return `relatedTours: [${uniqueMapped.map((x) => `'${x}'`).join(', ')}]`;
});

fs.writeFileSync(toursFilePath, content, 'utf8');
console.log('Processed tours.ts mapping');
