import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toursFilePath = path.join(__dirname, '../src/lib/data/tours.ts');
let toursContent = fs.readFileSync(toursFilePath, 'utf8');

// 1. Remove pricePerPerson and pricePerPersonText lines
toursContent = toursContent.replace(/\s*pricePerPerson:\s*\d+,?/g, '');
toursContent = toursContent.replace(/\s*pricePerPersonText:\s*['"][^'"]*['"],?/g, '');

// 2. Remove prohibited words in descriptions/highlights
toursContent = toursContent.replace(/24\/7/g, 'scheduled');
toursContent = toursContent.replace(/24x7/g, 'scheduled');
toursContent = toursContent.replace(/verified, seasoned/g, 'experienced local');
toursContent = toursContent.replace(/verified drivers/g, 'experienced drivers');
toursContent = toursContent.replace(/seasoned drivers/g, 'experienced drivers');

fs.writeFileSync(toursFilePath, toursContent, 'utf8');
console.log('Cleaned pricePerPerson and claims from tours.ts');
