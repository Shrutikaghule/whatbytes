"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useToast } from "@/context/ToastContext";

type FilterContextValue = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  maxPrice: number;
  setMaxPrice: Dispatch<SetStateAction<number>>;
  cacyroyFilter: string;
  setCacyroyFilter: Dispatch<SetStateAction<string>>;
  customPriceInput: string;
  setCustomPriceInput: Dispatch<SetStateAction<string>>;
  resetFilters: () => void;
};

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const { triggerToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [cacyroyFilter, setCacyroyFilter] = useState("All");
  const [customPriceInput, setCustomPriceInput] = useState("5000");

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setMaxPrice(1000);
    setCacyroyFilter("All");
    setCustomPriceInput("5000");
    triggerToast("Filters reset to default");
  };

  return (
    <FilterContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        maxPrice,
        setMaxPrice,
        cacyroyFilter,
        setCacyroyFilter,
        customPriceInput,
        setCustomPriceInput,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
