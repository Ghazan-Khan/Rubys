import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-6xl">🧭</p>
      <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-ruby-600">404 — page not found</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-charcoal-900 sm:text-4xl">
        This page took a different route
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-charcoal-500">
        The page you are looking for may have moved, sold out or never existed. Let us get you back to something useful.
      </p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">Back to home</Link>
        <Link href="/shop" className="btn-secondary">Browse the shop</Link>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs">
        {[
          { label: 'Track order', href: '/track-order' },
          { label: 'FAQs', href: '/faq' },
          { label: 'Contact us', href: '/contact-us' },
          { label: 'Buying guides', href: '/blog' },
        ].map((link) => (
          <Link key={link.href} href={link.href} className="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-charcoal-600 hover:bg-ruby-50 hover:text-ruby-700">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
