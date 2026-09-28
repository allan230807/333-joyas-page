import { cookies } from 'next/headers';
import { SESSION_COOKIE } from './constants';
import { sign } from './session';

interface AdminUser {
  id: number;
  email: string;
  role: string;
}

const USERS = [
  { id: 1, email: 'ararciahurtado@gmail.com', password: 'Akira100*' },
  { id: 2, email: 'alexander', password: '050305' },
];

export async function login(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  const user = USERS.find((u) => u.email === email && u.password === password);

  if (!user) {
    return { success: false, error: 'Credenciales inválidas' };
  }

  const sessionData = JSON.stringify({
    id: user.id,
    email: user.email,
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
    user: { id: user.id, email: user.email, role: 'admin' },
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
