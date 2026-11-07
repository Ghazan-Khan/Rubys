#!/usr/bin/env node
/**
 * Create (or rebuild) the Ruby's.pk SQLite database.
 *
 * Usage:
 *   npm run db:init     # creates the database if it does not exist
 *   npm run db:reset    # deletes and recreates the database + seed data
 *
 * The database file location can be changed with DATABASE_PATH.
 */
import { DatabaseSync } from 'node:sqlite';
import { randomUUID, randomBytes, scryptSync } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvFiles } from './load-env.mjs';
import { runMigrations } from './migrate-lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
loadEnvFiles(root);
const schemaPath = path.join(root, 'database.sql');
const seedPath = path.join(root, 'database', 'seed.sql');
const dbPath = path.resolve(root, process.env.DATABASE_PATH || path.join('data', 'rubys.db'));
const reset = process.argv.includes('--reset');

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

if (!fs.existsSync(schemaPath)) {
  console.error(`Schema file not found: ${schemaPath}`);
  process.exit(1);
}
if (!fs.existsSync(seedPath)) {
  console.error(`Seed file not found: ${seedPath}`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

if (reset) {
  for (const file of [dbPath, `${dbPath}-wal`, `${dbPath}-shm`]) {
    if (fs.existsSync(file)) {
      fs.rmSync(file);
      console.log(`Removed ${path.relative(root, file)}`);
    }
  }
}

const fresh = !fs.existsSync(dbPath);
const db = new DatabaseSync(dbPath);
db.exec('PRAGMA foreign_keys = ON;');
db.exec('PRAGMA journal_mode = WAL;');

console.log(`Using database: ${path.relative(root, dbPath)}`);
db.exec(fs.readFileSync(schemaPath, 'utf8'));
console.log('Schema ready.');
runMigrations(db, { log: (message) => console.log(message) });
console.log('Migrations applied.');
db.exec(fs.readFileSync(seedPath, 'utf8'));
console.log('Seed data loaded.');

// A demo customer so the account and order-tracking flows can be tested.
const demoEmail = 'demo@rubys.pk';
const existingDemo = db.prepare('SELECT id FROM users WHERE email = ?').get(demoEmail);
if (!existingDemo) {
  const id = randomUUID();
  db.prepare(
    `INSERT INTO users (id, first_name, last_name, email, phone, password_hash, role)
     VALUES (?, ?, ?, ?, ?, ?, 'customer')`
  ).run(id, 'Demo', 'Customer', demoEmail, '03001234567', hashPassword('Demo@1234'));

  const orderId = randomUUID();
  const orderNumber = 'RB-DEMO-1001';
  db.prepare(
    `INSERT INTO orders (
       id, order_number, user_id, guest_email, guest_phone, status, payment_method,
       payment_status, subtotal, discount_amount, shipping_amount, tax_amount, total_amount,
       shipping_full_name, shipping_phone, shipping_address_line1, shipping_city,
       shipping_province, tracking_number, courier_name, dispatched_at, delivered_at, created_at
     ) VALUES (?, ?, ?, ?, ?, 'delivered', 'cod', 'paid', ?, 0, 0, 0, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now','-9 days'), datetime('now','-6 days'), datetime('now','-10 days'))`
  ).run(
    orderId, orderNumber, id, demoEmail, '03001234567', 5288, 5288,
    'Demo Customer', '03001234567', 'House 12, Street 4, Hayatabad Phase 2', 'Peshawar',
    'Khyber Pakhtunkhwa', 'RB-TRK-1001', "Ruby's Express"
  );
  db.prepare(
    `INSERT INTO order_items (id, order_id, product_id, product_name, product_sku, product_emoji, quantity, unit_price, total_price)
     VALUES (?, ?, 'p-06', 'Wireless Noise-Cancelling Earbuds', 'RB-ELC-001', '🎧', 1, 4499, 4499)`
  ).run(randomUUID(), orderId);
  db.prepare(
    `INSERT INTO order_items (id, order_id, product_id, product_name, product_sku, product_emoji, quantity, unit_price, total_price)
     VALUES (?, ?, 'p-11', 'Ceramic Coffee Mug Set', 'RB-HOM-001', '☕', 1, 789, 789)`
  ).run(randomUUID(), orderId);
  console.log('Demo account created: demo@rubys.pk / Demo@1234');
}

const counts = {
  categories: db.prepare('SELECT COUNT(*) AS n FROM categories').get().n,
  products: db.prepare('SELECT COUNT(*) AS n FROM products').get().n,
  coupons: db.prepare('SELECT COUNT(*) AS n FROM coupons').get().n,
  posts: db.prepare('SELECT COUNT(*) AS n FROM blog_posts').get().n,
  users: db.prepare('SELECT COUNT(*) AS n FROM users').get().n,
};
console.log(
  `Done. ${counts.categories} categories, ${counts.products} products, ${counts.coupons} coupons, ` +
  `${counts.posts} blog posts, ${counts.users} users.`
);
if (fresh) console.log('Database file created successfully.');
db.close();
