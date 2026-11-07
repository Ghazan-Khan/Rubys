#!/usr/bin/env node
/**
 * Apply additive admin migrations to an existing Ruby's.pk database.
 *
 * Usage:
 *   npm run db:migrate
 *
 * This never resets or deletes data. Set DATABASE_PATH to target a
 * different database file.
 */
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvFiles } from './load-env.mjs';
import { runMigrations } from './migrate-lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
loadEnvFiles(root);
const dbPath = path.resolve(root, process.env.DATABASE_PATH || path.join('data', 'rubys.db'));

if (!fs.existsSync(dbPath)) {
  console.error(`Database not found: ${path.relative(root, dbPath)}`);
  console.error('Run `npm run db:init` to create it first.');
  process.exit(1);
}

const db = new DatabaseSync(dbPath);
db.exec('PRAGMA foreign_keys = ON;');
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA busy_timeout = 5000;');

console.log(`Using database: ${dbPath}`);
runMigrations(db, { log: (message) => console.log(message) });
console.log('Migrations applied.');

const counts = {
  products: db.prepare('SELECT COUNT(*) AS n FROM products').get().n,
  users: db.prepare('SELECT COUNT(*) AS n FROM users').get().n,
  orders: db.prepare('SELECT COUNT(*) AS n FROM orders').get().n,
  media: db.prepare('SELECT COUNT(*) AS n FROM media').get().n,
};
console.log(
  `Existing data preserved: ${counts.products} products, ${counts.users} users, ` +
  `${counts.orders} orders, ${counts.media} media files.`
);
db.close();
