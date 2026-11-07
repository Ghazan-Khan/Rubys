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
