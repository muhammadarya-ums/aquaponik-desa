import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host');
  const { pathname } = req.nextUrl;

  // Jika diakses dari domain .id
  if (hostname === 'aquaponik-desa.id' || hostname === 'www.aquaponik-desa.id') {
    // Biarkan jika request sudah mengarah ke /coming-soon (mencegah infinite rewrite)
    if (pathname === '/coming-soon') {
      return NextResponse.next();
    }

    // Paksa semua URL lain di domain .id ke halaman coming-soon
    return NextResponse.rewrite(new URL('/coming-soon', req.url));
  }

  // Jika diakses dari domain vercel.app, jalankan normal
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};