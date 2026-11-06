import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import CartView from '@/components/cart/CartView';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review the items in your Ruby\'s.pk cart and proceed to secure checkout with Cash on Delivery.',
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <>
      <PageHero
        eyebrow="Your selection"
        title="Shopping cart"
        description="Review your items, apply a coupon and continue to checkout. Shipping is calculated based on your city."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Shopping cart' }]} />
        <CartView />
      </div>
    </>
  );
}
