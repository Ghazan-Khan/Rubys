import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { addAddress, deleteAddress, getAddressesForUser, setDefaultAddress } from '@/lib/addresses';
import { isValidPakistaniPhone } from '@/lib/format';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: 'Please sign in.' }, { status: 401 });
  }
  return NextResponse.json({ success: true, addresses: getAddressesForUser(user.id) });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: 'Please sign in.' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const addressLine1 = typeof body.addressLine1 === 'string' ? body.addressLine1.trim() : '';
  const addressLine2 = typeof body.addressLine2 === 'string' ? body.addressLine2.trim() : '';
  const city = typeof body.city === 'string' ? body.city.trim() : '';
  const province = typeof body.province === 'string' ? body.province.trim() : '';
  const postalCode = typeof body.postalCode === 'string' ? body.postalCode.trim() : '';
  const isDefault = body.isDefault === true;

  if (!fullName || !addressLine1 || !city || !province) {
    return NextResponse.json({ success: false, message: 'Please complete the address fields.' }, { status: 400 });
  }
  if (!isValidPakistaniPhone(phone)) {
    return NextResponse.json({ success: false, message: 'Please enter a valid mobile number.' }, { status: 400 });
  }

  const address = addAddress(user.id, {
    fullName,
    phone,
    addressLine1,
    addressLine2,
    city,
    province,
    postalCode,
    isDefault,
  });
  return NextResponse.json({ success: true, address });
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: 'Please sign in.' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const addressId = typeof body.addressId === 'string' ? body.addressId : '';
  if (!addressId || !setDefaultAddress(user.id, addressId)) {
    return NextResponse.json({ success: false, message: 'Address not found.' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: 'Please sign in.' }, { status: 401 });
  }

  const addressId = new URL(request.url).searchParams.get('id') || '';
  if (!addressId || !deleteAddress(user.id, addressId)) {
    return NextResponse.json({ success: false, message: 'Address not found.' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
