import { TruckIcon, ShieldCheckIcon, CreditCardIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function TrustIndicators() {
  const indicators = [
    {
      icon: TruckIcon,
      title: 'Fast nationwide delivery',
      description: '2–4 days to most cities, with KPK priority dispatch.',
    },
    {
      icon: CreditCardIcon,
      title: 'Cash on Delivery',
      description: 'Pay when your parcel arrives. No advance payment needed.',
    },
    {
      icon: ArrowPathIcon,
      title: '7-day easy returns',
      description: 'Changed your mind? Start a return within seven days.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Safe & secure shopping',
      description: 'Your details stay private and every order is tracked.',
    },
  ];

  return (
    <section className="border-b border-gray-100 bg-gray-50 py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {indicators.map((indicator) => (
          <div key={indicator.title} className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-ruby-600 shadow-sm ring-1 ring-gray-100">
              <indicator.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-charcoal-900">{indicator.title}</h3>
              <p className="mt-0.5 text-xs leading-5 text-charcoal-500">{indicator.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
