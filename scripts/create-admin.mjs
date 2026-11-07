#!/usr/bin/env node
/**
 * Create or update a Ruby's.pk administrator.
 *
 * Usage (recommended for servers):
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a-strong-password' \
 *     ADMIN_FIRST_NAME=Ruby ADMIN_LAST_NAME=Admin ADMIN_PHONE=03001234567 \
 *     npm run admin:create
 *
 * Or pass flags:
 *   npm run admin:create -- --email you@example.com --password '...' \
 *     --first-name Ruby --last-name Admin --phone 03001234567
 *
 * Existing accounts are only modified when --update is supplied.
 * Passwords are hashed with scrypt; the plain password is never stored.
 */
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, randomUUID, scryptSync } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import { runMigrations } from './migrate-lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dbPath = path.resolve(root, process.env.DATABASE_PATH || path.join('data', 'rubys.db'));
const updateExisting = process.argv.includes('--update');

function flag(name) {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1) return undefined;
  const value = process.argv[index + 1];
  return value && !value.startsWith('--') ? value : undefined;
}

function value(name, envName) {
  return (flag(name) || process.env[envName] || '').trim();
}

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

function normalizePhone(phone) {
  const digits = phone.replace(/[^\d]/g, '');
  if (digits.startsWith('92')) return `0${digits.slice(2)}`;
  if (digits.startsWith('3') && digits.length === 10) return `0${digits}`;
  return digits;
}

function validatePassword(password) {
  if (password.length < 12) return 'Password must be at least 12 characters long.';
  if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter.';
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter.';
  if (!/\d/.test(password)) return 'Password must contain a number.';
  if (!/[^A-Za-z0-9]/.test(password)) return 'Password must contain a symbol.';
  return null;
}

function promptHidden(question) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY) {
      reject(new Error('Cannot prompt for a password without an interactive terminal. Use ADMIN_PASSWORD or --password.'));
      return;
    }

    const stdin = process.stdin;
    const stdout = process.stdout;
    let answer = '';

    stdout.write(question);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    const cleanup = () => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener('data', onData);
    };

    const onData = (chunk) => {
      for (const char of chunk) {
        if (char === '\r' || char === '\n' || char === '\u0004') {
          cleanup();
          stdout.write('\n');
          resolve(answer);
          return;
        }
        if (char === '\u0003') {
          cleanup();
          stdout.write('\n');
          process.exit(1);
        }
        if (char === '\u007f' || char === '\b') {
          if (answer.length > 0) {
            answer = answer.slice(0, -1);
            stdout.write('\b \b');
          }
          continue;
        }
        answer += char;
        stdout.write('*');
      }
    };

    stdin.on('data', onData);
  });
}

async function main() {
  if (!fs.existsSync(dbPath)) {
    console.error(`Database not found: ${path.relative(root, dbPath)}`);
    console.error('Run `npm run db:init` first.');
    process.exit(1);
  }

  const db = new DatabaseSync(dbPath);
  db.exec('PRAGMA foreign_keys = ON;');
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA busy_timeout = 5000;');
  runMigrations(db);

  let email = value('email', 'ADMIN_EMAIL').toLowerCase();
  let password = value('password', 'ADMIN_PASSWORD');
  let firstName = value('first-name', 'ADMIN_FIRST_NAME');
  let lastName = value('last-name', 'ADMIN_LAST_NAME');
  let phone = value('phone', 'ADMIN_PHONE');
  let role = value('role', 'ADMIN_ROLE') || 'admin';

  if (!process.stdin.isTTY && (!email || !password || !firstName || !lastName || !phone)) {
    console.error('Missing admin details. Set ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_FIRST_NAME, ADMIN_LAST_NAME and ADMIN_PHONE.');
    db.close();
    process.exit(1);
  }

  if (process.stdin.isTTY) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    if (!email) email = (await rl.question('Admin email: ')).trim().toLowerCase();
    if (!firstName) firstName = (await rl.question('First name: ')).trim();
    if (!lastName) lastName = (await rl.question('Last name: ')).trim();
    if (!phone) phone = (await rl.question('Phone (03xxxxxxxxx): ')).trim();
    if (!process.argv.includes('--role')) {
      const answer = (await rl.question('Role [admin/manager] (admin): ')).trim().toLowerCase();
      if (answer) role = answer;
    }
    rl.close();
    if (!password) password = await promptHidden('Password (input hidden): ');
  }

  email = email.trim().toLowerCase();
  phone = normalizePhone(phone);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error('Enter a valid email address.');
    db.close();
    process.exit(1);
  }
  if (!firstName || !lastName) {
    console.error('First name and last name are required.');
    db.close();
    process.exit(1);
  }
  if (!/^03\d{9}$/.test(phone)) {
    console.error('Enter a valid Pakistani mobile number, e.g. 03001234567.');
    db.close();
    process.exit(1);
  }
  if (!['admin', 'manager'].includes(role)) {
    console.error('Role must be "admin" or "manager".');
    db.close();
    process.exit(1);
  }
  const passwordError = validatePassword(password);
  if (passwordError) {
    console.error(passwordError);
    db.close();
    process.exit(1);
  }

  const existing = db.prepare('SELECT * FROM users WHERE email = ? COLLATE NOCASE').get(email);

  if (existing && !updateExisting) {
    console.error(`An account already exists for ${email}.`);
    console.error('Re-run with --update to change its name, phone, password and role.');
    db.close();
    process.exit(1);
  }

  const phoneOwner = db.prepare('SELECT id, email FROM users WHERE phone = ? AND email != ? COLLATE NOCASE').get(phone, email);
  if (phoneOwner) {
    console.error(`That phone number is already used by ${phoneOwner.email}.`);
    db.close();
    process.exit(1);
  }

  const passwordHash = hashPassword(password);

  if (existing) {
    db.prepare(
      `UPDATE users
       SET first_name = ?, last_name = ?, phone = ?, password_hash = ?, role = ?, is_active = 1
       WHERE id = ?`
    ).run(firstName, lastName, phone, passwordHash, role, existing.id);
    console.log(`Updated ${role} account: ${email}`);
  } else {
    db.prepare(
      `INSERT INTO users (id, first_name, last_name, email, phone, password_hash, role, email_verified, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, 1)`
    ).run(randomUUID(), firstName, lastName, email, phone, passwordHash, role);
    console.log(`Created ${role} account: ${email}`);
  }

  console.log('Sign in at /admin/login. Keep the password in a password manager.');
  db.close();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
