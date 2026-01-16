"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation"; // Thêm import này
import { ProductCard } from "@/components/card/ProductCard";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/product";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const router = useRouter(); // Thêm hook này

  // Validate sizes array - với kiểm tra an toàn hơn
  const availableSizes =
    product?.sizes && Array.isArray(product.sizes) && product.sizes.length > 0
      ? product.sizes
      : product?.beadSize
      ? [product.beadSize]
      : ["10mm"]; // fallback default

  const [selectedSize, setSelectedSize] = useState(availableSizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "additional" | "reviews"
  >("description");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
      },
      quantity
    );
  };

  // Thêm handler cho Buy Now
  const handleBuyNow = () => {
    // Thêm sản phẩm vào giỏ hàng
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
      },
      quantity
    );
    
    // Chuyển hướng đến trang checkout
    router.push("/checkout");
  };

  const images = [product.image, product.image, product.image].filter(
    (img) => img && img.trim() !== ""
  );

  // Nếu không có ảnh nào hợp lệ, dùng placeholder
  const validImages = images.length > 0 ? images : ["/images/placeholder.jpg"];

  return (
    <div className="mx-auto px-4 py-8 bg-white">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-black">
        <span>Home</span>
        <Icon icon="mdi:chevron-right" className="h-4 w-4" />
        <span>Products</span>
        <Icon icon="mdi:chevron-right" className="h-4 w-4" />
        <span className="text-dark">{product.name}</span>
      </div>

      {/* Product Details Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden bg-light-gray">
            {validImages[currentImageIndex] ? (
              <Image
                src={validImages[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-light-gray text-black">
                <Icon icon="mdi:image-off" className="h-16 w-16" />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {validImages.map((img, index) => (
              <button
                key={`thumb-${index}`}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative h-20 w-20 overflow-hidden bg-light-gray ${
                  currentImageIndex === index ? "ring-2 ring-primary" : ""
                }`}
              >
                {img ? (
                  <Image
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-light-gray text-black">
                    <Icon icon="mdi:image-off" className="h-8 w-8" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-semibold uppercase tracking-wide text-dark">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  icon="mdi:star"
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating || 5)
                      ? "text-yellow-400"
                      : "text-light-gray"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-black">{product.rating || 5.0}</span>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-black line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 leading-relaxed text-black">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="mt-6 text-black">
            <h3 className="mb-3 text-sm font-semibold uppercase text-dark">
              SIZE
            </h3>
            <div className="flex gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 text-sm transition-colors ${
                    selectedSize === size
                      ? "border-primary bg-primary text-white"
                      : "border-light-gray hover:border-gray"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {product.stock && (
              <p className="mt-2 text-sm text-black">
                {product.stock} in stock
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-6 text-black">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-light-gray">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 transition-colors hover:bg-light-gray/30"
                >
                  <Icon icon="mdi:minus" className="h-5 w-5" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 border-x border-light-gray py-2 text-center"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 transition-colors hover:bg-light-gray/30"
                >
                  <Icon icon="mdi:plus" className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Actions - CẬP NHẬT PHẦN NÀY */}
          <div className="mt-6 flex gap-3">
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleBuyNow} // Đổi từ handleAddToCart sang handleBuyNow
            >
              MUA NGAY
            </Button>
            <Button variant="dark" className="flex-1" onClick={handleAddToCart}>
              THÊM VÀO GIỎ
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 space-y-2 border-t pt-6">
            <div className="flex justify-between text-sm">
              <span className="text-black">Material:</span>
              <span className="font-medium text-dark">{product.material}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-black">Element:</span>
              <span className="font-medium text-dark">{product.element}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-black">Age Group:</span>
              <span className="font-medium text-dark">{product.age}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16">
        <div className="border-b">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`border-b-2 pb-3 text-sm font-medium uppercase tracking-wide transition-colors ${
                activeTab === "description"
                  ? "border-primary text-primary"
                  : "border-transparent text-black hover:text-dark"
              }`}
            >
              MÔ TẢ
            </button>
            <button
              onClick={() => setActiveTab("additional")}
              className={`border-b-2 pb-3 text-sm font-medium uppercase tracking-wide transition-colors ${
                activeTab === "additional"
                  ? "border-primary text-primary"
                  : "border-transparent text-black hover:text-dark"
              }`}
            >
              THÔNG TIN BỔ SUNG
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`border-b-2 pb-3 text-sm font-medium uppercase tracking-wide transition-colors ${
                activeTab === "reviews"
                  ? "border-primary text-primary"
                  : "border-transparent text-black hover:text-dark"
              }`}
            >
              ĐÁNH GIÁ ({product.reviews || 2})
            </button>
          </div>
        </div>

        <div className="py-8">
          {activeTab === "description" && (
            <div className="max-w-3xl">
              <h3 className="mb-4 text-lg font-semibold text-dark">
                Mô tả sản phẩm
              </h3>
              <div className="space-y-4 text-black">
                <p>{product.description}</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Đá tự nhiên được chọn lọc kỹ càng</li>
                  <li>Chế tác thủ công bởi nghệ nhân lành nghề</li>
                  <li>Thiết kế tinh tế, dễ dàng phối đồ</li>
                  <li>Đóng gói sang trọng, thích hợp làm quà tặng</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "additional" && (
            <div className="max-w-3xl">
              <table className="w-full">
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3 text-black">Chất liệu</td>
                    <td className="py-3 font-medium text-dark">
                      {product.material}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-black">Kích thước hạt</td>
                    <td className="py-3 font-medium text-dark">
                      {product.beadSize}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-black">Mệnh</td>
                    <td className="py-3 font-medium text-dark">
                      {product.element}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 text-black">Độ tuổi phù hợp</td>
                    <td className="py-3 font-medium text-dark">
                      {product.age}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-3xl">
              <h3 className="mb-4 text-lg font-semibold text-dark">
                Đánh giá khách hàng
              </h3>
              <p className="text-black">
                Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm
                này!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold uppercase tracking-wide text-dark">
            SẢN PHẨM LIÊN QUAN
          </h2>
          <button className="text-sm font-medium text-primary hover:underline">
            XEM TẤT CẢ
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}