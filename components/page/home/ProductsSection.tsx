'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/card/ProductCard';

const products = [
  {
    id: 1,
    slug: 'onyx-bracelet',
    image: '/images/3.jpg',
    name: 'Onyx Bracelet', // Đổi từ 'title' sang 'name'
    material: 'Onyx', // Đổi từ 'subtitle' sang 'material'
    price: 870000,
    category: 'new',
  },
  {
    id: 2,
    slug: 'rose-quartz-bracelet',
    image: '/images/4.jpg',
    name: 'Rose Quartz Bracelet',
    material: 'Quartz',
    price: 680000,
    category: 'new',
  },
  {
    id: 3,
    slug: 'amethyst-bracelet',
    image: '/images/5.jpg',
    name: 'Amethyst Bracelet',
    material: 'Quartz',
    price: 680000,
    category: 'sale',
    originalPrice: 850000,
  },
  {
    id: 4,
    slug: 'aquamarine-bracelet',
    image: '/images/6.jpg',
    name: 'Aquamarine Bracelet',
    material: 'Aquamarine',
    price: 680000,
    category: 'best',
  },
  {
    id: 5,
    slug: 'tiger-eye-bracelet',
    image: '/images/3.jpg',
    name: 'Tiger Eye Bracelet',
    material: 'Tiger Eye',
    price: 750000,
    category: 'best',
  },
  {
    id: 6,
    slug: 'jade-bracelet',
    image: '/images/4.jpg',
    name: 'Jade Bracelet',
    material: 'Jade',
    price: 890000,
    category: 'sale',
    originalPrice: 1200000,
  },
  {
    id: 7,
    slug: 'citrine-bracelet',
    image: '/images/5.jpg',
    name: 'Citrine Bracelet',
    material: 'Citrine',
    price: 720000,
    category: 'new',
  },
  {
    id: 8,
    slug: 'turquoise-bracelet',
    image: '/images/6.jpg',
    name: 'Turquoise Bracelet',
    material: 'Turquoise',
    price: 820000,
    category: 'best',
  },
];

const tabs = [
  { id: 'new', label: 'NEW ARRIVALS' },
  { id: 'best', label: 'BEST SELLER' },
  { id: 'sale', label: 'ON SALE' },
];

export function ProductsSection() {
  const [activeTab, setActiveTab] = useState('new');

  const filteredProducts = products.filter(
    (product) => product.category === activeTab
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