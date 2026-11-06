'use client';

import { useState } from 'react';
import { MapPinIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { PROVINCES, getShippingZone } from '@/lib/constants';
import type { Address } from '@/types';

interface AddressBookProps {
  initialAddresses: Address[];
  defaultName: string;
  defaultPhone: string;
}

const EMPTY_FORM = {
  fullName: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  province: 'Khyber Pakhtunkhwa',
  city: 'Peshawar',
  postalCode: '',
  isDefault: false,
};

export default function AddressBook({ initialAddresses, defaultName, defaultPhone }: AddressBookProps) {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [showForm, setShowForm] = useState(initialAddresses.length === 0);
  const [form, setForm] = useState({ ...EMPTY_FORM, fullName: defaultName, phone: defaultPhone });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const zone = getShippingZone(form.province);

  function update(field: keyof typeof form, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function changeProvince(province: string) {
    const nextZone = getShippingZone(province);
    setForm((current) => ({ ...current, province, city: nextZone.cities[0] || '' }));
  }

  async function refreshAddresses() {
    const response = await fetch('/api/account/addresses');
    const data = (await response.json()) as { success?: boolean; addresses?: Address[] };
    if (data.success && data.addresses) setAddresses(data.addresses);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/account/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !data.success) {
        setStatus('error');
        setMessage(data.message || 'Could not save this address.');
        return;
      }
      await refreshAddresses();
      setStatus('success');
      setMessage('Address saved.');
      setForm({ ...EMPTY_FORM, fullName: defaultName, phone: defaultPhone });
      setShowForm(false);
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  async function handleDelete(id: string) {
    const response = await fetch(`/api/account/addresses?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (response.ok) await refreshAddresses();
  }

  async function handleDefault(id: string) {
    const response = await fetch('/api/account/addresses', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ addressId: id }),
    });
    if (response.ok) await refreshAddresses();
  }

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-charcoal-900">Saved addresses</h2>
          <p className="mt-1 text-xs text-charcoal-500">Use these to speed up future checkouts.</p>
        </div>
        <button type="button" onClick={() => setShowForm((value) => !value)} className="btn-secondary px-3 py-2 text-xs">
          <PlusIcon className="h-4 w-4" /> {showForm ? 'Close' : 'Add address'}
        </button>
      </div>

      {addresses.length > 0 && (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {addresses.map((address) => (
            <li key={address.id} className="rounded-xl border border-gray-100 bg-gray-50/60 p-3.5">
              <div className="flex items-start justify-between gap-2">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-900">
                  <MapPinIcon className="h-3.5 w-3.5 text-ruby-600" />
                  {address.fullName}
                  {address.isDefault && (
                    <span className="rounded-full bg-ruby-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ruby-700">
                      Default
                    </span>
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => handleDelete(address.id)}
                  aria-label={`Delete address for ${address.fullName}`}
                  className="rounded p-1 text-charcoal-400 hover:bg-rose-50 hover:text-rose-600"
                >
                  <TrashIcon className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-1.5 text-[11px] leading-4 text-charcoal-500">
                {address.addressLine1}
                {address.addressLine2 ? `, ${address.addressLine2}` : ''}<br />
                {address.city}, {address.province} {address.postalCode || ''}<br />
                {address.phone}
              </p>
              {!address.isDefault && (
                <button
                  type="button"
                  onClick={() => handleDefault(address.id)}
                  className="mt-2 text-[10px] font-semibold text-ruby-600 hover:underline"
                >
                  Make default
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 border-t border-gray-100 pt-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="address-full-name" className="label-field">Full name</label>
              <input id="address-full-name" required value={form.fullName} onChange={(event) => update('fullName', event.target.value)} className="input-field" />
            </div>
            <div>
              <label htmlFor="address-phone" className="label-field">Mobile number</label>
              <input id="address-phone" type="tel" required value={form.phone} onChange={(event) => update('phone', event.target.value)} className="input-field" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address-line1" className="label-field">Street address</label>
              <input id="address-line1" required value={form.addressLine1} onChange={(event) => update('addressLine1', event.target.value)} className="input-field" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address-line2" className="label-field">Landmark / apartment (optional)</label>
              <input id="address-line2" value={form.addressLine2} onChange={(event) => update('addressLine2', event.target.value)} className="input-field" />
            </div>
            <div>
              <label htmlFor="address-province" className="label-field">Province</label>
              <select id="address-province" value={form.province} onChange={(event) => changeProvince(event.target.value)} className="input-field">
                {PROVINCES.map((province) => <option key={province} value={province}>{province}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="address-city" className="label-field">City</label>
              <select id="address-city" value={form.city} onChange={(event) => update('city', event.target.value)} className="input-field">
                {zone.cities.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="address-postal" className="label-field">Postal code (optional)</label>
              <input id="address-postal" value={form.postalCode} onChange={(event) => update('postalCode', event.target.value)} className="input-field" />
            </div>
            <label className="flex items-end gap-2 pb-2.5 text-xs text-charcoal-600">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(event) => update('isDefault', event.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-ruby-600 focus:ring-ruby-500"
              />
              Set as default address
            </label>
          </div>

          {message && (
            <p className={`text-xs font-medium ${status === 'success' ? 'text-emerald-700' : 'text-rose-600'}`} role="status">
              {message}
            </p>
          )}

          <button type="submit" disabled={status === 'loading'} className="btn-primary px-5 py-2 text-sm">
            {status === 'loading' ? 'Saving…' : 'Save address'}
          </button>
        </form>
      )}

      {!showForm && message && (
        <p className={`mt-3 text-xs font-medium ${status === 'success' ? 'text-emerald-700' : 'text-rose-600'}`} role="status">
          {message}
        </p>
      )}
    </section>
  );
}
