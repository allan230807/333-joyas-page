import crypto from 'crypto';
import { SESSION_COOKIE } from './constants';

// Hardcoded secret for simplicity (works everywhere without env vars)
const SECRET = '333joyas-secure-secret-2024';

export function sign(data: string): string {
  return crypto.createHmac('sha256', SECRET).update(data).digest('hex');
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
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const dataBase64 = parts[0];
    const signature = parts[1];

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
