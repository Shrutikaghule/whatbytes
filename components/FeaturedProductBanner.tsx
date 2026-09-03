"use client";

import { useRouter } from "next/navigation";
import StarRating from "@/components/StarRating";
import type { Product } from "@/types/product";

type FeaturedProductBannerProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export default function FeaturedProductBanner({
  product,
  onAddToCart,
}: FeaturedProductBannerProps) {
  const router = useRouter();

  return (
    <div className="col-span-1 sm:col-span-2 bg-white rounded-xl border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-md transition-shadow">
      <div
        onClick={() => router.push(`/product/${product.id}`)}
        className="w-full md:w-1/2 flex items-center justify-center cursor-pointer group"
      >
        <div className="relative max-w-[220px] py-2">
          <img
            src={product.image}
            alt={product.name}
            className="h-80 w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h2
          onClick={() => router.push(`/product/${product.id}`)}
          className="text-3xl font-extrabold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
        >
          {product.name}
        </h2>

        <div className="text-2xl font-black text-gray-900 mt-1 mb-2">
          ${product.price}
        </div>

        <div className="mb-4">
          <StarRating rating={product.rating} />
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-5">
          {product.description}
        </p>

        <div className="space-y-1 mb-6 text-sm">
          <div className="text-gray-500 font-medium">Category</div>
          <div className="text-gray-900 font-bold">{product.category}</div>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full sm:w-auto bg-[#0052b4] hover:bg-[#003d8a] active:scale-[0.98] text-white font-medium py-3 px-8 rounded-lg text-base transition-all duration-150 shadow-md text-center"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
