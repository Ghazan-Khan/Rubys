import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { getCategories } from '@/lib/products';
import { getCurrentUser } from '@/lib/auth';
import { SITE } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#b91c1c',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Ruby's.pk - Women's Fashion, Beauty, Jewellery & Lifestyle | Pakistan",
    template: "%s | Ruby's.pk",
  },
  description:
    "Discover curated women's fashion, radiant skincare, luxury handbags, jewellery, watches and footwear at Ruby's.pk. Cash on Delivery across Pakistan.",
  keywords: [
    'womens shopping pakistan',
    'ladies fashion pakistan',
    'women clothing online pakistan',
    'skincare and beauty pakistan',
    'jewellery and watches pakistan',
    'ladies bags and shoes pakistan',
    "ruby's pk",
    'cash on delivery pakistan',
  ],
  authors: [{ name: "Ruby's.pk" }],
  creator: "Ruby's.pk",
  publisher: "Ruby's.pk",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: SITE.url,
    siteName: "Ruby's.pk",
    title: "Ruby's.pk - Premium Online Shopping in Pakistan",
    description:
      "Quality products, fast nationwide delivery and Cash on Delivery. Serving KPK and all of Pakistan.",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ruby's.pk - Premium Online Shopping in Pakistan",
    description:
      "Quality products, fast nationwide delivery and Cash on Delivery. Serving KPK and all of Pakistan.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [categories, user] = await Promise.all([getCategories(), getCurrentUser()]);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: "Ruby's.pk",
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    description:
      "Premium online shopping in Pakistan with a focus on Khyber Pakhtunkhwa. Cash on Delivery and nationwide delivery.",
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Peshawar',
      addressRegion: 'Khyber Pakhtunkhwa',
      addressCountry: 'PK',
    },
    areaServed: 'Pakistan',
    currenciesAccepted: 'PKR',
    paymentAccepted: 'Cash on Delivery, Bank Transfer, JazzCash, Easypaisa',
    sameAs: [],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Ruby's.pk",
    url: SITE.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/shop?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-charcoal-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <CartProvider>
          <WishlistProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ruby-600 focus:shadow-lg"
            >
              Skip to content
            </a>
            <Header categories={categories} user={user} />
            <main id="main-content" className="min-h-[60vh]">
              {children}
            </main>
            <Footer categories={categories} />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
