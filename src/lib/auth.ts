import { cookies } from 'next/headers';
import { SESSION_COOKIE } from './constants';
import { sign } from './session';
import crypto from 'crypto';

const ADMIN_EMAIL = 'ararciahurtado@gmail.com';
const ADMIN_PASSWORD = 'Akira100*';
const SECRET = '333joyas-secure-secret-2024';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + SECRET).digest('hex');
}

interface AdminUser {
  id: number;
  email: string;
  role: string;
}

export async function login(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return { success: false, error: 'Credenciales inválidas' };
  }

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
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const sessionData = Buffer.from(parts[0], 'base64').toString();
    const { verify } = await import('./session');
    if (!verify(sessionData, parts[1])) return null;

    const session = JSON.parse(sessionData);
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
