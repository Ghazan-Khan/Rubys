import { NextResponse } from 'next/server';
import { AdminError, updateBlogPost, deleteBlogPost } from '@/lib/admin';
import { getClientIp, requireAdminApi } from '@/lib/admin-auth';

export const runtime = 'nodejs';
type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;
  const { id } = await context.params;
  let body: Record<string, unknown>;
  try { body = await request.json(); }
  catch { return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 }); }

  try {
    const post = updateBlogPost(id, body as any, auth.user, getClientIp(request));
    return NextResponse.json({ success: true, post }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof AdminError) return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    return NextResponse.json({ success: false, message: 'Could not update post.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;
  const { id } = await context.params;
  try {
    deleteBlogPost(id, auth.user, getClientIp(request));
    return NextResponse.json({ success: true, message: 'Post deleted.' });
  } catch (error) {
    if (error instanceof AdminError) return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    return NextResponse.json({ success: false, message: 'Could not delete post.' }, { status: 500 });
  }
}
