"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import StarRating from "@/components/StarRating";
import { useCart } from "@/context/CartContext";
import { useFilters } from "@/context/FilterContext";
import { PRODUCTS, getProductById } from "@/data/product";
import { Review } from "@/types/product";

type ProductDetailPageProps = {
  productId: string;
};

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { setSelectedCategory } = useFilters();
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [userReviewText, setUserReviewText] = useState("");
  const [reviewsList, setReviewsList] = useState<XRView[]>([
    {
      id: 1,
      author: "David M.",
      rating: 5,
      date: "2 days ago",
      comment: "Exceptional build quality. Exactly as described and works flawlessly!",
    },
    {
      id: 2,
      author: "Sarah K.",
      rating: 4,
      date: "1 week ago",
      comment: "Super fast delivery and clean packaging. Very pleased with the purchase.",
    },
  ]);

  const product = useMemo(() => {
    return getProductById(productId) ?? PRODUCTS[0];
  }, [productId]);

  const productImages = [product.image, product.altImage || product.image];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReviewText.trim()) return;
    const newRev: Review = {
      id: Date.now(),
      author: "Verified Buyer",
      rating: 5,
      date: "Just now",
      comment: userReviewText.trim(),
    };
    setReviewsList([newRev, ...reviewsList]);
    setUserReviewText("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <button
          onClick={() => router.push("/")}
          className="hover:text-blue-600 flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span
          className="hover:text-blue-600 cursor-pointer"
          onClick={() => {
            setSelectedCategory(product.category);
            router.push("/");
          }}
        >
          {product.category}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-semibold truncate">{product.name}</span>
      </nav>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-2xl p-6 h-96 sm:h-[450px] flex items-center justify-center border border-gray-100 relative overflow-hidden">
              <img
                src={productImages[activeImage]}
                alt={product.name}
                className="max-h-full max-w-full object-contain mix-blend-multiply transition-all duration-300 hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            <div className="flex space-x-3">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 rounded-xl bg-gray-50 border-2 p-2 flex items-center justify-center overflow-hidden transition-all ${
                    activeImage === idx
                      ? "border-blue-600 ring-2 ring-blue-100"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx}`}
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-2">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 mb-4">
              <StarRating rating={product.rating} count={product.reviewsCount} />
              <span className="text-gray-300">|</span>
              <span className="text-emerald-600 font-semibold text-sm flex items-center">
                <Check className="w-4 h-4 mr-1" /> In Stock & Ready to Ship
              </span>
            </div>

            <div className="text-3xl font-black text-gray-900 mb-6">
              ${product.price}
            </div>

            <div className="border-t border-b border-gray-100 py-6 mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-bold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                  <button
                    onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                    disabled={selectedQty <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-40 text-gray-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-gray-900 text-sm">
                    {selectedQty}
                  </span>
                  <button
                    onClick={() => setSelectedQty(selectedQty + 1)}
                    className="p-2 hover:bg-gray-100 text-gray-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => addToCart(product, selectedQty)}
                  className="flex-1 bg-[#0052b4] hover:bg-[#003d8a] active:scale-[0.98] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>
                    Add {selectedQty} to Cart &bull; $
                    {(product.price * selectedQty).toFixed(2)}
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-gray-600 text-xs">
                <Truck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Free Express Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 text-xs">
                <RotateCcw className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>30-Day Hassle Returns</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 text-xs">
                <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>2 Year Full Warranty</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold text-gray-900 text-sm">{rev.author}</div>
                    <span className="text-xs text-gray-400">{rev.date}</span>
                  </div>
                  <div className="mb-2">
                    <StarRating rating={rev.rating} />
                  </div>
                  <p className="text-gray-600 text-sm">{rev.comment}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 h-fit">
              <h3 className="font-bold text-gray-900 text-sm mb-3">Leave a Review</h3>
              <form onSubmit={handleAddReview} className="space-y-3">
                <textarea
                  value={userReviewText}
                  onChange={(e) => setUserReviewText(e.target.value)}
                  placeholder="Share your experience with this item..."
                  className="w-full text-sm p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                />
                <button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-black text-white text-xs font-bold py-2.5 rounded-lg transition-colors"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
