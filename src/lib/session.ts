import crypto from 'crypto';
import { SESSION_COOKIE } from './constants';

const SECRET_KEY = process.env.AUTH_SECRET || '333-joyas-secret-key-change-in-production';

export function sign(data: string): string {
  return crypto.createHmac('sha256', SECRET_KEY).update(data).digest('hex');
}

export function verify(data: string, signature: string): boolean {
  const expected = sign(data);
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function verifySessionToken(token: string | undefined): { id: number; email: string; role: string } | null {
  if (!token) return null;

  try {
    const [dataBase64, signature] = token.split('.');
    if (!dataBase64 || !signature) return null;

    const sessionData = Buffer.from(dataBase64, 'base64').toString();
    if (!verify(sessionData, signature)) return null;

    const session = JSON.parse(sessionData);

    if (session.exp < Date.now()) return null;

    return { id: session.id, email: session.email, role: session.role };
  } catch {
    return null;
  }
}

export function getSessionFromCookies(cookies: { get: (name: string) => { value: string } | undefined }): { id: number; email: string; role: string } | null {
  const token = cookies.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
