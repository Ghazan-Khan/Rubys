'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  HeartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import type { Category, User } from '@/types';
import { cn } from '@/lib/format';

interface HeaderProps {
  categories: Category[];
  user: User | null;
}

export default function Header({ categories, user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { itemCount, ready: cartReady } = useCart();
  const { count: wishlistCount, ready: wishlistReady } = useWishlist();
  const pathname = usePathname();

  const navLinks = [
    { name: 'Shop all', href: '/shop' },
    { name: 'Track order', href: '/track-order' },
    { name: 'Buying guides', href: '/blog' },
    { name: 'Contact', href: '/contact-us' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-ruby-700 px-4 py-2 text-center text-white">
        <p className="text-[11px] font-medium sm:text-xs">
          🚚 Free delivery on orders above Rs. 2,000 in KPK · Cash on Delivery across Pakistan
        </p>
      </div>

      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Ruby's.pk home">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ruby-600 text-lg font-bold text-white shadow-sm">
                R
              </span>
              <span className="text-xl font-bold tracking-tight text-charcoal-900">
                Ruby&apos;s<span className="text-ruby-600">.pk</span>
              </span>
            </Link>

            <form action="/shop" className="hidden max-w-xl flex-1 md:flex">
              <div className="relative w-full">
                <label htmlFor="site-search" className="sr-only">
                  Search products
                </label>
                <input
                  id="site-search"
                  name="q"
                  type="search"
                  placeholder="Search products, brands and categories…"
                  className="w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-4 pr-12 text-sm text-charcoal-900 outline-none transition focus:border-ruby-400 focus:bg-white focus:ring-2 focus:ring-ruby-100"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-2 text-charcoal-400 transition hover:bg-ruby-50 hover:text-ruby-600"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                href={user ? '/account' : '/account/login'}
                className="hidden items-center gap-1.5 rounded-lg px-2 py-2 text-charcoal-700 transition hover:bg-gray-50 hover:text-ruby-600 sm:flex"
              >
                <UserIcon className="h-5 w-5" />
                <span className="text-xs font-medium">{user ? user.firstName : 'Account'}</span>
              </Link>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative rounded-lg p-2 text-charcoal-700 transition hover:bg-gray-50 hover:text-ruby-600"
              >
                <HeartIcon className="h-5 w-5" />
                {wishlistReady && wishlistCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ruby-600 px-1 text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="relative flex items-center gap-1.5 rounded-lg px-2 py-2 text-charcoal-700 transition hover:bg-gray-50 hover:text-ruby-600"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span className="hidden text-xs font-medium sm:block">Cart</span>
                {cartReady && itemCount > 0 && (
                  <span className="absolute -right-1 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ruby-600 px-1 text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                className="rounded-lg p-2 text-charcoal-700 md:hidden"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>

          <form action="/shop" className="pb-3 md:hidden">
            <div className="relative">
              <label htmlFor="mobile-search" className="sr-only">
                Search products
              </label>
              <input
                id="mobile-search"
                name="q"
                type="search"
                placeholder="Search products…"
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-4 pr-12 text-sm outline-none focus:border-ruby-400 focus:bg-white focus:ring-2 focus:ring-ruby-100"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-2 text-charcoal-400"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <nav className="hidden border-b border-gray-100 bg-white md:block" aria-label="Main navigation">
        <div className="mx-auto flex h-11 max-w-7xl items-center gap-7 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setIsCategoriesOpen((open) => !open)}
            className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-charcoal-800 transition hover:text-ruby-600"
            aria-expanded={isCategoriesOpen}
          >
            Categories
            <ChevronDownIcon className={cn('h-3.5 w-3.5 transition-transform', isCategoriesOpen && 'rotate-180')} />
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-xs font-medium transition hover:text-ruby-600',
                pathname === link.href ? 'text-ruby-600' : 'text-charcoal-600'
              )}
            >
              {link.name}
            </Link>
          ))}
          <span className="ml-auto flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Same-day dispatch before 2pm
          </span>
        </div>

        {isCategoriesOpen && (
          <div className="border-t border-gray-100 bg-white shadow-sm">
            <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2 px-4 py-4 sm:px-6 lg:grid-cols-6 lg:px-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  onClick={() => setIsCategoriesOpen(false)}
                  className="group flex items-center gap-3 rounded-xl border border-transparent p-2 transition hover:border-gray-100 hover:bg-gray-50"
                >
                  <span className="text-2xl">{category.emoji}</span>
                  <span>
                    <span className="block text-xs font-semibold text-charcoal-800 group-hover:text-ruby-600">
                      {category.name}
                    </span>
                    <span className="block text-[10px] text-charcoal-400">{category.productCount} products</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {isMenuOpen && (
        <div className="max-h-[75vh] overflow-y-auto border-b border-gray-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-charcoal-800 hover:bg-gray-50 hover:text-ruby-600"
              >
                {link.name}
              </Link>
            ))}
            <p className="px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-widest text-charcoal-400">
              Shop by category
            </p>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-charcoal-700 hover:bg-gray-50 hover:text-ruby-600"
              >
                <span>
                  <span className="mr-2">{category.emoji}</span>
                  {category.name}
                </span>
                <span className="text-xs text-charcoal-400">{category.productCount}</span>
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-2">
              <Link
                href={user ? '/account' : '/account/login'}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-charcoal-800 hover:bg-gray-50 hover:text-ruby-600"
              >
                {user ? `My account (${user.firstName})` : 'Sign in / Create account'}
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-charcoal-800 hover:bg-gray-50 hover:text-ruby-600"
              >
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
