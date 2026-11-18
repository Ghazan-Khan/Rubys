import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const csvPath = fs.existsSync('C:/Users/FAIZANz COMp/.gemini/antigravity/brain/73233872-dd22-43a5-a6ee-4b8dde994b50/.user_uploaded/media_1794988305030_0eb387eb.csv')
  ? 'C:/Users/FAIZANz COMp/.gemini/antigravity/brain/73233872-dd22-43a5-a6ee-4b8dde994b50/.user_uploaded/media_1794988305030_0eb387eb.csv'
  : 'c:/Users/FAIZANz COMp/Downloads/Jewellery.csv';

console.log('Loading CSV from:', csvPath);

function parseCSV(text) {
  text = text.replace(/^\uFEFF/, '');
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (i + 1 < text.length && text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(cell);
        cell = '';
      } else if (c === '\r') {
        // skip \r
      } else if (c === '\n') {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = '';
      } else {
        cell += c;
      }
    }
  }
  if (cell || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function cleanHtmlText(html) {
  if (!html) return '';
  let text = html;
  text = text.replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, '');
  text = text.replace(/<p>\s*Delivered across Pakistan with cash on delivery\.\s*<\/p>/gi, '');
  text = text.replace(/<p>\s*View this product on Markaz\s*<\/p>/gi, '');
  text = text.replace(/View this product on Markaz/gi, '');

  text = text.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_m, p1) => {
    const cleanItem = p1.replace(/<[^>]+>/g, '').trim();
    return cleanItem ? ` · ${cleanItem}` : '';
  });
  text = text.replace(/<ul\b[^>]*>([\s\S]*?)<\/ul>/gi, (_m, p1) => {
    const cleanList = p1.trim().replace(/^ · /, '');
    return `\n\n${cleanList}\n\n`;
  });

  text = text.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_m, p1) => `\n\n${p1}\n\n`);
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<[^>]+>/g, ' ');

  text = text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');

  text = text.replace(/[ \t]+/g, ' ');
  text = text.replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
  return text;
}

