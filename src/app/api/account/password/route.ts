import { NextResponse } from 'next/server';
import { AuthError, changePassword, getCurrentUser } from '@/lib/auth';

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

  const currentPassword = typeof body.currentPassword === 'string' ? body.currentPassword : '';
  const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ success: false, message: 'Please fill in both password fields.' }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json(
      { success: false, message: 'Your new password must be at least 8 characters long.' },
      { status: 400 }
    );
  }

  try {
    changePassword(user.id, currentPassword, newPassword);
    return NextResponse.json({ success: true, message: 'Your password has been updated.' });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    }
    console.error('Password change failed', error);
    return NextResponse.json({ success: false, message: 'Could not update your password.' }, { status: 500 });
  }
}
