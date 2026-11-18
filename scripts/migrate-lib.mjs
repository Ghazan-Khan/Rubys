import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** True when a catalogue import has already been applied to this database. */
function isImportApplied(db, file) {
  const table = db
    .prepare("SELECT 1 AS ok FROM sqlite_master WHERE type = 'table' AND name = 'applied_imports'")
    .get();

  if (!table) return false;

  return Boolean(db.prepare('SELECT 1 AS ok FROM applied_imports WHERE name = ?').get(file));
}

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

  db.exec(`
    CREATE TABLE IF NOT EXISTS applied_imports (
      name        TEXT PRIMARY KEY,
      applied_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  db.prepare('INSERT OR IGNORE INTO applied_imports (name) VALUES (?)').run('migrations.sql');
  db.prepare('INSERT OR IGNORE INTO applied_imports (name) VALUES (?)').run('idx_products_deleted');

  // Curated catalogue imports. Each file records itself in `applied_imports`
  // when it runs, so later starts stay read-only and cannot contend for the
  // SQLite write lock (important when Next.js build workers open the DB).
  const catalogFiles = [
    'beauty-skincare-catalog.sql',
    'clothing-fashion-catalog.sql',
    'bags-accessories-catalog.sql',
    'jewellery-watches-catalog.sql',
    'shoes-footwear-catalog.sql',
    'lifestyle-personal-catalog.sql',
  ];

  for (const file of catalogFiles) {
    if (isImportApplied(db, file)) continue;

    const catalogPath = path.join(root, 'database', file);
    if (!fs.existsSync(catalogPath)) continue;

    db.exec('BEGIN IMMEDIATE;');
    try {
      db.exec(fs.readFileSync(catalogPath, 'utf8'));
      db.exec('COMMIT;');
    } catch (error) {
      db.exec('ROLLBACK;');
      throw error;
    }
  }
}
