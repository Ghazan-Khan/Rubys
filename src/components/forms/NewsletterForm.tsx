'use client';

import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface NewsletterFormProps {
  compact?: boolean;
}

export default function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !data.success) {
        setStatus('error');
        setMessage(data.message || 'Could not subscribe. Please try again.');
        return;
      }
      setStatus('success');
      setMessage(data.message || "You're subscribed. Welcome to Ruby's.pk!");
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? '' : 'mx-auto max-w-md'}>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <label htmlFor={compact ? 'newsletter-email-compact' : 'newsletter-email'} className="sr-only">
          Email address
        </label>
        <input
          id={compact ? 'newsletter-email-compact' : 'newsletter-email'}
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email address"
          className="min-w-0 flex-1 rounded-lg border-0 px-4 py-3 text-sm text-charcoal-900 outline-none ring-2 ring-transparent transition focus:ring-white/70"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg bg-charcoal-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-charcoal-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      {message && (
        <p
          className={`mt-2.5 flex items-center gap-1.5 text-xs font-medium ${
            status === 'success' ? 'text-emerald-100' : 'text-amber-100'
          }`}
          role="status"
        >
          {status === 'success' && <CheckCircleIcon className="h-4 w-4" />}
          {message}
        </p>
      )}
      <p className="mt-2 text-[11px] text-ruby-100/80">
        By subscribing you agree to our{' '}
        <a href="/privacy-policy" className="underline underline-offset-2 hover:text-white">
          privacy policy
        </a>
        . Unsubscribe any time.
      </p>
    </form>
  );
}
