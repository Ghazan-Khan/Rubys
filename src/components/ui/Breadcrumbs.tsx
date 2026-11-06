import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-charcoal-500">
        <li>
          <Link href="/" className="transition hover:text-ruby-600">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            <ChevronRightIcon className="h-3 w-3 text-gray-300" />
            {item.href ? (
              <Link href={item.href} className="transition hover:text-ruby-600">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-charcoal-800">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
