import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import rateLimiter from './lib/rate-limit';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    
    const { success } = rateLimiter.check(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intenta de nuevo mas tarde.' },
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
