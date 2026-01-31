import { getAdminFromRequest } from '@/lib/auth';
import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const admin = getAdminFromRequest(request);

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const contacts = await query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );

    return NextResponse.json({ success: true, contacts });
  } catch (error) {
    console.error('[v0] Fetch contacts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
