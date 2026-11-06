import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import WishlistView from '@/components/wishlist/WishlistView';

export const metadata: Metadata = {
  title: 'My Wishlist',
  description: 'Your saved Ruby\'s.pk products, ready to add to your cart when you are ready.',
  robots: { index: false, follow: false },
};

export default function WishlistPage() {
  return (
    <>
      <PageHero
        eyebrow="Saved for later"
        title="My wishlist"
        description="Everything you have hearted, in one place. Add items to your cart whenever you are ready."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Wishlist' }]} />
        <WishlistView />
      </div>
    </>
  );
}
