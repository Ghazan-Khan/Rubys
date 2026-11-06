import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PageHero from '@/components/ui/PageHero';
import RegisterForm from '@/components/account/RegisterForm';
import { getCurrentUser } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Create an Account',
  description: "Create a Ruby's.pk account for faster checkout, order history and saved addresses.",
  robots: { index: false, follow: false },
};

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) redirect('/account');

  return (
    <>
      <PageHero
        eyebrow="Join Ruby's"
        title="Create your account"
        description="Save your details for faster checkout and keep every order in one place. It only takes a minute."
      />
      <div className="mx-auto max-w-lg px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'My account', href: '/account' }, { label: 'Create account' }]} />
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <RegisterForm />
        </div>
        <p className="mt-4 text-center text-[11px] leading-5 text-charcoal-400">
          By creating an account you agree to our{' '}
          <a href="/terms-conditions" className="font-semibold text-ruby-600 hover:underline">terms</a> and{' '}
          <a href="/privacy-policy" className="font-semibold text-ruby-600 hover:underline">privacy policy</a>.
        </p>
      </div>
    </>
  );
}
