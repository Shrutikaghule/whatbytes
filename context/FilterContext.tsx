"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import {
  PRICE_MAX,
  PRICE_MIN,
  filtersFromSearchParams,
  filtersToSearchParams,
  type ShopFilters,
} from "@/lib/filters";

type FilterContextValue = ShopFilters & {
  selectedCategory: string;
  selectedBrand: string;
  setSearchTerm: (value: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedBrand: (brand: string) => void;
  setPriceRange: (minPrice: number, maxPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
  resetFilters: () => void;
};

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { triggerToast } = useToast();

  const filters = useMemo(
    () => filtersFromSearchParams(searchParams),
    [searchParams],
  );

  const commitFilters = useCallback(
    (next: ShopFilters, mode: "replace" | "push" = "replace") => {
      const params = filtersToSearchParams(next);
      const query = params.toString();
      const href = query ? `/?${query}` : "/";
      const navigate = mode === "push" ? router.push : router.replace;

      if (pathname === "/" && searchParams.toString() === query) {
        return;
      }

      navigate(href, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const setSearchTerm = useCallback(
    (value: string) => {
      commitFilters({ ...filters, searchTerm: value }, "replace");
    },
    [commitFilters, filters],
  );

  const setSelectedCategory = useCallback(
    (category: string) => {
      commitFilters({ ...filters, category }, "push");
    },
    [commitFilters, filters],
  );

  const setSelectedBrand = useCallback(
    (brand: string) => {
      commitFilters({ ...filters, brand }, "push");
    },
    [commitFilters, filters],
  );

  const setPriceRange = useCallback(
    (minPrice: number, maxPrice: number) => {
      commitFilters({ ...filters, minPrice, maxPrice }, "replace");
    },
    [commitFilters, filters],
  );

  const setMaxPrice = useCallback(
    (maxPrice: number) => {
      const clamped = Math.min(PRICE_MAX, Math.max(PRICE_MIN, maxPrice));
      const minPrice = Math.min(filters.minPrice, clamped);
      commitFilters({ ...filters, minPrice, maxPrice: clamped }, "replace");
    },
    [commitFilters, filters],
  );

  const resetFilters = useCallback(() => {
    commitFilters(
      {
        searchTerm: "",
        category: "All",
        brand: "All",
        minPrice: PRICE_MIN,
        maxPrice: PRICE_MAX,
      },
      "replace",
    );
    triggerToast("Filters reset to default");
  }, [commitFilters, triggerToast]);

  const value = useMemo<FilterContextValue>(
    () => ({
      ...filters,
      selectedCategory: filters.category,
      selectedBrand: filters.brand,
      setSearchTerm,
      setSelectedCategory,
      setSelectedBrand,
      setPriceRange,
      setMaxPrice,
      resetFilters,
    }),
    [
      filters,
      resetFilters,
      setMaxPrice,
      setPriceRange,
      setSearchTerm,
      setSelectedCategory,
      setSelectedBrand,
    ],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}