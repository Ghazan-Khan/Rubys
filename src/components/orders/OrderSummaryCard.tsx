import Link from 'next/link';
import { PAYMENT_METHODS } from '@/lib/constants';
import { formatDate, formatPKR } from '@/lib/format';
import type { Order } from '@/types';
import OrderStatusBadge from '@/components/orders/OrderStatusBadge';

export default function OrderSummaryCard({ order }: { order: Order }) {
  const payment = PAYMENT_METHODS.find((method) => method.id === order.paymentMethod);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-5 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">Order</p>
            <p className="text-sm font-bold text-charcoal-900">{order.orderNumber}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        <ul className="divide-y divide-gray-100">
          {order.items?.map((item) => (
            <li key={item.id} className="flex items-center gap-3 px-5 py-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-2xl">
                {item.productEmoji || '🛍️'}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-charcoal-800">{item.productName}</p>
                <p className="mt-0.5 text-[10px] text-charcoal-400">
                  Qty {item.quantity} · {formatPKR(item.unitPrice)} each
                </p>
              </div>
              <span className="text-xs font-semibold text-charcoal-800">{formatPKR(item.totalPrice)}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-2 border-t border-gray-100 px-5 py-4 text-xs">
          <div className="flex justify-between text-charcoal-600">
            <span>Subtotal</span>
            <span>{formatPKR(order.subtotal)}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Discount {order.couponCode ? `(${order.couponCode})` : ''}</span>
              <span>− {formatPKR(order.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-charcoal-600">
            <span>Shipping</span>
            <span>{order.shippingAmount === 0 ? 'Free' : formatPKR(order.shippingAmount)}</span>
          </div>
          <div className="flex items-baseline justify-between border-t border-gray-100 pt-3">
            <span className="text-sm font-bold text-charcoal-900">Total</span>
            <span className="text-lg font-extrabold text-charcoal-900">{formatPKR(order.totalAmount)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-charcoal-900">Delivery details</h2>
          <div className="mt-3 space-y-1 text-xs leading-5 text-charcoal-600">
            <p className="font-semibold text-charcoal-800">{order.shippingFullName}</p>
            <p>{order.shippingAddressLine1}</p>
            {order.shippingAddressLine2 && <p>{order.shippingAddressLine2}</p>}
            <p>{order.shippingCity}, {order.shippingProvince}{order.shippingPostalCode ? ` ${order.shippingPostalCode}` : ''}</p>
            <p className="pt-1">{order.shippingPhone}</p>
            {order.guestEmail && <p className="text-charcoal-400">{order.guestEmail}</p>}
          </div>
          {order.notes && (
            <p className="mt-3 rounded-lg bg-gray-50 px-3 py-2 text-[11px] leading-4 text-charcoal-500">
              <span className="font-semibold text-charcoal-700">Note:</span> {order.notes}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-charcoal-900">Payment & tracking</h2>
          <dl className="mt-3 space-y-2 text-xs text-charcoal-600">
            <div className="flex justify-between gap-3">
              <dt>Method</dt>
              <dd className="font-semibold text-charcoal-800">{payment?.icon} {payment?.label || order.paymentMethod}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Payment status</dt>
              <dd className="font-semibold capitalize text-charcoal-800">{order.paymentStatus}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Placed</dt>
              <dd className="text-charcoal-800">{formatDate(order.createdAt)}</dd>
            </div>
            {order.trackingNumber && (
              <div className="flex justify-between gap-3">
                <dt>Tracking</dt>
                <dd className="font-mono font-semibold text-charcoal-800">{order.trackingNumber}</dd>
              </div>
            )}
            {order.courierName && (
              <div className="flex justify-between gap-3">
                <dt>Courier</dt>
                <dd className="text-charcoal-800">{order.courierName}</dd>
              </div>
            )}
          </dl>
          <Link href="/track-order" className="mt-3 inline-block text-[11px] font-semibold text-ruby-600 hover:underline">
            Track this order →
          </Link>
        </div>
      </div>
    </div>
  );
}
