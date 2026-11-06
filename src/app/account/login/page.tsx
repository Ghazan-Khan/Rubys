import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import LoginForm from '@/components/account/LoginForm';
import { getCurrentUser } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Sign In',
  description: "Sign in to your Ruby's.pk account to view orders, saved addresses and your wishlist.",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const user = await getCurrentUser();
  if (user) redirect('/account');

  const params = await searchParams;
  const redirectParam = Array.isArray(params.redirect) ? params.redirect[0] : params.redirect;
  const redirectTo = redirectParam && redirectParam.startsWith('/') ? redirectParam : '/account';

  return (
    <>
      <PageHero
        eyebrow="Welcome back"
        title="Sign in to your account"
        description="View your orders, manage delivery addresses and check out faster."
      />
      <div className="mx-auto max-w-md px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'My account', href: '/account' }, { label: 'Sign in' }]} />
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <LoginForm redirectTo={redirectTo} />
        </div>
        <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-center text-[11px] leading-5 text-charcoal-500">
          Demo account: <span className="font-semibold text-charcoal-700">demo@rubys.pk</span> /{' '}
          <span className="font-semibold text-charcoal-700">Demo@1234</span>
        </div>
      </div>
    </>
  );
}
