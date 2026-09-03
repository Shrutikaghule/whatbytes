'use client';

import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFilters } from "@/context/FilterContext";


export default function Header() {
  const { totalItems } = useCart();
  const { searchTerm, setSearchTerm } = useFilters();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <header className="bg-[#0052b4] sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div
            onClick={() => router.push("/")}
            className="cursor-pointer flex items-center space-x-2 select-none group"
          >
            <span className="text-white text-3xl sm:text-4xl font-black tracking-tight font-sans">
              Logo
            </span>
          </div>

          <div className="flex-1 max-w-xl mx-2 sm:mx-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (pathname !== "/") {
                    router.push("/");
                  }
                }}
                className="w-full bg-[#004294]/70 focus:bg-white text-white focus:text-gray-900 placeholder:text-blue-200 focus:placeholder:text-gray-400 text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none border border-blue-400/40 focus:border-white transition-all duration-200 shadow-inner"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-200 pointer-events-none" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push("/cart")}
              className={`relative flex items-center space-x-2 bg-[#002f6c] hover:bg-[#002657] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors border border-blue-900/50 shadow-sm ${
                pathname === "/cart" ? "ring-2 ring-white/60" : ""
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

    </>
  );
}
