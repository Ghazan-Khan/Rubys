import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import {
  createSession,
  getUserById,
  hashPassword,
  sessionCookieOptions,
  verifyPassword,
} from '@/lib/auth';
import { get } from '@/lib/db';
import {
  getClientIp,
  isSameOrigin,
  loginRateLimited,
  recordLoginAttempt,
} from '@/lib/admin-auth';
import { isValidEmail } from '@/lib/format';

export const runtime = 'nodejs';

// A fixed dummy hash keeps unknown-email attempts roughly as expensive as real ones.
const DUMMY_HASH = hashPassword(randomBytes(16).toString('hex'));

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { success: false, message: 'Invalid request origin.' },
      { status: 403, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!isValidEmail(email) || !password) {
    return NextResponse.json(
      { success: false, message: 'Enter your administrator email and password.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const ip = getClientIp(request);

  if (loginRateLimited(email, ip)) {
    return NextResponse.json(
      { success: false, message: 'Too many failed attempts. Try again in 15 minutes.' },
      { status: 429, headers: { 'Cache-Control': 'no-store', 'Retry-After': '900' } }
    );
  }

  const row = get<Record<string, unknown>>(
    'SELECT * FROM users WHERE email = ? COLLATE NOCASE AND is_active = 1',
    [email]
  );

  const passwordMatches = row
    ? verifyPassword(password, String(row.password_hash))
    : verifyPassword(password, DUMMY_HASH);
  const role = row ? String(row.role) : '';

  if (!row || !passwordMatches || (role !== 'admin' && role !== 'manager')) {
    recordLoginAttempt(email, ip, false);
    return NextResponse.json(
      { success: false, message: 'Incorrect email or password.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  recordLoginAttempt(email, ip, true);

  const user = getUserById(String(row.id));
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Could not sign in right now.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const session = createSession(user.id);
  const response = NextResponse.json(
    {
      success: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
  response.cookies.set({ ...sessionCookieOptions, value: session.token });
  return response;
}
