import { loginAdmin, createAdminUser, hashPassword } from '@/lib/auth';
import { query, queryOne, isDatabaseAvailable, getDatabaseError } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check if database is available
    if (!isDatabaseAvailable()) {
      const dbError = getDatabaseError();
      return NextResponse.json(
        {
          error: 'Database connection failed',
          dbError: dbError,
          message: 'Please set up MySQL and configure environment variables. See ADMIN_SETUP.md for instructions.',
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required' },
        { status: 400 }
      );
    }

    // Check if any admin exists
    const adminCount: any = await queryOne(
      'SELECT COUNT(*) as count FROM admin_users'
    );

    // If no admin exists, create the first admin with provided credentials
    if (adminCount.count === 0) {
      const result = await createAdminUser(username, password, `${username}@neoglobalfinance.com`);
      const token = await loginAdmin(username, password);
      return NextResponse.json(
        {
          success: true,
          message: 'Admin account created and logged in',
          ...token,
        },
        { status: 201 }
      );
    }

    // Otherwise, attempt login
    const result = await loginAdmin(username, password);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        token: result.token,
        adminId: result.adminId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[v0] Admin login error:', error);

    // Check if it's a database connection error
    if (
      error?.code === 'ECONNREFUSED' ||
      error?.message?.includes('ECONNREFUSED') ||
      error?.message?.includes('MySQL')
    ) {
      const dbError = getDatabaseError();
      return NextResponse.json(
        {
          error: 'Database connection failed',
          dbError: dbError,
          message: 'MySQL server is not running. Start MySQL and restart the dev server.',
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: 'An error occurred',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined,
      },
      { status: 500 }
    );
  }
}
