import { StarIcon } from '@heroicons/react/24/solid';

const TESTIMONIALS = [
  {
    name: 'Ayesha K.',
    city: 'Peshawar',
    quote:
      'Ordered the 3-piece embroidered lawn suit on Monday and it arrived on Wednesday. The embroidery is exquisite and fabric is so soft. COD made it stress-free.',
    product: 'Embroidered Lawn 3-Piece Stitched Suit',
  },
  {
    name: 'Zainab M.',
    city: 'Islamabad',
    quote:
      'The Rose Gold Mesh Watch is stunning! It looks even more luxurious in person than on the site. Perfect gift for my sister and prompt WhatsApp support.',
    product: 'Rose Gold Minimalist Mesh Watch',
  },
  {
    name: 'Fatima N.',
    city: 'Lahore',
    quote:
      'The 24K Saffron Glow Oil and Velvet Lip Tint are holy grails now! My skin looks radiant and dewy without being sticky. Highly recommended!',
    product: '24K Gold & Saffron Radiance Facial Oil',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ruby-600">Real customers, real orders</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-charcoal-900 sm:text-3xl">
            Shopping that feels looked after
          </h2>
          <p className="mt-3 text-sm leading-6 text-charcoal-500">
            From Peshawar to Karachi, our customers keep coming back for the quality, the prices and the people behind the parcels.
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure key={testimonial.name} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} className="h-4 w-4 text-amber-400" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-6 text-charcoal-600">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-gray-100 pt-4">
                <p className="text-sm font-semibold text-charcoal-900">
                  {testimonial.name} <span className="font-normal text-charcoal-400">· {testimonial.city}</span>
                </p>
                <p className="mt-0.5 text-[11px] text-charcoal-400">Bought: {testimonial.product}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
