import { getAdminFromRequest } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { sendReplyEmail } from '@/lib/email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = getAdminFromRequest(request);

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { message } = body;
    const contactId = parseInt(params.id);

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get contact details
    const contact = await queryOne(
      'SELECT first_name, email FROM contacts WHERE id = ?',
      [contactId]
    );

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    // Send reply email
    const emailResult = await sendReplyEmail(
      contactId,
      contact.email,
      contact.first_name,
      message
    );

    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Failed to send email', details: emailResult.error },
        { status: 500 }
      );
    }

    // Update contact status to 'replied'
    await query(
      'UPDATE contacts SET status = ? WHERE id = ?',
      ['replied', contactId]
    );

    return NextResponse.json({
      success: true,
      message: 'Reply email sent successfully',
    });
  } catch (error) {
    console.error('[v0] Send reply error:', error);
    return NextResponse.json(
      { error: 'Failed to send reply' },
      { status: 500 }
    );
  }
}
