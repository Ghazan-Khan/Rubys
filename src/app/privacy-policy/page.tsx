import type { Metadata } from 'next';
import PolicyPage from '@/components/ui/PolicyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    "How Ruby's.pk collects, uses, stores and protects your personal information when you shop with us.",
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Privacy policy"
      description="Your trust matters. This policy explains what information we collect, why we need it and the choices you have."
      lastUpdated="1 November 2026"
      sections={[
        {
          title: 'Information we collect',
          list: [
            'Contact details such as your name, email address, mobile number and delivery address.',
            'Order details including products, quantities, totals, payment method and delivery status.',
            'Account details such as your email, hashed password and saved addresses.',
            'Messages you send us through contact forms, email or WhatsApp.',
            'Basic technical information such as browser type and pages visited, used to improve the site.',
          ],
        },
        {
          title: 'How we use your information',
          list: [
            'To process, pack, deliver and track your orders.',
            'To contact you about your order, delivery or support request.',
            'To manage your account, saved addresses and order history.',
            'To prevent fraud, misuse and unauthorised access.',
            'To send newsletters and offers, only where you have opted in.',
            'To understand how the site is used and improve the shopping experience.',
          ],
        },
        {
          title: 'Sharing with third parties',
          paragraphs: [
            'We share only what is necessary with courier partners, payment providers and service providers who help us run the store. We do not sell your personal information. We may disclose information where required by law or to protect our legal rights.',
          ],
        },
        {
          title: 'Cookies and local storage',
          paragraphs: [
            'We use cookies for sign-in sessions and essential site functions, and browser local storage to keep your cart and wishlist on your device. See our cookie policy for more detail.',
          ],
        },
        {
          title: 'Data retention and security',
          paragraphs: [
            'Order and account records are kept for as long as needed to provide the service and meet legal, accounting and tax obligations. Passwords are stored using a salted one-way hash. Access to customer data is limited to team members who need it to do their jobs.',
          ],
        },
        {
          title: 'Your choices',
          paragraphs: [
            'You can update your profile and saved addresses from your account, unsubscribe from marketing emails at any time, and ask us to access, correct or delete your personal information. Some records may need to be retained for legal or accounting reasons.',
          ],
        },
        {
          title: 'Children',
          paragraphs: [
            'Our store is intended for adults. We do not knowingly collect personal information from children under 13. If you believe a child has provided information, contact us and we will remove it.',
          ],
        },
        {
          title: 'Contact us',
          paragraphs: [
            'For privacy questions or requests, email support@rubys.pk with the subject “Privacy request”. We aim to respond within 7 business days.',
          ],
        },
      ]}
      footerNote="We may update this policy from time to time. Material changes will be reflected on this page with a new last-updated date."
    />
  );
}
