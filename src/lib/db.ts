import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

type SqlValue = string | number | bigint | null | Uint8Array;

const databasePath = path.resolve(
  process.cwd(),
  process.env.DATABASE_PATH || path.join('data', 'rubys.db')
);

const globalForDb = globalThis as unknown as { __rubysDb?: DatabaseSync };

/**
 * Additive, idempotent migrations for existing databases.
 * Keeps the admin dashboard deployable without ever resetting data.
 */
function applyMigrations(database: DatabaseSync) {
  const migrationsPath = path.join(process.cwd(), 'database', 'migrations.sql');
  if (fs.existsSync(migrationsPath)) {
    database.exec('PRAGMA foreign_keys = OFF;');
    database.exec(fs.readFileSync(migrationsPath, 'utf8'));
    database.exec('PRAGMA foreign_keys = ON;');
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

  database.exec('CREATE INDEX IF NOT EXISTS idx_products_deleted ON products(deleted_at)');
}

function openDatabase(): DatabaseSync {
  fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  const database = new DatabaseSync(databasePath);

  database.exec('PRAGMA foreign_keys = ON;');
  database.exec('PRAGMA journal_mode = WAL;');
  database.exec('PRAGMA busy_timeout = 5000;');

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

export const db: DatabaseSync = globalForDb.__rubysDb ?? openDatabase();
if (process.env.NODE_ENV !== 'production') globalForDb.__rubysDb = db;

export function all<T>(sql: string, params: SqlValue[] = []): T[] {
  return db.prepare(sql).all(...params) as unknown as T[];
}

export function get<T>(sql: string, params: SqlValue[] = []): T | undefined {
  return db.prepare(sql).get(...params) as unknown as T | undefined;
}

export function run(sql: string, params: SqlValue[] = []) {
  return db.prepare(sql).run(...params);
}

export function transaction<T>(callback: () => T): T {
  db.exec('BEGIN IMMEDIATE;');
  try {
    const result = callback();
    db.exec('COMMIT;');
    return result;
  } catch (error) {
    db.exec('ROLLBACK;');
    throw error;
  }
}

export function count(sql: string, params: SqlValue[] = []): number {
  const row = get<{ n: number }>(sql, params);
  return Number(row?.n ?? 0);
}
