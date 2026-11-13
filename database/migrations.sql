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

-- ============================================================
-- Women's Boutique Transformation: 6 Curated Departments
-- ============================================================

INSERT OR REPLACE INTO categories (id, name, slug, description, emoji, banner_text, is_active, sort_order, meta_title, meta_description) VALUES
('cat-clothing-fashion', 'Clothing & Fashion', 'clothing-fashion', 'Pret, luxury lawn, festive wear, kurtis, dresses, abayas & modest fashion for her.', '👗', 'Wear it with grace & confidence', 1, 1, 'Women''s Clothing & Fashion Online in Pakistan', 'Shop ladies dresses, lawn suits, pret wear and abayas with nationwide COD from Ruby''s.pk.'),
('cat-beauty-skincare', 'Beauty & Skincare', 'beauty-skincare', 'Glow serums, hydrating creams, natural oils, luxury makeup & signature fragrances.', '💄', 'Radiate confidence & timeless glow', 1, 2, 'Women''s Beauty & Skincare Products Online', 'Discover premium skincare, serums, lipsticks and halal fragrances at Ruby''s.pk.'),
('cat-bags-accessories', 'Bags & Accessories', 'bags-accessories', 'Designer handbags, crossbody bags, evening clutches, silk scarves & belts.', '👜', 'Sophistication in every detail', 1, 3, 'Women''s Handbags & Accessories in Pakistan', 'Explore luxury totes, crossbody bags, clutches and silk scarves with fast delivery across Pakistan.'),
('cat-jewellery-watches', 'Jewellery & Watches', 'jewellery-watches', 'Rose gold mesh watches, pearl necklaces, zircon studs, bridal sets & bangles.', '✨', 'Sparkle for every special moment', 1, 4, 'Women''s Jewellery & Watches in Pakistan', 'Shop exquisite watches, necklaces, earrings and jewellery pieces with cash on delivery.'),
('cat-shoes-footwear', 'Shoes & Footwear', 'shoes-footwear', 'Handcrafted khussas, comfortable block heels, elegant sandals & everyday flats.', '👠', 'Step out in comfort & elegance', 1, 5, 'Women''s Shoes & Footwear Online', 'Find handcrafted khussas, heels, mules and flats crafted for all-day comfort.'),
('cat-lifestyle-personal', 'Lifestyle & Personal Care', 'lifestyle-personal-care', 'Aroma diffusers, sleep mists, silk pillowcases, jade rollers & wellness kits.', '🌸', 'Curated self-care & mindful living', 1, 6, 'Women''s Lifestyle & Personal Care in Pakistan', 'Indulge in gentle self-care, sleep mists, aromatherapy and wellness essentials.');

-- Deactivate old generic categories
UPDATE categories SET is_active = 0 WHERE id IN ('cat-electronics', 'cat-home-living', 'cat-sports-fitness', 'cat-books-stationery', 'cat-fashion', 'cat-beauty-health');

-- Reassign suitable existing products to the new categories
UPDATE products SET category_id = 'cat-clothing-fashion' WHERE id IN ('p-01', 'p-02', 'p-05');
UPDATE products SET category_id = 'cat-beauty-skincare' WHERE id IN ('p-15', 'p-16', 'p-17', 'p-18');
UPDATE products SET category_id = 'cat-lifestyle-personal' WHERE id IN ('p-19', 'p-23', 'p-24');

-- Soft-deactivate non-women products
UPDATE products SET is_active = 0, deleted_at = datetime('now') WHERE id IN ('p-03', 'p-04', 'p-06', 'p-07', 'p-08', 'p-09', 'p-10', 'p-11', 'p-12', 'p-13', 'p-14', 'p-20', 'p-21', 'p-22', 'p-25', 'p-26');

-- Insert new women-focused products
INSERT OR IGNORE INTO products (id, name, slug, sku, description, short_description, price, sale_price, cost_price, category_id, brand, stock_quantity, is_featured, is_active, emoji, badge, rating, review_count, sold_count, meta_title, meta_description, created_at) VALUES
('p-w-01', 'Embroidered Lawn 3-Piece Stitched Suit', 'embroidered-lawn-3-piece-stitched-suit', 'RB-W-CLO-01',
 'Luxurious 3-piece stitched lawn suit featuring delicate thread embroidery on neckline and daman, digital printed pure chiffon dupatta, and dyed cambric trousers. Breathable, lightweight and effortlessly graceful for summer and festive occasions.',
 'Stitched 3-piece embroidered lawn suit with chiffon dupatta.', 6499, 4999, 3100, 'cat-clothing-fashion', 'Ruby''s Select', 28, 1, 1, '👗', 'Best Seller', 4.9, 142, 530,
 'Embroidered Lawn 3-Piece Stitched Suit | Ruby''s.pk', 'Shop 3-piece stitched embroidered lawn suit with chiffon dupatta and COD in Pakistan.',
 datetime('now', '-25 days')),

