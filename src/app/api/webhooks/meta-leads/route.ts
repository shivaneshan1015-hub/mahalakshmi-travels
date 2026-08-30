/**
 * MAHALAKSHMI TOUR & TRAVEL — META (FACEBOOK / INSTAGRAM) LEAD ADS WEBHOOK
 * GET /api/webhooks/meta-leads (Challenge verification)
 * POST /api/webhooks/meta-leads (Lead capture ingestion)
 */

import { NextRequest, NextResponse } from 'next/server';
import { CrmRepository } from '@/lib/crm/repository';

const META_VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || 'mahalakshmi_meta_verify_2026';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === META_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Iterate through entry events from Meta
    if (body.object === 'page') {
      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          if (change.field === 'leadgen') {
            const leadgenId = change.value?.leadgen_id;
            const formId = change.value?.form_id;
            const pageId = change.value?.page_id;

            // In production, fetch leadgen details from Graph API using leadgenId
            // Here we safely create and log the lead into our CRM repository
            await CrmRepository.createEnquiry({
              name: `Meta Lead (#${leadgenId?.slice(-4) || 'New'})`,
              phone: '+91 98421 00000',
              destinations: ['South India Tour'],
              travellerCount: 4,
              groupType: 'family',
              notes: `Captured via Meta Lead Form ID: ${formId} on Page ${pageId}`,
              status: 'NEW_ENQUIRY',
              priority: 'HOT',
              attribution: {
                source: 'meta_ads',
                utm_source: 'meta',
                utm_medium: 'paid_social',
                utm_campaign: `form_${formId}`,
                fbclid: leadgenId,
              },
            });
          }
        }
      }
    }

    return NextResponse.json({ success: true, received: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing Meta Webhook:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
