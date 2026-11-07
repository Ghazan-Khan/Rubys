import type { Metadata } from 'next';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Pagination from '@/components/ui/Pagination';
import { listAdminCustomers } from '@/lib/admin';
import { formatDate, formatPKR } from '@/lib/format';

export const metadata: Metadata = { title: 'Customers' };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminCustomersPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = first(params.q)?.trim() || '';
  const page = Math.max(1, Number.parseInt(first(params.page) || '1', 10) || 1);

  const result = listAdminCustomers({ query: query || undefined, page, pageSize: 20 });
  const plainParams: Record<string, string | undefined> = { q: query || undefined };

  const showingFrom = result.total === 0 ? 0 : (result.page - 1) * result.pageSize + 1;
  const showingTo = Math.min(result.page * result.pageSize, result.total);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ruby-600">People</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-charcoal-900">Customers</h1>
        <p className="mt-1 text-sm text-charcoal-500">
          {result.total === 0
            ? 'No customer accounts match the current search.'
            : `Showing ${showingFrom}–${showingTo} of ${result.total} customers.`}
        </p>
      </div>

      <form action="/admin/customers" className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-[1.6fr_auto]">
          <div className="relative">
            <label htmlFor="admin-customer-search" className="sr-only">
              Search customers
            </label>
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
            <input
              id="admin-customer-search"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Search name, email or phone…"
              className="input-field pl-9"
            />
          </div>
          <button type="submit" className="btn-primary px-5 py-2 text-sm">
            Search
          </button>
        </div>
        {query && (
          <Link href="/admin/customers" className="mt-3 inline-block text-xs font-semibold text-ruby-600 hover:underline">
            Clear search
          </Link>
        )}
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {result.customers.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-4xl">👤</p>
            <h2 className="mt-3 text-sm font-bold text-charcoal-900">No customers found</h2>
            <p className="mt-1 text-xs text-charcoal-500">
              Registered customer accounts will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-charcoal-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Customer</th>
                  <th className="px-3 py-3 font-semibold">Phone</th>
                  <th className="px-3 py-3 text-center font-semibold">Orders</th>
                  <th className="px-3 py-3 text-right font-semibold">Lifetime spend</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {result.customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/70">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ruby-50 text-xs font-bold text-ruby-700">
                          {customer.firstName.charAt(0)}
                          {customer.lastName.charAt(0)}
                        </span>
                        <div className="min-w-0">
                          <p className="font-semibold text-charcoal-900">
                            {customer.firstName} {customer.lastName}
                          </p>
                          <p className="truncate text-[11px] text-charcoal-400">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-charcoal-600">{customer.phone}</td>
                    <td className="px-3 py-3 text-center text-xs font-semibold text-charcoal-800">
                      {customer.orderCount}
                    </td>
                    <td className="px-3 py-3 text-right text-xs font-semibold text-charcoal-900">
                      {formatPKR(customer.totalSpent)}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={
                          customer.isActive
                            ? 'rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700'
                            : 'rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-charcoal-500'
                        }
                      >
                        {customer.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[11px] text-charcoal-500">{formatDate(customer.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Pagination
        basePath="/admin/customers"
        page={result.page}
        totalPages={result.totalPages}
        searchParams={plainParams}
      />
    </div>
  );
}
