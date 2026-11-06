-- ============================================================
-- Ruby's.pk — sample data
-- Loaded automatically by `npm run db:init`.
-- ============================================================

-- Categories -------------------------------------------------
INSERT OR IGNORE INTO categories (id, name, slug, description, emoji, banner_text, sort_order, meta_title, meta_description) VALUES
('cat-fashion', 'Fashion & Clothing', 'fashion-clothing', 'Everyday essentials and statement pieces for the whole family.', '👗', 'Wear it your way', 1, 'Fashion & Clothing Online in Pakistan', 'Shop premium clothing, shoes and accessories with nationwide delivery from Ruby''s.pk.'),
('cat-electronics', 'Electronics', 'electronics', 'Smart gadgets, audio and accessories that make life easier.', '🎧', 'Tech that keeps up', 2, 'Electronics & Gadgets Online in Pakistan', 'Discover earbuds, smart watches, speakers and more at the best prices in Pakistan.'),
('cat-home-living', 'Home & Living', 'home-living', 'Beautiful, practical pieces to make your house feel like home.', '🏠', 'Make home feel special', 3, 'Home & Living Products in Pakistan', 'Shop home decor, kitchen and living essentials with fast delivery across Pakistan.'),
('cat-beauty-health', 'Beauty & Health', 'beauty-health', 'Skin, hair and wellness favourites from trusted brands.', '💄', 'Glow every day', 4, 'Beauty & Health Products Online', 'Shop skincare, makeup and wellness essentials at Ruby''s.pk.'),
('cat-sports-fitness', 'Sports & Fitness', 'sports-fitness', 'Gear for training, playing and staying active.', '⚽', 'Move better, every day', 5, 'Sports & Fitness Gear in Pakistan', 'Find fitness equipment and sports gear with cash on delivery across Pakistan.'),
('cat-books-stationery', 'Books & Stationery', 'books-stationery', 'Good reads, journals and desk essentials.', '📚', 'Stories worth keeping', 6, 'Books & Stationery Online in Pakistan', 'Browse books, journals and stationery at Ruby''s.pk with nationwide delivery.');

-- Brands -----------------------------------------------------
INSERT OR IGNORE INTO brands (id, name, slug, description) VALUES
('brand-rubys', 'Ruby''s Select', 'rubys-select', 'Our own carefully curated range of everyday premium essentials.'),
('brand-northstar', 'NorthStar', 'northstar', 'Practical technology and accessories for modern life.'),
('brand-khyber', 'Khyber Craft', 'khyber-craft', 'Locally inspired home and lifestyle pieces made by artisans.'),
('brand-lumina', 'Lumina', 'lumina', 'Skincare and wellness made for Pakistani skin and weather.'),
('brand-athlete', 'Athlete Republic', 'athlete-republic', 'Performance gear designed for everyday training.');

-- Products ---------------------------------------------------
INSERT OR IGNORE INTO products (id, name, slug, sku, description, short_description, price, sale_price, cost_price, category_id, brand, stock_quantity, is_featured, is_active, emoji, badge, rating, review_count, sold_count, meta_title, meta_description, created_at) VALUES
('p-01', 'Classic Cotton Crew T-Shirt', 'classic-cotton-crew-tshirt', 'RB-FSH-001',
 'A wardrobe staple cut from 100% combed cotton. The breathable mid-weight jersey keeps its shape wash after wash, while the clean crew neckline works with everything from jeans to chinos. Available in a relaxed unisex fit.',
 'Soft 100% combed cotton tee with a relaxed everyday fit.', 1499, 1199, 720, 'cat-fashion', 'Ruby''s Select', 42, 1, 1, '👕', 'Best Seller', 4.8, 126, 480,
 'Classic Cotton Crew T-Shirt | Ruby''s.pk', 'Shop the soft, breathable Classic Cotton Crew T-Shirt at Ruby''s.pk. Cash on delivery across Pakistan.',
 datetime('now', '-62 days')),
