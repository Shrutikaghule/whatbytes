"use client";

import { CATEGORIES } from "@/data/product";



type SidebarFiltersProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  cacyroyFilter: string;
  setCacyroyFilter: (category: string) => void;
  customPriceInput: string;
  setCustomPriceInput: (value: string) => void;
  onReset: () => void;
};

export default function SidebarFilters({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  cacyroyFilter,
  setCacyroyFilter,
  customPriceInput,
  setCustomPriceInput,
  onReset,
}: SidebarFiltersProps) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
      <div className="bg-[#0052b4] text-white rounded-xl p-6 shadow-md border border-blue-600/30">
        <h2 className="text-2xl font-bold mb-4 tracking-tight">Filters</h2>

        <div className="mb-6">
          <h3 className="text-base font-semibold mb-3 text-blue-50">Category</h3>
          <div className="space-y-2.5">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <label
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="flex items-center space-x-3 cursor-pointer group select-none text-sm font-medium"
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-white bg-transparent"
                        : "border-blue-300 group-hover:border-white"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span
                    className={`${
                      isSelected
                        ? "text-white font-semibold"
                        : "text-blue-100 group-hover:text-white"
                    }`}
                  >
                    {cat}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-semibold text-blue-50">Price</h3>
            <span className="text-xs font-semibold bg-blue-700/80 px-2 py-0.5 rounded border border-blue-400/30">
              ${maxPrice}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-1.5 bg-blue-300/40 rounded-lg appearance-none cursor-pointer accent-white"
          />

          <div className="flex justify-between text-xs font-medium text-blue-100 mt-2">
            <span>0</span>
            <span>1000</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
          Category
        </h2>

        <div className="space-y-2.5 mb-6">
          {CATEGORIES.map((cat) => {
            const isSelected = cacyroyFilter === cat;
            return (
              <label
                key={`sub-${cat}`}
                onClick={() => setCacyroyFilter(cat)}
                className="flex items-center space-x-3 cursor-pointer group select-none text-sm"
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? "border-blue-600"
                      : "border-gray-300 group-hover:border-gray-400"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <span
                  className={`${
                    isSelected
                      ? "text-gray-900 font-semibold"
                      : "text-gray-600 group-hover:text-gray-900"
                  }`}
                >
                  {cat}
                </span>
              </label>
            );
          })}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Price
          </label>
          <div className="relative">
            <input
              type="number"
              value={customPriceInput}
              onChange={(e) => setCustomPriceInput(e.target.value)}
              placeholder="5000"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={onReset}
          className="mt-5 w-full text-xs font-semibold text-blue-600 hover:text-blue-800 py-1.5 border border-blue-200 hover:border-blue-300 rounded-lg transition-colors"
        >
          Reset All Filters
        </button>
      </div>
    </aside>
  );
}
