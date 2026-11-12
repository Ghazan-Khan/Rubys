import { NextResponse } from 'next/server';
import { AdminError, createCoupon, listAdminCoupons } from '@/lib/admin';
import { getClientIp, requireAdminApi } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

  try {
    const coupons = listAdminCoupons();
    return NextResponse.json(
      { success: true, coupons },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Failed to list coupons', error);
    return NextResponse.json(
      { success: false, message: 'Could not fetch coupons.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminApi(request);
  if ('response' in auth) return auth.response;

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
    const coupon = createCoupon(
      {
        code: String(body.code || ''),
        type: body.type === 'fixed' ? 'fixed' : 'percentage',
        value: Number(body.value || 0),
        minOrderAmount: Number(body.minOrderAmount || 0),
        maxDiscountAmount: body.maxDiscountAmount ? Number(body.maxDiscountAmount) : null,
        usageLimit: body.usageLimit ? Number(body.usageLimit) : null,
        startsAt: body.startsAt ? String(body.startsAt) : null,
        expiresAt: body.expiresAt ? String(body.expiresAt) : null,
        isActive: body.isActive !== false,
      },
      auth.user,
      getClientIp(request)
    );

    return NextResponse.json(
      { success: true, message: 'Coupon created successfully.', coupon },
      { status: 201, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    if (error instanceof AdminError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status, headers: { 'Cache-Control': 'no-store' } }
      );
    }
    console.error('Failed to create coupon', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create coupon.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
