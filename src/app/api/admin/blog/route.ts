import { NextResponse } from 'next/server';
import { AdminError, listAdminBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/admin';
import { getClientIp, requireAdminApi } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  const posts = listAdminBlogPosts();
  return NextResponse.json({ success: true, posts }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  let body: Record<string, unknown>;
  try { body = await request.json(); }
  catch { return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 }); }

  try {
    const post = createBlogPost(body as any, auth.user, getClientIp(request));
    return NextResponse.json({ success: true, message: 'Post created.', post }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof AdminError) return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    console.error('Blog create failed', error);
    return NextResponse.json({ success: false, message: 'Could not create post.' }, { status: 500 });
  }
}
