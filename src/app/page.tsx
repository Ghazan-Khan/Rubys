import type { Metadata } from 'next';
import HeroBanner from '@/components/home/HeroBanner';
import TrustIndicators from '@/components/home/TrustIndicators';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import ProductGrid from '@/components/home/ProductGrid';
import PromoBanner from '@/components/home/PromoBanner';
import Testimonials from '@/components/home/Testimonials';
import BlogPreview from '@/components/home/BlogPreview';
import Newsletter from '@/components/home/Newsletter';
import { getBlogPosts, getCategories, getFeaturedProducts, getNewArrivals } from '@/lib/products';

export const metadata: Metadata = {
  title: "Ruby's.pk - Women's Fashion, Beauty, Bags, Jewellery & Footwear",
  description:
    "Shop curated women's fashion, skincare, luxury bags, designer jewellery, watches and footwear at Ruby's.pk. Fast delivery across Pakistan with Cash on Delivery.",
  alternates: { canonical: '/' },
};

export default function Home() {
  const categories = getCategories();
  const featured = getFeaturedProducts(8);
  const newArrivals = getNewArrivals(4);
  const posts = getBlogPosts(3);

  return (
    <>
      <HeroBanner products={featured.slice(0, 3)} />
      <TrustIndicators />
      <FeaturedCategories categories={categories} />
      <ProductGrid
        eyebrow="Handpicked for you"
        title="Featured products"
        subtitle="Our most-loved pieces this month — tried, tested and ready to ship."
        products={featured}
        href="/shop?sort=featured"
      />
      <PromoBanner />
      <ProductGrid
        eyebrow="Just landed"
        title="New arrivals"
        subtitle="The latest additions to the Ruby's collection."
        products={newArrivals}
        href="/shop?sort=newest"
        className="bg-gray-50"
      />
      <Testimonials />
      <BlogPreview posts={posts} />
      <Newsletter />
    </>
  );
}
