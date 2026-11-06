import { NextResponse } from 'next/server';
import { AuthError, createSession, loginUser, sessionCookieOptions } from '@/lib/auth';
import { isValidEmail } from '@/lib/format';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!isValidEmail(email) || !password) {
    return NextResponse.json(
      { success: false, message: 'Enter your email address and password.' },
      { status: 400 }
    );
  }

  try {
    const user = loginUser(email, password);
    const session = createSession(user.id);
    const response = NextResponse.json({ success: true, user });
    response.cookies.set({ ...sessionCookieOptions, value: session.token });
    return response;
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    }
    console.error('Login failed', error);
    return NextResponse.json({ success: false, message: 'Could not sign in right now.' }, { status: 500 });
  }
}