('p-02', 'Slim Fit Denim Jacket', 'slim-fit-denim-jacket', 'RB-FSH-002',
 'A timeless denim jacket in a deep indigo wash. Made with a touch of stretch for comfort, it features antique-finish metal buttons, twin chest pockets and a tailored slim fit that layers easily over tees and hoodies.',
 'Stretch denim jacket with a flattering slim fit.', 4999, 3999, 2450, 'cat-fashion', 'Ruby''s Select', 18, 1, 1, '🧥', 'Save 20%', 4.7, 64, 210,
 'Slim Fit Denim Jacket | Ruby''s.pk', 'A timeless slim fit denim jacket with stretch comfort. Order online with COD in Pakistan.',
 datetime('now', '-45 days')),
('p-03', 'Premium Leather Sneakers', 'premium-leather-sneakers', 'RB-FSH-003',
 'Minimal low-top sneakers crafted from supple full-grain leather. A cushioned memory-foam insole and durable rubber outsole keep you comfortable from morning commutes to weekend plans. Clean them with a soft damp cloth.',
 'Minimal full-grain leather sneakers with all-day cushioning.', 6499, NULL, 3300, 'cat-fashion', 'Ruby''s Select', 26, 0, 1, '👟', NULL, 4.6, 38, 150,
 'Premium Leather Sneakers | Ruby''s.pk', 'Shop minimal premium leather sneakers with cushioned comfort and nationwide delivery.',
 datetime('now', '-30 days')),
('p-04', 'Signature Analog Watch', 'signature-analog-watch', 'RB-FSH-004',
 'A refined everyday watch with a brushed stainless-steel case, sapphire-coated mineral glass and a genuine leather strap. Japanese quartz movement keeps accurate time, and 3 ATM water resistance handles daily splashes.',
 'Japanese quartz movement, leather strap and 3 ATM resistance.', 8999, 7499, 4600, 'cat-fashion', 'Ruby''s Select', 12, 1, 1, '⌚', 'Limited', 4.9, 47, 96,
 'Signature Analog Watch | Ruby''s.pk', 'A refined analog watch with Japanese quartz movement and genuine leather strap.',
 datetime('now', '-20 days')),
('p-05', 'Elegant Summer Dress', 'elegant-summer-dress', 'RB-FSH-005',
 'A flowy midi dress in a breathable cotton-linen blend. The softly gathered waist and adjustable straps make it an easy choice for warm days, Eid gatherings and casual dinners. Fully lined for comfort.',
 'Breathable cotton-linen midi dress with adjustable straps.', 4299, 3499, 2100, 'cat-fashion', 'Ruby''s Select', 20, 0, 1, '👗', 'New', 4.5, 22, 70,
 'Elegant Summer Dress | Ruby''s.pk', 'Shop a breathable cotton-linen summer dress with a flattering midi cut.',
 datetime('now', '-12 days')),

('p-06', 'Wireless Noise-Cancelling Earbuds', 'wireless-noise-cancelling-earbuds', 'RB-ELC-001',
 'Immersive sound with hybrid active noise cancellation, 30-hour total battery life and a pocket-sized charging case. Bluetooth 5.3 delivers a stable connection, while IPX5 sweat resistance makes them ideal for commutes and workouts.',
 'Hybrid ANC, 30-hour battery and IPX5 sweat resistance.', 5999, 4499, 2650, 'cat-electronics', 'NorthStar', 35, 1, 1, '🎧', 'Best Seller', 4.8, 214, 760,
 'Wireless Noise-Cancelling Earbuds | Ruby''s.pk', 'Shop wireless ANC earbuds with 30-hour battery life and fast delivery in Pakistan.',
 datetime('now', '-80 days')),
('p-07', 'Smart Fitness Watch', 'smart-fitness-watch', 'RB-ELC-002',
 'Track heart rate, SpO2, sleep and 100+ workout modes on a bright 1.85-inch AMOLED display. Get call and message notifications, control music and enjoy up to 10 days of battery life on a single charge. IP68 water resistant.',
 '1.85-inch AMOLED fitness watch with 10-day battery life.', 12999, 9999, 6200, 'cat-electronics', 'NorthStar', 22, 1, 1, '⌚', 'Save 23%', 4.7, 156, 520,
 'Smart Fitness Watch | Ruby''s.pk', 'Shop a smart fitness watch with AMOLED display, health tracking and 10-day battery.',
 datetime('now', '-58 days')),
