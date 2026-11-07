import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import OrderStatusBadge from '@/components/orders/OrderStatusBadge';
import { getOrderByNumber } from '@/lib/orders';
import { PAYMENT_METHODS } from '@/lib/constants';
import { formatDateTime, formatPKR } from '@/lib/format';

export const metadata: Metadata = { title: 'Order details' };

type Params = Promise<{ orderNumber: string }>;

export default async function AdminOrderDetailPage({ params }: { params: Params }) {
  const { orderNumber } = await params;
  const order = getOrderByNumber(orderNumber);
  if (!order) notFound();

  const payment = PAYMENT_METHODS.find((item) => item.id === order.paymentMethod);
  const itemCount = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="space-y-5">
      <div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal-500 hover:text-ruby-600"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Back to orders
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-extrabold tracking-tight text-charcoal-900">{order.orderNumber}</h1>
          <OrderStatusBadge status={order.status} />
        </div>
        <p className="mt-1 text-sm text-charcoal-500">
          Placed {formatDateTime(order.createdAt)} · {itemCount} item{itemCount === 1 ? '' : 's'} ·{' '}
          {formatPKR(order.totalAmount)}
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-5">
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="text-sm font-bold text-charcoal-900">Items</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-charcoal-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Product</th>
                    <th className="px-3 py-3 font-semibold">SKU</th>
                    <th className="px-3 py-3 text-center font-semibold">Qty</th>
                    <th className="px-3 py-3 text-right font-semibold">Unit</th>
                    <th className="px-5 py-3 text-right font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {order.items?.map((item) => (
                    <tr key={item.id}>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-base">
                            {item.productEmoji || '📦'}
                          </span>
                          <span className="font-medium text-charcoal-800">{item.productName}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-[11px] text-charcoal-500">{item.productSku}</td>
                      <td className="px-3 py-3 text-center text-xs text-charcoal-700">{item.quantity}</td>
                      <td className="px-3 py-3 text-right text-xs text-charcoal-600">
                        {formatPKR(item.unitPrice)}
                      </td>
                      <td className="px-5 py-3 text-right font-semibold text-charcoal-900">
                        {formatPKR(item.totalPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-100 px-5 py-4">
              <dl className="ml-auto max-w-xs space-y-2 text-sm">
                <div className="flex justify-between gap-6">
                  <dt className="text-charcoal-500">Subtotal</dt>
                  <dd className="font-medium text-charcoal-900">{formatPKR(order.subtotal)}</dd>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between gap-6">
                    <dt className="text-charcoal-500">Discount{order.couponCode ? ` (${order.couponCode})` : ''}</dt>
                    <dd className="font-medium text-emerald-700">−{formatPKR(order.discountAmount)}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-6">
                  <dt className="text-charcoal-500">Shipping</dt>
                  <dd className="font-medium text-charcoal-900">{formatPKR(order.shippingAmount)}</dd>
                </div>
                <div className="flex justify-between gap-6 border-t border-gray-100 pt-2">
                  <dt className="font-semibold text-charcoal-900">Total</dt>
                  <dd className="text-base font-extrabold text-charcoal-900">{formatPKR(order.totalAmount)}</dd>
                </div>
              </dl>
            </div>
          </section>

          {order.notes && (
            <section className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <h2 className="text-sm font-bold text-amber-900">Customer notes</h2>
              <p className="mt-2 whitespace-pre-line text-sm text-amber-800">{order.notes}</p>
            </section>
          )}
        </div>

        <div className="space-y-5">
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-charcoal-900">Customer & delivery</h2>
            <div className="mt-3 space-y-1.5 text-sm">
              <p className="font-semibold text-charcoal-900">{order.shippingFullName}</p>
              <p className="text-charcoal-600">{order.shippingPhone}</p>
              {order.guestEmail && <p className="text-charcoal-600">{order.guestEmail}</p>}
              <p className="pt-2 text-xs leading-5 text-charcoal-500">
                {order.shippingAddressLine1}
                {order.shippingAddressLine2 ? `, ${order.shippingAddressLine2}` : ''}
                <br />
                {order.shippingCity}, {order.shippingProvince}
                {order.shippingPostalCode ? ` ${order.shippingPostalCode}` : ''}
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-charcoal-900">Payment</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-charcoal-500">Method</dt>
                <dd className="font-medium text-charcoal-900">{payment?.label || order.paymentMethod}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-charcoal-500">Status</dt>
                <dd className="font-medium capitalize text-charcoal-900">{order.paymentStatus}</dd>
              </div>
              {order.couponCode && (
                <div className="flex justify-between gap-3">
                  <dt className="text-charcoal-500">Coupon</dt>
                  <dd className="font-medium text-charcoal-900">{order.couponCode}</dd>
                </div>
              )}
            </dl>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-charcoal-900">Tracking</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-charcoal-500">Courier</dt>
                <dd className="font-medium text-charcoal-900">{order.courierName || '—'}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-charcoal-500">Tracking no.</dt>
                <dd className="font-medium text-charcoal-900">{order.trackingNumber || '—'}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-charcoal-500">Dispatched</dt>
                <dd className="text-charcoal-700">{order.dispatchedAt ? formatDateTime(order.dispatchedAt) : '—'}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-charcoal-500">Delivered</dt>
                <dd className="text-charcoal-700">{order.deliveredAt ? formatDateTime(order.deliveredAt) : '—'}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
