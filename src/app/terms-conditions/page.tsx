import type { Metadata } from 'next';
import PolicyPage from '@/components/ui/PolicyPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    "The terms that apply when you browse or shop on Ruby's.pk, including orders, pricing, delivery and returns.",
  alternates: { canonical: '/terms-conditions' },
};

export default function TermsPage() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Terms & conditions"
      description="Please read these terms before using Ruby's.pk. By placing an order, you agree to them."
      lastUpdated="1 November 2026"
      sections={[
        {
          title: 'Using our website',
          paragraphs: [
            'You agree to use Ruby’s.pk lawfully and not to interfere with the site, attempt unauthorised access, or use it to transmit harmful or misleading content. We may suspend or close accounts that breach these terms.',
          ],
        },
        {
          title: 'Products and availability',
          paragraphs: [
            'We aim to describe products accurately, including colours, sizes and specifications. Slight differences may occur between photographs and the actual product. All products are subject to availability, and we may cancel an order if an item sells out or a listing contains a pricing error.',
          ],
        },
        {
          title: 'Prices and payment',
          paragraphs: [
            'All prices are shown in Pakistani Rupees (PKR) and include applicable taxes unless stated otherwise. Shipping is calculated at checkout. We reserve the right to change prices and promotions at any time, but changes will not affect orders already confirmed.',
          ],
        },
        {
          title: 'Orders and confirmation',
          paragraphs: [
            'An order is an offer to buy. Our order confirmation email acknowledges receipt but does not by itself guarantee acceptance. We may contact you to verify details, and we may decline or cancel an order where there is suspected fraud, an error or a stock issue.',
          ],
        },
        {
          title: 'Delivery, returns and refunds',
          paragraphs: [
            'Delivery estimates, return eligibility and refund timelines are set out in our shipping, returns and refund policies, which form part of these terms.',
          ],
        },
        {
          title: 'Intellectual property',
          paragraphs: [
            'The Ruby’s.pk name, logo, site design, photographs, copy and other content are owned by us or used with permission. You may not copy, reproduce or use them for commercial purposes without written consent.',
          ],
        },
        {
          title: 'Limitation of liability',
          paragraphs: [
            'To the extent permitted by law, Ruby’s.pk is not liable for indirect or consequential losses, or for delays caused by events outside our reasonable control. Nothing in these terms limits rights that cannot be excluded under Pakistani law.',
          ],
        },
        {
          title: 'Governing law',
          paragraphs: [
            'These terms are governed by the laws of Pakistan. Disputes will first be handled in good faith by our support team, and if necessary by the courts of Khyber Pakhtunkhwa.',
          ],
        },
      ]}
      footerNote="If any part of these terms is found to be unenforceable, the remaining parts will continue to apply."
    />
  );
}
