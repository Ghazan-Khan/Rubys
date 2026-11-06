'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  ShieldCheckIcon,
  TagIcon,
  TrashIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { formatPKR } from '@/lib/format';

export default function CartView() {
  const {
    items,
    ready,
    subtotal,
    discount,
    coupon,
    total,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [applying, setApplying] = useState(false);

  async function handleCouponSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setApplying(true);
    const result = await applyCoupon(couponCode);
    setCouponMessage({ type: result.success ? 'success' : 'error', text: result.message });
    setApplying(false);
    if (result.success) setCouponCode('');
  }

  if (!ready) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />
        <div className="h-80 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">
        <p className="text-5xl">🛒</p>
        <h2 className="mt-4 text-xl font-bold text-charcoal-900">Your cart is empty</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-charcoal-500">
          Looks like you have not added anything yet. Explore our best sellers and new arrivals.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/shop" className="btn-primary">
            Continue shopping
          </Link>
          <Link href="/wishlist" className="btn-secondary">
            View wishlist
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3">
          <p className="text-sm font-semibold text-charcoal-800">
            {items.reduce((sum, item) => sum + item.quantity, 0)} item
            {items.reduce((sum, item) => sum + item.quantity, 0) === 1 ? '' : 's'} in your cart
          </p>
          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-medium text-charcoal-400 transition hover:text-rose-600"
          >
            Clear cart
          </button>
        </div>

        <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 p-4 sm:gap-4">
              <Link
                href={`/product/${item.slug}`}
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 text-4xl sm:h-24 sm:w-24"
                aria-label={item.name}
              >
                {item.emoji || '🛍️'}
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-ruby-600">
                      {item.categoryName}
                    </p>
                    <Link href={`/product/${item.slug}`} className="mt-0.5 block truncate text-sm font-semibold text-charcoal-900 hover:text-ruby-600">
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-[11px] text-charcoal-400">SKU: {item.sku}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="rounded-lg p-1.5 text-charcoal-400 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-3">
                  <div className="flex items-center rounded-lg border border-gray-300">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="p-1.5 text-charcoal-500 hover:text-ruby-600"
                    >
                      <MinusIcon className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-8 text-center text-xs font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stockQuantity}
                      aria-label="Increase quantity"
                      className="p-1.5 text-charcoal-500 hover:text-ruby-600 disabled:opacity-30"
                    >
                      <PlusIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-charcoal-900">{formatPKR(item.price * item.quantity)}</p>
                    {item.originalPrice && (
                      <p className="text-[11px] text-charcoal-400 line-through">
                        {formatPKR(item.originalPrice * item.quantity)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ruby-600 hover:text-ruby-700">
          ← Continue shopping
        </Link>
      </div>

      <aside className="lg:sticky lg:top-32 lg:h-fit">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-charcoal-900">Order summary</h2>

          <div className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between text-charcoal-600">
              <span>Subtotal</span>
              <span className="font-semibold text-charcoal-900">{formatPKR(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Coupon ({coupon?.code})</span>
                <span className="font-semibold">− {formatPKR(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-charcoal-600">
              <span>Shipping</span>
              <span className="text-xs">Calculated at checkout</span>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-charcoal-900">Total</span>
                <span className="text-xl font-extrabold text-charcoal-900">{formatPKR(total)}</span>
              </div>
              <p className="mt-1 text-right text-[10px] text-charcoal-400">Inclusive of all taxes</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-amber-50 p-3 text-[11px] leading-5 text-amber-800">
            <p className="flex items-center gap-1.5 font-semibold">
              <TruckIcon className="h-4 w-4" /> Free delivery in KPK over Rs. 2,000
            </p>
            {subtotal < 2000 && (
              <p className="mt-0.5">Add {formatPKR(2000 - subtotal)} more to qualify.</p>
            )}
          </div>

          <Link href="/checkout" className="btn-primary mt-4 w-full py-3">
            Proceed to checkout <ArrowRightIcon className="h-4 w-4" />
          </Link>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-charcoal-400">
            <ShieldCheckIcon className="h-3.5 w-3.5" /> Secure checkout · No hidden fees
          </div>

          <div className="mt-5 border-t border-gray-100 pt-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-700">
              <TagIcon className="h-4 w-4 text-ruby-600" /> Have a coupon?
            </p>
            {coupon ? (
              <div className="mt-2 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2">
                <span className="text-xs font-semibold text-emerald-800">{coupon.code} applied</span>
                <button
                  type="button"
                  onClick={() => {
                    removeCoupon();
                    setCouponMessage(null);
                  }}
                  className="text-[11px] font-medium text-emerald-700 underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleCouponSubmit} className="mt-2 flex gap-2">
                <label htmlFor="coupon" className="sr-only">
                  Coupon code
                </label>
                <input
                  id="coupon"
                  value={couponCode}
                  onChange={(event) => setCouponCode(event.target.value.toUpperCase())}
                  placeholder="e.g. RUBY10"
                  className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-xs uppercase outline-none focus:border-ruby-400 focus:ring-2 focus:ring-ruby-100"
                />
                <button type="submit" disabled={applying} className="btn-secondary px-3 py-2 text-xs">
                  {applying ? '…' : 'Apply'}
                </button>
              </form>
            )}
            {couponMessage && (
              <p className={`mt-2 text-[11px] font-medium ${couponMessage.type === 'success' ? 'text-emerald-700' : 'text-rose-600'}`}>
                {couponMessage.text}
              </p>
            )}
            <p className="mt-2 text-[10px] text-charcoal-400">Try RUBY10 for 10% off your first order.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