('p-08', 'Portable Bluetooth Speaker', 'portable-bluetooth-speaker', 'RB-ELC-003',
 'Big, room-filling sound in a rugged travel-friendly body. Dual passive radiators add depth, the 12-hour battery keeps the music going and IPX6 protection shrugs off rain and poolside splashes. Pair two speakers for stereo sound.',
 'Rugged IPX6 speaker with rich sound and 12-hour battery.', 4599, 3799, 2200, 'cat-electronics', 'NorthStar', 31, 0, 1, '🔊', NULL, 4.6, 88, 300,
 'Portable Bluetooth Speaker | Ruby''s.pk', 'Shop a portable Bluetooth speaker with IPX6 water resistance and 12-hour battery.',
 datetime('now', '-40 days')),
('p-09', 'Mechanical Gaming Keyboard', 'mechanical-gaming-keyboard', 'RB-ELC-004',
 'A compact tenkeyless keyboard with hot-swappable red switches, double-shot PBT keycaps and per-key RGB lighting. N-key rollover and a detachable USB-C cable keep every keystroke precise, whether you are gaming or working.',
 'Hot-swappable mechanical keyboard with per-key RGB and PBT keycaps.', 8999, 7499, 4800, 'cat-electronics', 'NorthStar', 16, 0, 1, '⌨️', 'New', 4.8, 74, 190,
 'Mechanical Gaming Keyboard | Ruby''s.pk', 'Compact hot-swappable mechanical gaming keyboard with RGB lighting and PBT keycaps.',
 datetime('now', '-15 days')),
('p-10', '20,000mAh Fast-Charge Power Bank', '20000mah-fast-charge-power-bank', 'RB-ELC-005',
 'Charge your phone up to four times with a high-capacity 20,000mAh battery. 22.5W fast charging, USB-C two-way input and a clear digital display keep you powered through load-shedding, travel and long days out.',
 '22.5W fast-charging 20,000mAh power bank with digital display.', 4999, 3999, 2500, 'cat-electronics', 'NorthStar', 48, 0, 1, '🔋', NULL, 4.5, 103, 410,
 '20,000mAh Fast-Charge Power Bank | Ruby''s.pk', 'Stay charged with a 20,000mAh power bank featuring 22.5W fast charging.',
 datetime('now', '-28 days')),

('p-11', 'Ceramic Coffee Mug Set', 'ceramic-coffee-mug-set', 'RB-HOM-001',
 'A set of four hand-glazed stoneware mugs with a comfortable curved handle. Each 350ml mug has a subtly unique finish, bringing a warm artisan feel to your morning coffee or evening chai. Microwave and dishwasher safe.',
 'Set of four hand-glazed 350ml stoneware mugs.', 2499, 1999, 1100, 'cat-home-living', 'Khyber Craft', 38, 1, 1, '☕', 'Best Seller', 4.7, 92, 340,
 'Ceramic Coffee Mug Set | Ruby''s.pk', 'Shop a set of four hand-glazed ceramic mugs, microwave and dishwasher safe.',
 datetime('now', '-70 days')),
('p-12', 'Nordic Table Lamp', 'nordic-table-lamp', 'RB-HOM-002',
 'A soft-glow bedside lamp with a natural linen shade and a solid acacia wood base. The warm 3000K LED bulb creates a calm, cosy atmosphere, and the inline switch makes it easy to use. Bulb included.',
 'Warm-glow linen and acacia wood table lamp with LED bulb.', 3499, 2899, 1750, 'cat-home-living', 'Khyber Craft', 24, 1, 1, '💡', 'Cosy Pick', 4.6, 51, 180,
 'Nordic Table Lamp | Ruby''s.pk', 'Bring warm light home with a linen and acacia wood Nordic table lamp.',
 datetime('now', '-36 days')),
