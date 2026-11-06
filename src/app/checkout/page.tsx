import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { getCurrentUser } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Secure Checkout',
  description: "Complete your Ruby's.pk order with Cash on Delivery, JazzCash, Easypaisa or bank transfer.",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  const user = await getCurrentUser();

  return (
    <>
      <PageHero
        eyebrow="Almost there"
        title="Secure checkout"
        description="Enter your delivery details and choose how you would like to pay. No account needed — but signing in saves your details for next time."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Shopping cart', href: '/cart' }, { label: 'Checkout' }]} />
        <CheckoutForm user={user} />
      </div>
    </>
  );
}
