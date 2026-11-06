import type { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import TrackOrderForm from '@/components/forms/TrackOrderForm';

export const metadata: Metadata = {
  title: 'Track Your Order',
  description:
    "Track your Ruby's.pk order in real time. Enter your order number and mobile number to see the latest delivery status.",
  alternates: { canonical: '/track-order' },
};

export default function TrackOrderPage() {
  return (
    <>
      <PageHero
        eyebrow="Delivery updates"
        title="Track your order"
        description="Enter the order number from your confirmation email and the mobile number you used at checkout to see the latest status."
      />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Track order' }]} />
        <TrackOrderForm />

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            { icon: '📦', title: 'Order confirmed', text: 'We check stock and confirm your order, usually within a few hours.' },
            { icon: '🚚', title: 'On the way', text: 'Your parcel is handed to the courier with a tracking number.' },
            { icon: '🎉', title: 'Delivered', text: 'Pay cash on delivery if that is your chosen method, then enjoy!' },
          ].map((step) => (
            <div key={step.title} className="rounded-xl border border-gray-100 bg-white p-4">
              <p className="text-2xl">{step.icon}</p>
              <p className="mt-2 text-xs font-bold text-charcoal-900">{step.title}</p>
              <p className="mt-1 text-[11px] leading-4 text-charcoal-500">{step.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-charcoal-500">
          Cannot find your order?{' '}
          <a href="/contact-us" className="font-semibold text-ruby-600 hover:underline">Contact support</a>{' '}
          with your order number and we will look it up for you.
        </p>
      </div>
    </>
  );
}
