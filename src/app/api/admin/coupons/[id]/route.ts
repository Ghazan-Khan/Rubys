import { NextResponse } from 'next/server';
import { AdminError, deleteCoupon, updateCoupon } from '@/lib/admin';
import { getClientIp, requireAdminApi } from '@/lib/admin-auth';

export const runtime = 'nodejs';

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  const { id } = await context.params;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const coupon = updateCoupon(id, body as any, auth.user, getClientIp(request));
    return NextResponse.json(
      { success: true, message: 'Coupon updated successfully.', coupon },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    if (error instanceof AdminError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status, headers: { 'Cache-Control': 'no-store' } }
      );
    }
    console.error('Failed to update coupon', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update coupon.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  const { id } = await context.params;

  try {
    deleteCoupon(id, auth.user, getClientIp(request));
    return NextResponse.json(
      { success: true, message: 'Coupon deleted successfully.' },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    if (error instanceof AdminError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status, headers: { 'Cache-Control': 'no-store' } }
      );
    }
    console.error('Failed to delete coupon', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete coupon.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
