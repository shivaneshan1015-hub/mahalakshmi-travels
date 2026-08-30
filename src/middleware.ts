/**
 * MAHALAKSHMI TOUR & TRAVEL — MIDDLEWARE FOR ADMIN & SECURITY
 * 1. Protects all /admin/* routes from unauthenticated access.
 * 2. Injects X-Robots-Tag: noindex, nofollow to prevent search engine indexing of admin and internal API routes.
 */

import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/auth/session';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Check if the path is an admin page or admin API
  const isAdminPage = pathname.startsWith('/admin');
  const isAdminLoginPage = pathname === '/admin/login';
  const isAdminApi = pathname.startsWith('/api/admin');
  const isAdminAuthApi = pathname.startsWith('/api/admin/auth');

  // 2. Add X-Robots-Tag: noindex, nofollow for all admin/api routes to guarantee SEO isolation
  const response = NextResponse.next();
  if (isAdminPage || isAdminApi || pathname.startsWith('/api/')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }

  // 3. If accessing /admin/login while already logged in, redirect to /admin
  const sessionCookie = req.cookies.get(ADMIN_COOKIE_NAME);
  const isAuthenticated = sessionCookie?.value ? verifySessionToken(sessionCookie.value).valid : false;

  if (isAdminLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // 4. If accessing protected /admin route without session, redirect to /admin/login
  if (isAdminPage && !isAdminLoginPage && !isAuthenticated) {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    const redirectResponse = NextResponse.redirect(loginUrl);
    redirectResponse.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return redirectResponse;
  }

  // 5. If accessing protected /api/admin route without session (except auth endpoints)
  if (isAdminApi && !isAdminAuthApi && !isAuthenticated) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Admin session required.' },
      { status: 401, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } }
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/:path*',
  ],
};
