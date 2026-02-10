import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { query, queryOne } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(adminId: number): string {
  return jwt.sign({ adminId }, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): { adminId: number } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { adminId: number };
    return decoded;
  } catch {
    return null;
  }
}

export async function createAdminUser(username: string, password: string, email: string) {
  const passwordHash = await hashPassword(password);
  const result = await query(
    'INSERT INTO admin_users (username, password_hash, email) VALUES (?, ?, ?)',
    [username, passwordHash, email]
  );
  return result;
}

export async function loginAdmin(username: string, password: string) {
  const admin = await queryOne(
    'SELECT id, password_hash FROM admin_users WHERE username = ?',
    [username]
  );

  if (!admin) {
    return { success: false, error: 'Invalid credentials' };
  }

  const isPasswordValid = await comparePassword(password, admin.password_hash);

  if (!isPasswordValid) {
    return { success: false, error: 'Invalid credentials' };
  }

  const token = generateToken(admin.id);
  return { success: true, token, adminId: admin.id };
}

export function getAdminFromRequest(request: Request): { adminId: number } | null {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return null;
  }

  return verifyToken(token);
}
