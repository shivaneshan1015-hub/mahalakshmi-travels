/**
 * MAHALAKSHMI TOUR & TRAVEL — ADMIN ENQUIRY NOTES API
 * POST /api/admin/enquiries/[id]/notes
 */

import { NextRequest, NextResponse } from 'next/server';
import { CrmRepository } from '@/lib/crm/repository';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { note, author = 'Owner (Madurai Desk)' } = body;

    if (!note || note.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Note text cannot be empty.' },
        { status: 400 }
      );
    }

    const updated = await CrmRepository.addNote(id, note.trim(), author);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Enquiry not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Note logged successfully.',
      enquiry: updated,
    });
  } catch (error) {
    console.error('Error adding note to enquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add note.' },
      { status: 500 }
    );
  }
}
