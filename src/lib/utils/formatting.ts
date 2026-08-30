/**
 * MAHALAKSHMI TOUR & TRAVEL — FORMATTING UTILITIES
 */

/**
 * Formats distance with unit and brand styling anchor
 */
export function formatDistance(distanceKm: number): string {
  return `${distanceKm} KM`;
}

/**
 * Formats duration days/nights
 */
export function formatDuration(nights: number, days: number): string {
  const n = nights < 10 ? `0${nights}` : `${nights}`;
  const d = days < 10 ? `0${days}` : `${days}`;
  return `${n} ${nights === 1 ? 'NIGHT' : 'NIGHTS'} / ${d} ${days === 1 ? 'DAY' : 'DAYS'}`;
}

/**
 * Formats seating capacity text
 */
export function formatCapacity(seats: number): string {
  const s = seats < 10 ? `0${seats}` : `${seats}`;
  return `${s} SEATS`;
}

/**
 * Clean phone number formatter for display (+91 98421 23456)
 */
export function formatPhoneNumber(phone: string): string {
  return phone;
}
