import { cookies } from 'next/headers';
import { SESSION_COOKIE } from './constants';
import crypto from 'crypto';

// Admin credentials (hashed comparison)
const ADMIN_EMAIL = 'ararciahurtado@gmail.com';
const ADMIN_PASSWORD = 'Akira100*';
const SECRET_KEY = process.env.AUTH_SECRET || '333-joyas-secret-key-change-in-production';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + SECRET_KEY).digest('hex');
}

function sign(data: string): string {
  return crypto.createHmac('sha256', SECRET_KEY).update(data).digest('hex');
}

function verify(data: string, signature: string): boolean {
  const expected = sign(data);
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

interface AdminUser {
  id: number;
  email: string;
  role: string;
}

export async function login(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  const passwordHash = hashPassword(password);

  if (email !== ADMIN_EMAIL || passwordHash !== hashPassword(ADMIN_PASSWORD)) {
    return { success: false, error: 'Credenciales inválidas' };
  }

  // Create session token
  const sessionData = JSON.stringify({
    id: 1,
    email: ADMIN_EMAIL,
    role: 'admin',
    exp: Date.now() + 24 * 60 * 60 * 1000,
  });
  const signature = sign(sessionData);
  const token = `${Buffer.from(sessionData).toString('base64')}.${signature}`;

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60,
    path: '/',
  });

  return {
    success: true,
    user: { id: 1, email: ADMIN_EMAIL, role: 'admin' },
  };
}

export async function logout(): Promise<void> {
  cookies().delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<AdminUser | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const [dataBase64, signature] = token.split('.');
    if (!dataBase64 || !signature) return null;

    // Verify signature
    const sessionData = Buffer.from(dataBase64, 'base64').toString();
    if (!verify(sessionData, signature)) return null;

    const session = JSON.parse(sessionData);

    // Check expiration
    if (session.exp < Date.now()) {
      cookies().delete(SESSION_COOKIE);
      return null;
    }

    return { id: session.id, email: session.email, role: session.role };
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<AdminUser | null> {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') return null;
  return user;
}
