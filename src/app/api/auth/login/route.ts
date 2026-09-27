import { NextResponse } from 'next/server';
import { login } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const limiter = rateLimit({ interval: 60, max: 5 });
  const check = limiter.check(request);

  if (!check.success) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Intenta de nuevo en un minuto.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    const result = await login(email, password);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: result.user,
    });
  } catch {
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}
