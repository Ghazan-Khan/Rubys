import type { Metadata } from 'next';
import PolicyPage from '@/components/ui/PolicyPage';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    "How Ruby's.pk uses cookies and browser storage for sign-in, cart, wishlist and site analytics.",
  alternates: { canonical: '/cookie-policy' },
};

export default function CookiePolicyPage() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Cookie policy"
      description="Cookies and browser storage help the store work. Here is what we use and how you can control it."
      lastUpdated="1 November 2026"
      sections={[
        {
          title: 'What are cookies?',
          paragraphs: [
            'Cookies are small text files stored by your browser. They can remember your sign-in, keep your cart available and help us understand how the site is used. We also use browser local storage, which works in a similar way but is managed by the website rather than sent with every request.',
          ],
        },
        {
          title: 'Essential cookies',
          list: [
            'Session cookie: keeps you signed in to your Ruby’s.pk account. It is HTTP-only and expires after 30 days or when you sign out.',
            'Order confirmation cookie: allows you to view your order confirmation immediately after checkout.',
          ],
        },
        {
          title: 'Cart and wishlist storage',
          paragraphs: [
            'Your cart and wishlist are saved in your browser’s local storage so they are still there when you return. This information stays on your device and is not used for advertising.',
          ],
        },
        {
          title: 'Analytics and performance',
          paragraphs: [
            'If analytics are enabled, we use them in an aggregated form to understand which pages are useful and where the site can be improved. We do not use analytics to identify you personally.',
          ],
        },
        {
          title: 'Managing cookies',
          paragraphs: [
            'You can clear or block cookies and local storage in your browser settings. Blocking essential cookies will prevent sign-in and checkout from working. Clearing local storage will empty your saved cart and wishlist on that device.',
          ],
        },
        {
          title: 'Third-party services',
          paragraphs: [
            'Some features, such as fonts or analytics, may be provided by third parties. Those providers may set their own cookies subject to their privacy policies. We keep third-party scripts to a minimum.',
          ],
        },
      ]}
      footerNote="Continuing to use Ruby's.pk without changing your browser settings means you consent to the essential cookies and storage described above."
    />
  );
}
