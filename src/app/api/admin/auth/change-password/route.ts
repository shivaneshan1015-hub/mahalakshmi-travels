/**
 * MAHALAKSHMI TOUR & TRAVEL — CHANGE ADMIN PASSWORD API
 * POST /api/admin/auth/change-password
 */

import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_CREDENTIALS, createSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Current password and new password are required.' },
        { status: 400 }
      );
    }

    if (currentPassword !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json(
        { success: false, error: 'Incorrect current password. Please try again.' },
        { status: 401 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    // Update in-memory credentials for current process
    ADMIN_CREDENTIALS.password = newPassword;

    // Issue refreshed session
    const token = createSessionToken(ADMIN_CREDENTIALS.email);
    const response = NextResponse.json({
      success: true,
      message: 'Owner password updated successfully.',
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to change password.' },
      { status: 500 }
    );
  }
}
