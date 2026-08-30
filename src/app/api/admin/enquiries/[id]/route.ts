/**
 * MAHALAKSHMI TOUR & TRAVEL — ADMIN ENQUIRY DETAIL, UPDATE & DELETE API
 * GET /api/admin/enquiries/[id]
 * PATCH /api/admin/enquiries/[id]
 * DELETE /api/admin/enquiries/[id]
 */

import { NextRequest, NextResponse } from 'next/server';
import { CrmRepository } from '@/lib/crm/repository';
import { sendMetaConversionEvent } from '@/lib/crm/ad-conversions';

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const enquiry = await CrmRepository.getEnquiryById(id);

    if (!enquiry) {
      return NextResponse.json(
        { success: false, error: 'Enquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      enquiry,
    });
  } catch (error) {
    console.error('Error fetching enquiry detail:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const updated = await CrmRepository.updateEnquiry(id, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Enquiry not found' },
        { status: 404 }
      );
    }

    // If marked as BOOKED, trigger Meta Conversions API Purchase/Conversion event
    if (body.status === 'BOOKED') {
      sendMetaConversionEvent({
        eventName: 'Purchase',
        leadData: updated,
        value: updated.quotedAmount || updated.estimatedValue || 35000,
      }).catch((err) => console.warn('Meta CAPI purchase notice:', err));
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry updated successfully.',
      enquiry: updated,
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update enquiry' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const success = await CrmRepository.deleteEnquiry(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Enquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete enquiry' },
      { status: 500 }
    );
  }
}