('p-w-02', 'Floral Chiffon Tiered Maxi Dress', 'floral-chiffon-tiered-maxi-dress', 'RB-W-CLO-02',
 'An ethereal tiered maxi dress crafted from airy floral-printed georgette chiffon with full inner lining, smocked balloon sleeves, and an adjustable waist belt. Ideal for lunches, vacations, and evening dinners.',
 'Airy tiered chiffon maxi dress with smocked balloon sleeves.', 4799, 3899, 2300, 'cat-clothing-fashion', 'Ruby''s Select', 20, 1, 1, '🌸', 'Trending', 4.8, 86, 290,
 'Floral Chiffon Tiered Maxi Dress | Ruby''s.pk', 'Flowy floral chiffon tiered maxi dress with full inner lining and waist belt.',
 datetime('now', '-18 days')),

('p-w-03', 'Embroidered Kashmiri Kurti & Shawl Set', 'embroidered-kashmiri-kurti-shawl-set', 'RB-W-CLO-03',
 'Intricately embroidered viscose-cotton kurti with traditional Kashmiri tilla motifs paired with a matching lightweight woven shawl. Soft against the skin and culturally rich.',
 'Traditional Kashmiri tilla embroidered kurti with woven shawl.', 5999, 4599, 2800, 'cat-clothing-fashion', 'Khyber Craft', 16, 0, 1, '🥻', 'Handcrafted', 4.7, 52, 175,
 'Embroidered Kashmiri Kurti & Shawl Set | Ruby''s.pk', 'Handcrafted Kashmiri embroidered kurti set with matching woven shawl.',
 datetime('now', '-14 days')),

('p-w-04', 'Luxury Dubai Silk Abaya with Belt', 'luxury-dubai-silk-abaya-with-belt', 'RB-W-CLO-04',
 'Flawlessly tailored front-open Dubai Nida silk abaya with matching Sheila (hijab). Minimalist elegance, modest cut, wrinkle-resistant and includes a detachable waist tie.',
 'Front-open Dubai Nida silk abaya with matching Sheila hijab.', 6999, 5499, 3400, 'cat-clothing-fashion', 'Ruby''s Select', 19, 1, 1, '✨', 'Premium', 4.9, 74, 210,
 'Luxury Dubai Silk Abaya with Belt | Ruby''s.pk', 'Premium Dubai Nida silk front-open abaya with matching hijab.',
 datetime('now', '-10 days')),

('p-w-05', '24K Gold & Saffron Radiance Facial Oil', '24k-gold-saffron-radiance-facial-oil', 'RB-W-BEA-01',
 'Enriched with pure 24K gold flakes, pure Kashmiri saffron, rosehip oil, and vitamin E. Fast-absorbing, non-comedogenic elixir that imparts an instant luminous glow, deeply nourishes, and primes skin before makeup.',
 'Pure 24K gold flakes and Kashmiri saffron glow oil.', 2899, 2299, 1200, 'cat-beauty-skincare', 'Lumina', 45, 1, 1, '✨', 'Best Seller', 4.9, 168, 640,
 '24K Gold & Saffron Radiance Facial Oil | Ruby''s.pk', 'Pure 24K gold and Kashmiri saffron facial oil for an instant luminous glow.',
 datetime('now', '-40 days')),

('p-w-06', 'Rose Water & Niacinamide Hydrating Glow Mist', 'rose-water-niacinamide-glow-mist', 'RB-W-BEA-02',
 'Steam-distilled pure organic Damask rose water infused with 5% niacinamide and hyaluronic acid. Tones pores, restores skin pH balance, and refreshes tired makeup with a dewy, non-sticky finish.',
 'Pure Damask rose water with 5% niacinamide and hyaluronic acid.', 1499, 1199, 620, 'cat-beauty-skincare', 'Lumina', 60, 0, 1, '🌹', 'Must Have', 4.8, 112, 450,
 'Rose Water & Niacinamide Hydrating Glow Mist | Ruby''s.pk', 'Organic rose water mist with 5% niacinamide for dewy hydration and pore tightening.',
 datetime('now', '-32 days')),