('p-13', 'Cotton Throw Blanket', 'cotton-throw-blanket', 'RB-HOM-003',
 'A breathable woven cotton throw with a soft fringed edge. At 130 x 170cm it is perfect for the sofa, a reading chair or the end of the bed. The pre-washed fabric gets softer with every wash.',
 'Pre-washed woven cotton throw with a soft fringed edge.', 2999, NULL, 1500, 'cat-home-living', 'Khyber Craft', 29, 0, 1, '🛋️', NULL, 4.5, 34, 120,
 'Cotton Throw Blanket | Ruby''s.pk', 'Shop a pre-washed cotton throw blanket for sofas, beds and cosy evenings.',
 datetime('now', '-25 days')),
('p-14', 'Non-Stick Cookware Set', 'non-stick-cookware-set', 'RB-HOM-004',
 'A six-piece cookware set with a triple-layer non-stick coating and even-heating aluminium bodies. Includes a frying pan, saucepan, casserole, lid and two utensils. Suitable for all stovetops except induction.',
 'Six-piece triple-layer non-stick cookware set with utensils.', 7499, 5999, 3900, 'cat-home-living', 'Ruby''s Select', 17, 0, 1, '🍳', 'Save 20%', 4.4, 42, 160,
 'Non-Stick Cookware Set | Ruby''s.pk', 'Upgrade your kitchen with a six-piece non-stick cookware set and free utensils.',
 datetime('now', '-18 days')),

('p-15', 'Vitamin C Glow Serum', 'vitamin-c-glow-serum', 'RB-BEA-001',
 'A lightweight brightening serum with 10% stabilised vitamin C, hyaluronic acid and niacinamide. It helps fade dullness and dark spots while keeping skin hydrated. Use three to four drops in the morning before moisturiser and sunscreen.',
 '10% vitamin C serum with hyaluronic acid and niacinamide.', 2199, 1799, 950, 'cat-beauty-health', 'Lumina', 44, 1, 1, '🧴', 'Best Seller', 4.8, 187, 620,
 'Vitamin C Glow Serum | Ruby''s.pk', 'Brighten dull skin with a 10% vitamin C serum blended with hyaluronic acid.',
 datetime('now', '-66 days')),
('p-16', 'Hydrating Face Cream', 'hydrating-face-cream', 'RB-BEA-002',
 'A rich yet non-greasy moisturiser with ceramides, shea butter and glycerin. It strengthens the skin barrier and delivers up to 24 hours of hydration, making it a comfortable choice for dry and combination skin.',
 'Ceramide-rich moisturiser for up to 24 hours of hydration.', 1699, NULL, 820, 'cat-beauty-health', 'Lumina', 52, 0, 1, '🧖', NULL, 4.6, 96, 380,
 'Hydrating Face Cream | Ruby''s.pk', 'A ceramide-rich face cream for long-lasting hydration and barrier support.',
 datetime('now', '-52 days')),
('p-17', 'Eau de Parfum – Rose Oud', 'eau-de-parfum-rose-oud', 'RB-BEA-003',
 'A long-lasting oriental fragrance that opens with Damascus rose and saffron, settles into oud and patchouli, and finishes with warm amber. 50ml eau de parfum concentration for impressive staying power.',
 'Damascus rose, saffron and oud eau de parfum, 50ml.', 5499, 4499, 2700, 'cat-beauty-health', 'Lumina', 19, 1, 1, '🌸', 'New', 4.9, 58, 150,
 'Eau de Parfum Rose Oud | Ruby''s.pk', 'Shop a long-lasting rose, saffron and oud eau de parfum for evening wear.',
 datetime('now', '-10 days')),
('p-18', 'Matte Lipstick Trio', 'matte-lipstick-trio', 'RB-BEA-004',
 'Three comfortable matte lipsticks in versatile everyday shades: rosewood, terracotta and deep berry. The creamy formula glides on smoothly, stays put for hours and does not leave lips feeling dry.',
 'Three creamy, long-wear matte lipsticks in everyday shades.', 1899, 1499, 780, 'cat-beauty-health', 'Lumina', 36, 0, 1, '💄', 'Save 21%', 4.5, 73, 260,
 'Matte Lipstick Trio | Ruby''s.pk', 'Shop three long-wear matte lipsticks in rosewood, terracotta and berry.',
 datetime('now', '-33 days')),

