import { CATEGORIES, PRODUCTS } from "@/data/product";
import type { Product } from "@/types/product";

export const PRICE_MIN = 0;
export const PRICE_MAX = 1000;
export const DEFAULT_PRICE_RANGE = `${PRICE_MIN}-${PRICE_MAX}` as const;

export type ShopFilters = {
  searchTerm: string;
  category: string;
  minPrice: number;
  maxPrice: number;
};

export function categoryToParam(category: string): string | null {
  if (!category || category === "All") return null;
  return category.toLowerCase();
}

export function parseCategoryParam(value: string | null): string {
  if (!value) return "All";
  const match = CATEGORIES.find(
    (category) => category.toLowerCase() === value.toLowerCase(),
  );
  return match ?? "All";
}

export function parsePriceParam(value: string | null): {
  minPrice: number;
  maxPrice: number;
} {
  if (!value) {
    return { minPrice: PRICE_MIN, maxPrice: PRICE_MAX };
  }

  const [minRaw, maxRaw] = value.split("-");
  const parsedMin = Number(minRaw);
  const parsedMax = maxRaw === undefined ? PRICE_MAX : Number(maxRaw);

  const minPrice = Number.isFinite(parsedMin)
    ? Math.min(PRICE_MAX, Math.max(PRICE_MIN, parsedMin))
    : PRICE_MIN;
  const maxPrice = Number.isFinite(parsedMax)
    ? Math.min(PRICE_MAX, Math.max(PRICE_MIN, parsedMax))
    : PRICE_MAX;

  if (minPrice > maxPrice) {
    return { minPrice: maxPrice, maxPrice: minPrice };
  }

  return { minPrice, maxPrice };
}

export function serializePriceParam(minPrice: number, maxPrice: number): string {
  return `${minPrice}-${maxPrice}`;
}

export function isDefaultPriceRange(minPrice: number, maxPrice: number): boolean {
  return minPrice === PRICE_MIN && maxPrice === PRICE_MAX;
}

export function filtersFromSearchParams(params: URLSearchParams): ShopFilters {
  const { minPrice, maxPrice } = parsePriceParam(params.get("price"));
  return {
    searchTerm: params.get("search") ?? "",
    category: parseCategoryParam(params.get("category")),
    minPrice,
    maxPrice,
  };
}

export function filtersToSearchParams(filters: ShopFilters): URLSearchParams {
  const params = new URLSearchParams();
  const trimmedSearch = filters.searchTerm.trim();
  const categoryParam = categoryToParam(filters.category);

  if (filters.searchTerm) params.set("search", filters.searchTerm);
  if (categoryParam) params.set("category", categoryParam);

  const hasOtherFilters = Boolean(trimmedSearch || categoryParam);
  if (hasOtherFilters || !isDefaultPriceRange(filters.minPrice, filters.maxPrice)) {
    params.set("price", serializePriceParam(filters.minPrice, filters.maxPrice));
  }

  return params;
}

export function matchesSearch(product: Product, searchTerm: string): boolean {
  const query = searchTerm.trim().toLowerCase();
  if (!query) return true;

  return (
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );
}

export function filterProducts(
  products: Product[] = PRODUCTS,
  filters: ShopFilters,
): Product[] {
  return products.filter((product) => {
    if (!matchesSearch(product, filters.searchTerm)) return false;
    if (filters.category !== "All" && product.category !== filters.category) {
      return false;
    }
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    return true;
  });
}
