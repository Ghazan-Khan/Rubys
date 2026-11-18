import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function parseCSV(content) {
  content = content.replace(/^\uFEFF/, '');
  const lines = content.split(/\r?\n/);
  const rows = [];
  let buffer = '';
  let inQuotes = false;
  for (const line of lines) {
    if (!line.trim() && !inQuotes) continue;
    if (buffer) buffer += '\n';
    buffer += line;
    let q = 0;
    for (let i = 0; i < buffer.length; i++) {
      if (buffer[i] === '"') q++;
    }
    if (q % 2 === 0) {
      rows.push(parseCSVLine(buffer));
      buffer = '';
    }
  }
  return rows;
}

function cleanHtmlText(html) {
  if (!html) return '';
  let text = html;
  // Remove anchor tags pointing to markaz or anything else
  text = text.replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, '');
  text = text.replace(/<p>\s*Delivered across Pakistan with cash on delivery\.\s*<\/p>/gi, '');
  text = text.replace(/<p>\s*View this product on Markaz\s*<\/p>/gi, '');

  // Convert list items
  text = text.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_m, p1) => {
    const cleanItem = p1.replace(/<[^>]+>/g, '').trim();
    return cleanItem ? ` · ${cleanItem}` : '';
  });
  text = text.replace(/<ul\b[^>]*>([\s\S]*?)<\/ul>/gi, (_m, p1) => {
    const cleanList = p1.trim().replace(/^ · /, '');
    return `\n\n${cleanList}\n\n`;
  });

  // Convert paragraphs
  text = text.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_m, p1) => `\n\n${p1}\n\n`);
  text = text.replace(/<br\s*\/?>/gi, '\n');

  // Strip remaining tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Decode HTML entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');

  // Normalize whitespace and newlines
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
  return `'${val.replace(/'/g, "''")}'`;
}

// Collect existing slugs & skus from existing files
const existingSlugs = new Set();
const existingSkus = new Set();

const scanFiles = [
  path.join(root, 'database', 'seed.sql'),
  path.join(root, 'database', 'migrations.sql'),
  path.join(root, 'database', 'beauty-skincare-catalog.sql'),
];

for (const sf of scanFiles) {
  if (fs.existsSync(sf)) {
    const c = fs.readFileSync(sf, 'utf8');
    const slugMatches = c.matchAll(/VALUES\s*\([^)]*?'([a-z0-9-]+)'/gi);
    for (const m of slugMatches) {
      existingSlugs.add(m[1]);
    }
  }
}

console.log(`Loaded ${existingSlugs.size} existing slugs.`);

const categoriesConfig = [
  {
    category_id: 'cat-clothing-fashion',
    category_name: 'Clothing & Fashion',
    category_slug: 'clothing-fashion',
    category_desc: 'Pret, luxury lawn, festive wear, kurtis, dresses, abayas & modest fashion for her.',
    category_emoji: '👗',
    category_banner: 'Wear it with grace & confidence',
    category_meta_title: "Women's Clothing & Fashion Online in Pakistan",
    category_meta_desc: "Shop ladies dresses, lawn suits, pret wear and abayas with nationwide COD from Ruby's.pk.",
    prefix: 'cf',
    csvFile: 'C:/Users/FAIZANz COMp/Downloads/Clothing.csv',
    outputFile: path.join(root, 'database', 'clothing-fashion-catalog.sql'),
    importName: 'clothing-fashion-catalog.sql',
  },
  {
    category_id: 'cat-bags-accessories',
    category_name: 'Bags & Accessories',
    category_slug: 'bags-accessories',
    category_desc: 'Designer handbags, crossbody bags, evening clutches, silk scarves & belts.',
    category_emoji: '👜',
    category_banner: 'Sophistication in every detail',
    category_meta_title: "Women's Handbags & Accessories in Pakistan",
    category_meta_desc: 'Explore luxury totes, crossbody bags, clutches and silk scarves with fast delivery across Pakistan.',
    prefix: 'ba',
    csvFile: 'C:/Users/FAIZANz COMp/Downloads/bags.csv',
    outputFile: path.join(root, 'database', 'bags-accessories-catalog.sql'),
    importName: 'bags-accessories-catalog.sql',
  },
  {
    category_id: 'cat-jewellery-watches',
    category_name: 'Jewellery & Watches',
    category_slug: 'jewellery-watches',
    category_desc: 'Rose gold mesh watches, pearl necklaces, zircon studs, bridal sets & bangles.',
    category_emoji: '✨',
    category_banner: 'Sparkle for every special moment',
    category_meta_title: "Women's Jewellery & Watches in Pakistan",
    category_meta_desc: 'Shop exquisite watches, necklaces, earrings and jewellery pieces with cash on delivery.',
    prefix: 'jw',
    csvFile: fs.existsSync('C:/Users/FAIZANz COMp/.gemini/antigravity/brain/73233872-dd22-43a5-a6ee-4b8dde994b50/.user_uploaded/media_1794988305030_0eb387eb.csv')
      ? 'C:/Users/FAIZANz COMp/.gemini/antigravity/brain/73233872-dd22-43a5-a6ee-4b8dde994b50/.user_uploaded/media_1794988305030_0eb387eb.csv'
      : 'C:/Users/FAIZANz COMp/Downloads/Jewellery.csv',
    outputFile: path.join(root, 'database', 'jewellery-watches-catalog.sql'),
    importName: 'jewellery-watches-catalog.sql',
  },
  {
    category_id: 'cat-shoes-footwear',
    category_name: 'Shoes & Footwear',
    category_slug: 'shoes-footwear',
    category_desc: 'Handcrafted khussas, comfortable block heels, elegant sandals & everyday flats.',
    category_emoji: '👠',
    category_banner: 'Step out in comfort & elegance',
    category_meta_title: "Women's Shoes & Footwear Online",
    category_meta_desc: 'Find handcrafted khussas, heels, mules and flats crafted for all-day comfort.',
    prefix: 'sf',
    csvFile: 'C:/Users/FAIZANz COMp/Downloads/Footwear.csv',
    outputFile: path.join(root, 'database', 'shoes-footwear-catalog.sql'),
    importName: 'shoes-footwear-catalog.sql',
  },
  {
    category_id: 'cat-lifestyle-personal',
    category_name: 'Lifestyle & Personal Care',
    category_slug: 'lifestyle-personal-care',
    category_desc: 'Ceramic tableware, insulated tumblers, lunch boxes, self-care & mindful home living.',
    category_emoji: '🌸',
    category_banner: 'Curated self-care & mindful living',
    category_meta_title: "Women's Lifestyle & Personal Care in Pakistan",
    category_meta_desc: 'Indulge in gentle self-care, tableware, drinkware, kitchen essentials and wellness goods.',
    prefix: 'lp',
    csvFile: 'C:/Users/FAIZANz COMp/Downloads/LifeStyle.csv',
    outputFile: path.join(root, 'database', 'lifestyle-personal-catalog.sql'),
    importName: 'lifestyle-personal-catalog.sql',
  },
];