('p-19', 'Pro Yoga Mat', 'pro-yoga-mat', 'RB-SPT-001',
 'A 6mm dual-texture yoga mat with a non-slip top and a cushioning closed-cell base. It grips well during sweaty sessions, wipes clean easily and comes with a carry strap. Free from latex and heavy metals.',
 '6mm non-slip, latex-free yoga mat with carry strap.', 2999, 2499, 1300, 'cat-sports-fitness', 'Athlete Republic', 33, 1, 1, '🧘', 'Best Seller', 4.7, 81, 290,
 'Pro Yoga Mat | Ruby''s.pk', 'Shop a 6mm non-slip, latex-free yoga mat with a comfortable carry strap.',
 datetime('now', '-64 days')),
('p-20', 'Adjustable Dumbbell Set', 'adjustable-dumbbell-set', 'RB-SPT-002',
 'A space-saving pair of adjustable dumbbells that switch from 2.5kg to 12.5kg each with a simple dial. The secure locking mechanism and textured handle make them ideal for home strength training.',
 'Space-saving adjustable dumbbells from 2.5kg to 12.5kg each.', 9999, 8499, 5600, 'cat-sports-fitness', 'Athlete Republic', 11, 1, 1, '🏋️', 'Limited', 4.8, 39, 90,
 'Adjustable Dumbbell Set | Ruby''s.pk', 'Build a home gym with adjustable dumbbells from 2.5kg to 12.5kg.',
 datetime('now', '-42 days')),
('p-21', 'Match-Grade Football', 'match-grade-football', 'RB-SPT-003',
 'A hand-stitched size 5 football with a high-rebound butyl bladder and durable PU cover. Designed for consistent flight and control on natural grass and artificial turf. Ships deflated; pump not included.',
 'Hand-stitched size 5 football with a high-rebound butyl bladder.', 2999, NULL, 1500, 'cat-sports-fitness', 'Athlete Republic', 27, 0, 1, '⚽', NULL, 4.5, 44, 170,
 'Match-Grade Football | Ruby''s.pk', 'Shop a hand-stitched size 5 match football built for club and casual play.',
 datetime('now', '-22 days')),
('p-22', 'Cricket Bat – English Willow', 'cricket-bat-english-willow', 'RB-SPT-004',
 'A grade-3 English willow bat with a full profile, a mid-to-low sweet spot and a comfortable cane handle. It is ready for net practice after light knocking-in. Comes with a full-length bat cover.',
 'Grade-3 English willow bat with a full profile and bat cover.', 12999, 10999, 7600, 'cat-sports-fitness', 'Athlete Republic', 9, 0, 1, '🏏', 'Limited', 4.6, 28, 60,
 'English Willow Cricket Bat | Ruby''s.pk', 'Shop a grade-3 English willow cricket bat with a full profile and cover.',
 datetime('now', '-14 days')),

('p-23', 'The Art of Mindful Living', 'art-of-mindful-living', 'RB-BOK-001',
 'A practical guide to slowing down without giving up your ambitions. Through short chapters and simple daily practices, this book explores attention, gratitude and intentional living in a fast-paced world. Paperback, 248 pages.',
 'A practical, page-turning guide to attention and intentional living.', 1299, 999, 560, 'cat-books-stationery', 'Ruby''s Select', 40, 1, 1, '📘', 'Editor''s Pick', 4.7, 67, 240,
 'The Art of Mindful Living | Ruby''s.pk', 'Read The Art of Mindful Living, a practical guide to attention and intentional living.',
 datetime('now', '-55 days')),
