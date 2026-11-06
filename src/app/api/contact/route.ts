import { NextResponse } from 'next/server';
import { saveContactMessage } from '@/lib/marketing';
import { isValidEmail } from '@/lib/format';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (name.length < 2) {
    return NextResponse.json({ success: false, message: 'Please enter your full name.' }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json(
      { success: false, message: 'Please add a little more detail (at least 10 characters).' },
      { status: 400 }
    );
  }
  if (message.length > 4000) {
    return NextResponse.json({ success: false, message: 'Your message is too long.' }, { status: 400 });
  }

  try {
    saveContactMessage({ name, email, phone, subject, message });
    return NextResponse.json({
      success: true,
      message: 'Thank you — your message has been received. We usually reply within one business day.',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Could not send your message right now. Please try again.' },
      { status: 500 }
    );
  }
}
