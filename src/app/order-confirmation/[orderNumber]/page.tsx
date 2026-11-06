import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { CheckCircleIcon, ClockIcon, EnvelopeIcon, TruckIcon } from '@heroicons/react/24/outline';
import OrderSummaryCard from '@/components/orders/OrderSummaryCard';
import OrderTimeline from '@/components/orders/OrderTimeline';
import { getCurrentUser } from '@/lib/auth';
import { getOrderByNumber } from '@/lib/orders';
import { PAYMENT_METHODS } from '@/lib/constants';
import { formatPKR } from '@/lib/format';

type Params = Promise<{ orderNumber: string }>;

export const metadata: Metadata = {
  title: 'Order Confirmed',
  robots: { index: false, follow: false },
};

export default async function OrderConfirmationPage({ params }: { params: Params }) {
  const { orderNumber } = await params;
  const order = getOrderByNumber(orderNumber);

  if (!order) notFound();

  const [user, cookieStore] = await Promise.all([getCurrentUser(), cookies()]);
  const lastOrder = cookieStore.get('rubys_last_order')?.value;
  const canView = lastOrder === order.orderNumber || (user && order.userId === user.id);

  if (!canView) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-5xl">🔒</p>
        <h1 className="mt-4 text-2xl font-extrabold text-charcoal-900">This order is private</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-charcoal-500">
          For your security, order details are only shown to the customer who placed the order. Sign in
          with the account used at checkout, or track the order with your order number and phone number.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/account/login" className="btn-primary">Sign in</Link>
          <Link href="/track-order" className="btn-secondary">Track an order</Link>
        </div>
      </div>
    );
  }

  const payment = PAYMENT_METHODS.find((method) => method.id === order.paymentMethod);

  return (
    <>
      <section className="border-b border-gray-100 bg-gradient-to-br from-emerald-50 via-white to-ruby-50">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircleIcon className="h-9 w-9 text-emerald-600" />
          </span>
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">Order placed successfully</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-charcoal-900 sm:text-4xl">
            Thank you, {order.shippingFullName.split(' ')[0]}!
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-charcoal-600">
            We have received order <span className="font-bold text-charcoal-900">{order.orderNumber}</span> and
            sent a confirmation to {order.guestEmail || 'your email address'}. Our team will confirm it shortly.
          </p>

          <div className="mx-auto mt-6 grid max-w-lg grid-cols-3 gap-2 text-center">
            <div className="rounded-xl border border-gray-100 bg-white/80 px-2 py-3">
              <ClockIcon className="mx-auto h-4 w-4 text-ruby-600" />
              <p className="mt-1 text-[10px] font-semibold text-charcoal-700">Placed</p>
              <p className="text-[10px] text-charcoal-400">Just now</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white/80 px-2 py-3">
              <TruckIcon className="mx-auto h-4 w-4 text-ruby-600" />
              <p className="mt-1 text-[10px] font-semibold text-charcoal-700">Delivery</p>
              <p className="text-[10px] text-charcoal-400">2–5 working days</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white/80 px-2 py-3">
              <EnvelopeIcon className="mx-auto h-4 w-4 text-ruby-600" />
              <p className="mt-1 text-[10px] font-semibold text-charcoal-700">Updates</p>
              <p className="text-[10px] text-charcoal-400">By SMS & email</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        {order.paymentMethod !== 'cod' && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="text-sm font-bold text-amber-900">Next step: complete your payment</h2>
            <p className="mt-1.5 text-xs leading-5 text-amber-800">
              You selected <strong>{payment?.label || order.paymentMethod}</strong>. Please send{' '}
              <strong>{formatPKR(order.totalAmount)}</strong> using the details our team will share on
              WhatsApp/email. Your order is confirmed once payment is received.
            </p>
            <Link href="/contact-us" className="mt-3 inline-block text-xs font-semibold text-amber-900 underline">
              Contact us for payment details →
            </Link>
          </div>
        )}

        <OrderTimeline order={order} />
        <OrderSummaryCard order={order} />

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/shop" className="btn-primary">Continue shopping</Link>
          <Link href="/track-order" className="btn-secondary">Track this order</Link>
        </div>

        <p className="text-center text-[11px] leading-5 text-charcoal-400">
          Need to change something? Contact us at{' '}
          <Link href="/contact-us" className="font-semibold text-ruby-600 hover:underline">support</Link>{' '}
          with your order number as soon as possible. Orders can usually be amended before dispatch.
        </p>
      </div>
    </>
  );
}
