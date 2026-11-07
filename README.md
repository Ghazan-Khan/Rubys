# Ruby's.pk

A complete, production-shaped e-commerce storefront for **Ruby's.pk** — a Pakistan-focused online shop built in Peshawar, Khyber Pakhtunkhwa. The store uses Next.js 15 (App Router), React 19, Tailwind CSS and a local SQLite database.

## What is included

- **Storefront** — home page, full catalog, category pages, search, filters, sorting and pagination
- **Product pages** — artwork, pricing in PKR, stock status, reviews, related products, JSON-LD
- **Cart & wishlist** — saved in browser storage, coupon validation, quantity controls
- **Checkout** — guest or signed-in checkout, province-based shipping, COD/bank/JazzCash/Easypaisa
- **Orders** — server-side order creation, stock updates, order confirmation, tracking by order number + phone
- **Accounts** — register, sign in, order history, profile, password, saved addresses
- **Content** — buying guides (blog), about, contact, FAQ and full policy pages
- **SEO** — metadata, canonical URLs, sitemap, robots, Open Graph, structured data
- **Admin dashboard** — secure staff login, dashboard totals, product CRUD with image upload, order and customer views
- **Database** — SQLite schema + seed data with 26 products, 6 categories, coupons, reviews, blog posts and a demo account

## Requirements

- **Node.js 22.13 or newer** (the app uses the built-in `node:sqlite` module)
- npm 10+

No Python, native build tools or external database server are required.

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Create the SQLite database and load sample data
npm run db:init

# 3. Start the development server
npm run dev
```

Open <http://localhost:3000>.

To use the admin dashboard, apply migrations and create your own administrator:

```bash
npm run db:migrate
npm run admin:create
```

Then sign in at <http://localhost:3000/admin/login>.

The database file is created at `data/rubys.db`. It is created automatically the first time the app queries the database if it is missing, but `npm run db:init` is the recommended way to set it up.

### Demo account

| Field | Value |
| --- | --- |
| Email | `demo@rubys.pk` |
| Password | `Demo@1234` |
| Demo order | `RB-DEMO-1001` |
| Phone for tracking | `03001234567` |

### Demo coupons

- `RUBY10` — 10% off orders over Rs. 1,500 (max Rs. 1,000 discount)
- `WELCOME500` — Rs. 500 off orders over Rs. 3,000

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |
| `npm run lint` | Run Next.js lint |
| `npm run type-check` | Run TypeScript with no emit |
| `npm run db:init` | Create the database and load schema + seed data |
| `npm run db:migrate` | Apply additive admin migrations to an existing database |
| `npm run db:reset` | Delete and rebuild the database from scratch |
| `npm run admin:create` | Create or update an administrator account (prompts securely) |

> `db:reset` removes `data/rubys.db` and recreates it. Use it only when you are happy to lose local data.
> `db:migrate` and `admin:create` never delete products, orders or customers.

## Environment variables

Copy `.env.example` to `.env.local` and adjust as needed:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_PATH=./data/rubys.db
```

- `DATABASE_PATH` — location of the SQLite file. Relative paths resolve from the project root. The default is `./data/rubys.db`.
- `NEXT_PUBLIC_SITE_URL` — used for canonical URLs, sitemap and structured data. Set this to your live domain in production.

Admin accounts are not configured through the app. Use `npm run admin:create`; for non-interactive servers you can provide `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_FIRST_NAME`, `ADMIN_LAST_NAME`, `ADMIN_PHONE` and `ADMIN_ROLE` instead of typing the prompts.

## Database

The schema lives in [`database.sql`](database.sql) and sample data in [`database/seed.sql`](database/seed.sql). Both are executed by [`scripts/init-db.mjs`](scripts/init-db.mjs).

Tables include users, sessions, addresses, categories, brands, products, product images/attributes, coupons, reviews, wishlist, orders, order items, newsletter subscribers, contact messages, shipping zones and blog posts. The admin dashboard adds four additive tables:

- `media` — uploaded product images, optimized to WebP and stored as BLOBs so they persist with the database
- `login_attempts` — persistent admin login rate limiting
- `admin_audit_log` — an audit trail of admin product and media changes
- `products.deleted_at` — soft-delete marker so deleting a product never breaks existing order history

Apply admin migrations with `npm run db:migrate`. The same migrations run automatically every time the app opens an existing database, and they are idempotent. `db:migrate` never drops tables or resets data.

Prices are stored as **integer PKR**. The app uses Node's built-in `node:sqlite` driver through [`src/lib/db.ts`](src/lib/db.ts), so there is no native dependency to compile.

## Project structure

```
src/
  app/                 App Router pages and API routes
    account/           Dashboard, login, register, order detail
    admin/             Protected admin dashboard (login + dashboard shell)
    api/               Auth, orders, coupons, reviews, contact, newsletter, admin APIs
    blog/              Buying guides
    cart/ checkout/    Cart and checkout
    category/ product/ Catalog and product detail
    ...                Policy and content pages
  components/          UI, product, cart, checkout, account, orders, admin
  context/             Cart and wishlist providers
  lib/                 DB, auth, admin auth/data, orders, coupons, products, formatting
  types/               Shared TypeScript types
database.sql           SQLite schema
database/migrations.sql Additive admin migrations
database/seed.sql      Seed data
scripts/init-db.mjs    Database bootstrap script
scripts/migrate.mjs    Apply admin migrations to an existing database
scripts/create-admin.mjs Create an administrator securely
data/rubys.db          Generated SQLite database (not committed)
```

