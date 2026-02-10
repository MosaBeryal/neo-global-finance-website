import { query, isDatabaseAvailable } from '@/lib/db';
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

    // Check if database is available
    if (!isDatabaseAvailable()) {
      // In preview mode without database, return success but don't process
      if (process.env.NODE_ENV === 'development') {
        console.log('[v0] Contact form received (preview mode, database unavailable):', {
          firstName,
          lastName,
          email,
        });
        return NextResponse.json(
          {
            success: true,
            message: 'Contact form submitted successfully (preview mode)',
            preview: true,
          },
          { status: 201 }
        );
      }
    }

    try {
      // Insert contact into database
      const result: any = await query(
        'INSERT INTO contacts (first_name, last_name, email, company, message) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, email, company || null, message]
      );

      const contactId = result.insertId;

      // Send confirmation email
      try {
        await sendConfirmationEmail(contactId, email, firstName);
      } catch (emailError) {
        console.error('[v0] Email send error:', emailError);
        // Continue even if email fails - form was submitted
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Contact form submitted successfully',
          contactId,
        },
        { status: 201 }
      );
    } catch (dbError: any) {
      // If database is not available in development, treat as preview mode
      if (
        process.env.NODE_ENV === 'development' &&
        (dbError?.code === 'ECONNREFUSED' || dbError?.message?.includes('ECONNREFUSED'))
      ) {
        return NextResponse.json(
          {
            success: true,
            message: 'Contact form submitted successfully (preview mode)',
            preview: true,
          },
          { status: 201 }
        );
      }
      throw dbError;
    }
  } catch (error) {
    console.error('[v0] Contact submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
