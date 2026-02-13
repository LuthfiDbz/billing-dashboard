import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from './lib/supabase/server'

export async function middleware(request: NextRequest) {
const supabase = await createClient()
  // 1. Ambil URL yang sedang dibuka user
  const url = request.nextUrl.clone()
  const { data: { user } } = await supabase.auth.getUser()
  console.log(user)

  // Redirect to login if not authenticated
  if (!user && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Redirect to dashboard if already logged in
  if (user && url.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

// 4. FILTER: Jalankan middleware ini HANYA untuk path "/"
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}