import { get, run } from '@/lib/db';
import { randomUUID } from 'node:crypto';

type Row = Record<string, unknown>;

export function subscribeNewsletter(email: string): { alreadySubscribed: boolean } {
  const normalized = email.trim().toLowerCase();
  const existing = get<Row>(
    'SELECT id, is_active FROM newsletter_subscribers WHERE email = ? COLLATE NOCASE',
    [normalized]
  );

  if (existing) {
    if (Number(existing.is_active)) return { alreadySubscribed: true };
    run(
      `UPDATE newsletter_subscribers
       SET is_active = 1, subscribed_at = datetime('now'), unsubscribed_at = NULL
       WHERE id = ?`,
      [String(existing.id)]
    );
    return { alreadySubscribed: false };
  }

  run(
    'INSERT INTO newsletter_subscribers (id, email) VALUES (?, ?)',
    [randomUUID(), normalized]
  );
  return { alreadySubscribed: false };
}

export function saveContactMessage(input: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const id = randomUUID();
  run(
    `INSERT INTO contact_messages (id, name, email, phone, subject, message)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      id,
      input.name.trim(),
      input.email.trim().toLowerCase(),
      input.phone?.trim() || null,
      input.subject?.trim() || 'Website enquiry',
      input.message.trim(),
    ]
  );
  return id;
}
