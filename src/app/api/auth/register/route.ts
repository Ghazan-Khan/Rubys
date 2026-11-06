import { NextResponse } from 'next/server';
import { AuthError, createSession, registerUser, sessionCookieOptions } from '@/lib/auth';
import { isValidEmail, isValidPakistaniPhone } from '@/lib/format';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : '';
  const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (firstName.length < 1 || lastName.length < 1) {
    return NextResponse.json({ success: false, message: 'Please enter your first and last name.' }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (!isValidPakistaniPhone(phone)) {
    return NextResponse.json(
      { success: false, message: 'Please enter a valid Pakistani mobile number (e.g. 03001234567).' },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { success: false, message: 'Your password must be at least 8 characters long.' },
      { status: 400 }
    );
  }

  try {
    const user = registerUser({ firstName, lastName, email, phone, password });
    const session = createSession(user.id);
    const response = NextResponse.json({ success: true, user });
    response.cookies.set({ ...sessionCookieOptions, value: session.token });
    return response;
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    }
    console.error('Registration failed', error);
    return NextResponse.json(
      { success: false, message: 'Could not create your account right now.' },
      { status: 500 }
    );
  }
}