('p-w-07', 'Velvet Lip Tint & Cheek Stain Duo', 'velvet-lip-tint-cheek-stain-duo', 'RB-W-BEA-03',
 'A featherlight, water-based lip and cheek tint in natural cherry and berry hues. Blends effortlessly for a soft, natural flushed look that stays put up to 12 hours without drying or smudging.',
 'Long-wear water tint for lips and cheeks in natural berry.', 1399, 999, 490, 'cat-beauty-skincare', 'Lumina', 55, 0, 1, '💄', 'Viral Pick', 4.7, 95, 380,
 'Velvet Lip Tint & Cheek Stain Duo | Ruby''s.pk', 'Weightless 12-hour lip and cheek stain with natural healthy flush.',
 datetime('now', '-21 days')),

('p-w-08', 'Quilted Crossbody Bag with Gold Chain', 'quilted-crossbody-bag-gold-chain', 'RB-W-BAG-01',
 'Timeless diamond-quilted vegan leather crossbody bag with a polished gold-tone turn-lock closure and versatile chain strap. Sized to fit phone, wallet, cosmetics and keys with secure interior compartments.',
 'Diamond-quilted crossbody bag with polished gold-tone chain.', 3999, 2999, 1650, 'cat-bags-accessories', 'Ruby''s Select', 34, 1, 1, '👜', 'Best Seller', 4.8, 134, 490,
 'Quilted Crossbody Bag with Gold Chain | Ruby''s.pk', 'Classic quilted crossbody bag with gold chain strap and turn-lock closure.',
 datetime('now', '-35 days')),

('p-w-09', 'Structured Everyday Leather Tote', 'structured-everyday-leather-tote', 'RB-W-BAG-02',
 'Generously proportioned tote bag crafted from scratch-resistant saffiano-textured leather. Fits a 13-inch laptop, planner, and daily essentials with double reinforced handles and zip-top closure.',
 'Spacious saffiano-textured tote fitting a 13-inch laptop.', 5499, 4299, 2500, 'cat-bags-accessories', 'Ruby''s Select', 22, 1, 1, '🛍️', 'Work & Travel', 4.7, 78, 260,
 'Structured Everyday Leather Tote | Ruby''s.pk', 'Spacious saffiano leather tote bag for work, university and everyday carry.',
 datetime('now', '-28 days')),

('p-w-10', 'Pearl & Crystal Embellished Evening Clutch', 'pearl-crystal-evening-clutch', 'RB-W-BAG-03',
 'Dazzling handcrafted clutch adorned with faux pearls and sparkling crystals. Includes a detachable metallic chain for shoulder carry. Perfect for weddings, formal dinners, and festive celebrations.',
 'Handcrafted faux pearl and crystal evening clutch with chain.', 3699, 2899, 1600, 'cat-bags-accessories', 'Khyber Craft', 18, 0, 1, '👛', 'Party Wear', 4.9, 63, 190,
 'Pearl & Crystal Embellished Evening Clutch | Ruby''s.pk', 'Handmade bridal and evening clutch adorned with pearls and crystals.',
 datetime('now', '-16 days')),

('p-w-11', 'Pure Silk Printed Scarf & Scrunchie Set', 'pure-silk-printed-scarf-scrunchie-set', 'RB-W-BAG-04',
 '100% pure silk square neck scarf (70x70cm) featuring classic vintage botanical artwork, paired with two anti-breakage silk hair scrunchies. Luxurious, gentle on hair and versatile as neckwear or bag accessory.',
 'Pure silk 70x70cm botanical scarf with two silk scrunchies.', 1899, 1499, 780, 'cat-bags-accessories', 'Ruby''s Select', 40, 0, 1, '🎀', 'Gift Pick', 4.8, 49, 165,
 'Pure Silk Printed Scarf & Scrunchie Set | Ruby''s.pk', '100% pure silk printed neck scarf with two hair-protecting scrunchies.',
 datetime('now', '-12 days')),

