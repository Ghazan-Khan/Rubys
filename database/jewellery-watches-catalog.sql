-- ============================================================
-- Ruby's.pk — Jewellery & Watches catalogue import
-- ------------------------------------------------------------
-- 48 products imported from supplier export,
-- filed under Jewellery & Watches (cat-jewellery-watches).
--
-- Idempotent: can be re-run safely. Records in `applied_imports`
-- so startup skips re-reading/re-writing.
-- ============================================================

CREATE TABLE IF NOT EXISTS applied_imports (
    name        TEXT PRIMARY KEY,
    applied_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO categories (id, name, slug, description, emoji, banner_text, is_active, sort_order, meta_title, meta_description) VALUES
('cat-jewellery-watches', 'Jewellery & Watches', 'jewellery-watches', 'Rose gold mesh watches, pearl necklaces, zircon studs, bridal sets & bangles.', '✨', 'Sparkle for every special moment', 1, 4, 'Women''s Jewellery & Watches in Pakistan', 'Shop exquisite watches, necklaces, earrings and jewellery pieces with cash on delivery.');

-- Products ---------------------------------------------------
INSERT OR IGNORE INTO products (id, name, slug, sku, description, short_description, price, sale_price, cost_price, category_id, brand, stock_quantity, is_featured, is_active, emoji, image_url, badge, rating, review_count, sold_count, meta_title, meta_description, created_at) VALUES
('p-jw-01', 'Stackable Jewelry Box Set of 2 Moisture Proof Plastic', 'stackable-jewelry-box-set-of-2-moisture-proof-plastic', 'MKZ-411664-411664001', 'Keep your jewelry safe, organized, and looking brand new with this stylish storage solution. Perfect for Pakistani homes and offices, these boxes protect your rings, earrings, and necklaces from moisture, oxidation, and everyday wear — ideal for keeping your accessories in pristine condition even during humid weather. Whether you’re preparing for a wedding, a party, or just want to tidy up your jewelry drawer, these boxes offer smart, space-saving storage that’s both practical and elegant.

Made from tough, high-definition plastic, each box is built to last. The moisture-proof design keeps your jewelry dry and free from tarnish, while the smooth, glossy finish resists scratches and stains. Plus, if the box gets a little dull over time, simply warm it gently with a hair dryer to restore its shine — no complicated tools or cleaning required. The compact, stackable design fits neatly in drawers or cabinets, making it easy to store and access your favorite pieces without clutter.

- Durable plastic construction for long-term use

- Moisture-proof and oxidation-resistant interior

- Stylish, glossy finish that stays clean and bright

- Stackable design saves space in any drawer

- Easy to clean and restore with a hair dryer

- Pack of 2 — perfect for organizing multiple jewelry sets

· Material: Plastic · Number Of Pieces: 2 Pcs · Keep Your Precious Jewelry Sealed, Moisture-Proof, And Free From Oxidation · High-Definition And Tough, Providing Reliable Protection · Easily Restore The Box''s Appearance By Gently Heating it With A Hair Dryer · Package Includes: 2 x Jewelry Box · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ51120164AFTS', 'Keep your jewelry safe, organized, and looking brand new with this stylish storage solution.', 1150, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 1, 1, '✨', 'https://www.markaz.app/api/export/image/511-403-411664-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F511-403-411664-product-1.jpg', 'Best Seller', 4.9, 64, 210, 'Stackable Jewelry Box Set of 2 Moisture Proof Plastic | Ruby''s.pk', 'Keep your jewelry safe, organized, and looking brand new with this stylish storage solution.', datetime('now')),
('p-jw-02', 'Jewellery Organizer Case Fashion Portable', 'jewellery-organizer-case-fashion-portable', 'MKZ-768993-768993001', '· Material: Acrylic · Plating: Resin Polish · Stone: Artificial Stones · Gender Type: Women · Stone Color: Multicolor · Product Design: Modern Design · Product Feature: Unique Design · Number Of Pieces: 1 Pc · Size: Standard Size · Color: Multicolor · Package Includes: 1 x Jewellery Box · Size Dimensions: 15 Cm · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ3148200033PMHEAY', 'Jewellery Organizer Case Fashion Portable. Crafted for timeless elegance, sparkle, and everyday beauty.', 2586, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 1, 1, '✨', 'https://www.markaz.app/api/export/image/3148-403-MZ3148200033PMHEAY-768993001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3148-403-MZ3148200033PMHEAY-768993001-product-1.webp', 'Trending', 4.8, 45, 165, 'Jewellery Organizer Case Fashion Portable | Ruby''s.pk', 'Jewellery Organizer Case Fashion Portable. Crafted for timeless elegance, sparkle, and everyday beauty.', datetime('now')),
('p-jw-03', 'Compact Leather Jewelry Box Multicolor Zipper Closure 10x10x5cm', 'compact-leather-jewelry-box-multicolor-zipper-closure-10x10x5cm', 'MKZ-668881-668881001', 'Keep your jewelry safe, organized, and stylish with this premium leather organizer—perfect for Pakistani homes, weddings, or travel. Whether you’re a busy professional or a fashion lover, this compact box keeps necklaces, earrings, and bracelets dust-free and scratch-resistant, so your accessories stay in pristine condition. Made with soft velvet lining and durable PU leather, it’s lightweight yet sturdy enough for daily use or gifting. The modern design fits any vanity or handbag, and its zipper closure ensures your jewelry stays secure. Ideal for local weather and everyday use, it’s a practical yet elegant addition to your beauty routine.

This small jewelry box is built to last with a cushioned interior that protects delicate pieces from damage. The velvet lining absorbs dust and prevents scratches, while the sturdy zipper keeps everything neatly tucked away. Its compact size (10 x 10 x 5 cm) makes it easy to carry in your handbag or store on your dressing table. The multicolor design adds a touch of elegance to any space, and the modern aesthetic suits both casual and formal settings. Perfect for gifting or personal use, it’s a stylish solution for anyone who values organization and beauty.

- Premium PU leather exterior with soft velvet interior

- Zipper closure for secure storage

- Compact size (10 x 10 x 5 cm) for easy portability

- Ideal for travel, weddings, or daily use

- Modern, multicolor design for any decor

- Lightweight and durable for long-term use

· Material: Rubber · Gender Type: Unisex · Product Design: Modern Design · Product Feature: Product Packaging Type: Packed In A Box Including Bubble Wrap For Safety, Easy To Wear, Unique Design, Jewellery Deal · Number Of Pieces: 1 Pc · Color: Multicolor · Package Includes: 1 x Jewellery Box · Accessories · Size: 10 x 10 x 5 cm · Zipper Closure · Small Box · Leather Exterior · Soft Interior · Easy to Carry · Perfect for Travelling · Can be stored in a handbag · Decorative for Table · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ1787200034ZZJJTS', 'Keep your jewelry safe, organized, and stylish with this premium leather organizer—perfect for Pakistani homes, weddings, or travel.', 788, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 1, 1, '✨', 'https://www.markaz.app/api/export/image/1787-403-668881-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1787-403-668881-product-1.webp', 'Popular', 4.7, 28, 120, 'Compact Leather Jewelry Box Multicolor Zipper Closure 10x10x5cm | Ruby''s.pk', 'Keep your jewelry safe, organized, and stylish with this premium leather organizer—perfect for Pakistani homes, weddings, or travel.', datetime('now')),
('p-jw-04', 'Stunning Silver Plated Anklet Pair - 2 Pcs Adjustable Design', 'stunning-silver-plated-anklet-pair-2-pcs-adjustable-design', 'MKZ-530645-530645001', 'Discover the elegance of our beautiful silver plated anklet pair, designed specifically for women. Each anklet is adjustable for comfort and style, making them a perfect accessory for any occasion. Enhance your jewelry collection with these two exquisite pieces that will add a touch of charm to your outfits.

· Material: Alloy · Plating: Silver Plated · Gender Type: Women · Number Of Pieces: 2 Pcs · Size: Adjustable · Color: Silver · Package Includes: 1 x Anklet Pair · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ23900000022ASFN', 'Discover the elegance of our beautiful silver plated anklet pair, designed specifically for women.', 525, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 1, 1, '✨', 'https://www.markaz.app/api/export/image/239-278-530645-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-530645-product-1.jpg', NULL, 4.7, 28, 120, 'Stunning Silver Plated Anklet Pair - 2 Pcs Adjustable Design | Ruby''s.pk', 'Discover the elegance of our beautiful silver plated anklet pair, designed specifically for women.', datetime('now')),
('p-jw-05', 'Silver Plated Anklet', 'silver-plated-anklet', 'MKZ-523604-523604001', 'Butterfly Anklet Pair

· Material: Alloy · Plating: Silver Plated · Gender Type: Women · Number Of Pieces: 2 Pcs · Size: Adjustable · Color: Silver · Package Includes: 1 x Anklet Pair · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ23900000019ASFN', 'Silver Plated Anklet. Crafted for timeless elegance, sparkle, and everyday beauty.', 625, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/239-278-523604-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-523604-product-1.jpeg', NULL, 0, 0, 0, 'Silver Plated Anklet | Ruby''s.pk', 'Silver Plated Anklet. Crafted for timeless elegance, sparkle, and everyday beauty.', datetime('now')),
('p-jw-06', 'Gold Plated Bell Anklet for Women Festive Wear', 'gold-plated-bell-anklet-for-women-festive-wear', 'MKZ-516657-516657001', 'Add a touch of elegance to your look with this stunning gold plated anklet, perfect for weddings, Eid parties, or any festive occasion in Pakistan. Designed for comfort and style, it’s ideal for the warm weather and vibrant fashion scenes across the country. Whether you’re dressing up for a special event or just adding flair to your daily outfit, this anklet makes a bold statement without being overwhelming.

Crafted from durable alloy, this anklet is built to last. The gold plating gives it a luxurious shine that complements any outfit, while the intricate chain design with dangling bells adds movement and charm. It’s lightweight, flexible, and designed to fit any ankle comfortably. Perfect for pairing with your favorite heels or casual shoes, it’s a versatile piece that enhances your overall look without needing constant adjustments.

- Gold plated for a luxurious, long-lasting shine

- Made from durable alloy for strength and comfort

- Free size design fits any ankle perfectly

- Stylish bell chains add playful movement

- Ideal for Eid, weddings, and festive occasions

- Lightweight and easy to wear with any outfit

· Material: Alloy · Plating: Gold Plated · Number Of Pieces: 1 Pc · Size: Free Size · Color: Golden · Package Includes: 1 x Anklet · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ23900000013ASFN', 'Add a touch of elegance to your look with this stunning gold plated anklet, perfect for weddings, Eid parties, or any festive occasion in Pakistan.', 613, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/239-278-516657-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-516657-product-1.jpeg', NULL, 0, 0, 0, 'Gold Plated Bell Anklet for Women Festive Wear | Ruby''s.pk', 'Add a touch of elegance to your look with this stunning gold plated anklet, perfect for weddings, Eid parties, or any festive occasion in Pakistan.', datetime('now')),
('p-jw-07', 'Noratan Design Gold Plated Kundan Jhumar', 'noratan-design-gold-plated-kundan-jhumar', 'MKZ-754976-754976001', 'THE SHAH-NOOR JHUMAR (??? ???) ??

· Material: Brass · Plating: Gold Plated · Stone: Kundan · Gender Type: Women · Stone Color: Multicolor · Product Design: Noratan Design · Product Feature: Unique Design · Number Of Pieces: 1 Pc · Size: Standard Size · Color: Golden · Package Includes: 1 x Jhumar · Size Dimensions: 6.2 Inches · THE SHAH-NOOR JHUMAR (??? ???) ?? · ? BRAND NEW EXCLUSIVE ARRIVAL ? · Say goodbye to common, mass-produced market jewelry! This exquisite, royal Passa is an entirely brand-new, fresh boutique masterpiece. Hand-selected from heritage bazaars, this rare design ensures you stand out with pure, unmatched exclusivity on your big day! ?? · ? DESIGN HIGHLIGHTS: · ? Mughal Royalty Aesthetic: Elevate your festive look with a statement bridal jhumar structured with traditional multi-tiered gold-ball drapes. · ? Heavy Crescent Layout: Features a gold-plated crescent moon centerpiece with premium hand-picked Kundan stones. · ? Historic Grace: Beautifully engineered to clip smoothly into your hair, crowning your side profile with mesmerizing royal weightless grace. · ? Perfect For: Brides, Nikah, Barat days, or heavy formal wedding wear.', 'THE SHAH-NOOR JHUMAR (???', 2588, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/2687-96-754976-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2687-96-754976-product-1.webp', NULL, 0, 0, 0, 'Noratan Design Gold Plated Kundan Jhumar | Ruby''s.pk', 'THE SHAH-NOOR JHUMAR (???', datetime('now')),
('p-jw-08', 'Resin Polish Jhumar Wax Polish Wax Polish', 'resin-polish-jhumar-wax-polish-wax-polish', 'MKZ-177285-177285001', 'Resin Polish Jhumar

· Material: Casting · Resin Polish · Jhumar · For Women · Red Stones · Helpful Info: Keep Jewellery Away From Water And Chemicals · Remove During Physical Activities · Store Separately In A Soft Pouch. · Product Code: MZ41700032MJTJW', 'Resin Polish Jhumar Wax Polish Wax Polish. Crafted for timeless elegance, sparkle, and everyday beauty.', 638, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/435-32331-177285-product-2.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-32331-177285-product-2.jpeg', NULL, 0, 0, 0, 'Resin Polish Jhumar Wax Polish Wax Polish | Ruby''s.pk', 'Resin Polish Jhumar Wax Polish Wax Polish. Crafted for timeless elegance, sparkle, and everyday beauty.', datetime('now')),
('p-jw-09', 'Resin Polish Jhumar Red Gold Wedding Party Wear', 'resin-polish-jhumar-red-gold-wedding-party-wear', 'MKZ-177272-177272001', 'This stunning Resin Polish Jhumar is crafted with premium quality materials to last through your most important events. Perfect for weddings, formal gatherings, or festive occasions, it’s stylish enough to elevate any traditional outfit while remaining comfortable for daily wear. Its vibrant red stones and intricate gold-toned design make it a standout piece that reflects both elegance and cultural heritage.

Made with durable resin and polished stones, this jhumar is designed to resist fading and maintain its luster over time. The lightweight construction ensures comfort, even during long events, while the secure clasp keeps it in place. Unlike delicate metal pieces, this resin version is less prone to tarnishing and easier to maintain. It’s ideal for Pakistani women who want a beautiful, long-lasting accessory without the worry of damage.

- Red resin stones for bold, eye-catching appeal

- Gold-toned metal casting for a luxurious finish

- Lightweight and comfortable for extended wear

- Durable design that resists fading and damage

- Perfect for weddings, parties, and formal events

- Easy to care for – simply wipe clean and store in a soft pouch

· Material: Casting · Resin Polish · Jhumar · For Women · Red Stones · Helpful Info: Keep Jewellery Away From Water And Chemicals · Remove During Physical Activities · Store Separately In A Soft Pouch. · Product Code: MZ41700028MJTJW', 'This stunning Resin Polish Jhumar is crafted with premium quality materials to last through your most important events.', 638, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/435-32331-177272-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-32331-177272-product-1.jpeg', NULL, 0, 0, 0, 'Resin Polish Jhumar Red Gold Wedding Party Wear | Ruby''s.pk', 'This stunning Resin Polish Jhumar is crafted with premium quality materials to last through your most important events.', datetime('now')),
('p-jw-10', 'Zircon Jhumar Silver Polish Wedding Party Jewelry', 'zircon-jhumar-silver-polish-wedding-party-jewelry', 'MKZ-229977-229977001', 'This stunning Zircon Jhumar is crafted with premium quality silver polish casting, making it both stylish and durable for everyday wear. Perfect for weddings, parties, or festive occasions, it’s designed to complement traditional Pakistani attire while offering timeless elegance. Its intricate design features cascading pearl strands and sparkling zircon stones that catch the light beautifully, ensuring you stand out with grace.

The durable silver polish finish resists tarnish and maintains its luster, even with regular use. The jhumar’s lightweight structure ensures comfort during long events, while the elegant crown-like top and ornate lower section add regal charm. Ideal for brides, bridesmaids, or any woman who wants to make a bold fashion statement without compromising on quality. This new arrival is a smart investment for your jewelry collection.

- Crafted with premium silver polish casting for lasting shine

- Features cascading pearl strands and sparkling zircon stones

- Lightweight and comfortable for extended wear

- Perfect for weddings, parties, and festive occasions

- Durable design suitable for daily use with proper care

- New arrival at the best price in Pakistan

· Material: Casting · Polish: Silver Polish · Product Type: Jhumar · Number Of Pieces: 1 · Package Includes: 1 x Jhumar · Helpful Info: Keep Jewellery away from water and chemicals · Remove during physical activities · Store separately in a soft pouch · There might be a slight color difference due to different light and monitor effects. · Product Code: MZ41700396MJTJW', 'This stunning Zircon Jhumar is crafted with premium quality silver polish casting, making it both stylish and durable for everyday wear.', 775, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/435-41851-229977-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-41851-229977-product-1.jpeg', NULL, 0, 0, 0, 'Zircon Jhumar Silver Polish Wedding Party Jewelry | Ruby''s.pk', 'This stunning Zircon Jhumar is crafted with premium quality silver polish casting, making it both stylish and durable for everyday wear.', datetime('now')),
('p-jw-11', 'Multicolor Jhumar Jewellery Set 1 Pc Standard Size', 'multicolor-jhumar-jewellery-set-1-pc-standard-size', 'MKZ-369825-369825001', 'This elegant Jhumar set is crafted with premium quality casting material, ensuring durability and a luxurious feel perfect for any occasion. Its multicolor design adds a vibrant touch to your jewelry collection, making it ideal for both casual wear and special events. Whether you’re dressing for a wedding, office, or festive gathering, this stylish set offers timeless charm without compromising on comfort.

Each piece is designed to withstand daily wear and tear, thanks to its strong casting construction. The stones are securely set to prevent loose or damaged jewelry, and the set is lightweight for easy handling. The standard size fits most wrists comfortably, and the multicolor finish enhances your natural beauty. This new arrival is perfect for those seeking best price in Pakistan without sacrificing style or quality.

- Made with durable casting material for long-lasting wear

- Multicolor design adds vibrant appeal to your look

- Lightweight and comfortable for all-day wear

- Standard size fits most wrists perfectly

- Ideal for weddings, parties, or office wear

- Comes with 1 piece only, ready to gift or wear

· Material: Casting · Stone Color: Multicolor · Number Of Pieces: 1 Pc · Size: Standard Size · Color: Multicolor · Package Includes: 1 x Jhumar · Helpful Info: Keep Jewellery away from water and chemicals. Remove during physical activities. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ43520026MCJY', 'This elegant Jhumar set is crafted with premium quality casting material, ensuring durability and a luxurious feel perfect for any occasion.', 738, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/435-96-369825-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-96-369825-product-1.jpeg', NULL, 0, 0, 0, 'Multicolor Jhumar Jewellery Set 1 Pc Standard Size | Ruby''s.pk', 'This elegant Jhumar set is crafted with premium quality casting material, ensuring durability and a luxurious feel perfect for any occasion.', datetime('now')),
('p-jw-12', 'Nagina Kara Bangle Set Silver Finish Wedding Party Wear', 'nagina-kara-bangle-set-silver-finish-wedding-party-wear', 'MKZ-650806', 'Elevate your wrist with this stunning Nagina Kara Bangle Set, designed for the modern Pakistani woman who values both tradition and style. Perfect for weddings, parties, or daily wear, this set offers a timeless elegance that complements any outfit. Its durable metal construction ensures long-lasting beauty, while the intricate silver design adds a touch of sophistication to your ensemble.

This traditional bangle set is crafted with premium quality materials, featuring sparkling Nagina stones that catch the light beautifully. The silver finish is both elegant and resilient, making it suitable for everyday use without compromising on durability. The design is inspired by classic Pakistani jewelry, with a modern twist that appeals to both young and older generations. Whether you’re dressing for a special occasion or simply want to add a touch of glamour to your look, this set delivers unmatched style and value.

- Premium quality metal construction for long-lasting wear

- Sparkling Nagina stones for a luxurious, eye-catching look

- Elegant silver finish that complements any outfit

- Traditional design with a modern aesthetic

- Durable and suitable for daily use

- Best price in Pakistan for this stunning set

· Material: Metal · Stone: Nagina · Gender Type: Women · Number Of Pieces: 1 Pc · Size: 2.45, 2.6, 2.8 · Color: Silver · Package Includes: 1 x Kara Bangle · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ1779200026GRCN', 'Elevate your wrist with this stunning Nagina Kara Bangle Set, designed for the modern Pakistani woman who values both tradition and style.', 1241, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/pakistan_650806.png?src=https%3A%2F%2Fstatic.markaz.app%2FGenerativeMedia%2FPakistan%2Fimages%2Fpakistan_650806.png', NULL, 0, 0, 0, 'Nagina Kara Bangle Set Silver Finish Wedding Party Wear | Ruby''s.pk', 'Elevate your wrist with this stunning Nagina Kara Bangle Set, designed for the modern Pakistani woman who values both tradition and style.', datetime('now')),
('p-jw-13', 'Gold Toned Gemstone Bangles Set for Weddings & Parties', 'gold-toned-gemstone-bangles-set-for-weddings-parties', 'MKZ-693457-693457001', 'These exquisite 2-piece bangles are crafted with premium quality casting, designed to match the elegance of Pakistani traditions while staying stylish for modern occasions. Perfect for weddings, festive gatherings, or daily wear, they offer a durable and eye-catching look that complements any outfit. The multicolor gemstone design, featuring vibrant reds, oranges, and clear stones, adds a festive charm that’s ideal for both bridal and partywear. Made with attention to detail, these bangles are built to last, resisting daily wear and tear while maintaining their lustrous finish.

The gold-toned twisted rope design provides a sturdy structure, ensuring comfort and durability. Each bangle is adorned with a floral-inspired centerpiece, adding a touch of antique elegance. The chain detail adds a unique flair, making them suitable for both traditional and contemporary styles. Lightweight yet sturdy, they are perfect for all-day wear without discomfort. Ideal for brides, bridesmaids, or fashion-forward women looking for affordable luxury.

- Crafted with premium quality casting for durability

- Multicolor gemstone design for festive appeal

- Gold-toned twisted rope structure for comfort

- Chain detail adds modern elegance

- Suitable for weddings, parties, and daily wear

- Affordable price with best value in Pakistan

· Material: Casting · Number Of Pieces: 2 Pcs · Color: Multicolor · Package Includes: 2 x Plain Bangle · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ43500000232MCJY', 'These exquisite 2-piece bangles are crafted with premium quality casting, designed to match the elegance of Pakistani traditions while staying styl...', 1650, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/pakistan_693457.png?src=https%3A%2F%2Fstatic.markaz.app%2FGenerativeMedia%2FPakistan%2Fimages%2Fpakistan_693457.png', NULL, 0, 0, 0, 'Gold Toned Gemstone Bangles Set for Weddings & Parties | Ruby''s.pk', 'These exquisite 2-piece bangles are crafted with premium quality casting, designed to match the elegance of Pakistani traditions while staying styl...', datetime('now')),
('p-jw-14', '6 Pcs Modern Crystal Kara Bangle Set for Women', '6-pcs-modern-crystal-kara-bangle-set-for-women', 'MKZ-731959-731959002', 'These modern crystal kara bangles are the perfect blend of elegance and durability, designed to elevate your everyday look while staying comfortable in Pakistan’s warm climate. Whether you’re heading to a wedding, office, or casual outing, these stylish bangles add a touch of glamour without compromising on comfort. Crafted with a sturdy alloy base and gold-plated finish, they resist tarnishing and maintain their shine even with daily wear. The crystal stones catch the light beautifully, making them ideal for both traditional and modern outfits.

Each bangle in this set is designed for easy wear and long-lasting beauty. The modern design features multiple layers of sparkling crystals that shimmer under any light, making you stand out in any crowd. The gold-plated finish gives them a luxurious look that complements both bridal and daily wear jewelry. These are not just accessories—they’re a statement of your personal style.

- Premium Quality with a durable alloy base

- Gold-plated finish for a luxurious look

- Sparkling crystal stones for dazzling shine

- Modern design with multiple layered bangles

- Easy to wear and perfect for daily or special occasions

- New Arrival – best price in Pakistan for this stylish set

· Material: Alloy · Plating: Gold Plated · Stone: Crystal · Gender Type: Women · Product Design: Modern Design · Product Feature: Easy To Wear · Number Of Pieces: 6 Pcs · Color: Golden, Silver · Package Includes: 6 x Kara Bangle · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ1119203230BYBR', 'These modern crystal kara bangles are the perfect blend of elegance and durability, designed to elevate your everyday look while staying comfortabl...', 1086, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1119-78-731959-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-78-731959-product-1.webp', NULL, 0, 0, 0, '6 Pcs Modern Crystal Kara Bangle Set for Women | Ruby''s.pk', 'These modern crystal kara bangles are the perfect blend of elegance and durability, designed to elevate your everyday look while staying comfortabl...', datetime('now')),
('p-jw-15', 'Golden Kara Bangle Set for Brides & Fashion Women', 'golden-kara-bangle-set-for-brides-fashion-women', 'MKZ-630160', 'Perfect for Pakistani brides and fashion-forward women, these 2 Pcs Kara Bangle set adds timeless elegance to any outfit, whether you’re attending a wedding, party, or daily wear. Designed with traditional charm and modern flair, they’re ideal for both ethnic and contemporary looks, making them a must-have for every occasion.

Crafted from high-quality alloy, these bangles are lightweight yet durable, ensuring they stay beautiful for years without tarnishing or breaking. The golden finish gives a luxurious, antique look that complements both traditional and modern ensembles. Whether worn alone or stacked with other jewelry, they enhance your look with subtle sophistication. Ideal for brides, bridesmaids, or anyone who loves stylish, affordable accessories that don’t compromise on quality.

- Made from premium alloy for long-lasting durability

- Golden color with an antique finish for elegant appeal

- Pack of 2 pieces – perfect for matching sets

- Lightweight design for all-day comfort

- Suitable for weddings, parties, and daily wear

- Affordable price in Pakistan without sacrificing style

· Material: Alloy · Number Of Pieces: 2 Pcs · Color: Golden · Package Includes: 2 x Kara Bangle · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ43500000124MCJY', 'Perfect for Pakistani brides and fashion-forward women, these 2 Pcs Kara Bangle set adds timeless elegance to any outfit, whether you’re attending ...', 900, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/435-78-630160-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-78-630160-product-1.jpg', NULL, 0, 0, 0, 'Golden Kara Bangle Set for Brides & Fashion Women | Ruby''s.pk', 'Perfect for Pakistani brides and fashion-forward women, these 2 Pcs Kara Bangle set adds timeless elegance to any outfit, whether you’re attending ...', datetime('now')),
('p-jw-16', 'Premium Quality Kara Bangles Set of 2 Alloy', 'premium-quality-kara-bangles-set-of-2-alloy', 'MKZ-387850-387850001', 'These stunning kara bangles are crafted with premium quality alloy, designed to stay durable and stylish for everyday wear or special occasions. Perfect for Pakistani women looking for elegant, affordable jewelry that complements traditional outfits or modern ensembles. Ideal for Eid, weddings, or office wear, these bangles offer a timeless look without compromising on comfort or strength. Their intricate woven design adds a touch of sophistication while remaining lightweight and easy to handle.

The alloy material ensures these bangles resist tarnishing and maintain their golden luster over time, making them a smart investment. Unlike delicate metals, this alloy is built to withstand daily use without losing its shine. The design is both classic and contemporary, allowing you to pair them with any outfit. With a best price in Pakistan, you get unmatched value for your money. These are not just accessories—they’re a statement of elegance and durability.

- Set of 2 pieces for versatile styling

- Premium quality alloy for long-lasting shine

- Stylish woven pattern that enhances any outfit

- Lightweight and comfortable for all-day wear

- Perfect for Eid, weddings, or office settings

- New arrival with modern design and classic appeal

· Material: Alloy · Number Of Pieces: 2 Pcs · Package Includes: 2 x Kara Bangle · Helpful Info: Keep Jewellery away from water and chemicals. Remove during physical activities. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ111920072BYBR', 'These stunning kara bangles are crafted with premium quality alloy, designed to stay durable and stylish for everyday wear or special occasions.', 850, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1119-78-387850-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-78-387850-product-1.jpg', NULL, 0, 0, 0, 'Premium Quality Kara Bangles Set of 2 Alloy | Ruby''s.pk', 'These stunning kara bangles are crafted with premium quality alloy, designed to stay durable and stylish for everyday wear or special occasions.', datetime('now')),
('p-jw-17', 'Silver Flower Bracelet for Women with Sparkling Stones', 'silver-flower-bracelet-for-women-with-sparkling-stones', 'MKZ-655481', 'This elegant small flower bracelet is perfect for Pakistani women who want to add a touch of sophistication to their daily outfits or special occasions. Designed with durable, high-quality silver and sparkling stones, it’s ideal for both office wear and festive gatherings. Its versatile style makes it suitable for all seasons and occasions, from casual outings to weddings or Eid celebrations.

The bracelet features a secure clasp and is crafted to last, making it a smart investment for your jewelry collection. The intricate floral design adds a delicate charm that complements any outfit, while the premium materials ensure it remains beautiful for years. Whether you’re shopping for yourself or as a gift, this stylish piece offers the best price in Pakistan without compromising on quality.

- Durable silver construction for long-lasting beauty

- Sparkling stones that catch the light beautifully

- Secure clasp for safe wear

- Versatile design suitable for all occasions

- Premium quality craftsmanship

- New arrival, perfect for your jewelry collection

· Type: Fashion & Accessories · Color: Red · Feature: Versatile · Gender: Women. · Product Code: MZCHYHAM5193', 'This elegant small flower bracelet is perfect for Pakistani women who want to add a touch of sophistication to their daily outfits or special occas...', 2205, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/pakistan_655481.png?src=https%3A%2F%2Fstatic.markaz.app%2FGenerativeMedia%2FPakistan%2Fimages%2Fpakistan_655481.png', NULL, 0, 0, 0, 'Silver Flower Bracelet for Women with Sparkling Stones | Ruby''s.pk', 'This elegant small flower bracelet is perfect for Pakistani women who want to add a touch of sophistication to their daily outfits or special occas...', datetime('now')),
('p-jw-18', 'Zircon Rice Bracelet for Women, Silver, Wicker Leaf Design', 'zircon-rice-bracelet-for-women-silver-wicker-leaf-design', 'MKZ-655202', 'This elegant zircon rice bracelet is crafted with premium quality materials that shine brilliantly under any light, making it perfect for both daily wear and special occasions. Its stylish wicker leaf design adds a touch of sophistication while remaining comfortable for all-day wear, ideal for Pakistani women who value both beauty and durability. Whether you’re dressing for work, a wedding, or a casual outing, this new arrival will elevate your look without breaking the bank. The bracelet is made with durable, hypoallergenic metal and high-clarity zircon stones that resist fading and tarnishing, ensuring it stays stunning for years. Its secure clasp and lightweight design make it easy to wear and remove, perfect for busy lifestyles.

- Premium quality zircon stones that sparkle brilliantly

- Durable, hypoallergenic metal construction for long-lasting wear

- Stylish wicker leaf pattern that adds elegance to any outfit

- Lightweight and comfortable for daily use

- Secure clasp for safekeeping and easy wear

- New arrival at best price in Pakistan for maximum value

· Type: Fashion & Accessories · Style: Fashion · Gender: Women. · Product Code: MZCHYHAM4921', 'This elegant zircon rice bracelet is crafted with premium quality materials that shine brilliantly under any light, making it perfect for both dail...', 1851, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/pakistan_655202.png?src=https%3A%2F%2Fstatic.markaz.app%2FGenerativeMedia%2FPakistan%2Fimages%2Fpakistan_655202.png', NULL, 0, 0, 0, 'Zircon Rice Bracelet for Women, Silver, Wicker Leaf Design | Ruby''s.pk', 'This elegant zircon rice bracelet is crafted with premium quality materials that shine brilliantly under any light, making it perfect for both dail...', datetime('now')),
('p-jw-19', 'Golden Base Pink Trending Tulip Braclet QWJ-187', 'golden-base-pink-trending-tulip-braclet-qwj-187', 'MKZ-751962-751962001', '· Material: Stainless Steel · Number Of Pieces: 1 Pc · Color: Pink · Package Includes: 1 x Charm Bracelet · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ1967200095JRCS', 'Golden Base Pink Trending Tulip Braclet QWJ-187. Crafted for timeless elegance, sparkle, and everyday beauty.', 956, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1967-78-751962-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-78-751962-product-1.webp', NULL, 0, 0, 0, 'Golden Base Pink Trending Tulip Braclet QWJ-187 | Ruby''s.pk', 'Golden Base Pink Trending Tulip Braclet QWJ-187. Crafted for timeless elegance, sparkle, and everyday beauty.', datetime('now')),
('p-jw-20', 'Turkish-Inspired Men''s Ring Set of 3 Silver Plated Black Turquoise Red', 'turkish-inspired-mens-ring-set-of-3-silver-plated-black-turquoise-red', 'MKZ-446645-446645001', 'These Turkish-inspired rings are the perfect addition to any man’s wardrobe, offering bold style without compromising on comfort. Designed for everyday wear or special occasions, they blend traditional craftsmanship with modern flair, making them ideal for weddings, office settings, or casual outings. The silver-plated alloy ensures durability and resistance to tarnish, while the vibrant gemstones—black onyx, turquoise, and deep red—add a touch of elegance that stands out. Each ring is intricately detailed with ornate patterns, reflecting the rich cultural heritage of Turkish design. Whether you’re looking to upgrade your jewelry collection or gift something meaningful, this set delivers premium quality at the best price in Pakistan.

- Durable silver-plated alloy construction for long-lasting wear

- Three distinct gemstone colors: black, turquoise, and red

- Intricate Turkish-inspired designs with detailed engravings

- Easy to wear and comfortable fit for daily use

- Stylish and versatile—perfect for any occasion

- New arrival with premium quality craftsmanship

Keep your rings dry and away from chemicals for optimal longevity. Store them separately in a soft pouch to prevent scratches. Minor color variations may occur due to lighting or screen settings.

· Material: Alloy · Plating: Silver Plated · Stone: Gemstone · Gender Type: Men · Stone Color: Black, Turquoise, Red · Product Design: Turkish Design · Product Feature: Unique Design, Easy To Wear · Number Of Pieces: 3 Pcs · Color: Silver · Package Includes: 3 x Rings Set · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ1013200013ZBSP', 'These Turkish-inspired rings are the perfect addition to any man’s wardrobe, offering bold style without compromising on comfort.', 588, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1013-44-446645-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-44-446645-product-1.jpg', NULL, 0, 0, 0, 'Turkish-Inspired Men''s Ring Set of 3 Silver Plated Black Turquoise Red | Ruby''s.pk', 'These Turkish-inspired rings are the perfect addition to any man’s wardrobe, offering bold style without compromising on comfort.', datetime('now')),
('p-jw-21', 'Couple''s Ring 1', 'couples-ring-1', 'MKZ-775217', '· Material: Stainless Steel · Number Of Pieces: 1 Pc · Color: Silver · Package Includes: · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ2433200048PESS', 'Couple''s Ring 1. Crafted for timeless elegance, sparkle, and everyday beauty.', 961, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/2433-44-MZ2433200048PESS-775217001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2433-44-MZ2433200048PESS-775217001-product-1.webp', NULL, 0, 0, 0, 'Couple''s Ring 1 | Ruby''s.pk', 'Couple''s Ring 1. Crafted for timeless elegance, sparkle, and everyday beauty.', datetime('now')),
('p-jw-22', 'Modern Look Turkish Design Men''s Ring', 'modern-look-turkish-design-mens-ring', 'MKZ-762349', '· Material: Alloy · Gender Type: Men · Product Design: Turkish Design · Product Feature: Easy To Wear · Number Of Pieces: 1 Pc · Color: White · Package Includes: · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ1119204002BYBR', 'Modern Look Turkish Design Men''s Ring. Crafted for timeless elegance, sparkle, and everyday beauty.', 1150, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1119-44-MZ1119204002BYBR-762349001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-44-MZ1119204002BYBR-762349001-product-1.webp', NULL, 0, 0, 0, 'Modern Look Turkish Design Men''s Ring | Ruby''s.pk', 'Modern Look Turkish Design Men''s Ring. Crafted for timeless elegance, sparkle, and everyday beauty.', datetime('now')),
('p-jw-23', 'Adjustable Maroon Ring for Women Wedding Eid Daily Wear', 'adjustable-maroon-ring-for-women-wedding-eid-daily-wear', 'MKZ-687242-687242001', 'Looking for a ring that matches your style and lasts through daily wear? This adjustable ring is perfect for Pakistani brides, partygoers, and fashion lovers who want something elegant yet practical. Designed for both traditional and modern occasions, it’s ideal for weddings, Eid, or daily wear — and it’s made to stay beautiful without losing its shape.

Crafted from durable casting material, this ring is built to withstand everyday use while keeping its sleek maroon finish. The adjustable design ensures a comfortable fit for any finger, making it a thoughtful gift or personal accessory. Whether you’re dressing for a festive gathering or a formal event, its stylish look and sturdy construction make it a smart choice. Plus, it’s a new arrival — so you’re getting the latest trend at the best price in Pakistan.

- Adjustable size for perfect fit

- Made from durable casting material

- Rich maroon color for bold elegance

- Ideal for weddings, Eid, and daily wear

- Lightweight and comfortable to wear

- Comes in a single pack for easy gifting

· Material: Casting · Number Of Pieces: 1 Pc · Color: Maroon · Package Includes: 1 x Adjustable Ring · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ43500000189MCJY', 'Looking for a ring that matches your style and lasts through daily wear?', 588, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/435-44-687242-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-44-687242-product-1.webp', NULL, 0, 0, 0, 'Adjustable Maroon Ring for Women Wedding Eid Daily Wear | Ruby''s.pk', 'Looking for a ring that matches your style and lasts through daily wear?', datetime('now')),
('p-jw-24', 'Maroon Adjustable Ring for Women Wedding & Party Wear', 'maroon-adjustable-ring-for-women-wedding-party-wear', 'MKZ-687247-687247001', 'Looking for a ring that matches your style and lasts through daily wear? This adjustable ring is perfect for Pakistani brides, partygoers, and fashion lovers who want something elegant yet practical. Designed for both traditional and modern occasions, it’s ideal for weddings, Eid, or daily wear — and it’s made to stay beautiful without losing its shape.

Crafted from durable casting material, this ring is built to withstand everyday use while keeping its sleek maroon finish. The adjustable design ensures a perfect fit for any finger, making it a thoughtful gift or personal accessory. Whether you’re dressing for a festive gathering or a formal event, its stylish look and sturdy construction make it a smart choice. Plus, it’s lightweight and comfortable to wear, so you can enjoy it all day without worry.

- Adjustable size for perfect fit

- Made from durable casting material

- Stylish maroon color for any occasion

- Ideal for weddings, Eid, and daily wear

- Lightweight and comfortable to wear

- Comes in a single pack with no extra accessories

· Material: Casting · Number Of Pieces: 1 Pc · Color: Maroon · Package Includes: 1 x Adjustable Ring · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ43500000193MCJY', 'Looking for a ring that matches your style and lasts through daily wear?', 650, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/435-44-687247-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-44-687247-product-1.webp', NULL, 0, 0, 0, 'Maroon Adjustable Ring for Women Wedding & Party Wear | Ruby''s.pk', 'Looking for a ring that matches your style and lasts through daily wear?', datetime('now')),
('p-jw-25', 'Rings Set', 'rings-set', 'MKZ-765350-765350001', '· Material: Alloy · Number Of Pieces: 4 Pcs · Size: Standard Size · Color: Multicolor · Package Includes: 1 x Adjustable Rings Set · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ2986200053RAZE', 'Rings Set. Crafted for timeless elegance, sparkle, and everyday beauty.', 1160, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/2986-44-MZ2986200053RAZE-765350001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2986-44-MZ2986200053RAZE-765350001-product-1.webp', NULL, 0, 0, 0, 'Rings Set | Ruby''s.pk', 'Rings Set. Crafted for timeless elegance, sparkle, and everyday beauty.', datetime('now')),
('p-jw-26', 'Men''s Ring', 'mens-ring', 'MKZ-773708-773708001', '· Material: Stainless Steel · Gender Type: Men · Number Of Pieces: 1 Pc · Color: Silver · Package Includes: · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ2433200035PESS', 'Men''s Ring. Crafted for timeless elegance, sparkle, and everyday beauty.', 461, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/2433-44-MZ2433200035PESS-773708001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2433-44-MZ2433200035PESS-773708001-product-1.webp', NULL, 0, 0, 0, 'Men''s Ring | Ruby''s.pk', 'Men''s Ring. Crafted for timeless elegance, sparkle, and everyday beauty.', datetime('now')),
('p-jw-27', '10-Piece Silver Plated Ring Set for Women', '10-piece-silver-plated-ring-set-for-women', 'MKZ-71222-71222001', 'Add a touch of modern elegance to your everyday look with this stunning 10-piece silver plated ring set, perfect for Pakistani women who love versatile, stylish accessories. Whether you’re dressing for work, a casual outing, or a special occasion, these rings effortlessly elevate any outfit. Designed with both Western and Korean-inspired trends, they offer endless styling options for your fingers.

Crafted from durable alloy with a lustrous silver plating, each ring is built to last while maintaining its sleek, shiny finish. The set includes a mix of minimalist bands, twisted designs, and wavy patterns, allowing you to create unique looks by stacking or wearing them individually. The silver plating resists tarnishing for longer wear, and the alloy base ensures strength and comfort. Ideal for gifting or personal use, this set delivers premium quality at the best price in Pakistan.

- Complete Set: 10 distinct silver plated rings for endless styling.

- Material: High-quality alloy base with elegant silver plating.

- Style: Blends contemporary Western and trendy Korean designs.

- Sizing: Available in sizes 15, 16, 17, 18 for a comfortable fit.

- Versatility: Perfect for stacking or wearing alone for diverse looks.

- Durability: Silver plated alloy resists wear and maintains shine.

· 10 Pcs Rings · Base Metal: Alloy · Plating: Silver · Sizing: 15 16 17 18 · Type: Western and Korean Style · Helpful Info: Keep Jewelry Away From Water and Chemicals · Remove During Physical Activities · Store Separately in a Soft Pouch · Product Code: MZ13700036SOMJW', 'Add a touch of modern elegance to your everyday look with this stunning 10-piece silver plated ring set, perfect for Pakistani women who love versa...', 588, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/148-11276-71222-product-2.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F148-11276-71222-product-2.jpg', NULL, 0, 0, 0, '10-Piece Silver Plated Ring Set for Women | Ruby''s.pk', 'Add a touch of modern elegance to your everyday look with this stunning 10-piece silver plated ring set, perfect for Pakistani women who love versa...', datetime('now')),
('p-jw-28', 'Bridal Antique Plated Artificial Stones Earrings', 'bridal-antique-plated-artificial-stones-earrings', 'MKZ-769169-769169001', '· Material: Metal · Plating: Antique Plated · Stone: Artificial Stones · Gender Type: Women · Stone Color: Golden · Product Design: Bridal · Product Feature: Unique Design, Jewellery Deal · Number Of Pieces: 10 Pcs · Size: Free Size · Color: Golden · Package Includes: 10 x Earrings · Size Dimensions: 5 Grams · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ3213200054JYPE', 'Bridal Antique Plated Artificial Stones Earrings. Crafted for timeless elegance, sparkle, and everyday beauty.', 1200, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/3213-42-MZ3213200054JYPE-769169001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3213-42-MZ3213200054JYPE-769169001-product-1.webp', NULL, 0, 0, 0, 'Bridal Antique Plated Artificial Stones Earrings | Ruby''s.pk', 'Bridal Antique Plated Artificial Stones Earrings. Crafted for timeless elegance, sparkle, and everyday beauty.', datetime('now')),
('p-jw-29', 'Black Swan Earrings for Women, Hypoallergenic, Sparkling, 2 Pcs', 'black-swan-earrings-for-women-hypoallergenic-sparkling-2-pcs', 'MKZ-710157', 'These elegant swan earrings are the perfect blend of sophistication and style for any Pakistani woman. Designed with intricate detail, they add a touch of glamour to your everyday look or elevate your outfit for special occasions. Whether you’re heading to a wedding, office event, or simply want to feel more confident, these stylish studs make a bold yet graceful statement. Made from premium quality alloy, they are built to last and won’t tarnish easily, even with daily wear. The sleek black finish with sparkling accents catches the light beautifully, making them a standout accessory for any skin tone or outfit. You’ll love how durable and comfortable they are, thanks to their lightweight design and secure stud backing.

These are the best price in Pakistan for such premium quality jewelry. The design is inspired by the iconic black swan, symbolizing grace and elegance. The alloy material ensures durability and resistance to corrosion, making them ideal for daily wear. The earrings come in a pack of two matching studs, perfect for pairing with your favorite outfits. They are lightweight, hypoallergenic, and designed for comfort. Store them separately in a soft pouch to maintain their shine and prevent scratches.

- Premium quality alloy material for long-lasting durability

- Stylish black swan design with sparkling accents

- Lightweight and comfortable for all-day wear

- Perfect for daily wear, weddings, or office events

- Hypoallergenic and safe for sensitive ears

- Comes with 2 matching studs in a secure package

· Material: Alloy · Gender Type: Women · Number Of Pieces: 2 Pcs · Color: Red, Black, White · Package Includes: 2 x Studs · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ1967200020JRCS', 'These elegant swan earrings are the perfect blend of sophistication and style for any Pakistani woman.', 619, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1967-42-710157-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-710157-product-1.webp', NULL, 0, 0, 0, 'Black Swan Earrings for Women, Hypoallergenic, Sparkling, 2 Pcs | Ruby''s.pk', 'These elegant swan earrings are the perfect blend of sophistication and style for any Pakistani woman.', datetime('now')),
('p-jw-30', 'Pearl Stud Earrings Gold Square Frame Pakistan', 'pearl-stud-earrings-gold-square-frame-pakistan', 'MKZ-709748', 'These elegant pearl stud earrings are the perfect blend of classic charm and modern design, making them ideal for any occasion from daily wear to special events. The golden square frame with a textured, hammered finish adds a touch of sophistication that complements your outfit effortlessly. Whether you’re dressing up for a wedding, office meeting, or a casual outing, these earrings will elevate your look without overwhelming it. Designed with comfort and style in mind, they’re a must-have for every Pakistani woman’s jewelry box.

Crafted from lightweight yet durable alloy, these earrings are built to last. The golden finish is not only stylish but also resistant to tarnishing, keeping your accessories looking fresh for longer. The pearl center adds a soft, luminous glow that catches the light beautifully. Perfect for those who love timeless pieces with a contemporary twist, these earrings are a smart investment. With their premium quality and best price in Pakistan, you’re getting unmatched value without compromising on durability or elegance.

- Lightweight alloy construction for all-day comfort

- Golden textured square frame with a chic hammered finish

- Classic pearl center for timeless elegance

- Pack of 2 matching earrings for complete symmetry

- Ideal for daily wear, office, or evening events

- Easy to care for: keep dry, store in soft pouch to maintain shine

· Material: Alloy · Gender Type: Women · Number Of Pieces: 2 Pcs · Color: Golden · Package Includes: 2 x Earrings · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ1967200014JRCS', 'These elegant pearl stud earrings are the perfect blend of classic charm and modern design, making them ideal for any occasion from daily wear to s...', 611, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1967-42-709748-product-1968.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-709748-product-1968.webp', NULL, 0, 0, 0, 'Pearl Stud Earrings Gold Square Frame Pakistan | Ruby''s.pk', 'These elegant pearl stud earrings are the perfect blend of classic charm and modern design, making them ideal for any occasion from daily wear to s...', datetime('now')),
('p-jw-31', 'Gold Silver Leaf Chain Ear Cuff Earrings Pair 2PCS', 'gold-silver-leaf-chain-ear-cuff-earrings-pair-2pcs', 'MKZ-82610', 'These stunning leaf chain earrings are the perfect blend of modern elegance and effortless style, ideal for Pakistani women who want to elevate their look without needing multiple piercings. Designed with a secure clip-on mechanism, they’re comfortable for daily wear and perfect for weddings, parties, or office settings. The gold and silver tones offer versatile pairing options with any outfit, while the delicate leaf charms add a touch of nature-inspired charm. Crafted from durable alloy, these earrings are built to withstand everyday use and maintain their lustrous finish, making them a smart investment for your jewelry collection.

The innovative chain design ensures a secure fit without the need for traditional ear piercings, making them suitable for all ages and occasions. The adjustable size ensures a comfortable fit for most ear shapes. The leaf charm adds a unique, fashionable flair that’s both trendy and timeless. These earrings are lightweight, hypoallergenic, and perfect for layering with other accessories. They’re also easy to clean and maintain, ensuring they stay beautiful for years to come.

- Premium Quality Alloy Construction

- Stylish Gold and Silver Plated Finish

- Adjustable Fit for All Ear Shapes

- Durable Design for Long-Lasting Shine

- Perfect for Weddings, Parties, and Daily Wear

- New Arrival with Best Price in Pakistan

· Pair of Elegant Earrings · Base Metal: Alloy · Select Color: Silver Golden · Size: Adjustable · Type: Western and Korean Style · Helpful Info: Keep Jewelry Away From Water and Chemicals · Remove During Physical Activities · Store Separately in a Soft Pouch · Product Code: MZ13700064SOMJW', 'These stunning leaf chain earrings are the perfect blend of modern elegance and effortless style, ideal for Pakistani women who want to elevate the...', 500, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/148-13571-82610-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F148-13571-82610-product-1.jpeg', NULL, 0, 0, 0, 'Gold Silver Leaf Chain Ear Cuff Earrings Pair 2PCS | Ruby''s.pk', 'These stunning leaf chain earrings are the perfect blend of modern elegance and effortless style, ideal for Pakistani women who want to elevate the...', datetime('now')),
('p-jw-32', 'Golden Jhumka Earrings for Women 2 Pcs', 'golden-jhumka-earrings-for-women-2-pcs', 'MKZ-729674-729674001', 'These Golden Jhumka Earrings feature a gold-plated design with crystal stones and colorful jhumkas.

Designed for women, these earrings are suitable for various festive occasions.

- Golden plating

- Crystal stones

- 2 Pcs set

- Easy To Wear

- Fancy design

· Material: Alloy · Plating: Gold Plated · Stone: Crystal · Gender Type: Women · Product Design: Fancy · Product Feature: Easy To Wear · Number Of Pieces: 2 Pcs · Color: Golden · Package Includes: 2 x Jhumka · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ1119203180BYBR', 'These Golden Jhumka Earrings feature a gold-plated design with crystal stones and colorful jhumkas.', 836, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1119-42-729674-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-42-729674-product-1.webp', NULL, 0, 0, 0, 'Golden Jhumka Earrings for Women 2 Pcs | Ruby''s.pk', 'These Golden Jhumka Earrings feature a gold-plated design with crystal stones and colorful jhumkas.', datetime('now')),
('p-jw-33', 'Gold Plated Crystal Earrings for Women 2 Pcs', 'gold-plated-crystal-earrings-for-women-2-pcs', 'MKZ-727857-727857001', 'These stunning earrings are perfect for any Pakistani woman looking to add a touch of elegance to her everyday look or special occasions. Designed with a modern aesthetic, they feature a golden alloy base with sparkling crystal stones that catch the light beautifully. Ideal for weddings, parties, or office wear, these earrings are both stylish and durable, making them a smart investment for your jewelry collection.

Crafted with premium quality materials, these earrings are built to last. The gold plating resists tarnishing, and the crystal stones are securely set to withstand daily wear. The design is lightweight yet sturdy, ensuring comfort all day long. Whether you’re shopping for yourself or as a gift, these are among the best price in Pakistan for such exquisite craftsmanship.

- Modern design with golden alloy base and sparkling crystal stones

- Durable gold plating that resists fading and tarnishing

- Lightweight and comfortable for all-day wear

- Perfect for weddings, parties, or office settings

- Comes in a 2-piece set for balanced elegance

- Ideal gift for birthdays, Eid, or any special occasion

· Material: Alloy · Plating: Gold Plated · Stone: Crystal · Gender Type: Women · Product Design: Modern Design · Number Of Pieces: 2 Pcs · Color: Golden · Package Includes: 12 x Earrings · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ1119203097BYBR', 'These stunning earrings are perfect for any Pakistani woman looking to add a touch of elegance to her everyday look or special occasions.', 775, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1119-42-727857-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-42-727857-product-1.webp', NULL, 0, 0, 0, 'Gold Plated Crystal Earrings for Women 2 Pcs | Ruby''s.pk', 'These stunning earrings are perfect for any Pakistani woman looking to add a touch of elegance to her everyday look or special occasions.', datetime('now')),
('p-jw-34', 'Long Pearl Drop Earrings for Women, Graduated Design, Durable Metal, Lightweight, Wedding Party Wear, Eid, Birthday', 'long-pearl-drop-earrings-for-women-graduated-design-durable-metal-lightweight-wedding-party-wear-eid-birthday', 'MKZ-82618-82618001', 'These long pearl drop earrings are the perfect blend of elegance and modern style, ideal for Pakistani women who want to look chic for weddings, parties, or even office wear. The graduated pearl design adds a touch of sophistication while staying trendy, making them a versatile addition to any jewelry collection. Crafted with premium quality imitation pearls and a durable metal setting, they are built to last without compromising on comfort. Lightweight and easy to wear, they stay secure all day long, whether you’re out shopping or attending a special event.

These earrings are not just stylish—they’re practical too. The high-quality materials ensure they won’t tarnish or break easily, even with daily use. The Korean-inspired design is perfect for those who love contemporary fashion with a classic twist. Whether you’re dressing up for Eid, a birthday, or just adding a little glam to your daily outfit, these earrings deliver timeless beauty at a best price in Pakistan.

- Stylish long pearl drop design with graduated sizes

- Durable metal setting for long-lasting wear

- Lightweight and comfortable for all-day use

- Perfect for weddings, parties, and festive occasions

- Combines Western elegance with trendy Korean style

- Ideal for Pakistani women seeking affordable fashion jewelry

· Round Pearl Drop Earrings For Girls · Base Metal: Pearls · Size: Adjustable · Type: Western and Korean Style · Helpful Info: Keep Jewelry Away From Water and Chemicals · Remove During Physical Activities · Store Separately in a Soft Pouch · Product Code: MZ13700071SOMJW', 'These long pearl drop earrings are the perfect blend of elegance and modern style, ideal for Pakistani women who want to look chic for weddings, pa...', 588, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/148-13572-82618-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F148-13572-82618-product-1.jpeg', NULL, 0, 0, 0, 'Long Pearl Drop Earrings for Women, Graduated Design, Durable Metal, Lightweight, Wedding Party Wear, Eid, Birthday | Ruby''s.pk', 'These long pearl drop earrings are the perfect blend of elegance and modern style, ideal for Pakistani women who want to look chic for weddings, pa...', datetime('now')),
('p-jw-35', 'Bridal Mehndi Jewellery Set Necklace Earing Kara Bangles Set', 'bridal-mehndi-jewellery-set-necklace-earing-kara-bangles-set', 'MKZ-761257-761257001', '· Material: Alloy · Gender Type: Women · Product Design: Bridal · Product Feature: Unique Design · Number Of Pieces: 1 Pc · Color: Multicolor · Package Includes: 1 x Bridal Set · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ1119203944BYBR', 'Bridal Mehndi Jewellery Set Necklace Earing Kara Bangles Set. Crafted for timeless elegance, sparkle, and everyday beauty.', 1275, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1119-41-MZ1119203944BYBR-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-41-MZ1119203944BYBR-product-1.webp', NULL, 0, 0, 0, 'Bridal Mehndi Jewellery Set Necklace Earing Kara Bangles Set | Ruby''s.pk', 'Bridal Mehndi Jewellery Set Necklace Earing Kara Bangles Set. Crafted for timeless elegance, sparkle, and everyday beauty.', datetime('now')),
('p-jw-36', 'Elegant Bridal Jewelry Set with Sparkling Stones', 'elegant-bridal-jewelry-set-with-sparkling-stones', 'MKZ-661543-661543001', 'This stunning bridal jewelry set is perfect for Pakistani brides and grooms looking for elegant, durable accessories for their special day. Designed to complement your traditional or modern wedding attire, this set shines brilliantly under any lighting, making you stand out with timeless grace. Whether you’re attending a wedding, engagement party, or formal event, this set ensures you look sophisticated and confident.

Crafted with premium quality materials, this jewelry set is built to last. The intricate design features sparkling stones that catch the light beautifully, while the durable metal ensures it won’t tarnish or break easily. The set includes a necklace, earrings, and matching rings, all designed to match seamlessly for a complete look. Ideal for daily use or special occasions, this set is a smart investment for any woman who values both style and longevity.

- Premium quality materials for long-lasting beauty

- Stylish design perfect for weddings and formal events

- Durable construction to withstand daily wear

- New arrival with best price in Pakistan

- Includes necklace, earrings, and matching rings

- Elegant white finish that complements any outfit

· Type: Suit Set · Material: Lace · Gender: Women · Occasion: Wedding. · Product Code: MZCHYHAM9192', 'This stunning bridal jewelry set is perfect for Pakistani brides and grooms looking for elegant, durable accessories for their special day.', 1610, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1257-41-661543-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-661543-product-1.webp', NULL, 0, 0, 0, 'Elegant Bridal Jewelry Set with Sparkling Stones | Ruby''s.pk', 'This stunning bridal jewelry set is perfect for Pakistani brides and grooms looking for elegant, durable accessories for their special day.', datetime('now')),
('p-jw-37', 'Golden Badam Patti Necklace Set for Women', 'golden-badam-patti-necklace-set-for-women', 'MKZ-683149-683149001', 'This stunning Badam patti necklace set is crafted with premium quality materials to ensure durability and timeless elegance. Perfect for Pakistani brides, grooms, and fashion-forward women, it’s ideal for weddings, parties, or daily wear. The golden finish and intricate floral design make it a stylish statement piece that enhances any outfit. With its durable construction, this set will remain beautiful for years, making it the best price in Pakistan for such exquisite jewelry.

The necklace features a detailed floral motif with sparkling stones that catch the light beautifully, while the matching earrings and bindi complete the ensemble. Made from high-quality casting material, it’s designed to withstand daily wear without losing its shine. The set is lightweight yet sturdy, ensuring comfort during long events. Its elegant design suits both traditional and modern occasions, helping you groom your personality with confidence.

- Four-piece set includes necklace, earrings, bindi, and dori

- Premium quality casting material for long-lasting durability

- Golden color with white stone accents for a classic look

- Stylish floral design perfect for weddings and parties

- Ideal gift for special occasions or personal use

- Easy to care for with proper storage in a soft pouch

· Material: Casting · Number Of Pieces: 4 Pcs · Color: Golden · Package Includes: 1 x Necklace Set · Necklace Set With Earrings and Bindia and dori · Best for Gifts · Quality & Long Lasting Material · Artificial High-Quality Stylish · Excellent Finishing Quality · Quality Material · Alsi white color combo · Latest Style · No Side Effects · Groom Your Personality · Occasions: Party / Wedding / Anniversary / Engagement/ Daily Wearing/ Gifts etc. · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ1779200052GRCN', 'This stunning Badam patti necklace set is crafted with premium quality materials to ensure durability and timeless elegance.', 1229, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1779-41-683149-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1779-41-683149-product-1.webp', NULL, 0, 0, 0, 'Golden Badam Patti Necklace Set for Women | Ruby''s.pk', 'This stunning Badam patti necklace set is crafted with premium quality materials to ensure durability and timeless elegance.', datetime('now')),
('p-jw-38', '2 Layered Gold Plated Zircon Necklace Set', '2-layered-gold-plated-zircon-necklace-set', 'MKZ-761045-761045001', '· Material: Casting · Plating: Gold Plated · Stone: Zircon · Gender Type: Women · Stone Color: Golden · Product Design: 2 Layered · Product Feature: Unique Design · Number Of Pieces: 4 Pcs · Size: Standard Size · Color: Golden · Package Includes: 1 x Necklace Set · Size Dimensions: 42 Cm · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ3193200002AACN', '2 Layered Gold Plated Zircon Necklace Set. Crafted for timeless elegance, sparkle, and everyday beauty.', 2086, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/3193-41-MZ3193200002AACN-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3193-41-MZ3193200002AACN-product-1.webp', NULL, 0, 0, 0, '2 Layered Gold Plated Zircon Necklace Set | Ruby''s.pk', '2 Layered Gold Plated Zircon Necklace Set. Crafted for timeless elegance, sparkle, and everyday beauty.', datetime('now')),
('p-jw-39', 'Gold Plated Choker Set with Maroon White Stones for Women', 'gold-plated-choker-set-with-maroon-white-stones-for-women', 'MKZ-416445', 'Looking for a stunning yet affordable jewelry set that turns heads without breaking the bank? This modern gold-plated choker set is perfect for Pakistani brides, partygoers, and fashion lovers who want to look elegant without compromising on style. Designed for everyday wear or special occasions, it’s ideal for weddings, office events, or festive gatherings where you want to shine with confidence.

Crafted with durable casting material and premium gold plating, this set resists tarnishing and maintains its luster even with regular use. The artificial stones add a touch of glamour without the weight or fragility of real gems, making it comfortable for long wear. The modern design blends effortlessly with traditional and contemporary outfits, while the multicolor stones — maroon, white, and gold — offer a bold yet balanced look. Whether you’re dressing for a wedding or a night out, this set delivers both beauty and practicality.

- Gold plated for a luxurious shine that lasts

- Artificial stones for vibrant color and durability

- Modern design with a chic, contemporary appeal

- Easy to wear and perfect for all occasions

- Comes in a secure box with bubble wrap for safe delivery

- Includes 3 pieces in one elegant set

· Material: Casting · Plating: Gold Plated · Stone: Artificial Stones · Product Design: Modern Design · Product Feature: Easy To Wear, Product Packaging Type: Packed In A Box Including Bubble Wrap For Safety · Number Of Pieces: 3 Pcs · Color: Multicolor, Maroon, White · Package Includes: 1 x Choker Set · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ43520114MCJY', 'Looking for a stunning yet affordable jewelry set that turns heads without breaking the bank?', 2038, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/435-41-416445-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-41-416445-product-1.jpg', NULL, 0, 0, 0, 'Gold Plated Choker Set with Maroon White Stones for Women | Ruby''s.pk', 'Looking for a stunning yet affordable jewelry set that turns heads without breaking the bank?', datetime('now')),
('p-jw-40', 'Turtle Jewelry Set Turquoise Antiques for Women', 'turtle-jewelry-set-turquoise-antiques-for-women', 'MKZ-664243', 'This elegant turtle-themed jewelry set is perfect for Pakistani women who love to accessorize with unique, culturally inspired pieces. Whether you’re dressing for a casual day out or a special occasion, this set adds a touch of vintage charm that suits any outfit. Designed with durable, high-quality materials, it’s built to last through daily wear and easy maintenance, making it ideal for busy lifestyles.

The set includes a necklace, bracelet, and earrings, all featuring vibrant turquoise stones set in an antique silver finish. The intricate turtle design brings a sense of timeless beauty and luck, while the retro style appeals to both young and mature fashionistas. The materials used are resistant to tarnish and corrosion, ensuring your jewelry stays fresh and stylish for years. The design is versatile enough for office wear, parties, or even traditional gatherings.

- Premium quality materials for long-lasting beauty

- Stylish retro design with turquoise stones

- Durable construction for everyday use

- Easy to clean and maintain

- Perfect for daily wear or special events

- New arrival with best price in Pakistan

· Target: Universal Use · Type: Quality Product · Quality: Premium Materials · Care: Easy Maintenance. · Product Code: MZCHYHAM9580', 'This elegant turtle-themed jewelry set is perfect for Pakistani women who love to accessorize with unique, culturally inspired pieces.', 1208, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1257-41-664243-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-664243-product-1.webp', NULL, 0, 0, 0, 'Turtle Jewelry Set Turquoise Antiques for Women | Ruby''s.pk', 'This elegant turtle-themed jewelry set is perfect for Pakistani women who love to accessorize with unique, culturally inspired pieces.', datetime('now')),
('p-jw-41', 'Elegant Pearl & Crystal Pendant Necklace Set with Matching Earrings – Premium Fashion Jewellery', 'elegant-pearl-crystal-pendant-necklace-set-with-matching-earrings-premium-fashion-jewellery', 'MKZ-756696', 'Add a touch of elegance to your look with this beautiful pearl and crystal jewellery set. Featuring delicate pearl strands, sparkling stones, and eye-catching amber teardrop accents, this set gives a luxurious and graceful appearance. Perfect for weddings, parties, festive occasions, engagements, and special events.

· Material: Alloy · Plating: Gold Plated · Stone: Artificial Stones · Gender Type: Women · Stone Color: White · Product Design: Funky · Product Feature: Product Packaging Type: Packed In A Box Including Bubble Wrap For Safety · Number Of Pieces: 1 Pc · Size: Standard Size, Adjustable · Color: Golden · Package Includes: 1 x Mala · Size Dimensions: 25 Cm · ? Elegant & attractive premium design · ? Beautiful pearl detailing · ? Sparkling crystal-style stones · ? Stunning amber teardrop accents · ? Necklace with matching earrings · ? Perfect for weddings & parties · ? Great choice for gifting · ? Adds a classy and glamorous touch to any outfit', 'Add a touch of elegance to your look with this beautiful pearl and crystal jewellery set.', 1961, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/2361-40-756696-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2361-40-756696-product-1.webp', NULL, 0, 0, 0, 'Elegant Pearl & Crystal Pendant Necklace Set with Matching Earrings – Premium Fashion Jewellery | Ruby''s.pk', 'Add a touch of elegance to your look with this beautiful pearl and crystal jewellery set.', datetime('now')),
('p-jw-42', 'Heartbeat Design Silver Plated Crystal Locket', 'heartbeat-design-silver-plated-crystal-locket', 'MKZ-758281-758281001', 'Add a touch of elegance to your style with this stunning ruby red crystal jewelry set. Featuring a sparkling pendant necklace and matching earrings, this set is beautifully crafted with a silver-plated finish and dazzling crystal accents. Perfect for weddings, parties, engagements, birthdays, and everyday glamour. Its lightweight design ensures comfortable wear while enhancing your look with timel

· Material: Alloy · Plating: Silver Plated · Stone: Crystal · Gender Type: Women · Stone Color: Multicolor · Product Design: Heartbeat Design · Product Feature: Product Packaging Type: Packed In A Box Including Bubble Wrap For Safety · Number Of Pieces: 3 Pcs · Size: Adjustable, Standard Size · Color: Multicolor · Package Includes: 1 x Locket, 1 x Pendant · Size Dimensions: 45 Cm · Elegant Ruby Red Crystal Stone Design · Premium Silver-Plated Finish · Matching Necklace & Earrings Set · Sparkling Crystal Accent Stones · Lightweight & Comfortable to Wear · Perfect for Parties, Weddings & Special Events · Ideal Gift for Women & Girls · Stylish, Durable & Eye-Catching Design', 'Add a touch of elegance to your style with this stunning ruby red crystal jewelry set.', 2836, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/2361-40-757988-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2361-40-757988-product-1.webp', NULL, 0, 0, 0, 'Heartbeat Design Silver Plated Crystal Locket | Ruby''s.pk', 'Add a touch of elegance to your style with this stunning ruby red crystal jewelry set.', datetime('now')),
('p-jw-43', 'Heart Shape Trending Korean Necklace Pendent PTX-961', 'heart-shape-trending-korean-necklace-pendent-ptx-961', 'MKZ-767303', '· Material: Alloy · Number Of Pieces: 1 Pc · Color: Golden · Package Includes: 1 x Pendant · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ1967200113JRCS', 'Heart Shape Trending Korean Necklace Pendent PTX-961. Crafted for timeless elegance, sparkle, and everyday beauty.', 675, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1967-40-MZ1967200113JRCS-767303001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-40-MZ1967200113JRCS-767303001-product-1.webp', NULL, 0, 0, 0, 'Heart Shape Trending Korean Necklace Pendent PTX-961 | Ruby''s.pk', 'Heart Shape Trending Korean Necklace Pendent PTX-961. Crafted for timeless elegance, sparkle, and everyday beauty.', datetime('now')),
('p-jw-44', 'Green Butterfly Stainless Steel - Necklace STX-963', 'green-butterfly-stainless-steel-necklace-stx-963', 'MKZ-767353-767353001', '· Material: Stainless Steel · Number Of Pieces: 1 Pc · Color: Golden · Package Includes: 1 x Necklace · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ1967200115JRCS', 'Green Butterfly Stainless Steel - Necklace STX-963. Crafted for timeless elegance, sparkle, and everyday beauty.', 1150, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1967-40-MZ1967200115JRCS-767353001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-40-MZ1967200115JRCS-767353001-product-1.webp', NULL, 0, 0, 0, 'Green Butterfly Stainless Steel - Necklace STX-963 | Ruby''s.pk', 'Green Butterfly Stainless Steel - Necklace STX-963. Crafted for timeless elegance, sparkle, and everyday beauty.', datetime('now')),
('p-jw-45', 'Chain', 'chain', 'MKZ-781142-781142001', '· Material: Stainless Steel · Number Of Pieces: 1 Pc · Color: Silver · Package Includes: 1 x Chain · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ3515200164UKSE', 'Chain. Crafted for timeless elegance, sparkle, and everyday beauty.', 1188, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/3515-40-MZ3515200133UKSE-780676001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3515-40-MZ3515200133UKSE-780676001-product-2.webp', NULL, 0, 0, 0, 'Chain | Ruby''s.pk', 'Chain. Crafted for timeless elegance, sparkle, and everyday beauty.', datetime('now')),
('p-jw-46', 'Butterfly Design Aluminium Plated Crystal Locket', 'butterfly-design-aluminium-plated-crystal-locket', 'MKZ-781848-781848001', '· Material: Metal · Plating: Aluminium Plated · Stone: Crystal · Gender Type: Women · Stone Color: Black · Product Design: Butterfly Design · Product Feature: Unique Design, Easy To Wear · Number Of Pieces: 5 Pcs · Size: Free Size · Color: Golden · Package Includes: 5 x Necklace · Size Dimensions: 10 Cm · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ3582200002GZCS', 'Butterfly Design Aluminium Plated Crystal Locket. Crafted for timeless elegance, sparkle, and everyday beauty.', 1150, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/3582-40-MZ3582200002GZCS-781848001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3582-40-MZ3582200002GZCS-781848001-product-1.webp', NULL, 0, 0, 0, 'Butterfly Design Aluminium Plated Crystal Locket | Ruby''s.pk', 'Butterfly Design Aluminium Plated Crystal Locket. Crafted for timeless elegance, sparkle, and everyday beauty.', datetime('now')),
('p-jw-47', '2 Layered Gold Plated Pearl Necklace for Women', '2-layered-gold-plated-pearl-necklace-for-women', 'MKZ-731868-731868001', 'Premium Design: Beautifully crafted double-layer design featuring a delicate multi-pearl bar on the top layer and a classic single pearl pendant on the bottom layer. High-Quality Material: Made with durable gold-plated alloy and high-grade imitation glass pearls for a luxurious and long-lasting shine. Adjustable Fit: Comes with a secure lobster clasp and an extension chain, making it perfect for

· Material: Alloy · Plating: Gold Plated · Stone: Beads · Gender Type: Women · Stone Color: White · Product Design: 2 Layered · Product Feature: Beautiful · Number Of Pieces: 1 Pc · Size: Standard Size · Color: White · Package Includes: 1 x Necklace · Size Dimensions: 40 Cm · 2 Layered Gold Plated Beads Necklace · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ60400000233NRSP', 'Premium Design: Beautifully crafted double-layer design featuring a delicate multi-pearl bar on the top layer and a classic single pearl pendant on...', 788, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/604-40-731868-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F604-40-731868-product-1.webp', NULL, 0, 0, 0, '2 Layered Gold Plated Pearl Necklace for Women | Ruby''s.pk', 'Premium Design: Beautifully crafted double-layer design featuring a delicate multi-pearl bar on the top layer and a classic single pearl pendant on...', datetime('now')),
('p-jw-48', 'Stainless Steel Resin Polish Necklace for Men Silver', 'stainless-steel-resin-polish-necklace-for-men-silver', 'MKZ-620273-620273001', 'This sleek silver chain is the perfect blend of modern style and everyday durability, ideal for Pakistani men who want to look sharp for work, parties, or casual outings. Its resin-polished finish gives it a premium, mirror-like shine that lasts, while the stainless steel core ensures it won’t tarnish or break easily — even with daily wear. Whether you’re dressing up for a wedding or keeping it simple for office, this chain adds a touch of class without overpowering your look.

The design is minimalist yet trendy, with a smooth, slightly curved profile that sits comfortably on the neck. The resin polish enhances its resistance to scratches and moisture, making it suitable for Pakistan’s warm climate. It’s lightweight, easy to wear, and doesn’t require special care — just wipe clean with a soft cloth. The chain is crafted for durability and style, making it a smart investment for your jewelry collection.

- Made of high-grade stainless steel for long-lasting wear

- Resin polish finish for a premium, scratch-resistant shine

- Lightweight and comfortable for all-day wear

- Stylish, modern design perfect for any occasion

- Easy to clean and maintain

- Comes in a single piece, ready to wear

· Material: Stainless Steel · Plating: Resin Polish · Product Design: Funky · Product Feature: Easy To Wear · Number Of Pieces: 1 Pc · Size: · Color: Silver · Package Includes: 1 x Chain · Note: Keep jewelry dry, away from chemicals. Store separately in a soft pouch. There might be a slight color difference due to different light and monitor effects. · Product Code: MZ1119200965BYBR', 'This sleek silver chain is the perfect blend of modern style and everyday durability, ideal for Pakistani men who want to look sharp for work, part...', 1150, NULL, NULL, 'cat-jewellery-watches', 'Ruby''s Select', 25, 0, 1, '✨', 'https://www.markaz.app/api/export/image/1119-40-620273-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-40-620273-product-1.jpg', NULL, 0, 0, 0, 'Stainless Steel Resin Polish Necklace for Men Silver | Ruby''s.pk', 'This sleek silver chain is the perfect blend of modern style and everyday durability, ideal for Pakistani men who want to look sharp for work, part...', datetime('now'));

-- Gallery images ---------------------------------------------
INSERT OR IGNORE INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES
('pi-jw-01-1', 'p-jw-01', 'https://www.markaz.app/api/export/image/511-403-411664-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F511-403-411664-product-1.jpg', 'Stackable Jewelry Box Set of 2 Moisture Proof Plastic', 0, 1),
('pi-jw-01-2', 'p-jw-01', 'https://www.markaz.app/api/export/image/511-403-411664-product-2.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F511-403-411664-product-2.jpg', 'Stackable Jewelry Box Set of 2 Moisture Proof Plastic', 1, 0),
('pi-jw-01-3', 'p-jw-01', 'https://www.markaz.app/api/export/image/511-403-411664-product-3.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F511-403-411664-product-3.jpg', 'Stackable Jewelry Box Set of 2 Moisture Proof Plastic', 2, 0),
('pi-jw-01-4', 'p-jw-01', 'https://www.markaz.app/api/export/image/511-403-411664-product-1-withcode.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F511-403-411664-product-1-withcode.jpg', 'Stackable Jewelry Box Set of 2 Moisture Proof Plastic', 3, 0),
('pi-jw-02-1', 'p-jw-02', 'https://www.markaz.app/api/export/image/3148-403-MZ3148200033PMHEAY-768993001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3148-403-MZ3148200033PMHEAY-768993001-product-1.webp', 'Jewellery Organizer Case Fashion Portable', 0, 1),
('pi-jw-02-2', 'p-jw-02', 'https://www.markaz.app/api/export/image/3148-403-MZ3148200033PMHEAY-768993001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3148-403-MZ3148200033PMHEAY-768993001-product-2.webp', 'Jewellery Organizer Case Fashion Portable', 1, 0),
('pi-jw-02-3', 'p-jw-02', 'https://www.markaz.app/api/export/image/3148-403-MZ3148200033PMHEAY-768993001-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3148-403-MZ3148200033PMHEAY-768993001-product-3.webp', 'Jewellery Organizer Case Fashion Portable', 2, 0),
('pi-jw-02-4', 'p-jw-02', 'https://www.markaz.app/api/export/image/3148-403-MZ3148200033PMHEAY-768993001-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3148-403-MZ3148200033PMHEAY-768993001-product-4.webp', 'Jewellery Organizer Case Fashion Portable', 3, 0),
('pi-jw-02-5', 'p-jw-02', 'https://www.markaz.app/api/export/image/3148-403-MZ3148200033PMHEAY-768993001-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3148-403-MZ3148200033PMHEAY-768993001-product-5.webp', 'Jewellery Organizer Case Fashion Portable', 4, 0),
('pi-jw-03-1', 'p-jw-03', 'https://www.markaz.app/api/export/image/1787-403-668881-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1787-403-668881-product-1.webp', 'Compact Leather Jewelry Box Multicolor Zipper Closure 10x10x5cm', 0, 1),
('pi-jw-03-2', 'p-jw-03', 'https://www.markaz.app/api/export/image/1787-403-668881-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1787-403-668881-product-2.webp', 'Compact Leather Jewelry Box Multicolor Zipper Closure 10x10x5cm', 1, 0),
('pi-jw-03-3', 'p-jw-03', 'https://www.markaz.app/api/export/image/1787-403-668881-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1787-403-668881-product-3.webp', 'Compact Leather Jewelry Box Multicolor Zipper Closure 10x10x5cm', 2, 0),
('pi-jw-03-4', 'p-jw-03', 'https://www.markaz.app/api/export/image/1787-403-668881-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1787-403-668881-product-4.webp', 'Compact Leather Jewelry Box Multicolor Zipper Closure 10x10x5cm', 3, 0),
('pi-jw-03-5', 'p-jw-03', 'https://www.markaz.app/api/export/image/1787-403-668881-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1787-403-668881-product-5.webp', 'Compact Leather Jewelry Box Multicolor Zipper Closure 10x10x5cm', 4, 0),
('pi-jw-03-6', 'p-jw-03', 'https://www.markaz.app/api/export/image/1787-403-668881-product-6.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1787-403-668881-product-6.webp', 'Compact Leather Jewelry Box Multicolor Zipper Closure 10x10x5cm', 5, 0),
('pi-jw-03-7', 'p-jw-03', 'https://www.markaz.app/api/export/image/1787-403-668881-product-7.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1787-403-668881-product-7.webp', 'Compact Leather Jewelry Box Multicolor Zipper Closure 10x10x5cm', 6, 0),
('pi-jw-03-8', 'p-jw-03', 'https://www.markaz.app/api/export/image/1787-403-668881-product-8.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1787-403-668881-product-8.webp', 'Compact Leather Jewelry Box Multicolor Zipper Closure 10x10x5cm', 7, 0),
('pi-jw-03-9', 'p-jw-03', 'https://www.markaz.app/api/export/image/1787-403-668881-product-9.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1787-403-668881-product-9.webp', 'Compact Leather Jewelry Box Multicolor Zipper Closure 10x10x5cm', 8, 0),
('pi-jw-04-1', 'p-jw-04', 'https://www.markaz.app/api/export/image/239-278-530645-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-530645-product-1.jpg', 'Stunning Silver Plated Anklet Pair - 2 Pcs Adjustable Design', 0, 1),
('pi-jw-04-2', 'p-jw-04', 'https://www.markaz.app/api/export/image/239-278-530645-product-2.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-530645-product-2.jpg', 'Stunning Silver Plated Anklet Pair - 2 Pcs Adjustable Design', 1, 0),
('pi-jw-04-3', 'p-jw-04', 'https://www.markaz.app/api/export/image/239-278-530645-product-3.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-530645-product-3.jpg', 'Stunning Silver Plated Anklet Pair - 2 Pcs Adjustable Design', 2, 0),
('pi-jw-04-4', 'p-jw-04', 'https://www.markaz.app/api/export/image/239-278-530645-product-4.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-530645-product-4.jpg', 'Stunning Silver Plated Anklet Pair - 2 Pcs Adjustable Design', 3, 0),
('pi-jw-04-5', 'p-jw-04', 'https://www.markaz.app/api/export/image/239-278-530645-product-5.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-530645-product-5.jpg', 'Stunning Silver Plated Anklet Pair - 2 Pcs Adjustable Design', 4, 0),
('pi-jw-04-6', 'p-jw-04', 'https://www.markaz.app/api/export/image/239-278-530645-product-1-withcode.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-530645-product-1-withcode.jpg', 'Stunning Silver Plated Anklet Pair - 2 Pcs Adjustable Design', 5, 0),
('pi-jw-05-1', 'p-jw-05', 'https://www.markaz.app/api/export/image/239-278-523604-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-523604-product-1.jpeg', 'Silver Plated Anklet', 0, 1),
('pi-jw-05-2', 'p-jw-05', 'https://www.markaz.app/api/export/image/239-278-523604-product-2.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-523604-product-2.jpeg', 'Silver Plated Anklet', 1, 0),
('pi-jw-05-3', 'p-jw-05', 'https://www.markaz.app/api/export/image/239-278-523604-product-3.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-523604-product-3.jpeg', 'Silver Plated Anklet', 2, 0),
('pi-jw-05-4', 'p-jw-05', 'https://www.markaz.app/api/export/image/239-278-523604-product-1-withcode.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-523604-product-1-withcode.jpeg', 'Silver Plated Anklet', 3, 0),
('pi-jw-06-1', 'p-jw-06', 'https://www.markaz.app/api/export/image/239-278-516657-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-516657-product-1.jpeg', 'Gold Plated Bell Anklet for Women Festive Wear', 0, 1),
('pi-jw-06-2', 'p-jw-06', 'https://www.markaz.app/api/export/image/239-278-516657-product-2.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-516657-product-2.jpeg', 'Gold Plated Bell Anklet for Women Festive Wear', 1, 0),
('pi-jw-06-3', 'p-jw-06', 'https://www.markaz.app/api/export/image/239-278-516657-product-3.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-516657-product-3.jpeg', 'Gold Plated Bell Anklet for Women Festive Wear', 2, 0),
('pi-jw-06-4', 'p-jw-06', 'https://www.markaz.app/api/export/image/239-278-516657-product-1-withcode.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F239-278-516657-product-1-withcode.jpeg', 'Gold Plated Bell Anklet for Women Festive Wear', 3, 0),
('pi-jw-07-1', 'p-jw-07', 'https://www.markaz.app/api/export/image/2687-96-754976-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2687-96-754976-product-1.webp', 'Noratan Design Gold Plated Kundan Jhumar', 0, 1),
('pi-jw-07-2', 'p-jw-07', 'https://www.markaz.app/api/export/image/2687-96-754976-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2687-96-754976-product-2.webp', 'Noratan Design Gold Plated Kundan Jhumar', 1, 0),
('pi-jw-07-3', 'p-jw-07', 'https://www.markaz.app/api/export/image/2687-96-754976-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2687-96-754976-product-3.webp', 'Noratan Design Gold Plated Kundan Jhumar', 2, 0),
('pi-jw-07-4', 'p-jw-07', 'https://www.markaz.app/api/export/image/2687-96-754976-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2687-96-754976-product-4.webp', 'Noratan Design Gold Plated Kundan Jhumar', 3, 0),
('pi-jw-07-5', 'p-jw-07', 'https://www.markaz.app/api/export/image/2687-96-754976-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2687-96-754976-product-5.webp', 'Noratan Design Gold Plated Kundan Jhumar', 4, 0),
('pi-jw-07-6', 'p-jw-07', 'https://www.markaz.app/api/export/image/2687-96-754976-product-6.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2687-96-754976-product-6.webp', 'Noratan Design Gold Plated Kundan Jhumar', 5, 0),
('pi-jw-07-7', 'p-jw-07', 'https://www.markaz.app/api/export/image/2687-96-754976-product-7.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2687-96-754976-product-7.webp', 'Noratan Design Gold Plated Kundan Jhumar', 6, 0),
('pi-jw-07-8', 'p-jw-07', 'https://www.markaz.app/api/export/image/2687-96-754976-product-8.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2687-96-754976-product-8.webp', 'Noratan Design Gold Plated Kundan Jhumar', 7, 0),
('pi-jw-07-9', 'p-jw-07', 'https://www.markaz.app/api/export/image/2687-96-754976-product-9.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2687-96-754976-product-9.webp', 'Noratan Design Gold Plated Kundan Jhumar', 8, 0),
('pi-jw-08-1', 'p-jw-08', 'https://www.markaz.app/api/export/image/435-32331-177285-product-2.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-32331-177285-product-2.jpeg', 'Resin Polish Jhumar Wax Polish Wax Polish', 0, 1),
('pi-jw-08-2', 'p-jw-08', 'https://www.markaz.app/api/export/image/435-32331-177285-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-32331-177285-product-1.jpeg', 'Resin Polish Jhumar Wax Polish Wax Polish', 1, 0),
('pi-jw-08-3', 'p-jw-08', 'https://www.markaz.app/api/export/image/435-32331-177285-product-2-withcode.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-32331-177285-product-2-withcode.jpeg', 'Resin Polish Jhumar Wax Polish Wax Polish', 2, 0),
('pi-jw-09-1', 'p-jw-09', 'https://www.markaz.app/api/export/image/435-32331-177272-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-32331-177272-product-1.jpeg', 'Resin Polish Jhumar Red Gold Wedding Party Wear', 0, 1),
('pi-jw-09-2', 'p-jw-09', 'https://www.markaz.app/api/export/image/435-32331-177272-product-2.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-32331-177272-product-2.jpeg', 'Resin Polish Jhumar Red Gold Wedding Party Wear', 1, 0),
('pi-jw-09-3', 'p-jw-09', 'https://www.markaz.app/api/export/image/435-32331-177272-product-1-withcode.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-32331-177272-product-1-withcode.jpeg', 'Resin Polish Jhumar Red Gold Wedding Party Wear', 2, 0),
('pi-jw-10-1', 'p-jw-10', 'https://www.markaz.app/api/export/image/435-41851-229977-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-41851-229977-product-1.jpeg', 'Zircon Jhumar Silver Polish Wedding Party Jewelry', 0, 1),
('pi-jw-10-2', 'p-jw-10', 'https://www.markaz.app/api/export/image/435-41851-229977-product-2.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-41851-229977-product-2.jpeg', 'Zircon Jhumar Silver Polish Wedding Party Jewelry', 1, 0),
('pi-jw-10-3', 'p-jw-10', 'https://www.markaz.app/api/export/image/435-41851-229977-product-1-withcode.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-41851-229977-product-1-withcode.jpeg', 'Zircon Jhumar Silver Polish Wedding Party Jewelry', 2, 0),
('pi-jw-11-1', 'p-jw-11', 'https://www.markaz.app/api/export/image/435-96-369825-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-96-369825-product-1.jpeg', 'Multicolor Jhumar Jewellery Set 1 Pc Standard Size', 0, 1),
('pi-jw-11-2', 'p-jw-11', 'https://www.markaz.app/api/export/image/435-96-369825-product-2.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-96-369825-product-2.jpeg', 'Multicolor Jhumar Jewellery Set 1 Pc Standard Size', 1, 0),
('pi-jw-11-3', 'p-jw-11', 'https://www.markaz.app/api/export/image/435-96-369825-product-1-withcode.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-96-369825-product-1-withcode.jpeg', 'Multicolor Jhumar Jewellery Set 1 Pc Standard Size', 2, 0),
('pi-jw-12-1', 'p-jw-12', 'https://www.markaz.app/api/export/image/pakistan_650806.png?src=https%3A%2F%2Fstatic.markaz.app%2FGenerativeMedia%2FPakistan%2Fimages%2Fpakistan_650806.png', 'Nagina Kara Bangle Set Silver Finish Wedding Party Wear', 0, 1),
('pi-jw-12-2', 'p-jw-12', 'https://www.markaz.app/api/export/image/1779-78-650806-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1779-78-650806-product-1.webp', 'Nagina Kara Bangle Set Silver Finish Wedding Party Wear', 1, 0),
('pi-jw-13-1', 'p-jw-13', 'https://www.markaz.app/api/export/image/pakistan_693457.png?src=https%3A%2F%2Fstatic.markaz.app%2FGenerativeMedia%2FPakistan%2Fimages%2Fpakistan_693457.png', 'Gold Toned Gemstone Bangles Set for Weddings & Parties', 0, 1),
('pi-jw-13-2', 'p-jw-13', 'https://www.markaz.app/api/export/image/435-78-693457-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-78-693457-product-2.webp', 'Gold Toned Gemstone Bangles Set for Weddings & Parties', 1, 0),
('pi-jw-13-3', 'p-jw-13', 'https://www.markaz.app/api/export/image/435-78-693457-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-78-693457-product-1.webp', 'Gold Toned Gemstone Bangles Set for Weddings & Parties', 2, 0),
('pi-jw-14-1', 'p-jw-14', 'https://www.markaz.app/api/export/image/1119-78-731959-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-78-731959-product-1.webp', '6 Pcs Modern Crystal Kara Bangle Set for Women', 0, 1),
('pi-jw-14-2', 'p-jw-14', 'https://www.markaz.app/api/export/image/1119-78-731959-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-78-731959-product-2.webp', '6 Pcs Modern Crystal Kara Bangle Set for Women', 1, 0),
('pi-jw-14-3', 'p-jw-14', 'https://www.markaz.app/api/export/image/1119-78-731959-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-78-731959-product-3.webp', '6 Pcs Modern Crystal Kara Bangle Set for Women', 2, 0),
('pi-jw-14-4', 'p-jw-14', 'https://www.markaz.app/api/export/image/1119-78-731959-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-78-731959-product-4.webp', '6 Pcs Modern Crystal Kara Bangle Set for Women', 3, 0),
('pi-jw-14-5', 'p-jw-14', 'https://www.markaz.app/api/export/image/1119-78-731959-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-78-731959-product-5.webp', '6 Pcs Modern Crystal Kara Bangle Set for Women', 4, 0),
('pi-jw-14-6', 'p-jw-14', 'https://www.markaz.app/api/export/image/1119-78-731959-product-6.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-78-731959-product-6.webp', '6 Pcs Modern Crystal Kara Bangle Set for Women', 5, 0),
('pi-jw-15-1', 'p-jw-15', 'https://www.markaz.app/api/export/image/435-78-630160-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-78-630160-product-1.jpg', 'Golden Kara Bangle Set for Brides & Fashion Women', 0, 1),
('pi-jw-15-2', 'p-jw-15', 'https://www.markaz.app/api/export/image/435-78-630160-product-2.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-78-630160-product-2.jpg', 'Golden Kara Bangle Set for Brides & Fashion Women', 1, 0),
('pi-jw-15-3', 'p-jw-15', 'https://www.markaz.app/api/export/image/435-78-630160-product-1-withcode.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-78-630160-product-1-withcode.jpg', 'Golden Kara Bangle Set for Brides & Fashion Women', 2, 0),
('pi-jw-16-1', 'p-jw-16', 'https://www.markaz.app/api/export/image/1119-78-387850-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-78-387850-product-1.jpg', 'Premium Quality Kara Bangles Set of 2 Alloy', 0, 1),
('pi-jw-16-2', 'p-jw-16', 'https://www.markaz.app/api/export/image/1119-78-387850-product-2.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-78-387850-product-2.jpg', 'Premium Quality Kara Bangles Set of 2 Alloy', 1, 0),
('pi-jw-16-3', 'p-jw-16', 'https://www.markaz.app/api/export/image/1119-78-387850-product-3.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-78-387850-product-3.jpg', 'Premium Quality Kara Bangles Set of 2 Alloy', 2, 0),
('pi-jw-17-1', 'p-jw-17', 'https://www.markaz.app/api/export/image/pakistan_655481.png?src=https%3A%2F%2Fstatic.markaz.app%2FGenerativeMedia%2FPakistan%2Fimages%2Fpakistan_655481.png', 'Silver Flower Bracelet for Women with Sparkling Stones', 0, 1),
('pi-jw-17-2', 'p-jw-17', 'https://www.markaz.app/api/export/image/1257-78-655481-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655481-product-1.webp', 'Silver Flower Bracelet for Women with Sparkling Stones', 1, 0),
('pi-jw-17-3', 'p-jw-17', 'https://www.markaz.app/api/export/image/1257-78-655481-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655481-product-2.webp', 'Silver Flower Bracelet for Women with Sparkling Stones', 2, 0),
('pi-jw-17-4', 'p-jw-17', 'https://www.markaz.app/api/export/image/1257-78-655481-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655481-product-3.webp', 'Silver Flower Bracelet for Women with Sparkling Stones', 3, 0),
('pi-jw-17-5', 'p-jw-17', 'https://www.markaz.app/api/export/image/1257-78-655481-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655481-product-4.webp', 'Silver Flower Bracelet for Women with Sparkling Stones', 4, 0),
('pi-jw-17-6', 'p-jw-17', 'https://www.markaz.app/api/export/image/1257-78-655481-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655481-product-5.webp', 'Silver Flower Bracelet for Women with Sparkling Stones', 5, 0),
('pi-jw-17-7', 'p-jw-17', 'https://www.markaz.app/api/export/image/1257-78-655481-product-6.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655481-product-6.webp', 'Silver Flower Bracelet for Women with Sparkling Stones', 6, 0),
('pi-jw-17-8', 'p-jw-17', 'https://www.markaz.app/api/export/image/1257-78-655481-product-7.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655481-product-7.webp', 'Silver Flower Bracelet for Women with Sparkling Stones', 7, 0),
('pi-jw-18-1', 'p-jw-18', 'https://www.markaz.app/api/export/image/pakistan_655202.png?src=https%3A%2F%2Fstatic.markaz.app%2FGenerativeMedia%2FPakistan%2Fimages%2Fpakistan_655202.png', 'Zircon Rice Bracelet for Women, Silver, Wicker Leaf Design', 0, 1),
('pi-jw-18-2', 'p-jw-18', 'https://www.markaz.app/api/export/image/1257-78-655202-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655202-product-1.webp', 'Zircon Rice Bracelet for Women, Silver, Wicker Leaf Design', 1, 0),
('pi-jw-18-3', 'p-jw-18', 'https://www.markaz.app/api/export/image/1257-78-655202-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655202-product-2.webp', 'Zircon Rice Bracelet for Women, Silver, Wicker Leaf Design', 2, 0),
('pi-jw-18-4', 'p-jw-18', 'https://www.markaz.app/api/export/image/1257-78-655202-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655202-product-3.webp', 'Zircon Rice Bracelet for Women, Silver, Wicker Leaf Design', 3, 0),
('pi-jw-18-5', 'p-jw-18', 'https://www.markaz.app/api/export/image/1257-78-655202-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655202-product-4.webp', 'Zircon Rice Bracelet for Women, Silver, Wicker Leaf Design', 4, 0),
('pi-jw-18-6', 'p-jw-18', 'https://www.markaz.app/api/export/image/1257-78-655202-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655202-product-5.webp', 'Zircon Rice Bracelet for Women, Silver, Wicker Leaf Design', 5, 0),
('pi-jw-18-7', 'p-jw-18', 'https://www.markaz.app/api/export/image/1257-78-655202-product-6.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655202-product-6.webp', 'Zircon Rice Bracelet for Women, Silver, Wicker Leaf Design', 6, 0),
('pi-jw-18-8', 'p-jw-18', 'https://www.markaz.app/api/export/image/1257-78-655202-product-7.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655202-product-7.webp', 'Zircon Rice Bracelet for Women, Silver, Wicker Leaf Design', 7, 0),
('pi-jw-18-9', 'p-jw-18', 'https://www.markaz.app/api/export/image/1257-78-655202-product-8.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655202-product-8.webp', 'Zircon Rice Bracelet for Women, Silver, Wicker Leaf Design', 8, 0),
('pi-jw-18-10', 'p-jw-18', 'https://www.markaz.app/api/export/image/1257-78-655202-product-9.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-78-655202-product-9.webp', 'Zircon Rice Bracelet for Women, Silver, Wicker Leaf Design', 9, 0),
('pi-jw-19-1', 'p-jw-19', 'https://www.markaz.app/api/export/image/1967-78-751962-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-78-751962-product-1.webp', 'Golden Base Pink Trending Tulip Braclet QWJ-187', 0, 1),
('pi-jw-19-2', 'p-jw-19', 'https://www.markaz.app/api/export/image/1967-78-751962-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-78-751962-product-2.webp', 'Golden Base Pink Trending Tulip Braclet QWJ-187', 1, 0),
('pi-jw-20-1', 'p-jw-20', 'https://www.markaz.app/api/export/image/1013-44-446645-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-44-446645-product-1.jpg', 'Turkish-Inspired Men''s Ring Set of 3 Silver Plated Black Turquoise Red', 0, 1),
('pi-jw-20-2', 'p-jw-20', 'https://www.markaz.app/api/export/image/1013-44-446645-product-2.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-44-446645-product-2.jpg', 'Turkish-Inspired Men''s Ring Set of 3 Silver Plated Black Turquoise Red', 1, 0),
('pi-jw-20-3', 'p-jw-20', 'https://www.markaz.app/api/export/image/1013-44-446645-product-3.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-44-446645-product-3.jpg', 'Turkish-Inspired Men''s Ring Set of 3 Silver Plated Black Turquoise Red', 2, 0),
('pi-jw-20-4', 'p-jw-20', 'https://www.markaz.app/api/export/image/1013-44-446645-product-1-withcode.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-44-446645-product-1-withcode.jpg', 'Turkish-Inspired Men''s Ring Set of 3 Silver Plated Black Turquoise Red', 3, 0),
('pi-jw-21-1', 'p-jw-21', 'https://www.markaz.app/api/export/image/2433-44-MZ2433200048PESS-775217001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2433-44-MZ2433200048PESS-775217001-product-1.webp', 'Couple''s Ring 1', 0, 1),
('pi-jw-21-2', 'p-jw-21', 'https://www.markaz.app/api/export/image/2433-44-MZ2433200048PESS-775217001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2433-44-MZ2433200048PESS-775217001-product-2.webp', 'Couple''s Ring 1', 1, 0),
('pi-jw-22-1', 'p-jw-22', 'https://www.markaz.app/api/export/image/1119-44-MZ1119204002BYBR-762349001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-44-MZ1119204002BYBR-762349001-product-1.webp', 'Modern Look Turkish Design Men''s Ring', 0, 1),
('pi-jw-22-2', 'p-jw-22', 'https://www.markaz.app/api/export/image/1119-44-MZ1119204002BYBR-762349001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-44-MZ1119204002BYBR-762349001-product-2.webp', 'Modern Look Turkish Design Men''s Ring', 1, 0),
('pi-jw-22-3', 'p-jw-22', 'https://www.markaz.app/api/export/image/1119-44-MZ1119204002BYBR-762349002-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-44-MZ1119204002BYBR-762349002-product-1.webp', 'Modern Look Turkish Design Men''s Ring', 2, 0),
('pi-jw-22-4', 'p-jw-22', 'https://www.markaz.app/api/export/image/1119-44-MZ1119204002BYBR-762349002-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-44-MZ1119204002BYBR-762349002-product-2.webp', 'Modern Look Turkish Design Men''s Ring', 3, 0),
('pi-jw-23-1', 'p-jw-23', 'https://www.markaz.app/api/export/image/435-44-687242-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-44-687242-product-1.webp', 'Adjustable Maroon Ring for Women Wedding Eid Daily Wear', 0, 1),
('pi-jw-23-2', 'p-jw-23', 'https://www.markaz.app/api/export/image/435-44-687242-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-44-687242-product-2.webp', 'Adjustable Maroon Ring for Women Wedding Eid Daily Wear', 1, 0),
('pi-jw-24-1', 'p-jw-24', 'https://www.markaz.app/api/export/image/435-44-687247-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-44-687247-product-1.webp', 'Maroon Adjustable Ring for Women Wedding & Party Wear', 0, 1),
('pi-jw-24-2', 'p-jw-24', 'https://www.markaz.app/api/export/image/435-44-687247-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-44-687247-product-2.webp', 'Maroon Adjustable Ring for Women Wedding & Party Wear', 1, 0),
('pi-jw-25-1', 'p-jw-25', 'https://www.markaz.app/api/export/image/2986-44-MZ2986200053RAZE-765350001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2986-44-MZ2986200053RAZE-765350001-product-1.webp', 'Rings Set', 0, 1),
('pi-jw-25-2', 'p-jw-25', 'https://www.markaz.app/api/export/image/2986-44-MZ2986200053RAZE-765350001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2986-44-MZ2986200053RAZE-765350001-product-2.webp', 'Rings Set', 1, 0),
('pi-jw-25-3', 'p-jw-25', 'https://www.markaz.app/api/export/image/2986-44-MZ2986200053RAZE-765350001-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2986-44-MZ2986200053RAZE-765350001-product-3.webp', 'Rings Set', 2, 0),
('pi-jw-25-4', 'p-jw-25', 'https://www.markaz.app/api/export/image/2986-44-MZ2986200053RAZE-765350001-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2986-44-MZ2986200053RAZE-765350001-product-4.webp', 'Rings Set', 3, 0),
('pi-jw-25-5', 'p-jw-25', 'https://www.markaz.app/api/export/image/2986-44-MZ2986200053RAZE-765350001-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2986-44-MZ2986200053RAZE-765350001-product-5.webp', 'Rings Set', 4, 0),
('pi-jw-25-6', 'p-jw-25', 'https://www.markaz.app/api/export/image/2986-44-MZ2986200053RAZE-765350001-product-6.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2986-44-MZ2986200053RAZE-765350001-product-6.webp', 'Rings Set', 5, 0),
('pi-jw-25-7', 'p-jw-25', 'https://www.markaz.app/api/export/image/2986-44-MZ2986200053RAZE-765350001-product-7.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2986-44-MZ2986200053RAZE-765350001-product-7.webp', 'Rings Set', 6, 0),
('pi-jw-25-8', 'p-jw-25', 'https://www.markaz.app/api/export/image/2986-44-MZ2986200053RAZE-765350001-product-8.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2986-44-MZ2986200053RAZE-765350001-product-8.webp', 'Rings Set', 7, 0),
('pi-jw-26-1', 'p-jw-26', 'https://www.markaz.app/api/export/image/2433-44-MZ2433200035PESS-773708001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2433-44-MZ2433200035PESS-773708001-product-1.webp', 'Men''s Ring', 0, 1),
('pi-jw-26-2', 'p-jw-26', 'https://www.markaz.app/api/export/image/2433-44-MZ2433200035PESS-773708001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2433-44-MZ2433200035PESS-773708001-product-2.webp', 'Men''s Ring', 1, 0),
('pi-jw-27-1', 'p-jw-27', 'https://www.markaz.app/api/export/image/148-11276-71222-product-2.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F148-11276-71222-product-2.jpg', '10-Piece Silver Plated Ring Set for Women', 0, 1),
('pi-jw-27-2', 'p-jw-27', 'https://www.markaz.app/api/export/image/148-11276-71222-product-1.jfif.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F148-11276-71222-product-1.jfif', '10-Piece Silver Plated Ring Set for Women', 1, 0),
('pi-jw-28-1', 'p-jw-28', 'https://www.markaz.app/api/export/image/3213-42-MZ3213200054JYPE-769169001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3213-42-MZ3213200054JYPE-769169001-product-1.webp', 'Bridal Antique Plated Artificial Stones Earrings', 0, 1),
('pi-jw-28-2', 'p-jw-28', 'https://www.markaz.app/api/export/image/3213-42-MZ3213200054JYPE-769169001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3213-42-MZ3213200054JYPE-769169001-product-2.webp', 'Bridal Antique Plated Artificial Stones Earrings', 1, 0),
('pi-jw-29-1', 'p-jw-29', 'https://www.markaz.app/api/export/image/1967-42-710157-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-710157-product-1.webp', 'Black Swan Earrings for Women, Hypoallergenic, Sparkling, 2 Pcs', 0, 1),
('pi-jw-29-2', 'p-jw-29', 'https://www.markaz.app/api/export/image/1967-42-710157-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-710157-product-2.webp', 'Black Swan Earrings for Women, Hypoallergenic, Sparkling, 2 Pcs', 1, 0),
('pi-jw-29-3', 'p-jw-29', 'https://www.markaz.app/api/export/image/1967-42-710157-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-710157-product-3.webp', 'Black Swan Earrings for Women, Hypoallergenic, Sparkling, 2 Pcs', 2, 0),
('pi-jw-29-4', 'p-jw-29', 'https://www.markaz.app/api/export/image/1967-42-710157-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-710157-product-4.webp', 'Black Swan Earrings for Women, Hypoallergenic, Sparkling, 2 Pcs', 3, 0),
('pi-jw-29-5', 'p-jw-29', 'https://www.markaz.app/api/export/image/1967-42-710157-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-710157-product-5.webp', 'Black Swan Earrings for Women, Hypoallergenic, Sparkling, 2 Pcs', 4, 0),
('pi-jw-29-6', 'p-jw-29', 'https://www.markaz.app/api/export/image/1967-42-710157-product-6.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-710157-product-6.webp', 'Black Swan Earrings for Women, Hypoallergenic, Sparkling, 2 Pcs', 5, 0),
('pi-jw-29-7', 'p-jw-29', 'https://www.markaz.app/api/export/image/1967-42-710157-product-7.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-710157-product-7.webp', 'Black Swan Earrings for Women, Hypoallergenic, Sparkling, 2 Pcs', 6, 0),
('pi-jw-29-8', 'p-jw-29', 'https://www.markaz.app/api/export/image/1967-42-710157-product-8.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-710157-product-8.webp', 'Black Swan Earrings for Women, Hypoallergenic, Sparkling, 2 Pcs', 7, 0),
('pi-jw-29-9', 'p-jw-29', 'https://www.markaz.app/api/export/image/1967-42-710157-product-9.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-710157-product-9.webp', 'Black Swan Earrings for Women, Hypoallergenic, Sparkling, 2 Pcs', 8, 0),
('pi-jw-29-10', 'p-jw-29', 'https://www.markaz.app/api/export/image/1967-42-710157-product-10.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-710157-product-10.webp', 'Black Swan Earrings for Women, Hypoallergenic, Sparkling, 2 Pcs', 9, 0),
('pi-jw-30-1', 'p-jw-30', 'https://www.markaz.app/api/export/image/1967-42-709748-product-1968.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-709748-product-1968.webp', 'Pearl Stud Earrings Gold Square Frame Pakistan', 0, 1),
('pi-jw-30-2', 'p-jw-30', 'https://www.markaz.app/api/export/image/1967-42-709748-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-709748-product-1.webp', 'Pearl Stud Earrings Gold Square Frame Pakistan', 1, 0),
('pi-jw-30-3', 'p-jw-30', 'https://www.markaz.app/api/export/image/1967-42-709748-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-709748-product-2.webp', 'Pearl Stud Earrings Gold Square Frame Pakistan', 2, 0),
('pi-jw-30-4', 'p-jw-30', 'https://www.markaz.app/api/export/image/1967-42-709748-product-1971.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-709748-product-1971.webp', 'Pearl Stud Earrings Gold Square Frame Pakistan', 3, 0),
('pi-jw-30-5', 'p-jw-30', 'https://www.markaz.app/api/export/image/1967-42-709748-product-1972.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-709748-product-1972.webp', 'Pearl Stud Earrings Gold Square Frame Pakistan', 4, 0),
('pi-jw-30-6', 'p-jw-30', 'https://www.markaz.app/api/export/image/1967-42-709748-product-1968-withcode.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-42-709748-product-1968-withcode.webp', 'Pearl Stud Earrings Gold Square Frame Pakistan', 5, 0),
('pi-jw-31-1', 'p-jw-31', 'https://www.markaz.app/api/export/image/148-13571-82610-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F148-13571-82610-product-1.jpeg', 'Gold Silver Leaf Chain Ear Cuff Earrings Pair 2PCS', 0, 1),
('pi-jw-31-2', 'p-jw-31', 'https://www.markaz.app/api/export/image/148-13571-82610-product-2.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F148-13571-82610-product-2.jpeg', 'Gold Silver Leaf Chain Ear Cuff Earrings Pair 2PCS', 1, 0),
('pi-jw-31-3', 'p-jw-31', 'https://www.markaz.app/api/export/image/148-13571-82610-product-3.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F148-13571-82610-product-3.jpeg', 'Gold Silver Leaf Chain Ear Cuff Earrings Pair 2PCS', 2, 0),
('pi-jw-31-4', 'p-jw-31', 'https://www.markaz.app/api/export/image/148-13571-82610-product-4.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F148-13571-82610-product-4.jpeg', 'Gold Silver Leaf Chain Ear Cuff Earrings Pair 2PCS', 3, 0),
('pi-jw-31-5', 'p-jw-31', 'https://www.markaz.app/api/export/image/148-13571-82610-product-5.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F148-13571-82610-product-5.jpeg', 'Gold Silver Leaf Chain Ear Cuff Earrings Pair 2PCS', 4, 0),
('pi-jw-32-1', 'p-jw-32', 'https://www.markaz.app/api/export/image/1119-42-729674-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-42-729674-product-1.webp', 'Golden Jhumka Earrings for Women 2 Pcs', 0, 1),
('pi-jw-32-2', 'p-jw-32', 'https://www.markaz.app/api/export/image/1119-42-729674-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-42-729674-product-2.webp', 'Golden Jhumka Earrings for Women 2 Pcs', 1, 0),
('pi-jw-32-3', 'p-jw-32', 'https://www.markaz.app/api/export/image/1119-42-729674-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-42-729674-product-3.webp', 'Golden Jhumka Earrings for Women 2 Pcs', 2, 0),
('pi-jw-33-1', 'p-jw-33', 'https://www.markaz.app/api/export/image/1119-42-727857-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-42-727857-product-1.webp', 'Gold Plated Crystal Earrings for Women 2 Pcs', 0, 1),
('pi-jw-33-2', 'p-jw-33', 'https://www.markaz.app/api/export/image/1119-42-727857-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-42-727857-product-2.webp', 'Gold Plated Crystal Earrings for Women 2 Pcs', 1, 0),
('pi-jw-33-3', 'p-jw-33', 'https://www.markaz.app/api/export/image/1119-42-727857-product-1122.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-42-727857-product-1122.webp', 'Gold Plated Crystal Earrings for Women 2 Pcs', 2, 0),
('pi-jw-34-1', 'p-jw-34', 'https://www.markaz.app/api/export/image/148-13572-82618-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F148-13572-82618-product-1.jpeg', 'Long Pearl Drop Earrings for Women, Graduated Design, Durable Metal, Lightweight, Wedding Party Wear, Eid, Birthday', 0, 1),
('pi-jw-34-2', 'p-jw-34', 'https://www.markaz.app/api/export/image/148-13572-82618-product-2.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F148-13572-82618-product-2.jpeg', 'Long Pearl Drop Earrings for Women, Graduated Design, Durable Metal, Lightweight, Wedding Party Wear, Eid, Birthday', 1, 0),
('pi-jw-34-3', 'p-jw-34', 'https://www.markaz.app/api/export/image/148-13572-82618-product-3.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F148-13572-82618-product-3.jpeg', 'Long Pearl Drop Earrings for Women, Graduated Design, Durable Metal, Lightweight, Wedding Party Wear, Eid, Birthday', 2, 0),
('pi-jw-35-1', 'p-jw-35', 'https://www.markaz.app/api/export/image/1119-41-MZ1119203944BYBR-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-41-MZ1119203944BYBR-product-1.webp', 'Bridal Mehndi Jewellery Set Necklace Earing Kara Bangles Set', 0, 1),
('pi-jw-35-2', 'p-jw-35', 'https://www.markaz.app/api/export/image/1119-41-MZ1119203944BYBR-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-41-MZ1119203944BYBR-product-2.webp', 'Bridal Mehndi Jewellery Set Necklace Earing Kara Bangles Set', 1, 0),
('pi-jw-35-3', 'p-jw-35', 'https://www.markaz.app/api/export/image/1119-41-MZ1119203944BYBR-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-41-MZ1119203944BYBR-product-3.webp', 'Bridal Mehndi Jewellery Set Necklace Earing Kara Bangles Set', 2, 0),
('pi-jw-36-1', 'p-jw-36', 'https://www.markaz.app/api/export/image/1257-41-661543-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-661543-product-1.webp', 'Elegant Bridal Jewelry Set with Sparkling Stones', 0, 1),
('pi-jw-36-2', 'p-jw-36', 'https://www.markaz.app/api/export/image/1257-41-661543-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-661543-product-2.webp', 'Elegant Bridal Jewelry Set with Sparkling Stones', 1, 0),
('pi-jw-36-3', 'p-jw-36', 'https://www.markaz.app/api/export/image/1257-41-661543-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-661543-product-3.webp', 'Elegant Bridal Jewelry Set with Sparkling Stones', 2, 0),
('pi-jw-36-4', 'p-jw-36', 'https://www.markaz.app/api/export/image/1257-41-661543-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-661543-product-4.webp', 'Elegant Bridal Jewelry Set with Sparkling Stones', 3, 0),
('pi-jw-36-5', 'p-jw-36', 'https://www.markaz.app/api/export/image/1257-41-661543-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-661543-product-5.webp', 'Elegant Bridal Jewelry Set with Sparkling Stones', 4, 0),
('pi-jw-36-6', 'p-jw-36', 'https://www.markaz.app/api/export/image/1257-41-661543-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-661543-product-2.webp', 'Elegant Bridal Jewelry Set with Sparkling Stones', 5, 0),
('pi-jw-36-7', 'p-jw-36', 'https://www.markaz.app/api/export/image/1257-41-661543-product-6.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-661543-product-6.webp', 'Elegant Bridal Jewelry Set with Sparkling Stones', 6, 0),
('pi-jw-36-8', 'p-jw-36', 'https://www.markaz.app/api/export/image/1257-41-661543-product-7.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-661543-product-7.webp', 'Elegant Bridal Jewelry Set with Sparkling Stones', 7, 0),
('pi-jw-36-9', 'p-jw-36', 'https://www.markaz.app/api/export/image/1257-41-661543-product-8.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-661543-product-8.webp', 'Elegant Bridal Jewelry Set with Sparkling Stones', 8, 0),
('pi-jw-36-10', 'p-jw-36', 'https://www.markaz.app/api/export/image/1257-41-661543-product-9.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-661543-product-9.webp', 'Elegant Bridal Jewelry Set with Sparkling Stones', 9, 0),
('pi-jw-37-1', 'p-jw-37', 'https://www.markaz.app/api/export/image/1779-41-683149-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1779-41-683149-product-1.webp', 'Golden Badam Patti Necklace Set for Women', 0, 1),
('pi-jw-38-1', 'p-jw-38', 'https://www.markaz.app/api/export/image/3193-41-MZ3193200002AACN-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3193-41-MZ3193200002AACN-product-1.webp', '2 Layered Gold Plated Zircon Necklace Set', 0, 1),
('pi-jw-38-2', 'p-jw-38', 'https://www.markaz.app/api/export/image/3193-41-MZ3193200002AACN-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3193-41-MZ3193200002AACN-product-2.webp', '2 Layered Gold Plated Zircon Necklace Set', 1, 0),
('pi-jw-38-3', 'p-jw-38', 'https://www.markaz.app/api/export/image/3193-41-MZ3193200002AACN-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3193-41-MZ3193200002AACN-product-3.webp', '2 Layered Gold Plated Zircon Necklace Set', 2, 0),
('pi-jw-38-4', 'p-jw-38', 'https://www.markaz.app/api/export/image/3193-41-MZ3193200002AACN-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3193-41-MZ3193200002AACN-product-4.webp', '2 Layered Gold Plated Zircon Necklace Set', 3, 0),
('pi-jw-39-1', 'p-jw-39', 'https://www.markaz.app/api/export/image/435-41-416445-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-41-416445-product-1.jpg', 'Gold Plated Choker Set with Maroon White Stones for Women', 0, 1),
('pi-jw-39-2', 'p-jw-39', 'https://www.markaz.app/api/export/image/435-41-416445-product-2.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-41-416445-product-2.jpg', 'Gold Plated Choker Set with Maroon White Stones for Women', 1, 0),
('pi-jw-39-3', 'p-jw-39', 'https://www.markaz.app/api/export/image/435-41-416445-product-3.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-41-416445-product-3.jpg', 'Gold Plated Choker Set with Maroon White Stones for Women', 2, 0),
('pi-jw-39-4', 'p-jw-39', 'https://www.markaz.app/api/export/image/435-41-416445-product-4.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-41-416445-product-4.jpg', 'Gold Plated Choker Set with Maroon White Stones for Women', 3, 0),
('pi-jw-39-5', 'p-jw-39', 'https://www.markaz.app/api/export/image/435-41-416445-product-5.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-41-416445-product-5.jpg', 'Gold Plated Choker Set with Maroon White Stones for Women', 4, 0),
('pi-jw-39-6', 'p-jw-39', 'https://www.markaz.app/api/export/image/435-41-416445-product-6.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-41-416445-product-6.jpg', 'Gold Plated Choker Set with Maroon White Stones for Women', 5, 0),
('pi-jw-39-7', 'p-jw-39', 'https://www.markaz.app/api/export/image/435-41-416445-product-7.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-41-416445-product-7.jpg', 'Gold Plated Choker Set with Maroon White Stones for Women', 6, 0),
('pi-jw-39-8', 'p-jw-39', 'https://www.markaz.app/api/export/image/435-41-416445-product-1-withcode.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F435-41-416445-product-1-withcode.jpg', 'Gold Plated Choker Set with Maroon White Stones for Women', 7, 0),
('pi-jw-40-1', 'p-jw-40', 'https://www.markaz.app/api/export/image/1257-41-664243-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-664243-product-1.webp', 'Turtle Jewelry Set Turquoise Antiques for Women', 0, 1),
('pi-jw-40-2', 'p-jw-40', 'https://www.markaz.app/api/export/image/1257-41-664243-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-664243-product-2.webp', 'Turtle Jewelry Set Turquoise Antiques for Women', 1, 0),
('pi-jw-40-3', 'p-jw-40', 'https://www.markaz.app/api/export/image/1257-41-664243-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-664243-product-3.webp', 'Turtle Jewelry Set Turquoise Antiques for Women', 2, 0),
('pi-jw-40-4', 'p-jw-40', 'https://www.markaz.app/api/export/image/1257-41-664243-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-664243-product-4.webp', 'Turtle Jewelry Set Turquoise Antiques for Women', 3, 0),
('pi-jw-40-5', 'p-jw-40', 'https://www.markaz.app/api/export/image/1257-41-664243-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-664243-product-5.webp', 'Turtle Jewelry Set Turquoise Antiques for Women', 4, 0),
('pi-jw-40-6', 'p-jw-40', 'https://www.markaz.app/api/export/image/1257-41-664243-product-6.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-664243-product-6.webp', 'Turtle Jewelry Set Turquoise Antiques for Women', 5, 0),
('pi-jw-40-7', 'p-jw-40', 'https://www.markaz.app/api/export/image/1257-41-664243-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1257-41-664243-product-5.webp', 'Turtle Jewelry Set Turquoise Antiques for Women', 6, 0),
('pi-jw-41-1', 'p-jw-41', 'https://www.markaz.app/api/export/image/2361-40-756696-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2361-40-756696-product-1.webp', 'Elegant Pearl & Crystal Pendant Necklace Set with Matching Earrings – Premium Fashion Jewellery', 0, 1),
('pi-jw-41-2', 'p-jw-41', 'https://www.markaz.app/api/export/image/2361-40-756696-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2361-40-756696-product-2.webp', 'Elegant Pearl & Crystal Pendant Necklace Set with Matching Earrings – Premium Fashion Jewellery', 1, 0),
('pi-jw-41-3', 'p-jw-41', 'https://www.markaz.app/api/export/image/2361-40-756696-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2361-40-756696-product-3.webp', 'Elegant Pearl & Crystal Pendant Necklace Set with Matching Earrings – Premium Fashion Jewellery', 2, 0),
('pi-jw-41-4', 'p-jw-41', 'https://www.markaz.app/api/export/image/2361-40-756696-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2361-40-756696-product-4.webp', 'Elegant Pearl & Crystal Pendant Necklace Set with Matching Earrings – Premium Fashion Jewellery', 3, 0),
('pi-jw-42-1', 'p-jw-42', 'https://www.markaz.app/api/export/image/2361-40-757988-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2361-40-757988-product-1.webp', 'Heartbeat Design Silver Plated Crystal Locket', 0, 1),
('pi-jw-42-2', 'p-jw-42', 'https://www.markaz.app/api/export/image/2361-40-757988-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2361-40-757988-product-2.webp', 'Heartbeat Design Silver Plated Crystal Locket', 1, 0),
('pi-jw-42-3', 'p-jw-42', 'https://www.markaz.app/api/export/image/2361-40-757988-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2361-40-757988-product-3.webp', 'Heartbeat Design Silver Plated Crystal Locket', 2, 0),
('pi-jw-42-4', 'p-jw-42', 'https://www.markaz.app/api/export/image/2361-40-757988-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2361-40-757988-product-4.webp', 'Heartbeat Design Silver Plated Crystal Locket', 3, 0),
('pi-jw-42-5', 'p-jw-42', 'https://www.markaz.app/api/export/image/2361-40-758281-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2361-40-758281-product-5.webp', 'Heartbeat Design Silver Plated Crystal Locket', 4, 0),
('pi-jw-43-1', 'p-jw-43', 'https://www.markaz.app/api/export/image/1967-40-MZ1967200113JRCS-767303001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-40-MZ1967200113JRCS-767303001-product-1.webp', 'Heart Shape Trending Korean Necklace Pendent PTX-961', 0, 1),
('pi-jw-43-2', 'p-jw-43', 'https://www.markaz.app/api/export/image/1967-40-MZ1967200113JRCS-767303001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-40-MZ1967200113JRCS-767303001-product-2.webp', 'Heart Shape Trending Korean Necklace Pendent PTX-961', 1, 0),
('pi-jw-43-3', 'p-jw-43', 'https://www.markaz.app/api/export/image/1967-40-MZ1967200113JRCS-767303002-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-40-MZ1967200113JRCS-767303002-product-1.webp', 'Heart Shape Trending Korean Necklace Pendent PTX-961', 2, 0),
('pi-jw-43-4', 'p-jw-43', 'https://www.markaz.app/api/export/image/1967-40-MZ1967200113JRCS-767303002-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-40-MZ1967200113JRCS-767303002-product-2.webp', 'Heart Shape Trending Korean Necklace Pendent PTX-961', 3, 0),
('pi-jw-44-1', 'p-jw-44', 'https://www.markaz.app/api/export/image/1967-40-MZ1967200115JRCS-767353001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-40-MZ1967200115JRCS-767353001-product-1.webp', 'Green Butterfly Stainless Steel - Necklace STX-963', 0, 1),
('pi-jw-44-2', 'p-jw-44', 'https://www.markaz.app/api/export/image/1967-40-MZ1967200115JRCS-767353001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-40-MZ1967200115JRCS-767353001-product-2.webp', 'Green Butterfly Stainless Steel - Necklace STX-963', 1, 0),
('pi-jw-44-3', 'p-jw-44', 'https://www.markaz.app/api/export/image/1967-40-MZ1967200115JRCS-767353001-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-40-MZ1967200115JRCS-767353001-product-3.webp', 'Green Butterfly Stainless Steel - Necklace STX-963', 2, 0),
('pi-jw-44-4', 'p-jw-44', 'https://www.markaz.app/api/export/image/1967-40-MZ1967200115JRCS-767353001-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1967-40-MZ1967200115JRCS-767353001-product-4.webp', 'Green Butterfly Stainless Steel - Necklace STX-963', 3, 0),
('pi-jw-45-1', 'p-jw-45', 'https://www.markaz.app/api/export/image/3515-40-MZ3515200133UKSE-780676001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3515-40-MZ3515200133UKSE-780676001-product-2.webp', 'Chain', 0, 1),
('pi-jw-45-2', 'p-jw-45', 'https://www.markaz.app/api/export/image/3515-40-MZ3515200133UKSE-780676001-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3515-40-MZ3515200133UKSE-780676001-product-3.webp', 'Chain', 1, 0),
('pi-jw-46-1', 'p-jw-46', 'https://www.markaz.app/api/export/image/3582-40-MZ3582200002GZCS-781848001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3582-40-MZ3582200002GZCS-781848001-product-1.webp', 'Butterfly Design Aluminium Plated Crystal Locket', 0, 1),
('pi-jw-46-2', 'p-jw-46', 'https://www.markaz.app/api/export/image/3582-40-MZ3582200002GZCS-781848001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3582-40-MZ3582200002GZCS-781848001-product-2.webp', 'Butterfly Design Aluminium Plated Crystal Locket', 1, 0),
('pi-jw-46-3', 'p-jw-46', 'https://www.markaz.app/api/export/image/3582-40-MZ3582200002GZCS-781848001-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3582-40-MZ3582200002GZCS-781848001-product-3.webp', 'Butterfly Design Aluminium Plated Crystal Locket', 2, 0),
('pi-jw-47-1', 'p-jw-47', 'https://www.markaz.app/api/export/image/604-40-731868-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F604-40-731868-product-1.webp', '2 Layered Gold Plated Pearl Necklace for Women', 0, 1),
('pi-jw-47-2', 'p-jw-47', 'https://www.markaz.app/api/export/image/604-40-731868-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F604-40-731868-product-2.webp', '2 Layered Gold Plated Pearl Necklace for Women', 1, 0),
('pi-jw-47-3', 'p-jw-47', 'https://www.markaz.app/api/export/image/604-40-731868-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F604-40-731868-product-3.webp', '2 Layered Gold Plated Pearl Necklace for Women', 2, 0),
('pi-jw-48-1', 'p-jw-48', 'https://www.markaz.app/api/export/image/1119-40-620273-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-40-620273-product-1.jpg', 'Stainless Steel Resin Polish Necklace for Men Silver', 0, 1),
('pi-jw-48-2', 'p-jw-48', 'https://www.markaz.app/api/export/image/1119-40-620273-product-2.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-40-620273-product-2.jpg', 'Stainless Steel Resin Polish Necklace for Men Silver', 1, 0),
('pi-jw-48-3', 'p-jw-48', 'https://www.markaz.app/api/export/image/1119-40-620273-product-1-withcode.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1119-40-620273-product-1-withcode.jpg', 'Stainless Steel Resin Polish Necklace for Men Silver', 2, 0);

-- Mark the import as applied ---------------------------------
INSERT OR IGNORE INTO applied_imports (name) VALUES ('jewellery-watches-catalog.sql');

-- End of Jewellery & Watches import ------------------------
