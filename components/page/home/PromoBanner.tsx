import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function PromoBanner() {
  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center md:grid-cols-2">
          {/* Text Content */}
          <div className="px-8 py-16 text-white md:px-16">
            <p className="mb-2 text-sm uppercase tracking-widest text-white/80">
              — 10% OFF
            </p>
            <h2 className="mb-6 text-4xl font-light tracking-wide md:text-5xl">
              NEW YEAR SALE
            </h2>
            <Link href="/sale">
              <Button variant="outline" className="border-white bg-white text-primary hover:bg-white/90">
                SHOP SALE
              </Button>
            </Link>
          </div>

          {/* Image */}
          <div className="relative h-full min-h-[400px]">
            <img
              src="/images/11.jpg"
              alt="New Year Sale"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}