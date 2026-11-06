'use client';

import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const SUBJECTS = [
  'Order support',
  'Product question',
  'Delivery or tracking',
  'Return or exchange',
  'Wholesale enquiry',
  'Something else',
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: SUBJECTS[0],
    message: '',
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !data.success) {
        setStatus('error');
        setMessage(data.message || 'Could not send your message.');
        return;
      }
      setStatus('success');
      setMessage(data.message || 'Thank you — we will be in touch soon.');
      setForm({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' });
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-charcoal-900">Send us a message</h2>
      <p className="mt-1 text-xs text-charcoal-500">Fill in the form and our team will reply within one business day.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label-field">Full name</label>
          <input
            id="contact-name"
            required
            value={form.name}
            onChange={(event) => update('name', event.target.value)}
            className="input-field"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="label-field">Email address</label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
            className="input-field"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="label-field">Mobile number (optional)</label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={(event) => update('phone', event.target.value)}
            className="input-field"
            placeholder="03001234567"
          />
        </div>
        <div>
          <label htmlFor="contact-subject" className="label-field">Subject</label>
          <select
            id="contact-subject"
            value={form.subject}
            onChange={(event) => update('subject', event.target.value)}
            className="input-field"
          >
            {SUBJECTS.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="label-field">How can we help?</label>
          <textarea
            id="contact-message"
            required
            minLength={10}
            maxLength={4000}
            rows={5}
            value={form.message}
            onChange={(event) => update('message', event.target.value)}
            className="input-field"
            placeholder="Include your order number if your question is about an order."
          />
        </div>
      </div>

      {message && (
        <p
          className={`mt-4 rounded-lg px-3 py-2.5 text-xs font-medium ${
            status === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}
          role="status"
        >
          {message}
        </p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-primary mt-4 w-full py-3 sm:w-auto">
        <PaperAirplaneIcon className="h-4 w-4" />
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
