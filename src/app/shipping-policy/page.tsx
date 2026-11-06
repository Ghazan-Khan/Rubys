import type { Metadata } from 'next';
import PolicyPage from '@/components/ui/PolicyPage';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy',
  description:
    "Ruby's.pk shipping rates, delivery times and coverage across Khyber Pakhtunkhwa and all of Pakistan.",
  alternates: { canonical: '/shipping-policy' },
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Help & information"
      title="Shipping & delivery"
      description="Where we deliver, how long it takes and what it costs. We dispatch from Peshawar to every province in Pakistan."
      lastUpdated="1 November 2026"
      sections={[
        {
          title: 'Dispatch times',
          paragraphs: [
            'Orders placed before 2:00 PM on a business day are usually packed and dispatched the same day. Orders placed later, on Sundays or on public holidays are dispatched on the next business day.',
            'You will receive an order confirmation as soon as your order is placed, followed by dispatch and tracking details once your parcel leaves our warehouse.',
          ],
        },
        {
          title: 'Delivery times and charges',
          list: [
            'Khyber Pakhtunkhwa: 2–3 working days. Delivery Rs. 150, free on orders over Rs. 2,000.',
            'Punjab and Sindh: 3–4 working days. Delivery Rs. 200, free on orders over Rs. 2,500.',
            'Balochistan: 4–5 working days. Delivery Rs. 300, free on orders over Rs. 3,000.',
            'Gilgit-Baltistan and Azad Jammu & Kashmir: 5–7 working days. Delivery Rs. 350, free on orders over Rs. 3,500.',
          ],
        },
        {
          title: 'Cash on Delivery',
          paragraphs: [
            'Cash on Delivery (COD) is available across Pakistan. Please keep the exact amount ready for the courier where possible. Our courier partners may charge an additional fee for re-delivery after a failed attempt.',
          ],
        },
        {
          title: 'Tracking your parcel',
          paragraphs: [
            'Use the Track Order page with your order number and the mobile number you entered at checkout. If tracking has not updated for more than 48 hours, contact us and we will follow up with the courier.',
          ],
        },
        {
          title: 'Failed deliveries and address changes',
          paragraphs: [
            'Please provide a complete address including house or shop number, street, area, city and a nearby landmark. If you need to change your address, contact us as soon as possible — we can usually amend an order before it is dispatched.',
            'If a parcel is returned to us after repeated failed delivery attempts, we will contact you to arrange re-delivery. Additional shipping charges may apply.',
          ],
        },
        {
          title: 'Damaged or missing items',
          paragraphs: [
            'Please check your parcel at the time of delivery where possible. If an item arrives damaged or is missing, contact us within 48 hours with photographs of the parcel and packaging so we can resolve it quickly.',
          ],
        },
      ]}
      footerNote="Delivery estimates are working-day estimates and can be affected by weather, public holidays, courier delays or events outside our control."
    />
  );
}
