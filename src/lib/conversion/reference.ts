/**
 * MAHALAKSHMI TOUR & TRAVEL — ENQUIRY REFERENCE GENERATOR
 * Produces clean, readable reference codes for customer travel inquiries (e.g. ML-26-4821)
 */

export function generateEnquiryReference(): string {
  const yearSuffix = new Date().getFullYear().toString().slice(-2);
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `ML-${yearSuffix}-${randomNum}`;
}