('p-24', 'Premium Leather Journal', 'premium-leather-journal', 'RB-BOK-002',
 'A refillable A5 journal with a soft full-grain leather cover, 192 pages of 100gsm ivory paper and a ribbon bookmark. The lay-flat binding makes it a pleasure to write in, whether for notes, planning or journalling.',
 'Refillable A5 full-grain leather journal with 192 pages of 100gsm paper.', 2499, 1999, 1200, 'cat-books-stationery', 'Khyber Craft', 25, 1, 1, '📓', 'New', 4.8, 36, 110,
 'Premium Leather Journal | Ruby''s.pk', 'Shop a refillable full-grain leather journal with lay-flat binding.',
 datetime('now', '-8 days')),
('p-25', 'Fountain Pen Gift Set', 'fountain-pen-gift-set', 'RB-BOK-003',
 'A polished brass fountain pen with a smooth medium nib, converter and six ink cartridges, presented in a magnetic gift box. The balanced weight makes everyday writing feel considered and comfortable.',
 'Brass fountain pen, converter and six ink cartridges in a gift box.', 3499, 2999, 1700, 'cat-books-stationery', 'Ruby''s Select', 21, 0, 1, '🖋️', 'Gift Idea', 4.6, 31, 85,
 'Fountain Pen Gift Set | Ruby''s.pk', 'A polished brass fountain pen gift set with converter and ink cartridges.',
 datetime('now', '-19 days')),
('p-26', '1000-Piece Landscape Puzzle', '1000-piece-landscape-puzzle', 'RB-BOK-004',
 'A satisfying 1000-piece puzzle featuring a richly detailed mountain lake scene. Precision-cut pieces fit cleanly, and the finished artwork measures 70 x 50cm. A calm screen-free activity for the whole family.',
 'Precision-cut 1000-piece landscape puzzle, 70 x 50cm finished.', 2199, NULL, 1050, 'cat-books-stationery', 'Ruby''s Select', 30, 0, 1, '🧩', NULL, 4.4, 18, 65,
 '1000-Piece Landscape Puzzle | Ruby''s.pk', 'Shop a precision-cut 1000-piece mountain landscape puzzle for the whole family.',
 datetime('now', '-6 days'));

-- Reviews ----------------------------------------------------
INSERT OR IGNORE INTO reviews (id, product_id, author_name, rating, title, comment, is_approved, created_at) VALUES
('r-01', 'p-01', 'Ayesha K.', 5, 'Perfect everyday tee', 'The cotton is genuinely soft and the fit is exactly as described. I have washed it several times and it still looks new. Delivery to Peshawar took two days.', 1, datetime('now', '-31 days')),
('r-02', 'p-01', 'Hamza R.', 5, 'Great quality for the price', 'Bought two of these. The fabric feels premium and the stitching is neat. Will definitely order more colours.', 1, datetime('now', '-18 days')),
('r-03', 'p-01', 'Sana M.', 4, 'Lovely, slightly relaxed fit', 'Really comfortable shirt. I ordered my usual size and it is a little roomy, which I like. Colour is accurate.', 1, datetime('now', '-9 days')),
('r-04', 'p-06', 'Bilal A.', 5, 'Noise cancellation is excellent', 'I use these on the bus every day. The ANC cuts most of the engine noise and the battery easily lasts a week of commuting. Very happy.', 1, datetime('now', '-22 days')),
('r-05', 'p-06', 'Mahnoor S.', 5, 'Better than expected', 'Paired instantly with my phone and the sound is clear with good bass. The case is small enough for a pocket.', 1, datetime('now', '-10 days')),
('r-06', 'p-07', 'Usman T.', 4, 'Excellent battery life', 'The display is bright and the health tracking is consistent. Battery goes about eight days with notifications on. The app could be better, but the watch is great value.', 1, datetime('now', '-16 days')),
('r-07', 'p-11', 'Fatima N.', 5, 'Beautiful mugs', 'These look even better in person. The glaze has a lovely handmade finish and they are a comfortable size for chai.', 1, datetime('now', '-24 days')),
('r-08', 'p-11', 'Ali H.', 5, 'Well packed and beautiful', 'Arrived safely wrapped. The mugs feel sturdy and the colours are exactly like the photos. A lovely gift.', 1, datetime('now', '-13 days')),
('r-09', 'p-15', 'Zainab Q.', 5, 'My skin looks brighter', 'I have been using it for three weeks and my dark spots are visibly lighter. It absorbs quickly and does not feel sticky in the heat.', 1, datetime('now', '-27 days')),
('r-10', 'p-15', 'Maryam J.', 4, 'Good serum, gentle formula', 'No irritation on my sensitive skin. I use it every morning with sunscreen and my complexion looks more even.', 1, datetime('now', '-11 days')),
('r-11', 'p-19', 'Hassan M.', 5, 'Great grip', 'The mat stays in place during my home workouts and the cushioning is kind to my knees. The carry strap is a nice touch.', 1, datetime('now', '-20 days')),
('r-12', 'p-23', 'Nimra F.', 5, 'A book I keep returning to', 'Short, thoughtful chapters that are easy to read before bed. It has genuinely helped me be more present during the day.', 1, datetime('now', '-5 days'));