## Authentication

Authentication is custom and cookie-based:

- Passwords are hashed with `scrypt` and a per-user salt.
- Sessions are stored in the `sessions` table and referenced by an HTTP-only cookie (`rubys_session`).
- Sessions last 30 days and are cleared on sign-out.
- The `users.role` column controls access: `customer`, `admin` or `manager`.

This avoids an external auth provider while keeping passwords and sessions server-side.

## Admin dashboard

The admin area lives at `/admin` and is deliberately separate from the customer account pages.

- **Bootstrap:** run `npm run admin:create`. No admin is seeded and there is no default password. The script validates a strong password and stores only the scrypt hash.
- **Login:** `/admin/login` accepts only users with the `admin` or `manager` role. Customer sessions are rejected even if they navigate directly to an admin URL.
- **Server-side protection:** the protected `/admin/(dashboard)` layout calls `requireAdminPage()`. Every `/api/admin/*` route also verifies the session, the role and the request origin.
- **Rate limiting:** failed logins are recorded in `login_attempts`; after 5 failures for the same email/IP or 20 for an IP within 15 minutes, sign-in is blocked.
- **Audit trail:** product creates, updates, deletes, restores and media uploads are recorded in `admin_audit_log`.
- **Images:** uploads are converted to WebP with `sharp` and stored in the `media` table, then served from `/api/media/:id` with long-lived immutable caching. Nothing needs to be written to `public/uploads`, so images survive redeployments.
- **Product deletion:** products are soft-deleted with `products.deleted_at`; archived products can be restored from `/admin/products?archived=1`.
- **SEO:** admin pages send `noindex, nofollow`, `X-Robots-Tag` and `Cache-Control: no-store`, and `/admin` is disallowed in `robots.txt`.

To create another admin or reset an existing admin password:

```bash
npm run admin:create -- --email you@example.com --first-name Ruby --last-name Admin --phone 03001234567
# or update an existing account
npm run admin:create -- --update --email you@example.com
```

## Payments & delivery

The checkout supports **Cash on Delivery**, **bank transfer**, **JazzCash** and **Easypaisa**. Digital payments are recorded as pending; the team shares payment details and confirms the order manually. Shipping is calculated from the province:

| Province | Rate | Free over | Estimate |
| --- | --- | --- | --- |
| Khyber Pakhtunkhwa | Rs. 150 | Rs. 2,000 | 2–3 days |
| Punjab | Rs. 200 | Rs. 2,500 | 3–4 days |
| Sindh | Rs. 200 | Rs. 2,500 | 3–4 days |
| Balochistan | Rs. 300 | Rs. 3,000 | 4–5 days |
| Gilgit-Baltistan | Rs. 350 | Rs. 3,500 | 5–7 days |
| Azad Jammu & Kashmir | Rs. 350 | Rs. 3,500 | 5–7 days |

## Hostinger deployment

Hostinger's Node.js hosting runs the app with a persistent filesystem, so the SQLite database and uploaded media can live outside the release folder and survive redeployments.

1. **Create the Node.js app** in hPanel with Node.js 22.13 or newer, then point the application root at the project folder and the startup file at the Next.js server.
2. **Install and build** from the application root:

   ```bash
   npm ci
   npm run db:migrate
   npm run build
   ```

3. **Set environment variables** in hPanel (do not commit `.env.local`):

   ```env
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   DATABASE_PATH=/home/USERNAME/rubys-data/rubys.db
   ```

   Use an absolute `DATABASE_PATH` outside the deploy directory (for example `~/rubys-data/rubys.db`). The parent directory is created automatically and SQLite writes its `-wal`/`-shm` files next to it. Uploaded images are stored in the same database, so nothing else needs a writable public folder.

4. **Create the first administrator** on the server. The database must already exist (run `npm run db:migrate`, or `npm run db:init` for a fresh store):

   ```bash
   npm run admin:create
   ```

   On a non-interactive shell, set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_FIRST_NAME`, `ADMIN_LAST_NAME`, `ADMIN_PHONE` and optionally `ADMIN_ROLE`, then run the same command. Delete those temporary variables afterwards.

5. **Start the app** with the Node.js app's start command (typically `npm run start`). Hostinger terminates TLS and proxies requests, so the app sets `secure` cookies automatically when `NODE_ENV=production`.

6. **Verify**:
   - `https://your-domain.com/` — storefront loads with the existing 26 products
   - `https://your-domain.com/admin/login` — admin sign-in works
   - a customer account cannot open `/admin`
   - upload a product image and confirm it still loads after a redeploy
   - `https://your-domain.com/robots.txt` disallows `/admin`

### Database safety

- Never run `npm run db:reset` on the production database.
- `npm run db:migrate` is additive and idempotent; it does not drop or reset data.
- Back up `rubys.db` plus any `rubys.db-wal` and `rubys.db-shm` files before changes. The simplest safe backup is to stop the app, copy all three files, then start it again.
- Keep the database on the persistent Hostinger volume, not inside the folder that is replaced on every deployment.

## Production notes

- Set `NEXT_PUBLIC_SITE_URL` to the live domain.
- Keep `data/rubys.db` on a persistent volume or move to a managed database if you deploy to a stateless host.
- Back up the database file (and its `-wal`/`-shm` files) regularly.
- Review the policy pages and contact details before going live.
- Replace the demo account and seed content with your real catalog.
- Add real payment gateway and transactional email integrations when you are ready to accept online payments.

## License

Private project for Ruby's.pk. All rights reserved.
