"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "../page/payment/CartDrawer";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <header className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="text-xl font-semibold tracking-wide">
              GemSphere
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              <Link
                href="/"
                className="text-sm uppercase tracking-wide transition-colors hover:text-white/80"
              >
                HOME
              </Link>

              <Link
                href="/products"
                className="text-sm uppercase tracking-wide transition-colors hover:text-white/80"
              >
                PRODUCTS
              </Link>

              <Link
                href="/about"
                className="text-sm uppercase tracking-wide transition-colors hover:text-white/80"
              >
                ABOUT
              </Link>

              <Link
                href="/contact"
                className="text-sm uppercase tracking-wide transition-colors hover:text-white/80"
              >
                CONTACT
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <button
                aria-label="Search"
                className="transition-colors hover:text-white/80"
              >
                <Icon icon="mdi:magnify" className="h-5 w-5" />
              </button>

              <Link
                href="/account"
                aria-label="Account"
                className="transition-colors hover:text-white/80"
              >
                <Icon icon="mdi:account-outline" className="h-5 w-5" />
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-1 transition-colors hover:text-white/80"
                aria-label="Cart"
              >
                <Icon icon="mdi:cart-outline" className="h-5 w-5" />
                <span className="text-sm">({totalItems})</span>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden"
                aria-label="Toggle menu"
              >
                <Icon
                  icon={isOpen ? "mdi:close" : "mdi:menu"}
                  className="h-6 w-6"
                />
              </button>
            </div>
          </div>

          {isOpen && (
            <nav className="border-t border-white/20 py-4 md:hidden">
              <div className="flex flex-col gap-4">
                <Link href="/" className="text-sm uppercase tracking-wide">
                  HOME
                </Link>
                <Link
                  href="/products"
                  className="text-sm uppercase tracking-wide"
                >
                  PRODUCTS
                </Link>
                <Link href="/about" className="text-sm uppercase tracking-wide">
                  ABOUT
                </Link>
                <Link
                  href="/contact"
                  className="text-sm uppercase tracking-wide"
                >
                  CONTACT
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
