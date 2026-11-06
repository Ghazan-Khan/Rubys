import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  ArrowRightIcon,
  HeartIcon,
  MapPinIcon,
  ShoppingBagIcon,
  TruckIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import PageHero from '@/components/ui/PageHero';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import OrderStatusBadge from '@/components/orders/OrderStatusBadge';
import ProfileForm from '@/components/account/ProfileForm';
import PasswordForm from '@/components/account/PasswordForm';
import AddressBook from '@/components/account/AddressBook';
import LogoutButton from '@/components/account/LogoutButton';
import { getCurrentUser } from '@/lib/auth';
import { getOrdersForUser } from '@/lib/orders';
import { getAddressesForUser } from '@/lib/addresses';
import { formatDate, formatPKR } from '@/lib/format';

export const metadata: Metadata = {
  title: 'My Account',
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/account/login?redirect=/account');

  const orders = getOrdersForUser(user.id);
  const addresses = getAddressesForUser(user.id);
  const totalSpent = orders
    .filter((order) => order.status !== 'cancelled' && order.status !== 'refunded')
    .reduce((sum, order) => sum + order.totalAmount, 0);
  const activeOrders = orders.filter(
    (order) => !['delivered', 'cancelled', 'returned', 'refunded'].includes(order.status)
  );

  return (
    <>
      <PageHero
        eyebrow="Your account"
        title={`Welcome back, ${user.firstName}`}
        description="Manage your orders, delivery addresses and account details in one place."
      >
        <div className="flex flex-wrap gap-2">
          <Link href="/shop" className="btn-primary px-4 py-2 text-sm">Continue shopping</Link>
          <Link href="/track-order" className="btn-secondary px-4 py-2 text-sm">Track an order</Link>
          <LogoutButton />
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'My account' }]} />

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-charcoal-500">
              <ShoppingBagIcon className="h-4 w-4 text-ruby-600" />
              <span className="text-[11px] font-semibold uppercase tracking-wide">Total orders</span>
            </div>
            <p className="mt-2 text-2xl font-extrabold text-charcoal-900">{orders.length}</p>
            <p className="text-[11px] text-charcoal-400">{activeOrders.length} in progress</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-charcoal-500">
              <TruckIcon className="h-4 w-4 text-ruby-600" />
              <span className="text-[11px] font-semibold uppercase tracking-wide">Lifetime spend</span>
            </div>
            <p className="mt-2 text-2xl font-extrabold text-charcoal-900">{formatPKR(totalSpent)}</p>
            <p className="text-[11px] text-charcoal-400">Excludes cancelled orders</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-charcoal-500">
              <UserCircleIcon className="h-4 w-4 text-ruby-600" />
              <span className="text-[11px] font-semibold uppercase tracking-wide">Member since</span>
            </div>
            <p className="mt-2 text-2xl font-extrabold text-charcoal-900">{formatDate(user.createdAt)}</p>
            <p className="text-[11px] text-charcoal-400">{user.email}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-charcoal-900">Recent orders</h2>
                <Link href="/shop" className="text-xs font-semibold text-ruby-600 hover:underline">Shop again</Link>
              </div>

              {orders.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">
                  <p className="text-4xl">🛍️</p>
                  <p className="mt-3 text-sm font-semibold text-charcoal-800">No orders yet</p>
                  <p className="mt-1 text-xs text-charcoal-500">Your first Ruby&apos;s order is waiting to happen.</p>
                  <Link href="/shop" className="btn-primary mt-4 text-sm">Start shopping</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <article key={order.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">
                            {formatDate(order.createdAt)}
                          </p>
                          <p className="mt-0.5 text-sm font-bold text-charcoal-900">{order.orderNumber}</p>
                          <p className="mt-0.5 text-[11px] text-charcoal-500">
                            {order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0} item(s) ·{' '}
                            {formatPKR(order.totalAmount)}
                          </p>
                        </div>
                        <OrderStatusBadge status={order.status} />
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-3">
                        <div className="flex -space-x-2">
                          {order.items?.slice(0, 4).map((item) => (
                            <span
                              key={item.id}
                              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-50 text-base"
                              title={item.productName}
                            >
                              {item.productEmoji || '🛍️'}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/account/orders/${order.orderNumber}`}
                          className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-ruby-600 hover:underline"
                        >
                          View details <ArrowRightIcon className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <ProfileForm user={user} />
            <PasswordForm />
          </div>

          <aside className="space-y-4">
            <AddressBook
              initialAddresses={addresses}
              defaultName={`${user.firstName} ${user.lastName}`.trim()}
              defaultPhone={user.phone}
            />

            <div className="rounded-2xl bg-ruby-50 p-5">
              <h2 className="text-sm font-bold text-ruby-900">Need a hand?</h2>
              <p className="mt-1.5 text-xs leading-5 text-ruby-800/80">
                Our Peshawar-based team can help with orders, returns and product questions.
              </p>
              <div className="mt-3 space-y-2 text-xs font-semibold text-ruby-700">
                <Link href="/contact-us" className="flex items-center gap-1.5 hover:underline">
                  <MapPinIcon className="h-3.5 w-3.5" /> Contact support
                </Link>
                <Link href="/wishlist" className="flex items-center gap-1.5 hover:underline">
                  <HeartIcon className="h-3.5 w-3.5" /> View wishlist
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
