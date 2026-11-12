import type { Metadata } from 'next';
import { listAdminCoupons } from '@/lib/admin';
import CouponsManager from '@/components/admin/CouponsManager';

export const metadata: Metadata = {
  title: 'Coupons & Discounts | Admin',
};

export default function AdminCouponsPage() {
  const coupons = listAdminCoupons();

  return <CouponsManager initialCoupons={coupons} />;
}
