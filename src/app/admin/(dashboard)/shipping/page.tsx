import type { Metadata } from 'next';
import { listAdminShippingZones } from '@/lib/admin';
import ShippingManager from '@/components/admin/ShippingManager';

export const metadata: Metadata = { title: 'Shipping Zones | Admin' };

export default function AdminShippingPage() {
  const zones = listAdminShippingZones();
  return <ShippingManager initialZones={zones} />;
}
