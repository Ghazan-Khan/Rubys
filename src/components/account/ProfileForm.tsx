'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/types';

export default function ProfileForm({ user }: { user: User }) {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/account/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !data.success) {
        setStatus('error');
        setMessage(data.message || 'Could not update your profile.');
        return;
      }
      setStatus('success');
      setMessage('Your details have been saved.');
      router.refresh();
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-bold text-charcoal-900">Personal details</h2>
      <p className="mt-1 text-xs text-charcoal-500">Keep your contact information up to date for smoother deliveries.</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="account-first-name" className="label-field">First name</label>
          <input
            id="account-first-name"
            required
            value={form.firstName}
            onChange={(event) => update('firstName', event.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="account-last-name" className="label-field">Last name</label>
          <input
            id="account-last-name"
            required
            value={form.lastName}
            onChange={(event) => update('lastName', event.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="account-email" className="label-field">Email address</label>
          <input id="account-email" value={user.email} disabled className="input-field bg-gray-50 text-charcoal-400" />
          <p className="mt-1 text-[10px] text-charcoal-400">Contact support to change your email.</p>
        </div>
        <div>
          <label htmlFor="account-phone" className="label-field">Mobile number</label>
          <input
            id="account-phone"
            type="tel"
            required
            value={form.phone}
            onChange={(event) => update('phone', event.target.value)}
            className="input-field"
          />
        </div>
      </div>

      {message && (
        <p className={`mt-3 text-xs font-medium ${status === 'success' ? 'text-emerald-700' : 'text-rose-600'}`} role="status">
          {message}
        </p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-primary mt-4 px-5 py-2 text-sm">
        {status === 'loading' ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  );
}
