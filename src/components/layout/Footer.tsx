'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { SITE } from '@/lib/constants';
import type { Category } from '@/types';

interface FooterProps {
  categories?: Category[];
}

export default function Footer({ categories = [] }: FooterProps) {
  const pathname = usePathname();

  // The admin dashboard has its own shell and must not inherit storefront chrome.
  if (pathname.startsWith('/admin')) return null;

  const shopLinks = categories.length
    ? categories.map((category) => ({ label: category.name, href: `/category/${category.slug}` }))
    : [
        { label: 'Clothing & Fashion', href: '/category/clothing-fashion' },
        { label: 'Beauty & Skincare', href: '/category/beauty-skincare' },
        { label: 'Bags & Accessories', href: '/category/bags-accessories' },
        { label: 'Jewellery & Watches', href: '/category/jewellery-watches' },
        { label: 'Shoes & Footwear', href: '/category/shoes-footwear' },
        { label: 'Lifestyle & Personal Care', href: '/category/lifestyle-personal-care' },
      ];

  const helpLinks = [
    { label: 'Track your order', href: '/track-order' },
    { label: 'Shipping & delivery', href: '/shipping-policy' },
    { label: 'Returns & exchanges', href: '/return-policy' },
    { label: 'Refund policy', href: '/refund-policy' },
    { label: 'Payment methods', href: '/payment-methods' },
    { label: 'FAQs', href: '/faq' },
  ];

  const companyLinks = [
    { label: 'About us', href: '/about-us' },
    { label: 'Contact us', href: '/contact-us' },
    { label: 'Buying guides', href: '/blog' },
    { label: 'My account', href: '/account' },
    { label: 'Wishlist', href: '/wishlist' },
  ];

  const legalLinks = [
    { label: 'Privacy policy', href: '/privacy-policy' },
    { label: 'Terms & conditions', href: '/terms-conditions' },
    { label: 'Cookie policy', href: '/cookie-policy' },
  ];

  return (
    <footer className="border-t border-ruby-950/60 bg-gradient-to-b from-charcoal-950 via-[#180507] to-charcoal-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center transition-opacity hover:opacity-90" aria-label="Ruby's.pk home">
              <Image
                src="/images/logo.webp"
                alt="Ruby's.pk — Women's Fashion & Boutique"
                width={170}
                height={88}
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-300">
              Your exclusive online destination for women&apos;s fashion, radiant skincare, luxury handbags, jewellery, and personal care across Pakistan. Enjoy fast shipping and Cash on Delivery nationwide.
            </p>
            <div className="mt-5 space-y-2.5">
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
                <PhoneIcon className="h-4 w-4 text-ruby-400" />
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
                <EnvelopeIcon className="h-4 w-4 text-ruby-400" />
                {SITE.email}
              </a>
              <p className="flex items-start gap-2 text-sm text-gray-300">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-ruby-400" />
                {SITE.address}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Shop</h3>
            <ul className="mt-4 space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Help</h3>
            <ul className="mt-4 space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">We accept</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {['COD', 'JazzCash', 'Easypaisa', 'Bank Transfer'].map((method) => (
                <span key={method} className="rounded-md bg-white/10 px-2.5 py-1.5 text-[11px] font-medium text-gray-200 ring-1 ring-white/10">
                  {method}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-gray-400">
              Orders are dispatched from Peshawar within 1 business day. Delivery times vary by city.
            </p>
            <div className="mt-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300">Legal</h4>
              <ul className="mt-3 space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs text-gray-400 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Ruby&apos;s.pk. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Proudly serving Pakistan · Peshawar, Khyber Pakhtunkhwa
          </p>
        </div>
      </div>
    </footer>
  );
}
