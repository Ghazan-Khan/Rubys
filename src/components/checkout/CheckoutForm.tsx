'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CheckCircleIcon,
  CreditCardIcon,
  LockClosedIcon,
  MapPinIcon,
  ShieldCheckIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { PAYMENT_METHODS, PROVINCES, getShippingAmount, getShippingZone } from '@/lib/constants';
import { formatPKR, isValidEmail, isValidPakistaniPhone } from '@/lib/format';
import type { PaymentMethod, User } from '@/types';

interface CheckoutFormProps {
  user: User | null;
}

export default function CheckoutForm({ user }: CheckoutFormProps) {
  const router = useRouter();
  const { items, ready, subtotal, discount, coupon, total, clearCart } = useCart();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [province, setProvince] = useState('Khyber Pakhtunkhwa');
  const [city, setCity] = useState('Peshawar');
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const zone = getShippingZone(province);
  const shipping = getShippingAmount(province, total);
  const grandTotal = total + shipping;

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  function handleProvinceChange(nextProvince: string) {
    setProvince(nextProvince);
    const nextZone = getShippingZone(nextProvince);
    setCity(nextZone.cities[0] || '');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!isValidPakistaniPhone(phone)) {
      setError('Please enter a valid Pakistani mobile number (e.g. 03001234567).');
      return;
    }
    if (!acceptedTerms) {
      setError('Please agree to the terms and conditions to place your order.');
      return;
    }
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
          firstName,
          lastName,
          email,
          phone,
          addressLine1,
          addressLine2,
          city,
          province,
          postalCode,
          notes,
          paymentMethod,
          couponCode: coupon?.code,
        }),
      });
      const data = (await response.json()) as { success?: boolean; message?: string; orderNumber?: string };
      if (!response.ok || !data.success || !data.orderNumber) {
        setError(data.message || 'Could not place your order. Please try again.');
        setSubmitting(false);
        return;
      }
      clearCart();
      router.push(`/order-confirmation/${data.orderNumber}`);
    } catch {
      setError('Something went wrong while placing your order. Please try again.');
      setSubmitting(false);
    }
  }

  if (!ready) {
    return <div className="h-96 animate-pulse rounded-2xl bg-gray-100" />;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">
        <p className="text-5xl">🧾</p>
        <h2 className="mt-4 text-xl font-bold text-charcoal-900">Nothing to check out yet</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-charcoal-500">
          Add a few items to your cart, then come back here to complete your order.
        </p>
        <Link href="/shop" className="btn-primary mt-6">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="space-y-5">
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ruby-600 text-[11px] font-bold text-white">1</span>
            <h2 className="text-base font-bold text-charcoal-900">Contact details</h2>
          </div>
          {!user && (
            <p className="mt-2 text-xs text-charcoal-500">
              Checking out as a guest. You can{' '}
              <Link href="/account/login" className="font-semibold text-ruby-600 hover:underline">
                sign in
              </Link>{' '}
              to save your details for next time.
            </p>
          )}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="label-field">First name</label>
              <input id="firstName" required value={firstName} onChange={(event) => setFirstName(event.target.value)} className="input-field" placeholder="Ayesha" />
            </div>
            <div>
              <label htmlFor="lastName" className="label-field">Last name</label>
              <input id="lastName" required value={lastName} onChange={(event) => setLastName(event.target.value)} className="input-field" placeholder="Khan" />
            </div>
            <div>
              <label htmlFor="email" className="label-field">Email address</label>
              <input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="input-field" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="phone" className="label-field">Mobile number</label>
              <input id="phone" type="tel" required value={phone} onChange={(event) => setPhone(event.target.value)} className="input-field" placeholder="03001234567" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ruby-600 text-[11px] font-bold text-white">2</span>
            <h2 className="text-base font-bold text-charcoal-900">Shipping address</h2>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="addressLine1" className="label-field">Street address</label>
              <input id="addressLine1" required value={addressLine1} onChange={(event) => setAddressLine1(event.target.value)} className="input-field" placeholder="House / flat, street, area" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="addressLine2" className="label-field">Landmark or apartment (optional)</label>
              <input id="addressLine2" value={addressLine2} onChange={(event) => setAddressLine2(event.target.value)} className="input-field" placeholder="Near the markaz, second floor…" />
            </div>
            <div>
              <label htmlFor="province" className="label-field">Province</label>
              <select id="province" value={province} onChange={(event) => handleProvinceChange(event.target.value)} className="input-field">
                {PROVINCES.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="city" className="label-field">City</label>
              <select id="city" value={city} onChange={(event) => setCity(event.target.value)} className="input-field">
                {zone.cities.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="postalCode" className="label-field">Postal code (optional)</label>
              <input id="postalCode" value={postalCode} onChange={(event) => setPostalCode(event.target.value)} className="input-field" placeholder="25000" />
            </div>
            <div className="flex items-end">
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-[11px] leading-4 text-amber-800">
                <TruckIcon className="mr-1 inline h-3.5 w-3.5" />
                Delivery estimate: {zone.estimatedDays}
              </p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="notes" className="label-field">Order notes (optional)</label>
              <textarea id="notes" rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} className="input-field" placeholder="Delivery instructions, gift note, preferred time…" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ruby-600 text-[11px] font-bold text-white">3</span>
            <h2 className="text-base font-bold text-charcoal-900">Payment method</h2>
          </div>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {PAYMENT_METHODS.map((method) => (
              <label
                key={method.id}
                className={`flex cursor-pointer gap-3 rounded-xl border p-3.5 transition ${
                  paymentMethod === method.id
                    ? 'border-ruby-500 bg-ruby-50/60 ring-1 ring-ruby-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={() => setPaymentMethod(method.id)}
                  className="mt-1 h-4 w-4 text-ruby-600 focus:ring-ruby-500"
                />
                <span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-charcoal-900">
                    <span>{method.icon}</span> {method.label}
                  </span>
                  <span className="mt-1 block text-[11px] leading-4 text-charcoal-500">{method.description}</span>
                </span>
              </label>
            ))}
          </div>
          {paymentMethod !== 'cod' && (
            <p className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-[11px] leading-5 text-blue-800">
              <CreditCardIcon className="mr-1 inline h-3.5 w-3.5" />
              We will share the payment details on WhatsApp/email after you place the order. Your order is confirmed once payment is received.
            </p>
          )}
        </section>

        <label className="flex items-start gap-2.5 rounded-xl border border-gray-200 bg-white p-4 text-xs text-charcoal-600">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-ruby-600 focus:ring-ruby-500"
          />
          <span>
            I agree to the{' '}
            <Link href="/terms-conditions" className="font-semibold text-ruby-600 hover:underline">terms & conditions</Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="font-semibold text-ruby-600 hover:underline">privacy policy</Link>.
          </span>
        </label>

        {error && (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-700" role="alert">
            {error}
          </p>
        )}
      </div>

      <aside className="lg:sticky lg:top-32 lg:h-fit">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-base font-bold text-charcoal-900">Your order</h2>
          <p className="mt-1 text-[11px] text-charcoal-400">{itemCount} item{itemCount === 1 ? '' : 's'}</p>

          <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-2xl">
                  {item.emoji || '🛍️'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-charcoal-800">{item.name}</p>
                  <p className="text-[10px] text-charcoal-400">Qty {item.quantity} · {formatPKR(item.price)}</p>
                </div>
                <span className="text-xs font-semibold text-charcoal-800">{formatPKR(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-xs">
            <div className="flex justify-between text-charcoal-600">
              <span>Subtotal</span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Coupon ({coupon?.code})</span>
                <span>− {formatPKR(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-charcoal-600">
              <span>Shipping · {province}</span>
              <span>{shipping === 0 ? 'Free' : formatPKR(shipping)}</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-gray-100 pt-3">
              <span className="text-sm font-bold text-charcoal-900">Total</span>
              <span className="text-xl font-extrabold text-charcoal-900">{formatPKR(grandTotal)}</span>
            </div>
          </div>

          <button type="submit" disabled={submitting} className="btn-primary mt-4 w-full py-3">
            {submitting ? 'Placing order…' : `Place order · ${formatPKR(grandTotal)}`}
          </button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[10px] text-charcoal-400">
            <LockClosedIcon className="h-3.5 w-3.5" /> Your information is encrypted and secure
          </p>

          <div className="mt-4 space-y-2 rounded-xl bg-gray-50 p-3 text-[10px] leading-4 text-charcoal-500">
            <p className="flex items-center gap-1.5"><ShieldCheckIcon className="h-3.5 w-3.5 text-ruby-600" /> Genuine products, quality checked</p>
            <p className="flex items-center gap-1.5"><MapPinIcon className="h-3.5 w-3.5 text-ruby-600" /> Dispatched from Peshawar, KPK</p>
            <p className="flex items-center gap-1.5"><CheckCircleIcon className="h-3.5 w-3.5 text-ruby-600" /> 7-day return window after delivery</p>
          </div>
        </div>
      </aside>
    </form>
  );
}