function makeSlug(name) {
  return name
    .toLowerCase()
    .replace(/['"’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function sqlEscape(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val.toString();
  return `'${String(val).replace(/'/g, "''")}'`;
}

// Load existing slugs and SKUs
const existingSlugs = new Set();
const existingSkus = new Set();

const scanFiles = [
  path.join(root, 'database', 'seed.sql'),
  path.join(root, 'database', 'migrations.sql'),
  path.join(root, 'database', 'beauty-skincare-catalog.sql'),
  path.join(root, 'database', 'clothing-fashion-catalog.sql'),
  path.join(root, 'database', 'bags-accessories-catalog.sql'),
  path.join(root, 'database', 'shoes-footwear-catalog.sql'),
  path.join(root, 'database', 'lifestyle-personal-catalog.sql'),
];

for (const sf of scanFiles) {
  if (fs.existsSync(sf)) {
    const c = fs.readFileSync(sf, 'utf8');
    const slugMatches = c.matchAll(/VALUES\s*\([^)]*?'([a-z0-9-]+)'/gi);
    for (const m of slugMatches) {
      existingSlugs.add(m[1]);
    }
    const skuMatches = c.matchAll(/'(MKZ-[^']+)'/gi);
    for (const m of skuMatches) {
      existingSkus.add(m[1]);
    }
  }
}

console.log(`Loaded ${existingSlugs.size} existing slugs, ${existingSkus.size} existing SKUs.`);

const cat = {
  category_id: 'cat-jewellery-watches',
  category_name: 'Jewellery & Watches',
  category_slug: 'jewellery-watches',
  category_desc: 'Rose gold mesh watches, pearl necklaces, zircon studs, bridal sets & bangles.',
  category_emoji: '✨',
  category_banner: 'Sparkle for every special moment',
  category_meta_title: "Women's Jewellery & Watches in Pakistan",
  category_meta_desc: 'Shop exquisite watches, necklaces, earrings and jewellery pieces with cash on delivery.',
  prefix: 'jw',
  outputFile: path.join(root, 'database', 'jewellery-watches-catalog.sql'),
  importName: 'jewellery-watches-catalog.sql',
};

const text = fs.readFileSync(csvPath, 'utf8');
const rows = parseCSV(text);
const header = rows[0];

const typeIdx = header.indexOf('Type');
const skuIdx = header.indexOf('SKU');
const nameIdx = header.indexOf('Name');
const shortDescIdx = header.indexOf('Short description');
const descIdx = header.indexOf('Description');
const priceIdx = header.indexOf('Regular price');
const imagesIdx = header.indexOf('Images');
const parentIdx = header.indexOf('Parent');

const parents = [];
const variationsByParent = new Map();

for (let i = 1; i < rows.length; i++) {
  const row = rows[i];
  if (!row || row.length < 3) continue;
  const type = row[typeIdx]?.trim();
  if (type === 'variable' || type === 'simple') {
    parents.push(row);
  } else if (type === 'variation') {
    const parentSku = row[parentIdx]?.trim();
    if (!variationsByParent.has(parentSku)) {
      variationsByParent.set(parentSku, []);
    }
    variationsByParent.get(parentSku).push(row);
  }
}

console.log(`Found ${parents.length} parents and ${variationsByParent.size} variable parents.`);

const productStatements = [];
const imageStatements = [];

let prodIndex = 1;
for (const row of parents) {
  const rawSku = (row[skuIdx] || '').trim();
  const name = (row[nameIdx] || '').trim();
  const rawDesc = row[descIdx] || '';
  const rawShortDesc = row[shortDescIdx] || '';
  const imagesStr = row[imagesIdx] || '';
  const isVariable = row[typeIdx]?.trim() === 'variable';

  // Calculate price
  let priceNum = 0;
  if (isVariable) {
    const vars = variationsByParent.get(rawSku) || [];
    const varPrices = vars
      .map((v) => Number(v[priceIdx]))
      .filter((n) => !isNaN(n) && n > 0);
    priceNum = varPrices.length > 0 ? Math.min(...varPrices) : (Number(row[priceIdx]) || 0);
  } else {
    priceNum = Number(row[priceIdx]) || 0;
  }
  priceNum = Math.round(priceNum);
  if (!priceNum || isNaN(priceNum)) {
    priceNum = 999; // sensible fallback
  }

  // Clean description
  const cleanedDesc = cleanHtmlText(rawDesc);

  // Clean short description
  let shortDesc = rawShortDesc ? cleanHtmlText(rawShortDesc) : '';
  if (!shortDesc || shortDesc.startsWith('·') || shortDesc.length < 20 || shortDesc.startsWith('Product Code:')) {
    const proseParagraphs = cleanedDesc
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter((p) => p && !p.startsWith('·') && !p.startsWith('-') && !p.startsWith('Product Code:') && p.length > 25);

    if (proseParagraphs.length > 0) {
      const firstSentence = proseParagraphs[0].split(/(?<=[.!?])\s+/)[0] || proseParagraphs[0];
      shortDesc = firstSentence.length > 150 ? firstSentence.slice(0, 147) + '...' : firstSentence;
    } else {
      shortDesc = `${name}. Crafted for timeless elegance, sparkle, and everyday beauty.`;
    }
  }
  if (shortDesc.length > 160) {
    shortDesc = shortDesc.slice(0, 157) + '...';
  }

  // Generate unique slug
  let baseSlug = makeSlug(name);
  if (!baseSlug) baseSlug = `product-${cat.prefix}-${prodIndex}`;
  let finalSlug = baseSlug;
  let counter = 2;
  while (existingSlugs.has(finalSlug)) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  existingSlugs.add(finalSlug);

  // Product ID
  const prodId = `p-${cat.prefix}-${String(prodIndex).padStart(2, '0')}`;

  // SKU
  let finalSku = rawSku;
  if (!finalSku || existingSkus.has(finalSku)) {
    finalSku = rawSku ? `${rawSku}-${prodIndex}` : `RB-JW-${String(prodIndex).padStart(3, '0')}`;
  }
  existingSkus.add(finalSku);

  // Images
  const rawImageUrls = imagesStr
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.startsWith('http'));

  const primaryImageUrl = rawImageUrls.length > 0 ? rawImageUrls[0] : null;

  // Featured badge for top items
  const isFeatured = prodIndex <= 4 ? 1 : 0;
  const badge = prodIndex === 1 ? 'Best Seller' : prodIndex === 2 ? 'Trending' : prodIndex === 3 ? 'Popular' : null;
  const rating = prodIndex === 1 ? 4.9 : prodIndex === 2 ? 4.8 : prodIndex <= 4 ? 4.7 : 0;
  const reviewCount = prodIndex === 1 ? 64 : prodIndex === 2 ? 45 : prodIndex <= 4 ? 28 : 0;
  const soldCount = prodIndex === 1 ? 210 : prodIndex === 2 ? 165 : prodIndex <= 4 ? 120 : 0;

  const metaTitle = `${name} | Ruby's.pk`;
  const metaDesc = shortDesc;

  productStatements.push(
    `(${sqlEscape(prodId)}, ${sqlEscape(name)}, ${sqlEscape(finalSlug)}, ${sqlEscape(finalSku)}, ${sqlEscape(cleanedDesc)}, ${sqlEscape(shortDesc)}, ${priceNum}, NULL, NULL, ${sqlEscape(cat.category_id)}, 'Ruby''s Select', 25, ${isFeatured}, 1, ${sqlEscape(cat.category_emoji)}, ${sqlEscape(primaryImageUrl)}, ${sqlEscape(badge)}, ${rating}, ${reviewCount}, ${soldCount}, ${sqlEscape(metaTitle)}, ${sqlEscape(metaDesc)}, datetime('now'))`
  );

  // Product images
  for (let imgIdx = 0; imgIdx < rawImageUrls.length; imgIdx++) {
    const imgId = `pi-${cat.prefix}-${String(prodIndex).padStart(2, '0')}-${imgIdx + 1}`;
    const imgUrl = rawImageUrls[imgIdx];
    const isPrimary = imgIdx === 0 ? 1 : 0;
    imageStatements.push(
      `(${sqlEscape(imgId)}, ${sqlEscape(prodId)}, ${sqlEscape(imgUrl)}, ${sqlEscape(name)}, ${imgIdx}, ${isPrimary})`
    );
  }

  prodIndex++;
}

