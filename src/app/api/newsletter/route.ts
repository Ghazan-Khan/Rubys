import { NextResponse } from 'next/server';
import { subscribeNewsletter } from '@/lib/marketing';
import { isValidEmail } from '@/lib/format';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const email = typeof (body as { email?: unknown })?.email === 'string'
    ? String((body as { email: string }).email)
    : '';

  if (!isValidEmail(email)) {
    return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    const result = subscribeNewsletter(email);
    return NextResponse.json({
      success: true,
      message: result.alreadySubscribed
        ? 'You are already on the list — thank you!'
        : "You're subscribed. Welcome to Ruby's.pk!",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Could not subscribe right now. Please try again.' },
      { status: 500 }
    );
  }
}
