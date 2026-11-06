import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckBadgeIcon, HeartIcon, MapPinIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/outline';
import PageHero from '@/components/ui/PageHero';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Ruby\'s.pk',
  description:
    "Ruby's.pk is a Pakistan-focused online store built in Peshawar, KPK. Quality products, honest prices and dependable nationwide delivery.",
  alternates: { canonical: '/about-us' },
};

const VALUES = [
  {
    icon: ShieldCheckIcon,
    title: 'Quality checked, not guessed',
    text: 'Every product is inspected before it is listed and again before dispatch. If it would not pass our own standards, it does not go in a Ruby’s parcel.',
  },
  {
    icon: TruckIcon,
    title: 'Built around Pakistani delivery',
    text: 'We plan for real roads, real weather and real courier timelines — with a particular focus on Peshawar and the wider Khyber Pakhtunkhwa region.',
  },
  {
    icon: HeartIcon,
    title: 'People, not just parcels',
    text: 'A small team answers your messages, checks your order and follows up with the courier. You are never just an order number.',
  },
];

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A Pakistani store, built for Pakistani homes"
        description="Ruby's.pk started with a simple frustration: online shopping should be clear, dependable and worth the wait. We are building the store we wanted to shop from."
      >
        <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-charcoal-600">
          <span className="chip"><MapPinIcon className="h-3.5 w-3.5 text-ruby-600" /> Peshawar, KPK</span>
          <span className="chip">🇵🇰 Serving all of Pakistan</span>
          <span className="chip">💵 Cash on Delivery</span>
        </div>
      </PageHero>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'About us' }]} />

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="prose-ruby">
            <h2>Why we exist</h2>
            <p>
              Pakistan has no shortage of products — what it often lacks is a straightforward buying experience.
              Listings with vague photos, delivery dates that slip, and support that disappears after payment are
              common complaints. Ruby&apos;s.pk was created to do the basics properly: describe products honestly,
              price them fairly, pack them carefully and deliver them when we say we will.
            </p>
            <p>
              We are based in Peshawar, Khyber Pakhtunkhwa, and that shapes how we work. We understand that a
              delivery to Swat or Abbottabad is not the same as one to Lahore, and we plan our dispatch and courier
              choices accordingly. At the same time, we ship to every province in Pakistan.
            </p>

            <h2>What we sell</h2>
            <p>
              Our range focuses on things people actually use: everyday clothing, practical electronics, home
              essentials, skincare, fitness gear and books. We add products slowly, based on customer requests and
              our own testing, rather than listing everything we can find.
            </p>

            <h2>How we work</h2>
            <ul>
              <li>We inspect stock and check orders before they are packed.</li>
              <li>We share clear delivery estimates by province and keep tracking up to date.</li>
              <li>We offer Cash on Delivery so you can inspect your parcel before you pay.</li>
              <li>We answer questions honestly — including when a product is not right for you.</li>
              <li>We follow a simple 7-day return policy for eligible items.</li>
            </ul>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold text-charcoal-900">Ruby&apos;s at a glance</h2>
              <dl className="mt-3 space-y-3 text-xs">
                {[
                  { label: 'Based in', value: 'Peshawar, KPK' },
                  { label: 'Delivery', value: 'All provinces of Pakistan' },
                  { label: 'Dispatch', value: 'Same day before 2 PM' },
                  { label: 'Payment', value: 'COD, bank, JazzCash, Easypaisa' },
                  { label: 'Returns', value: '7 days on eligible items' },
                  { label: 'Support', value: 'Email, phone and WhatsApp' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between gap-3 border-b border-gray-50 pb-2.5 last:border-0 last:pb-0">
                    <dt className="text-charcoal-400">{item.label}</dt>
                    <dd className="text-right font-semibold text-charcoal-800">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl bg-ruby-50 p-5">
              <h2 className="text-sm font-bold text-ruby-900">Visit or contact us</h2>
              <p className="mt-1.5 text-xs leading-5 text-ruby-800/80">{SITE.address}</p>
              <p className="mt-2 text-xs font-semibold text-ruby-700">{SITE.email}</p>
              <p className="text-xs font-semibold text-ruby-700">{SITE.phone}</p>
              <Link href="/contact-us" className="mt-3 inline-block rounded-lg bg-white px-4 py-2 text-xs font-semibold text-ruby-700 shadow-sm hover:bg-ruby-100">
                Get in touch
              </Link>
            </div>
          </aside>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-charcoal-900">What we stand for</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ruby-50">
                  <value.icon className="h-5 w-5 text-ruby-600" />
                </span>
                <h3 className="mt-3 text-sm font-bold text-charcoal-900">{value.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-charcoal-500">{value.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl bg-charcoal-950 p-7 text-center text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ruby-300">Ready when you are</p>
          <h2 className="mt-2 text-2xl font-extrabold">Shop with a team that has your back</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-300">
            Browse the collection, ask us anything, and choose Cash on Delivery if you would rather pay when your parcel arrives.
          </p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/shop" className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-charcoal-900 hover:bg-gray-100">
              Start shopping
            </Link>
            <Link href="/track-order" className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              Track an order
            </Link>
          </div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
            <CheckBadgeIcon className="h-3.5 w-3.5 text-emerald-400" /> Quality checked · 7-day returns · COD nationwide
          </p>
        </section>
      </div>
    </>
  );
}
