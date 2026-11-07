import { NextResponse } from 'next/server';
import { destroySession, getSessionToken, SESSION_COOKIE } from '@/lib/auth';
import { isSameOrigin } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { success: false, message: 'Invalid request origin.' },
      { status: 403, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const token = await getSessionToken();
  if (token) destroySession(token);

  const response = NextResponse.json(
    { success: true },
    { headers: { 'Cache-Control': 'no-store' } }
  );
  response.cookies.set({
    name: SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  return response;
}
