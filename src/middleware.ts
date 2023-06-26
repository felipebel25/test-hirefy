// middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const session: any = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  const roleAdmin = ['admin']
  // middleware /api/dashboard
  if (request.nextUrl.pathname.startsWith('/api/admin')) {

    if (!session) {
      return new Response(JSON.stringify({ message: 'No authorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    if (!roleAdmin.includes(session.user.role)) {
      return new Response(JSON.stringify({ message: 'You do not have permissions for this action' }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }

  if (!session) {
    const requestedPage = request.nextUrl.pathname;
    const url = request.nextUrl.clone()

    url.pathname = '/auth/login';
    url.search = `p=${requestedPage}`;

    return NextResponse.redirect(url)

  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!roleAdmin.includes(session.user.role)) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)

    }
    // This logic is only applied to /dashboard
  return NextResponse.next()

  }


  // return NextResponse.redirect(new URL('/about-2', request.url))

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/address', '/checkout/summary', '/admin/:path*', '/api/admin/:path*'],
}