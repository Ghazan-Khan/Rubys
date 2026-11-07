#!/usr/bin/env node
/**
 * Show which administrator accounts exist in the Ruby's.pk database.
 *
 * Usage:
 *   npm run admin:status
 *
 * This is a server-side check only. It never prints password hashes.
 */
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvFiles } from './load-env.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
loadEnvFiles(root);
const dbPath = path.resolve(root, process.env.DATABASE_PATH || path.join('data', 'rubys.db'));

if (!fs.existsSync(dbPath)) {
  console.error(`Database not found: ${dbPath}`);
  console.error('Run `npm run db:init` first.');
  process.exit(1);
}

const db = new DatabaseSync(dbPath);
const admins = db
  .prepare(
    `SELECT email, role, is_active, created_at
     FROM users
     WHERE role IN ('admin', 'manager')
     ORDER BY created_at ASC`
  )
  .all();

console.log(`Using database: ${dbPath}`);

if (admins.length === 0) {
  console.log('No administrator accounts exist yet.');
  console.log('Create one with `npm run admin:create`.');
} else {
  console.log(`${admins.length} administrator account(s):`);
  for (const admin of admins) {
    console.log(
      `- ${admin.email} (${admin.role}, ${admin.is_active ? 'active' : 'disabled'}, created ${admin.created_at})`
    );
  }
}

db.close();
