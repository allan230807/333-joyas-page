import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  // No middleware - auth is handled client-side in login page
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
