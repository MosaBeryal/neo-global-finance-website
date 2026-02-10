import { query } from '@/lib/db';
import { sendConfirmationEmail } from '@/lib/email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, message } = body;

    // Validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert contact into database
    const result: any = await query(
      'INSERT INTO contacts (first_name, last_name, email, company, message) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, company || null, message]
    );

    const contactId = result.insertId;

    // Send confirmation email
    await sendConfirmationEmail(contactId, email, firstName);

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        contactId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Contact submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
