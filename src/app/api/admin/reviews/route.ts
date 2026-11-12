import { NextResponse } from 'next/server';
import { AdminError, listAdminReviews, approveReview, rejectReview, deleteReview } from '@/lib/admin';
import { getClientIp, requireAdminApi } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  const url = new URL(request.url);
  const result = listAdminReviews({
    query: url.searchParams.get('q') || undefined,
    status: (url.searchParams.get('status') as 'all' | 'approved' | 'pending') || 'all',
    rating: url.searchParams.get('rating') ? Number(url.searchParams.get('rating')) : undefined,
    page: Number(url.searchParams.get('page') || '1') || 1,
    pageSize: 20,
  });

  return NextResponse.json({ success: true, ...result }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  let body: { id: string; action: 'approve' | 'reject' | 'delete' };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const ip = getClientIp(request);
  try {
    if (body.action === 'approve') {
      const review = approveReview(body.id, auth.user, ip);
      return NextResponse.json({ success: true, review });
    } else if (body.action === 'reject') {
      const review = rejectReview(body.id, auth.user, ip);
      return NextResponse.json({ success: true, review });
    } else if (body.action === 'delete') {
      deleteReview(body.id, auth.user, ip);
      return NextResponse.json({ success: true, message: 'Review deleted.' });
    }
    return NextResponse.json({ success: false, message: 'Invalid action.' }, { status: 400 });
  } catch (error) {
    if (error instanceof AdminError) {
      return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    }
    console.error('Review action failed', error);
    return NextResponse.json({ success: false, message: 'Action failed.' }, { status: 500 });
  }
}
