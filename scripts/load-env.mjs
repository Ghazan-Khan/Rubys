import fs from 'node:fs';
import path from 'node:path';

/**
 * Load .env.local and .env for standalone CLI scripts.
 *
 * Next.js loads these files for the web app, but `node scripts/*.mjs`
 * does not. Loading them here makes `db:migrate` and `admin:create`
 * target the same DATABASE_PATH as the deployed app on Hostinger.
 *
 * Existing environment variables always win, so values injected by
 * the host or by `DATABASE_PATH=... npm run ...` are never overridden.
 */
export function loadEnvFiles(root) {
  if (typeof process.loadEnvFile !== 'function') return;

  // .env.local takes precedence, so load it first.
  for (const file of ['.env.local', '.env']) {
    const fullPath = path.join(root, file);
    if (!fs.existsSync(fullPath)) continue;
    try {
      process.loadEnvFile(fullPath);
    } catch {
      // Ignore malformed optional env files; the app will report real errors.
    }
  }
}
