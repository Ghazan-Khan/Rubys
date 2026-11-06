import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import PageHero from '@/components/ui/PageHero';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    "Answers about ordering, delivery, Cash on Delivery, returns, refunds and shopping at Ruby's.pk in Pakistan.",
  alternates: { canonical: '/faq' },
};

const FAQS = [
  {
    question: 'Do you deliver across Pakistan?',
    answer:
      'Yes. We deliver to every province, including Khyber Pakhtunkhwa, Punjab, Sindh, Balochistan, Gilgit-Baltistan and Azad Jammu & Kashmir. Delivery times and charges vary by province and are shown at checkout.',
  },
  {
    question: 'Is Cash on Delivery available?',
    answer:
      'Yes, Cash on Delivery is available nationwide. You pay the courier in cash when your parcel arrives. Please keep the exact amount ready where possible.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Khyber Pakhtunkhwa is usually 2–3 working days. Punjab and Sindh are 3–4 working days. Balochistan is 4–5 working days, and Gilgit-Baltistan/AJK is 5–7 working days. Orders placed before 2 PM are usually dispatched the same day.',
  },
  {
    question: 'How much does shipping cost?',
    answer:
      'Delivery is Rs. 150 in KPK (free over Rs. 2,000), Rs. 200 in Punjab and Sindh (free over Rs. 2,500), Rs. 300 in Balochistan (free over Rs. 3,000) and Rs. 350 in Gilgit-Baltistan/AJK (free over Rs. 3,500).',
  },
  {
    question: 'Can I track my order?',
    answer:
      'Yes. Use the Track Order page with your order number and the mobile number you used at checkout. You can also view your orders from your account if you signed in.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'You can request a return or exchange within 7 days of delivery for eligible items that are unused and in their original packaging. Opened beauty, skincare and hygiene products cannot be returned unless faulty. See our returns policy for the full details.',
  },
  {
    question: 'How long do refunds take?',
    answer:
      'Approved returns are usually refunded within 5–7 business days after inspection. Bank transfers can take an additional 1–3 business days to appear. JazzCash and Easypaisa refunds are typically visible within 24–48 hours.',
  },
  {
    question: 'Do I need an account to order?',
    answer:
      'No. You can check out as a guest. Creating an account lets you save addresses, view order history and check out faster next time.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept Cash on Delivery, bank transfer, JazzCash and Easypaisa. For digital payments, our team shares the payment details after you place your order and confirms it once payment is verified.',
  },
  {
    question: 'Can I change my delivery address after ordering?',
    answer:
      'Usually, yes — as long as the order has not been dispatched. Contact us as soon as possible with your order number and the new address. If the parcel has already left, we may need to arrange a re-delivery.',
  },
  {
    question: 'Are your products genuine?',
    answer:
      'Yes. We source from trusted suppliers and inspect stock before listing and before dispatch. If you ever receive an item that is not as described, contact us within 48 hours and we will make it right.',
  },
  {
    question: 'How do I contact support?',
    answer:
      'Use the contact form on our Contact Us page, email support@rubys.pk, or call/WhatsApp us during business hours (Monday–Saturday, 9 AM–6 PM PKT).',
  },
];

export default function FaqPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero
        eyebrow="Help centre"
        title="Frequently asked questions"
        description="Quick answers about ordering, delivery, payments and returns. If your question is not here, our team is one message away."
      />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'FAQs' }]} />

        <div className="space-y-2.5">
          {FAQS.map((faq, index) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-gray-100 bg-white px-4 py-3.5 shadow-sm open:shadow-md"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-charcoal-900">
                {faq.question}
                <ChevronDownIcon className="h-4 w-4 shrink-0 text-charcoal-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2.5 text-xs leading-6 text-charcoal-600">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-ruby-50 p-6 text-center">
          <h2 className="text-lg font-bold text-ruby-900">Still need help?</h2>
          <p className="mx-auto mt-1.5 max-w-md text-xs leading-5 text-ruby-800/80">
            Send us a message with your order number and we will look into it. We reply within one business day.
          </p>
          <Link href="/contact-us" className="btn-primary mt-4 text-sm">Contact support</Link>
        </div>
      </div>
    </>
  );
}
