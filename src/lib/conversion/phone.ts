/**
 * MAHALAKSHMI TOUR & TRAVEL — PHONE CONVERSION HELPERS
 */

import { siteConfig } from '@/config/site';

export function getPrimaryPhoneTelUrl(): string {
  return `tel:+${siteConfig.contact.phoneRaw}`;
}

export function getDisplayPhone(): string {
  return siteConfig.contact.phonePrimary;
}
