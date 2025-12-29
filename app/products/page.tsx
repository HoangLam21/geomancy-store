"use client";

import { ProductCard } from "@/components/card/ProductCard";
import { products } from "@/product";
import React, { useState, useMemo } from "react";

// Hàm chuẩn hóa chuỗi để tìm kiếm
const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu
    .replace(/đ/g, "d")
    .replace(/\s+/g, ""); // Bỏ khoảng trắng
};

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [selectedElement, setSelectedElement] = useState("all");
  const [selectedAge, setSelectedAge] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Lọc và tìm kiếm sản phẩm
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Tìm kiếm thông minh
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeString(searchQuery);

      filtered = filtered.filter((product) => {
        const nameMatch = normalizeString(product.name).includes(
          normalizedQuery
        );
        const elementMatch = normalizeString(product.element).includes(
          normalizedQuery
        );
        const ageMatch =
          normalizeString(product.age).includes(normalizedQuery) ||
          product.age.includes(searchQuery.trim());
        const priceMatch = product.price
          .toString()
          .includes(searchQuery.trim());
        const sizeMatch = normalizeString(product.beadSize).includes(
          normalizedQuery
        );
        const materialMatch = normalizeString(product.material).includes(
          normalizedQuery
        );

        return (
          nameMatch ||
          elementMatch ||
          ageMatch ||
          priceMatch ||
          sizeMatch ||
          materialMatch
        );
      });
    }

    // Lọc theo kích thước
    if (selectedSize !== "all") {
      filtered = filtered.filter((p) => p.beadSize === selectedSize);
    }

    // Lọc theo chất liệu
    if (selectedMaterial !== "all") {
      filtered = filtered.filter((p) => p.material === selectedMaterial);
    }

    // Lọc theo mệnh
    if (selectedElement !== "all") {
      filtered = filtered.filter((p) => p.element === selectedElement);
    }

    // Lọc theo độ tuổi
    if (selectedAge !== "all") {
      filtered = filtered.filter((p) => p.age === selectedAge);
    }

    // Lọc theo giá
    if (selectedPrice !== "all") {
      const [min, max] = selectedPrice.split("-").map(Number);
      filtered = filtered.filter((p) => {
        if (max) {
          return p.price >= min && p.price <= max;
        }
        return p.price >= min;
      });
    }

    // Sắp xếp
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [
    searchQuery,
    selectedSize,
    selectedMaterial,
    selectedElement,
    selectedAge,
    selectedPrice,
    sortBy,
  ]);

  // Reset filters
  const resetFilters = () => {
    setSelectedSize("all");
    setSelectedMaterial("all");
    setSelectedElement("all");
    setSelectedAge("all");
    setSelectedPrice("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-primary py-12 text-center">
        <h1 className="text-4xl font-light tracking-wider text-white">SHOP</h1>
        <p className="mt-2 text-sm tracking-widest text-white/80">
          Home » Shop
        </p>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar Filters */}
          <aside className="space-y-6">
            {/* Bead Size Filter */}
            <div className="border-b border-light-gray pb-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-dark">
                Bead Size
              </h3>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full rounded border border-light-gray px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">Choose size of bead</option>
                <option value="6mm">6mm</option>
                <option value="8mm">8mm</option>
                <option value="10mm">10mm</option>
                <option value="12mm">12mm</option>
                <option value="14mm">14mm</option>
              </select>
            </div>

            {/* Material Filter */}
            <div className="border-b border-light-gray pb-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-dark">
                Material
              </h3>
              <div className="space-y-2">
                {[
                  "all",
                  "Ngọc Bích",
                  "Aquamarine",
                  "Thạch Anh Hồng",
                  "Mã Não",
                  "Mã Não Đỏ",
                  "Onyx Đen",
                  "Thạch Anh Tím",
                  "Thạch Anh Vàng",
                  "Mắt Hổ",
                  "Lapis Lazuli",
                ].map((material) => (
                  <label
                    key={material}
                    className="flex cursor-pointer items-center gap-2 text-sm text-gray hover:text-dark"
                  >
                    <input
                      type="radio"
                      name="material"
                      value={material}
                      checked={selectedMaterial === material}
                      onChange={(e) => setSelectedMaterial(e.target.value)}
                      className="h-4 w-4 border-gray text-primary focus:ring-primary"
                    />
                    {material === "all" ? "Tất cả" : material}
                  </label>
                ))}
              </div>
            </div>

            {/* Element Filter */}
            <div className="border-b border-light-gray pb-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-dark">
                Mệnh
              </h3>
              <div className="space-y-2">
                {["all", "Hỏa", "Thủy", "Mộc", "Kim", "Thổ"].map((element) => (
                  <label
                    key={element}
                    className="flex cursor-pointer items-center gap-2 text-sm text-gray hover:text-dark"
                  >
                    <input
                      type="radio"
                      name="element"
                      value={element}
                      checked={selectedElement === element}
                      onChange={(e) => setSelectedElement(e.target.value)}
                      className="h-4 w-4 border-gray text-primary focus:ring-primary"
                    />
                    {element === "all" ? "Tất cả" : element}
                  </label>
                ))}
              </div>
            </div>

            {/* Age Filter */}
            <div className="border-b border-light-gray pb-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-dark">
                Độ Tuổi
              </h3>
              <div className="space-y-2">
                {["all", "dưới 18", "18-30", "30-50", "trên 50"].map((age) => (
                  <label
                    key={age}
                    className="flex cursor-pointer items-center gap-2 text-sm text-gray hover:text-dark"
                  >
                    <input
                      type="radio"
                      name="age"
                      value={age}
                      checked={selectedAge === age}
                      onChange={(e) => setSelectedAge(e.target.value)}
                      className="h-4 w-4 border-gray text-primary focus:ring-primary"
                    />
                    {age === "all" ? "Tất cả" : age}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pb-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-dark">
                Price
              </h3>
              <div className="space-y-2">
                {[
                  { value: "all", label: "Tất cả" },
                  { value: "0-500000", label: "Dưới 500,000₫" },
                  { value: "500000-800000", label: "500,000₫ - 800,000₫" },
                  { value: "800000-1000000", label: "800,000₫ - 1,000,000₫" },
                  { value: "1000000-10000000", label: "Trên 1,000,000₫" },
                ].map((price) => (
                  <label
                    key={price.value}
                    className="flex cursor-pointer items-center gap-2 text-sm text-gray hover:text-dark"
                  >
                    <input
                      type="radio"
                      name="price"
                      value={price.value}
                      checked={selectedPrice === price.value}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                      className="h-4 w-4 border-gray text-primary focus:ring-primary"
                    />
                    {price.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="w-full rounded border-2 border-primary bg-white px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-primary/5"
            >
              Reset Filters
            </button>
          </aside>

          {/* Products Grid */}
          <div>
            {/* Search and Sort Bar */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 sm:max-w-md">
                <input
                  type="text"
                  placeholder="Tìm theo mệnh, tuổi, giá, size, chất liệu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded border border-light-gray px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-[200px] rounded border border-light-gray px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="default">Default sorting</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                  <option value="name">Tên: A-Z</option>
                </select>
              </div>
            </div>

            {/* Results Info */}
            <p className="mb-6 text-sm text-gray">
              Showing {filteredProducts.length} of {products.length} results
            </p>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-lg text-gray">
                  Không tìm thấy sản phẩm phù hợp
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 rounded bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  className="flex h-10 w-10 items-center justify-center border border-light-gray text-gray transition-colors hover:border-dark hover:text-dark disabled:opacity-50"
                  disabled
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M12 15L7 10L12 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button className="flex h-10 w-10 items-center justify-center bg-primary text-white">
                  1
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center border border-light-gray text-gray transition-colors hover:border-dark hover:text-dark"
                  disabled
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M8 5L13 10L8 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
