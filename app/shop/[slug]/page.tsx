import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/products/product-detail-view";
import { products, getProductBySlug } from "@/content/products";
import { getProductDetail } from "@/content/product-details";
import { brand } from "@/content/site";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${brand.name}`,
    description: product.name,
  };
}

/**
 * Product Detail Page — Phase 4. Only verified product data
 * (docs/product-inventory.md, docs/content-inventory.md §2). See
 * components/products/product-detail-view.tsx for the architecture notes
 * on how missing data/assets are handled without redesigning the
 * component.
 */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const detailEntry = getProductDetail(slug);

  return <ProductDetailView product={product} detailEntry={detailEntry} />;
}
