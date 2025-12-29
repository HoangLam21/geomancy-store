import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { getProductBySlug, getRelatedProducts } from "@/product";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}

// Generate static params for all products
export async function generateStaticParams() {
  const { products } = await import("@/product");
  
  return products.map((product) => ({
    slug: product.slug,
  }));
}