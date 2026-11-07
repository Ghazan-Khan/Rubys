import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { randomUUID } from 'node:crypto';
import { getCurrentUser } from '@/lib/auth';
import { count, run } from '@/lib/db';
import type { User } from '@/types';

export const ADMIN_ROLES: Array<User['role']> = ['admin', 'manager'];

export function isAdminRole(role: string | null | undefined): boolean {
  return role === 'admin' || role === 'manager';
}

export async function getAdminUser(): Promise<User | null> {
  const user = await getCurrentUser();
  return user && isAdminRole(user.role) ? user : null;
}

/** Server-component guard. Redirects customers and guests to the admin login. */
export async function requireAdminPage(): Promise<User> {
  const user = await getAdminUser();
  if (!user) redirect('/admin/login');
  return user;
}

/** Basic same-origin / CSRF check for state-changing admin requests. */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      const originUrl = new URL(origin);
      const host = request.headers.get('host');
      if (!host || originUrl.host !== host) return false;
    } catch {
      return false;
    }
  }

  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && fetchSite !== 'same-origin' && fetchSite !== 'none') return false;

  return true;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

export type AdminApiAuth = { user: User } | { response: NextResponse };

/** Guard used by every /api/admin route. */
export async function requireAdminApi(request: Request): Promise<AdminApiAuth> {
  if (!isSameOrigin(request)) {
    return {
      response: NextResponse.json(
        { success: false, message: 'Invalid request origin.' },
        { status: 403, headers: { 'Cache-Control': 'no-store' } }
      ),
    };
  }

  const user = await getAdminUser();
  if (!user) {
    return {
      response: NextResponse.json(
        { success: false, message: 'Administrator authentication required.' },
        { status: 401, headers: { 'Cache-Control': 'no-store' } }
      ),
    };
  }

  return { user };
}

const LOGIN_WINDOW = '-15 minutes';
const MAX_FAILURES_PER_IDENTITY = 5;
const MAX_FAILURES_PER_IP = 20;

export function loginRateLimited(email: string, ip: string): boolean {
  const identityFailures = count(
    `SELECT COUNT(*) AS n FROM login_attempts
     WHERE email = ? AND ip = ? AND success = 0
       AND created_at >= datetime('now', ?)`,
    [email, ip, LOGIN_WINDOW]
  );
  if (identityFailures >= MAX_FAILURES_PER_IDENTITY) return true;

  const ipFailures = count(
    `SELECT COUNT(*) AS n FROM login_attempts
     WHERE ip = ? AND success = 0
       AND created_at >= datetime('now', ?)`,
    [ip, LOGIN_WINDOW]
  );
  return ipFailures >= MAX_FAILURES_PER_IP;
}

export function recordLoginAttempt(email: string, ip: string, success: boolean) {
  run('INSERT INTO login_attempts (email, ip, success) VALUES (?, ?, ?)', [
    email,
    ip,
    success ? 1 : 0,
  ]);
  run("DELETE FROM login_attempts WHERE created_at < datetime('now', '-1 day')");
}

export function logAdminAction(input: {
  userId: string;
  action: string;
  entityType?: string;
  entityId?: string;
  details?: unknown;
  ip?: string;
}) {
  run(
    `INSERT INTO admin_audit_log (id, user_id, action, entity_type, entity_id, details, ip)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      randomUUID(),
      input.userId,
      input.action,
      input.entityType ?? null,
      input.entityId ?? null,
      input.details == null ? null : JSON.stringify(input.details),
      input.ip ?? null,
    ]
  );
}
