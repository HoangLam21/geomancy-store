import Link from "next/link";
import Image from "next/image";
import { Product } from "@/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="overflow-hidden bg-white">
        <div className="relative aspect-square overflow-hidden bg-light-gray">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.originalPrice && (
            <div className="absolute left-2 top-2 bg-primary px-2 py-1 text-xs font-semibold text-white">
              SALE
            </div>
          )}
        </div>

        <div className="mt-3">
          <h3 className="text-sm font-medium uppercase tracking-wide text-dark">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-gray">{product.material}</p>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm font-semibold text-dark">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
