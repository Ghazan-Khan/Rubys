import type { Metadata } from 'next';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import OrderStatusBadge from '@/components/orders/OrderStatusBadge';
import Pagination from '@/components/ui/Pagination';
import { listAdminOrders } from '@/lib/admin';
import { ORDER_STATUS_META, PAYMENT_METHODS } from '@/lib/constants';
import { formatDateTime, formatPKR } from '@/lib/format';
import type { OrderStatus } from '@/types';

export const metadata: Metadata = { title: 'Orders' };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function paymentLabel(method: string): string {
  return PAYMENT_METHODS.find((item) => item.id === method)?.label || method;
}

export default async function AdminOrdersPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = first(params.q)?.trim() || '';
  const status = first(params.status) || '';
  const page = Math.max(1, Number.parseInt(first(params.page) || '1', 10) || 1);

  const result = listAdminOrders({
    query: query || undefined,
    status: status || undefined,
    page,
    pageSize: 20,
  });

  const plainParams: Record<string, string | undefined> = {
    q: query || undefined,
    status: status || undefined,
  };

  const showingFrom = result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1;
  const showingTo = Math.min(result.page * result.pageSize, result.total);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ruby-600">Fulfilment</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-charcoal-900">Orders</h1>
        <p className="mt-1 text-sm text-charcoal-500">
          {result.total === 0
            ? 'No orders match the current filters.'
            : `Showing ${showingFrom}–${showingTo} of ${result.total} orders.`}
        </p>
      </div>

      <form action="/admin/orders" className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-[1.6fr_1fr_auto]">
          <div className="relative">
            <label htmlFor="admin-order-search" className="sr-only">
              Search orders
            </label>
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
            <input
              id="admin-order-search"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Order number, customer, phone or tracking…"
              className="input-field pl-9"
            />
          </div>
          <select name="status" defaultValue={status} className="input-field" aria-label="Order status">
            <option value="">All statuses</option>
            {(Object.keys(ORDER_STATUS_META) as OrderStatus[]).map((key) => (
              <option key={key} value={key}>
                {ORDER_STATUS_META[key].label}
              </option>
            ))}
          </select>
          <button type="submit" className="btn-primary px-5 py-2 text-sm">
            Filter
          </button>
        </div>
        {(query || status) && (
          <Link href="/admin/orders" className="mt-3 inline-block text-xs font-semibold text-ruby-600 hover:underline">
            Clear filters
          </Link>
        )}
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {result.orders.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-4xl">📦</p>
            <h2 className="mt-3 text-sm font-bold text-charcoal-900">No orders found</h2>
            <p className="mt-1 text-xs text-charcoal-500">Orders will appear here as customers check out.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-charcoal-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Order</th>
                  <th className="px-3 py-3 font-semibold">Customer</th>
                  <th className="px-3 py-3 font-semibold">Placed</th>
                  <th className="px-3 py-3 font-semibold">Items</th>
                  <th className="px-3 py-3 font-semibold">Payment</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Total</th>
                  <th className="px-5 py-3 text-right font-semibold">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {result.orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/70">
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/orders/${order.orderNumber}`}
                        className="font-semibold text-ruby-600 hover:underline"
                      >
                        {order.orderNumber}
                      </Link>
                      {order.trackingNumber && (
                        <p className="text-[10px] text-charcoal-400">Tracking {order.trackingNumber}</p>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <p className="font-medium text-charcoal-800">{order.shippingFullName}</p>
                      <p className="text-[11px] text-charcoal-400">{order.shippingPhone}</p>
                    </td>
                    <td className="px-3 py-3 text-[11px] text-charcoal-500">
                      {formatDateTime(order.createdAt)}
                    </td>
                    <td className="px-3 py-3 text-xs text-charcoal-600">
                      {order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}
                    </td>
                    <td className="px-3 py-3">
                      <p className="text-xs text-charcoal-700">{paymentLabel(order.paymentMethod)}</p>
                      <p className="text-[10px] capitalize text-charcoal-400">{order.paymentStatus}</p>
                    </td>
                    <td className="px-3 py-3">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-charcoal-900">
                      {formatPKR(order.totalAmount)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/orders/${order.orderNumber}`}
                        className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-[11px] font-semibold text-charcoal-700 transition hover:border-ruby-200 hover:text-ruby-600"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Pagination
        basePath="/admin/orders"
        page={result.page}
        totalPages={result.totalPages}
        searchParams={plainParams}
      />
    </div>
  );
}
