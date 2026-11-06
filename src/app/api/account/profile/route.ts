import { NextResponse } from 'next/server';
import { AuthError, getCurrentUser, updateUserProfile } from '@/lib/auth';
import { isValidPakistaniPhone } from '@/lib/format';

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

  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : '';
  const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';

  if (!firstName || !lastName) {
    return NextResponse.json({ success: false, message: 'Please enter your first and last name.' }, { status: 400 });
  }
  if (!isValidPakistaniPhone(phone)) {
    return NextResponse.json({ success: false, message: 'Please enter a valid mobile number.' }, { status: 400 });
  }

  try {
    const updated = updateUserProfile(user.id, { firstName, lastName, phone });
    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    }
    console.error('Profile update failed', error);
    return NextResponse.json({ success: false, message: 'Could not update your profile.' }, { status: 500 });
  }
}
