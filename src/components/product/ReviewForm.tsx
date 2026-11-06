'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StarIcon } from '@heroicons/react/24/solid';

export default function ReviewForm({ productId }: { productId: string }) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, rating, title, comment }),
      });
      const data = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !data.success) {
        setStatus('error');
        setMessage(data.message || 'Could not submit your review.');
        return;
      }
      setStatus('success');
      setMessage('Thank you — your review has been published.');
      setTitle('');
      setComment('');
      router.refresh();
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-bold text-charcoal-900">Write a review</h3>
      <p className="mt-1 text-xs text-charcoal-500">Share your experience to help other shoppers.</p>

      <div className="mt-4">
        <span className="mb-1.5 block text-xs font-semibold text-charcoal-600">Your rating</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
              aria-label={`${value} star${value > 1 ? 's' : ''}`}
              className="p-0.5"
            >
              <StarIcon
                className={`h-6 w-6 transition ${
                  value <= (hover || rating) ? 'text-amber-400' : 'text-gray-200'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="review-title" className="mb-1.5 block text-xs font-semibold text-charcoal-600">
          Title
        </label>
        <input
          id="review-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={100}
          placeholder="Sums up your experience"
          className="input-field py-2 text-sm"
        />
      </div>

      <div className="mt-3">
        <label htmlFor="review-comment" className="mb-1.5 block text-xs font-semibold text-charcoal-600">
          Review
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          required
          minLength={10}
          maxLength={1200}
          rows={4}
          placeholder="What did you like or dislike? How was the quality and delivery?"
          className="input-field py-2 text-sm"
        />
      </div>

      {message && (
        <p className={`mt-3 text-xs font-medium ${status === 'success' ? 'text-emerald-700' : 'text-rose-600'}`}>
          {message}
        </p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-primary mt-4 w-full py-2 text-sm">
        {status === 'loading' ? 'Publishing…' : 'Submit review'}
      </button>
    </form>
  );
}