-- Coupons ----------------------------------------------------
INSERT OR IGNORE INTO coupons (id, code, type, value, min_order_amount, max_discount_amount, usage_limit, starts_at, expires_at, is_active) VALUES
('coupon-ruby10', 'RUBY10', 'percentage', 10, 1500, 1000, 500, datetime('now', '-30 days'), datetime('now', '+365 days'), 1),
('coupon-welcome500', 'WELCOME500', 'fixed', 500, 3000, NULL, 1000, datetime('now', '-30 days'), datetime('now', '+365 days'), 1);

-- Shipping zones --------------------------------------------
INSERT OR IGNORE INTO shipping_zones (id, name, provinces, cities, rate, free_shipping_min, estimated_days) VALUES
('zone-kpk', 'Khyber Pakhtunkhwa', '["Khyber Pakhtunkhwa"]',
 '["Peshawar","Mardan","Abbottabad","Swat","Nowshera","Kohat","Dera Ismail Khan","Bannu","Charsadda","Mansehra","Haripur","Swabi","Chitral"]',
 150, 2000, '2-3 days'),
('zone-punjab', 'Punjab', '["Punjab"]',
 '["Lahore","Islamabad","Rawalpindi","Faisalabad","Multan","Gujranwala","Sialkot","Bahawalpur","Sargodha","Jhelum"]',
 200, 2500, '3-4 days'),
('zone-sindh', 'Sindh', '["Sindh"]',
 '["Karachi","Hyderabad","Sukkur","Larkana","Nawabshah","Mirpur Khas"]',
 200, 2500, '3-4 days'),
('zone-balochistan', 'Balochistan', '["Balochistan"]',
 '["Quetta","Gwadar","Turbat","Khuzdar","Chaman"]',
 300, 3000, '4-5 days'),
('zone-gb-ajk', 'Gilgit-Baltistan & AJK', '["Gilgit-Baltistan","Azad Jammu and Kashmir"]',
 '["Gilgit","Skardu","Hunza","Muzaffarabad","Mirpur","Kotli"]',
 350, 3500, '5-7 days');

-- Blog posts -------------------------------------------------
INSERT OR IGNORE INTO blog_posts (id, title, slug, excerpt, content, emoji, author_name, category, status, published_at, meta_title, meta_description) VALUES
('post-01', 'How to Choose the Right Earbuds for Pakistani Commutes', 'choose-right-earbuds-pakistan',
 'Noise cancellation, battery life and fit matter more than flashy specs. Here is a practical checklist before you buy.',
 'Earbuds have become an everyday essential in Pakistan, whether you are commuting through Peshawar traffic, attending online classes or squeezing in a workout before work. With so many options on the market, it helps to focus on a few practical details.

Start with fit and comfort. A secure seal is what makes bass sound full and noise cancellation work properly. Look for earbuds that include several ear-tip sizes and keep them clean. If you plan to wear them for long stretches, weight matters too.

Battery life is the next big one. A case that provides 25 to 30 hours of total listening time is a realistic sweet spot. Fast charging is useful on busy mornings, and USB-C charging means one less cable to carry.

If you travel on noisy roads or use public transport, active noise cancellation is worth paying for. It reduces engine and crowd noise so you can listen at a lower, safer volume. For workouts, check for at least IPX4 sweat resistance.

Finally, think about the controls and connection quality. Bluetooth 5.3 offers a more stable connection, and on-earbud controls are easier to use than reaching for your phone. A warranty from a seller you trust is just as important as the spec sheet.

At Ruby''s.pk, every electronics listing includes the key details you need, plus cash on delivery so you can shop with confidence.',
 '🎧', 'Ruby''s Editorial Team', 'Buying Guides', 'published', datetime('now', '-12 days'),
 'How to Choose the Right Earbuds in Pakistan | Ruby''s.pk', 'A practical buying guide to earbuds for Pakistani commutes, workouts and everyday use.'),
