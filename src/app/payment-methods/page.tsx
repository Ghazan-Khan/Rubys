import type { Metadata } from 'next';
import PolicyPage from '@/components/ui/PolicyPage';
import { PAYMENT_METHODS, SHIPPING_ZONES } from '@/lib/constants';
import { formatPKR } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Payment Methods',
  description:
    "Pay for your Ruby's.pk order with Cash on Delivery, bank transfer, JazzCash or Easypaisa.",
  alternates: { canonical: '/payment-methods' },
};

export default function PaymentMethodsPage() {
  return (
    <PolicyPage
      eyebrow="Help & information"
      title="Payment methods"
      description="Shop the way that suits you. We accept Cash on Delivery and popular digital payment options across Pakistan."
      lastUpdated="1 November 2026"
      sections={[
        {
          title: 'Cash on Delivery (COD)',
          paragraphs: [
            'Pay in cash when your parcel arrives. COD is available nationwide, including Peshawar, Mardan, Abbottabad, Swat, Lahore, Karachi, Islamabad, Quetta and Gilgit. Please keep the exact amount ready where possible.',
          ],
        },
        {
          title: 'Bank transfer',
          paragraphs: [
            'Place your order and choose bank transfer at checkout. Our team will share our account details by email or WhatsApp. Your order is confirmed and dispatched once the transfer is verified. Please include your order number in the transfer reference.',
          ],
        },
        {
          title: 'JazzCash and Easypaisa',
          paragraphs: [
            'Choose JazzCash or Easypaisa at checkout and our team will share the mobile account details. Send the exact order total and share the transaction screenshot with us. Orders are confirmed after payment is verified.',
          ],
        },
        {
          title: 'What you pay',
          paragraphs: [
            'The price you see on the product page is the price you pay for the item. Shipping is calculated at checkout based on your province and order value. There are no hidden handling fees.',
          ],
          list: [
            'KPK: Rs. 150 delivery, free over Rs. 2,000.',
            'Punjab and Sindh: Rs. 200 delivery, free over Rs. 2,500.',
            'Balochistan: Rs. 300 delivery, free over Rs. 3,000.',
            'Gilgit-Baltistan and AJK: Rs. 350 delivery, free over Rs. 3,500.',
          ],
        },
        {
          title: 'Payment security',
          paragraphs: [
            'We never ask for your card PIN, one-time password or full card details over the phone, WhatsApp or email. If someone contacts you claiming to be from Ruby’s.pk and asks for sensitive information, please stop and contact us using the details on our website.',
          ],
        },
      ]}
      footerNote={`Accepted methods: ${PAYMENT_METHODS.map((method) => method.label).join(', ')}. Delivery charges range from ${formatPKR(
        Math.min(...SHIPPING_ZONES.map((zone) => zone.rate))
      )} to ${formatPKR(Math.max(...SHIPPING_ZONES.map((zone) => zone.rate)))} depending on province.`}
    />
  );
}
