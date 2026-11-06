import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ProductCard from '@/components/product/ProductCard';
import type { Product } from '@/types';
import { cn } from '@/lib/format';

interface ProductGridProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  products: Product[];
  href?: string;
  className?: string;
}

export default function ProductGrid({
  title,
  subtitle,
  eyebrow,
  products,
  href = '/shop',
  className,
}: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <section className={cn('py-14', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            {eyebrow && (
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ruby-600">{eyebrow}</p>
            )}
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-charcoal-900 sm:text-3xl">{title}</h2>
            {subtitle && <p className="mt-2 max-w-xl text-sm text-charcoal-500">{subtitle}</p>}
          </div>
          <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ruby-600 hover:text-ruby-700">
            View all
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
