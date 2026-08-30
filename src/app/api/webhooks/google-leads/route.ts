/**
 * MAHALAKSHMI TOUR & TRAVEL — GOOGLE ADS LEAD FORM WEBHOOK
 * POST /api/webhooks/google-leads
 */

import { NextRequest, NextResponse } from 'next/server';
import { CrmRepository } from '@/lib/crm/repository';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Google Ads Lead Form payload structure
    const googleKey = body.google_key;
    const leadId = body.lead_id || `g-lead-${Date.now()}`;
    const userColumnData = body.user_column_data || [];

    let name = 'Google Ad Lead';
    let phone = '+91 98421 00000';
    let email = '';
    let destinations = ['Munnar Tour'];

    // Map column values sent by Google Lead Form
    for (const col of userColumnData) {
      if (col.column_id === 'FULL_NAME' || col.column_name?.toLowerCase().includes('name')) {
        name = col.string_value;
      }
      if (col.column_id === 'PHONE_NUMBER' || col.column_name?.toLowerCase().includes('phone')) {
        phone = col.string_value;
      }
      if (col.column_id === 'EMAIL' || col.column_name?.toLowerCase().includes('email')) {
        email = col.string_value;
      }
    }

    const created = await CrmRepository.createEnquiry({
      name,
      phone,
      email: email || undefined,
      destinations,
      travellerCount: 4,
      groupType: 'family',
      notes: `Captured via Google Ads Lead Form (Lead ID: ${leadId}, Campaign ID: ${body.campaign_id || 'PMax'})`,
      status: 'NEW_ENQUIRY',
      priority: 'HOT',
      attribution: {
        source: 'google_ads',
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: `campaign_${body.campaign_id || 'search'}`,
        gclid: body.gclid || leadId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Google lead successfully ingested',
      leadId: created.id,
    });
  } catch (error) {
    console.error('Error processing Google Lead webhook:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
