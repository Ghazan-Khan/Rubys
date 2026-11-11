-- ============================================================
-- Ruby's.pk — additive admin migrations
-- ------------------------------------------------------------
-- This file is safe to run repeatedly. It never drops or resets
-- existing tables or data. The `products.deleted_at` column and
-- its index are handled in code because SQLite cannot add a
-- column with IF NOT EXISTS.
-- ============================================================

-- Uploaded product images are stored in SQLite so they survive
-- redeployments on hosts with ephemeral filesystems.
CREATE TABLE IF NOT EXISTS media (
    id              TEXT PRIMARY KEY,
    original_name   TEXT NOT NULL,
    mime_type       TEXT NOT NULL,
    size_bytes      INTEGER NOT NULL,
    width           INTEGER,
    height          INTEGER,
    data            BLOB NOT NULL,
    alt_text        TEXT,
    created_by      TEXT REFERENCES users(id) ON DELETE SET NULL,
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_media_created_at ON media(created_at);

-- Persistent admin login rate limiting.
CREATE TABLE IF NOT EXISTS login_attempts (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    email       TEXT NOT NULL,
    ip          TEXT NOT NULL,
    success     INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_login_attempts_lookup
    ON login_attempts(email, ip, created_at);

-- Audit trail for admin changes.
CREATE TABLE IF NOT EXISTS admin_audit_log (
    id          TEXT PRIMARY KEY,
    user_id     TEXT REFERENCES users(id) ON DELETE SET NULL,
    action      TEXT NOT NULL,
    entity_type TEXT,
    entity_id   TEXT,
    details     TEXT,
    ip          TEXT,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_created_at
    ON admin_audit_log(created_at);

CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Seed Super Admin user
INSERT OR IGNORE INTO users (id, first_name, last_name, email, phone, password_hash, role, email_verified, phone_verified, is_active)
VALUES (
    'admin-root-01',
    'Ghazan',
    'Khan',
    'ghazankhan@rubys.pk',
    '03007654321',
    'scrypt$b48d34d4c3556fe14a9a435738a1c3cc$e14c5e7b09c9bd7841b12c2421c9332377a9717dccf45bf1661bd6b6780f8e49ebd5b0f30c71096b9754c7402b3ab8639cabc53ffb7df4f901817afeffcd2352',
    'admin',
    1,
    1,
    1
);

UPDATE users
SET role = 'admin',
    password_hash = 'scrypt$b48d34d4c3556fe14a9a435738a1c3cc$e14c5e7b09c9bd7841b12c2421c9332377a9717dccf45bf1661bd6b6780f8e49ebd5b0f30c71096b9754c7402b3ab8639cabc53ffb7df4f901817afeffcd2352',
    is_active = 1
WHERE email = 'ghazankhan@rubys.pk' COLLATE NOCASE;
