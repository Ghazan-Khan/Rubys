'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import OrderTimeline from '@/components/orders/OrderTimeline';
import OrderSummaryCard from '@/components/orders/OrderSummaryCard';
import type { Order } from '@/types';

export default function TrackOrderForm() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const response = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber, phone }),
      });
      const data = (await response.json()) as { success?: boolean; message?: string; order?: Order };
      if (!response.ok || !data.success || !data.order) {
        setError(data.message || 'Could not find that order.');
        return;
      }
      setOrder(data.order);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="track-order-number" className="label-field">Order number</label>
            <input
              id="track-order-number"
              required
              value={orderNumber}
              onChange={(event) => setOrderNumber(event.target.value.toUpperCase())}
              className="input-field"
              placeholder="RB-241105-1234"
            />
          </div>
          <div>
            <label htmlFor="track-phone" className="label-field">Mobile number</label>
            <input
              id="track-phone"
              type="tel"
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="input-field"
              placeholder="03001234567"
            />
          </div>
        </div>
        <p className="mt-2 text-[11px] text-charcoal-400">
          Use the order number from your confirmation email and the phone number entered at checkout.
        </p>

        {error && (
          <p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-medium text-rose-700" role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary mt-4 w-full py-3">
          <MagnifyingGlassIcon className="h-4 w-4" />
          {loading ? 'Looking up your order…' : 'Track order'}
        </button>
      </form>

      {order && (
        <div className="space-y-5">
          <OrderTimeline order={order} />
          <OrderSummaryCard order={order} />
        </div>
      )}
    </div>
  );
}
