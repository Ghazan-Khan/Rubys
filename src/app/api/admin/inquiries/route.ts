import { NextResponse } from 'next/server';
import { AdminError, listAdminContactMessages, updateContactMessageStatus, listNewsletterSubscribers } from '@/lib/admin';
import { getClientIp, requireAdminApi } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'messages';

  if (type === 'newsletter') {
    const subscribers = listNewsletterSubscribers();
    return NextResponse.json({ success: true, subscribers }, { headers: { 'Cache-Control': 'no-store' } });
  }

  const result = listAdminContactMessages({
    status: url.searchParams.get('status') || undefined,
    page: Number(url.searchParams.get('page') || '1') || 1,
    pageSize: 20,
  });
  return NextResponse.json({ success: true, ...result }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  let body: { id: string; status: 'new' | 'read' | 'replied' | 'closed' };
  try { body = await request.json(); }
  catch { return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 }); }

  try {
    const message = updateContactMessageStatus(body.id, body.status, auth.user, getClientIp(request));
    return NextResponse.json({ success: true, message }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof AdminError) return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    return NextResponse.json({ success: false, message: 'Could not update message.' }, { status: 500 });
  }
}
