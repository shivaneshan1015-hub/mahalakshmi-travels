/**
 * MAHALAKSHMI TOUR & TRAVEL — ADMIN ME / SESSION CHECK API
 * GET /api/admin/auth/me
 */

import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth/session';

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json(
      { success: false, authenticated: false },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    authenticated: true,
    user: {
      email: session.email,
      name: session.name,
    },
  });
}
