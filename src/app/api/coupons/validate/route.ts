import { NextResponse } from 'next/server';
import { validateCoupon } from '@/lib/coupons';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const code = typeof body.code === 'string' ? body.code : '';
  const subtotal = Number(body.subtotal);

  if (!Number.isFinite(subtotal) || subtotal < 0) {
    return NextResponse.json({ success: false, message: 'Invalid cart total.' }, { status: 400 });
  }

  const result = validateCoupon(code, subtotal);
  if (result.error || !result.coupon) {
    return NextResponse.json(
      { success: false, message: result.error || 'This coupon is not valid.' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: `Coupon applied — you save Rs. ${result.discount.toLocaleString('en-PK')}.`,
    discount: result.discount,
    coupon: {
      code: result.coupon.code,
      type: result.coupon.type,
      value: result.coupon.value,
      minOrderAmount: result.coupon.minOrderAmount,
      maxDiscountAmount: result.coupon.maxDiscountAmount,
    },
  });
}
