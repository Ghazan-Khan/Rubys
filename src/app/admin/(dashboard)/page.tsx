import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BanknotesIcon,
  CubeIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  ShoppingBagIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import OrderStatusBadge from '@/components/orders/OrderStatusBadge';
import { getDashboardStats } from '@/lib/admin';
import { formatDate, formatPKR } from '@/lib/format';

export const metadata: Metadata = { title: 'Dashboard' };

export default function AdminDashboardPage() {
  const stats = getDashboardStats();

  const cards = [
    {
      label: 'Total products',
      value: stats.totalProducts.toLocaleString('en-PK'),
      detail: `${stats.activeProducts} active · ${stats.outOfStock} out of stock`,
      icon: CubeIcon,
      href: '/admin/products',
    },
    {
      label: 'Orders',
      value: stats.totalOrders.toLocaleString('en-PK'),
      detail: `${stats.pendingOrders} awaiting fulfilment`,
      icon: ShoppingBagIcon,
      href: '/admin/orders',
    },
    {
      label: 'Customers',
      value: stats.totalCustomers.toLocaleString('en-PK'),
      detail: 'Registered customer accounts',
      icon: UsersIcon,
      href: '/admin/customers',
    },
    {
      label: 'Sales',
      value: formatPKR(stats.totalSales),
      detail: `${formatPKR(stats.todaySales)} today · ${formatPKR(stats.monthSales)} this month`,
      icon: BanknotesIcon,
      href: '/admin/orders',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ruby-600">Overview</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-charcoal-900">Dashboard</h1>
          <p className="mt-1 text-sm text-charcoal-500">
            Sales exclude cancelled and refunded orders. All figures are in PKR.
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-primary text-sm">
          <PlusIcon className="h-4 w-4" />
          Add product
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400">
                {card.label}
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ruby-50 text-ruby-600 transition group-hover:bg-ruby-600 group-hover:text-white">
                <card.icon className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-extrabold tracking-tight text-charcoal-900">{card.value}</p>
            <p className="mt-1 text-[11px] text-charcoal-500">{card.detail}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <h2 className="text-sm font-bold text-charcoal-900">Recent orders</h2>
              <p className="mt-0.5 text-[11px] text-charcoal-400">Latest orders placed on the store</p>
            </div>
            <Link href="/admin/orders" className="text-xs font-semibold text-ruby-600 hover:underline">
              View all
            </Link>
          </div>

          {stats.recentOrders.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-charcoal-500">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-charcoal-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Order</th>
                    <th className="px-3 py-3 font-semibold">Customer</th>
                    <th className="px-3 py-3 font-semibold">Date</th>
                    <th className="px-3 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 text-right font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/70">
                      <td className="px-5 py-3">
                        <Link
                          href={`/admin/orders/${order.orderNumber}`}
                          className="font-semibold text-ruby-600 hover:underline"
                        >
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="px-3 py-3">
                        <p className="font-medium text-charcoal-800">{order.shippingFullName}</p>
                        <p className="text-[11px] text-charcoal-400">{order.shippingPhone}</p>
                      </td>
                      <td className="px-3 py-3 text-xs text-charcoal-500">{formatDate(order.createdAt)}</td>
                      <td className="px-3 py-3">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="px-5 py-3 text-right font-semibold text-charcoal-900">
                        {formatPKR(order.totalAmount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <h2 className="flex items-center gap-1.5 text-sm font-bold text-charcoal-900">
                <ExclamationTriangleIcon className="h-4 w-4 text-amber-500" />
                Stock alerts
              </h2>
              <p className="mt-0.5 text-[11px] text-charcoal-400">
                {stats.lowStock} low-stock · {stats.outOfStock} out of stock
              </p>
            </div>
            <Link href="/admin/products?stock=low" className="text-xs font-semibold text-ruby-600 hover:underline">
              Manage
            </Link>
          </div>

          {stats.lowStockProducts.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-charcoal-500">
              Stock levels look healthy.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {stats.lowStockProducts.map((product) => (
                <li key={product.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-lg">
                    {product.emoji || '📦'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="block truncate text-xs font-semibold text-charcoal-800 hover:text-ruby-600"
                    >
                      {product.name}
                    </Link>
                    <p className="text-[10px] text-charcoal-400">{product.sku}</p>
                  </div>
                  <span
                    className={
                      product.stockQuantity === 0
                        ? 'rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700'
                        : 'rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800'
                    }
                  >
                    {product.stockQuantity} left
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
