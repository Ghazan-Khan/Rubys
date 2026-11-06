-- ============================================================
-- Ruby's.pk — SQLite database schema
-- ------------------------------------------------------------
-- This is the single source of truth for the app database.
-- The app uses Node's built-in `node:sqlite` driver and reads
-- the file configured by DATABASE_PATH (default: ./data/rubys.db).
--
-- Run `npm run db:init` to create the database and load seed data.
-- Run `npm run db:reset` to rebuild it from scratch.
-- ============================================================

PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

-- ------------------------------------------------------------
-- Customers, admins and sessions
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id              TEXT PRIMARY KEY,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE COLLATE NOCASE,
    phone           TEXT NOT NULL UNIQUE,
    password_hash   TEXT NOT NULL,
    role            TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'manager')),
    email_verified  INTEGER NOT NULL DEFAULT 0,
    phone_verified  INTEGER NOT NULL DEFAULT 0,
    is_active       INTEGER NOT NULL DEFAULT 1,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
    token       TEXT PRIMARY KEY,
    user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at  TEXT NOT NULL,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS addresses (
    id              TEXT PRIMARY KEY,
    user_id         TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name       TEXT NOT NULL,
    phone           TEXT NOT NULL,
    address_line1   TEXT NOT NULL,
    address_line2   TEXT,
    city            TEXT NOT NULL,
    province        TEXT NOT NULL,
    postal_code     TEXT,
    is_default      INTEGER NOT NULL DEFAULT 0,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ------------------------------------------------------------
-- Catalog
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
    id              TEXT PRIMARY KEY,
    name            TEXT NOT NULL,
    slug            TEXT NOT NULL UNIQUE,
    description     TEXT,
    emoji           TEXT,
    banner_text     TEXT,
    image_url       TEXT,
    is_active       INTEGER NOT NULL DEFAULT 1,
    sort_order      INTEGER NOT NULL DEFAULT 0,
    meta_title      TEXT,
    meta_description TEXT,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS brands (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    description TEXT,
    logo_url    TEXT,
    is_active   INTEGER NOT NULL DEFAULT 1,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS products (
    id                  TEXT PRIMARY KEY,
    name                TEXT NOT NULL,
    slug                TEXT NOT NULL UNIQUE,
    sku                 TEXT NOT NULL UNIQUE,
    description         TEXT,
    short_description   TEXT,
    price               INTEGER NOT NULL CHECK (price >= 0),
    sale_price          INTEGER CHECK (sale_price >= 0),
    cost_price          INTEGER CHECK (cost_price >= 0),
    category_id         TEXT REFERENCES categories(id),
    brand               TEXT,
    stock_quantity      INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    min_stock_alert     INTEGER NOT NULL DEFAULT 5,
    weight              REAL,
    is_featured         INTEGER NOT NULL DEFAULT 0,
    is_active           INTEGER NOT NULL DEFAULT 1,
    emoji               TEXT,
    image_url           TEXT,
    badge               TEXT,
    rating              REAL NOT NULL DEFAULT 0,
    review_count        INTEGER NOT NULL DEFAULT 0,
    sold_count          INTEGER NOT NULL DEFAULT 0,
    meta_title          TEXT,
    meta_description    TEXT,
    created_at          TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at          TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS product_images (
    id          TEXT PRIMARY KEY,
    product_id  TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url   TEXT NOT NULL,
    alt_text    TEXT,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    is_primary  INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS product_attributes (
    id              TEXT PRIMARY KEY,
    product_id      TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    attribute_name  TEXT NOT NULL,
    attribute_value TEXT NOT NULL,
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ------------------------------------------------------------
-- Marketing & reviews
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS coupons (
    id                  TEXT PRIMARY KEY,
    code                TEXT NOT NULL UNIQUE COLLATE NOCASE,
    type                TEXT NOT NULL CHECK (type IN ('percentage', 'fixed')),
    value               INTEGER NOT NULL CHECK (value >= 0),
    min_order_amount    INTEGER NOT NULL DEFAULT 0,
    max_discount_amount INTEGER,
    usage_limit         INTEGER,
    used_count          INTEGER NOT NULL DEFAULT 0,
    starts_at           TEXT,
    expires_at          TEXT,
    is_active           INTEGER NOT NULL DEFAULT 1,
    created_at          TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at          TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS reviews (
    id          TEXT PRIMARY KEY,
    product_id  TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id     TEXT REFERENCES users(id) ON DELETE SET NULL,
    order_id    TEXT REFERENCES orders(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title       TEXT,
    comment     TEXT,
    is_approved INTEGER NOT NULL DEFAULT 1,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS wishlist (
    id          TEXT PRIMARY KEY,
    user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id  TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id, product_id)
);

-- ------------------------------------------------------------
-- Orders
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id                      TEXT PRIMARY KEY,
    order_number            TEXT NOT NULL UNIQUE,
    user_id                 TEXT REFERENCES users(id) ON DELETE SET NULL,
    guest_email             TEXT,
    guest_phone             TEXT NOT NULL,
    status                  TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
                                'pending', 'confirmed', 'processing', 'dispatched',
                                'out_for_delivery', 'delivered', 'cancelled', 'returned', 'refunded'
                            )),
    payment_method          TEXT NOT NULL CHECK (payment_method IN ('cod', 'bank_transfer', 'jazzcash', 'easypaisa')),
    payment_status          TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    subtotal                INTEGER NOT NULL CHECK (subtotal >= 0),
    discount_amount         INTEGER NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
    shipping_amount         INTEGER NOT NULL DEFAULT 0 CHECK (shipping_amount >= 0),
    tax_amount              INTEGER NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
    total_amount            INTEGER NOT NULL CHECK (total_amount >= 0),
    coupon_code             TEXT,
    shipping_full_name      TEXT NOT NULL,
    shipping_phone          TEXT NOT NULL,
    shipping_address_line1  TEXT NOT NULL,
    shipping_address_line2  TEXT,
    shipping_city           TEXT NOT NULL,
    shipping_province       TEXT NOT NULL,
    shipping_postal_code    TEXT,
    notes                   TEXT,
    tracking_number         TEXT,
    courier_name            TEXT,
    dispatched_at           TEXT,
    delivered_at            TEXT,
    cancelled_at            TEXT,
    created_at              TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at              TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS order_items (
    id              TEXT PRIMARY KEY,
    order_id        TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id      TEXT REFERENCES products(id) ON DELETE SET NULL,
    product_name    TEXT NOT NULL,
    product_sku     TEXT NOT NULL,
    product_emoji   TEXT,
    quantity        INTEGER NOT NULL CHECK (quantity > 0),
    unit_price      INTEGER NOT NULL CHECK (unit_price >= 0),
    total_price     INTEGER NOT NULL CHECK (total_price >= 0),
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ------------------------------------------------------------
-- Communication & content
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id              TEXT PRIMARY KEY,
    email           TEXT NOT NULL UNIQUE COLLATE NOCASE,
    is_active       INTEGER NOT NULL DEFAULT 1,
    subscribed_at   TEXT NOT NULL DEFAULT (datetime('now')),
    unsubscribed_at TEXT
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    phone       TEXT,
    subject     TEXT,
    message     TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
    replied_at  TEXT,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS shipping_zones (
    id                  TEXT PRIMARY KEY,
    name                TEXT NOT NULL,
    provinces           TEXT NOT NULL,
    cities              TEXT NOT NULL,
    rate                INTEGER NOT NULL CHECK (rate >= 0),
    free_shipping_min   INTEGER,
    estimated_days      TEXT,
    is_active           INTEGER NOT NULL DEFAULT 1,
    created_at          TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at          TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS blog_posts (
    id              TEXT PRIMARY KEY,
    title           TEXT NOT NULL,
    slug            TEXT NOT NULL UNIQUE,
    excerpt         TEXT,
    content         TEXT NOT NULL,
    featured_image  TEXT,
    emoji           TEXT,
    author_id       TEXT REFERENCES users(id) ON DELETE SET NULL,
    author_name     TEXT,
    category        TEXT,
    status          TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at    TEXT,
    meta_title      TEXT,
    meta_description TEXT,
    views           INTEGER NOT NULL DEFAULT 0,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ------------------------------------------------------------
-- Indexes
-- ------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(guest_phone);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);

-- ------------------------------------------------------------
-- updated_at triggers
-- ------------------------------------------------------------
CREATE TRIGGER IF NOT EXISTS update_users_updated_at
AFTER UPDATE ON users FOR EACH ROW
BEGIN
    UPDATE users SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_addresses_updated_at
AFTER UPDATE ON addresses FOR EACH ROW
BEGIN
    UPDATE addresses SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_categories_updated_at
AFTER UPDATE ON categories FOR EACH ROW
BEGIN
    UPDATE categories SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_products_updated_at
AFTER UPDATE ON products FOR EACH ROW
BEGIN
    UPDATE products SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_coupons_updated_at
AFTER UPDATE ON coupons FOR EACH ROW
BEGIN
    UPDATE coupons SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_orders_updated_at
AFTER UPDATE ON orders FOR EACH ROW
BEGIN
    UPDATE orders SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_shipping_zones_updated_at
AFTER UPDATE ON shipping_zones FOR EACH ROW
BEGIN
    UPDATE shipping_zones SET updated_at = datetime('now') WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_blog_posts_updated_at
AFTER UPDATE ON blog_posts FOR EACH ROW
BEGIN
    UPDATE blog_posts SET updated_at = datetime('now') WHERE id = NEW.id;
END;
