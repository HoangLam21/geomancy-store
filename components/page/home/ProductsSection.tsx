'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/card/ProductCard';
import { products } from '@/product';

const tabs = [
  { id: 'new', label: 'RECOMMEND FOR YOU' },
  { id: 'best', label: 'BEST SELLER' },
  { id: 'sale', label: 'ON SALE' },
];

// Create category mapping based on your existing products
const productCategories: Record<number, string> = {
  1: 'sale',  // GREEN JADE BRACELET - has originalPrice
  2: 'best',  // AQUAMARINE BRACELET
  3: 'new',   // ROSE QUARTZ BRACELET
  4: 'sale',  // FIRE GUARDIAN CHARM - has originalPrice
  5: 'best',  // ONYX BRACELET
  6: 'new',   // AMETHYST BRACELET
  7: 'new',   // ROSE QUARTZ BRACELET 2
  8: 'best',  // FIRE GUARDIAN CHARM 2
  9: 'best',  // TIGER'S EYE BRACELET
  10: 'sale', // CITRINE BRACELET - has originalPrice
  11: 'new',  // LAPIS LAZULI BRACELET
};

export function ProductsSection() {
  const [activeTab, setActiveTab] = useState('new');

  const filteredProducts = products.filter(
    (product) => productCategories[product.id] === activeTab
  );

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-light tracking-wide text-dark">
            SẢN PHẨM
          </h2>
          <Link
            href="/products"
            className="text-sm uppercase tracking-wide text-gray transition-colors hover:text-primary"
          >
            XEM TẤT CẢ
          </Link>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-light-gray">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm uppercase tracking-wide transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray hover:text-dark'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="mt-8 flex justify-center gap-2">
          <button className="h-2 w-2 rounded-full bg-dark" />
          <button className="h-2 w-2 rounded-full bg-gray/30" />
          <button className="h-2 w-2 rounded-full bg-gray/30" />
        </div>
      </div>
    </section>
  );
}