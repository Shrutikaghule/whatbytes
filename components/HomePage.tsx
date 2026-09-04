"use client";

import { useMemo } from "react";
import { RotateCcw, Search } from "lucide-react";
import FeaturedProductBanner from "@/components/FeaturedProductBanner";
import ProductCard from "@/components/ProductCard";
import SidebarFilters from "@/components/SidebarFilters";
import { useCart } from "@/context/CartContext";
import { useFilters } from "@/context/FilterContext";
import { PRODUCTS } from "@/data/product";
import { filterProducts } from "@/lib/filters";

export default function HomePage() {
  const { addToCart } = useCart();
  const { searchTerm, category, brand, minPrice, maxPrice, resetFilters } = useFilters();

  const filteredProducts = useMemo(
    () =>
      filterProducts(PRODUCTS, {
        searchTerm,
        category,
        brand,
        minPrice,
        maxPrice,
      }),
    [searchTerm, category, brand, minPrice, maxPrice],
  );

  const regularProducts = filteredProducts.filter((p) => !p.featured);
  const featuredProduct = filteredProducts.find((p) => p.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <SidebarFilters />

        <main className="flex-1 w-full">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Product Listing
            </h1>
            <span className="text-sm font-medium text-gray-500">
              Showing {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center my-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                No products found
              </h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                Try adjusting your category selection, brand, price range, or search keywords.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center space-x-2 bg-[#0052b4] hover:bg-[#003d8a] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}

              {featuredProduct && (
                <FeaturedProductBanner
                  product={featuredProduct}
                  onAddToCart={addToCart}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}