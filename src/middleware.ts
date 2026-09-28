import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  // No redirects - all auth is handled client-side
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
