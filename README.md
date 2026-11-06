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
| `npm run db:reset` | Delete and rebuild the database from scratch |

> `db:reset` removes `data/rubys.db` and recreates it. Use it only when you are happy to lose local data.

## Environment variables

Copy `.env.example` to `.env.local` and adjust as needed:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_PATH=./data/rubys.db
```

- `DATABASE_PATH` — location of the SQLite file. Relative paths resolve from the project root. The default is `./data/rubys.db`.
- `NEXT_PUBLIC_SITE_URL` — used for canonical URLs, sitemap and structured data. Set this to your live domain in production.

## Database

The schema lives in [`database.sql`](database.sql) and sample data in [`database/seed.sql`](database/seed.sql). Both are executed by [`scripts/init-db.mjs`](scripts/init-db.mjs).

Tables include users, sessions, addresses, categories, brands, products, product images/attributes, coupons, reviews, wishlist, orders, order items, newsletter subscribers, contact messages, shipping zones and blog posts.

Prices are stored as **integer PKR**. The app uses Node's built-in `node:sqlite` driver through [`src/lib/db.ts`](src/lib/db.ts), so there is no native dependency to compile.

## Project structure

```
src/
  app/                 App Router pages and API routes
    account/           Dashboard, login, register, order detail
    api/               Auth, orders, coupons, reviews, contact, newsletter
    blog/              Buying guides
    cart/ checkout/    Cart and checkout
    category/ product/ Catalog and product detail
    ...                Policy and content pages
  components/          UI, product, cart, checkout, account, orders
  context/             Cart and wishlist providers
  lib/                 DB, auth, orders, coupons, products, formatting
  types/               Shared TypeScript types
database.sql           SQLite schema
database/seed.sql      Seed data
scripts/init-db.mjs    Database bootstrap script
data/rubys.db          Generated SQLite database (not committed)
```

## Authentication

Authentication is custom and cookie-based:

- Passwords are hashed with `scrypt` and a per-user salt.
- Sessions are stored in the `sessions` table and referenced by an HTTP-only cookie (`rubys_session`).
- Sessions last 30 days and are cleared on sign-out.

This avoids an external auth provider while keeping passwords and sessions server-side.

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

## Production notes

- Set `NEXT_PUBLIC_SITE_URL` to the live domain.
- Keep `data/rubys.db` on a persistent volume or move to a managed database if you deploy to a stateless host.
- Back up the database file (and its `-wal`/`-shm` files) regularly.
- Review the policy pages and contact details before going live.
- Replace the demo account and seed content with your real catalog.
- Add real payment gateway and transactional email integrations when you are ready to accept online payments.

## License

Private project for Ruby's.pk. All rights reserved.
