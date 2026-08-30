/**
 * MAHALAKSHMI TOUR & TRAVEL — ADMIN ENQUIRIES LIST & CREATE API
 * GET /api/admin/enquiries
 * POST /api/admin/enquiries
 */

import { NextRequest, NextResponse } from 'next/server';
import { CrmRepository } from '@/lib/crm/repository';
import { LeadStatus, AdSource, LeadPriority } from '@/types/crm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = (searchParams.get('status') || 'ALL') as LeadStatus | 'ALL';
    const source = (searchParams.get('source') || 'ALL') as AdSource | 'ALL';
    const priority = (searchParams.get('priority') || 'ALL') as LeadPriority | 'ALL';
    const search = searchParams.get('q') || '';

    const enquiries = await CrmRepository.getAllEnquiries({
      status,
      source,
      priority,
      search,
    });

    return NextResponse.json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    console.error('Error fetching admin enquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve enquiries.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Customer Name and Phone number are required.' },
        { status: 400 }
      );
    }

    const created = await CrmRepository.createEnquiry({
      ...body,
      attribution: body.attribution || { source: 'phone_call' },
    });

    return NextResponse.json({
      success: true,
      message: 'Enquiry successfully created.',
      enquiry: created,
    });
  } catch (error) {
    console.error('Error creating enquiry manually:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create enquiry.' },
      { status: 500 }
    );
  }
}
