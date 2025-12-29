'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface HeroProduct {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  images: {
    main: string;      // Hình chữ nhật phía sau
    featured: string;  // Hình tròn phía trước
  };
}

const heroProducts: HeroProduct[] = [
  {
    id: 1,
    slug: 'product-1',
    title: 'NEW ITEMS',
    subtitle: 'PRODUCT 1',
    images: {
      main: '/images/1.jpg',
      featured: '/images/2.jpg',
    },
  },
  {
    id: 2,
    slug: 'product-2',
    title: 'NEW ITEMS',
    subtitle: 'PRODUCT 2',
    images: {
      main: '/images/3.jpg',
      featured: '/images/4.jpg',
    },
  },
  {
    id: 3,
    slug: 'product-3',
    title: 'NEW ITEMS',
    subtitle: 'PRODUCT 3',
    images: {
      main: '/images/5.jpg',
      featured: '/images/6.jpg',
    },
  },
];

// Custom Arrow Component
const ChevronArrow = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-200"
  >
    <path
      d={direction === 'right' 
        ? "M12 8L20 16L12 24" 
        : "M20 8L12 16L20 24"
      }
      stroke="#5C2E2E"
      strokeWidth="3"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % heroProducts.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentProduct = heroProducts[currentIndex];

  return (
    <section className="relative overflow-hidden border-b border-light-gray bg-white py-12 md:py-16">
      {/* Container với padding để chừa chỗ cho arrows */}
      <div className="mx-auto max-w-7xl px-16 md:px-20">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 
              key={`title-${currentIndex}`}
              className="animate-fadeIn text-4xl font-light tracking-wider text-dark md:text-5xl lg:text-6xl"
            >
              {currentProduct.title}
            </h1>
            <p 
              key={`subtitle-${currentIndex}`}
              className="animate-fadeIn text-sm uppercase tracking-widest text-gray"
              style={{ animationDelay: '100ms' }}
            >
              {currentProduct.subtitle}
            </p>
            <div 
              key={`button-${currentIndex}`}
              className="animate-fadeIn"
              style={{ animationDelay: '200ms' }}
            >
              <Link href={`/products/${currentProduct.slug}`}>
                <Button variant="primary" size="lg">
                  SHOP NOW
                </Button>
              </Link>
            </div>
          </div>

          {/* Product Images - Layout with overlapping images */}
          <div className="relative h-[500px] md:h-[550px]">
            {/* Background Rectangle Window - Bo góc trên và nhẹ dưới */}
            <div 
              key={`main-${currentIndex}`}
              className="animate-slideIn absolute left-1/2 top-0 h-full w-full max-w-[480px] -translate-x-1/2 overflow-hidden bg-light-gray/30 shadow-lg md:left-auto md:right-0 md:translate-x-0"
              style={{
                borderRadius: '150px 150px 40px 40px',
              }}
            >
              <img
                src={currentProduct.images.main}
                alt={currentProduct.subtitle}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Foreground Circle Image - Overlap bottom-left */}
            <div 
              key={`featured-${currentIndex}`}
              className="animate-slideInCircle absolute bottom-0 left-0 z-10 h-[240px] w-[240px] overflow-hidden rounded-full bg-white shadow-2xl md:h-[280px] md:w-[280px]"
            >
              <img
                src={currentProduct.images.featured}
                alt={`${currentProduct.subtitle} featured`}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Custom Design */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 transition-all hover:scale-110 disabled:opacity-50 md:left-4"
        aria-label="Previous"
      >
        <ChevronArrow direction="left" />
      </button>
      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 transition-all hover:scale-110 disabled:opacity-50 md:right-4"
        aria-label="Next"
      >
        <ChevronArrow direction="right" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroProducts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(idx);
                setTimeout(() => setIsAnimating(false), 600);
              }
            }}
            className={`h-2 rounded-full transition-all ${
              idx === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-gray/40 hover:bg-gray/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes slideInCircle {
          from {
            opacity: 0;
            transform: translateX(-100px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
        }

        .animate-slideInCircle {
          animation: slideInCircle 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}