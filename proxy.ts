import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './services/auth.service';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  const isEmployerRoute = path.startsWith('/employer');
  const isCandidateRoute = path.startsWith('/candidate');
  const isAdminRoute = path.startsWith('/admin');

  if (isEmployerRoute || isCandidateRoute || isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role-based Access Control (RBAC) - Admins have universal access
    if (isEmployerRoute && payload.role !== 'EMPLOYER' && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/candidate', request.url));
    }

    if (isCandidateRoute && payload.role !== 'CANDIDATE' && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/employer', request.url));
    }

    if (isAdminRoute && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url)); // Forbidden entry
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/employer/:path*', '/candidate/:path*', '/admin/:path*'],
};
