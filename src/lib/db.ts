import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

type SqlValue = string | number | bigint | null | Uint8Array;

const databasePath = path.resolve(
  process.cwd(),
  process.env.DATABASE_PATH || path.join('data', 'rubys.db')
);

const globalForDb = globalThis as unknown as { __rubysDb?: DatabaseSync };

let databaseInstance: DatabaseSync | undefined;

/**
 * Open the database only when a query is actually executed.
 *
 * Next.js imports route modules at build time to collect page data. If the
 * connection were opened at module scope, the build would create/migrate the
 * SQLite file and contend with any existing WAL lock. Keeping this lazy means
 * importing this module has no filesystem or database side effects.
 */
function getDb(): DatabaseSync {
  if (databaseInstance) return databaseInstance;

  if (globalForDb.__rubysDb) {
    databaseInstance = globalForDb.__rubysDb;
    return databaseInstance;
  }

  const database = openDatabase();
  databaseInstance = database;
  if (process.env.NODE_ENV !== 'production') {
    globalForDb.__rubysDb = database;
  }
  return database;
}

/**
 * Additive, idempotent migrations for existing databases.
 * Keeps the admin dashboard deployable without ever resetting data.
 */
function applyMigrations(database: DatabaseSync) {
  const hasAppliedTable = database
    .prepare("SELECT 1 AS ok FROM sqlite_master WHERE type = 'table' AND name = 'applied_imports'")
    .get();

  if (!hasAppliedTable) {
    database.exec(`
      CREATE TABLE IF NOT EXISTS applied_imports (
        name        TEXT PRIMARY KEY,
        applied_at  TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);
  }

  const appliedStatement = database.prepare('SELECT 1 AS ok FROM applied_imports WHERE name = ?');

  const migrationsPath = path.join(process.cwd(), 'database', 'migrations.sql');
  if (fs.existsSync(migrationsPath) && !appliedStatement.get('migrations.sql')) {
    database.exec('BEGIN IMMEDIATE;');
    try {
      database.exec('PRAGMA foreign_keys = OFF;');
      database.exec(fs.readFileSync(migrationsPath, 'utf8'));
      database.exec('PRAGMA foreign_keys = ON;');
      database.prepare('INSERT OR IGNORE INTO applied_imports (name) VALUES (?)').run('migrations.sql');
      database.exec('COMMIT;');
    } catch (err) {
      database.exec('ROLLBACK;');
      throw err;
    }
  }

  const columns = database
    .prepare('PRAGMA table_info(products)')
    .all() as unknown as Array<{ name: string }>;

  if (columns.length === 0) {
    throw new Error('The products table does not exist. Run `npm run db:init` first.');
  }

  if (!columns.some((column) => column.name === 'deleted_at')) {
    database.exec('ALTER TABLE products ADD COLUMN deleted_at TEXT');
  }

  if (!appliedStatement.get('idx_products_deleted')) {
    database.exec('CREATE INDEX IF NOT EXISTS idx_products_deleted ON products(deleted_at)');
    database.prepare('INSERT OR IGNORE INTO applied_imports (name) VALUES (?)').run('idx_products_deleted');
  }

  for (const file of [
    'beauty-skincare-catalog.sql',
    'clothing-fashion-catalog.sql',
    'bags-accessories-catalog.sql',
    'jewellery-watches-catalog.sql',
    'shoes-footwear-catalog.sql',
    'lifestyle-personal-catalog.sql',
  ]) {
    if (appliedStatement.get(file)) continue;

    const catalogPath = path.join(process.cwd(), 'database', file);
    if (!fs.existsSync(catalogPath)) continue;

    database.exec('BEGIN IMMEDIATE;');
    try {
      database.exec(fs.readFileSync(catalogPath, 'utf8'));
      database.exec('COMMIT;');
    } catch (error) {
      database.exec('ROLLBACK;');
      throw error;
    }
  }
}

function openDatabase(): DatabaseSync {
  fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  const database = new DatabaseSync(databasePath);

  database.exec('PRAGMA foreign_keys = ON;');
  database.exec('PRAGMA journal_mode = WAL;');
  database.exec('PRAGMA busy_timeout = 30000;');

  const hasSchema = database
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'products'")
    .get();

  if (!hasSchema) {
    const schemaPath = path.join(process.cwd(), 'database.sql');
    const seedPath = path.join(process.cwd(), 'database', 'seed.sql');
    database.exec('PRAGMA foreign_keys = OFF;');
    if (fs.existsSync(schemaPath)) {
      database.exec(fs.readFileSync(schemaPath, 'utf8'));
    }
    if (fs.existsSync(seedPath)) {
      database.exec(fs.readFileSync(seedPath, 'utf8'));
    }
    database.exec('PRAGMA foreign_keys = ON;');
  }

  applyMigrations(database);

  return database;
}

export function all<T>(sql: string, params: SqlValue[] = []): T[] {
  return getDb().prepare(sql).all(...params) as unknown as T[];
}

export function get<T>(sql: string, params: SqlValue[] = []): T | undefined {
  return getDb().prepare(sql).get(...params) as unknown as T | undefined;
}

export function run(sql: string, params: SqlValue[] = []) {
  return getDb().prepare(sql).run(...params);
}

export function transaction<T>(callback: () => T): T {
  const database = getDb();
  database.exec('BEGIN IMMEDIATE;');
  try {
    const result = callback();
    database.exec('COMMIT;');
    return result;
  } catch (error) {
    database.exec('ROLLBACK;');
    throw error;
  }
}

export function count(sql: string, params: SqlValue[] = []): number {
  const row = get<{ n: number }>(sql, params);
  return Number(row?.n ?? 0);
}
