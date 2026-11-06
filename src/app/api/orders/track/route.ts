import { NextResponse } from 'next/server';
import { getOrderByNumberAndPhone } from '@/lib/orders';
import { isValidPakistaniPhone } from '@/lib/format';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const orderNumber = typeof body.orderNumber === 'string' ? body.orderNumber.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';

  if (!orderNumber) {
    return NextResponse.json({ success: false, message: 'Please enter your order number.' }, { status: 400 });
  }
  if (!isValidPakistaniPhone(phone)) {
    return NextResponse.json(
      { success: false, message: 'Please enter the mobile number used for the order.' },
      { status: 400 }
    );
  }

  const order = getOrderByNumberAndPhone(orderNumber, phone);
  if (!order) {
    return NextResponse.json(
      { success: false, message: 'No order matched those details. Check the order number and phone number.' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, order });
}
