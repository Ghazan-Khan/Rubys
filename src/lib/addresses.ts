import { all, get, run } from '@/lib/db';
import { randomUUID } from 'node:crypto';
import type { Address } from '@/types';

type Row = Record<string, unknown>;

function mapAddress(row: Row): Address {
  return {
    id: String(row.id),
    fullName: String(row.full_name),
    phone: String(row.phone),
    addressLine1: String(row.address_line1),
    addressLine2: (row.address_line2 as string) ?? null,
    city: String(row.city),
    province: String(row.province),
    postalCode: (row.postal_code as string) ?? null,
    isDefault: Boolean(row.is_default),
  };
}

export function getAddressesForUser(userId: string): Address[] {
  return all<Row>(
    `SELECT * FROM addresses
     WHERE user_id = ?
     ORDER BY is_default DESC, created_at DESC`,
    [userId]
  ).map(mapAddress);
}

export interface AddressInput {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode?: string;
  isDefault?: boolean;
}

export function addAddress(userId: string, input: AddressInput): Address {
  const existing = get<Row>('SELECT COUNT(*) AS n FROM addresses WHERE user_id = ?', [userId]);
  const makeDefault = input.isDefault === true || Number(existing?.n ?? 0) === 0;

  if (makeDefault) {
    run('UPDATE addresses SET is_default = 0 WHERE user_id = ?', [userId]);
  }

  const id = randomUUID();
  run(
    `INSERT INTO addresses (
       id, user_id, full_name, phone, address_line1, address_line2,
       city, province, postal_code, is_default
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      userId,
      input.fullName.trim(),
      input.phone.trim(),
      input.addressLine1.trim(),
      input.addressLine2?.trim() || null,
      input.city.trim(),
      input.province.trim(),
      input.postalCode?.trim() || null,
      makeDefault ? 1 : 0,
    ]
  );

  const row = get<Row>('SELECT * FROM addresses WHERE id = ?', [id])!;
  return mapAddress(row);
}

export function deleteAddress(userId: string, addressId: string): boolean {
  const row = get<Row>('SELECT id, is_default FROM addresses WHERE id = ? AND user_id = ?', [
    addressId,
    userId,
  ]);
  if (!row) return false;

  run('DELETE FROM addresses WHERE id = ? AND user_id = ?', [addressId, userId]);

  if (Number(row.is_default)) {
    const next = get<Row>(
      'SELECT id FROM addresses WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [userId]
    );
    if (next) run('UPDATE addresses SET is_default = 1 WHERE id = ?', [String(next.id)]);
  }

  return true;
}

export function setDefaultAddress(userId: string, addressId: string): boolean {
  const row = get<Row>('SELECT id FROM addresses WHERE id = ? AND user_id = ?', [addressId, userId]);
  if (!row) return false;
  run('UPDATE addresses SET is_default = 0 WHERE user_id = ?', [userId]);
  run('UPDATE addresses SET is_default = 1 WHERE id = ? AND user_id = ?', [addressId, userId]);
  return true;
}
