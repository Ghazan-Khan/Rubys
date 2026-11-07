import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Apply the additive admin migrations to an open SQLite database.
 * Safe to run repeatedly; never drops tables or data.
 */
export function runMigrations(db, { log = () => {} } = {}) {
  const migrationsPath = path.join(root, 'database', 'migrations.sql');

  if (fs.existsSync(migrationsPath)) {
    db.exec(fs.readFileSync(migrationsPath, 'utf8'));
  }

  const columns = db.prepare('PRAGMA table_info(products)').all();
  if (columns.length === 0) {
    throw new Error('The products table does not exist. Run `npm run db:init` first.');
  }

  if (!columns.some((column) => column.name === 'deleted_at')) {
    db.exec('ALTER TABLE products ADD COLUMN deleted_at TEXT');
    log('Added products.deleted_at');
  }

  db.exec('CREATE INDEX IF NOT EXISTS idx_products_deleted ON products(deleted_at)');
}
