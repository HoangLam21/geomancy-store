"use client";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { Icon } from "@iconify/react";
import Image from "next/image";

import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed  right-0 top-0 z-50 h-full w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold uppercase tracking-wide text-dark">
              Giỏ Hàng ({items.length})
            </h2>
            <button
              onClick={onClose}
              className="text-black hover:text-dark transition-colors"
              aria-label="Close cart"
            >
              <Icon icon="mdi:close" className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <Icon
                  icon="mdi:cart-outline"
                  className="mb-4 h-16 w-16 text-light-gray"
                />
                <p className="text-black">Giỏ hàng của bạn đang trống</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={`${item.id}-${item.size || "default"}-${index}`}
                    className="flex gap-4 border-b pb-4"
                  >
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-light-gray">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-light-gray text-black">
                          <Icon icon="mdi:image-off" className="h-8 w-8" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col">
                      <h3 className="text-sm font-medium text-dark">
                        {item.name}
                      </h3>
                      {item.size && (
                        <p className="text-xs text-black">Size: {item.size}</p>
                      )}
                      <p className="mt-1 text-sm font-semibold text-dark">
                        {formatPrice(item.price)}
                      </p>

                      <div className="mt-2 flex items-center justify-between text-black">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1,
                                item.size
                              )
                            }
                            className="flex h-6 w-6 items-center justify-center rounded border border-light-gray hover:bg-light-gray/30 transition-colors"
                          >
                            <Icon icon="mdi:minus" className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1,
                                item.size
                              )
                            }
                            className="flex h-6 w-6 items-center justify-center rounded border border-light-gray hover:bg-light-gray/30 transition-colors"
                          >
                            <Icon icon="mdi:plus" className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <Icon icon="mdi:delete-outline" className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t px-6 py-4">
              <div className="mb-4 flex items-center justify-between text-lg font-semibold text-black">
                <span>Tổng cộng:</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>

              <div className="space-y-2">
                <Link href="/checkout" onClick={onClose}>
                  <Button variant="primary" className="w-full">
                    Thanh toán
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={onClose}>
                  Tiếp tục mua sắm
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