('p-w-12', 'Rose Gold Minimalist Mesh Watch', 'rose-gold-minimalist-mesh-watch', 'RB-W-JEW-01',
 'Ultra-slim 32mm stainless steel case with a sunray dial, hardened mineral crystal, and an easily adjustable magnetic mesh strap. Powered by high-precision Japanese quartz movement.',
 'Ultra-slim 32mm watch with rose gold magnetic mesh strap.', 4999, 3999, 2200, 'cat-jewellery-watches', 'Ruby''s Select', 25, 1, 1, '⌚', 'Best Seller', 4.9, 118, 380,
 'Rose Gold Minimalist Mesh Watch | Ruby''s.pk', 'Ultra-slim 32mm women''s watch with magnetic rose gold mesh strap.',
 datetime('now', '-48 days')),

('p-w-13', 'Freshwater Pearl Pendant & Chain', 'freshwater-pearl-pendant-chain', 'RB-W-JEW-02',
 'Lustrous genuine button freshwater pearl cradled on an 18K gold-plated sterling silver delicate box chain (45cm + 5cm extender). Hypoallergenic, tarnish-resistant and gracefully subtle.',
 'Genuine freshwater pearl on 18K gold-plated sterling chain.', 2499, 1899, 980, 'cat-jewellery-watches', 'Ruby''s Select', 32, 1, 1, '📿', 'Classic', 4.8, 71, 240,
 'Freshwater Pearl Pendant & Chain | Ruby''s.pk', 'Natural freshwater pearl pendant necklace on 18K gold vermeil chain.',
 datetime('now', '-30 days')),

('p-w-14', 'Zirconia Solitaire Huggie Earrings', 'zirconia-solitaire-huggie-earrings', 'RB-W-JEW-03',
 'Sparkling AAA-grade Austrian cubic zirconia stones set in 18K gold vermeil huggie hoops with secure click-lock backs. Safe for sensitive ears and designed for comfortable daily wear.',
 'AAA cubic zirconia huggie earrings in 18K gold vermeil.', 1999, 1499, 750, 'cat-jewellery-watches', 'Ruby''s Select', 38, 0, 1, '💎', 'Daily Wear', 4.7, 58, 210,
 'Zirconia Solitaire Huggie Earrings | Ruby''s.pk', 'Sparkling hypoallergenic cubic zirconia huggie hoops in 18K gold vermeil.',
 datetime('now', '-22 days')),

('p-w-15', 'Traditional Kundan Meenakari Bangle Pair', 'traditional-kundan-meenakari-bangle-pair', 'RB-W-JEW-04',
 'Exquisitely handcrafted brass bangles decorated with uncut Kundan stones, fine ruby enamel (meenakari) work, and tiny faux pearl borders. Finished in antique gold polish.',
 'Pair of handcrafted Kundan and ruby meenakari bangles.', 3499, 2699, 1500, 'cat-jewellery-watches', 'Khyber Craft', 15, 0, 1, '💍', 'Festive', 4.9, 44, 130,
 'Traditional Kundan Meenakari Bangle Pair | Ruby''s.pk', 'Handmade bridal Kundan and ruby enamel bangles with antique gold finish.',
 datetime('now', '-15 days')),

('p-w-16', 'Handcrafted Tilla Embroidered Khussa', 'handcrafted-tilla-embroidered-khussa', 'RB-W-SHO-01',
 'Authentic handmade genuine leather khussa intricately embroidered with gold tilla thread and micro-pearls. Features double-cushioned insole so your feet never ache even after hours of wear.',
 'Genuine leather khussa with gold tilla embroidery and double padding.', 3499, 2799, 1500, 'cat-shoes-footwear', 'Khyber Craft', 26, 1, 1, '👡', 'Artisan Made', 4.9, 105, 360,
 'Handcrafted Tilla Embroidered Khussa | Ruby''s.pk', 'Authentic handmade leather khussa with gold tilla embroidery and cushioned insole.',
 datetime('now', '-38 days')),

('p-w-17', 'Block Heel Strappy Evening Sandals', 'block-heel-strappy-evening-sandals', 'RB-W-SHO-02',
 '2.5-inch sturdy block heels with delicate asymmetrical straps and an adjustable ankle buckle. Padded memory foam footbed provides all-night comfort at weddings and formal dinners.',
 '2.5-inch block heel sandals with cushioned footbed.', 4299, 3399, 1900, 'cat-shoes-footwear', 'Ruby''s Select', 21, 1, 1, '👠', 'Trending', 4.8, 67, 220,
 'Block Heel Strappy Evening Sandals | Ruby''s.pk', 'Comfortable 2.5-inch block heel sandals with padded memory foam sole.',
 datetime('now', '-26 days')),

