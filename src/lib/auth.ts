import { get, run } from '@/lib/db';
import type { User } from '@/types';
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

type Row = Record<string, unknown>;

export const SESSION_COOKIE = 'rubys_session';
const SESSION_DAYS = 30;

export class AuthError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = 'AuthError';
    this.status = status;
  }
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, salt, hash] = stored.split('$');
  if (scheme !== 'scrypt' || !salt || !hash) return false;
  try {
    const derived = scryptSync(password, salt, 64);
    const expected = Buffer.from(hash, 'hex');
    return derived.length === expected.length && timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}

function mapUser(row: Row): User {
  return {
    id: String(row.id),
    firstName: String(row.first_name),
    lastName: String(row.last_name),
    email: String(row.email),
    phone: String(row.phone),
    role: String(row.role) as User['role'],
    emailVerified: Boolean(row.email_verified),
    isActive: Boolean(row.is_active),
    createdAt: String(row.created_at),
  };
}

export function createSession(userId: string): { token: string; expiresAt: string } {
  const token = randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const expiresAt = expires.toISOString();
  run('DELETE FROM sessions WHERE expires_at <= ?', [new Date().toISOString()]);
  run(
    'INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)',
    [token, userId, expiresAt]
  );
  return { token, expiresAt };
}

export function destroySession(token: string) {
  run('DELETE FROM sessions WHERE token = ?', [token]);
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const row = get<Row>(
    `SELECT u.* FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token = ? AND s.expires_at > ? AND u.is_active = 1`,
    [token, new Date().toISOString()]
  );

  return row ? mapUser(row) : null;
}

export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export function registerUser(input: RegisterInput): User {
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();

  const existingEmail = get<Row>('SELECT id FROM users WHERE email = ? COLLATE NOCASE', [email]);
  if (existingEmail) throw new AuthError('An account with this email already exists.', 409);

  const existingPhone = get<Row>('SELECT id FROM users WHERE phone = ?', [phone]);
  if (existingPhone) throw new AuthError('An account with this phone number already exists.', 409);

  const id = randomUUID();
  run(
    `INSERT INTO users (id, first_name, last_name, email, phone, password_hash)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, input.firstName.trim(), input.lastName.trim(), email, phone, hashPassword(input.password)]
  );

  const row = get<Row>('SELECT * FROM users WHERE id = ?', [id])!;
  return mapUser(row);
}

export function loginUser(email: string, password: string): User {
  const row = get<Row>(
    'SELECT * FROM users WHERE email = ? COLLATE NOCASE AND is_active = 1',
    [email.trim().toLowerCase()]
  );

  if (!row || !verifyPassword(password, String(row.password_hash))) {
    throw new AuthError('Incorrect email or password.', 401);
  }

  return mapUser(row);
}

export function getUserById(id: string): User | null {
  const row = get<Row>('SELECT * FROM users WHERE id = ?', [id]);
  return row ? mapUser(row) : null;
}

export function updateUserProfile(userId: string, input: { firstName: string; lastName: string; phone: string }) {
  const existingPhone = get<Row>('SELECT id FROM users WHERE phone = ? AND id != ?', [input.phone.trim(), userId]);
  if (existingPhone) throw new AuthError('That phone number is already used by another account.', 409);
  run(
    'UPDATE users SET first_name = ?, last_name = ?, phone = ? WHERE id = ?',
    [input.firstName.trim(), input.lastName.trim(), input.phone.trim(), userId]
  );
  return getUserById(userId);
}

export function changePassword(userId: string, currentPassword: string, newPassword: string) {
  const row = get<Row>('SELECT password_hash FROM users WHERE id = ?', [userId]);
  if (!row || !verifyPassword(currentPassword, String(row.password_hash))) {
    throw new AuthError('Your current password is incorrect.', 400);
  }
  run('UPDATE users SET password_hash = ? WHERE id = ?', [hashPassword(newPassword), userId]);
}

export const sessionCookieOptions = {
  name: SESSION_COOKIE,
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_DAYS * 24 * 60 * 60,
};