const sqlContent = `-- ============================================================
-- Ruby's.pk — ${cat.category_name} catalogue import
-- ------------------------------------------------------------
-- ${parents.length} products imported from supplier export,
-- filed under ${cat.category_name} (${cat.category_id}).
--
-- Idempotent: can be re-run safely. Records in \`applied_imports\`
-- so startup skips re-reading/re-writing.
-- ============================================================

CREATE TABLE IF NOT EXISTS applied_imports (
    name        TEXT PRIMARY KEY,
    applied_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO categories (id, name, slug, description, emoji, banner_text, is_active, sort_order, meta_title, meta_description) VALUES
(${sqlEscape(cat.category_id)}, ${sqlEscape(cat.category_name)}, ${sqlEscape(cat.category_slug)}, ${sqlEscape(cat.category_desc)}, ${sqlEscape(cat.category_emoji)}, ${sqlEscape(cat.category_banner)}, 1, 4, ${sqlEscape(cat.category_meta_title)}, ${sqlEscape(cat.category_meta_desc)});

-- Products ---------------------------------------------------
INSERT OR IGNORE INTO products (id, name, slug, sku, description, short_description, price, sale_price, cost_price, category_id, brand, stock_quantity, is_featured, is_active, emoji, image_url, badge, rating, review_count, sold_count, meta_title, meta_description, created_at) VALUES
${productStatements.join(',\n')};

-- Gallery images ---------------------------------------------
INSERT OR IGNORE INTO product_images (id, product_id, image_url, alt_text, sort_order, is_primary) VALUES
${imageStatements.join(',\n')};

-- Mark the import as applied ---------------------------------
INSERT OR IGNORE INTO applied_imports (name) VALUES (${sqlEscape(cat.importName)});

-- End of ${cat.category_name} import ------------------------
`;

fs.writeFileSync(cat.outputFile, sqlContent, 'utf8');
console.log(`Wrote ${cat.outputFile} with ${productStatements.length} products and ${imageStatements.length} images.`);
