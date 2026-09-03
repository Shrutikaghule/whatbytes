'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Eye } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl overflow-hidden p-4 flex flex-col justify-between group hover:shadow-lg transition-all border border-gray-100">
      {/* Product Image */}
      <Link
        href={`/product/${product.id}`}
        className="cursor-pointer overflow-hidden rounded-lg bg-gray-50 mb-4 h-48 flex items-center justify-center relative p-3"
      >
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white/95 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </span>
        </div>
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-1">
        <Link
          href={`/product/${product.id}`}
          className="font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
        >
          {product.name}
        </Link>

        <div className="mt-1 text-gray-900 font-extrabold text-xl">${product.price}</div>

        <div className="mt-4 pt-2">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-[#0052b4] hover:bg-[#003d8a] active:scale-[0.98] text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-all shadow-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}