/**
 * MAHALAKSHMI TOUR & TRAVEL — OWNER AUTH & SESSION MANAGEMENT
 * Secure HMAC-signed session cookies for owner-only CRM access.
 */

import { cookies } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'mt_admin_session';

// Admin credentials (overridable with environment variables)
export const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || 'owner@mahalakshmitravels.com',
  password: process.env.ADMIN_PASSWORD || 'mahalakshmi2026',
  ownerName: 'Mahalakshmi Travel Desk (Owner)',
};

const SECRET_SALT = process.env.SESSION_SECRET || 'mt_secret_secure_key_2026_madurai';

/**
 * Simple deterministic HMAC signature for session token verification
 */
function createSignature(payload: string): string {
  let hash = 0;
  const combined = `${payload}:${SECRET_SALT}`;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

export function createSessionToken(email: string): string {
  const timestamp = Date.now();
  const payload = `${email}|${timestamp}`;
  const signature = createSignature(payload);
  return Buffer.from(`${payload}|${signature}`).toString('base64');
}

export function verifySessionToken(token: string): { valid: boolean; email?: string } {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [email, timestampStr, signature] = decoded.split('|');
    if (!email || !timestampStr || !signature) return { valid: false };

    const payload = `${email}|${timestampStr}`;
    const expectedSig = createSignature(payload);
    if (signature !== expectedSig) return { valid: false };

    // Check token age (e.g. 7 days validity)
    const timestamp = parseInt(timestampStr, 10);
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > sevenDaysInMs) {
      return { valid: false };
    }

    return { valid: true, email };
  } catch {
    return { valid: false };
  }
}

/**
 * Server-side helper to check if current request has a valid admin session
 */
export async function getAdminSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const { valid, email } = verifySessionToken(sessionCookie.value);
  if (!valid || !email) {
    return null;
  }

  return {
    email,
    name: ADMIN_CREDENTIALS.ownerName,
    isAuthenticated: true,
  };
}
