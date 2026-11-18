import NewsletterForm from '@/components/forms/NewsletterForm';

export default function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ruby-700 via-ruby-800 to-ruby-950 py-16 text-white shadow-inner">
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-ruby-500/30 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-ruby-400/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ruby-200">The Ruby&apos;s list</p>
        <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Fresh drops and honest deals, once a week</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-ruby-100">
          Join thousands of shoppers getting early access to new arrivals, seasonal offers and practical buying guides.
          No spam — just the good stuff.
        </p>
        <div className="mt-6">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
