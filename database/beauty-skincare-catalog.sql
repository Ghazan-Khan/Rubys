-- ============================================================
-- Ruby's.pk — Beauty & Skincare catalogue import
-- ------------------------------------------------------------
-- 50 skincare products imported from the supplier's "Beauty &
-- Skincare" export, filed under the Beauty & Skincare department.
--
-- This file is idempotent: it can be run on a fresh database or
-- re-applied to an existing one without creating duplicates.
-- ============================================================

INSERT OR IGNORE INTO categories (id, name, slug, description, emoji, banner_text, is_active, sort_order, meta_title, meta_description) VALUES
('cat-beauty-skincare', 'Beauty & Skincare', 'beauty-skincare', 'Glow serums, hydrating creams, natural oils, luxury makeup & signature fragrances.', '💄', 'Radiate confidence & timeless glow', 1, 2, 'Women''s Beauty & Skincare Products Online', 'Discover premium skincare, serums, lipsticks and halal fragrances at Ruby''s.pk.');

-- Products ---------------------------------------------------
INSERT OR IGNORE INTO products (id, name, slug, sku, description, short_description, price, sale_price, cost_price, category_id, brand, stock_quantity, is_featured, is_active, emoji, image_url, badge, rating, review_count, sold_count, meta_title, meta_description, created_at) VALUES
('p-bs-01', 'Gold Series 6 Steps Facial Kit', 'gold-series-6-steps-facial-kit', 'MKZ-776476-776476001', 'Material: Cream · Skin Types: All Skin Types · Color: Golden · Product Feature: Whitening · Package Includes: 1 x Facial Kit · Volume: 125 ml

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Whitening facial kit for all skin types, 125 ml.', 3088, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/3461-77-MZ3461200010RNSGSE-776476001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3461-77-MZ3461200010RNSGSE-776476001-product-1.webp', NULL, 0, 0, 0, 'Gold Series 6 Steps Facial Kit | Ruby''s.pk', 'Whitening facial kit for all skin types, 125 ml.', datetime('now')),
('p-bs-02', 'Zafrani Whitening cream 💯 results 10 to 15 days', 'zafrani-whitening-cream-results-10-to-15-days', 'MKZ-775967-775967001', 'Material: Cream · Texture: High Pigmented · Skin Types: All Skin Types · Color: White · Product Feature: Whitening · Package Includes: 1 x Face Moisturizer · Volume: 100 ml

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Whitening face moisturizer for all skin types, 100 ml.', 1313, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/3488-77-MZ3488200004HRDLAZ-775967001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3488-77-MZ3488200004HRDLAZ-775967001-product-1.webp', NULL, 0, 0, 0, 'Zafrani Whitening cream 💯 results 10 to 15 days | Ruby''s.pk', 'Whitening face moisturizer for all skin types, 100 ml.', datetime('now')),
('p-bs-03', 'Berry exfoliating Gel for Face Brightening cleaning', 'berry-exfoliating-gel-for-face-brightening-cleaning', 'MKZ-777582-777582001', 'Material: Gel · Texture: Smooth · Skin Types: Normal Skin · Color: Purple · Product Feature: Brightening, Exfoliator, Glowing · Package Includes: 1 x Exfoliating Gel · Volume: 100 ml

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Brightening exfoliating gel for normal skin, 100 ml.', 1061, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/3465-77-MZ3465200013ADSE-777582001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3465-77-MZ3465200013ADSE-777582001-product-1.webp', NULL, 0, 0, 0, 'Berry exfoliating Gel for Face Brightening cleaning | Ruby''s.pk', 'Brightening exfoliating gel for normal skin, 100 ml.', datetime('now')),
('p-bs-04', 'Amellia Tea Tree Neem Face Wash Acne control 100 ml', 'amellia-tea-tree-neem-face-wash-acne-control-100-ml', 'MKZ-777596-777596001', 'Material: Cream · Texture: Smooth · Skin Types: All Skin Types · Color: Green, White · Product Feature: Acne Scar Removal, Remove Impurities · Package Includes: 1 x Face Wash · Volume: 100 ml

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Acne scar removal face wash for all skin types, 100 ml.', 1061, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/3465-77-MZ3465200014ADSE-777596001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3465-77-MZ3465200014ADSE-777596001-product-1.webp', NULL, 0, 0, 0, 'Amellia Tea Tree Neem Face Wash Acne control 100 ml | Ruby''s.pk', 'Acne scar removal face wash for all skin types, 100 ml.', datetime('now')),
('p-bs-05', 'Pack of 1 Face Mask - Random Multi Flavor- 1 Pc', 'pack-of-1-face-mask-random-multi-flavor-1-pc', 'MKZ-776367-776367001', 'Material: Liquid · Product Feature: Glowing, Brightening, Hydrating, Nourishing, Gentle For Skin · Package Includes: 1 x Face Mask

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Glowing face mask.', 711, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1855-77-MZ1855200107MS-776367001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1855-77-MZ1855200107MS-776367001-product-1.webp', NULL, 0, 0, 0, 'Pack of 1 Face Mask - Random Multi Flavor- 1 Pc | Ruby''s.pk', 'Glowing face mask.', datetime('now')),
('p-bs-06', 'SADOER DRAGON BLOOD Anti Aging Face Cream', 'sadoer-dragon-blood-anti-aging-face-cream', 'MKZ-777184-777184001', 'Material: Cream · Texture: High Pigmented · Skin Types: All Skin Types · Color: Red · Product Feature: Anti-Aging · Package Includes: 1 x Face Cream · Weight: 100 g

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Anti-aging face cream for all skin types, 100 g.', 1075, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1598-77-MZ1598203782TEWHHB-777184001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1598-77-MZ1598203782TEWHHB-777184001-product-1.webp', NULL, 0, 0, 0, 'SADOER DRAGON BLOOD Anti Aging Face Cream | Ruby''s.pk', 'Anti-aging face cream for all skin types, 100 g.', datetime('now')),
('p-bs-07', 'De''Lesh Facial Foam Facewash 100ml', 'de-lesh-facial-foam-facewash-100ml', 'MKZ-777156-777156001', 'Material: Cream · Texture: High Pigmented · Skin Types: All Skin Types · Color: Multicolor · Product Feature: Whitening And Brightening · Package Includes: 1 x Face Wash · Volume: 100 ml

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Whitening and brightening face wash for all skin types, 100 ml.', 1336, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1598-77-MZ1598203772TEWHHB-777156001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1598-77-MZ1598203772TEWHHB-777156001-product-1.webp', NULL, 0, 0, 0, 'De''Lesh Facial Foam Facewash 100ml | Ruby''s.pk', 'Whitening and brightening face wash for all skin types, 100 ml.', datetime('now')),
('p-bs-08', 'Herbal Zafrani Whitening And Brightening Face Cream 30', 'herbal-zafrani-whitening-and-brightening-face-cream-30', 'MKZ-777079-777079001', 'Material: Cream · Texture: Cream · Skin Types: All Skin Types · Color: White · Product Feature: Whitening And Brightening, Acne Scar Removal, Cell Operated, Nourishing · Package Includes: 01 x Face Cream · Volume: 30 ml

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Whitening and brightening face cream for all skin types, 30 ml.', 1875, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/3503-77-MZ3503200005MNPK-777079001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3503-77-MZ3503200005MNPK-777079001-product-1.webp', NULL, 0, 0, 0, 'Herbal Zafrani Whitening And Brightening Face Cream 30 | Ruby''s.pk', 'Whitening and brightening face cream for all skin types, 30 ml.', datetime('now')),
('p-bs-09', 'Glowing Face Cream', 'glowing-face-cream', 'MKZ-778309-778309001', 'Material: Cream · Product Feature: Glowing · Package Includes: 1 x Face Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Face cream with glowing benefits.', 938, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/3516-77-MZ3516200007SHSE-778309001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3516-77-MZ3516200007SHSE-778309001-product-1.webp', NULL, 0, 0, 0, 'Glowing Face Cream | Ruby''s.pk', 'Face cream with glowing benefits.', datetime('now')),
('p-bs-10', 'Whitening Face Cream', 'whitening-face-cream', 'MKZ-777950-777950001', 'Material: Cream · Texture: Cream · Skin Types: All Skin Types · Color: Off White · Product Feature: Whitening, Acne Scar Removal, Dead Skin Remover, Anti-Aging · Package Includes: 1 x Face Cream · Volume: 20 ml

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Face cream with whitening benefits for all skin types, 20 ml.', 1063, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/3327-77-MZ3327200032HE-777950001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3327-77-MZ3327200032HE-777950001-product-1.webp', NULL, 0, 0, 0, 'Whitening Face Cream | Ruby''s.pk', 'Face cream with whitening benefits for all skin types, 20 ml.', datetime('now')),
('p-bs-11', 'Uni Whiting Face Wash', 'uni-whiting-face-wash', 'MKZ-779473-779473001', 'Material: Cream · Texture: Smooth · Skin Types: All Skin Types · Color: White · Product Feature: Whitening, Whitening And Brightening · Package Includes: 1 x Face Wash · Volume: 100 ml

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Whitening face wash for all skin types, 100 ml.', 363, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/2902-77-MZ2902200014UICS-779473001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2902-77-MZ2902200014UICS-779473001-product-1.webp', NULL, 0, 0, 0, 'Uni Whiting Face Wash | Ruby''s.pk', 'Whitening face wash for all skin types, 100 ml.', datetime('now')),
('p-bs-12', 'Whitening And Brightening Face Cream', 'whitening-and-brightening-face-cream', 'MKZ-779748-779748001', 'Material: Gel · Product Feature: Whitening And Brightening, Anti-Aging, Nourishing, Dullness, Brightening · Package Includes: 50 x Face Cream, 30 x Exfoliating Mask, 100 x Face Toner

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Face cream with whitening and brightening benefits.', 750, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/3491-77-MZ3491200007ZNULHQ-779748001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3491-77-MZ3491200007ZNULHQ-779748001-product-1.webp', NULL, 0, 0, 0, 'Whitening And Brightening Face Cream | Ruby''s.pk', 'Face cream with whitening and brightening benefits.', datetime('now')),
('p-bs-13', '5 Piece Hand Cream Pack', '5-piece-hand-cream-pack', 'MKZ-779707-779707001', 'Material: Cream · Skin Types: All Skin Types · Product Feature: Whitening And Brightening · Package Includes: 5 x Hand Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Whitening and brightening hand cream for all skin types.', 1375, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/2807-77-MZ2807200140ALI-779707001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2807-77-MZ2807200140ALI-779707001-product-1.webp', NULL, 0, 0, 0, '5 Piece Hand Cream Pack | Ruby''s.pk', 'Whitening and brightening hand cream for all skin types.', datetime('now')),
('p-bs-14', 'Rubella Beauty Cream Dark Spot Anti Wrinkle Anti Acne', 'rubella-beauty-cream-dark-spot-anti-wrinkle-anti-acne', 'MKZ-675398-675398001', 'Rubella Beauty Cream is your ultimate solution for glowing, flawless skin in Pakistan’s diverse climate. Designed for all skin types, this premium quality cream delivers visible results in just three days, making it ideal for daily use or special occasions like weddings and office events. Its stylish golden packaging not only looks luxurious but also protects the cream from light and heat, ensuring long-lasting durability.

This nourishing formula targets dark spots, wrinkles, and dullness while also fighting acne and signs of aging. The cream’s rich texture absorbs quickly without leaving a greasy residue, making it perfect for all seasons. Made with high-quality, export-grade ingredients, it’s formulated to be gentle yet effective. The durable, sealed packaging keeps the product fresh and hygienic for extended use. Whether you’re looking for a brightening boost or a daily skincare ritual, this cream delivers consistent results.

- Dark Spot Reduction

- Anti-Wrinkle Benefits

- Anti-Aging Formula

- Anti-Dullness Action

- Anti-Acne Properties

- Export Quality, Durable Packaging

Material: Cream · Texture: Cream · Skin Types: All Skin Types · Color: Brown · Product Feature: Whitening · Package Includes: 2 x Whitening Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Rubella Beauty Cream is your ultimate solution for glowing, flawless skin in Pakistan’s diverse climate.', 1088, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/pakistan_675398.png?src=https%3A%2F%2Fstatic.markaz.app%2FGenerativeMedia%2FPakistan%2Fimages%2Fpakistan_675398.png', NULL, 0, 0, 0, 'Rubella Beauty Cream Dark Spot Anti Wrinkle Anti Acne | Ruby''s.pk', 'Rubella Beauty Cream is your ultimate solution for glowing, flawless skin in Pakistan’s diverse climate.', datetime('now')),
('p-bs-15', 'Glow Ria Zafrani Whitening Cream 250g Jar', 'glow-ria-zafrani-whitening-cream-250g-jar', 'MKZ-693232-693232001', 'This Glow Ria Zafrani Whitening Cream is your perfect solution for achieving radiant, even-toned skin in Pakistan’s diverse climate. Designed for daily use, it delivers visible results without compromising on comfort, making it ideal for both office wear and special occasions like weddings. The sleek, durable jar ensures your cream stays fresh and protected, while the high-pigmented formula glides smoothly for a flawless finish.

Crafted with premium ingredients, this cream nourishes and brightens your skin without irritation. The sturdy, stylish container is made to last, keeping your product safe from dust and spills. Whether you’re battling dryness or seeking a natural glow, this cream offers long-lasting hydration and a smooth, smudge-free finish. It’s perfect for all skin types, including sensitive and acne-prone skin, and works as a powerful moisturizer for both morning and evening routines.

- Premium Quality Whitening Cream for lasting results

- Durable, stylish jar with secure lid for freshness

- High-pigmented formula for smooth, even application

- Suitable for all skin types including dry and acne-prone

- Best price in Pakistan for high-quality skincare

- New Arrival with professional-grade whitening benefits

Material: Cream · Texture: High Pigmented · Skin Types: All Skin Types · Product Feature: Whitening And Brightening · Package Includes: 1 x Whitening Cream · Weight: 250 g

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'This Glow Ria Zafrani Whitening Cream is your perfect solution for achieving radiant, even-toned skin in Pakistan’s diverse climate.', 1075, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/pakistan_693232.png?src=https%3A%2F%2Fstatic.markaz.app%2FGenerativeMedia%2FPakistan%2Fimages%2Fpakistan_693232.png', NULL, 0, 0, 0, 'Glow Ria Zafrani Whitening Cream 250g Jar | Ruby''s.pk', 'This Glow Ria Zafrani Whitening Cream is your perfect solution for achieving radiant, even-toned skin in Pakistan’s diverse climate.', datetime('now')),
('p-bs-16', 'Anti Dark Circle Eye Cream for All Skin Types', 'anti-dark-circle-eye-cream-for-all-skin-types', 'MKZ-689722-689722001', 'This premium eye cream is specially formulated to reduce dark circles and puffiness, making your under-eye area look refreshed and youthful. Perfect for Pakistani weather and daily routines, it delivers long-lasting hydration without clogging pores. The sleek, durable tube ensures easy application and keeps the product fresh for longer. Its stylish design makes it a great addition to any beauty drawer.

The cream is made with advanced retinal liposome technology and fermented bear extract, which work together to brighten and firm the delicate eye area. Its smooth, creamy texture absorbs quickly without leaving a greasy residue, making it ideal for all skin types. The packaging is sturdy and travel-friendly, so you can carry it with confidence. Designed for daily use, it’s gentle enough for sensitive skin and effective enough for serious anti-aging results.

- Anti Dark Circle Formula

- Retinal Liposome Technology

- Fermented Bear Extract

- Suitable for All Skin Types

- Durable & Stylish Packaging

- New Arrival in Pakistan

Best price in Pakistan. Durable. Stylish. New Arrival.

Material: Cream · Skin Types: All Skin Types · Product Feature: Anti Dark Circle · Package Includes: 1 x Eye Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'This premium eye cream is specially formulated to reduce dark circles and puffiness, making your under-eye area look refreshed and youthful.', 1086, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1209-77-689722-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1209-77-689722-product-1.webp', NULL, 0, 0, 0, 'Anti Dark Circle Eye Cream for All Skin Types | Ruby''s.pk', 'This premium eye cream is specially formulated to reduce dark circles and puffiness, making your under-eye area look refreshed and youthful.', datetime('now')),
('p-bs-17', 'Premium Night Cream Pack 2 for All Skin Types', 'premium-night-cream-pack-2-for-all-skin-types', 'MKZ-524221-524221001', 'Revitalize your skin with this premium night cream pack, perfect for Pakistan’s warm climate and busy lifestyle. Wake up every morning with glowing, hydrated skin thanks to its nourishing formula that works while you sleep. Ideal for weddings, office wear, or daily use, this set ensures your skin stays fresh and radiant without the hassle.

This night cream is crafted with a smooth, non-greasy texture that absorbs quickly into the skin, leaving no residue. It’s designed for all skin types, including sensitive skin, and is made with high-quality, durable ingredients that deliver long-lasting results. The packaging is sleek and stylish, making it a great gift or personal treat. Whether you’re in Lahore, Karachi, or Islamabad, this cream adapts to your routine and climate.

- Hydrating formula for all skin types

- Smooth texture that absorbs effortlessly

- Pack of 2 for better value and regular use

- Premium quality with durable ingredients

- New arrival in Pakistan’s beauty market

- Best price in Pakistan for this pack size

Material: Cream · Texture: Smooth · Skin Types: All Skin Types · Product Feature: Hydrating, Nourishing · Package Includes: 2 x Night Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Revitalize your skin with this premium night cream pack, perfect for Pakistan’s warm climate and busy lifestyle.', 850, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1304-77-524221-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1304-77-524221-product-1.jpg', NULL, 0, 0, 0, 'Premium Night Cream Pack 2 for All Skin Types | Ruby''s.pk', 'Revitalize your skin with this premium night cream pack, perfect for Pakistan’s warm climate and busy lifestyle.', datetime('now')),
('p-bs-18', 'CeraVe Renewing SA Facial Cleanser 237ml All Skin Types', 'cerave-renewing-sa-facial-cleanser-237ml-all-skin-types', 'MKZ-499353-499353001', 'Perfect for Pakistani weather, this Renewing SA Cleanser gently removes daily grime without stripping your skin. Ideal for those seeking a fresh, smooth feel after every wash, it’s formulated for normal skin but works well across all types. The sleek, durable pump bottle ensures hygienic, mess-free dispensing, making it perfect for daily use at home or on the go.

This premium quality cleanser combines ceramides and salicylic acid to exfoliate and soften your skin while keeping it non-comedogenic and non-irritating. Its lightweight, gel-like texture glides smoothly over your face, leaving no residue. The bottle’s sturdy design and clear labeling make it easy to store and use. With a 237ml capacity, it offers excellent value for money — the best price in Pakistan for consistent, effective cleansing. Its stylish, minimalist look also makes it a great addition to any skincare routine.

- Gently cleanses and exfoliates while softening and smoothing skin

- Non-comedogenic, non-drying, non-irritating formula

- Contains ceramides and salicylic acid for skin renewal

- 237ml bottle with convenient pump dispenser

- Developed with dermatologists for safe, effective use

- Ideal for daily use and perfect for all skin types

Material: Liquid · Skin Types: All Skin Types · Product Feature: Rejuvenating · Package Includes: 1 x Facial Cleanser · Volume: 237 ml

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Perfect for Pakistani weather, this Renewing SA Cleanser gently removes daily grime without stripping your skin.', 1275, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1408-77-499353-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1408-77-499353-product-1.jpg', NULL, 0, 0, 0, 'CeraVe Renewing SA Facial Cleanser 237ml All Skin Types | Ruby''s.pk', 'Perfect for Pakistani weather, this Renewing SA Cleanser gently removes daily grime without stripping your skin.', datetime('now')),
('p-bs-19', 'Zafrani Whitening Cream for All Skin Types Off White', 'zafrani-whitening-cream-for-all-skin-types-off-white', 'MKZ-708535-708535001', 'Struggling with dull, uneven skin tone? This new arrival is your perfect solution for a radiant glow that lasts all season. Designed for Pakistani skin types, it delivers premium quality results without harsh chemicals, making it ideal for daily use at home or for special occasions.

Our Whitening And Brightening New Zafrani Whitening Cream is crafted with smooth, rich texture that glides effortlessly onto your skin. It’s not just a cosmetic—it’s a daily ritual for renewal. The formula gently exfoliates dead skin cells while targeting acne scars for a smoother, brighter complexion. Made with natural ingredients, it’s durable enough to handle Pakistan’s hot and humid weather without drying out your skin. You’ll notice the difference in just a few days, and the results are long-lasting.

- Premium Quality formula for all skin types

- Best price in Pakistan for lasting results

- Durable and gentle on sensitive skin

- Stylish off-white cream with a smooth texture

- New Arrival with proven brightening power

- Includes 1 x Whitening Cream for immediate use

Whitening And Brightening New Zafrani Whitening Cream

Material: Cream · Texture: Smooth · Skin Types: All Skin Types · Color: Off White · Product Feature: Whitening, Whitening And Brightening, Acne Scar Removal, Dead Skin Remover · Package Includes: 1 x Whitening Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Struggling with dull, uneven skin tone?', 726, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1013-77-708535-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-77-708535-product-1.webp', NULL, 0, 0, 0, 'Zafrani Whitening Cream for All Skin Types Off White | Ruby''s.pk', 'Struggling with dull, uneven skin tone?', datetime('now')),
('p-bs-20', 'Whitening And Brightening Facial Kit', 'whitening-and-brightening-facial-kit', 'MKZ-754489-754489001', 'Material: Cream · Skin Types: All Skin Types · Product Feature: Whitening And Brightening · Package Includes: 1 x Facial Kit

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Facial kit with whitening and brightening benefits for all skin types.', 3050, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/2807-77-754489-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2807-77-754489-product-1.webp', NULL, 0, 0, 0, 'Whitening And Brightening Facial Kit | Ruby''s.pk', 'Facial kit with whitening and brightening benefits for all skin types.', datetime('now')),
('p-bs-21', 'Flicka Whitening Cream for All Skin Types Pakistan', 'flicka-whitening-cream-for-all-skin-types-pakistan', 'MKZ-687560-687560001', 'Looking for a cream that truly works for your skin type and local climate? This Flicka Whitening And Brightening Cream is specially formulated to deliver visible results without compromising on comfort. Perfect for daily use, it’s ideal for brides, office professionals, and anyone seeking a refreshed, glowing complexion that lasts through the day. Its premium quality formula is designed to enhance your natural beauty while protecting your skin from environmental stressors.

This cream is crafted with powerful, skin-loving ingredients like Vitamin C, Palm Kernal Oil, Shea Butter, Vitamin E, Aloe Vera, and Coconut Oil. These natural components work together to nourish, brighten, and protect your skin without harsh chemicals. The off-white color and smooth texture make it easy to apply and blend, ensuring a flawless finish. It’s durable enough for daily wear and suitable for all skin types, making it a smart choice for anyone in Pakistan.

- Premium Quality Formula with Natural Whitening Agents

- Best Price in Pakistan for Long-Lasting Results

- Durable and Smudge-Free Finish for All-Day Wear

- Ideal for Bridal Wear and Office Use

- Refreshed Morning Skin Care Routine

- Suitable for All Skin Types and Local Weather Conditions

Material: Cream · Skin Types: All Skin Types · Color: Off White · Product Feature: Whitening And Brightening · Package Includes: 1 x Whitening Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Looking for a cream that truly works for your skin type and local climate?', 1063, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1731-77-687560-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1731-77-687560-product-1.webp', NULL, 0, 0, 0, 'Flicka Whitening Cream for All Skin Types Pakistan | Ruby''s.pk', 'Looking for a cream that truly works for your skin type and local climate?', datetime('now')),
('p-bs-22', 'Vita A Retinal Shot Tightening Booster Cream for Firm Skin', 'vita-a-retinal-shot-tightening-booster-cream-for-firm-skin', 'MKZ-688255-688255001', 'Introducing the Vita A Retinal Shot Tightening Booster – your ultimate solution for firmer, more youthful-looking skin in Pakistan’s diverse climate. Designed for daily use, this premium quality cream delivers visible results without irritation, making it ideal for both office wear and special occasions. Its sleek, durable tube ensures long-lasting freshness and stylish presentation, perfect for gifting or personal use.

This high-performance elasticity booster is crafted with advanced science to target fine lines and sagging skin. The nano-sized 0.1% Retinal penetrates deeply for maximum effectiveness, while the 1% Panthenol soothes and hydrates. The 3% MATRIXYL® 3000 enhances firmness and resilience, ensuring your skin stays supple and radiant. The cream’s smooth, non-greasy texture absorbs quickly, leaving no residue – a key feature for busy Pakistani women who value both performance and convenience.

- Nano-sized 0.1% Retinal for targeted tightening

- 1% Panthenol for soothing hydration

- 3% MATRIXYL® 3000 for enhanced firmness

- Premium quality formula suitable for all skin types

- Stylish, durable tube for easy daily use

- New arrival in Pakistan – best price guaranteed

Material: Cream · Skin Types: All Skin Types · Product Feature: Whitening And Brightening · Package Includes: 1 x Collagen Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Introducing the Vita A Retinal Shot Tightening Booster – your ultimate solution for firmer, more youthful-looking skin in Pakistan’s diverse climate.', 1246, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1776-77-688255-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1776-77-688255-product-1.webp', NULL, 0, 0, 0, 'Vita A Retinal Shot Tightening Booster Cream for Firm Skin | Ruby''s.pk', 'Introducing the Vita A Retinal Shot Tightening Booster – your ultimate solution for firmer, more youthful-looking skin in Pakistan’s diverse climate.', datetime('now')),
('p-bs-23', 'Viki Skin Polisher 20 Ultra Whitening Brightening Exfoliator', 'viki-skin-polisher-20-ultra-whitening-brightening-exfoliator', 'MKZ-692017-692017001', 'Perfect for Pakistani skin, this Viki Skin Polisher delivers ultra-brightening results with a luxurious 24 Karat Gold formula. Ideal for daily use or special occasions, it gently exfoliates while enhancing your natural glow without harsh chemicals.

Crafted with premium quality powder and high-pigmented texture, this polish is designed to last and perform consistently. Its durable formula ensures smooth application and long-lasting results, making it perfect for all skin types. The stylish blue and white packaging adds a touch of elegance to your skincare routine, while the new arrival status means you’re getting the latest innovation in Pakistani beauty.

- Exfoliates dead skin for a smoother, brighter complexion

- Contains 24 Karat Gold for enhanced radiance

- Suitable for all skin types including sensitive skin

- Lightweight, non-greasy texture for easy application

- Durable formula that lasts through multiple uses

- New arrival with premium quality and best price in Pakistan

Whitening And Brightening Viki Skin Polisher

Material: Powder · Texture: High Pigmented · Skin Types: All Skin Types · Product Feature: Exfoliator, Whitening And Brightening, Whitening, Dead Skin Remover, Brightening · Package Includes: 1 x Skin Polisher

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Perfect for Pakistani skin, this Viki Skin Polisher delivers ultra-brightening results with a luxurious 24 Karat Gold formula.', 811, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/221-77-692017-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F221-77-692017-product-1.webp', NULL, 0, 0, 0, 'Viki Skin Polisher 20 Ultra Whitening Brightening Exfoliator | Ruby''s.pk', 'Perfect for Pakistani skin, this Viki Skin Polisher delivers ultra-brightening results with a luxurious 24 Karat Gold formula.', datetime('now')),
('p-bs-24', 'CHIRS''S UK Blackhead Peel Off Face Mask', 'chirs-s-uk-blackhead-peel-off-face-mask', 'MKZ-717665-717665001', 'Material: Cream · Texture: Cream · Skin Types: All Skin Types · Color: Black · Product Feature: Removes Dirt · Package Includes: 1 x Face Mask

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Removes dirt face mask for all skin types.', 775, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1864-77-717665-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1864-77-717665-product-1.webp', NULL, 0, 0, 0, 'CHIRS''S UK Blackhead Peel Off Face Mask | Ruby''s.pk', 'Removes dirt face mask for all skin types.', datetime('now')),
('p-bs-25', 'Zafrani Whitening Cream, 250g, Buy 1 Get 1 Free', 'zafrani-whitening-cream-250g-buy-1-get-1-free', 'MKZ-749817-749817001', 'Material: Cream · Texture: Cream · Skin Types: All Skin Types · Product Feature: Whitening, Whitening And Brightening, Brightening, Nourishing, Glowing, Gentle For Skin, Dullness · Package Includes: 2 x Whitening Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Whitening cream for all skin types.', 1050, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1347-77-749817-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-749817-product-1.webp', NULL, 0, 0, 0, 'Zafrani Whitening Cream, 250g, Buy 1 Get 1 Free | Ruby''s.pk', 'Whitening cream for all skin types.', datetime('now')),
('p-bs-26', 'Frozen Collagen Whitening Capsules 60x10', 'frozen-collagen-whitening-capsules-60x10', 'MKZ-721048-721048001', 'Perfect for Pakistani skin types, this frozen collagen formula delivers premium whitening results without harsh chemicals. Ideal for daily use, it’s designed to brighten your complexion while keeping your skin hydrated and refreshed.

This new arrival is crafted with durable, high-quality collagen that nourishes and revitalizes your skin. The stylish blue packaging with festive snowman design makes it a great gift or personal treat. Each capsule is packed with 30% premium collagen and 10% liquid formula, ensuring long-lasting benefits. The lightweight texture absorbs quickly, leaving no greasy residue.

- Whitening and brightening formula for radiant skin

- Premium collagen for deep hydration and repair

- 60 capsules per pack for long-term use

- Durable, travel-friendly packaging

- Stylish winter-themed design

- Best price in Pakistan for quality results

Material: Collagen · Product Feature: Whitening And Brightening · Package Includes: 60 x Whitening Capsules

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Perfect for Pakistani skin types, this frozen collagen formula delivers premium whitening results without harsh chemicals.', 825, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1776-77-721048-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1776-77-721048-product-1.webp', NULL, 0, 0, 0, 'Frozen Collagen Whitening Capsules 60x10 | Ruby''s.pk', 'Perfect for Pakistani skin types, this frozen collagen formula delivers premium whitening results without harsh chemicals.', datetime('now')),
('p-bs-27', 'CeraVe Skin Glowing Face Wash 200ml All Skin Types', 'cerave-skin-glowing-face-wash-200ml-all-skin-types', 'MKZ-559228-559228001', 'Perfect for Pakistani skin, this premium face wash delivers gentle yet effective cleansing to reveal a brighter, more youthful glow. Ideal for daily use, it’s specially formulated to combat signs of aging while keeping your skin hydrated and refreshed, even in our hot and humid climate.

Crafted with high-pigmented liquid formula, this anti-aging wash is designed for all skin types and offers a smooth, rolling sensation that leaves your complexion radiant. The durable, sleek packaging ensures long-lasting freshness and easy dispensing, making it a stylish addition to your skincare routine. Its whitening and brightening properties help fade dark spots and even out tone, giving you that healthy, glowing look without irritation.

- Anti-Aging & Brightening Formula

- Suitable for All Skin Types

- High Pigmented Liquid Texture

- Durable & Stylish Packaging

- New Arrival in Pakistan

- Best Price in Pakistan for Premium Quality

Material: Liquid · Texture: High Pigmented · Skin Types: All Skin Types · Product Feature: Anti-Aging, Whitening And Brightening · Package Includes: 1 x Face Wash

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Perfect for Pakistani skin, this premium face wash delivers gentle yet effective cleansing to reveal a brighter, more youthful glow.', 938, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1304-77-559228-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1304-77-559228-product-1.jpeg', NULL, 0, 0, 0, 'CeraVe Skin Glowing Face Wash 200ml All Skin Types | Ruby''s.pk', 'Perfect for Pakistani skin, this premium face wash delivers gentle yet effective cleansing to reveal a brighter, more youthful glow.', datetime('now')),
('p-bs-28', 'Lipoma Removal Cream for Fat Retention & Herbicide Action', 'lipoma-removal-cream-for-fat-retention-herbicide-action', 'MKZ-719309-719309001', 'Say goodbye to stubborn lipomas and unwanted fat retention with our premium lipoma removal cream. Perfect for Pakistani skin types, this innovative formula targets common acne scars and stubborn bumps without harsh chemicals. Ideal for daily use, it’s designed to deliver visible results in just a few weeks.

This cream is formulated with herbal extracts that gently exfoliate and brighten your skin, helping to reduce the appearance of dark spots and uneven tone. The packaging is sleek and durable, making it easy to store and use. Its lightweight texture absorbs quickly without leaving a greasy residue, ensuring comfort all day. The product is dermatologist-tested and safe for sensitive skin, making it a trusted choice for anyone seeking natural solutions.

- New Arrival in Pakistan

- Dermatologist Tested

- Lightweight & Non-Greasy

- Herbal Formula for Brightening

- Durable Packaging

- Best Price in Pakistan

Material: Cream · Product Feature: Cell Operated · Package Includes: 1 x Collagen Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Say goodbye to stubborn lipomas and unwanted fat retention with our premium lipoma removal cream.', 836, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1776-77-718956-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1776-77-718956-product-1.webp', NULL, 0, 0, 0, 'Lipoma Removal Cream for Fat Retention & Herbicide Action | Ruby''s.pk', 'Say goodbye to stubborn lipomas and unwanted fat retention with our premium lipoma removal cream.', datetime('now')),
('p-bs-29', 'Zafrani Whitening Cream', 'zafrani-whitening-cream', 'MKZ-754744-754744001', 'Material: Cream · Texture: Cream · Skin Types: All Skin Types · Product Feature: Whitening, Whitening And Brightening, Acne Scar Removal, Brightening, Hydrating, Nourishing, Glowing, Gentle For Skin, Dullness, Anti Dark Circle · Package Includes: 1 x Whitening Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Whitening cream for all skin types.', 1163, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1304-77-754744-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1304-77-754744-product-1.webp', NULL, 0, 0, 0, 'Zafrani Whitening Cream | Ruby''s.pk', 'Whitening cream for all skin types.', datetime('now')),
('p-bs-30', 'Dr Rashel Whitening Face Wash 150ml All Skin Types', 'dr-rashel-whitening-face-wash-150ml-all-skin-types', 'MKZ-630139-630139001', 'Looking for a face wash that truly brightens your skin without harsh chemicals? Dr Rashel Whitening And Glowing Face Wash is your perfect match — specially crafted for Pakistani skin types and designed to deliver visible results with every use. Whether you’re battling dullness or just want to refresh your glow, this gentle yet powerful cleanser works all year round, making it ideal for both morning and evening routines.

This premium quality face wash is formulated with skin-loving ingredients that gently cleanse while boosting radiance. Its smooth texture ensures easy application and complete coverage, leaving your skin feeling refreshed and protected. Durable in formulation and gentle on sensitive skin, it’s perfect for daily use without stripping moisture. The 150ml bottle offers long-lasting value, making it one of the best price in Pakistan for clean, glowing skin. Say goodbye to dullness and hello to a brighter, healthier complexion — naturally.

- Smooth, non-sticky texture for easy rinsing

- Suitable for all skin types including sensitive skin

- Whitening and brightening formula for radiant results

- Long-lasting freshness with daily use

- Affordable premium quality for Pakistani households

- Ideal for morning and evening skincare routines

Material: Liquid · Texture: Smooth · Skin Types: All Skin Types · Product Feature: Whitening And Brightening · Package Includes: 1 x Face Wash · Volume: 150 ml

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Looking for a face wash that truly brightens your skin without harsh chemicals?', 738, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/700-77-630139-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F700-77-630139-product-1.jpg', NULL, 0, 0, 0, 'Dr Rashel Whitening Face Wash 150ml All Skin Types | Ruby''s.pk', 'Looking for a face wash that truly brightens your skin without harsh chemicals?', datetime('now')),
('p-bs-31', 'Premium Whitening Cream for All Skin Types, Buy 1 Get 1 Free', 'premium-whitening-cream-for-all-skin-types-buy-1-get-1-free', 'MKZ-688458-688458001', 'Perfect for Pakistani skin types, this premium whitening cream offers gentle yet effective brightening for all seasons. Ideal for weddings, parties, or daily wear, it helps remove dullness and impurities while keeping your skin hydrated and glowing. The brown glass jars are stylish and durable, protecting the cream from light and preserving its quality.

This new arrival is designed for long-lasting results with ingredients that treat fine lines, reduce hyperpigmentation, and nourish your skin. The cream absorbs quickly without leaving a greasy residue, making it perfect for both morning and evening routines. Its gentle formula is safe for sensitive skin and suitable for all skin types, including acne-prone and dry skin. The brown glass jars are not only stylish but also reusable and travel-friendly, ensuring your cream stays fresh wherever you go.

- Premium Quality Whitening Cream for All Skin Types

- Durable Brown Glass Jars with Black Lids

- New Arrival with Buy 1 Get 1 Free Offer

- Gentle Formula for Acne Scar Removal and Brightening

- Hydrating and Nourishing for Long-Lasting Glow

- Stylish Packaging Perfect for Bridal and Party Wear

Material: Cream · Texture: Cream · Skin Types: All Skin Types · Product Feature: Exfoliator, Whitening, Whitening And Brightening, Acne Scar Removal, Brightening, Dead Skin Remover, Anti-Aging, Absorbent, Hydrating, Nourishing, Rejuvenating, Glowing, Hyperpigmentation, Removes Dirt, Remove Impurities, Gentle For Skin, Treat Fine Lines, Dullness · Package Includes: 2 x Whitening Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Perfect for Pakistani skin types, this premium whitening cream offers gentle yet effective brightening for all seasons.', 1211, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1347-77-688458-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-688458-product-1.webp', NULL, 0, 0, 0, 'Premium Whitening Cream for All Skin Types, Buy 1 Get 1 Free | Ruby''s.pk', 'Perfect for Pakistani skin types, this premium whitening cream offers gentle yet effective brightening for all seasons.', datetime('now')),
('p-bs-32', 'Orange Enzyme Exfoliating Brightening Gel for All Skin Types', 'orange-enzyme-exfoliating-brightening-gel-for-all-skin-types', 'MKZ-667043-667043001', 'This premium quality Orange Exfoliating Gel is the perfect solution for Pakistani skin, offering gentle yet effective exfoliation that suits all skin types. Designed for local weather and daily use, it delivers a soft, radiant glow without irritation. Its stylish orange packaging makes it a standout addition to your beauty routine, while the durable gel formula ensures long-lasting performance. Whether you’re preparing for a special occasion or simply want to refresh your skin, this new arrival is ideal for your everyday needs.

The gel’s enzymatic formula works gently to remove dead skin cells, revealing a brighter, smoother complexion. Its lightweight texture absorbs quickly, leaving no residue, and the mild exfoliation is perfect for sensitive skin. The product is made with high-quality ingredients that are safe for daily use, and the packaging is designed to preserve freshness. It’s a durable, stylish product that delivers visible results with just one minute of use.

- Brightening formula for radiant skin

- Gentle enzymatic exfoliation for all skin types

- Lightweight gel texture that absorbs quickly

- SPF 16-35 protection for daily use

- Stylish orange packaging with premium design

- New arrival at best price in Pakistan

Material: Gel · Skin Types: All Skin Types · Product Feature: Exfoliator, Brightening · Package Includes: 1 x Exfoliating Gel

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'This premium quality Orange Exfoliating Gel is the perfect solution for Pakistani skin, offering gentle yet effective exfoliation that suits all skin types.', 724, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1180-77-667043-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1180-77-667043-product-1.webp', NULL, 0, 0, 0, 'Orange Enzyme Exfoliating Brightening Gel for All Skin Types | Ruby''s.pk', 'This premium quality Orange Exfoliating Gel is the perfect solution for Pakistani skin, offering gentle yet effective exfoliation that suits all skin types.', datetime('now')),
('p-bs-33', 'Whitening Face Wash AVA skincare', 'whitening-face-wash-ava-skincare', 'MKZ-743433-743433001', 'Material: Cream · Texture: Cream · Skin Types: All Skin Types · Product Feature: Whitening, Whitening And Brightening, Cell Operated, Dead Skin Remover, Brightening · Package Includes: 1 x Face Wash

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Whitening face wash for all skin types.', 711, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1004-77-743433-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1004-77-743433-product-1.webp', NULL, 0, 0, 0, 'Whitening Face Wash AVA skincare | Ruby''s.pk', 'Whitening face wash for all skin types.', datetime('now')),
('p-bs-34', 'Night Cream 50ml Bright White Clear Skin for Pakistani Skin', 'night-cream-50ml-bright-white-clear-skin-for-pakistani-skin', 'MKZ-666837-666837001', 'This premium night cream is specially crafted for Pakistani skin, offering deep hydration and brightening power that works overnight to reveal a flawless, radiant glow. Perfect for brides, Eid celebrations, or daily use, it’s lightweight yet nourishing, making it ideal for all skin types including sensitive skin. The sleek white jar with a secure lid ensures your cream stays fresh and protected, while the stylish design makes it a perfect addition to your beauty routine or travel bag.

The cream is formulated with gentle, skin-loving ingredients that help even out tone and reduce dullness without causing irritation. Its creamy texture absorbs quickly, leaving no greasy residue, and it’s designed to be durable and effective even in Pakistan’s humid climate. The packaging is travel-friendly and leak-proof, so you can carry it safely to any event or destination. It’s a new arrival that delivers visible results with consistent use.

- Whitening and brightening formula for radiant skin

- Suitable for all skin types including sensitive skin

- Lightweight, non-greasy, fast-absorbing texture

- Travel-friendly, leak-proof packaging

- Durable and long-lasting formula

- Best price in Pakistan for premium quality results

Material: Cream · Texture: Cream · Skin Types: All Skin Types · Color: White · Product Feature: Whitening And Brightening · Package Includes: 1 x Night Cream · Volume: 50 ml

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'This premium night cream is specially crafted for Pakistani skin, offering deep hydration and brightening power that works overnight to reveal a flawless, radiant glow.', 474, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1731-77-666837-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1731-77-666837-product-1.webp', NULL, 0, 0, 0, 'Night Cream 50ml Bright White Clear Skin for Pakistani Skin | Ruby''s.pk', 'This premium night cream is specially crafted for Pakistani skin, offering deep hydration and brightening power that works overnight to reveal a flawless, radiant glow.', datetime('now')),
('p-bs-35', 'Night Cream Whitening Brightening for All Skin Types', 'night-cream-whitening-brightening-for-all-skin-types', 'MKZ-717814-717814001', 'This premium night cream is specially formulated for Pakistani skin, offering deep hydration and brightening effects that work overnight to reveal a more radiant complexion. Perfect for daily use, it’s ideal for those seeking a natural glow without harsh chemicals. The sleek, modern packaging is not only stylish but also durable, making it easy to carry and store.

The cream is designed to be gentle on all skin types, including sensitive skin, while delivering visible results over time. Its lightweight texture absorbs quickly without leaving a greasy residue, making it suitable for all seasons. The product is vegan and cruelty-free, ensuring ethical skincare for your family. It’s a new arrival that combines traditional beauty techniques with modern science to deliver lasting results.

- Whitening and brightening formula for a luminous glow

- Hydrating and nourishing for soft, supple skin

- Suitable for all skin types including sensitive skin

- Vegan and cruelty-free for ethical beauty

- Lightweight, non-greasy texture for easy application

- Durable, stylish packaging for everyday use

Material: Cream · Product Feature: Whitening, Whitening And Brightening, Hydrating, Brightening, Vegan Rice Milk, Hyperpigmentation · Package Includes: 1 x Night Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'This premium night cream is specially formulated for Pakistani skin, offering deep hydration and brightening effects that work overnight to reveal a more radiant complexion.', 688, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/2017-77-717814-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2017-77-717814-product-1.webp', NULL, 0, 0, 0, 'Night Cream Whitening Brightening for All Skin Types | Ruby''s.pk', 'This premium night cream is specially formulated for Pakistani skin, offering deep hydration and brightening effects that work overnight to reveal a more radiant complexion.', datetime('now')),
('p-bs-36', 'Whitening Face Wash AVA Wash', 'whitening-face-wash-ava-wash', 'MKZ-750541-750541001', 'Material: Cream · Texture: Cream · Skin Types: All Skin Types · Product Feature: Whitening, Whitening And Brightening, Acne Scar Removal, Dead Skin Remover, Brightening · Package Includes: 1 x Face Wash

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Whitening face wash for all skin types.', 699, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1183-77-750541-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1183-77-750541-product-1.webp', NULL, 0, 0, 0, 'Whitening Face Wash AVA Wash | Ruby''s.pk', 'Whitening face wash for all skin types.', datetime('now')),
('p-bs-37', 'Zafrani Whitening Cream Set of 2 200 gram', 'zafrani-whitening-cream-set-of-2-200-gram', 'MKZ-682048-682048001', 'Looking for a safe, effective whitening solution that works for all skin types? This premium quality cream delivers flawless results without harsh chemicals, making it ideal for daily use in Pakistan’s diverse climate. Whether you’re battling dryness or seeking a radiant glow, this new arrival is your perfect morning and evening skincare companion.

Crafted with high-pigmented formula, this cream is designed to nourish and brighten your skin while remaining gentle. Its durable, long-lasting texture ensures consistent performance, and the clean, non-irritating formula is perfect for sensitive skin. The stylish, easy-to-use jars make it convenient for your daily routine, whether you’re at home or on the go.

- Premium quality whitening cream for all skin types

- Durable, high-pigmented formula with no side effects

- New arrival – perfect for daily morning and evening use

- Buy 1 Get 1 Free – best price in Pakistan

- 200 gram set – ideal for long-term use

- Stylish glass jars for easy storage and application

Material: Cream · Texture: High Pigmented · Skin Types: All Skin Types · Product Feature: Whitening · Package Includes: 2 x Whitening Cream · Weight: 200 g

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Looking for a safe, effective whitening solution that works for all skin types?', 1188, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1718-77-682048-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1718-77-682048-product-1.webp', NULL, 0, 0, 0, 'Zafrani Whitening Cream Set of 2 200 gram | Ruby''s.pk', 'Looking for a safe, effective whitening solution that works for all skin types?', datetime('now')),
('p-bs-38', 'The Ordinary Face Wash 100ml Niacinamide 10% Zinc 1% All Skin Types', 'the-ordinary-face-wash-100ml-niacinamide-10-zinc-1-all-skin-types', 'MKZ-592646-592646001', 'This premium quality face wash is specially formulated to deliver clean, glowing skin without harsh chemicals. Perfect for Pakistan’s hot and humid climate, it gently removes dirt and impurities while keeping your skin hydrated and balanced. Whether you’re heading to work or a special event, this stylish and effective cleanser ensures your skin stays fresh and flawless all day.

Made with a smooth, non-sticky texture that glides effortlessly over your skin, this face wash is designed for durability and long-lasting results. Its lightweight formula absorbs quickly without leaving residue, making it ideal for daily use. The tube is made of sturdy, leak-proof material that protects the product and keeps it fresh until the last drop. It’s a new arrival that’s quickly becoming a favorite among skincare enthusiasts across Pakistan.

- Hydrating formula for all skin types

- Removes dirt and excess oil without drying

- Contains 10% Niacinamide for brighter skin

- 100 ml size for long-term use

- Stylish, easy-to-use tube design

- Best price in Pakistan for premium quality

Material: Liquid · Texture: Smooth · Skin Types: All Skin Types · Product Feature: Hydrating, Removes Dirt · Package Includes: 1 x Face Wash

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'This premium quality face wash is specially formulated to deliver clean, glowing skin without harsh chemicals.', 613, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1347-77-592646-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-592646-product-1.jpeg', NULL, 0, 0, 0, 'The Ordinary Face Wash 100ml Niacinamide 10% Zinc 1% All Skin Types | Ruby''s.pk', 'This premium quality face wash is specially formulated to deliver clean, glowing skin without harsh chemicals.', datetime('now')),
('p-bs-39', 'Anti Dark Circle Eye Cream 4% Retinol + Fermented Bean Extract', 'anti-dark-circle-eye-cream-4-retinol-fermented-bean-extract', 'MKZ-689683-689683001', 'This premium eye cream is specially formulated to reduce dark circles and puffiness, making your under-eye area look refreshed and youthful. Perfect for Pakistani weather and daily use, it delivers long-lasting hydration without clogging pores. The sleek, stylish packaging not only protects the product but also adds a touch of elegance to your beauty routine.

Made with high-quality, dermatologically tested ingredients, this cream is gentle on all skin types and designed to withstand daily wear and tear. Its durable formula ensures consistent performance, even in humid conditions. The minimalist design and clean white packaging make it ideal for gifting or keeping in your makeup bag.

- Anti Dark Circle Formula with Retinal Liposome 4% for targeted brightening

- Fermented Bean Extract for soothing and nourishing the delicate eye area

- Lightweight, non-greasy texture that absorbs quickly

- Suitable for all skin types including sensitive skin

- Stylish, durable packaging that protects the cream and looks great on shelves

- New Arrival in Pakistan – best price for premium quality

Always perform a patch test before first use. Verify ingredients for allergies and follow package directions.

Material: Cream · Skin Types: All Skin Types · Product Feature: Anti Dark Circle · Package Includes: 1 x Eye Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'This premium eye cream is specially formulated to reduce dark circles and puffiness, making your under-eye area look refreshed and youthful.', 1086, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1004-77-689683-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1004-77-689683-product-1.webp', NULL, 0, 0, 0, 'Anti Dark Circle Eye Cream 4% Retinol + Fermented Bean Extract | Ruby''s.pk', 'This premium eye cream is specially formulated to reduce dark circles and puffiness, making your under-eye area look refreshed and youthful.', datetime('now')),
('p-bs-40', 'Black Head Remover Vacuum', 'black-head-remover-vacuum', 'MKZ-757935-757935001', 'Material: Collagen · Skin Types: Normal Skin · Product Feature: Battery Operated · Package Includes: 1 x Black Head Remover

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Battery operated black head remover for normal skin.', 1961, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/163-77-757935-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F163-77-757935-product-1.webp', NULL, 0, 0, 0, 'Black Head Remover Vacuum | Ruby''s.pk', 'Battery operated black head remover for normal skin.', datetime('now')),
('p-bs-41', 'Zafrani Whitening Glowing Cream for All Skin Types', 'zafrani-whitening-glowing-cream-for-all-skin-types', 'MKZ-688456-688456001', 'Get ready to glow with our Zafrani Whitening Glowing Cream – the perfect solution for Pakistani women seeking radiant, even-toned skin without harsh chemicals. Designed for all skin types, this creamy formula gently exfoliates, brightens, and nourishes while protecting against dullness and hyperpigmentation. Whether you’re heading to a wedding, Eid celebration, or just want to refresh your daily routine, this cream delivers long-lasting hydration and a smooth, luminous finish that lasts all day.

Crafted with premium quality ingredients, this cream is gentle enough for daily use yet powerful enough to treat fine lines and restore your skin’s natural glow. The durable, reusable glass jar design ensures your cream stays fresh and protected, making it ideal for travel or storage. Its stylish, vibrant orange and white swirl design adds a touch of elegance to your beauty routine, while the lightweight texture absorbs quickly without leaving a greasy residue. Perfect for brides, party-goers, or anyone who wants to look their best under any lighting.

- Premium Quality Cream for All Skin Types

- Gentle Exfoliation & Brightening Formula

- Hydrating, Nourishing, and Rejuvenating

- Stylish Glass Jar with Reusable Design

- Long-Lasting Glow for Daily or Special Occasions

- Best Price in Pakistan for High-Quality Results

Material: Cream · Texture: Cream · Skin Types: All Skin Types · Product Feature: Exfoliator, Whitening, Whitening And Brightening, Brightening, Dead Skin Remover, Absorbent, Hydrating, Nourishing, Rejuvenating, Glowing, Hyperpigmentation, Treat Fine Lines, Dullness, Gentle For Skin · Package Includes: 1 x Hand And Foot Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Get ready to glow with our Zafrani Whitening Glowing Cream – the perfect solution for Pakistani women seeking radiant, even-toned skin without harsh chemicals.', 648, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1347-77-688456-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-688456-product-1.webp', NULL, 0, 0, 0, 'Zafrani Whitening Glowing Cream for All Skin Types | Ruby''s.pk', 'Get ready to glow with our Zafrani Whitening Glowing Cream – the perfect solution for Pakistani women seeking radiant, even-toned skin without harsh chemicals.', datetime('now')),
('p-bs-42', 'Mandelac Face Wash', 'mandelac-face-wash', 'MKZ-749820-749820001', 'Material: Liquid · Product Feature: Whitening And Brightening · Package Includes: 1 x Face Wash

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Whitening and brightening face wash.', 2210, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/2414-77-749820-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2414-77-749820-product-1.webp', NULL, 0, 0, 0, 'Mandelac Face Wash | Ruby''s.pk', 'Whitening and brightening face wash.', datetime('now')),
('p-bs-43', 'Rice Extract Brightening Glow Kit for All Skin Types', 'rice-extract-brightening-glow-kit-for-all-skin-types', 'MKZ-664933-664933001', 'Discover the secret to glowing, even-toned skin with our Premium Quality Brightening Rice Facial Kit, the Best price in Pakistan for a complete whitening and exfoliating routine. Perfect for local weather and daily use, this set is ideal for anyone seeking a natural, effective glow without harsh chemicals. Whether you’re preparing for a special occasion or simply want to refresh your skin, this kit delivers visible results with every use.

Crafted with Organic Source Rice Extract, this kit is both Durable and Stylish, designed to last and enhance your beauty regimen. The smooth, creamy texture ensures gentle application while effectively brightening and exfoliating. Each product in the set is Dermatologist Tested and Free from Paraben, Sulfate, and other irritants, making it safe for sensitive skin. The beige-colored packaging reflects a clean, modern aesthetic that complements any home or travel setup.

- Includes 3 essential products: Brightening Rice Face Wash, Rice Scrub, and Rice Powder Organic Mask.

- Formulated with Organic Source Rice Extract for natural brightening and skin renewal.

- Free from Paraben, Sulfate, and other harmful chemicals for safe, gentle use.

- Dermatologist Tested and suitable for all skin types.

- Designed for daily use with a smooth, non-sticky texture.

- New Arrival in Pakistan – experience the glow that moves you.

Material: Cream · Texture: Smooth · Skin Types: All Skin Types · Color: Beige · Product Feature: Whitening And Brightening · Package Includes: 1 x Facial Kit

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Discover the secret to glowing, even-toned skin with our Premium Quality Brightening Rice Facial Kit, the Best price in Pakistan for a complete whitening and exfoliating routine.', 988, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/221-77-664933-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F221-77-664933-product-1.webp', NULL, 0, 0, 0, 'Rice Extract Brightening Glow Kit for All Skin Types | Ruby''s.pk', 'Discover the secret to glowing, even-toned skin with our Premium Quality Brightening Rice Facial Kit, the Best price in Pakistan for a complete whitening and exfoliating routine.', datetime('now')),
('p-bs-44', 'Whitening Cream for All Skin Types with Durable Jar', 'whitening-cream-for-all-skin-types-with-durable-jar', 'MKZ-693216-693216001', 'This Glow Ria Zafrani Whitening Cream is your perfect solution for achieving radiant, even-toned skin without harsh chemicals. Designed for all skin types, it’s ideal for Pakistani women who want to look fresh and glowing for weddings, Eid, or daily office wear. The cream’s rich, golden texture is housed in a stylish, durable jar that protects the product from light and keeps it hygienic for long-term use.

The formula gently exfoliates, brightens, and hydrates while reducing dark circles and fine lines. It’s formulated with nourishing ingredients that deeply cleanse pores, remove impurities, and restore your skin’s natural glow. The jar’s sturdy design ensures it stays fresh and intact, making it travel-friendly and perfect for storing in your makeup bag. Whether you’re battling dryness or hyperpigmentation, this cream delivers visible results with regular use.

- Premium Quality Whitening Cream for All Skin Types

- Durable Jar with Elegant Design for Long-Lasting Use

- Gentle Formula That Exfoliates, Brightens, and Hydrates

- Ideal for Daily Use, Weddings, Eid, and Party Wear

- New Arrival with Best Price in Pakistan for Value

- Stylish Packaging That Makes It a Great Gift Option

Material: Cream · Texture: Cream · Skin Types: All Skin Types · Product Feature: Exfoliator, Whitening, Whitening And Brightening, Brightening, Dead Skin Remover, Hydrating, Nourishing, Rejuvenating, Glowing, Hyperpigmentation, Removes Dirt, Remove Impurities, Gentle For Skin, Treat Fine Lines, Anti Dark Circle, Pore Cleaning · Package Includes: 1 x Whitening Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'This Glow Ria Zafrani Whitening Cream is your perfect solution for achieving radiant, even-toned skin without harsh chemicals.', 1075, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1408-77-693216-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1408-77-693216-product-1.webp', NULL, 0, 0, 0, 'Whitening Cream for All Skin Types with Durable Jar | Ruby''s.pk', 'This Glow Ria Zafrani Whitening Cream is your perfect solution for achieving radiant, even-toned skin without harsh chemicals.', datetime('now')),
('p-bs-45', '24 Hours Full Coverage Face Cream Solution', '24-hours-full-coverage-face-cream-solution', 'MKZ-725349-725349001', 'Perfect for Pakistani weather, this premium face cream delivers long-lasting hydration without clogging pores. Ideal for daily use, it’s your go-to solution for flawless, radiant skin that stays fresh all day.

This advanced formula is specially designed to combat dryness and uneven tone, leaving your skin soft and smooth. The sleek, durable packaging ensures it stays fresh and hygienic for months. Its lightweight texture absorbs quickly, making it perfect for layering under makeup or as a standalone treatment. The stylish design makes it a standout addition to your beauty routine.

- 24 Hours Full Coverage for all skin types

- Lightweight, non-greasy formula that absorbs fast

- Durable, stylish packaging for long-term use

- Perfect for daily use in Pakistan’s climate

- New Arrival – enjoy the best price in Pakistan

- Premium Quality with advanced skin care technology

Material: Cream · Skin Types: All Skin Types · Product Feature: Acne Scar Removal · Package Includes: 1 x Face Cream

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Perfect for Pakistani weather, this premium face cream delivers long-lasting hydration without clogging pores.', 711, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/608-77-725349-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F608-77-725349-product-1.webp', NULL, 0, 0, 0, '24 Hours Full Coverage Face Cream Solution | Ruby''s.pk', 'Perfect for Pakistani weather, this premium face cream delivers long-lasting hydration without clogging pores.', datetime('now')),
('p-bs-46', 'Orange Enzyme Exfoliating Brightening Gel LF16-35', 'orange-enzyme-exfoliating-brightening-gel-lf16-35', 'MKZ-677811-677811001', 'Perfect for Pakistani skin types, this Orange Enzymes Exfoliating Brightening Gel delivers gentle yet effective exfoliation without irritation. Ideal for daily use, it’s specially formulated to combat dullness and uneven tone, leaving your skin glowing and refreshed — perfect for office wear or special occasions.

Made with a smooth, lightweight gel formula, this product is designed for durability and consistent performance. The orange-inspired design isn’t just stylish — it reflects the natural, refreshing essence of the ingredient. Its high activity formula ensures long-lasting results while being mild enough for sensitive skin. The tube packaging is practical and leak-proof, making it easy to carry and store.

- Premium Quality gel with enzymatic exfoliation for radiant skin

- Best price in Pakistan for clean, bright skin

- Durable tube packaging with secure cap

- Stylish orange design with modern, clean aesthetic

- New Arrival — perfect for seasonal skincare routines

- Gentle enough for daily use, even on sensitive skin

Orange Exfolating Gel

Material: Gel · Texture: Smooth · Product Feature: Exfoliator · Package Includes: 1 x Exfoliating Gel

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Perfect for Pakistani skin types, this Orange Enzymes Exfoliating Brightening Gel delivers gentle yet effective exfoliation without irritation.', 681, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/1013-77-677811-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-77-677811-product-1.webp', NULL, 0, 0, 0, 'Orange Enzyme Exfoliating Brightening Gel LF16-35 | Ruby''s.pk', 'Perfect for Pakistani skin types, this Orange Enzymes Exfoliating Brightening Gel delivers gentle yet effective exfoliation without irritation.', datetime('now')),
('p-bs-47', 'The Ordinary Brightening Glow Kit 4-Piece Serum Exfoliator Cream', 'the-ordinary-brightening-glow-kit-4-piece-serum-exfoliator-cream', 'MKZ-381251-381251001', 'This Brightening Glow Kit is your ultimate solution for achieving radiant, even-toned skin without harsh chemicals. Perfect for Pakistani weather and daily use, it’s designed to fade dark spots and brighten your complexion naturally. Whether you’re preparing for Eid, a wedding, or just want to feel confident at work, this kit delivers visible results with gentle, effective formulas.

Each product in this pack is crafted with premium, dermatologist-tested ingredients that absorb quickly and leave your skin feeling soft and refreshed. The serum targets hyperpigmentation while the exfoliator gently removes dead skin cells. The cream hydrates deeply without clogging pores, making it ideal for all skin types. Built for durability and long-lasting results, this kit is stylish, clean, and perfect for your daily skincare routine.

- Fast-absorbing serum that targets dark spots and hyperpigmentation

- Gentle exfoliator that removes dead skin and unclogs pores

- Hydrating cream that brightens and nourishes your skin

- Pack includes 4 essential products for a complete glow

- Free from parabens, sulfates, and other harsh chemicals

- New arrival with best price in Pakistan for premium quality

A Fast-Absorbing Serum That Targets Dark Spots And Hyperpigmentation

A Gentle Yet Effective Exfoliation That Removes Dead Skin Cells And Unclogs Pores

Hydrates And Brightens The Skin

Material: Cream · Package Includes: 4 x Brightening Glow Kit

Note: Before using a new cosmetic product, conduct a test on a small area of your skin. If you have a specific allergy or sensitivity, check the ingredients to avoid a reaction. Always read the warning labels and directions on the package for using any cosmetic products.', 'This Brightening Glow Kit is your ultimate solution for achieving radiant, even-toned skin without harsh chemicals.', 1461, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/199-77-381251-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F199-77-381251-product-1.jpg', NULL, 0, 0, 0, 'The Ordinary Brightening Glow Kit 4-Piece Serum Exfoliator Cream | Ruby''s.pk', 'This Brightening Glow Kit is your ultimate solution for achieving radiant, even-toned skin without harsh chemicals.', datetime('now')),
('p-bs-48', 'Zafrani Whitening Cream With Serum, 500 g Jar, 1 Pc', 'zafrani-whitening-cream-with-serum-500-g-jar-1-pc', 'MKZ-758441-758441001', 'Material: Cream · Texture: Smooth · Skin Types: All Skin Types · Product Feature: Whitening, Remove Impurities, Dead Skin Remover · Package Includes: 1 x Whitening Cream · Weight: 500 g

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Whitening cream for all skin types, 500 g.', 1200, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/700-77-758441-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F700-77-758441-product-1.webp', NULL, 0, 0, 0, 'Zafrani Whitening Cream With Serum, 500 g Jar, 1 Pc | Ruby''s.pk', 'Whitening cream for all skin types, 500 g.', datetime('now')),
('p-bs-49', 'Botox Bee Venom Wrinkle Cream 30gm All Skin Types', 'botox-bee-venom-wrinkle-cream-30gm-all-skin-types', 'MKZ-693015-693015001', 'Looking for a premium, effective wrinkle solution that works for your skin? This Botox Bee Venom Wrinkle Cream is the best price in Pakistan for visibly smoother, younger-looking skin without the cost of injections. Perfect for daily use, it’s ideal for office wear or special occasions where you want to look fresh and confident.

This cream is specially formulated with bee venom, a natural ingredient known for its skin-rejuvenating properties. It’s designed to erase fine lines and wrinkles while deeply moisturizing and hydrating your skin. The glossy texture glides smoothly, leaving a soft, radiant finish that lasts. It’s suitable for all skin types and works year-round, making it a durable, stylish addition to your skincare routine.

- Erases lines and wrinkles effectively

- Moisturizes and hydrates for a dewy glow

- Promotes collagen production for firmer skin

- Lightweight, non-greasy formula

- Suitable for all skin types

- New arrival with premium quality ingredients

This is a wrinkle cream that uses Bee Venom as a key ingredient, offering a cosmetic alternative often associated with the effects of Botox.

Material: Cream · Texture: Glossy · Skin Types: All Skin Types · Color: White · Product Feature: Whitening And Brightening, Whitening, Brightening, Dead Skin Remover · Package Includes: 1 x Face Cream · Volume: 30 ml

Note: Before using any new cosmetic product, perform a patch test on a small skin area. Verify ingredients for allergies and follow package warnings and directions.', 'Looking for a premium, effective wrinkle solution that works for your skin?', 811, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/512-77-693015-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F512-77-693015-product-1.webp', NULL, 0, 0, 0, 'Botox Bee Venom Wrinkle Cream 30gm All Skin Types | Ruby''s.pk', 'Looking for a premium, effective wrinkle solution that works for your skin?', datetime('now')),
('p-bs-50', 'Exfoliating & Night Cream Set for All Skin Types', 'exfoliating-night-cream-set-for-all-skin-types', 'MKZ-391595-391595001', 'Get glowing, smooth skin with this premium pack of two – one refreshing exfoliating gel and one nourishing night cream. Perfect for Pakistani weather and daily routines, this set helps you achieve a refreshed, radiant finish without harsh chemicals. Ideal for weddings, office days, or just everyday beauty, it’s designed to enhance your natural glow while keeping your skin soft and hydrated.

The exfoliating gel is made with plant-based extracts that gently remove dead skin cells, leaving your complexion smooth and even. The night cream is formulated for all skin types and delivers deep moisture to repair and renew your skin overnight. Both products are durable, long-lasting, and crafted with care to suit local skin needs. The packaging is stylish and practical, making it easy to store and use daily.

- Contains 1 x Exfoliating Gel (140g) and 1 x Night Cream

- Plant-based extracts for natural hydration and renewal

- Suitable for all skin types including sensitive skin

- Premium quality with a smooth, high-pigmented texture

- New arrival – best price in Pakistan for this pack

- Durable packaging for long-term use and travel

Plant Extraction Can Effectively Replenish Skin Moisture And Make Skin Tender And Smooth

Material: Gel, Cream · Texture: High Pigmented · Package Includes: 1 x Exfoliating Gel 140g, 1 x Night Cream

Note: Before using a new cosmetic product, conduct a test on a small area of your skin. If you have a specific allergy or sensitivity, check the ingredients to avoid a reaction. Always read the warning labels and directions on the package for using any cosmetic products.', 'Get glowing, smooth skin with this premium pack of two – one refreshing exfoliating gel and one nourishing night cream.', 1525, NULL, NULL, 'cat-beauty-skincare', 'Ruby''s Select', 25, 0, 1, '💄', 'https://www.markaz.app/api/export/image/238-77-391595-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F238-77-391595-product-1.jpg', NULL, 0, 0, 0, 'Exfoliating & Night Cream Set for All Skin Types | Ruby''s.pk', 'Get glowing, smooth skin with this premium pack of two – one refreshing exfoliating gel and one nourishing night cream.', datetime('now'));

-- Product gallery images -------------------------------------
INSERT OR IGNORE INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES
('pi-bs-01-1', 'p-bs-01', 'https://www.markaz.app/api/export/image/3461-77-MZ3461200010RNSGSE-776476001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3461-77-MZ3461200010RNSGSE-776476001-product-1.webp', 'Gold Series 6 Steps Facial Kit', 0, 1),
('pi-bs-01-2', 'p-bs-01', 'https://www.markaz.app/api/export/image/3461-77-MZ3461200010RNSGSE-776476001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3461-77-MZ3461200010RNSGSE-776476001-product-2.webp', 'Gold Series 6 Steps Facial Kit', 1, 0),
('pi-bs-01-3', 'p-bs-01', 'https://www.markaz.app/api/export/image/3461-77-MZ3461200010RNSGSE-776476001-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3461-77-MZ3461200010RNSGSE-776476001-product-3.webp', 'Gold Series 6 Steps Facial Kit', 2, 0),
('pi-bs-02-1', 'p-bs-02', 'https://www.markaz.app/api/export/image/3488-77-MZ3488200004HRDLAZ-775967001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3488-77-MZ3488200004HRDLAZ-775967001-product-1.webp', 'Zafrani Whitening cream 💯 results 10 to 15 days', 0, 1),
('pi-bs-02-2', 'p-bs-02', 'https://www.markaz.app/api/export/image/3488-77-MZ3488200004HRDLAZ-775967001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3488-77-MZ3488200004HRDLAZ-775967001-product-2.webp', 'Zafrani Whitening cream 💯 results 10 to 15 days', 1, 0),
('pi-bs-03-1', 'p-bs-03', 'https://www.markaz.app/api/export/image/3465-77-MZ3465200013ADSE-777582001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3465-77-MZ3465200013ADSE-777582001-product-1.webp', 'Berry exfoliating Gel for Face Brightening cleaning', 0, 1),
('pi-bs-03-2', 'p-bs-03', 'https://www.markaz.app/api/export/image/3465-77-MZ3465200013ADSE-777582001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3465-77-MZ3465200013ADSE-777582001-product-2.webp', 'Berry exfoliating Gel for Face Brightening cleaning', 1, 0),
('pi-bs-04-1', 'p-bs-04', 'https://www.markaz.app/api/export/image/3465-77-MZ3465200014ADSE-777596001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3465-77-MZ3465200014ADSE-777596001-product-1.webp', 'Amellia Tea Tree Neem Face Wash Acne control 100 ml', 0, 1),
('pi-bs-04-2', 'p-bs-04', 'https://www.markaz.app/api/export/image/3465-77-MZ3465200014ADSE-777596001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3465-77-MZ3465200014ADSE-777596001-product-2.webp', 'Amellia Tea Tree Neem Face Wash Acne control 100 ml', 1, 0),
('pi-bs-04-3', 'p-bs-04', 'https://www.markaz.app/api/export/image/3465-77-MZ3465200014ADSE-777596001-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3465-77-MZ3465200014ADSE-777596001-product-3.webp', 'Amellia Tea Tree Neem Face Wash Acne control 100 ml', 2, 0),
('pi-bs-05-1', 'p-bs-05', 'https://www.markaz.app/api/export/image/1855-77-MZ1855200107MS-776367001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1855-77-MZ1855200107MS-776367001-product-1.webp', 'Pack of 1 Face Mask - Random Multi Flavor- 1 Pc', 0, 1),
('pi-bs-05-2', 'p-bs-05', 'https://www.markaz.app/api/export/image/1855-77-MZ1855200107MS-776367001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1855-77-MZ1855200107MS-776367001-product-2.webp', 'Pack of 1 Face Mask - Random Multi Flavor- 1 Pc', 1, 0),
('pi-bs-05-3', 'p-bs-05', 'https://www.markaz.app/api/export/image/1855-77-MZ1855200107MS-776367001-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1855-77-MZ1855200107MS-776367001-product-3.webp', 'Pack of 1 Face Mask - Random Multi Flavor- 1 Pc', 2, 0),
('pi-bs-05-4', 'p-bs-05', 'https://www.markaz.app/api/export/image/1855-77-MZ1855200107MS-776367001-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1855-77-MZ1855200107MS-776367001-product-4.webp', 'Pack of 1 Face Mask - Random Multi Flavor- 1 Pc', 3, 0),
('pi-bs-05-5', 'p-bs-05', 'https://www.markaz.app/api/export/image/1855-77-MZ1855200107MS-776367001-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1855-77-MZ1855200107MS-776367001-product-5.webp', 'Pack of 1 Face Mask - Random Multi Flavor- 1 Pc', 4, 0),
('pi-bs-05-6', 'p-bs-05', 'https://www.markaz.app/api/export/image/1855-77-MZ1855200107MS-776367001-product-6.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1855-77-MZ1855200107MS-776367001-product-6.webp', 'Pack of 1 Face Mask - Random Multi Flavor- 1 Pc', 5, 0),
('pi-bs-05-7', 'p-bs-05', 'https://www.markaz.app/api/export/image/1855-77-MZ1855200107MS-776367001-product-7.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1855-77-MZ1855200107MS-776367001-product-7.webp', 'Pack of 1 Face Mask - Random Multi Flavor- 1 Pc', 6, 0),
('pi-bs-06-1', 'p-bs-06', 'https://www.markaz.app/api/export/image/1598-77-MZ1598203782TEWHHB-777184001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1598-77-MZ1598203782TEWHHB-777184001-product-1.webp', 'SADOER DRAGON BLOOD Anti Aging Face Cream', 0, 1),
('pi-bs-06-2', 'p-bs-06', 'https://www.markaz.app/api/export/image/1598-77-MZ1598203782TEWHHB-777184001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1598-77-MZ1598203782TEWHHB-777184001-product-2.webp', 'SADOER DRAGON BLOOD Anti Aging Face Cream', 1, 0),
('pi-bs-06-3', 'p-bs-06', 'https://www.markaz.app/api/export/image/1598-77-MZ1598203782TEWHHB-777184001-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1598-77-MZ1598203782TEWHHB-777184001-product-3.webp', 'SADOER DRAGON BLOOD Anti Aging Face Cream', 2, 0),
('pi-bs-07-1', 'p-bs-07', 'https://www.markaz.app/api/export/image/1598-77-MZ1598203772TEWHHB-777156001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1598-77-MZ1598203772TEWHHB-777156001-product-1.webp', 'De''Lesh Facial Foam Facewash 100ml', 0, 1),
('pi-bs-07-2', 'p-bs-07', 'https://www.markaz.app/api/export/image/1598-77-MZ1598203772TEWHHB-777156001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1598-77-MZ1598203772TEWHHB-777156001-product-2.webp', 'De''Lesh Facial Foam Facewash 100ml', 1, 0),
('pi-bs-08-1', 'p-bs-08', 'https://www.markaz.app/api/export/image/3503-77-MZ3503200005MNPK-777079001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3503-77-MZ3503200005MNPK-777079001-product-1.webp', 'Herbal Zafrani Whitening And Brightening Face Cream 30', 0, 1),
('pi-bs-08-2', 'p-bs-08', 'https://www.markaz.app/api/export/image/3503-77-MZ3503200005MNPK-777079001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3503-77-MZ3503200005MNPK-777079001-product-2.webp', 'Herbal Zafrani Whitening And Brightening Face Cream 30', 1, 0),
('pi-bs-09-1', 'p-bs-09', 'https://www.markaz.app/api/export/image/3516-77-MZ3516200007SHSE-778309001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3516-77-MZ3516200007SHSE-778309001-product-1.webp', 'Glowing Face Cream', 0, 1),
('pi-bs-09-2', 'p-bs-09', 'https://www.markaz.app/api/export/image/3516-77-MZ3516200007SHSE-778309001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3516-77-MZ3516200007SHSE-778309001-product-2.webp', 'Glowing Face Cream', 1, 0),
('pi-bs-09-3', 'p-bs-09', 'https://www.markaz.app/api/export/image/3516-77-MZ3516200007SHSE-778309001-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3516-77-MZ3516200007SHSE-778309001-product-3.webp', 'Glowing Face Cream', 2, 0),
('pi-bs-10-1', 'p-bs-10', 'https://www.markaz.app/api/export/image/3327-77-MZ3327200032HE-777950001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3327-77-MZ3327200032HE-777950001-product-1.webp', 'Whitening Face Cream', 0, 1),
('pi-bs-11-1', 'p-bs-11', 'https://www.markaz.app/api/export/image/2902-77-MZ2902200014UICS-779473001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2902-77-MZ2902200014UICS-779473001-product-1.webp', 'Uni Whiting Face Wash', 0, 1),
('pi-bs-11-2', 'p-bs-11', 'https://www.markaz.app/api/export/image/2902-77-MZ2902200014UICS-779473001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2902-77-MZ2902200014UICS-779473001-product-2.webp', 'Uni Whiting Face Wash', 1, 0),
('pi-bs-11-3', 'p-bs-11', 'https://www.markaz.app/api/export/image/2902-77-MZ2902200014UICS-779473001-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2902-77-MZ2902200014UICS-779473001-product-3.webp', 'Uni Whiting Face Wash', 2, 0),
('pi-bs-12-1', 'p-bs-12', 'https://www.markaz.app/api/export/image/3491-77-MZ3491200007ZNULHQ-779748001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3491-77-MZ3491200007ZNULHQ-779748001-product-1.webp', 'Whitening And Brightening Face Cream', 0, 1),
('pi-bs-12-2', 'p-bs-12', 'https://www.markaz.app/api/export/image/3491-77-MZ3491200007ZNULHQ-779748001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3491-77-MZ3491200007ZNULHQ-779748001-product-2.webp', 'Whitening And Brightening Face Cream', 1, 0),
('pi-bs-12-3', 'p-bs-12', 'https://www.markaz.app/api/export/image/3491-77-MZ3491200007ZNULHQ-779748001-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3491-77-MZ3491200007ZNULHQ-779748001-product-3.webp', 'Whitening And Brightening Face Cream', 2, 0),
('pi-bs-12-4', 'p-bs-12', 'https://www.markaz.app/api/export/image/3491-77-MZ3491200007ZNULHQ-779748001-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3491-77-MZ3491200007ZNULHQ-779748001-product-4.webp', 'Whitening And Brightening Face Cream', 3, 0),
('pi-bs-12-5', 'p-bs-12', 'https://www.markaz.app/api/export/image/3491-77-MZ3491200007ZNULHQ-779748001-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F3491-77-MZ3491200007ZNULHQ-779748001-product-5.webp', 'Whitening And Brightening Face Cream', 4, 0),
('pi-bs-13-1', 'p-bs-13', 'https://www.markaz.app/api/export/image/2807-77-MZ2807200140ALI-779707001-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2807-77-MZ2807200140ALI-779707001-product-1.webp', '5 Piece Hand Cream Pack', 0, 1),
('pi-bs-13-2', 'p-bs-13', 'https://www.markaz.app/api/export/image/2807-77-MZ2807200140ALI-779707001-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2807-77-MZ2807200140ALI-779707001-product-2.webp', '5 Piece Hand Cream Pack', 1, 0),
('pi-bs-14-1', 'p-bs-14', 'https://www.markaz.app/api/export/image/pakistan_675398.png?src=https%3A%2F%2Fstatic.markaz.app%2FGenerativeMedia%2FPakistan%2Fimages%2Fpakistan_675398.png', 'Rubella Beauty Cream Dark Spot Anti Wrinkle Anti Acne', 0, 1),
('pi-bs-14-2', 'p-bs-14', 'https://www.markaz.app/api/export/image/849-77-675398-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F849-77-675398-product-2.webp', 'Rubella Beauty Cream Dark Spot Anti Wrinkle Anti Acne', 1, 0),
('pi-bs-14-3', 'p-bs-14', 'https://www.markaz.app/api/export/image/849-77-675398-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F849-77-675398-product-1.webp', 'Rubella Beauty Cream Dark Spot Anti Wrinkle Anti Acne', 2, 0),
('pi-bs-15-1', 'p-bs-15', 'https://www.markaz.app/api/export/image/pakistan_693232.png?src=https%3A%2F%2Fstatic.markaz.app%2FGenerativeMedia%2FPakistan%2Fimages%2Fpakistan_693232.png', 'Glow Ria Zafrani Whitening Cream 250g Jar', 0, 1),
('pi-bs-15-2', 'p-bs-15', 'https://www.markaz.app/api/export/image/700-77-693232-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F700-77-693232-product-3.webp', 'Glow Ria Zafrani Whitening Cream 250g Jar', 1, 0),
('pi-bs-15-3', 'p-bs-15', 'https://www.markaz.app/api/export/image/700-77-693232-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F700-77-693232-product-1.webp', 'Glow Ria Zafrani Whitening Cream 250g Jar', 2, 0),
('pi-bs-16-1', 'p-bs-16', 'https://www.markaz.app/api/export/image/1209-77-689722-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1209-77-689722-product-1.webp', 'Anti Dark Circle Eye Cream for All Skin Types', 0, 1),
('pi-bs-16-2', 'p-bs-16', 'https://www.markaz.app/api/export/image/1209-77-689722-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1209-77-689722-product-2.webp', 'Anti Dark Circle Eye Cream for All Skin Types', 1, 0),
('pi-bs-16-3', 'p-bs-16', 'https://www.markaz.app/api/export/image/1209-77-689722-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1209-77-689722-product-3.webp', 'Anti Dark Circle Eye Cream for All Skin Types', 2, 0),
('pi-bs-16-4', 'p-bs-16', 'https://www.markaz.app/api/export/image/1209-77-689722-product-1-withcode.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1209-77-689722-product-1-withcode.webp', 'Anti Dark Circle Eye Cream for All Skin Types', 3, 0),
('pi-bs-17-1', 'p-bs-17', 'https://www.markaz.app/api/export/image/1304-77-524221-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1304-77-524221-product-1.jpg', 'Premium Night Cream Pack 2 for All Skin Types', 0, 1),
('pi-bs-17-2', 'p-bs-17', 'https://www.markaz.app/api/export/image/1304-77-524221-product-2.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1304-77-524221-product-2.jpg', 'Premium Night Cream Pack 2 for All Skin Types', 1, 0),
('pi-bs-17-3', 'p-bs-17', 'https://www.markaz.app/api/export/image/1304-77-524221-product-3.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1304-77-524221-product-3.jpg', 'Premium Night Cream Pack 2 for All Skin Types', 2, 0),
('pi-bs-18-1', 'p-bs-18', 'https://www.markaz.app/api/export/image/1408-77-499353-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1408-77-499353-product-1.jpg', 'CeraVe Renewing SA Facial Cleanser 237ml All Skin Types', 0, 1),
('pi-bs-18-2', 'p-bs-18', 'https://www.markaz.app/api/export/image/1408-77-499353-product-2.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1408-77-499353-product-2.jpg', 'CeraVe Renewing SA Facial Cleanser 237ml All Skin Types', 1, 0),
('pi-bs-18-3', 'p-bs-18', 'https://www.markaz.app/api/export/image/1408-77-499353-product-3.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1408-77-499353-product-3.jpg', 'CeraVe Renewing SA Facial Cleanser 237ml All Skin Types', 2, 0),
('pi-bs-19-1', 'p-bs-19', 'https://www.markaz.app/api/export/image/1013-77-708535-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-77-708535-product-1.webp', 'Zafrani Whitening Cream for All Skin Types Off White', 0, 1),
('pi-bs-19-2', 'p-bs-19', 'https://www.markaz.app/api/export/image/1013-77-708535-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-77-708535-product-2.webp', 'Zafrani Whitening Cream for All Skin Types Off White', 1, 0),
('pi-bs-19-3', 'p-bs-19', 'https://www.markaz.app/api/export/image/1013-77-708535-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-77-708535-product-3.webp', 'Zafrani Whitening Cream for All Skin Types Off White', 2, 0),
('pi-bs-19-4', 'p-bs-19', 'https://www.markaz.app/api/export/image/1013-77-708535-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-77-708535-product-4.webp', 'Zafrani Whitening Cream for All Skin Types Off White', 3, 0),
('pi-bs-19-5', 'p-bs-19', 'https://www.markaz.app/api/export/image/1013-77-708535-product-1-withcode.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-77-708535-product-1-withcode.webp', 'Zafrani Whitening Cream for All Skin Types Off White', 4, 0),
('pi-bs-20-1', 'p-bs-20', 'https://www.markaz.app/api/export/image/2807-77-754489-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2807-77-754489-product-1.webp', 'Whitening And Brightening Facial Kit', 0, 1),
('pi-bs-20-2', 'p-bs-20', 'https://www.markaz.app/api/export/image/2807-77-754489-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2807-77-754489-product-2.webp', 'Whitening And Brightening Facial Kit', 1, 0),
('pi-bs-20-3', 'p-bs-20', 'https://www.markaz.app/api/export/image/2807-77-754489-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2807-77-754489-product-3.webp', 'Whitening And Brightening Facial Kit', 2, 0),
('pi-bs-21-1', 'p-bs-21', 'https://www.markaz.app/api/export/image/1731-77-687560-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1731-77-687560-product-1.webp', 'Flicka Whitening Cream for All Skin Types Pakistan', 0, 1),
('pi-bs-21-2', 'p-bs-21', 'https://www.markaz.app/api/export/image/1731-77-687560-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1731-77-687560-product-2.webp', 'Flicka Whitening Cream for All Skin Types Pakistan', 1, 0),
('pi-bs-21-3', 'p-bs-21', 'https://www.markaz.app/api/export/image/1731-77-687560-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1731-77-687560-product-3.webp', 'Flicka Whitening Cream for All Skin Types Pakistan', 2, 0),
('pi-bs-21-4', 'p-bs-21', 'https://www.markaz.app/api/export/image/1731-77-687560-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1731-77-687560-product-4.webp', 'Flicka Whitening Cream for All Skin Types Pakistan', 3, 0),
('pi-bs-21-5', 'p-bs-21', 'https://www.markaz.app/api/export/image/1731-77-687560-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1731-77-687560-product-5.webp', 'Flicka Whitening Cream for All Skin Types Pakistan', 4, 0),
('pi-bs-22-1', 'p-bs-22', 'https://www.markaz.app/api/export/image/1776-77-688255-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1776-77-688255-product-1.webp', 'Vita A Retinal Shot Tightening Booster Cream for Firm Skin', 0, 1),
('pi-bs-22-2', 'p-bs-22', 'https://www.markaz.app/api/export/image/1776-77-688255-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1776-77-688255-product-2.webp', 'Vita A Retinal Shot Tightening Booster Cream for Firm Skin', 1, 0),
('pi-bs-22-3', 'p-bs-22', 'https://www.markaz.app/api/export/image/1776-77-688255-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1776-77-688255-product-3.webp', 'Vita A Retinal Shot Tightening Booster Cream for Firm Skin', 2, 0),
('pi-bs-22-4', 'p-bs-22', 'https://www.markaz.app/api/export/image/1776-77-688255-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1776-77-688255-product-4.webp', 'Vita A Retinal Shot Tightening Booster Cream for Firm Skin', 3, 0),
('pi-bs-22-5', 'p-bs-22', 'https://www.markaz.app/api/export/image/1776-77-688255-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1776-77-688255-product-5.webp', 'Vita A Retinal Shot Tightening Booster Cream for Firm Skin', 4, 0),
('pi-bs-23-1', 'p-bs-23', 'https://www.markaz.app/api/export/image/221-77-692017-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F221-77-692017-product-1.webp', 'Viki Skin Polisher 20 Ultra Whitening Brightening Exfoliator', 0, 1),
('pi-bs-23-2', 'p-bs-23', 'https://www.markaz.app/api/export/image/221-77-692017-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F221-77-692017-product-2.webp', 'Viki Skin Polisher 20 Ultra Whitening Brightening Exfoliator', 1, 0),
('pi-bs-23-3', 'p-bs-23', 'https://www.markaz.app/api/export/image/221-77-692017-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F221-77-692017-product-3.webp', 'Viki Skin Polisher 20 Ultra Whitening Brightening Exfoliator', 2, 0),
('pi-bs-23-4', 'p-bs-23', 'https://www.markaz.app/api/export/image/221-77-692017-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F221-77-692017-product-4.webp', 'Viki Skin Polisher 20 Ultra Whitening Brightening Exfoliator', 3, 0),
('pi-bs-23-5', 'p-bs-23', 'https://www.markaz.app/api/export/image/221-77-692017-product-1-withcode.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F221-77-692017-product-1-withcode.webp', 'Viki Skin Polisher 20 Ultra Whitening Brightening Exfoliator', 4, 0),
('pi-bs-24-1', 'p-bs-24', 'https://www.markaz.app/api/export/image/1864-77-717665-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1864-77-717665-product-1.webp', 'CHIRS''S UK Blackhead Peel Off Face Mask', 0, 1),
('pi-bs-24-2', 'p-bs-24', 'https://www.markaz.app/api/export/image/1864-77-717665-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1864-77-717665-product-2.webp', 'CHIRS''S UK Blackhead Peel Off Face Mask', 1, 0),
('pi-bs-24-3', 'p-bs-24', 'https://www.markaz.app/api/export/image/1864-77-717665-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1864-77-717665-product-3.webp', 'CHIRS''S UK Blackhead Peel Off Face Mask', 2, 0),
('pi-bs-25-1', 'p-bs-25', 'https://www.markaz.app/api/export/image/1347-77-749817-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-749817-product-1.webp', 'Zafrani Whitening Cream, 250g, Buy 1 Get 1 Free', 0, 1),
('pi-bs-25-2', 'p-bs-25', 'https://www.markaz.app/api/export/image/1347-77-749817-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-749817-product-2.webp', 'Zafrani Whitening Cream, 250g, Buy 1 Get 1 Free', 1, 0),
('pi-bs-25-3', 'p-bs-25', 'https://www.markaz.app/api/export/image/1347-77-749817-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-749817-product-3.webp', 'Zafrani Whitening Cream, 250g, Buy 1 Get 1 Free', 2, 0),
('pi-bs-25-4', 'p-bs-25', 'https://www.markaz.app/api/export/image/1347-77-749817-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-749817-product-4.webp', 'Zafrani Whitening Cream, 250g, Buy 1 Get 1 Free', 3, 0),
('pi-bs-25-5', 'p-bs-25', 'https://www.markaz.app/api/export/image/1347-77-749817-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-749817-product-5.webp', 'Zafrani Whitening Cream, 250g, Buy 1 Get 1 Free', 4, 0),
('pi-bs-26-1', 'p-bs-26', 'https://www.markaz.app/api/export/image/1776-77-721048-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1776-77-721048-product-1.webp', 'Frozen Collagen Whitening Capsules 60x10', 0, 1),
('pi-bs-26-2', 'p-bs-26', 'https://www.markaz.app/api/export/image/1776-77-721048-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1776-77-721048-product-2.webp', 'Frozen Collagen Whitening Capsules 60x10', 1, 0),
('pi-bs-27-1', 'p-bs-27', 'https://www.markaz.app/api/export/image/1304-77-559228-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1304-77-559228-product-1.jpeg', 'CeraVe Skin Glowing Face Wash 200ml All Skin Types', 0, 1),
('pi-bs-27-2', 'p-bs-27', 'https://www.markaz.app/api/export/image/1304-77-559228-product-2.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1304-77-559228-product-2.jpeg', 'CeraVe Skin Glowing Face Wash 200ml All Skin Types', 1, 0),
('pi-bs-27-3', 'p-bs-27', 'https://www.markaz.app/api/export/image/1304-77-559228-product-1-withcode.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1304-77-559228-product-1-withcode.jpeg', 'CeraVe Skin Glowing Face Wash 200ml All Skin Types', 2, 0),
('pi-bs-28-1', 'p-bs-28', 'https://www.markaz.app/api/export/image/1776-77-718956-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1776-77-718956-product-1.webp', 'Lipoma Removal Cream for Fat Retention & Herbicide Action', 0, 1),
('pi-bs-28-2', 'p-bs-28', 'https://www.markaz.app/api/export/image/1776-77-718956-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1776-77-718956-product-2.webp', 'Lipoma Removal Cream for Fat Retention & Herbicide Action', 1, 0),
('pi-bs-28-3', 'p-bs-28', 'https://www.markaz.app/api/export/image/68b70abe-6d64-4d2e-ab7e-b72c7b33ddac.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F68b70abe-6d64-4d2e-ab7e-b72c7b33ddac.webp', 'Lipoma Removal Cream for Fat Retention & Herbicide Action', 2, 0),
('pi-bs-29-1', 'p-bs-29', 'https://www.markaz.app/api/export/image/1304-77-754744-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1304-77-754744-product-1.webp', 'Zafrani Whitening Cream', 0, 1),
('pi-bs-29-2', 'p-bs-29', 'https://www.markaz.app/api/export/image/1304-77-754744-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1304-77-754744-product-2.webp', 'Zafrani Whitening Cream', 1, 0),
('pi-bs-29-3', 'p-bs-29', 'https://www.markaz.app/api/export/image/1304-77-754744-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1304-77-754744-product-3.webp', 'Zafrani Whitening Cream', 2, 0),
('pi-bs-30-1', 'p-bs-30', 'https://www.markaz.app/api/export/image/700-77-630139-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F700-77-630139-product-1.jpg', 'Dr Rashel Whitening Face Wash 150ml All Skin Types', 0, 1),
('pi-bs-30-2', 'p-bs-30', 'https://www.markaz.app/api/export/image/700-77-630139-product-2.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F700-77-630139-product-2.jpg', 'Dr Rashel Whitening Face Wash 150ml All Skin Types', 1, 0),
('pi-bs-30-3', 'p-bs-30', 'https://www.markaz.app/api/export/image/700-77-630139-product-3.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F700-77-630139-product-3.jpg', 'Dr Rashel Whitening Face Wash 150ml All Skin Types', 2, 0),
('pi-bs-30-4', 'p-bs-30', 'https://www.markaz.app/api/export/image/700-77-630139-product-4.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F700-77-630139-product-4.jpg', 'Dr Rashel Whitening Face Wash 150ml All Skin Types', 3, 0),
('pi-bs-30-5', 'p-bs-30', 'https://www.markaz.app/api/export/image/700-77-630139-product-5.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F700-77-630139-product-5.jpg', 'Dr Rashel Whitening Face Wash 150ml All Skin Types', 4, 0),
('pi-bs-30-6', 'p-bs-30', 'https://www.markaz.app/api/export/image/700-77-630139-product-1-withcode.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F700-77-630139-product-1-withcode.jpg', 'Dr Rashel Whitening Face Wash 150ml All Skin Types', 5, 0),
('pi-bs-31-1', 'p-bs-31', 'https://www.markaz.app/api/export/image/1347-77-688458-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-688458-product-1.webp', 'Premium Whitening Cream for All Skin Types, Buy 1 Get 1 Free', 0, 1),
('pi-bs-31-2', 'p-bs-31', 'https://www.markaz.app/api/export/image/1347-77-688458-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-688458-product-3.webp', 'Premium Whitening Cream for All Skin Types, Buy 1 Get 1 Free', 1, 0),
('pi-bs-31-3', 'p-bs-31', 'https://www.markaz.app/api/export/image/1347-77-688458-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-688458-product-4.webp', 'Premium Whitening Cream for All Skin Types, Buy 1 Get 1 Free', 2, 0),
('pi-bs-31-4', 'p-bs-31', 'https://www.markaz.app/api/export/image/1347-77-688458-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-688458-product-5.webp', 'Premium Whitening Cream for All Skin Types, Buy 1 Get 1 Free', 3, 0),
('pi-bs-32-1', 'p-bs-32', 'https://www.markaz.app/api/export/image/1180-77-667043-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1180-77-667043-product-1.webp', 'Orange Enzyme Exfoliating Brightening Gel for All Skin Types', 0, 1),
('pi-bs-32-2', 'p-bs-32', 'https://www.markaz.app/api/export/image/1180-77-667043-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1180-77-667043-product-2.webp', 'Orange Enzyme Exfoliating Brightening Gel for All Skin Types', 1, 0),
('pi-bs-32-3', 'p-bs-32', 'https://www.markaz.app/api/export/image/1180-77-667043-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1180-77-667043-product-3.webp', 'Orange Enzyme Exfoliating Brightening Gel for All Skin Types', 2, 0),
('pi-bs-32-4', 'p-bs-32', 'https://www.markaz.app/api/export/image/1180-77-667043-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1180-77-667043-product-4.webp', 'Orange Enzyme Exfoliating Brightening Gel for All Skin Types', 3, 0),
('pi-bs-33-1', 'p-bs-33', 'https://www.markaz.app/api/export/image/1004-77-743433-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1004-77-743433-product-1.webp', 'Whitening Face Wash AVA skincare', 0, 1),
('pi-bs-33-2', 'p-bs-33', 'https://www.markaz.app/api/export/image/1004-77-743433-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1004-77-743433-product-2.webp', 'Whitening Face Wash AVA skincare', 1, 0),
('pi-bs-33-3', 'p-bs-33', 'https://www.markaz.app/api/export/image/1004-77-743433-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1004-77-743433-product-3.webp', 'Whitening Face Wash AVA skincare', 2, 0),
('pi-bs-34-1', 'p-bs-34', 'https://www.markaz.app/api/export/image/1731-77-666837-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1731-77-666837-product-1.webp', 'Night Cream 50ml Bright White Clear Skin for Pakistani Skin', 0, 1),
('pi-bs-34-2', 'p-bs-34', 'https://www.markaz.app/api/export/image/1731-77-666837-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1731-77-666837-product-2.webp', 'Night Cream 50ml Bright White Clear Skin for Pakistani Skin', 1, 0),
('pi-bs-34-3', 'p-bs-34', 'https://www.markaz.app/api/export/image/1731-77-666837-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1731-77-666837-product-3.webp', 'Night Cream 50ml Bright White Clear Skin for Pakistani Skin', 2, 0),
('pi-bs-35-1', 'p-bs-35', 'https://www.markaz.app/api/export/image/2017-77-717814-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2017-77-717814-product-1.webp', 'Night Cream Whitening Brightening for All Skin Types', 0, 1),
('pi-bs-35-2', 'p-bs-35', 'https://www.markaz.app/api/export/image/2017-77-717814-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2017-77-717814-product-2.webp', 'Night Cream Whitening Brightening for All Skin Types', 1, 0),
('pi-bs-35-3', 'p-bs-35', 'https://www.markaz.app/api/export/image/2017-77-717814-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2017-77-717814-product-3.webp', 'Night Cream Whitening Brightening for All Skin Types', 2, 0),
('pi-bs-36-1', 'p-bs-36', 'https://www.markaz.app/api/export/image/1183-77-750541-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1183-77-750541-product-1.webp', 'Whitening Face Wash AVA Wash', 0, 1),
('pi-bs-36-2', 'p-bs-36', 'https://www.markaz.app/api/export/image/1183-77-750541-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1183-77-750541-product-2.webp', 'Whitening Face Wash AVA Wash', 1, 0),
('pi-bs-36-3', 'p-bs-36', 'https://www.markaz.app/api/export/image/1183-77-750541-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1183-77-750541-product-3.webp', 'Whitening Face Wash AVA Wash', 2, 0),
('pi-bs-37-1', 'p-bs-37', 'https://www.markaz.app/api/export/image/1718-77-682048-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1718-77-682048-product-1.webp', 'Zafrani Whitening Cream Set of 2 200 gram', 0, 1),
('pi-bs-37-2', 'p-bs-37', 'https://www.markaz.app/api/export/image/1718-77-682048-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1718-77-682048-product-2.webp', 'Zafrani Whitening Cream Set of 2 200 gram', 1, 0),
('pi-bs-37-3', 'p-bs-37', 'https://www.markaz.app/api/export/image/1718-77-682048-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1718-77-682048-product-3.webp', 'Zafrani Whitening Cream Set of 2 200 gram', 2, 0),
('pi-bs-37-4', 'p-bs-37', 'https://www.markaz.app/api/export/image/1718-77-682048-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1718-77-682048-product-4.webp', 'Zafrani Whitening Cream Set of 2 200 gram', 3, 0),
('pi-bs-38-1', 'p-bs-38', 'https://www.markaz.app/api/export/image/1347-77-592646-product-1.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-592646-product-1.jpeg', 'The Ordinary Face Wash 100ml Niacinamide 10% Zinc 1% All Skin Types', 0, 1),
('pi-bs-38-2', 'p-bs-38', 'https://www.markaz.app/api/export/image/1347-77-592646-product-2.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-592646-product-2.jpeg', 'The Ordinary Face Wash 100ml Niacinamide 10% Zinc 1% All Skin Types', 1, 0),
('pi-bs-38-3', 'p-bs-38', 'https://www.markaz.app/api/export/image/1347-77-592646-product-3.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-592646-product-3.jpeg', 'The Ordinary Face Wash 100ml Niacinamide 10% Zinc 1% All Skin Types', 2, 0),
('pi-bs-38-4', 'p-bs-38', 'https://www.markaz.app/api/export/image/1347-77-592646-product-1-withcode.jpeg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-592646-product-1-withcode.jpeg', 'The Ordinary Face Wash 100ml Niacinamide 10% Zinc 1% All Skin Types', 3, 0),
('pi-bs-39-1', 'p-bs-39', 'https://www.markaz.app/api/export/image/1004-77-689683-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1004-77-689683-product-1.webp', 'Anti Dark Circle Eye Cream 4% Retinol + Fermented Bean Extract', 0, 1),
('pi-bs-39-2', 'p-bs-39', 'https://www.markaz.app/api/export/image/1004-77-689683-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1004-77-689683-product-2.webp', 'Anti Dark Circle Eye Cream 4% Retinol + Fermented Bean Extract', 1, 0),
('pi-bs-39-3', 'p-bs-39', 'https://www.markaz.app/api/export/image/1004-77-689683-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1004-77-689683-product-3.webp', 'Anti Dark Circle Eye Cream 4% Retinol + Fermented Bean Extract', 2, 0),
('pi-bs-39-4', 'p-bs-39', 'https://www.markaz.app/api/export/image/1004-77-689683-product-1-withcode.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1004-77-689683-product-1-withcode.webp', 'Anti Dark Circle Eye Cream 4% Retinol + Fermented Bean Extract', 3, 0),
('pi-bs-40-1', 'p-bs-40', 'https://www.markaz.app/api/export/image/163-77-757935-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F163-77-757935-product-1.webp', 'Black Head Remover Vacuum', 0, 1),
('pi-bs-40-2', 'p-bs-40', 'https://www.markaz.app/api/export/image/163-77-757935-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F163-77-757935-product-2.webp', 'Black Head Remover Vacuum', 1, 0),
('pi-bs-40-3', 'p-bs-40', 'https://www.markaz.app/api/export/image/163-77-757935-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F163-77-757935-product-3.webp', 'Black Head Remover Vacuum', 2, 0),
('pi-bs-40-4', 'p-bs-40', 'https://www.markaz.app/api/export/image/163-77-757935-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F163-77-757935-product-4.webp', 'Black Head Remover Vacuum', 3, 0),
('pi-bs-40-5', 'p-bs-40', 'https://www.markaz.app/api/export/image/163-77-757935-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F163-77-757935-product-5.webp', 'Black Head Remover Vacuum', 4, 0),
('pi-bs-40-6', 'p-bs-40', 'https://www.markaz.app/api/export/image/163-77-757935-product-6.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F163-77-757935-product-6.webp', 'Black Head Remover Vacuum', 5, 0),
('pi-bs-41-1', 'p-bs-41', 'https://www.markaz.app/api/export/image/1347-77-688456-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-688456-product-1.webp', 'Zafrani Whitening Glowing Cream for All Skin Types', 0, 1),
('pi-bs-41-2', 'p-bs-41', 'https://www.markaz.app/api/export/image/1347-77-688456-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-688456-product-2.webp', 'Zafrani Whitening Glowing Cream for All Skin Types', 1, 0),
('pi-bs-41-3', 'p-bs-41', 'https://www.markaz.app/api/export/image/1347-77-688456-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1347-77-688456-product-3.webp', 'Zafrani Whitening Glowing Cream for All Skin Types', 2, 0),
('pi-bs-42-1', 'p-bs-42', 'https://www.markaz.app/api/export/image/2414-77-749820-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2414-77-749820-product-1.webp', 'Mandelac Face Wash', 0, 1),
('pi-bs-42-2', 'p-bs-42', 'https://www.markaz.app/api/export/image/2414-77-749820-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2414-77-749820-product-2.webp', 'Mandelac Face Wash', 1, 0),
('pi-bs-42-3', 'p-bs-42', 'https://www.markaz.app/api/export/image/2414-77-749820-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2414-77-749820-product-3.webp', 'Mandelac Face Wash', 2, 0),
('pi-bs-42-4', 'p-bs-42', 'https://www.markaz.app/api/export/image/2414-77-749820-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2414-77-749820-product-4.webp', 'Mandelac Face Wash', 3, 0),
('pi-bs-42-5', 'p-bs-42', 'https://www.markaz.app/api/export/image/2414-77-749820-product-5.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2414-77-749820-product-5.webp', 'Mandelac Face Wash', 4, 0),
('pi-bs-42-6', 'p-bs-42', 'https://www.markaz.app/api/export/image/2414-77-749820-product-6.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F2414-77-749820-product-6.webp', 'Mandelac Face Wash', 5, 0),
('pi-bs-43-1', 'p-bs-43', 'https://www.markaz.app/api/export/image/221-77-664933-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F221-77-664933-product-1.webp', 'Rice Extract Brightening Glow Kit for All Skin Types', 0, 1),
('pi-bs-43-2', 'p-bs-43', 'https://www.markaz.app/api/export/image/221-77-664933-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F221-77-664933-product-2.webp', 'Rice Extract Brightening Glow Kit for All Skin Types', 1, 0),
('pi-bs-44-1', 'p-bs-44', 'https://www.markaz.app/api/export/image/1408-77-693216-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1408-77-693216-product-1.webp', 'Whitening Cream for All Skin Types with Durable Jar', 0, 1),
('pi-bs-44-2', 'p-bs-44', 'https://www.markaz.app/api/export/image/1408-77-693216-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1408-77-693216-product-2.webp', 'Whitening Cream for All Skin Types with Durable Jar', 1, 0),
('pi-bs-45-1', 'p-bs-45', 'https://www.markaz.app/api/export/image/608-77-725349-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F608-77-725349-product-1.webp', '24 Hours Full Coverage Face Cream Solution', 0, 1),
('pi-bs-45-2', 'p-bs-45', 'https://www.markaz.app/api/export/image/608-77-725349-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F608-77-725349-product-2.webp', '24 Hours Full Coverage Face Cream Solution', 1, 0),
('pi-bs-45-3', 'p-bs-45', 'https://www.markaz.app/api/export/image/608-77-725349-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F608-77-725349-product-3.webp', '24 Hours Full Coverage Face Cream Solution', 2, 0),
('pi-bs-45-4', 'p-bs-45', 'https://www.markaz.app/api/export/image/608-77-725349-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F608-77-725349-product-4.webp', '24 Hours Full Coverage Face Cream Solution', 3, 0),
('pi-bs-46-1', 'p-bs-46', 'https://www.markaz.app/api/export/image/1013-77-677811-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-77-677811-product-1.webp', 'Orange Enzyme Exfoliating Brightening Gel LF16-35', 0, 1),
('pi-bs-46-2', 'p-bs-46', 'https://www.markaz.app/api/export/image/1013-77-677811-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-77-677811-product-2.webp', 'Orange Enzyme Exfoliating Brightening Gel LF16-35', 1, 0),
('pi-bs-46-3', 'p-bs-46', 'https://www.markaz.app/api/export/image/1013-77-677811-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-77-677811-product-3.webp', 'Orange Enzyme Exfoliating Brightening Gel LF16-35', 2, 0),
('pi-bs-46-4', 'p-bs-46', 'https://www.markaz.app/api/export/image/1013-77-677811-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-77-677811-product-4.webp', 'Orange Enzyme Exfoliating Brightening Gel LF16-35', 3, 0),
('pi-bs-46-5', 'p-bs-46', 'https://www.markaz.app/api/export/image/1013-77-677811-product-1-withcode.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F1013-77-677811-product-1-withcode.webp', 'Orange Enzyme Exfoliating Brightening Gel LF16-35', 4, 0),
('pi-bs-47-1', 'p-bs-47', 'https://www.markaz.app/api/export/image/199-77-381251-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F199-77-381251-product-1.jpg', 'The Ordinary Brightening Glow Kit 4-Piece Serum Exfoliator Cream', 0, 1),
('pi-bs-47-2', 'p-bs-47', 'https://www.markaz.app/api/export/image/199-77-381251-product-2.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F199-77-381251-product-2.jpg', 'The Ordinary Brightening Glow Kit 4-Piece Serum Exfoliator Cream', 1, 0),
('pi-bs-47-3', 'p-bs-47', 'https://www.markaz.app/api/export/image/199-77-381251-product-3.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F199-77-381251-product-3.jpg', 'The Ordinary Brightening Glow Kit 4-Piece Serum Exfoliator Cream', 2, 0),
('pi-bs-47-4', 'p-bs-47', 'https://www.markaz.app/api/export/image/199-77-381251-product-4.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F199-77-381251-product-4.jpg', 'The Ordinary Brightening Glow Kit 4-Piece Serum Exfoliator Cream', 3, 0),
('pi-bs-47-5', 'p-bs-47', 'https://www.markaz.app/api/export/image/199-77-381251-product-1-withcode.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F199-77-381251-product-1-withcode.jpg', 'The Ordinary Brightening Glow Kit 4-Piece Serum Exfoliator Cream', 4, 0),
('pi-bs-48-1', 'p-bs-48', 'https://www.markaz.app/api/export/image/700-77-758441-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F700-77-758441-product-1.webp', 'Zafrani Whitening Cream With Serum, 500 g Jar, 1 Pc', 0, 1),
('pi-bs-48-2', 'p-bs-48', 'https://www.markaz.app/api/export/image/700-77-758441-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F700-77-758441-product-3.webp', 'Zafrani Whitening Cream With Serum, 500 g Jar, 1 Pc', 1, 0),
('pi-bs-48-3', 'p-bs-48', 'https://www.markaz.app/api/export/image/700-77-758441-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F700-77-758441-product-4.webp', 'Zafrani Whitening Cream With Serum, 500 g Jar, 1 Pc', 2, 0),
('pi-bs-49-1', 'p-bs-49', 'https://www.markaz.app/api/export/image/512-77-693015-product-1.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F512-77-693015-product-1.webp', 'Botox Bee Venom Wrinkle Cream 30gm All Skin Types', 0, 1),
('pi-bs-49-2', 'p-bs-49', 'https://www.markaz.app/api/export/image/512-77-693015-product-2.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F512-77-693015-product-2.webp', 'Botox Bee Venom Wrinkle Cream 30gm All Skin Types', 1, 0),
('pi-bs-49-3', 'p-bs-49', 'https://www.markaz.app/api/export/image/512-77-693015-product-3.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F512-77-693015-product-3.webp', 'Botox Bee Venom Wrinkle Cream 30gm All Skin Types', 2, 0),
('pi-bs-49-4', 'p-bs-49', 'https://www.markaz.app/api/export/image/512-77-693015-product-4.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F512-77-693015-product-4.webp', 'Botox Bee Venom Wrinkle Cream 30gm All Skin Types', 3, 0),
('pi-bs-49-5', 'p-bs-49', 'https://www.markaz.app/api/export/image/512-77-693015-product-1-withcode.webp?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F512-77-693015-product-1-withcode.webp', 'Botox Bee Venom Wrinkle Cream 30gm All Skin Types', 4, 0),
('pi-bs-50-1', 'p-bs-50', 'https://www.markaz.app/api/export/image/238-77-391595-product-1.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F238-77-391595-product-1.jpg', 'Exfoliating & Night Cream Set for All Skin Types', 0, 1),
('pi-bs-50-2', 'p-bs-50', 'https://www.markaz.app/api/export/image/238-77-391595-product-2.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F238-77-391595-product-2.jpg', 'Exfoliating & Night Cream Set for All Skin Types', 1, 0),
('pi-bs-50-3', 'p-bs-50', 'https://www.markaz.app/api/export/image/238-77-391595-product-3.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F238-77-391595-product-3.jpg', 'Exfoliating & Night Cream Set for All Skin Types', 2, 0),
('pi-bs-50-4', 'p-bs-50', 'https://www.markaz.app/api/export/image/238-77-391595-product-4.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F238-77-391595-product-4.jpg', 'Exfoliating & Night Cream Set for All Skin Types', 3, 0),
('pi-bs-50-5', 'p-bs-50', 'https://www.markaz.app/api/export/image/238-77-391595-product-5.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F238-77-391595-product-5.jpg', 'Exfoliating & Night Cream Set for All Skin Types', 4, 0),
('pi-bs-50-6', 'p-bs-50', 'https://www.markaz.app/api/export/image/238-77-391595-product-1-withcode.jpg?src=https%3A%2F%2Fstatic.markaz.app%2Fpakistan%2Fproducts%2F238-77-391595-product-1-withcode.jpg', 'Exfoliating & Night Cream Set for All Skin Types', 5, 0);

-- End of Beauty & Skincare import ----------------------------
