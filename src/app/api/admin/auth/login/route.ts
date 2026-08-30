/**
 * MAHALAKSHMI TOUR & TRAVEL — ADMIN LOGIN API
 * POST /api/admin/auth/login
 */

import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_CREDENTIALS, ADMIN_COOKIE_NAME, createSessionToken } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, email } = body;

    const expectedPassword = ADMIN_CREDENTIALS.password;
    const adminEmail = email || ADMIN_CREDENTIALS.email;

    if (!password || password.trim() !== expectedPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid owner access password. Please try again.' },
        { status: 401 }
      );
    }

    // Generate secure session token
    const token = createSessionToken(adminEmail);

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful. Welcome, Mahalakshmi Travel Desk.',
      user: {
        email: adminEmail,
        name: ADMIN_CREDENTIALS.ownerName,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error during authentication.' },
      { status: 500 }
    );
  }
}
