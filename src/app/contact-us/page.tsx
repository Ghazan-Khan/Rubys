import type { Metadata } from 'next';
import Link from 'next/link';
import { ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import PageHero from '@/components/ui/PageHero';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ContactForm from '@/components/forms/ContactForm';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Contact Ruby's.pk for order support, product questions, delivery updates or returns. Based in Peshawar, KPK, serving all of Pakistan.",
  alternates: { canonical: '/contact-us' },
};

const QUICK_LINKS = [
  { label: 'Track my order', href: '/track-order', text: 'See the latest delivery status.' },
  { label: 'Returns & exchanges', href: '/return-policy', text: 'Start a return within 7 days.' },
  { label: 'Shipping & delivery', href: '/shipping-policy', text: 'Rates and delivery times.' },
  { label: 'FAQs', href: '/faq', text: 'Answers to common questions.' },
];

export default function ContactUsPage() {
  return (
    <>
      <PageHero
        eyebrow="We are here to help"
        title="Contact Ruby's.pk"
        description="Questions about an order, a product or a return? Send us a message and a real person from our Peshawar team will get back to you."
      />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Contact us' }]} />

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <ContactForm />

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold text-charcoal-900">Reach us directly</h2>
              <div className="mt-4 space-y-3 text-xs">
                <a href={`mailto:${SITE.email}`} className="flex items-start gap-2.5 text-charcoal-600 hover:text-ruby-600">
                  <EnvelopeIcon className="mt-0.5 h-4 w-4 shrink-0 text-ruby-600" />
                  <span>
                    <span className="block font-semibold text-charcoal-800">Email</span>
                    {SITE.email}
                  </span>
                </a>
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex items-start gap-2.5 text-charcoal-600 hover:text-ruby-600">
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-ruby-600" />
                  <span>
                    <span className="block font-semibold text-charcoal-800">Phone / WhatsApp</span>
                    {SITE.phone}
                  </span>
                </a>
                <p className="flex items-start gap-2.5 text-charcoal-600">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-ruby-600" />
                  <span>
                    <span className="block font-semibold text-charcoal-800">Based in</span>
                    {SITE.address}
                  </span>
                </p>
                <div className="flex items-start gap-2.5 text-charcoal-600">
                  <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-ruby-600" />
                  <span>
                    <span className="block font-semibold text-charcoal-800">Support hours</span>
                    Monday–Saturday, 9 AM – 6 PM PKT
                  </span>
                </div>
              </div>
              <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-[11px] leading-4 text-emerald-800">
                We aim to reply within one business day. Messages sent on Sunday are answered on Monday.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold text-charcoal-900">Quick links</h2>
              <ul className="mt-3 space-y-2.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group block rounded-lg px-1 py-0.5">
                      <span className="text-xs font-semibold text-charcoal-800 group-hover:text-ruby-600">{link.label} →</span>
                      <span className="mt-0.5 block text-[10px] text-charcoal-400">{link.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
