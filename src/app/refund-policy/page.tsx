import type { Metadata } from 'next';
import PolicyPage from '@/components/ui/PolicyPage';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description:
    "When and how Ruby's.pk issues refunds for cancelled orders, approved returns and failed deliveries.",
  alternates: { canonical: '/refund-policy' },
};

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Help & information"
      title="Refund policy"
      description="Clear timelines for refunds on cancelled orders, approved returns and payments made by bank transfer, JazzCash or Easypaisa."
      lastUpdated="1 November 2026"
      sections={[
        {
          title: 'When a refund applies',
          list: [
            'Your order was cancelled before dispatch and payment was already received.',
            'An approved return is received and inspected by our team.',
            'An item is confirmed faulty, damaged or different from what you ordered.',
            'A paid order cannot be fulfilled due to stock availability.',
          ],
        },
        {
          title: 'Refund methods',
          paragraphs: [
            'Cash on Delivery orders are refunded by bank transfer, JazzCash or Easypaisa to an account in the customer’s name. Digital payments are refunded to the original payment method where possible.',
            'We may offer store credit as an alternative. Store credit is issued at the refund value and does not expire unless stated otherwise.',
          ],
        },
        {
          title: 'Refund timelines',
          list: [
            'Cancelled orders paid in advance: processed within 3–5 business days of cancellation.',
            'Approved returns: processed within 5–7 business days of the returned item passing inspection.',
            'Bank transfers can take an additional 1–3 business days to appear in your account.',
            'JazzCash and Easypaisa refunds are usually visible within 24–48 hours of processing.',
          ],
        },
        {
          title: 'Shipping charges',
          paragraphs: [
            'Original shipping charges are refunded when the return is due to our error, a fault or damage. For change-of-mind returns, shipping charges are non-refundable unless required by law.',
          ],
        },
        {
          title: 'How to request a refund',
          paragraphs: [
            'Contact our support team with your order number, payment method and the reason for the refund. If your request relates to a return, please follow the returns process first. We will confirm the refund amount and method in writing before processing.',
          ],
        },
        {
          title: 'Chargebacks and disputes',
          paragraphs: [
            'If you believe a payment has been handled incorrectly, please contact us first so we can investigate. Raising a chargeback before contacting us can slow down the resolution.',
          ],
        },
      ]}
      footerNote="Refund eligibility is assessed under our returns policy and applicable Pakistani consumer protection law."
    />
  );
}
