import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from './constants';
import { getUserByEmail, createSession, getSession, deleteSession, type User, type Session } from './db';

export interface AuthUser {
  id: number;
  email: string;
  role: string;
}

export async function login(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  const user = getUserByEmail(email);

  if (!user) {
    return { success: false, error: 'Credenciales inválidas' };
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return { success: false, error: 'Credenciales inválidas' };
  }

  const session = createSession(user.id);

  cookies().set(SESSION_COOKIE, session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60,
    path: '/',
  });

  return {
    success: true,
    user: { id: user.id, email: user.email, role: user.role },
  };
}

export async function logout(): Promise<void> {
  const sessionId = cookies().get(SESSION_COOKIE)?.value;
  if (sessionId) {
    deleteSession(sessionId);
  }
  cookies().delete(SESSION_COOKIE);
}

export async function getSessionUser(): Promise<AuthUser | null> {
  const sessionId = cookies().get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const session = getSession(sessionId);
  if (!session) return null;

  if (new Date(session.expires_at) < new Date()) {
    deleteSession(sessionId);
    cookies().delete(SESSION_COOKIE);
    return null;
  }

  const { getUserById } = await import('./db');
  const user = getUserById(session.user_id);
  if (!user) return null;

  return { id: user.id, email: user.email, role: user.role };
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  return getSessionUser();
}

export async function requireAdmin(): Promise<AuthUser | null> {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') return null;
  return user;
}
