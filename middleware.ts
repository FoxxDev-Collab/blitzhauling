import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    if (!req.auth) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect to admin if already logged in and trying to access login page
  if (pathname === '/login' && req.auth) {
    const adminUrl = new URL('/admin', req.url);
    return NextResponse.redirect(adminUrl);
  }

  // Add pathname to headers so layout can access it
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  return response;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