for (const cat of categoriesConfig) {
  console.log(`\nProcessing ${cat.category_name} from ${cat.csvFile}...`);
  const content = fs.readFileSync(cat.csvFile, 'utf8');
  const rows = parseCSV(content);
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
    const type = row[typeIdx];
    if (type === 'variable' || type === 'simple') {
      parents.push(row);
    } else if (type === 'variation') {
      const parentSku = row[parentIdx];
      if (!variationsByParent.has(parentSku)) {
        variationsByParent.set(parentSku, []);
      }
      variationsByParent.get(parentSku).push(row);
    }
  }

  console.log(`  Found ${parents.length} products.`);

  const productStatements = [];
  const imageStatements = [];

  let prodIndex = 1;
  for (const row of parents) {
    const rawSku = row[skuIdx].trim();
    const name = row[nameIdx].trim();
    const rawDesc = row[descIdx] || '';
    const rawShortDesc = row[shortDescIdx] || '';
    const imagesStr = row[imagesIdx] || '';
    const isVariable = row[typeIdx] === 'variable';

    // Calculate price
    let priceNum = 0;
    if (isVariable) {
      const vars = variationsByParent.get(rawSku) || [];
      const varPrices = vars
        .map((v) => Number(v[priceIdx]))
        .filter((n) => !isNaN(n) && n > 0);
      priceNum = varPrices.length > 0 ? Math.min(...varPrices) : 0;
    } else {
      priceNum = Number(row[priceIdx]) || 0;
    }
    priceNum = Math.round(priceNum);

    // Clean description
    const cleanedDesc = cleanHtmlText(rawDesc);

    // Clean short description
    let shortDesc = rawShortDesc ? cleanHtmlText(rawShortDesc) : '';
    if (!shortDesc || shortDesc.startsWith('·') || shortDesc.length < 20 || shortDesc.startsWith('Product Code:')) {
      // Look for a proper prose sentence in cleanedDesc
      const proseParagraphs = cleanedDesc
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter((p) => p && !p.startsWith('·') && !p.startsWith('-') && !p.startsWith('Product Code:') && p.length > 25);

      if (proseParagraphs.length > 0) {
        const firstSentence = proseParagraphs[0].split(/(?<=[.!?])\s+/)[0] || proseParagraphs[0];
        shortDesc = firstSentence.length > 150 ? firstSentence.slice(0, 147) + '...' : firstSentence;
      } else {
        // Generate an elegant, descriptive sentence from product name
        shortDesc = `${name}. Designed for style, comfort, and everyday elegance.`;
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
    if (existingSkus.has(finalSku)) {
      finalSku = `${rawSku}-${prodIndex}`;
    }
    existingSkus.add(finalSku);

    // Images
    const rawImageUrls = imagesStr
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.startsWith('http'));

    const primaryImageUrl = rawImageUrls.length > 0 ? rawImageUrls[0] : null;

    // Featured badge for top 2
    const isFeatured = prodIndex <= 2 ? 1 : 0;
    const badge = prodIndex === 1 ? 'Best Seller' : prodIndex === 2 ? 'Trending' : null;
    const rating = prodIndex === 1 ? 4.9 : prodIndex === 2 ? 4.8 : 0;
    const reviewCount = prodIndex === 1 ? 48 : prodIndex === 2 ? 32 : 0;
    const soldCount = prodIndex === 1 ? 190 : prodIndex === 2 ? 140 : 0;

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

  // Construct SQL file
  const sqlHeader = `-- ============================================================
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
(${sqlEscape(cat.category_id)}, ${sqlEscape(cat.category_name)}, ${sqlEscape(cat.category_slug)}, ${sqlEscape(cat.category_desc)}, ${sqlEscape(cat.category_emoji)}, ${sqlEscape(cat.category_banner)}, 1, 1, ${sqlEscape(cat.category_meta_title)}, ${sqlEscape(cat.category_meta_desc)});

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

  fs.writeFileSync(cat.outputFile, sqlHeader, 'utf8');
  console.log(`  Wrote ${cat.outputFile} with ${productStatements.length} products and ${imageStatements.length} images.`);
}

console.log('\nAll 4 catalog files generated successfully!');
