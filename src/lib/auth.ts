import { getDb } from './db';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { SESSION_COOKIE } from './constants';

const SESSION_DURATION_HOURS = 24;

export interface User {
  id: number;
  email: string;
  role: string;
}

export interface Session {
  id: string;
  user_id: number;
  expires_at: string;
}

export async function login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  const db = getDb();
  const user = db.prepare('SELECT id, email, password_hash, role FROM users WHERE email = ?').get(email) as
    | { id: number; email: string; password_hash: string; role: string }
    | undefined;

  if (!user) {
    return { success: false, error: 'Credenciales inválidas' };
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return { success: false, error: 'Credenciales inválidas' };
  }

  // Create session
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000).toISOString();

  db.prepare('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)').run(
    sessionId,
    user.id,
    expiresAt
  );

  // Set cookie
  cookies().set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION_HOURS * 60 * 60,
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
    const db = getDb();
    db.prepare('DELETE FROM sessions WHERE id = ?').run(sessionId);
  }
  cookies().delete(SESSION_COOKIE);
}

export async function getSession(): Promise<Session | null> {
  const sessionId = cookies().get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const db = getDb();
  const session = db.prepare('SELECT id, user_id, expires_at FROM sessions WHERE id = ?').get(sessionId) as
    | Session
    | undefined;

  if (!session) return null;

  // Check expiration
  if (new Date(session.expires_at) < new Date()) {
    db.prepare('DELETE FROM sessions WHERE id = ?').run(sessionId);
    cookies().delete(SESSION_COOKIE);
    return null;
  }

  return session;
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  if (!session) return null;

  const db = getDb();
  const user = db.prepare('SELECT id, email, role FROM users WHERE id = ?').get(session.user_id) as
    | User
    | undefined;

  return user || null;
}

export async function requireAdmin(): Promise<User | null> {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') return null;
  return user;
}
