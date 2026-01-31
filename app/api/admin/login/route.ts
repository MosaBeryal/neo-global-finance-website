import { loginAdmin, createAdminUser, hashPassword } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
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
  } catch (error) {
    console.error('[v0] Admin login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
