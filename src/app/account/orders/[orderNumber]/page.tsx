import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import OrderSummaryCard from '@/components/orders/OrderSummaryCard';
import OrderTimeline from '@/components/orders/OrderTimeline';
import { getCurrentUser } from '@/lib/auth';
import { getUserOrder } from '@/lib/orders';

type Params = Promise<{ orderNumber: string }>;

export const metadata: Metadata = {
  title: 'Order Details',
  robots: { index: false, follow: false },
};

export default async function AccountOrderPage({ params }: { params: Params }) {
  const user = await getCurrentUser();
  if (!user) redirect('/account/login?redirect=/account');

  const { orderNumber } = await params;
  const order = getUserOrder(user.id, orderNumber);
  if (!order) notFound();

  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50/70">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'My account', href: '/account' },
              { label: order.orderNumber },
            ]}
          />
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ruby-600">Order details</p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-charcoal-900">{order.orderNumber}</h1>
            </div>
            <Link href="/account" className="btn-secondary px-4 py-2 text-sm">Back to account</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-5 px-4 py-8 sm:px-6 lg:px-8">
        <OrderTimeline order={order} />
        <OrderSummaryCard order={order} />
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/shop" className="btn-primary">Buy again</Link>
          <Link href="/contact-us" className="btn-secondary">Get help with this order</Link>
        </div>
      </div>
    </>
  );
}