('post-02', 'Building a Simple Home Gym in a Small Apartment', 'simple-home-gym-small-apartment',
 'You do not need a spare room or a huge budget. These five essentials cover strength, mobility and cardio.',
 'Home fitness has become a practical option for many people in Pakistan, especially when gym timings and commutes do not line up with a busy week. The good news is that a small apartment is enough space for an effective routine.

The first purchase should be a good mat. It protects your floor, gives you a comfortable surface for mobility work and makes bodyweight sessions more pleasant. A 6mm mat is a good balance between cushioning and stability.

Next, add a set of adjustable dumbbells. They replace a whole rack and let you progress as you get stronger. Even a modest pair can cover squats, presses, rows and lunges.

Resistance bands are the third essential. They are inexpensive, pack away easily and are excellent for warm-ups, glute work and shoulder mobility. Hang them on a hook behind a door.

For cardio, you do not need a machine. A jump rope takes up almost no space and delivers a surprisingly tough workout. If your building has stairs, you already have a cardio option.

Finally, keep a small notebook or use your phone to track sessions. Consistency beats intensity, and seeing progress is motivating. Start with three short sessions a week and build from there.

Browse Ruby''s.pk sports and fitness range for gear that fits real homes and real routines.',
 '🏋️', 'Ruby''s Editorial Team', 'Fitness', 'published', datetime('now', '-8 days'),
 'Build a Home Gym in a Small Apartment | Ruby''s.pk', 'Five practical essentials for building an effective home gym in a small apartment.'),
('post-03', 'A Simple Skincare Routine for Humid Pakistani Summers', 'simple-skincare-routine-pakistani-summer',
 'More products are not the answer. A gentle cleanser, vitamin C, moisturiser and sunscreen cover the basics.',
 'Summer in Pakistan brings heat, humidity and plenty of sun exposure. A complicated ten-step routine often feels impossible in that weather, and over-cleansing can leave skin feeling tight and irritated. A short, consistent routine usually works better.

Begin with a gentle cleanser morning and night. Look for a low-foam formula that removes sweat and sunscreen without stripping the skin. If your skin feels squeaky after washing, the cleanser is probably too harsh.

In the morning, a vitamin C serum can help brighten the complexion and support the skin against daily environmental stress. Apply three or four drops to dry skin, then follow with a light moisturiser.

Sunscreen is non-negotiable. Choose a broad-spectrum SPF 50 formula that feels comfortable enough to reapply. In Pakistan, sun exposure is strong even on cloudy days, and reapplication matters if you are outdoors.

In the evening, cleanse again and use a ceramide-rich moisturiser to support the skin barrier. If you use actives such as retinol, introduce them slowly and only a few nights a week. Hydration and consistency will do more for your skin than chasing every new product.

Whatever your routine, patch-test new products and give them a few weeks before judging results. Shop gentle, locally suited skincare at Ruby''s.pk with cash on delivery nationwide.',
 '🧴', 'Ruby''s Editorial Team', 'Beauty', 'published', datetime('now', '-4 days'),
 'Simple Skincare Routine for Pakistani Summers | Ruby''s.pk', 'A gentle four-step skincare routine for humid Pakistani summers, from cleanser to sunscreen.');
