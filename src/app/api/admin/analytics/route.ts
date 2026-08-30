/**
 * MAHALAKSHMI TOUR & TRAVEL — ADMIN CRM ANALYTICS API
 * GET /api/admin/analytics
 */

import { NextResponse } from 'next/server';
import { CrmRepository } from '@/lib/crm/repository';

export async function GET() {
  try {
    const analytics = await CrmRepository.getAnalytics();
    return NextResponse.json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.error('Error calculating CRM analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to compute analytics.' },
      { status: 500 }
    );
  }
}
