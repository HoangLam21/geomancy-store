// app/page.tsx
import { CategoriesSection } from "@/components/page/home/CategoriesSection";
import { FeaturesSection } from "@/components/page/home/FeaturesSection";
import { HeroCarousel } from "@/components/page/home/HeroCarousel";
import { MaterialsGallery } from "@/components/page/home/MaterialsGallery";
import { ProductsSection } from "@/components/page/home/ProductsSection";
import { PromoBanner } from "@/components/page/home/PromoBanner";

export default function HomePage() {
  return (
    <div>
      <HeroCarousel />        {/* NEW ITEMS với carousel */}
      <FeaturesSection />     {/* Chính sách */}
      <CategoriesSection />   {/* METAL, WOOD, etc. */}
      <ProductsSection />     {/* Tabs sản phẩm */}
      <MaterialsGallery />    {/* Album chất liệu */}
      <PromoBanner />         {/* NEW YEAR SALE */}
    </div>
  );
}