('p-w-18', 'Cushioned Pointed-Toe Leather Mules', 'cushioned-pointed-toe-leather-mules', 'RB-W-SHO-03',
 'Slip-on mules with a sleek pointed silhouette in buttery-soft faux leather. Features an arch-supporting padded sole and non-skid rubber outsole for effortless everyday style.',
 'Sleek pointed-toe slip-on mules with cushioned insole.', 3799, 2999, 1600, 'cat-shoes-footwear', 'Ruby''s Select', 24, 0, 1, '🩰', 'Everyday Chic', 4.7, 52, 175,
 'Cushioned Pointed-Toe Leather Mules | Ruby''s.pk', 'Soft pointed-toe leather mules with arch support and non-slip sole.',
 datetime('now', '-19 days')),

('p-w-19', 'Mulberry Silk Pillowcase & Eye Mask Set', 'mulberry-silk-pillowcase-eye-mask-set', 'RB-W-LIF-01',
 '100% grade-6A 22-momme pure mulberry silk pillowcase (standard size) with a matching contoured silk sleep mask. Prevents morning sleep wrinkles, reduces hair frizz, and preserves skin moisture.',
 'Grade-6A pure mulberry silk pillowcase with contoured sleep mask.', 3299, 2599, 1400, 'cat-lifestyle-personal', 'Ruby''s Select', 30, 1, 1, '🛌', 'Beauty Sleep', 4.9, 126, 410,
 'Mulberry Silk Pillowcase & Eye Mask Set | Ruby''s.pk', '100% pure mulberry silk pillowcase and eye mask for hair and skin wellness.',
 datetime('now', '-42 days')),

('p-w-20', 'Rose Quartz Facial Roller & Gua Sha Kit', 'rose-quartz-facial-roller-gua-sha-kit', 'RB-W-LIF-02',
 'Carved from 100% natural Brazilian rose quartz crystal. Relieves facial tension, reduces under-eye puffiness, stimulates lymphatic drainage, and boosts skincare absorption.',
 'Natural Brazilian rose quartz face roller and contoured gua sha.', 2199, 1699, 890, 'cat-lifestyle-personal', 'Lumina', 42, 1, 1, '🌸', 'Self-Care', 4.8, 98, 340,
 'Rose Quartz Facial Roller & Gua Sha Kit | Ruby''s.pk', 'Natural rose quartz facial roller and gua sha stone for sculpting and lymphatic massage.',
 datetime('now', '-34 days')),

('p-w-21', 'Jasmine & French Vanilla Soy Scented Candle', 'jasmine-vanilla-soy-scented-candle', 'RB-W-LIF-03',
 'Hand-poured 220g natural soy wax candle in an amber glass jar with a crackling wooden wick. Infused with pure essential oils of Motia (Jasmine) and warm Tahitian vanilla for 45+ hours of clean burn.',
 'Natural soy wax candle with Motia jasmine, vanilla and wooden wick.', 1899, 1499, 780, 'cat-lifestyle-personal', 'Ruby''s Select', 35, 0, 1, '🕯️', 'Aromatherapy', 4.8, 64, 215,
 'Jasmine & French Vanilla Soy Scented Candle | Ruby''s.pk', 'Hand-poured Motia jasmine and French vanilla soy wax aromatherapy candle.',
 datetime('now', '-24 days')),

('p-w-22', 'Lavender & Chamomile Sleep Mist (100ml)', 'lavender-chamomile-sleep-mist', 'RB-W-LIF-04',
 'A soothing pillow and room mist formulated with French lavender, Roman chamomile, and bergamot floral water. Spritz over pillows and bedsheets 5 minutes before bed for deep, restorative sleep.',
 'Calming lavender, chamomile and bergamot pillow mist, 100ml.', 1299, 999, 480, 'cat-lifestyle-personal', 'Ruby''s Select', 48, 0, 1, '🌙', 'Calming', 4.7, 53, 190,
 'Lavender & Chamomile Sleep Mist | Ruby''s.pk', 'Organic French lavender and Roman chamomile aromatherapy sleep mist.',
 datetime('now', '-17 days'));

