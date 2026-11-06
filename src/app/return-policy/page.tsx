import type { Metadata } from 'next';
import PolicyPage from '@/components/ui/PolicyPage';

export const metadata: Metadata = {
  title: 'Returns & Exchange Policy',
  description:
    "How to return or exchange an item bought from Ruby's.pk, including eligibility, timelines and the return process.",
  alternates: { canonical: '/return-policy' },
};

export default function ReturnPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Help & information"
      title="Returns & exchanges"
      description="Changed your mind or received something that is not right? Here is how our 7-day return window works."
      lastUpdated="1 November 2026"
      sections={[
        {
          title: '7-day return window',
          paragraphs: [
            'You may request a return or exchange within 7 days of delivery. The item must be unused, in its original condition and packaging, with all tags, accessories and manuals included.',
            'For hygiene and safety reasons, certain items cannot be returned once opened — including cosmetics, skincare, underwear, pierced jewellery and consumable goods — unless they arrived damaged or faulty.',
          ],
        },
        {
          title: 'What qualifies for a return',
          list: [
            'The item is faulty, damaged or not as described.',
            'You received the wrong item, size or colour.',
            'The item is unused and in resalable condition with original packaging.',
            'You contacted us within 7 days of delivery.',
          ],
        },
        {
          title: 'What does not qualify',
          list: [
            'Items used, washed, altered or damaged after delivery.',
            'Missing original packaging, tags, manuals or free gifts.',
            'Personalised or made-to-order items.',
            'Opened beauty, skincare or hygiene products.',
            'Returns requested after the 7-day window.',
          ],
        },
        {
          title: 'How to start a return',
          list: [
            'Contact us with your order number, the item you want to return and the reason.',
            'Send clear photographs of the item and packaging if it arrived damaged or faulty.',
            'Our team will confirm whether the return is approved and share the return address or pickup arrangement.',
            'Pack the item securely and include your order number inside the parcel.',
          ],
        },
        {
          title: 'Return shipping',
          paragraphs: [
            'If the return is due to our error, a fault or damage, we will cover the return shipping cost or arrange a pickup. For change-of-mind returns, the customer is responsible for return shipping unless we agree otherwise.',
            'Please use a trackable courier service. We cannot process a return that is lost in transit before it reaches us.',
          ],
        },
        {
          title: 'Exchanges',
          paragraphs: [
            'Exchanges are subject to stock availability. If your preferred size, colour or variant is unavailable, we will offer a refund or store credit instead. Any price difference will be charged or refunded accordingly.',
          ],
        },
      ]}
      footerNote="Approved returns are inspected on arrival. We aim to complete inspections within 2 business days of receiving the parcel."
    />
  );
}
