'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  searchValue?: string;
  onSearchChange?: (val: string) => void;
}

export default function Header({ searchValue, onSearchChange }: HeaderProps) {
  const { totalItems } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (onSearchChange) {
      onSearchChange(val);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      if (val) {
        params.set('q', val);
      } else {
        params.delete('q');
      }
      router.push(`/?${params.toString()}`);
    }
  };

  return (
    <header className="bg-[#0052b4] sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center group select-none">
          <span className="text-white text-3xl sm:text-4xl font-black tracking-tight">
            Logo
          </span>
        </Link>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl mx-2 sm:mx-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchValue ?? ''}
              onChange={handleInputChange}
              className="w-full bg-[#004294]/70 focus:bg-white text-white focus:text-gray-900 placeholder:text-blue-200 focus:placeholder:text-gray-400 text-sm rounded-lg pl-10 pr-9 py-2.5 outline-none border border-blue-400/40 focus:border-white transition-all shadow-inner"
            />
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-200 pointer-events-none" />
            {searchValue && (
              <button
                onClick={() => onSearchChange?.('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Cart Button */}
        <div className="flex items-center space-x-3">
          <Link
            href="/cart"
            className="relative flex items-center space-x-2 bg-[#002f6c] hover:bg-[#002657] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors border border-blue-900/50 shadow-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}