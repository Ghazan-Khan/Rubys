import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { createOrder, OrderError } from '@/lib/orders';
import { PAYMENT_METHODS } from '@/lib/constants';
import { isValidEmail, isValidPakistaniPhone } from '@/lib/format';
import type { PaymentMethod } from '@/types';

const LAST_ORDER_COOKIE = 'rubys_last_order';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const user = await getCurrentUser();

  const items = Array.isArray(body.items)
    ? (body.items as Array<{ productId?: unknown; quantity?: unknown }>).map((item) => ({
        productId: typeof item?.productId === 'string' ? item.productId : '',
        quantity: Number(item?.quantity),
      }))
    : [];

  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : '';
  const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const addressLine1 = typeof body.addressLine1 === 'string' ? body.addressLine1.trim() : '';
  const addressLine2 = typeof body.addressLine2 === 'string' ? body.addressLine2.trim() : '';
  const city = typeof body.city === 'string' ? body.city.trim() : '';
  const province = typeof body.province === 'string' ? body.province.trim() : '';
  const postalCode = typeof body.postalCode === 'string' ? body.postalCode.trim() : '';
  const notes = typeof body.notes === 'string' ? body.notes.trim() : '';
  const couponCode = typeof body.couponCode === 'string' ? body.couponCode.trim() : '';
  const paymentMethod = typeof body.paymentMethod === 'string' ? body.paymentMethod : 'cod';

  if (!firstName || !lastName) {
    return NextResponse.json({ success: false, message: 'Please enter your full name.' }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (!isValidPakistaniPhone(phone)) {
    return NextResponse.json(
      { success: false, message: 'Please enter a valid Pakistani mobile number (e.g. 03001234567).' },
      { status: 400 }
    );
  }
  if (!addressLine1 || !city || !province) {
    return NextResponse.json(
      { success: false, message: 'Please complete your shipping address.' },
      { status: 400 }
    );
  }
  if (!PAYMENT_METHODS.some((method) => method.id === paymentMethod)) {
    return NextResponse.json({ success: false, message: 'Please choose a valid payment method.' }, { status: 400 });
  }
  if (items.length === 0 || items.some((item) => !item.productId || !Number.isFinite(item.quantity))) {
    return NextResponse.json({ success: false, message: 'Your cart is empty or invalid.' }, { status: 400 });
  }

  try {
    const order = createOrder({
      userId: user?.id ?? null,
      items,
      firstName,
      lastName,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      notes,
      paymentMethod: paymentMethod as PaymentMethod,
      couponCode: couponCode || undefined,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Order placed successfully.',
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
    });

    response.cookies.set({
      name: LAST_ORDER_COOKIE,
      value: order.orderNumber,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    if (error instanceof OrderError) {
      return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    }
    console.error('Order creation failed', error);
    return NextResponse.json(
      { success: false, message: 'Could not place your order right now. Please try again.' },
      { status: 500 }
    );
  }
}
